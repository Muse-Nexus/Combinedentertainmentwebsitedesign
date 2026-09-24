import { optionalEnvironmentValue } from './airtable.js';
import { safeSocialFanoutBaseUrl } from './instagram.js';

export const DELEGATED_INVITE_TYPE = 'delegated_instagram_invite' as const;
export const INSTAGRAM_INVITE_HANDLES = [
  'magicbrent',
  'cirquejolie',
  'gameshowfanatics',
] as const;

export type InstagramInviteHandle = (typeof INSTAGRAM_INVITE_HANDLES)[number];

const INVITE_PATH = '/v1/connections/instagram/start';
const SOCIALFANOUT_ORIGIN = 'https://socialfanout.com';
const INVITE_TTL_MAX_MS = 11 * 60 * 1_000;
const INVITE_TTL_MIN_MS = 7 * 60 * 1_000;
const OAUTH_STATE_PATTERN = /^sfoauth_[A-Za-z0-9_-]{43}$/;
const MAX_RESPONSE_BYTES = 16_000;

interface DelegatedInviteResponse {
  ok?: unknown;
  type?: unknown;
  provider?: unknown;
  delegated?: unknown;
  expectedHandle?: unknown;
  authorizationUrl?: unknown;
  expiresAt?: unknown;
  state?: unknown;
}

export interface DelegatedInstagramInvite {
  type: typeof DELEGATED_INVITE_TYPE;
  handle: `@${InstagramInviteHandle}`;
  authorizationUrl: string;
  expiresAt: string;
}

export class InstagramInviteConfigurationError extends Error {
  constructor() {
    super('Delegated Instagram invitations are not configured');
    this.name = 'InstagramInviteConfigurationError';
  }
}

export class InstagramInviteRequestError extends Error {
  status: number;

  constructor(status: number) {
    super(`SocialFanout delegated invitation request failed with status ${status}`);
    this.name = 'InstagramInviteRequestError';
    this.status = status;
  }
}

export class InstagramInviteResponseError extends Error {
  constructor() {
    super('SocialFanout returned an invalid delegated invitation');
    this.name = 'InstagramInviteResponseError';
  }
}

export function normalizeInstagramInviteHandle(value: unknown): InstagramInviteHandle | undefined {
  if (typeof value !== 'string') return undefined;
  const canonical = value.trim().toLowerCase().replace(/^@/, '');
  return INSTAGRAM_INVITE_HANDLES.find((handle) => handle === canonical);
}

export async function createDelegatedInstagramInvite(input: {
  handle: InstagramInviteHandle;
  gmailMessageId: string;
  now?: Date;
}): Promise<DelegatedInstagramInvite> {
  const configuration = delegatedInviteConfiguration();
  if (!configuration) throw new InstagramInviteConfigurationError();

  const url = new URL(INVITE_PATH, configuration.baseUrl);
  url.searchParams.set('useCase', 'publishing');
  url.searchParams.set('delegateTo', `@${input.handle}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const upstream = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Idempotency-Key': `raining-instagram-gmail:${input.gmailMessageId}`,
        'x-api-key': configuration.apiKey,
      },
      redirect: 'error',
      signal: controller.signal,
    });
    if (!upstream.ok) throw new InstagramInviteRequestError(upstream.status);
    const mediaType = upstream.headers.get('content-type')
      ?.split(';', 1)[0]
      ?.trim()
      .toLowerCase();
    if (mediaType !== 'application/json') {
      throw new InstagramInviteResponseError();
    }
    const responseLength = Number(upstream.headers.get('content-length'));
    if (Number.isFinite(responseLength) && responseLength > MAX_RESPONSE_BYTES) {
      throw new InstagramInviteResponseError();
    }

    const serialized = await upstream.text();
    if (Buffer.byteLength(serialized, 'utf8') > MAX_RESPONSE_BYTES) {
      throw new InstagramInviteResponseError();
    }

    let payload: DelegatedInviteResponse;
    try {
      const parsed: unknown = JSON.parse(serialized);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('invalid response shape');
      }
      payload = parsed as DelegatedInviteResponse;
    } catch {
      throw new InstagramInviteResponseError();
    }

    return validatedInvite(payload, input.handle, configuration.baseUrl, input.now ?? new Date());
  } finally {
    clearTimeout(timeout);
  }
}

function delegatedInviteConfiguration() {
  // This deliberate contract gate prevents an older SocialFanout deployment
  // from returning an owner-session handoff when delegateTo is unsupported.
  if (optionalEnvironmentValue('SOCIALFANOUT_DELEGATED_INVITE_CONTRACT') !== 'v1') {
    return undefined;
  }

  const apiKey = optionalEnvironmentValue('SOCIALFANOUT_API_KEY');
  const baseUrl = safeSocialFanoutBaseUrl(
    optionalEnvironmentValue('SOCIALFANOUT_API_URL') || 'https://socialfanout.com',
  );
  // This endpoint transmits a reusable API key. Do not let a configurable URL
  // turn a typo or poisoned environment value into credential exfiltration.
  if (!apiKey || baseUrl !== SOCIALFANOUT_ORIGIN) return undefined;
  return { apiKey, baseUrl };
}

function validatedInvite(
  payload: DelegatedInviteResponse,
  handle: InstagramInviteHandle,
  baseUrl: string,
  now: Date,
): DelegatedInstagramInvite {
  const expectedHandle = `@${handle}` as const;
  if (
    payload.ok !== true ||
    payload.type !== DELEGATED_INVITE_TYPE ||
    payload.provider !== 'instagram' ||
    payload.delegated !== true ||
    payload.expectedHandle !== expectedHandle ||
    typeof payload.authorizationUrl !== 'string' ||
    typeof payload.expiresAt !== 'string'
  ) {
    throw new InstagramInviteResponseError();
  }

  let authorizationUrl: URL;
  try {
    authorizationUrl = new URL(payload.authorizationUrl);
  } catch {
    throw new InstagramInviteResponseError();
  }

  const allowedOrigin = new URL(baseUrl).origin;
  const entries = Array.from(authorizationUrl.searchParams.entries());
  const state = authorizationUrl.searchParams.get('state');
  if (
    authorizationUrl.protocol !== 'https:' ||
    authorizationUrl.origin !== allowedOrigin ||
    authorizationUrl.pathname !== '/v1/oauth/authorize' ||
    authorizationUrl.username ||
    authorizationUrl.password ||
    authorizationUrl.hash ||
    entries.length !== 1 ||
    entries[0]?.[0] !== 'state' ||
    !state ||
    !OAUTH_STATE_PATTERN.test(state) ||
    payload.state !== state
  ) {
    throw new InstagramInviteResponseError();
  }

  const expiresAt = Date.parse(payload.expiresAt);
  const remaining = expiresAt - now.getTime();
  if (
    !Number.isFinite(expiresAt) ||
    new Date(expiresAt).toISOString() !== payload.expiresAt ||
    remaining < INVITE_TTL_MIN_MS ||
    remaining > INVITE_TTL_MAX_MS
  ) {
    throw new InstagramInviteResponseError();
  }

  return {
    type: DELEGATED_INVITE_TYPE,
    handle: expectedHandle,
    authorizationUrl: authorizationUrl.toString(),
    expiresAt: payload.expiresAt,
  };
}
