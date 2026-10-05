"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from './Logo'; 
import { usePathname } from 'next/navigation';
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const brandColor = "#6366F1"; 
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const platformPages = ['/', '/create', '/about', '/dashboard'];
  if (!platformPages.includes(pathname)) {
    return null;
  }

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link href="/"><Logo /></Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50" style={{ fontFamily: "'Manrope', sans-serif" }}>
          <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
          <Link href="/#ozellikler" className="hover:text-white transition-colors">Özellikler</Link>
          <Link href="/create" className="hover:text-white transition-colors">Platform Üret</Link>
          <Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {!user ? (
            <Link href="/login" className="hidden md:block text-white/70 hover:text-white text-sm font-medium transition-colors mr-2">
              Giriş Yap
            </Link>
          ) : (
            <Link href="/dashboard" className="hidden md:block text-white/70 hover:text-white text-sm font-medium transition-colors mr-2">
              Panelim
            </Link>
          )}

          <Link 
            href="/create" 
            className="px-6 py-2.5 text-white text-sm font-semibold rounded-lg transition-all hover:scale-105 flex items-center gap-2" 
            style={{ 
              backgroundColor: brandColor, 
              boxShadow: `0 0 20px -5px ${brandColor}`,
              fontFamily: "'Manrope', sans-serif"
            }}
          >
            Projeyi Başlat
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

      </div>
    </nav>
  );
}