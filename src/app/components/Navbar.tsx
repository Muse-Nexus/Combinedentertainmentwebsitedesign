import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';

/**
 * Standard top navigation used on every inner page.
 * The umbrella nav is reserved for the landing page (`/`) only —
 * inner pages get a conventional horizontal menu with the same routes.
 */

const services = [
  { to: '/balloon-twisting', label: 'Balloon Twisting & Facepainting' },
  { to: '/balloon-decor',    label: 'Balloon Decor' },
  { to: '/strolling',        label: 'Strolling Entertainment' },
  { to: '/magic',            label: 'Magic' },
  { to: '/casino',           label: 'Casino' },
  { to: '/game-show',        label: 'Game Show' },
  { to: '/corporate',        label: 'Corporate Events' },
];

const utility = [
  { to: '/upcoming-shows', label: 'Shows' },
  { to: '/about',          label: 'About' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-6">
        {/* Logo — lands on `/` already past the scroll-driven animations */}
        <Link to="/" state={{ skipAnimation: true }} className="flex items-center gap-2 z-10 drop-shadow-lg shrink-0">
          <img
            src="/media/logos/Horizontal White Raining Entertainment Secondary Logo.png"
            alt="Raining Entertainment"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 text-white">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="px-3 py-2 flex items-center gap-1 font-medium hover:text-coral transition-colors drop-shadow-md"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
            >
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full pt-2 min-w-[260px]"
                >
                  <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {services.map((s) => (
                      <NavLink
                        key={s.to}
                        to={s.to}
                        className={({ isActive }) =>
                          clsx(
                            'block px-4 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-coral/15 text-coral'
                              : 'text-white/85 hover:bg-white/5 hover:text-white'
                          )
                        }
                      >
                        {s.label}
                      </NavLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {utility.map((u) => (
            <NavLink
              key={u.to}
              to={u.to}
              className={({ isActive }) =>
                clsx(
                  'px-3 py-2 font-medium transition-colors drop-shadow-md',
                  isActive ? 'text-coral' : 'text-white hover:text-coral'
                )
              }
            >
              {u.label}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="ml-3 px-5 py-2 bg-coral hover:bg-coral/80 rounded-full font-bold transition-colors shadow-lg"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white z-10 p-2"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-slate-900 p-4 flex flex-col gap-3 shadow-xl border-b border-slate-800"
          >
            {services.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-lg text-white font-medium hover:bg-white/5"
              >
                {s.label}
              </Link>
            ))}
            <div className="h-px bg-slate-700 my-2" />
            {utility.map((u) => (
              <Link
                key={u.to}
                to={u.to}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2.5 rounded-lg text-white font-medium hover:bg-white/5"
              >
                {u.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 p-3 bg-coral text-white rounded-lg text-center font-bold"
            >
              Book Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
