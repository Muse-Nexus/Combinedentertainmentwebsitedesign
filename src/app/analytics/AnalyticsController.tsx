import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  denyAnalytics,
  enableAnalytics,
  getStoredAnalyticsConsent,
  initializeConsentMode,
  isGoogleAnalyticsConfigured,
  trackAnalyticsEvent,
  trackPageView,
  type AnalyticsConsent,
} from './googleAnalytics';

const servicePaths = new Set([
  '/balloon-twisting',
  '/balloon-decor',
  '/strolling',
  '/led-performers',
  '/magic',
  '/casino',
  '/game-show',
  '/corporate',
  '/face-painting',
  '/cirque-jolie',
  '/shows/mulligans-magic-show',
]);

function inferService(pathname: string) {
  if (pathname === '/') return 'home';
  if (servicePaths.has(pathname)) return pathname.slice(1).replaceAll('/', ':');
  return 'site';
}

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
  const previousLocation = useRef(document.referrer || undefined);

  useEffect(() => {
    if (!isGoogleAnalyticsConfigured) return;

    initializeConsentMode();
    if (consent === 'denied') denyAnalytics();
  }, [consent]);

  useEffect(() => {
    if (!isGoogleAnalyticsConfigured) return;

    const openPreferences = () => setPreferencesOpen(true);
    window.addEventListener('raining:analytics-preferences', openPreferences);
    return () => window.removeEventListener('raining:analytics-preferences', openPreferences);
  }, []);

  useEffect(() => {
    if (consent !== 'granted') return;

    // Never forward arbitrary query strings to analytics. They can contain
    // accidental contact details, and route-level reporting only needs paths.
    const path = location.pathname;
    let cancelled = false;
    enableAnalytics().then(() => {
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        trackPageView(path, document.title, previousLocation.current);
        previousLocation.current = `${window.location.origin}${path}`;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [consent, location.pathname]);

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

      if (destination.origin === window.location.origin && destination.pathname === '/contact') {
        trackAnalyticsEvent('service_cta_click', {
          service: destination.searchParams.get('service') || inferService(window.location.pathname),
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
