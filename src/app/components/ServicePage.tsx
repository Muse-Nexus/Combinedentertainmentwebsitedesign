import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Sparkles, ChevronDown, ChevronUp, CheckCircle, Music, Camera, Maximize, Timer, Quote, Star, Users, Briefcase, Award } from 'lucide-react';
import { RainEffect } from './RainEffect';
import { UmbrellaNav } from './UmbrellaNav';

// Import assets
import imgStiltWalkers from 'figma:asset/c4244769e5c8f6bbaa968eab7b485f18ac88624a.png';
import imgFireDancer from 'figma:asset/b10f94a69870c5178d2a8a0fa76e6c62ec82edc5.png';
import imgClown from 'figma:asset/cc0d666f820324c4227e6e553ba5da59ed6d0f3c.png';
import imgBalloonArch from 'figma:asset/447461bf6d38624b33c25c2c5bf93f8325ba68fc.png';

import imgGameshowHero from 'figma:asset/96943c1ddde3a165ed171bfd566eb957928fd72c.png'; 
import imgGameShowNite from 'figma:asset/81f623fba227bb2baa7c6c09013c7dc5991e35c3.png';
import imgCasinoNight from 'figma:asset/b201bf598f86ab7db2539d448a9a234c2ec299a5.png';
import imgCasinoGroup from 'figma:asset/c608bc54a14ef4e5e831b7117baeb3ee536002b8.png';
import imgClientsGrid from 'figma:asset/56bdfc36c44fafa1f8d3c7fbd51f3205ab914367.png';

import imgTrevorTech from 'figma:asset/548a1564652ebff57bfdc1c523f56ecc381ff267.png';
import imgBrentonHost from 'figma:asset/660eecd14d6b1502a6e1778cdf07ba1e21019742.png';
import imgJoliePrize from 'figma:asset/8c48e321175a835e93c5c0af0af03558673743ee.png';
import imgWeddingHero from 'figma:asset/24993b6ddb5411d9c0653f41217e3da97d792b7d.png';
import imgDjService from 'figma:asset/9853e4f0a05ad26628c601bf3267262ee082d67d.png';

// Cloud Texture for Transition
import cloudTexture from 'figma:asset/a4d5b9382b0fb1113c06693396a4b58d8adf4b36.png';

// Fallbacks
const imgFaqBanner = "https://images.unsplash.com/photo-1624811072711-3e3481f355fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWVzdGlvbiUyMG1hcmslMjBuZW9uJTIwc2lnbnxlbnwxfHx8fDE3NzAzNzU1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgGameShowNiteBanner = "https://images.unsplash.com/photo-1711371307312-bb5d027f660d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwc2hvdyUyMGhvc3QlMjBtaWNyb3Bob25lJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcwMzc1NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const imgLitePodiumDetail = "https://images.unsplash.com/photo-1764874299006-bf4266427ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwc2hvdyUyMHBvZGl1bSUyMGJ1enplcnxlbnwxfHx8fDE3NzAzNzU1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgCasinoChips = "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb2tlciUyMGNoaXBzfGVufDF8fHx8MTc3MDM3NjAwMHww&ixlib=rb-4.1.0&q=80&w=1080";
const imgRoulette = "https://images.unsplash.com/photo-1605870445919-838d190e8e1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxyb3VsZXR0ZXxlbnwxfHx8fDE3NzAzNzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgCorporateGala = "https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBldmVudHxlbnwxfHx8fDE3NzAzNzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const imgTeamBuilding = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHx0ZWFtJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzcwMzc2MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080";

// --- Components ---

const ScrollSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"] 
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={`relative ${className || ''}`}>
      {children}
    </motion.div>
  );
};

const PageTransition = () => {
  return (
    <motion.div
      initial={{ x: '0%' }}
      animate={{ x: '200%' }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-start overflow-hidden"
    >
        <div className="absolute inset-0 w-[100vw] h-full mix-blend-screen flex items-center justify-start transform -translate-x-1/2">
             <img 
                src={cloudTexture} 
                className="w-[180%] h-auto max-w-none opacity-100 object-contain scale-150" 
                alt="transition-cloud" 
                style={{
                    maskImage: 'radial-gradient(closest-side, black 0%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(closest-side, black 0%, transparent 80%)'
                }}
             />
        </div>
    </motion.div>
  );
};

export const ServicePage = () => {
  const { serviceId } = useParams();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };
  
  const services: Record<string, any> = {
    'magic': {
      title: 'Magic Brent',
      subtitle: 'Hawaii Magician Astonishing the Islands for Over 25 Years!',
      description: 'My shows are big on comedy, high on energy, and large on interaction with family-friendly jokes and laughs for all ages. This is Hawaii Comedy Magic at its finest. Brenton Keith & His Bag O\' Tricks is The Best Choice for 1st birthday parties and has amused & amazed at thousands of Maui magic shows.',
      img: 'figma:asset/abbba35f6419ca1567aa30124ae788184973bfc6.png', 
      color: 'bg-teal-900',
      accent: 'text-teal-600',
      sections: [
        {
            title: "Strolling Magic",
            body: "Perfect for cocktail hours and receptions. Magic Brent mingles with your guests, performing intimate, close-up miracles right in their hands. It's the perfect ice-breaker that gets people talking and laughing immediately.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2lhbiUyMGNhcmQlMjB0cmlja3xlbnwxfHx8fDE3NzAzNzYwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
            reverse: false,
            bullets: ["Interactive & Personal", "Great Ice Breaker", "No Setup Required"]
        },
        {
            title: "Comedy Stage Show",
            body: "A high-energy 30-60 minute show that combines astonishing illusions with side-splitting comedy. Brenton invites audience members on stage to become the stars of the show. It's clean, corporate-friendly, and guaranteed to leave your guests wondering 'How did he do that?' while wiping tears of laughter from their eyes.",
            image: "figma:asset/be7b6e1191f7f1fa1b41afb8e3162781d96fe5c8.png", 
            reverse: true,
            bullets: ["Full Stage Production", "Audience Participation", "Clean Comedy"]
        }
      ],
      features: [
        { title: "Children's Magic", desc: "Interactive 30-minute magic show where kids are the stars. Live bunny, magic cookies, and tons of laughs.", icon: Sparkles },
        { title: "Grand Illusions", desc: "For larger venues, we bring the big guns. Levitation, sawing in half (safely!), and appearances.", icon: Star }
      ]
    },
    'gameshow': {
      title: 'Gameshow Fanatics',
      subtitle: 'Game Show Nite Gets People On The Edges Of Their Seats!',
      description: 'Gameshow Fanatics is a production company specializing in interactive Game Show experiences for events of all sizes in Hawaii. Based on Maui, we bring our full-scale production anywhere on the island, and have options for events on Oahu, Kauai and Hawaii Big Island. Professionally hosted and highly engaging, Gameshow Fanatics delivers personalized, impactful entertainment.',
      img: imgGameshowHero, 
      color: 'bg-blue-900',
      accent: 'text-blue-600',
      sections: [
        {
          title: "Game Show Nite!",
          body: "The idea is simple. We re-created the Family Feud, and then some. We have a professional set with all the bells & whistles. We've got the answers 'flipping' with the DING! just like in the show years ago! Lighting... check! Sound... check! A quick draw, one-liner Game Show Host throwback wearing a hideous wig... check!",
          image: imgGameShowNiteBanner,
          reverse: false,
          bullets: [
             "Custom questions for party or event",
             "Full-size gameshow set & Lighting setup",
             "Comic Host & Prize girl on roller skates",
             "Sound system w/ mics, speakers, effects",
             "Electronic buzzers & Prizes"
          ]
        },
        {
          title: "Game Show Lite",
          body: "Game Show Lite is a totally mobile, scaled-down version of the show and easy to add to any event. Our Face-Off Podium 2.0 not only lights up, it delivers fabulous Game Show sounds too! Utilizing wheels and battery-power with a built-in microphone, the prop itself is an energetic fireball. Perfect for impromptu roaming game shows!",
          image: imgLitePodiumDetail,
          reverse: true,
          bullets: [
              "Mobile Podium & Props",
              "Wandering game host",
              "Portable prize girl",
              "Same comedy gold"
          ]
        },
        {
            title: "Gameshow Wedding Parties",
            body: "Great, you're getting married! Let's kick off the new family with a good 'ole fashion feud. Gameshow Fanatics brings the madcap antics of the classic Family Feud game show to your family and friends. The questions are personalized to the lucky couple, engaging the guests in a riotous game of who knows who better. Whether pre, during, or post-wedding, Gameshow Fanatics is there to turn up the good times.",
            image: imgWeddingHero,
            reverse: false,
            bullets: [
                "How long have the couple been together?",
                "Where did the the couple first meet?",
                "What is his/her favourite hobby?",
                "Who snores louder?",
                "Who is the messiest one?"
            ]
        },
        {
            title: "Survey Says: You Need A DJ",
            body: "If you want people to stick around and dance after your Game Show, we've got you covered. We've already set up a Top-Notch Professional Sound System, and fortunately, your Host just happens to be an adept DJ. Voted best Best Comedian on Maui by the readers of Maui Time Weekly 2019, Brenton keeps the good times rolling after the show and will have you embarrassing yourself on the dance floor with those moves you thought were so cool in college.",
            image: imgDjService,
            reverse: false
        }
      ],
      team: [
        {
            name: "Brenton Keith",
            role: "The Charming Game Show Host",
            bio: "Truth is your game show host is a professional comedy-magician first. (magicbrent.com) Having over 25 years of stage time, he realized the crowd wants more of their friends & peers in the spotlight. Give this guy a wig and a microphone, and buckle up. He takes fun & games...seriously.",
            image: imgBrentonHost
        },
        {
            name: "Jolie Strickland",
            role: "The Lovely Prize Girl",
            bio: "Our lovely prize girl is none other than Maui's own Cirque Jolie. Jolie has been delighting Maui audiences since 2003 when she did her first event as \"Jolie the Clown.\" Starting out with magic, face painting and balloon twisting, her skills expanded to include stilt walking and fire dancing, and Cirque Jolie was born! She is thrilled to add \"prize girl\" to her ever-growing list of skills.",
            image: imgJoliePrize
        }
      ],
      faqs: [
        { 
            q: "How much space do we need?", 
            a: "Our ideal footprint is 30' wide by 18' deep, but keep in mind that's not including the audience. We can adjust our set to fit in smaller spaces if need be, but we'll have to see photos or scout it out first.",
            icon: Maximize
        }
      ],
      testimonials: [
        { text: "Brenton is a complete natural and knows how to keep the audience on their toes and entertained! Gameshow Fanatics are fantastic to work with.", author: "Josh Desilva", role: "Desilva Meeting Consultants" },
        { text: "Absolutely hilarious!", author: "Bryant Neal", role: "Executive Director, Arts & Education for Children Group" },
        { text: "As an event organizer, I LOVED IT - we didn't have to do anything in preparation! It was a FRESH & FUN CHANGE for a team-building social event.", author: "Jennifer Rappenecker", role: "Regional Leader, Edward Jones" }
      ],
      clientsImage: imgClientsGrid
    },
    'casino': {
      title: 'Casino Night',
      subtitle: 'Las Vegas Style Excitement in Hawaii',
      description: 'Bring the thrill of the Las Vegas strip to your next event! We provide authentic casino tables, professional dealers, and a high-energy atmosphere that will have your guests cheering. From Blackjack to Roulette, we create a fun, risk-free environment where everyone is a high roller.',
      img: imgCasinoGroup, // Using the group image as hero
      color: 'bg-red-900',
      accent: 'text-red-600',
      sections: [
        {
          title: "Authentic Tables",
          body: "We don't use card tables with felt thrown over them. We use real, heavy-duty casino tables with padded rails, deep beverage holders, and professional layouts. The look and feel is 100% authentic, creating an immersive experience for your guests.",
          image: imgCasinoNight,
          reverse: false,
          bullets: [
              "Blackjack",
              "Craps",
              "Roulette",
              "Texas Hold'em Poker"
          ]
        },
        {
          title: "Professional Dealers",
          body: "Our dealers aren't just card shufflers; they are entertainers. They are friendly, patient, and happy to teach novice players the rules of the games. They keep the energy high and ensure everyone is having a great time, win or lose.",
          image: imgRoulette,
          reverse: true,
          bullets: [
              "Experienced & Friendly",
              "Teaching available for beginners",
              "Formal attire options"
          ]
        },
        {
          title: "Tournaments & Fundraisers",
          body: "Want to raise the stakes? We can organize full-scale Poker Tournaments for your corporate group or charity fundraiser. We handle the blinds, the buy-ins (play money!), and the tournament structure so you can focus on your poker face.",
          image: imgCasinoChips,
          reverse: false,
          bullets: [
              "Structured Tournaments",
              "Charity Fundraising events",
              "Prizes for chip leaders"
          ]
        }
      ],
      features: [
        { title: "Risk-Free Fun", desc: "All games are played with 'funny money' or chips with no cash value, making it legal and fun for all ages.", icon: Sparkles },
        { title: "Full Production", desc: "We bring the lights, the sound, and the action to transform any venue into a casino floor.", icon: Music }
      ]
    },
    'kids-circus': {
      title: 'Cirque Jolie',
      subtitle: 'Children\'s & All-Age Entertainment',
      description: 'Entertainers based on the island of Maui & willing to travel to outer island events. We feature stilt walkers, jugglers, face painting, balloon decor, and interactive hula hoop shows. Our performers bring color, joy, and spectacle to any event.',
      img: 'figma:asset/3c9be9ef73fc66abe4a14bc8212a5e7646bb489c.png',
      color: 'bg-pink-700',
      accent: 'text-pink-600',
      sections: [
        {
           title: "Stilt Walking",
           body: "Stilt walking captures the imagination and inspires awe from children and adults alike. It's breathtaking and exciting to see a 9-foot tall creature stroll into sight. Cirque Jolie stilt walkers can match costumes to fit any theme! This is something unique you can do to give your event that extra pizzazz.",
           image: imgStiltWalkers,
           reverse: false
        },
        {
           title: "Balloon Twisting & Decor",
           body: "Balloons immediately create a colorful and festive ambiance. We do poodles and wiener dogs, but also SO much more. Now offering BALLOON DELIVERY: large custom balloon creations, candy cups, and Bag O' Balloons. Also available: 'Balloons of Aloha' charitable delivery.",
           image: imgBalloonArch,
           reverse: true
        },
        {
           title: "Face Painting",
           body: "Have you ever wanted to be a dragon or a ninja turtle? A mermaid or a unicorn? Our friendly Maui Face Painters can make those dreams come true. Each child (or child at heart) feels special after the transformation. We also offer body art, henna, and airbrush tattoos for older crowds.",
           image: imgClown,
           reverse: false
        },
        {
           title: "Fire Dancing & All-Age",
           body: "Cirque Jolie is not just for the kids! We do weddings, graduation parties, and corporate events. Fire-dancers, stilt-walkers, jugglers and strolling characters can add an exciting edge to your event.",
           image: imgFireDancer,
           reverse: true
        }
      ]
    },
    'corporate': {
      title: 'Corporate Events',
      subtitle: 'Professional, Scalable, Unforgettable',
      description: 'Elevate your brand with entertainment that means business. We specialize in galas, product launches, and team-building events that leave a lasting impression on your clients and employees. From high-end magic to casino nights, we have the perfect fit for your corporate culture.',
      img: 'figma:asset/be7b6e1191f7f1fa1b41afb8e3162781d96fe5c8.png', 
      color: 'bg-slate-800',
      accent: 'text-yellow-600',
      sections: [
        {
          title: "Gala Productions",
          body: "When it's time to celebrate success, we provide the entertainment that matches the occasion. Our full-scale productions including stage shows, emcees, and live music ensure your awards dinner or holiday party is the talk of the industry.",
          image: imgCorporateGala,
          reverse: false,
          bullets: ["Professional Emcees", "Stage Management", "Seamless Flow"]
        },
        {
          title: "Team Building",
          body: "Break the ice and build camaraderie with our interactive game shows and challenges. We get your team working together, laughing together, and competing in a fun, low-pressure environment.",
          image: imgTeamBuilding,
          reverse: true,
          bullets: ["Interactive Games", "Customized Content", "Boosts Morale"]
        },
        {
          title: "Holiday Parties",
          body: "End the year on a high note. We offer a variety of packages from strolling magic and cocktail hour entertainment to full casino nights that give your employees a night to remember.",
          image: imgCasinoGroup,
          reverse: false
        }
      ],
      features: [
        { title: "Scalable Solutions", desc: "From intimate board dinners to 500-person conventions, we have the right entertainment fit.", icon: Users },
        { title: "Brand Integration", desc: "We can customize our shows and games to include your company branding and messaging.", icon: Briefcase }
      ]
    }
  };

  const data = serviceId ? services[serviceId] : services['magic'];

  if (!data) return <div className="p-20 text-center">Service not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Wipe Transition */}
      <PageTransition />

      {/* NEW HERO SECTION: 3D Umbrella Effect */}
      <div className="relative min-h-[90vh] flex flex-col items-center pt-0 overflow-hidden">
        
        {/* Dynamic Background */}
        <div className={`absolute inset-0 opacity-10 bg-gradient-radial from-${data.accent.split('-')[1]}-300 to-transparent`} />
        
        {/* Umbrella - Pinned to top */}
         <div 
          className="absolute top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
             <div className="pointer-events-auto transform scale-90 origin-top md:scale-110 drop-shadow-2xl translate-y-[-10%]">
                  <UmbrellaNav />
             </div>
        </div>

        {/* Rain Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply">
            <RainEffect intensity={0.5} />
        </div>

        <Link to="/" className="absolute top-8 left-8 z-[60] inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors group">
            <div className="bg-white p-2 rounded-full mr-3 shadow-md group-hover:shadow-lg transition-all">
                 <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-semibold tracking-wide uppercase text-sm">Back</span>
        </Link>

        {/* CONTENT CONTAINER - Shifted Up to Overlap Umbrella */}
        {/* Using Masking to simulate "Inside" effect */}
        <div 
            className="container mx-auto px-6 relative z-40 flex flex-col items-center text-center mt-[15vh]"
            style={{
                // MASK: Hides the top part of the content with a radial gradient matching umbrella shape roughly
                // transparent at top -> visible at bottom
                maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 25%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 25%, black 100%)'
            }}
        >
            
            {/* Title Block */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-0 relative z-20 pt-20"
            >
                <h2 className={`text-xl font-bold uppercase tracking-[0.3em] mb-4 ${data.accent}`}>{data.subtitle}</h2>
                <h1 className="text-6xl md:text-9xl font-display font-black text-slate-900 tracking-tighter leading-none mb-4 drop-shadow-sm">
                    {data.title}
                </h1>
            </motion.div>

            {/* Character Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 w-full max-w-2xl mt-[-20px] md:mt-[-40px]"
            >
                {/* Ground Shadow */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-[40px] bg-black/20 blur-2xl rounded-[100%]" />
                
                <img 
                    src={data.img} 
                    alt={data.title} 
                    className="relative w-full h-auto drop-shadow-2xl object-contain max-h-[60vh]"
                />
            </motion.div>

        </div>

      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
                <div className="prose prose-xl max-w-none text-slate-600 font-light">
                    <ScrollSection>
                        <p className="text-3xl leading-relaxed text-slate-800 mb-12 border-l-4 border-slate-900 pl-8 font-display font-medium">
                            {data.description}
                        </p>
                    </ScrollSection>

                    {/* Dynamic Sub-Sections */}
                    {data.sections && (
                        <div className="space-y-32 mt-20">
                            {data.sections.map((section: any, idx: number) => (
                                <ScrollSection key={idx}>
                                    <div className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                                        <div className="flex-1">
                                            <h3 className="text-4xl font-display font-black text-slate-900 mb-6 tracking-tight">{section.title}</h3>
                                            <p className="text-lg leading-relaxed mb-8">{section.body}</p>
                                            
                                            {/* Render bullets if they exist */}
                                            {section.bullets && (
                                                <ul className="space-y-3">
                                                    {section.bullets.map((bullet: string, bIdx: number) => (
                                                        <li key={bIdx} className="flex items-start text-slate-700 font-medium">
                                                            <CheckCircle className={`w-6 h-6 mr-4 flex-shrink-0 ${data.accent}`} />
                                                            <span>{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <div className="relative group">
                                                <div className={`absolute inset-0 ${data.accent.replace('text-', 'bg-')} opacity-20 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500`} />
                                                <img src={section.image} alt={section.title} className="relative rounded-3xl shadow-2xl w-full object-cover hover:scale-[1.01] transition-transform duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                </ScrollSection>
                            ))}
                        </div>
                    )}
                    
                    {/* Team Section */}
                    {data.team && (
                        <div className="mt-32">
                            <ScrollSection>
                                <h3 className="text-4xl font-display font-black text-center mb-16">Meet The Cast</h3>
                            </ScrollSection>
                            <div className="space-y-16">
                                {data.team.map((member: any, idx: number) => (
                                    <ScrollSection key={idx}>
                                        <div className="flex flex-col md:flex-row gap-8 items-start bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-shadow duration-500">
                                            <div className="w-full md:w-56 h-64 flex-shrink-0 overflow-hidden rounded-2xl">
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div>
                                                <h4 className="text-3xl font-display font-bold text-slate-900 uppercase mb-2">{member.name}</h4>
                                                <h5 className={`text-sm font-bold uppercase tracking-widest mb-6 ${data.accent}`}>{member.role}</h5>
                                                <p className="text-slate-600 leading-relaxed text-lg">{member.bio}</p>
                                            </div>
                                        </div>
                                    </ScrollSection>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ Section */}
                    {data.faqs && (
                        <ScrollSection>
                            <div className="mt-32 bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
                                {/* Decorative Question Marks Background */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none font-display font-black text-9xl text-white select-none overflow-hidden">
                                    <div className="absolute top-0 left-0 rotate-12">?</div>
                                    <div className="absolute bottom-0 right-10 -rotate-12">?</div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] opacity-20">?</div>
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-12 mb-16 items-start">
                                    <div className="flex-1">
                                        <h3 className="text-4xl font-display font-black mb-6">Frequently Asked Questions</h3>
                                        <p className="text-slate-300 text-lg">Everything you need to know about setting up the perfect event.</p>
                                    </div>
                                    <div className="w-full md:w-64 flex-shrink-0 rotate-3 bg-white p-3 shadow-2xl rounded-xl transform hover:rotate-0 transition-transform duration-500">
                                        <img src={imgFaqBanner} alt="FAQ Banner" className="w-full rounded-lg" />
                                    </div>
                                </div>
                                
                                <div className="space-y-6 relative z-10">
                                    {data.faqs.map((faq: any, idx: number) => (
                                        <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-colors">
                                            <button 
                                                onClick={() => toggleFaq(idx)}
                                                className="w-full text-left p-8 flex items-start justify-between font-bold text-white transition-colors"
                                            >
                                                <div className="flex items-center gap-6">
                                                    {faq.icon && <faq.icon className={`w-6 h-6 flex-shrink-0 ${data.accent}`} />}
                                                    <span className="uppercase text-sm tracking-widest">{faq.q}</span>
                                                </div>
                                                {openFaq === idx ? <ChevronUp className="w-6 h-6 text-white/50 mt-1" /> : <ChevronDown className="w-6 h-6 text-white/50 mt-1" />}
                                            </button>
                                            
                                            <motion.div 
                                                initial={false}
                                                animate={{ height: openFaq === idx ? "auto" : 0, opacity: openFaq === idx ? 1 : 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-8 pt-0 text-slate-300 leading-relaxed border-t border-white/10 pl-20 text-lg">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollSection>
                    )}

                    {/* Testimonials Section */}
                    {data.testimonials && (
                        <div className="mt-32">
                            <ScrollSection>
                                <h3 className="text-4xl font-display font-black text-center mb-16">Testimonials</h3>
                            </ScrollSection>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {data.testimonials.map((t: any, i: number) => (
                                    <ScrollSection key={i}>
                                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 h-full flex flex-col relative overflow-hidden">
                                            <div className={`absolute top-0 left-0 w-full h-2 ${data.color}`} />
                                            <Quote className={`w-10 h-10 mb-6 ${data.accent}`} />
                                            <p className="text-slate-700 italic mb-8 text-lg leading-relaxed flex-1">"{t.text}"</p>
                                            <div className="pt-6 border-t border-slate-100">
                                                <p className="font-bold text-slate-900 text-lg">{t.author}</p>
                                                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">{t.role}</p>
                                            </div>
                                        </div>
                                    </ScrollSection>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Clients Section */}
                    {data.clientsImage && (
                        <ScrollSection>
                            <div className="mt-24">
                                 <h3 className="text-3xl font-display font-bold text-center mb-12 text-slate-400 uppercase tracking-widest">Our Happy Clients</h3>
                                 <img src={data.clientsImage} alt="Our Clients" className="w-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
                            </div>
                        </ScrollSection>
                    )}
                    
                </div>
            </div>

            {/* Sidebar / CTA */}
            <div className="lg:col-span-1">
                <div className="bg-white p-8 rounded-3xl shadow-2xl sticky top-8 border border-slate-100 overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-3 ${data.color}`} />
                    <h3 className="text-3xl font-display font-black mb-2 mt-4">Book Now</h3>
                    <p className="text-slate-500 mb-8">Ready to create an unforgettable event?</p>
                    
                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Name</label>
                            <input type="text" placeholder="First & Last Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Email</label>
                            <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Event Type</label>
                            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all text-slate-600">
                                <option>Corporate Event</option>
                                <option>Wedding</option>
                                <option>Birthday Party</option>
                                <option>Fundraiser</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Message</label>
                            <textarea rows={4} placeholder="Tell us about your event..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all"></textarea>
                        </div>
                        <button className={`w-full py-4 rounded-xl text-white font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg ${data.color}`}>
                            Send Request
                        </button>
                    </form>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100 text-center text-slate-500 text-sm">
                        <p>Or call us directly at</p>
                        <a href="tel:808-874-2591" className="text-slate-900 font-bold text-lg hover:underline">(808) 874-2591</a>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
