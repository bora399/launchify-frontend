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
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <nav className="border-b-4 border-black bg-white px-4 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl sm:text-2xl font-black uppercase tracking-tighter truncate max-w-[200px] sm:max-w-none">
          {data?.productName || "Launchify"}*
        </div>
        <a href="#waitlist" className="px-4 sm:px-6 py-2 font-black uppercase text-xs sm:text-sm border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white shrink-0">
          Erken Erişim
        </a>
      </nav>

      <main className="px-4 sm:px-8 md:px-12 py-12 sm:py-20 md:py-28 flex flex-col items-start max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="border-2 border-black px-3 py-1 font-black uppercase text-xs bg-[#FDE047] shadow-[2px_2px_0px_#000]">
            ⚡ BETA V1.0
          </div>
          <div className="border-2 border-black px-3 py-1 font-black uppercase text-xs bg-white shadow-[2px_2px_0px_#000]">
            %100 NO-BS
          </div>
        </div>

        <h1 className="text-3xl sm:text-6xl md:text-8xl font-black uppercase leading-[1.05] tracking-tighter mb-6 sm:mb-8 max-w-5xl">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "Kuralları Yıkan Yeni Nesil Çözüm."}
        </h1>

        <p className="text-sm sm:text-lg md:text-xl font-bold max-w-3xl mb-8 sm:mb-10 border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6 bg-white p-3 sm:p-4 shadow-[4px_4px_0px_#000]">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Sınırları zorla, kalıpların dışına çık ve potansiyelini serbest bırak."}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a href="#waitlist" style={{ backgroundColor: accent }} className="w-full sm:w-auto text-center px-8 sm:px-10 py-4 text-sm sm:text-lg font-black uppercase border-4 border-black shadow-[5px_5px_0px_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
            {data?.callToActionText || data?.aiConfig?.callToActionText || "Harekete Geç"}
          </a>
        </div>
      </main>

      {/* Marquee Bandı */}
      <div className="border-y-4 border-black overflow-hidden flex whitespace-nowrap bg-black text-white py-3 font-black uppercase text-base sm:text-xl tracking-widest">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-6 sm:gap-10">
          <span>{data?.productName}</span> <span>✦</span> <span>KURALLARI YIK</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>SINIRLARI ZORLA</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>KURALLARI YIK</span> <span>✦</span>
        </div>
      </div>

      {data?.features && data.features.length > 0 && (
        <section className="px-4 sm:px-8 md:px-12 py-14 sm:py-20 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black uppercase mb-8 border-b-4 border-black pb-2 inline-block">Neden Biz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {data.features.map((feature: any, idx: number) => (
              <div key={idx} className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between">
                <div>
                  <div style={{ backgroundColor: accent }} className="w-10 h-10 border-2 border-black flex items-center justify-center font-black text-lg mb-4 shadow-[2px_2px_0px_#000]">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black uppercase mb-2">{feature.title}</h3>
                  <p className="font-medium text-xs sm:text-sm leading-relaxed text-gray-800">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="waitlist" className="px-4 sm:px-8 md:px-12 py-14 sm:py-20 bg-black text-white border-t-4 border-black">
        <div className="max-w-4xl mx-auto border-4 border-white p-6 sm:p-12 shadow-[-6px_6px_0px_#fff] relative">
          <div style={{ backgroundColor: accent }} className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 px-3 py-1 border-2 border-white text-black font-black uppercase text-[10px] sm:text-xs rotate-3">
            KONTENJAN SINIRLI!
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase mb-3">{data?.productName} BAŞLIYOR</h2>
          <p className="text-xs sm:text-base font-bold mb-8 max-w-xl text-gray-300">
            E-posta adresini bırak, sistem açıldığı anda ilk bildirim senin gelen kutuna düşsün.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white text-black border-4 border-white p-4 font-black uppercase text-xs sm:text-sm inline-block">
              🚀 LİSTEYE ALINDIN! YAKINDA GÖRÜŞÜRÜZ.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİN" 
                className="w-full sm:flex-1 bg-transparent border-4 border-white text-white px-4 py-3.5 text-xs sm:text-base font-bold uppercase placeholder:text-gray-500 focus:outline-none focus:bg-white/10"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="w-full sm:w-auto px-8 py-3.5 border-4 border-white text-black text-xs sm:text-base font-black uppercase hover:invert transition-all shrink-0 cursor-pointer shadow-[3px_3px_0px_#fff]"
              >
                {data?.callToActionText || data?.aiConfig?.callToActionText || "BANA BİLDİR"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white text-black border-t-4 border-black px-4 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <h2 className="text-xl font-black uppercase">{data?.productName || "Launchify"}*</h2>
          <p className="font-bold text-xs uppercase">© 2026 Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}