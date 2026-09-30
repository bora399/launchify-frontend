"use client";

import Link from "next/link";

interface ProjectData {
  productName: string;
  aiGeneratedHeroTitle: string;
  aiGeneratedMarketingCopy: string;
  accentColor: string;
  demoLink?: string | null; // TypeScript'in null değerine kızmasını engelledik
}

const DEFAULT_ACCENT_COLOR = "#3B82F6";

export default function LandingPageClient({ data }: { data: ProjectData }) {
  const btnColor = data.accentColor || DEFAULT_ACCENT_COLOR;
  // Eğer ürün adı veritabanından kazara boş gelirse sayfanın çökmesini önleyen güvenlik ağı
  const safeProductName = data.productName || "Platform"; 

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white/20 selection:text-white relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Outfit:wght@400;500;700;800&display=swap');
        
        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
        
        .dark-grid-pattern {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%);
        }
      `}} />

      <div className="absolute inset-0 dark-grid-pattern pointer-events-none z-0 h-screen"></div>
      
      <nav className="fixed w-full top-0 z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xl font-bold tracking-tight text-white font-heading">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]" style={{ backgroundColor: btnColor }}>
              {safeProductName.charAt(0).toUpperCase()}
            </div>
            {safeProductName}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/40 mr-2 border border-white/10 px-3 py-1.5 rounded-full bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ backgroundColor: btnColor, color: btnColor }}></span>
              Live
            </div>
            <button className="hidden md:block text-sm font-medium text-white/60 hover:text-white transition-colors">
              Login
            </button>
            <button 
              className="px-5 py-2.5 text-white text-sm font-medium rounded-lg transition-all hover:scale-105" 
              style={{ backgroundColor: btnColor, boxShadow: `0 0 20px -5px ${btnColor}` }}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 md:pt-40 relative z-10">
        
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start relative z-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm font-medium mb-8 backdrop-blur-md">
                Infrastructure Ready
              </div>
              
              <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter leading-[1.05] text-white mb-8">
                {data.aiGeneratedHeroTitle}
              </h1>
              
              <p className="font-body text-xl text-white/50 mb-12 max-w-2xl leading-relaxed">
                {data.aiGeneratedMarketingCopy}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button 
                  className="w-full sm:w-auto px-8 py-4 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.5)] hover:-translate-y-1"
                  style={{ backgroundColor: btnColor, boxShadow: `0 0 20px -10px ${btnColor}` }}
                >
                  Start Free Trial
                </button>
                
                {data.demoLink && (
                  <a 
                    href={data.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    View Demo
                  </a>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-5 relative hidden lg:block h-[500px]">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20 blur-[100px] rounded-full pointer-events-none" 
                style={{ backgroundColor: btnColor }}
              />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] rounded-2xl border border-white/10 bg-[#111111]/80 backdrop-blur-2xl shadow-2xl p-6 flex flex-col gap-4 transform rotate-y-[-15deg] perspective-[1000px] hover:rotate-y-0 transition-transform duration-700">
                <div className="w-full flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
                  <div className="w-24 h-4 rounded-full bg-white/10"></div>
                </div>
                <div className="w-3/4 h-8 rounded-lg bg-white/5 mt-4"></div>
                <div className="w-1/2 h-4 rounded-lg bg-white/5"></div>
                <div className="mt-auto w-full h-32 rounded-xl border border-white/5 bg-gradient-to-t from-white/5 to-transparent relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-30" style={{ background: `linear-gradient(to top, ${btnColor}, transparent)` }}></div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-t border-white/5">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Neden {safeProductName}?
            </h2>
            <p className="text-white/50 text-lg font-body max-w-xl">
              Alışılmış standartların ötesinde, doğrudan büyümenize odaklanan yenilikçi çözüm mimarisi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 flex flex-col justify-between overflow-hidden relative group hover:border-white/20 transition-colors">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10 bg-white/5" style={{ color: btnColor }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-heading mb-4">Operasyonel Mükemmellik</h3>
                <p className="text-white/50 max-w-md font-body text-lg leading-relaxed">
                  İş yükünüzü hafifleten, süreçleri otomatize eden ve verimliliği en üst düzeye çıkaran akıllı sistem tasarımı.
                </p>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 blur-[80px] opacity-20 transition-opacity duration-500 group-hover:opacity-40" style={{ backgroundColor: btnColor }}></div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 flex flex-col justify-center relative group hover:border-white/20 transition-colors">
              <div className="relative z-10">
                <h3 className="text-5xl font-bold font-heading mb-2 text-white" style={{ textShadow: `0 0 40px ${btnColor}80` }}>
                  {new Date().getFullYear()}
                </h3>
                <p className="text-white/50 font-body text-sm uppercase tracking-widest">Modern Standartlar</p>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-white/70 font-body text-base">Güvenli, hızlı ve sürekli güncel kalan altyapı mimarisi.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at 100% 50%, ${btnColor}, transparent)` }}></div>
              <div className="relative z-10 max-w-xl">
                <h3 className="text-3xl font-bold text-white font-heading mb-4">{safeProductName} ile tanışın.</h3>
                <p className="text-white/50 font-body text-lg">Hemen şimdi yerinizi alın ve sektörünüzdeki dijital dönüşüme liderlik edin.</p>
              </div>
              <button className="relative z-10 px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:scale-105 transition-transform shrink-0 w-full md:w-auto">
                Hesap Oluştur
              </button>
            </div>

          </div>
        </section>

      </main>

      <footer className="border-t border-white/10 bg-[#000000] pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
            
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4 font-heading">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" style={{ backgroundColor: btnColor }}>
                  {safeProductName.charAt(0).toUpperCase()}
                </div>
                {safeProductName}
              </div>
              <p className="text-sm text-white/40 max-w-xs font-body leading-relaxed">
                İşletmeler için yüksek performanslı dijital altyapı çözümleri.
              </p>
            </div>

            <div className="flex gap-16 text-sm font-medium">
              <div className="flex flex-col gap-4 text-white/40 font-body">
                <a href="#" className="hover:text-white transition-colors">Features</a>
                <a href="#" className="hover:text-white transition-colors">Documentation</a>
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
              </div>
              <div className="flex flex-col gap-4 text-white/40 font-body">
                <a href="#" className="hover:text-white transition-colors">About Us</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
              </div>
            </div>
            
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-white/30 font-body">
            <p>© {new Date().getFullYear()} {safeProductName}. Tüm hakları saklıdır.</p>
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-white/40"></span>
              Powered by Launchify
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}