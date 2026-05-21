import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface UmbrellaNavProps {
  className?: string;
  compact?: boolean;
  /**
   * Single source of truth for the umbrella's on-screen width.
   * Accepts any CSS length (px, vw, clamp(), min(), etc.).
   * Applied as an inline width so it ignores ambiguous parent sizing.
   */
  displayWidth?: string;
  /**
   * When true, fades in the styled text overlay (umbrella-text.png) on top of
   * the canopy. The overlay replaces the in-SVG section labels and is meant
   * to animate in once the umbrella has finished arriving at the top of the
   * page.
   */
  revealText?: boolean;
}

// ── SINGLE PLACE TO RESIZE THE UMBRELLA ───────────────────────────────────
// Change this value to scale the umbrella nav everywhere it is rendered.
export const UMBRELLA_DISPLAY_WIDTH = 'min(96vw, 1400px)';

// ─── Geometry overlay for /media/umbrella-photo.png (2417×1278) ──────────────
const HUB_X = 1240;
const HUB_Y = 20;
const CX = 1240;
const CY = 270;
const RX = 1180;
const RY = 230;

const PT = Array.from({ length: 8 }, (_, i) => {
  const deg = 180 - i * (180 / 7);
  const rad = (deg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(rad), y: CY + RY * Math.sin(rad) };
});

// Wedge apex sits at the TOP of the canopy (not the finial), so hit boxes
// fan out from where the canopy begins, ignoring the spike above it.
const APEX_X = CX;
const APEX_Y = CY - RY;

const wedge = (i: number) =>
  `M ${APEX_X} ${APEX_Y} L ${PT[i].x} ${PT[i].y} ` +
  `A ${RX} ${RY} 0 0 1 ${PT[i + 1].x} ${PT[i + 1].y} Z`;

// Labels sit along the bottom edge of the front canopy (horizontal, no rotation).
// Factor pulls them slightly inward from the rim so they sit ON the canopy fabric.
const labelAt = (i: number, factor = 0.88) => {
  const midDeg = 180 - (i + 0.5) * (180 / 7);
  const rad = (midDeg * Math.PI) / 180;
  return {
    x: CX + factor * RX * Math.cos(rad),
    y: CY + factor * RY * Math.sin(rad),
  };
};

interface Section {
  id: string;
  label: string;
  route: string;
  panelIdx: number;
}

// Single-line labels keep the text horizontal along the canopy edge.
const sections: Section[] = [
  { id: 'corporate',          label: 'CORPORATE',     route: '/corporate',        panelIdx: 0 },
  { id: 'balloons-facepaint', label: 'BALLOONS',      route: '/balloon-twisting', panelIdx: 1 },
  { id: 'balloon-decor',      label: 'DECOR',         route: '/balloon-decor',    panelIdx: 2 },
  { id: 'strolling',          label: 'STROLLING',     route: '/strolling',        panelIdx: 3 },
  { id: 'magic',              label: 'MAGIC',         route: '/magic',            panelIdx: 4 },
  { id: 'casino',             label: 'CASINO',        route: '/casino',           panelIdx: 5 },
  { id: 'gameshow',           label: 'GAMESHOW',      route: '/game-show',        panelIdx: 6 },
];

// Shared label font size (px in SVG user units; SVG scales with the umbrella).
// Tuned down from a chunkier original so the words read clearly at every
// responsive width without overrunning their wedge.
const LABEL_FONT_SIZE = 28;
const LABEL_LETTER_SPACING = 2;

export const UmbrellaNav = ({ className = '', compact = false, displayWidth = UMBRELLA_DISPLAY_WIDTH, revealText = false }: UmbrellaNavProps) => {
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
            {s.label}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: displayWidth, maxWidth: '100%' }}>
      <svg
        viewBox="0 0 2417 1278"
        className="block w-full h-auto select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="umbrella-label-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.9" />
          </filter>
        </defs>

        <image
          href="/media/umbrella-photo.png"
          x="0" y="0" width="2417" height="1278"
          style={{ pointerEvents: 'none' }}
        />

        {sections.map((s) => (
          <path
            key={s.id}
            d={wedge(s.panelIdx)}
            // Fully invisible pie-slice hit box emanating from the finial (HUB).
            // `fill` must be present (not 'none') for the path to capture clicks,
            // so we use a transparent fill which still receives pointer events.
            fill="rgba(0,0,0,0)"
            stroke="none"
            onClick={() => navigate(s.route)}
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ cursor: 'pointer' }}
          />
        ))}

        <AnimatePresence>
          {hoveredId && (
            <motion.path
              key={hoveredId}
              d={wedge(sections.find((s) => s.id === hoveredId)!.panelIdx)}
              fill="rgba(255,255,255,0.06)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ pointerEvents: 'none' }}
            />
          )}
        </AnimatePresence>

        {/* Inline-SVG text overlay. Replaces the old raster umbrella-text.png:
            stays crisp at any size, lighter weight, and the wording matches
            the 7 wedge hit boxes exactly. Fades + rises in once `revealText`
            flips true (typically when the umbrella has arrived). */}
        <motion.g
          initial={false}
          animate={
            revealText
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -14 }
          }
          transition={{
            opacity: { duration: 0.9, ease: 'easeOut' },
            y:       { duration: 1.0, ease: [0.2, 0.8, 0.2, 1] },
          }}
          style={{ pointerEvents: 'none' }}
        >
          {sections.map((s, i) => {
            const p = labelAt(s.panelIdx, 0.86);
            const isHover = hoveredId === s.id;
            return (
              <text
                key={s.id}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontSize={LABEL_FONT_SIZE}
                fontWeight={800}
                letterSpacing={LABEL_LETTER_SPACING}
                fontFamily="'Inter','Helvetica Neue',Arial,sans-serif"
                filter="url(#umbrella-label-shadow)"
                style={{ opacity: isHover ? 1 : 0.92, transition: 'opacity 180ms ease' }}
              >
                {s.label}
              </text>
            );
          })}
        </motion.g>
      </svg>
    </div>
  );
};
