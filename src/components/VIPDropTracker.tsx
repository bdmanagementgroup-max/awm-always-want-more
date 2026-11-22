import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Flame, Check, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const VIPDropTracker: React.FC = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail) return;
    setRegistered(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  return (
    <section className="relative my-12 sm:my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass-panel border border-teal-200 p-6 sm:p-12 lg:p-16 bg-gradient-to-br from-teal-50/50 via-white to-pink-50/50 shadow-xl">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-400/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-[10px] sm:text-xs font-mono-tech tracking-widest uppercase shadow-xs">
            <Flame size={13} className="text-pink-500" />
            <span>DROP 04 • VAULT EARLY ACCESS</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl font-syne font-black text-zinc-950 uppercase leading-tight">
            GET 15-MINUTE <br />
            <span className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent">HEAD START BEFORE SELL-OUT</span>
          </h2>

          <p className="text-zinc-600 text-xs sm:text-base leading-relaxed">
            AWM drops sell out in minutes. Join our encrypted VIP priority list for private passcode access, secret colorway unlocks, and early dispatch before public release.
          </p>

          {registered ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-teal-50 border border-teal-300 text-teal-800 flex items-center gap-2.5 text-xs sm:text-sm font-mono-tech shadow-xs"
            >
              <Check className="shrink-0 stroke-[3] text-pink-500" size={16} />
              <span>ACCESS GRANTED: You are locked into the Drop 04 VIP SMS Dispatch.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <input
                type="text"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                placeholder="Enter UK mobile or email..."
                required
                className="flex-1 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-base sm:text-sm font-mono-tech focus:outline-none focus:border-teal-500 shadow-xs"
              />
              <button
                type="submit"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-500 via-teal-600 to-pink-600 hover:from-teal-600 hover:to-pink-700 text-white font-syne font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/20 active:scale-98 transition-all"
              >
                <Lock size={15} />
                <span>CLAIM VIP PASS</span>
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-[11px] sm:text-xs font-mono-tech text-zinc-500">
            <span>✓ No spam guarantee</span>
            <span>✓ Instant passcodes</span>
            <span>✓ 100% Free VIP tier</span>
          </div>
        </div>
      </div>
    </section>
  );
};
