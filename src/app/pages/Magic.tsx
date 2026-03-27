import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Wand2, Sparkles, Users, Star, Heart, MapPin, Clock, Award, Quote } from 'lucide-react';
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

export default function Magic() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Magic Brent">
      {/* HERO with video background */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src="https://video.wixstatic.com/video/786ca7_ab5822b51f864540a16e455d368a2a0a/480p/mp4/file.mp4?fileUsed=false" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[5%] text-coral/10 text-[10rem] font-serif select-none" animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>&#9829;</motion.div>
          <motion.div className="absolute top-[10%] right-[10%] text-burgundy/10 text-[8rem] font-serif select-none" animate={{ rotate: [0, -3, 3, 0] }} transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}>&#9824;</motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Brenton Keith &amp; His Bag O&rsquo; Tricks</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Maui Magician</span>
              <br /><span className="text-white/90 text-4xl md:text-5xl font-light">Comedy Magic &amp; Entertainment for Hire</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">Hawaii magician astonishing the islands for over 25 years. Shows that are big on comedy, high on energy, and large on interaction &mdash; with family-friendly jokes and laughs for all ages.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-105">Book Magic Brent</Link>
              <a href="#about" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">Learn More</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="relative">
                <img src="/media/magic/brent-umbrella-beach.jpg" alt="Brenton Keith on the beach with cards raining down" className="rounded-3xl shadow-2xl shadow-coral/10 w-full object-cover aspect-[4/5]" />
                <div className="absolute -bottom-6 -left-6 bg-coral text-white px-6 py-4 rounded-2xl shadow-xl">
                  <div className="text-3xl font-black">25+</div>
                  <div className="text-sm font-medium opacity-90">Years of Magic</div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">This Is Hawaii Comedy Magic at Its Finest</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Brenton Keith &amp;<span className="text-coral"> His Bag O&rsquo; Tricks</span></h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">As an aspiring 17-year-old, Brent was the &lsquo;house magician&rsquo; for three different restaurants in L.A. He worked his way into Wizardz Magic Theatre at Universal Studios and became a regular at the Magic Castle in Hollywood, where he studied the sleight-of-hand masters and the impeccable timing of the comedy acts.</p>
              <p className="text-gray-400 leading-relaxed mb-4">In his early 20s, he accepted a magician&rsquo;s invitation to board a plane and become the opening act for Maui&rsquo;s largest magic show, which led to headlining his own full-length show. The experience of those eight years taught him showmanship, how to work with an audience, and whipped him into the highly energetic performer he is today.</p>
              <p className="text-gray-400 leading-relaxed mb-8">He&rsquo;s performed for several thousands of birthday parties, 1st Birthday Luaus, Maui weddings, and corporate events all over Hawaii. He&rsquo;s also the Host, Producer, and Owner of <Link to="/casino-gameshow" className="text-coral hover:underline">Gameshow Fanatics</Link>, Hawaii&rsquo;s premiere portable game show.</p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium">Magic Castle Alum</span>
                <span className="bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium">Wizardz Magic Theatre</span>
                <span className="bg-coral/10 text-coral px-4 py-2 rounded-full text-sm font-medium">25+ Years on Maui</span>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* PERFORMANCE STYLES */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">What&rsquo;s in the Bag of Tricks?</p>
            <h2 className="text-4xl md:text-5xl font-bold">Maui Magic Show Styles</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Sparkles className="w-8 h-8" />, title: 'Live Magic Shows', desc: 'Professional magic shows on Maui — high-energy comedy & magic with tons of laughs and interaction, perfect for all ages. You\'ll see live goldfish. You\'ll see fire. You\'ll see your friends, coworkers, or the birthday boy or girl on stage! Whether indoor or outdoor, Brent brings everything you need for a great time.', img: '/media/magic/brent-library-show.jpg', imgAlt: 'Brenton Keith performing live comedy magic show on Maui' },
              { icon: <Wand2 className="w-8 h-8" />, title: 'Walk-Around Magic', desc: 'Strolling and close-up tableside magic that happens right in your guests\' hands. Cards, coins, and mind-reading — perfect for cocktail hours, receptions, and corporate mixers where conversation and amazement blend seamlessly.', img: '/media/487409844_1105269438282575_227576139539312597_n.jpg', imgAlt: 'Brenton Keith performing tableside close-up magic at Mulligan\'s on the Blue Wailea' },
              { icon: <Heart className="w-8 h-8" />, title: 'Birthdays & 1st Birthdays', desc: 'The best choice for 1st birthday parties on Maui. Brent has amused & amazed at thousands of Maui magic shows and 1st Birthday Luaus. Age-appropriate comedy magic with family-friendly jokes that keep little ones laughing.', img: '/media/481701426_1083132873829565_1351071441168869141_n.jpg', imgAlt: 'Maui magician Brenton Keith performing for kids with Rubik\'s cubes at outdoor festival' },
            ].map((style, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-coral/20 transition-all group h-full">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img src={style.img} alt={style.imgAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <div className="text-coral mb-4">{style.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{style.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{style.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* MULLIGAN'S SPOTLIGHT */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-br from-coral/10 via-slate-800/80 to-burgundy/10 rounded-[2rem] p-12 md:p-16 border border-coral/20 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4"><MapPin className="w-5 h-5 text-coral" /><p className="text-coral font-semibold tracking-widest uppercase text-sm">Weekly Residency</p></div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Mulligan&rsquo;s on the Blue<span className="text-coral"> Magic Show</span></h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">Every Thursday night, Brent takes over Mulligan&rsquo;s on the Blue in Wailea for a family-friendly comedy magic extravaganza. It&rsquo;s the longest-running magic show on Maui.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300"><Clock className="w-5 h-5 text-coral shrink-0" /><span>Showtime: 6:30pm, with close-up tableside magic starting around 5:30pm</span></div>
                    <div className="flex items-center gap-3 text-gray-300"><MapPin className="w-5 h-5 text-coral shrink-0" /><span>Mulligan&rsquo;s on the Blue, Wailea</span></div>
                    <div className="flex items-center gap-3 text-gray-300"><Users className="w-5 h-5 text-coral shrink-0" /><span>Only $10! Kids under 5 are free</span></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-coral/20 to-burgundy/20 rounded-2xl p-1">
                  <div className="bg-slate-900/80 backdrop-blur rounded-xl p-8 text-center">
                    <Wand2 className="w-16 h-16 text-coral mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Maui&rsquo;s Longest-Running</h3>
                    <p className="text-coral text-lg font-semibold">Live Magic Show</p>
                    <p className="text-gray-400 text-sm mt-2">Catch it next Thursday!</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* IN ACTION GALLERY */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Magic Brent in Action</p>
            <h2 className="text-4xl md:text-5xl font-bold">Maui Magic Show Gallery</h2>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: '/media/491891009_1120029950139857_7465676599821462116_n.jpg', alt: 'Brenton Keith performing Bag O Tricks magic with fire at Maui resort luau event' },
              { src: '/media/481909733_1083133077162878_8928208770247349769_n.jpg', alt: 'Maui magician Brenton Keith surrounded by amazed children at outdoor festival' },
              { src: '/media/612882638_1340946144714902_8080228191261112022_n.jpg', alt: 'Magic Brent post-show group photo with audience holding Aloha sign at Mulligan\'s Wailea' },
              { src: '/media/481786657_1083132067162979_5746383137781139010_n.jpg', alt: 'Brenton Keith performing magic for kids with Bag O Tricks at Maui community event' },
              { src: '/media/magic/brent-kids-bag-of-tricks.jpg', alt: 'Brenton Keith kids birthday magic show on Maui' },
              { src: '/media/magic/brent-jolie-stage.jpg', alt: 'Brenton Keith and Jolie Strickland performing live on stage in Maui' },
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
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-gray-400 text-lg">From beach parties to ballrooms</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Birthdays', '1st Birthday Luaus', 'Corporate Events', 'Maui Weddings', 'Walk-Around Magic', 'Cocktail Hours', 'Resort Entertainment', 'Private Luaus', 'Holiday Parties', 'Fundraisers', 'School Events', 'Restaurant Shows'].map((event, i) => (
                <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all duration-300 cursor-default">{event}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Recognition &amp; Credentials</p>
            <h2 className="text-4xl md:text-5xl font-bold">Trusted Across Hawaii</h2>
          </FadeInSection>

          {/* Credential badges */}
          <FadeInSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
              {[
                { icon: <Award className="w-8 h-8" />, label: 'Best Comedian on Maui', sub: 'Maui Time Weekly 2019' },
                { icon: <Star className="w-8 h-8" />, label: 'Magic Castle Alum', sub: 'Hollywood, CA' },
                { icon: <Users className="w-8 h-8" />, label: 'Thousands of Shows', sub: 'Across All Islands' },
                { icon: <Wand2 className="w-8 h-8" />, label: 'Longest-Running', sub: 'Live Magic Show on Maui' },
              ].map((cred, i) => (
                <div key={i} className="text-center bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                  <div className="text-coral mb-3 flex justify-center">{cred.icon}</div>
                  <p className="font-bold text-white text-sm mb-1">{cred.label}</p>
                  <p className="text-gray-500 text-xs">{cred.sub}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Pull quote */}
          <FadeInSection delay={0.2}>
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="w-10 h-10 text-coral/30 mx-auto mb-6" />
              <p className="text-2xl md:text-3xl text-gray-300 italic leading-relaxed mb-6">&ldquo;Brenton is a complete natural and knows how to keep the audience on their toes and entertained! He really cares about the success of each event.&rdquo;</p>
              <div>
                <p className="text-coral font-bold">Josh Desilva</p>
                <p className="text-gray-500 text-sm">Desilva Meeting Consultants</p>
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
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready for Some Magic?</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">Book Brenton Keith &amp; His Bag O&rsquo; Tricks for your next event &mdash; birthdays, corporate events, walk-around magic, and 1st birthdays. Comedy, magic, MC &amp; DJ all rolled into one unforgettable performer.</p>
                <p className="text-white/70 mb-10">Appearing live on Maui, Oahu, Kauai &amp; Big Island</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="px-10 py-4 bg-white text-coral font-bold rounded-full hover:bg-white/90 transition-all shadow-xl hover:scale-105">Book Magic Brent</Link>
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
