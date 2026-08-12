import { CalendarDays, Clock3, MapPin, Sparkles, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

const details = [
  {
    icon: CalendarDays,
    label: 'Regular series',
    value: 'Thursday evenings — confirm the current date with the venue',
  },
  {
    icon: Clock3,
    label: 'Showtime',
    value: '6:30 PM, with tableside close-up magic beginning around 5:30 PM',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: "Mulligan's on the Blue, 100 Kaukahi Street, Wailea",
  },
];

export default function MulligansMagicShow() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-slate-950">
        <img
          src="/media/magic/magic-brent-live-show-maui.webp"
          alt="Brenton Keith performing live comedy magic for a Maui audience"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35" />
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coral">
              Live comedy magic in Wailea
            </p>
            <h1 className="text-5xl font-black leading-[0.92] text-white md:text-7xl">
              The Mulligan’s <span className="text-coral">Magic Show</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-200">
              This live Maui magic show brings together Brenton Keith’s astonishing magic,
              quick comedy and audience participation for a relaxed evening where the guests
              become part of the show.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://www.mulligansontheblue.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 font-bold text-slate-950 transition hover:bg-coral/80"
              >
                <Ticket className="h-5 w-5" /> Check Venue & Reservations
              </a>
              <Link
                to="/upcoming-shows"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                See All Upcoming Shows
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-sage">
              Plan your night
            </p>
            <h2 className="text-4xl font-bold text-white">A Maui show built for every age</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Come early for close-up magic at the tables, then settle in for a high-energy
              family show filled with surprises, laughter and volunteers from the audience.
              Because the public schedule can change, confirm the current performance and
              reservation details directly with Mulligan’s before traveling.
            </p>
            <div className="mt-8 rounded-2xl border border-coral/25 bg-coral/10 p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="mt-1 h-6 w-6 shrink-0 text-coral" />
                <div>
                  <h3 className="text-xl font-bold text-white">Need Brenton Keith &amp; His Bag O&rsquo; Tricks at your event?</h3>
                  <p className="mt-2 text-slate-300">
                    The same comedy magic is available for private parties, weddings, resorts,
                    luaus and corporate events throughout Hawaii.
                  </p>
                  <Link to="/magic" className="mt-4 inline-block font-bold text-coral hover:underline">
                    Explore private magic shows →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {details.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-slate-950/60 p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sage/15 text-sage">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      {detail.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-white">Make the show part of your Maui plans</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
            Confirm the date with the venue, make a reservation and arrive early enough to
            catch Brenton’s tableside magic before the main show.
          </p>
          <a
            href="https://www.mulligansontheblue.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-slate-950 transition hover:bg-white/90"
          >
            Visit Mulligan’s on the Blue <Ticket className="h-5 w-5" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
