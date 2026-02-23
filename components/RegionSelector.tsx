import React, { useState } from 'react';

interface RegionSelectorProps {
  onSelect: (regionId: string) => void;
}

const REGIONS = [
  { id: 'bismayah', name: 'بسماية', active: true },
  { id: 'baladiyat', name: 'البلديات', active: false },
  { id: 'amin', name: 'الامين', active: false },
  { id: 'dora', name: 'الدورة', active: false },
];

export const RegionSelector: React.FC<RegionSelectorProps> = ({ onSelect }) => {
  const [showSoonMessage, setShowSoonMessage] = useState<string | null>(null);

  const handleRegionClick = (region: typeof REGIONS[0]) => {
    if (region.active) {
      onSelect(region.id);
    } else {
      setShowSoonMessage(region.id);
      setTimeout(() => setShowSoonMessage(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-right relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-orange-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-md relative z-10 flex flex-col items-center animate__animated animate__fadeInUp">
        <div className="w-32 h-32 bg-white rounded-3xl p-2 shadow-xl shadow-black/5 mb-8">
          <img 
            src="https://ik.imagekit.io/bualmg8h2/Untitled%20design.png" 
            alt="شعار بيك جكن" 
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">اختر منطقتك</h2>
        <p className="text-slate-500 font-bold mb-10 text-center">لنعرض لك الفروع المتاحة للتوصيل</p>

        <div className="w-full space-y-4">
          {REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region)}
              className={`w-full relative overflow-hidden group p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${
                region.active 
                  ? 'bg-white border-red-100 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10' 
                  : 'bg-slate-100 border-transparent opacity-80'
              }`}
            >
              <span className={`text-xl font-black ${region.active ? 'text-slate-800 group-hover:text-red-600' : 'text-slate-500'}`}>
                {region.name}
              </span>
              
              {region.active ? (
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              ) : (
                <span className="text-xs font-bold bg-slate-200 text-slate-500 px-3 py-1.5 rounded-lg">
                  {showSoonMessage === region.id ? 'قريباً جداً!' : 'قريباً'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
