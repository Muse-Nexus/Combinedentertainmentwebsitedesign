import React, { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type VideoSource =
  | { type: 'vimeo'; videoId: string }
  | { type: 'direct'; src: string };

interface PromoVideoProps {
  source: VideoSource;
  className?: string;
  aspectRatio?: string;
}

export function PromoVideo({ source, className = '', aspectRatio = '16/9' }: PromoVideoProps) {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (source.type === 'vimeo') {
    const embedUrl = `https://player.vimeo.com/video/${source.videoId}?autoplay=1&loop=1&muted=1&background=0&controls=0&title=0&byline=0&portrait=0&dnt=1`;

    return (
      <div className={`relative overflow-hidden rounded-2xl group ${className}`} style={{ aspectRatio }}>
        <iframe
          ref={iframeRef}
          src={isMuted ? embedUrl : embedUrl.replace('muted=1', 'muted=0')}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          style={{ border: 'none' }}
          title="Promo video"
        />
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    );
  }

  // Direct MP4 video
  return (
    <div className={`relative overflow-hidden rounded-2xl group ${className}`} style={{ aspectRatio }}>
      <DirectVideo src={source.src} aspectRatio={aspectRatio} />
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
        className="absolute inset-0 w-full h-full object-cover"
        style={{ aspectRatio }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </>
  );
}
