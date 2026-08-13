import assert from 'node:assert/strict';
import test from 'node:test';
import instagramHandler from '../api/instagram.js';
import instagramImageHandler from '../api/instagram-image.js';
import type { ApiRequest, ApiResponse } from '../server/http.js';

const ENV_KEYS = [
  'SOCIALFANOUT_API_URL',
  'SOCIALFANOUT_API_KEY',
  'SOCIALFANOUT_MAGICBRENT_CONNECTION_ID',
  'SOCIALFANOUT_CIRQUEJOLIE_CONNECTION_ID',
  'INSTAGRAM_FEED_SIGNING_SECRET',
] as const;

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

function request(input: Partial<ApiRequest>): ApiRequest {
  return {
    method: 'GET',
    headers: { 'x-forwarded-for': `test-${Math.random()}` },
    query: {},
    ...input,
  };
}

function configureEnvironment(signingSecret = 's'.repeat(32)) {
  process.env.SOCIALFANOUT_API_URL = 'https://socialfanout.example';
  process.env.SOCIALFANOUT_API_KEY = 'website-private-key';
  process.env.SOCIALFANOUT_MAGICBRENT_CONNECTION_ID = 'connection_magicbrent';
  process.env.SOCIALFANOUT_CIRQUEJOLIE_CONNECTION_ID = 'connection_cirquejolie';
  process.env.INSTAGRAM_FEED_SIGNING_SECRET = signingSecret;
}

function cleanEnvironment() {
  ENV_KEYS.forEach((key) => delete process.env[key]);
}

test.afterEach(() => {
  cleanEnvironment();
  globalThis.fetch = originalFetch;
});

const originalFetch = globalThis.fetch;

test('feed maps SocialFanout media without exposing private service values', async () => {
  configureEnvironment();
  const calls: Array<{ url: URL; init?: RequestInit }> = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(String(input));
    calls.push({ url, init });
    const magic = url.pathname.includes('connection_magicbrent');
    return Response.json({
      ok: true,
      media: [
        {
          id: magic ? '18000000000000001' : '18000000000000002',
          mediaType: magic ? 'VIDEO' : 'IMAGE',
          mediaUrl: magic
            ? 'https://scontent.cdninstagram.com/reel.mp4'
            : 'https://scontent.cdninstagram.com/stilts.jpg',
          thumbnailUrl: magic ? 'https://scontent.cdninstagram.com/reel.jpg' : undefined,
          caption: magic ? 'A little table magic.' : 'Stilts in the sunshine.',
          permalink: magic
            ? 'https://www.instagram.com/reel/ABC123/'
            : 'https://www.instagram.com/p/XYZ789/',
          timestamp: magic ? '2026-08-12T18:00:00+0000' : '2026-08-13T18:00:00+0000',
          username: magic ? 'magicbrent' : 'cirquejolie',
        },
      ],
    });
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramHandler(request({ url: '/api/instagram' }), response);

  assert.equal(captured.statusCode, 200);
  const serialized = JSON.stringify(captured.body);
  assert.doesNotMatch(serialized, /website-private-key|connection_magicbrent|cdninstagram/);
  const payload = captured.body as { accounts: string[]; moments: Array<Record<string, unknown>> };
  assert.deepEqual(payload.accounts, ['@magicbrent', '@cirquejolie']);
  assert.equal(payload.moments.length, 2);
  assert.equal(payload.moments[0]?.account, '@cirquejolie');
  assert.equal(payload.moments[1]?.timestamp, '2026-08-12T18:00:00.000Z');
  assert.match(String(payload.moments[1]?.image), /^\/api\/instagram-image\?/);
  assert.equal(calls.length, 2);
  assert.ok(calls.every((call) => call.init?.headers && (call.init.headers as Record<string, string>)['x-api-key'] === 'website-private-key'));
});

test('feed stays unavailable when the signing secret is weaker than documented', async () => {
  configureEnvironment('too-short');
  globalThis.fetch = (async () => {
    throw new Error('should not call SocialFanout');
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramHandler(request({ url: '/api/instagram' }), response);

  assert.equal(captured.statusCode, 503);
  assert.deepEqual(captured.body, {
    ok: false,
    code: 'instagram_unavailable',
    reason: 'not_configured',
  });
});

test('image proxy refreshes the signed media and serves only an allowlisted image', async () => {
  configureEnvironment();
  let signedImagePath = '';
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input));
    if (url.hostname === 'socialfanout.example') {
      if (url.pathname.endsWith('/media')) {
        return Response.json({
          ok: true,
          media: [
            {
              id: '18000000000000001',
              mediaType: 'IMAGE',
              mediaUrl: 'https://scontent.cdninstagram.com/magic.jpg',
              permalink: 'https://www.instagram.com/p/ABC123/',
              username: 'magicbrent',
            },
          ],
        });
      }
      assert.match(url.pathname, /\/media\/18000000000000001$/);
      return Response.json({
        ok: true,
        media: {
          id: '18000000000000001',
          mediaType: 'IMAGE',
          mediaUrl: 'https://scontent.cdninstagram.com/magic.jpg',
        },
      });
    }
    assert.equal(url.hostname, 'scontent.cdninstagram.com');
    return new Response(new Uint8Array([1, 2, 3, 4]), {
      status: 200,
      headers: { 'content-type': 'image/jpeg', 'content-length': '4' },
    });
  }) as typeof fetch;

  const feedResponse = responseCapture();
  await instagramHandler(request({ url: '/api/instagram' }), feedResponse.response);
  const feedPayload = feedResponse.captured.body as { moments: Array<{ image: string }> };
  signedImagePath = feedPayload.moments[0]?.image ?? '';
  assert.ok(signedImagePath);
  const imageUrl = new URL(signedImagePath, 'https://raining.example');
  const query = Object.fromEntries(imageUrl.searchParams.entries());
  const imageResponse = responseCapture();

  await instagramImageHandler(
    request({ url: `${imageUrl.pathname}${imageUrl.search}`, query }),
    imageResponse.response,
  );

  assert.equal(imageResponse.captured.statusCode, 200);
  assert.equal(imageResponse.captured.headers['content-type'], 'image/jpeg');
  assert.deepEqual(Array.from(imageResponse.captured.body as Uint8Array), [1, 2, 3, 4]);
});

test('feed refuses nonnumeric provider media ids instead of minting dead signatures', async () => {
  configureEnvironment();
  globalThis.fetch = (async () =>
    Response.json({
      ok: true,
      media: [
        {
          id: 'not-numeric',
          mediaType: 'IMAGE',
          mediaUrl: 'https://scontent.cdninstagram.com/image.jpg',
          permalink: 'https://www.instagram.com/p/ABC123/',
        },
      ],
    })) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramHandler(request({ url: '/api/instagram' }), response);

  assert.equal(captured.statusCode, 502);
  assert.deepEqual(captured.body, {
    ok: false,
    code: 'instagram_unavailable',
    reason: 'no_media',
  });
});

test('feed drops a video without an image thumbnail instead of pairing live copy with stock art', async () => {
  configureEnvironment();
  globalThis.fetch = (async () =>
    Response.json({
      ok: true,
      media: [
        {
          id: '18000000000000004',
          mediaType: 'VIDEO',
          mediaUrl: 'https://scontent.cdninstagram.com/reel.mp4',
          permalink: 'https://www.instagram.com/reel/ABC123/',
        },
      ],
    })) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramHandler(request({ url: '/api/instagram' }), response);

  assert.equal(captured.statusCode, 502);
  assert.deepEqual(captured.body, {
    ok: false,
    code: 'instagram_unavailable',
    reason: 'no_media',
  });
});

test('accounts lists only handles that contributed a renderable moment', async () => {
  configureEnvironment();
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input));
    if (url.pathname.includes('connection_magicbrent')) {
      return Response.json({ ok: true, media: [] });
    }
    return Response.json({
      ok: true,
      media: [
        {
          id: '18000000000000005',
          mediaType: 'IMAGE',
          mediaUrl: 'https://scontent.cdninstagram.com/stilts.jpg',
          permalink: 'https://www.instagram.com/p/XYZ789/',
          username: 'cirquejolie',
        },
      ],
    });
  }) as typeof fetch;
  const { response, captured } = responseCapture();

  await instagramHandler(request({ url: '/api/instagram' }), response);

  assert.equal(captured.statusCode, 200);
  const payload = captured.body as { accounts: string[] };
  assert.deepEqual(payload.accounts, ['@cirquejolie']);
});

test('image proxy rejects a tampered signed URL before calling SocialFanout', async () => {
  configureEnvironment();
  let socialFanoutCalls = 0;
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = new URL(String(input));
    if (url.hostname === 'socialfanout.example') {
      socialFanoutCalls += 1;
      return Response.json({
        ok: true,
        media: [
          {
            id: '18000000000000006',
            mediaType: 'IMAGE',
            mediaUrl: 'https://scontent.cdninstagram.com/magic.jpg',
            permalink: 'https://www.instagram.com/p/ABC123/',
          },
        ],
      });
    }
    throw new Error(`unexpected asset request ${url}`);
  }) as typeof fetch;
  const feedResponse = responseCapture();
  await instagramHandler(request({ url: '/api/instagram' }), feedResponse.response);
  const feedPayload = feedResponse.captured.body as { moments: Array<{ image: string }> };
  const signed = new URL(feedPayload.moments[0]?.image ?? '', 'https://raining.example');
  signed.searchParams.set('signature', '0'.repeat(64));
  const query = Object.fromEntries(signed.searchParams.entries());
  const imageResponse = responseCapture();

  await instagramImageHandler(
    request({ url: `${signed.pathname}${signed.search}`, query }),
    imageResponse.response,
  );

  assert.equal(imageResponse.captured.statusCode, 404);
  assert.equal(socialFanoutCalls, 2);
});
