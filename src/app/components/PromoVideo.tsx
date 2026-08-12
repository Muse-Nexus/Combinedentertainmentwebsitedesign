import React, { useRef, useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

type VideoSource =
  | { type: 'vimeo'; videoId: string }
  | { type: 'direct'; src: string };

interface PromoVideoProps {
  source: VideoSource;
  className?: string;
  aspectRatio?: string;
  poster?: string;
  title?: string;
}

export function PromoVideo({
  source,
  className = '',
  aspectRatio = '16/9',
  poster = '/media/hero-real-brenton-jolie.webp',
  title = 'Play promo video',
}: PromoVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (source.type === 'vimeo') {
    const embedUrl = `https://player.vimeo.com/video/${source.videoId}?autoplay=1&loop=1&muted=1&background=0&controls=0&title=0&byline=0&portrait=0&dnt=1`;

    return (
      <div className={`relative overflow-hidden rounded-2xl group ${className}`} style={{ aspectRatio }}>
        {isPlaying ? (
          <>
            <iframe
              ref={iframeRef}
              src={isMuted ? embedUrl : embedUrl.replace('muted=1', 'muted=0')}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ border: 'none' }}
              title={title}
            />
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-4 right-4 z-10 bg-black/65 hover:bg-black/85 text-white p-3 rounded-full transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 backdrop-blur-sm"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-slate-950 text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral focus-visible:ring-inset"
            aria-label={title}
          >
            <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-65" />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-slate-950/20" />
            <span className="relative z-10 inline-flex items-center gap-3 rounded-full border border-white/35 bg-black/55 px-6 py-3 font-bold shadow-xl backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-black/70">
              <Play className="h-5 w-5 fill-current" aria-hidden="true" /> Play video
            </span>
          </button>
        )}
      </div>
    );
  }

  // Direct MP4 video
  return (
    <div className={`relative overflow-hidden rounded-2xl group ${className}`} style={{ aspectRatio }}>
      {isPlaying ? (
        <DirectVideo src={source.src} aspectRatio={aspectRatio} />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-slate-950 text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-coral focus-visible:ring-inset"
          aria-label={title}
        >
          <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-65" />
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-slate-950/20" />
          <span className="relative z-10 inline-flex items-center gap-3 rounded-full border border-white/35 bg-black/55 px-6 py-3 font-bold shadow-xl backdrop-blur-sm transition group-hover:scale-105 group-hover:bg-black/70">
            <Play className="h-5 w-5 fill-current" aria-hidden="true" /> Play video
          </span>
        </button>
      )}
    </div>
  );
}

function DirectVideo({ src, aspectRatio }: { src: string; aspectRatio: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ aspectRatio }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 backdrop-blur-sm"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </>
  );
}
