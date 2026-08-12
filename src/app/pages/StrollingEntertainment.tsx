import React, { useCallback, useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Lightbox, useLightbox, type GalleryImage } from '../components/GalleryLightbox';

const HEADLINE_JOLIE = 'Cirque Jolie — Stilt Walkers & Themed Characters';
const SUBHEAD_JOLIE =
  'Towering costumes and imaginative characters — Jolie transforms a venue into a spectacle people talk about for years.';

/** Standard two-column section row used below the feature composition. */
function Flank({
  left,
  right,
  className = '',
  gap = '1.5rem',
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={`mx-auto px-6 grid grid-cols-1 md:grid-cols-2 ${className}`}
      style={{ maxWidth: '1500px', columnGap: gap, rowGap: '2rem' }}
    >
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  );
}

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      animate={reduceMotion || isInView ? { opacity: 1, y: 0 } : {}}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Jolie feature column — sticky video/poster beside the H1 ──────────────
function JolieFeature() {
  const reduceMotion = useReducedMotion();
  const saveData =
    typeof navigator !== 'undefined' &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const stillSrc = '/media/strolling/jolie-balloons-poster.webp';

  return (
    <aside className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-stretch" aria-label="Cirque Jolie featured performer">
      <div className="lg:sticky lg:top-28">
        <figure className="relative overflow-visible lg:origin-bottom lg:scale-[1.06]">
          <div className="relative h-[68svh] min-h-[440px] max-h-[680px] lg:h-[72vh] lg:max-h-[800px]">
            {reduceMotion || saveData ? (
              <img
                src={stillSrc}
                alt="Cirque Jolie greeting guests on stilts at a Maui event"
                className="pointer-events-none h-full w-full select-none object-contain object-bottom drop-shadow-[0_24px_30px_rgba(0,0,0,0.5)]"
              />
            ) : (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={stillSrc}
                disablePictureInPicture
                aria-label="Cirque Jolie performing on stilts beneath a balloon sculpture"
                className="pointer-events-none h-full w-full select-none object-contain object-bottom drop-shadow-[0_24px_30px_rgba(0,0,0,0.5)]"
              >
                <source src="/media/video/jolie-balloons-v4.webm" type="video/webm" />
                <img
                  src={stillSrc}
                  alt="Cirque Jolie greeting guests on stilts at a Maui event"
                  className="h-full w-full object-contain object-bottom"
                />
              </video>
            )}
          </div>
        </figure>
      </div>
    </aside>
  );
}

// ── Jolie's 18 preferred stilt-walker photos ───────────────────────────────
// 3 of the 18 client-selected files are intentionally withheld from this page:
// 13-IMG_6689.jpg and 07-IMG_1596.jpg are Fable's top desktop/mobile picks for
// the site's Home hero plate — never duplicate a hero photo into a gallery.
// 01-83E27970...png (winged trio, alternate setup to the hero below) now lives
// on the Corporate page instead, so the "don't run both" near-duplicate never
// appears twice on the site.
const HERO_IMAGE: GalleryImage = {
  src: '/media/client-selected/stilt-walkers/hero-winged-trio-monkeypod.webp',
  alt: 'Three winged Cirque Jolie stilt walkers in orange, green and gold costumes under a monkeypod tree',
};

const FEATURED_IMAGES: GalleryImage[] = [
  { src: '/media/client-selected/stilt-walkers/01-crimson-wings-crowd.webp', alt: 'Crimson pleated stilt wings towering above a cheering Maui crowd' },
  { src: '/media/client-selected/stilt-walkers/02-sea-goddess-pool.webp', alt: 'Sea-goddess stilt performer pair beside a Maui resort pool' },
  { src: '/media/client-selected/stilt-walkers/03-monarch-wings-fair.webp', alt: 'Monarch butterfly stilt wings at the Maui County Fair gate' },
  { src: '/media/client-selected/stilt-walkers/04-pearl-jellyfish-ballroom.webp', alt: 'Blue pearl-jellyfish stilt performer pair in a ballroom' },
  { src: '/media/client-selected/stilt-walkers/05-glowing-jellyfish-stage.webp', alt: 'Glowing jellyfish headdress stilt performer on a dark stage' },
  { src: '/media/client-selected/stilt-walkers/06-patriotic-wings-child.webp', alt: 'White-winged stilt performer in patriotic stars and stripes with a young guest' },
  { src: '/media/client-selected/stilt-walkers/07-whale-mural-duo.webp', alt: 'Stilt performer duo posing beside a Maui whale mural' },
];

const MORE_IMAGES: GalleryImage[] = [
  { src: '/media/client-selected/stilt-walkers/08-forest-led-wings-duo.webp', alt: 'Duo of stilt performers in glowing LED angel-wing costumes with leaf crowns' },
  { src: '/media/client-selected/stilt-walkers/09-sugar-skull-witch-resort.webp', alt: 'Elaborate sugar-skull and witch-hat stilt performer duo at a Maui resort shopping center' },
  { src: '/media/client-selected/stilt-walkers/10-mario-mushroom-stilt.webp', alt: 'Stilt performer in a Super Mario mushroom costume at an indoor school event' },
  { src: '/media/client-selected/stilt-walkers/11-tribal-feather-duo-ballroom.webp', alt: 'Tribal feather stilt performer duo at an elegant ballroom event' },
  { src: '/media/client-selected/stilt-walkers/12-emerald-led-wings-solo.webp', alt: 'Solo stilt performer in glowing emerald LED butterfly wings' },
  { src: '/media/client-selected/stilt-walkers/13-scarecrow-farm-trio.webp', alt: 'Scarecrow-costumed stilt performer posing with two guests in farm costumes' },
  { src: '/media/client-selected/stilt-walkers/14-jellyfish-stage-alt.webp', alt: 'Glowing jellyfish headdress stilt performer on stage, alternate angle' },
];

const ALL_IMAGES: GalleryImage[] = [HERO_IMAGE, ...FEATURED_IMAGES, ...MORE_IMAGES];

// ── Main page ──────────────────────────────────────────────────────────────
export default function StrollingEntertainment() {
  const { index, isOpen, open, close, next, prev } = useLightbox(ALL_IMAGES.length);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleClose = useCallback(() => {
    const openedIndex = index;
    close();
    if (openedIndex !== null) triggerRefs.current[openedIndex]?.focus();
  }, [close, index]);

  return (
    <Layout title="Stilt Walkers">
      {/* ── HERO + JOLIE FEATURE ── */}
      <section className="relative bg-slate-900">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-x-8 gap-y-12 px-6 py-20 sm:py-24 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1fr)] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-10 lg:py-28 xl:gap-x-14">
          <FadeInSection className="min-w-0 lg:col-start-1 lg:row-start-1">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-coral/80">Maui · Stilts · Ambient · Walk-Around</p>
            <h1 className="text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl xl:text-8xl">
              Stilt<br /><span className="text-coral">Walkers</span>
            </h1>
            <p className="mt-8 max-w-3xl text-lg text-gray-300 md:text-xl">
              The magic that moves through the crowd — towering stilt walkers and costumed ambient characters that turn your event into a spectacle people talk about for years.
            </p>
            <Link to="/contact?service=strolling" className="mt-8 inline-block rounded-full bg-coral px-8 py-3.5 font-bold text-slate-950 shadow-xl transition-all hover:scale-105 hover:bg-coral/80">
              Book Stilt Walkers
            </Link>
          </FadeInSection>

          <JolieFeature />

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <FadeInSection className="mt-2 border-t border-slate-700/70 pt-12 lg:mt-14">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-lavender">Cirque Jolie</p>
              <h2 className="mb-3 text-3xl font-bold leading-tight text-white md:text-4xl">{HEADLINE_JOLIE}</h2>
              <p className="max-w-3xl text-base text-gray-400">{SUBHEAD_JOLIE}</p>
            </FadeInSection>

            {/* Lead gallery image */}
            <FadeInSection delay={0.05} className="mt-8">
              <button
                type="button"
                ref={(el) => { triggerRefs.current[0] = el; }}
                onClick={() => open(0)}
                aria-label={`View photo: ${HERO_IMAGE.alt}`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-coral"
              >
                <img
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>
            </FadeInSection>

            {/* Featured grid */}
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {FEATURED_IMAGES.map((img, i) => {
                const globalIndex = i + 1;
                return (
                  <FadeInSection key={img.src} delay={i * 0.05}>
                    <button
                      type="button"
                      ref={(el) => { triggerRefs.current[globalIndex] = el; }}
                      onClick={() => open(globalIndex)}
                      aria-label={`View photo: ${img.alt}`}
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-coral"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </button>
                  </FadeInSection>
                );
              })}
            </div>

            {/* More photos */}
            <FadeInSection delay={0.1} className="mt-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-lavender">More Stilt Walker Photos</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {MORE_IMAGES.map((img, i) => {
                  const globalIndex = FEATURED_IMAGES.length + 1 + i;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      ref={(el) => { triggerRefs.current[globalIndex] = el; }}
                      onClick={() => open(globalIndex)}
                      aria-label={`View photo: ${img.alt}`}
                      className="group relative aspect-square block w-full cursor-zoom-in overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-coral"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  );
                })}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {isOpen && index !== null && (
        <Lightbox images={ALL_IMAGES} index={index} onClose={handleClose} onNext={next} onPrev={prev} />
      )}

      {/* ── PERFECT FOR ── */}
      <section className="py-24 bg-slate-950 relative z-20">
        <Flank
          left={
            <FadeInSection className="md:text-right">
              <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
              <p className="text-gray-400 text-lg mb-6">Anywhere you want jaws to drop</p>
              <div className="flex flex-wrap md:justify-end gap-2">
                {['Weddings','Corporate Events','Graduation Parties','Family Reunions','Holiday Parties','Milestone Birthdays'].map((event, i) => (
                  <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all cursor-default">
                    {event}
                  </span>
                ))}
              </div>
            </FadeInSection>
          }
          right={
            <FadeInSection delay={0.15} className="md:pt-[7.25rem]">
              <div className="flex flex-wrap gap-2">
                {['Resort Entertainment','Cocktail Hours','Festivals','Grand Openings','Luaus','Private Parties'].map((event, i) => (
                  <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-4 py-2 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all cursor-default">
                    {event}
                  </span>
                ))}
              </div>
            </FadeInSection>
          }
        />
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-slate-950 relative z-20">
        <Flank
          gap="0"
          left={
            <FadeInSection>
              <div className="relative bg-gradient-to-br from-coral to-burgundy md:rounded-l-[2rem] rounded-[2rem] md:rounded-r-none p-10 md:p-12 h-full">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">Make Your Event Unforgettable</h2>
                <p className="text-white/90 mb-6">
                  Stilt walkers and ambient characters — tell us your vision and we'll match the perfect performers.
                </p>
                <Link to="/contact?service=strolling" className="inline-block px-8 py-3.5 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">
                  Book Stilt Walkers
                </Link>
              </div>
            </FadeInSection>
          }
          right={
            <FadeInSection delay={0.1}>
              <div className="relative bg-gradient-to-br from-burgundy to-lavender md:rounded-r-[2rem] rounded-[2rem] md:rounded-l-none p-10 md:p-12 h-full">
                <p className="text-white/80 uppercase tracking-[0.25em] text-xs font-bold mb-3">Maui Based · Outer Islands Available</p>
                <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">Call us and we'll talk through your vision.</p>
                <a href="tel:+18088702102" className="inline-block px-8 py-3.5 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                  Brenton · (808) 870-2102
                </a>
                <p className="text-white/80 text-sm mt-6">
                  Looking for LED performers or other themed characters?{' '}
                  <Link to="/led-performers" className="underline font-semibold hover:text-white">
                    See LED Performers →
                  </Link>
                </p>
              </div>
            </FadeInSection>
          }
        />
      </section>
    </Layout>
  );
}
