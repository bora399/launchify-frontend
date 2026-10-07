import { Metadata } from 'next';
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
  // YENİ EKLENEN VERİLER:
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
        
        // YAPAY ZEKADAN GELEN YENİ İÇERİKLER:
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

  switch (projectData.templateType) {
    case 'brutal':
      return <><AnalyticsTracker projectId={projectData.id!} /><TemplateBrutal data={projectData} /></>;
    case 'minimal':
      return <><AnalyticsTracker projectId={projectData.id!} /><TemplateMinimal data={projectData} /></>;
    case 'corporate':
      return <><AnalyticsTracker projectId={projectData.id!} /><TemplateCorporate data={projectData} /></>;
    case 'aurora':
    default:
      return <><AnalyticsTracker projectId={projectData.id!} /><TemplateAurora data={projectData} /></>;
  }
}