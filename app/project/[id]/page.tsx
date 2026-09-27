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
}

export default function ProjectView() {
  const params = useParams();
  const [data, setData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://localhost:5001/api/LandingPages/${params.id}`)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-zinc-500 font-medium tracking-tight">Veriler yükleniyor...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center text-red-500">Proje bulunamadı.</div>;

  // AI'ın belirlediği rengi veya default siyah kullan
  const btnColor = data.accentColor || '#18181B';

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-zinc-200 text-zinc-900">
      
      {/* Üretilen Sitenin Navbar'ı */}
      <nav className="border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tight">{data.productName}</div>
          <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors">
            Powered by Launchify
          </Link>
        </div>
      </nav>

      {/* Üretilen Sitenin Hero Alanı */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-semibold tracking-wider uppercase mb-8">
          Erken Erişim
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-8">
          {data.aiGeneratedHeroTitle}
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-500 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
          {data.aiGeneratedMarketingCopy}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            className="px-8 py-4 text-white rounded-md font-semibold text-lg transition-opacity hover:opacity-90 w-full sm:w-auto"
            style={{ backgroundColor: btnColor }}
          >
            Sisteme Giriş
          </button>
          
          {data.demoLink && (
            <a href={data.demoLink} target="_blank" rel="noopener noreferrer" 
               className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-md font-semibold text-lg hover:bg-zinc-50 transition-colors w-full sm:w-auto">
              Demoyu İncele
            </a>
          )}
        </div>
      </main>

    </div>
  );
}