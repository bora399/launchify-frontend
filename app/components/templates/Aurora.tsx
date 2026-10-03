import React from 'react';

export default function TemplateAurora({ data }: { data: any }) {
  const accent = data?.accentColor || '#3B82F6';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
      {/* Arka Plan Işık Efektleri */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#050505]/70 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}` }}></div>
          {data?.productName || "Launchify"}
        </div>
        <a href={demoUrl} target={target} className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 text-sm font-medium">
          Sisteme Giriş
        </a>
      </nav>

      {/* Hero Alanı */}
      <main className="flex flex-col items-center justify-center pt-24 pb-16 text-center px-4 relative z-10 max-w-5xl mx-auto">
        <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm mb-8 text-gray-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }}></span> 
          Yapay Zeka Destekli Altyapı
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 leading-tight">
          {data?.aiGeneratedHeroTitle || "Geleceğin Teknolojisini Bugünden Keşfedin"}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          {data?.aiGeneratedMarketingCopy || "Ürününüzün tüm potansiyelini ortaya çıkaracak yenilikçi altyapı."}
        </p>
        <div className="flex gap-4">
          <a href={demoUrl} target={target} style={{ backgroundColor: accent, boxShadow: `0 0 30px ${accent}60` }} className="px-8 py-4 rounded-full font-semibold text-white hover:opacity-90 transition-all hover:scale-105 inline-block">
            Hemen Başla
          </a>
          <button className="px-8 py-4 rounded-full font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
            Daha Fazla Bilgi
          </button>
        </div>
      </main>

      {/* Özellikler Grid (Yeni) */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/10" style={{ color: accent }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Performans & Güç</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{data?.productName} altyapısı ile süreçlerinizi optimize edin, rakiplerinizin bir adım önüne geçin.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alt CTA (Yeni) */}
      <section className="py-20 relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-4">{data?.productName} ile Yükselişe Geçin</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Modern işletmeler için tasarlanmış ekosisteme bugün dahil olun.</p>
          <a href={demoUrl} target={target} style={{ backgroundColor: accent }} className="px-8 py-4 rounded-full font-bold inline-block hover:scale-105 transition-transform">
            Platformu İncele
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm relative z-10 flex flex-col items-center">
        <div className="text-xl font-bold text-white mb-2">{data?.productName}</div>
        <p>© 2026 Tüm hakları saklıdır. Launchify tarafından üretilmiştir.</p>
      </footer>
    </div>
  );
}