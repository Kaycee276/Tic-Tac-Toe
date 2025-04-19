import { useState } from "react";
import { useGameMode } from "../context/GameModeContext";
import DifficultyModal from "./DifficultySettings";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { mode, setMode, setDifficulty, difficulty, setResetBoard } =
    useGameMode();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModeChange = (newMode) => {
    if (mode !== newMode) {
      setMode(newMode);
      setResetBoard(true);
    }
    setShowDropdown(false);
    if (newMode === "cpu") {
      setShowModal(true);
    }
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setResetBoard(true);
    setShowModal(false);
  };

  return (
    <header className="w-full px-4 py-6 sm:px-6 sm:py-8 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        <h1 className="text-xl font-bold  relative z-10 ">
          <span className="text-orange-500">Tic</span> Tac{" "}
          <span className="text-blue-500">Toe</span>
        </h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="px-5 py-2.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-black font-medium hover:bg-white/20 transition-all flex items-center gap-2 shadow-sm"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {mode === "multiplayer" ? "Multiplayer" : "Vs Computer"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-lg text-black shadow-xl rounded-lg z-10 overflow-hidden border border-gray-700"
                >
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-white/10 transition flex items-center gap-2"
                    onClick={() => handleModeChange("multiplayer")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                    </svg>
                    Multiplayer
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-white/10 transition flex items-center gap-2"
                    onClick={() => handleModeChange("cpu")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Vs Computer
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mode === "cpu" && (
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-md text-black rounded-lg font-medium hover:bg-white/20 transition-all border border-white/20 shadow-sm flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {difficulty}
            </button>
          )}
        </div>
      </div>

      {showModal && (
        <DifficultyModal
          onClose={() => setShowModal(false)}
          onSelect={handleDifficultyChange}
        />
      )}
    </header>
  );
}

export default Header;
