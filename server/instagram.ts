import { optionalEnvironmentValue } from './airtable.js';

export type InstagramAccountKey = 'magicbrent' | 'cirquejolie';

export interface InstagramAccount {
  key: InstagramAccountKey;
  handle: string;
  label: string;
  profileUrl: string;
  serviceLabel: string;
  userId: string;
  accessToken: string;
}

interface InstagramAccountDefinition {
  key: InstagramAccountKey;
  handle: string;
  label: string;
  profileUrl: string;
  serviceLabel: string;
  userIdEnvironmentName: string;
  accessTokenEnvironmentName: string;
}

const ACCOUNT_DEFINITIONS: InstagramAccountDefinition[] = [
  {
    key: 'magicbrent',
    handle: '@magicbrent',
    label: "Brenton Keith & His Bag O' Tricks",
    profileUrl: 'https://www.instagram.com/magicbrent/',
    serviceLabel: 'Magic · Game Shows · Casino',
    userIdEnvironmentName: 'INSTAGRAM_MAGICBRENT_USER_ID',
    accessTokenEnvironmentName: 'INSTAGRAM_MAGICBRENT_ACCESS_TOKEN',
  },
  {
    key: 'cirquejolie',
    handle: '@cirquejolie',
    label: 'Cirque Jolie',
    profileUrl: 'https://www.instagram.com/cirquejolie/',
    serviceLabel: 'Stilts · LED · Balloons',
    userIdEnvironmentName: 'INSTAGRAM_CIRQUEJOLIE_USER_ID',
    accessTokenEnvironmentName: 'INSTAGRAM_CIRQUEJOLIE_ACCESS_TOKEN',
  },
];

export class InstagramRequestError extends Error {
  status: number;

  constructor(status: number) {
    super(`Instagram request failed with status ${status}`);
    this.name = 'InstagramRequestError';
    this.status = status;
  }
}

export function configuredInstagramAccounts(): InstagramAccount[] {
  return ACCOUNT_DEFINITIONS.map((definition) => {
    const userId = optionalEnvironmentValue(definition.userIdEnvironmentName);
    const accessToken = optionalEnvironmentValue(definition.accessTokenEnvironmentName);
    if (!userId || !accessToken) return null;

    return {
      key: definition.key,
      handle: definition.handle,
      label: definition.label,
      profileUrl: definition.profileUrl,
      serviceLabel: definition.serviceLabel,
      userId,
      accessToken,
    };
  }).filter((account): account is InstagramAccount => account !== null);
}

export function configuredInstagramAccount(key: string): InstagramAccount | undefined {
  return configuredInstagramAccounts().find((account) => account.key === key);
}

export async function signInstagramMedia(account: InstagramAccount, mediaId: string) {
  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(account.accessToken),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${account.key}:${mediaId}`),
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

export async function instagramGraphRequest<T>(
  account: InstagramAccount,
  path: string,
  parameters: Record<string, string>,
): Promise<T> {
  const host = instagramGraphHost();
  const version = instagramGraphVersion();
  const normalizedPath = path.replace(/^\/+/, '');
  const url = new URL(`https://${host}/${version}/${normalizedPath}`);

  Object.entries(parameters).forEach(([name, value]) => url.searchParams.set(name, value));
  url.searchParams.set('access_token', account.accessToken);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new InstagramRequestError(response.status);
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

function instagramGraphHost() {
  const configured = optionalEnvironmentValue('INSTAGRAM_GRAPH_HOST')?.toLowerCase();
  return configured === 'graph.instagram.com' ? configured : 'graph.facebook.com';
}

function instagramGraphVersion() {
  const configured = optionalEnvironmentValue('INSTAGRAM_GRAPH_API_VERSION');
  if (!configured) return 'v25.0';
  const normalized = configured.startsWith('v') ? configured : `v${configured}`;
  return /^v\d+\.\d+$/.test(normalized) ? normalized : 'v25.0';
}
