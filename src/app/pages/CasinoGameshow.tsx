import { Dice5, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

const services = [
  {
    eyebrow: 'A complete casino-style experience',
    title: 'Casino NITE',
    description:
      'Blackjack, Poker, Craps, and Roulette with engaging professional dealers, event lighting, and complimentary play chips. For entertainment purposes only — no real-money gambling.',
    image: '/media/casino-nite/dealer-team-roulette-maui.webp',
    imageAlt: 'Casino NITE dealer team with Roulette and casino tables at a Maui event',
    href: '/casino',
    cta: 'Explore Casino NITE',
    icon: Dice5,
    accent: 'burgundy',
  },
  {
    eyebrow: 'A personalized live game show',
    title: 'Game Show NITE',
    description:
      'A full-production interactive game show with Brenton Keith, custom questions, podiums, buzzers, sound, and lighting. Game Show LITE is also available for smaller budgets and tighter spaces.',
    image: '/media/casino-gameshow/gameshow-fanatics-crowd-maui.webp',
    imageAlt: 'Gameshow Fanatics hosting a live Game Show NITE for a Maui audience',
    href: '/game-show',
    cta: 'Explore Game Show NITE',
    icon: Tv,
    accent: 'coral',
  },
];

export default function CasinoGameshow() {
  return (
    <Layout title="Choose Casino NITE or Game Show NITE">
      <section className="min-h-[calc(100svh-5rem)] bg-slate-950 px-4 py-16 text-white md:py-24">
        <div className="container mx-auto">
          <header className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-lavender">
              Two distinct Raining Entertainment services
            </p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">
              Choose Your Experience
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-300 md:text-xl">
              Casino NITE and Game Show NITE are separate entertainment experiences. Explore each service to find the right fit for your event.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              const accentClasses =
                service.accent === 'burgundy'
                  ? 'text-coral border-burgundy/50 hover:bg-burgundy/20'
                  : 'text-coral border-coral/40 hover:bg-coral/10';

              return (
                <article
                  key={service.href}
                  className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900 shadow-2xl"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="h-full w-full object-cover"
                      loading={service.href === '/casino' ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <div className="p-7 md:p-9">
                    <Icon className="mb-5 h-8 w-8 text-coral" />
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-400">
                      {service.eyebrow}
                    </p>
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">{service.title}</h2>
                    <p className="mb-7 leading-relaxed text-gray-300">{service.description}</p>
                    <Link
                      to={service.href}
                      className={`inline-flex rounded-full border px-6 py-3 font-bold transition-colors ${accentClasses}`}
                    >
                      {service.cta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/contact?service=combo"
              className="inline-flex rounded-full bg-white px-8 py-4 font-bold text-slate-950 transition-transform hover:scale-105"
            >
              Ask Brenton Which Service Fits
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
