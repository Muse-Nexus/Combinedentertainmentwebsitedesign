import React, { useCallback, useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useInView } from 'motion/react';
import { Flower2, Gift, Heart, Instagram, Sparkles, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Lightbox, useLightbox, type GalleryImage } from '../components/GalleryLightbox';

const FadeInSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
};

const FEATURE_IMAGES: GalleryImage[] = [
  { src: '/media/client-selected/balloon-decor/balloon-decor-d4d981a4-rainbow-proscenium-arch.webp', alt: 'Rainbow proscenium balloon arch over a stage with Jolie posing beneath it, arms raised' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-89e88e66-gold-tropical-flower-arch.webp', alt: 'Gold and tropical flower balloon arch sweeping across a Maui resort lobby' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-f67236fe-rainbow-garland-path.webp', alt: 'Rainbow garland balloon arch over an outdoor path in natural light' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-71f51069-uv-glow-rainbow-stairs.webp', alt: 'Glowing UV rainbow balloon arch lit up over a staircase at night' },
];

const MORE_IMAGES: GalleryImage[] = [
  { src: '/media/client-selected/balloon-decor/balloon-decor-d74e79a2-halloween-pumpkin-arch.webp', alt: 'Halloween balloon arch with orange pumpkins' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-bff8ec5a-spiderweb-arch.webp', alt: 'Spooky spider-web themed balloon installation' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-cb21a142-alice-in-wonderland-arch.webp', alt: 'Alice in Wonderland themed balloon display with a white rabbit' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-58e58845-nye-2025-arch.webp', alt: "New Year's Eve 2025 balloon installation" },
  { src: '/media/client-selected/balloon-decor/balloon-decor-26f2405f-casino-red-curtain-arch.webp', alt: 'Casino-themed balloon arch with a red curtain backdrop' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-4ae8e61a-patriotic-arch-a.webp', alt: 'Patriotic red, white and blue balloon arch' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-0b41b6c2-patriotic-arch-b.webp', alt: 'Patriotic star-spangled balloon installation' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-bd3cbca0-metallic-elegant-arch-a.webp', alt: 'Elegant metallic gold and white balloon arch' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-b079c6c1-metallic-elegant-arch-b.webp', alt: 'Elegant metallic balloon column installation' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-65876fc9-metallic-elegant-arch-c.webp', alt: 'Elegant metallic balloon arch with silver accents' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-1c516c9e-tropical-resort-arch-a.webp', alt: 'Tropical resort-themed balloon installation' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-526d0eef-tropical-resort-arch-b.webp', alt: 'Tropical balloon arch with palm and floral accents' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-927b4180-tropical-resort-arch-c.webp', alt: 'Tropical resort balloon installation in warm colors' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-7349f6cd-candyland-arch.webp', alt: 'Candy-colored balloon installation with a candyland theme' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-75e928a0-tiki-head-install.webp', alt: 'Tiki-head themed balloon sculpture' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-0826fd72-daisy-lawn-install.webp', alt: 'Daisy-covered balloon installation across a lawn' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-b3ecec3b-playful-arch-d.webp', alt: 'Colorful playful balloon installation' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-c594e08e-playful-arch-e.webp', alt: 'Playful balloon arch in bright mixed colors' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-5c945691-playful-arch-f.webp', alt: 'Playful balloon column installation' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-6c6414d6-playful-arch-g.webp', alt: 'Playful balloon display with mixed pastel colors' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-f9539182-playful-arch-c.webp', alt: 'Balloon garland installation in soft pastel tones' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-308a14fb-playful-arch-a.webp', alt: 'Colorful balloon arch installation for a Maui celebration' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-6c3d46f0-playful-arch-b.webp', alt: 'Balloon installation with a layered color palette' },
  { src: '/media/client-selected/balloon-decor/balloon-decor-b487df71-thumbnail-lineup.webp', alt: 'Lineup of Cirque Jolie balloon sculpture designs' },
];

const ALL_IMAGES: GalleryImage[] = [...FEATURE_IMAGES, ...MORE_IMAGES];

export default function BalloonDecor() {
  const { index, isOpen, open, close, next, prev } = useLightbox(ALL_IMAGES.length);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleClose = useCallback(() => {
    const openedIndex = index;
    close();
    if (openedIndex !== null) triggerRefs.current[openedIndex]?.focus();
  }, [close, index]);

  return (
    <Layout title="Balloon Décor">
      {/* HERO */}
      <section className="relative py-32 bg-gradient-to-b from-sage/20 via-slate-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-16 right-[12%] text-sage/10 text-[10rem] select-none" animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>&#127880;</motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center max-w-4xl mx-auto">
            <p className="text-sage font-semibold tracking-[0.3em] uppercase text-sm mb-4">Balloons of Aloha</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-sage via-cream to-coral bg-clip-text text-transparent">Maui Balloon D&eacute;cor</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Balloon garland, balloon arches, balloon columns, numbered birthday balloon arrangements, balloon bouquets, surprise balloon deliveries, and balloon centerpieces. It totally transforms any space into a party!
            </p>
            <Link to="/contact?service=balloon-decor" className="inline-block px-8 py-4 bg-sage hover:bg-sage/80 text-slate-950 font-bold rounded-full transition-all shadow-lg shadow-sage/25 hover:shadow-sage/40 hover:scale-105">Get a Free Quote</Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURED GALLERY — 4 large anchors */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-sage font-semibold tracking-widest uppercase text-sm mb-3">Our Work</p>
            <h2 className="text-4xl md:text-5xl font-bold">Recent Installations</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Tap any photo to browse the full gallery of {ALL_IMAGES.length} Cirque Jolie balloon installations.</p>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-6">
              {FEATURE_IMAGES.map((img, i) => (
                <button
                  key={img.src}
                  ref={(el) => { triggerRefs.current[i] = el; }}
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`View photo: ${img.alt}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-sage"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-sage font-semibold tracking-widest uppercase text-sm mb-3">What We Create</p>
            <h2 className="text-4xl md:text-5xl font-bold">D&eacute;cor Services</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Flower2 className="w-8 h-8" />, title: 'Organic Garlands', desc: 'Flowing, natural-looking balloon garlands in any color palette. Perfect for staircases, doorways, and table runners. Jolie strives to make all her balloon decor high quality and unique.' },
              { icon: <Star className="w-8 h-8" />, title: 'Arches & Columns', desc: 'Classic and contemporary balloon arches and columns that frame entrances, stages, and photo areas beautifully. Numbered birthday balloon arrangements and balloon bouquets also available.' },
              { icon: <Sparkles className="w-8 h-8" />, title: 'Custom Installations', desc: 'Full-scale custom designs — wall backdrops, ceiling installations, themed centerpieces, and more. Surprise balloon deliveries and balloon candy cups bring joy to any recipient.' },
            ].map((service, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-sage/20 transition-all h-full">
                  <div className="text-sage mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* FULL GALLERY — remaining 24, lightbox-enabled, shares index space with feature row */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <p className="text-sage font-semibold tracking-widest uppercase text-sm mb-3">Browse the Full Collection</p>
            <h2 className="text-4xl md:text-5xl font-bold">Every Style, Every Occasion</h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {MORE_IMAGES.map((img, i) => {
                const globalIndex = FEATURE_IMAGES.length + i;
                return (
                  <button
                    key={img.src}
                    ref={(el) => { triggerRefs.current[globalIndex] = el; }}
                    type="button"
                    onClick={() => open(globalIndex)}
                    aria-label={`View photo: ${img.alt}`}
                    className="group relative aspect-square overflow-hidden rounded-xl cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-sage"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </button>
                );
              })}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2} className="mt-12 text-center">
            <a
              href="https://www.instagram.com/cirquejolie/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sage/40 px-7 py-3 font-semibold text-sage transition-colors hover:bg-sage/10"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
              See this week&rsquo;s installs on Instagram
            </a>
          </FadeInSection>
        </div>
      </section>

      {isOpen && index !== null && (
        <Lightbox images={ALL_IMAGES} index={index} onClose={handleClose} onNext={next} onPrev={prev} />
      )}

      {/* OCCASIONS */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For Every Occasion</h2>
            <p className="text-gray-400 text-lg">From intimate gatherings to resort-scale events</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { icon: <Heart className="w-5 h-5" />, events: ['Weddings', 'Anniversaries', 'Proposals'] },
                { icon: <Gift className="w-5 h-5" />, events: ['Birthdays', 'Baby Showers', 'Gender Reveals'] },
                { icon: <Trophy className="w-5 h-5" />, events: ['Corporate Events', 'Grand Openings', 'Conferences'] },
                { icon: <Star className="w-5 h-5" />, events: ['Holiday Parties', 'Graduations', 'Luaus'] },
              ].map((group, i) => (
                <div key={i} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="text-sage mb-4">{group.icon}</div>
                  <ul className="space-y-2">
                    {group.events.map((event, j) => (
                      <li key={j} className="text-gray-300 font-medium">{event}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* BALLOONS OF ALOHA */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-br from-sage/10 via-slate-800/80 to-lavender/10 rounded-[2rem] p-12 md:p-16 border border-sage/20 overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-sage font-semibold tracking-widest uppercase text-sm mb-3">Community Program</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Balloons of<span className="text-sage"> Aloha</span></h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Cirque Jolie is excited to announce a project called Balloons of Aloha. We donate a balloon delivery to a non-profit or well-deserving business on the 3rd Wednesday of every month. These are crazy times, and we really wanted to do something to give back to our community and spread some joy.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    If you would like to show some gratitude to an individual, organization, or business, you or your business can sponsor a Balloons of Aloha delivery. Prices start at $35 plus delivery fees and include a personalized card that recognizes you, or your business, as the sponsor.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img src="/media/balloon-decor/balloons-of-aloha.jpg" alt="Balloons of Aloha delivery bouquet" loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
            <div className="relative bg-gradient-to-r from-sage via-cream/80 to-coral rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Let&rsquo;s Design Something Beautiful</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">Cirque Jolie took her already-existing balloon skills and learned to apply them to making larger balloon art and decorations. She has been thrilled with how fun and satisfying the work has been. Send us your event details, color palette, and vision!</p>
                <p className="text-white/70 mb-10">Entertainers based on the island of Maui &amp; willing to travel to outer island events</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact?service=balloon-decor" className="px-10 py-4 bg-white text-sage font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Get a Free Quote</Link>
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
