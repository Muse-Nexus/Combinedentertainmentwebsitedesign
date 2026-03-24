import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function UpcomingShowBanner() {
  return (
    <div className="bg-slate-900 py-20 relative overflow-hidden">
        {/* Simple Rain Dots Animation */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: ['0%', '100%'], opacity: [0, 1, 0] }}
                    transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                    style={{ left: `${Math.random() * 100}%` }}
                />
            ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="bg-gradient-to-r from-indigo-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-indigo-500/30 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 bg-slate-950 p-6 rounded-2xl text-center min-w-[120px] border border-slate-700">
                    <span className="block text-indigo-400 font-bold uppercase tracking-wider text-sm">Next Show</span>
                    <span className="block text-4xl font-bold text-white my-2">24</span>
                    <span className="block text-slate-400 font-medium">MARCH</span>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                    <h3 className="text-3xl font-bold text-white mb-2">Magic in the Park</h3>
                    <div className="flex flex-col md:flex-row gap-4 text-slate-300 mb-4 items-center md:items-start">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-indigo-400" />
                            <span>Saturday, 2:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-indigo-400" />
                            <span>City Center Plaza, Seattle</span>
                        </div>
                    </div>
                    <p className="text-slate-400 max-w-xl">
                        Join Magic Brent for an afternoon of wonder! Free for all ages. 
                        Rain or shine (we have a tent!).
                    </p>
                </div>

                <div className="flex-shrink-0">
                    <Link 
                        to="/upcoming-shows"
                        className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 block text-center"
                    >
                        Get Tickets
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}
