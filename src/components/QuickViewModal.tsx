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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl border border-white/20 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row bg-[#0c0c10]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 transition-all border border-white/10"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          {/* Left Column: Gallery */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between bg-zinc-950/60 border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-400 text-black text-[10px] font-mono-tech font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
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
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-[600px] space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-amber-400 uppercase tracking-widest">
                <span>LONDON ARCHIVE</span>
                <span>•</span>
                <span>{product.tag}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-syne font-black text-white mt-2 leading-tight">
                {product.title}
              </h2>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-3xl font-syne font-black text-amber-400">
                  {product.price}
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-300 font-mono-tech">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-1 text-zinc-400">(4.9/5 • 48 reviews)</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Technical Spec Bullets */}
              <div className="mt-4 space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs text-zinc-300">
                <div className="font-mono-tech text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
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
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-tech text-zinc-300 font-bold uppercase">
                  Select Size
                </span>
                <button
                  onClick={onOpenFitAssistant}
                  className="flex items-center gap-1.5 text-xs font-mono-tech text-amber-300 hover:underline"
                >
                  <Sparkles size={13} />
                  <span>AI Size Calculator</span>
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl font-mono-tech text-xs font-bold uppercase transition-all ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black shadow-lg scale-105'
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
                className={`w-full py-4 rounded-2xl font-syne font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl ${
                  isAdded
                    ? 'bg-emerald-500 text-black'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-amber-500/20'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} className="stroke-[3]" />
                    <span>ITEM ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>ADD TO BAG • {selectedSize} • {product.price}</span>
                  </>
                )}
              </button>

              {/* Guarantee badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-400 font-mono-tech text-center">
                <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-xl">
                  <Truck size={14} className="text-amber-400" />
                  <span>Next Day UK</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-xl">
                  <RefreshCw size={14} className="text-amber-400" />
                  <span>14-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-xl">
                  <ShieldCheck size={14} className="text-amber-400" />
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
