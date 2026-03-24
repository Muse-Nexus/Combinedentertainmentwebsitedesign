import React, { useEffect, useRef } from 'react';

export const RainEffect = ({ intensity = 1 }: { intensity?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const drops: { x: number; y: number; speed: number; len: number }[] = [];
    const maxDrops = 500 * intensity;

    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 15 + 10,
        len: Math.random() * 20 + 10,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
      }
      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-60"
    />
  );
};
