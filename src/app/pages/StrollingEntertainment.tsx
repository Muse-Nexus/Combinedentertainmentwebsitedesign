import React, { useRef, useState, useEffect } from 'react';
import { AlphaVideoPlayer } from '../components/AlphaVideoPlayer';
import { Layout } from '../components/Layout';
import { motion, useInView, AnimatePresence } from 'motion/react';
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

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          key="lightbox-img"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-[92vw] max-h-[92vh]"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[88vh] rounded-2xl shadow-2xl object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/60 hover:bg-black/90 text-white rounded-full text-xl font-bold transition-all"
            aria-label="Close"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Photo — no forced crop, clickable ────────────────────────────────────────
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
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  if (errored) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-800/60 border-2 border-dashed border-slate-600 rounded-2xl text-slate-500 text-xs text-center p-4 min-h-[200px] ${className}`}>
        <span className="text-2xl mb-1">📸</span>
        <span className="font-mono opacity-60">{src.split('/').pop()}</span>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative group cursor-zoom-in overflow-hidden rounded-2xl shadow-xl ${className}`}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setErrored(true)}
        />
        {/* hover overlay hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full font-medium">
            View full photo
          </span>
        </div>
      </div>
      {lightboxOpen && (
        <Lightbox src={src} alt={alt} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}

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

            {/* Wide crowd gameshow shot */}
            <FadeInSection className="mb-6">
              <Photo
                src="/media/brenton/gameshow-crowd.jpg"
                alt="Brenton running walk-around gameshow in a packed Lahaina street crowd"
              />
            </FadeInSection>

            {/* 3-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <FadeInSection delay={0.1}>
                <Photo
                  src="/media/brenton/patriotic-stilt.jpg"
                  alt="Brenton and Jolie in patriotic costumes at a resort event"
                />
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Photo
                  src="/media/brenton/gameshow-crowd.jpg"
                  alt="Brenton doing fire magic at an outdoor lawn event"
                />
              </FadeInSection>
              <FadeInSection delay={0.3}>
                <Photo
                  src="/media/brenton/fourth-of-july.jpg"
                  alt="Brenton with Jolie on stilts at a 4th of July celebration"
                />
              </FadeInSection>
            </div>

            {/* 2-col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FadeInSection delay={0.1}>
                <Photo
                  src="/media/brenton/table-magic.jpg"
                  alt="Brenton performing close-up table magic at a restaurant"
                />
              </FadeInSection>
              <FadeInSection delay={0.2}>
                <Photo
                  src="/media/brenton/lawn-magic.jpg"
                  alt="Brenton doing fire magic at an outdoor lawn gala"
                />
              </FadeInSection>
            </div>

            {/* balloon crew full width */}
            <FadeInSection className="mb-12">
              <Photo
                src="/media/brenton/balloon-crew.jpg"
                alt="Brenton with stilt walkers and giant balloon sculptures at a festival"
              />
            </FadeInSection>

            {/* Pull quote */}
            <FadeInSection className="text-center max-w-3xl mx-auto">
              <blockquote className="text-2xl md:text-3xl font-light text-white/80 italic leading-relaxed">
                "He had the whole crowd in the palm of his hand before they even knew what hit them."
              </blockquote>
              <p className="text-coral mt-4 font-semibold tracking-wider uppercase text-sm">— Maui Wedding Client</p>
            </FadeInSection>
          </div>
        </section>

        {/* ── JOLIE — Cirque & Stilt Performers ── */}
        <section className="py-24 bg-slate-900 relative z-20">
          <div className="container mx-auto px-4">
            <FadeInSection className="text-center mb-16">
              <p className="text-lavender font-semibold tracking-[0.3em] uppercase text-sm mb-3">Cirque Jolie</p>
              <h2 className="text-5xl font-black mb-4">Stilt Walkers, Fire &amp; Aerial</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Towering stilt performers, fire dancing, costume characters, and aerial arts that transform any event into a full-scale spectacle.
              </p>
            </FadeInSection>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: '/media/strolling/rainbow-clown-stilts.jpg', alt: 'Rainbow clown stilt performer with kids' },
                { src: '/media/strolling/fire-dancer-night.jpg', alt: 'Fire dancer performing at night event' },
                { src: '/media/strolling/jolie-stilts-resort.jpg', alt: 'Jolie on stilts at a Maui resort' },
                { src: '/media/strolling/aerial-performer.jpg', alt: 'Aerial performer in costume' },
                { src: '/media/strolling/costume-character.jpg', alt: 'Elaborate costume character greeting guests' },
                { src: '/media/strolling/stilt-duo.jpg', alt: 'Stilt duo performing at a gala' },
              ].map(({ src, alt }, i) => (
                <FadeInSection key={src} delay={i * 0.08}>
                  <Photo src={src} alt={alt} />
                </FadeInSection>
              ))}
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
