import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface SmartVimeoBackgroundProps {
  videoId: string;
  poster: string;
  title: string;
}

/** Keeps third-party autoplay embeds off phones and reduced/data-saving devices. */
export function SmartVimeoBackground({ videoId, poster, title }: SmartVimeoBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const saveData =
    typeof navigator !== 'undefined' &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const [desktop, setDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img src={poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      {desktop && !reduceMotion && !saveData && (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&dnt=1`}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          style={{ border: 0 }}
          allow="autoplay; fullscreen"
          tabIndex={-1}
          title={title}
        />
      )}
    </div>
  );
}
