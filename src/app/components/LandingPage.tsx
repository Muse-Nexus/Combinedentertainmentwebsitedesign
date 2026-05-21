import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence, useMotionValueEvent, MotionValue } from 'motion/react';
import { RainEffect } from './RainEffect';
import { UmbrellaNav } from './UmbrellaNav';
import { ArrowDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';

const heroImg = '/media/hero-fairy-luau.jpg';
const logo = '/media/logos/White Primary Logo Raining Entertainment.png';

// Assets
const magicImg = '/media/magic/brent-library-show.jpg';
const circusImg = '/media/strolling/clown-stilt-rainbow.jpg';
const gameshowImg = '/media/casino-gameshow/gameshow-outdoor-fullset.jpg';
const cloudTexture = '/media/clouds-wipe.png';

// Feathering Mask - Extra Heavy Soft Edges (shared by Clouds + cloud-wipe transition)
const featherMaskGradient = 'radial-gradient(ellipse closest-side, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.2) 80%, transparent 100%)';
const featherMask = {
  maskImage: featherMaskGradient,
  WebkitMaskImage: featherMaskGradient,
  filter: 'blur(8px)'
};

// Service Card Images
const balloonTwistingCardImg = '/media/balloons/kid-panda-facepainting.jpg';
const balloonDecorCardImg = '/media/balloon-decor/pastel-rainbow-arch.jpg';
const strollingCardImg = '/media/strolling/moth-stilt-costume.jpg';
const magicCardImg = '/media/magic/brent-umbrella-beach.jpg';
const casinoCardImg = '/media/casino-gameshow/gameshow-outdoor-fullset.jpg';

// --- SUB-COMPONENTS ---

const LightningFlash = ({ active }: { active: boolean }) => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (!active) {
      setOpacity(0);
      return;
    }
    const triggerFlash = () => {
      if (!active) return;
      setOpacity(Math.random() * 0.3 + 0.1); 
      setTimeout(() => setOpacity(0), 50 + Math.random() * 100);
      const nextDelay = 3000 + Math.random() * 8000;
      setTimeout(triggerFlash, nextDelay);
    };
    const timer = setTimeout(triggerFlash, 1000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div 
      className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-soft-light"
      style={{ opacity, transition: 'opacity 0.1s ease-out' }}
    />
  );
};

const Rainbow = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
      transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
      className="absolute inset-0 pointer-events-none z-[45] flex items-end justify-center"
    >
      <div 
        className="w-[160vw] h-[160vw] rounded-full translate-y-[35%]"
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 58%,
              rgba(148, 0, 211, 0.6) 58.5%,
              rgba(75, 0, 130, 0.6) 59.5%,
              rgba(0, 0, 255, 0.6) 60.5%,
              rgba(0, 255, 0, 0.6) 61.5%,
              rgba(255, 255, 0, 0.6) 62.5%,
              rgba(255, 127, 0, 0.6) 63.5%,
              rgba(255, 0, 0, 0.6) 64.5%,
              transparent 65%
            )
          `,
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 60%)'
        }}
      />
    </motion.div>
  );
};

const Sun = ({ active }: { active: boolean }) => {
  if (!active) return null;
  
  return (
    <motion.div
      initial={{ y: '50vh', x: '10vw', opacity: 0 }}
      animate={{ 
        y: '5vh', 
        x: '0vw',
        opacity: 1 
      }}
      exit={{ y: '50vh', x: '10vw', opacity: 0 }}
      transition={{ duration: 3, type: "spring", bounce: 0.2, delay: 0.5 }}
      className="absolute right-[5%] top-[5%] w-64 h-64 z-[46] pointer-events-none"
    >
        <div className="w-40 h-40 bg-yellow-300 rounded-full blur-md shadow-[0_0_80px_rgba(255,200,0,0.8)] relative z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-yellow-200/40 to-transparent blur-2xl z-0 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-2 bg-yellow-100/20 blur-sm rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-2 bg-yellow-100/20 blur-sm -rotate-45" />
    </motion.div>
  );
};

// Cloud Crossing Component - Single "Film Wipe"
const Clouds = ({ scrollProgress }: { scrollProgress: any }) => {
  
  // Opacity: Fades out aggressively at the end to clear
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.7, 0.95], [0, 1, 1, 0]);

  // Horizontal Movement (Wipe Left to Right)
  // Single massive bank moving from far left (-200%) to far right (200%)
  const wipeX = useTransform(
      scrollProgress, 
      [0, 1], 
      ["-200%", "200%"]
  );
  
  const scale = useTransform(scrollProgress, [0.1, 0.5, 0.9], [1, 1.2, 1]);

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center overflow-hidden">
       
       {/* Single Massive Cloud Bank (Wiping Left -> Right) */}
       <motion.div 
          style={{ x: wipeX, scale }}
          className="absolute top-0 bottom-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center"
       >
          <div className="absolute inset-0 w-full h-full mix-blend-screen flex items-center justify-center">
             
             {/* Center Main Cloud */}
             <img 
                src={cloudTexture} 
                className="absolute w-[180%] h-auto max-w-none opacity-100 object-contain rotate-12 scale-125" 
                alt="cloud-main" 
                style={featherMask}
             />
             
             {/* Supporting Clouds to fill gaps and create "wall" effect */}
             <img 
                src={cloudTexture} 
                className="absolute left-[-40%] top-[-20%] w-[140%] h-auto max-w-none opacity-80 object-contain -rotate-12" 
                alt="cloud-top-left" 
                style={featherMask}
             />
             <img 
                src={cloudTexture} 
                className="absolute left-[-30%] bottom-[-20%] w-[150%] h-auto max-w-none opacity-70 object-contain rotate-6" 
                alt="cloud-bottom-left" 
                style={featherMask}
             />
             
             {/* Trailing Clouds */}
             <img 
                src={cloudTexture} 
                className="absolute right-[-20%] top-[10%] w-[120%] h-auto max-w-none opacity-60 object-contain -rotate-6" 
                alt="cloud-trail" 
                style={featherMask}
             />
          </div>
       </motion.div>

    </motion.div>
  );
};


// ───────────────────────────────────────────────────────────────────────────
// DISCOVERY SECTION
// A fixed, full-viewport scene that runs entirely off page-scroll progress.
// No internal scrolling. No header / footer. No vertical motion of the page.
// Cards drop in one-at-a-time, then colorize one-at-a-time, then a passive
// "Scroll to continue" instruction appears. When scroll passes the end of
// the discovery range, the second cloud transition takes over.
// ───────────────────────────────────────────────────────────────────────────

const SERVICE_DECK = [
  { id: 'balloon-twisting', title: 'Balloon Twisting & Facepainting', img: balloonTwistingCardImg, color: 'bg-pink-700' },
  { id: 'balloon-decor',    title: 'Balloon Decor',                   img: balloonDecorCardImg,    color: 'bg-orange-500' },
  { id: 'strolling',        title: 'Strolling Entertainment',         img: strollingCardImg,       color: 'bg-red-600' },
  { id: 'magic',            title: 'Magic',                           img: magicCardImg,           color: 'bg-teal-500' },
  { id: 'casino-gameshow',  title: 'Casino & Gameshow',               img: casinoCardImg,          color: 'bg-purple-700' },
];

// Discovery sub-timeline (all values are fractions of `discoveryProgress` 0→1)
const DISC_INTRO_IN     = [0.00, 0.08] as const;
const DISC_SUN_COLOR    = [0.06, 0.18] as const;
const DISC_CARDS_IN     = [0.18, 0.55] as const;   // 5 cards drop in
const DISC_CARDS_COLOR  = [0.55, 0.82] as const;   // 5 cards colorize
const DISC_CONFETTI_AT  = 0.83;
const DISC_INSTRUCT_IN  = [0.85, 0.95] as const;

const DiscoveryCard = ({
  index,
  count,
  progress,
  data,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  data: { id: string; title: string; img: string; color: string };
}) => {
  const [inStart, inEnd] = DISC_CARDS_IN;
  const slotIn = (inEnd - inStart) / count;
  const cardInStart = inStart + index * slotIn;
  const cardInEnd = cardInStart + slotIn * 0.9;

  const [colStart, colEnd] = DISC_CARDS_COLOR;
  const slotCol = (colEnd - colStart) / count;
  const cardColStart = colStart + index * slotCol;
  const cardColEnd = cardColStart + slotCol * 0.9;

  const opacity = useTransform(progress, [cardInStart, cardInEnd], [0, 1], { clamp: true });
  const y       = useTransform(progress, [cardInStart, cardInEnd], [160, 0],  { clamp: true });
  const scale   = useTransform(progress, [cardInStart, cardInEnd], [0.88, 1], { clamp: true });
  const gray    = useTransform(progress, [cardColStart, cardColEnd], [1, 0],  { clamp: true });
  const filter  = useMotionTemplate`grayscale(${gray}) saturate(calc(1 + (1 - ${gray}) * 0.3))`;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="service-card group relative flex flex-col h-[500px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl origin-bottom"
    >
      <Link to={`/${data.id}`} className="block w-full h-full">
        <div className={`absolute inset-0 ${data.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10 mix-blend-multiply`} />
        <motion.img
          src={data.img}
          alt={data.title}
          style={{ filter }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter leading-none">
            {data.title}
          </h3>
          <div className="h-1 w-12 bg-white rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
          <p className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            Explore Service &rarr;
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const DiscoveryScene = ({
  visible,
  progress,
}: {
  visible: boolean;
  progress: MotionValue<number>;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const confettiFiredRef = useRef(false);

  // Intro copy
  const introOpacity = useTransform(progress, [DISC_INTRO_IN[0], DISC_INTRO_IN[1]], [0, 1], { clamp: true });
  const introY       = useTransform(progress, [DISC_INTRO_IN[0], DISC_INTRO_IN[1]], [40, 0], { clamp: true });

  // Sunshine word colorize (1 = grayscale, 0 = full color)
  const sunMix = useTransform(progress, [DISC_SUN_COLOR[0], DISC_SUN_COLOR[1]], [1, 0], { clamp: true });
  const sunFilter = useMotionTemplate`grayscale(${sunMix}) brightness(calc(1 - ${sunMix} * 0.4))`;

  // Instruction
  const instructOpacity = useTransform(progress, [DISC_INSTRUCT_IN[0], DISC_INSTRUCT_IN[1]], [0, 1], { clamp: true });
  const instructY       = useTransform(progress, [DISC_INSTRUCT_IN[0], DISC_INSTRUCT_IN[1]], [20, 0], { clamp: true });

  // Fire confetti once we cross the trigger point.
  useMotionValueEvent(progress, 'change', (p) => {
    if (!visible) return;
    if (p >= DISC_CONFETTI_AT && !confettiFiredRef.current) {
      confettiFiredRef.current = true;
      const grid = gridRef.current;
      const cards = grid?.querySelectorAll<HTMLElement>('.service-card');
      const center = cards?.[Math.floor((cards?.length || 1) / 2)];
      const r = center?.getBoundingClientRect();
      const x = r ? (r.left + r.width / 2) / window.innerWidth : 0.5;
      const y = r ? (r.top + r.height / 2) / window.innerHeight : 0.5;
      const defaults = { origin: { x, y }, spread: 90, ticks: 240, gravity: 0.9, scalar: 1.1, zIndex: 200 };
      confetti({ ...defaults, particleCount: 140, startVelocity: 60, colors: ['#fbbf24', '#f97316', '#ef4444', '#ec4899', '#a855f7', '#22d3ee'] });
      setTimeout(() => confetti({ ...defaults, particleCount: 90, startVelocity: 42, spread: 130, scalar: 0.95 }), 180);
      setTimeout(() => confetti({ ...defaults, particleCount: 70, startVelocity: 32, spread: 170, scalar: 0.85 }), 420);
    } else if (p < DISC_CONFETTI_AT - 0.05) {
      // Re-arm when scrolling back up so a return scroll re-fires.
      confettiFiredRef.current = false;
    }
  });

  return (
    <motion.div
      aria-hidden={!visible}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[25] overflow-hidden bg-gradient-to-b from-[#e6e9f0] to-[#eef1f5]"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Intro Text */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h2 className="font-display font-black uppercase tracking-tighter leading-[0.95] text-slate-900">
            <span className="block text-2xl md:text-4xl text-slate-500 font-light tracking-[0.25em] mb-2">
              We Bring The
            </span>
            <motion.span
              style={{ filter: sunFilter }}
              className="block text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500"
            >
              Sunshine
            </motion.span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            Merging <strong className="text-slate-900">Magic Brent</strong>,{' '}
            <strong className="text-slate-900">Cirque Jolie</strong>, and{' '}
            <strong className="text-slate-900">Gameshow Fanatics</strong> into one spectacular experience.
          </p>
        </motion.div>

        {/* Scroll-revealed cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end w-full max-w-7xl"
        >
          {SERVICE_DECK.map((s, i) => (
            <DiscoveryCard key={s.id} index={i} count={SERVICE_DECK.length} progress={progress} data={s} />
          ))}
        </div>

        {/* Passive scroll-to-continue instruction (NOT a button) */}
        <motion.div
          style={{ opacity: instructOpacity, y: instructY }}
          className="mt-12 flex flex-col items-center gap-3 text-slate-700"
        >
          <span className="text-sm md:text-base font-bold uppercase tracking-[0.3em]">
            Scroll to continue
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};


export const LandingPage = () => {
  const { scrollY } = useScroll();
  const [isMiracle, setIsMiracle] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [revealText, setRevealText] = useState(false);
  const [scrollVal, setScrollVal] = useState(0);

  // --- SCROLL TIMELINE ---
  //
  //   0 ───────── STORM_END ───── MIRACLE_END ─── TRANSITION_END
  //   storm        umbrella deploys     first cloud transition
  //
  //   TRANSITION_END ───────── DISCOVERY_END ───── CLOUD2_END
  //   pinned discovery scene    second cloud transition
  //
  //   After CLOUD2_END: the "fully realized" Home content takes over and
  //   the page scrolls normally with no further scripted animation.

  const STORM_END = 1500;
  const MIRACLE_END = 3800;
  const TRANSITION_END = 5800;
  const DISCOVERY_END = TRANSITION_END + 4200;   // pinned discovery scroll range
  const CLOUD2_END    = DISCOVERY_END + 1600;    // second cloud transition

  // Tail buffer must exceed one viewport height, otherwise `scrollY` (which
  // tops out at documentHeight − viewportHeight) can never actually reach
  // CLOUD2_END and the second cloud transition never fully resolves.
  // 1200px comfortably covers any common viewport while keeping the tail
  // short enough that it feels like a single continuous scroll.
  const TOTAL_SCROLL_HEIGHT = CLOUD2_END + 1200;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollVal(latest);

    // UMBRELLA/MIRACLE STATE
    if (latest > STORM_END && !isMiracle) {
      setIsMiracle(true);
    } else if (latest < STORM_END && isMiracle) {
      setIsMiracle(false);
    }

    // LANDED STATE
    // Trigger when clouds are 40% through crossing (earlier reveal)
    const triggerPoint = MIRACLE_END + ((TRANSITION_END - MIRACLE_END) * 0.4);
    
    if (latest > triggerPoint && !isLanded) {
        setIsLanded(true);
    } else if (latest < triggerPoint && isLanded) {
        setIsLanded(false);
    }

    // Reveal styled text overlay once the umbrella has finished arriving
    // at the top (slightly before the very end so the overlay can play
    // alongside the final settle). Flips back off if the user scrolls
    // back up so the entrance can replay.
    const textTrigger = STORM_END * 0.92;
    if (latest > textTrigger && !revealText) {
        setRevealText(true);
    } else if (latest < textTrigger && revealText) {
        setRevealText(false);
    }
  });

  const stormRaw = useTransform(scrollY, [0, STORM_END], [0, 1], { clamp: true });
  const stormProgress = useSpring(stormRaw, { stiffness: 45, damping: 20 });

  const cloudProgress = useTransform(
    scrollY, 
    [MIRACLE_END, TRANSITION_END], 
    [0, 1],
    { clamp: true }
  );

  // Pinned-discovery phase progress (0 → 1).
  const discoveryProgress = useTransform(
    scrollY,
    [TRANSITION_END, DISCOVERY_END],
    [0, 1],
    { clamp: true }
  );

  // Second cloud transition progress (0 → 1).
  const cloud2Progress = useTransform(
    scrollY,
    [DISCOVERY_END, CLOUD2_END],
    [0, 1],
    { clamp: true }
  );

  const umbrellaTop = useTransform(stormProgress, [0, 1], ["100vh", "-5.5vh"]);
  const umbrellaScale = useTransform(stormProgress, [0, 1], [1, 1.05]);
  // Umbrella hides during cloud #1, reappears as the second cloud transition
  // reveals the Home scene — by then it should be back on screen as the nav.
  const umbrellaOpacity = useTransform(
    scrollY,
    [MIRACLE_END + (TRANSITION_END - MIRACLE_END) * 0.3,
     MIRACLE_END + (TRANSITION_END - MIRACLE_END) * 0.4,
     DISCOVERY_END + (CLOUD2_END - DISCOVERY_END) * 0.55,
     DISCOVERY_END + (CLOUD2_END - DISCOVERY_END) * 0.75],
    [1, 0, 0, 1],
    { clamp: true }
  );

  const maskLine = useMotionTemplate`calc(${umbrellaTop} + 12vh)`;
  const maskImage = useMotionTemplate`linear-gradient(to bottom, black ${maskLine}, transparent calc(${maskLine} + 50px))`;
  const logoOpacity = useTransform(scrollY, [0, STORM_END * 0.3], [1, 0]);
  // Corner controls — appear once the storm has lifted (post-miracle).
  // The top-right reset button rewinds the scroll-driven sequence to 0.
  const cornerOpacity = useTransform(scrollY, [STORM_END, MIRACLE_END], [0, 1], { clamp: true });
  const resetAnimation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // When the user lands on `/` from any inner-page logo click, jump
  // straight to the post-animation state instead of replaying the
  // storm → miracle → discovery sequence. The inner-page logos pass
  // `state={{ skipAnimation: true }}` for this purpose.
  const location = useLocation();
  useEffect(() => {
    if ((location.state as { skipAnimation?: boolean } | null)?.skipAnimation) {
      // Wait one frame so the scroll spacer has rendered and the page
      // actually has the height to receive a jump-to-bottom scroll.
      requestAnimationFrame(() => {
        window.scrollTo({ top: TOTAL_SCROLL_HEIGHT, behavior: 'auto' });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
  // Sky scene hides under cloud #1, then re-emerges as cloud #2 resolves —
  // returning the page to the same calm post-storm state it was in just
  // before the first cloud transition started.
  const skyOpacity = useTransform(
    scrollY,
    [
      MIRACLE_END + (TRANSITION_END - MIRACLE_END) * 0.4,
      MIRACLE_END + (TRANSITION_END - MIRACLE_END) * 0.5,
      DISCOVERY_END + (CLOUD2_END - DISCOVERY_END) * 0.55,
      DISCOVERY_END + (CLOUD2_END - DISCOVERY_END) * 0.75,
    ],
    [1, 0, 0, 1],
    { clamp: true }
  );

  // Discovery scene visibility window: between the end of cloud #1 and the
  // start of cloud #2 (with a tiny crossfade at each edge).
  const discoveryVisible =
    scrollVal >= TRANSITION_END - 200 && scrollVal <= DISCOVERY_END + 200;

  return (
    <div className="relative bg-slate-950 font-sans min-h-screen">

      {/* --- TOP HEADER BAND ---
          Solid dark-navy strip at the top of the page so the deployed
          umbrella canopy lands here instead of covering the hero image.
          Color matches the attached swatch (deep midnight navy). */}
      <div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[10vh] z-[15] pointer-events-none"
        style={{ backgroundColor: '#070B22' }}
      />

      {/* --- RESET CONTROL (top-right of landing) ---
          Rewinds the scroll-driven animation back to the very beginning
          so the user can replay the storm → miracle → discovery sequence.
          Fades in once the storm has lifted. */}
      <motion.button
        onClick={resetAnimation}
        style={{ opacity: cornerOpacity }}
        className="fixed top-4 right-4 z-[120] px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
        aria-label="Replay animation from start"
      >
        Reset
      </motion.button>

      {/* --- FIXED NAV --- */}
      <motion.div
            style={{ 
              top: umbrellaTop,
              scale: umbrellaScale,
              opacity: umbrellaOpacity,
              position: 'fixed',
              left: 0,
              right: 0,
              zIndex: 100 
            }}
            className="flex justify-center pointer-events-none origin-top" 
        >
            <div className="relative pointer-events-auto drop-shadow-2xl">
               <UmbrellaNav revealText={revealText} />
               <AnimatePresence>
                 {isMiracle && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.6 }}
                      exit={{ opacity: 0, duration: 0.5 }}
                      transition={{ 
                         duration: 2, 
                         repeat: Infinity, 
                         repeatType: "reverse" 
                      }}
                      className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] -z-10 pointer-events-none"
                    >
                       <div className="w-full h-full rounded-full bg-white blur-[80px]" />
                       <div className="absolute inset-0 w-full h-full rounded-full bg-amber-200 blur-[100px] mix-blend-screen" />
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>
      </motion.div>

      {/* --- SKY SCENE ---
          Top inset matches the header band height so the hero image starts
          below the header and the umbrella canopy sits in the header band. */}
      <motion.div 
        style={{ opacity: skyOpacity }}
        className="fixed top-[10vh] left-0 right-0 bottom-0 overflow-hidden pointer-events-none bg-black z-20"
      >
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-slate-900 z-0" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-sky-400 to-blue-200 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMiracle ? 1 : 0 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className={`absolute inset-0 scale-110 transition-all duration-2000 ${isMiracle ? 'opacity-30 blur-3xl' : 'opacity-50 blur-2xl'}`}>
              <img src={heroImg} className="w-full h-full object-cover" alt="Background Blur" />
           </div>
        </div>

        {/* STORM */}
        <motion.div 
           className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
           animate={{ opacity: isMiracle ? 0 : 1 }}
        >
            <RainEffect intensity={2.0} /> 
        </motion.div>

        {/* HERO IMAGE */}
        <div className="absolute inset-0 z-20">
            <motion.div 
              className="relative w-full h-full overflow-hidden bg-black"
              initial={{ scale: 1 }}
              animate={{ 
                scale: isMiracle ? 1.02 : 1,
              }}
              transition={{ duration: 2 }}
            >
               <motion.img 
                 src={heroImg} 
                 className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                 style={{ filter: isMiracle ? 'brightness(1.15) saturate(1.2)' : 'brightness(1)' }}
                 alt="Sunny Hero"
               />
               <motion.div 
                  className="absolute inset-0 z-20"
                  style={{ maskImage, WebkitMaskImage: maskImage }}
                  animate={{ opacity: isMiracle ? 0 : 1 }}
                  transition={{ duration: 1 }}
               >
                  <img 
                     src={heroImg} 
                     className="w-full h-full object-cover grayscale brightness-90 contrast-125" 
                     alt="Storm Hero" 
                  />
                  <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                  <RainEffect intensity={4.0} />
               </motion.div>
               <AnimatePresence>
                 {isMiracle && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: [0, 0.8, 0] }}
                     transition={{ duration: 1, times: [0, 0.1, 1] }}
                     className="absolute inset-0 bg-white z-50 mix-blend-hard-light"
                   />
                 )}
               </AnimatePresence>
               <div className="absolute inset-0 border border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none z-30" />
            </motion.div>
        </div>

        {/* MIRACLE ELEMENTS */}
        <Rainbow active={isMiracle} />
        <AnimatePresence>
          <Sun active={isMiracle} />
        </AnimatePresence>

        <div className="absolute inset-0 z-30 pointer-events-none">
             <LightningFlash active={!isMiracle} />
        </div>

        {/* HERO TEXT */}
        <motion.div 
            style={{ opacity: logoOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
        >
             <img 
                src={logo} 
                alt="Raining Entertainment" 
                className="w-64 mb-6 drop-shadow-2xl" 
             />
             <div className="mt-12">
                <motion.div 
                  className="text-3xl font-bold text-white/90 tracking-widest drop-shadow-2xl"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  SCROLL
                </motion.div>
                <motion.div 
                  className="mt-4 flex justify-center"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-8 h-8 text-white opacity-70" />
                </motion.div>
             </div>
        </motion.div>

      </motion.div>
      
      {/* CLOUD TRANSITION #1 — covers the storm→discovery handoff */}
      <Clouds scrollProgress={cloudProgress} />

      {/* DISCOVERY SCENE — pinned, fully driven by scroll, no internal scroll */}
      <DiscoveryScene visible={discoveryVisible} progress={discoveryProgress} />

      {/* CLOUD TRANSITION #2 — covers the discovery→Home handoff */}
      <Clouds scrollProgress={cloud2Progress} />

      {/* --- SCROLL TRACK SPACER ---
          Drives every scroll-locked animation above. After CLOUD2_END the
          page simply settles back into the post-storm landing scene
          (sunny hero + umbrella docked at top), exactly the state we were
          in just before the first cloud transition began. */}
      <div style={{ height: TOTAL_SCROLL_HEIGHT }} className="w-full pointer-events-none relative" aria-hidden="true" />
    </div>
  );
};