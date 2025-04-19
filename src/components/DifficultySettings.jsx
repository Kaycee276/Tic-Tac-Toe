import { useGameMode } from "../context/GameModeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function DifficultyModal({ onClose, onSelect }) {
  const { setDifficulty } = useGameMode();

  const handleChoose = (level) => {
    setDifficulty(level);
    onSelect(level);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const difficultyOptions = [
    {
      level: "easy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "text-green-400",
    },
    {
      level: "normal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "text-yellow-400",
    },
    {
      level: "hard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "text-red-400",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleOutsideClick}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 w-full max-w-sm shadow-2xl border border-gray-700"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          <div className="flex flex-col items-center mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-white text-center w-full">
              Select Difficulty
            </h2>
            {/* <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> */}
          </div>

          <div className="space-y-4">
            {difficultyOptions.map((option) => (
              <motion.button
                key={option.level}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoose(option.level)}
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all hover:bg-gray-700/50 text-white flex items-center gap-3 border border-gray-600`}
              >
                <span className={`${option.color} flex-shrink-0`}>
                  {option.icon}
                </span>
                <span className="text-left flex-grow">
                  {option.level.charAt(0).toUpperCase() + option.level.slice(1)}
                </span>
                <span
                  className={`h-2 w-2 rounded-full ${option.color.replace(
                    "text",
                    "bg"
                  )}`}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
