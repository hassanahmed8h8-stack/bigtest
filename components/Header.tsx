import React from 'react';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onCartClick, cartCount }) => {
  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-50 p-1 flex items-center justify-center border border-slate-100">
          <img 
            src="https://ik.imagekit.io/bualmg8h2/Untitled%20design.png" 
            alt="شعار بيك جكن" 
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black text-slate-900 leading-none">
            بيك جكن
          </h1>
          <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Big Chicken</span>
        </div>
      </div>
      
      <button 
        onClick={onCartClick}
        className="relative p-3 bg-red-50 rounded-full hover:bg-red-100 transition-all active:scale-95 border border-red-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-black">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
};