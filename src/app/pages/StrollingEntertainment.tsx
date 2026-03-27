import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Flame, Crown, Sparkles, Star, Users, Eye } from 'lucide-react';
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

export default function StrollingEntertainment() {
  return (
    <Layout title="Strolling Entertainment">
      {/* HERO */}
      <section className="relative py-32 bg-gradient-to-b from-burgundy/20 via-slate-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-12 left-[8%] text-burgundy/10 text-[12rem] select-none" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}>&#9733;</motion.div>
          <motion.div className="absolute bottom-8 right-[6%] text-coral/10 text-[9rem] select-none" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}>&#128293;</motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-4xl mx-auto">
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Cirque Jolie &amp; Magic Brent</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Strolling Entertainment</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Stilt walking captures the imagination and inspires awe from children and adults alike. It&rsquo;s breathtaking and exciting to see a 9-foot tall creature stroll into sight. Fire-dancers, stilt-walkers, jugglers, and strolling characters can add an exciting edge to your event.
            </p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-105">Book Strolling Entertainment</Link>
          </motion.div>
        </div>
      </section>

      {/* HERO IMAGE GRID */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 aspect-[16/9] rounded-2xl overflow-hidden group">
                <img src="/media/strolling/moth-stilt-costume.jpg" alt="Giant moth stilt walker costume at night event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="aspect-[9/16] md:aspect-auto rounded-2xl overflow-hidden group">
                <img src="/media/strolling/silver-white-stilt.jpg" alt="Silver and white angel stilt walker at sunset" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ENTERTAINMENT TYPES */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Our Specialties</p>
            <h2 className="text-4xl md:text-5xl font-bold">Strolling Acts</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: <Crown className="w-8 h-8" />, title: 'Stilt Walking', desc: 'Towering 9-foot characters in any costume theme — superheroes, tropical goddesses, holiday characters, elegant angels, or your custom creation. Our stilt walkers interact with guests, pose for photos, and create unforgettable visual impact.', img: '/media/strolling/superhero-stilt.jpg', imgAlt: 'Supergirl stilt walker entertaining crowd' },
              { icon: <Flame className="w-8 h-8" />, title: 'Fire Dancing', desc: 'Mesmerizing Polynesian-inspired fire performances for evening events. Fire spinning, poi, and flame manipulation that commands attention and creates dramatic moments your guests will never forget.', img: '/media/strolling/fire-dancing.jpg', imgAlt: 'Jolie performing fire dancing at night' },
              { icon: <Sparkles className="w-8 h-8" />, title: 'Strolling Magic', desc: 'Brent roams your event performing close-up magic right in guests\' hands — cards, coins, mind-reading. Perfect for cocktail hours, receptions, and corporate mixers where conversation and amazement blend seamlessly.', img: '/media/strolling/clown-stilt-rainbow.jpg', imgAlt: 'Colorful rainbow clown stilt walkers with kids' },
              { icon: <Eye className="w-8 h-8" />, title: 'Costumed Characters', desc: 'Custom character appearances for any theme — seasonal mascots, branded characters, fantasy creatures. Our performers stay in character, interact naturally with guests, and elevate the atmosphere.', img: '/media/strolling/jolie-portrait.jpg', imgAlt: 'Jolie in costume ready for event' },
            ].map((act, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-coral/20 transition-all group h-full">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img src={act.img} alt={act.imgAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <div className="text-coral mb-4">{act.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{act.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STROLLING */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-br from-coral/10 via-slate-800/80 to-burgundy/10 rounded-[2rem] p-12 md:p-16 border border-coral/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">Why Strolling Entertainment?</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {[
                    { icon: <Users className="w-8 h-8" />, title: 'Guest Interaction', desc: 'Unlike stage acts, strolling performers meet guests where they are — creating personal, intimate moments of wonder.' },
                    { icon: <Star className="w-8 h-8" />, title: 'Visual Impact', desc: '9-foot stilt walkers and fire performers are walking spectacles that elevate the entire atmosphere of your event.' },
                    { icon: <Sparkles className="w-8 h-8" />, title: 'Flexible Timing', desc: 'No stage needed, no set schedule. Strolling acts fill gaps, enhance arrivals, and keep energy high throughout your event.' },
                  ].map((reason, i) => (
                    <div key={i} className="text-center">
                      <div className="text-coral mx-auto mb-4 flex justify-center">{reason.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                      <p className="text-gray-400">{reason.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* PERFECT FOR */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-gray-400 text-lg">Anywhere you want jaws to drop</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Weddings', 'Corporate Events', 'Graduation Parties', 'Family Reunions', 'Company Holiday Parties', 'Milestone Birthdays', 'Resort Entertainment', 'Cocktail Hours', 'Festivals', 'Grand Openings', 'Luaus', 'Private Parties'].map((event, i) => (
                <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all duration-300 cursor-default">{event}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-r from-coral via-burgundy to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Make Your Event Unforgettable</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">Stilt walkers, fire dancers, strolling magicians &mdash; tell us your vision and we&rsquo;ll match the perfect performers to your event. Brenton and Jolie also run <Link to="/casino-gameshow" className="underline font-bold">Gameshow Fanatics</Link> &mdash; a highly interactive and portable game show that people will never forget!</p>
                <p className="text-white/70 mb-10">Entertainers based on the island of Maui &amp; willing to travel to outer island events</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Book Strolling Entertainment</Link>
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
