import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';

// ─── VARIANT SWITCHER ──────────────────────────────────────────────────────────
// To try a different layout, change ACTIVE_VARIANT below:
//   'float-center'   → girl fixed centered over whole page (current)
//   'hero-bg'        → girl as hero section background (v1 rollback)
const ACTIVE_VARIANT: 'float-center' | 'hero-bg' = 'float-center';
// ──────────────────────────────────────────────────────────────────────────────

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

// ── Floating girl — fixed, centered, full viewport, alpha video on top of everything ──
function FloatingGirl() {
  if (ACTIVE_VARIANT !== 'float-center') return null;
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
      aria-hidden="true"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controls={false}
        className="absolute left-1/2 top-1/2 h-[92vh] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80"
        style={{ mixBlendMode: 'lighten', backgroundColor: 'transparent' }}
      >
        <source src="/media/video/girl-moving-balloons-source.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default function StrollingEntertainment() {
  return (
    <>
      <FloatingGirl />
      <Layout title="Strolling Entertainment">

        {/* HERO — no video here in float-center variant */}
        <section className="relative py-32 bg-slate-900 overflow-hidden">
          {/* v1 rollback: hero-bg variant still works if you flip ACTIVE_VARIANT above */}
          {ACTIVE_VARIANT === 'hero-bg' && (
            <>
              <video autoPlay loop muted playsInline disablePictureInPicture className="absolute inset-0 w-full h-full object-cover pointer-events-none" style={{ opacity: 0.55 }}>
                <source src="/media/video/girl-moving-balloons-clean.webm" type="video/webm" />
                <source src="/media/video/girl-moving-balloons-source.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/30 to-slate-900/80 pointer-events-none" />
            </>
          )}
          <div className="container mx-auto px-4 relative z-20">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-4xl mx-auto">
              <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Cirque Jolie &amp; Magic Brent</p>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
                <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Maui Strolling Entertainment</span>
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
              <h2 className="text-4xl md:text-5xl font-bold">Maui Stilt Walkers, Fire Dancers &amp; More</h2>
            </FadeInSection>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { src: '/media/clown-stilt-walkers.jpg', alt: 'Clown stilt walkers at Maui kids party entertainment' },
                { src: '/media/cirque-jolie-2.jpg', alt: 'Cirque Jolie Maui strolling entertainer face painting and balloons' },
              ].map((photo, i) => (
                <FadeInSection key={i} delay={i * 0.08}>
                  <div className="rounded-2xl overflow-hidden group aspect-[4/3]">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
    </>
  );
}
