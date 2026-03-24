import React, { useState } from 'react';
import umbrellaImg from 'figma:asset/435bb1334bd5cdc6afdd7be376256495c03eeb10.png';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface UmbrellaNavProps {
  className?: string;
}

export const UmbrellaNav = ({ className = '' }: UmbrellaNavProps) => {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Define sections with paths and label coordinates
  // Adjusted Y coordinates higher to ensure text sits on the "front" canvas panels
  // Adjusted rotations for better perspective alignment
  const sections = [
    {
      id: 'magic',
      label: 'MAGIC',
      path: "M 50 350 Q 150 50 671 20 L 350 450 Z", // Far Left
      route: '/magic',
      labelX: 270,
      labelY: 290,
      rotate: -32
    },
    {
      id: 'casino',
      label: 'CASINO',
      path: "M 350 450 L 671 20 L 600 500 Z", // Mid Left
      route: '/casino',
      labelX: 470,
      labelY: 230,
      rotate: -16
    },
    {
      id: 'home',
      label: 'HOME',
      path: "M 600 500 L 671 20 L 740 500 Z", // Center (Red)
      route: '/',
      labelX: 671,
      labelY: 180,
      rotate: 0
    },
    {
      id: 'kids',
      label: 'CIRCUS',
      path: "M 740 500 L 671 20 L 990 450 Z", // Mid Right
      route: '/kids-circus',
      labelX: 872,
      labelY: 230,
      rotate: 16
    },
    {
      id: 'corporate',
      label: 'CORP',
      path: "M 990 450 L 671 20 Q 1200 50 1290 350 Z", // Far Right
      route: '/corporate',
      labelX: 1070,
      labelY: 290,
      rotate: 32
    }
  ];

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
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
        </defs>

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
              className={`font-display font-black fill-white text-3xl tracking-widest uppercase transition-all duration-300 pointer-events-none drop-shadow-md ${
                hoveredSection === section.id ? 'fill-yellow-300 scale-110' : 'fill-white/90'
              }`}
              style={{ 
                filter: 'url(#text-shadow)',
                fontSize: '42px'
              }}
            >
              {section.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
