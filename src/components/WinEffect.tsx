import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

export default function WinEffect() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [pieces, setPieces] = useState(0)

  useEffect(() => {
    if (showConfetti) {
      setPieces(1000)

      const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setPieces((p) => {
            if (p <= 10) {
              clearInterval(intervalId)
              return 0
            }
            return Math.floor(p * 0.85)
          })
        }, 150)
      }, 1000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [showConfetti])

  const handleConfettiComplete = () => {
    if (pieces === 0) {
      setShowConfetti(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={pieces}
        gravity={0.25} // ⬅️ کمی بیشتر از قبل — سقوط متعادل
        initialVelocityX={12} // ⬅️ پخش افقی ملایم
        initialVelocityY={20} // ⬅️ سرعت عمودی بیشتر — بالاتر می‌پره!
        confettiSource={{
          x: window.innerWidth / 2,     // وسط افقی
          y: window.innerHeight,        // ⬅️ دقیقاً پایین صفحه — نقطهٔ انفجار از "زمین"
          w: 10,                        // عرض کوچیک — حس نقطه‌ای بودن
          h: 10,                        // ارتفاع کوچیک
        }}
        colors={['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#70a1ff', '#ff6b6b']}
        drawShape={(ctx) => {
          ctx.beginPath()
          ctx.arc(0, 0, 3, 0, 2 * Math.PI)
          ctx.fillStyle = ctx.fillStyle
          ctx.fill()
        }}
        onConfettiComplete={handleConfettiComplete}
      />
    </div>
  )
}