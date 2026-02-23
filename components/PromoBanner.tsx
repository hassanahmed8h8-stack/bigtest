
import React, { useState, useEffect } from 'react';

const IMAGES = [
  "https://ik.imagekit.io/79xgrqsyd/IMG_0159.jpeg",
  "https://ik.imagekit.io/79xgrqsyd/IMG_0158.jpeg",
  "https://ik.imagekit.io/79xgrqsyd/IMG_0157.jpeg"
];

export const PromoBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // تغيير الصورة كل 4 ثواني
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="relative h-56 sm:h-72 w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-red-500/20 group">
        
        {/* صور الخلفية مع تأثير الانتقال */}
        {IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <img 
              src={img} 
              alt={`عرض ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* طبقة تظليل (Overlay) خفيفة لتحسين جمالية الصور */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="relative h-full flex items-center justify-center">
          {/* تم إزالة النصوص بناءً على طلب المستخدم */}
          
          {/* مؤشرات الصور (Dots) */}
          <div className="absolute bottom-6 flex gap-2 z-20">
            {IMAGES.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-red-500 shadow-lg shadow-red-500/50' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* شعاع ضوئي يمر بالبطاقة عند التحويم */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
