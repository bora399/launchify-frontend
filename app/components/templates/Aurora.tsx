"use client";
import React, { useState } from 'react';

export default function TemplateAurora({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#3B82F6';
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
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative font-sans selection:bg-purple-500/30 selection:text-white">
      {/* Glow Efektleri */}
      <div className="fixed top-[-10%] left-[-10%] w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full bg-purple-600/20 blur-[130px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-blue-600/15 blur-[130px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#050505]/75 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center">
        <div className="text-base sm:text-xl font-bold tracking-wider flex items-center gap-2.5 truncate max-w-[200px] sm:max-w-none">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-lg shrink-0 shadow-lg" style={{ backgroundColor: accent, boxShadow: `0 0 16px ${accent}90` }}></div>
          <span className="truncate">{data?.productName || "Launchify"}</span>
        </div>
        <a href="#waitlist" className="px-4 sm:px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-xs sm:text-sm font-semibold shrink-0 active:scale-95">
          Erken Erişim
        </a>
      </nav>

      <main className="flex flex-col items-center justify-center pt-16 sm:pt-28 pb-16 sm:pb-24 text-center px-4 relative z-10 max-w-4xl mx-auto">
        <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] sm:text-xs font-medium mb-6 sm:mb-8 text-gray-300 flex items-center gap-2 backdrop-blur-md shadow-inner">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accent }}></span> 
          <span>Yapay Zeka Destekli Altyapı</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 leading-[1.15] tracking-tight">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle}
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none justify-center">
          <a href="#waitlist" style={{ backgroundColor: accent, boxShadow: `0 0 35px ${accent}40` }} className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-white hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all text-center text-sm sm:text-base">
            {data?.callToActionText || data?.aiConfig?.callToActionText || "Hemen Başla"}
          </a>
          {data?.demoLink && (
            <a href={demoUrl} target={target} className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base">
              Canlı Demo <span className="opacity-50">→</span>
            </a>
          )}
        </div>

        {/* Canlı Sosyal Kanıt */}
        <div className="mt-10 sm:mt-12 flex items-center gap-2.5 text-xs text-white/50 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Son 24 saatte <strong className="text-white">40+ kurucu</strong> bekleme sırasına katıldı.</span>
        </div>
      </main>

      {data?.features && data.features.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">Neden {data?.productName}?</h2>
            <p className="text-gray-500 text-xs sm:text-sm">Modern işletmeler için tasarlanan temel avantajlar.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {data.features.map((feature: any, index: number) => (
              <div key={index} className="bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-md hover:border-white/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform" style={{ color: accent }}>
                  <span className="text-lg font-black">0{index + 1}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="waitlist" className="py-14 sm:py-24 relative z-10 px-4">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-3xl rounded-[2.5rem]"></div>
          
          <div className="relative bg-white/[0.04] border border-white/10 p-6 sm:p-12 md:p-14 rounded-3xl backdrop-blur-xl text-center overflow-hidden">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">{data?.productName} ile Başlayın</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-xs sm:text-base">
              Kontenjan dolmadan yerinizi ayırtın. Platform açıldığında ilk davetiyeyi size ulaştıracağız.
            </p>
            
            {isSubmitted ? (
              <div className="inline-flex items-center gap-3 bg-emerald-500/10 text-emerald-400 px-6 py-4 rounded-2xl border border-emerald-500/20 font-medium text-xs sm:text-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Talebiniz kaydedildi. İlk haber alan siz olacaksınız!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5 sm:gap-2">
                <input 
                  type="email" 
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresinizi girin..." 
                  className="w-full bg-black/60 border border-white/15 text-white px-4 sm:px-5 py-3.5 rounded-xl sm:rounded-2xl focus:outline-none focus:border-white/40 text-xs sm:text-sm placeholder:text-gray-500"
                />
                <button 
                  type="submit" 
                  style={{ backgroundColor: accent }} 
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-95 transition-transform whitespace-nowrap cursor-pointer shrink-0 shadow-lg"
                >
                  {data?.callToActionText || data?.aiConfig?.callToActionText || "Kayıt Ol"}
                </button>
              </form>
            )}
            <p className="text-gray-600 text-[10px] sm:text-xs mt-4">Spam yok. İstediğiniz zaman ayrılabilirsiniz.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-xs relative z-10 flex flex-col items-center bg-[#050505] px-4">
        <div className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }}></div>
          {data?.productName}
        </div>
        <p>© 2026 Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}