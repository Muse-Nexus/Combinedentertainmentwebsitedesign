import { Layout } from '../components/Layout';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { motion } from 'motion/react';

const events = [
  {
    id: 1,
    title: "Magic in the Park",
    date: "Mar 24",
    time: "2:00 PM",
    location: "City Center Plaza, Seattle",
    type: "Public",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Comedy Night at The Pierce",
    date: "Apr 02",
    time: "8:00 PM",
    location: "The Pierce Comedy Club",
    type: "Ticketed",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Kids Spring Festival",
    date: "Apr 15",
    time: "10:00 AM",
    location: "Bellevue Botanical Garden",
    type: "Public",
    image: "https://images.unsplash.com/photo-1533227297464-9429cae36b1d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Mystic Gala (Private)",
    date: "Apr 22",
    time: "6:00 PM",
    location: "Grand Hyatt",
    type: "Private",
    image: "https://images.unsplash.com/photo-1561489404-4348750095e0?auto=format&fit=crop&q=80&w=800"
  }
];

export function UpcomingShows() {
  return (
    <Layout>
      <div className="bg-slate-900 min-h-screen py-24 text-white">
        <div className="container mx-auto px-4">
          
          {/* Header & Forecast Bar */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-700 pb-8">
            <div>
                <h1 className="text-5xl font-bold mb-4">Upcoming Shows</h1>
                <p className="text-slate-400 text-xl">Catch us live at an event near you.</p>
            </div>
            
            {/* Forecast Bar Concept */}
            <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl mt-6 md:mt-0">
                <span className="text-slate-400 uppercase text-xs font-bold tracking-wider">Forecast</span>
                <div className="flex items-center gap-2 text-yellow-400 font-bold">
                    <span>☀️ 100% Fun</span>
                </div>
                <div className="h-4 w-px bg-slate-600" />
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors">All</button>
                    <button className="px-3 py-1 bg-transparent hover:bg-slate-700 rounded text-sm transition-colors text-slate-300">Public</button>
                    <button className="px-3 py-1 bg-transparent hover:bg-slate-700 rounded text-sm transition-colors text-slate-300">Ticketed</button>
                </div>
            </div>
          </div>

          {/* Event List */}
          <div className="grid gap-6">
             {events.map((event, i) => (
                <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 hover:bg-slate-750 transition-colors border border-slate-700/50 hover:border-indigo-500/50"
                >
                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                            <span className="text-indigo-400 font-bold">{event.date}</span>
                            <span className="hidden md:inline text-slate-600">•</span>
                            <span className="text-slate-400">{event.time}</span>
                            {event.type === "Private" && (
                                <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded uppercase tracking-wider">Private Event</span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        {event.type === "Private" ? (
                            <span className="text-slate-500 italic px-6">Sold Out</span>
                        ) : (
                            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold transition-colors">
                                <Ticket size={18} />
                                Get Tickets
                            </button>
                        )}
                    </div>
                </motion.div>
             ))}
          </div>

        </div>
      </div>
    </Layout>
  );
}
