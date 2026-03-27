import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Palette, Sparkles, Heart, Star, Wand2, Music } from 'lucide-react';
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

export default function BalloonTwisting() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Kids Entertainment">
      {/* HERO — full-width image background matching Magic/Casino pattern */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img
            src="/media/balloons/kid-panda-facepainting.jpg"
            alt="Happy child with panda balloon and face painting by Cirque Jolie"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[5%] text-lavender/10 text-[12rem] select-none" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>&#127880;</motion.div>
          <motion.div className="absolute top-[10%] right-[8%] text-coral/10 text-[10rem] select-none" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>&#127879;</motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-lavender font-semibold tracking-[0.3em] uppercase text-sm mb-4">Cirque Jolie &mdash; Children&rsquo;s Entertainment</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-lavender via-coral to-sage bg-clip-text text-transparent">Maui Kids Party Entertainment</span>
              <br /><span className="text-white/90 text-4xl md:text-5xl font-light">Balloon Twisting, Face Painting &amp; Children&rsquo;s Magic</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
              Cirque Jolie&rsquo;s 30-minute interactive children&rsquo;s magic show, professional face painting, and balloon twisting &mdash; keeping young children delighted and entertained at parties across Maui.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-lavender hover:bg-lavender/80 text-white font-bold rounded-full transition-all shadow-lg shadow-lavender/25 hover:shadow-lavender/40 hover:scale-105">Book Kids Entertainment</Link>
              <a href="#about" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">Meet Jolie</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PROMO VIDEO */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="max-w-4xl mx-auto">
            <PromoVideo source={{ type: 'vimeo', videoId: '334597801' }} className="shadow-2xl shadow-lavender/10" />
          </FadeInSection>
        </div>
      </section>

      {/* ABOUT JOLIE */}
      <section id="about" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <img src="/media/strolling/jolie-portrait.jpg" alt="Jolie Strickland — Cirque Jolie" className="rounded-3xl shadow-2xl shadow-lavender/10 w-full object-cover aspect-[4/5]" />
                <div className="absolute -bottom-6 -right-6 bg-lavender text-white px-6 py-4 rounded-2xl shadow-xl">
                  <div className="text-3xl font-black">20+</div>
                  <div className="text-sm font-medium opacity-90">Years Performing</div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">About Cirque Jolie</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Jolie<span className="text-lavender"> Strickland</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Cirque Jolie&rsquo;s beginnings lie in Jolie&rsquo;s youth. Growing up mostly on Maui, she was part of a group trained as &ldquo;clowns&rdquo; in 2000 by Una the Clown, and they volunteered all over the island at places like Hale Makua and Kula Hospital. Una the Clown left Maui in 2004, leaving her legacy behind in &ldquo;Jolie the Clown,&rdquo; who continued to entertain at events and parties with her balloon-making, face-painting, and magic.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                As the years passed and her skills expanded, Jolie the Clown evolved into Cirque Jolie. She will still wear a clown costume if requested, but enjoys the freedom to bring a diverse and colorful array of characters to events and parties. Her skills now include stilt walking and fire dancing, and she&rsquo;s thrilled to add &ldquo;prize girl&rdquo; to her ever-growing list of talents with <Link to="/casino-gameshow" className="text-lavender hover:underline">Gameshow Fanatics</Link>.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                She lives in Haiku with her partner Brenton Keith and her son Jet, and performs throughout Maui and the Hawaiian islands.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Entertaining Since 2000</span>
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Live Bunny Show</span>
                <span className="bg-lavender/10 text-lavender px-4 py-2 rounded-full text-sm font-medium">Maui &amp; Hawaiian Islands</span>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">Everything for Your Party</p>
            <h2 className="text-4xl md:text-5xl font-bold">Three Shows in One</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Wand2 className="w-8 h-8" />, title: 'Live Magic Show', desc: 'A 30-minute interactive comedy magic show with a LIVE bunny rabbit! Designed for ages 2–9, every child gets to pet the bunny and be part of the magic.', img: '/media/balloons/kid-panda-facepainting.jpg', imgAlt: 'Child with panda balloon and face painting' },
              { icon: <Palette className="w-8 h-8" />, title: 'Face Painting', desc: 'Professional face painting using skin-safe, hypoallergenic paints. From fierce dragons to sparkly butterflies — each design is a mini masterpiece.', img: '/media/balloons/dragon-facepainting.jpg', imgAlt: 'Child with dragon face painting design' },
              { icon: <Sparkles className="w-8 h-8" />, title: 'Balloon Twisting', desc: 'Swords, puppies, crowns, flowers — you name it, Jolie twists it. Every child at the party goes home with a custom balloon creation.', img: '/media/balloons/minecraft-balloon-sculpture.jpg', imgAlt: 'Minecraft Creeper balloon sculpture' },
            ].map((service, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-lavender/20 transition-all group h-full">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img src={service.img} alt={service.imgAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

      {/* FEATURED SCULPTURE */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 max-w-md">
          <FadeInSection>
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-lavender/10 group">
              <img src="/media/balloons/octopus-balloon-sculpture.jpg" alt="Octopus balloon sculpture by Cirque Jolie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <p className="text-center text-gray-400 mt-4 text-sm">If a kid can dream it, Jolie can twist it</p>
          </FadeInSection>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-br from-lavender/10 via-slate-800/80 to-coral/10 rounded-[2rem] p-12 md:p-16 border border-lavender/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-lavender/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">What&rsquo;s Included</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {[
                    { icon: <Wand2 className="w-6 h-6" />, text: '30-minute live magic show with LIVE bunny' },
                    { icon: <Sparkles className="w-6 h-6" />, text: 'Balloon twisting for every child' },
                    { icon: <Palette className="w-6 h-6" />, text: 'Professional face painting (skin-safe paints)' },
                    { icon: <Music className="w-6 h-6" />, text: 'Fun music and kid-friendly MC' },
                    { icon: <Heart className="w-6 h-6" />, text: 'Up to 25 kids per session' },
                    { icon: <Star className="w-6 h-6" />, text: 'Custom themes available' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="text-lavender mt-1 shrink-0">{item.icon}</div>
                      <p className="text-gray-300 text-lg">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-lavender font-semibold tracking-widest uppercase text-sm mb-3">Cirque Jolie in Action</p>
            <h2 className="text-4xl md:text-5xl font-bold">Maui Kids Entertainment Gallery</h2>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: '/media/480712819_1155376403052671_6432676726575521199_n.jpg', alt: 'Cirque Jolie custom purple cat balloon arch for Maui birthday party' },
              { src: '/media/balloons/dragon-facepainting.jpg', alt: 'Dragon face painting design for kids at Maui party by Cirque Jolie' },
              { src: '/media/balloons/minecraft-balloon-sculpture.jpg', alt: 'Minecraft Creeper balloon sculpture by Maui balloon artist Cirque Jolie' },
              { src: '/media/balloons/octopus-balloon-sculpture.jpg', alt: 'Giant octopus balloon sculpture by Cirque Jolie Maui balloon twister' },
              { src: '/media/balloons/kid-panda-facepainting.jpg', alt: 'Happy child with panda balloon and face painting at Maui kids party' },
              { src: '/media/cirque-jolie-2.jpg', alt: 'Jolie Strickland Cirque Jolie Maui children entertainer' },
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
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-gray-400 text-lg">Keiki celebrations of every kind</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Birthday Parties', '1st Birthday Luaus', 'School Events', 'Daycare Programs', 'Luaus', 'Holiday Parties', 'Church Events', 'Community Festivals', 'Resort Kids Clubs', 'Library Programs', 'Grand Openings', 'Family Reunions'].map((event, i) => (
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Make Their Party Magical</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">Magic show, face painting &amp; balloon twisting &mdash; all in one booking. If you want magic for ALL ages (2&ndash;102 years old), check out <Link to="/magic" className="underline font-bold">Brenton Keith &amp; His Bag O&rsquo; Tricks</Link>. Book both together for an amazing discount!</p>
                <p className="text-white/70 mb-10">Entertainers based on the island of Maui &amp; willing to travel to outer island events</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-lavender font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Book Kids Entertainment</Link>
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
