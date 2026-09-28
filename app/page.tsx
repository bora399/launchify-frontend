"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BRAND_COLOR = "#6366F1";

export default function LaunchifyHome() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#6366F1]/30 selection:text-white relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Outfit:wght@400;500;700;800;900&display=swap');
        
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
        
        .gradient-text {
          background: linear-gradient(to right, #FAFAFA, #A1A1AA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />

      <div className="absolute inset-0 dark-grid-pattern pointer-events-none z-0 h-[120vh]"></div>
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-15 blur-[120px] rounded-full pointer-events-none" 
        style={{ backgroundColor: BRAND_COLOR }}
      />
      <main className="pt-40 pb-20 relative z-10">
        
        <section className="max-w-7xl mx-auto px-6 text-center mb-32">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-[1.05] text-white mb-8 max-w-5xl mx-auto">
            Fikirlerinizi saniyeler içinde <br className="hidden md:block"/>
            <span className="gradient-text">koda dökün.</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl text-white/50 mb-12 max-w-3xl mx-auto leading-relaxed">
            Sadece ne yapmak istediğinizi anlatın. Gemini AI destekli motorumuz, dönüşüm odaklı B2B arayüzünüzü ve .NET tabanlı altyapınızı anında inşa etsin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/create"
              className="px-8 py-4 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-1 w-full sm:w-auto"
              style={{ backgroundColor: BRAND_COLOR, boxShadow: `0 0 20px -10px ${BRAND_COLOR}` }}
            >
              Ücretsiz Deneyin
            </Link>
            <a 
              href="#ozellikler"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Mimariyi İncele
            </a>
          </div>
        </section>
        <section id="ozellikler" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <div className="mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Teknoloji değil, sonuç üretiyoruz.
            </h2>
            <p className="text-white/50 text-xl font-body max-w-2xl">
              Karmaşık yazılım süreçleriyle zaman kaybetmeyin. Siz sadece iş modelinize odaklanın, Launchify sizin için büyüme motorunu inşa etsin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 border border-white/10 bg-white/5 text-[#6366F1]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-4">Sıfır Teknik Yük</h3>
                <p className="text-white/50 font-body text-base leading-relaxed">
                  Haftalar süren geliştirme süreçlerini unutun. Fikrinizi sisteme girin; güvenli, hatasız ve kurumsal standartlarda bir platform saniyeler içinde yayına girsin.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:bg-white/[0.05] transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 border border-white/10 bg-white/5 text-[#6366F1]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-4">Dönüşüm Odaklı Tasarım</h3>
                <p className="text-white/50 font-body text-base leading-relaxed">
                  Sadece estetik değil, ziyaretçileri müşteriye dönüştürmek üzere psikolojik olarak kurgulanmış, yormayan ve güven veren premium B2B arayüzleri.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: BRAND_COLOR }}></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 border border-white/10 bg-white/5 text-[#6366F1]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white font-heading mb-4">Akıllı Marka Sesi</h3>
                <p className="text-white/50 font-body text-base leading-relaxed">
                  Sistem, sektörünüze ve doğrudan hedef kitlenize özel, yüksek ikna kabiliyetine sahip pazarlama metinlerini otonom olarak üretir.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto rounded-[2.5rem] p-12 md:p-20 text-center border border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 50% 50%, ${BRAND_COLOR}, transparent 60%)` }}></div>
            <div className="absolute inset-0 dark-grid-pattern opacity-50"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Geleceği ertelemeyin.
              </h2>
              <p className="text-xl text-white/50 mb-10 font-body">
                Kendi B2B SaaS platformunuzu kurmak sadece saniyelerinizi alacak. Kurumsal tasarım ve güçlü altyapı bir tık uzağınızda.
              </p>
              <Link 
                href="/create"
                className="px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:scale-105 transition-transform inline-block"
              >
                Projeyi Başlat
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}