import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { UmbrellaNav } from './UmbrellaNav';
import { RainEffect } from './RainEffect';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const navigate = useNavigate();

  // Rain fades out as you scroll down
  const rainOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const umbrellaScale = useTransform(scrollYProgress, [0, 0.3], [0.82, 1]);
  // Headline is visible immediately — not gated behind scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35], [0.95, 1, 0]);

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.75]);

  const bgImage = '/media/magic/brent-umbrella-beach.jpg';

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-900">

        {/* Cinemagraph: Color background with breathing scale + parallax drift */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            scale: bgScale,
            y: bgY,
          }}
          animate={{
            filter: [
              'brightness(0.68) saturate(1.0)',
              'brightness(0.75) saturate(1.1)',
              'brightness(0.68) saturate(1.0)',
            ],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grayscale overlay — top half (storm zone) */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125 brightness-50"
          style={{
            backgroundImage: `url(${bgImage})`,
            clipPath: 'inset(0 0 42% 0)',
            scale: bgScale,
            y: bgY,
          }}
        />

        {/* Rain */}
        <motion.div style={{ opacity: rainOpacity }} className="absolute inset-0 z-10">
          <RainEffect />
        </motion.div>

        {/* Cinematic vignette */}
        <motion.div
          className="absolute inset-0 z-[11] pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)',
          }}
        />

        {/* Warm rim light under umbrella */}
        <div
          className="absolute inset-0 z-[12] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 62%, rgba(255,170,70,0.16) 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">

          {/* Umbrella Nav */}
          <motion.div
            style={{ scale: umbrellaScale }}
            className="w-full max-w-7xl relative"
            animate={{ rotate: [-0.4, 0.4, -0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <UmbrellaNav />
          </motion.div>

          {/* Hero Copy — visible immediately, fades out on scroll */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="mt-6 text-center text-white z-30 max-w-2xl px-4"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
              className="text-5xl md:text-7xl font-black mb-3 drop-shadow-lg leading-tight"
            >
              We&rsquo;ve Got You{' '}
              <span className="text-orange-400">Covered.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
              className="text-xl md:text-2xl mb-8 text-slate-200 drop-shadow-md"
            >
              Maui&rsquo;s premier entertainment duo — magic, circus &amp; gameshow all under one umbrella.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold rounded-full transition-all text-lg shadow-lg hover:shadow-orange-500/40"
              >
                Plan My Event ✨
              </button>
              <button
                onClick={() => navigate('/upcoming-shows')}
                className="px-8 py-3 bg-transparent border-2 border-white/70 hover:bg-white/10 hover:border-white text-white font-bold rounded-full transition-all text-lg backdrop-blur-sm"
              >
                See Upcoming Shows
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: rainOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} className="opacity-70" />
        </motion.div>
      </div>
    </div>
  );
}
