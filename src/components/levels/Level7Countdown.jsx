import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const Level7Countdown = ({ onCountdownFinish }) => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (seconds > 0) {
      audioSynth.playCountdownBeep();
      const timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      audioSynth.playVictory();
      onCountdownFinish();
    }
  }, [seconds, onCountdownFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-4 py-24 relative z-20 bg-slate-950/90 backdrop-blur-xl"
    >
      <div className="text-center max-w-md w-full glass-panel p-10 rounded-3xl border border-pink-500/50 shadow-2xl relative">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-6 border border-pink-500/40"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Surprise Anticipation</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-custom text-white mb-8">
          One Last Surprise... ❤️
        </h2>

        {/* Glowing Countdown Ring */}
        <div className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-pink-500/30 glow-pulse" />
          <motion.div
            key={seconds}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl sm:text-7xl font-extrabold font-serif-custom text-gradient-pink-gold"
          >
            {seconds}
          </motion.div>
        </div>

        <p className="text-sm text-pink-300 font-medium flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-ping" />
          Dimming lights... Get ready!
        </p>
      </div>
    </motion.div>
  );
};
