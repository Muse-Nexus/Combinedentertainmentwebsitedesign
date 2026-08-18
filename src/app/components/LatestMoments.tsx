import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Images, Instagram, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LATEST_MOMENTS_FALLBACK,
  type LatestMoment,
} from '../../../shared/site-content';

type FeedSource = 'fallback' | 'curated' | 'instagram';

interface MomentsResponse {
  ok?: boolean;
  source?: string;
  moments?: LatestMoment[];
}

const profileLinks = [
  {
    href: 'https://www.instagram.com/magicbrent/',
    handle: '@magicbrent',
    accent: 'hover:border-coral/70 hover:bg-coral/10',
  },
  {
    href: 'https://www.instagram.com/cirquejolie/',
    handle: '@cirquejolie',
    accent: 'hover:border-lavender/70 hover:bg-lavender/10',
  },
  {
    href: 'https://www.instagram.com/gameshowfanatics/',
    handle: '@gameshowfanatics',
    accent: 'hover:border-coral/70 hover:bg-coral/10',
  },
];

export function LatestMoments() {
  const [moments, setMoments] = useState<LatestMoment[]>(LATEST_MOMENTS_FALLBACK);
  const [source, setSource] = useState<FeedSource>('fallback');

  useEffect(() => {
    const controller = new AbortController();

    async function loadMoments() {
      const endpoints: Array<{ path: string; source: FeedSource }> = [
        { path: '/api/instagram', source: 'instagram' },
        { path: '/api/moments', source: 'curated' },
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint.path, {
            headers: { Accept: 'application/json' },
            signal: controller.signal,
          });
          if (!response.ok) continue;
          const payload = (await response.json()) as MomentsResponse;
          const isVerifiedInstagramResponse =
            endpoint.source !== 'instagram' || payload.source === 'instagram';
          if (
            payload.ok &&
            isVerifiedInstagramResponse &&
            Array.isArray(payload.moments) &&
            payload.moments.length > 0
          ) {
            setMoments(
              endpoint.source === 'instagram'
                ? selectInstagramMoments(payload.moments, 6)
                : payload.moments.slice(0, 6),
            );
            setSource(endpoint.source);
            return;
          }
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return;
          // Continue to the curated endpoint or the checked-in fallback.
        }
      }
    }

    void loadMoments();
    return () => controller.abort();
  }, []);

  const isLive = source === 'instagram';

  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950 py-20 text-white md:py-28"
      aria-labelledby="latest-moments-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(232,92,74,0.18),transparent_28%),radial-gradient(circle_at_88%_70%,rgba(155,126,189,0.2),transparent_30%),linear-gradient(180deg,#070b22_0%,#0f1535_100%)]"
      />

      <div className="container mx-auto px-4">
        <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white/80">
              <span
                className={`h-2 w-2 rounded-full ${
                  isLive ? 'animate-pulse bg-emerald-400 motion-reduce:animate-none' : 'bg-coral'
                }`}
                aria-hidden="true"
              />
              {isLive ? 'Live from Instagram' : 'Follow the fun'}
            </div>
            <h2
              id="latest-moments-title"
              className="text-balance text-4xl font-black leading-[0.96] tracking-tight sm:text-5xl md:text-7xl"
            >
              The party keeps moving.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Fresh shows, impossible balloon builds, glowing characters, and the reactions in
              between. This is what Brenton and Jolie have been creating around Maui.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:max-w-sm lg:justify-end">
            {profileLinks.map((profile) => (
              <a
                key={profile.handle}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/50 px-5 py-3 font-bold text-white transition ${profile.accent}`}
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                {profile.handle}
                <ArrowUpRight
                  className="h-4 w-4 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-5 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {moments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} isLive={isLive} />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-coral to-lavender text-white shadow-lg shadow-coral/10">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-black text-white">Want your event in the next post?</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                Tell us the occasion. We&rsquo;ll help create the moment everyone reaches for their phones to capture.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-coral"
          >
            Plan the moment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MomentCard({ moment, isLive }: { moment: LatestMoment; isLive: boolean }) {
  const fallbackImage = moment.account?.toLowerCase().includes('cirque')
    ? '/media/client-selected/stilt-walkers/hero-winged-trio-monkeypod.webp'
    : '/media/magic/magic-brent-live-show-maui.webp';
  const posted = isLive ? formatMomentDate(moment.timestamp) : null;

  const content = (
    <>
      <img
        src={moment.image}
        alt={moment.alt}
        loading="lazy"
        decoding="async"
        data-fallback={fallbackImage}
        onError={(event) => {
          const image = event.currentTarget;
          const fallback = image.dataset.fallback;
          if (fallback && !image.src.endsWith(fallback)) image.src = fallback;
        }}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/5 transition group-hover:via-slate-950/55" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
          <Instagram className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
          {moment.account || 'Raining Entertainment'}
        </span>
        {moment.mediaType === 'VIDEO' ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 backdrop-blur-md">
            <Play className="h-4 w-4 fill-white" aria-hidden="true" />
          </span>
        ) : moment.mediaType === 'CAROUSEL_ALBUM' ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 backdrop-blur-md">
            <Images className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-black uppercase tracking-[0.15em] text-coral">
            {moment.service || 'On Maui'}
          </span>
          {posted && <span className="text-xs font-semibold text-white/60">{posted}</span>}
        </div>
        <p className="line-clamp-3 text-base font-semibold leading-relaxed text-white md:text-lg">
          {moment.caption}
        </p>
        {moment.href && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-black text-white/75 transition group-hover:text-white">
            View on Instagram <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const classes = `group relative aspect-[4/5] w-[82vw] max-w-[22rem] flex-none snap-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral md:w-auto md:max-w-none ${
    moment.href
      ? 'transition hover:-translate-y-1 hover:border-coral/50'
      : ''
  }`;

  const mediaDescription =
    moment.mediaType === 'VIDEO'
      ? ' video post'
      : moment.mediaType === 'CAROUSEL_ALBUM'
        ? ' carousel post'
        : isLive
          ? ' post'
          : ' profile';

  return moment.href ? (
    <a
      href={moment.href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
      aria-label={`Open ${moment.account || 'Instagram'}${mediaDescription} on Instagram: ${moment.caption.slice(0, 180)}`}
    >
      {content}
    </a>
  ) : (
    <article className={classes}>{content}</article>
  );
}

function formatMomentDate(timestamp?: string) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
}

function selectInstagramMoments(moments: LatestMoment[], limit: number) {
  const groups = new Map<string, LatestMoment[]>();
  for (const moment of moments) {
    const key = moment.account?.toLowerCase() || 'instagram';
    groups.set(key, [...(groups.get(key) || []), moment]);
  }

  if (groups.size < 2) return moments.slice(0, limit);

  const selected = Array.from(groups.values()).flatMap((accountMoments) =>
    accountMoments.slice(0, Math.max(1, Math.floor(limit / groups.size))),
  );
  const selectedIds = new Set(selected.map((moment) => moment.id));
  for (const moment of moments) {
    if (selected.length >= limit) break;
    if (!selectedIds.has(moment.id)) {
      selected.push(moment);
      selectedIds.add(moment.id);
    }
  }

  return selected
    .sort((left, right) => timestampValue(right.timestamp) - timestampValue(left.timestamp))
    .slice(0, limit);
}

function timestampValue(timestamp?: string) {
  if (!timestamp) return 0;
  const value = Date.parse(timestamp);
  return Number.isNaN(value) ? 0 : value;
}
