import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, CheckCircle2, User, Ruler, Weight } from 'lucide-react';

interface FitAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySize: (size: string) => void;
}

export const FitAssistantModal: React.FC<FitAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplySize,
}) => {
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(76);
  const [fitPreference, setFitPreference] = useState<'fitted' | 'regular' | 'oversized'>('oversized');
  const [recommendedSize, setRecommendedSize] = useState<string>('L');

  // Intelligent sizing logic for streetwear silhouettes
  const calculateSize = (h: number, w: number, pref: 'fitted' | 'regular' | 'oversized') => {
    let base = 'M';
    if (w < 68 || h < 172) base = 'S';
    else if (w < 78 && h < 182) base = 'M';
    else if (w < 90 && h < 190) base = 'L';
    else if (w < 102) base = 'XL';
    else base = 'XXL';

    if (pref === 'oversized') {
      if (base === 'S') return 'M';
      if (base === 'M') return 'L';
      if (base === 'L') return 'XL';
      if (base === 'XL') return 'XXL';
    } else if (pref === 'fitted') {
      if (base === 'XXL') return 'XL';
      if (base === 'XL') return 'L';
      if (base === 'L') return 'M';
      if (base === 'M') return 'S';
    }
    return base;
  };

  const handleUpdate = (h: number, w: number, p: 'fitted' | 'regular' | 'oversized') => {
    const sz = calculateSize(h, w, p);
    setRecommendedSize(sz);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg glass-panel bg-[#0d0d12] rounded-3xl border border-amber-500/30 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-syne font-black text-lg text-white">
                    AWM AI FIT LAB™
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono-tech">
                    Precision Sizing Algorithm for London Streetwear
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sliders */}
            <div className="py-6 space-y-6">
              {/* Height */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <Ruler size={14} className="text-amber-400" /> Height
                  </span>
                  <span className="text-amber-400 font-bold font-mono-tech">
                    {heightCm} cm ({Math.floor(heightCm / 30.48)}' {Math.round((heightCm % 30.48) / 2.54)}")
                  </span>
                </div>
                <input
                  type="range"
                  min="155"
                  max="205"
                  value={heightCm}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setHeightCm(v);
                    handleUpdate(v, weightKg, fitPreference);
                  }}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="flex items-center gap-2 text-zinc-300">
                    <Weight size={14} className="text-amber-400" /> Weight
                  </span>
                  <span className="text-amber-400 font-bold font-mono-tech">
                    {weightKg} kg ({(weightKg * 2.20462).toFixed(0)} lbs)
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="125"
                  value={weightKg}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWeightKg(v);
                    handleUpdate(heightCm, v, fitPreference);
                  }}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Fit Preference */}
              <div className="space-y-2">
                <span className="text-xs font-mono-tech text-zinc-300 block">
                  Desired Fit Silhouette:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['fitted', 'regular', 'oversized'] as const).map((pref) => (
                    <button
                      key={pref}
                      onClick={() => {
                        setFitPreference(pref);
                        handleUpdate(heightCm, weightKg, pref);
                      }}
                      className={`py-2 rounded-xl text-xs font-mono-tech uppercase font-bold transition-all ${
                        fitPreference === pref
                          ? 'bg-amber-400 text-black shadow-md'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Prediction Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-950 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono-tech text-amber-300 uppercase tracking-widest">
                    Recommended Size
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    98.4% Confidence Match for AWM cuts
                  </div>
                </div>
                <div className="text-4xl font-syne font-black text-amber-400 bg-amber-400/10 px-4 py-2 rounded-2xl border border-amber-400/30">
                  {recommendedSize}
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => {
                onApplySize(recommendedSize);
                onClose();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-syne font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <CheckCircle2 size={18} />
              <span>CONFIRM & APPLY SIZE {recommendedSize}</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
