"use client";
import React, { useState } from 'react';

export default function TemplateCorporate({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#0F172A';
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
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2.5 truncate max-w-[200px] sm:max-w-none">
          <div style={{ backgroundColor: accent }} className="w-5 h-5 sm:w-6 sm:h-6 rounded-md shrink-0"></div>
          <span className="truncate">{data?.productName || "Launchify"}</span>
        </div>
        <a href="#waitlist" style={{ backgroundColor: accent }} className="px-4 sm:px-5 py-2 text-white text-xs sm:text-sm rounded-lg font-medium hover:shadow-lg transition-all shrink-0">
          {data?.callToActionText || data?.aiConfig?.callToActionText || "Sisteme Giriş"}
        </a>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold uppercase mb-4 sm:mb-6 tracking-wide border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Kurumsal & Güvenilir
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-4 sm:mb-6">
            {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "İşletmeniz için Güvenilir Çözümler"}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Kurumsal süreçlerinizi optimize eden, güvenli ve yüksek performanslı teknoloji."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a href="#waitlist" style={{ backgroundColor: accent }} className="w-full sm:w-auto px-6 py-3.5 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity text-center text-sm sm:text-base">
              {data?.callToActionText || data?.aiConfig?.callToActionText || "Erken Erişime Katıl"}
            </a>
            {data?.demoLink && (
              <a href={demoUrl} target={target} className="w-full sm:w-auto px-6 py-3.5 border border-gray-300 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center text-sm sm:text-base">
                Demosunu İncele
              </a>
            )}
          </div>
        </div>
        
        <div className="relative h-[320px] sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl flex items-center justify-center bg-white border border-gray-200">
          <div style={{ backgroundColor: accent }} className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative z-10 w-4/5 sm:w-3/4 space-y-3 sm:space-y-4">
             <div className="h-3 sm:h-4 w-1/3 bg-gray-200 rounded-full mb-6 sm:mb-8"></div>
             {[90, 65, 80].map((width, i) => (
               <div key={i} className="w-full bg-gray-100 rounded-full h-7 sm:h-8 overflow-hidden flex items-center relative">
                  <div style={{ backgroundColor: accent, width: `${width}%` }} className="h-full absolute left-0 top-0 opacity-80"></div>
                  <span className="relative z-10 text-[11px] sm:text-xs font-bold text-white ml-3">Veri Akışı {i+1}</span>
               </div>
             ))}
          </div>
        </div>
      </main>

      {data?.features && data.features.length > 0 && (
        <section id="features" className="py-16 sm:py-24 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
            <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4">Neden {data?.productName} Tercih Edilmeli?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">İş süreçlerinizi hızlandırmak ve maliyetleri düşürmek için tasarlanan kurumsal yetenekler.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {data.features.map((feature: any, index: number) => (
                <div key={index} className="bg-gray-50 border border-gray-100 p-6 sm:p-8 rounded-2xl">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-5" style={{ color: accent }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="waitlist" className="py-16 sm:py-24 bg-gray-900 text-white relative overflow-hidden px-4">
        <div style={{ backgroundColor: accent }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full opacity-20 blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6">Kurumsal Dönüşüme Başlayın</h2>
          <p className="text-gray-400 mb-8 sm:mb-10 text-sm sm:text-lg">
            Sisteme erken erişim sağlamak için şirket e-postanızı bırakın.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/10 border border-white/20 p-5 rounded-xl text-green-400 flex items-center justify-center gap-3 text-sm sm:text-base">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Talebiniz başarıyla alındı. Teşekkür ederiz.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Kurumsal E-posta Adresiniz" 
                className="w-full sm:flex-1 bg-white border border-gray-200 text-gray-900 px-4 sm:px-5 py-3.5 sm:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 text-white rounded-lg font-bold shadow-lg hover:opacity-90 transition-opacity whitespace-nowrap text-sm sm:text-base cursor-pointer shrink-0"
              >
                {data?.callToActionText || data?.aiConfig?.callToActionText || "Bize Ulaşın"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-8 sm:py-10 px-4 sm:px-8 md:px-12 text-center text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-3">
        <span>© 2026 {data?.productName} Kurumsal Çözümler.</span>
        <span>Powered by Launchify</span>
      </footer>
    </div>
  );
}