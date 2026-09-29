"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BRAND_COLOR = "#6366F1";

export default function CreateProject() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    productName: "", 
    themeType: "modern", 
    contactEmail: "", 
    demoLink: "", 
    productDescription: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setErrorMessage(""); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7022";
      const response = await fetch(`${apiUrl}/api/LandingPages/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
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

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pt-32 pb-24">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Sistemi Başlat
          </h1>
          <p className="text-white/50 font-body text-lg">
            Ürününüzün temel parametrelerini girin, mimariyi ve metinleri yapay zekaya bırakın.
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

          <form onSubmit={handleSubmit} className="space-y-8 font-body relative z-10">
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="productName" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 cursor-pointer">Ürün Adı</label>
                <input id="productName" required type="text" name="productName" onChange={handleChange} maxLength={60}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none transition-all placeholder:text-white/20"
                  placeholder="Örn: Launchify SaaS" />
              </div>
              <div>
                <label htmlFor="themeType" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 cursor-pointer">Tasarım Karakteri</label>
                <select id="themeType" name="themeType" onChange={handleChange} 
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none appearance-none cursor-pointer transition-all [&>option]:bg-[#111111]">
                  <option value="modern">Modern & Startup</option>
                  <option value="classic">Kurumsal & Ciddi</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="productDescription" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 flex items-center justify-between cursor-pointer">
                <span>Ürün Özellikleri (AI Briefi)</span>
                <span className="text-[10px] text-white/30">{formData.productDescription.length}/1000</span>
              </label>
              <textarea id="productDescription" required name="productDescription" rows={5} onChange={handleChange} maxLength={1000}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none resize-none transition-all placeholder:text-white/20 leading-relaxed"
                placeholder="Platformunuz hangi problemi çözüyor? Temel özellikleri ve hedef kitlesi nelerdir?" />
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
                    Altyapı Kuruluyor...
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