import React from 'react';

export default function TemplateCorporate({ data }: { data: any }) {
  const accent = data?.AccentColor || '#0F172A';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div style={{ backgroundColor: accent }} className="w-6 h-6 rounded-md"></div>
          Launchify
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-gray-900">Çözümler</a>
          <a href="#" className="hover:text-gray-900">Kurumsal</a>
          <a href="#" className="hover:text-gray-900">Fiyatlandırma</a>
        </div>
        <button
          style={{ backgroundColor: accent }}
          className="px-5 py-2 text-white text-sm rounded-lg font-medium hover:shadow-lg transition-shadow"
        >
          Bize Ulaşın
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-6 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span> Güvenilir Altyapı
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {data?.AiGeneratedHeroTitle || "İşletmeniz için Güvenilir ve Ölçeklenebilir Çözümler"}
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {data?.AiGeneratedMarketingCopy || "Kurumsal süreçlerinizi optimize eden, güvenli ve yüksek performanslı teknoloji altyapısı."}
          </p>
          <div className="flex gap-4">
            <button
              style={{ backgroundColor: accent }}
              className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Hemen Başlayın
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Detaylı Bilgi
            </button>
          </div>
        </div>
        
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl flex items-center justify-center bg-white border border-gray-200">
          <div style={{ backgroundColor: accent }} className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"></div>
          <div className="relative z-10 p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800">Verimlilik Artışı</h3>
            <p className="text-gray-500 mt-2 text-sm">İş akışlarınızı anında otomatikleştirin.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12 px-8 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              Launchify
            </div>
            <p className="max-w-sm text-sm leading-relaxed">Modern işletmeler için kurumsal standartlarda teknoloji çözümleri.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 text-sm">
          © 2026 Launchify Kurumsal Çözümler. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}