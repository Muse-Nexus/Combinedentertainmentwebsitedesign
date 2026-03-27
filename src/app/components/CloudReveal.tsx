import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function CloudReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Clouds move apart
  const xLeft = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "-100%"]);
  const xRight = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

  // Jolie scales up slightly
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.9, 1.1]);

  // Using the composite image focused on the woman (Jolie) on stilts
  // The composite has her on the right side.
  const jolieImage = "/media/strolling/silver-white-stilt.jpg"; 
  const cloudImage = "/media/clouds-wipe.png";

  return (
    <div ref={containerRef} className="relative h-[150vh] overflow-hidden bg-sky-300">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Revealed Image (Jolie) */}
        <motion.div 
            style={{ scale }}
            className="absolute inset-0 z-0 flex items-center justify-center"
        >
             <div className="relative w-full h-full max-w-4xl mx-auto">
                 {/* 
                    We use object-position to focus on her. 
                    In the composite, she is on the right, colorful side. 
                    Let's try to center the right side.
                 */}
                 <img 
                    src={jolieImage} 
                    alt="Jolie on Stilts" 
                    className="w-full h-full object-cover object-right-top"
                 />
                 
                 <div className="absolute bottom-20 left-10 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl max-w-md">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Elevated Entertainment</h2>
                    <p className="text-slate-700">
                        Whether it's stilt walking, aerial arts, or interactive characters, 
                        Cirque Jolie brings a higher level of performance to your event.
                    </p>
                 </div>
             </div>
        </motion.div>

        {/* Clouds Overlay - Split in middle */}
        <motion.div style={{ x: xLeft, opacity }} className="absolute inset-y-0 left-0 w-1/2 z-10 bg-no-repeat bg-cover bg-right"
            // Using the cloud image, flipped or positioned
        >
             <img src={cloudImage} className="w-full h-full object-cover object-left" alt="Clouds" />
        </motion.div>
        
        <motion.div style={{ x: xRight, opacity }} className="absolute inset-y-0 right-0 w-1/2 z-10 bg-no-repeat bg-cover bg-left">
             <img src={cloudImage} className="w-full h-full object-cover object-right" alt="Clouds" />
        </motion.div>

        <motion.div style={{ opacity }} className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <h2 className="text-6xl font-bold text-white drop-shadow-xl tracking-wider uppercase">Reveal the Magic</h2>
        </motion.div>

      </div>
    </div>
  );
}
