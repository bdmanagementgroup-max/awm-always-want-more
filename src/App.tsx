import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { QuickViewModal } from './components/QuickViewModal.tsx';
import { CartDrawer, CartItem } from './components/CartDrawer.tsx';
import { FitAssistantModal } from './components/FitAssistantModal.tsx';
import { Lookbook } from './components/Lookbook.tsx';
import { VIPDropTracker } from './components/VIPDropTracker.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CursorGlow, ScrollProgressBar } from './components/AnimationPrimitives.tsx';
import { PRODUCTS, Product } from './data/products.ts';
import { SlidersHorizontal, Flame, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [fitAssistantOpen, setFitAssistantOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory =
        activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.rawPrice - b.rawPrice;
      if (sortBy === 'price-desc') return b.rawPrice - a.rawPrice;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Cart operations
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (it) => it.product.id === product.id && it.size === size
      );
      if (existing) {
        return prev.map((it) =>
          it.product.id === product.id && it.size === size
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((it) => {
          if (it.product.id === productId && it.size === size) {
            const nextQty = it.quantity + delta;
            return nextQty > 0 ? { ...it, quantity: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((it) => !(it.product.id === productId && it.size === size))
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#14b8a6', '#ec4899', '#f43f5e', '#ffffff']
    });
    setCheckoutNotice('Connecting to Always Want More 256-bit encrypted checkout...');
    setTimeout(() => {
      setCheckoutNotice(null);
      setCartOpen(false);
    }, 2500);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] text-zinc-900 flex flex-col font-sans selection:bg-teal-400 selection:text-black">
      {/* Global UX primitives */}
      <CursorGlow />
      <ScrollProgressBar />

      {/* Toast / Checkout Notice */}
      <AnimatePresence>
        {checkoutNotice && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-teal-600 text-white font-mono-tech text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-teal-500/30"
          >
            <Check size={16} className="text-pink-300" />
            <span>{checkoutNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => {
          // If wishlist clicked, filter to wishlisted items
          if (wishlistIds.length > 0) {
            setActiveCategory('all');
            scrollToProducts();
          }
        }}
        onOpenFitAssistant={() => setFitAssistantOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToProducts();
        }}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onExplore={scrollToProducts}
        onQuickView={(p) => setQuickViewProduct(p)}
        featuredProduct={PRODUCTS[1]} // Chenille puffer
      />

      {/* Interactive Lookbook Editorial */}
      <Lookbook
        products={PRODUCTS}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Main Catalog Section */}
      <section id="products-section" className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-zinc-200">
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono-tech text-teal-700 font-bold uppercase tracking-widest mb-1">
              <Flame size={13} className="text-pink-500" />
              <span>LIVE RELEASES • SS26 CAPSULE</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-syne font-black text-zinc-950 uppercase">
              {activeCategory === 'all' ? 'THE FULL ARCHIVE' : `${activeCategory} COLLECTION`}
            </h2>
          </div>

          {/* Sort & Filter controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
            <div className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl glass-panel bg-white border border-zinc-200 text-xs font-mono-tech text-zinc-700 shadow-xs">
              <SlidersHorizontal size={13} className="text-teal-600" />
              <span>SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-transparent text-zinc-900 outline-none cursor-pointer font-bold"
              >
                <option value="featured" className="bg-white text-zinc-900">Featured</option>
                <option value="price-asc" className="bg-white text-zinc-900">Price: Low to High</option>
                <option value="price-desc" className="bg-white text-zinc-900">Price: High to Low</option>
              </select>
            </div>
            <span className="text-xs font-mono-tech text-zinc-400">
              ({filteredProducts.length} items)
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center space-y-3"
          >
            <p className="font-syne font-bold text-lg text-zinc-400">NO PRODUCTS FOUND</p>
            <p className="text-xs text-zinc-400 font-mono-tech">
              Try adjusting your search query or reset category filter.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-6 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-mono-tech uppercase hover:bg-zinc-200 transition-all font-bold"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery + sortBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10"
            >
              {filteredProducts.map((prod, i) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  index={i}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={handleAddToCart}
                  isWishlisted={wishlistIds.includes(prod.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* Customer Reviews */}
      <ReviewsSection />

      {/* VIP Drop Early Access Pass Tracker */}
      <VIPDropTracker />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenFitAssistant={() => {
          setQuickViewProduct(null);
          setFitAssistantOpen(true);
        }}
      />

      {/* AI Fit Assistant Modal */}
      <FitAssistantModal
        isOpen={fitAssistantOpen}
        onClose={() => setFitAssistantOpen(false)}
        onApplySize={(size) => {
          // size chosen
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
