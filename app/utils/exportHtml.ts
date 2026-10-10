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

  if (templateType === "aurora") {
    templateHtml = `
  <!-- Aurora Glow Işıkları -->
  <div style="position: fixed; top: -10%; left: -10%; width: 550px; height: 550px; border-radius: 9999px; background: rgba(147, 51, 234, 0.2); filter: blur(130px); pointer-events: none; z-index: 0;"></div>
  <div style="position: fixed; bottom: -10%; right: -10%; width: 500px; height: 500px; border-radius: 9999px; background: rgba(59, 130, 246, 0.15); filter: blur(130px); pointer-events: none; z-index: 0;"></div>

  <!-- Navbar -->
  <nav class="sticky top-0 z-50 px-4 sm:px-8 py-4 flex justify-between items-center border-b border-white/5" style="background: rgba(5,5,5,0.75); backdrop-filter: blur(20px);">
    <div class="text-lg sm:text-xl font-bold tracking-wider flex items-center gap-2.5">
      <div class="w-5 h-5 rounded-lg shrink-0" style="background-color: ${accent}; box-shadow: 0 0 16px ${accent}90;"></div>
      <span>${name}</span>
    </div>
    <a href="#waitlist" class="px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border border-white/10" style="background: rgba(255,255,255,0.08);">
      Erken Erişim
    </a>
  </nav>

  <!-- Hero -->
  <main class="flex flex-col items-center justify-center pt-16 sm:pt-28 pb-16 sm:pb-24 text-center px-4 relative z-10 max-w-4xl mx-auto">
    <div class="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium mb-6 text-gray-300 flex items-center gap-2 shadow-inner" style="backdrop-filter: blur(12px);">
      <span class="w-2 h-2 rounded-full animate-ping" style="background-color: ${accent}"></span> 
      <span>Yapay Zeka Destekli Altyapı</span>
    </div>

    <!-- Degrade Başlık (Canlı sitedeki birebir gradient) -->
    <h1 class="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-[1.15] tracking-tight" style="background: linear-gradient(180deg, #FFFFFF 0%, #E5E7EB 40%, #9CA3AF 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
      ${title}
    </h1>

    <p class="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-8 sm:mb-12 leading-relaxed">
      ${copy}
    </p>

    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md sm:max-w-none justify-center">
      <a href="#waitlist" style="background-color: ${accent}; box-shadow: 0 0 35px ${accent}50;" class="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-white hover:opacity-90 transition-all text-center text-sm sm:text-base">
        ${cta}
      </a>
      ${demoLink ? `
      <a href="${demoLink}" target="_blank" class="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-full font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2 text-sm sm:text-base">
        Canlı Demo <span class="opacity-50">→</span>
      </a>` : ''}
    </div>

    <!-- Sosyal Kanıt Hapı -->
    <div class="mt-10 sm:mt-12 flex items-center gap-2.5 text-xs text-white/50 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full" style="backdrop-filter: blur(8px);">
      <span class="flex h-2 w-2 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>Son 24 saatte <strong class="text-white">40+ kurucu</strong> bekleme sırasına katıldı.</span>
    </div>
  </main>

  <!-- Features -->
  <section class="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 relative z-10">
    <div class="text-center mb-12">
      <h2 class="text-2xl sm:text-4xl font-bold mb-3 tracking-tight">Neden ${name}?</h2>
      <p class="text-gray-500 text-xs sm:text-sm">Modern işletmeler için tasarlanan temel avantajlar.</p>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      ${features.map((f: any, idx: number) => `
      <div class="p-6 sm:p-8 rounded-3xl border border-white/10 transition-all" style="background: linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%); backdrop-filter: blur(16px);">
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-white/5 border border-white/10 font-black text-lg" style="color: ${accent}">
          0${idx + 1}
        </div>
        <h3 class="text-lg sm:text-xl font-bold mb-2 text-white">${f.title}</h3>
        <p class="text-gray-400 text-xs sm:text-sm leading-relaxed">${f.description}</p>
      </div>`).join('')}
    </div>
  </section>

  <!-- Waitlist -->
  <section id="waitlist" class="py-14 sm:py-24 relative z-10 px-4">
    <div class="max-w-3xl mx-auto relative">
      <div style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 100%); filter: blur(48px); border-radius: 2.5rem;"></div>
      <div class="relative p-6 sm:p-12 md:p-14 rounded-3xl text-center border border-white/10" style="background: rgba(255,255,255,0.04); backdrop-filter: blur(20px);">
        <h2 class="text-2xl sm:text-4xl font-bold mb-3 tracking-tight">${name} ile Başlayın</h2>
        <p class="text-gray-400 mb-8 max-w-md mx-auto text-xs sm:text-base">
          Kontenjan dolmadan yerinizi ayırtın. Platform açıldığında ilk davetiyeyi size ulaştıracağız.
        </p>
        <form onsubmit="event.preventDefault(); alert('Talebiniz kaydedildi!'); this.reset();" class="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
          <input type="email" required placeholder="E-posta adresinizi girin..." class="w-full bg-black/60 border border-white/15 text-white px-4 py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm outline-none focus:border-white/40">
          <button type="submit" style="background-color: ${accent}" class="w-full sm:w-auto px-7 py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer shadow-lg">
            ${cta}
          </button>
        </form>
        <p class="text-gray-600 text-[10px] sm:text-xs mt-4">Spam yok. İstediğiniz zaman ayrılabilirsiniz.</p>
      </div>
    </div>
  </section>`;
  } 
  else if (templateType === "brutal") {
    templateHtml = `
  <nav class="border-b-4 border-black bg-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
    <div class="text-2xl font-black uppercase tracking-tighter">${name}*</div>
    <a href="#waitlist" class="px-5 py-2 font-black uppercase text-xs border-2 border-black shadow-[3px_3px_0px_#000] bg-white">Erken Erişim</a>
  </nav>

  <main class="px-6 py-16 sm:py-24 max-w-6xl mx-auto">
    <div class="inline-block border-2 border-black px-3 py-1 font-black uppercase text-xs bg-[#FDE047] shadow-[2px_2px_0px_#000] mb-6">⚡ BETA V1.0</div>
    <h1 class="text-4xl sm:text-7xl font-black uppercase tracking-tighter mb-6 leading-[1.05]">${title}</h1>
    <p class="text-base sm:text-xl font-bold max-w-2xl mb-8 border-l-4 border-black pl-4 bg-white p-3 shadow-[4px_4px_0px_#000]">${copy}</p>
    <a href="#waitlist" style="background-color: ${accent}" class="inline-block px-8 py-4 font-black uppercase border-4 border-black shadow-[5px_5px_0px_#000]">${cta}</a>
  </main>

  <section class="px-6 py-16 max-w-6xl mx-auto border-t-4 border-black">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${features.map((f: any, idx: number) => `
      <div class="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000]">
        <div style="background-color: ${accent}" class="w-10 h-10 border-2 border-black flex items-center justify-center font-black mb-4">0${idx+1}</div>
        <h3 class="text-xl font-black uppercase mb-2">${f.title}</h3>
        <p class="font-medium text-sm text-gray-800">${f.description}</p>
      </div>`).join('')}
    </div>
  </section>

  <section id="waitlist" class="px-6 py-16 bg-black text-white border-t-4 border-black">
    <div class="max-w-3xl mx-auto border-4 border-white p-8 sm:p-12 shadow-[-6px_6px_0px_#fff]">
      <h2 class="text-3xl sm:text-5xl font-black uppercase mb-3">${name} BAŞLIYOR</h2>
      <p class="text-sm font-bold text-gray-300 mb-8">E-posta adresini bırak, sistem açıldığı anda ilk bildirim senin gelen kutuna düşsün.</p>
      <form onsubmit="event.preventDefault(); alert('LİSTEYE ALINDIN!'); this.reset();" class="flex flex-col sm:flex-row gap-3">
        <input type="email" required placeholder="E-POSTA ADRESİN" class="w-full sm:flex-1 bg-transparent border-4 border-white text-white px-4 py-3 text-sm font-bold uppercase outline-none">
        <button type="submit" style="background-color: ${accent}" class="px-8 py-3 border-4 border-white text-black font-black uppercase cursor-pointer">${cta}</button>
      </form>
    </div>
  </section>`;
  }
  else if (templateType === "corporate") {
    templateHtml = `
  <nav class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
    <div class="text-xl font-bold text-gray-950 flex items-center gap-2">
      <div style="background-color: ${accent}" class="w-5 h-5 rounded-md"></div>
      <span>${name}</span>
    </div>
    <a href="#waitlist" style="background-color: ${accent}" class="px-4 py-2 text-white text-xs rounded-lg font-medium">Sisteme Giriş</a>
  </nav>

  <main class="max-w-6xl mx-auto px-6 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-4 border border-blue-100">
        <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> Kurumsal Güvenilirlik
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold text-gray-950 leading-[1.15] mb-4">${title}</h1>
      <p class="text-base text-gray-600 mb-6 leading-relaxed">${copy}</p>
      <a href="#waitlist" style="background-color: ${accent}" class="inline-block px-6 py-3.5 text-white rounded-lg font-semibold shadow-sm">${cta}</a>
      <div class="grid grid-cols-3 gap-3 border-t border-gray-200 pt-5 mt-8">
        <div><p class="text-xl font-black text-gray-950">%99.9</p><p class="text-[11px] text-gray-500">Uptime Güvencesi</p></div>
        <div><p class="text-xl font-black text-gray-950">256-bit</p><p class="text-[11px] text-gray-500">SSL Şifreleme</p></div>
        <div><p class="text-xl font-black text-gray-950">10x</p><p class="text-[11px] text-gray-500">Hızlı Dağıtım</p></div>
      </div>
    </div>
    <div class="h-[320px] rounded-2xl bg-white border border-gray-200 shadow-xl flex items-center justify-center p-8">
      <div class="w-full space-y-3">
        <div class="h-3 w-1/3 bg-gray-200 rounded-full mb-6"></div>
        <div class="w-full bg-gray-100 rounded-full h-7 overflow-hidden flex items-center"><div style="background-color: ${accent}; width: 85%" class="h-full"></div></div>
        <div class="w-full bg-gray-100 rounded-full h-7 overflow-hidden flex items-center"><div style="background-color: ${accent}; width: 65%" class="h-full"></div></div>
      </div>
    </div>
  </main>

  <section id="waitlist" class="py-16 bg-gray-950 text-white px-6">
    <div class="max-w-xl mx-auto text-center">
      <h2 class="text-3xl font-extrabold mb-3">Kurumsal Dönüşüme Başlayın</h2>
      <p class="text-gray-400 mb-6 text-sm">Erken erişim programımıza katılmak için şirket e-posta adresinizi bırakın.</p>
      <form onsubmit="event.preventDefault(); alert('Kaydınız alındı!'); this.reset();" class="flex flex-col sm:flex-row gap-2">
        <input type="email" required placeholder="Kurumsal E-posta Adresiniz" class="w-full bg-white text-gray-950 px-4 py-3 rounded-lg text-sm outline-none">
        <button type="submit" style="background-color: ${accent}" class="px-6 py-3 text-white rounded-lg font-bold text-sm whitespace-nowrap">${cta}</button>
      </form>
    </div>
  </section>`;
  }
  else {
    templateHtml = `
  <nav class="px-6 py-8 flex justify-between items-center max-w-5xl mx-auto border-b border-gray-100 font-serif">
    <div class="text-lg tracking-[0.25em] uppercase font-light">${name}</div>
    <a href="#waitlist" style="color: ${accent}" class="text-xs tracking-widest uppercase font-semibold font-sans">İletişim</a>
  </nav>

  <main class="flex flex-col items-center justify-center pt-20 pb-24 text-center px-6 max-w-3xl mx-auto">
    <p class="text-xs font-sans tracking-[0.3em] uppercase text-gray-400 mb-6">01 — Vizyon</p>
    <h1 class="text-4xl sm:text-6xl font-light leading-[1.2] mb-8 text-gray-950 font-serif">${title}</h1>
    <p class="text-base text-gray-500 leading-relaxed max-w-xl mb-12 font-sans font-light">${copy}</p>
    <a href="#waitlist" style="background-color: ${accent}" class="px-10 py-4 text-white text-xs tracking-[0.2em] uppercase font-sans inline-block">${cta}</a>
  </main>

  <section id="waitlist" class="py-20 px-6 max-w-md mx-auto text-center border-t border-gray-100">
    <h2 class="text-2xl font-light mb-3 text-gray-950 font-serif">Bizimle İletişimde Kalın</h2>
    <p class="text-gray-500 font-sans text-xs mb-8">Sadece ${name} ile ilgili temel güncellemeler için e-posta bırakın.</p>
    <form onsubmit="event.preventDefault(); alert('Kaydınız alındı.'); this.reset();" class="flex flex-col sm:flex-row gap-3 font-sans border-b border-gray-300 pb-2">
      <input type="email" required placeholder="E-posta adresiniz..." class="w-full bg-transparent text-gray-950 px-2 py-2 text-sm outline-none">
      <button type="submit" style="color: ${accent}" class="text-xs font-semibold uppercase tracking-widest py-2 shrink-0">Gönder</button>
    </form>
  </section>`;
  }

  const isDark = templateType === "aurora" || templateType === "brutal";

  const fullHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Launchify Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Outfit:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Manrope', sans-serif; background-color: ${isDark ? '#050505' : templateType === 'corporate' ? '#F9FAFB' : '#FCFCFC'}; color: ${isDark ? '#fff' : '#111'}; }
    h1, h2, h3 { font-family: ${templateType === 'minimal' ? "'Times New Roman', serif" : "'Outfit', sans-serif"}; }
  </style>
</head>
<body class="min-h-screen relative overflow-x-hidden">
${templateHtml}
  <footer class="py-8 text-center text-xs border-t ${isDark ? 'border-white/10 text-gray-500 bg-[#050505]' : 'border-gray-200 text-gray-400 bg-white'}">
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