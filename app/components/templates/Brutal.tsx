"use client";
import React, { useState } from 'react';

export default function TemplateBrutal({ data }: { data: any }) {
  const accent = data?.accentColor || '#FDE047'; 
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b-4 border-black bg-white px-6 md:px-12 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-black uppercase tracking-tighter">{data?.productName || "Launchify"}*</div>
        <a href="#waitlist" className="px-6 py-2.5 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all bg-white inline-block">
          Erken Erişim
        </a>
      </nav>

      {/* Hero Alanı */}
      <main className="px-6 md:px-12 py-20 md:py-32 flex flex-col items-start max-w-7xl mx-auto">
        <div className="inline-block border-2 border-black px-4 py-1 mb-6 font-bold uppercase bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          Kalıpları Yık 🚀
        </div>
        <h1 className="text-5xl md:text-8xl font-black uppercase leading-[1.05] tracking-tighter mb-8 max-w-5xl">
          {data?.aiGeneratedHeroTitle || "Kuralları Yıkan Yeni Nesil Çözüm."}
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-3xl mb-12 border-l-8 border-black pl-6 bg-white p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          {data?.aiGeneratedMarketingCopy || "Sınırları zorla, kalıpların dışına çık ve potansiyelini serbest bırak."}
        </p>
        <div className="flex flex-wrap gap-6">
          <a href="#waitlist" style={{ backgroundColor: accent }} className="px-10 py-5 text-xl font-black uppercase border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all inline-block">
            {data?.callToActionText || "Harekete Geç"}
          </a>
        </div>
      </main>

      {/* Kayan Yazı (Marquee) Efekti */}
      <div className="border-y-4 border-black overflow-hidden flex whitespace-nowrap bg-black text-white py-4 font-black uppercase text-2xl tracking-widest">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-10">
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
        </div>
      </div>

      {/* Özellikler Grid (AI Verisi) */}
      {data?.features && data.features.length > 0 && (
        <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
          <h2 className="text-5xl font-black uppercase mb-12 border-b-4 border-black pb-4 inline-block">Neden Biz?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {data.features.map((feature: any, idx: number) => (
              <div key={idx} className="border-4 border-black bg-white p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[8px] hover:translate-y-[8px] transition-all flex flex-col">
                <div style={{ backgroundColor: accent }} className="w-14 h-14 border-2 border-black flex items-center justify-center font-black text-2xl mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-black uppercase mb-4">{feature.title}</h3>
                <p className="font-medium text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Neobrutalist Lead Capture (Waitlist) */}
      <section id="waitlist" className="px-6 md:px-12 py-20 bg-black text-white border-t-4 border-black">
        <div className="max-w-4xl mx-auto border-4 border-white p-10 md:p-16 shadow-[-16px_16px_0px_rgba(255,255,255,1)] relative">
          <div style={{ backgroundColor: accent }} className="absolute -top-6 -right-6 px-4 py-2 border-2 border-white text-black font-black uppercase rotate-6">Sınırlı Kontenjan!</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-6">{data?.productName} BAŞLIYOR</h2>
          <p className="text-xl font-medium mb-10 max-w-2xl">
            Sıradanlığa veda etmeye hazırsan e-posta adresini bırak. Sistem açıldığında ilk sana haber vereceğiz.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white text-black border-4 border-white p-6 font-black uppercase text-xl inline-block">
              🚀 ARAMIZA HOŞ GELDİN! LİSTEYE EKLENDİN.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİN" 
                className="flex-1 bg-transparent border-4 border-white text-white px-6 py-5 text-xl font-bold uppercase placeholder:text-gray-500 focus:outline-none focus:bg-white/10"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="px-10 py-5 border-4 border-white text-black text-xl font-black uppercase hover:invert transition-all"
              >
                {data?.callToActionText || "BANA HABER VER"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black border-t-4 border-black px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-4xl font-black uppercase tracking-tighter">{data?.productName || "Launchify"}*</h2>
          <p className="font-bold text-lg uppercase">© 2026 Kuralları biz koyarız.</p>
        </div>
      </footer>
    </div>
  );
}