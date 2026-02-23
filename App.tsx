
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { PromoBanner } from './components/PromoBanner';
import { CategoryTabs } from './components/CategoryTabs';
import { MenuGrid } from './components/MenuGrid';
import { CartDrawer } from './components/CartDrawer';
import { MENU_ITEMS } from './constants';
import { MenuItem, CartItem, ItemVariant } from './types';

function App() {
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
    <div className="min-h-screen pb-32 bg-slate-50 text-right">
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

        <footer className="mt-12 p-12 border-t border-slate-50 text-center">
          <p className="text-sm font-black text-slate-800 uppercase tracking-widest">بيك جكن - BIG CHICKEN</p>
          <p className="text-[10px] mt-2 text-slate-400 font-bold uppercase tracking-widest">© 2025 جميع الحقوق محفوظة</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
