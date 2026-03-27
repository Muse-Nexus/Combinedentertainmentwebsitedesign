import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Wand2, Trophy, Tent, Briefcase, Palette } from 'lucide-react';

// Real performance photos from media folder
const balloonTwistingImg = '/media/balloons/kid-panda-facepainting.jpg';
const balloonDecorImg = '/media/balloon-decor/tropical-arch-resort.jpg';
const strollingImg = '/media/strolling/moth-stilt-costume.jpg';
const magicImg = '/media/magic/brent-umbrella-beach.jpg';
const casinoImg = '/media/casino-gameshow/gameshow-outdoor-fullset.jpg';

const services = [
  {
    id: 'balloon-twisting',
    title: 'Balloon Twisting & Facepainting',
    shortTitle: 'Balloon Twisting',
    icon: Palette,
    desc: 'Colorful balloon creations and beautiful facepainting that delight kids and adults alike.',
    color: 'bg-pink-700',
    link: '/balloon-twisting',
    image: balloonTwistingImg
  },
  {
    id: 'balloon-decor',
    title: 'Balloon Decor',
    shortTitle: 'Balloon Decor',
    icon: Tent,
    desc: 'Stunning balloon installations and decor that transform any venue into a celebration.',
    color: 'bg-orange-500',
    link: '/balloon-decor',
    image: balloonDecorImg
  },
  {
    id: 'strolling',
    title: 'Strolling Entertainment',
    shortTitle: 'Strolling Entertainment',
    icon: Trophy,
    desc: 'Roaming performers who mingle with your guests, bringing magic and wonder up close.',
    color: 'bg-red-600',
    link: '/strolling',
    image: strollingImg
  },
  {
    id: 'magic',
    title: 'Magic',
    shortTitle: 'Magic',
    icon: Wand2,
    desc: 'Mind-blowing close-up and stage magic that breaks the ice and leaves guests wondering "How?"',
    color: 'bg-teal-500',
    link: '/magic',
    image: magicImg
  },
  {
    id: 'casino-gameshow',
    title: 'Casino & Gameshow',
    shortTitle: 'Casino & Gameshow',
    icon: Briefcase,
    desc: 'Casino nights and high-energy game shows that get everyone involved. Perfect for team building.',
    color: 'bg-purple-700',
    link: '/casino-gameshow',
    image: casinoImg
  }
];

function Balloon({ delay, x, color }: { delay: number, x: string, color: string }) {
    return (
        <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: "-100vh" }}
            transition={{ 
                duration: 15, 
                repeat: Infinity, 
                delay: delay, 
                ease: "linear" 
            }}
            className="absolute bottom-0 z-0 opacity-20"
            style={{ left: x }}
        >
            <svg width="60" height="80" viewBox="0 0 60 80">
                <path d="M30 70 C 50 70 55 40 55 30 C 55 10 45 0 30 0 C 15 0 5 10 5 30 C 5 40 10 70 30 70 Z" fill={color} />
                <path d="M30 70 L 30 80" stroke={color} strokeWidth="2" />
            </svg>
        </motion.div>
    );
}

export function ServiceCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="relative min-h-screen py-24 overflow-hidden bg-slate-50">
        
        {/* Animated Balloons Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Balloon delay={0} x="10%" color="#1BAFB2" />
            <Balloon delay={5} x="30%" color="#E85C4A" />
            <Balloon delay={2} x="60%" color="#F1A43C" />
            <Balloon delay={8} x="85%" color="#243A5E" />
            <Balloon delay={12} x="20%" color="#F1A43C" />
            <Balloon delay={7} x="70%" color="#1BAFB2" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Pick Your Vibe</h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    From intimate gatherings to grand ballrooms, we have the perfect entertainment package for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link 
                            to={service.link}
                            className="block relative rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 aspect-[3/4]"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img 
                                    src={service.image} 
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Dark overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
                            </div>

                            {/* Content Overlay */}
                            <div className="relative h-full flex flex-col justify-end p-6">
                                {/* Title at bottom - smaller and left-aligned */}
                                <div>
                                    <h3 className="text-white font-black uppercase leading-tight tracking-tight text-left
                                                   text-lg sm:text-xl lg:text-lg xl:text-xl mb-3
                                                   [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
  );
}