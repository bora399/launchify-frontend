"use client";
import React, { useState } from 'react';

export default function TemplateAurora({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#6366F1';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const features = data?.features || data?.aiConfig?.features || [
    { title: "Yapay Zeka Mimarisi", description: "Karmaşık iş akışlarını otomatik analiz edip saniyeler içinde çalışır hale getirir." },
    { title: "Yüksek Performans & Düşük Gecikme", description: "Küresel uç sunucularda 50 milisaniyenin altında yanıt süresi." },
    { title: "Kusursuz Entegrasyon", description: "Tüm modern veri tabanları ve API'lerle tek satır konfigürasyonla konuşur." }
  ];

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
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden relative font-sans selection:bg-[#6366F1]/40 selection:text-white">
      {/* Arka Plan Ambient Mesh Işıkları */}
      <div 
        className="fixed top-[-15%] left-[-10%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{ backgroundColor: accent }}
      ></div>
      <div className="fixed bottom-[-15%] right-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none"></div>

      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      ></div>

      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-base sm:text-xl font-bold tracking-tight flex items-center gap-2.5">
            <div 
              className="w-5 h-5 rounded-lg shrink-0 shadow-lg" 
              style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accent}80` }}
            ></div>
            <span className="font-extrabold tracking-wider">{data?.productName || "Launchify"}</span>
          </div>

          <div className="flex items-center gap-3">
            {data?.demoLink && (
              <a 
                href={demoUrl} 
                target={target} 
                className="hidden sm:inline-flex text-xs font-semibold text-white/60 hover:text-white px-4 py-2 transition-colors"
              >
                Canlı Demo ↗
              </a>
            )}
            <a 
              href="#waitlist" 
              className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border border-white/10 hover:border-white/20 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              Erken Erişim
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-16 sm:pt-28 pb-16 text-center">
        {/* Üst Hap Rozet */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] sm:text-xs font-medium text-white/80 mb-6 backdrop-blur-md shadow-inner">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accent }}></span>
          <span>Gelecek Nesil Bulut Mimarisi</span>
          <span className="text-white/30">•</span>
          <span className="text-emerald-400 font-semibold">Aktif Beta</span>
        </div>

        <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.12] bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40 max-w-4xl mx-auto">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "Girişiminizi Geleceğe Taşıyın."}
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Tek platformda toplanmış akıllı araçlar ile süreçlerinizi hızlandırın ve değer yaratmaya odaklanın."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-16">
          <a 
            href="#waitlist" 
            style={{ backgroundColor: accent, boxShadow: `0 0 35px ${accent}50` }} 
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-white hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base text-center"
          >
            {data?.callToActionText || data?.aiConfig?.callToActionText || "Erken Erişime Katıl"}
          </a>
          {data?.demoLink && (
            <a 
              href={demoUrl} 
              target={target} 
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-semibold text-white/80 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white transition-all text-sm text-center flex items-center justify-center gap-2"
            >
              Canlı Önizleme <span className="text-white/40">→</span>
            </a>
          )}
        </div>

        <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0B0B]/90 backdrop-blur-2xl p-3 sm:p-5 shadow-2xl overflow-hidden text-left max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/5 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
              <span className="ml-3 text-[11px] text-white/40 font-mono hidden sm:inline">{data?.productName?.toLowerCase() || "app"}.internal.cluster/v1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-mono text-emerald-400">Canlı Sistem</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-white/40 block mb-1">METRİK / VERİ</span>
              <span className="text-lg font-bold text-white">4.82 Milyon</span>
              <span className="text-emerald-400 text-[10px] block mt-1">↑ %28.4 haftalık artış</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-white/40 block mb-1">GECİKME ORANI</span>
              <span className="text-lg font-bold text-white">18.2 ms</span>
              <span className="text-white/50 text-[10px] block mt-1">Global Edge Cluster</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-white/40 block mb-1">GÜVENİLİRLİK</span>
              <span className="text-lg font-bold text-emerald-400">%99.99 SLA</span>
              <span className="text-white/50 text-[10px] block mt-1">Sıfır Kesinti</span>
            </div>
          </div>
        </div>
      </main>

      <section className="border-y border-white/[0.06] bg-white/[0.01] py-8 sm:py-10 relative z-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">10x</p>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Hızlı Kurulum</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">&lt; 20ms</p>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Yanıt Süresi</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">0 Efor</p>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Sunucusuz Altyapı</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">256-Bit</p>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">Uçtan Uca Şifreleme</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6366F1] mb-2 block">MİMARİ & AVANTAJLAR</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Neden {data?.productName}?
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Geleneksel çözümlerin karmaşıklığından kurtulun. Hız, güvenlik ve ölçeklenebilirlik tek çatı altında.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f: any, idx: number) => (
            <div 
              key={idx} 
              className={`p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between group ${
                idx === 0 ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 font-mono font-bold text-lg group-hover:scale-105 transition-transform"
                  style={{ color: accent }}
                >
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                <span>Otomatik Optimize Edildi</span>
                <span className="text-white/70">Daha Fazla Bilgi →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="py-20 relative z-10 px-4">
        <div className="max-w-3xl mx-auto relative">
          <div 
            className="absolute inset-0 blur-3xl opacity-20 rounded-[3rem] pointer-events-none"
            style={{ backgroundColor: accent }}
          ></div>

          <div className="relative bg-[#0A0A0A] border border-white/10 p-8 sm:p-14 rounded-3xl backdrop-blur-2xl text-center shadow-2xl overflow-hidden">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4 inline-block">
              Sınırlı Erken Erişim
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">
              {data?.productName} Dünyasına İlk Adımı Atın
            </h2>
            <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto mb-8">
              Erken erişim kontenjanımız sınırlıdır. Sisteme ilk girenlerden olmak ve özel avantajlardan faydalanmak için e-postanızı bırakın.
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl text-sm font-semibold inline-flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Talebiniz başarıyla alındı! İlk davetiye size ulaştırılacak.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="İş e-posta adresinizi girin..." 
                  className="w-full bg-white/[0.04] border border-white/15 text-white px-4 py-3.5 rounded-xl text-sm outline-none focus:border-white/40 placeholder:text-white/30"
                />
                <button 
                  type="submit" 
                  style={{ backgroundColor: accent }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-lg"
                >
                  {data?.callToActionText || data?.aiConfig?.callToActionText || "Kayıt Ol"}
                </button>
              </form>
            )}
            <p className="text-white/30 text-[11px] mt-4">Kredi kartı gerekmez. Sıfır spam garantisi.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-10 text-center text-xs text-white/40 relative z-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }}></div>
            {data?.productName}
          </div>
          <p>© 2026 {data?.productName}. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}