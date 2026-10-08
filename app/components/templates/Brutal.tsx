"use client";
import React, { useState } from 'react';

export default function TemplateBrutal({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#FDE047'; 
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
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <nav className="border-b-4 border-black bg-white px-4 sm:px-8 md:px-12 py-4 sm:py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl sm:text-2xl font-black uppercase tracking-tighter truncate max-w-[200px] sm:max-w-none">
          {data?.productName || "Launchify"}*
        </div>
        <a href="#waitlist" className="px-4 sm:px-6 py-2 sm:py-2.5 font-bold uppercase text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white inline-block shrink-0">
          Erken Erişim
        </a>
      </nav>

      <main className="px-4 sm:px-8 md:px-12 py-12 sm:py-20 md:py-32 flex flex-col items-start max-w-7xl mx-auto">
        <div className="inline-block border-2 border-black px-3 sm:px-4 py-1 mb-5 sm:mb-6 font-bold uppercase text-xs sm:text-sm bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          Kalıpları Yık 🚀
        </div>
        <h1 className="text-3xl sm:text-6xl md:text-8xl font-black uppercase leading-[1.05] tracking-tighter mb-6 sm:mb-8 max-w-5xl">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "Kuralları Yıkan Yeni Nesil Çözüm."}
        </h1>
        <p className="text-base sm:text-xl md:text-2xl font-medium max-w-3xl mb-8 sm:mb-12 border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6 bg-white p-3 sm:p-4 shadow-[5px_5px_0px_rgba(0,0,0,1)]">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Sınırları zorla, kalıpların dışına çık ve potansiyelini serbest bırak."}
        </p>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <a href="#waitlist" style={{ backgroundColor: accent }} className="w-full sm:w-auto text-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all inline-block">
            {data?.callToActionText || data?.aiConfig?.callToActionText || "Harekete Geç"}
          </a>
        </div>
      </main>

      <div className="border-y-4 border-black overflow-hidden flex whitespace-nowrap bg-black text-white py-3 sm:py-4 font-black uppercase text-lg sm:text-2xl tracking-widest">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-6 sm:gap-10">
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
        </div>
      </div>

      {data?.features && data.features.length > 0 && (
        <section className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black uppercase mb-8 sm:mb-12 border-b-4 border-black pb-3 sm:pb-4 inline-block">Neden Biz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {data.features.map((feature: any, idx: number) => (
              <div key={idx} className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col">
                <div style={{ backgroundColor: accent }} className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-black flex items-center justify-center font-black text-xl sm:text-2xl mb-5 sm:mb-6 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  {idx + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase mb-3">{feature.title}</h3>
                <p className="font-medium text-sm sm:text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="waitlist" className="px-4 sm:px-8 md:px-12 py-14 sm:py-20 bg-black text-white border-t-4 border-black">
        <div className="max-w-4xl mx-auto border-4 border-white p-6 sm:p-10 md:p-16 shadow-[-8px_8px_0px_rgba(255,255,255,1)] sm:shadow-[-16px_16px_0px_rgba(255,255,255,1)] relative">
          <div style={{ backgroundColor: accent }} className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 px-3 py-1 sm:px-4 sm:py-2 border-2 border-white text-black font-black uppercase text-xs sm:text-sm rotate-3 sm:rotate-6">
            Sınırlı Kontenjan!
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase mb-4 sm:mb-6">{data?.productName} BAŞLIYOR</h2>
          <p className="text-sm sm:text-xl font-medium mb-6 sm:mb-10 max-w-2xl text-gray-300">
            Sıradanlığa veda etmeye hazırsan e-posta adresini bırak. Sistem açıldığında ilk sana haber vereceğiz.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white text-black border-4 border-white p-4 sm:p-6 font-black uppercase text-sm sm:text-xl inline-block">
              🚀 ARAMIZA HOŞ GELDİN! LİSTEYE EKLENDİN.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİN" 
                className="w-full sm:flex-1 bg-transparent border-4 border-white text-white px-4 sm:px-6 py-3.5 sm:py-5 text-sm sm:text-xl font-bold uppercase placeholder:text-gray-500 focus:outline-none focus:bg-white/10"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 border-4 border-white text-black text-sm sm:text-xl font-black uppercase hover:invert transition-all shrink-0 cursor-pointer"
              >
                {data?.callToActionText || data?.aiConfig?.callToActionText || "BANA HABER VER"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white text-black border-t-4 border-black px-4 sm:px-8 md:px-12 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-center sm:text-left">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">{data?.productName || "Launchify"}*</h2>
          <p className="font-bold text-xs sm:text-base uppercase">© 2026 Kuralları biz koyarız.</p>
        </div>
      </footer>
    </div>
  );
}