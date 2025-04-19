import { useGameMode } from "../context/GameModeContext";
import DifficultySettings from "./DifficultySettings";

export default function StartScreen({ onStart }) {
  const { mode, setMode } = useGameMode();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold text-orange-500">
        Choose Game Mode
      </h2>

      <button
        onClick={() => {
          setMode("multiplayer");
          onStart();
        }}
        className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Multiplayer (PvP)
      </button>

      <button
        onClick={() => setMode("cpu")}
        className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        Play vs Computer
      </button>

      {mode === "cpu" && (
        <>
          <DifficultySettings />
          <button
            onClick={onStart}
            className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
          >
            Start Game
          </button>
        </>
      )}
    </div>
  );
}
