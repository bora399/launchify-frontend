"use client";
import React, { useState } from 'react';

export default function TemplateBrutal({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#FDE047'; 
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const features = data?.features || data?.aiConfig?.features || [
    { title: "Gereksiz Süreçleri Yok Et", description: "Karmaşık bürokrasiye ve haftalarca süren onay süreçlerine son verin." },
    { title: "Radikal Şeffaflık", description: "Ne görüyorsanız onu alırsınız. Gizli maliyetler veya gizli şartlar yok." },
    { title: "Yüksek Hızlı Dağıtım", description: "Beklemekten sıkılanlar için sıfır gecikmeli, anında devreye alınan teknoloji." }
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
    <div className="min-h-screen bg-[#FFFDF7] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      <div className="bg-black text-white py-1.5 px-4 text-center text-xs font-black uppercase tracking-widest border-b-4 border-black">
        ★ DIKKAT: KALIPLARI YIKMAK İÇİN ÜRETİLDİ ★ ERKEN ERİŞİM AÇIK ★
      </div>

      <nav className="border-b-4 border-black bg-white px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-xl sm:text-3xl font-black uppercase tracking-tighter">
          {data?.productName || "Launchify"}*
        </div>
        <a 
          href="#waitlist" 
          className="px-4 sm:px-6 py-2.5 font-black uppercase text-xs sm:text-sm border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1 transition-all bg-white"
        >
          Sıraya Gir
        </a>
      </nav>

      <main className="px-4 sm:px-8 md:px-12 py-14 sm:py-24 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="border-2 sm:border-4 border-black px-3 py-1 font-black uppercase text-xs bg-[#FDE047] shadow-[3px_3px_0px_#000]">
            ⚡ SÜRÜM 1.0 BETA
          </span>
          <span className="border-2 sm:border-4 border-black px-3 py-1 font-black uppercase text-xs bg-white shadow-[3px_3px_0px_#000]">
            %100 TAVİZSİZ
          </span>
        </div>

        <h1 className="text-4xl sm:text-7xl md:text-8xl font-black uppercase leading-[1.0] tracking-tighter mb-8 max-w-5xl">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "Kuralları Yıkan Yeni Nesil Çözüm."}
        </h1>

        <p className="text-base sm:text-2xl font-bold max-w-3xl mb-10 border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6 bg-white p-4 shadow-[6px_6px_0px_#000] leading-snug">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Sınırları zorla, kalıpların dışına çık ve potansiyelini serbest bırak."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <a 
            href="#waitlist" 
            style={{ backgroundColor: accent }} 
            className="text-center px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none transition-all"
          >
            {data?.callToActionText || data?.aiConfig?.callToActionText || "Harekete Geç"}
          </a>
          {data?.demoLink && (
            <a 
              href={demoUrl} 
              target={target} 
              className="text-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-xl font-black uppercase border-4 border-black bg-white shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Demoyu Gör ↗
            </a>
          )}
        </div>

        <div className="border-4 border-black bg-white p-6 sm:p-10 shadow-[8px_8px_0px_#000] my-8">
          <h3 className="text-2xl sm:text-4xl font-black uppercase mb-6 border-b-4 border-black pb-3">
            FARK NEDİR?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold text-sm sm:text-base">
            <div className="p-4 sm:p-6 bg-red-100 border-4 border-black">
              <span className="text-red-600 block text-xs uppercase mb-2 font-black">❌ ESKİ & SIKICI YÖNTEM</span>
              <p className="line-through text-gray-700">Haftalarca süren toplantılar, bitmeyen revizeler ve boş vaatler.</p>
            </div>
            <div className="p-4 sm:p-6 bg-green-100 border-4 border-black">
              <span className="text-green-800 block text-xs uppercase mb-2 font-black">✔ {data?.productName?.toUpperCase() || "BİZİM YOLUMUZ"}</span>
              <p className="text-black font-extrabold">Tek tıkla hazır, amaca yönelik, zaman kaybetmeden sonuç üreten teknoloji.</p>
            </div>
          </div>
        </div>
      </main>

      <div className="border-y-4 border-black bg-[#FDE047] py-3.5 overflow-hidden flex whitespace-nowrap font-black uppercase text-base sm:text-xl tracking-wider">
        <div className="animate-[marquee_15s_linear_infinite] flex items-center gap-8">
          <span>✦ {data?.productName}</span> <span>KALIPLARI YIK</span> 
          <span>✦ {data?.productName}</span> <span>GERÇEK DÖNÜŞÜM</span> 
          <span>✦ {data?.productName}</span> <span>KALIPLARI YIK</span> 
          <span>✦ {data?.productName}</span> <span>GERÇEK DÖNÜŞÜM</span> 
        </div>
      </div>

      <section className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black uppercase mb-10 border-b-4 border-black pb-3 inline-block">
          NET FAYDALAR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature: any, idx: number) => (
            <div key={idx} className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
              <div>
                <div 
                  style={{ backgroundColor: accent }} 
                  className="w-12 h-12 border-4 border-black flex items-center justify-center font-black text-xl mb-6 shadow-[3px_3px_0px_#000]"
                >
                  {idx + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase mb-3">{feature.title}</h3>
                <p className="font-bold text-sm sm:text-base leading-relaxed text-gray-800">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="px-4 sm:px-8 py-16 bg-black text-white border-t-4 border-black">
        <div className="max-w-3xl mx-auto border-4 border-white p-6 sm:p-12 shadow-[-8px_8px_0px_#fff] relative">
          <div 
            style={{ backgroundColor: accent }} 
            className="absolute -top-5 -right-3 px-3 py-1 border-2 border-white text-black font-black uppercase text-xs rotate-3"
          >
            KONTENJAN SINIRLI!
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase mb-4">{data?.productName} BEKLEME LİSTESİ</h2>
          <p className="text-sm sm:text-base font-bold mb-8 text-gray-300">
            İlk dalgada erişim kazanmak için e-posta adresini bırak. Sistem açıldığı anda ilk bildirim sana gelecek.
          </p>

          {isSubmitted ? (
            <div className="bg-white text-black border-4 border-white p-4 font-black uppercase text-sm inline-block">
              🚀 LİSTEYE ALINDIN! YAKINDA GÖRÜŞMEK ÜZERE.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİNİZ" 
                className="w-full sm:flex-1 bg-transparent border-4 border-white text-white px-4 py-4 text-sm font-bold uppercase placeholder:text-gray-500 focus:outline-none focus:bg-white/10"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="px-8 py-4 border-4 border-white text-black text-sm font-black uppercase hover:invert transition-all cursor-pointer shadow-[4px_4px_0px_#fff]"
              >
                {data?.callToActionText || data?.aiConfig?.callToActionText || "BİLDİRİM AL"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white text-black border-t-4 border-black px-4 sm:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-black uppercase">{data?.productName || "Launchify"}*</h2>
          <p className="font-black text-xs uppercase">© 2026 Kuralları biz koyarız.</p>
        </div>
      </footer>
    </div>
  );
}