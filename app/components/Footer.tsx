"use client";

import Link from "next/link";
import Logo from './Logo';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Platforma ait sayfalar. URL bu listede yoksa (yani slug sayfasıysa) Footer'ı render etme
  const platformPages = ['/', '/create', '/about'];
  if (!platformPages.includes(pathname)) {
    return null;
  }

  return (
    <footer className="border-t border-white/5 bg-[#000000] pt-16 pb-8 relative z-10 text-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
          
          <div className="max-w-sm">
            <div className="mb-6">
              <Logo />
            </div>
            
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
              <Link 
                href="/#ozellikler" 
                onClick={(e) => {  
                  if (window.location.pathname === '/') {    
                    e.preventDefault();    
                    document.getElementById('ozellikler')?.scrollIntoView({ behavior: 'smooth' });    
                    window.history.pushState(null, '', '/#ozellikler');  
                  }
                }}
                className="hover:text-white transition-colors"
              >
                Özellikler
              </Link>            
            </div>
            <div className="flex flex-col gap-4 text-white/40">
              <h4 className="text-white font-semibold mb-2">Kurumsal</h4>
              <Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}