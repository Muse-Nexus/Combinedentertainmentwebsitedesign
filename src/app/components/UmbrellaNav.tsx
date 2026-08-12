import { Link } from 'react-router-dom';

interface UmbrellaNavProps {
  className?: string;
  compact?: boolean;
  displayWidth?: string;
}

export const UMBRELLA_DISPLAY_WIDTH = 'min(96vw, 1180px)';

export interface UmbrellaSection {
  id: string;
  label: string;
  route: string;
}

export const UMBRELLA_SECTIONS: UmbrellaSection[] = [
  {
    id: 'balloons-facepaint',
    label: 'Balloon Twisting & Face Painting',
    route: '/balloon-twisting',
  },
  {
    id: 'gameshow',
    label: 'Game Show NITE',
    route: '/game-show',
  },
  {
    id: 'strolling',
    label: 'Stilt Walkers',
    route: '/strolling',
  },
  {
    id: 'led-performers',
    label: 'LED Performers',
    route: '/led-performers',
  },
  {
    id: 'magic',
    label: 'Magic',
    route: '/magic',
  },
  {
    id: 'casino',
    label: 'Casino NITE',
    route: '/casino',
  },
  {
    id: 'balloon-decor',
    label: 'Balloon Decor',
    route: '/balloon-decor',
  },
];

function ServiceButtons({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <nav aria-label="Entertainment services" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center">
        {UMBRELLA_SECTIONS.map((section, index) => {
          const isLastOddItem =
            UMBRELLA_SECTIONS.length % 2 === 1 && index === UMBRELLA_SECTIONS.length - 1;

          return (
            <Link
              key={section.id}
              to={section.route}
              className={`flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-slate-950/82 px-4 py-2.5 text-center text-sm font-semibold leading-tight tracking-[0.01em] text-white shadow-xl backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/45 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral sm:min-h-12 sm:min-w-40 sm:max-w-56 sm:flex-1 sm:basis-44 sm:text-base ${
                isLastOddItem
                  ? 'col-span-2 mx-auto w-[calc(50%-0.25rem)] sm:mx-0 sm:w-auto'
                  : ''
              }`}
            >
              {section.label}
            </Link>
          );
        })}
      </nav>
      <div className="mx-auto mt-3 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-coral/45 bg-slate-950/85 px-4 py-3 text-center shadow-lg backdrop-blur-md">
        <span className="text-sm font-medium text-white sm:text-base">Planning a corporate event?</span>
        <Link
          to="/corporate"
          className="shrink-0 font-bold text-coral underline decoration-coral/40 underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
        >
          Start here
        </Link>
      </div>
    </div>
  );
}

export const UmbrellaNav = ({
  className = '',
  compact = false,
  displayWidth = UMBRELLA_DISPLAY_WIDTH,
}: UmbrellaNavProps) => {
  if (compact) {
    return <ServiceButtons className={className} />;
  }

  return (
    <div className={className} style={{ width: displayWidth, maxWidth: '100%' }}>
      <svg
        viewBox="0 0 2417 1278"
        className="block h-auto w-full select-none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="umbrella-title umbrella-description"
      >
        <title id="umbrella-title">Raining Entertainment umbrella</title>
        <desc id="umbrella-description">
          A colorful umbrella opening above the Raining Entertainment service menu.
        </desc>
        <image
          href="/media/umbrella-photo.webp"
          x="0"
          y="0"
          width="2417"
          height="1278"
          aria-hidden="true"
          style={{ pointerEvents: 'none' }}
        />
      </svg>

    </div>
  );
};
