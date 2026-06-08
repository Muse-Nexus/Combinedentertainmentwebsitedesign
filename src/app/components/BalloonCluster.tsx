import { motion } from 'motion/react';

interface BalloonClusterProps {
  /** 'left' or 'right' — mirrors the cluster so the pair reads as bookends. */
  side?: 'left' | 'right';
  className?: string;
}

// Brand-ish palette pulled from the site (coral / burgundy / lavender / sage).
const BALLOONS = [
  { cx: 38, cy: 70, rx: 26, ry: 32, fill: '#E2725B', delay: 0 },   // coral
  { cx: 92, cy: 54, rx: 28, ry: 34, fill: '#7B2D43', delay: 0.4 }, // burgundy
  { cx: 66, cy: 120, rx: 30, ry: 36, fill: '#9A8CC4', delay: 0.8 },// lavender
  { cx: 118, cy: 110, rx: 24, ry: 30, fill: '#8FA88B', delay: 1.2 },// sage
  { cx: 30, cy: 132, rx: 22, ry: 27, fill: '#E0A458', delay: 1.6 },// warm gold
];

/**
 * Decorative floating-balloon cluster used as a "bookend" flanking the umbrella
 * nav. Pure SVG + CSS so it needs no image assets and stays crisp at any size.
 * Purely ornamental — aria-hidden, pointer-events-none.
 */
export function BalloonCluster({ side = 'left', className = '' }: BalloonClusterProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 150 230" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
        {/* strings */}
        <g stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" fill="none">
          {BALLOONS.map((b, i) => (
            <path key={`s-${i}`} d={`M ${b.cx} ${b.cy + b.ry} Q ${b.cx + (i % 2 ? 8 : -8)} ${b.cy + b.ry + 45} 75 205`} />
          ))}
        </g>
        {/* balloons */}
        {BALLOONS.map((b, i) => (
          <motion.g
            key={`b-${i}`}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
            style={{ transformOrigin: `${b.cx}px ${b.cy}px` }}
          >
            <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={b.fill} opacity={0.92} />
            {/* highlight */}
            <ellipse cx={b.cx - b.rx * 0.35} cy={b.cy - b.ry * 0.4} rx={b.rx * 0.28} ry={b.ry * 0.22} fill="rgba(255,255,255,0.35)" />
            {/* knot */}
            <path d={`M ${b.cx - 4} ${b.cy + b.ry} L ${b.cx + 4} ${b.cy + b.ry} L ${b.cx} ${b.cy + b.ry + 7} Z`} fill={b.fill} opacity={0.92} />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
