import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  buildAnalyticsLocation,
  denyAnalytics,
  enableAnalytics,
  getStoredAnalyticsConsent,
  initializeConsentMode,
  isGoogleAnalyticsConfigured,
  sanitizeAnalyticsReferrer,
  syncAnalyticsConsentFromStorage,
  trackAnalyticsEvent,
  trackPageView,
  type AnalyticsConsent,
} from './googleAnalytics';

const TRACKABLE_SERVICES = new Set([
  'kids-party',
  'magic',
  'gameshow',
  'casino',
  'casino-gameshow',
  'strolling',
  'led-performers',
  'balloon-decor',
  'balloon-animals',
  'face-painting',
  'corporate',
  'wedding',
  'combo',
]);

function networkFromHostname(hostname: string) {
  if (hostname.includes('instagram.com')) return 'instagram';
  if (hostname.includes('facebook.com')) return 'facebook';
  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) return 'youtube';
  return null;
}

export function AnalyticsController() {
  const location = useLocation();
  const [consent, setConsent] = useState<AnalyticsConsent>(() =>
    isGoogleAnalyticsConfigured ? getStoredAnalyticsConsent() : null,
  );
  const [preferencesOpen, setPreferencesOpen] = useState(
    isGoogleAnalyticsConfigured && consent === null,
  );
  const previousLocation = useRef(sanitizeAnalyticsReferrer(document.referrer));

  useEffect(() => {
    if (!isGoogleAnalyticsConfigured) return;

    initializeConsentMode();
    if (consent === 'denied') denyAnalytics();
  }, [consent]);

  useEffect(() => {
    if (!isGoogleAnalyticsConfigured) return;

    const openPreferences = () => setPreferencesOpen(true);
    const syncConsent = (event: StorageEvent) => {
      if (event.key !== ANALYTICS_CONSENT_STORAGE_KEY) return;

      const nextConsent = syncAnalyticsConsentFromStorage(event.newValue);
      setConsent(nextConsent);
      setPreferencesOpen(nextConsent === null);
    };
    window.addEventListener('raining:analytics-preferences', openPreferences);
    window.addEventListener('storage', syncConsent);
    return () => {
      window.removeEventListener('raining:analytics-preferences', openPreferences);
      window.removeEventListener('storage', syncConsent);
    };
  }, []);

  useEffect(() => {
    if (consent !== 'granted') return;

    const path = location.pathname;
    const search = location.search;
    let cancelled = false;
    enableAnalytics().then(() => {
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        trackPageView(path, search, document.title, previousLocation.current);
        previousLocation.current = buildAnalyticsLocation(path, search);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [consent, location.pathname, location.search]);

  useEffect(() => {
    if (consent !== 'granted') return;

    const trackLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const pagePath = window.location.pathname;

      if (href.startsWith('tel:')) {
        trackAnalyticsEvent('contact_click', { contact_method: 'phone', page_path: pagePath });
        return;
      }

      if (href.startsWith('mailto:')) {
        trackAnalyticsEvent('contact_click', { contact_method: 'email', page_path: pagePath });
        return;
      }

      let destination: URL;
      try {
        destination = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      const socialNetwork = networkFromHostname(destination.hostname);
      if (socialNetwork) {
        trackAnalyticsEvent('social_click', {
          social_network: socialNetwork,
          outbound_path: destination.pathname,
          page_path: pagePath,
        });
        return;
      }

      const requestedService = destination.searchParams.get('service')?.trim() ?? '';
      const service = TRACKABLE_SERVICES.has(requestedService) ? requestedService : null;
      if (
        service &&
        destination.origin === window.location.origin &&
        destination.pathname === '/contact'
      ) {
        trackAnalyticsEvent('service_cta_click', {
          service,
          destination_path: '/contact',
          page_path: pagePath,
        });
      }
    };

    document.addEventListener('click', trackLink, { capture: true });
    return () => document.removeEventListener('click', trackLink, { capture: true });
  }, [consent]);

  if (!isGoogleAnalyticsConfigured || !preferencesOpen) return null;

  const choose = (choice: Exclude<AnalyticsConsent, null>) => {
    // The consent effects own persistence, script loading, and gtag updates.
    // Keeping the click handler state-only prevents duplicate consent commands.
    setConsent(choice);
    setPreferencesOpen(false);
  };

  return (
    <section
      aria-labelledby="analytics-preferences-title"
      className="fixed inset-x-3 bottom-3 z-[250] mx-auto max-w-2xl rounded-2xl border border-white/15 bg-slate-950/95 p-5 text-white shadow-2xl backdrop-blur-xl md:bottom-5 md:p-6"
    >
      <h2 id="analytics-preferences-title" className="font-display text-xl font-bold">
        Your privacy choices
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Optional analytics help us understand which pages and booking paths are useful. We do not
        send your inquiry details to Google, and advertising storage stays off. Read our{' '}
        <Link className="font-semibold text-white underline underline-offset-4" to="/privacy">
          privacy notice
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="rounded-full border border-white/20 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          Decline analytics
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="rounded-full bg-coral px-5 py-2.5 font-bold text-slate-950 transition hover:bg-coral/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Allow analytics
        </button>
      </div>
    </section>
  );
}
