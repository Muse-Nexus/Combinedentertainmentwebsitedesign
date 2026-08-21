import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Palette, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SmartVimeoBackground } from '../components/SmartVimeoBackground';
import { GalleryLightbox, type GalleryImage } from '../components/GalleryLightbox';

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

// Balanced, alternating gallery drawn from Jolie's selected balloon-twisting
// and face-painting assets — no balloon-decor imagery on this page.
const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/media/client-selected/balloon-twisting/twisting-01-mermaid-doll-balloon.webp', alt: 'Girl beaming beside a mermaid-doll balloon sculpture by Cirque Jolie', objectPosition: 'center top' },
  { src: '/media/client-selected/face-painting/face-01-artist-with-child.webp', alt: 'Two friends showing colorful blue, gold, and red face-painting designs' },
  { src: '/media/client-selected/balloon-twisting/twisting-02-parent-toddler-lion.webp', alt: 'Parent and toddler with a custom lion balloon creation' },
  { src: '/media/client-selected/face-painting/face-02-rainbow-butterfly-girl.webp', alt: 'Girl with a rainbow butterfly face painting design outdoors' },
  { src: '/media/client-selected/balloon-twisting/twisting-03-senior-guest-monkey-flower.webp', alt: 'Senior guest smiling with a monkey and flower balloon twist' },
  { src: '/media/client-selected/face-painting/face-03-adult-grinch-face.webp', alt: 'Jolie smiling with a child wearing an intricate floral-crown face-painting design' },
  { src: '/media/client-selected/balloon-twisting/twisting-04-boy-monkey-palm-indoor.webp', alt: 'Boy holding a monkey-and-palm-tree balloon at a large indoor Maui event' },
  { src: '/media/client-selected/face-painting/face-04-matching-tiger-pair.webp', alt: 'Two guests with matching tiger face painting designs' },
  { src: '/media/client-selected/balloon-twisting/twisting-05-jolie-stitch-balloon.webp', alt: 'Jolie posing with a Stitch character balloon sculpture' },
  { src: '/media/client-selected/face-painting/face-05-koi-arm-art.webp', alt: 'Painted koi fish arm art by a Cirque Jolie face painter' },
  { src: '/media/client-selected/balloon-twisting/twisting-06-motorcycle-sculpture.webp', alt: 'Guest holding a full-size custom motorcycle balloon sculpture' },
  { src: '/media/client-selected/face-painting/face-06-beachfront-mermaid-face.webp', alt: 'Mermaid-scale face painting design at a Maui beachfront event' },
  { src: '/media/client-selected/balloon-twisting/twisting-07-flower-balloon-guest.webp', alt: 'Smiling guest holding a bright flower character balloon at a Maui event' },
  { src: '/media/client-selected/face-painting/face-07-zebra-cat-design.webp', alt: 'Girl with a detailed black-and-white zebra cat face-painting design' },
  { src: '/media/client-selected/balloon-twisting/twisting-08-character-display.webp', alt: 'Display of elaborate balloon characters, flowers, and vehicles by Cirque Jolie' },
  { src: '/media/client-selected/face-painting/face-08-green-creature-boy.webp', alt: 'Boy with a vivid green fantasy-creature face-painting design' },
  { src: '/media/client-selected/balloon-twisting/twisting-09-grinch-balloon-selfie.webp', alt: 'Jolie posing with a large holiday Grinch balloon sculpture' },
  { src: '/media/client-selected/face-painting/face-09-adult-group-designs.webp', alt: 'Three adult guests showing coordinated tropical face-painting designs' },
  { src: '/media/client-selected/face-painting/face-10-blue-superhero-boy.webp', alt: 'Boy showing a bold blue-and-gold superhero face-painting design' },
  { src: '/media/client-selected/face-painting/face-11-painted-adult-pair.webp', alt: 'Two adult guests smiling with colorful forehead and cheek art' },
  { src: '/media/client-selected/face-painting/face-12-keiki-design-pair.webp', alt: 'Two young guests showing playful floral and mask face-painting designs' },
  { src: '/media/client-selected/face-painting/face-13-best-friends-glitter.webp', alt: 'Two friends wearing coordinated glittering mermaid face art' },
  { src: '/media/client-selected/face-painting/face-14-green-creature-design.webp', alt: 'Guest smiling with a bright green fantasy-creature face design' },
];

export default function BalloonTwisting() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Balloon Twisting & Face Painting">
      {/* HERO — Vimeo background video (autoplay, loop, muted) */}
      <div ref={heroRef} className="relative min-h-[calc(100svh-5rem)] overflow-hidden flex items-end md:h-[85vh]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 overflow-hidden">
          <SmartVimeoBackground
            videoId="334597801"
            poster="/media/client-selected/balloon-twisting/twisting-01-mermaid-doll-balloon.webp"
            title="Cirque Jolie balloon twisting promo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </motion.div>
        <div className="relative z-10 container mx-auto px-4 py-14 md:py-0 md:pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-lavender font-semibold tracking-[0.3em] uppercase text-sm mb-4">Cirque Jolie</p>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-lavender via-coral to-sage bg-clip-text text-transparent">Balloon Twisting &amp; Face Painting</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
              Cirque Jolie&rsquo;s professional balloon artists and face painters bring color and delight to keiki birthday parties, family luaus, resort welcome events, weddings, and corporate mixers across Maui.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact?service=balloon-animals" className="px-8 py-4 bg-lavender hover:bg-lavender/80 text-slate-950 font-bold rounded-full transition-all shadow-lg shadow-lavender/25 hover:shadow-lavender/40 hover:scale-105">Book Balloon Twisting &amp; Face Painting</Link>
              <a href="#about" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">Meet Jolie</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">Everything for Your Party</p>
            <h2 className="text-4xl md:text-5xl font-bold">Our Services</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Sparkles className="w-8 h-8" />, title: 'Balloon Twisting', desc: 'Swords, puppies, crowns, flowers — you name it, Jolie twists it. Every guest goes home with a custom balloon creation, from keiki celebrations to adult events.', img: '/media/client-selected/balloon-twisting/twisting-05-jolie-stitch-balloon.webp', imgAlt: 'Jolie posing with a Stitch character balloon sculpture' },
              { icon: <Palette className="w-8 h-8" />, title: 'Face Painting', desc: 'Professional face painting using skin-safe, hypoallergenic paints. From fierce dragons and sparkly butterflies to full adult character designs — each is a mini masterpiece.', img: '/media/client-selected/face-painting/face-02-rainbow-butterfly-girl.webp', imgAlt: 'Girl with a rainbow butterfly face painting design outdoors' },
            ].map((service, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-lavender/20 transition-all group h-full">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img src={service.img} alt={service.imgAlt} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <div className="text-lavender mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">Cirque Jolie in Action</p>
            <h2 className="text-4xl md:text-5xl font-bold">Balloon Twisting &amp; Face Painting Gallery</h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <GalleryLightbox
              images={GALLERY_IMAGES}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              itemClassName="aspect-[4/3] overflow-hidden rounded-2xl"
              eagerCount={2}
            />
          </FadeInSection>
        </div>
      </section>

      {/* ABOUT JOLIE */}
      <section id="about" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <img src="/media/strolling/jolie-portrait.jpg" alt="Jolie Strickland — Cirque Jolie" loading="lazy" decoding="async" className="rounded-3xl shadow-2xl shadow-lavender/10 w-full object-cover aspect-[4/5]" />
                <div className="absolute -bottom-6 right-3 md:-right-6 bg-lavender text-slate-950 px-6 py-4 rounded-2xl shadow-xl">
                  <div className="text-3xl font-black">20+</div>
                  <div className="text-sm font-medium opacity-90">Years Performing</div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">About Cirque Jolie</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Jolie<span className="text-lavender"> Strickland</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Jolie has entertained Maui audiences for more than two decades. Cirque Jolie grew from her love of balloon artistry, colorful characters, and bringing guests of every age into the fun.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Her work now spans balloon twisting, face painting, stilt walking, LED performance, and colorful ambient characters. She also joins <Link to="/game-show" className="text-lavender hover:underline">Gameshow Fanatics</Link> to help turn the entire room into part of the show.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                She and her husband Brenton Keith perform throughout Maui and the Hawaiian Islands.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Entertaining Since 2000</span>
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Balloon Artistry</span>
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Maui &amp; Hawaiian Islands</span>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* PERFECT FOR */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-gray-400 text-lg">From keiki celebrations to grown-up gatherings</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Birthday Parties', '1st Birthday Luaus', 'School Events', 'Daycare Programs', 'Luaus', 'Holiday Parties', 'Resort Welcome Events', 'Wedding Cocktail Hours', 'Corporate Mixers', 'Community Festivals', 'Resort Kids Clubs', 'Grand Openings', 'Family Reunions'].map((event, i) => (
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
            <div className="relative bg-gradient-to-r from-lavender via-coral to-sage rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Make Your Party Colorful</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">Face painting &amp; balloon twisting in one booking. Want magic too, for ALL ages (2&ndash;102 years old)? Add <Link to="/magic" className="underline font-bold">Brenton Keith &amp; His Bag O&rsquo; Tricks</Link> to your event. Book both together for an amazing discount!</p>
                <p className="text-white/70 mb-10">Entertainers based on the island of Maui &amp; willing to travel to outer island events</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact?service=balloon-animals" className="px-10 py-4 bg-white text-lavender font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Book Balloon Twisting &amp; Face Painting</Link>
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
