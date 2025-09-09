import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";

interface FinalModalProps {
  winner: string | null;
  totalwin: Array<number>;
  playerX: string;
  playerO: string;
  open: boolean;
  onClose: () => void;
  onNewGame: () => void;
  onContinue: () => void;
}

export default function FinalModal({
  winner,
  totalwin,
  playerX,
  playerO,
  open,
  onClose,
  onNewGame,
  onContinue,
}: FinalModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {winner} won the game!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg flex justify-between items-center w-full gap-5">

            <div className="flex justify-between text-white rounded-xl w-full bg-purple-700 p-3">
              <div className="w-4/5 text-center">
              {playerX || "X"} 
              </div>
              <div className="w-1/5 bg-white text-purple-700  text-center rounded-xl">
                {totalwin[0]}
              </div>
            </div>

            <div className="flex justify-between text-white rounded-xl w-full bg-purple-700 p-3 ">
              <div className="w-1/5 bg-white text-purple-700  text-center rounded-xl">              
              {totalwin[1]} 
              </div>
              <div className="w-4/5 text-white text-center rounded-xl">
                {playerO || "O"}
              </div>
            </div>        
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col">
          <AlertDialogAction
            onClick={onNewGame}
            className="mx-auto bg-white text-background"
          >
            Start New Game
          </AlertDialogAction>
          <AlertDialogAction
            onClick={onContinue}
            className="mx-auto bg-white text-background"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
