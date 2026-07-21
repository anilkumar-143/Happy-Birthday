import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, RefreshCw, ArrowRight, Heart } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

export const Level1TicTacToe = ({ friendName, onComplete }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [celebrated, setCelebrated] = useState(false);

  // Check lines
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    if (squares.every((sq) => sq !== null)) {
      return { winner: 'Tie', line: null };
    }
    return null;
  };

  // Player move
  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    audioSynth.playClick();
    const newBoard = [...board];
    newBoard[index] = '❌';
    setBoard(newBoard);

    const res = checkWinner(newBoard);
    if (res) {
      handleGameEnd(res.winner);
    } else {
      setIsXNext(false);
    }
  };

  // Friendly Casual AI logic
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board
          .map((val, idx) => (val === null ? idx : null))
          .filter((val) => val !== null);

        if (emptyIndices.length > 0) {
          // Play casually: randomly pick an empty spot, avoiding obvious block 80% of the time
          let aiChoice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

          audioSynth.playClick();
          const newBoard = [...board];
          newBoard[aiChoice] = '⭕';
          setBoard(newBoard);

          const res = checkWinner(newBoard);
          if (res) {
            handleGameEnd(res.winner);
          } else {
            setIsXNext(true);
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  // Handle Game Victory
  const handleGameEnd = (resultWinner) => {
    setWinner(resultWinner);
    if (resultWinner === '❌' && !celebrated) {
      setCelebrated(true);
      audioSynth.playVictory();
      setIsShaking(true);

      // Camera Shake reset
      setTimeout(() => setIsShaking(false), 800);

      // Confetti & Fireworks Explosion
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f472b6', '#c084fc', '#fbbf24', '#ffffff']
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f472b6', '#c084fc', '#fbbf24', '#ffffff']
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  const handleReset = () => {
    audioSynth.playClick();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setCelebrated(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-20 relative z-10 transition-transform ${
        isShaking ? 'animate-bounce' : ''
      }`}
    >
      <div className="max-w-md w-full glass-panel p-5 sm:p-8 rounded-3xl border border-pink-500/30 text-center relative shadow-2xl">
        {/* Level Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-4 border border-pink-500/40">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Level 1: Challenge</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-custom text-white mb-2">
          Tic Tac Toe Challenge ❌ ⭕
        </h2>
        <p className="text-sm text-slate-300 mb-6">
          Beat the AI to unlock your birthday surprise! You play as <span className="text-pink-400 font-bold">❌</span>.
        </p>

        {/* Game Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-xs mx-auto">
          {board.map((cell, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: cell ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(idx)}
              className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl glass-card border border-white/20 text-3xl sm:text-4xl flex items-center justify-center shadow-lg transition-colors hover:border-pink-400/50 bg-slate-900/60"
            >
              {cell}
            </motion.button>
          ))}
        </div>

        {/* Victory / Game State Display */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-500/30 border border-pink-400/50 mb-6"
            >
              {winner === '❌' ? (
                <div>
                  <h3 className="text-xl font-bold text-yellow-300 font-serif-custom mb-1 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    Congratulations! 🎉❤️
                  </h3>
                  <p className="text-sm text-slate-200">
                    You unlocked your Birthday Surprise! You're brilliant!
                  </p>
                </div>
              ) : winner === 'Tie' ? (
                <div>
                  <h3 className="text-lg font-bold text-slate-200 mb-1">It's a Tie! 🤝</h3>
                  <p className="text-xs text-slate-400">Give it another quick spin to unlock the surprise!</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-slate-200 mb-1">Close One! 🤖</h3>
                  <p className="text-xs text-slate-400">Try again! Victory is right around the corner.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-3">
          {winner === '❌' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audioSynth.playClick();
                onComplete();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 flex items-center justify-center gap-2 border border-white/20 glow-pulse"
            >
              <span>Unlock Birthday Reveal</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <button
              onClick={handleReset}
              className="py-2.5 px-5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 flex items-center gap-2 border border-slate-700 transition-all mx-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Game</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
