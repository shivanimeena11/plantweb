// ThankYouPopup.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Colors for flowers
const flowerColors = ["#FECACA", "#FBCFE8", "#C7D2FE", "#A7F3D0", "#FDE68A"];

// Fullscreen floating flowers
const flowerArray = Array.from({ length: 30 });

const ThankYouPopup = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Directly navigate to Home
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Floating flowers */}
      {flowerArray.map((_, i) => {
        const size = 8 + Math.random() * 20;
        const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = 3 + Math.random() * 3;
        const delay = Math.random() * 2;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              top: `${top}%`,
              left: `${left}%`,
              opacity: 0.85,
            }}
            animate={{
              y: [0, -50, 30],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, Math.random() * 360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "loop",
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Popup card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.75, opacity: 0, y: 70 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.7 }}
        className="relative bg-white/95 backdrop-blur-xl border-2 border-emerald-100 rounded-3xl shadow-2xl px-8 md:px-12 py-16 flex flex-col items-center max-w-sm text-center overflow-hidden"
      >
        {/* Header */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-bold text-4xl md:text-5xl text-emerald-700 mb-4 drop-shadow-lg tracking-tight font-serif"
        >
          Thank You!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-gray-800 mb-10 px-2 md:px-4 text-base md:text-lg leading-relaxed font-sans"
        >
          Your plant friends are on the way. You make the jungle bloom! 🌿💚
        </motion.p>

        {/* Gradient Button with Glow */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(34,197,94,0.6)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoHome} // Direct navigation to Home
          className="relative px-10 md:px-12 py-3 md:py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-bold rounded-full shadow-lg border border-green-300 overflow-hidden transition-all duration-300 font-sans tracking-wide hover:from-emerald-400 hover:via-green-500 hover:to-emerald-500"
        >
          <span className="relative z-10">Back to Shop</span>
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-20 transition-all duration-500" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ThankYouPopup;
