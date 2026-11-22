import React, { useState } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Eye, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/products.ts';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  index = 0,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Spring-physics tilt
  const rotateX = useSpring(0, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(0, { stiffness: 180, damping: 18 });
  const scale   = useSpring(1, { stiffness: 250, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(nx * 10);
    rotateX.set(-ny * 10);
    scale.set(1.012);
  };
  const handleMouseLeave = () => {
    rotateX.set(0); rotateY.set(0); scale.set(1);
    setIsHovered(false);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: 'easeOut' }}
      style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-colors duration-500 overflow-hidden cursor-pointer"
    >
      {/* ── Image Container ── */}
      <div
        onClick={() => onQuickView(product)}
        className="relative h-72 xs:h-80 sm:h-96 w-full overflow-hidden bg-zinc-900"
      >
        {/* Hover-swap image with crossfade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={isHovered && product.hoverImg ? 'hover' : 'base'}
            src={isHovered && product.hoverImg ? product.hoverImg : product.img}
            alt={product.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45 }}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </AnimatePresence>

        {/* Gradient shimmer on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3">
            <span className={`text-[8px] sm:text-[9px] font-mono-tech font-bold uppercase tracking-widest px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-md border ${
              product.badge === 'EXCLUSIVE'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                : product.badge === 'BESTSELLER'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                : 'bg-white/10 text-white border-white/20'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist — spring pop */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          className={`absolute top-2.5 sm:top-3 right-2.5 sm:right-3 p-2 rounded-full backdrop-blur-md border transition-colors active:scale-90 ${
            isWishlisted
              ? 'bg-rose-500 text-white border-rose-400'
              : 'bg-black/50 text-zinc-300 border-white/10 hover:text-white hover:bg-black/80'
          }`}
          aria-label="Save to wishlist"
        >
          <motion.div
            animate={isWishlisted ? { scale: [1, 1.4, 1] } : {}}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
          >
            <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
          </motion.div>
        </button>

        {/* Quick view overlay — visible on hover (desktop) or tap (mobile) */}
        <div className="hidden sm:block absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="w-full py-2.5 px-4 rounded-xl bg-white text-black font-mono-tech text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl hover:bg-amber-400 transition-colors"
          >
            <Eye size={14} />
            <span>QUICK VIEW & SPECS</span>
          </button>
        </div>
      </div>

      {/* ── Info Panel ── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-zinc-400 font-mono-tech mb-1">
            <span>{product.tag || 'AWM DROP'}</span>
            {/* Color swatches */}
            <div className="flex gap-1.5 items-center">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-syne font-bold text-xs sm:text-sm text-white line-clamp-1 cursor-pointer group-hover:text-amber-400 transition-colors"
          >
            {product.title}
          </h3>

          <div className="mt-1.5 font-syne font-black text-base sm:text-lg text-white">
            {product.price}
          </div>
        </div>

        {/* ── Size + Add to Bag ── */}
        <div className="space-y-2.5 pt-2.5 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono-tech text-zinc-400">Select Size:</span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => { e.stopPropagation(); setSelectedSize(s); }}
                  className={`w-7 h-7 sm:w-6 sm:h-6 rounded-md text-[10px] font-mono-tech font-bold uppercase transition-all flex items-center justify-center active:scale-90 ${
                    selectedSize === s
                      ? 'bg-amber-400 text-black shadow-sm font-black'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={addedAnimation}
            className={`w-full py-3 sm:py-2.5 rounded-xl text-xs font-mono-tech font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer border border-white/10 active:scale-98 transition-all ${
              addedAnimation ? 'bg-emerald-500 text-black' : 'bg-zinc-800 hover:bg-amber-400 hover:text-black text-zinc-100'
            }`}
          >
            <AnimatePresence mode="wait">
              {addedAnimation ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-1.5"
                >
                  <Check size={14} className="stroke-[3]" />
                  ADDED TO BAG
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  ADD • SIZE {selectedSize}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
