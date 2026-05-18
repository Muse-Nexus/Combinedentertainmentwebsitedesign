import React, { useState, useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Calendar, MapPin, Ticket, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

type EventType = 'Public' | 'Ticketed' | 'Private';

interface ShowEvent {
  id: number;
  title: string;
  performer: string;
  date: string;
  time: string;
  doors?: string;
  location: string;
  locationLink?: string;
  type: EventType;
  price?: string;
  description: string;
  bookingLink?: string;
  image: string;
  tag?: string;
}

const events: ShowEvent[] = [
  {
    id: 1,
    title: "The Mulligan's Magic Show",
    performer: "Brenton Keith & His Bag O' Tricks",
    date: "Thu, May 7",
    time: "6:30 PM",
    doors: "Close-up tableside magic starts ~5:30 PM",
    location: "Mulligans on the Blue, Maui",
    locationLink: "https://www.mulligansontheblue.com",
    type: "Ticketed",
    price: "Only $10! Kids under 5 free",
    description: "Brenton Keith's signature high-energy comedy magic show — live goldfish, fire, and your friends onstage. Reserve your table at Mulligans on the Blue.",
    bookingLink: "https://www.mulligansontheblue.com",
    image: "/media/magic/brent-library-show.jpg",
    tag: "Recurring Show"
  },
];

const filterOptions: { label: string; value: EventType | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Public', value: 'Public' },
  { label: 'Ticketed', value: 'Ticketed' },
];

const typeColors: Record<EventType, string> = {
  Public: 'text-sage bg-sage/10 border-sage/30',
  Ticketed: 'text-coral bg-coral/10 border-coral/30',
  Private: 'text-lavender bg-lavender/10 border-lavender/30',
};

export function UpcomingShows() {
  const [filter, setFilter] = useState<EventType | 'All'>('All');

  const filtered = filter === 'All' ? events : events.filter(e => e.type === filter);

  return (
    <Layout title="Upcoming Shows — Brenton Keith & His Bag O' Tricks">
      {/* HERO HEADER */}
      <div className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-10 left-[5%] text-coral/5 text-[15rem] font-serif select-none leading-none" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}>★</motion.div>
          <motion.div className="absolute top-5 right-[8%] text-lavender/5 text-[12rem] font-serif select-none leading-none" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>✦</motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Live on Maui</p>
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Upcoming Shows
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-8">
              Catch Brenton Keith &amp; His Bag O&rsquo; Tricks live — high-energy comedy magic with fire, live goldfish, and your friends onstage. Always a good time.
            </p>

            {/* Filter bar */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 uppercase text-xs font-bold tracking-wider">Forecast</span>
                <span className="text-yellow-400 font-bold">☀️ 100% Fun</span>
              </div>
              <div className="flex gap-2">
                {filterOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                      filter === opt.value
                        ? 'bg-coral text-white border-coral'
                        : 'bg-slate-800/80 border-slate-700/50 text-gray-300 hover:border-coral/40 hover:text-coral'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SHOWS LIST */}
      <section className="py-16 bg-slate-900 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              <p className="text-2xl mb-4">No {filter} shows coming up right now.</p>
              <p>Check back soon — Brenton performs regularly across Maui.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filtered.map((event, i) => (
                <FadeInSection key={event.id} delay={i * 0.1}>
                  <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-coral/30 transition-all group flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow p-6 md:p-8 flex flex-col md:flex-row gap-6">
                      <div className="flex-grow">
                        {/* Tag + type */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {event.tag && (
                            <span className="text-xs font-bold uppercase tracking-wider text-coral bg-coral/10 border border-coral/30 px-3 py-1 rounded-full">{event.tag}</span>
                          )}
                          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${typeColors[event.type]}`}>{event.type}</span>
                        </div>

                        <h3 className="text-2xl font-black mb-1">{event.title}</h3>
                        <p className="text-coral font-semibold mb-3">{event.performer}</p>

                        {/* Meta */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-coral shrink-0" />
                            <span className="font-medium">{event.date}</span>
                            <span className="text-gray-500">·</span>
                            <Clock className="w-4 h-4 text-coral shrink-0" />
                            <span>{event.time}</span>
                          </div>
                          {event.doors && (
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <span className="w-4 h-4 shrink-0" />
                              <span>{event.doors}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-4 h-4 text-coral shrink-0" />
                            {event.locationLink ? (
                              <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors flex items-center gap-1">
                                {event.location} <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span>{event.location}</span>
                            )}
                          </div>
                          {event.price && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <Ticket className="w-4 h-4 text-coral shrink-0" />
                              <span className="font-medium text-white">{event.price}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-400 leading-relaxed">{event.description}</p>
                      </div>

                      {/* CTA */}
                      <div className="flex-shrink-0 flex flex-row md:flex-col gap-3 items-start md:items-end justify-start md:justify-center">
                        {event.type !== 'Private' && event.bookingLink && (
                          <a
                            href={event.bookingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all hover:scale-105 whitespace-nowrap"
                          >
                            <Ticket className="w-4 h-4" />
                            Reserve a Table
                          </a>
                        )}
                        {event.type === 'Private' && (
                          <span className="text-gray-500 italic text-sm px-2">Private Event</span>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          )}

          {/* Private events note */}
          <FadeInSection className="mt-12 text-center">
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-gray-400 text-lg mb-4">
                Most of Brenton&rsquo;s shows are private events &mdash; corporate parties, weddings, birthday luaus, and more.
              </p>
              <p className="text-gray-500 mb-6">Want your own show? Let&rsquo;s talk.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all hover:scale-105">
                Book a Private Show
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-r from-coral via-burgundy to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Book Brenton for Your Event</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
                  Magic shows, game shows, casino nights, corporate events, birthday luaus &mdash; Brenton Keith &amp; His Bag O&rsquo; Tricks has been astonishing Maui for over 25 years.
                </p>
                <p className="text-white/70 mb-10">Based on Maui &bull; brentonkeith@magicbrent.com &bull; (808) 870-2102</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Book Your Show</Link>
                  <a href="tel:8088702102" className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">(808) 870-2102</a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </Layout>
  );
}
