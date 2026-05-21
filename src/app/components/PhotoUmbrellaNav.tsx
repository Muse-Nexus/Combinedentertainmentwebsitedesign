import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface PhotoUmbrellaNavProps {
  className?: string;
}

// ─── Geometry (matches /media/umbrella-photo.png, 1110×770) ──────────────
// Hub (finial) at (555, 95). Visible front rim is a shallow arc:
// ellipse center (555, 460), rx=465, ry=50, sweeping 180°→0° through θ=90°.
const HUB_X = 555;
const HUB_Y = 95;
const CX = 555;
const CY = 460;
const RX = 465;
const RY = 50;

// Label arc is a *dome* (apex up) so labels curve like the top of the canopy,
// not a U. Same horizontal span, but the midpoint sits HIGHER than the edges.
const LABEL_CY = 430;
const LABEL_RY = -70; // negative → sin(90°) lifts the middle upward

const PT = Array.from({ length: 8 }, (_, i) => {
  const deg = 180 - i * (180 / 7);
  const rad = (deg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(rad), y: CY + RY * Math.sin(rad) };
});

const wedge = (i: number) =>
  `M ${HUB_X} ${HUB_Y} L ${PT[i].x} ${PT[i].y} ` +
  `A ${RX} ${RY} 0 0 1 ${PT[i + 1].x} ${PT[i + 1].y} Z`;

const labelAt = (i: number, factor = 0.78) => {
  const midDeg = 180 - (i + 0.5) * (180 / 7);
  const rad = (midDeg * Math.PI) / 180;
  const rimX = CX + RX * Math.cos(rad);
  const rimY = LABEL_CY + LABEL_RY * Math.sin(rad);
  return { x: HUB_X + factor * (rimX - HUB_X), y: HUB_Y + factor * (rimY - HUB_Y) };
};

const labelRotation = (i: number) => {
  // Tangent to the dome arc at the wedge midpoint.
  const midDeg = 180 - (i + 0.5) * (180 / 7);
  const rad = (midDeg * Math.PI) / 180;
  // d/dθ of (RX cosθ, LABEL_RY sinθ) = (-RX sinθ, LABEL_RY cosθ)
  const tx = -RX * Math.sin(rad);
  const ty = LABEL_RY * Math.cos(rad);
  return (Math.atan2(ty, tx) * 180) / Math.PI;
};

interface Section {
  id: string;
  label: string[];
  route: string;
  panelIdx: number;
  fontSize: number;
}

const sections: Section[] = [
  { id: 'corporate',           label: ['CORPORATE'],                 route: '/corporate',        panelIdx: 0, fontSize: 20 },
  { id: 'balloons-facepaint',  label: ['BALLOONS &', 'FACEPAINTING'], route: '/balloon-twisting', panelIdx: 1, fontSize: 18 },
  { id: 'balloon-decor',       label: ['BALLOON', 'DECOR'],          route: '/balloon-decor',    panelIdx: 2, fontSize: 20 },
  { id: 'strolling',           label: ['STROLLING'],                 route: '/strolling',        panelIdx: 3, fontSize: 26 },
  { id: 'magic',               label: ['MAGIC'],                     route: '/magic',            panelIdx: 4, fontSize: 26 },
  { id: 'casino',              label: ['CASINO'],                    route: '/casino',           panelIdx: 5, fontSize: 22 },
  { id: 'gameshow',            label: ['GAMESHOW'],                  route: '/game-show',        panelIdx: 6, fontSize: 20 },
];

export const PhotoUmbrellaNav = ({ className = '' }: PhotoUmbrellaNavProps) => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={`relative w-full ${className}`} style={{ maxWidth: '1100px' }}>
      <svg
        viewBox="0 0 1110 770"
        className="w-full h-auto select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="photo-label-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Photographic umbrella backdrop */}
        <image
          href="/media/umbrella-photo.png"
          x="0" y="0" width="1110" height="770"
          style={{ pointerEvents: 'none' }}
        />

        {/* Clickable wedge hotspots — transparent fill, hover highlights canopy */}
        {sections.map((s) => {
          const isHovered = hoveredId === s.id;
          return (
            <path
              key={s.id}
              d={wedge(s.panelIdx)}
              fill={isHovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0)'}
              stroke={isHovered ? 'rgba(255,255,255,0.5)' : 'transparent'}
              strokeWidth="1.5"
              onClick={() => navigate(s.route)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer', transition: 'fill 0.18s ease, stroke 0.18s ease' }}
            />
          );
        })}

        {/* Labels */}
        {sections.map((s) => {
          const { x, y } = labelAt(s.panelIdx);
          const rot = labelRotation(s.panelIdx);
          const isHovered = hoveredId === s.id;
          return (
            <g
              key={`lbl-${s.id}`}
              transform={`translate(${x} ${y}) rotate(${rot})`}
              style={{ pointerEvents: 'none' }}
            >
              {s.label.map((line, li) => (
                <text
                  key={li}
                  x="0"
                  y={li * (s.fontSize + 2) - ((s.label.length - 1) * (s.fontSize + 2)) / 2}
                  fill={isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.95)'}
                  fontSize={s.fontSize}
                  fontWeight="800"
                  fontFamily="Poppins, sans-serif"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  letterSpacing="1"
                  filter="url(#photo-label-shadow)"
                  style={{ transition: 'fill 0.18s ease' }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Hover sheen layer (above labels) */}
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
      </svg>
    </div>
  );
};
