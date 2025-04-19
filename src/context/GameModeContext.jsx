// src/components/GameModeContext.jsx
import { createContext, useContext, useState } from "react";

const GameModeContext = createContext();

export function GameModeProvider({ children }) {
  const [mode, setMode] = useState("multiplayer"); // 'multiplayer' or 'cpu'
  const [difficulty, setDifficulty] = useState("easy"); // 'easy' | 'normal' | 'hard'
  const [resetBoard, setResetBoard] = useState(false); // triggers board reset

  return (
    <GameModeContext.Provider
      value={{
        mode,
        setMode,
        difficulty,
        setDifficulty,
        resetBoard,
        setResetBoard,
      }}
    >
      {children}
    </GameModeContext.Provider>
  );
}

export const useGameMode = () => useContext(GameModeContext);
