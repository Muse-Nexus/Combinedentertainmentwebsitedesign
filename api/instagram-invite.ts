import {
  createDelegatedInstagramInvite,
  InstagramInviteConfigurationError,
  InstagramInviteRequestError,
  InstagramInviteResponseError,
  normalizeInstagramInviteHandle,
} from '../server/instagram-invite.js';
import {
  checkRateLimit,
  getClientIp,
  hasSameOrigin,
  methodNotAllowed,
  parseBody,
  type ApiRequest,
  type ApiResponse,
} from '../server/http.js';

const MAX_BODY_BYTES = 1_000;
const GMAIL_MESSAGE_ID_PATTERN = /^[a-f0-9]{16,32}$/;
const AUTOMATION_INTENT = 'instagram-delegated-invite-v1';
const ORIGINAL_GMAIL_THREAD_ID = '1a0d13d83b1268b8';
const ORIGINAL_SENT_MESSAGE_ID = '1a0d13de2bcccfa5';
const SENDER_HANDLES = {
  'brentonkeith@magicbrent.com': ['magicbrent', 'gameshowfanatics'],
  'cirquejolie@gmail.com': ['cirquejolie'],
} as const;

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (request.method !== 'POST') return methodNotAllowed(response, ['POST']);

  // This broker deliberately relies on Vercel Preview Deployment Protection.
  // Static workflow headers below are scope guards, not authentication. The
  // protected deployment must not have Shareable Links or external access.
  // It must never become a public production API for minting invitations.
  if (process.env.VERCEL_ENV !== 'preview') {
    return response.status(404).json({ ok: false, code: 'not_found' });
  }

  if (!hasSameOrigin(request)) {
    return response.status(403).json({ ok: false, code: 'origin_not_allowed' });
  }

  if (
    Object.keys(request.query ?? {}).length > 0 ||
    headerValue(request, 'content-type')?.split(';', 1)[0]?.trim().toLowerCase() !==
      'application/json' ||
    headerValue(request, 'x-raining-automation-intent') !== AUTOMATION_INTENT ||
    headerValue(request, 'x-raining-gmail-thread-id') !== ORIGINAL_GMAIL_THREAD_ID
  ) {
    return response.status(400).json({ ok: false, code: 'invalid_request' });
  }

  const contentLength = Number(headerValue(request, 'content-length'));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return response.status(413).json({ ok: false, code: 'request_too_large' });
  }
  if (typeof request.body === 'string' && Buffer.byteLength(request.body, 'utf8') > MAX_BODY_BYTES) {
    return response.status(413).json({ ok: false, code: 'request_too_large' });
  }

  const body = parseBody(request.body);
  if (!body || !hasExactKeys(body, ['gmailMessageId', 'handle', 'senderEmail'])) {
    return response.status(400).json({ ok: false, code: 'invalid_request' });
  }
  if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES) {
    return response.status(413).json({ ok: false, code: 'request_too_large' });
  }

  const gmailMessageId =
    typeof body.gmailMessageId === 'string' ? body.gmailMessageId : '';
  const senderEmail = typeof body.senderEmail === 'string' ? body.senderEmail : '';
  const handle = normalizeInstagramInviteHandle(body.handle);
  const allowedSenderHandles = SENDER_HANDLES[senderEmail as keyof typeof SENDER_HANDLES];
  if (
    !GMAIL_MESSAGE_ID_PATTERN.test(gmailMessageId) ||
    gmailMessageId === ORIGINAL_SENT_MESSAGE_ID ||
    gmailMessageId === ORIGINAL_GMAIL_THREAD_ID ||
    !handle ||
    !allowedSenderHandles?.some((allowedHandle) => allowedHandle === handle)
  ) {
    return response.status(400).json({ ok: false, code: 'validation_failed' });
  }

  const ip = getClientIp(request);
  const generalLimit = checkRateLimit(`instagram-invite:${ip}`, 6, 10 * 60 * 1_000);
  const messageLimit = checkRateLimit(
    `instagram-invite-message:${gmailMessageId}:${ip}`,
    2,
    10 * 60 * 1_000,
  );
  if (!generalLimit.allowed || !messageLimit.allowed) {
    const retryAfterSeconds = Math.max(
      generalLimit.retryAfterSeconds,
      messageLimit.retryAfterSeconds,
    );
    response.setHeader('Retry-After', String(retryAfterSeconds));
    return response.status(429).json({ ok: false, code: 'rate_limited' });
  }

  try {
    const invite = await createDelegatedInstagramInvite({ handle, gmailMessageId });
    return response.status(201).json({
      ok: true,
      ...invite,
      reference: `SF-IG-${gmailMessageId}`,
    });
  } catch (error) {
    if (error instanceof InstagramInviteConfigurationError) {
      return response.status(503).json({
        ok: false,
        code: 'invite_broker_unavailable',
        reason: 'not_configured',
      });
    }

    const upstreamStatus = error instanceof InstagramInviteRequestError ? error.status : 0;
    const reason = error instanceof InstagramInviteResponseError
      ? 'invalid_delegated_invite'
      : 'upstream_unavailable';
    console.error('SocialFanout delegated invite request failed', {
      status: upstreamStatus,
      reason,
    });
    return response.status(502).json({
      ok: false,
      code: 'invite_broker_unavailable',
      reason,
    });
  }
}

function headerValue(request: ApiRequest, name: string): string | undefined {
  const value = request.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

function hasExactKeys(body: Record<string, unknown>, expected: string[]): boolean {
  const actual = Object.keys(body).sort();
  return actual.length === expected.length &&
    expected.slice().sort().every((key, index) => key === actual[index]);
}
