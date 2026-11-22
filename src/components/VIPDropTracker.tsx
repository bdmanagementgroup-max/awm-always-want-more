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
    <section className="relative my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-amber-500/30 p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-zinc-950 via-[#0e0e14] to-zinc-950">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono-tech tracking-widest uppercase">
            <Flame size={14} className="text-amber-400" />
            <span>DROP 04 • VAULT EARLY ACCESS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-syne font-black text-white uppercase leading-tight">
            GET 15-MINUTE <br />
            <span className="text-amber-400">HEAD START BEFORE SELL-OUT</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            AWM drops sell out in minutes. Join our encrypted VIP priority list for private passcode access, secret colorway unlocks, and early dispatch before public release.
          </p>

          {registered ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 text-sm font-mono-tech"
            >
              <Check className="shrink-0 stroke-[3]" size={18} />
              <span>ACCESS GRANTED: You are locked into the Drop 04 VIP SMS Dispatch.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="text"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                placeholder="Enter UK mobile or email..."
                required
                className="flex-1 px-5 py-4 rounded-2xl bg-zinc-900/90 border border-white/15 text-white placeholder-zinc-500 text-sm font-mono-tech focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-syne font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/25"
              >
                <Lock size={16} />
                <span>CLAIM VIP PASS</span>
              </button>
            </form>
          )}

          <div className="flex items-center gap-6 pt-2 text-xs font-mono-tech text-zinc-400">
            <span>✓ No spam guarantee</span>
            <span>✓ Instant passcodes</span>
            <span>✓ 100% Free VIP tier</span>
          </div>
        </div>
      </div>
    </section>
  );
};
