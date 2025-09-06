import { useState } from "react";
import Cell from "./Cell";

export default function Board() {
  const initialSquares: (string | null)[] = [
    "X", null, "O",
    null, "X", null,
    "O", null, null
  ];

  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true); // فقط برای نمایش نوبت

  const resetBoard = () => {
    setSquares(initialSquares);
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center">
      {/* نمایش نوبت بازیکن */}
      <div className="mb-4 text-lg font-semibold">
        نوبت: {isXNext ? "X" : "O"}
      </div>

      {/* بورد */}
      <div className="grid grid-cols-3 gap-3 w-80 h-80">
        {squares.map((value, i) => (
          <Cell key={i} value={value} />
        ))}
      </div>

      {/* دکمه ریست */}
      <button
        onClick={resetBoard}
        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        ریست بورد
      </button>
    </div>
  );
}
