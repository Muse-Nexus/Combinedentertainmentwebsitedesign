import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface SmartBackgroundVideoProps {
  desktopSrc: string;
  mobileSrc?: string;
  poster: string;
  className?: string;
}

/**
 * Decorative hero video that respects reduced-motion/data-saving preferences
 * and only starts downloading when its section is close to the viewport.
 */
export function SmartBackgroundVideo({
  desktopSrc,
  mobileSrc,
  poster,
  className = '',
}: SmartBackgroundVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const saveData =
    typeof navigator !== 'undefined' &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const [nearViewport, setNearViewport] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion || saveData) return;

    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: '240px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, saveData]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !nearViewport) return;
    video.play().catch(() => undefined);
  }, [nearViewport]);

  return (
    <div ref={rootRef} className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      {nearViewport && !reduceMotion && !saveData && (!mobile || Boolean(mobileSrc)) && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
          poster={poster}
          onCanPlay={() => setPlaying(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {mobileSrc && <source media="(max-width: 767px)" src={mobileSrc} type="video/mp4" />}
          <source src={desktopSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
