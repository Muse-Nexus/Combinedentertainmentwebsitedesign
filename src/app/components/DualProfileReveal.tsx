import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'motion/react';

/**
 * DualProfileReveal — two portraits (Brenton & Jolie) drift in from opposite sides,
 * overlap in a playful blend, then settle. Inspired by
 * https://codepen.io/ycw/pen/xxVPMwB but written from scratch.
 */
interface DualProfileRevealProps {
  leftImage: string;
  rightImage: string;
  leftName?: string;
  rightName?: string;
  caption?: string;
}

export function DualProfileReveal({
  leftImage,
  rightImage,
  leftName = 'Brenton',
  rightName = 'Jolie',
  caption = 'The act that makes the storm look like it was in on it.',
}: DualProfileRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const leftX = useTransform(scrollYProgress, [0.0, 0.5, 1.0], ['-40vw', '-8vw', '-15vw']);
  const rightX = useTransform(scrollYProgress, [0.0, 0.5, 1.0], ['40vw', '8vw', '15vw']);

  const leftRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 4]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -4]);

  const saturation = useTransform(scrollYProgress, [0.35, 0.55], [1, 1.4]);
  const contrast = useTransform(scrollYProgress, [0.35, 0.55], [1, 1.15]);
  const rightFilter = useMotionTemplate`saturate(${saturation}) contrast(${contrast})`;

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.08, 1]);

  // Cursor parallax
  const mouseX = useSpring(0, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) / rect.width);
      mouseY.set((e.clientY - cy) / rect.height);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const leftPX = useTransform(mouseX, (v) => v * -20);
  const leftPY = useTransform(mouseY, (v) => v * -10);
  const rightPX = useTransform(mouseX, (v) => v * 20);
  const rightPY = useTransform(mouseY, (v) => v * 10);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,180,80,0.25) 0%, transparent 60%)',
        }}
      />

      <div className="relative container mx-auto px-4 text-center mb-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          {leftName} <span className="text-orange-400">&amp;</span> {rightName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
        >
          {caption}
        </motion.p>
      </div>

      <div className="relative w-full h-[60vh] flex items-center justify-center">
        {/* Left portrait */}
        <motion.div
          style={{
            x: leftX,
            rotate: leftRotate,
            scale,
          }}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[min(45vw,480px)] h-[min(45vw,480px)]"
        >
          <motion.div
            style={{ x: leftPX, y: leftPY }}
            className="w-full h-full"
          >
            <div
              className="w-full h-full rounded-full border-4 border-white/20"
              style={{
                backgroundImage: `url(${leftImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                boxShadow:
                  '0 25px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.1)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Right portrait */}
        <motion.div
          style={{
            x: rightX,
            rotate: rightRotate,
            scale,
          }}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[min(45vw,480px)] h-[min(45vw,480px)]"
        >
          <motion.div
            style={{ x: rightPX, y: rightPY }}
            className="w-full h-full"
          >
            <motion.div
              className="w-full h-full rounded-full border-4 border-white/20"
              style={{
                backgroundImage: `url(${rightImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                boxShadow:
                  '0 25px 60px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.1)',
                filter: rightFilter,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="relative container mx-auto px-4 mt-12 flex justify-center gap-16 md:gap-32 text-center z-10">
        <div>
          <div className="text-2xl md:text-3xl font-bold">{leftName}</div>
          <div className="text-sm text-orange-300 uppercase tracking-widest mt-1">
            Magic &amp; Mischief
          </div>
        </div>
        <div>
          <div className="text-2xl md:text-3xl font-bold">{rightName}</div>
          <div className="text-sm text-orange-300 uppercase tracking-widest mt-1">
            Color &amp; Wonder
          </div>
        </div>
      </div>
    </section>
  );
}
