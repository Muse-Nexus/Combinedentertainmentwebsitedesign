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
        scrolled || !isHome ? "bg-slate-900/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl md:text-2xl flex items-center gap-2 z-50">
           {/* Maybe a small umbrella icon? */}
           <span className="text-2xl">☂️</span>
           <span className={clsx("transition-opacity", scrolled || !isHome ? "opacity-100" : "opacity-0 md:opacity-100")}>
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
          <Link to="/upcoming-shows" className="hover:text-orange-400 transition-colors font-medium">Shows</Link>
          <Link to="/about" className="hover:text-orange-400 transition-colors font-medium">About</Link>
          <Link to="/contact" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-full font-bold transition-colors">
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
                    <Link to="/magic" onClick={() => setIsOpen(false)} className="p-3 bg-teal-500/20 text-teal-300 rounded-lg text-center font-bold border border-teal-500/50">
                        Magic
                    </Link>
                    <Link to="/game-show" onClick={() => setIsOpen(false)} className="p-3 bg-red-500/20 text-red-300 rounded-lg text-center font-bold border border-red-500/50">
                        Game Show
                    </Link>
                    <Link to="/kids-circus" onClick={() => setIsOpen(false)} className="p-3 bg-orange-500/20 text-orange-300 rounded-lg text-center font-bold border border-orange-500/50">
                        Kids & Circus
                    </Link>
                    <Link to="/corporate" onClick={() => setIsOpen(false)} className="p-3 bg-blue-500/20 text-blue-300 rounded-lg text-center font-bold border border-blue-500/50">
                        Corporate
                    </Link>
                    
                    <div className="h-px bg-slate-700 my-2" />
                    
                    <Link to="/upcoming-shows" onClick={() => setIsOpen(false)} className="text-white text-center py-2 hover:text-orange-400">Upcoming Shows</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)} className="text-white text-center py-2 hover:text-orange-400">About Us</Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="p-3 bg-orange-600 text-white rounded-lg text-center font-bold mt-2">
                        Book Now
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
