import React from 'react';

export default function TemplateAurora({ data }: { data: any }) {
  const accent = data?.AccentColor || '#3B82F6';

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative font-sans">
      {/* Arka Plan Işık Efektleri */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/30 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/30 blur-[120px]"></div>

      <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-wider">Launchify</div>
        <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 text-sm font-medium">
          Giriş Yap
        </button>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 relative z-10 mt-10">
        <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm mb-8 text-gray-300">
          ✨ Yapay Zeka Destekli Altyapı
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 max-w-4xl leading-tight">
          {data?.AiGeneratedHeroTitle || "Geleceğin Teknolojisini Bugünden Keşfedin"}
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          {data?.AiGeneratedMarketingCopy || "Ürününüzün tüm potansiyelini ortaya çıkaracak yenilikçi altyapı."}
        </p>
        <button
          style={{ backgroundColor: accent, boxShadow: `0 0 40px ${accent}60` }}
          className="px-8 py-4 rounded-full font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Hemen Başla
        </button>
      </main>

      <footer className="border-t border-white/10 mt-20 py-8 text-center text-gray-500 text-sm relative z-10 flex flex-col items-center">
        <div className="text-lg font-bold text-white mb-2">Launchify</div>
        <p>© 2026 Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}