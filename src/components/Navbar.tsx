import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Sparkles, X, Menu, SlidersHorizontal, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../data/products.ts';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenFitAssistant: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenFitAssistant,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { label: 'ALL DROPS', val: 'all' },
    { label: 'TRACKSUITS', val: 'tracksuits' },
    { label: 'JACKETS', val: 'jackets' },
    { label: 'HOODIES', val: 'hoodies' },
    { label: 'TWIN SETS', val: 'sets' },
  ];

  return (
    <>
      {/* Top Banner Marquee: Teal with Pink Accents */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-pink-600 text-white py-1 px-3 text-[11px] sm:text-xs font-bold tracking-widest uppercase overflow-hidden whitespace-nowrap border-b border-teal-700/20 shadow-sm">
        <div className="flex animate-marquee gap-6 sm:gap-8 items-center justify-between font-mono-tech">
          <span>⚡ FREE UK NEXT-DAY SHIPPING OVER £70</span>
          <span className="text-pink-300">★</span>
          <span>ALWAYS WANT MORE SS26 HIGH-TECH ARCHIVE LIVE</span>
          <span className="text-pink-300">★</span>
          <span>KLARNA & CLEARPAY AVAILABLE AT CHECKOUT</span>
          <span className="text-pink-300">★</span>
          <span>LIMITED STOCK DROP - NO RESTOCKS ON EXCLUSIVES</span>
          <span className="text-pink-300">★</span>
          <span>⚡ FREE UK NEXT-DAY SHIPPING OVER £70</span>
        </div>
      </div>

      {/* Main Glass Nav */}
      <header className="sticky top-0 z-40 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Mobile hamburger + brand */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-700 hover:text-black p-2 rounded-xl hover:bg-zinc-100 active:scale-95 transition-all"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Brand Logo & Typo - Clean Minimalist High Fashion */}
            <a href="#" className="flex flex-col group py-1">
              <span className="font-syne font-black text-base sm:text-lg md:text-xl tracking-tight sm:tracking-widest text-zinc-950 leading-none group-hover:text-teal-600 transition-colors">
                ALWAYS WANT MORE
              </span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-zinc-500 font-mono-tech mt-0.5">
                LONDON • STREETWEAR
              </span>
            </a>
          </div>

          {/* Desktop Category Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.val}
                onClick={() => onSelectCategory(cat.val)}
                className={`relative px-3.5 py-2 text-xs font-bold tracking-wider uppercase transition-colors rounded-full ${
                  activeCategory === cat.val
                    ? 'text-teal-900 font-black'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {cat.label}
                {activeCategory === cat.val && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-teal-50 border border-teal-200 rounded-full -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2.5">
            {/* AI Fit Assistant Button with Pink Accent */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenFitAssistant}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-teal-50 border border-teal-300 text-teal-800 hover:bg-teal-100 transition-all shadow-xs"
            >
              <Sparkles size={14} className="text-pink-500 animate-pulse" />
              <span>AI Fit Lab</span>
            </motion.button>

            {/* Search Trigger */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-zinc-100 border border-zinc-300 rounded-full px-2.5 py-1 shadow-inner">
                  <Search size={14} className="text-zinc-500 mr-1.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                    className="bg-transparent border-none outline-none text-xs text-zinc-900 placeholder-zinc-400 w-20 sm:w-36 font-mono-tech"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-zinc-700 p-1">
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors active:scale-95"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-full transition-colors active:scale-95"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button: Teal with Pink Counter */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs shadow-md shadow-teal-500/20 transition-all cursor-pointer"
            >
              <ShoppingBag size={15} className="shrink-0" />
              <span className="hidden sm:inline font-mono-tech">BAG</span>
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-pink-500 text-white text-[9px] sm:text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden glass-panel border-t border-zinc-200 px-4 py-5 overflow-hidden space-y-4 bg-white/95"
            >
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.val}
                    onClick={() => {
                      onSelectCategory(cat.val);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wider transition-colors ${
                      activeCategory === cat.val
                        ? 'bg-teal-50 text-teal-800 border border-teal-200'
                        : 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    onOpenFitAssistant();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-teal-50 to-pink-50 border border-teal-200 text-teal-900 text-sm font-bold active:scale-[0.98] transition-transform"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} className="text-pink-500" /> AI Virtual Fit Recommender
                  </span>
                  <ArrowRight size={16} />
                </button>
                
                <div className="flex items-center gap-2 text-xs text-zinc-500 px-2 py-1">
                  <ShieldCheck size={14} className="text-teal-600 shrink-0" />
                  <span>Official Verified Store • London, UK</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
