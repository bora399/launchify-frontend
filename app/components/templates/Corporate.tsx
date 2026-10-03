import React from 'react';

export default function TemplateCorporate({ data }: { data: any }) {
  const accent = data?.accentColor || '#0F172A';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

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
          <a href="#about" className="hover:text-gray-900 transition-colors">Kurumsal</a>
        </div>
        <a href={demoUrl} target={target} style={{ backgroundColor: accent }} className="px-5 py-2 text-white text-sm rounded-lg font-medium hover:shadow-lg transition-all inline-block">
          Sisteme Giriş
        </a>
      </nav>

      {/* Hero Alanı */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-6 tracking-wide border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Güvenilir Altyapı
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-[1.15] mb-6">
            {data?.aiGeneratedHeroTitle || "İşletmeniz için Güvenilir Çözümler"}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {data?.aiGeneratedMarketingCopy || "Kurumsal süreçlerinizi optimize eden, güvenli ve yüksek performanslı teknoloji."}
          </p>
          <div className="flex gap-4">
            <a href={demoUrl} target={target} style={{ backgroundColor: accent }} className="px-6 py-3.5 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity text-center">
              Demosunu İncele
            </a>
            <button className="px-6 py-3.5 border border-gray-300 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Satış Birimiyle Görüş
            </button>
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

      {/* Rakamlar / Güven Alanı - Yeni */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
          <div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">%99.9</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Uptime Süresi</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">7/24</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Kurumsal Destek</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">ISO</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Güvenlik Sertifikası</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1">Sınırsız</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Ölçeklenebilirlik</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
               <div style={{ backgroundColor: accent }} className="w-5 h-5 rounded-sm"></div>
               {data?.productName}
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500">Modern işletmeler için kurumsal standartlarda teknoloji çözümleri.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 text-sm flex justify-between items-center">
          <span>© 2026 {data?.productName} Kurumsal Çözümler.</span>
          <span className="text-gray-600">Powered by Launchify</span>
        </div>
      </footer>
    </div>
  );
}