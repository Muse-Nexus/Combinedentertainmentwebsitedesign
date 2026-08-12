import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { RainEffect } from './RainEffect';
import { UMBRELLA_SECTIONS, UmbrellaNav } from './UmbrellaNav';
import { Navbar } from './Navbar';
import { HomeContent } from './HomeContent';

const HERO_DESKTOP = '/media/hero-real-brenton-jolie.webp';
const HERO_MOBILE = '/media/hero-real-brenton-jolie-mobile.webp';
const LOGO = '/media/logos/White Primary Logo Raining Entertainment.png';
const CLOUD_TEXTURE = '/media/clouds-wipe.webp';

const SERVICE_VISUALS: Record<string, { image: string; alt: string; color: string }> = {
  '/balloon-twisting': {
    image: '/media/balloons/balloon-animals-fish-maui.webp',
    alt: 'Colorful fish balloon animals prepared for a Maui party',
    color: 'bg-pink-700',
  },
  '/game-show': {
    image: '/media/casino-gameshow/gameshow-fanatics-crowd-maui.webp',
    alt: 'Packed Gameshow Fanatics event with contestants and audience',
    color: 'bg-purple-700',
  },
  '/strolling': {
    image: '/media/client-selected/stilt-walkers/hero-winged-trio-monkeypod.webp',
    alt: 'Three Cirque Jolie winged stilt walkers welcoming guests at a Maui resort',
    color: 'bg-red-600',
  },
  '/led-performers': {
    image: '/media/client-selected/led-performers/hero-golden-wings-dusk.webp',
    alt: 'Cirque Jolie performers in glowing golden LED wings at dusk on Maui',
    color: 'bg-violet-700',
  },
  '/magic': {
    image: '/media/magic/magic-brent-live-show-maui.webp',
    alt: 'Brenton Keith performing for a live Maui audience',
    color: 'bg-teal-600',
  },
  '/casino': {
    image: '/media/casino-nite/dealer-team-roulette-maui.webp',
    alt: 'Casino NITE dealers with Roulette and casino tables at a Maui event',
    color: 'bg-rose-800',
  },
  '/balloon-decor': {
    image: '/media/balloon-decor/candy-stage-balloon-arch-maui.webp',
    alt: 'Candy-themed balloon stage installation by Cirque Jolie',
    color: 'bg-orange-500',
  },
};

const SERVICE_DECK = UMBRELLA_SECTIONS.map((section) => ({
  id: section.id,
  title: section.label,
  route: section.route,
  ...SERVICE_VISUALS[section.route],
}));

const DESKTOP_TIMELINE = {
  stormEnd: 900,
  miracleEnd: 2100,
  transitionEnd: 3000,
  discoveryEnd: 5000,
  cloudTwoEnd: 5800,
  storyEnd: 6200,
};

const MOBILE_TIMELINE = {
  stormEnd: 650,
  miracleEnd: 1450,
  transitionEnd: 2100,
  discoveryEnd: 3300,
  cloudTwoEnd: 3850,
  storyEnd: 4100,
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

function HeroImage({
  alt,
  className = '',
  decorative = false,
}: {
  alt: string;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <picture className="absolute inset-0 block overflow-hidden">
      <source media="(max-width: 767px)" srcSet={HERO_MOBILE} type="image/webp" />
      <img
        src={HERO_DESKTOP}
        alt={decorative ? '' : alt}
        aria-hidden={decorative || undefined}
        width="1672"
        height="941"
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}

function LightningFlash({ active }: { active: boolean }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!active) {
      setOpacity(0);
      return;
    }

    let nextFlashTimer = 0;
    let clearFlashTimer = 0;
    let cancelled = false;

    const triggerFlash = () => {
      if (cancelled) return;
      setOpacity(Math.random() * 0.18 + 0.06);
      clearFlashTimer = window.setTimeout(() => setOpacity(0), 60 + Math.random() * 80);
      nextFlashTimer = window.setTimeout(triggerFlash, 4200 + Math.random() * 6500);
    };

    nextFlashTimer = window.setTimeout(triggerFlash, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(nextFlashTimer);
      window.clearTimeout(clearFlashTimer);
    };
  }, [active]);

  if (!active) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-50 bg-white mix-blend-soft-light"
      style={{ opacity, transition: 'opacity 100ms ease-out' }}
    />
  );
}

function Rainbow({ active, mobile }: { active: boolean; mobile: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: active ? (mobile ? 0.58 : 0.6) : 0, scale: active ? 1 : 0.9 }}
      transition={{ duration: mobile ? 1.3 : 2.2, ease: 'easeOut', delay: 0.1 }}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[45] flex items-end justify-center overflow-hidden"
    >
      <div
        className={`${
          mobile
            ? 'h-[140vw] w-[140vw] -translate-y-[4%]'
            : 'h-[min(150vw,260svh)] w-[min(150vw,260svh)] translate-y-[58%]'
        } rounded-full`}
        style={{
          background: `radial-gradient(circle at center, transparent 58%, rgba(148,0,211,.55) 58.5%, rgba(75,0,130,.55) 59.5%, rgba(0,0,255,.55) 60.5%, rgba(0,255,0,.55) 61.5%, rgba(255,255,0,.55) 62.5%, rgba(255,127,0,.55) 63.5%, rgba(255,0,0,.55) 64.5%, transparent 65%)`,
          maskImage: 'linear-gradient(to bottom, black 35%, transparent 64%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 35%, transparent 64%)',
        }}
      />
    </motion.div>
  );
}

function Sun({ active, mobile }: { active: boolean; mobile: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ y: '28vh', opacity: 0 }}
      animate={{ y: 0, opacity: mobile ? 0.65 : 1 }}
      exit={{ y: '28vh', opacity: 0 }}
      transition={{ duration: mobile ? 1.1 : 2.4, type: 'spring', bounce: 0.16 }}
      aria-hidden="true"
      className={`pointer-events-none absolute right-[4%] top-[4%] z-[46] ${mobile ? 'h-24 w-24' : 'h-64 w-64'}`}
    >
      <div className={`${mobile ? 'h-20 w-20' : 'h-40 w-40'} relative z-10 rounded-full bg-yellow-300 blur-md shadow-[0_0_80px_rgba(255,200,0,0.75)]`} />
    </motion.div>
  );
}

function Clouds({ progress, mobile }: { progress: MotionValue<number>; mobile: boolean }) {
  const opacity = useTransform(progress, [0, 0.1, 0.7, 0.96], [0, 1, 1, 0]);
  const x = useTransform(progress, [0, 1], mobile ? ['-160%', '160%'] : ['-200%', '200%']);
  const scale = useTransform(progress, [0.1, 0.5, 0.9], [1, mobile ? 1.05 : 1.18, 1]);

  return (
    <motion.div
      style={{ opacity }}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ x, scale }} className="absolute inset-0 flex items-center justify-center">
        <img
          src={CLOUD_TEXTURE}
          alt=""
          className={`${mobile ? 'w-[225%] opacity-90' : 'w-[195%] opacity-95'} absolute h-auto max-w-none object-contain mix-blend-screen blur-[10px]`}
        />
      </motion.div>
    </motion.div>
  );
}

const DISC_INTRO_IN = [0, 0.09] as const;
const DISC_CARDS_IN = [0.16, 0.62] as const;
const DISC_CARDS_COLOR = [0.5, 0.82] as const;
const DISC_CONFETTI_AT = 0.84;
const DISC_INSTRUCT_IN = [0.86, 0.96] as const;

function DiscoveryCard({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const data = SERVICE_DECK[index];
  const slotIn = (DISC_CARDS_IN[1] - DISC_CARDS_IN[0]) / count;
  const cardInStart = DISC_CARDS_IN[0] + index * slotIn;
  const cardInEnd = cardInStart + slotIn * 0.9;
  const slotColor = (DISC_CARDS_COLOR[1] - DISC_CARDS_COLOR[0]) / count;
  const colorStart = DISC_CARDS_COLOR[0] + index * slotColor;
  const colorEnd = colorStart + slotColor * 0.9;
  const opacity = useTransform(progress, [cardInStart, cardInEnd], [0, 1], { clamp: true });
  const y = useTransform(progress, [cardInStart, cardInEnd], [110, 0], { clamp: true });
  const scale = useTransform(progress, [cardInStart, cardInEnd], [0.9, 1], { clamp: true });
  const gray = useTransform(progress, [colorStart, colorEnd], [1, 0], { clamp: true });
  const filter = useMotionTemplate`grayscale(${gray}) saturate(calc(1 + (1 - ${gray}) * 0.22))`;
  const [interactive, setInteractive] = useState(() => progress.get() >= cardInStart);
  const interactiveFrame = useRef<number | null>(null);

  useMotionValueEvent(progress, 'change', (value) => {
    if (interactiveFrame.current !== null) window.cancelAnimationFrame(interactiveFrame.current);
    interactiveFrame.current = window.requestAnimationFrame(() => {
      setInteractive(value >= cardInStart);
      interactiveFrame.current = null;
    });
  });

  useEffect(
    () => () => {
      if (interactiveFrame.current !== null) window.cancelAnimationFrame(interactiveFrame.current);
    },
    [],
  );

  return (
    <motion.article
      style={{ opacity, y, scale }}
      aria-hidden={!interactive}
      className={`service-card group relative h-[clamp(260px,44vh,460px)] w-full origin-bottom overflow-hidden rounded-3xl shadow-2xl ${interactive ? 'visible' : 'invisible pointer-events-none'}`}
    >
      <Link to={data.route} tabIndex={interactive ? 0 : -1} className="block h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral">
        <div className={`absolute inset-0 z-10 ${data.color} opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-75`} />
        <motion.img src={data.image} alt={data.alt} style={{ filter }} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-30 p-5">
          <h3 className="text-sm font-black uppercase leading-tight tracking-tight text-white lg:text-base xl:text-xl">{data.title}</h3>
          <p className="mt-2 text-xs font-semibold text-white/75 xl:text-sm">Explore service</p>
        </div>
      </Link>
    </motion.article>
  );
}

function DiscoveryScene({
  progress,
  mobile,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  mobile: boolean;
  reduceMotion: boolean;
}) {
  const [mobileIndex, setMobileIndex] = useState(0);
  const confettiFired = useRef(false);
  const mobileIndexFrame = useRef<number | null>(null);
  const introOpacity = useTransform(progress, [DISC_INTRO_IN[0], DISC_INTRO_IN[1]], [0, 1], { clamp: true });
  const introY = useTransform(progress, [DISC_INTRO_IN[0], DISC_INTRO_IN[1]], [30, 0], { clamp: true });
  const instructionOpacity = useTransform(progress, [DISC_INSTRUCT_IN[0], DISC_INSTRUCT_IN[1]], [0, 1], { clamp: true });

  useMotionValueEvent(progress, 'change', (value) => {
    const normalized = Math.max(0, Math.min(0.999, (value - 0.18) / 0.62));
    const nextIndex = Math.min(SERVICE_DECK.length - 1, Math.floor(normalized * SERVICE_DECK.length));
    if (mobileIndexFrame.current !== null) window.cancelAnimationFrame(mobileIndexFrame.current);
    mobileIndexFrame.current = window.requestAnimationFrame(() => {
      setMobileIndex(nextIndex);
      mobileIndexFrame.current = null;
    });

    if (!reduceMotion && value >= DISC_CONFETTI_AT && !confettiFired.current) {
      confettiFired.current = true;
      confetti({
        origin: { x: 0.5, y: mobile ? 0.68 : 0.58 },
        particleCount: mobile ? 36 : 100,
        spread: mobile ? 70 : 100,
        startVelocity: mobile ? 34 : 48,
        ticks: 170,
        gravity: 0.9,
        scalar: mobile ? 0.78 : 1,
        zIndex: 200,
        colors: ['#fbbf24', '#f97316', '#ef4444', '#ec4899', '#a855f7', '#22d3ee'],
      });
    } else if (value < DISC_CONFETTI_AT - 0.08 && confettiFired.current) {
      confetti.reset();
      confettiFired.current = false;
    }
  });

  useEffect(
    () => () => {
      if (mobileIndexFrame.current !== null) window.cancelAnimationFrame(mobileIndexFrame.current);
    },
    [],
  );

  const mobileCard = SERVICE_DECK[mobileIndex];

  return (
    <div className="fixed inset-0 z-[25] overflow-hidden bg-gradient-to-b from-[#e7eaf0] to-[#f4f6f8] text-slate-950">
      <div className="discovery-scene-inner absolute inset-0 flex flex-col items-center justify-center px-5 py-8">
        <motion.div style={{ opacity: introOpacity, y: introY }} className={`discovery-scene-intro ${mobile ? 'mb-5' : 'mb-8'} mx-auto max-w-4xl text-center`}>
          <h2 className="font-display font-black uppercase leading-[0.92] tracking-tighter">
            <span className="mb-1 block text-sm font-semibold tracking-[0.24em] text-slate-500 md:text-3xl">We bring the</span>
            <span className="discovery-sunshine block bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-5xl text-transparent md:text-7xl">Sunshine</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:mt-5 md:text-lg">
            Brenton Keith &amp; His Bag O&rsquo; Tricks, Cirque Jolie, and Gameshow
            Fanatics—together under one umbrella.
          </p>
        </motion.div>

        {mobile ? (
          <div className="discovery-mobile-card-wrap flex h-[52svh] w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.article
                key={mobileCard.id}
                initial={{ opacity: 0, x: 38, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -38, scale: 0.96 }}
                transition={{ duration: 0.26, ease: 'easeOut' }}
                className="discovery-mobile-card relative h-[min(48svh,420px)] w-[min(82vw,330px)] overflow-hidden rounded-[1.75rem] shadow-2xl"
              >
                <Link to={mobileCard.route} className="block h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral">
                  <img src={mobileCard.image} alt={mobileCard.alt} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/65">{mobileIndex + 1} of {SERVICE_DECK.length}</p>
                    <h3 className="mt-2 text-3xl font-black leading-none">{mobileCard.title}</h3>
                    <p className="mt-3 font-semibold text-white/80">Tap to explore</p>
                  </div>
                </Link>
              </motion.article>
            </AnimatePresence>
          </div>
        ) : (
          <div className="grid w-full max-w-7xl grid-cols-7 items-end gap-3 xl:gap-4">
            {SERVICE_DECK.map((service, index) => (
              <DiscoveryCard key={service.id} index={index} count={SERVICE_DECK.length} progress={progress} />
            ))}
          </div>
        )}

        <motion.p
          style={{ opacity: instructionOpacity }}
          aria-hidden="true"
          className="pointer-events-none fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 font-display text-sm font-medium lowercase tracking-[0.08em] text-slate-700"
        >
          keep scrolling
        </motion.p>
      </div>
    </div>
  );
}

function ReducedMotionLanding({ mobile }: { mobile: boolean }) {
  return (
    <div className="bg-slate-950">
      <Navbar />
      <section className="relative min-h-[100svh] overflow-hidden bg-[#070b22] pt-20 text-white">
        <div className={`absolute inset-x-0 top-20 ${mobile ? 'h-[55svh]' : 'bottom-0'}`}>
          <HeroImage alt="Brenton Keith and Jolie Strickland performing together at an oceanfront Maui event" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/15 via-slate-950/20 to-[#070b22]" />
        <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center px-5 pt-14 text-center md:justify-center md:pt-0">
          <img src={LOGO} alt="Raining Entertainment" width="420" height="290" className="w-48 drop-shadow-2xl md:w-72" />
          <p className="mt-5 max-w-2xl text-lg font-medium text-white/90 md:text-2xl">Magic, circus arts, Game Show NITE, Casino NITE, balloons, and face painting—one Maui team.</p>
          <div className="mt-auto w-full pb-4 md:mt-10 md:pb-0">
            <UmbrellaNav displayWidth={mobile ? 'min(100vw, 620px)' : 'min(86vw, 1000px)'} />
            <UmbrellaNav compact className="mx-auto -mt-12 max-w-6xl px-2" />
          </div>
        </div>
      </section>
      <HomeContent />
    </div>
  );
}

export function LandingPage() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const mobile = useMediaQuery('(max-width: 767px), (max-height: 620px)');
  const reduceMotion = Boolean(useReducedMotion());
  const timeline = mobile ? MOBILE_TIMELINE : DESKTOP_TIMELINE;
  const [isMiracle, setIsMiracle] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const scrollFrame = useRef<number | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = window.requestAnimationFrame(() => {
      setScrollValue(latest);
      setIsMiracle(latest > timeline.stormEnd);
      scrollFrame.current = null;
    });
  });

  useEffect(
    () => () => {
      if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    },
    [],
  );

  const stormRaw = useTransform(scrollY, [0, timeline.stormEnd], [0, 1], { clamp: true });
  const stormProgress = useSpring(stormRaw, { stiffness: mobile ? 70 : 52, damping: 22 });
  const cloudProgress = useTransform(scrollY, [timeline.miracleEnd, timeline.transitionEnd], [0, 1], { clamp: true });
  const discoveryProgress = useTransform(scrollY, [timeline.transitionEnd, timeline.discoveryEnd], [0, 1], { clamp: true });
  const cloudTwoProgress = useTransform(scrollY, [timeline.discoveryEnd, timeline.cloudTwoEnd], [0, 1], { clamp: true });
  const umbrellaTop = useTransform(stormProgress, [0, 1], [mobile ? '112vh' : '100vh', mobile ? '-2.5vh' : '-16vh']);
  const umbrellaScale = useTransform(stormProgress, [0, 1], [mobile ? 0.96 : 1, 1]);
  const umbrellaOpacity = useTransform(
    scrollY,
    [
      timeline.miracleEnd + (timeline.transitionEnd - timeline.miracleEnd) * 0.28,
      timeline.miracleEnd + (timeline.transitionEnd - timeline.miracleEnd) * 0.42,
      timeline.discoveryEnd + (timeline.cloudTwoEnd - timeline.discoveryEnd) * 0.52,
      timeline.discoveryEnd + (timeline.cloudTwoEnd - timeline.discoveryEnd) * 0.74,
      timeline.cloudTwoEnd,
      timeline.storyEnd,
    ],
    [1, 0, 0, 1, 1, 0],
    { clamp: true },
  );
  const skyOpacity = useTransform(
    scrollY,
    [
      timeline.miracleEnd + (timeline.transitionEnd - timeline.miracleEnd) * 0.38,
      timeline.miracleEnd + (timeline.transitionEnd - timeline.miracleEnd) * 0.52,
      timeline.discoveryEnd + (timeline.cloudTwoEnd - timeline.discoveryEnd) * 0.52,
      timeline.discoveryEnd + (timeline.cloudTwoEnd - timeline.discoveryEnd) * 0.76,
      timeline.cloudTwoEnd,
      timeline.storyEnd,
    ],
    [1, 0, 0, 1, 1, 0],
    { clamp: true },
  );
  const logoOpacity = useTransform(scrollY, [0, timeline.stormEnd * 0.36], [1, 0]);
  const maskLine = useMotionTemplate`calc(${umbrellaTop} + ${mobile ? '10svh' : '12vh'})`;
  const maskImage = useMotionTemplate`linear-gradient(to bottom, black ${maskLine}, transparent calc(${maskLine} + 46px))`;
  const discoveryVisible = scrollValue >= timeline.transitionEnd - 100 && scrollValue <= timeline.discoveryEnd + 100;
  const compactMenuVisible =
    scrollValue > timeline.stormEnd + 80 && scrollValue < timeline.miracleEnd - 80;
  const standardNavVisible = scrollValue >= timeline.storyEnd - 40;
  const firstUmbrellaExit =
    timeline.miracleEnd + (timeline.transitionEnd - timeline.miracleEnd) * 0.44;
  const secondUmbrellaEntrance =
    timeline.discoveryEnd + (timeline.cloudTwoEnd - timeline.discoveryEnd) * 0.48;
  const umbrellaPresent =
    scrollValue < firstUmbrellaExit ||
    (scrollValue > secondUmbrellaEntrance && scrollValue < timeline.storyEnd);
  const heroObjectPosition = mobile ? 'object-center' : 'object-top';

  useEffect(() => {
    if ((location.state as { skipAnimation?: boolean } | null)?.skipAnimation) {
      requestAnimationFrame(() => window.scrollTo({ top: timeline.storyEnd, behavior: 'auto' }));
    }
  }, [location.key, timeline.storyEnd]);

  if (reduceMotion) return <ReducedMotionLanding mobile={mobile} />;

  return (
    <div className="relative min-h-screen bg-slate-950 font-sans">
      <a
        href="#home-content"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: timeline.storyEnd, behavior: 'auto' });
          requestAnimationFrame(() => document.getElementById('home-content')?.focus());
        }}
        className="fixed left-4 top-3 z-[200] -translate-y-24 rounded-full bg-white px-5 py-3 font-bold text-slate-950 shadow-xl transition focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-coral"
      >
        Skip intro
      </a>
      {standardNavVisible && <Navbar />}

      <motion.div style={{ opacity: skyOpacity }} aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[15] h-[10svh] bg-[#070b22]" />

      <AnimatePresence>
        {scrollValue > timeline.stormEnd + 80 && scrollValue < timeline.storyEnd - 120 && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-3 top-3 z-[170] rounded-full border border-white/15 bg-slate-950/55 px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral md:right-4 md:top-4 md:px-4"
          >
            Replay
          </motion.button>
        )}
      </AnimatePresence>

      {umbrellaPresent && (
        <motion.div
          style={{ top: umbrellaTop, scale: umbrellaScale, opacity: umbrellaOpacity }}
          className="pointer-events-none fixed inset-x-0 z-[100] flex origin-top justify-center"
        >
          <div className="pointer-events-auto relative drop-shadow-2xl">
            <UmbrellaNav displayWidth={mobile ? 'min(100vw, 620px)' : 'min(88vw, 980px)'} />
            <AnimatePresence>
              {isMiracle && !mobile && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.45, opacity: 0.42 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="h-full w-full rounded-full bg-amber-100 blur-[100px] mix-blend-screen" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {compactMenuVisible && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed inset-x-3 bottom-3 z-[115] mx-auto max-w-sm md:bottom-5 md:max-w-6xl"
          >
            <UmbrellaNav compact />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ opacity: skyOpacity }}
        aria-hidden={standardNavVisible || undefined}
        className="pointer-events-none fixed inset-0 z-20 overflow-hidden bg-[#070b22]"
      >
        <div className="absolute inset-0 bg-slate-900" />
        <motion.div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-blue-200" animate={{ opacity: isMiracle ? 1 : 0 }} transition={{ duration: mobile ? 0.9 : 1.8 }} />

        <div className="absolute inset-0 overflow-hidden opacity-40 blur-2xl">
          <HeroImage decorative alt="" className="scale-110" />
        </div>

        <div className={`absolute inset-x-0 top-0 z-20 ${mobile ? 'h-[72svh]' : 'bottom-0'}`}>
          <motion.div className="relative h-full w-full overflow-hidden" animate={{ scale: isMiracle ? 1.015 : 1 }} transition={{ duration: 1.5 }}>
            <HeroImage
              alt="Brenton Keith and Jolie Strickland performing together at an oceanfront Maui event"
              className={heroObjectPosition}
            />

            <motion.div
              className="absolute inset-0 z-20"
              style={{ maskImage, WebkitMaskImage: maskImage }}
              animate={{ opacity: isMiracle ? 0 : 1 }}
              transition={{ duration: 0.8 }}
            >
              <HeroImage decorative alt="" className={`${heroObjectPosition} grayscale brightness-[0.52] contrast-125`} />
              <div className="absolute inset-0 bg-slate-950/30 mix-blend-multiply" />
              <RainEffect active={!isMiracle} intensity={mobile ? 1.2 : 2} />
            </motion.div>
          </motion.div>
        </div>

        {mobile && <div aria-hidden="true" className="absolute inset-x-0 top-0 z-[25] h-[74svh] bg-gradient-to-b from-transparent via-transparent to-[#070b22]" />}

        <motion.div className="absolute inset-0 z-10" animate={{ opacity: isMiracle ? 0 : 0.72 }} transition={{ duration: 0.8 }}>
          <RainEffect active={!isMiracle} intensity={mobile ? 0.75 : 1.3} />
        </motion.div>

        <Rainbow active={isMiracle} mobile={mobile} />
        <AnimatePresence>
          <Sun active={isMiracle} mobile={mobile} />
        </AnimatePresence>
        <LightningFlash active={!isMiracle} />

        <motion.div style={{ opacity: logoOpacity }} className={`absolute inset-0 z-40 flex flex-col items-center ${mobile ? 'justify-start pt-[14svh]' : 'justify-center'}`}>
          <img src={LOGO} alt="Raining Entertainment" width="420" height="290" className={`${mobile ? 'w-48' : 'w-64'} drop-shadow-2xl`} />
          <div className={mobile ? 'mt-8' : 'mt-12'}>
            <motion.p
              animate={{ opacity: [0.58, 1, 0.58] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-center font-display text-base font-medium lowercase tracking-[0.08em] text-white/90 drop-shadow-2xl md:text-2xl"
            >
              scroll to open the umbrella
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      <Clouds progress={cloudProgress} mobile={mobile} />
      {discoveryVisible && <DiscoveryScene progress={discoveryProgress} mobile={mobile} reduceMotion={reduceMotion} />}
      <Clouds progress={cloudTwoProgress} mobile={mobile} />

      <div style={{ height: timeline.storyEnd }} aria-hidden="true" className="pointer-events-none relative w-full" />
      <div className="relative z-30">
        <HomeContent />
      </div>
    </div>
  );
}
