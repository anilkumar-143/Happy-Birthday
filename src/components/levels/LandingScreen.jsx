import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, Play, Music } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const LandingScreen = ({ friendName, onStart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Preparing Your Birthday Surprise...");

  const handleStart = () => {
    audioSynth.playClick();
    audioSynth.startBackgroundMusic();
    setIsLoading(true);

    const steps = [
      "Gathering magical memories...",
      "Lighting up the birthday candles...",
      "Wrapping up heartfelt surprises...",
      "Almost ready!"
    ];

    steps.forEach((text, index) => {
      setTimeout(() => {
        setLoadingText(text);
      }, (index + 1) * 700);
    });

    setTimeout(() => {
      onStart();
    }, 3600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-xl z-10 glass-panel p-8 md:p-12 rounded-3xl border border-pink-500/30 relative"
          >
            {/* Glowing Top Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Special Invitation</span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            </motion.div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif-custom text-white tracking-tight mb-4 leading-tight">
              A Little Surprise <br />
              <span className="text-gradient-pink-gold">Just for You ❤️</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
              Hey <span className="text-pink-300 font-semibold">{friendName}</span>! An extraordinary digital adventure has been crafted just to celebrate you. Are you ready?
            </p>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-bold text-lg shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-3 mx-auto group border border-white/20 glow-pulse"
            >
              <Gift className="w-6 h-6 text-yellow-200 group-hover:rotate-12 transition-transform duration-300" />
              <span>Start the Surprise</span>
              <Play className="w-5 h-5 fill-white" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center z-10 glass-panel p-10 md:p-14 rounded-3xl border border-purple-500/40 max-w-md w-full"
          >
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              {/* Outer Spinning Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-purple-500 border-b-amber-400 border-l-transparent animate-spin" />
              {/* Inner Pulsing Heart */}
              <Heart className="w-10 h-10 text-pink-400 fill-pink-400 animate-bounce" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2 font-serif-custom">
              {loadingText}
            </h3>
            <p className="text-xs text-pink-300/80 flex items-center justify-center gap-1">
              <Music className="w-3.5 h-3.5 animate-spin" /> Playing background harmonies...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
