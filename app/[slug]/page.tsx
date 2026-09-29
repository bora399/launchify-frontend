import { Metadata } from 'next';
import LandingPageClient from './LandingPageClient';

interface ProjectData {
  productName: string;
  aiGeneratedHeroTitle: string;
  aiGeneratedMarketingCopy: string;
  accentColor: string;
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
    
    const productName = data.productName || data.ProductName;
    const heroTitle = data.aiGeneratedHeroTitle || data.AiGeneratedHeroTitle;

    return {
      title: `${productName} | Launchify Generated`,
      description: heroTitle,
      openGraph: {
        title: productName,
        description: heroTitle,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Platform Bulunamadı | Launchify',
    };
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
        demoLink: fetchedData.demoLink || fetchedData.DemoLink,
      };
    }
  } catch (error) {
    console.error("Veri çekilirken hata oluştu:", error);
  }
  
  if (!projectData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white p-6">
        <div className="border border-white/10 bg-white/5 p-8 max-w-lg text-center rounded-2xl backdrop-blur-md">
          <h1 className="text-2xl font-bold mb-3 tracking-tight">404 - Not Found</h1>
          <p className="text-white/50 text-sm">Platform bulunamadı veya yapılandırma henüz tamamlanmadı.</p>
        </div>
      </div>
    );
  }

  return <LandingPageClient data={projectData} />;
}