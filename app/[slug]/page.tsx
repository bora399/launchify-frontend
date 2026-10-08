import { Metadata } from 'next';
import Link from 'next/link';
import TemplateBrutal from '../components/templates/Brutal';
import TemplateMinimal from '../components/templates/Minimal';
import TemplateCorporate from '../components/templates/Corporate';
import TemplateAurora from '../components/templates/Aurora';
import AnalyticsTracker from '../components/AnalyticsTracker'; 

export interface FeatureItem {
  title: string;
  description: string;
}

export interface ProjectData {
  id?: string;
  productName: string;
  aiGeneratedHeroTitle: string;
  aiGeneratedMarketingCopy: string;
  accentColor: string;
  templateType: string;
  demoLink?: string;
  callToActionText: string;
  features: FeatureItem[];
}

const DEFAULT_ACCENT_COLOR = "#3B82F6";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
    const res = await fetch(`${apiUrl}/api/LandingPages/${slug}`, { cache: 'no-store' });
    
    if (!res.ok) throw new Error();
    const data = await res.json();
    
    return {
      title: `${data.productName || data.ProductName} | Launchify Generated`,
    };
  } catch {
    return { title: 'Platform Bulunamadı | Launchify' };
  }
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
  let projectData: ProjectData | null = null;

  try {
    const res = await fetch(`${apiUrl}/api/LandingPages/${slug}`, { cache: 'no-store' });
    
    if (res.ok) {
      const fetchedData = await res.json();
      const projectId = fetchedData.id || fetchedData.Id || slug;
      
      const ai = fetchedData.aiConfig || fetchedData.AiConfig || {};
      
      projectData = {
        id: projectId,
        productName: fetchedData.productName || fetchedData.ProductName || "Platform",
        aiGeneratedHeroTitle: ai.aiGeneratedHeroTitle || ai.AiGeneratedHeroTitle || fetchedData.aiGeneratedHeroTitle || "Vizyonunuzu Hayata Geçirin.",
        aiGeneratedMarketingCopy: ai.aiGeneratedMarketingCopy || ai.AiGeneratedMarketingCopy || fetchedData.aiGeneratedMarketingCopy || "Yeni nesil altyapı çözümleri.",
        accentColor: ai.accentColor || ai.AccentColor || fetchedData.accentColor || DEFAULT_ACCENT_COLOR,
        templateType: (fetchedData.templateType || fetchedData.TemplateType || fetchedData.themeType || "aurora").toLowerCase(),
        demoLink: fetchedData.demoLink ?? fetchedData.DemoLink ?? undefined,
        callToActionText: ai.callToActionText || ai.CallToActionText || "Erken Erişime Katıl",
        features: ai.features || ai.Features || []
      };

      fetch(`${apiUrl}/api/analytics/${projectId}/visit`, { method: 'POST' })
        .catch(err => console.error("Analitik kaydedilemedi:", err));
    }
  } catch (error) {
    console.error("Veri çekilirken hata oluştu:", error);
  }
  
  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
         <h1>404 - Proje Bulunamadı</h1>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (projectData?.templateType) {
      case 'brutal':
        return <TemplateBrutal data={projectData} />;
      case 'minimal':
        return <TemplateMinimal data={projectData} />;
      case 'corporate':
        return <TemplateCorporate data={projectData} />;
      case 'aurora':
      default:
        return <TemplateAurora data={projectData} />;
    }
  };

  return (
    <>
      <AnalyticsTracker projectId={projectData.id!} />
      {renderTemplate()}

      <aside aria-label="Platform bilgisi" className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[9999]">
        <Link 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-black/80 hover:bg-black text-white border border-white/15 hover:border-[#6366F1]/50 rounded-full text-[11px] sm:text-xs font-medium shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        >
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#6366F1] text-white text-[9px] font-black">
            ⚡
          </span>
          <span className="text-white/60 group-hover:text-white transition-colors">
            Created with <strong className="text-white font-bold">Launchify</strong>
          </span>
          <span className="text-white/40 group-hover:text-[#6366F1] group-hover:translate-x-0.5 transition-all text-[10px]">
            ↗
          </span>
        </Link>
      </aside>
    </>
  );
}