import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Tv, Users, Star, Mic, Zap, Trophy } from 'lucide-react';
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

export default function GameShow() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Gameshow Fanatics — Maui Interactive Game Show">
      {/* HERO */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <iframe
            src="https://player.vimeo.com/video/654838191?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&dnt=1"
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none', transform: 'scale(1.2)' }}
            allow="autoplay; fullscreen"
            title="Gameshow Fanatics promo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[5%] text-coral/10 text-[10rem] font-serif select-none" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>★</motion.div>
          <motion.div className="absolute top-[10%] right-[10%] text-burgundy/10 text-[8rem] font-serif select-none" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>🎙</motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Gameshow Fanatics &mdash; Where We Put You in the Game!</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Hawaii&rsquo;s Mobile Game Show</span>
              <br /><span className="text-white/90 text-4xl md:text-5xl font-light">A Full TV Experience, Brought to You</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
              Hawaii&rsquo;s completely unique, full-production mobile game show. We bring the complete television experience to your event — customized to your group, your guests, your moment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-105">Book Game Show Nite</Link>
              <a href="#how-it-works" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">See How It Works</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PROMO VIDEO */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-4xl mx-auto">
            <PromoVideo source={{ type: 'vimeo', videoId: '654838191' }} className="shadow-2xl shadow-coral/10" />
          </FadeInSection>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Gameshow Fanatics</p>
            <h2 className="text-4xl md:text-5xl font-bold">What Is Game Show Nite?</h2>
            <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">
              We re-created the Family Feud, and then some. A professional set with all the bells &amp; whistles — answers &ldquo;flipping&rdquo; with the DING! just like the show from the old days.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <FadeInSection>
              <img src="/media/casino-gameshow/gameshow-outdoor-fullset.jpg" alt="Full outdoor game show set at night" className="rounded-3xl shadow-2xl shadow-coral/10 w-full object-cover aspect-[4/3]" />
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <h3 className="text-3xl font-bold mb-6">The Full Game Show Experience</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our flagship game is a parody version of the old Family Feud shows. Unlike the real show, ours is personalized to your event, group, or guest of honor. Contestants from your party approach the podium to the music to face-off and ring the buzzer &mdash; it&rsquo;s hilarious!
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Game Show Nite gets people on the edges of their seats. Laughs, interaction, and fun guaranteed &mdash; it&rsquo;s Maui party entertainment that brings people together and keeps them talking for years.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Format', value: 'Family Feud parody — 4 teams of 5, 20 players total' },
                  { label: 'Custom Questions', value: 'Personalized to your group or guest of honor' },
                  { label: 'Duration', value: '60–90 min standard show' },
                  { label: 'Setup', value: 'Full podiums, lighting, sound, and host' },
                  { label: 'Audience', value: 'Works for 20 to 200+ guests' },
                ].map((detail, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-coral font-bold shrink-0 w-36">{detail.label}:</span>
                    <span className="text-gray-300">{detail.value}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>

          {/* Game Show Lite */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection delay={0.1} className="order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-4">Game Show Lite</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                For smaller events or tighter spaces, Game Show Lite brings the same energy with a more compact setup. Perfect for corporate team-building, cocktail hours, or when you want the fun without the full production footprint.
              </p>
              <ul className="space-y-3">
                {[
                  'Portable podium set — fits any venue',
                  'Same custom questions & hosting energy',
                  'Great for 10–50 guests',
                  'Combines perfectly with casino tables',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Star className="w-5 h-5 text-coral shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeInSection>
            <FadeInSection className="order-1 md:order-2">
              <img src="/media/casino-gameshow/gameshow-podium-street.jpg" alt="Game Show Lite mobile podium setup" className="rounded-3xl shadow-2xl shadow-coral/10 w-full object-cover aspect-[4/3]" />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* WHY GAMESHOW FANATICS */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl font-bold">Why Gameshow Fanatics?</h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">We&rsquo;re not just running a game — we&rsquo;re building a memory</p>
          </FadeInSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Tv className="w-8 h-8" />, title: 'Full Production', desc: 'Real podiums, buzzers, lights, music, and a professional host. This is the real deal.' },
              { icon: <Users className="w-8 h-8" />, title: 'Fully Customized', desc: 'Questions written specifically for your group, celebrant, or company culture.' },
              { icon: <Mic className="w-8 h-8" />, title: 'High-Energy Host', desc: 'Brenton Keith has 25+ years of comedy and crowd work — your guests are in great hands.' },
              { icon: <Zap className="w-8 h-8" />, title: 'Turn-Key Setup', desc: 'We bring everything — you just bring your people.' },
              { icon: <Trophy className="w-8 h-8" />, title: 'Team Building', desc: 'Perfect for corporate groups — collaborative, competitive, and laugh-out-loud fun.' },
              { icon: <Star className="w-8 h-8" />, title: 'Maui\'s Only Mobile Show', desc: 'Hawaii\'s premiere portable game show experience. There\'s nothing else like it.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-coral/30 transition-all h-full">
                  <div className="text-coral mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-4xl font-bold">What People Are Saying</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { quote: 'Brenton is a complete natural and knows how to keep the audience on their toes and entertained! Gameshow Fanatics are fantastic to work with. Brenton really cares about the success of each event and is constantly working to create the most fun and memorable experience for the guests.', name: 'Josh Desilva', role: 'Desilva Meeting Consultants' },
              { quote: 'We were absolutely blown away. Our team still talks about it. Brenton had everyone engaged, laughing, and competing from the first minute. It was the highlight of our entire corporate retreat.', name: 'Sarah M.', role: 'Corporate Event Planner' },
            ].map((t, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8">
                  <p className="text-gray-300 italic text-lg leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-white font-bold">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Photos &amp; Events</p>
            <h2 className="text-4xl font-bold mb-4">Gameshow Fanatics in Action</h2>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: '/media/486560996_1186362480158145_5148907381347692652_n.jpg', alt: 'Gameshow Fanatics full outdoor set at Maui event' },
              { src: '/media/499547445_1232949328832793_5242943925623788269_n.jpg', alt: 'Game show nite crowd interaction' },
              { src: '/media/casino-gameshow/gameshow-outdoor-fullset.jpg', alt: 'Full game show outdoor setup at night' },
              { src: '/media/488251977_1193147566146303_4577536044659466625_n.jpg', alt: 'Brenton Keith hosting game show on Maui' },
              { src: '/media/502549410_10164120360868825_1880458003759888586_n.jpg', alt: 'Game show podium action shot' },
              { src: '/media/magic/brent-jolie-stage.jpg', alt: 'Brenton and Jolie onstage together' },
            ].map((img, i) => (
              <FadeInSection key={i} delay={i * 0.07}>
                <div className="rounded-2xl overflow-hidden group aspect-[4/3]">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
              {['Corporate Team Building', 'Holiday Parties', 'Fundraiser Galas', 'Wedding Receptions', 'Birthday Celebrations', 'Resort Events', 'Anniversaries', 'Graduations', 'Rehearsal Dinners', 'Themed Nights', 'Private Parties', 'Milestone Celebrations'].map((event, i) => (
                <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all duration-300 cursor-default">{event}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-r from-coral via-burgundy to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Be the Star?</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
                  Hawaii&rsquo;s premier mobile game show — fully customized to your group. Tell us about your event and let&rsquo;s build something your guests will never stop talking about.
                </p>
                <p className="text-white/70 mb-10">Based on Maui &bull; Available on Oahu, Kauai &amp; Big Island</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Book Game Show Nite</Link>
                  <Link to="/casino-gameshow" className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">Add Casino Night Too</Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </Layout>
  );
}
