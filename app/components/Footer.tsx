"use client";

import Link from "next/link";

export default function Footer() {
  const brandColor = "#6366F1";

  return (
    <footer className="border-t border-white/5 bg-[#000000] pt-16 pb-8 relative z-10 text-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
          
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm" 
                style={{ backgroundColor: brandColor }}
              >
                L
              </div>
              Launchify.
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Fikirlerinizi saniyeler içinde dönüşüm odaklı, profesyonel web sayfalarına dönüştüren B2B Landing Page motoru.
            </p>
            <div className="flex gap-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
              <a href="https://github.com/bora399" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">GitHub ↗</a>
              <a href="https://tr.linkedin.com/in/bora-saltık-14314820b" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">LinkedIn ↗</a>
            </div>
          </div>

          <div className="flex gap-16 text-sm font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
            <div className="flex flex-col gap-4 text-white/40">
              <h4 className="text-white font-semibold mb-2">Ürün</h4>
              <Link href="/create" className="hover:text-white transition-colors">Hemen Başla</Link>
              <Link href="/#ozellikler" className="hover:text-white transition-colors">CQRS Mimarisi</Link>
              <Link href="#" className="hover:text-white transition-colors">Fiyatlandırma</Link>
            </div>
            <div className="flex flex-col gap-4 text-white/40">
              <h4 className="text-white font-semibold mb-2">Kurumsal</h4>
              <Link href="#" className="hover:text-white transition-colors">Hakkımızda</Link>
              <Link href="#" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
              <Link href="#" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}