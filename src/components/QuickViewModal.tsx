import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, Sparkles } from 'lucide-react';
import { Product } from '../data/products.ts';
import confetti from 'canvas-confetti';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onOpenFitAssistant: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenFitAssistant,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedImage, setSelectedImage] = useState<string>(product.img);
  const [isAdded, setIsAdded] = useState(false);

  const images = [product.img, product.hoverImg].filter(Boolean) as string[];

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAdded(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff']
    });
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl glass-panel rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 max-h-[88dvh] flex flex-col md:flex-row bg-[#0c0c10] my-auto"
        >
          {/* Close Button - large touch target for iPhone */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 p-2.5 sm:p-2 rounded-full bg-black/80 text-zinc-300 hover:text-white hover:bg-black transition-all border border-white/15 active:scale-90"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          {/* Left Column: Gallery */}
          <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between bg-zinc-950/60 border-b md:border-b-0 md:border-r border-white/10 shrink-0">
            <div className="relative h-60 xs:h-72 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="bg-amber-400 text-black text-[9px] sm:text-[10px] font-mono-tech font-black px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 mt-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all active:scale-95 ${
                      selectedImage === img ? 'border-amber-400 scale-105' : 'border-white/10 opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Spec Sheet & Buying Actions */}
          <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-5">
            <div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono-tech text-amber-400 uppercase tracking-widest">
                <span>LONDON ARCHIVE</span>
                <span>•</span>
                <span>{product.tag}</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-syne font-black text-white mt-1.5 leading-tight">
                {product.title}
              </h2>

              <div className="mt-2.5 flex items-center justify-between">
                <div className="text-2xl sm:text-3xl font-syne font-black text-amber-400">
                  {product.price}
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-xs text-zinc-300 font-mono-tech">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-1 text-zinc-400">(4.9/5)</span>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Technical Spec Bullets */}
              <div className="mt-3.5 space-y-1.5 bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 text-[11px] sm:text-xs text-zinc-300">
                <div className="font-mono-tech text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  Technical Specifications:
                </div>
                {product.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size & Action Bar */}
            <div className="space-y-3.5 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-mono-tech text-zinc-300 font-bold uppercase">
                  Select Size
                </span>
                <button
                  onClick={onOpenFitAssistant}
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-mono-tech text-amber-300 hover:underline"
                >
                  <Sparkles size={12} />
                  <span>AI Size Calculator</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 sm:py-2.5 rounded-xl font-mono-tech text-xs font-bold uppercase transition-all active:scale-95 ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black shadow-lg font-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-white/5'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-syne font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl active:scale-98 ${
                  isAdded
                    ? 'bg-emerald-500 text-black'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-amber-500/20'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={16} className="stroke-[3]" />
                    <span>ITEM ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>ADD TO BAG • {selectedSize} • {product.price}</span>
                  </>
                )}
              </button>

              {/* Guarantee badges */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-[9px] sm:text-[10px] text-zinc-400 font-mono-tech text-center">
                <div className="flex flex-col items-center gap-1 p-1.5 bg-white/5 rounded-lg sm:rounded-xl">
                  <Truck size={13} className="text-amber-400" />
                  <span>Next Day UK</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-1.5 bg-white/5 rounded-lg sm:rounded-xl">
                  <RefreshCw size={13} className="text-amber-400" />
                  <span>14-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-1.5 bg-white/5 rounded-lg sm:rounded-xl">
                  <ShieldCheck size={13} className="text-amber-400" />
                  <span>Authentic AWM</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
