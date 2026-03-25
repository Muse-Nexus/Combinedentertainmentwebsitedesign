import React, { useState } from 'react';
import umbrellaImg from 'figma:asset/435bb1334bd5cdc6afdd7be376256495c03eeb10.png';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

interface UmbrellaNavProps {
  className?: string;
}

export const UmbrellaNav = ({ className = '' }: UmbrellaNavProps) => {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Define sections with paths and label coordinates
  // Layout: Her (left) → Both (center) → Him (right)
  const sections = [
    {
      id: 'balloon-twisting',
      label: 'BALLOON\nTWISTING',
      path: "M 50 350 Q 150 50 671 20 L 350 450 Z", // Far Left - Her
      route: '/balloon-twisting',
      labelX: 270,
      labelY: 230,
      rotate: -32
    },
    {
      id: 'balloon-decor',
      label: 'BALLOON\nDECOR',
      path: "M 350 450 L 671 20 L 600 500 Z", // Mid Left - Her
      route: '/balloon-decor',
      labelX: 470,
      labelY: 180,
      rotate: -16
    },
    {
      id: 'strolling',
      label: 'STROLLING',
      path: "M 600 500 L 671 20 L 740 500 Z", // Center - Both
      route: '/strolling',
      labelX: 671,
      labelY: 140,
      rotate: 0
    },
    {
      id: 'magic',
      label: 'MAGIC',
      path: "M 740 500 L 671 20 L 990 450 Z", // Mid Right - Him
      route: '/magic',
      labelX: 872,
      labelY: 180,
      rotate: 16
    },
    {
      id: 'casino',
      label: 'CASINO &\nGAMESHOW',
      path: "M 990 450 L 671 20 Q 1200 50 1290 350 Z", // Far Right - Him
      route: '/casino-gameshow',
      labelX: 1070,
      labelY: 230,
      rotate: 32
    }
  ];

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Floating Home Button */}
      <motion.button
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-br from-lavender to-burgundy hover:from-lavender/90 hover:to-burgundy/90 text-white rounded-full p-4 shadow-2xl hover:shadow-lavender/50 transition-all duration-300"
        aria-label="Home"
      >
        <Home className="w-6 h-6" />
      </motion.button>

      {/* The Umbrella Image */}
      <img 
        src={umbrellaImg} 
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
            className="cursor-pointer group"
          >
            {/* Click Area */}
            <path 
              d={section.path}
              fill="transparent"
              className="transition-all duration-300 hover:fill-white/10"
              stroke="transparent"
            />
            
            {/* Label Text on Umbrella */}
            <text
              x={section.labelX}
              y={section.labelY}
              textAnchor="middle"
              transform={`rotate(${section.rotate}, ${section.labelX}, ${section.labelY})`}
              className={`font-display font-semibold text-xl tracking-wider uppercase transition-all duration-300 pointer-events-none drop-shadow-md ${
                hoveredSection === section.id ? 'fill-yellow-300 scale-110' : 'fill-white/90'
              }`}
              style={{ 
                filter: 'url(#text-shadow)',
                fontSize: '28px',
                whiteSpace: 'pre'
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