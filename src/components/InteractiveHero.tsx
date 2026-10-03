import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { ArrowDown, ArrowUpRight, Eye, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import { HERO_ASSETS, PROFILE_INFO } from '../data/portfolioData';

interface InteractiveHeroProps {
  onOpenBooking: () => void;
  onExploreGallery: () => void;
}

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({ onOpenBooking, onExploreGallery }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const maskId = useId().replace(/:/g, ''); // unique valid SVG mask ID

  // Position of the fluid water wave center
  const [fluidPos, setFluidPos] = useState({ x: 240, y: 140 });
  const [targetPos, setTargetPos] = useState({ x: 240, y: 140 });
  const [blobPath, setBlobPath] = useState<string>('');
  
  // Motion blur dynamic vectors
  const [motionBlur, setMotionBlur] = useState({ x: 26, y: 24, speed: 0 });

  // Subtle magnetic parallax state
  const [parallax, setParallax] = useState({ shiftX: 0, shiftY: 0, rotX: 0, rotY: 0 });
  const targetParallaxRef = useRef({ shiftX: 0, shiftY: 0, rotX: 0, rotY: 0 });
  
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [forceReveal, setForceReveal] = useState<boolean>(false);

  const animTimeRef = useRef<number>(0);
  const reqAnimRef = useRef<number | null>(null);

  // Generate organic, irregular morphing fluid water wave path with dynamic motion elongation
  const createOrganicWaterBlob = (cx: number, cy: number, time: number, vx = 0, vy = 0) => {
    const pointsCount = 16;
    const baseRadiusX = 100;
    const baseRadiusY = 78;
    const coords: [number, number][] = [];

    // Velocity stretch: water naturally elongates in the direction of motion
    const speed = Math.hypot(vx, vy);
    const stretchFactor = Math.min(speed * 0.16, 0.45);
    const angleOfMotion = Math.atan2(vy, vx);

    for (let i = 0; i < pointsCount; i++) {
      const angle = (i / pointsCount) * Math.PI * 2;
      
      // Multi-frequency organic water surface ripple harmonics
      const lowWave = Math.sin(time * 1.8 + i * 1.1) * 30 + Math.cos(time * 1.2 + i * 2.3) * 24;
      const midRipple = Math.sin(time * 3.4 + i * 2.7) * 15 + Math.cos(time * 2.1 + i * 0.8) * 11;
      const surfaceTension = Math.sin(time * 5.2 + i * 4.1) * 7;

      const totalDisplacement = lowWave + midRipple + surfaceTension;

      let rx = baseRadiusX + totalDisplacement;
      let ry = baseRadiusY + totalDisplacement * 0.85;

      // Elongate along direction of motion like real moving water
      if (speed > 0.4) {
        const alignment = Math.cos(angle - angleOfMotion);
        rx += alignment * stretchFactor * 35;
        ry += alignment * stretchFactor * 28;
      }

      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle) * ry;
      coords.push([x, y]);
    }

    // Connect points using smooth cubic-bezier / quadratic interpolation
    let d = `M ${coords[0][0]} ${coords[0][1]}`;
    for (let i = 0; i < pointsCount; i++) {
      const p1 = coords[i];
      const p2 = coords[(i + 1) % pointsCount];
      const midX = (p1[0] + p2[0]) / 2;
      const midY = (p1[1] + p2[1]) / 2;
      d += ` Q ${p1[0]} ${p1[1]}, ${midX} ${midY}`;
    }
    d += ' Z';
    return d;
  };

  // Continuous physics, organic animation, and magnetic parallax lerp loop
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;
      animTimeRef.current += 0.022;

      const container = containerRef.current;
      const width = container?.clientWidth || 400;
      const height = container?.clientHeight || 420;

      let currentX = fluidPos.x;
      let currentY = fluidPos.y;

      if (!isManualMode && !isInteractive) {
        // Natural undulating wave trajectory that sweeps across the eyes smoothly
        const centerX = width * 0.5;
        const eyeLevelY = height * 0.28;

        const targetX = centerX + Math.sin(animTimeRef.current * 0.85) * (width * 0.28) + Math.cos(animTimeRef.current * 0.4) * 20;
        const targetY = eyeLevelY + Math.sin(animTimeRef.current * 1.7) * 25 + Math.cos(animTimeRef.current * 0.9) * 12;

        currentX = currentX + (targetX - currentX) * 0.07;
        currentY = currentY + (targetY - currentY) * 0.07;
      } else {
        // Smooth inertia tracking toward pointer
        currentX = currentX + (targetPos.x - currentX) * 0.14;
        currentY = currentY + (targetPos.y - currentY) * 0.14;
      }

      const vx = currentX - fluidPos.x;
      const vy = currentY - fluidPos.y;
      const speed = Math.hypot(vx, vy);

      // Subtle dynamic motion blur based on speed of fluid motion
      const dynamicBlurX = Math.round((26 + Math.min(Math.abs(vx) * 1.6, 12)) * 10) / 10;
      const dynamicBlurY = Math.round((24 + Math.min(Math.abs(vy) * 1.6, 10)) * 10) / 10;
      setMotionBlur({ x: dynamicBlurX, y: dynamicBlurY, speed });

      setFluidPos({ x: currentX, y: currentY });
      setBlobPath(createOrganicWaterBlob(currentX, currentY, animTimeRef.current, vx, vy));

      // Magnetic parallax spring interpolation
      setParallax((prev) => ({
        shiftX: prev.shiftX + (targetParallaxRef.current.shiftX - prev.shiftX) * 0.08,
        shiftY: prev.shiftY + (targetParallaxRef.current.shiftY - prev.shiftY) * 0.08,
        rotX: prev.rotX + (targetParallaxRef.current.rotX - prev.rotX) * 0.08,
        rotY: prev.rotY + (targetParallaxRef.current.rotY - prev.rotY) * 0.08,
      }));

      reqAnimRef.current = requestAnimationFrame(animate);
    };

    reqAnimRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      if (reqAnimRef.current) cancelAnimationFrame(reqAnimRef.current);
    };
  }, [isInteractive, isManualMode, targetPos, fluidPos]);

  // Pointer tracking for fluid water wave inside container
  const updatePointer = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clampedX = Math.max(30, Math.min(rect.width - 30, clientX - rect.left));
    const clampedY = Math.max(30, Math.min(rect.height - 30, clientY - rect.top));
    setTargetPos({ x: clampedX, y: clampedY });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsInteractive(true);
    setIsManualMode(true);
    updatePointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isInteractive || isManualMode) {
      updatePointer(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    setIsInteractive(false);
  };

  // Magnetic parallax mouse tracking across the Hero section
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (e.clientX - centerX) / (window.innerWidth / 2);
    const normY = (e.clientY - centerY) / (window.innerHeight / 2);

    // Subtle, elegant magnetic pull and 3D tilt
    targetParallaxRef.current = {
      shiftX: Math.max(-14, Math.min(14, normX * 12)),
      shiftY: Math.max(-10, Math.min(10, normY * 8)),
      rotX: Math.max(-4.5, Math.min(4.5, -normY * 4)),
      rotY: Math.max(-5.5, Math.min(5.5, normX * 5)),
    };
  };

  const handleHeroMouseLeave = () => {
    targetParallaxRef.current = { shiftX: 0, shiftY: 0, rotX: 0, rotY: 0 };
  };

  return (
    <section 
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-visible"
    >
      {/* Background ambient lighting and purple auroras */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 anamorphic-flare"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-12 left-1/4 w-[650px] h-[480px] bg-gradient-to-tr from-purple-700/25 via-fuchsia-600/15 to-transparent blur-[90px] rounded-full bg-aurora-1" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-36 right-1/4 w-[700px] h-[520px] bg-gradient-to-bl from-violet-600/25 via-purple-500/15 to-transparent blur-[100px] rounded-full bg-aurora-2" 
      />
      
      {/* Multiple Sweeping Moving Laser Light Beams ("cahaya bergerak ditambah") */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-60 left-1/2 -translate-x-1/2 laser-ray-animated"
      />
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-40 left-1/3 laser-ray-animated-2"
      />
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-80 right-1/4 laser-ray-animated-3"
      />
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-48 left-1/2 -translate-x-[40%] laser-ray opacity-50"
      />

      {/* Ghosted Giant 01 Background Watermark matching reference */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute right-4 sm:right-10 lg:right-16 top-14 sm:top-8 font-display font-black text-[180px] sm:text-[260px] lg:text-[340px] text-white/[0.03] select-none leading-none z-0 tracking-tighter"
      >
        01
      </div>

      {/* Main 3-Column Layout: Left = Identitas & Role, Center = Wijaya Portrait, Right = Portfolio Card */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-4 xl:gap-8 mb-16">
        
        {/* ========================================================
            LEFT COLUMN (lg:col-span-4): IDENTITAS & ROLE
            ======================================================== */}
        <div className="lg:col-span-4 flex flex-col items-start text-left order-2 lg:order-1 pr-0 lg:pr-2">
          {/* Top Tag: ■ 01 / IDENTITAS */}
          <div className="flex flex-col items-start mb-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.24em] uppercase text-slate-300">
              <span className="w-2.5 h-2.5 bg-purple-500 inline-block shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
              <span>01 / IDENTITAS</span>
            </div>
            <div className="w-14 sm:w-16 h-[2px] bg-purple-500 mt-2" />
          </div>

          {/* Heading: WEBSITE DEVELOPER */}
          <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-[350] sm:font-light tracking-[-0.015em] text-white leading-[0.98] mb-6">
            WEBSITE<br />
            DEVELOPER
          </h1>

          {/* Quote / Bio matching screenshot */}
          <p className="text-slate-400 text-xs sm:text-sm font-normal leading-relaxed max-w-sm mb-7">
            "Saya membangun website untuk belajar, bereksperimen, dan menyelesaikan masalah nyata."
          </p>

          {/* Stack Teknologi Tag */}
          <div className="flex flex-col items-start font-mono">
            <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-purple-400 font-medium mb-1.5">
              STACK TEKNOLOGI //
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-300">
              REACT · TYPESCRIPT · TAILWIND · NODE.JS
            </span>
          </div>
        </div>

        {/* ========================================================
            CENTER COLUMN (lg:col-span-4): WIJAYA'S INTERACTIVE HERO PORTRAIT
            ======================================================== */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
          {/* Soft atmospheric ambient glow behind the subject with reverse parallax */}
          <div 
            aria-hidden="true"
            style={{
              transform: `translate3d(${-parallax.shiftX * 1.5}px, ${-parallax.shiftY * 1.5}px, 0)`,
              willChange: 'transform',
            }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] bg-gradient-to-b from-purple-600/35 via-violet-700/20 to-transparent blur-3xl rounded-full pointer-events-none transition-transform duration-75 ease-out"
          />

          {/* SVG Definition with Subtle Directional Motion Blur Filter */}
          <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
            <defs>
              <filter id={`fluidMotionBlur_${maskId}`} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation={`${motionBlur.x} ${motionBlur.y}`} />
              </filter>
              
              <mask id={`organicFluidMask_${maskId}`}>
                <rect width="100%" height="100%" fill="black" />
                {forceReveal ? (
                  <rect width="100%" height="100%" fill="white" />
                ) : (
                  <path 
                    d={blobPath} 
                    fill="white" 
                    filter={`url(#fluidMotionBlur_${maskId})`} 
                  />
                )}
              </mask>
            </defs>
          </svg>

          {/* BORDERLESS Subject Container with Magnetic Parallax 3D Tilt */}
          <div 
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseEnter={() => setIsInteractive(true)}
            onMouseLeave={() => setIsInteractive(false)}
            style={{
              transform: `perspective(1000px) translate3d(${parallax.shiftX}px, ${parallax.shiftY}px, 0) rotateX(${parallax.rotX}deg) rotateY(${parallax.rotY}deg)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            className="relative w-[280px] sm:w-[340px] lg:w-[360px] xl:w-[400px] aspect-[260/358] cursor-grab active:cursor-grabbing select-none touch-none transition-transform duration-75 ease-out"
          >
            {/* Base Layer: Portrait WITHOUT glasses - transparent cutout */}
            <img
              src={HERO_ASSETS.portraitClear}
              alt={PROFILE_INFO.name}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none filter contrast-[1.06] saturate-[1.04] drop-shadow-[0_20px_40px_rgba(0,0,0,0.75)]"
            />

            {/* Reveal Layer: Portrait WITH purple sunglasses, masked with dynamic motion blur */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
              style={{
                maskImage: forceReveal ? 'none' : undefined,
                WebkitMaskImage: forceReveal ? 'none' : undefined,
                mask: forceReveal ? 'none' : `url(#organicFluidMask_${maskId})`,
                WebkitMask: forceReveal ? 'none' : `url(#organicFluidMask_${maskId})`,
                filter: motionBlur.speed > 1.2 ? `blur(${Math.min(motionBlur.speed * 0.12, 1)}px)` : 'none',
              }}
            >
              <img
                src={HERO_ASSETS.portraitGlasses}
                alt="Portrait with sunglasses revealed naturally"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none filter brightness-[1.03] contrast-[1.08] saturate-[1.05] drop-shadow-[0_20px_40px_rgba(0,0,0,0.75)]"
              />
            </div>

            {/* Subtle liquid refraction glint with soft motion blur */}
            {!forceReveal && (
              <div
                className="absolute pointer-events-none rounded-full transition-transform duration-75 ease-out"
                style={{
                  width: '190px',
                  height: '145px',
                  left: `${fluidPos.x - 95}px`,
                  top: `${fluidPos.y - 72}px`,
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(192, 132, 252, 0.05) 50%, transparent 75%)',
                  filter: `blur(${14 + Math.min(motionBlur.speed * 0.5, 6)}px)`,
                  mixBlendMode: 'screen',
                }}
              />
            )}

            {/* Rich dark contrast scrim seamlessly melting the lower body into the dark page */}
            <div 
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#08090e] via-[#08090e]/85 to-transparent z-10"
            />

            {/* Companion Sticker beside the glasses / portrait */}
            {HERO_ASSETS.buddy && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 5 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.12, rotate: 12, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95, rotate: -4 }}
                className="absolute -right-3 sm:-right-8 top-10 sm:top-14 z-20 cursor-pointer pointer-events-auto"
                title="Friend Sticker"
              >
                <div className="relative group">
                  <img
                    src={HERO_ASSETS.buddy}
                    alt="Friend sticker"
                    className="w-18 sm:w-22 md:w-26 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)] select-none pointer-events-none transition-transform"
                  />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-400/40 whitespace-nowrap shadow-lg pointer-events-none">
                    😜 Yo!
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Interactive Hint matching reference screenshot */}
          <p className="mt-3 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-slate-400 uppercase text-center">
            [ HOVER FOTO UNTUK MEMICU LIQUID REVEAL ]
          </p>

          {/* Minimal, elegant interactive controls */}
          <div className="mt-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsManualMode(!isManualMode)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                !isManualMode
                  ? 'bg-purple-950/60 border-purple-500/50 text-purple-200'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Waves className="w-3 h-3 text-purple-400" />
              <span>{!isManualMode ? 'Aliran Otomatis' : 'Mode Manual'}</span>
            </button>

            <button
              type="button"
              onClick={() => setForceReveal(!forceReveal)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                forceReveal
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3 text-violet-400" />
              <span>{forceReveal ? 'Asli' : 'Kacamata'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN (lg:col-span-4): PORTFOLIO // ■ & WIJAYA KUSUMA BANGSA
            ======================================================== */}
        <div className="lg:col-span-4 flex flex-col items-start text-left order-3 lg:order-3 pl-0 lg:pl-4 xl:pl-6">
          
          {/* Top Tag: PORTFOLIO // ■ */}
          <div className="flex flex-col items-start mb-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.24em] uppercase text-slate-300">
              <span>PORTFOLIO //</span>
              <span className="w-2.5 h-2.5 bg-purple-500 inline-block shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
            </div>
            <div className="w-14 sm:w-16 h-[2px] bg-purple-500 mt-2" />
          </div>

          {/* Name: WIJAYA KUSUMA BANGSA */}
          <h2 className="font-display uppercase text-3xl sm:text-4xl lg:text-[38px] xl:text-[46px] font-[350] sm:font-light tracking-[-0.015em] text-white leading-[1.08] mb-2">
            WIJAYA KUSUMA BANGSA
          </h2>

          {/* Role: WEBSITE DEVELOPER */}
          <p className="font-mono tracking-[0.28em] text-xs sm:text-sm text-slate-400 uppercase mb-4">
            WEBSITE DEVELOPER
          </p>

          {/* Thin Divider Line */}
          <div className="w-full max-w-sm h-px bg-white/10 my-4" />

          {/* Education & Status Information */}
          <div className="flex flex-col items-start gap-1 font-mono mb-6">
            <p className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide">
              S1 Sistem Informasi · Universitas Bina Insani
            </p>
            <p className="text-xs text-slate-400 tracking-wider">
              2024–Sekarang · INDONESIA
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-purple-400 mt-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)] animate-pulse" />
              <span>AVAILABLE FOR PROJECTS</span>
            </div>
          </div>

          {/* Action Buttons (Purple theme) */}
          <div className="flex flex-wrap items-center gap-3 w-full">
            <button
              type="button"
              onClick={onExploreGallery}
              className="px-5 sm:px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-mono uppercase text-xs font-semibold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              <span>LIHAT PROYEK</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="px-5 sm:px-6 py-3 bg-transparent hover:bg-purple-500/10 border border-white/20 hover:border-purple-400 text-white font-mono uppercase text-xs font-medium tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <span>HUBUNGI SAYA</span>
              <ArrowUpRight className="w-4 h-4 text-purple-300" />
            </button>
          </div>

        </div>

      </div>

      {/* Verified Stats Bar (Tabular Numbers & Clean Aesthetic matching video) */}
      <div className="relative z-10 w-full max-w-4xl p-6 sm:p-8 rounded-2xl glass-panel tech-grid-bg border border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        {PROFILE_INFO.stats.map((stat, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-1">
              {stat.label}
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-display text-white font-mono tabular-nums tracking-tight">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
