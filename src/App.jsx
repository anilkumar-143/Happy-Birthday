import React, { useState } from 'react';
import { initialBirthdayData } from './utils/defaultData';
import { audioSynth } from './utils/audioSynth';
import { ParticleCanvas } from './components/ParticleCanvas';
import { NavigationHeader } from './components/NavigationHeader';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { EasterEggModal } from './components/EasterEggModal';

import { LandingScreen } from './components/levels/LandingScreen';
import { Level1TicTacToe } from './components/levels/Level1TicTacToe';
import { Level2BirthdayReveal } from './components/levels/Level2BirthdayReveal';
import { Level3MemoryGallery } from './components/levels/Level3MemoryGallery';
import { Level4Timeline } from './components/levels/Level4Timeline';
import { Level5WhyAmazing } from './components/levels/Level5WhyAmazing';
import { Level6WishesWall } from './components/levels/Level6WishesWall';
import { Level7Countdown } from './components/levels/Level7Countdown';
import { GrandFinale } from './components/levels/GrandFinale';

export function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [friendName, setFriendName] = useState(initialBirthdayData.friendName);
  const [photos, setPhotos] = useState(initialBirthdayData.photos);
  const [wishes, setWishes] = useState(initialBirthdayData.wishes);
  const [isMuted, setIsMuted] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [easterEggMessage, setEasterEggMessage] = useState(null);

  const handleToggleMute = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  const handleAddPhotos = (newPhotos) => {
    setPhotos((prev) => [...newPhotos, ...prev]);
  };

  const handleDeletePhoto = (photoId) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  const handleAddWish = (wishText) => {
    const newWish = {
      id: `wish-${Date.now()}`,
      text: wishText,
      color: 'from-pink-400 to-amber-300',
      rotate: 'rotate-1'
    };
    setWishes((prev) => [newWish, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden font-sans selection:bg-pink-500 selection:text-white">
      {/* Background Interactive Canvas */}
      <ParticleCanvas intensity={currentLevel >= 7 ? 'high' : 'normal'} />

      {/* Navigation Header (Only show after level 0) */}
      {currentLevel > 0 && (
        <NavigationHeader
          friendName={friendName}
          currentLevel={currentLevel}
          totalLevels={7}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          onResetJourney={() => setCurrentLevel(0)}
        />
      )}

      {/* Level Renderer */}
      <main className="relative z-10">
        {currentLevel === 0 && (
          <LandingScreen
            friendName={friendName}
            onStart={() => setCurrentLevel(1)}
          />
        )}

        {currentLevel === 1 && (
          <Level1TicTacToe
            friendName={friendName}
            onComplete={() => setCurrentLevel(2)}
          />
        )}

        {currentLevel === 2 && (
          <Level2BirthdayReveal
            friendName={friendName}
            messages={initialBirthdayData.birthdayMessage}
            onNext={() => setCurrentLevel(3)}
          />
        )}

        {currentLevel === 3 && (
          <Level3MemoryGallery
            photos={photos}
            onSelectEasterEgg={(msg) => setEasterEggMessage(msg)}
            onNext={() => setCurrentLevel(4)}
          />
        )}

        {currentLevel === 4 && (
          <Level4Timeline
            timeline={initialBirthdayData.timeline}
            onNext={() => setCurrentLevel(5)}
          />
        )}

        {currentLevel === 5 && (
          <Level5WhyAmazing
            compliments={initialBirthdayData.compliments}
            onNext={() => setCurrentLevel(6)}
          />
        )}

        {currentLevel === 6 && (
          <Level6WishesWall
            wishes={wishes}
            onAddWish={handleAddWish}
            onNext={() => setCurrentLevel(7)}
          />
        )}

        {currentLevel === 7 && (
          <Level7Countdown
            onCountdownFinish={() => setCurrentLevel(8)}
          />
        )}

        {currentLevel === 8 && (
          <GrandFinale
            friendName={friendName}
            onReplay={() => setCurrentLevel(0)}
          />
        )}
      </main>

      {/* Personalization Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        friendName={friendName}
        onChangeName={(name) => setFriendName(name)}
        photos={photos}
        onAddPhotos={handleAddPhotos}
        onDeletePhoto={handleDeletePhoto}
      />

      {/* Secret Easter Egg Modal */}
      <EasterEggModal
        message={easterEggMessage}
        onClose={() => setEasterEggMessage(null)}
      />
    </div>
  );
}

export default App;
