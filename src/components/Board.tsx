import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cell from "./Cell";
import WinEffect from "./WinEffect";
import TurnTimer from "./TurnTimer";
import { RotateCcw, Timer, TimerOff } from "lucide-react";
import { XIcon } from "../assets/icons/X";
import { OIcon } from "../assets/icons/O";
import { BotIcon } from "../assets/icons/bot";

// مودال‌ها
import WinnerModal from "./modals/WinnerModal";
import DrawModal from "./modals/DrawModal";
import FinalModal from "./modals/FinalModal";
import EndModal from "./modals/EndModal";

// AI Imports
import { aiEasyMove } from "./ai/easyMode";
import { aiNormalMove } from "./ai/normalMode";
import { aiHardMove } from "./ai/hardMode";

type ModalType = "winner" | "draw" | "end" | "final" | null;

export function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getAIMove(squares: (string | null)[], difficulty: string): number | null {
  if (difficulty === "easy") return aiEasyMove(squares);
  if (difficulty === "normal") return aiNormalMove(squares);
  if (difficulty === "hard") return aiHardMove(squares);
  return null;
}

export default function Board() {
  const initialSquares: (string | null)[] = Array(9).fill(null);

  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [winCount, setWinCount] = useState([0,0]);
  const [totalWin, setTotalWin] = useState([0,0]);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showTimer, setShowTimer] = useState(false);
  const [finalWinner, setFinalWinner] = useState<string | null>(null);

  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');

  const navigate = useNavigate();

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const isGameStarted = showTimer && !winner && !isDraw;

  // 🌟 mode & difficulty
  const mode = localStorage.getItem("mode") || "single";
  const difficulty = localStorage.getItem("difficulty") || "easy";
  const maxWin: number = parseInt(localStorage.getItem("maxWin") || "3", 10);

  // لود بازیکن‌ها
  useEffect(() => {
    const savedX = localStorage.getItem("playerX");
    const savedO = localStorage.getItem("playerO");
    if (savedX) setPlayerX(savedX);
    if (savedO) setPlayerO(savedO);
  }, []);

  // کلیک بازیکن
  const handleClick = (index: number) => {
    if (squares[index] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };
  const handleProfiles = (player:string) => {
    if (mode === "single"){
      if (player === "X") return playerX || "You";
      else return playerO || <BotIcon />;
    }
    else{
      if (player === "X") return playerX;
      else return playerO;
    }
  }
  // حرکت AI (فقط اگر حالت single باشد و نوبت O باشد)
  useEffect(() => {
    if (mode === "single" && !winner && !isXNext) {
      const aiMove = getAIMove(squares, difficulty);
      if (aiMove !== null) setTimeout(() => handleClick(aiMove), 500);
    }
  }, [squares, isXNext, winner, difficulty, mode]);

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
      if (winner === "X") return [x+1, o];
      if (winner === "O") return [x, o+1];
      return [x, o];
    });
    setWinCount([0,0]);
  };

  const NewBoard = () => {
    navigate("/");
    localStorage.clear();
  };

  // شمارش برد هر دست
  useEffect(() => {
    if (winner === "X") setWinCount([winCount[0]+1, winCount[1]]);
    else if (winner === "O") setWinCount([winCount[0], winCount[1]+1]);
  }, [winner]);

  // باز کردن مودال‌ها
  useEffect(() => {
    if (winner) {
      if (winCount[0] === maxWin || winCount[1] === maxWin) {
        setFinalWinner(winner);
        setModalType("final");
        WinBoard();
      } else {
        setModalType("winner");
      }
    } else if (isDraw) {
      setModalType("draw");
    }
  }, [squares, winner, isDraw, winCount, maxWin]);

  return (
    <div className={`flex flex-col items-center ${showTimer || "mt-3"}`}>
      {showTimer && (
        <TurnTimer
          duration={5000}
          trigger={isXNext ? 1 : 0}
          onTimeout={() => {
            const randomMove = getAIMove(squares, "easy");
            if (randomMove !== null) handleClick(randomMove);
          }}
          isGameStarted={isGameStarted}
        />
      )}

      <div className={`flex-center flex-col ${mode === "single" ? "gap-3" : "gap-5"}`}>
        <div className="relative mx-auto flex w-full items-center justify-between gap-5 rounded-2xl bg-secondary-background p-3">
          <div className={`${isXNext ? "bg-background rounded-2xl p-2 text-primary-foreground" : "p-2 text-secondary-foreground font-semibold"}`}>
            <span className="flex justify-center">{handleProfiles("X")}</span>
            <span><XIcon /></span>
          </div>

          <div className="flex-center absolute top-0 left-1/2 -translate-1/2 rounded-xl bg-white px-3 py-1 text-xl">
            <span className="text-secondary-foreground">{winCount[0]}</span>
            <span className="mx-3 text-secondary-foreground"> - </span>
            <span className="text-secondary-foreground">{winCount[1]}</span>
          </div>
          <div className={`${!isXNext ? "bg-background rounded-2xl p-2 text-primary-foreground" : "p-2 text-secondary-foreground font-semibold"}`}>
            <span className="flex justify-center">{handleProfiles("O")}</span>
            <span><OIcon /></span>
          </div>
        </div>
    
        <div className="grid grid-cols-3 gap-3 bg-white">
          {squares.map((value,i) => <Cell key={i} value={value} onClick={() => handleClick(i)} />)}
        </div>

      {mode === "single" && (
        <div className="bg-secondary-background text-secondary-foreground px-4 py-1 text-lg rounded-xl">
           Game mode : {difficulty}
        </div>
      )}
        
        <div className="flex w-full items-center justify-between">
          <button onClick={() => setModalType("end")} className="text-primary-foreground rounded-2xl bg-primary-btn p-4 text-xl font-semibold">End this Game</button>
          {showTimer ? (
            <button onClick={() => setShowTimer(false)} className="text-secondary-foreground rounded-2xl bg-secondary-btn p-4"><TimerOff size={32}/></button>
          ) : (
            <button onClick={() => setShowTimer(true)} className="text-primary-foreground rounded-2xl bg-primary-btn p-4"><Timer size={32}/></button>
          )}
          <button onClick={resetBoard} className="text-primary-foreground rounded-2xl bg-primary-btn p-4"><RotateCcw size={32}/></button>
        </div>

        {/* مودال‌ها */}
        <WinnerModal winner={winner} open={modalType==="winner"} onClose={() => setModalType(null)} onReset={resetBoard} playerO={playerO} playerX={playerX} />
        <DrawModal open={modalType==="draw"} onClose={() => setModalType(null)} onReset={resetBoard} />
        <FinalModal winner={finalWinner} totalwin={totalWin} playerX={playerX} playerO={playerO} open={modalType==="final"} onClose={() => setModalType(null)} onNewGame={NewBoard} onContinue={resetBoard} />
        <EndModal open={modalType==="end"} onClose={() => setModalType(null)} onNewGame={NewBoard} />

        {modalType==="final" && <WinEffect />}
      </div>
    </div>
  );
}
