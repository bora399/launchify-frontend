"use client";
import React, { useId, useState } from 'react';
import { readableAccentText } from "./presentation";

export default function TemplateMinimal({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#000000';
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
    <div style={{ "--product-accent": accent } as React.CSSProperties} className="product-page product-page--minimal min-h-screen bg-[#FCFCFA] text-zinc-900 font-serif selection:bg-zinc-200 overflow-x-hidden">

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

      {/* Hero */}
      <main className="max-w-3xl mx-auto px-6 pt-20 sm:pt-32 pb-20 text-center">
        <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-zinc-400 block mb-6">
          {data?.productName || "Ürün"} / Tanıtım
        </span>

        <h1 className="text-3xl sm:text-6xl font-light leading-[1.18] mb-8 text-zinc-950 tracking-tight">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || `${data?.productName || "Ürün"} ile tanışın.`}
        </h1>

        <p className="text-base sm:text-xl text-zinc-500 font-sans font-light leading-relaxed max-w-xl mx-auto mb-12">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Ürünü inceleyin. Gelişmelerden haberdar olmak isterseniz e-posta adresinizi bırakın."}
        </p>

        <a
          href="#waitlist"
          style={{ backgroundColor: accent, color: accentText }}
          className="px-10 py-4 text-white text-xs font-sans tracking-[0.25em] uppercase hover:opacity-85 transition-opacity inline-block shadow-sm"
        >
          {data?.callToActionText || data?.aiConfig?.callToActionText || "Projeyi İncele"}
        </a>
        {data?.demoLink && (
          <a href={demoUrl} target={target} rel="noopener noreferrer" className="product-minimal-demo">Demoyu inceleyin ↗</a>
        )}
      </main>

      <section id="product-details" className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-200/60 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 text-xs tracking-[0.25em] uppercase text-zinc-400 pt-1">
            Özellikler
          </div>
          <div className="md:col-span-8 space-y-12">
            {features.map((feature: any, idx: number) => (
              <div key={idx} id={`feature-${idx + 1}`} className="flex gap-6 items-start">
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

        <div id={statusId} role="status" aria-live="polite" aria-atomic="true" className="product-form-status">
          {status === 'success' && (
          <div className="text-xs font-sans tracking-[0.2em] uppercase text-zinc-600 border-b border-zinc-300 pb-2 inline-block animate-in fade-in">
            İlginiz için teşekkür ederiz. Kaydınız alındı.
          </div>
        )}

        {status === 'duplicate' && (
          <div className="text-xs font-sans tracking-[0.2em] uppercase text-amber-700 border-b border-amber-400 pb-2 inline-block animate-in fade-in">
            Bu e-posta adresi zaten kayıtlı.
          </div>
        )}

        {status === 'error' && (
          <div className="text-xs font-sans tracking-[0.2em] uppercase text-red-600 border-b border-red-300 pb-2 inline-block mb-4">
            Bir sorun oluştu. Lütfen tekrar deneyiniz.
          </div>
        )}

        </div>
        {status !== 'success' && (
          <label htmlFor={emailId} className="product-email-label">E-posta adresiniz</label>
        )}
        {status !== 'success' && (
          <form aria-busy={status === 'loading'} onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 font-sans border-b border-zinc-300 pb-2 mt-4">
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
              placeholder="E-posta adresiniz..."
              className="w-full bg-transparent text-zinc-950 px-2 py-3 focus:outline-none placeholder:text-zinc-400 text-sm font-light"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ backgroundColor: accent, color: accentText }}
              className="product-minimal-submit w-full sm:w-auto text-xs font-semibold transition-opacity py-3 px-5 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? 'Gönderiliyor...' : (data?.callToActionText || data?.aiConfig?.callToActionText || 'Listeye katıl')}
            </button>
          </form>
        )}
      </section>

      <footer className="py-12 text-center text-[10px] font-sans tracking-[0.25em] uppercase text-zinc-400 px-6 border-t border-zinc-200/40">
        {data?.productName} © {new Date().getFullYear()}
      </footer>
    </div>
  );
}