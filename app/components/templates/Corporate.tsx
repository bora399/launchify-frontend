"use client";
import React, { useState } from 'react';

export default function TemplateCorporate({ data }: { data: any }) {
  const accent = data?.accentColor || data?.aiConfig?.accentColor || '#0F172A';
  const demoUrl = data?.demoLink || '#';
  const target = data?.demoLink ? '_blank' : '_self';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const features = data?.features || data?.aiConfig?.features || [
    { title: "Kurumsal Düzeyde Güvenlik", description: "SOC2 Type II, ISO 27001 ve KVKK standartlarında tam veri koruması." },
    { title: "Kesintisiz İş Sürekliliği", description: "%99.99 çalışma garantisi ve çoklu bölge yük dengeleme altyapısı." },
    { title: "Gelişmiş Denetim & Rol Yönetimi", description: "Detaylı erişim logları, SSO (SAML/Okta) entegrasyonu ve hiyerarşik izinler." }
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
            <div style={{ backgroundColor: accent }} className="w-5 h-5 rounded-md shadow-sm"></div>
            <span className="tracking-tight font-extrabold">{data?.productName || "Launchify"}</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="#waitlist" 
              style={{ backgroundColor: accent }} 
              className="px-4 sm:px-5 py-2 text-white text-xs sm:text-sm rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {data?.callToActionText || data?.aiConfig?.callToActionText || "Talep Gönder"}
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase mb-6 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> B2B Kurumsal Çözüm
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 leading-[1.12] mb-6 tracking-tight">
            {data?.aiGeneratedHeroTitle || data?.aiConfig?.aiGeneratedHeroTitle || "İşletmeniz İçin Güvenilir ve Ölçeklenebilir Altyapı."}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
            {data?.aiGeneratedMarketingCopy || data?.aiConfig?.aiGeneratedMarketingCopy || "Kurumsal süreçlerinizi optimize eden, yüksek performanslı ve regülasyonlara tam uyumlu dijital çözümler."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
            <a 
              href="#waitlist" 
              style={{ backgroundColor: accent }} 
              className="px-7 py-3.5 text-white rounded-lg font-bold text-sm text-center shadow-md hover:opacity-90 transition-opacity"
            >
              {data?.callToActionText || data?.aiConfig?.callToActionText || "Kurumsal Görüşme Talep Et"}
            </a>
            {data?.demoLink && (
              <a 
                href={demoUrl} 
                target={target} 
                className="px-6 py-3.5 border border-slate-300 bg-white text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors text-center"
              >
                Dokümantasyonu İncele
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">🔒 256-Bit SSL Şifreleme</span>
            <span className="flex items-center gap-1.5">⚡ %99.99 SLA Garantisi</span>
            <span className="flex items-center gap-1.5">🏛 KVKK & GDPR Uyumlu</span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">KURUMSAL PANEL</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Aktif Durum</span>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Maliyet Optimizasyonu</span>
              <span className="text-2xl font-extrabold text-slate-900">%42 Tasarruf</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">İşlem Hacmi</span>
              <span className="text-2xl font-extrabold text-slate-900">1.2M İstek / Gün</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block mb-1">Otomasyon Oranı</span>
              <span className="text-2xl font-extrabold text-slate-900">%89 Verimlilik</span>
            </div>
          </div>
        </div>
      </main>

      <section className="border-y border-slate-200 bg-white py-10 px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          KÜRESEL İŞ ORTAKLARI VE KURUMSAL STANDARTLARLA ENTEGRE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-60 grayscale font-bold text-slate-600 text-sm">
          <span>MICROSOFT AZURE</span>
          <span>AMAZON AWS</span>
          <span>POSTGRESQL</span>
          <span>DOCKER</span>
          <span>KUBERNETES</span>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mb-3">
            Kurumsal Mimari Yetenekleri
          </h2>
          <p className="text-slate-600 text-sm">
            İşletmenizin ölçeklenirken karşılaşacağı tüm operasyonel riskleri önceden yönetin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature: any, index: number) => (
            <div key={index} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm mb-5 text-white"
                style={{ backgroundColor: accent }}
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
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Kurumsal Pilot Programa Katılın</h2>
          <p className="text-slate-400 text-sm mb-8">
            Şirketiniz için özel konfigürasyon ve erken erişim davetiyesi almak için kurumsal e-postanızı bırakın.
          </p>

          {isSubmitted ? (
            <div className="bg-slate-900 border border-slate-800 text-emerald-400 p-4 rounded-xl text-sm font-semibold">
              Talebiniz kurumsal müşteri temsilcimize iletildi.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                required
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ad.soyad@sirketiniz.com" 
                className="w-full bg-white text-slate-950 px-4 py-3.5 rounded-lg text-sm outline-none font-medium"
              />
              <button 
                type="submit" 
                style={{ backgroundColor: accent }} 
                className="w-full sm:w-auto px-6 py-3.5 text-white rounded-lg font-bold text-sm whitespace-nowrap cursor-pointer hover:opacity-90"
              >
                {data?.callToActionText || data?.aiConfig?.callToActionText || "Bize Ulaşın"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500">
        © 2026 {data?.productName} Kurumsal Çözümler A.Ş. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}