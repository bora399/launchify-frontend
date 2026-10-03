import React from 'react';

export default function TemplateBrutal({ data }: { data: any }) {
  const accent = data?.AccentColor || '#FDE047'; 

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-black selection:text-white">
      <nav className="border-b-4 border-black bg-white px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-black uppercase tracking-tighter">Launchify*</div>
        <button className="px-6 py-2 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all bg-white">
          Sisteme Gir
        </button>
      </nav>

      <main className="px-8 py-24 md:py-32 flex flex-col items-start max-w-6xl mx-auto">
        <div className="inline-block border-2 border-black px-4 py-1 mb-6 font-bold uppercase bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          Kalıpları Yık 🚀
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase leading-[1.1] tracking-tighter mb-8 max-w-5xl">
          {data?.AiGeneratedHeroTitle || "Kuralları Yıkan Yeni Nesil Çözüm."}
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-3xl mb-12 border-l-4 border-black pl-6">
          {data?.AiGeneratedMarketingCopy || "Sınırları zorla, kalıpların dışına çık ve potansiyelini serbest bırak. Sıradanlığa yer yok."}
        </p>
        <button
          style={{ backgroundColor: accent }}
          className="px-10 py-5 text-xl font-black uppercase border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all"
        >
          Harekete Geç
        </button>
      </main>

      <footer className="border-t-4 border-black bg-black text-white px-8 py-16 mt-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Launchify*</h2>
          <p className="font-bold text-xl uppercase text-gray-400">© 2026 Kuralları biz koyarız.</p>
        </div>
      </footer>
    </div>
  );
}