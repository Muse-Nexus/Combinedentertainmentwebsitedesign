import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Building2, Moon, Sparkles, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GalleryLightbox } from '../components/GalleryLightbox';

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

const GALLERY_IMAGES = [
  { src: '/media/client-selected/led-performers/01-led-hoop-aerial.webp', alt: 'LED hoop aerial performer glowing at a Maui event' },
  { src: '/media/client-selected/led-performers/02-led-poi-spinner.webp', alt: 'LED poi spinner performing with glowing light trails' },
  { src: '/media/client-selected/led-performers/03-ballroom-wings-formation-a.webp', alt: 'LED wing performers in formation at an indoor ballroom event' },
  { src: '/media/client-selected/led-performers/04-ballroom-wings-formation-b.webp', alt: 'LED wing performers glowing in an indoor ballroom formation' },
  { src: '/media/client-selected/led-performers/05-golden-wings-troupe.webp', alt: 'Troupe of LED wing performers glowing gold against a dusk sky' },
];

const EVENT_FIT = [
  {
    icon: <Moon className="w-8 h-8" />,
    title: 'Best at Dusk & After Dark',
    desc: 'LED wings, hoops, and poi read most dramatically once the sun goes down — ideal for evening receptions, cocktail hours, and nightlife-style events.',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Indoor or Outdoor',
    desc: 'Glowing costumes work beautifully on an open-air lawn or lanai and inside a dimmed ballroom — ask us about staging for indoor corporate events.',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'A Full Set Piece',
    desc: 'LED wings, hoops, and poi turn heads after dark — a striking alternative for venues where open flame isn’t permitted.',
  },
];

const PERFECT_FOR = ['Evening Receptions', 'Nightlife Events', 'Resort Entertainment', 'Corporate Galas', 'Wedding Receptions', 'Large-Scale Celebrations', 'Grand Openings', 'Holiday Parties'];

export default function LEDPerformers() {
  return (
    <Layout title="LED Performers">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender/20 via-slate-900 to-slate-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,107,74,0.14),transparent_42%)]" />
        <div className="container relative z-10 mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-lavender">Cirque Jolie &mdash; After-Dark Entertainment</p>
            <h1 className="mb-6 text-5xl font-black leading-[0.92] text-white md:text-7xl">
              LED <span className="text-lavender">Performers</span>
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-slate-300">
              Glowing LED wing performers, hoops, and poi light up the night — a full ambient set piece for evening receptions, nightlife, and large-scale celebrations across Maui.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact?service=led-performers"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lavender px-7 py-3.5 font-bold text-slate-950 transition hover:bg-lavender/80"
              >
                Book LED Performers
              </Link>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                See the Gallery
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-lavender/30 to-coral/20 blur-2xl" />
            <img
              src="/media/client-selected/led-performers/hero-golden-wings-dusk.webp"
              alt="Six Cirque Jolie performers in glowing golden LED wing costumes at dusk with palm trees behind them"
              className="relative aspect-[4/5] w-full rounded-[2rem] border border-white/10 object-cover object-bottom shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">In Action</p>
            <h2 className="text-4xl md:text-5xl font-bold">LED Performers Gallery</h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <GalleryLightbox
              images={GALLERY_IMAGES}
              className="grid grid-cols-2 gap-4 md:grid-cols-3"
              itemClassName="aspect-[4/3] overflow-hidden rounded-2xl"
              eagerCount={1}
            />
          </FadeInSection>
        </div>
      </section>

      {/* EVENT FIT */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">Event Fit</p>
            <h2 className="text-4xl md:text-5xl font-bold">When LED Performers Shine</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {EVENT_FIT.map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.1}>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 h-full">
                  <div className="text-lavender mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
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
          <FadeInSection delay={0.15}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {PERFECT_FOR.map((event, i) => (
                <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-lavender/40 hover:text-lavender transition-all duration-300 cursor-default">{event}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-r from-lavender via-burgundy to-coral rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <Sun className="w-10 h-10 text-white mx-auto mb-6" aria-hidden="true" />
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Light Up Your Event</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">Tell us your venue, guest count, and timing — we&rsquo;ll help you plan the perfect LED moment for your event.</p>
                <p className="text-white/70 mb-10">Entertainers based on the island of Maui &amp; willing to travel to outer island events</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact?service=led-performers" className="px-10 py-4 bg-white text-lavender font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Book LED Performers</Link>
                  <a href="tel:+18088702102" className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all">Brenton · (808) 870-2102</a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </Layout>
  );
}
