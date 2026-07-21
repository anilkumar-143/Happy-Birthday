import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Heart, Smile, Compass, Flame, Rocket, ArrowRight } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const Level4Timeline = ({ timeline = [], onNext }) => {
  const getIcon = (idx) => {
    const icons = [
      <Heart className="w-5 h-5 text-pink-400" />,
      <Smile className="w-5 h-5 text-amber-400" />,
      <Compass className="w-5 h-5 text-sky-400" />,
      <Flame className="w-5 h-5 text-orange-400" />,
      <Rocket className="w-5 h-5 text-purple-400" />
    ];
    return icons[idx % icons.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen px-4 py-24 max-w-4xl mx-auto relative z-10"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3 border border-purple-500/40">
          <Calendar className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 4: Friendship Journey</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-custom text-white mb-3">
          Our Friendship Timeline ⏳
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
          Every memory with you is a priceless treasure frozen in time.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-pink-500/30 ml-4 sm:ml-32 space-y-12 my-8">
        {timeline.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative pl-8 sm:pl-10 group"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-4 top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-125 transition-transform duration-300">
              {getIcon(idx)}
            </div>

            {/* Left Year Label for Desktop */}
            <div className="hidden sm:block absolute -left-32 top-2 w-24 text-right text-xs font-bold text-pink-300 font-serif-custom">
              {item.year}
            </div>

            {/* Card Content */}
            <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 relative">
              <span className="inline-block sm:hidden text-xs font-bold text-pink-300 mb-1">
                {item.year}
              </span>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold font-serif-custom text-white flex items-center gap-2">
                  {item.title}
                </h3>
                {item.tag && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {item.tag}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
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
          className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center justify-center gap-2 mx-auto border border-white/20 glow-pulse"
        >
          <span>Discover Why You're Amazing</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
