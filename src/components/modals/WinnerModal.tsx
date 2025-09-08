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
}

export default function WinnerModal({ winner, open, onClose, onReset }: WinnerModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Player {winner} won!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Congratulations 🎉
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onReset}
            className="mx-auto bg-white text-background"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
