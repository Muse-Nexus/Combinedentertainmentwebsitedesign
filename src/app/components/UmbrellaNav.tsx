import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface UmbrellaNavProps {
  className?: string;
  compact?: boolean;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * 7-panel umbrella, viewed front-on with a wide shallow arc canopy.
 * Geometry: panels are wedges from a hub at (700, 320) up to 8 evenly-spaced
 * points along an ellipse (rx=640, ry=290, cx=700, cy=300), θ=180°→0°.
 * Colors: muted "adult rainbow" — desaturated warm→cool spectrum.
 * ─────────────────────────────────────────────────────────────────────────── */

const HUB_X = 700;
const HUB_Y = 320;

const PT = [
  { x: 60.0, y: 300.0 },    // 0 - far left edge
  { x: 123.4, y: 174.2 },   // 1
  { x: 301.0, y: 73.3 },    // 2
  { x: 557.6, y: 17.3 },    // 3
  { x: 842.4, y: 17.3 },    // 4
  { x: 1099.0, y: 73.3 },   // 5
  { x: 1276.6, y: 174.2 },  // 6
  { x: 1340.0, y: 300.0 },  // 7 - far right edge
];

const wedge = (i: number) =>
  `M ${HUB_X} ${HUB_Y} L ${PT[i].x} ${PT[i].y} ` +
  `A 640 290 0 0 1 ${PT[i + 1].x} ${PT[i + 1].y} Z`;

interface Section {
  id: string;
  label: string[];
  route: string;
  panelIdx: number;
  gradient: [string, string];
  hoverGradient: [string, string];
  labelX: number;
  labelY: number;
  rotate: number;
  fontSize: number;
}

const sections: Section[] = [
  {
    id: 'corporate',
    label: ['CORPORATE'],
    route: '/corporate',
    panelIdx: 0,
    gradient: ['#8C4646', '#5A2828'],
    hoverGradient: ['#A35353', '#6E3232'],
    labelX: 294, labelY: 264, rotate: -77, fontSize: 22,
  },
  {
    id: 'balloons-facepainting',
    label: ['BALLOONS &', 'FACEPAINTING'],
    route: '/balloon-twisting',
    panelIdx: 1,
    gradient: ['#C97A5C', '#8E4A33'],
    hoverGradient: ['#D88C6E', '#A35A40'],
    labelX: 375, labelY: 190, rotate: -51, fontSize: 22,
  },
  {
    id: 'balloon-decor',
    label: ['BALLOON', 'DECOR'],
    route: '/balloon-decor',
    panelIdx: 2,
    gradient: ['#D9A24A', '#A1721E'],
    hoverGradient: ['#E5B260', '#B68330'],
    labelX: 519, labelY: 137, rotate: -26, fontSize: 24,
  },
  {
    id: 'strolling',
    label: ['STROLLING'],
    route: '/strolling',
    panelIdx: 3,
    gradient: ['#B5BE7A', '#6F7A45'],
    hoverGradient: ['#C5CD8C', '#83904F'],
    labelX: 700, labelY: 118, rotate: 0, fontSize: 30,
  },
  {
    id: 'magic',
    label: ['MAGIC'],
    route: '/magic',
    panelIdx: 4,
    gradient: ['#5E9AA0', '#2F6B6E'],
    hoverGradient: ['#72ADB3', '#3E8085'],
    labelX: 880, labelY: 137, rotate: 26, fontSize: 30,
  },
  {
    id: 'casino',
    label: ['CASINO'],
    route: '/casino',
    panelIdx: 5,
    gradient: ['#6F7BB8', '#3D4773'],
    hoverGradient: ['#828FCB', '#4E5A87'],
    labelX: 1025, labelY: 189, rotate: 51, fontSize: 26,
  },
  {
    id: 'gameshow',
    label: ['GAMESHOW'],
    route: '/game-show',
    panelIdx: 6,
    gradient: ['#7A5A8E', '#4B2F5A'],
    hoverGradient: ['#8E6BA3', '#5E3D70'],
    labelX: 1106, labelY: 264, rotate: 77, fontSize: 22,
  },
];

// Full canopy silhouette (arc on top, scalloped bottom)
const CANOPY_CLIP =
  `M ${PT[0].x} ${PT[0].y} ` +
  `A 640 290 0 0 1 ${PT[7].x} ${PT[7].y} ` +
  `Q ${(PT[7].x + HUB_X) / 2} ${PT[7].y + 25} ${HUB_X + 320} ${HUB_Y - 5} ` +
  `Q ${HUB_X} ${HUB_Y + 18} ${HUB_X - 320} ${HUB_Y - 5} ` +
  `Q ${(PT[0].x + HUB_X) / 2} ${PT[0].y + 25} ${PT[0].x} ${PT[0].y} Z`;

const RIBS = [1, 2, 3, 4, 5, 6].map(
  (i) => `M ${HUB_X} ${HUB_Y} L ${PT[i].x} ${PT[i].y}`
);

export const UmbrellaNav = ({ className = '', compact = false }: UmbrellaNavProps) => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (compact) {
    return (
      <nav className={`flex items-center justify-center gap-1 ${className}`}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => navigate(s.route)}
            className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:text-white transition-colors whitespace-nowrap"
          >
            {s.label.join(' ')}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <div className={`relative w-full ${className}`} style={{ maxWidth: '1400px' }}>
      <svg
        viewBox="0 0 1400 440"
        className="w-full h-auto"
        style={{ overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {sections.map((s) => {
            const isHovered = hoveredId === s.id;
            const [outer, inner] = isHovered ? s.hoverGradient : s.gradient;
            return (
              <linearGradient
                key={`grad-${s.id}`}
                id={`grad-${s.id}`}
                x1="50%" y1="0%" x2="50%" y2="100%"
              >
                <stop offset="0%" stopColor={outer} />
                <stop offset="100%" stopColor={inner} />
              </linearGradient>
            );
          })}

          <filter id="umbrella-drop">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodOpacity="0.35" />
          </filter>

          <filter id="label-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.85" />
          </filter>

          <linearGradient id="sheen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <clipPath id="canopy-clip">
            <path d={CANOPY_CLIP} />
          </clipPath>
        </defs>

        {/* CANOPY (panels) */}
        <g clipPath="url(#canopy-clip)" filter="url(#umbrella-drop)">
          {sections.map((s) => (
            <g
              key={s.id}
              onClick={() => navigate(s.route)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer"
            >
              <path
                d={wedge(s.panelIdx)}
                fill={`url(#grad-${s.id})`}
                style={{ transition: 'fill 0.2s ease' }}
              />
            </g>
          ))}

          {/* fabric sheen */}
          <path
            d={CANOPY_CLIP}
            fill="url(#sheen)"
            style={{ pointerEvents: 'none' }}
          />
        </g>

        {/* internal ribs between panels */}
        {RIBS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="rgba(0,0,0,0.30)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            style={{ pointerEvents: 'none' }}
          />
        ))}

        {/* outer arc edge */}
        <path
          d={`M ${PT[0].x} ${PT[0].y} A 640 290 0 0 1 ${PT[7].x} ${PT[7].y}`}
          fill="none"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="2.5"
          style={{ pointerEvents: 'none' }}
        />

        {/* scalloped bottom edge */}
        <path
          d={
            `M ${PT[7].x} ${PT[7].y} ` +
            `Q ${(PT[7].x + HUB_X) / 2} ${PT[7].y + 25} ${HUB_X + 320} ${HUB_Y - 5} ` +
            `Q ${HUB_X} ${HUB_Y + 18} ${HUB_X - 320} ${HUB_Y - 5} ` +
            `Q ${(PT[0].x + HUB_X) / 2} ${PT[0].y + 25} ${PT[0].x} ${PT[0].y}`
          }
          fill="none"
          stroke="rgba(0,0,0,0.30)"
          strokeWidth="2"
          style={{ pointerEvents: 'none' }}
        />

        {/* handle shaft */}
        <line
          x1={HUB_X} y1={HUB_Y + 12}
          x2={HUB_X} y2={420}
          stroke="#2A1A0E" strokeWidth="7" strokeLinecap="round"
          style={{ pointerEvents: 'none' }}
        />
        {/* curved hook */}
        <path
          d={`M ${HUB_X} 420 Q ${HUB_X} 438 ${HUB_X - 22} 438 Q ${HUB_X - 44} 438 ${HUB_X - 44} 422`}
          fill="none" stroke="#2A1A0E" strokeWidth="7" strokeLinecap="round"
          style={{ pointerEvents: 'none' }}
        />

        {/* hub finial */}
        <circle cx={HUB_X} cy={HUB_Y} r="13" fill="#2A1A0E" stroke="#5A3A1E" strokeWidth="2"
          style={{ pointerEvents: 'none' }} />
        <circle cx={HUB_X} cy={HUB_Y - 2} r="5" fill="#C9A14A"
          style={{ pointerEvents: 'none' }} />

        {/* hover sheen */}
        <AnimatePresence>
          {hoveredId && (
            <motion.path
              key={hoveredId}
              d={wedge(sections.find((s) => s.id === hoveredId)!.panelIdx)}
              fill="rgba(255,255,255,0.10)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ pointerEvents: 'none', clipPath: 'url(#canopy-clip)' }}
            />
          )}
        </AnimatePresence>

        {/* labels */}
        {sections.map((s) => (
          <text
            key={`label-${s.id}`}
            x={s.labelX}
            y={s.labelY}
            textAnchor="middle"
            transform={`rotate(${s.rotate}, ${s.labelX}, ${s.labelY})`}
            fill={hoveredId === s.id ? '#FDE68A' : '#FFFFFF'}
            fontFamily="'Poppins', 'Arial Black', sans-serif"
            fontWeight="800"
            fontSize={s.fontSize}
            letterSpacing="1.5"
            style={{
              filter: 'url(#label-shadow)',
              pointerEvents: 'none',
              transition: 'fill 0.2s',
            }}
          >
            {s.label.map((line, i) => (
              <tspan key={i} x={s.labelX} dy={i === 0 ? 0 : '1.2em'}>
                {line}
              </tspan>
            ))}
          </text>
        ))}
      </svg>
    </div>
  );
};
