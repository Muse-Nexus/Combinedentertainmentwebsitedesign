import { useRef, useEffect } from 'react';

interface AlphaVideoPlayerProps {
  src?: string;
  className?: string;
  style?: React.CSSProperties;
  // legacy props — ignored, kept for backwards compat
  frameCount?: number;
  fps?: number;
  width?: number;
  height?: number;
}

/**
 * Plays a WebM/VP9 video with native alpha transparency.
 * No canvas, no frame extraction — just a <video> tag.
 * Defaults to girl-moving-balloons-alpha.webm.
 */
export function AlphaVideoPlayer({
  src = '/media/video/girl-moving-balloons-alpha.webm',
  className,
  style,
}: AlphaVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      // autoplay blocked — user interaction will trigger it
    });
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      disablePictureInPicture
      className={className}
      style={{ imageRendering: 'auto', ...style }}
    />
  );
}
