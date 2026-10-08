"use client";
import React, { useState } from 'react';

export default function TemplateMinimal({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#000000';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
        const res = await fetch(`${apiUrl}/api/Waitlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pageId: data.id,
            email: email
          })
        });

        if (res.ok) {
          setIsSubmitted(true);
          setEmail('');
        } else {
          console.error("Sunucu hatası: E-posta kaydedilemedi.");
        }
      } catch (error) {
        console.error("Bağlantı hatası:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif selection:bg-gray-200 overflow-x-hidden">
      <nav className="px-4 sm:px-8 md:px-16 py-6 sm:py-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-lg sm:text-xl tracking-[0.2em] uppercase font-light truncate max-w-[200px] sm:max-w-none">
          {data?.productName || "Launchify"}
        </div>
        <a href="#waitlist" style={{ color: accent }} className="text-xs sm:text-sm tracking-widest uppercase font-semibold hover:opacity-70 transition-opacity font-sans shrink-0">
          {data?.callToActionText || data?.aiConfig?.callToActionText || "İletişim"}
        </a>
      </nav>

      <main className="flex flex-col items-center justify-center pt-12 sm:pt-20 pb-20 sm:pb-32 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light leading-[1.2] mb-6 sm:mb-10 text-gray-900">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "Sadelikteki kusursuz dengeyi keşfedin."}
        </h1>
        <p className="text-sm sm:text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mb-8 sm:mb-16 font-sans font-light">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Gereksiz detaylardan arındırılmış, sadece amaca hizmet eden minimalist yaklaşım."}
        </p>
        <a href="#waitlist" style={{ backgroundColor: accent }} className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-white text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity inline-block font-sans text-center">
          {data?.callToActionText || data?.aiConfig?.callToActionText || "Projeyi Keşfet"}
        </a>
      </main>

      {data?.features && data.features.length > 0 && (
        <section id="features" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-gray-100 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
            <div className="md:col-span-4 text-xs tracking-widest uppercase text-gray-400 pt-2">
              Odak Noktamız
            </div>
            <div className="md:col-span-8 space-y-10 sm:space-y-16">
              {data.features.map((feature: any, idx: number) => (
                <div key={idx} className="flex gap-4 sm:gap-8 items-start">
                  <span className="text-gray-300 font-light text-xl sm:text-2xl">0{idx + 1}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-medium mb-2 sm:mb-4 text-gray-900 font-serif">{feature.title}</h3>
                    <p className="text-gray-500 font-light leading-relaxed text-xs sm:text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="waitlist" className="py-20 sm:py-32 px-4 sm:px-6 max-w-3xl mx-auto text-center border-t border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">Bizimle İletişimde Kalın</h2>
        <p className="text-gray-500 font-sans font-light mb-8 sm:mb-12 text-xs sm:text-base">
          Sadece {data?.productName} ile ilgili en önemli güncellemeleri almak için adresinizi bırakın.
        </p>
        
        {isSubmitted ? (
          <div className="text-xs sm:text-sm tracking-widest uppercase text-gray-500 font-sans border-b border-gray-200 pb-2 inline-block">
            İlginiz için teşekkürler. Kaydınız alındı.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3 font-sans border-b border-gray-300 pb-2 sm:pb-0">
            <input 
              type="email" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz..." 
              className="w-full bg-transparent text-gray-900 px-0 py-3 sm:py-4 focus:outline-none placeholder:text-gray-400 placeholder:font-light text-sm sm:text-base"
            />
            <button 
              type="submit" 
              style={{ color: accent }} 
              className="w-full sm:w-auto text-xs font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity py-2 sm:py-0 shrink-0 cursor-pointer text-center"
            >
              Gönder
            </button>
          </form>
        )}
      </section>

      <footer className="mt-6 sm:mt-10 py-10 sm:py-16 text-center text-[10px] tracking-widest uppercase text-gray-400 font-sans px-4">
        <p>{data?.productName} © 2026 — Tasarımın Özü.</p>
      </footer>
    </div>
  );
}