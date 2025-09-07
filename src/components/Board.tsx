import { useState } from "react";
import Cell from "./Cell";

function calculateWinner(squares: (string | null)[]) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const initialSquares: (string | null)[] = Array(9).fill(null);

  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean); // همه پر ولی برنده نداریم

  const handleClick = (index: number) => {
    if (squares[index] || winner) return; // اگر خونه پر باشه یا بازی تموم شده باشه
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const resetBoard = () => {
    setSquares(initialSquares);
    setIsXNext(true);
  };

  let status;
  if (winner) {
    status = `برنده: ${winner}`;
  } else if (isDraw) {
    status = "بازی مساوی شد!";
  } else {
    status = `نوبت: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className=" mb-4 text-lg font-semibold">{status}</div>

      <div className="grid grid-cols-3 gap-3 bg-white">
        {squares.map((value, i) => (
          <Cell key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      <button
        onClick={resetBoard}
        className="flex justify-center items-center mt-5 p-3 bg-white text-[#a063de] rounded-xl transition-colors"
      >
        ریست بورد
      </button>
    </div>
  );
}
