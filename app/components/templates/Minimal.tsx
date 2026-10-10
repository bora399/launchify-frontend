"use client";
import React, { useState } from 'react';

export default function TemplateMinimal({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#000000';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const features = data?.features || data?.aiConfig?.features || [
    { title: "Gereksiz Her Şeyden Arınmış", description: "Yalnızca amacınıza hizmet eden, dikkat dağıtmayan zarif bir kullanıcı deneyimi." },
    { title: "Zamanın Ötesinde Tasarım", description: "Trendlere değil, tipografik dengeye ve beyaz alanın gücüne odaklanan estetik." },
    { title: "Sıfır Fazlalık, Maksimum Hız", description: "Gereksiz betiklerden arındırılmış, hafif ve anında yüklenen altyapı." }
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
    <div className="min-h-screen bg-[#FCFCFA] text-zinc-900 font-serif selection:bg-zinc-200 overflow-x-hidden">
      
      <nav className="px-6 sm:px-12 py-8 flex justify-between items-center max-w-5xl mx-auto border-b border-zinc-200/60">
        <div className="text-base tracking-[0.25em] uppercase font-light">
          {data?.productName || "Launchify"}
        </div>
        <a 
          href="#waitlist" 
          style={{ color: accent }} 
          className="text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:opacity-60 transition-opacity"
        >
          {data?.callToActionText || data?.aiConfig?.callToActionText || "İletişim"}
        </a>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-20 sm:pt-32 pb-20 text-center">
        <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-zinc-400 block mb-6">
          MANİFESTO — 01
        </span>

        <h1 className="text-3xl sm:text-6xl font-light leading-[1.18] mb-8 text-zinc-950 tracking-tight">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "Sadelikteki kusursuz dengeyi keşfedin."}
        </h1>

        <p className="text-base sm:text-xl text-zinc-500 font-sans font-light leading-relaxed max-w-xl mx-auto mb-12">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Gereksiz tüm detaylardan arındırılmış, sadece temel amaca hizmet eden minimalist yaklaşım."}
        </p>

        <a 
          href="#waitlist" 
          style={{ backgroundColor: accent }} 
          className="px-10 py-4 text-white text-xs font-sans tracking-[0.25em] uppercase hover:opacity-85 transition-opacity inline-block shadow-sm"
        >
          {data?.callToActionText || data?.aiConfig?.callToActionText || "Projeyi İncele"}
        </a>
      </main>

      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-200/60 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 text-xs tracking-[0.25em] uppercase text-zinc-400 pt-1">
            TEMEL DEĞERLER
          </div>
          <div className="md:col-span-8 space-y-12">
            {features.map((feature: any, idx: number) => (
              <div key={idx} className="flex gap-6 items-start">
                <span className="text-zinc-300 font-serif text-2xl font-light">0{idx + 1}</span>
                <div>
                  <h3 className="text-xl font-medium mb-2 text-zinc-950 font-serif">{feature.title}</h3>
                  <p className="text-zinc-500 font-light text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="py-24 px-6 max-w-lg mx-auto text-center border-t border-zinc-200/60">
        <h2 className="text-2xl sm:text-3xl font-light mb-3 text-zinc-950">İletişimde Kalın</h2>
        <p className="text-zinc-500 font-sans font-light text-xs sm:text-sm mb-10">
          Sadece {data?.productName} ile ilgili en önemli gelişmelerden haberdar olmak için e-postanızı bırakın.
        </p>

        {isSubmitted ? (
          <div className="text-xs font-sans tracking-[0.2em] uppercase text-zinc-600 border-b border-zinc-300 pb-2 inline-block">
            İlginiz için teşekkür ederiz. Kaydınız alındı.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 font-sans border-b border-zinc-300 pb-2">
            <input 
              type="email" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz..." 
              className="w-full bg-transparent text-zinc-950 px-2 py-3 focus:outline-none placeholder:text-zinc-400 text-sm font-light"
            />
            <button 
              type="submit" 
              style={{ color: accent }} 
              className="w-full sm:w-auto text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity py-2 shrink-0 cursor-pointer"
            >
              Gönder
            </button>
          </form>
        )}
      </section>

      <footer className="py-12 text-center text-[10px] font-sans tracking-[0.25em] uppercase text-zinc-400 px-6 border-t border-zinc-200/40">
        {data?.productName} © 2026 — Sadelik ve Estetik.
      </footer>
    </div>
  );
}