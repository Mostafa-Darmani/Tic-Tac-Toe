import { useEffect, useState } from "react";
import Cell from "./Cell";
import WinEffect from "./WinEffect";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";

// مودال‌ها
import WinnerModal from "./modals/WinnerModal";
import DrawModal from "./modals/DrawModal";
import FinalModal from "./modals/FinalModal";
import EndModal from "./modals/EndModal";

type ModalType = "winner" | "draw" | "end" | "final" | null;

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
  const [winCount, setWinCount] = useState([0, 0]);
  const [playerX, setPlayerX] = useState<string>("");
  const [playerO, setPlayerO] = useState<string>("");
  const [totalWin, setTotalWin] = useState([0, 0]);
  const [modalType, setModalType] = useState<ModalType>(null);

  const navigate = useNavigate();

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  // کلیک روی خانه
  const handleClick = (index: number) => {
    if (squares[index] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  // ریست کردن فقط صفحه
  const resetBoard = () => {
    setSquares(initialSquares);
    setIsXNext(true);
  };

  // ریست کامل بعد از یک گیم
  const WinBoard = () => {
    setSquares(initialSquares);
    setIsXNext(true);
    if (winner === "X") {
      setTotalWin([totalWin[0] + 1, totalWin[1]]);
    } else if (winner === "O") {
      setTotalWin([totalWin[0], totalWin[1] + 1]);
    }
    setWinCount([0, 0]);
  };

  // شروع بازی جدید کامل
  const NewBoard = () => {
    navigate("/");
    localStorage.clear();
  };

  // لود بازیکن‌ها از localStorage
  useEffect(() => {
    const savedX = localStorage.getItem("playerX");
    const savedO = localStorage.getItem("playerO");
    if (savedX) setPlayerX(savedX);
    if (savedO) setPlayerO(savedO);
  }, []);

  // شمارش برد هر دست
  useEffect(() => {
    if (winner === "X") {
      setWinCount([winCount[0] + 1, winCount[1]]);
    } else if (winner === "O") {
      setWinCount([winCount[0], winCount[1] + 1]);
    }
  }, [squares]);

  // باز کردن مودال‌ها
  useEffect(() => {
    if (winner) {
      if (winCount[0] === 2 || winCount[1] === 2) {
        // دست سوم => بازی نهایی
        setModalType("final");
      } else {
        setModalType("winner");
      }
    } else if (isDraw) {
      setModalType("draw");
    }
  }, [squares]);

  return (
    <div className="flex-center flex-col">
      {/* امتیاز کلی */}
      <div className="flex justify-between gap-42 mx-auto items-center p-1 mb-5">
        <div className="p-5 bg-white w-fit rounded-full">{totalWin[1]}</div>
        <div className="p-5 bg-white w-fit rounded-full">{totalWin[0]}</div>
      </div>

      {/* بازیکن‌ها + امتیاز دست جاری */}
      <div className="flex items-center justify-between gap-10 w-[300px] mb-14 mx-auto bg-purple-700 p-3 rounded-2xl relative border-4">
        <span
          className={`${
            !isXNext
              ? "bg-background rounded-2xl text-white py-1 px-3"
              : "py-1 px-3 text-white"
          }`}
        >
          {playerO} O
        </span>
        <div className="flex-center absolute left-1/2 -translate-1/2 top-0 bg-white py-1 px-3 text-xl rounded-xl">
          <span className="text-purple-400">{winCount[1]}</span>
          <span className="text-purple-400 mx-3"> - </span>
          <span className="text-purple-400">{winCount[0]}</span>
        </div>
        <span
          className={`${
            isXNext
              ? "bg-background rounded-2xl text-white py-1 px-3"
              : "py-1 px-3 text-white"
          }`}
        >
          {playerX} X
        </span>
      </div>

      {/* خانه‌های بازی */}
      <div className="grid grid-cols-3 gap-3 bg-white">
        {squares.map((value, i) => (
          <Cell key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      {/* کنترل‌ها */}
      <div className="flex justify-between items-center w-full mt-12">
        <button
          onClick={() => setModalType("end")}
          className="p-4 bg-white text-background font-semibold rounded-2xl text-xl"
        >
          End this Game
        </button>
        <button
          onClick={resetBoard}
          className="p-4 bg-white text-background rounded-2xl"
        >
          <RotateCcw size={32} />
        </button>
      </div>

      {/* مودال‌ها */}
      <WinnerModal
        winner={winner}
        open={modalType === "winner"}
        onClose={() => setModalType(null)}
        onReset={resetBoard}
      />

      <DrawModal
        open={modalType === "draw"}
        onClose={() => setModalType(null)}
        onReset={resetBoard}
      />

      <FinalModal
        winner={winner}
        open={modalType === "final"}
        onClose={() => setModalType(null)}
        onNewGame={NewBoard}
        onContinue={WinBoard}
      />

      <EndModal
        open={modalType === "end"}
        onClose={() => setModalType(null)}
        onNewGame={NewBoard}
      />

      {/* افکت برد */}
      {modalType === "final" && <WinEffect />}
    </div>
  );
}
