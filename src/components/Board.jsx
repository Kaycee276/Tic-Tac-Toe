import { useEffect, useState } from "react";
import { useGameMode } from "../context/GameModeContext";
import { getEasyMove, getNormalMove, getHardMove } from "../utils/ai";
import Square from "./Square";
import { motion } from "framer-motion";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const { mode, difficulty, resetBoard, setResetBoard } = useGameMode();

  useEffect(() => {
    if (mode === "cpu" && !xIsNext && !winner) {
      const timeout = setTimeout(() => {
        let index;
        if (difficulty === "easy") index = getEasyMove(board);
        else if (difficulty === "normal")
          index = getNormalMove(board, "O", "X");
        else index = getHardMove(board, "O", "X");

        if (index !== undefined && board[index] === null) {
          const newBoard = [...board];
          newBoard[index] = "O";
          setBoard(newBoard);
          setXIsNext(true);
          checkWinner(newBoard);
        }
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [board, xIsNext, winner, difficulty, mode]);

  function checkWinner(board) {
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) setWinner("draw");
  }

  function handleClick(index) {
    if (board[index] || winner || (mode === "cpu" && !xIsNext)) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    checkWinner(newBoard);
  }

  function restart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  useEffect(() => {
    if (resetBoard) {
      setBoard(Array(9).fill(null));
      setXIsNext(true);
      setWinner(null);
      setResetBoard(false); // reset the flag
    }
  }, [resetBoard, setResetBoard]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Square value={value} onClick={() => handleClick(idx)} />
          </motion.div>
        ))}
      </div>
      {winner && (
        <>
          <div className="text-center mt-10">
            <p
              className={`text-3xl font-semibold transition-colors duration-150`}
            >
              {winner === "draw" ? "It's a draw!" : `${winner} wins!`}
            </p>
          </div>
          <button
            onClick={restart}
            className="mt-2 p-10 bg-orange-500 text-white rounded-xl cursor-pointer w-full shadow-lg shadow-[rgba(0,0,0,0.8)] hover:bg-orange-600 "
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
}
