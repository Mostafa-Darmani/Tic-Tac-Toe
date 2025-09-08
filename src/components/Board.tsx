import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  
} from "@/components/ui/alert-dialog"
import Cell from "./Cell";
import WinEffect from "./WinEffect"
import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';



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
  const [winCount, setWinCount] = useState([0, 0])
  const [playerX, setPlayerX] = useState<string>('');
  const [playerO, setPlayerO] = useState<string>('');
  const navigate = useNavigate();


  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  const handleClick = (index: number) => {
    if (squares[index] || winner) return; 
    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const resetBoard = () => {
    setSquares(initialSquares);
    setIsXNext(true);
  };
  const EndBoard = () => {
    setSquares(initialSquares);
    setIsXNext(true);
    setWinCount([0,0])
  };

  const NewBoard = () => {
    navigate('/'),
    localStorage.clear()
  };

  useEffect(() => {
    const savedX = localStorage.getItem('playerX');
    const savedO = localStorage.getItem('playerO');
    if (savedX) setPlayerX(savedX);
    if (savedO) setPlayerO(savedO);
  }, []);

  useEffect(() => {
    const winner = calculateWinner(squares);

    if (winner === "X") {
      setWinCount(([xWins, oWins]) => [xWins + 1, oWins]);
    } else if (winner === "O") {
      setWinCount(([xWins, oWins]) => [xWins, oWins + 1]);
    }
  }, [squares]);

  const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
      const winner = calculateWinner(squares);
      if (winner || (!winner && squares.every(Boolean))) {
        setDialogOpen(true);
      }
    }, [squares]);

    

  return (
    <div className="flex-center flex-col">        
        <div className="flex items-center justify-between gap-10 w-[300px] mb-14 mx-auto bg-purple-700 p-3 rounded-2xl relative">
          <span className={`${!isXNext ? "bg-background  rounded-2xl text-white py-1 px-3 " : "py-1 px-3 text-white"}`}>
          {playerO} O
          </span>
          <div className="flex-center absolute left-1/2 -translate-1/2 top-0 bg-white py-1 px-3 text-xl rounded-xl">
          <span className="text-purple-400">
            {winCount[1]}
          </span>
          <span className="text-purple-400 mx-3"> - </span>
          <span className="text-purple-400">
            {winCount[0]}
          </span>
          </div>
          <span className={`${isXNext ? "bg-background  rounded-2xl text-white py-1 px-3 " : "py-1 px-3 text-white"}`}>
            {playerX} X
          </span>
        </div>

      <div className="grid grid-cols-3 gap-3 bg-white">
        {squares.map((value, i) => (
          <Cell key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="flex justify-between items-center w-full mt-12">   
        <button
          onClick={NewBoard}
          className="p-4 bg-white text-background font-semibold rounded-2xl transition-colors cursor-pointer text-xl"
          
        >
          Start New Game
        </button>
        <button
          onClick={resetBoard}
          className=" p-4 bg-white text-background rounded-2xl transition-colors cursor-pointer"
        >
          <RotateCcw size={32} />
        </button>
      </div>

      {winner && winCount[0] < 3 && winCount[1] < 3 && (
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">Player {winner} won!</AlertDialogTitle>
                  <AlertDialogDescription className="text-white text-center">
                    Congratulations!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="mx-auto bg-white text-background"
                    onClick={resetBoard}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {(winCount[0] === 3 || winCount[1] === 3)  &&  (        
            <>
              {dialogOpen && <WinEffect />}

              <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      {winner} won the game!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-white text-center">
                      Congratulations!
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-col">
                    <AlertDialogAction
                      className="mx-auto bg-white text-background"
                      onClick={NewBoard}
                    >
                      Start New Game
                    </AlertDialogAction>
                    <AlertDialogAction
                      className="mx-auto bg-white text-background"
                      onClick={EndBoard}
                    >
                      Try Again
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          {isDraw && (
                  <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">Draw try again</AlertDialogTitle>
                  <AlertDialogDescription className="text-white text-center">
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="mx-auto bg-white text-background"
                    onClick={resetBoard}
                  >
                    try again
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
    </div>
  );
}
