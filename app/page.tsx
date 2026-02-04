"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Trophy } from "lucide-react";

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F"];

export default function AaishaGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targets, setTargets] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const EMOJIS = ["⭐", "💖", "🌈", "🦋", "🌸", "🎀", "🍭", "🦄"];

  const spawnTarget = useCallback(() => {
    const newTarget = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    };
    setTargets((prev) => [...prev.slice(-4), newTarget]);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      spawnTarget();
    }, 2000 - level * 200);
    return () => clearInterval(interval);
  }, [gameStarted, level, spawnTarget]);

  const handleClick = (id) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
    setScore((prev) => {
      const newScore = prev + 10;
      if (newScore % 50 === 0) {
        setLevel((l) => l + 1);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: COLORS });
      }
      if (newScore > highScore) setHighScore(newScore);
      return newScore;
    });
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 }, colors: [COLORS[Math.floor(Math.random() * COLORS.length)]] });
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLevel(1);
    setTargets([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"><span className="text-2xl">⭐ {score}</span></div>
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"><span className="text-lg font-bold text-purple-600">Level {level}</span></div>
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"><Trophy className="inline w-5 h-5 text-yellow-500 mr-1" /><span className="text-lg">{highScore}</span></div>
      </div>

      <div className="relative h-screen flex items-center justify-center">
        {!gameStarted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md mx-4">
            <div className="text-6xl mb-4">🎮✨</div>
            <h1 className="text-3xl font-bold text-purple-600 mb-2">Hi Aaisha! 👋</h1>
            <p className="text-gray-600 mb-6 text-lg">Tap the sparkly things to score points!</p>
            <button onClick={startGame} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-xl px-8 py-6 rounded-full shadow-lg transform transition hover:scale-105">
              <Sparkles className="inline mr-2" />Start Playing!
            </button>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              {targets.map((target) => (
                <motion.button key={target.id} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }}
                  whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => handleClick(target.id)}
                  style={{ position: "absolute", left: `${target.x}%`, top: `${target.y}%`, backgroundColor: target.color, boxShadow: `0 4px 15px ${target.color}80` }}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all"
                >
                  {target.emoji}
                </motion.button>
              ))}
            </AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <p className="text-gray-700">Tap the stars and hearts! ⭐💖</p>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
