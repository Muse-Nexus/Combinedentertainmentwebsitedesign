import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import {
  isGoogleAnalyticsConfigured,
  openAnalyticsPreferences,
} from '../analytics/googleAnalytics';

export function Privacy() {
  return (
    <Layout>
      <main className="min-h-screen bg-slate-950 py-20 text-slate-200">
        <article className="container mx-auto max-w-3xl px-4">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-coral">
            Raining Entertainment
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-6xl">
            Privacy &amp; Analytics
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            This notice explains what this website collects, why it is collected, and the choices
            you have. It applies to rainingentertainment.com and was last updated August 12, 2026.
          </p>

          <div className="mt-12 space-y-10 leading-7 text-slate-300">
            <section>
              <h2 className="font-display text-2xl font-bold text-white">Booking inquiries</h2>
              <p className="mt-3">
                When you submit the quote form, we receive the information you choose to provide,
                such as your name, contact details, event date, service, guest counts, and message.
                It is sent to our booking system so Brenton and Jolie can respond, prepare a quote,
                and manage the event. Inquiry details are not included in Google Analytics events.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white">Optional analytics</h2>
              <p className="mt-3">
                Google Analytics 4 loads only after you choose “Allow analytics.” If allowed, we
                measure page views and useful actions such as booking-button, phone, email, and
                social-link clicks. Events use page paths, service labels, and action types—not the
                personal information entered in the quote form.
              </p>
              <p className="mt-3">
                Advertising storage, advertising user data, ad personalization, and Google Signals
                remain disabled in this website’s configuration. Google Analytics may set first-party
                cookies such as <code className="rounded bg-white/10 px-1.5 py-0.5">_ga</code> after
                consent. Declining prevents the analytics script from loading; changing a prior choice
                to decline stops future events and removes the site’s accessible Google Analytics cookies.
              </p>
              <p className="mt-3">
                Learn more in{' '}
                <a
                  className="font-semibold text-white underline underline-offset-4"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google’s Privacy Policy
                </a>
                .
              </p>
              {isGoogleAnalyticsConfigured && (
                <button
                  type="button"
                  onClick={openAnalyticsPreferences}
                  className="mt-5 rounded-full border border-white/20 px-5 py-2.5 font-bold text-white transition hover:border-coral hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  Change analytics choice
                </button>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white">Service providers</h2>
              <p className="mt-3">
                The site uses Airtable to receive and organize booking inquiries and, only with your
                permission, Google Analytics to measure website use. Those providers process data
                under their own terms and privacy policies. We do not sell the personal information
                submitted through this website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-bold text-white">Questions or requests</h2>
              <p className="mt-3">
                To ask about an inquiry, correct information, or request deletion where applicable,
                email{' '}
                <a
                  className="font-semibold text-white underline underline-offset-4"
                  href="mailto:brentonkeith@magicbrent.com"
                >
                  brentonkeith@magicbrent.com
                </a>{' '}
                or call <a className="font-semibold text-white underline underline-offset-4" href="tel:+18088702102">(808) 870-2102</a>.
              </p>
            </section>
          </div>

          <Link
            to="/contact"
            className="mt-12 inline-flex rounded-full bg-coral px-6 py-3 font-bold text-slate-950 transition hover:bg-coral/85"
          >
            Contact Raining Entertainment
          </Link>
        </article>
      </main>
    </Layout>
  );
}
