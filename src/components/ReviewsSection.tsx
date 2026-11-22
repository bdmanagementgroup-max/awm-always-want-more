import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/products.ts';

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-200">
      {/* Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-mono-tech text-teal-700 font-bold uppercase tracking-widest"
          >
            STREET VERIFIED
          </motion.div>
          <div className="text-3xl sm:text-4xl font-syne font-black text-zinc-950 mt-1 uppercase">
            {['WHAT', 'THE', 'CULTURE', 'SAYS'].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-3"
              >
                {w}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Stars rating reveal with Pink and Teal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
          className="mt-4 md:mt-0 flex items-center gap-3"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.5 + i * 0.07 }}
                className="text-pink-500"
              >
                <Star size={18} fill="currentColor" />
              </motion.span>
            ))}
          </div>
          <span className="text-sm font-mono-tech text-zinc-600 font-bold">
            4.9 / 5.0 • 2,400+ Verified Orders
          </span>
        </motion.div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, i) => (
          <motion.div
            key={rev.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              borderColor: 'rgba(13,148,136,0.4)',
              boxShadow: '0 20px 40px -12px rgba(13,148,136,0.1)',
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            className="p-6 rounded-2xl glass-panel bg-white border border-zinc-200 flex flex-col justify-between space-y-4 shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5 font-syne font-bold text-zinc-950 text-base">
                    <span>{rev.name}</span>
                    <motion.span
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.4 }}
                    >
                      <CheckCircle2 size={14} className="text-teal-600" />
                    </motion.span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono-tech">{rev.city}</div>
                </div>
                <div className="flex">
                  {[...Array(rev.rating)].map((_, si) => (
                    <motion.span
                      key={si}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + si * 0.05, type: 'spring', stiffness: 500 }}
                      className="text-pink-500"
                    >
                      <Star size={13} fill="currentColor" />
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="text-xs font-mono-tech text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md w-max font-bold">
                Purchased: {rev.item}
              </div>

              <p className="text-sm text-zinc-600 leading-relaxed">"{rev.text}"</p>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-mono-tech">
              <span>Verified Buyer</span>
              <span>{rev.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
