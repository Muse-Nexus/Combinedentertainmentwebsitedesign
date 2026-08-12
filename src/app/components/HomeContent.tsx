import { ArrowRight, CalendarDays, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';
import { LatestMoments } from './LatestMoments';

const brandStories = [
  {
    name: "Brenton Keith & His Bag O' Tricks",
    eyebrow: 'Comedy magic',
    title: 'The whole room becomes part of the show.',
    copy: 'Brenton Keith brings more than 30 years of comedy, close-up wonder, and audience-first showmanship to Maui celebrations of every size.',
    image: '/media/magic/magic-brent-live-show-maui.webp',
    alt: 'Brenton Keith performing live for a full Maui audience',
    to: '/magic',
  },
  {
    name: 'Cirque Jolie',
    eyebrow: 'Color in motion',
    title: 'Nine-foot characters. Tiny painted dragons. Total delight.',
    copy: 'Jolie and her team bring stilt performers, balloon art, face painting, fire, LED, and immersive characters to family and grown-up events alike.',
    image: '/media/strolling/cirque-jolie-balloon-creatures-maui.webp',
    alt: 'Cirque Jolie stilt performers carrying giant balloon creatures on Maui',
    to: '/cirque-jolie',
  },
  {
    name: 'Gameshow Fanatics',
    eyebrow: 'Interactive entertainment',
    title: 'Your guests do not just watch. They play.',
    copy: 'Game Show NITE puts your guests in the action. Casino NITE is a separate entertainment experience with its own tables, dealers, and atmosphere.',
    image: '/media/casino-gameshow/gameshow-fanatics-crowd-maui.webp',
    alt: 'A packed Gameshow Fanatics event with contestants and audience on Maui',
    to: '/game-show',
  },
];

const services = [
  {
    title: 'Balloon Twisting & Face Painting',
    kicker: 'Kids, families & anyone young at heart',
    image: '/media/balloons/balloon-animals-fish-maui.webp',
    alt: 'Colorful fish balloon animals prepared for a Maui party',
    to: '/balloon-twisting',
  },
  {
    title: 'Balloon Decor',
    kicker: 'Arches, installations, deliveries & custom builds',
    image: '/media/balloon-decor/candy-stage-balloon-arch-maui.webp',
    alt: 'Candy-themed balloon stage installation by Cirque Jolie',
    to: '/balloon-decor',
  },
  {
    title: 'Costumed Stilt Walking',
    kicker: 'A visual welcome guests remember',
    image: '/media/strolling/cirque-jolie-balloon-stilt-maui.webp',
    alt: 'Cirque Jolie in a dramatic balloon stilt costume on Maui',
    to: '/strolling',
  },
  {
    title: 'Magic',
    kicker: 'High-energy comedy for every generation',
    image: '/media/magic/brent-kids-bag-of-tricks.jpg',
    alt: "Brenton Keith sharing a Bag O' Tricks show with children",
    to: '/magic',
  },
  {
    title: 'Game Show NITE',
    kicker: 'Customized questions, podiums, buzzers & big laughs',
    image: '/media/casino-gameshow/game-show-tent-maui.webp',
    alt: 'Gameshow Fanatics host and contestants under a Maui event tent',
    to: '/game-show',
  },
  {
    title: 'Casino NITE',
    kicker: 'Blackjack, poker and craps—with the show built in',
    image: '/media/casino-gameshow/casino-night-red-carpet-maui.webp',
    alt: 'Maui Casino NITE red carpet entrance with balloon columns',
    to: '/casino',
  },
];

export function HomeContent() {
  return (
    <div id="home-content" tabIndex={-1} className="relative bg-slate-950 text-white focus:outline-none">
      <main>
        <section className="overflow-hidden border-b border-white/5 bg-[radial-gradient(circle_at_15%_10%,rgba(232,92,74,0.16),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(155,126,189,0.14),transparent_34%),#070b22] py-20 md:py-28">
          <div className="container mx-auto px-5">
            <div className="mx-auto mb-14 max-w-4xl text-center">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-coral">
                Three Maui originals. One easy booking.
              </p>
              <h1 className="text-balance text-4xl font-black leading-[0.96] tracking-tight sm:text-5xl md:text-7xl">
                Maui entertainment that brings the whole guest list in.
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Husband &amp; Wife team Brenton Keith and Jolie Strickland bring Brenton Keith &amp; His Bag O&rsquo; Tricks,
                Cirque Jolie, and Gameshow Fanatics together under one umbrella—so your event
                can move from wonder to spectacle to full-room laughter without juggling vendors.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {brandStories.map((story) => (
                <Link
                  key={story.name}
                  to={story.to}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.alt}
                      width="1600"
                      height="1200"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-7">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral">{story.eyebrow}</p>
                        <h2 className="mt-1 text-2xl font-black">{story.name}</h2>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold leading-snug text-white">{story.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-400">{story.copy}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 text-slate-950 md:py-28">
          <div className="container mx-auto px-5">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-burgundy">Build your lineup</p>
                <h2 className="text-4xl font-black tracking-tight md:text-6xl">Pick one act—or make it a whole forecast.</h2>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 font-bold text-burgundy hover:text-coral">
                Plan a custom combination <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.title}
                  to={service.to}
                  className="group relative isolate min-h-[360px] overflow-hidden rounded-3xl bg-slate-900 shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-4"
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70">{service.kicker}</p>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-2xl font-black leading-tight">{service.title}</h3>
                      <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <LatestMoments />

        <section className="bg-slate-950 px-5 py-20 md:py-28">
          <div className="container mx-auto overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(125deg,#7b2d43_0%,#e85c4a_48%,#9b7ebd_100%)] px-6 py-14 text-center shadow-2xl md:px-16 md:py-20">
            <Sparkles className="mx-auto mb-5 h-9 w-9 text-white/80" aria-hidden="true" />
            <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight md:text-6xl">Tell us the date. We’ll bring the weather.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85 md:text-xl">
              Share the guest count, venue, and kind of energy you want. We’ll recommend the right mix and keep the logistics simple.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-black text-burgundy shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-50">
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/upcoming-shows" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-8 py-4 font-bold text-white transition hover:bg-white/10">
                <CalendarDays className="h-4 w-4" /> See a public show
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
