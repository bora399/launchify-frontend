"use client";
import React, { useState } from 'react';

export default function TemplateCorporate({ data }: { data: any }) {
  const accent = data?.accentColor || '#0F172A';
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
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 md:px-12 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div style={{ backgroundColor: accent }} className="w-6 h-6 rounded-md"></div>
          {data?.productName || "Launchify"}
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition-colors">Çözümler</a>
          <a href="#waitlist" className="hover:text-gray-900 transition-colors">Kayıt Ol</a>
        </div>
        <a href="#waitlist" style={{ backgroundColor: accent }} className="px-5 py-2 text-white text-sm rounded-lg font-medium hover:shadow-lg transition-all inline-block">
          {data?.callToActionText || "Sisteme Giriş"}
        </a>
      </nav>

      {/* Hero Alanı */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-6 tracking-wide border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Kurumsal & Güvenilir
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-6">
            {data?.aiGeneratedHeroTitle || "İşletmeniz için Güvenilir Çözümler"}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {data?.aiGeneratedMarketingCopy || "Kurumsal süreçlerinizi optimize eden, güvenli ve yüksek performanslı teknoloji."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#waitlist" style={{ backgroundColor: accent }} className="px-6 py-3.5 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity text-center">
              {data?.callToActionText || "Erken Erişime Katıl"}
            </a>
            {data?.demoLink && (
              <a href={demoUrl} target={target} className="px-6 py-3.5 border border-gray-300 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Demosunu İncele
              </a>
            )}
          </div>
        </div>
        
        {/* Sağ Taraf - İstatistik Grafik Objesi */}
        <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-white border border-gray-200">
          <div style={{ backgroundColor: accent }} className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative z-10 w-3/4 space-y-4">
             <div className="h-4 w-1/3 bg-gray-200 rounded-full mb-8"></div>
             {[90, 65, 80].map((width, i) => (
               <div key={i} className="w-full bg-gray-100 rounded-full h-8 overflow-hidden flex items-center relative">
                  <div style={{ backgroundColor: accent, width: `${width}%` }} className="h-full absolute left-0 top-0 opacity-80"></div>
                  <span className="relative z-10 text-xs font-bold text-white ml-3">Veri Akışı {i+1}</span>
               </div>
             ))}
          </div>
        </div>
      </main>

      {/* Yapay Zeka Özellikler Section */}
      {data?.features && data.features.length > 0 && (
        <section id="features" className="py-24 bg-white border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Neden {data?.productName} Tercih Edilmeli?</h2>
              <p className="text-gray-600">İş süreçlerinizi hızlandırmak ve maliyetleri düşürmek için tasarlanan kurumsal yetenekler.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {data.features.map((feature: any, index: number) => (
                <div key={index} className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-6" style={{ color: accent }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Kurumsal B2B Lead Capture */}
      <section id="waitlist" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div style={{ backgroundColor: accent }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Kurumsal Dönüşüme Başlayın</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Sisteme erken erişim sağlamak ve size özel tekliflerden yararlanmak için şirket e-postanızı bırakın. Müşteri temsilcilerimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/10 border border-white/20 p-6 rounded-xl text-green-400 flex items-center justify-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
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
                className="flex-1 bg-white border border-gray-200 text-gray-900 px-5 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-500"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="px-8 py-4 text-white rounded-lg font-bold shadow-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                {data?.callToActionText || "Bize Ulaşın"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10 px-6 md:px-12 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <span>© 2026 {data?.productName} Kurumsal Çözümler.</span>
        <span className="mt-4 md:mt-0">Powered by Launchify</span>
      </footer>
    </div>
  );
}