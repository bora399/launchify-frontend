"use client";
import React, { useId, useState } from 'react';
import { readableAccentText } from "./presentation";
import ProductOverview from "./ProductOverview";

export default function TemplateBrutal({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#FDE047';
  const accentText = readableAccentText(accent);
  const emailId = useId();
  const statusId = useId();
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const suppliedFeatures = data?.features || data?.aiConfig?.features;
  const features = Array.isArray(suppliedFeatures) ? suppliedFeatures : [];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
      const res = await fetch(`${apiUrl}/api/Waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: data?.id || data?.Id,
          email: email.trim().toLowerCase(),
          honeypot: honeypot
        })
      });

      if (res.status === 409) {
        setStatus('duplicate');
        return;
      }

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
      setStatus('error');
    }
  };

  return (
    <div style={{ "--product-accent": accent } as React.CSSProperties} className="product-page product-page--brutal min-h-screen bg-[#FFFDF7] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">

      <div className="bg-black text-white py-1.5 px-4 text-center text-xs font-black uppercase tracking-widest border-b-4 border-black">
        {data?.productName || "Ürün"} / Tanıyın. İnceleyin. Karar verin.
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
        <a href="#product-details" className="product-section-link">Önce özelliklere bakın <span aria-hidden="true">↓</span></a>

        <h1 className="text-4xl sm:text-7xl md:text-8xl font-black uppercase leading-[1.0] tracking-tighter mb-8 max-w-5xl">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || `${data?.productName || "Ürün"} ile tanışın.`}
        </h1>

        <p className="text-base sm:text-2xl font-bold max-w-3xl mb-10 border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6 bg-white p-4 shadow-[6px_6px_0px_#000] leading-snug">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Özelliklere göz at. İlgini çekiyorsa bekleme listesine katıl."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <a
            href="#waitlist"
            style={{ backgroundColor: accent, color: accentText }}
            className="text-center px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:shadow-none transition-all"
          >
            {data?.callToActionText || data?.aiConfig?.callToActionText || "Harekete Geç"}
          </a>
          {data?.demoLink && (
            <a
              href={demoUrl}
              target={target} rel="noopener noreferrer"
              className="text-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-xl font-black uppercase border-4 border-black bg-white shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              Demoyu Gör ↗
            </a>
          )}
        </div>

        <ProductOverview features={features} name={data?.productName || "Ürün"} variant="brutal" />
      </main>

      <section id="product-details" className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black uppercase mb-10 border-b-4 border-black pb-3 inline-block">
          NET FAYDALAR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature: any, idx: number) => (
            <div key={idx} id={`feature-${idx + 1}`} className="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
              <div>
                <div
                  style={{ backgroundColor: accent, color: accentText }}
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
            style={{ backgroundColor: accent, color: accentText }}
            className="absolute -top-5 -right-3 px-3 py-1 border-2 border-white text-black font-black uppercase text-xs rotate-3"
          >
            HABERDAR OL
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase mb-4">{data?.productName} BEKLEME LİSTESİ</h2>
          <p className="text-sm sm:text-base font-bold mb-8 text-gray-300">
            Üründen haber almak istiyorsan e-postanı bırak. Bekleme listesine kaydolmak için tek adım.
          </p>

          <div id={statusId} role="status" aria-live="polite" aria-atomic="true" className="product-form-status">
          {status === 'success' && (
            <div className="bg-white text-black border-4 border-white p-4 font-black uppercase text-sm inline-block animate-in fade-in zoom-in-95">
              KAYDIN ALINDI. İLGİN İÇİN TEŞEKKÜRLER.
            </div>
          )}

          {status === 'duplicate' && (
            <div className="bg-[#FDE047] text-black border-4 border-black p-4 font-black uppercase text-sm inline-block shadow-[4px_4px_0px_#fff] animate-in fade-in zoom-in-95">
              BU E-POSTA ZATEN LİSTEDE KAYITLI.
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-500 text-white border-4 border-white p-3 font-black uppercase text-xs inline-block mb-4">
              HATA OLUŞTU! TEKRAR DENE.
            </div>
          )}

          </div>
          {status !== 'success' && (
            <label htmlFor={emailId} className="product-email-label">E-posta adresiniz</label>
          )}
          {status !== 'success' && (
            <form aria-busy={status === 'loading'} onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-4">
              {/* Honeypot Input */}
              <input
                type="text"
                name="b_phone_verification"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none', position: 'absolute', left: '-9999px' }}
              />

              <input
                id={emailId}
              name="email"
              autoComplete="email"
              aria-describedby={status === 'idle' ? undefined : statusId}
              type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'duplicate' || status === 'error') setStatus('idle');
                }}
                placeholder="E-POSTA ADRESİNİZ"
                className="w-full sm:flex-1 bg-transparent border-4 border-white text-white px-4 py-4 text-sm font-bold uppercase placeholder:text-gray-500 focus:outline-none focus:bg-white/10"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{ backgroundColor: accent, color: accentText }}
                className="px-8 py-4 border-4 border-white text-black text-sm font-black uppercase hover:invert transition-all cursor-pointer shadow-[4px_4px_0px_#fff] disabled:opacity-50"
              >
                {status === 'loading' ? 'BEKLEYİN...' : (data?.callToActionText || data?.aiConfig?.callToActionText || "BİLDİRİM AL")}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white text-black border-t-4 border-black px-4 sm:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-black uppercase">{data?.productName || "Launchify"}*</h2>
          <p className="font-black text-xs uppercase">© {new Date().getFullYear()} {data?.productName}</p>
        </div>
      </footer>
    </div>
  );
}