import { calculateWinner } from "../Board";

// hardMode.ts
export function aiHardMove(squares: (string | null)[]): number {
  return minimaxMove(squares, "O");
}

function minimaxMove(squares: (string|null)[], aiPlayer: "X"|"O"): number {
  const opponent = aiPlayer === "O" ? "X" : "O";
  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);

  let bestScore = -Infinity;
  let move = emptySquares[0];

  for (let idx of emptySquares) {
    const newSquares = [...squares];
    newSquares[idx] = aiPlayer;
    const score = minimax(newSquares, 0, false, aiPlayer, opponent);
    if (score > bestScore) {
      bestScore = score;
      move = idx;
    }
  }
  return move;
}

function minimax(
  squares: (string|null)[],
  depth: number,
  isMaximizing: boolean,
  aiPlayer: "X"|"O",
  humanPlayer: "X"|"O"
): number {
  const winner = calculateWinner(squares);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (squares.every(Boolean)) return 0;

  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let idx of emptySquares) {
      const newSquares = [...squares];
      newSquares[idx] = aiPlayer;
      const score = minimax(newSquares, depth + 1, false, aiPlayer, humanPlayer);
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let idx of emptySquares) {
      const newSquares = [...squares];
      newSquares[idx] = humanPlayer;
      const score = minimax(newSquares, depth + 1, true, aiPlayer, humanPlayer);
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}
