export function aiEasyMove(squares: (string | null)[]): number | null {
  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);

  if (emptySquares.length === 0) return null;

  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}
