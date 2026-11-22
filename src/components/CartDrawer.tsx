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

          {/* Drawer content: Clean White Theme */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white border-l border-zinc-200 h-[100dvh] shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <ShoppingBag className="text-teal-600" size={20} />
                <h2 className="font-syne font-black text-lg sm:text-xl text-zinc-950">YOUR BAG</h2>
                <span className="text-[11px] sm:text-xs font-mono-tech px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 font-bold">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} ITEMS
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors active:scale-90"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping bar: Teal to Pink */}
            <div className="bg-zinc-50 p-3 sm:p-4 border-b border-zinc-200 space-y-1.5 sm:space-y-2">
              <div className="flex justify-between text-[11px] sm:text-xs font-mono-tech">
                <span className="text-zinc-700 font-medium">
                  {remaining <= 0
                    ? '🎉 FREE UK NEXT-DAY SHIPPING UNLOCKED!'
                    : `Add £${remaining.toFixed(2)} for FREE UK Delivery`}
                </span>
                <span className="text-teal-700 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 bg-zinc-50/40">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-lg text-zinc-900">YOUR BAG IS EMPTY</h3>
                    <p className="text-xs text-zinc-500 max-w-xs mt-1 font-mono-tech">
                      Explore the SS26 drops and add authentic streetwear essentials.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-zinc-950 hover:bg-teal-600 text-white font-mono-tech text-xs font-bold uppercase transition-colors"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 p-3 rounded-2xl bg-white border border-zinc-200 group shadow-xs"
                  >
                    <img
                      src={item.product.img}
                      alt={item.product.title}
                      className="w-20 h-24 object-cover rounded-xl bg-zinc-100 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-syne font-bold text-xs text-zinc-950 line-clamp-1">
                            {item.product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            className="text-zinc-400 hover:text-pink-600 p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="text-[11px] font-mono-tech text-zinc-500 mt-1">
                          SIZE: <span className="text-teal-700 font-bold">{item.size}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-1 border border-zinc-200">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                            className="w-5 h-5 flex items-center justify-center text-zinc-600 hover:text-black"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-mono-tech font-bold px-1.5 text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                            className="w-5 h-5 flex items-center justify-center text-zinc-600 hover:text-black"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-syne font-black text-sm text-zinc-950">
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
              <div className="p-4 sm:p-6 pb-8 sm:pb-6 border-t border-zinc-200 bg-white space-y-3 sm:space-y-4 shrink-0">
                <div className="space-y-1.5 sm:space-y-2 text-xs font-mono-tech">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span className="text-zinc-950 font-bold">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>UK Shipping</span>
                    <span className="text-teal-700 font-bold">
                      {remaining <= 0 ? 'FREE' : '£4.99'}
                    </span>
                  </div>
                  <div className="border-t border-zinc-200 pt-2 flex justify-between text-sm sm:text-base font-syne font-black text-zinc-950">
                    <span>ESTIMATED TOTAL</span>
                    <span className="text-teal-700">
                      £{(subtotal + (remaining <= 0 ? 0 : 4.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 hover:from-teal-600 hover:to-teal-700 text-white font-syne font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-teal-500/20 active:scale-98 transition-all cursor-pointer"
                >
                  <span>SECURE CHECKOUT</span>
                  <ArrowRight size={17} className="text-pink-300" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[9px] sm:text-[10px] text-zinc-500 font-mono-tech text-center">
                  <ShieldCheck size={13} className="text-teal-600 shrink-0" />
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
