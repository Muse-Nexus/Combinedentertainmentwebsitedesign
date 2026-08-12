import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Accessible photo lightbox: focus trap, Escape to close, focus returns to the
 * trigger on close, arrow-key and on-screen prev/next, reduced-motion aware.
 * Use directly for custom-curated layouts, or via <GalleryLightbox> for a
 * ready-made responsive grid.
 */
export function Lightbox({ images, index, onClose, onNext, onPrev }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const image = images[index];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (hasMultiple && e.key === 'ArrowRight') {
        onNext();
        return;
      }
      if (hasMultiple && e.key === 'ArrowLeft') {
        onPrev();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = [prevRef.current, nextRef.current, closeRef.current].filter(
          (el): el is HTMLButtonElement => Boolean(el),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev, hasMultiple]);

  const backdropMotion = reduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  const imageMotion = reduceMotion
    ? {}
    : {
        initial: { scale: 0.94, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.94, opacity: 0 },
        transition: { duration: 0.2 },
      };

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label={`${image.alt} — photo ${index + 1} of ${images.length}`}
        {...backdropMotion}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="lightbox-frame"
          {...imageMotion}
          className="relative flex max-h-[92vh] max-w-[92vw] flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.alt}
            decoding="async"
            className="max-h-[80vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
          />
          <p className="mt-3 max-w-[92vw] text-center text-sm text-white/80">
            {image.alt}
            {images.length > 1 && (
              <span className="ml-2 text-white/50">
                · {index + 1} / {images.length}
              </span>
            )}
          </p>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close expanded photo"
            className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {hasMultiple && (
            <>
              <button
                ref={prevRef}
                type="button"
                onClick={onPrev}
                aria-label="Previous photo"
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-left-4"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                ref={nextRef}
                type="button"
                onClick={onNext}
                aria-label="Next photo"
                className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:-right-4"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

/** State + keyboard-friendly open/close/prev/next handling for a Lightbox. */
export function useLightbox(length: number) {
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(() => setIndex((i) => (i === null ? null : (i + 1) % length)), [length]);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + length) % length)),
    [length],
  );

  return { index, isOpen: index !== null, open, close, next, prev };
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  className?: string;
  itemClassName?: string;
  /** Number of leading images to load eagerly (above-the-fold). Defaults to 0 — everything lazy. */
  eagerCount?: number;
}

/**
 * Ready-made responsive grid of photo buttons wired to a shared Lightbox.
 * Every thumbnail is a real <button> (keyboard-openable), images below the
 * eager threshold are loading="lazy" decoding="async", and closing returns
 * focus to the thumbnail that opened the lightbox.
 */
export function GalleryLightbox({
  images,
  className = 'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4',
  itemClassName = 'aspect-square overflow-hidden rounded-2xl',
  eagerCount = 0,
}: GalleryLightboxProps) {
  const { index, isOpen, open, close, next, prev } = useLightbox(images.length);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleClose = useCallback(() => {
    const openedIndex = index;
    close();
    if (openedIndex !== null) {
      triggerRefs.current[openedIndex]?.focus();
    }
  }, [close, index]);

  return (
    <>
      <div className={className}>
        {images.map((img, i) => (
          <button
            key={img.src}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            type="button"
            onClick={() => open(i)}
            aria-label={`View photo: ${img.alt}`}
            className={`group relative block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-coral ${itemClassName}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={i < eagerCount ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {isOpen && index !== null && (
        <Lightbox images={images} index={index} onClose={handleClose} onNext={next} onPrev={prev} />
      )}
    </>
  );
}
