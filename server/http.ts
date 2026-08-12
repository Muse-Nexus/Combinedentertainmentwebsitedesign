export interface ApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

export interface ApiResponse {
  status(code: number): ApiResponse;
  setHeader(name: string, value: string): ApiResponse;
  json(value: unknown): void;
  end(value?: string): void;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimits = new Map<string, RateLimitEntry>();

export function methodNotAllowed(response: ApiResponse, allowed: string[]) {
  response.setHeader('Allow', allowed.join(', '));
  response.setHeader('Cache-Control', 'no-store');
  response.status(405).json({ ok: false, code: 'method_not_allowed' });
}

export function parseBody(body: unknown): Record<string, unknown> | null {
  if (typeof body === 'string') {
    try {
      const parsed: unknown = JSON.parse(body);
      return isRecord(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  return isRecord(body) ? body : null;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export function safeHttpUrl(value: unknown): string | undefined {
  const candidate = cleanText(value, 2_000);
  if (!candidate) return undefined;

  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function getClientIp(request: ApiRequest): string {
  const forwarded = request.headers['x-forwarded-for'];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return firstForwarded?.split(',')[0]?.trim() || request.socket?.remoteAddress || 'unknown';
}

export function hasSameOrigin(request: ApiRequest): boolean {
  const originHeader = request.headers.origin;
  const origin = Array.isArray(originHeader) ? originHeader[0] : originHeader;
  if (!origin) return true;

  const forwardedHostHeader = request.headers['x-forwarded-host'];
  const hostHeader = forwardedHostHeader || request.headers.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  if (!host) return false;

  try {
    return new URL(origin).host.toLowerCase() === host.split(',')[0].trim().toLowerCase();
  } catch {
    return false;
  }
}

export function checkRateLimit(
  key: string,
  maximumAttempts = 5,
  windowMs = 10 * 60 * 1_000,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = rateLimits.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    pruneRateLimits(now);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  return {
    allowed: existing.count <= maximumAttempts,
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1_000)),
  };
}

function pruneRateLimits(now: number) {
  if (rateLimits.size < 500) return;
  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(key);
  }
}
