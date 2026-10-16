"use client";
import React, { useId, useState } from 'react';
import { readableAccentText } from "./presentation";
import ProductOverview from "./ProductOverview";

export default function TemplateCorporate({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#0F172A';
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
    <div style={{ "--product-accent": accent } as React.CSSProperties} className="product-page product-page--corporate min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">

      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
            <div style={{ backgroundColor: accent, color: accentText }} className="w-5 h-5 rounded-md shadow-sm"></div>
            <span className="tracking-tight font-extrabold">{data?.productName || "Launchify"}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#waitlist"
              style={{ backgroundColor: accent, color: accentText }}
              className="px-4 sm:px-5 py-2 text-white text-xs sm:text-sm rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {data?.callToActionText || data?.aiConfig?.callToActionText || "Talep Gönder"}
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <a href="#product-details" className="product-section-link">Ürün bilgileri <span aria-hidden="true">↓</span></a>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 leading-[1.12] mb-6 tracking-tight">
            {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || `${data?.productName || "Ürün"} ile tanışın.`}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
            {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Ürün bilgilerini inceleyin, gelişmelerden haberdar olmak için bekleme listesine katılın."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
            <a
              href="#waitlist"
              style={{ backgroundColor: accent, color: accentText }}
              className="px-7 py-3.5 text-white rounded-lg font-bold text-sm text-center shadow-md hover:opacity-90 transition-opacity"
            >
              {data?.callToActionText || data?.aiConfig?.callToActionText || "Kurumsal Görüşme Talep Et"}
            </a>
            {data?.demoLink && (
              <a
                href={demoUrl}
                target={target} rel="noopener noreferrer"
                className="px-6 py-3.5 border border-slate-300 bg-white text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors text-center"
              >
                Demoyu İncele ↗
              </a>
            )}
          </div>

        </div>

        <div className="lg:col-span-5">
          <ProductOverview features={features} name={data?.productName || "Ürün"} variant="corporate" />
        </div>
      </main>

      <section id="product-details" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mb-3">
            İhtiyacınıza nasıl karşılık veriyor?
          </h2>
          <p className="text-slate-600 text-sm">
            {data?.productName} özelliklerini inceleyin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature: any, index: number) => (
            <div key={index} id={`feature-${index + 1}`} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm mb-5 text-white"
                style={{ backgroundColor: accent, color: accentText }}
              >
                0{index + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="py-20 bg-slate-950 text-white px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">{data?.productName} hakkında haber alın</h2>
          <p className="text-slate-400 text-sm mb-8">
            Ürünle ilgili gelişmelerden haberdar olmak için bekleme listesine katılın.
          </p>

          <div id={statusId} role="status" aria-live="polite" aria-atomic="true" className="product-form-status">
          {status === 'success' && (
            <div className="bg-slate-900 border border-slate-800 text-emerald-400 p-4 rounded-xl text-sm font-semibold animate-in fade-in zoom-in-95">
              Kaydınız alındı. İlginiz için teşekkür ederiz.
            </div>
          )}

          {status === 'duplicate' && (
            <div className="bg-slate-900 border border-amber-500/30 text-amber-300 p-4 rounded-xl text-sm font-semibold animate-in fade-in zoom-in-95">
              Bu e-posta adresi zaten bekleme listesinde kayıtlı.
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-950/50 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-semibold mb-4">
              İletişim sırasında bir hata oluştu. Lütfen tekrar deneyin.
            </div>
          )}

          </div>
          {status !== 'success' && (
            <label htmlFor={emailId} className="product-email-label">E-posta adresiniz</label>
          )}
          {status !== 'success' && (
            <form aria-busy={status === 'loading'} onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto mt-4">
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
                placeholder="ad.soyad@sirketiniz.com"
                className="w-full bg-white text-slate-950 px-4 py-3.5 rounded-lg text-sm outline-none font-medium"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{ backgroundColor: accent, color: accentText }}
                className="w-full sm:w-auto px-6 py-3.5 text-white rounded-lg font-bold text-sm whitespace-nowrap cursor-pointer hover:opacity-90 disabled:opacity-50"
              >
                {status === 'loading' ? 'İletiliyor...' : (data?.callToActionText || data?.aiConfig?.callToActionText || "Bize Ulaşın")}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500">
        © 2026 {data?.productName} Tüm hakları saklıdır.
      </footer>
    </div>
  );
}