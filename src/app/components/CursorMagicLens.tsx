import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * CursorMagicLens — a "magic lens" that reveals color/clarity through the rain.
 * Tracks cursor with a spring, renders a circular mask that reveals the underlying
 * color version of whatever is beneath it.
 */
interface CursorMagicLensProps {
  imageUrl: string;
  size?: number;
  enabled?: boolean;
}

export function CursorMagicLens({ imageUrl, size = 240, enabled = true }: CursorMagicLensProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const x = useSpring(rawX, { stiffness: 400, damping: 40, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 400, damping: 40, mass: 0.5 });

  useEffect(() => {
    // Disable on touch devices — no cursor
    if ('ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [rawX, rawY, isVisible]);

  if (!enabled || isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-30 rounded-full"
      style={{
        x,
        y,
        width: size,
        height: size,
        translateX: '-50%',
        translateY: '-50%',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '100vw 100vh',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        boxShadow: '0 0 60px 10px rgba(255,180,80,0.25), inset 0 0 40px 8px rgba(255,255,255,0.15)',
        mixBlendMode: 'normal',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease-out',
        maskImage: 'radial-gradient(circle, black 55%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 75%)',
      }}
    />
  );
}
