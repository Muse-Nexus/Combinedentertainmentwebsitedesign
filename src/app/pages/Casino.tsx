import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Dice5, Trophy, Users, Star, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PromoVideo } from '../components/PromoVideo';

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

export default function Casino() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Maui Casino Night — Las Vegas Parties">
      {/* HERO */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/media/Casino-Night-92-1030x579.jpg"
            alt="Casino night with balloon decor at Maui event"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[5%] text-burgundy/10 text-[10rem] font-serif select-none" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>♠</motion.div>
          <motion.div className="absolute top-[10%] right-[10%] text-coral/10 text-[8rem] font-serif select-none" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>♦</motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-burgundy font-semibold tracking-[0.3em] uppercase text-sm mb-4">Las Vegas-Style Casino Parties Like Never Before!</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-burgundy via-coral to-lavender bg-clip-text text-transparent">Maui Casino Night</span>
              <br /><span className="text-white/90 text-4xl md:text-5xl font-light">We Don&rsquo;t Just Bring the Casino &mdash; We Bring the Show</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
              Blackjack, Poker, Craps &mdash; led by fun-loving, professional dealers. Perfect for corporate events, weddings, and private parties across Maui.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-burgundy hover:bg-burgundy/80 text-white font-bold rounded-full transition-all shadow-lg shadow-burgundy/25 hover:shadow-burgundy/40 hover:scale-105">Book Casino Night</Link>
              <a href="#tables" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">See the Tables</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PROMO VIDEO */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-4xl mx-auto">
            <PromoVideo source={{ type: 'vimeo', videoId: '654838191' }} className="shadow-2xl shadow-burgundy/10" />
          </FadeInSection>
        </div>
      </section>

      {/* THE CASINO EXPERIENCE */}
      <section id="tables" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-burgundy font-semibold tracking-widest uppercase text-sm mb-3">Las Vegas Comes to Maui</p>
            <h2 className="text-4xl md:text-5xl font-bold">The Casino Experience</h2>
            <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">
              Imagine a lively friend at your party who brings the thrill of Las Vegas to each guest. Custom tables, professional dealers, and a full entertainment atmosphere.
            </p>
          </FadeInSection>

          {/* Table Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              { src: '/media/casino-gameshow/casino-craps-table.jpg', alt: 'Craps table at casino event', title: 'Craps', desc: 'The most social game in the house — the whole table cheers together.' },
              { src: '/media/casino-gameshow/casino-blackjack.jpg', alt: 'Blackjack at Maui casino night', title: 'Blackjack', desc: 'Fast, fun, and friendly. Our dealers keep the energy high and the game moving.' },
              { src: '/media/casino-gameshow/casino-poker-table.jpg', alt: 'Poker table at casino party', title: 'Poker', desc: 'For the strategists in the room. Texas Hold\'Em style tournament play.' },
            ].map((table, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-burgundy/30 transition-all group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={table.src} alt={table.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{table.title}</h3>
                    <p className="text-gray-400">{table.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Why Us */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <img src="/media/Casino-Night-92-1030x579.jpg" alt="Casino night crew at Maui event" className="rounded-3xl shadow-2xl shadow-burgundy/10 w-full object-cover aspect-[4/3]" />
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <h3 className="text-3xl font-bold mb-6">More Than Just a Casino &mdash; We Bring the Show!</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We don&rsquo;t just set up tables and walk away. Our dealers are entertainers. Every guest starts with an equal stack of chips, making the competition fierce and exciting. Top players win amazing prizes!
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Professional sound &amp; lighting with vibrant music, dynamic lighting, and stunning decor create a thrilling casino ambiance. Whether you&rsquo;re a seasoned player or a first-timer, our casino nights guarantee non-stop excitement and memories that last a lifetime.
              </p>
              <div className="space-y-4">
                {[
                  'Custom Blackjack, Poker, and Craps tables',
                  'Fun-loving, professional dealers',
                  'Equal chips for all guests — competitive and fair',
                  'Prizes for top players',
                  'Full sound, lighting & decor setup',
                  'Works perfectly with Game Show Nite',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Dice5 className="w-5 h-5 text-burgundy shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl font-bold">Why Raining Entertainment Casino Night?</h2>
          </FadeInSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Users className="w-8 h-8" />, title: 'Professional Dealers', desc: 'Trained entertainers who know how to keep energy high and every guest involved.' },
              { icon: <Trophy className="w-8 h-8" />, title: 'Real Prizes', desc: 'Top chip holders win real prizes. It makes the competition real and the fun even better.' },
              { icon: <Zap className="w-8 h-8" />, title: 'Full Setup', desc: 'We bring the tables, chips, decor, sound, and lighting. You just bring your guests.' },
              { icon: <Star className="w-8 h-8" />, title: '25+ Years Experience', desc: 'Brenton has been entertaining Maui for over 25 years. You\'re in the best hands.' },
              { icon: <Heart className="w-8 h-8" />, title: 'All Skill Levels Welcome', desc: 'First-timers and veterans alike — our dealers guide everyone through the fun.' },
              { icon: <Dice5 className="w-8 h-8" />, title: 'Island-Wide Coverage', desc: 'Based on Maui, available across all Hawaiian islands for the right event.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-burgundy/30 transition-all h-full">
                  <div className="text-burgundy mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* PERFECT FOR */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Corporate Events', 'Wedding Receptions', 'Fundraiser Galas', 'Birthday Parties', 'Holiday Parties', 'Team Building', 'Anniversaries', 'Resort Events', 'Graduations', 'Private Parties', 'Rehearsal Dinners', 'Milestone Celebrations'].map((event, i) => (
                <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-burgundy/40 hover:text-burgundy transition-all duration-300 cursor-default">{event}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-r from-burgundy via-coral to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Raise the Stakes?</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
                  Las Vegas energy, Maui style. Let&rsquo;s build an unforgettable casino night for your event &mdash; and maybe add Game Show Nite while we&rsquo;re at it.
                </p>
                <p className="text-white/70 mb-10">Based on Maui &bull; Available on Oahu, Kauai &amp; Big Island</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-burgundy font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Get a Custom Quote</Link>
                  <Link to="/game-show" className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">Add Game Show Too</Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </Layout>
  );
}
