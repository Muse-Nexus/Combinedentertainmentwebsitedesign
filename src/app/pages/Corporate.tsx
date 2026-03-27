import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Building2, Dice5, Tv, Music, Sparkles, Users, Star, CheckCircle, Quote } from 'lucide-react';
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

const services = [
  {
    icon: Dice5,
    title: 'Casino Night',
    description: 'Full Vegas-style casino experience with professional dealers, real tables, and custom funny money. Blackjack, craps, roulette & poker.',
    image: '/media/Casino-Night-48-1030x579.jpg',
    link: '/casino-gameshow',
  },
  {
    icon: Tv,
    title: 'Game Show',
    description: 'Live Family Feud–style game show with custom podiums, professional sound & lights. Perfect for team building and friendly competition.',
    image: '/media/casino-gameshow/gameshow-outdoor-fullset.jpg',
    link: '/casino-gameshow',
  },
  {
    icon: Music,
    title: 'DJ & MC Services',
    description: 'Professional DJ and MC to keep your event flowing — from cocktail hour through the final dance. Custom playlists and seamless transitions.',
    image: '/media/casino-gameshow/gameshow-podium-street.jpg',
    link: '/casino-gameshow',
  },
  {
    icon: Sparkles,
    title: 'Strolling Entertainment',
    description: 'Stilt walkers, fire dancers, close-up magic, and balloon artistry. Eye-catching performers who mingle with your guests.',
    image: '/media/strolling/moth-stilt-costume.jpg',
    link: '/strolling',
  },
];

const perfectFor = [
  'Company Parties', 'Product Launches', 'Holiday Celebrations', 'Team Building',
  'Award Galas', 'Grand Openings', 'Fundraisers', 'Conferences',
  'Appreciation Events', 'Resort Entertainment', 'Trade Shows', 'Retreats',
];

export default function Corporate() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Corporate Events">
      {/* HERO — group shot background */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/media/Casino-Night-92-1030x579.jpg"
            alt="Raining Entertainment corporate event team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[5%] text-coral/10 text-[10rem] font-serif select-none" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>&#9733;</motion.div>
          <motion.div className="absolute top-[10%] right-[10%] text-burgundy/10 text-[8rem] font-serif select-none" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>&#9830;</motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Raining Entertainment</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Maui Corporate Entertainment</span>
              <br /><span className="text-white/90 text-4xl md:text-5xl font-light">Event Entertainment That Delivers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
              From casino nights to live game shows, strolling performers to full DJ production &mdash; we make your corporate event the one everyone talks about.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-105">Get a Quote</Link>
              <a href="#services" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">Our Services</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WHY RAINING ENTERTAINMENT */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <img src="/media/cirque-jolie-gameshow-fanatics-1.jpg" alt="Brent & Jolie hosting a live event" className="rounded-3xl shadow-2xl shadow-coral/10 w-full object-cover aspect-[4/3]" />
                <div className="absolute -bottom-4 -right-4 bg-coral text-white px-6 py-3 rounded-2xl font-bold text-lg shadow-lg">
                  <Building2 className="inline w-5 h-5 mr-2 -mt-1" />Full-Service
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">One Team.<br />Every Detail.</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Most corporate planners hire separate vendors for entertainment, music, and production. With Raining Entertainment, you get it all under one roof. Brenton Keith and Jolie Strickland bring a full roster of services &mdash; from game shows and casino nights to stilt walkers and DJ sets &mdash; so your event runs seamlessly.
              </p>
              <div className="space-y-3">
                {['Single point of contact for all entertainment', 'Scalable packages for 20 to 2,000+ guests', 'Professional production with sound, lights & staging', 'Maui-based with deep local venue knowledge'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-coral mt-0.5 shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-bold">Entertainment Services</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <FadeInSection key={service.title} delay={i * 0.1}>
                <Link to={service.link} className="group block">
                  <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-coral/30 transition-all duration-300 hover:shadow-xl hover:shadow-coral/5">
                    <div className="relative h-56 overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      <div className="absolute bottom-4 left-4 bg-coral/90 p-3 rounded-xl">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-coral transition-colors">{service.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH SPOTLIGHT — How It Works */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">The Process</p>
            <h2 className="text-4xl md:text-5xl font-bold">Effortless From Start to Finish</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Discovery Call', desc: 'Tell us about your event, audience, and goals. We\'ll recommend the perfect entertainment mix.' },
              { step: '02', title: 'Custom Proposal', desc: 'Receive a tailored package with pricing, timeline, and production details — no surprises.' },
              { step: '03', title: 'Show Time', desc: 'We handle setup, production, and execution. You enjoy the event with your guests.' },
            ].map((item, i) => (
              <FadeInSection key={item.step} delay={i * 0.15}>
                <div className="text-center">
                  <div className="text-6xl font-black text-coral/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">In Action</p>
            <h2 className="text-4xl md:text-5xl font-bold">Maui Corporate Events Gallery</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: '/media/Casino-Night-32-1030x579.jpg', label: 'Casino Night' },
              { src: '/media/515925879_10164201867303825_1352723102744150605_n.jpg', label: 'Corporate Game Show' },
              { src: '/media/strolling/fire-dancing.jpg', label: 'Fire Dancing' },
              { src: '/media/598419647_1413764607417930_4065430168744957782_n.jpg', label: 'Casino Team' },
              { src: '/media/472753445_1039860624823457_3993024156608406927_n.jpg', label: 'Stilt & Magic Duo' },
              { src: '/media/503698188_1245363894258003_1463121886193686301_n.jpg', label: 'Resort Game Show Setup' },
            ].map((img, i) => (
              <FadeInSection key={img.label} delay={i * 0.08}>
                <div className="relative group rounded-2xl overflow-hidden aspect-[4/3]">
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.label}</div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Client Feedback</p>
            <h2 className="text-4xl md:text-5xl font-bold">What Event Organizers Say</h2>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { quote: 'Brenton is a complete natural and knows how to keep the audience on their toes and entertained! Gameshow Fanatics are fantastic to work with. Brenton really cares about the success of each event and is constantly working to create the most fun and memorable experience for the guests.', name: 'Josh Desilva', role: 'Desilva Meeting Consultants' },
              { quote: "As an event organizer, I LOVED IT \u2013 we didn\u2019t have to do anything in preparation! It was a FRESH & FUN CHANGE for a team-building social event.", name: 'Jennifer Rappenecker', role: 'Regional Leader, Edward Jones' },
              { quote: "I'm not sure who had a better time, the people playing or the people watching!", name: 'Matt Lane', role: 'Outreach Coordinator, Community Work Day Program' },
              { quote: 'Absolutely hilarious!', name: 'Bryant Neal', role: 'Executive Director, Arts & Education for Children Group' },
            ].map((testimonial, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-coral/30 mb-4 shrink-0" />
                  <p className="text-gray-300 leading-relaxed italic mb-6 flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* PERFECT FOR */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Ideal For</p>
            <h2 className="text-4xl md:text-5xl font-bold">Perfect for Any Corporate Occasion</h2>
          </FadeInSection>

          <FadeInSection className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {perfectFor.map((tag) => (
              <span key={tag} className="px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-full text-gray-300 font-medium hover:border-coral/40 hover:text-coral transition-colors">
                {tag}
              </span>
            ))}
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center max-w-2xl mx-auto">
            <Star className="w-10 h-10 text-coral mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Let&rsquo;s Make It Happen</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Whether you&rsquo;re planning a 50-person team dinner or a 2,000-guest gala, we&rsquo;ll build the perfect entertainment package for your event.
            </p>
            <Link to="/contact" className="inline-block px-10 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-105 text-lg">
              Request a Quote
            </Link>
          </FadeInSection>
        </div>
      </section>
    </Layout>
  );
}
