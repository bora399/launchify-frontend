"use client";
import React, { useState } from 'react';

const DEFAULT_CORP_FAQS = [
  {
    q: "Kurumsal güvenlik ve KVKK uyumluluğu var mı?",
    a: "Platformumuz endüstri standartlarında veri güvenliği, KVKK ve GDPR uyumlu şifrelenmiş sunucularda barındırılmaktadır."
  },
  {
    q: "Mevcut sistemlerimizle entegre edilebilir mi?",
    a: "Evet. API ve webhook desteğimiz sayesinde mevcut CRM ve veri tabanı çözümlerinize kolayca bağlanabilir."
  },
  {
    q: "SLA ve teknik destek güvencesi nedir?",
    a: "Tüm kurumsal müşterilerimize %99.9 çalışma süresi ve öncelikli teknik yardım hattı taahhüt edilmektedir."
  }
];

export default function TemplateCorporate({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#0F172A';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const rawFaqs = data?.faqs || data?.aiConfig?.faqs || data?.aiConfig?.Faqs;
  const faqs = rawFaqs && rawFaqs.length > 0 ? rawFaqs : DEFAULT_CORP_FAQS;

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
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans overflow-x-hidden">
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3.5 flex justify-between items-center sticky top-0 z-50">
        <div className="text-base sm:text-xl font-bold text-gray-950 flex items-center gap-2.5 truncate max-w-[200px] sm:max-w-none">
          <div style={{ backgroundColor: accent }} className="w-5 h-5 rounded-md shrink-0 shadow-sm"></div>
          <span className="truncate">{data?.productName || "Launchify"}</span>
        </div>
        <a href="#waitlist" style={{ backgroundColor: accent }} className="px-4 py-2 text-white text-xs sm:text-sm rounded-lg font-medium hover:opacity-90 transition-opacity shrink-0">
          {data?.callToActionText || data?.aiConfig?.callToActionText || "Sisteme Giriş"}
        </a>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold uppercase mb-4 tracking-wide border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Kurumsal Güvenilirlik
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-[1.15] mb-4">
            {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "İşletmeniz için Güvenilir Çözümler"}
          </h1>

          <p className="text-sm sm:text-lg text-gray-600 mb-6 leading-relaxed">
            {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Kurumsal süreçlerinizi optimize eden, güvenli ve yüksek performanslı teknoloji."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
            <a href="#waitlist" style={{ backgroundColor: accent }} className="w-full sm:w-auto px-6 py-3.5 text-white rounded-lg font-semibold shadow-sm hover:opacity-90 transition-opacity text-center text-xs sm:text-sm">
              {data?.callToActionText || data?.aiConfig?.callToActionText || "Erken Erişime Katıl"}
            </a>
            {data?.demoLink && (
              <a href={demoUrl} target={target} className="w-full sm:w-auto px-6 py-3.5 border border-gray-300 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center text-xs sm:text-sm">
                Demosunu İncele
              </a>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-gray-200 pt-5">
            <div>
              <p className="text-xl sm:text-2xl font-black text-gray-950">%99.9</p>
              <p className="text-[11px] text-gray-500 font-medium">Uptime Güvencesi</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-gray-950">256-bit</p>
              <p className="text-[11px] text-gray-500 font-medium">SSL Şifreleme</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-gray-950">10x</p>
              <p className="text-[11px] text-gray-500 font-medium">Hızlı Dağıtım</p>
            </div>
          </div>
        </div>
        
        <div className="relative h-[280px] sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-xl flex items-center justify-center bg-white border border-gray-200">
          <div style={{ backgroundColor: accent }} className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative z-10 w-4/5 space-y-3">
             <div className="h-3 w-1/3 bg-gray-200 rounded-full mb-6"></div>
             {[85, 60, 75].map((width, i) => (
               <div key={i} className="w-full bg-gray-100 rounded-full h-7 overflow-hidden flex items-center relative">
                  <div style={{ backgroundColor: accent, width: `${width}%` }} className="h-full absolute left-0 top-0 opacity-80"></div>
                  <span className="relative z-10 text-[11px] font-bold text-white ml-3">Veri Senkronizasyonu {i+1}</span>
               </div>
             ))}
          </div>
        </div>
      </main>

      {data?.features && data.features.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-10 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2">Neden {data?.productName}?</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Operasyonel maliyetleri düşüren kurumsal yetenekler.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {data.features.map((feature: any, index: number) => (
                <div key={index} className="bg-gray-50 border border-gray-200/80 p-6 rounded-2xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-100/70 flex items-center justify-center mb-4" style={{ color: accent }}>
                    <span className="font-bold text-sm">0{index + 1}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-1.5">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mb-2">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-500 text-xs sm:text-sm">{data?.productName} hakkında merak edilen kurumsal detaylar.</p>
          </div>

          <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            {faqs.map((faq: any, idx: number) => {
              const q = faq.question || faq.Question || faq.q;
              const a = faq.answer || faq.Answer || faq.a;
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex justify-between items-center text-xs sm:text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50"
                  >
                    <span className="pr-4">{q}</span>
                    <span className="text-gray-400 text-lg font-light shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="waitlist" className="py-14 sm:py-20 bg-gray-950 text-white relative overflow-hidden px-4">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Kurumsal Dönüşüme Başlayın</h2>
          <p className="text-gray-400 mb-8 text-xs sm:text-sm">
            Erken erişim programımıza katılmak için şirket e-posta adresinizi bırakın.
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-emerald-400 text-xs sm:text-sm">
              Talebiniz kurumsal listemize eklendi. Teşekkürler.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Kurumsal E-posta Adresiniz" 
                className="w-full sm:flex-1 bg-white border border-gray-200 text-gray-950 px-4 py-3.5 rounded-lg focus:outline-none text-xs sm:text-sm"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="w-full sm:w-auto px-6 py-3.5 text-white rounded-lg font-bold shadow-md hover:opacity-90 transition-opacity whitespace-nowrap text-xs sm:text-sm cursor-pointer shrink-0"
              >
                {data?.callToActionText || data?.aiConfig?.callToActionText || "Bize Ulaşın"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-6 px-4 sm:px-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-2">
        <span>© 2026 {data?.productName} Kurumsal Çözümler.</span>
        <span>Powered by Launchify</span>
      </footer>
    </div>
  );
}