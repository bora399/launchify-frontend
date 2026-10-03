import { Metadata } from 'next';
import TemplateBrutal from '../components/templates/Brutal';
import TemplateMinimal from '../components/templates/Minimal';
import TemplateCorporate from '../components/templates/Corporate';
import TemplateAurora from '../components/templates/Aurora';

interface ProjectData {
  productName: string;
  aiGeneratedHeroTitle: string;
  aiGeneratedMarketingCopy: string;
  accentColor: string;
  templateType: string;
  demoLink?: string;
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
      projectData = {
      productName: fetchedData.productName || fetchedData.ProductName || "Platform",
      aiGeneratedHeroTitle: fetchedData.aiGeneratedHeroTitle || fetchedData.AiGeneratedHeroTitle || "Vizyonunuzu Hayata Geçirin.",
      aiGeneratedMarketingCopy: fetchedData.aiGeneratedMarketingCopy || fetchedData.AiGeneratedMarketingCopy || "Yeni nesil altyapı çözümleri.",
      accentColor: fetchedData.accentColor || fetchedData.AccentColor || DEFAULT_ACCENT_COLOR,
          
      templateType: (fetchedData.templateType || fetchedData.TemplateType || fetchedData.themeType || fetchedData.ThemeType || "aurora").toLowerCase(),
          
      demoLink: fetchedData.demoLink ?? fetchedData.DemoLink ?? undefined,
    };
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

  // BURASI EN ÖNEMLİ KISIM: Gelen isme göre doğru bileşeni ekrana basar.
  // Senin eski LandingPageClient'ı kullanmayı BIRAKIYORUZ.
  switch (projectData.templateType) {
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
}