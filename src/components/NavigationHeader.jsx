import React from 'react';
import { Volume2, VolumeX, Sparkles, Settings, Heart, Music, RotateCcw } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const NavigationHeader = ({
  friendName,
  currentLevel,
  totalLevels = 7,
  isMuted,
  onToggleMute,
  onOpenCustomizer,
  onResetJourney,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 py-2.5 sm:px-4 sm:py-3 bg-slate-950/70 backdrop-blur-md border-b border-pink-500/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Friend Name & Title */}
        <div className="flex items-center space-x-2 sm:space-x-3 truncate">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30 animate-pulse shrink-0">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
          </div>
          <div className="truncate">
            <h1 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide flex items-center gap-1 font-serif-custom truncate">
              <span className="truncate">For {friendName}</span>
              <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 shrink-0 hidden xs:inline-block">
                Special
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">A journey crafted with love & memories</p>
          </div>
        </div>

        {/* Center: Journey Progress Indicator */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-900/60 px-4 py-1.5 rounded-full border border-white/10">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-300 font-medium">
            Stage {Math.min(currentLevel, totalLevels)} of {totalLevels}
          </span>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden ml-2">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 transition-all duration-500"
              style={{ width: `${(Math.min(currentLevel, totalLevels) / totalLevels) * 100}%` }}
            />
          </div>
        </div>

        {/* Right: Actions (Music Toggle, Personalizer, Reset) */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Audio Mute/Unmute */}
          <button
            onClick={() => {
              audioSynth.playClick();
              onToggleMute();
            }}
            className={`p-2 sm:p-2.5 rounded-full border transition-all duration-300 flex items-center gap-1.5 text-xs font-medium ${
              isMuted
                ? 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-pink-500/20 border-pink-500/40 text-pink-300 hover:bg-pink-500/30 shadow-lg shadow-pink-500/20'
            }`}
            title={isMuted ? "Unmute Music & Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-bounce text-pink-400" />}
            <span className="hidden md:inline">{isMuted ? 'Muted' : 'Music On'}</span>
          </button>

          {/* Personalize / Drawer Trigger */}
          <button
            onClick={() => {
              audioSynth.playClick();
              onOpenCustomizer();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-1.5 text-xs font-medium"
            title="Personalize Name, Music & Photos"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Customize</span>
          </button>

          {/* Reset Journey */}
          <button
            onClick={() => {
              audioSynth.playClick();
              onResetJourney();
            }}
            className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300"
            title="Replay from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
