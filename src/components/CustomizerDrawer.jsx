import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Image, Upload, Trash2, Check, Sparkles, Music, Volume2, Link as LinkIcon, Disc } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const CustomizerDrawer = ({
  isOpen,
  onClose,
  friendName,
  onChangeName,
  photos,
  onAddPhotos,
  onDeletePhoto,
}) => {
  const [nameInput, setNameInput] = useState(friendName);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTrack, setActiveTrack] = useState(audioSynth.currentTrack);
  const [audioUrlInput, setAudioUrlInput] = useState('');
  const [customTrackLabel, setCustomTrackLabel] = useState(audioSynth.customTrackName);
  const [volume, setVolume] = useState(audioSynth.volume * 100);

  const handleNameSave = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    audioSynth.playClick();
    onChangeName(nameInput.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    audioSynth.playClick();
    const newPhotos = files.map((file, idx) => ({
      id: `custom-photo-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      caption: "Special memory uploaded with love ❤️",
      easterEgg: "Custom Surprise: You look absolutely stunning in this photo! ✨"
    }));

    onAddPhotos(newPhotos);
  };

  const handleAudioFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    audioSynth.playClick();
    audioSynth.loadCustomAudio(file, file.name);
    setActiveTrack('custom');
    setCustomTrackLabel(file.name);
  };

  const handleAudioUrlSubmit = (e) => {
    e.preventDefault();
    if (!audioUrlInput.trim()) return;

    audioSynth.playClick();
    audioSynth.loadCustomAudio(audioUrlInput.trim(), 'Custom Audio Stream');
    setActiveTrack('custom');
    setCustomTrackLabel('Custom Audio Stream');
    setAudioUrlInput('');
  };

  const handleSelectTrack = (trackId) => {
    audioSynth.playClick();
    audioSynth.setTrack(trackId);
    setActiveTrack(trackId);
  };

  const handleVolumeChange = (e) => {
    const val = Number(e.target.value);
    setVolume(val);
    audioSynth.setVolume(val / 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-950 border-l border-pink-500/30 p-6 z-50 overflow-y-auto text-white shadow-2xl flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-serif-custom">Personalize Experience</h3>
              </div>
              <button
                onClick={() => {
                  audioSynth.playClick();
                  onClose();
                }}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* SECTION 1: Her Name */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-pink-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-pink-400" /> Birthday Girl's Name
              </label>
              <form onSubmit={handleNameSave} className="flex gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-pink-500 text-white font-serif-custom"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 font-bold text-xs transition-colors flex items-center gap-1 shadow-md"
                >
                  {savedSuccess ? <Check className="w-4 h-4" /> : 'Save'}
                </button>
              </form>
            </div>

            {/* SECTION 2: Custom Music & Soundtracks */}
            <div className="mb-6 pb-6 border-b border-slate-800">
              <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Music className="w-4 h-4 text-amber-400" /> Music & Soundtrack Options
              </label>

              {/* Preset Track Selection */}
              <div className="space-y-2 mb-4">
                {audioSynth.presetTracks.map((track) => (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(track.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      activeTrack === track.id
                        ? 'bg-pink-500/20 border-pink-500/50 text-pink-300 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Disc className={`w-4 h-4 ${activeTrack === track.id ? 'animate-spin text-pink-400' : 'text-slate-400'}`} />
                      {track.name}
                    </span>
                    {activeTrack === track.id && <Check className="w-4 h-4 text-pink-400" />}
                  </button>
                ))}

                {/* Uploaded custom track item if present */}
                {audioSynth.customAudio && (
                  <button
                    onClick={() => handleSelectTrack('custom')}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      activeTrack === 'custom'
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Disc className={`w-4 h-4 ${activeTrack === 'custom' ? 'animate-spin text-amber-400' : 'text-slate-400'}`} />
                      🎧 {customTrackLabel}
                    </span>
                    {activeTrack === 'custom' && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                )}
              </div>

              {/* Upload Custom Audio File */}
              <div className="space-y-2">
                <label className="border border-dashed border-amber-500/40 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/10 rounded-xl p-3 text-center cursor-pointer transition-all flex items-center justify-center gap-2 text-xs font-bold text-amber-300">
                  <Upload className="w-4 h-4" /> Upload Custom MP3 / Audio File
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Audio URL Input */}
                <form onSubmit={handleAudioUrlSubmit} className="flex gap-2 mt-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="url"
                      placeholder="Paste MP3 Audio URL..."
                      value={audioUrlInput}
                      onChange={(e) => setAudioUrlInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-amber-400 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 font-bold text-xs text-slate-900 transition-colors"
                  >
                    Play
                  </button>
                </form>
              </div>

              {/* Volume Slider */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 accent-pink-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                />
                <span className="text-xs text-slate-400 font-mono w-8">{volume}%</span>
              </div>
            </div>

            {/* SECTION 3: Custom Photos Uploader */}
            <div className="flex-1">
              <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-purple-400" /> Photo Gallery ({photos.length} photos)
                </span>
              </label>

              {/* Upload Drop Area */}
              <label className="border-2 border-dashed border-pink-500/40 hover:border-pink-400 bg-pink-500/5 hover:bg-pink-500/10 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-pink-400 mb-2 animate-bounce" />
                <span className="text-sm font-bold text-white mb-1">Upload 15–30 Photos</span>
                <span className="text-xs text-slate-400">Select images from your device to add immediately</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* List of Photos */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {photos.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-800"
                      />
                      <div className="truncate">
                        <h5 className="text-xs font-bold truncate text-slate-200">{item.title}</h5>
                        <p className="text-[10px] text-slate-400 truncate">{item.caption}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        audioSynth.playClick();
                        onDeletePhoto(item.id);
                      }}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
              Changes apply live to all interactive levels!
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

