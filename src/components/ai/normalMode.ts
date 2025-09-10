import { calculateWinner } from "../Board";

// normalMode.ts
export function aiNormalMove(squares: (string | null)[]): number | null {
  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);

  if (emptySquares.length === 0) return null;

  // اول بررسی کن ببری
  for (let move of emptySquares) {
    const newSquares = [...squares];
    newSquares[move] = "O";
    if (calculateWinner(newSquares) === "O") {
      return move;
    }
  }

  // بعد جلوی برد حریف رو بگیر
  for (let move of emptySquares) {
    const newSquares = [...squares];
    newSquares[move] = "X";
    if (calculateWinner(newSquares) === "X") {
      return move;
    }
  }

  // اگر هیچکدوم نبود → تصادفی
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}
