import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface UmbrellaNavProps {
  className?: string;
  compact?: boolean;
}

const sections = [
  {
    id: 'balloon-twisting',
    label: 'BALLOON\nTWISTING',
    path: "M 50 350 Q 150 50 671 20 L 350 450 Z",
    route: '/balloon-twisting',
    labelX: 270,
    labelY: 230,
    rotate: -32
  },
  {
    id: 'balloon-decor',
    label: 'BALLOON\nDECOR',
    path: "M 350 450 L 671 20 L 600 500 Z",
    route: '/balloon-decor',
    labelX: 470,
    labelY: 180,
    rotate: -16
  },
  {
    id: 'strolling',
    label: 'STROLLING',
    path: "M 600 500 L 671 20 L 740 500 Z",
    route: '/strolling',
    labelX: 671,
    labelY: 140,
    rotate: 0
  },
  {
    id: 'magic',
    label: 'MAGIC',
    path: "M 740 500 L 671 20 L 990 450 Z",
    route: '/magic',
    labelX: 872,
    labelY: 180,
    rotate: 16
  },
  {
    id: 'casino',
    label: 'CASINO &\nGAMESHOW',
    path: "M 990 450 L 671 20 Q 1200 50 1290 350 Z",
    route: '/casino-gameshow',
    labelX: 1070,
    labelY: 230,
    rotate: 32
  }
];

export const UmbrellaNav = ({ className = '', compact = false }: UmbrellaNavProps) => {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  /* ───── COMPACT MODE (navbar) ───── */
  if (compact) {
    return (
      <nav className={`flex items-center justify-center gap-1 ${className}`}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => navigate(s.route)}
            className="relative px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors whitespace-nowrap"
          >
            {s.label.replace('\n', ' ')}
          </button>
        ))}
      </nav>
    );
  }

  /* ───── FULL MODE (hero / landing page) ───── */
  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* The Umbrella Image */}
      <img
        src="/media/logos/UmbrellaNavigation.png"
        alt="Navigation Umbrella"
        className="w-full h-auto drop-shadow-2xl z-10 relative select-none"
      />

      {/* Interactive Overlay & Labels */}
      <svg
        className="absolute top-0 left-0 w-full h-full z-20 pointer-events-auto"
        viewBox="0 0 1342 663"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="text-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.8"/>
          </filter>
          <clipPath id="umbrella-canopy">
            <path d="M 50 350 Q 100 200 200 120 Q 350 30 671 15 Q 990 30 1140 120 Q 1240 200 1290 350 Q 1200 480 990 530 Q 870 550 760 540 Q 710 545 671 545 Q 630 545 580 540 Q 470 550 350 530 Q 140 480 50 350 Z" />
          </clipPath>
        </defs>

        <g clipPath="url(#umbrella-canopy)">
        {sections.map((section) => (
          <g
            key={section.id}
            onClick={() => navigate(section.route)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
            className="cursor-pointer"
          >
            {/* Click Area */}
            <path
              d={section.path}
              fill="transparent"
              className="transition-all duration-300 hover:fill-white/10"
            />

            {/* Hover highlight */}
            <AnimatePresence>
              {hoveredSection === section.id && (
                <motion.path
                  d={section.path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  fill="rgba(255,255,255,0.18)"
                />
              )}
            </AnimatePresence>

            {/* Label Text on Umbrella */}
            <text
              x={section.labelX}
              y={section.labelY}
              textAnchor="middle"
              transform={`rotate(${section.rotate}, ${section.labelX}, ${section.labelY})`}
              fill={hoveredSection === section.id ? '#FDE68A' : 'rgba(255,255,255,0.9)'}
              fontFamily="'Poppins', sans-serif"
              fontWeight="700"
              fontSize="28"
              letterSpacing="1.5"
              style={{
                filter: 'url(#text-shadow)',
                pointerEvents: 'none',
                transition: 'fill 0.3s',
              }}
            >
              {section.label.split('\n').map((line, i) => (
                <tspan key={i} x={section.labelX} dy={i === 0 ? 0 : '1.1em'}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}
        </g>
      </svg>
    </div>
  );
};
