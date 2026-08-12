export type AnalyticsConsent = 'granted' | 'denied' | null;

type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_STORAGE_KEY = 'raining.analytics-consent.v1';
const measurementId = String(import.meta.env.VITE_GOOGLE_ANALYTICS_ID ?? '').trim();

export const isGoogleAnalyticsConfigured = /^G-[A-Z0-9]+$/i.test(measurementId);

let initializationPromise: Promise<void> | null = null;
let consentDefaultsSet = false;

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

export function initializeConsentMode() {
  if (!isGoogleAnalyticsConfigured || consentDefaultsSet) return;

  ensureGtagQueue();
  window.gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  });
  window.gtag?.('set', 'ads_data_redaction', true);
  consentDefaultsSet = true;
}

export function getStoredAnalyticsConsent(): AnalyticsConsent {
  if (!isGoogleAnalyticsConfigured) return null;

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null;
  }
}

function persistConsent(consent: Exclude<AnalyticsConsent, null>) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // Consent still applies for this page even when storage is unavailable.
  }
}

function removeAnalyticsCookies() {
  const hostname = window.location.hostname;
  const hostnameParts = hostname.split('.').filter(Boolean);
  const registrableDomain = hostnameParts.length >= 2
    ? hostnameParts.slice(-2).join('.')
    : null;
  const domainVariants = new Set(
    [hostname, `.${hostname}`, registrableDomain, registrableDomain ? `.${registrableDomain}` : null]
      .filter((domain): domain is string => Boolean(domain)),
  );

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0]?.trim();
    if (!name || (!name.startsWith('_ga') && name !== '_gid')) return;

    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    domainVariants.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${domain}; SameSite=Lax`;
    });
  });
}

export function denyAnalytics() {
  if (!isGoogleAnalyticsConfigured) return;

  initializeConsentMode();
  persistConsent('denied');
  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  removeAnalyticsCookies();
}

export function enableAnalytics() {
  if (!isGoogleAnalyticsConfigured) return Promise.resolve();

  initializeConsentMode();
  persistConsent('granted');
  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });

  if (initializationPromise) return initializationPromise;

  initializationPromise = new Promise<void>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-raining-google-tag]');
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.rainingGoogleTag = 'true';
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => resolve(), { once: true });
    document.head.appendChild(script);

    window.gtag?.('js', new Date());
    window.gtag?.('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  });

  return initializationPromise;
}

export function trackAnalyticsEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (!isGoogleAnalyticsConfigured || getStoredAnalyticsConsent() !== 'granted') return;

  ensureGtagQueue();
  window.gtag?.('event', name, parameters);
}

export function trackPageView(path: string, title: string, referrer?: string) {
  trackAnalyticsEvent('page_view', {
    page_title: title,
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_referrer: referrer,
  });
}

export function openAnalyticsPreferences() {
  window.dispatchEvent(new CustomEvent('raining:analytics-preferences'));
}
