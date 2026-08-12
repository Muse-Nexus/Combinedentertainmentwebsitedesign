import { ArrowRight, Home, Umbrella } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

const destinations = [
  { to: '/magic', label: "Brenton Keith & His Bag O' Tricks" },
  { to: '/cirque-jolie', label: 'Cirque Jolie' },
  { to: '/game-show', label: 'Gameshow Fanatics' },
  { to: '/contact', label: 'Book an Event' },
];

export default function NotFound() {
  return (
    <Layout>
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-slate-950 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(155,126,189,0.24),transparent_46%)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5 text-coral">
            <Umbrella className="h-10 w-10" />
          </div>
          <p className="mt-7 text-sm font-bold uppercase tracking-[0.3em] text-lavender">
            404 — the rain moved on
          </p>
          <h1 className="mt-4 text-5xl font-black text-white md:text-7xl">This page isn’t here</h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-slate-400">
            The link may be old, or the performance may have moved. The entertainment is still
            waiting under the umbrella.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-bold text-slate-950 transition hover:bg-coral/80"
          >
            <Home className="h-5 w-5" /> Return Home
          </Link>

          <nav aria-label="Helpful destinations" className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <Link
                key={destination.to}
                to={destination.to}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900 px-4 py-3 font-semibold text-slate-200 transition hover:border-lavender/50 hover:text-white"
              >
                {destination.label} <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </Layout>
  );
}
