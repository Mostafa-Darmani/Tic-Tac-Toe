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
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
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
                    className="mx-auto bg-white text-[#a063de]"
                    onClick={resetBoard}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {(winCount[0] == 3 || winCount[1] == 3)  &&  (        
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">{winner} won the game!</AlertDialogTitle>
                  <AlertDialogDescription className="text-white text-center">
                    Congratulations!
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction
                    className="mx-auto bg-white text-[#a063de]"
                    onClick={resetBoard}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
                    className="mx-auto bg-white text-[#a063de]"
                    onClick={resetBoard}
                  >
                    try again
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        <div>
            ali O
        </div>
        <div className="flex items-center justify-center bg-white py-1 px-3 text-xl rounded-lg">
          
          <div className="text-purple-400">
            {winCount[1]}
          </div>
          <span className="text-purple-400 mx-3"> - </span>
          <div className="text-purple-400">
            {winCount[0]}
          </div>
        </div>
        <div className="">
            reza X
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-white">
        {squares.map((value, i) => (
          <Cell key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>

      <button
        onClick={resetBoard}
        className="flex justify-center text-center text-2xl font-semibold items-center mt-5 px-7 py-3 bg-white text-[#a063de] rounded-xl transition-colors"
      >
        reset
      </button>
    </div>
  );
}
