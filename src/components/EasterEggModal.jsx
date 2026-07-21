import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Gift } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const EasterEggModal = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="glass-panel p-8 rounded-3xl border border-amber-400/50 max-w-md w-full text-center relative shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => {
                audioSynth.playClick();
                onClose();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Gift className="w-8 h-8 text-amber-300" />
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold mb-3 border border-pink-500/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Secret Easter Egg Discovered!
            </span>

            <p className="text-lg font-serif-custom font-bold text-white leading-relaxed my-4">
              "{message}"
            </p>

            <button
              onClick={() => {
                audioSynth.playClick();
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              Keep Memory Safe ❤️
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
