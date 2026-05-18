import { useEffect, useRef } from 'react';

interface AlphaVideoPlayerProps {
  frameCount?: number;
  fps?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Plays RGBA PNG frames on canvas — true per-pixel alpha transparency.
 * Frames live at /media/video/frames/frame_0001.png ... frame_NNNN.png
 */
export function AlphaVideoPlayer({
  frameCount = 96,
  fps = 12,
  width = 720,
  height = 1280,
  className,
  style,
}: AlphaVideoPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let loaded = 0;
    let animFrame: number;
    let currentFrame = 0;
    let lastTime = 0;
    const interval = 1000 / fps;

    const draw = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (images[currentFrame]?.complete) {
          ctx.drawImage(images[currentFrame], 0, 0, canvas.width, canvas.height);
        }
        currentFrame = (currentFrame + 1) % frameCount;
        lastTime = timestamp;
      }
      animFrame = requestAnimationFrame(draw);
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const padded = String(i).padStart(4, '0');
      img.src = `/media/video/frames/frame_${padded}.png`;
      img.onload = () => {
        loaded++;
        if (loaded === frameCount) {
          animFrame = requestAnimationFrame(draw);
        }
      };
      images.push(img);
    }

    return () => cancelAnimationFrame(animFrame);
  }, [frameCount, fps]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ imageRendering: 'auto', ...style }}
    />
  );
}
