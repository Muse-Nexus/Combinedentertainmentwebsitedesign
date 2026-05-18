import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Palette, Sparkles, Heart, Star, Brush, Smile } from 'lucide-react';
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

export default function FacePainting() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Face Painting — Maui Kids Parties">
      {/* HERO */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/media/balloons/dragon-facepainting.jpg"
            alt="Dragon face painting on a child by Cirque Jolie on Maui"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[5%] text-coral/10 text-[12rem] select-none" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>🎨</motion.div>
          <motion.div className="absolute top-[10%] right-[8%] text-lavender/10 text-[10rem] select-none" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>✨</motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Cirque Jolie &mdash; Professional Face Painting</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-coral via-lavender to-sage bg-clip-text text-transparent">Maui Face Painting</span>
              <br /><span className="text-white/90 text-4xl md:text-5xl font-light">Dragons, Butterflies, Superheroes &amp; More</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
              Hypoallergenic, professional-grade face paints applied by Cirque Jolie &mdash; intricate full-face designs in minutes, perfect for birthday parties, school events, and resort family days across Maui.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-105">Book Face Painting</Link>
              <Link to="/balloon-twisting" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">Add Balloon Twisting</Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">What You Get</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Every Kid Walks Away a Character</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Full-face designs, half-face designs, or quick cheek art &mdash; whatever fits your event timing and crowd size. Jolie handles 15&ndash;25 kids per hour comfortably.
            </p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Palette className="w-8 h-8" />, title: 'Pro-Grade Paints', desc: 'Hypoallergenic, FDA-compliant water-based paints. Washes off easily with soap and water.' },
              { icon: <Brush className="w-8 h-8" />, title: 'Custom Designs', desc: 'Dragons, butterflies, tigers, superheroes, princesses, sports themes &mdash; or whatever the kid dreams up.' },
              { icon: <Smile className="w-8 h-8" />, title: 'Fast & Friendly', desc: 'Average 3&ndash;5 minutes per child. Jolie keeps the line moving and the kids laughing the whole time.' },
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-950 rounded-3xl p-8 h-full border border-white/5 hover:border-coral/30 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-coral/15 text-coral flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* COMBO CTA */}
      <section className="py-24 bg-gradient-to-br from-coral/15 via-slate-900 to-lavender/15">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-12 h-12 text-coral mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">Pair It With Balloons</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Most parties book Face Painting + Balloon Twisting together &mdash; one performer, one fee, twice the fun. Ask about the combo when you book.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="px-10 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full text-lg transition-all shadow-lg shadow-coral/25 hover:scale-105">
                Book Now
              </Link>
              <Link to="/balloon-twisting" className="px-10 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full text-lg transition-all hover:bg-white/5">
                See Balloon Twisting
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </Layout>
  );
}
