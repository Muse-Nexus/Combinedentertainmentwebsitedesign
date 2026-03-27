import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
             <Link to="/" className="inline-block mb-4">
               <img src="/media/logos/White Primary Logo Raining Entertainment.png" alt="Raining Entertainment" className="h-20 w-auto" />
             </Link>
             <p className="max-w-md">
                Maui's premier entertainment company — combining the magic of Magic Brent, 
                the artistry of Cirque Jolie, and the excitement of Gameshow Fanatics.
             </p>
             <p className="text-sm mt-3 text-slate-500">
                Based in Maui, Hawaiʻi &middot; Available for travel
             </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/balloon-twisting" className="hover:text-burgundy transition-colors">Balloon Twisting & Facepainting</Link></li>
              <li><Link to="/balloon-decor" className="hover:text-coral transition-colors">Balloon Decor</Link></li>
              <li><Link to="/strolling" className="hover:text-cream transition-colors">Strolling Entertainment</Link></li>
              <li><Link to="/magic" className="hover:text-sage transition-colors">Magic</Link></li>
              <li><Link to="/casino-gameshow" className="hover:text-lavender transition-colors">Casino & Gameshow</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/upcoming-shows" className="hover:text-white transition-colors">Upcoming Shows</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-4">
               <a href="https://www.instagram.com/magicbrent/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram /></a>
               <a href="https://www.facebook.com/MagicBrent/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook /></a>
               <a href="https://www.youtube.com/@magicbrent" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube"><Youtube /></a>
               <a href="mailto:info@rainingentertainment.com" className="hover:text-white transition-colors" aria-label="Email"><Mail /></a>
            </div>
            <Link to="/contact" className="text-coral hover:text-coral/80 font-medium">
                Book an Event &rarr;
            </Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Raining Entertainment. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}