import { useEffect, useState } from "react";
import Cell from "./Cell";
import WinEffect from "./WinEffect";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Timer, TimerOff } from "lucide-react";
import TurnTimer from "./TurnTimer";

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
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  const navigate = useNavigate();

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const isGameStarted =
    showTimer && !winner && !isDraw;

  const handleShowTimer = () => {
    setShowTimer(!showTimer)
  }
  // انتخاب تصادفی
  const makeRandomMove = () => {
    if (!showTimer) return;
    const emptySquares: number[] = [];
    squares.forEach((val, idx) => {
      if (val === null) emptySquares.push(idx);
    });

    if (emptySquares.length === 0) return;

    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    handleClick(randomIndex);
  };

  // کلیک روی خانه
  const handleClick = (index: number) => {
    if (squares[index] || winner) return;

    if (timerId) clearTimeout(timerId); // وقتی بازیکن حرکت کرد، تایمر پاک کن

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

  setTotalWin(([x, o]) => {
    if (winner === "X") return [x + 1, o];
    if (winner === "O") return [x, o + 1];
    return [x, o]; // اگر مساوی بود
  });
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
  }, [winner]);
const maxWin:number = parseInt(localStorage.getItem("maxWin") || "3", 10);
  // باز کردن مودال‌ها
  useEffect(() => {
    if (winner) {
      if (winCount[0] === maxWin || winCount[1] === maxWin) {
        setModalType("final"); // بازی نهایی
      } else {
        setModalType("winner"); // برنده یک دست
      }
    } else if (isDraw) {
      setModalType("draw"); // مساوی
    }
  }, [squares, winner, isDraw, winCount, maxWin]);

  // ⏱️ مدیریت تایمر برای حرکت خودکار

  useEffect(() => {
    if (showTimer || winner || isDraw || squares.every((square) => square === null)) return; // اگه بازی تموم شده، نیازی به تایمر نیست
    const id = setTimeout(() => {
      makeRandomMove();
    }, 5000); // هر بازیکن ۵ ثانیه وقت داره

    setTimerId(id);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isXNext, squares, showTimer]);

  return (
    <div className="flex-center flex-col">
      {/* بازیکن‌ها + امتیاز دست جاری */}
      <div className="relative mx-auto flex w-10/11 items-center justify-between gap-10 rounded-2xl border-4 bg-purple-700 p-3">
        <span
          className={`${
            !isXNext
              ? "bg-background rounded-2xl px-3 py-1 text-white"
              : "px-3 py-1 text-white"
          }`}
        >
          {playerO} O
        </span>
        <div className="flex-center absolute top-0 left-1/2 -translate-1/2 rounded-xl bg-white px-3 py-1 text-xl">
          <span className="text-purple-400">{winCount[1]}</span>
          <span className="mx-3 text-purple-400"> - </span>
          <span className="text-purple-400">{winCount[0]}</span>
        </div>
        <span
          className={`${
            isXNext
              ? "bg-background rounded-2xl px-3 py-1 text-white"
              : "px-3 py-1 text-white"
          }`}
        >
          {playerX} X
        </span>
      </div>
      {/* تایمر */}
      {showTimer ? 
        (<TurnTimer
          duration={5000}
          trigger={isXNext ? 1 : 0} // تغییر نوبت باعث ریست تایمر میشه
          onTimeout={makeRandomMove}
          isGameStarted={isGameStarted}
        />
        )
      :
      <div className="my-5"></div>
      }

      {/* خانه‌های بازی */}
      <div className="grid grid-cols-3 gap-3 bg-white">
        {squares.map((value, i) => (
          <Cell key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      {/* کنترل‌ها */}
      <div className="mt-12 flex w-full items-center justify-between">
        <button
          onClick={() => setModalType("end")}
          className="text-background rounded-2xl bg-white p-4 text-xl font-semibold"
        >
          End this Game
        </button>
        {showTimer ? (
          <button
          onClick={handleShowTimer}
          className="text-background rounded-2xl bg-white p-4"
        >
          <TimerOff size={32} />
        </button>
        )
        :
        (
        <button
          onClick={handleShowTimer}
          className="text-background rounded-2xl bg-white p-4"
        >
          <Timer size={32} />
        </button>
        )
        }
        <button
          onClick={resetBoard}
          className="text-background rounded-2xl bg-white p-4"
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
        totalwin={totalWin}
        playerX={playerX}
        playerO={playerO}
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
