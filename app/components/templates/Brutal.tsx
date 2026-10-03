import React from 'react';

export default function TemplateBrutal({ data }: { data: any }) {
  const accent = data?.accentColor || '#FDE047'; 
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b-4 border-black bg-white px-6 md:px-12 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-black uppercase tracking-tighter">{data?.productName || "Launchify"}*</div>
        <a href={demoUrl} target={target} className="px-6 py-2.5 font-bold uppercase border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all bg-white inline-block">
          Sisteme Gir
        </a>
      </nav>

      {/* Hero Alanı */}
      <main className="px-6 md:px-12 py-20 md:py-32 flex flex-col items-start max-w-7xl mx-auto">
        <div className="inline-block border-2 border-black px-4 py-1 mb-6 font-bold uppercase bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          Kalıpları Yık 🚀
        </div>
        <h1 className="text-5xl md:text-8xl font-black uppercase leading-[1.05] tracking-tighter mb-8 max-w-5xl">
          {data?.aiGeneratedHeroTitle || "Kuralları Yıkan Yeni Nesil Çözüm."}
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-3xl mb-12 border-l-8 border-black pl-6 bg-white p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          {data?.aiGeneratedMarketingCopy || "Sınırları zorla, kalıpların dışına çık ve potansiyelini serbest bırak."}
        </p>
        <a href={demoUrl} target={target} style={{ backgroundColor: accent }} className="px-10 py-5 text-xl font-black uppercase border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all inline-block">
          Harekete Geç
        </a>
      </main>

      {/* Kayan Yazı (Marquee) Efekti - Yeni */}
      <div className="border-y-4 border-black overflow-hidden flex whitespace-nowrap bg-black text-white py-4 font-black uppercase text-2xl tracking-widest">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center gap-10">
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
          <span>{data?.productName}</span> <span>✦</span> <span>GÜCÜ HİSSET</span> <span>✦</span>
        </div>
      </div>

      {/* Bilgi Grid - Yeni */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="border-4 border-black bg-white p-10 shadow-[12px_12px_0px_rgba(0,0,0,1)]">
          <h2 className="text-4xl font-black uppercase mb-4">Neden Biz?</h2>
          <p className="font-medium text-lg">Çünkü sıradanlık sıkıcıdır. {data?.productName} ile iş akışlarınızı baştan tanımlayın, tabuları yıkın.</p>
        </div>
        <div style={{ backgroundColor: accent }} className="border-4 border-black p-10 shadow-[12px_12px_0px_rgba(0,0,0,1)] flex items-center justify-center text-center">
          <h2 className="text-4xl font-black uppercase">YENİ NESİL<br/>MİMARİ</h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white px-6 md:px-12 py-16 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-5xl font-black uppercase tracking-tighter">{data?.productName || "Launchify"}*</h2>
          <p className="font-bold text-lg uppercase text-gray-400">© 2026 Kuralları biz koyarız.</p>
        </div>
      </footer>
    </div>
  );
}