// Easy mode: random move
export function getEasyMove(board) {
  const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
}

// Normal mode: try to win, then block, then random
export function getNormalMove(board, player, opponent) {
  return (
    tryToWinOrBlock(board, player) ||
    tryToWinOrBlock(board, opponent) ||
    getEasyMove(board)
  );
}

function tryToWinOrBlock(board, symbol) {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of combos) {
    const line = [board[a], board[b], board[c]];
    const marks = line.filter((v) => v === symbol).length;
    const emptyIndex = line.indexOf(null);
    if (marks === 2 && emptyIndex !== -1) return [a, b, c][emptyIndex];
  }
  return null;
}

// Hard mode: minimax
export function getHardMove(board, player, opponent) {
  return minimax(board, true, player, opponent).index;
}

function minimax(board, isMaximizing, player, opponent) {
  const winner = calculateWinner(board);
  if (winner === player) return { score: 1 };
  if (winner === opponent) return { score: -1 };
  if (!board.includes(null)) return { score: 0 };

  const moves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = isMaximizing ? player : opponent;
      const result = minimax(board, !isMaximizing, player, opponent);
      moves.push({ index: i, score: result.score });
      board[i] = null;
    }
  }

  return isMaximizing
    ? moves.reduce((a, b) => (a.score > b.score ? a : b))
    : moves.reduce((a, b) => (a.score < b.score ? a : b));
}

function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}
