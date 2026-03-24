import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
             <Link to="/" className="text-2xl font-bold text-white mb-4 block">Raining Entertainment</Link>
             <p className="max-w-md">
                Combining the magic of Magic Brent and the artistry of Cirque Jolie. 
                We provide entertainment that lands, whatever the weather.
             </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/magic" className="hover:text-teal-400 transition-colors">Magic</Link></li>
              <li><Link to="/game-show" className="hover:text-red-400 transition-colors">Game Show</Link></li>
              <li><Link to="/kids-circus" className="hover:text-orange-400 transition-colors">Kids & Circus</Link></li>
              <li><Link to="/corporate" className="hover:text-blue-400 transition-colors">Corporate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
               <a href="#" className="hover:text-white transition-colors"><Instagram /></a>
               <a href="#" className="hover:text-white transition-colors"><Facebook /></a>
               <a href="/contact" className="hover:text-white transition-colors"><Mail /></a>
            </div>
            <Link to="/contact" className="text-orange-400 hover:text-orange-300 font-medium">
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
