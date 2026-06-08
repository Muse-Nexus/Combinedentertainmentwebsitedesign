import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Flame, Music, Mail, Sparkles, Star, Feather } from 'lucide-react';
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

const addOns = [
  {
    icon: <Flame className="w-8 h-8" />,
    title: 'Fire & LED Performance',
    desc: 'Fire dancing for open-air events, or LED hoops, poi, and props where flame isn\u2019t permitted. A full set piece that turns heads after dark.',
  },
  {
    icon: <Music className="w-8 h-8" />,
    title: 'Guitardo',
    desc: 'Live roving guitar and song to set the mood \u2014 perfect for cocktail hours, welcomes, and intimate moments throughout your event.',
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: 'Singing Telegrams',
    desc: 'A personalized, surprise musical delivery for birthdays, anniversaries, and celebrations. Custom message, big reaction.',
  },
  {
    icon: <Feather className="w-8 h-8" />,
    title: 'Fairy & Winged Characters',
    desc: 'Costumed ambient characters \u2014 fairies, winged dancers, and dazzle performers who add wonder and photo moments to any space.',
  },
];

export default function AdditionalServices() {
  return (
    <Layout title="Additional & À La Carte Services">
      {/* HERO */}
      <section className="relative py-28 md:py-36 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[6%] text-coral/10 text-[10rem] select-none" animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}>&#10024;</motion.div>
          <motion.div className="absolute top-[12%] right-[8%] text-lavender/10 text-[8rem] select-none" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}>&#127908;</motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <FadeInSection>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Add-Ons &amp; Extras</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.95]">
              <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Additional &amp; À La Carte</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Special touches to layer onto any booking. Mix and match these add-ons with our magic, casino, game show, stilt, and balloon services to build the perfect event.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* ADD-ONS GRID */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addOns.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-coral/30 transition-all h-full">
                  <div className="text-coral mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection delay={0.2}>
            <p className="text-center text-gray-500 text-sm mt-12 max-w-2xl mx-auto">
              Availability varies by date and event. Ask us about these and other custom add-ons when you inquire &mdash; if you can dream it, we can usually source it.
            </p>
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Build Your Perfect Event</h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Tell us what you have in mind and we&rsquo;ll put together a custom package &mdash; headline entertainment plus all the extra touches.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Get a Custom Quote</Link>
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
