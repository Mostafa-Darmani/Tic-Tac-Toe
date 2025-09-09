// src/pages/Welcome.tsx
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const [alert, setAlert] = useState(false);
  const [playerX, setPlayerX] = useState<string>('');
  const [playerO, setPlayerO] = useState<string>('');
  const [maxWin, setMaxwin] = useState<number>(3)
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('playerX', playerX.trim());
    localStorage.setItem('playerO', playerO.trim());
    localStorage.setItem("maxWin", (maxWin && maxWin > 0 ? maxWin : 3).toString());
    setAlert(false);
    navigate('/game');
  };

  return (
    <div className="flex justify-center min-h-screen text-primary-foreground bg-background pt-10">
      <div className='flex flex-col items-center m-12 md:my-auto'>      
        <h1 className='text-5xl sm:text-6xl font-bold leading-18'>Lets play the <br/>Tic-Tac-Toe Game !</h1>
        <button
          className='bg-primary-btn text-primary-foreground text-2xl px-7 py-2 rounded-3xl font-bold hover:bg-secondary-btn hover:text-secondary-foreground transition transform hover:scale-105 active:scale-95 mt-14 max-w-[350px] '
          onClick={() => setAlert(true)}
        >
          Start New Game
        </button>
      </div>

      {alert && (
        <AlertDialog open={alert} onOpenChange={setAlert}>
          <AlertDialogContent className="bg-background">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center mb-4">Enter your names:</AlertDialogTitle>
              <div className='flex flex-col items-center'>
                <input
                  className='bg-white text-gray-800 py-3 px-4 rounded-2xl w-5/6 mb-3 text-center'
                  type='text'
                  placeholder='X name...'
                  value={playerX}
                  onChange={(e) => setPlayerX(e.target.value)}
                />
                <input
                  className='bg-white text-gray-800 py-3 px-4 rounded-2xl w-5/6 mb-3 text-center'
                  type='text'
                  placeholder='O name...'
                  value={playerO}
                  onChange={(e) => setPlayerO(e.target.value)}
                />
                <AlertDialogTitle className="text-center text-white mb-4">Enter max win:</AlertDialogTitle>
                <input
                  type="text"
                  inputMode="numeric" // کیبورد عددی در موبایل
                  pattern="[0-9]*"    // برای iOS — کیبورد عددی
                  className='bg-white text-gray-800 py-3 px-4 rounded-2xl w-5/6 mb-3 text-center'
                  placeholder="Enter only numbers"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setMaxwin(Number(value));
                    }
                  }}
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogDescription></AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-secondary-btn text-secondary-foreground">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleContinue}
                className="bg-primary-btn text-primary-foreground"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}