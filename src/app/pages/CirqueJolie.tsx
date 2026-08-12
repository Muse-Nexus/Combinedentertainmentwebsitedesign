import { ArrowRight, Footprints, Instagram, Palette, PartyPopper, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

const services = [
  {
    title: 'Balloon Twisting & Face Painting',
    description:
      'Custom balloon creations and colorful party entertainment for Maui keiki celebrations, families, and adult events alike.',
    to: '/balloon-twisting',
    image: '/media/balloons/balloon-animals-fish-maui.webp',
    alt: 'Colorful fish balloon animals created by Cirque Jolie for a Maui party',
    icon: PartyPopper,
  },
  {
    title: 'Face Painting',
    description:
      'Skin-safe face painting that turns children and adults into dragons, mermaids, superheroes and one-of-a-kind characters.',
    to: '/face-painting',
    image: '/media/face-painting/cirque-jolie-face-painting-kids-maui.webp',
    alt: 'Cirque Jolie painting a colorful design for a child at a Maui event',
    icon: Palette,
  },
  {
    title: 'Balloon Decor',
    description:
      'Garlands, arches, columns, centerpieces and custom installations that transform venues into celebrations.',
    to: '/balloon-decor',
    image: '/media/balloon-decor/candy-stage-balloon-arch-maui.webp',
    alt: 'Candy-themed balloon stage installation designed by Cirque Jolie',
    icon: Sparkles,
  },
  {
    title: 'Stilt Walkers',
    description:
      'Nine-foot stilt characters and themed walk-around entertainment for every age.',
    to: '/strolling',
    image: '/media/strolling/cirque-jolie-balloon-creatures-maui.webp',
    alt: 'Cirque Jolie stilt performers carrying giant balloon creatures on Maui',
    icon: Footprints,
  },
  {
    title: 'LED Performers',
    description:
      'Glowing LED wing performers and ambient light shows that turn heads after dark — perfect for evening receptions and nightlife.',
    to: '/led-performers',
    image: '/media/client-selected/led-performers/hero-golden-wings-dusk.webp',
    alt: 'Cirque Jolie performers in glowing golden LED wing costumes at dusk',
    icon: Zap,
  },
];

export default function CirqueJolie() {
  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender/25 via-slate-950 to-slate-950 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,107,74,0.16),transparent_42%)]" />
        <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-lavender">
              Maui circus arts & party entertainment
            </p>
            <h1 className="mb-6 text-5xl font-black leading-[0.92] text-white md:text-7xl">
              Cirque <span className="text-lavender">Jolie</span>
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-slate-300">
              Jolie Strickland has delighted Maui audiences since her early days as Jolie the
              Clown. Today, Cirque Jolie brings balloon artistry, face painting, stilt walking,
              LED performance and spectacular ambient characters to events across Hawaii.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lavender px-7 py-3.5 font-bold text-slate-950 transition hover:bg-lavender/80"
              >
                Plan Your Event <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://www.instagram.com/cirquejolie/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                <Instagram className="h-5 w-5" /> Follow Cirque Jolie
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-lavender/30 to-coral/20 blur-2xl" />
            <img
              src="/media/about/jolie-strickland-portrait.webp"
              alt="Jolie Strickland in a colorful Cirque Jolie costume"
              className="relative aspect-[4/3] w-full rounded-[2rem] border border-white/10 object-cover object-center shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-coral">
              One colorful world of entertainment
            </p>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Choose the perfect Cirque Jolie experience
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-400">
              Book one specialty or combine services into a seamless package for birthdays,
              baby luaus, weddings, resorts, corporate events and community celebrations.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isLastOdd = services.length % 2 === 1 && i === services.length - 1;
              return (
                <Link
                  key={service.to}
                  to={service.to}
                  className={`group overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-lavender/50 ${isLastOdd ? 'md:col-span-2' : ''}`}
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="p-7">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lavender/15 text-lavender">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-400">{service.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-bold text-lavender">
                      Explore this service <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-lavender via-burgundy to-coral py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Bring something unforgettable to your Maui event
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl text-white/85">
            Tell us your guest count, venue and theme. We’ll shape a Cirque Jolie package that
            fits the moment and works beautifully with Brenton Keith &amp; His Bag O&rsquo; Tricks or Gameshow Fanatics.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-full bg-white px-8 py-4 font-bold text-burgundy transition hover:bg-white/90"
            >
              Request a Custom Quote
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/40 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Meet Brenton & Jolie
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
