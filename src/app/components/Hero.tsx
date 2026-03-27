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

  // Scroll animations
  const rainOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const umbrellaScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  // Background Image - Using the provided composite which matches the "When it rains, it plays" theme
  const bgImage = "/media/magic/brent-umbrella-beach.jpg";

  // The umbrella canopy bottom sits at roughly 58% of the image height (596/1024).
  // We position the B&W→color dividing line to align with that.
  const canopyBottomPct = '58%';

  return (
    <div ref={containerRef} className="relative h-[150vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-900">
        
        {/* Color Background Layer (bottom half — below umbrella) */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-75"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        {/* Grayscale Background Layer (top half — raining zone) */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-50"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            clipPath: `inset(0 0 ${100 - 58}% 0)`,
          }}
        />
        
        {/* Rain Effect (fades out as umbrella covers) */}
        <motion.div style={{ opacity: rainOpacity }} className="absolute inset-0 z-10">
          <RainEffect />
        </motion.div>

        {/* Umbrella Navigation with Color Reveal */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <motion.div 
                style={{ scale: umbrellaScale }}
                className="w-full max-w-7xl relative"
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
