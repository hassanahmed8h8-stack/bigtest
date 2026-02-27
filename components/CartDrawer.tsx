import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const DELIVERY_AREAS = [
  { id: 'a', name: 'مجمع A', fee: 1000 },
  { id: 'b', name: 'مجمع B', fee: 1000 },
];

const WHATSAPP_NUMBERS = [
  "07755556323",
  "07855556323",
  "07755556343",
  "07855556343"
];

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState(DELIVERY_AREAS[0].id);
  const [notes, setNotes] = useState('');
  const [showNumbersModal, setShowNumbersModal] = useState(false);
  const [shuffledNumbers, setShuffledNumbers] = useState<string[]>([]);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = DELIVERY_AREAS.find(a => a.id === area)?.fee || 0;
  const total = subtotal + deliveryFee;

  const handleInitialSubmit = () => {
    if (!name || !phone || !street) {
      alert('يرجى ملء جميع الحقول المطلوبة (الاسم، الرقم، الشارع)');
      return;
    }
    // Shuffle numbers
    const shuffled = [...WHATSAPP_NUMBERS].sort(() => Math.random() - 0.5);
    setShuffledNumbers(shuffled);
    setShowNumbersModal(true);
  };

  const handleWhatsAppOrder = (targetNumber: string) => {
    const formattedNumber = targetNumber.startsWith('0') ? '964' + targetNumber.substring(1) : targetNumber;
    const selectedArea = DELIVERY_AREAS.find(a => a.id === area);
    
    let message = "🍔 *طلب جديد من مطعم بيك جكن*\n";
    message += "--------------------------\n";
    message += `👤 *الاسم:* ${name}\n`;
    message += `📱 *الرقم:* ${phone}\n`;
    message += `📍 *المنطقة:* ${selectedArea?.name}\n`;
    message += `🛣️ *الشارع:* ${street}\n`;
    if (notes) {
      message += `📝 *ملاحظات:* ${notes}\n`;
    }
    message += "--------------------------\n";
    message += "🛒 *الطلبات:*\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   الكمية: ${item.quantity} | السعر: ${(item.price * item.quantity).toLocaleString()} د.ع\n`;
    });
    
    message += "--------------------------\n";
    message += `المجموع: ${subtotal.toLocaleString()} د.ع\n`;
    message += `التوصيل: ${deliveryFee.toLocaleString()} د.ع\n`;
    message += `💰 *الإجمالي النهائي: ${total.toLocaleString()} د.ع*`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setShowNumbersModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => {
        setShowNumbersModal(false);
        onClose();
      }} />
      
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-left">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-2xl font-black text-slate-900">سلة طلباتك</h2>
          <button onClick={onClose} className="p-2.5 hover:bg-slate-200 text-slate-600 bg-white border border-slate-200 rounded-xl transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-6">
              <div className="text-8xl opacity-20">🛒</div>
              <p className="font-bold text-lg">سلتك فارغة.. جرب تطلب شي يونسك!</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-700 border-b pb-2">الطلبات</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <img src={item.image} className="w-24 h-24 rounded-2xl object-cover shadow-sm" alt={item.name} />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-black text-slate-900 text-lg mb-0.5">{item.name}</h4>
                        <span className="text-red-500 font-black">{item.price.toLocaleString()} د.ع</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-slate-100 font-black transition-colors"
                        >
                          -
                        </button>
                        <span className="font-black text-slate-900 w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 font-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1 self-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-700 border-b pb-2">تفاصيل التوصيل</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">الاسم <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      placeholder="الاسم الكامل"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">الرقم <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-left"
                      placeholder="07XX XXX XXXX"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">المنطقة / المحافظة <span className="text-red-500">*</span></label>
                    <select 
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                    >
                      {DELIVERY_AREAS.map(a => (
                        <option key={a.id} value={a.id}>{a.name} (توصيل {a.fee.toLocaleString()} د.ع)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">اسم الشارع <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                      placeholder="اسم الشارع أو أقرب نقطة دالة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1">ملاحظات الزبون</label>
                    <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none h-20"
                      placeholder="أي ملاحظات إضافية للطلب أو التوصيل..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 space-y-5 bg-slate-50">
            <div className="space-y-2">
              <div className="flex justify-between items-center px-2 text-sm text-slate-500 font-bold">
                <span>المجموع</span>
                <span>{subtotal.toLocaleString()} د.ع</span>
              </div>
              <div className="flex justify-between items-center px-2 text-sm text-slate-500 font-bold">
                <span>التوصيل</span>
                <span>{deliveryFee.toLocaleString()} د.ع</span>
              </div>
              <div className="flex justify-between items-center px-2 pt-2 border-t border-slate-200/60">
                <span className="text-lg font-bold text-slate-700">الإجمالي النهائي</span>
                <span className="text-2xl font-black text-red-600">{total.toLocaleString()} د.ع</span>
              </div>
            </div>
            <button 
              onClick={handleInitialSubmit}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-3xl font-black text-lg shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>إرسال الطلب عبر واتساب</span>
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp Numbers Modal */}
      {showNumbersModal && (
        <div className="absolute inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNumbersModal(false)} />
          <div className="relative bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate__animated animate__zoomIn animate__faster">
            <button 
              onClick={() => setShowNumbersModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mt-4 mb-6">
              <h3 className="text-2xl font-black text-slate-900 mb-2">إرسال طلبك إلى</h3>
              <p className="text-sm font-bold text-slate-500">اختر أحد أرقام فرع بسماية لإرسال طلبك</p>
            </div>

            <div className="space-y-3">
              {shuffledNumbers.map((num, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWhatsAppOrder(num)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 transition-all group"
                >
                  <span className="font-black text-lg text-slate-700 group-hover:text-red-600 tracking-wider" dir="ltr">
                    {num}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};