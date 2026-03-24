import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { Wand2, Trophy, Tent, Briefcase } from 'lucide-react';

const services = [
  {
    id: 'magic',
    title: 'Magic',
    icon: Wand2,
    desc: 'Mind-blowing close-up and stage magic that breaks the ice and leaves guests wondering "How?"',
    color: 'bg-teal-500',
    link: '/magic'
  },
  {
    id: 'gameshow',
    title: 'Game Show',
    icon: Trophy,
    desc: 'High-energy interactive game shows that get everyone involved. Perfect for team building.',
    color: 'bg-red-500',
    link: '/game-show'
  },
  {
    id: 'kids',
    title: 'Kids & Circus',
    icon: Tent,
    desc: 'Whimsical characters, stilt walkers, and face painting to delight the young and young at heart.',
    color: 'bg-orange-500',
    link: '/kids-circus'
  },
  {
    id: 'corporate',
    title: 'Corporate',
    icon: Briefcase,
    desc: 'Professional entertainment solutions tailored for galas, conferences, and brand activations.',
    color: 'bg-blue-900',
    link: '/corporate'
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    >
                        <div className={`h-32 ${service.color} flex items-center justify-center p-8`}>
                            <service.icon className="text-white w-16 h-16 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
                            <p className="text-slate-600 mb-6">{service.desc}</p>
                            <Link 
                                to={service.link}
                                className={`inline-block px-6 py-2 rounded-full border-2 font-bold transition-colors ${
                                    service.id === 'magic' ? 'border-teal-500 text-teal-600 hover:bg-teal-50' :
                                    service.id === 'gameshow' ? 'border-red-500 text-red-600 hover:bg-red-50' :
                                    service.id === 'kids' ? 'border-orange-500 text-orange-600 hover:bg-orange-50' :
                                    'border-blue-900 text-blue-900 hover:bg-blue-50'
                                }`}
                            >
                                Explore
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
  );
}
