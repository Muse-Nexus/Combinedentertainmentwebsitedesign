import React, { useRef } from 'react';
import { AlphaVideoPlayer } from '../components/AlphaVideoPlayer';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';

const ACTIVE_VARIANT: 'float-center' | 'hero-bg' = 'float-center';

const FadeInSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function FloatingGirl() {
  if (ACTIVE_VARIANT !== 'float-center') return null;
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      <AlphaVideoPlayer
        frameCount={96}
        fps={12}
        width={720}
        height={1280}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ height: '92vh', width: 'auto', opacity: 0.9 }}
      />
    </div>
  );
}

function Photo({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [errored, setErrored] = React.useState(false);
  if (errored) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-800/60 border-2 border-dashed border-slate-600 rounded-2xl text-slate-500 text-xs text-center p-4 ${className}`}>
        <span className="text-2xl mb-1">📸</span>
        <span className="font-mono opacity-60">{src.split('/').pop()}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

export default function StrollingEntertainment() {
  return (
    <>
      <FloatingGirl />
      <Layout title="Strolling Entertainment">

        {/* ── HERO ── */}
        <section className="relative py-32 bg-slate-900 overflow-hidden">
          {ACTIVE_VARIANT === 'hero-bg' && (
            <>
              <video
                autoPlay loop muted playsInline disablePictureInPicture
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ opacity: 0.55 }}
              >
                <source src="/media/video/girl-moving-balloons-source.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/80 pointer-events-none" />
            </>
          )}
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mx-auto"
            >
              <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">
                Cirque Jolie &amp; Magic Brent
              </p>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
                <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">
                  Maui Strolling Entertainment
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                Walk-around magic, stilt performers, fire dancers &amp; interactive gameshow — right in the middle of your guests.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-all shadow-xl hover:scale-105"
                >
                  Book Now
                </Link>
                <a
                  href="tel:8088702102"
                  className="px-10 py-4 border-2 border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                >
                  (808) 870-2102
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BRENTON — Walk-Around Magic & Gameshow ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection className="text-center mb-16">
              <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-3">Meet Magic Brent</p>
              <h2 className="text-5xl font-black mb-4">Walk-Around Magic &amp; Gameshow</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Brenton roams the crowd — close-up sleight of hand, jaw-dropping card work, and a portable walk-around gameshow that turns your guests into contestants.
              </p>
            </FadeInSection>

            {/* Main hero shot — crowd wide */}
            <FadeInSection className="mb-6">
              <Photo
                src="/media/brenton/crowd-1.jpg"
                alt="Brenton performing walk-around magic for a large crowd"
                className="w-full h-[480px] object-cover rounded-3xl shadow-2xl"
              />
            </FadeInSection>

            {/* 3-up grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <FadeInSection delay={0.1}>
                <Photo
                  src="/media/brenton/magic-1.jpg"
                  alt="Close-up magic reaction shot"
                  className="w-full h-72 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Photo
                  src="/media/brenton/crowd-2.jpg"
                  alt="Brenton in crowd at large event"
                  className="w-full h-72 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <Photo
                  src="/media/brenton/gameshow-1.jpg"
                  alt="Walk-around gameshow with costumed guests"
                  className="w-full h-72 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
            </div>

            {/* 2-up bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FadeInSection delay={0.1}>
                <Photo
                  src="/media/brenton/magic-2.jpg"
                  alt="Brenton performing magic up close"
                  className="w-full h-64 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Photo
                  src="/media/brenton/crowd-3.jpg"
                  alt="Crowd enjoying walk-around entertainment"
                  className="w-full h-64 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
            </div>

            {/* Gameshow callout */}
            <FadeInSection delay={0.2} className="mt-10">
              <div className="bg-slate-800/60 border border-slate-700/40 rounded-3xl p-8 md:p-12 text-center">
                <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Also runs</p>
                <h3 className="text-3xl font-bold mb-3">Gameshow Fanatics</h3>
                <p className="text-gray-400 max-w-xl mx-auto mb-6">
                  A fully portable, crowd-interactive gameshow that Brenton &amp; Jolie bring right to your venue — no stage required.
                </p>
                <Link
                  to="/game-show"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-coral text-white font-bold rounded-full hover:bg-coral/90 transition-all hover:scale-105"
                >
                  See Gameshow Fanatics →
                </Link>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── JOLIE & STROLLING PERFORMERS ── */}
        <section className="py-24 bg-slate-900 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection className="text-center mb-16">
              <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-3">Cirque Jolie</p>
              <h2 className="text-5xl font-black mb-4">Stilt Walkers, Fire &amp; More</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From rainbow clown stilts to elegant moth costumes — Jolie and her performers transform any venue into a spectacle.
              </p>
            </FadeInSection>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <FadeInSection delay={0.0}>
                <Photo
                  src="/media/strolling/clown-stilt-rainbow.jpg"
                  alt="Rainbow clown stilt walker at Maui event"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.1}>
                <Photo
                  src="/media/strolling/jolie-portrait.jpg"
                  alt="Cirque Jolie portrait"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Photo
                  src="/media/strolling/superhero-stilt.jpg"
                  alt="Superhero stilt walker at kids event"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.1}>
                <Photo
                  src="/media/strolling/fire-dancing.jpg"
                  alt="Fire dancing at Maui event"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Photo
                  src="/media/strolling/moth-stilt-costume.jpg"
                  alt="Elegant moth stilt costume"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <Photo
                  src="/media/strolling/silver-white-stilt.jpg"
                  alt="Silver and white elegant stilt performer"
                  className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                />
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* ── PERFECT FOR ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
              <p className="text-gray-400 text-lg">Anywhere you want jaws to drop</p>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                {[
                  'Weddings', 'Corporate Events', 'Graduation Parties', 'Family Reunions',
                  'Company Holiday Parties', 'Milestone Birthdays', 'Resort Entertainment',
                  'Cocktail Hours', 'Festivals', 'Grand Openings', 'Luaus', 'Private Parties',
                ].map((event, i) => (
                  <span
                    key={i}
                    className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all duration-300 cursor-default"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 bg-slate-950 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection>
              <div className="relative bg-gradient-to-r from-coral via-burgundy to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Make Your Event Unforgettable
                  </h2>
                  <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                    Stilt walkers, fire dancers, strolling magicians — tell us your vision and we&rsquo;ll match the perfect performers to your event. Based on Maui &amp; available for outer island events.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/contact"
                      className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105"
                    >
                      Book Strolling Entertainment
                    </Link>
                    <a
                      href="tel:8088702102"
                      className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                    >
                      (808) 870-2102
                    </a>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </section>

      </Layout>
    </>
  );
}
