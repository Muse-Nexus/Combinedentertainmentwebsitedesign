import React, { useRef } from 'react';
import { Layout } from '../components/Layout';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Dice5, Trophy, Users, Tv, Music, Star, Heart } from 'lucide-react';
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

export default function CasinoGameshow() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <Layout title="Casino & Game Show">
      {/* HERO — full-width video background, same pattern as Magic */}
      <div ref={heroRef} className="relative h-[85vh] overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <iframe
            src="https://player.vimeo.com/video/654838191?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&dnt=1"
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none', transform: 'scale(1.2)' }}
            allow="autoplay; fullscreen"
            title="Gameshow Fanatics promo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </motion.div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-[15%] left-[5%] text-coral/10 text-[10rem] font-serif select-none" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}>&#9830;</motion.div>
          <motion.div className="absolute top-[10%] right-[10%] text-burgundy/10 text-[8rem] font-serif select-none" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>&#9827;</motion.div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }}>
            <p className="text-coral font-semibold tracking-[0.3em] uppercase text-sm mb-4">Gameshow Fanatics &mdash; Where We Put You in the Game!</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-[0.9]">
              <span className="bg-gradient-to-r from-coral via-burgundy to-lavender bg-clip-text text-transparent">Maui Casino Night &amp; Game Shows</span>
              <br /><span className="text-white/90 text-4xl md:text-5xl font-light">The Best in Maui Party Entertainment</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-8">
              Interactive game show experiences for parties, weddings, anniversaries, birthdays, graduations, and events of all sizes. Las Vegas-style casino parties like never before!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-coral hover:bg-coral/80 text-white font-bold rounded-full transition-all shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-105">Book Your Event</Link>
              <a href="#gameshow" className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded-full transition-all hover:bg-white/5">See What We Do</a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* GAME SHOW SECTION */}
      <section id="gameshow" className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Gameshow Fanatics</p>
            <h2 className="text-4xl md:text-5xl font-bold">What Is Game Show Nite?</h2>
            <p className="text-xl text-gray-400 mt-4 max-w-3xl mx-auto">The idea is simple. We re-created the Family Feud, and then some. We have a professional set with all the bells &amp; whistles. Answers &ldquo;flipping&rdquo; with the DING! just like in the show years ago!</p>
          </FadeInSection>

          {/* Gameshow Promo Video */}
          <FadeInSection className="max-w-4xl mx-auto mb-16">
            <PromoVideo source={{ type: 'vimeo', videoId: '654838191' }} className="shadow-2xl shadow-coral/10" />
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
            <FadeInSection>
              <img src="/media/casino-gameshow/gameshow-outdoor-fullset.jpg" alt="Full outdoor game show set at night" className="rounded-3xl shadow-2xl shadow-coral/10 w-full object-cover aspect-[4/3]" />
            </FadeInSection>
            <FadeInSection delay={0.2}>
              <h3 className="text-3xl font-bold mb-6">The Full Game Show Experience</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Our flagship game is a parody version of the old Family Feud shows from the 70&rsquo;s. Unlike Family Feud, our show is personalized to the event, group, or guest of honor. Imagine the energy of a live, TV game show customized to you &mdash; with jokes, deep thoughts, aloha trivia, and more! Contestants from your party approach the podium to the music to face-off and ring the buzzer &mdash; it&rsquo;s hilarious!
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Game Show Nite gets people on the edges of their seats. Laughs, interaction, and fun are guaranteed! It&rsquo;s Maui party entertainment that brings people together and gets them laughing and interacting. From team building to just plain having fun &mdash; it&rsquo;s something your guests won&rsquo;t stop talking about&hellip; for years!
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Format', value: 'Family Feud parody — 4 teams of 5, 20 players total' },
                  { label: 'Duration', value: '90 minutes of non-stop competition' },
                  { label: 'Includes', value: 'Comic host, prize girl on roller skates, full-size set, lit-up podiums, buzzers, sound system & lighting' },
                  { label: 'Custom', value: 'Give us 15 fun facts about your group or celebrant — we turn them into game show questions' },
                  { label: 'Climax', value: 'Win It in a Minute physical challenges with funny props & high-energy music' },
                ].map((detail, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-coral font-semibold shrink-0 w-24">{detail.label}</span>
                    <span className="text-gray-300">{detail.value}</span>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>

          {/* Game Show Lite */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeInSection delay={0.2} className="md:order-2">
              <img src="/media/casino-gameshow/gameshow-podium-street.jpg" alt="Game Show Lite mobile podium on street" className="rounded-3xl shadow-2xl shadow-coral/10 w-full object-cover aspect-[4/3]" />
            </FadeInSection>
            <FadeInSection className="md:order-1">
              <h3 className="text-3xl font-bold mb-6">Game Show Lite</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                We offer seamless Maui party entertainment with custom lit-up podiums, contestant panels, and a live interactive Family Feud style game board. This unique game show comes to life at corporate events, holiday parties, graduation, and milestone birthday parties. A mobile, compact version perfect for festivals, restaurants, and smaller events.
              </p>
              <p className="text-gray-400 leading-relaxed">
                What sends it completely over-the-top is how we custom-tailor it to the group or celebrant. No stage or special setup needed &mdash; just space, guests, and a willingness to laugh.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CASINO NIGHT SECTION */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-burgundy font-semibold tracking-widest uppercase text-sm mb-3">Las Vegas-Style Casino Parties Like Never Before!</p>
            <h2 className="text-4xl md:text-5xl font-bold">Casino Night</h2>
          </FadeInSection>

          {/* Casino Promo Video */}
          <FadeInSection className="max-w-4xl mx-auto mb-16">
            <PromoVideo source={{ type: 'vimeo', videoId: '1058065790' }} className="shadow-2xl shadow-burgundy/10" />
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { src: '/media/casino-gameshow/casino-craps-table.jpg', alt: 'Casino craps table at event', title: 'Craps' },
              { src: '/media/casino-gameshow/casino-blackjack-table.jpg', alt: 'Casino blackjack table setup', title: 'Blackjack' },
              { src: '/media/casino-gameshow/casino-group-photo.jpg', alt: 'Casino night group photo', title: 'Full Events' },
            ].map((img, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden group relative">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <span className="text-white text-xl font-bold">{img.title}</span>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">More Than Just a Casino &mdash; We Bring the Show!</h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  Imagine a lively friend at your party who brings the thrill of Las Vegas to each guest. We host engaging casino nights with custom Blackjack, Poker, and Craps tables, staffed by our engaging and knowledgeable, fun-loving dealers. We don&rsquo;t just run games &mdash; we deliver a full-scale entertainment experience.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Every guest starts with an equal amount of chips, making the competition fierce and exciting. Top players win amazing prizes! Professional sound &amp; lighting with vibrant music, dynamic lighting, and stunning decor create a thrilling casino ambiance.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Whether you&rsquo;re a seasoned player or a first-timer, our casino nights guarantee non-stop excitement and memories to last a lifetime. We don&rsquo;t just bring the casino &mdash; we bring the show!
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-burgundy/10 text-burgundy px-4 py-2 rounded-full text-sm font-medium">Blackjack</span>
                  <span className="bg-burgundy/10 text-burgundy px-4 py-2 rounded-full text-sm font-medium">Poker</span>
                  <span className="bg-burgundy/10 text-burgundy px-4 py-2 rounded-full text-sm font-medium">Craps</span>
                  <span className="bg-burgundy/10 text-burgundy px-4 py-2 rounded-full text-sm font-medium">DJ Included</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src="/media/Casino-Night-92-1030x579.jpg" alt="Casino night crew with balloon decor backdrop" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* MORE SERVICES */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Beyond the Tables</p>
            <h2 className="text-4xl md:text-5xl font-bold">Additional Services</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="w-8 h-8" />, title: 'Wedding Game Shows', desc: 'The Newlywed Game, trivia about the couple, and interactive challenges that get your reception guests laughing and bonding. Where We Put Weddings in the Game!' },
              { icon: <Music className="w-8 h-8" />, title: 'DJ & MC Services', desc: 'Professional DJ and MC with curated playlists, wireless mic, sound system, and the ability to read any room. Brent keeps the dance floor packed — from cocktail hour through the final dance.' },
              { icon: <Tv className="w-8 h-8" />, title: 'Aloha Trivia Nights', desc: 'Weekly or one-off pub-style trivia events for restaurants, corporate teams, and private parties. A plethora of ridiculously fun questions with custom categories, team scoring, and prizes.' },
            ].map((service, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-coral/20 transition-all h-full">
                  <div className="text-coral mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-16">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">What People Are Saying</p>
            <h2 className="text-4xl md:text-5xl font-bold">Testimonials</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { quote: 'Brenton is a complete natural and knows how to keep the audience on their toes and entertained! Gameshow Fanatics are fantastic to work with. Brenton really cares about the success of each event and is constantly working to create the most fun and memorable experience for the guests.', name: 'Josh Desilva', role: 'Desilva Meeting Consultants' },
              { quote: "As an event organizer, I LOVED IT \u2013 we didn\u2019t have to do anything in preparation! It was a FRESH & FUN CHANGE for a team-building social event.", name: 'Jennifer Rappenecker', role: 'Regional Leader, Edward Jones' },
              { quote: "I'm not sure who had a better time, the people playing or the people watching!", name: 'Matt Lane', role: 'Outreach Coordinator, Community Work Day Program' },
              { quote: 'Absolutely hilarious!', name: 'Bryant Neal', role: 'Executive Director, Arts & Education for Children Group' },
            ].map((testimonial, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 h-full flex flex-col">
                  <Star className="w-6 h-6 text-coral mb-4 shrink-0" />
                  <p className="text-gray-300 leading-relaxed italic mb-6 flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="text-white font-bold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* GAME SHOW GALLERY */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <p className="text-coral font-semibold tracking-widest uppercase text-sm mb-3">Photos &amp; Events</p>
            <h2 className="text-4xl font-bold mb-4">Maui Game Show &amp; Casino Night Gallery</h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: '/media/486560996_1186362480158145_5148907381347692652_n.jpg', alt: 'Gameshow Fanatics full outdoor set with Brent and Jolie at Maui wedding entertainment event' },
                { src: '/media/486526077_1186074590186934_4650330950892672874_n.jpg', alt: 'Brenton Keith hosting live game show at Maui corporate event with teams at podiums' },
                { src: '/media/499547445_1232949328832793_5242943925623788269_n.jpg', alt: 'Brenton Keith as casino night dealer at craps table with LED lighting Maui event' },
                { src: '/media/500194188_1237146738413052_2903309702033879195_n.jpg', alt: 'Casino night blackjack poker table with guests at outdoor Maui tent event' },
                { src: '/media/500304533_1237146601746399_8139464562412602121_n.jpg', alt: 'Maui casino night party group photo at craps table with purple lighting and balloons' },
                { src: '/media/598419647_1413764607417930_4065430168744957782_n.jpg', alt: 'Casino night crew in matching vests posing with holiday balloon arch at Maui venue' },
                { src: '/media/503698188_1245363894258003_1463121886193686301_n.jpg', alt: 'Gameshow Fanatics luxury resort set with tropical flowers and lit podiums at Maui venue' },
                { src: '/media/515925879_10164201867303825_1352723102744150605_n.jpg', alt: 'Brenton Keith hosting Maui corporate game show in resort ballroom with contestants' },
                { src: '/media/579339660_1390588656402192_687487444146696782_n.jpg', alt: 'Casino night setup at Maui home event with blackjack craps tables and balloon arch' },
              ].map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden group aspect-[4/3]">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* PERFECT FOR */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect For</h2>
            <p className="text-gray-400 text-lg">High energy entertainment for any crowd</p>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {['Corporate Team Building', 'Holiday Parties', 'Fundraiser Galas', 'Wedding Receptions', 'Birthday Celebrations', 'Resort Events', 'Anniversaries', 'Graduations', 'Rehearsal Dinners', 'Themed Nights', 'Private Parties', 'Milestone Celebrations'].map((event, i) => (
                <span key={i} className="bg-slate-800/80 border border-slate-700/50 px-5 py-2.5 rounded-full text-gray-300 text-sm font-medium hover:border-coral/40 hover:text-coral transition-all duration-300 cursor-default">{event}</span>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="relative bg-gradient-to-r from-coral via-burgundy to-lavender rounded-[2rem] p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Raise the Stakes?</h2>
                <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">We are a premier Maui party entertainment company. We guarantee that we&rsquo;ll create unforgettable memories at your party or event. Game show, casino night, or both &mdash; tell us what you&rsquo;re planning!</p>
                <p className="text-white/70 mb-10">Based on Maui &bull; Available on Oahu, Kauai &amp; Big Island</p>
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
