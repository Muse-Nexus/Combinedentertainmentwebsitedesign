import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Instagram, Facebook, Mail, Youtube } from 'lucide-react';

const brentonRoutes = ['/magic', '/game-show', '/casino', '/casino-gameshow', '/shows/mulligans-magic-show'];
const jolieRoutes = ['/cirque-jolie', '/strolling', '/led-performers', '/balloon-twisting', '/face-painting', '/balloon-decor'];

const isFeaturedRoute = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

export function Footer() {
  const { pathname } = useLocation();
  const featureBrenton = isFeaturedRoute(pathname, brentonRoutes);
  const featureJolie = isFeaturedRoute(pathname, jolieRoutes);

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
             <Link to="/" state={{ skipAnimation: true }} className="inline-block mb-4">
               <img src="/media/logos/White Primary Logo Raining Entertainment.png" alt="Raining Entertainment" loading="lazy" decoding="async" className="h-20 w-auto" />
             </Link>
             <p className="max-w-md">
                Maui's premier entertainment company — combining the magic of Brenton Keith &amp; His Bag O&rsquo; Tricks,
                the artistry of Cirque Jolie, and the excitement of Gameshow Fanatics.
             </p>
             <p className="text-sm mt-3 text-slate-500">
                Based in Maui, Hawaiʻi &middot; Available for travel
             </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/balloon-twisting" className="hover:text-coral transition-colors">Balloon Twisting &amp; Face Painting</Link></li>
              <li><Link to="/balloon-decor" className="hover:text-coral transition-colors">Balloon Decor</Link></li>
              <li><Link to="/strolling" className="hover:text-cream transition-colors">Stilt Walkers</Link></li>
              <li><Link to="/led-performers" className="hover:text-lavender transition-colors">LED Performers</Link></li>
              <li><Link to="/magic" className="hover:text-sage transition-colors">Magic</Link></li>
              <li><Link to="/casino" className="hover:text-lavender transition-colors">Casino NITE</Link></li>
              <li><Link to="/game-show" className="hover:text-coral transition-colors">Game Show NITE</Link></li>
              <li><Link to="/corporate" className="hover:text-coral transition-colors">Corporate Events</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/upcoming-shows" className="hover:text-white transition-colors">Upcoming Shows</Link></li>
              <li><Link to="/shows/mulligans-magic-show" className="hover:text-white transition-colors">Mulligan&rsquo;s Magic Show</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-4">
               <a href="https://www.instagram.com/magicbrent/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Brenton Keith and His Bag O' Tricks on Instagram"><Instagram /></a>
               <a href="https://www.facebook.com/MagicBrent/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook /></a>
               <a href="https://www.youtube.com/@magicbrent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube"><Youtube /></a>
               <a href="mailto:brentonkeith@magicbrent.com" className="hover:text-white transition-colors" aria-label="Email"><Mail /></a>
            </div>
            <Link to="/contact" className="text-coral hover:text-coral/80 font-medium">
                Book an Event &rarr;
            </Link>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.035] p-5 md:p-7">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-coral">Follow the fun</p>
              <h3 className="mt-1 text-xl font-bold text-white">See what Brenton and Jolie are creating on Maui.</h3>
            </div>
            <p className="text-sm text-slate-500">Two feeds. One entertainment team.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <a
              href="https://www.instagram.com/magicbrent/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                featureBrenton
                  ? 'border-coral/50 bg-coral/10 text-white'
                  : 'border-white/10 bg-slate-950/40 hover:border-coral/35 hover:bg-coral/5'
              }`}
              aria-label="Follow Brenton Keith and His Bag O' Tricks on Instagram"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-white">@magicbrent</span>
                <span className="block text-sm text-slate-400">Magic · Game Show NITE · Casino NITE</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral" aria-hidden="true" />
            </a>

            <a
              href="https://www.instagram.com/cirquejolie/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                featureJolie
                  ? 'border-lavender/50 bg-lavender/10 text-white'
                  : 'border-white/10 bg-slate-950/40 hover:border-lavender/35 hover:bg-lavender/5'
              }`}
              aria-label="Follow Cirque Jolie on Instagram"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender/15 text-lavender">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-white">@cirquejolie</span>
                <span className="block text-sm text-slate-400">Stilts · LED · Balloons · Face Painting</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lavender" aria-hidden="true" />
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Raining Entertainment. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="mailto:brentonkeith@magicbrent.com" className="hover:text-white">brentonkeith@magicbrent.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
