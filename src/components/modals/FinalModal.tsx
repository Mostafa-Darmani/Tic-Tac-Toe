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
          <AlertDialogDescription className="text-lg">
            {playerX || "X"} won {totalwin[0]} times.
            {playerO || "O"} won {totalwin[1]} times.
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
