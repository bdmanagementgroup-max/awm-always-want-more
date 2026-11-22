import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/products.ts';

interface LookbookProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const Lookbook: React.FC<LookbookProps> = ({ products, onQuickView }) => {
  const [activeLook, setActiveLook] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const textY    = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const looks = [
    {
      title: 'STREET APEX',
      subtitle: 'HI-VIS CAMPAIGN',
      tagline: 'Engineered for night London transit',
      productId: 'awm-active-tracksuit-grey-yellow',
      bgImg: 'https://alwayswantmore.co.uk/cdn/shop/files/WhatsAppImage2026-01-01at13.23.26_2.jpg?v=1767275624&width=1200',
      specs: '380 GSM Double Knit • Custom Luminescent Neon Piping',
      accent: '#fbbf24',
    },
    {
      title: 'SUB-ZERO LUXURY',
      subtitle: 'CHENILLE INSULATION',
      tagline: 'Statement cold-weather outerwear',
      productId: 'chenille-puffer-jacket',
      bgImg: 'https://alwayswantmore.co.uk/cdn/shop/files/backofjacket.jpg?v=1765879741&width=1200',
      specs: 'Tested to -10°C • Oversized Chenille Crest',
      accent: '#93c5fd',
    },
    {
      title: 'VIRAL ARCHIVE',
      subtitle: 'HOODIE COLLECTION',
      tagline: 'High-density 3D puff print typography',
      productId: 'been-trapping-hoodie-black',
      bgImg: 'https://alwayswantmore.co.uk/cdn/shop/files/51BCA4EA-A0F4-472B-8AAC-3CF1907CA3A8.jpg?v=1750505284&width=1200',
      specs: '450 GSM Ultra-Heavy Ringspun Cotton • Boxy Cut',
      accent: '#d4d4d8',
    },
  ];

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setActiveLook((prev) => (prev + dir + looks.length) % looks.length);
  };

  const current = looks[activeLook];
  const linkedProduct = products.find((p) => p.id === current.productId) || products[0];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '8%' : '-8%',
      opacity: 0,
      scale: 0.97,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: 'easeOut' as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-8%' : '8%',
      opacity: 0,
      scale: 0.97,
      filter: 'blur(10px)',
      transition: { duration: 0.4, ease: 'easeIn' as const },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' as const },
    }),
  };

  return (
    <section ref={sectionRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-8"
      >
        <div>
          <div className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest">EDITORIAL EDIT</div>
          <h2 className="text-3xl sm:text-5xl font-syne font-black text-white mt-1 uppercase">
            AWM SS26 LOOKBOOK
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full glass-panel border border-white/15 text-zinc-300 hover:text-white hover:border-amber-400/50 hover:bg-amber-400/10 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {looks.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => { setDirection(idx > activeLook ? 1 : -1); setActiveLook(idx); }}
                animate={{
                  width: activeLook === idx ? 32 : 10,
                  backgroundColor: activeLook === idx ? '#fbbf24' : '#3f3f46',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="h-2 rounded-full"
                aria-label={`Switch to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate(1)}
            className="p-2.5 rounded-full glass-panel border border-white/15 text-zinc-300 hover:text-white hover:border-amber-400/50 hover:bg-amber-400/10 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>

      {/* Slide */}
      <div className="relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[560px] flex items-end border border-white/10 shadow-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeLook}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Parallax background */}
            <motion.div style={{ scale: bgScale }} className="absolute inset-0 origin-center">
              <img
                src={current.bgImg}
                alt={current.title}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Accent color bleed top-right */}
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[160px] opacity-20 pointer-events-none"
              style={{ backgroundColor: current.accent }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay — always rendered, re-animates per slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeLook}`}
            className="relative z-10 p-8 sm:p-14 max-w-xl space-y-5"
            initial="hidden"
            animate="visible"
          >
            <motion.div custom={0} variants={contentVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs font-mono-tech uppercase">
                <Sparkles size={12} style={{ color: current.accent }} />
                <span>{current.specs}</span>
              </div>
            </motion.div>

            <motion.div custom={1} variants={contentVariants}>
              <h3 className="text-4xl sm:text-6xl font-syne font-black uppercase leading-[0.9]">
                <span className="text-white">{current.title}</span>
                <br />
                <span style={{ color: current.accent }}>{current.subtitle}</span>
              </h3>
            </motion.div>

            <motion.p custom={2} variants={contentVariants} className="text-zinc-300 text-sm font-mono-tech">
              {current.tagline}
            </motion.p>

            <motion.div custom={3} variants={contentVariants}>
              <motion.button
                onClick={() => onQuickView(linkedProduct)}
                whileHover={{ scale: 1.04, backgroundColor: current.accent, color: '#000' }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-4 rounded-full bg-white text-black font-syne font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-2xl transition-colors overflow-hidden relative"
              >
                <motion.span
                  className="absolute inset-0 opacity-0"
                  whileHover={{ opacity: 1 }}
                  style={{ backgroundColor: current.accent }}
                />
                <span className="relative">SHOP THIS LOOK • {linkedProduct.price}</span>
                <ArrowUpRight size={16} className="relative" />
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide counter */}
        <div className="absolute bottom-6 right-8 z-10 font-mono-tech text-xs text-zinc-400">
          <span className="text-white font-bold">{String(activeLook + 1).padStart(2, '0')}</span>
          {' / '}
          {String(looks.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};
