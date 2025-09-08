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
        <div className="flex-center gap-10 w-full mb-14 mx-auto bg-purple-700 p-3 rounded-2xl">
          <span className={`${!isXNext ? "bg-background  rounded-2xl text-white py-1 px-3 " : "py-1 px-3 text-white"}`}>
          ali O
          </span>
          <div className="flex-center bg-white py-1 px-3 text-xl rounded-xl">
          <span className="text-purple-400">
            {winCount[1]}
          </span>
          <span className="text-purple-400 mx-3"> - </span>
          <span className="text-purple-400">
            {winCount[0]}
          </span>
          </div>
          <span className={`${isXNext ? "bg-background  rounded-2xl text-white py-1 px-3 " : "py-1 px-3 text-white"}`}>
            reza X
          </span>
        </div>

      <div className="grid grid-cols-3 gap-3 bg-white">
        {squares.map((value, i) => (
          <Cell key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      <button
        onClick={resetBoard}
        className="flex-center text-center text-2xl font-semibold mt-5 px-7 py-3 bg-white text-background rounded-xl transition-colors cursor-pointer"
      >
        reset
      </button>


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
                  <AlertDialogFooter>
                    <AlertDialogAction
                      className="mx-auto bg-white text-background"
                      onClick={EndBoard}
                    >
                      Start New Game
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
