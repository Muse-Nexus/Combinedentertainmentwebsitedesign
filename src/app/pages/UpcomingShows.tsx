import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Calendar, MapPin, Ticket, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

type EventFilter = 'All' | 'Public' | 'Ticketed' | 'Private';

const events = [
  {
    id: 1,
    title: "Magic Brent Weekly Show",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Mulligan's on the Blue, Wailea",
    type: "Ticketed" as EventFilter,
    description: "Hawaii's longest-running live magic show. Comedy, illusions, and audience participation — every week at Mulligan's.",
    image: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&q=80&w=800",
    ticketUrl: "https://www.mulligansontheblue.com",
    badge: "🔥 Weekly",
  },
  {
    id: 2,
    title: "Magic Brent Weekly Show",
    date: "Every Friday",
    time: "7:00 PM",
    location: "Mulligan's on the Blue, Wailea",
    type: "Ticketed" as EventFilter,
    description: "Friday night magic in Wailea. Grab dinner, grab a drink, and prepare to be amazed.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    ticketUrl: "https://www.mulligansontheblue.com",
    badge: "🔥 Weekly",
  },
  {
    id: 3,
    title: "Corporate Casino Night",
    date: "By Booking",
    time: "Custom",
    location: "Your Venue, Maui",
    type: "Private" as EventFilter,
    description: "Full-production casino nights for corporate events and fundraisers. Poker, blackjack, roulette — and a game show host to tie it all together.",
    image: "https://images.unsplash.com/photo-1601637081638-d4c14e43ab40?auto=format&fit=crop&q=80&w=800",
    ticketUrl: null,
    badge: "🎰 Corporate",
  },
  {
    id: 4,
    title: "Kids Circus & Balloon Party",
    date: "By Booking",
    time: "Custom",
    location: "Your Venue, Maui",
    type: "Private" as EventFilter,
    description: "Balloon twisting, face painting, strolling circus acts — Cirque Jolie brings the big top to your backyard.",
    image: "https://images.unsplash.com/photo-1533227297464-9429cae36b1d?auto=format&fit=crop&q=80&w=800",
    ticketUrl: null,
    badge: "🎪 Kids",
  },
  {
    id: 5,
    title: "Strolling Entertainment",
    date: "By Booking",
    time: "Custom",
    location: "Hotels, Resorts & Events, Maui",
    type: "Private" as EventFilter,
    description: "Ambient strolling performers that weave through your crowd — jugglers, aerialists, fire performers, living statues.",
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80&w=800",
    ticketUrl: null,
    badge: "✨ Ambient",
  },
];

export function UpcomingShows() {
  const [filter, setFilter] = useState<EventFilter>('All');

  const filtered = filter === 'All' ? events : events.filter(e => e.type === filter);

  return (
    <Layout title="Upcoming Shows">
      <div className="bg-slate-900 min-h-screen py-24 text-white">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-700 pb-8">
            <div>
              <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-2">Live on Maui</p>
              <h1 className="text-5xl font-bold mb-3">Upcoming Shows</h1>
              <p className="text-slate-400 text-xl">Catch us live — or book us for your own event.</p>
            </div>

            {/* Forecast Bar */}
            <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl mt-6 md:mt-0">
              <span className="text-slate-400 uppercase text-xs font-bold tracking-wider">Forecast</span>
              <div className="flex items-center gap-2 text-yellow-400 font-bold">
                <span>☀️ 100% Fun</span>
              </div>
              <div className="h-4 w-px bg-slate-600" />
              <div className="flex gap-2">
                {(['All', 'Public', 'Ticketed', 'Private'] as EventFilter[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      filter === f
                        ? 'bg-coral text-white font-bold'
                        : 'bg-transparent hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Event List */}
          <div className="grid gap-6">
            {filtered.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-slate-700/50 hover:border-coral/30 transition-colors"
              >
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-lg">
                    {event.badge}
                  </span>
                </div>

                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <span className="text-coral font-bold">{event.date}</span>
                    <span className="hidden md:inline text-slate-600">•</span>
                    <span className="text-slate-400">{event.time}</span>
                    {event.type === 'Private' && (
                      <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded uppercase tracking-wider">Private / By Booking</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mb-3">
                    <MapPin size={14} />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{event.description}</p>
                </div>

                <div className="flex-shrink-0 flex flex-col gap-3">
                  {event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral/90 rounded-full font-bold transition-colors text-white"
                    >
                      <Ticket size={16} />
                      Get Tickets
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-coral hover:text-white rounded-full font-bold transition-colors text-slate-300"
                    >
                      <Calendar size={16} />
                      Book This
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-br from-coral/10 to-lavender/10 rounded-3xl p-12 border border-coral/20"
          >
            <h2 className="text-3xl font-bold mb-4">Want Us at Your Event?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">Every event is custom-built. Tell us your vision and we'll build the entertainment around it.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-coral hover:bg-coral/90 text-white font-bold rounded-full text-lg transition-colors shadow-lg hover:shadow-coral/30"
            >
              Plan My Event
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
