import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UmbrellaNav } from './UmbrellaNav';
import clsx from 'clsx';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On home, navbar might be hidden until scrolled past hero? 
  // Or it's always there but transparent?
  // Let's make it sticky.

  return (
    <nav className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl md:text-2xl flex items-center gap-2 z-50 drop-shadow-lg">
           {/* Maybe a small umbrella icon? */}
           <span className="text-2xl">☂️</span>
           <span className="transition-opacity opacity-100">
             Raining Entertainment
           </span>
        </Link>

        {/* Desktop Nav - Using Compact UmbrellaNav if scrolled or not home */}
        <div className="hidden md:flex flex-1 justify-center">
            {(!isHome || scrolled) && (
                <div className="w-[600px]">
                    <UmbrellaNav compact />
                </div>
            )}
        </div>

        {/* Desktop Utility Links */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <Link to="/upcoming-shows" className="hover:text-coral transition-colors font-medium drop-shadow-md">Shows</Link>
          <Link to="/about" className="hover:text-coral transition-colors font-medium drop-shadow-md">About</Link>
          <Link to="/contact" className="px-4 py-2 bg-coral hover:bg-coral/80 rounded-full font-bold transition-colors shadow-lg">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
            className="md:hidden text-white z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-0 left-0 right-0 bg-slate-900 p-4 pt-20 flex flex-col gap-4 shadow-xl border-b border-slate-800"
                >
                    <Link to="/balloon-twisting" onClick={() => setIsOpen(false)} className="p-3 bg-burgundy/20 text-pink-300 rounded-lg text-center font-bold border border-burgundy/50">
                        Balloon Twisting & Facepainting
                    </Link>
                    <Link to="/balloon-decor" onClick={() => setIsOpen(false)} className="p-3 bg-coral/20 text-orange-300 rounded-lg text-center font-bold border border-coral/50">
                        Balloon Decor
                    </Link>
                    <Link to="/strolling" onClick={() => setIsOpen(false)} className="p-3 bg-red-500/20 text-red-300 rounded-lg text-center font-bold border border-red-500/50">
                        Strolling Entertainment
                    </Link>
                    <Link to="/magic" onClick={() => setIsOpen(false)} className="p-3 bg-sage/20 text-teal-300 rounded-lg text-center font-bold border border-sage/50">
                        Magic
                    </Link>
                    <Link to="/casino-gameshow" onClick={() => setIsOpen(false)} className="p-3 bg-lavender/20 text-purple-300 rounded-lg text-center font-bold border border-lavender/50">
                        Casino & Gameshow
                    </Link>
                    
                    <div className="h-px bg-slate-700 my-2" />
                    
                    <Link to="/upcoming-shows" onClick={() => setIsOpen(false)} className="text-white text-center py-2 hover:text-coral">Upcoming Shows</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="text-white text-center py-2 hover:text-coral">About Us</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="p-3 bg-coral text-white rounded-lg text-center font-bold mt-2">
                        Book Now
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </nav>
  );
}