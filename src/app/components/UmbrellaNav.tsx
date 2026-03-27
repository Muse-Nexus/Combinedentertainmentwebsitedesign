import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface UmbrellaNavProps {
  className?: string;
  compact?: boolean;
}

/*
  PIXEL-MEASURED from UmbrellaNavigation.png (1536×1024 RGBA).

  Canopy boundary (non-transparent edge, measured via PIL):
    y=200: L=506  R=1042  (536px wide)
    y=300: L=353  R=1209  (856px wide)
    y=340: L=311  R=1254  (943px wide)
    y=400: L=255  R=1315  (1060px wide)
    y=460: L=206  R=1369  (1163px wide — widest before scalloped curl)

  Rib lines (dark-pixel scan at y=350 / y=400):
    301/256,  390/356,  509/485,  659/650,  843/853,  972/993,  1090/1119,  1192/1232,  1264/1314
    → 9 ribs defining 8 visible panel sections

  Color zones (HSV + RGB classification at y=300):
    x ≈ 353–533 : RED/BURGUNDY   (panels 1–2)
    x ≈ 533–833 : ORANGE/GOLD    (panels 3–4)
    x ≈ 833–951 : CREAM          (panel 5)
    x ≈ 951–1061: SAGE/GRAY-GREEN(panel 6)
    x ≈ 1061–1209: BLUE/PURPLE   (panels 7–8)

  Zone → rib mapping:
    BALLOON TWISTING  = left edge → rib 509   (RED, 2 panels)
    BALLOON DECOR     = rib 509  → rib 843    (ORANGE/GOLD, 2 panels)
    STROLLING         = rib 843  → rib 972    (CREAM, 1 panel)
    MAGIC             = rib 972  → rib 1090   (SAGE, 1 panel)
    CASINO & GAMESHOW = rib 1090 → right edge (PURPLE, 2 panels)

  CRITICAL: Image is embedded INSIDE the SVG via <image> so the hit-zone
  polygons share the exact same coordinate space as the pixels.
  No CSS overlay alignment issues.
*/

/* Rib positions extrapolated to 3 Y levels (200 / 340 / 465) using slopes
   measured from y=350 and y=400 dark-pixel data. */
const sections = [
  {
    id: 'balloon-twisting',
    label: ['BALLOON', 'TWISTING'],
    route: '/balloon-twisting',
    // Left canopy edge → rib at ~509 (RED panels)
    path: 'M 506,200 L 575,200 L 519,300 L 509,340 L 485,400 L 454,465 L 210,465 L 255,400 L 311,340 L 353,300 Z',
    labelX: 430,
    labelY: 330,
    rotate: -24,
    fontSize: 24,
  },
  {
    id: 'balloon-decor',
    label: ['BALLOON', 'DECOR'],
    route: '/balloon-decor',
    // Rib ~509 → rib ~843 (ORANGE / GOLD panels)
    path: 'M 575,200 L 813,200 L 833,300 L 843,340 L 853,400 L 866,465 L 454,465 L 485,400 L 509,340 L 519,300 Z',
    labelX: 678,
    labelY: 330,
    rotate: -8,
    fontSize: 26,
  },
  {
    id: 'strolling',
    label: ['STROLLING'],
    route: '/strolling',
    // Rib ~843 → rib ~972 (CREAM panel)
    path: 'M 813,200 L 909,200 L 951,300 L 972,340 L 993,400 L 1022,465 L 866,465 L 853,400 L 843,340 L 833,300 Z',
    labelX: 898,
    labelY: 340,
    rotate: 2,
    fontSize: 21,
  },
  {
    id: 'magic',
    label: ['MAGIC'],
    route: '/magic',
    // Rib ~972 → rib ~1090 (SAGE panel)
    path: 'M 909,200 L 1003,200 L 1061,300 L 1090,340 L 1119,400 L 1157,465 L 1022,465 L 993,400 L 972,340 L 951,300 Z',
    labelX: 1015,
    labelY: 340,
    rotate: 10,
    fontSize: 26,
  },
  {
    id: 'casino',
    label: ['CASINO &', 'GAMESHOW'],
    route: '/casino-gameshow',
    // Rib ~1090 → right canopy edge (BLUE / PURPLE panels)
    path: 'M 1003,200 L 1042,200 L 1209,300 L 1254,340 L 1315,400 L 1372,465 L 1157,465 L 1119,400 L 1090,340 L 1061,300 Z',
    labelX: 1160,
    labelY: 330,
    rotate: 22,
    fontSize: 20,
  },
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
            {s.label.join(' ')}
          </button>
        ))}
      </nav>
    );
  }

  /* ───── FULL MODE (hero / landing page) ─────
     Single <svg> with <image> inside — guarantees pixel-perfect alignment
     between the umbrella PNG and the hit-zone / label overlays. */
  return (
    <div className={`relative w-full max-w-6xl mx-auto select-none ${className}`}>
      <svg
        className="w-full h-auto drop-shadow-2xl"
        viewBox="0 0 1536 1024"
        role="img"
        aria-label="Raining Entertainment — Choose your entertainment"
      >
        {/* Umbrella image — rendered first so hit zones layer on top */}
        <image
          href="/media/logos/UmbrellaNavigation.png"
          x="0"
          y="0"
          width="1536"
          height="1024"
          style={{ pointerEvents: 'none' }}
        />

        <defs>
          <filter id="label-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {sections.map((section) => {
          const isHovered = hoveredSection === section.id;
          const lineCount = section.label.length;

          return (
            <g
              key={section.id}
              onClick={() => navigate(section.route)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="cursor-pointer"
            >
              {/* Clickable hit zone — transparent fill captures pointer events */}
              <path d={section.path} fill="transparent" />

              {/* Hover highlight */}
              <AnimatePresence>
                {isHovered && (
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

              {/* Label — white bold text on the umbrella panel */}
              <text
                x={section.labelX}
                y={section.labelY}
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${section.rotate}, ${section.labelX}, ${section.labelY})`}
                fill="white"
                fontFamily="'Poppins', sans-serif"
                fontWeight="800"
                fontSize={section.fontSize}
                letterSpacing="1.5"
                style={{ filter: 'url(#label-shadow)', pointerEvents: 'none' }}
                opacity={isHovered ? 1 : 0.92}
              >
                {section.label.map((line, i) => (
                  <tspan
                    key={i}
                    x={section.labelX}
                    dy={
                      i === 0
                        ? lineCount > 1
                          ? '-0.575em'
                          : '0'
                        : '1.15em'
                    }
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
