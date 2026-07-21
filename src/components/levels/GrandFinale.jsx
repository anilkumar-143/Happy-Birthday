import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Flame, RotateCcw, Award, Gift, PartyPopper } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const GrandFinale = ({ friendName, onReplay }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);

  useEffect(() => {
    // Launch initial mega fireworks confetti
    triggerFireworks();
  }, []);

  const triggerFireworks = () => {
    audioSynth.playVictory();

    const end = Date.now() + 4 * 1000;
    const colors = ['#ec4899', '#8b5cf6', '#fbbf24', '#38bdf8', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleBlowCandles = () => {
    if (candlesBlown) return;

    audioSynth.playBlowout();
    setCandlesBlown(true);

    // Confetti celebration burst
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-24 relative z-10 text-center max-w-4xl mx-auto"
    >
      <div className="glass-panel p-5 sm:p-12 md:p-16 rounded-3xl border border-pink-500/50 shadow-2xl relative w-full">
        {/* Floating Balloons Simulation */}
        <div className="absolute -top-10 left-8 text-4xl animate-bounce">🎈</div>
        <div className="absolute -top-12 right-8 text-4xl animate-bounce delay-300">🎈</div>

        {/* Top Celebration Banner */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white text-xs sm:text-sm font-extrabold mb-6 shadow-lg shadow-pink-500/30 border border-white/20"
        >
          <PartyPopper className="w-4 h-4" />
          <span>The Grand Finale Celebration</span>
          <PartyPopper className="w-4 h-4" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif-custom text-gradient-pink-gold mb-6 leading-tight">
          🎉 Happy Birthday, {friendName}! ❤️
        </h1>

        {/* Interactive Birthday Cake with Candles */}
        <div className="my-8 relative inline-block">
          <div className="bg-slate-900/60 p-6 rounded-3xl border border-white/10 shadow-2xl inline-block">
            {/* SVG Interactive Cake */}
            <div className="relative w-48 h-40 mx-auto flex flex-col items-center justify-end">
              {/* Candles Layer */}
              <div className="flex gap-4 mb-1 z-10">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="flex flex-col items-center cursor-pointer group" onClick={handleBlowCandles}>
                    {/* Flame */}
                    <AnimatePresence>
                      {!candlesBlown ? (
                        <motion.div
                          exit={{ opacity: 0, scale: 0 }}
                          className="w-4 h-6 bg-gradient-to-t from-amber-500 via-yellow-400 to-white rounded-full animate-flame shadow-lg shadow-amber-400/50 mb-0.5"
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: [0, 0.8, 0], y: -15 }}
                          transition={{ duration: 1.5 }}
                          className="text-xs text-slate-400 font-bold mb-1"
                        >
                          💨
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {/* Wax stick */}
                    <div className="w-2.5 h-10 bg-gradient-to-b from-pink-300 to-purple-400 rounded-sm shadow-xs" />
                  </div>
                ))}
              </div>

              {/* Top Cake Tier */}
              <div className="w-36 h-12 bg-gradient-to-r from-pink-400 via-purple-300 to-pink-400 rounded-t-2xl border-t-4 border-white shadow-md flex items-center justify-center text-xs font-bold text-slate-800">
                🍓 ✨ 🍓
              </div>
              {/* Bottom Cake Tier */}
              <div className="w-48 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 rounded-b-2xl border-t-4 border-amber-300 shadow-xl flex items-center justify-center text-white font-bold">
                🎂 HAPPY BIRTHDAY 🎂
              </div>
            </div>

            {/* Candle instruction button */}
            <button
              onClick={handleBlowCandles}
              className={`mt-4 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 mx-auto ${
                candlesBlown
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse hover:bg-amber-400/30'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              {candlesBlown ? 'Wish Made! Candles Blown Out ✨' : 'Click to Blow Out Candles 💨'}
            </button>
          </div>
        </div>

        {/* Final Emotional Paragraph */}
        <p className="text-slate-200 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto my-6">
          "May your life always be filled with happiness, success, good health, beautiful memories, and countless reasons to smile. Thank you for being such a wonderful friend. Wishing you the happiest birthday ever!"
        </p>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              audioSynth.playClick();
              triggerFireworks();
            }}
            className="px-6 py-3.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-sm hover:bg-purple-500/30 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>More Fireworks 🎆</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              audioSynth.playClick();
              onReplay();
            }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center gap-2 border border-white/20 glow-pulse"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay the Surprise</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
