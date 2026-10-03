import React from 'react';

export default function TemplateMinimal({ data }: { data: any }) {
  const accent = data?.accentColor || '#000000';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif selection:bg-gray-200">
      {/* Navbar */}
      <nav className="px-8 md:px-16 py-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl tracking-[0.2em] uppercase font-light">{data?.productName || "Launchify"}</div>
        <div className="flex gap-8 items-center text-xs tracking-widest uppercase text-gray-400 font-sans">
          <a href="#about" className="hover:text-black transition-colors hidden md:block">Manifesto</a>
          <a href={demoUrl} target={target} style={{ color: accent }} className="font-semibold hover:opacity-70 transition-opacity">
            Platformu İncele
          </a>
        </div>
      </nav>

      {/* Hero Alanı */}
      <main className="flex flex-col items-center justify-center pt-20 pb-32 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light leading-[1.2] mb-10 text-gray-900">
          {data?.aiGeneratedHeroTitle || "Sadelikteki kusursuz dengeyi keşfedin."}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mb-16 font-sans font-light">
          {data?.aiGeneratedMarketingCopy || "Gereksiz detaylardan arındırılmış, sadece amaca hizmet eden minimalist ve güçlü bir yaklaşım."}
        </p>
        <a href={demoUrl} target={target} style={{ backgroundColor: accent }} className="px-12 py-5 text-white text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity inline-block font-sans">
          Projeyi Keşfet
        </a>
      </main>

      {/* Detaylar Section - Yeni */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-gray-100 font-sans">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 text-xs tracking-widest uppercase text-gray-400 pt-2">
            Odak Noktamız
          </div>
          <div className="md:col-span-8 space-y-12">
            {[ 
              { title: "Kusursuz Deneyim", text: `${data?.productName} ile kullanıcılarınızı yormadan, tamamen hedefe yönelik bir akış tasarladık.` },
              { title: "Performans", text: "Arka planda çalışan güçlü mimari sayesinde estetik ve hız bir arada." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <span className="text-gray-300 font-light text-2xl">0{idx + 1}</span>
                <div>
                  <h3 className="text-xl font-medium mb-3 text-gray-900 font-serif">{item.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-16 border-t border-gray-100 text-center text-[10px] tracking-widest uppercase text-gray-400 font-sans">
        <p>{data?.productName} © 2026 — Tasarımın Özü.</p>
      </footer>
    </div>
  );
}