import type { LatestMoment } from '../shared/site-content.js';
import {
  configuredInstagramAccounts,
  InstagramRequestError,
  instagramGraphRequest,
  safeInstagramAssetUrl,
  safeInstagramPermalink,
  signInstagramMedia,
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
const BASE_MEDIA_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_url',
  'permalink',
  'thumbnail_url',
  'timestamp',
  'username',
  'children{media_type,media_url,thumbnail_url}',
].join(',');
const MEDIA_FIELDS_WITH_ALT = `${BASE_MEDIA_FIELDS},alt_text`;

interface InstagramMediaChild {
  media_type?: unknown;
  media_url?: unknown;
  thumbnail_url?: unknown;
}

interface InstagramMedia {
  id?: unknown;
  caption?: unknown;
  media_type?: unknown;
  media_url?: unknown;
  permalink?: unknown;
  thumbnail_url?: unknown;
  timestamp?: unknown;
  username?: unknown;
  alt_text?: unknown;
  children?: { data?: InstagramMediaChild[] };
}

interface InstagramMediaResponse {
  data?: InstagramMedia[];
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
        const status = error instanceof InstagramRequestError ? error.status : 0;
        console.error('Instagram feed request failed', { account: account.key, status });
        return [];
      }
    }),
  );

  const moments = results
    .flat()
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
    accounts: accounts.map((account) => account.handle),
    moments,
  });
}

async function latestAccountMoments(account: InstagramAccount): Promise<LatestMoment[]> {
  const path = `${encodeURIComponent(account.userId)}/media`;
  let payload: InstagramMediaResponse;

  try {
    payload = await instagramGraphRequest<InstagramMediaResponse>(account, path, {
      fields: MEDIA_FIELDS_WITH_ALT,
      limit: '8',
    });
  } catch (error) {
    if (!(error instanceof InstagramRequestError) || error.status !== 400) throw error;
    payload = await instagramGraphRequest<InstagramMediaResponse>(account, path, {
      fields: BASE_MEDIA_FIELDS,
      limit: '8',
    });
  }

  const moments = await Promise.all(
    (Array.isArray(payload.data) ? payload.data : []).map((media) =>
      mapInstagramMoment(account, media),
    ),
  );
  return moments.filter((moment): moment is LatestMoment => moment !== null);
}

async function mapInstagramMoment(
  account: InstagramAccount,
  media: InstagramMedia,
): Promise<LatestMoment | null> {
  const id = cleanText(media.id, 120);
  const permalink = safeInstagramPermalink(media.permalink);
  const firstChild = Array.isArray(media.children?.data) ? media.children.data[0] : undefined;
  const asset =
    safeInstagramAssetUrl(media.thumbnail_url) ||
    safeInstagramAssetUrl(media.media_url) ||
    safeInstagramAssetUrl(firstChild?.thumbnail_url) ||
    safeInstagramAssetUrl(firstChild?.media_url);
  if (!id || !permalink || !asset) return null;

  const caption = cleanText(media.caption, 600) || `A fresh Maui moment from ${account.handle}.`;
  const username = cleanText(media.username, 80).replace(/^@/, '');
  const mediaType = cleanText(media.media_type, 40).toUpperCase();
  const signature = await signInstagramMedia(account, id);

  return {
    id: `instagram-${account.key}-${id}`,
    image: `/api/instagram-image?account=${encodeURIComponent(account.key)}&media=${encodeURIComponent(id)}&signature=${encodeURIComponent(signature)}`,
    alt: cleanText(media.alt_text, 300) || caption,
    caption,
    href: permalink,
    account: `@${username || account.handle.replace(/^@/, '')}`,
    service: account.serviceLabel,
    timestamp: cleanText(media.timestamp, 80) || undefined,
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
