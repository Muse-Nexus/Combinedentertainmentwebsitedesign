import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Star, Phone, Mail, CheckCircle } from 'lucide-react';
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

interface PricingItem {
  name: string;
  price: string;
  note?: string;
}

interface PricingCategory {
  title: string;
  performer: string;
  accentColor: string;
  borderColor: string;
  items: PricingItem[];
}

const pricingData: PricingCategory[] = [
  {
    title: "Brenton Keith & His Bag O' Tricks",
    performer: "Magic · Game Show · Casino Night",
    accentColor: "text-coral",
    borderColor: "border-coral/30",
    items: [
      { name: "Live Magic Show (30 min)", price: "Call for pricing" },
      { name: "Live Magic Show (60 min)", price: "Call for pricing" },
      { name: "Game Show Nite — Full Production", price: "Call for pricing", note: "4 teams, 20 players, full podium set + host" },
      { name: "Game Show Lite", price: "Call for pricing", note: "Compact setup, great for smaller events" },
      { name: "Casino Night (per table)", price: "Call for pricing", note: "Blackjack, Poker, or Craps" },
      { name: "Casino Night Package (3 tables)", price: "Call for pricing", note: "Includes dealers, chips, sound & lighting" },
      { name: "Magic + Casino Combo", price: "Call for pricing", note: "Bundle discount available" },
      { name: "Magic + Game Show Combo", price: "Call for pricing", note: "Bundle discount available" },
      { name: "Full Night Package (Magic + Game Show + Casino)", price: "Best Value — Call Us", note: "The ultimate Raining Entertainment experience" },
    ],
  },
  {
    title: "Cirque Jolie",
    performer: "Balloon Twisting · Face Painting · Strolling",
    accentColor: "text-lavender",
    borderColor: "border-lavender/30",
    items: [
      { name: "Balloon Twisting (1 hour)", price: "Call for pricing" },
      { name: "Balloon Twisting (2 hours)", price: "Call for pricing" },
      { name: "Face Painting (1 hour)", price: "Call for pricing" },
      { name: "Face Painting (2 hours)", price: "Call for pricing" },
      { name: "Balloon Twisting + Face Painting Combo", price: "Call for pricing", note: "Most popular kids party package" },
      { name: "Children's Magic Show (30 min)", price: "Call for pricing", note: "Interactive show with live bunny" },
      { name: "Strolling Entertainment (1 hour)", price: "Call for pricing" },
      { name: "Stilt Walking (1 hour)", price: "Call for pricing" },
      { name: "Fire Dancing", price: "Call for pricing", note: "Outdoor events only" },
      { name: "Game Show Prize Girl", price: "Add-on with Game Show booking" },
    ],
  },
  {
    title: "Balloon Décor by Jolie",
    performer: "Arches · Columns · Custom Installations",
    accentColor: "text-sage",
    borderColor: "border-sage/30",
    items: [
      { name: "Balloon Arch — Small", price: "Call for pricing" },
      { name: "Balloon Arch — Large / Full Entry", price: "Call for pricing" },
      { name: "Balloon Column (per column)", price: "Call for pricing" },
      { name: "Custom Balloon Sculpture", price: "Call for pricing", note: "Quoted by design complexity" },
      { name: "Themed Party Package", price: "Call for pricing", note: "Full décor setup for parties & events" },
    ],
  },
];

export default function Pricing() {
  return (
    <Layout title="Pricing — Raining Entertainment">
      {/* HERO */}
      <div className="relative pt-32 pb-20 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-10 left-[5%] text-coral/5 text-[15rem] font-serif select-none leading-none" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}>$</motion.div>
          <motion.div className="absolute top-5 right-[8%] text-lavender/5 text-[12rem] font-serif select-none leading-none" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>★</motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Raining Entertainment</p>
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">À La Carte Pricing</h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-4">
              Every event is different. Mix and match from our services to build the perfect entertainment package for your party, corporate event, or celebration.
            </p>
            <p className="text-gray-500">Most pricing is by quote — every event has its own magic. Contact us and we&rsquo;ll build something perfect together.</p>
          </motion.div>
        </div>
      </div>

      {/* PRICING TABLES */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 space-y-16">
          {pricingData.map((category, ci) => (
            <FadeInSection key={ci} delay={ci * 0.1}>
              <div className={`bg-slate-800/40 border ${category.borderColor} rounded-3xl overflow-hidden`}>
                {/* Category Header */}
                <div className="p-8 border-b border-slate-700/50">
                  <h2 className={`text-3xl font-black mb-1 ${category.accentColor}`}>{category.title}</h2>
                  <p className="text-gray-400">{category.performer}</p>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-700/30">
                  {category.items.map((item, ii) => (
                    <div key={ii} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-8 py-5 hover:bg-slate-700/20 transition-colors group">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`w-4 h-4 shrink-0 ${category.accentColor} opacity-60`} />
                          <span className="text-white font-medium">{item.name}</span>
                        </div>
                        {item.note && (
                          <p className="text-gray-500 text-sm mt-1 ml-6">{item.note}</p>
                        )}
                      </div>
                      <div className={`text-right font-bold shrink-0 ml-4 ${item.price.includes('Call') || item.price.includes('Add-on') ? 'text-gray-400 italic font-normal' : category.accentColor}`}>
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* COMBOS NOTE */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="max-w-3xl mx-auto bg-slate-800/50 border border-coral/20 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <Star className="w-8 h-8 text-coral shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Bundle &amp; Save</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Booking multiple services together always unlocks a discount. The more you bundle, the better the deal — and the more unforgettable the night.
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li>✦ Magic + Casino Night — always better together</li>
                    <li>✦ Magic + Game Show Nite — the crowd goes wild</li>
                    <li>✦ Kids magic + balloon twisting + face painting — the full Cirque Jolie experience</li>
                    <li>✦ Full Night: Magic + Game Show + Casino — the ultimate Raining Entertainment evening</li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CONTACT / GET A QUOTE */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-r from-coral via-burgundy to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let&rsquo;s Build Your Night</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Tell us about your event — the size, the vibe, the date — and we&rsquo;ll put together a custom quote that fits your vision and your budget.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Get a Custom Quote</Link>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80">
                  <a href="tel:8088702102" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" /> (808) 870-2102
                  </a>
                  <span className="hidden sm:inline text-white/30">|</span>
                  <a href="mailto:brentonkeith@magicbrent.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" /> brentonkeith@magicbrent.com
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </Layout>
  );
}
