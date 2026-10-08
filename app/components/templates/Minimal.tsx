"use client";
import React, { useState } from 'react';

export default function TemplateMinimal({ data }: { data: any }) {
  const accent = data?.accentColor || '#000000';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
        const res = await fetch(`${apiUrl}/api/Waitlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageId: data.id, // SlugPage'den gönderdiğimiz proje ID'si
            email: email
          })
        });

        if (res.ok) {
          setIsSubmitted(true);
          setEmail('');
        } else {
          console.error("Sunucu hatası: E-posta kaydedilemedi.");
        }
      } catch (error) {
        console.error("Bağlantı hatası:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif selection:bg-gray-200">
      <nav className="px-8 md:px-16 py-10 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl tracking-[0.2em] uppercase font-light">{data?.productName || "Launchify"}</div>
        <div className="flex gap-8 items-center text-xs tracking-widest uppercase text-gray-400 font-sans">
          <a href="#features" className="hover:text-black transition-colors hidden md:block">Manifesto</a>
          <a href="#waitlist" style={{ color: accent }} className="font-semibold hover:opacity-70 transition-opacity">
            {data?.callToActionText || "İletişim"}
          </a>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center pt-20 pb-32 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-light leading-[1.2] mb-10 text-gray-900">
          {data?.aiGeneratedHeroTitle || "Sadelikteki kusursuz dengeyi keşfedin."}
        </h1>
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-2xl mb-16 font-sans font-light">
          {data?.aiGeneratedMarketingCopy || "Gereksiz detaylardan arındırılmış, sadece amaca hizmet eden minimalist ve güçlü bir yaklaşım."}
        </p>
        <a href="#waitlist" style={{ backgroundColor: accent }} className="px-12 py-5 text-white text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity inline-block font-sans">
          {data?.callToActionText || "Projeyi Keşfet"}
        </a>
      </main>

      {data?.features && data.features.length > 0 && (
        <section id="features" className="max-w-5xl mx-auto px-6 py-24 border-t border-gray-100 font-sans">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4 text-xs tracking-widest uppercase text-gray-400 pt-2">
              Odak Noktamız
            </div>
            <div className="md:col-span-8 space-y-16">
              {data.features.map((feature: any, idx: number) => (
                <div key={idx} className="flex gap-8 items-start">
                  <span className="text-gray-300 font-light text-2xl">0{idx + 1}</span>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-gray-900 font-serif">{feature.title}</h3>
                    <p className="text-gray-500 font-light leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="waitlist" className="py-32 px-6 max-w-3xl mx-auto text-center border-t border-gray-100">
        <h2 className="text-3xl font-light mb-6">Bizimle İletişimde Kalın</h2>
        <p className="text-gray-500 font-sans font-light mb-12">
          Gereksiz e-postalara veda edin. Sadece {data?.productName} ile ilgili en önemli güncellemeleri almak için adresinizi bırakın.
        </p>
        
        {isSubmitted ? (
          <div className="text-sm tracking-widest uppercase text-gray-500 font-sans border-b border-gray-200 pb-2 inline-block">
            İlginiz için teşekkürler. Kaydınız alındı.
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto relative group font-sans">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz..." 
              className="w-full bg-transparent border-b border-gray-300 text-gray-900 px-0 py-4 focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 placeholder:font-light"
            />
            <button 
              type="submit" 
              style={{ color: accent }} 
              className="absolute right-0 top-4 text-xs font-semibold uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              Gönder
            </button>
          </form>
        )}
      </section>

      <footer className="mt-10 py-16 text-center text-[10px] tracking-widest uppercase text-gray-400 font-sans">
        <p>{data?.productName} © 2026 — Tasarımın Özü.</p>
      </footer>
    </div>
  );
}