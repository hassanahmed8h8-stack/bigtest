
import React from 'react';
import { MenuItem, ItemVariant } from '../types';
import { CATEGORIES } from '../constants';

interface MenuGridProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, variant?: ItemVariant) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ items, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:gap-8 sm:p-8 max-w-6xl mx-auto">
      {items.map((item, index) => (
        <div 
          key={item.id} 
          className="item-appear bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* صورة الوجبة */}
          <div className="relative h-32 sm:h-56 w-full overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* طبقة تظليل سفلية للصورة */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* شارة التصنيف */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1">
              <span>{CATEGORIES.find(c => c.id === item.category)?.icon}</span>
              <span>{CATEGORIES.find(c => c.id === item.category)?.name}</span>
            </div>
          </div>
          
          <div className="p-3 sm:p-5 flex flex-col flex-1">
            {/* الاسم والوصف */}
            <h3 className="text-sm sm:text-xl font-extrabold text-slate-900 mb-1 leading-tight group-hover:text-red-500 transition-colors">
              {item.name}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium mb-3 line-clamp-2">
              {item.description}
            </p>

            {/* تفاصيل الأسعار / الأحجام */}
            <div className="mt-auto space-y-2">
              {item.variants ? (
                <div className="grid grid-cols-1 gap-1.5">
                  {item.variants.map((variant) => (
                    <div 
                      key={variant.id} 
                      className="flex items-center justify-between bg-slate-50 border border-slate-100 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl hover:bg-red-50 hover:border-red-200 transition-all cursor-default"
                    >
                      <div className="flex flex-col">
                        <span className="text-red-500 font-black text-xs sm:text-base">
                          {variant.price.toLocaleString()} <small className="text-[8px] sm:text-[10px]">د.ع</small>
                        </span>
                        <span className="text-slate-400 font-bold text-[9px] sm:text-xs uppercase tracking-tight">{variant.name}</span>
                      </div>
                      <button
                        onClick={() => onAddToCart(item, variant)}
                        className="w-7 h-7 sm:w-9 sm:h-9 bg-slate-900 hover:bg-red-500 text-white rounded-lg sm:rounded-xl flex items-center justify-center font-black transition-all active:scale-90 shadow-md shadow-black/10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2 sm:p-3 rounded-2xl group-hover:bg-red-50 group-hover:border-red-100 transition-all">
                  <div className="flex flex-col">
                    <span className="text-red-500 font-black text-sm sm:text-xl leading-none mb-1">
                      {item.price.toLocaleString()} <small className="text-[10px]">د.ع</small>
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="bg-slate-900 hover:bg-red-500 text-white p-2 sm:px-5 sm:py-2.5 rounded-xl font-black transition-all flex items-center gap-1 active:scale-95 shadow-lg shadow-black/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline text-sm">إضافة</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
