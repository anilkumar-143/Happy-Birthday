import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const Level6WishesWall = ({ wishes = [], onAddWish, onNext }) => {
  const [newWishInput, setNewWishInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateWish = (e) => {
    e.preventDefault();
    if (!newWishInput.trim()) return;

    audioSynth.playClick();
    onAddWish(newWishInput.trim());
    setNewWishInput('');
    setIsAdding(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen px-4 py-24 max-w-6xl mx-auto relative z-10"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-3 border border-pink-500/40">
          <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 6: Sticky Wishes Wall</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-custom text-white mb-3">
          Birthday Wishes Wall 💌
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
          Warm handwritten notes pinned just for you. Feel free to add your own wish!
        </p>

        {/* Add Wish Trigger */}
        <button
          onClick={() => {
            audioSynth.playClick();
            setIsAdding(!isAdding);
          }}
          className="mt-4 px-5 py-2 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 hover:bg-pink-500/30 text-xs font-bold transition-all inline-flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Pin a New Wish
        </button>

        {/* Add Wish Form */}
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleCreateWish}
            className="mt-4 max-w-md mx-auto flex items-center gap-2 glass-panel p-2 rounded-2xl border border-pink-400/40"
          >
            <input
              type="text"
              placeholder="Write a wish..."
              value={newWishInput}
              onChange={(e) => setNewWishInput(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none font-handwriting text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs shadow-md hover:scale-105 transition-transform"
            >
              Pin Note 📌
            </button>
          </motion.form>
        )}
      </div>

      {/* Floating Sticky Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
        {wishes.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            drag
            dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
            whileHover={{ scale: 1.05, zIndex: 20 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${item.color || 'from-pink-400 to-purple-300'} text-slate-900 shadow-2xl cursor-grab active:cursor-grabbing transform ${item.rotate || ''} relative border border-white/40 group`}
          >
            {/* Tape Header */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 backdrop-blur-xs rounded-xs" />

            <p className="font-handwriting text-2xl sm:text-3xl font-bold leading-relaxed text-slate-900 mb-2">
              "{item.text}"
            </p>
            <div className="flex items-center justify-between text-xs text-slate-800 font-semibold pt-2 border-t border-slate-900/10">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Pinned Wish
              </span>
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Level Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            audioSynth.playClick();
            onNext();
          }}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-bold text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center justify-center gap-2 mx-auto border border-white/20 glow-pulse"
        >
          <span>Prepare for the Grand Surprise</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
