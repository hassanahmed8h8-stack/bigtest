import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-3 overflow-x-auto px-6 py-4 custom-scrollbar no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl whitespace-nowrap transition-all duration-300 font-bold text-sm ${
            activeCategory === cat.id 
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/20 scale-105' 
            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};