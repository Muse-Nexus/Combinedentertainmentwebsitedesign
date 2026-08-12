import { useEffect, useState } from 'react';
import { ArrowUpRight, Instagram } from 'lucide-react';
import {
  LATEST_MOMENTS_FALLBACK,
  type LatestMoment,
} from '../../../shared/site-content';

interface MomentsResponse {
  ok?: boolean;
  moments?: LatestMoment[];
}

export function LatestMoments() {
  const [moments, setMoments] = useState<LatestMoment[]>(LATEST_MOMENTS_FALLBACK);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMoments() {
      try {
        const response = await fetch('/api/moments', {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });
        if (!response.ok) return;
        const payload = (await response.json()) as MomentsResponse;
        if (payload.ok && Array.isArray(payload.moments) && payload.moments.length > 0) {
          setMoments(payload.moments);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // The checked-in gallery is the intentional offline/error state.
        }
      }
    }

    void loadMoments();
    return () => controller.abort();
  }, []);

  return (
    <section className="bg-slate-950 py-20 text-white" aria-labelledby="latest-moments-title">
      <div className="container mx-auto px-4">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-coral">
              Fresh from the party
            </p>
            <h2 id="latest-moments-title" className="text-4xl font-black md:text-5xl">
              Latest Moments
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="https://www.instagram.com/magicbrent/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-slate-200 transition-colors hover:border-coral hover:text-white"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              @magicbrent
            </a>
            <a
              href="https://www.instagram.com/cirquejolie/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-slate-200 transition-colors hover:border-coral hover:text-white"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              @cirquejolie
            </a>
          </div>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-6">
          {moments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MomentCard({ moment }: { moment: LatestMoment }) {
  const content = (
    <>
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={moment.image}
          alt={moment.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-coral">
            {moment.service || 'On Maui'}
          </span>
          {moment.href && <ArrowUpRight className="h-4 w-4 text-slate-500" aria-hidden="true" />}
        </div>
        <p className="text-sm leading-relaxed text-slate-300">{moment.caption}</p>
        {moment.account && <p className="mt-3 text-xs text-slate-500">{moment.account}</p>}
      </div>
    </>
  );

  const classes =
    'group w-[78vw] max-w-[19rem] flex-none snap-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-colors hover:border-coral/50 md:w-auto md:max-w-none';

  return moment.href ? (
    <a href={moment.href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <article className={classes}>{content}</article>
  );
}
