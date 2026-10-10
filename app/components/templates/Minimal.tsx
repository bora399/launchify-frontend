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
    if (!email) return;

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
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-gray-900 font-serif selection:bg-gray-200 overflow-x-hidden">
      {/* Navbar */}
      <nav className="px-4 sm:px-8 md:px-12 py-5 sm:py-8 flex justify-between items-center max-w-5xl mx-auto border-b border-gray-100">
        <div className="text-base sm:text-lg tracking-[0.25em] uppercase font-light truncate max-w-[200px] sm:max-w-none">
          {data?.productName || "Launchify"}
        </div>
        <a href="#waitlist" style={{ color: accent }} className="text-xs tracking-widest uppercase font-semibold hover:opacity-70 transition-opacity font-sans shrink-0">
          {data?.callToActionText || data?.aiConfig?.callToActionText || "İletişim"}
        </a>
      </nav>

      {/* Hero */}
      <main className="flex flex-col items-center justify-center pt-14 sm:pt-24 pb-16 sm:pb-24 text-center px-4 max-w-3xl mx-auto">
        <p className="text-[11px] font-sans tracking-[0.3em] uppercase text-gray-400 mb-6">
          01 — Giriş & Vizyon
        </p>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light leading-[1.2] mb-6 sm:mb-8 text-gray-950">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "Sadelikteki kusursuz dengeyi keşfedin."}
        </h1>

        <p className="text-sm sm:text-lg text-gray-500 leading-relaxed max-w-xl mb-8 sm:mb-12 font-sans font-light">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Gereksiz detaylardan arındırılmış, sadece amaca hizmet eden minimalist yaklaşım."}
        </p>

        <a href="#waitlist" style={{ backgroundColor: accent }} className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 text-white text-xs tracking-[0.2em] uppercase hover:opacity-85 transition-opacity inline-block font-sans text-center">
          {data?.callToActionText || data?.aiConfig?.callToActionText || "Projeyi Keşfet"}
        </a>
      </main>

      {/* Features */}
      {data?.features && data.features.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 border-t border-gray-100 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            <div className="md:col-span-4 text-xs tracking-widest uppercase text-gray-400 pt-1">
              02 — Odak Noktamız
            </div>
            <div className="md:col-span-8 space-y-8 sm:space-y-12">
              {data.features.map((feature: any, idx: number) => (
                <div key={idx} className="flex gap-4 sm:gap-6 items-start">
                  <span className="text-gray-300 font-light text-lg sm:text-xl">0{idx + 1}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium mb-1.5 text-gray-950 font-serif">{feature.title}</h3>
                    <p className="text-gray-500 font-light leading-relaxed text-xs sm:text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Waitlist */}
      <section id="waitlist" className="py-16 sm:py-24 px-4 sm:px-6 max-w-xl mx-auto text-center border-t border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-light mb-3 text-gray-950">Bizimle İletişimde Kalın</h2>
        <p className="text-gray-500 font-sans font-light mb-8 text-xs sm:text-sm">
          Sadece {data?.productName} ile ilgili temel güncellemeler için e-posta bırakın.
        </p>
        
        {isSubmitted ? (
          <div className="text-xs tracking-widest uppercase text-gray-500 font-sans border-b border-gray-200 pb-2 inline-block">
            İlginiz için teşekkür ederiz. Kaydınız alındı.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 font-sans border-b border-gray-300 pb-2 sm:pb-0">
            <input 
              type="email" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz..." 
              className="w-full bg-transparent text-gray-950 px-0 py-3 focus:outline-none placeholder:text-gray-400 text-xs sm:text-sm font-light"
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

      {/* Footer */}
      <footer className="py-8 text-center text-[10px] tracking-widest uppercase text-gray-400 font-sans px-4 border-t border-gray-50">
        <p>{data?.productName} © 2026 — Tasarımın Özü.</p>
      </footer>
    </div>
  );
}