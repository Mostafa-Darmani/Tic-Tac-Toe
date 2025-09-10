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
  const handleWinner = () => {
    if (winner === "X") return playerX || winner
    else return playerO || winner
    }
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            <div className="flex justify-center items-center gap-3 w-full text-secondary-foreground text-center rounded-xl">
              <div className="bg-secondary-btn p-5 rounded-xl">
                {totalwin[0]}
              </div>     
              <span>
              -
              </span>
              <div className="bg-secondary-btn p-5 rounded-xl">
                {totalwin[1]}
              </div>               
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="flex justify-center text-lg items-center w-full gap-5 text-primary-foreground">
            {handleWinner()} won the game!       
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col">
          <AlertDialogAction
            onClick={onContinue}
            className="mx-auto bg-secondary-btn text-secondary-foreground"
          >
            Continue
          </AlertDialogAction>
          <AlertDialogAction
            onClick={onNewGame}
            className="mx-auto bg-primary-btn text-primary-foreground"
          >
            Start New Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
