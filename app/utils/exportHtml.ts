export function exportProjectAsHtml(project: any) {
  const ai = project?.aiConfig || project?.AiConfig || {};
  const name = project?.productName || project?.ProductName || "Platform";
  const title = ai.aiGeneratedHeroTitle || project?.aiGeneratedHeroTitle || "Vizyonunuzu Hayata Geçirin.";
  const copy = ai.aiGeneratedMarketingCopy || project?.aiGeneratedMarketingCopy || "Yeni nesil B2B altyapı çözümü.";
  const accent = ai.accentColor || project?.accentColor || "#6366F1";
  const cta = ai.callToActionText || project?.callToActionText || "Hemen Başla";
  const demoLink = project?.demoLink || project?.DemoLink || "";
  const slug = project?.slug || "landing-page";
  const templateType = (project?.templateType || project?.TemplateType || "aurora").toLowerCase();

  const features = (ai.features || project?.features || [
    { title: "Yapay Zeka Mimarisi", description: "Hızlı, ölçeklenebilir ve modern altyapı." },
    { title: "Yüksek Performans", description: "Maksimum dönüşüm ve kurumsal güven." },
    { title: "Kolay Entegrasyon", description: "Saniyeler içinde devreye alın." }
  ]);

  let templateHtml = "";
  let bodyBg = "#030303";
  let bodyText = "#ffffff";
  let fontClasses = "font-sans";

  // ==========================================
  // 1. AURORA ŞABLONU (DARK & MESH GRADIENTS)
  // ==========================================
  if (templateType === "aurora") {
    bodyBg = "#030303";
    bodyText = "#ffffff";
    templateHtml = `
  <!-- Mesh Glow Işıkları -->
  <div style="position: fixed; top: -15%; left: -10%; width: 650px; height: 650px; border-radius: 9999px; background: ${accent}; filter: blur(140px); pointer-events: none; opacity: 0.3; z-index: 0;"></div>
  <div style="position: fixed; bottom: -15%; right: -10%; width: 550px; height: 550px; border-radius: 9999px; background: rgba(147, 51, 234, 0.2); filter: blur(150px); pointer-events: none; z-index: 0;"></div>

  <!-- Navbar -->
  <header class="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-8 py-4">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="text-base sm:text-xl font-bold tracking-tight flex items-center gap-2.5">
        <div class="w-5 h-5 rounded-lg shrink-0 shadow-lg" style="background-color: ${accent}; box-shadow: 0 0 20px ${accent}80;"></div>
        <span class="font-extrabold tracking-wider text-white">${name}</span>
      </div>
      <div class="flex items-center gap-3">
        ${demoLink ? `<a href="${demoLink}" target="_blank" class="hidden sm:inline-flex text-xs font-semibold text-white/60 hover:text-white px-4 py-2 transition-colors">Canlı Demo ↗</a>` : ''}
        <a href="#waitlist" class="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border border-white/10 hover:border-white/20" style="background: rgba(255,255,255,0.06);">
          Erken Erişim
        </a>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <main class="relative z-10 max-w-5xl mx-auto px-4 pt-16 sm:pt-28 pb-16 text-center">
    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] sm:text-xs font-medium text-white/80 mb-6 backdrop-blur-md">
      <span class="w-2 h-2 rounded-full animate-ping" style="background-color: ${accent}"></span>
      <span>Gelecek Nesil Bulut Mimarisi</span>
      <span class="text-white/30">•</span>
      <span class="text-emerald-400 font-semibold">Aktif Beta</span>
    </div>

    <h1 class="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.12] bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40 max-w-4xl mx-auto">
      ${title}
    </h1>

    <p class="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
      ${copy}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-16">
      <a href="#waitlist" style="background-color: ${accent}; box-shadow: 0 0 35px ${accent}50;" class="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-white hover:opacity-95 transition-all text-sm sm:text-base text-center">
        ${cta}
      </a>
      ${demoLink ? `
      <a href="${demoLink}" target="_blank" class="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-semibold text-white/80 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white transition-all text-sm text-center flex items-center justify-center gap-2">
        Canlı Önizleme <span class="text-white/40">→</span>
      </a>` : ''}
    </div>

    <!-- Canlı Mockup -->
    <div class="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0B0B]/90 backdrop-blur-2xl p-3 sm:p-5 shadow-2xl overflow-hidden text-left max-w-4xl mx-auto">
      <div class="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/5 mb-4">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
          <span class="ml-3 text-[11px] text-white/40 font-mono hidden sm:inline">${name.toLowerCase()}.cluster/v1</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-[11px] font-mono text-emerald-400">Canlı Sistem</span>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
        <div class="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <span class="text-white/40 block mb-1">METRİK / VERİ</span>
          <span class="text-lg font-bold text-white">4.82 Milyon</span>
          <span class="text-emerald-400 text-[10px] block mt-1">↑ %28.4 haftalık artış</span>
        </div>
        <div class="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <span class="text-white/40 block mb-1">GECİKME ORANI</span>
          <span class="text-lg font-bold text-white">18.2 ms</span>
          <span class="text-white/50 text-[10px] block mt-1">Global Edge Cluster</span>
        </div>
        <div class="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <span class="text-white/40 block mb-1">GÜVENİLİRLİK</span>
          <span class="text-lg font-bold text-emerald-400">%99.99 SLA</span>
          <span class="text-white/50 text-[10px] block mt-1">Sıfır Kesinti</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Bento Grid Özellikler -->
  <section class="max-w-6xl mx-auto px-4 sm:px-6 py-20 relative z-10">
    <div class="text-center mb-14">
      <span class="text-xs font-bold uppercase tracking-widest text-[#6366F1] mb-2 block">MİMARİ & AVANTAJLAR</span>
      <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">Neden ${name}?</h2>
      <p class="text-white/50 text-xs sm:text-sm mt-2 max-w-lg mx-auto">Geleneksel çözümlerin karmaşıklığından kurtulun. Hız, güvenlik ve ölçeklenebilirlik tek çatı altında.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      ${features.map((f: any, idx: number) => `
      <div class="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl flex flex-col justify-between ${idx === 0 ? "md:col-span-2" : "md:col-span-1"}">
        <div>
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 font-mono font-bold text-lg" style="color: ${accent}">
            0${idx + 1}
          </div>
          <h3 class="text-xl font-bold mb-2 text-white">${f.title}</h3>
          <p class="text-white/50 text-sm leading-relaxed">${f.description}</p>
        </div>
        <div class="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
          <span>Otomatik Optimize Edildi</span>
          <span class="text-white/70">Daha Fazla Bilgi →</span>
        </div>
      </div>`).join('')}
    </div>
  </section>

  <!-- Waitlist -->
  <section id="waitlist" class="py-20 relative z-10 px-4">
    <div class="max-w-3xl mx-auto relative">
      <div style="position: absolute; inset: 0; background-color: ${accent}; filter: blur(60px); opacity: 0.2; border-radius: 3rem; pointer-events: none;"></div>
      <div class="relative bg-[#0A0A0A] border border-white/10 p-8 sm:p-14 rounded-3xl text-center shadow-2xl overflow-hidden">
        <span class="text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-4 inline-block">
          Sınırlı Erken Erişim
        </span>
        <h2 class="text-2xl sm:text-4xl font-extrabold mb-3 text-white">${name} Dünyasına İlk Adımı Atın</h2>
        <p class="text-white/50 text-xs sm:text-sm max-w-md mx-auto mb-8">
          Erken erişim kontenjanımız sınırlıdır. Sisteme ilk girenlerden olmak için e-postanızı bırakın.
        </p>
        <form onsubmit="event.preventDefault(); alert('Talebiniz başarıyla kaydedildi!'); this.reset();" class="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
          <input type="email" required placeholder="İş e-posta adresinizi girin..." class="w-full bg-white/[0.04] border border-white/15 text-white px-4 py-3.5 rounded-xl text-sm outline-none focus:border-white/40 placeholder:text-white/30">
          <button type="submit" style="background-color: ${accent}" class="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all whitespace-nowrap cursor-pointer shadow-lg">
            ${cta}
          </button>
        </form>
        <p class="text-white/30 text-[11px] mt-4">Kredi kartı gerekmez. Sıfır spam garantisi.</p>
      </div>
    </div>
  </section>`;
  } 

  // ==========================================
  // 2. BRUTAL ŞABLONU (RETRO, HARD BORDERS & YELLOW)
  // ==========================================
  else if (templateType === "brutal") {
    bodyBg = "#FFFDF7";
    bodyText = "#000000";
    templateHtml = `
  <!-- Top Ticker -->
  <div class="bg-black text-white py-1.5 px-4 text-center text-xs font-black uppercase tracking-widest border-b-4 border-black">
    ★ DIKKAT: KALIPLARI YIKMAK İÇİN ÜRETİLDİ ★ ERKEN ERİŞİM AÇIK ★
  </div>

  <!-- Navbar -->
  <nav class="border-b-4 border-black bg-white px-4 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
    <div class="text-xl sm:text-3xl font-black uppercase tracking-tighter text-black">
      ${name}*
    </div>
    <a href="#waitlist" class="px-4 sm:px-6 py-2.5 font-black uppercase text-xs sm:text-sm border-2 sm:border-4 border-black shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-white text-black">
      Sıraya Gir
    </a>
  </nav>

  <!-- Hero -->
  <main class="px-4 sm:px-8 md:px-12 py-14 sm:py-24 max-w-6xl mx-auto">
    <div class="flex flex-wrap gap-2 mb-6">
      <span class="border-2 sm:border-4 border-black px-3 py-1 font-black uppercase text-xs bg-[#FDE047] text-black shadow-[3px_3px_0px_#000]">
        ⚡ SÜRÜM 1.0 BETA
      </span>
      <span class="border-2 sm:border-4 border-black px-3 py-1 font-black uppercase text-xs bg-white text-black shadow-[3px_3px_0px_#000]">
        %100 TAVİZSİZ
      </span>
    </div>

    <h1 class="text-4xl sm:text-7xl md:text-8xl font-black uppercase leading-[1.0] tracking-tighter mb-8 max-w-5xl text-black">
      ${title}
    </h1>

    <div class="border-l-4 sm:border-l-8 border-black pl-4 sm:pl-6 bg-white p-4 shadow-[6px_6px_0px_#000] mb-10 max-w-3xl">
      <p class="text-base sm:text-2xl font-bold text-black leading-snug">
        ${copy}
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
      <a href="#waitlist" style="background-color: ${accent}" class="text-center px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-xl font-black uppercase border-4 border-black text-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
        ${cta}
      </a>
      ${demoLink ? `
      <a href="${demoLink}" target="_blank" class="text-center px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-xl font-black uppercase border-4 border-black bg-white text-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
        Demoyu Gör ↗
      </a>` : ''}
    </div>

    <!-- Karşılaştırma Tablosu (FARK NEDİR?) -->
    <div class="border-4 border-black bg-white p-6 sm:p-10 shadow-[8px_8px_0px_#000] my-8">
      <h3 class="text-2xl sm:text-4xl font-black uppercase mb-6 border-b-4 border-black pb-3 text-black">
        FARK NEDİR?
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold text-sm sm:text-base">
        <div class="p-4 sm:p-6 bg-red-100 border-4 border-black text-black">
          <span class="text-red-600 block text-xs uppercase mb-2 font-black">❌ ESKİ & SIKICI YÖNTEM</span>
          <p class="line-through text-gray-700">Haftalarca süren toplantılar, bitmeyen revizeler ve boş vaatler.</p>
        </div>
        <div class="p-4 sm:p-6 bg-green-100 border-4 border-black text-black">
          <span class="text-green-800 block text-xs uppercase mb-2 font-black">✔ ${name.toUpperCase()} YOLU</span>
          <p class="text-black font-extrabold">Tek tıkla hazır, amaca yönelik, zaman kaybetmeden sonuç üreten teknoloji.</p>
        </div>
      </div>
    </div>
  </main>

  <!-- Marquee Bandı -->
  <div class="border-y-4 border-black bg-[#FDE047] py-3.5 overflow-hidden flex whitespace-nowrap font-black uppercase text-base sm:text-xl tracking-wider text-black">
    <div class="animate-marquee flex items-center gap-8">
      <span>✦ ${name}</span> <span>KALIPLARI YIK</span> 
      <span>✦ ${name}</span> <span>GERÇEK DÖNÜŞÜM</span> 
      <span>✦ ${name}</span> <span>KALIPLARI YIK</span> 
      <span>✦ ${name}</span> <span>GERÇEK DÖNÜŞÜM</span> 
      <span>✦ ${name}</span> <span>KALIPLARI YIK</span> 
      <span>✦ ${name}</span> <span>GERÇEK DÖNÜŞÜM</span> 
    </div>
  </div>

  <!-- Features -->
  <section class="px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
    <h2 class="text-3xl sm:text-5xl font-black uppercase mb-10 border-b-4 border-black pb-3 inline-block text-black">
      NET FAYDALAR
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${features.map((feature: any, idx: number) => `
      <div class="border-4 border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
        <div>
          <div style="background-color: ${accent}" class="w-12 h-12 border-4 border-black flex items-center justify-center font-black text-xl mb-6 shadow-[3px_3px_0px_#000] text-black">
            ${idx + 1}
          </div>
          <h3 class="text-xl sm:text-2xl font-black uppercase mb-3 text-black">${feature.title}</h3>
          <p class="font-bold text-sm sm:text-base leading-relaxed text-gray-800">${feature.description}</p>
        </div>
      </div>`).join('')}
    </div>
  </section>

  <!-- Waitlist -->
  <section id="waitlist" class="px-4 sm:px-8 py-16 bg-black text-white border-t-4 border-black">
    <div class="max-w-3xl mx-auto border-4 border-white p-6 sm:p-12 shadow-[-8px_8px_0px_#fff] relative">
      <div style="background-color: ${accent}" class="absolute -top-5 -right-3 px-3 py-1 border-2 border-white text-black font-black uppercase text-xs rotate-3">
        KONTENJAN SINIRLI!
      </div>
      <h2 class="text-3xl sm:text-5xl font-black uppercase mb-4 text-white">${name} BEKLEME LİSTESİ</h2>
      <p class="text-sm sm:text-base font-bold mb-8 text-gray-300">
        İlk dalgada erişim kazanmak için e-posta adresini bırak. Sistem açıldığı anda ilk bildirim sana gelecek.
      </p>
      <form onsubmit="event.preventDefault(); alert('LİSTEYE ALINDINIZ!'); this.reset();" class="flex flex-col sm:flex-row gap-3">
        <input type="email" required placeholder="E-POSTA ADRESİNİZ" class="w-full sm:flex-1 bg-transparent border-4 border-white text-white px-4 py-4 text-sm font-bold uppercase placeholder:text-gray-500 focus:outline-none focus:bg-white/10">
        <button type="submit" style="background-color: ${accent}" class="px-8 py-4 border-4 border-white text-black text-sm font-black uppercase hover:invert transition-all cursor-pointer shadow-[4px_4px_0px_#fff]">
          ${cta}
        </button>
      </form>
    </div>
  </section>`;
  }

  // ==========================================
  // 3. CORPORATE ŞABLONU (CLEAN SLATE & SAAS METRICS)
  // ==========================================
  else if (templateType === "corporate") {
    bodyBg = "#F8FAFC";
    bodyText = "#1e293b";
    templateHtml = `
  <!-- Navbar -->
  <nav class="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="text-xl font-bold text-slate-950 flex items-center gap-2.5">
        <div style="background-color: ${accent}" class="w-5 h-5 rounded-md shadow-sm"></div>
        <span class="tracking-tight font-extrabold">${name}</span>
      </div>
      <div class="flex items-center gap-3">
        <a href="#waitlist" style="background-color: ${accent}" class="px-4 sm:px-5 py-2 text-white text-xs sm:text-sm rounded-lg font-semibold hover:opacity-90 transition-opacity">
          ${cta}
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <main class="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    <div class="lg:col-span-7">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase mb-6 border border-slate-200">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span> B2B Kurumsal Çözüm
      </div>

      <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 leading-[1.12] mb-6 tracking-tight">
        ${title}
      </h1>

      <p class="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
        ${copy}
      </p>

      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-10">
        <a href="#waitlist" style="background-color: ${accent}" class="px-7 py-3.5 text-white rounded-lg font-bold text-sm text-center shadow-md hover:opacity-90 transition-opacity">
          ${cta}
        </a>
        ${demoLink ? `
        <a href="${demoLink}" target="_blank" class="px-6 py-3.5 border border-slate-300 bg-white text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors text-center">
          Dokümantasyonu İncele
        </a>` : ''}
      </div>

      <div class="flex flex-wrap gap-6 pt-6 border-t border-slate-200 text-xs text-slate-500 font-medium">
        <span class="flex items-center gap-1.5">🔒 256-Bit SSL Şifreleme</span>
        <span class="flex items-center gap-1.5">⚡ %99.99 SLA Garantisi</span>
        <span class="flex items-center gap-1.5">🏛 KVKK & GDPR Uyumlu</span>
      </div>
    </div>

    <!-- Dashboard Mockup -->
    <div class="lg:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-xl p-6 relative overflow-hidden">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">KURUMSAL PANEL</span>
        <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Aktif Durum</span>
      </div>
      <div class="space-y-4">
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <span class="text-xs text-slate-500 block mb-1">Maliyet Optimizasyonu</span>
          <span class="text-2xl font-extrabold text-slate-900">%42 Tasarruf</span>
        </div>
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <span class="text-xs text-slate-500 block mb-1">İşlem Hacmi</span>
          <span class="text-2xl font-extrabold text-slate-900">1.2M İstek / Gün</span>
        </div>
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <span class="text-xs text-slate-500 block mb-1">Otomasyon Oranı</span>
          <span class="text-2xl font-extrabold text-slate-900">%89 Verimlilik</span>
        </div>
      </div>
    </div>
  </main>

  <!-- Logo Bulutu -->
  <section class="border-y border-slate-200 bg-white py-10 px-4 text-center">
    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">KÜRESEL İŞ ORTAKLARI İLE ENTEGRE</p>
    <div class="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-60 grayscale font-bold text-slate-600 text-sm">
      <span>MICROSOFT AZURE</span>
      <span>AMAZON AWS</span>
      <span>POSTGRESQL</span>
      <span>DOCKER</span>
      <span>KUBERNETES</span>
    </div>
  </section>

  <!-- Features -->
  <section class="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
    <div class="text-center mb-14 max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-950 mb-3">Kurumsal Mimari Yetenekleri</h2>
      <p class="text-slate-600 text-sm">İşletmenizin ölçeklenirken karşılaşacağı tüm operasyonel riskleri önceden yönetin.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${features.map((feature: any, index: number) => `
      <div class="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm mb-5 text-white" style="background-color: ${accent}">
          0${index + 1}
        </div>
        <h3 class="text-lg font-bold text-slate-950 mb-2">${feature.title}</h3>
        <p class="text-slate-600 text-sm leading-relaxed">${feature.description}</p>
      </div>`).join('')}
    </div>
  </section>

  <!-- Waitlist -->
  <section id="waitlist" class="py-20 bg-slate-950 text-white px-4">
    <div class="max-w-2xl mx-auto text-center">
      <h2 class="text-3xl sm:text-4xl font-extrabold mb-3">Kurumsal Pilot Programa Katılın</h2>
      <p class="text-slate-400 text-sm mb-8">Şirketiniz için özel erken erişim davetiyesi almak için kurumsal e-postanızı bırakın.</p>
      <form onsubmit="event.preventDefault(); alert('Kurumsal talebiniz iletildi!'); this.reset();" class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input type="email" required placeholder="ad.soyad@sirketiniz.com" class="w-full bg-white text-slate-950 px-4 py-3.5 rounded-lg text-sm outline-none font-medium">
        <button type="submit" style="background-color: ${accent}" class="w-full sm:w-auto px-6 py-3.5 text-white rounded-lg font-bold text-sm whitespace-nowrap cursor-pointer hover:opacity-90">
          ${cta}
        </button>
      </form>
    </div>
  </section>`;
  }

  // ==========================================
  // 4. MINIMAL ŞABLONU (EDITORIAL & SERIF)
  // ==========================================
  else {
    bodyBg = "#FCFCFA";
    bodyText = "#18181b";
    fontClasses = "font-serif";
    templateHtml = `
  <!-- Navbar -->
  <nav class="px-6 sm:px-12 py-8 flex justify-between items-center max-w-5xl mx-auto border-b border-zinc-200/60">
    <div class="text-base tracking-[0.25em] uppercase font-light text-zinc-900">
      ${name}
    </div>
    <a href="#waitlist" style="color: ${accent}" class="text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:opacity-60 transition-opacity">
      İletişim
    </a>
  </nav>

  <!-- Hero -->
  <main class="max-w-3xl mx-auto px-6 pt-20 sm:pt-32 pb-20 text-center">
    <span class="text-[11px] font-sans tracking-[0.35em] uppercase text-zinc-400 block mb-6">
      MANİFESTO — 01
    </span>

    <h1 class="text-3xl sm:text-6xl font-light leading-[1.18] mb-8 text-zinc-950 tracking-tight">
      ${title}
    </h1>

    <p class="text-base sm:text-xl text-zinc-500 font-sans font-light leading-relaxed max-w-xl mx-auto mb-12">
      ${copy}
    </p>

    <a href="#waitlist" style="background-color: ${accent}" class="px-10 py-4 text-white text-xs font-sans tracking-[0.25em] uppercase hover:opacity-85 transition-opacity inline-block shadow-sm">
      ${cta}
    </a>
  </main>

  <!-- Felsefe & Odak -->
  <section class="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-200/60 font-sans">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div class="md:col-span-4 text-xs tracking-[0.25em] uppercase text-zinc-400 pt-1">
        TEMEL DEĞERLER
      </div>
      <div class="md:col-span-8 space-y-12">
        ${features.map((feature: any, idx: number) => `
        <div class="flex gap-6 items-start">
          <span class="text-zinc-300 font-serif text-2xl font-light">0${idx + 1}</span>
          <div>
            <h3 class="text-xl font-medium mb-2 text-zinc-950 font-serif">${feature.title}</h3>
            <p class="text-zinc-500 font-light text-sm leading-relaxed">${feature.description}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- Waitlist -->
  <section id="waitlist" class="py-24 px-6 max-w-lg mx-auto text-center border-t border-zinc-200/60">
    <h2 class="text-2xl sm:text-3xl font-light mb-3 text-zinc-950">İletişimde Kalın</h2>
    <p class="text-zinc-500 font-sans font-light text-xs sm:text-sm mb-10">
      Sadece ${name} ile ilgili en önemli gelişmelerden haberdar olmak için e-postanızı bırakın.
    </p>
    <form onsubmit="event.preventDefault(); alert('Kaydınız alındı.'); this.reset();" class="flex flex-col sm:flex-row items-center gap-3 font-sans border-b border-zinc-300 pb-2">
      <input type="email" required placeholder="E-posta adresiniz..." class="w-full bg-transparent text-zinc-950 px-2 py-3 focus:outline-none placeholder:text-zinc-400 text-sm font-light">
      <button type="submit" style="color: ${accent}" class="w-full sm:w-auto text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity py-2 shrink-0 cursor-pointer">
        Gönder
      </button>
    </form>
  </section>`;
  }

  const isDarkFooter = templateType === "aurora";

  const fullHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Launchify Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 16s linear infinite;
    }
    body { 
      background-color: ${bodyBg}; 
      color: ${bodyText}; 
      font-family: ${templateType === 'minimal' ? "'Playfair Display', serif" : "'Manrope', sans-serif"};
    }
    h1, h2, h3 { 
      font-family: ${templateType === 'minimal' ? "'Playfair Display', serif" : "'Outfit', sans-serif"}; 
    }
  </style>
</head>
<body class="min-h-screen relative overflow-x-hidden ${fontClasses}">
${templateHtml}
  <footer class="py-8 text-center text-xs border-t ${
    isDarkFooter 
      ? 'border-white/10 text-gray-500 bg-[#030303]' 
      : templateType === 'brutal' 
        ? 'border-t-4 border-black text-black font-black bg-white' 
        : 'border-slate-200 text-slate-400 bg-white'
  }">
    © 2026 ${name}. Launchify ile oluşturuldu.
  </footer>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${slug}_website.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}