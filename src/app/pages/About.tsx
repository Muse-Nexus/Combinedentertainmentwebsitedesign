import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Heart, Star, MapPin, Users } from 'lucide-react';
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

export function About() {
  return (
    <Layout title="About Us">
      {/* HERO */}
      <section className="relative py-32 bg-gradient-to-b from-cream/10 via-slate-900 to-slate-900 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-4xl mx-auto">
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Raining Entertainment</p>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-coral via-lavender to-sage bg-clip-text text-transparent">The Duo Behind the Magic</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Husband &amp; wife team Brenton Keith and Jolie Strickland have been entertaining Maui for over two decades. Three brands. One mission: make your event unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BRENT BIO */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <img src="/media/about/brent-umbrella-beach.jpg" alt="Brenton Keith — Magic Brent on the beach" className="rounded-3xl shadow-2xl shadow-coral/10 w-full object-cover aspect-[4/5]" />
                <div className="absolute -bottom-6 -left-6 bg-coral text-white px-6 py-4 rounded-2xl shadow-xl">
                  <div className="text-3xl font-black">25+</div>
                  <div className="text-sm font-medium opacity-90">Years Performing</div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Magic Brent &amp; Gameshow Fanatics</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Brenton<span className="text-coral"> Keith</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Brenton Keith started performing magic at age 12 and became a house magician at 17. He performed at Universal Studios and The Magic Castle in Hollywood before bringing his act to Maui in the late &rsquo;90s. Today he&rsquo;s Hawaii&rsquo;s go-to comedy magician, game show host, MC, and DJ.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Voted &ldquo;Best Comedian on Maui&rdquo; in 2019, Brent runs a weekly magic show at Mulligan&rsquo;s on the Blue in Wailea &mdash; the longest-running live magic show on the island. He also created Gameshow Fanatics, a full-production game show and casino night company that handles corporate events, fundraisers, and celebrations across the islands.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium">Comedy Magic</span>
                <span className="bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium">Game Show Host</span>
                <span className="bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium">MC &amp; DJ</span>
                <span className="bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium">Casino Night</span>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* JOLIE BIO */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection delay={0.2} className="md:order-2">
              <div className="relative">
                <img src="/media/about/cirque-jolie-maui.jpg" alt="Jolie Strickland — Cirque Jolie" className="rounded-3xl shadow-2xl shadow-lavender/10 w-full object-cover aspect-[4/5]" />
                <div className="absolute -bottom-6 -right-6 bg-lavender text-white px-6 py-4 rounded-2xl shadow-xl">
                  <div className="text-3xl font-black">20+</div>
                  <div className="text-sm font-medium opacity-90">Years as Cirque Jolie</div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection className="md:order-1">
              <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">Cirque Jolie</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Jolie<span className="text-lavender"> Strickland</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                A classically trained circus performer, Jolie is Maui&rsquo;s premier stilt walker, fire dancer, and children&rsquo;s entertainer. Standing 9 feet tall on stilts and bringing any costume theme to life, she transforms events into visual spectacles.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Through Cirque Jolie, she offers kids&rsquo; entertainment packages featuring a 30-minute live magic show with a real bunny, professional face painting, and balloon twisting. She also runs the Balloons of Aloha community program, donating balloon d&eacute;cor to local non-profits and families in need.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Stilt Walking</span>
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Fire Dancing</span>
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Kids Entertainment</span>
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Balloon D&eacute;cor</span>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* THE THREE BRANDS */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Three Brands. One Team.</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Raining Entertainment brings together three specialized entertainment companies under one umbrella.</p>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Magic Brent', color: 'coral', desc: 'Comedy magic, MC & DJ services. Brent brings the laughs, the wonder, and the energy to every event.', link: '/magic' },
              { name: 'Cirque Jolie', color: 'lavender', desc: 'Stilt walking, fire dancing, kids entertainment, balloon twisting, face painting & balloon décor.', link: '/balloon-twisting' },
              { name: 'Gameshow Fanatics', color: 'sage', desc: 'Full-production game shows, casino nights, trivia, and wedding entertainment.', link: '/casino-gameshow' },
            ].map((brand, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <Link to={brand.link} className="block bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-current transition-all h-full group" style={{ color: `var(--color-${brand.color})` }}>
                  <h3 className="text-2xl font-bold mb-3">{brand.name}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{brand.desc}</p>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* MAUI INFO */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-br from-coral/10 via-slate-800/80 to-lavender/10 rounded-[2rem] p-12 md:p-16 border border-coral/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <MapPin className="w-12 h-12 text-coral mx-auto mb-6" />
                <h2 className="text-4xl font-bold mb-6">Based on Maui</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  We live, work, and play on the Valley Isle. Available for events across Maui county and neighbor islands by request. From intimate backyard luaus to 500+ guest corporate galas, we scale our entertainment to fit your event perfectly.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-gray-400">
                  <div className="flex items-center gap-2"><Users className="w-5 h-5 text-coral" /><span>Any group size</span></div>
                  <div className="flex items-center gap-2"><Star className="w-5 h-5 text-coral" /><span>500+ events performed</span></div>
                  <div className="flex items-center gap-2"><Heart className="w-5 h-5 text-coral" /><span>Family owned &amp; operated</span></div>
                </div>
              </div>
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let&rsquo;s Make Your Event Amazing</h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Whether you need one performer or a full production, we&rsquo;d love to hear what you&rsquo;re planning.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Get in Touch</Link>
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
