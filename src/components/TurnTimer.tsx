import { useEffect, useState } from "react";

type TurnTimerProps = {
  duration?: number; // مدت زمان (پیش‌فرض 5 ثانیه)
  onTimeout: () => void; // وقتی تایم تموم شد
  trigger: number; // برای ریست تایمر وقتی نوبت تغییر میکنه
};

export default function TurnTimer({ duration = 5000, onTimeout, trigger }: TurnTimerProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let start = Date.now();
    setProgress(100);

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
  }, [trigger]);

  return (
    <div className="w-full bg-gray-300 rounded-full h-3 mt-6 overflow-hidden">
      <div
        className="h-3 bg-purple-600 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
