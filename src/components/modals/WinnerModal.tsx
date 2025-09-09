import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WinnerModalProps {
  winner: string | null;
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  playerX:string;
  playerO:string;
}

export default function WinnerModal({ winner, open, onClose, onReset, playerX ,playerO }: WinnerModalProps) {
  const handleWinner = () => {
    if (winner === "X") return playerX || winner
    else return playerO || winner
    }
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-primary-foreground">
            {handleWinner()}
            <br/>
            won this round !
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-secondary-foreground">
            Congratulations 🎉
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onReset}
            className="mx-auto bg-primary-btn text--primary-foreground"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
