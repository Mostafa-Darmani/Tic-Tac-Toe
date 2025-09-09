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
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-primary-foreground">
            {playerX ? (
                <span> {playerX} </span>
            ) : (
              <span> {winner} </span>          
            )} 
            {playerO ? (
                <span> {playerO} </span>
            ) : (
              <span> {winner} </span>          
            )} 
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
