"use client";
import React, { useState } from 'react';

export default function TemplateAurora({ data }: { data: any }) {
  const accent = data?.accentColor || '#3B82F6';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
        const res = await fetch(`${apiUrl}/api/Waitlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageId: data.id, // SlugPage'den gönderdiğimiz proje ID'si
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
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
      {/* Arka Plan Işık Efektleri (Glassmorphism Aura) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#050505]/50 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider flex items-center gap-3">
          <div className="w-5 h-5 rounded-lg" style={{ backgroundColor: accent, boxShadow: `0 0 15px ${accent}80` }}></div>
          {data?.productName || "Launchify"}
        </div>
        <a href="#waitlist" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-sm font-medium">
          Erken Erişim
        </a>
      </nav>

      <main className="flex flex-col items-center justify-center pt-32 pb-20 text-center px-4 relative z-10 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium mb-8 text-gray-300 flex items-center gap-2 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }}></span> 
          Yapay Zeka Destekli Altyapı
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-gray-200 to-gray-500 leading-tight tracking-tight">
          {data?.aiGeneratedHeroTitle}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          {data?.aiGeneratedMarketingCopy}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
          <a href="#waitlist" style={{ backgroundColor: accent, boxShadow: `0 0 40px ${accent}40` }} className="px-10 py-4 rounded-full font-bold text-white hover:opacity-90 hover:scale-105 transition-all text-center">
            {data?.callToActionText || "Hemen Başla"}
          </a>
          {data?.demoLink && (
            <a href={demoUrl} target={target} className="px-10 py-4 rounded-full font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2">
              Canlı Demo <span className="opacity-50">→</span>
            </a>
          )}
        </div>
      </main>

      {data?.features && data.features.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Neden {data?.productName}?</h2>
            <p className="text-gray-500">Sizi rakiplerinizden ayıracak temel avantajlar.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {data.features.map((feature: any, index: number) => (
              <div key={index} className="bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform" style={{ color: accent }}>
                  {/* Farklı indexler için farklı ikonlar */}
                  {index === 0 ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  ) : index === 1 ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section id="waitlist" className="py-24 relative z-10 px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-3xl rounded-[3rem]"></div>
          
          <div className="relative bg-white/5 border border-white/10 p-12 md:p-16 rounded-[3rem] backdrop-blur-xl text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-30"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{data?.productName} ile Yükselişe Geçin</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
              Kontenjanlarımız hızla doluyor. E-posta adresinizi bırakın, sistem açıldığında ilk sizin haberiniz olsun.
            </p>
            
            {isSubmitted ? (
              <div className="inline-flex items-center gap-3 bg-green-500/10 text-green-400 px-8 py-5 rounded-2xl border border-green-500/20 font-medium">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Talebiniz alındı! Yakında görüşmek üzere.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative flex items-center group">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz..." 
                  className="w-full bg-black/50 border border-white/10 text-white px-6 py-4 rounded-2xl focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all placeholder:text-gray-600 pr-36"
                />
                <button 
                  type="submit" 
                  style={{ backgroundColor: accent }} 
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg whitespace-nowrap"
                >
                  {data?.callToActionText || "Kayıt Ol"}
                </button>
              </form>
            )}
            <p className="text-gray-600 text-xs mt-6">Spam göndermeyiz. İstediğiniz zaman ayrılabilirsiniz.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-gray-500 text-sm relative z-10 flex flex-col items-center bg-[#050505]">
        <div className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }}></div>
          {data?.productName}
        </div>
        <p className="mt-2">© 2026 Tüm hakları saklıdır. <span className="text-gray-400">Launchify</span> tarafından oluşturuldu.</p>
      </footer>
    </div>
  );
}