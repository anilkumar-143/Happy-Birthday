import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, Stars, Gift } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const Level2BirthdayReveal = ({ friendName, messages = [], onNext }) => {
  const [visibleCount, setVisibleCount] = useState(1);

  // Default sentences if not provided
  const list = messages.length > 0 ? messages : [
    `🎉 Happy Birthday, ${friendName}! ❤️`,
    "May your smile always shine brighter than the stars.",
    "May every dream you hold in your heart become reality.",
    "May happiness always find you wherever life takes you.",
    "Thank you for being such an extraordinary, wonderful friend.",
    "You truly deserve a day filled with love, laughter, and unforgettable memories.",
    "Happy Birthday! 🎂❤️"
  ];

  useEffect(() => {
    if (visibleCount < list.length) {
      const timer = setTimeout(() => {
        audioSynth.playCardFlip();
        setVisibleCount((prev) => prev + 1);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, list.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative z-10"
    >
      <div className="max-w-2xl w-full glass-panel p-8 md:p-12 rounded-3xl border border-pink-500/40 text-center relative shadow-2xl overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Level Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-6 border border-purple-500/40">
          <Stars className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 2: The Heartfelt Message</span>
        </div>

        {/* Animated Typing Messages */}
        <div className="space-y-6 my-4 min-h-[320px] flex flex-col justify-center">
          {list.slice(0, visibleCount).map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
            >
              {idx === 0 ? (
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-custom text-gradient-pink-gold leading-tight tracking-wide">
                  {text}
                </h2>
              ) : (
                <p className="text-slate-200 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto">
                  {text}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        {visibleCount >= list.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audioSynth.playClick();
                onNext();
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-bold text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center justify-center gap-2 mx-auto border border-white/20 glow-pulse"
            >
              <span>Explore Memory Gallery</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
