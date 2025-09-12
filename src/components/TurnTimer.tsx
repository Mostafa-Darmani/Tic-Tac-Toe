import { useEffect, useState } from "react";

type TurnTimerProps = {
  duration?: number;
  onTimeout: () => void;
  trigger: number;
  isGameStarted?: boolean;
  targetRef?: React.RefObject<HTMLDivElement | null>;
};

export default function TurnTimer({
  duration = 5000,
  onTimeout,
  trigger,
  isGameStarted = false,
  targetRef,
}: TurnTimerProps) {
  const [progress, setProgress] = useState(100);
  const [rectSize, setRectSize] = useState({ width: 92, height: 92 });

  useEffect(() => {
    if (targetRef?.current) {
      const extra = 6; // فاصله اضافی برای پوشش کامل پروفایل
      const { offsetWidth, offsetHeight } = targetRef.current;
      setRectSize({ width: offsetWidth + extra, height: offsetHeight + extra });
    }
  }, [targetRef, trigger]);

  useEffect(() => {
    if (!isGameStarted) {
      setProgress(100);
      return;
    }

    let start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(100 - (elapsed / duration) * 100, 0);
      setProgress(percent);

      if (elapsed >= duration) {
        clearInterval(interval);
        onTimeout();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [trigger, isGameStarted, duration, onTimeout]);

  const { width, height } = rectSize;
  const strokeWidth = 6;
  const perimeter = 2 * (width + height);
  const dashOffset = ((100 - progress) / 100) * perimeter;

  // رنگ متغیر
  const interpolateColor = (percent: number) => {
    const r1 = 0, g1 = 255, b1 = 255;
    const r2 = 0, g2 = 128, b2 = 128;
    if (percent >= 40) return `rgb(${r1},${g1},${b1})`;
    const normalized = (40 - percent) / 40;
    const r = Math.round(r1 + (r2 - r1) * normalized);
    const g = Math.round(g1 + (g2 - g1) * normalized);
    const b = Math.round(b1 + (b2 - b1) * normalized);
    return `rgb(${r},${g},${b})`;
  };

  const currentColor = interpolateColor(progress);

  return (
    <svg
      width={width + strokeWidth}
      height={height + strokeWidth}
      className="absolute inset-0 pointer-events-none"
    >
      {/* مسیر پشتی */}
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={width}
        height={height}
        rx={19}
        ry={19}
        fill="none"
        stroke="#000"
        strokeWidth={strokeWidth}
        strokeDasharray={perimeter}
        strokeDashoffset={0}
        strokeLinecap="round"
        opacity={0.2}
      />

      {/* مسیر تایمر */}
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={width}
        height={height}
        rx={19}
        ry={19}
        fill="none"
        stroke={currentColor}
        strokeWidth={strokeWidth}
        strokeDasharray={perimeter}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.05s linear" }}
      />
    </svg>
  );
}
