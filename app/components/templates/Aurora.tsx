"use client";
import React, { useId, useState } from 'react';
import { readableAccentText } from "./presentation";
import ProductOverview from "./ProductOverview";

export default function TemplateAurora({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#6366F1';
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
    <div style={{ "--product-accent": accent } as React.CSSProperties} className="product-page product-page--aurora min-h-screen bg-[#030303] text-white overflow-x-hidden relative font-sans selection:bg-[#6366F1]/40 selection:text-white">
      {/* Mesh Glow Işıkları */}
      <div
        className="fixed top-[-15%] left-[-10%] w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full blur-[140px] pointer-events-none opacity-30"
        style={{ backgroundColor: accent, color: accentText }}
      ></div>
      <div className="fixed bottom-[-15%] right-[-10%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-purple-600/20 blur-[150px] pointer-events-none"></div>

      {/* Grid Dokusu */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      ></div>

      <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-base sm:text-xl font-bold tracking-tight flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded-lg shrink-0 shadow-lg"
              style={{ backgroundColor: accent, boxShadow: `0 0 20px ${accent}80` }}
            ></div>
            <span className="font-extrabold tracking-wider">{data?.productName || "Launchify"}</span>
          </div>

          <div className="flex items-center gap-3">
            {data?.demoLink && (
              <a
                href={demoUrl}
                target={target} rel="noopener noreferrer"
                className="hidden sm:inline-flex text-xs font-semibold text-white/60 hover:text-white px-4 py-2 transition-colors"
              >
                Canlı Demo ↗
              </a>
            )}
            <a
              href="#waitlist"
              className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border border-white/10 hover:border-white/20 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              Erken Erişim
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-16 sm:pt-28 pb-16 text-center">
        <a href="#product-details" className="product-section-link">Ürünü yakından tanıyın <span aria-hidden="true">↓</span></a>

        <h1 className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.12] text-white max-w-4xl mx-auto">
          {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || `${data?.productName || "Ürün"} ile tanışın.`}
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Ürünü inceleyin ve gelişmelerden haberdar olmak için bekleme listesine katılın."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-16">
          <a
            href="#waitlist"
            style={{ backgroundColor: accent, color: accentText }}
            className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-white hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all text-sm sm:text-base text-center"
          >
            {data?.callToActionText || data?.aiConfig?.callToActionText || "Erken Erişime Katıl"}
          </a>
          {data?.demoLink && (
            <a
              href={demoUrl}
              target={target} rel="noopener noreferrer" className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-semibold text-white/80 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white transition-all text-sm text-center flex items-center justify-center gap-2"
            >
              Canlı Önizleme <span className="text-white/40">→</span>
            </a>
          )}
        </div>

        <ProductOverview features={features} name={data?.productName || "Ürün"} variant="aurora" />
      </main>

      <section id="product-details" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6366F1] mb-2 block">ÖZELLİKLER</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Neden {data?.productName}?
          </h2>
          <p className="text-white/50 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
            Ürünün sunduklarını inceleyin, sizin için uygun olup olmadığına karar verin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f: any, idx: number) => (
            <div
              key={idx}
              id={`feature-${idx + 1}`}
              className={`p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between group ${
                idx === 0 && features.length > 3 ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 font-mono font-bold text-lg group-hover:scale-105 transition-transform"
                  style={{ color: accent }}
                >
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                <span>{String(idx + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}</span>
                <a href="#waitlist" className="text-white/80 hover:text-white">Listeye katılın →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="py-20 relative z-10 px-4">
        <div className="max-w-3xl mx-auto relative">
          <div
            className="absolute inset-0 blur-3xl opacity-20 rounded-[3rem] pointer-events-none"
            style={{ backgroundColor: accent, color: accentText }}
          ></div>

          <div className="relative bg-[#0A0A0A] border border-white/10 p-8 sm:p-14 rounded-3xl backdrop-blur-2xl text-center shadow-2xl overflow-hidden">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4 inline-block">
              Bekleme listesi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white">
              {data?.productName} ile ilgileniyor musunuz?
            </h2>
            <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto mb-8">
              Gelişmelerden haberdar olmak için e-posta adresinizi bırakın.
            </p>

            <div id={statusId} role="status" aria-live="polite" aria-atomic="true" className="product-form-status">
          {status === 'success' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 animate-in fade-in zoom-in-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Kaydınız alındı. İlginiz için teşekkür ederiz.
              </div>
            )}

            {status === 'duplicate' && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 p-4 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 animate-in fade-in zoom-in-95">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Bu e-posta adresi zaten bekleme listesinde kayıtlı.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 mb-4">
                Bir sorun oluştu. Lütfen tekrar deneyin.
              </div>
            )}

            </div>
          {status !== 'success' && (
            <label htmlFor={emailId} className="product-email-label">E-posta adresiniz</label>
          )}
          {status !== 'success' && (
              <form aria-busy={status === 'loading'} onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mt-2">
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
                  placeholder="İş e-posta adresinizi girin..."
                  className="w-full bg-white/[0.04] border border-white/15 text-white px-4 py-3.5 rounded-xl text-sm outline-none focus:border-white/40 placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{ backgroundColor: accent, color: accentText }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 active:scale-95 transition-all whitespace-nowrap cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {status === 'loading' ? 'Kaydediliyor...' : (data?.callToActionText || data?.aiConfig?.callToActionText || "Kayıt Ol")}
                </button>
              </form>
            )}

            <p className="text-white/30 text-[11px] mt-4">Bu form yalnızca bekleme listesine kayıt oluşturur.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-10 text-center text-xs text-white/40 relative z-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent, color: accentText }}></div>
            {data?.productName}
          </div>
          <p>© 2026 {data?.productName}. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  );
}