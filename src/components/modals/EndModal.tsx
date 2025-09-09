import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";

interface EndModalProps {
  open: boolean;
  onClose: () => void;
  onNewGame: () => void;
}

export default function EndModal({ open, onClose, onNewGame }: EndModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Are you sure you want to end this game?
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col">
          <AlertDialogAction
            onClick={onClose}
            className="mx-auto bg-white text-background"
          >
            Cancel
          </AlertDialogAction>
          <AlertDialogAction
            onClick={onNewGame}
            className="mx-auto bg-white text-background"
          >
            End Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
