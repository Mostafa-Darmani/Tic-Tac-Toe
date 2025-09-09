import { useEffect, useState } from "react";

type TurnTimerProps = {
  duration?: number; // مدت زمان (پیش‌فرض 5 ثانیه)
  onTimeout: () => void; // وقتی تایم تموم شد
  trigger: number; // برای ریست تایمر وقتی نوبت تغییر میکنه
  isGameStarted?: boolean;
};

export default function TurnTimer({ duration = 5000, onTimeout, trigger,isGameStarted=false }: TurnTimerProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isGameStarted) {
      setProgress(100);
      return;
    }
    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = 100 - (elapsed / duration) * 100;
      setProgress(Math.max(percent, 0));

      if (elapsed >= duration) {
        clearInterval(interval);
        onTimeout();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [trigger, isGameStarted]);

  return (
    <div className=" bg-gray-300 rounded-full h-3 w-10/11 overflow-hidden">
      <div
        className="h-3 bg-gradient-to-l from-cyan-500 to-cyan-900 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
