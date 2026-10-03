"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BRAND_COLOR = "#6366F1";

// Şablonlarımızın görsel ve metin verileri
const TEMPLATES = [
  {
    id: "aurora",
    name: "Aurora Glass",
    desc: "Bulanık ışıklar, cam efekti, koyu tema. Startup ve AI projeleri için kusursuz.",
    previewClass: "bg-black relative overflow-hidden",
    previewVibe: (
      <>
        <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] rounded-full bg-purple-600/50 blur-[20px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] rounded-full bg-blue-600/50 blur-[20px]"></div>
        <div className="absolute inset-2 border border-white/20 bg-white/10 backdrop-blur-md rounded-md"></div>
      </>
    )
  },
  {
    id: "brutal",
    name: "Neo-Brutal",
    desc: "Sert sınırlar, asimetrik gölgeler, cesur renkler. Trend ve dikkat çekici projeler için.",
    previewClass: "bg-[#FDE047] border-2 border-black",
    previewVibe: (
      <div className="w-full h-full p-2 flex flex-col justify-between">
        <div className="w-3/4 h-2 bg-black"></div>
        <div className="w-1/2 h-6 border-2 border-black bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]"></div>
      </div>
    )
  },
  {
    id: "minimal",
    name: "Zen Minimal",
    desc: "Geniş boşluklar, zarif tipografi ve sadelik. Kreatif ajans ve portfolyolar için.",
    previewClass: "bg-white",
    previewVibe: (
      <div className="w-full h-full p-3 flex flex-col items-center justify-center gap-2">
        <div className="w-1/3 h-1 bg-gray-300"></div>
        <div className="w-2/3 h-1 bg-gray-200"></div>
        <div className="w-1/2 h-1 bg-gray-200"></div>
      </div>
    )
  },
  {
    id: "corporate",
    name: "Corporate Trust",
    desc: "Güven veren açık tonlar, net yapılar. Kurumsal çözümler ve B2B platformlar için.",
    previewClass: "bg-gray-100",
    previewVibe: (
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-3 bg-white shadow-sm flex items-center px-1">
           <div className="w-2 h-2 rounded-sm bg-slate-800"></div>
        </div>
        <div className="flex-1 flex gap-1 p-1 items-center justify-center">
          <div className="w-1/2 h-4/5 bg-white rounded-sm shadow-sm"></div>
          <div className="w-1/2 h-4/5 bg-slate-200 rounded-sm"></div>
        </div>
      </div>
    )
  }
];

export default function CreateProject() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    productName: "", 
    templateType: "aurora", // Varsayılan olarak ilk şablonu atadık
    contactEmail: "", 
    demoLink: "", 
    productDescription: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorMessage(""); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectTemplate = (id: string) => {
    setFormData({ ...formData, templateType: id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
      const response = await fetch(`${apiUrl}/api/LandingPages/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ProductName: formData.productName,
          ThemeType: formData.templateType, // Geriye dönük uyumluluk (AI promptu için)
          TemplateType: formData.templateType, // Router yönlendirmesi için
          ContactEmail: formData.contactEmail,
          DemoLink: formData.demoLink === "" ? null : formData.demoLink,
          ProductDescription: formData.productDescription
        }),
      });

      if (response.ok) {
        const generatedSlug = formData.productName
          .toString()
          .toLowerCase()
          .trim()
          .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
          .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
          .replace(/[\s\W-]+/g, '-') 
          .replace(/^-+|-+$/g, ''); 

        router.push(`/${generatedSlug}`);
      } else {
        setErrorMessage("Sistem şu anda yoğun veya altyapı yanıt vermiyor. Lütfen daha sonra tekrar deneyin.");
      }
    } catch (error) {
      setErrorMessage("Sunucu ile bağlantı kurulamadı. Ağ bağlantınızı veya güvenlik duvarınızı kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#6366F1]/30 selection:text-white relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Outfit:wght@400;500;700;800&display=swap');
        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
        .dark-grid-pattern {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}} />

      <div className="fixed inset-0 dark-grid-pattern pointer-events-none z-0"></div>
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] opacity-20 blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: BRAND_COLOR }}></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-24 pb-24">
        
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Sistemi Başlat
          </h1>
          <p className="text-white/50 font-body text-lg max-w-2xl mx-auto">
            Ürününüzün temel parametrelerini girin, görsel karakteri seçin; gerisini yapay zekaya bırakın.
          </p>
        </div>

        <div className="bg-[#111111]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-50"></div>
          
          {errorMessage && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10 font-body relative z-10">
            
            {/* Ürün Adı */}
            <div>
              <label htmlFor="productName" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 cursor-pointer">Ürün / Platform Adı</label>
              <input id="productName" required type="text" name="productName" onChange={handleChange} maxLength={60}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none transition-all placeholder:text-white/20"
                placeholder="Örn: Launchify SaaS" />
            </div>

            {/* Şablon Seçimi (Yenilikçi Tasarım) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-4">Tasarım Karakteri (Şablon)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEMPLATES.map((template) => (
                  <div 
                    key={template.id}
                    onClick={() => selectTemplate(template.id)}
                    className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                      formData.templateType === template.id 
                        ? 'border-[#6366F1] bg-[#6366F1]/10 ring-1 ring-[#6366F1]' 
                        : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Görsel Önizleme Kutusu */}
                    <div className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden ${template.previewClass} relative shadow-inner`}>
                       {template.previewVibe}
                    </div>
                    {/* Metin Alanı */}
                    <div className="flex flex-col justify-center h-full">
                      <h3 className={`font-bold text-lg transition-colors ${formData.templateType === template.id ? 'text-[#6366F1]' : 'text-white group-hover:text-white/90'}`}>
                        {template.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">
                        {template.desc}
                      </p>
                    </div>
                    
                    {/* Seçili İkonu */}
                    {formData.templateType === template.id && (
                      <div className="absolute top-4 right-4 text-[#6366F1]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Ürün Açıklaması */}
            <div>
              <label htmlFor="productDescription" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 flex items-center justify-between cursor-pointer">
                <span>Ürün Özellikleri (AI Briefi)</span>
                <span className="text-[10px] text-white/30">{formData.productDescription.length}/1000</span>
              </label>
              <textarea id="productDescription" required name="productDescription" rows={4} onChange={handleChange} maxLength={1000}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none resize-none transition-all placeholder:text-white/20 leading-relaxed"
                placeholder="Platformunuz hangi problemi çözüyor? Hedef kitleye sağladığı temel fayda nedir?" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="contactEmail" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 cursor-pointer">Kurumsal E-Posta</label>
                <input id="contactEmail" required type="email" name="contactEmail" onChange={handleChange} maxLength={100}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none transition-all placeholder:text-white/20"
                  placeholder="ornek@sirket.com" />
              </div>
              <div>
                <label htmlFor="demoLink" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 flex items-center justify-between cursor-pointer">
                  <span>Demo Linki</span>
                  <span className="text-[10px] text-white/30 border border-white/10 px-2 py-0.5 rounded-full">Opsiyonel</span>
                </label>
                <input id="demoLink" type="url" name="demoLink" onChange={handleChange} maxLength={255}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none transition-all placeholder:text-white/20"
                  placeholder="https://..." />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button type="submit" disabled={isLoading}
                className="w-full text-white font-bold text-lg py-5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-[1.02] flex justify-center items-center gap-3 shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Yapay Zeka İnşa Ediyor...
                  </>
                ) : (
                  <>
                    Platformu İnşa Et
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}