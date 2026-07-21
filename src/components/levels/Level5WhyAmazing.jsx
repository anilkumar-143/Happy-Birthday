import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, ArrowRight, RotateCw } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const Level5WhyAmazing = ({ compliments = [], onNext }) => {
  const [flippedIds, setFlippedIds] = useState({});

  const toggleFlip = (id) => {
    audioSynth.playCardFlip();
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen px-4 py-24 max-w-6xl mx-auto relative z-10"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/40">
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          <span>Level 5: Heartfelt Compliments</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-custom text-white mb-3">
          Why You're Truly Amazing ✨
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
          Hover or tap any card to flip and reveal a special reason why you mean so much.
        </p>
      </div>

      {/* 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {compliments.map((item, idx) => {
          const isFlipped = !!flippedIds[item.id];

          return (
            <div
              key={item.id}
              className="perspective-1000 h-64 cursor-pointer"
              onClick={() => toggleFlip(item.id)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 backface-hidden glass-card p-6 rounded-3xl border border-pink-500/30 flex flex-col items-center justify-center text-center shadow-xl hover:border-pink-400/60 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-500/30 flex items-center justify-center text-3xl mb-4 border border-pink-400/30 shadow-inner">
                    {item.emoji}
                  </div>
                  <h3 className="text-lg font-bold font-serif-custom text-white mb-2 leading-snug">
                    {item.text}
                  </h3>
                  <div className="mt-auto text-xs text-pink-300 flex items-center gap-1 opacity-80">
                    <RotateCw className="w-3 h-3" /> Tap to flip card
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel p-6 rounded-3xl border border-amber-400/50 bg-gradient-to-br from-purple-900/60 via-slate-900/90 to-pink-900/60 flex flex-col items-center justify-center text-center shadow-2xl">
                  <Heart className="w-8 h-8 text-amber-300 fill-amber-300 mb-3 animate-pulse" />
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed mb-4">
                    {item.detail}
                  </p>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 font-semibold">
                    Always Remember ❤️
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            audioSynth.playClick();
            onNext();
          }}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center justify-center gap-2 mx-auto border border-white/20 glow-pulse"
        >
          <span>Visit Birthday Wishes Wall</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
