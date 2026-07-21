import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Layers, Grid, ChevronLeft, ChevronRight, X, Heart, Sparkles, Plus, Upload, ArrowRight } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const Level3MemoryGallery = ({ photos = [], onSelectEasterEgg, onNext }) => {
  const [viewMode, setViewMode] = useState('polaroid'); // 'polaroid' | 'carousel' | 'grid'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const activePhotos = photos;

  const handlePhotoClick = (photo) => {
    audioSynth.playCardFlip();
    setSelectedPhoto(photo);
    if (photo.easterEgg) {
      onSelectEasterEgg(photo.easterEgg);
    }
  };

  const nextCarousel = () => {
    audioSynth.playClick();
    setCarouselIndex((prev) => (prev + 1) % activePhotos.length);
  };

  const prevCarousel = () => {
    audioSynth.playClick();
    setCarouselIndex((prev) => (prev - 1 + activePhotos.length) % activePhotos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen px-4 py-24 max-w-6xl mx-auto relative z-10"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-3 border border-pink-500/40">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>Level 3: Memory Gallery</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-custom text-white mb-3">
          Our Special Moments & Memories 📸
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto">
          Click any photo to open Lightbox view & uncover hidden secret notes!
        </p>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6">
          <button
            onClick={() => { audioSynth.playClick(); setViewMode('polaroid'); }}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'polaroid'
                ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Floating Polaroids
          </button>

          <button
            onClick={() => { audioSynth.playClick(); setViewMode('carousel'); }}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'carousel'
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> 3D Carousel
          </button>

          <button
            onClick={() => { audioSynth.playClick(); setViewMode('grid'); }}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-700'
            }`}
          >
            <Grid className="w-3.5 h-3.5" /> Masonry Grid
          </button>
        </div>
      </div>

      {/* VIEW 1: POLAROID FRAMES */}
      {viewMode === 'polaroid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {activePhotos.map((item, idx) => {
            const rotations = ['-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-1'];
            const rot = rotations[idx % rotations.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                onClick={() => handlePhotoClick(item)}
                className={`bg-white text-slate-900 p-4 rounded-sm shadow-2xl cursor-pointer transition-all duration-300 transform ${rot} border-8 border-white group relative`}
              >
                {/* Polaroid Washi Tape simulation */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-200/60 backdrop-blur-xs rounded-xs rotate-1 z-10 border border-amber-300/40" />

                <div className="aspect-4/3 overflow-hidden rounded-xs bg-slate-100 relative">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 text-white">
                    <span className="text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Click for Secret
                    </span>
                  </div>
                </div>

                <div className="pt-3 pb-1 text-center font-handwriting text-2xl text-slate-800 font-bold">
                  {item.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: 3D CAROUSEL */}
      {viewMode === 'carousel' && (
        <div className="relative max-w-xl mx-auto py-12 flex items-center justify-center">
          <button
            onClick={prevCarousel}
            className="absolute left-0 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-pink-500 transition-all shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={carouselIndex}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -45 }}
              transition={{ duration: 0.5 }}
              onClick={() => handlePhotoClick(activePhotos[carouselIndex])}
              className="glass-panel p-4 rounded-3xl border border-pink-500/40 cursor-pointer text-center max-w-md w-full shadow-2xl group"
            >
              <div className="aspect-4/3 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={activePhotos[carouselIndex]?.url}
                  alt={activePhotos[carouselIndex]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold font-serif-custom text-white mb-1">
                {activePhotos[carouselIndex]?.title}
              </h3>
              <p className="text-xs text-pink-300 mb-2">{activePhotos[carouselIndex]?.caption}</p>
              <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-semibold bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                <Sparkles className="w-3.5 h-3.5" /> Tap to expand Lightbox
              </span>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={nextCarousel}
            className="absolute right-0 z-20 p-3 rounded-full bg-slate-900/80 border border-white/20 text-white hover:bg-pink-500 transition-all shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* VIEW 3: MASONRY GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
          {activePhotos.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => handlePhotoClick(item)}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-white text-base mb-1 font-serif-custom">{item.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="glass-panel p-6 rounded-3xl border border-pink-500/50 max-w-2xl w-full relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden mb-4 max-h-[60vh] bg-slate-950 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold font-serif-custom text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-slate-200 mb-4">{selectedPhoto.caption}</p>

                {selectedPhoto.easterEgg && (
                  <div className="p-3 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold flex items-center justify-center gap-2 animate-pulse">
                    <Heart className="w-4 h-4 fill-pink-400" />
                    <span>{selectedPhoto.easterEgg}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <span>Continue to Friendship Timeline</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};
