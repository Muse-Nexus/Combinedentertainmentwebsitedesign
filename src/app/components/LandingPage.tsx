import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, AnimatePresence, useMotionValueEvent } from 'motion/react';
import { RainEffect } from './RainEffect';
import { UmbrellaNav } from './UmbrellaNav';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from 'figma:asset/d9c1966853c8781ad896bb5eaa3341c81158cebf.png'; 
import logo from 'figma:asset/d014f5138d817a3579192f9a8fe97bd75cf23bdd.png';

// Assets
import magicImg from 'figma:asset/be7b6e1191f7f1fa1b41afb8e3162781d96fe5c8.png';
import circusImg from 'figma:asset/3c9be9ef73fc66abe4a14bc8212a5e7646bb489c.png';
import gameshowImg from 'figma:asset/b587c1e163734b07d9864abf0c7580ed29a6a47f.png';
import cloudTexture from 'figma:asset/a4d5b9382b0fb1113c06693396a4b58d8adf4b36.png';

// --- SUB-COMPONENTS ---

const LightningFlash = ({ active }: { active: boolean }) => {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (!active) {
      setOpacity(0);
      return;
    }
    const triggerFlash = () => {
      if (!active) return;
      setOpacity(Math.random() * 0.3 + 0.1); 
      setTimeout(() => setOpacity(0), 50 + Math.random() * 100);
      const nextDelay = 3000 + Math.random() * 8000;
      setTimeout(triggerFlash, nextDelay);
    };
    const timer = setTimeout(triggerFlash, 1000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div 
      className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-soft-light"
      style={{ opacity, transition: 'opacity 0.1s ease-out' }}
    />
  );
};

const Rainbow = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
      transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
      className="absolute inset-0 pointer-events-none z-[45] flex items-end justify-center"
    >
      <div 
        className="w-[160vw] h-[160vw] rounded-full translate-y-[35%]"
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 58%,
              rgba(148, 0, 211, 0.6) 58.5%,
              rgba(75, 0, 130, 0.6) 59.5%,
              rgba(0, 0, 255, 0.6) 60.5%,
              rgba(0, 255, 0, 0.6) 61.5%,
              rgba(255, 255, 0, 0.6) 62.5%,
              rgba(255, 127, 0, 0.6) 63.5%,
              rgba(255, 0, 0, 0.6) 64.5%,
              transparent 65%
            )
          `,
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 60%)'
        }}
      />
    </motion.div>
  );
};

const Sun = ({ active }: { active: boolean }) => {
  return (
    <motion.div
      initial={{ y: '50vh', x: '10vw', opacity: 0 }}
      animate={{ 
        y: active ? '5vh' : '50vh', 
        x: active ? '0vw' : '10vw',
        opacity: active ? 1 : 0 
      }}
      transition={{ duration: 3, type: "spring", bounce: 0.2, delay: 0.5 }}
      className="absolute right-[5%] top-[5%] w-64 h-64 z-[46] pointer-events-none"
    >
        <div className="w-40 h-40 bg-yellow-300 rounded-full blur-md shadow-[0_0_80px_rgba(255,200,0,0.8)] relative z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-radial from-yellow-200/40 to-transparent blur-2xl z-0 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-2 bg-yellow-100/20 blur-sm rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-2 bg-yellow-100/20 blur-sm -rotate-45" />
    </motion.div>
  );
};

// Cloud Crossing Component - Single "Film Wipe"
const Clouds = ({ scrollProgress }: { scrollProgress: any }) => {
  
  // Opacity: Fades out aggressively at the end to clear
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.7, 0.95], [0, 1, 1, 0]);

  // Horizontal Movement (Wipe Left to Right)
  // Single massive bank moving from far left (-200%) to far right (200%)
  const wipeX = useTransform(
      scrollProgress, 
      [0, 1], 
      ["-200%", "200%"]
  );
  
  const scale = useTransform(scrollProgress, [0.1, 0.5, 0.9], [1, 1.2, 1]);

  // Feathering Mask - Extremely Soft
  // Using radial-gradient from black at 0% to transparent at 80% creates a very large soft edge
  const featherMask = {
    maskImage: 'radial-gradient(closest-side, black 0%, transparent 80%)',
    WebkitMaskImage: 'radial-gradient(closest-side, black 0%, transparent 80%)'
  };

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 z-[150] pointer-events-none flex items-center justify-center overflow-hidden">
       
       {/* Single Massive Cloud Bank (Wiping Left -> Right) */}
       <motion.div 
          style={{ x: wipeX, scale }}
          className="absolute top-0 bottom-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center"
       >
          <div className="absolute inset-0 w-full h-full mix-blend-screen flex items-center justify-center">
             
             {/* Center Main Cloud */}
             <img 
                src={cloudTexture} 
                className="absolute w-[180%] h-auto max-w-none opacity-100 object-contain rotate-12 scale-125" 
                alt="cloud-main" 
                style={featherMask}
             />
             
             {/* Supporting Clouds to fill gaps and create "wall" effect */}
             <img 
                src={cloudTexture} 
                className="absolute left-[-40%] top-[-20%] w-[140%] h-auto max-w-none opacity-80 object-contain -rotate-12" 
                alt="cloud-top-left" 
                style={featherMask}
             />
             <img 
                src={cloudTexture} 
                className="absolute left-[-30%] bottom-[-20%] w-[150%] h-auto max-w-none opacity-70 object-contain rotate-6" 
                alt="cloud-bottom-left" 
                style={featherMask}
             />
             
             {/* Trailing Clouds */}
             <img 
                src={cloudTexture} 
                className="absolute right-[-20%] top-[10%] w-[120%] h-auto max-w-none opacity-60 object-contain -rotate-6" 
                alt="cloud-trail" 
                style={featherMask}
             />
          </div>
       </motion.div>

    </motion.div>
  );
};

const ServiceCard = ({ id, title, img, color, delay, isLanded }: any) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, y: 150, opacity: 0 }}
      animate={isLanded ? { scale: 1, y: 0, opacity: 1 } : { scale: 0.8, y: 150, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 70,
        damping: 20,
        delay: delay 
      }}
      className="group relative flex flex-col h-[500px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-2xl origin-bottom"
    >
      <Link to={`/service/${id}`} className="block w-full h-full">
        <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-90 transition-opacity duration-500 z-10 mix-blend-multiply`} />
        <img 
          src={img} 
          alt={title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
           <h3 className="text-4xl font-display font-black text-white mb-2 uppercase tracking-tighter leading-none">
             {title}
           </h3>
           <div className="h-1 w-12 bg-white rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
           <p className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
             Explore Service &rarr;
           </p>
        </div>
      </Link>
    </motion.div>
  );
};


export const LandingPage = () => {
  const { scrollY } = useScroll();
  const [isMiracle, setIsMiracle] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [scrollVal, setScrollVal] = useState(0);

  // --- SCROLL TIMELINE ---
  
  const STORM_END = 1500;
  const MIRACLE_END = 2500;
  const TRANSITION_END = 4500;
  
  // Extra buffer prevents the "end of page" from blocking the animation completion
  const TOTAL_SCROLL_HEIGHT = TRANSITION_END + 1500; 

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollVal(latest);

    // UMBRELLA/MIRACLE STATE
    if (latest > STORM_END && !isMiracle) {
      setIsMiracle(true);
    } else if (latest < STORM_END && isMiracle) {
      setIsMiracle(false);
    }

    // LANDED STATE
    // Trigger when clouds are 40% through crossing (earlier reveal)
    const triggerPoint = MIRACLE_END + ((TRANSITION_END - MIRACLE_END) * 0.4);
    
    if (latest > triggerPoint && !isLanded) {
        setIsLanded(true);
    } else if (latest < triggerPoint && isLanded) {
        setIsLanded(false);
    }
  });

  const stormRaw = useTransform(scrollY, [0, STORM_END], [0, 1], { clamp: true });
  const stormProgress = useSpring(stormRaw, { stiffness: 45, damping: 20 });

  const cloudProgress = useTransform(
    scrollY, 
    [MIRACLE_END, TRANSITION_END], 
    [0, 1],
    { clamp: true }
  );

  const umbrellaTop = useTransform(stormProgress, [0, 1], ["100vh", "-9vh"]); 
  const umbrellaScale = useTransform(stormProgress, [0, 1], [1, 1.05]);
  const umbrellaOpacity = useTransform(cloudProgress, [0.3, 0.4], [1, 0]);

  const maskLine = useMotionTemplate`calc(${umbrellaTop} + 12vh)`;
  const maskImage = useMotionTemplate`linear-gradient(to bottom, black ${maskLine}, transparent calc(${maskLine} + 50px))`;
  const logoOpacity = useTransform(scrollY, [0, STORM_END * 0.3], [1, 0]);
  const skyOpacity = useTransform(cloudProgress, [0.4, 0.5], [1, 0]);
  
  // Logic for switching from fixed to absolute ground
  const isFixedGround = scrollVal < TRANSITION_END;

  return (
    <div className="relative bg-slate-950 font-sans min-h-screen">
      
      {/* --- FIXED NAV --- */}
      <motion.div
            style={{ 
              top: umbrellaTop,
              scale: umbrellaScale,
              opacity: umbrellaOpacity,
              position: 'fixed',
              left: 0,
              right: 0,
              zIndex: 100 
            }}
            className="flex justify-center pointer-events-none origin-top" 
        >
            <div className="relative pointer-events-auto drop-shadow-2xl">
               <UmbrellaNav />
               <AnimatePresence>
                 {isMiracle && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0.6 }}
                      exit={{ opacity: 0, duration: 0.5 }}
                      transition={{ 
                         duration: 2, 
                         repeat: Infinity, 
                         repeatType: "reverse" 
                      }}
                      className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] -z-10 pointer-events-none"
                    >
                       <div className="w-full h-full rounded-full bg-white blur-[80px]" />
                       <div className="absolute inset-0 w-full h-full rounded-full bg-amber-200 blur-[100px] mix-blend-screen" />
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>
      </motion.div>

      {/* --- SKY SCENE --- */}
      <motion.div 
        style={{ opacity: skyOpacity }}
        className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none bg-black z-20"
      >
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-slate-900 z-0" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-sky-400 to-blue-200 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMiracle ? 1 : 0 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className={`absolute inset-0 scale-110 transition-all duration-2000 ${isMiracle ? 'opacity-30 blur-3xl' : 'opacity-50 blur-2xl'}`}>
              <img src={heroImg} className="w-full h-full object-cover" alt="Background Blur" />
           </div>
        </div>

        {/* STORM */}
        <motion.div 
           className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000"
           animate={{ opacity: isMiracle ? 0 : 1 }}
        >
            <RainEffect intensity={2.0} /> 
        </motion.div>

        {/* HERO IMAGE */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
            <motion.div 
              className="relative w-full max-w-5xl aspect-[16/10] shadow-2xl overflow-hidden rounded-sm bg-black"
              initial={{ scale: 1 }}
              animate={{ 
                scale: isMiracle ? 1.02 : 1,
                boxShadow: isMiracle ? '0 0 100px rgba(255,200,100,0.5)' : '0 0 50px rgba(0,0,0,0.5)'
              }}
              transition={{ duration: 2 }}
            >
               <motion.img 
                 src={heroImg} 
                 className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
                 style={{ filter: isMiracle ? 'brightness(1.15) saturate(1.2)' : 'brightness(1)' }}
                 alt="Sunny Hero"
               />
               <motion.div 
                  className="absolute inset-0 z-20"
                  style={{ maskImage, WebkitMaskImage: maskImage }}
                  animate={{ opacity: isMiracle ? 0 : 1 }}
                  transition={{ duration: 1 }}
               >
                  <img 
                     src={heroImg} 
                     className="w-full h-full object-cover grayscale brightness-90 contrast-125" 
                     alt="Storm Hero" 
                  />
                  <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                  <RainEffect intensity={4.0} />
               </motion.div>
               <AnimatePresence>
                 {isMiracle && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: [0, 0.8, 0] }}
                     transition={{ duration: 1, times: [0, 0.1, 1] }}
                     className="absolute inset-0 bg-white z-50 mix-blend-hard-light"
                   />
                 )}
               </AnimatePresence>
               <div className="absolute inset-0 border border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none z-30" />
            </motion.div>
        </div>

        {/* MIRACLE ELEMENTS */}
        <Rainbow active={isMiracle} />
        <Sun active={isMiracle} />

        <div className="absolute inset-0 z-30 pointer-events-none">
             <LightningFlash active={!isMiracle} />
        </div>

        {/* HERO TEXT */}
        <motion.div 
            style={{ opacity: logoOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
        >
             <img 
                src={logo} 
                alt="Raining Entertainment" 
                className="w-64 mb-6 drop-shadow-2xl" 
             />
             <h1 className="text-5xl md:text-7xl font-display font-black text-white/90 tracking-tight drop-shadow-2xl text-center px-4">
                <span className="block text-2xl font-sans font-normal tracking-widest mb-2 opacity-70">WAIT FOR THE</span>
                STORM TO PASS
             </h1>
             <div className="mt-12 animate-bounce opacity-50">
                <ArrowDown className="w-8 h-8 text-white" />
             </div>
        </motion.div>

      </motion.div>
      
      {/* CLOUD TRANSITION OVERLAY */}
      <Clouds scrollProgress={cloudProgress} />

      {/* --- SCROLL TRACK SPACER --- */}
      <div style={{ height: TOTAL_SCROLL_HEIGHT }} className="w-full pointer-events-none relative z-[-1]" />

      {/* --- GROUND CONTENT --- */}
      <div 
         className="w-full z-10"
         style={{
             position: isFixedGround ? 'fixed' : 'absolute',
             top: isFixedGround ? 0 : TRANSITION_END,
             left: 0,
             right: 0
         }}
      >
         <div 
           className="min-h-screen bg-gradient-to-b from-[#e6e9f0] to-[#eef1f5]"
         >
            <div className="container mx-auto px-4 pt-32 pb-24">
                
                {/* Intro Text */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={isLanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-center max-w-4xl mx-auto mb-24"
                >
                  <h2 className="text-5xl md:text-7xl font-display font-black mb-8 text-slate-900 uppercase tracking-tighter leading-tight">
                    We Bring The <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Sunshine</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light">
                    Merging <strong>Magic Brent</strong>, <strong>Cirque Jolie</strong>, and <strong>Gameshow Fanatics</strong> into one spectacular experience.
                    From intimate gatherings to massive corporate galas, we have you covered.
                  </p>
                </motion.div>
                
                {/* 3 GROWING CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                   <ServiceCard 
                      id="magic"
                      title="Magic Brent"
                      img={magicImg}
                      color="bg-red-600"
                      delay={0.6}
                      isLanded={isLanded}
                   />
                   <ServiceCard 
                      id="kids-circus"
                      title="Cirque Jolie"
                      img={circusImg}
                      color="bg-pink-600"
                      delay={0.8}
                      isLanded={isLanded}
                   />
                   <ServiceCard 
                      id="gameshow"
                      title="Game Show"
                      img={gameshowImg}
                      color="bg-blue-600"
                      delay={1.0}
                      isLanded={isLanded}
                   />
                </div>
                
                <div className="mt-32 text-center">
                    <button className="bg-slate-900 text-white font-bold py-4 px-12 rounded-full hover:bg-slate-800 transition-all hover:scale-105 shadow-xl">
                        Start Planning Your Event
                    </button>
                    <div className="mt-12 text-slate-400">
                      &copy; {new Date().getFullYear()} Raining Entertainment
                    </div>
                </div>

            </div>
         </div>
      </div>
    </div>
  );
};
