import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { ArrowUpRight, Flame, Shield, Truck, Zap } from 'lucide-react';
import { Product } from '../data/products.ts';
import { MagneticButton, TiltCard, AnimatedCounter } from './AnimationPrimitives.tsx';

interface HeroProps {
  onExplore: () => void;
  onQuickView: (product: Product) => void;
  featuredProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onQuickView, featuredProduct }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });

  // Parallax layers (subtle to prevent mobile Safari jitter)
  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const springTextY = useSpring(textY, { stiffness: 60, damping: 20 });
  const springCardY = useSpring(cardY, { stiffness: 60, damping: 20 });

  // Stagger children variants
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div ref={containerRef} className="relative min-h-[85dvh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-16">

      {/* ── Parallax ambient orbs: Teal & Pink ── */}
      <motion.div style={{ y: orbY1 }} className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="orb-teal w-72 sm:w-[500px] h-72 sm:h-[500px] top-[5%] sm:top-[10%] left-[-10%] sm:left-[5%]" />
      </motion.div>
      <motion.div style={{ y: orbY2 }} className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="orb-pink w-80 sm:w-[600px] h-80 sm:h-[600px] bottom-[5%] right-[-10%] sm:right-[0%]" />
      </motion.div>

      {/* Dot-grid mesh subtle */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#09090b0d_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* ── Left column ── */}
        <motion.div
          style={{ y: springTextY }}
          variants={container}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-5 sm:space-y-7 text-left"
        >
          {/* Badge: Teal with Pink live dot */}
          <motion.div variants={item}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-teal-300 text-teal-800 text-[10px] sm:text-xs font-mono-tech uppercase tracking-widest shadow-xs"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.4 }}
              >
                <Flame size={13} className="text-pink-500" />
              </motion.span>
              <span>SEASON 2026 ARCHIVE • DROP 03</span>
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1.5 h-1.5 rounded-full bg-pink-500 inline-block"
              />
            </motion.div>
          </motion.div>

          {/* Main title: Clean White + Teal + Pink */}
          <motion.div variants={item}>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-syne font-black tracking-tight leading-[0.96] uppercase text-zinc-950">
              {['NEVER', 'SETTLE.', 'WANT MORE.'].map((word, wi) => (
                <motion.div
                  key={wi}
                  initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.2 + wi * 0.12, ease: 'easeOut' }}
                >
                  {wi === 0 && <span className="text-zinc-950">{word}</span>}
                  {wi === 1 && (
                    <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
                      {word}
                    </span>
                  )}
                  {wi === 2 && (
                    <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-pink-600 bg-clip-text text-transparent underline decoration-pink-400/50 decoration-wavy">
                      {word}
                    </span>
                  )}
                </motion.div>
              ))}
            </h1>
          </motion.div>

          <motion.p variants={item} className="text-zinc-600 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
            Engineered luxury streetwear born in London. Heavyweight 380–450 GSM cotton, custom chenille outerwear, and high-visibility athletic tapers crafted for culture drivers who refuse the ordinary.
          </motion.p>

          {/* CTA row: Teal primary & Pink accents */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <MagneticButton
              onClick={onExplore}
              strength={0.25}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-syne font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 active:scale-98 transition-all cursor-pointer overflow-hidden relative group"
            >
              {/* animated pink sheen */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400/30 to-transparent -skew-x-12"
                initial={{ x: '-150%' }}
                whileHover={{ x: '150%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
              <span className="relative">EXPLORE THE DROP</span>
              <motion.span
                animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              >
                <ArrowUpRight size={17} className="relative text-pink-300" />
              </motion.span>
            </MagneticButton>

            <MagneticButton
              onClick={() => onQuickView(featuredProduct)}
              strength={0.2}
              className="flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full glass-panel border border-zinc-300 text-zinc-900 font-mono-tech text-xs font-bold uppercase tracking-wider hover:bg-zinc-50 hover:border-teal-500 active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <span>FEATURED PUFFER</span>
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-pink-600 font-black"
              >
                £130.00
              </motion.span>
            </MagneticButton>
          </motion.div>

          {/* ── Animated stat counters ── */}
          <motion.div variants={item} className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-zinc-200 max-w-lg">
            <div className="flex flex-col gap-0.5">
              <div className="font-syne font-black text-xl sm:text-2xl text-teal-600">
                <AnimatedCounter target={2400} suffix="+" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono-tech text-zinc-500">Verified Orders</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-syne font-black text-xl sm:text-2xl text-zinc-900">
                <AnimatedCounter target={4.9} suffix="/5" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono-tech text-zinc-500">Star Rating</div>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="font-syne font-black text-xl sm:text-2xl text-pink-600">
                <AnimatedCounter target={48} suffix="h" />
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono-tech text-zinc-500">Max Delivery</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right column: 3D Tilt + parallax card ── */}
        <motion.div
          style={{ y: springCardY }}
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="lg:col-span-5 relative mt-4 lg:mt-0"
        >
          <TiltCard maxTilt={8} className="relative mx-auto max-w-md w-full">
            {/* Animated glow behind card: Teal & Pink */}
            <motion.div
              animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.04, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-pink-400 rounded-3xl blur-2xl pointer-events-none"
            />

            <div className="animated-border relative rounded-2xl overflow-hidden shadow-2xl p-3 sm:p-4 bg-white">
              {/* Product image */}
              <div className="relative h-[320px] xs:h-[360px] sm:h-[440px] md:h-[480px] w-full rounded-xl overflow-hidden bg-zinc-100">
                <motion.img
                  src={featuredProduct.img}
                  alt={featuredProduct.title}
                  className="w-full h-full object-cover object-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />

                {/* Floating badges: Teal & Pink */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-1.5">
                  <span className="bg-zinc-950/90 backdrop-blur-md text-teal-300 border border-teal-400/40 text-[9px] sm:text-[10px] font-mono-tech font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-widest">
                    DROP 01 • FLAGSHIP
                  </span>
                  <span className="bg-pink-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider w-max shadow-xs">
                    IN STOCK
                  </span>
                </div>

                {/* CTA button */}
                <button
                  onClick={() => onQuickView(featuredProduct)}
                  className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-white/20 text-white hover:bg-teal-600 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-mono-tech transition-colors shadow-xl active:scale-95 cursor-pointer"
                >
                  <span>INSPECT DETAILS</span>
                  <ArrowUpRight size={14} className="text-teal-300" />
                </button>
              </div>

              {/* Info bar */}
              <div className="pt-3 sm:pt-4 px-1.5 sm:px-2 flex items-center justify-between">
                <div>
                  <h3 className="font-syne font-bold text-sm sm:text-base text-zinc-900 truncate max-w-[200px] sm:max-w-[240px]">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-500 font-mono-tech">Chenille Embroidery • Tested to -10°C</p>
                </div>
                <div className="text-right">
                  <div className="font-syne font-black text-base sm:text-lg text-teal-600">
                    {featuredProduct.price}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 uppercase font-mono-tech">Inc. VAT</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
};
