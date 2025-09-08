import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FinalModalProps {
  winner: string | null;
  open: boolean;
  onClose: () => void;
  onNewGame: () => void;
  onContinue: () => void;
}

export default function FinalModal({
  winner,
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
