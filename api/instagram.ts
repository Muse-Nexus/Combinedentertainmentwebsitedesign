import type { LatestMoment } from '../shared/site-content.js';
import {
  configuredInstagramAccounts,
  instagramDisplayAssetUrl,
  SocialFanoutRequestError,
  safeInstagramPermalink,
  signInstagramMedia,
  socialFanoutRequest,
  type InstagramAccount,
} from '../server/instagram.js';
import {
  cleanText,
  checkRateLimit,
  getClientIp,
  methodNotAllowed,
  type ApiRequest,
  type ApiResponse,
} from '../server/http.js';

const CACHE_HEADER = 'public, s-maxage=300, stale-while-revalidate=86400';
const FAILURE_CACHE_HEADER = 'public, s-maxage=60, stale-while-revalidate=300';
interface InstagramMediaChild {
  mediaType?: unknown;
  mediaUrl?: unknown;
  thumbnailUrl?: unknown;
}

interface InstagramMedia {
  id?: unknown;
  caption?: unknown;
  mediaType?: unknown;
  mediaUrl?: unknown;
  permalink?: unknown;
  thumbnailUrl?: unknown;
  timestamp?: unknown;
  username?: unknown;
  altText?: unknown;
  children?: InstagramMediaChild[];
}

interface InstagramMediaResponse {
  ok?: unknown;
  media?: InstagramMedia[];
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') return methodNotAllowed(response, ['GET']);
  if (Object.keys(request.query ?? {}).length > 0) {
    response.setHeader('Cache-Control', 'no-store');
    return response.status(400).json({ ok: false, code: 'invalid_request' });
  }

  const limit = checkRateLimit(`instagram-feed:${getClientIp(request)}`, 30, 5 * 60 * 1_000);
  if (!limit.allowed) {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Retry-After', String(limit.retryAfterSeconds));
    return response.status(429).json({ ok: false, code: 'rate_limited' });
  }

  const accounts = configuredInstagramAccounts();
  if (accounts.length === 0) {
    response.setHeader('Cache-Control', FAILURE_CACHE_HEADER);
    return response.status(503).json({
      ok: false,
      code: 'instagram_unavailable',
      reason: 'not_configured',
    });
  }

  const results = await Promise.all(
    accounts.map(async (account) => {
      try {
        return await latestAccountMoments(account);
      } catch (error) {
        const status = error instanceof SocialFanoutRequestError ? error.status : 0;
        console.error('SocialFanout Instagram feed request failed', { account: account.key, status });
        return [];
      }
    }),
  );

  const accountResults = accounts.map((account, index) => ({
    account,
    moments: results[index] ?? [],
  }));
  const moments = accountResults
    .flatMap((result) => result.moments)
    .sort((left, right) => timestampValue(right.timestamp) - timestampValue(left.timestamp))
    .filter((moment, index, collection) =>
      collection.findIndex((candidate) => candidate.id === moment.id) === index,
    )
    .slice(0, 12);

  if (moments.length === 0) {
    response.setHeader('Cache-Control', FAILURE_CACHE_HEADER);
    return response.status(502).json({
      ok: false,
      code: 'instagram_unavailable',
      reason: 'no_media',
    });
  }

  response.setHeader('Cache-Control', CACHE_HEADER);
  return response.status(200).json({
    ok: true,
    source: 'instagram',
    accounts: accountResults
      .filter((result) => result.moments.length > 0)
      .map((result) => result.account.handle),
    moments,
  });
}

async function latestAccountMoments(account: InstagramAccount): Promise<LatestMoment[]> {
  const path = `v1/connections/${encodeURIComponent(account.connectionId)}/media`;
  const payload = await socialFanoutRequest<InstagramMediaResponse>(path, { limit: '8' });
  if (payload.ok !== true || !Array.isArray(payload.media)) return [];

  const moments = await Promise.all(
    payload.media.map((media) => mapInstagramMoment(account, media)),
  );
  return moments.filter((moment): moment is LatestMoment => moment !== null);
}

async function mapInstagramMoment(
  account: InstagramAccount,
  media: InstagramMedia,
): Promise<LatestMoment | null> {
  const id = cleanText(media.id, 120);
  const permalink = safeInstagramPermalink(media.permalink);
  const asset = instagramDisplayAssetUrl(media);
  if (!/^\d{1,64}$/.test(id) || !permalink || !asset) return null;

  const caption = cleanText(media.caption, 600) || `A fresh Maui moment from ${account.handle}.`;
  const username = cleanText(media.username, 80).replace(/^@/, '');
  const mediaType = cleanText(media.mediaType, 40).toUpperCase();
  const signature = await signInstagramMedia(account, id);

  return {
    id: `instagram-${account.key}-${id}`,
    image: `/api/instagram-image?account=${encodeURIComponent(account.key)}&media=${encodeURIComponent(id)}&signature=${encodeURIComponent(signature)}`,
    alt: cleanText(media.altText, 300) || caption,
    caption,
    href: permalink,
    account: `@${username || account.handle.replace(/^@/, '')}`,
    service: account.serviceLabel,
    timestamp: normalizedTimestamp(media.timestamp),
    mediaType:
      mediaType === 'VIDEO' || mediaType === 'CAROUSEL_ALBUM' || mediaType === 'IMAGE'
        ? mediaType
        : undefined,
  };
}

function timestampValue(timestamp?: string) {
  if (!timestamp) return 0;
  const value = Date.parse(timestamp);
  return Number.isNaN(value) ? 0 : value;
}

function normalizedTimestamp(value: unknown): string | undefined {
  const candidate = cleanText(value, 80);
  if (!candidate) return undefined;
  const milliseconds = Date.parse(candidate);
  return Number.isNaN(milliseconds) ? undefined : new Date(milliseconds).toISOString();
}
