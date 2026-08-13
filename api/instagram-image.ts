import {
  configuredInstagramAccount,
  instagramDisplayAssetUrl,
  safeInstagramAssetUrl,
  socialFanoutRequest,
  verifyInstagramMediaSignature,
} from '../server/instagram.js';
import {
  checkRateLimit,
  cleanText,
  getClientIp,
  methodNotAllowed,
  type ApiRequest,
  type ApiResponse,
} from '../server/http.js';

const IMAGE_CACHE_HEADER = 'public, s-maxage=86400, stale-while-revalidate=604800';
const FAILURE_CACHE_HEADER = 'public, s-maxage=60, stale-while-revalidate=300';
const MAX_IMAGE_BYTES = 4_000_000;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

interface InstagramMediaAsset {
  mediaType?: unknown;
  mediaUrl?: unknown;
  thumbnailUrl?: unknown;
  children?: Array<{
    mediaType?: unknown;
    mediaUrl?: unknown;
    thumbnailUrl?: unknown;
  }>;
}

interface InstagramMediaAssetResponse {
  ok?: unknown;
  media?: InstagramMediaAsset;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') return methodNotAllowed(response, ['GET']);
  if (!hasExactScalarQuery(request.query, ['account', 'media', 'signature'])) {
    return invalidImageRequest(response);
  }

  const accountKey = cleanText(request.query?.account, 40);
  const mediaId = cleanText(request.query?.media, 120);
  const signature = cleanText(request.query?.signature, 200);
  const account = configuredInstagramAccount(accountKey);

  const limit = checkRateLimit(`instagram-image:${getClientIp(request)}`, 120, 60_000);
  if (!limit.allowed) {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Retry-After', String(limit.retryAfterSeconds));
    return response.status(429).end();
  }

  if (
    !account ||
    !/^\d{1,64}$/.test(mediaId) ||
    !signature ||
    !hasCanonicalImageQuery(request.url, accountKey, mediaId, signature)
  ) {
    return invalidImageRequest(response);
  }
  if (!(await verifyInstagramMediaSignature(account, mediaId, signature))) {
    return invalidImageRequest(response);
  }

  try {
    const mediaPath = `v1/connections/${encodeURIComponent(account.connectionId)}/media/${encodeURIComponent(mediaId)}`;
    const payload = await socialFanoutRequest<InstagramMediaAssetResponse>(mediaPath);
    if (payload.ok !== true) return imageNotFound(response);
    const media = payload.media;
    if (!media) return imageNotFound(response);
    const assetUrl = instagramDisplayAssetUrl(media);
    if (!assetUrl) return imageNotFound(response);

    const upstream = await fetchInstagramAsset(assetUrl);

    try {
      const contentType = upstream.response.headers.get('content-type')?.split(';')[0]?.trim() || '';
      const declaredLength = Number(upstream.response.headers.get('content-length'));
      if (
        !upstream.response.ok ||
        !ALLOWED_IMAGE_TYPES.has(contentType) ||
        (Number.isFinite(declaredLength) && declaredLength > MAX_IMAGE_BYTES)
      ) {
        await upstream.response.body?.cancel();
        return imageNotFound(response);
      }

      const bytes = await readLimitedImage(upstream.response);
      if (!bytes) return imageNotFound(response);

      response.setHeader('Cache-Control', IMAGE_CACHE_HEADER);
      response.setHeader('Content-Type', contentType);
      response.setHeader('Content-Length', String(bytes.byteLength));
      response.setHeader('X-Content-Type-Options', 'nosniff');
      return response.status(200).end(bytes);
    } finally {
      upstream.release();
    }
  } catch (error) {
    console.error('Instagram image proxy failed', { account: accountKey });
    return imageNotFound(response);
  }
}

function hasExactScalarQuery(
  query: Record<string, string | string[] | undefined> | undefined,
  allowed: string[],
) {
  const keys = Object.keys(query ?? {});
  return (
    keys.length === allowed.length &&
    keys.every((key) => allowed.includes(key) && typeof query?.[key] === 'string')
  );
}

function hasCanonicalImageQuery(
  requestUrl: string | undefined,
  accountKey: string,
  mediaId: string,
  signature: string,
) {
  if (!requestUrl) return false;

  try {
    const actual = new URL(requestUrl, 'https://raining-entertainment.invalid').search;
    const expected = `?account=${encodeURIComponent(accountKey)}&media=${encodeURIComponent(mediaId)}&signature=${encodeURIComponent(signature)}`;
    return actual === expected;
  } catch {
    return false;
  }
}

function imageNotFound(response: ApiResponse) {
  response.setHeader('Cache-Control', FAILURE_CACHE_HEADER);
  return response.status(404).end();
}

function invalidImageRequest(response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');
  return response.status(404).end();
}

async function fetchInstagramAsset(initialUrl: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  let currentUrl = initialUrl;

  try {
    for (let redirectCount = 0; redirectCount <= 3; redirectCount += 1) {
      const response = await fetch(currentUrl, {
        headers: { Accept: 'image/avif,image/webp,image/*,*/*;q=0.8' },
        redirect: 'manual',
        signal: controller.signal,
      });

      if (response.status < 300 || response.status >= 400) {
        return { response, release: () => clearTimeout(timeout) };
      }
      const location = response.headers.get('location');
      if (!location) return { response, release: () => clearTimeout(timeout) };
      const nextUrl = safeInstagramAssetUrl(new URL(location, currentUrl).toString());
      if (!nextUrl) throw new Error('Instagram asset redirected outside Meta hosts');
      await response.body?.cancel();
      currentUrl = nextUrl;
    }

    throw new Error('Instagram asset exceeded redirect limit');
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function readLimitedImage(response: Response): Promise<Uint8Array | null> {
  if (!response.body) return null;

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_IMAGE_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  if (total === 0) return null;
  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}
