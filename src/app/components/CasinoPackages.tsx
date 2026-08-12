import { useEffect, useState } from 'react';
import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  CASINO_PACKAGES_FALLBACK,
  type CasinoPackage,
  type CasinoPackageAccent,
} from '../../../shared/site-content';

interface PackagesResponse {
  ok?: boolean;
  packages?: unknown;
}

interface CasinoPackagesProps {
  id?: string;
  className?: string;
}

const cardStyles: Record<CasinoPackageAccent, { border: string; eyebrow: string }> = {
  classic: {
    border: 'border-emerald-400/30 hover:border-emerald-300/60',
    eyebrow: 'text-emerald-300',
  },
  deluxe: {
    border: 'border-blue-400/40 hover:border-blue-300/70',
    eyebrow: 'text-blue-300',
  },
  full: {
    border: 'border-rose-400/30 hover:border-rose-300/60',
    eyebrow: 'text-rose-300',
  },
};

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function CasinoPackages({ id = 'casino-packages', className = '' }: CasinoPackagesProps) {
  const [packages, setPackages] = useState<CasinoPackage[]>(CASINO_PACKAGES_FALLBACK);
  const titleId = `${id}-title`;
  const disclaimerId = `${id}-disclaimer`;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPackages() {
      try {
        const response = await fetch('/api/packages', {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });
        if (!response.ok) return;

        const payload = (await response.json()) as PackagesResponse;
        if (!payload.ok || !Array.isArray(payload.packages)) return;

        const validPackages = payload.packages.filter(isCasinoPackage);
        setPackages(validPackages.sort((a, b) => a.sortOrder - b.sortOrder));
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // Checked-in packages are the intentional offline/error state.
        }
      }
    }

    void loadPackages();
    return () => controller.abort();
  }, []);

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      aria-describedby={disclaimerId}
      className={`bg-slate-950 py-24 text-white ${className}`}
    >
      <div className="container mx-auto px-4">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-coral">
            Packages for different budgets
          </p>
          <h2 id={titleId} className="text-4xl font-black md:text-5xl">
            Choose Your Casino NITE Experience
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            Every package includes entertaining dealers, guided play, and a complete casino setup.
          </p>
        </header>

        {packages.length > 0 ? (
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {packages.map((casinoPackage) => {
            const styles = cardStyles[casinoPackage.accent];
            return (
              <article
                key={casinoPackage.id}
                className={`relative flex h-full flex-col rounded-3xl border bg-slate-900/80 p-7 shadow-xl transition-colors ${styles.border}`}
              >
                {casinoPackage.badge && (
                  <p className={`mb-4 inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.2em] ${styles.eyebrow}`}>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    {casinoPackage.badge}
                  </p>
                )}
                <h3 className="text-2xl font-black md:text-3xl">{casinoPackage.name}</h3>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-4xl font-black">{priceFormatter.format(casinoPackage.price)}</span>
                  <span className="font-semibold text-slate-400">{casinoPackage.taxLabel}</span>
                </p>

                <ul className="mt-7 flex-1 space-y-4" aria-label={`${casinoPackage.name} includes`}>
                  {casinoPackage.inclusions.map((inclusion) => (
                    <li key={inclusion} className="flex items-start gap-3 text-slate-200">
                      <Check className={`mt-0.5 h-5 w-5 shrink-0 ${styles.eyebrow}`} aria-hidden="true" />
                      <span className="leading-relaxed">{inclusion}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
            })}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center">
            <h3 className="text-2xl font-black">Packages are being updated</h3>
            <p className="mt-3 leading-relaxed text-slate-300">
              Brenton can share the current Casino NITE options and build the right setup for your event.
            </p>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center">
          <p id={disclaimerId} className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-200">
            <ShieldCheck className="h-5 w-5 shrink-0 text-coral" aria-hidden="true" />
            <span>For entertainment purposes only — no gambling. No cash buy-ins or cash payouts.</span>
          </p>
          <p className="mt-5 text-slate-300">
            Not sure which package fits? Brenton handles every booking and will help match the setup to your event.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-coral px-8 py-3 font-black text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          >
            Ask Brenton About Casino NITE
          </Link>
        </div>
      </div>
    </section>
  );
}

function isCasinoPackage(value: unknown): value is CasinoPackage {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const candidate = value as Partial<CasinoPackage>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.slug === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.price === 'number' &&
    Number.isFinite(candidate.price) &&
    typeof candidate.taxLabel === 'string' &&
    (candidate.accent === 'classic' || candidate.accent === 'deluxe' || candidate.accent === 'full') &&
    Array.isArray(candidate.inclusions) &&
    candidate.inclusions.length > 0 &&
    candidate.inclusions.every((item) => typeof item === 'string') &&
    typeof candidate.sortOrder === 'number' &&
    Number.isFinite(candidate.sortOrder)
  );
}
