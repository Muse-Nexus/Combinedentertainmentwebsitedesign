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
    offset: ["start start", "end start"]
  });

  const navigate = useNavigate();

  const rainOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const umbrellaScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.75]);

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-900">

        {/* Hero background image */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ scale: bgScale, y: bgY }}
        >
          <img
            src="/media/hero-fairy-luau.jpg"
            alt="Sunset luau performance with stilt-walking fairy and casino tables"
            className="absolute inset-0 w-full h-full object-cover brightness-90"
          />
        </motion.div>

        {/* Rain Effect */}
        <motion.div style={{ opacity: rainOpacity }} className="absolute inset-0 z-10">
          <RainEffect />
        </motion.div>

        {/* Cinematic vignette */}
        <motion.div
          className="absolute inset-0 z-[11] pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background:
              'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)',
          }}
        />

        {/* Soft warm rim light */}
        <div
          className="absolute inset-0 z-[12] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 62%, rgba(255,170,70,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Umbrella Nav */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <motion.div
            style={{ scale: umbrellaScale }}
            className="w-full relative"
            animate={{ rotate: [-0.4, 0.4, -0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <UmbrellaNav />
          </motion.div>

          <motion.div
            style={{ opacity: textOpacity }}
            className="mt-8 text-center text-white z-30 max-w-2xl px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
              We've Got You Covered.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-200 drop-shadow-md">
              Entertainment that lands, even when the forecast doesn't.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-colors text-lg shadow-lg"
              >
                Plan My Covered Event
              </button>
              <button
                onClick={() => navigate('/upcoming-shows')}
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold rounded-full transition-colors text-lg backdrop-blur-sm"
              >
                See Upcoming Shows
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: rainOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white z-20 animate-bounce"
        >
          <ChevronDown size={32} />
        </motion.div>
      </div>
    </div>
  );
}
