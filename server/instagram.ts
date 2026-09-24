import { optionalEnvironmentValue } from './airtable.js';

export type InstagramAccountKey = 'magicbrent' | 'cirquejolie' | 'gameshowfanatics';

export interface InstagramAccount {
  key: InstagramAccountKey;
  handle: string;
  label: string;
  profileUrl: string;
  serviceLabel: string;
  connectionId: string;
}

interface InstagramAccountDefinition {
  key: InstagramAccountKey;
  handle: string;
  label: string;
  profileUrl: string;
  serviceLabel: string;
  connectionIdEnvironmentName: string;
}

const ACCOUNT_DEFINITIONS: InstagramAccountDefinition[] = [
  {
    key: 'magicbrent',
    handle: '@magicbrent',
    label: "Brenton Keith & His Bag O' Tricks",
    profileUrl: 'https://www.instagram.com/magicbrent/',
    serviceLabel: 'Magic · Game Shows · Casino',
    connectionIdEnvironmentName: 'SOCIALFANOUT_MAGICBRENT_CONNECTION_ID',
  },
  {
    key: 'cirquejolie',
    handle: '@cirquejolie',
    label: 'Cirque Jolie',
    profileUrl: 'https://www.instagram.com/cirquejolie/',
    serviceLabel: 'Stilts · LED · Balloons',
    connectionIdEnvironmentName: 'SOCIALFANOUT_CIRQUEJOLIE_CONNECTION_ID',
  },
  {
    key: 'gameshowfanatics',
    handle: '@gameshowfanatics',
    label: 'Game Show Fanatics',
    profileUrl: 'https://www.instagram.com/gameshowfanatics/',
    serviceLabel: 'Game Shows · Casino · Corporate',
    connectionIdEnvironmentName: 'SOCIALFANOUT_GAMESHOWFANATICS_CONNECTION_ID',
  },
];

export class SocialFanoutRequestError extends Error {
  status: number;

  constructor(status: number) {
    super(`SocialFanout request failed with status ${status}`);
    this.name = 'SocialFanoutRequestError';
    this.status = status;
  }
}

export function configuredInstagramAccounts(): InstagramAccount[] {
  if (!socialFanoutConfiguration()) return [];

  return ACCOUNT_DEFINITIONS.map((definition) => {
    const connectionId = optionalEnvironmentValue(definition.connectionIdEnvironmentName);
    if (!connectionId || !isConnectionId(connectionId)) return null;

    return {
      key: definition.key,
      handle: definition.handle,
      label: definition.label,
      profileUrl: definition.profileUrl,
      serviceLabel: definition.serviceLabel,
      connectionId,
    };
  }).filter((account): account is InstagramAccount => account !== null);
}

export function configuredInstagramAccount(key: string): InstagramAccount | undefined {
  return configuredInstagramAccounts().find((account) => account.key === key);
}

export async function signInstagramMedia(account: InstagramAccount, mediaId: string) {
  const configuration = socialFanoutConfiguration();
  if (!configuration) throw new Error('SocialFanout Instagram feed is not configured');

  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(configuration.signingSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${account.key}:${account.connectionId}:${mediaId}`),
  );

  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function verifyInstagramMediaSignature(
  account: InstagramAccount,
  mediaId: string,
  signature: string,
) {
  if (!/^[a-f0-9]{64}$/.test(signature)) return false;

  const expected = await signInstagramMedia(account, mediaId);
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  }
  return difference === 0;
}

export async function socialFanoutRequest<T>(
  path: string,
  parameters: Record<string, string> = {},
): Promise<T> {
  const configuration = socialFanoutConfiguration();
  if (!configuration) throw new Error('SocialFanout Instagram feed is not configured');
  const normalizedPath = path.replace(/^\/+/, '');
  const url = new URL(normalizedPath, `${configuration.baseUrl}/`);
  Object.entries(parameters).forEach(([name, value]) => url.searchParams.set(name, value));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'x-api-key': configuration.apiKey,
      },
      redirect: 'error',
      signal: controller.signal,
    });
    if (!response.ok) throw new SocialFanoutRequestError(response.status);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function safeInstagramPermalink(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (url.protocol !== 'https:') return undefined;
    if (hostname !== 'instagram.com' && !hostname.endsWith('.instagram.com')) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function safeInstagramAssetUrl(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (url.protocol !== 'https:') return undefined;
    if (
      !hostname.endsWith('.cdninstagram.com') &&
      !hostname.endsWith('.fbcdn.net') &&
      !hostname.endsWith('.fbsbx.com')
    ) {
      return undefined;
    }
    return url.toString();
  } catch {
    return undefined;
  }
}

interface InstagramDisplayAssetCandidate {
  mediaType?: unknown;
  mediaUrl?: unknown;
  thumbnailUrl?: unknown;
}

/** Select an image-safe display asset consistently for list and proxy paths. */
export function instagramDisplayAssetUrl(
  media: InstagramDisplayAssetCandidate & { children?: InstagramDisplayAssetCandidate[] },
): string | undefined {
  const candidates = [media, ...(Array.isArray(media.children) ? media.children : [])];

  for (const candidate of candidates) {
    const mediaType = typeof candidate.mediaType === 'string' ? candidate.mediaType.toUpperCase() : '';
    const thumbnail = safeInstagramAssetUrl(candidate.thumbnailUrl);
    if (thumbnail) return thumbnail;
    if (mediaType !== 'VIDEO') {
      const mediaUrl = safeInstagramAssetUrl(candidate.mediaUrl);
      if (mediaUrl) return mediaUrl;
    }
  }

  return undefined;
}

function socialFanoutConfiguration() {
  const apiKey = optionalEnvironmentValue('SOCIALFANOUT_API_KEY');
  const signingSecret = optionalEnvironmentValue('INSTAGRAM_FEED_SIGNING_SECRET');
  const baseUrl = safeSocialFanoutBaseUrl(
    optionalEnvironmentValue('SOCIALFANOUT_API_URL') || 'https://socialfanout.com',
  );
  if (!apiKey || !signingSecret || signingSecret.length < 32 || !baseUrl) return undefined;
  return { apiKey, signingSecret, baseUrl };
}

export function safeSocialFanoutBaseUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
    if (url.protocol !== 'https:' && !(isLocal && url.protocol === 'http:')) return undefined;
    if (url.username || url.password || url.search || url.hash) return undefined;
    url.pathname = url.pathname.replace(/\/+$/, '');
    return url.toString().replace(/\/$/, '');
  } catch {
    return undefined;
  }
}

function isConnectionId(value: string) {
  return /^[A-Za-z0-9][A-Za-z0-9_-]{5,127}$/.test(value);
}
