export function exportProjectAsHtml(project: any) {
  const ai = project?.aiConfig || project?.AiConfig || {};
  const name = project?.productName || project?.ProductName || "Platform";
  const title = ai.aiGeneratedHeroTitle || project?.aiGeneratedHeroTitle || "Vizyonunuzu Hayata Geçirin.";
  const copy = ai.aiGeneratedMarketingCopy || project?.aiGeneratedMarketingCopy || "Yeni nesil B2B altyapı çözümü.";
  const accent = ai.accentColor || project?.accentColor || "#6366F1";
  const cta = ai.callToActionText || project?.callToActionText || "Erken Erişime Katıl";
  const slug = project?.slug || "landing-page";

  const features = (ai.features || project?.features || [
    { title: "Yapay Zeka Destekli", description: "Hızlı, ölçeklenebilir ve modern altyapı." },
    { title: "Yüksek Performans", description: "Maksimum dönüşüm ve kurumsal güven." },
    { title: "Kolay Entegrasyon", description: "Saniyeler içinde devreye alın." }
  ]);

  const faqs = (ai.faqs || [
    { question: "Erken erişim ne zaman başlar?", answer: "E-postanızı bıraktığınızda davetiyeniz öncelikli olarak gönderilir." },
    { question: "Verilerim güvende mi?", answer: "Tüm altyapı uçtan uca şifreli protokollerle korunur." }
  ]);

  const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} | Launchify Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Manrope', sans-serif; background-color: #050505; color: #fff; }
    h1, h2, h3 { font-family: 'Outfit', sans-serif; }
  </style>
</head>
<body class="min-h-screen selection:bg-[${accent}] selection:text-white relative overflow-x-hidden">

  <!-- Nav -->
  <nav class="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/10">
    <div class="text-xl font-bold flex items-center gap-2">
      <span class="w-3.5 h-3.5 rounded-full" style="background-color: ${accent}"></span>
      ${name}
    </div>
    <a href="#waitlist" class="px-5 py-2 rounded-full text-xs font-bold border border-white/20 hover:bg-white/10 transition-all">
      Erken Erişim
    </a>
  </nav>

  <!-- Hero -->
  <main class="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
    <div class="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-8">
      ⚡ AI Destekli Altyapı
    </div>
    <h1 class="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">
      ${title}
    </h1>
    <p class="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
      ${copy}
    </p>
    <a href="#waitlist" style="background-color: ${accent}" class="inline-block px-8 py-4 rounded-full font-bold text-white hover:opacity-90 shadow-lg text-base">
      ${cta}
    </a>
  </main>

  <!-- Features -->
  <section class="max-w-6xl mx-auto px-6 py-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${features.map((f: any, idx: number) => `
      <div class="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
        <div class="w-10 h-10 rounded-xl mb-4 flex items-center justify-center font-bold" style="background-color: ${accent}20; color:${accent}">
          0${idx + 1}
        </div>
        <h3 class="text-xl font-bold mb-2">${f.title}</h3>
        <p class="text-gray-400 text-sm leading-relaxed">${f.description}</p>
      </div>`).join('')}
    </div>
  </section>

  <!-- FAQ -->
  <section class="max-w-4xl mx-auto px-6 py-16">
    <h2 class="text-3xl font-bold text-center mb-8">Sıkça Sorulan Sorular</h2>
    <div class="space-y-4">
      ${faqs.map((faq: any) => `
      <details class="bg-white/5 border border-white/10 rounded-xl p-5 cursor-pointer">
        <summary class="font-bold text-base text-white outline-none">${faq.question}</summary>
        <p class="text-gray-400 text-sm mt-3 pt-3 border-t border-white/5 leading-relaxed">${faq.answer}</p>
      </details>`).join('')}
    </div>
  </section>

  <!-- Waitlist -->
  <section id="waitlist" class="max-w-3xl mx-auto px-6 py-20 text-center">
    <div class="bg-white/5 border border-white/10 p-10 sm:p-14 rounded-3xl backdrop-blur-xl">
      <h2 class="text-3xl sm:text-4xl font-bold mb-4">${name} Erken Erişim</h2>
      <p class="text-gray-400 mb-8 text-sm sm:text-base">İlk kullananlardan biri olmak için e-posta adresinizi bırakın.</p>
      <form onsubmit="event.preventDefault(); alert('Talebiniz kaydedildi!'); this.reset();" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input type="email" required placeholder="E-posta adresiniz..." class="w-full bg-black/60 border border-white/20 px-5 py-3.5 rounded-xl text-white outline-none">
        <button type="submit" style="background-color: ${accent}" class="px-7 py-3.5 rounded-xl font-bold whitespace-nowrap cursor-pointer">
          ${cta}
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/10 py-10 text-center text-gray-500 text-xs">
    © 2026 ${name}. Exported with Launchify.
  </footer>

</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${slug}_website.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}