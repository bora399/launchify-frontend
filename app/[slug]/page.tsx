"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface ProjectData {
  productName: string;
  aiGeneratedHeroTitle: string;
  aiGeneratedMarketingCopy: string;
  accentColor: string;
  demoLink?: string;
  slug?: string;
}

export default function ProjectView() {
  const params = useParams();
  const slug = params.slug as string; 
  
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://localhost:7022/api/LandingPages/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((fetchedData) => {
        // C# PascalCase ile JS camelCase uyuşmazlığını çözen hayat kurtarıcı eşleştirme
        setData({
          productName: fetchedData.productName || fetchedData.ProductName || "Platform Adı",
          aiGeneratedHeroTitle: fetchedData.aiGeneratedHeroTitle || fetchedData.AiGeneratedHeroTitle || "Vizyonunuzu Hayata Geçirin",
          aiGeneratedMarketingCopy: fetchedData.aiGeneratedMarketingCopy || fetchedData.AiGeneratedMarketingCopy || "Yapay zeka tarafından üretilen ürün açıklaması burada yer alacak.",
          accentColor: fetchedData.accentColor || fetchedData.AccentColor || '#18181B',
          demoLink: fetchedData.demoLink || fetchedData.DemoLink
        });
      })
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-zinc-400 font-mono text-sm tracking-widest uppercase animate-pulse">Sistem Yükleniyor...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center bg-zinc-50 text-red-500 font-medium">Platform bulunamadı veya henüz yayında değil.</div>;

  const btnColor = data.accentColor || '#18181B';

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-zinc-200 text-zinc-900 overflow-hidden relative">
      
      {/* Arka Plan Ortam Işığı (Accent Color ile dinamik parlama) */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${btnColor} 0%, transparent 70%)` }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-zinc-100/50 bg-white/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900">
            <div className="w-6 h-6 rounded-md shadow-sm" style={{ backgroundColor: btnColor }}></div>
            {data.productName}
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs font-semibold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-widest">
              Powered by Launchify
            </Link>
            <button 
              className="px-5 py-2 text-white text-sm font-medium rounded-full shadow-sm hover:opacity-90 transition-opacity"
              style={{ backgroundColor: btnColor }}
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-32">
        {/* Metin ve Call-to-Action Alanı */}
        <div className="max-w-5xl mx-auto px-6 text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold tracking-wider uppercase mb-8 shadow-sm border border-zinc-200/50">
            <span className="flex h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: btnColor }}></span>
            Platform Aktif
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] mb-8 text-zinc-900">
            {data.aiGeneratedHeroTitle}
          </h1>
          
          <p className="text-xl text-zinc-500 mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
            {data.aiGeneratedMarketingCopy}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="px-8 py-4 text-white rounded-lg font-medium text-lg transition-all hover:scale-105 shadow-xl w-full sm:w-auto"
              style={{ backgroundColor: btnColor, boxShadow: `0 10px 30px -10px ${btnColor}` }}
            >
              Ücretsiz Başlayın
            </button>
            
            {data.demoLink && (
              <a href={data.demoLink} target="_blank" rel="noopener noreferrer" 
                 className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-lg font-medium text-lg hover:bg-zinc-50 transition-colors w-full sm:w-auto">
                Nasıl Çalışır?
              </a>
            )}
          </div>
        </div>

        {/* Gerçekçi Dashboard Mockup (Landscape Arayüz İllüzyonu) */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-2xl p-2 bg-zinc-200/40 border border-zinc-200/60 shadow-2xl backdrop-blur-sm">
            {/* Tarayıcı Üst Barı */}
            <div className="absolute top-4 left-4 flex gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-300"></div>
            </div>
            
            {/* Sahte Uygulama Arayüzü */}
            <div className="relative aspect-[16/9] w-full rounded-xl bg-white border border-zinc-100 overflow-hidden shadow-inner flex">
              
              {/* Sahte Sidebar */}
              <div className="w-1/4 h-full bg-zinc-50 border-r border-zinc-100 p-6 hidden md:block">
                <div className="w-full h-8 rounded bg-zinc-200/50 mb-8"></div>
                <div className="space-y-4">
                  <div className="w-3/4 h-4 rounded bg-zinc-200/50"></div>
                  <div className="w-full h-4 rounded bg-zinc-200/50"></div>
                  <div className="w-5/6 h-4 rounded bg-zinc-200/50"></div>
                </div>
              </div>

              {/* Sahte Ana İçerik */}
              <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-10">
                  <div className="w-1/3 h-8 rounded bg-zinc-100"></div>
                  <div className="w-10 h-10 rounded-full bg-zinc-100"></div>
                </div>
                
                {/* Sahte Grafikler / Kartlar */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="h-24 rounded-xl bg-zinc-50 border border-zinc-100"></div>
                  <div className="h-24 rounded-xl bg-zinc-50 border border-zinc-100"></div>
                  <div className="h-24 rounded-xl bg-zinc-50 border border-zinc-100"></div>
                </div>
                
                <div className="w-full h-64 rounded-xl bg-zinc-50 border border-zinc-100 p-6 flex items-end gap-4">
                  {/* Sahte Bar Grafik Çubukları */}
                  <div className="flex-1 rounded-t-sm opacity-20" style={{ height: '40%', backgroundColor: btnColor }}></div>
                  <div className="flex-1 rounded-t-sm opacity-40" style={{ height: '70%', backgroundColor: btnColor }}></div>
                  <div className="flex-1 rounded-t-sm opacity-60" style={{ height: '50%', backgroundColor: btnColor }}></div>
                  <div className="flex-1 rounded-t-sm opacity-80" style={{ height: '90%', backgroundColor: btnColor }}></div>
                  <div className="flex-1 rounded-t-sm opacity-100" style={{ height: '100%', backgroundColor: btnColor }}></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

    </div>
  );
}