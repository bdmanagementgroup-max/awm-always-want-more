import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '../data/products.ts';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const subtotal = items.reduce((acc, it) => acc + it.product.rawPrice * it.quantity, 0);
  const freeShippingThreshold = 70;
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remaining = freeShippingThreshold - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0a0a0e] border-l border-white/10 h-[100dvh] shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <ShoppingBag className="text-amber-400" size={20} />
                <h2 className="font-syne font-black text-lg sm:text-xl text-white">YOUR BAG</h2>
                <span className="text-[11px] sm:text-xs font-mono-tech px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} ITEMS
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors active:scale-90"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="bg-zinc-900/60 p-3 sm:p-4 border-b border-white/5 space-y-1.5 sm:space-y-2">
              <div className="flex justify-between text-[11px] sm:text-xs font-mono-tech">
                <span className="text-zinc-300">
                  {remaining <= 0
                    ? '🎉 FREE UK NEXT-DAY SHIPPING UNLOCKED!'
                    : `Add £${remaining.toFixed(2)} for FREE UK Delivery`}
                </span>
                <span className="text-amber-400 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-lg text-white">YOUR BAG IS EMPTY</h3>
                    <p className="text-xs text-zinc-400 max-w-xs mt-1 font-mono-tech">
                      Explore the SS26 drops and add authentic streetwear essentials.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono-tech text-xs font-bold uppercase transition-colors"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 p-3 rounded-2xl bg-zinc-900/40 border border-white/5 group"
                  >
                    <img
                      src={item.product.img}
                      alt={item.product.title}
                      className="w-20 h-24 object-cover rounded-xl bg-zinc-800 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-syne font-bold text-xs text-white line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            className="text-zinc-500 hover:text-rose-400 p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="text-[11px] font-mono-tech text-zinc-400 mt-1">
                          SIZE: <span className="text-amber-400 font-bold">{item.size}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 bg-zinc-800/80 rounded-lg p-1 border border-white/5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                            className="w-5 h-5 flex items-center justify-center text-zinc-300 hover:text-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-mono-tech font-bold px-1.5">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                            className="w-5 h-5 flex items-center justify-center text-zinc-300 hover:text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-syne font-black text-sm text-white">
                          £{(item.product.rawPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 pb-8 sm:pb-6 border-t border-white/10 bg-zinc-950/90 space-y-3 sm:space-y-4 shrink-0">
                <div className="space-y-1.5 sm:space-y-2 text-xs font-mono-tech">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>UK Shipping</span>
                    <span className="text-amber-400 font-bold">
                      {remaining <= 0 ? 'FREE' : '£4.99'}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-2 flex justify-between text-sm sm:text-base font-syne font-black text-white">
                    <span>ESTIMATED TOTAL</span>
                    <span className="text-amber-400">
                      £{(subtotal + (remaining <= 0 ? 0 : 4.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-syne font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <span>SECURE CHECKOUT</span>
                  <ArrowRight size={17} />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] text-zinc-400 font-mono-tech text-center">
                  <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
                  <span>256-Bit Encrypted Checkout • Klarna & Apple Pay</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
