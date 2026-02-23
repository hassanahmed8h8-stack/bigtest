import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3500);
    const completeTimer = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="w-40 h-40 bg-white rounded-[2rem] p-3 shadow-2xl shadow-black/20 animate__animated animate__zoomIn animate__faster">
          <img 
            src="https://ik.imagekit.io/bualmg8h2/Untitled%20design.png" 
            alt="شعار بيك جكن" 
            className="w-full h-full object-contain animate-[pulse_2s_ease-in-out_infinite]"
          />
        </div>

        {/* Welcome Text */}
        <div className={`mt-8 text-center transition-all duration-700 transform ${
          showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-white/90 text-xl sm:text-2xl font-bold mb-2 drop-shadow-md">
            أهلا وسهلا بمطعم احلامك
          </h2>
          <h1 className="text-white text-5xl sm:text-6xl font-black drop-shadow-xl tracking-tight">
            بيك جكن
          </h1>
        </div>
      </div>
      
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-red-800/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-red-600/40 rounded-full blur-3xl"></div>
      </div>

      {/* Loading Indicator */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-700 ${
        showText ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="text-white/80 text-sm font-bold tracking-widest">جاري التحميل...</span>
      </div>
    </div>
  );
};
