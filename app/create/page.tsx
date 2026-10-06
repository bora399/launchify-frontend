"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

const BRAND_COLOR = "#6366F1";

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
  
  const [userId, setUserId] = useState<string | null>(null);
  
  // EKLENDİ: Sayfa yetki kontrolü sırasındaki yüklenme durumu
  const [authLoading, setAuthLoading] = useState(true);
  
  // Kredi Kontrol State'leri
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [isCreditChecking, setIsCreditChecking] = useState(true);
  
  const [formData, setFormData] = useState({
    productName: "", 
    templateType: "aurora", 
    contactEmail: "", 
    demoLink: "", 
    productDescription: ""
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        
        try {
          const res = await fetch(`${apiUrl}/api/User/${user.uid}`);
          if (res.ok) {
            const data = await res.json();
            setRemainingCredits(data.remainingCredits);
          }
        } catch (err) {
          console.error("Kredi kontrol hatası:", err);
        } finally {
          setIsCreditChecking(false);
          setAuthLoading(false);
        }
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [apiUrl, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setErrorMessage(""); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectTemplate = (id: string) => {
    setFormData({ ...formData, templateType: id });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setErrorMessage("Proje oluşturabilmek için lütfen önce giriş yapın.");
      return;
    }
    
    if (remainingCredits !== null && remainingCredits <= 0) {
      setErrorMessage("Proje oluşturma hakkınız (krediniz) bitmiştir.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${apiUrl}/api/LandingPages/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ProductName: formData.productName,
          ThemeType: formData.templateType, 
          TemplateType: formData.templateType,
          ContactEmail: formData.contactEmail,
          DemoLink: formData.demoLink === "" ? null : formData.demoLink,
          ProductDescription: formData.productDescription,
          UserId: userId 
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        router.push(`/${responseData.slug}`);
      } else {
        setErrorMessage(responseData.message || "Sistem şu anda yoğun veya altyapı yanıt vermiyor. Lütfen daha sonra tekrar deneyin.");
      }
    } catch (error) {
      setErrorMessage("Sunucu ile bağlantı kurulamadı. Ağ bağlantınızı veya güvenlik duvarınızı kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  const isOutOfCredits = !isCreditChecking && remainingCredits !== null && remainingCredits <= 0;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-white/20 border-t-[#6366F1] rounded-full animate-spin"></span>
      </div>
    );
  }

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
          
          {isOutOfCredits && (
            <div className="absolute inset-0 z-50 bg-[#050505]/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h2 className="text-3xl font-bold font-heading mb-3">Krediniz Tükendi</h2>
              <p className="text-white/50 max-w-md mb-8">
                Tanımlanan ücretsiz proje oluşturma hakkınızı doldurdunuz. Daha fazla Landing Page üretmek için bizimle iletişime geçin veya paketinizi yükseltin.
              </p>
              <Link href="/dashboard" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                Panele Dön
              </Link>
            </div>
          )}

          {errorMessage && !isOutOfCredits && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className={`space-y-10 font-body relative z-10 ${isOutOfCredits ? 'opacity-30 pointer-events-none blur-sm' : ''}`}>
            
            <div>
              <label htmlFor="productName" className="block text-xs font-bold uppercase tracking-widest text-white/60 mb-3 cursor-pointer">Ürün / Platform Adı</label>
              <input id="productName" required type="text" name="productName" onChange={handleChange} maxLength={60}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl focus:bg-white/10 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] block p-4 outline-none transition-all placeholder:text-white/20"
                placeholder="Örn: Launchify SaaS" />
            </div>

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
                    <div className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden ${template.previewClass} relative shadow-inner`}>
                       {template.previewVibe}
                    </div>
                    <div className="flex flex-col justify-center h-full">
                      <h3 className={`font-bold text-lg transition-colors ${formData.templateType === template.id ? 'text-[#6366F1]' : 'text-white group-hover:text-white/90'}`}>
                        {template.name}
                      </h3>
                      <p className="text-white/40 text-xs mt-1 leading-relaxed">
                        {template.desc}
                      </p>
                    </div>
                    {formData.templateType === template.id && (
                      <div className="absolute top-4 right-4 text-[#6366F1]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

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
              <button type="submit" disabled={isLoading || isCreditChecking || isOutOfCredits}
                className="w-full text-white font-bold text-lg py-5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-[1.02] flex justify-center items-center gap-3 shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                {isCreditChecking ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sistem Kontrol Ediliyor...
                  </>
                ) : isLoading ? (
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