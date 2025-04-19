import Board from "./components/Board";
import Header from "./components/Header";

import { GameModeProvider } from "./context/GameModeContext";

function App() {
  return (
    <GameModeProvider>
      <div className="bg-[#f0f8ff] min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <Board />
        </div>
      </div>
    </GameModeProvider>
  );
}

export default App;
