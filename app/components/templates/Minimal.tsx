import React from 'react';

export default function TemplateMinimal({ data }: { data: any }) {
  const accent = data?.AccentColor || '#000000';

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif">
      <nav className="px-10 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-lg tracking-widest uppercase font-light">Launchify</div>
        <div className="space-x-8 text-xs tracking-widest uppercase text-gray-400">
          <a href="#" className="hover:text-black transition-colors">Manifesto</a>
          <a href="#" className="hover:text-black transition-colors">İletişim</a>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8 text-gray-900">
          {data?.AiGeneratedHeroTitle || "Sadelikteki kusursuz dengeyi keşfedin."}
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mb-14 font-sans font-light">
          {data?.AiGeneratedMarketingCopy || "Gereksiz detaylardan arındırılmış, sadece amaca hizmet eden minimalist ve güçlü bir yaklaşım."}
        </p>
        <button
          style={{ backgroundColor: accent }}
          className="px-12 py-4 text-white text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
        >
          Projeyi Keşfet
        </button>
      </main>

      <footer className="mt-32 py-12 border-t border-gray-100 text-center text-[10px] tracking-widest uppercase text-gray-400 font-sans">
        <p>Launchify © 2026 — Tasarımın Özü.</p>
      </footer>
    </div>
  );
}