import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export const RainEffect = ({
  active = true,
  intensity = 1,
}: {
  active?: boolean;
  intensity?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const saveData =
    typeof navigator !== 'undefined' &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active || reduceMotion || saveData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId = 0;
    let running = true;

    const drops: { x: number; y: number; speed: number; len: number }[] = [];

    const seedDrops = () => {
      const areaAdjustedCount = Math.round((width * height * intensity) / 12000);
      const maxDrops = Math.min(window.innerWidth < 768 ? 150 : 380, Math.max(45, areaAdjustedCount));
      drops.length = 0;

      for (let index = 0; index < maxDrops; index += 1) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 13 + 9,
          len: Math.random() * 18 + 8,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      seedDrops();
    };

    const draw = () => {
      if (!running) return;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(174, 194, 224, 0.46)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.len);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > height) {
          drop.y = -drop.len;
          drop.x = Math.random() * width;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationId);
        return;
      }

      if (!running) {
        running = true;
        animationId = requestAnimationFrame(draw);
      }
    };

    resize();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [active, intensity, reduceMotion, saveData]);

  if (reduceMotion || saveData) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-45 md:opacity-60"
    />
  );
};
