import assert from 'node:assert/strict';
import test from 'node:test';
import instagramInviteHandler from '../api/instagram-invite.js';
import type { ApiRequest, ApiResponse } from '../server/http.js';

const ENV_KEYS = [
  'SOCIALFANOUT_API_URL',
  'SOCIALFANOUT_API_KEY',
  'SOCIALFANOUT_DELEGATED_INVITE_CONTRACT',
  'VERCEL_ENV',
] as const;

const STATE = `sfoauth_${'a'.repeat(43)}`;
const GMAIL_THREAD_ID = '1a0d13d83b1268b8';
const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
let requestNumber = 0;

type CapturedResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body?: unknown;
};

function responseCapture(): { response: ApiResponse; captured: CapturedResponse } {
  const captured: CapturedResponse = { statusCode: 200, headers: {} };
  const response: ApiResponse = {
    status(code) {
      captured.statusCode = code;
      return response;
    },
    setHeader(name, value) {
      captured.headers[name.toLowerCase()] = value;
      return response;
    },
    json(value) {
      captured.body = value;
    },
    end(value) {
      captured.body = value;
    },
  };
  return { response, captured };
}

function request(input: Partial<ApiRequest> = {}): ApiRequest {
  requestNumber += 1;
  return {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': `invite-test-${requestNumber}`,
      'x-raining-automation-intent': 'instagram-delegated-invite-v1',
      'x-raining-gmail-thread-id': GMAIL_THREAD_ID,
    },
    query: {},
    body: {
      gmailMessageId: '1a0d13de2bcccfa6',
      handle: '@magicbrent',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
    ...input,
  };
}

function configureEnvironment() {
  process.env.VERCEL_ENV = 'preview';
  process.env.SOCIALFANOUT_API_URL = 'https://socialfanout.com';
  process.env.SOCIALFANOUT_API_KEY = 'website-private-key';
  process.env.SOCIALFANOUT_DELEGATED_INVITE_CONTRACT = 'v1';
}

function validUpstreamInvite(overrides: Record<string, unknown> = {}) {
  const expiresAt = new Date(Date.now() + 9 * 60 * 1_000).toISOString();
  return {
    ok: true,
    type: 'delegated_instagram_invite',
    provider: 'instagram',
    delegated: true,
    expectedHandle: '@magicbrent',
    authorizationUrl: `https://socialfanout.com/v1/oauth/authorize?state=${STATE}`,
    state: STATE,
    expiresAt,
    ...overrides,
  };
}

test.afterEach(() => {
  ENV_KEYS.forEach((key) => delete process.env[key]);
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});

test('creates a narrowly scoped delegated invite without exposing the API key', async () => {
  configureEnvironment();
  const calls: Array<{ url: URL; init?: RequestInit }> = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: new URL(String(input)), init });
    return Response.json(validUpstreamInvite());
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request(), response);

  assert.equal(captured.statusCode, 201);
  assert.equal(captured.headers['cache-control'], 'no-store');
  assert.equal(captured.headers['x-content-type-options'], 'nosniff');
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.url.origin, 'https://socialfanout.com');
  assert.equal(calls[0]?.url.pathname, '/v1/connections/instagram/start');
  assert.equal(calls[0]?.url.searchParams.get('useCase'), 'publishing');
  assert.equal(calls[0]?.url.searchParams.get('delegateTo'), '@magicbrent');
  const headers = calls[0]?.init?.headers as Record<string, string>;
  assert.equal(headers['x-api-key'], 'website-private-key');
  assert.equal(headers['Idempotency-Key'], 'raining-instagram-gmail:1a0d13de2bcccfa6');

  const serialized = JSON.stringify(captured.body);
  assert.doesNotMatch(serialized, /website-private-key|x-api-key|\"state\"/);
  assert.deepEqual(captured.body, {
    ok: true,
    type: 'delegated_instagram_invite',
    handle: '@magicbrent',
    authorizationUrl: `https://socialfanout.com/v1/oauth/authorize?state=${STATE}`,
    expiresAt: (captured.body as { expiresAt: string }).expiresAt,
    reference: 'SF-IG-1a0d13de2bcccfa6',
  });
});

test('is POST-only and returns no-store errors', async () => {
  configureEnvironment();
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return Response.json(validUpstreamInvite());
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request({ method: 'GET' }), response);

  assert.equal(captured.statusCode, 405);
  assert.equal(captured.headers.allow, 'POST');
  assert.equal(captured.headers['cache-control'], 'no-store');
  assert.equal(calls, 0);
});

test('fails closed outside a Vercel Preview deployment', async () => {
  configureEnvironment();
  process.env.VERCEL_ENV = 'production';
  globalThis.fetch = (async () => {
    throw new Error('should not call SocialFanout');
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request(), response);

  assert.equal(captured.statusCode, 404);
  assert.deepEqual(captured.body, { ok: false, code: 'not_found' });
});

test('requires the exact automation intent, Gmail thread, content type, and body keys', async () => {
  configureEnvironment();
  globalThis.fetch = (async () => {
    throw new Error('should not call SocialFanout');
  }) as typeof fetch;
  const cases: ApiRequest[] = [
    request({ headers: { 'content-type': 'text/plain' } }),
    request({
      headers: {
        'content-type': 'application/json',
        'x-raining-automation-intent': 'different-task',
        'x-raining-gmail-thread-id': GMAIL_THREAD_ID,
      },
    }),
    request({
      headers: {
        'content-type': 'application/json',
        'x-raining-automation-intent': 'instagram-delegated-invite-v1',
        'x-raining-gmail-thread-id': 'different-thread',
      },
    }),
    request({
      body: {
        gmailMessageId: '1a0d13de2bcccfa6',
        handle: '@magicbrent',
        senderEmail: 'brentonkeith@magicbrent.com',
        anotherField: true,
      },
    }),
    request({ query: { unexpected: 'value' } }),
  ];

  for (const candidate of cases) {
    const { response, captured } = responseCapture();
    await instagramInviteHandler(candidate, response);
    assert.equal(captured.statusCode, 400);
    assert.deepEqual(captured.body, { ok: false, code: 'invalid_request' });
  }
});

test('accepts only exact Gmail ids and the three allowlisted Instagram handles', async () => {
  configureEnvironment();
  globalThis.fetch = (async () => {
    throw new Error('should not call SocialFanout');
  }) as typeof fetch;
  const bodies = [
    {
      gmailMessageId: 'not-a-gmail-id',
      handle: '@magicbrent',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
    {
      gmailMessageId: '1A0D13DE2BCCCFB6',
      handle: '@magicbrent',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
    {
      gmailMessageId: '1a0d13de2bcccfa6',
      handle: '@musenexus.studio',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
    {
      gmailMessageId: '1a0d13de2bcccfa6',
      handle: '@cirquejolie',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
    {
      gmailMessageId: '1a0d13de2bcccfa5',
      handle: '@magicbrent',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
  ];

  for (const body of bodies) {
    const { response, captured } = responseCapture();
    await instagramInviteHandler(request({ body }), response);
    assert.equal(captured.statusCode, 400);
    assert.deepEqual(captured.body, { ok: false, code: 'validation_failed' });
  }
});

test('enforces the exact sender-to-handle allowlist for Jolie and Brenton', async () => {
  configureEnvironment();
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input));
    const handle = url.searchParams.get('delegateTo');
    return Response.json(validUpstreamInvite({ expectedHandle: handle }));
  }) as typeof fetch;
  const cases = [
    {
      gmailMessageId: '1a0d13de2bcccfa7',
      handle: '@cirquejolie',
      senderEmail: 'cirquejolie@gmail.com',
    },
    {
      gmailMessageId: '1a0d13de2bcccfa8',
      handle: '@gameshowfanatics',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
  ];

  for (const body of cases) {
    const { response, captured } = responseCapture();
    await instagramInviteHandler(request({ body }), response);
    assert.equal(captured.statusCode, 201);
    assert.equal((captured.body as { handle: string }).handle, body.handle);
  }
});

test('rejects cross-origin browser requests and oversized bodies before calling upstream', async () => {
  configureEnvironment();
  globalThis.fetch = (async () => {
    throw new Error('should not call SocialFanout');
  }) as typeof fetch;
  const crossOrigin = responseCapture();
  await instagramInviteHandler(
    request({
      headers: {
        'content-type': 'application/json',
        host: 'preview.example',
        origin: 'https://attacker.example',
        'x-raining-automation-intent': 'instagram-delegated-invite-v1',
        'x-raining-gmail-thread-id': GMAIL_THREAD_ID,
      },
    }),
    crossOrigin.response,
  );
  assert.equal(crossOrigin.captured.statusCode, 403);

  const oversized = responseCapture();
  await instagramInviteHandler(
    request({ headers: { ...request().headers, 'content-length': '1001' } }),
    oversized.response,
  );
  assert.equal(oversized.captured.statusCode, 413);
});

test('rate limits repeated invitation creation for the same inbound message', async () => {
  configureEnvironment();
  globalThis.fetch = (async () => Response.json(validUpstreamInvite())) as typeof fetch;
  const repeatedRequest = request({
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': 'invite-rate-limit-test',
      'x-raining-automation-intent': 'instagram-delegated-invite-v1',
      'x-raining-gmail-thread-id': GMAIL_THREAD_ID,
    },
    body: {
      gmailMessageId: '1a0d13de2bcccfa9',
      handle: '@magicbrent',
      senderEmail: 'brentonkeith@magicbrent.com',
    },
  });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const { response, captured } = responseCapture();
    await instagramInviteHandler(repeatedRequest, response);
    assert.equal(captured.statusCode, 201);
  }

  const limited = responseCapture();
  await instagramInviteHandler(repeatedRequest, limited.response);
  assert.equal(limited.captured.statusCode, 429);
  assert.match(limited.captured.headers['retry-after'] ?? '', /^\d+$/);
  assert.deepEqual(limited.captured.body, { ok: false, code: 'rate_limited' });
});

test('does not call an older owner-session contract unless v1 is explicitly enabled', async () => {
  configureEnvironment();
  delete process.env.SOCIALFANOUT_DELEGATED_INVITE_CONTRACT;
  globalThis.fetch = (async () => {
    throw new Error('should not call SocialFanout');
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request(), response);

  assert.equal(captured.statusCode, 503);
  assert.deepEqual(captured.body, {
    ok: false,
    code: 'invite_broker_unavailable',
    reason: 'not_configured',
  });
});

test('never sends the API key to a configured non-SocialFanout origin', async () => {
  configureEnvironment();
  process.env.SOCIALFANOUT_API_URL = 'https://socialfanout.com.attacker.example';
  globalThis.fetch = (async () => {
    throw new Error('should not call a configured attacker origin');
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request(), response);

  assert.equal(captured.statusCode, 503);
  assert.deepEqual(captured.body, {
    ok: false,
    code: 'invite_broker_unavailable',
    reason: 'not_configured',
  });
});

test('rejects a legacy owner-session response without returning its URL', async () => {
  configureEnvironment();
  console.error = () => undefined;
  const legacyUrl = `https://socialfanout.com/v1/oauth/authorize?state=${STATE}`;
  globalThis.fetch = (async () => Response.json({
    ok: true,
    provider: 'instagram',
    authorizationUrl: legacyUrl,
    state: STATE,
  })) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request(), response);

  assert.equal(captured.statusCode, 502);
  assert.doesNotMatch(JSON.stringify(captured.body), /sfoauth_|oauth\/authorize/);
  assert.deepEqual(captured.body, {
    ok: false,
    code: 'invite_broker_unavailable',
    reason: 'invalid_delegated_invite',
  });
});

test('requires an exact JSON media type from SocialFanout', async () => {
  configureEnvironment();
  console.error = () => undefined;
  globalThis.fetch = (async () => new Response(JSON.stringify(validUpstreamInvite()), {
    headers: { 'content-type': 'text/application/jsonp' },
  })) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request(), response);

  assert.equal(captured.statusCode, 502);
  assert.deepEqual(captured.body, {
    ok: false,
    code: 'invite_broker_unavailable',
    reason: 'invalid_delegated_invite',
  });
});

test('logs no API key, invitation URL, or OAuth state when upstream validation fails', async () => {
  configureEnvironment();
  const logged: unknown[][] = [];
  console.error = (...values: unknown[]) => {
    logged.push(values);
  };
  globalThis.fetch = (async () => Response.json(validUpstreamInvite({
    type: 'owner_oauth_handoff',
  }))) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramInviteHandler(request(), response);

  assert.equal(captured.statusCode, 502);
  const serializedLogs = JSON.stringify(logged);
  assert.doesNotMatch(serializedLogs, /website-private-key|oauth\/authorize|sfoauth_/);
  assert.match(serializedLogs, /invalid_delegated_invite/);
});

test('rejects unsafe or mismatched delegated invitation responses', async () => {
  configureEnvironment();
  console.error = () => undefined;
  const nonCanonicalExpiry = new Date(Date.now() + 9 * 60_000)
    .toISOString()
    .replace(/\.\d{3}Z$/, 'Z');
  const payloads = [
    validUpstreamInvite({
      authorizationUrl: `https://attacker.example/v1/oauth/authorize?state=${STATE}`,
    }),
    validUpstreamInvite({ expectedHandle: '@cirquejolie' }),
    validUpstreamInvite({ expiresAt: new Date(Date.now() + 60_000).toISOString() }),
    validUpstreamInvite({ expiresAt: new Date(Date.now() + 12 * 60_000).toISOString() }),
    validUpstreamInvite({ expiresAt: nonCanonicalExpiry }),
    validUpstreamInvite({
      authorizationUrl: `https://socialfanout.com/v1/oauth/authorize?state=${STATE}&next=/dashboard`,
    }),
    validUpstreamInvite({
      authorizationUrl: `https://socialfanout.com/dashboard?state=${STATE}`,
    }),
    validUpstreamInvite({
      authorizationUrl: `https://operator@socialfanout.com/v1/oauth/authorize?state=${STATE}`,
    }),
    validUpstreamInvite({
      authorizationUrl: `https://socialfanout.com/v1/oauth/authorize?state=${STATE}#fragment`,
    }),
    validUpstreamInvite({
      authorizationUrl: `https://socialfanout.com/v1/oauth/authorize?state=${STATE}`,
      state: `sfoauth_${'b'.repeat(43)}`,
    }),
    validUpstreamInvite({
      authorizationUrl: 'https://socialfanout.com/v1/oauth/authorize?state=sfoauth_too-short',
      state: 'sfoauth_too-short',
    }),
    validUpstreamInvite({ ok: false }),
    validUpstreamInvite({ provider: 'facebook' }),
    validUpstreamInvite({ delegated: false }),
    validUpstreamInvite({ type: 'owner_oauth_handoff' }),
  ];

  for (const payload of payloads) {
    globalThis.fetch = (async () => Response.json(payload)) as typeof fetch;
    const { response, captured } = responseCapture();
    await instagramInviteHandler(request(), response);
    assert.equal(captured.statusCode, 502);
    assert.deepEqual(captured.body, {
      ok: false,
      code: 'invite_broker_unavailable',
      reason: 'invalid_delegated_invite',
    });
  }
});
