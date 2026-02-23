
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuGrid } from './components/MenuGrid';
import { CartDrawer } from './components/CartDrawer';
import { SplashScreen } from './components/SplashScreen';
import { RegionSelector } from './components/RegionSelector';
import { MENU_ITEMS } from './constants';
import { MenuItem, CartItem, ItemVariant } from './types';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (item: MenuItem, variant?: ItemVariant) => {
    const cartId = variant ? `${item.id}-${variant.id}` : item.id;
    const finalPrice = variant ? variant.price : item.price;
    const finalName = variant ? `${item.name} (${variant.name})` : item.name;

    setCartItems(prev => {
      const existing = prev.find(i => i.id === cartId);
      if (existing) {
        return prev.map(i => i.id === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { 
        ...item, 
        id: cartId, 
        originalId: item.id,
        name: finalName,
        price: finalPrice,
        quantity: 1,
        variantName: variant?.name 
      }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      {!showSplash && !selectedRegion && (
        <RegionSelector onSelect={setSelectedRegion} />
      )}

      <div className={`min-h-screen pb-32 bg-slate-50 text-right ${showSplash || !selectedRegion ? 'hidden' : ''}`}>
        <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-[0_0_100px_rgba(0,0,0,0.05)] relative">
        <Header 
          cartCount={cartCount} 
          onCartClick={() => setIsCartOpen(true)} 
        />

        <main className="animate__animated animate__fadeIn">
          <PromoBanner />
          
          <div className="sticky top-0 bg-white/80 backdrop-blur-xl z-40 border-b border-slate-100 shadow-sm">
            <CategoryTabs 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>

          <section className="mt-2 min-h-[500px]">
            <MenuGrid items={filteredItems} onAddToCart={addToCart} />
          </section>
        </main>

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />

        {cartCount > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-red-500 text-white p-4 rounded-full shadow-2xl shadow-red-500/40 animate__animated animate__bounceIn hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-white text-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center font-black shadow-sm">
                  {cartCount}
                </span>
              </div>
            </button>
          </div>
        )}

        <footer className="mt-12 p-12 border-t border-slate-50 text-center">
          <p className="text-sm font-black text-slate-800 uppercase tracking-widest">بيك جكن - BIG CHICKEN</p>
          <p className="text-[10px] mt-2 text-slate-400 font-bold uppercase tracking-widest">© 2025 جميع الحقوق محفوظة</p>
        </footer>
      </div>
    </div>
    </>
  );
}

export default App;
