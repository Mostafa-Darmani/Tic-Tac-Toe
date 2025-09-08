// src/pages/Welcome.tsx
import { useState } from 'react';


export default function Welcome() {
  const [Alert, setAlert] = useState(false);
  return (
    <div className="items-center text-center text-white">
      <h1>به بازی دوز خوش آمدید</h1>
      <p>در مراحل بعدی نام بازیکنان رو از شما دریافت می‌کنیم.</p>
      <button
        className='bg-white px-5 py-3 text-background mt-3 rounded-2xl'
        onClick={() => setAlert(true)}
      >
        start
      </button>
      
    </div>
  );
};

