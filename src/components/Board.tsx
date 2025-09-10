import { useEffect, useState } from "react";
import Cell from "./Cell";
import WinEffect from "./WinEffect";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Timer, TimerOff } from "lucide-react";
import TurnTimer from "./TurnTimer";
import { XIcon } from "../assets/icons/X";
import { OIcon } from "../assets/icons/O";

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

// 🎮 AI حرکت انتخاب می‌کنه
function getAIMove(squares: (string | null)[], difficulty: string): number | null {
  const emptySquares = squares
    .map((val, idx) => (val === null ? idx : null))
    .filter((val): val is number => val !== null);

  if (emptySquares.length === 0) return null;

  // easy → حرکت تصادفی
  if (difficulty === "easy") {
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  // normal → اگر می‌تونه ببره، اون حرکت رو بزنه
  if (difficulty === "normal") {
    for (let move of emptySquares) {
      const newSquares = [...squares];
      newSquares[move] = "O"; // فرض بر اینه AI همیشه O هست
      if (calculateWinner(newSquares) === "O") {
        return move;
      }
    }
    // در غیر این صورت تصادفی
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  // hard → الگوریتم minimax
  if (difficulty === "hard") {
    return minimaxMove(squares, "O");
  }

  return null;
}

// 🎯 الگوریتم minimax برای AI سخت
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
  const isGameStarted = showTimer && !winner && !isDraw;

  const difficulty = localStorage.getItem("difficulty") || "easy";
  const maxWin: number = parseInt(localStorage.getItem("maxWin") || "3", 10);

  const handleShowTimer = () => {
    setShowTimer(!showTimer);
  };

  // کلیک بازیکن
  const handleClick = (index: number) => {
    if (squares[index] || winner) return;

    if (timerId) clearTimeout(timerId);

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  // حرکت ربات (O)
  useEffect(() => {
    if (!winner && !isXNext) {
      const aiMove = getAIMove(squares, difficulty);
      if (aiMove !== null) {
        setTimeout(() => handleClick(aiMove), 500);
      }
    }
  }, [squares, isXNext, winner, difficulty]);

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
      return [x, o];
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

  // باز کردن مودال‌ها
  useEffect(() => {
    if (winner) {
      if (winCount[0] === maxWin || winCount[1] === maxWin) {
        setModalType("final");
        WinBoard();
      } else {
        setModalType("winner");
      }
    } else if (isDraw) {
      setModalType("draw");
    }
  }, [squares, winner, isDraw, winCount, maxWin]);

  // تایمر حرکت خودکار (اگر فعال باشه)
  useEffect(() => {
    if (showTimer || winner || isDraw || squares.every((square) => square === null)) return;
    const id = setTimeout(() => {
      const aiMove = getAIMove(squares, difficulty);
      if (aiMove !== null) handleClick(aiMove);
    }, 5000);

    setTimerId(id);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [isXNext, squares, showTimer, winner, isDraw, difficulty]);

  return (
    <div className="flex flex-col items-center">
      {showTimer && (
        <TurnTimer
          duration={5000}
          trigger={isXNext ? 1 : 0}
          onTimeout={() => {
            const aiMove = getAIMove(squares, difficulty);
            if (aiMove !== null) handleClick(aiMove);
          }}
          isGameStarted={isGameStarted}
        />
      )}

      <div className="flex-center flex-col gap-5">
        <div className="relative mx-auto flex w-full items-center justify-between gap-5 rounded-2xl bg-secondary-background p-3">
          <div
            className={`${
              isXNext
                ? "bg-background rounded-2xl p-2 text-primary-foreground"
                : "p-2 text-secondary-foreground font-semibold"
            }`}
          >
            <span className="flex justify-center">{playerX}</span>
            <span>
              <XIcon />
            </span>
          </div>

          <div className="flex-center absolute top-0 left-1/2 -translate-1/2 rounded-xl bg-white px-3 py-1 text-xl">
            <span className="text-secondary-foreground">{winCount[0]}</span>
            <span className="mx-3 text-secondary-foreground"> - </span>
            <span className="text-secondary-foreground">{winCount[1]}</span>
          </div>
          <div
            className={`${
              !isXNext
                ? "bg-background rounded-2xl p-2 text-primary-foreground"
                : "p-2 text-secondary-foreground font-semibold"
            }`}
          >
            <span className="flex justify-center">{playerO}</span>
            <span>
              <OIcon />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-white">
          {squares.map((value, i) => (
            <Cell key={i} value={value} onClick={() => handleClick(i)} />
          ))}
        </div>

        <div className="flex w-full items-center justify-between">
          <button
            onClick={() => setModalType("end")}
            className="text-primary-foreground rounded-2xl bg-primary-btn p-4 text-xl font-semibold"
          >
            End this Game
          </button>
          {showTimer ? (
            <button
              onClick={handleShowTimer}
              className="text-secondary-foreground rounded-2xl bg-secondary-btn p-4"
            >
              <TimerOff size={32} />
            </button>
          ) : (
            <button
              onClick={handleShowTimer}
              className="text-primary-foreground  rounded-2xl bg-primary-btn p-4"
            >
              <Timer size={32} />
            </button>
          )}
          <button
            onClick={resetBoard}
            className="text-primary-foreground rounded-2xl bg-primary-btn p-4"
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
          playerO={playerO}
          playerX={playerX}
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
          onContinue={resetBoard}
        />

        <EndModal
          open={modalType === "end"}
          onClose={() => setModalType(null)}
          onNewGame={NewBoard}
        />

        {modalType === "final" && <WinEffect />}
      </div>
    </div>
  );
}
