// Web Audio API Synthesizer & Sound Effects Engine for Interactive Birthday Experience

class AudioSynthEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.isMuted = false;
    this.volume = 0.5;
    this.timerId = null;
    this.masterGain = null;
    
    // Track modes: 'synth', 'musicbox', 'lofi', 'custom'
    this.currentTrack = 'synth';
    this.customAudio = null;
    this.customTrackName = 'Custom Track';

    this.presetTracks = [
      { id: 'synth', name: '🎹 Soft Birthday Piano (Synth)' },
      { id: 'musicbox', name: '🎵 Magical Music Box' },
      { id: 'lofi', name: '✨ Dreamy Lofi Harmony' },
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
    }
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : this.volume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
    }
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  // Load user custom audio file or URL
  loadCustomAudio(fileOrUrl, name = 'Uploaded Track') {
    this.stopBackgroundMusic();
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }

    const src = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
    this.customAudio = new Audio(src);
    this.customAudio.loop = true;
    this.customAudio.volume = this.isMuted ? 0 : this.volume;
    this.customAudio.muted = this.isMuted;
    this.customTrackName = name || (typeof fileOrUrl !== 'string' ? fileOrUrl.name : 'Custom Track');
    this.currentTrack = 'custom';

    if (this.isPlayingMusic) {
      this.startBackgroundMusic();
    }
  }

  setTrack(trackId) {
    const wasPlaying = this.isPlayingMusic;
    this.stopBackgroundMusic();
    this.currentTrack = trackId;
    if (wasPlaying) {
      this.startBackgroundMusic();
    }
  }

  playNote(freq, type = 'sine', duration = 0.5, delay = 0, gainVal = 0.2) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    const now = this.ctx.currentTime + delay;
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(gainVal * (this.isMuted ? 0 : 1), now + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  startBackgroundMusic() {
    this.isPlayingMusic = true;
    this.init();

    if (this.currentTrack === 'custom' && this.customAudio) {
      this.customAudio.play().catch(() => {});
      return;
    }

    let melody = [];
    let chords = [];
    let oscType = 'triangle';

    if (this.currentTrack === 'musicbox') {
      oscType = 'sine';
      melody = [
        { f: 523.25, d: 0.3 }, { f: 523.25, d: 0.3 }, { f: 587.33, d: 0.6 }, { f: 523.25, d: 0.6 }, { f: 698.46, d: 0.6 }, { f: 659.25, d: 1.0 },
        { f: 523.25, d: 0.3 }, { f: 523.25, d: 0.3 }, { f: 587.33, d: 0.6 }, { f: 523.25, d: 0.6 }, { f: 783.99, d: 0.6 }, { f: 698.46, d: 1.0 },
        { f: 523.25, d: 0.3 }, { f: 523.25, d: 0.3 }, { f: 1046.5, d: 0.6 }, { f: 880.00, d: 0.6 }, { f: 698.46, d: 0.6 }, { f: 659.25, d: 0.6 }, { f: 587.33, d: 0.8 },
      ];
      chords = [523.25, 659.25, 783.99];
    } else if (this.currentTrack === 'lofi') {
      oscType = 'sine';
      melody = [
        { f: 329.63, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 440.00, d: 0.8 }, { f: 493.88, d: 1.2 },
        { f: 440.00, d: 0.8 }, { f: 392.00, d: 0.8 }, { f: 329.63, d: 1.2 },
      ];
      chords = [196.00, 246.94, 293.66, 349.23];
    } else {
      // Default synth piano
      melody = [
        { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.3 }, { f: 293.66, d: 0.7 }, { f: 261.63, d: 0.7 }, { f: 349.23, d: 0.7 }, { f: 329.63, d: 1.2 },
        { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.3 }, { f: 293.66, d: 0.7 }, { f: 261.63, d: 0.7 }, { f: 392.00, d: 0.7 }, { f: 349.23, d: 1.2 },
        { f: 261.63, d: 0.4 }, { f: 261.63, d: 0.3 }, { f: 523.25, d: 0.7 }, { f: 440.00, d: 0.7 }, { f: 349.23, d: 0.7 }, { f: 329.63, d: 0.7 }, { f: 293.66, d: 1.0 },
        { f: 466.16, d: 0.4 }, { f: 466.16, d: 0.3 }, { f: 440.00, d: 0.7 }, { f: 349.23, d: 0.7 }, { f: 392.00, d: 0.7 }, { f: 349.23, d: 1.4 }
      ];
      chords = [261.63, 329.63, 392.00, 523.25];
    }

    let idx = 0;
    const playNextStep = () => {
      if (!this.isPlayingMusic || this.currentTrack === 'custom') return;
      
      const item = melody[idx % melody.length];
      this.playNote(item.f, oscType, item.d, 0, 0.15);
      
      const bgFreq = chords[idx % chords.length];
      this.playNote(bgFreq * 0.5, 'sine', 1.5, 0, 0.05);

      idx++;
      this.timerId = setTimeout(playNextStep, (item.d + 0.15) * 1000);
    };

    playNextStep();
  }

  stopBackgroundMusic() {
    this.isPlayingMusic = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  // SFX Functions
  playClick() {
    this.playNote(600, 'sine', 0.1, 0, 0.2);
    this.playNote(800, 'sine', 0.15, 0.05, 0.15);
  }

  playCardFlip() {
    this.playNote(300, 'triangle', 0.12, 0, 0.2);
    this.playNote(450, 'sine', 0.15, 0.06, 0.2);
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((f, i) => {
      this.playNote(f, 'triangle', 0.3, i * 0.12, 0.3);
    });
  }

  playCountdownBeep() {
    this.playNote(440, 'sine', 0.2, 0, 0.3);
  }

  playBlowout() {
    const notes = [880, 1046.5, 1318.51, 1760];
    notes.forEach((f, i) => {
      this.playNote(f, 'sine', 0.4, i * 0.08, 0.25);
    });
  }

  playFirework() {
    this.playNote(150 + Math.random() * 200, 'sawtooth', 0.2, 0, 0.15);
    this.playNote(800 + Math.random() * 400, 'sine', 0.3, 0.1, 0.1);
  }
}

export const audioSynth = new AudioSynthEngine();

