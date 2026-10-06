"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Image from "next/image";
import iconSvg from "@/app/icon.svg"; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Özellikler", href: "/features" },
    { name: "Platform Üret", href: "/create" },
    { name: "Hakkımızda", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3 z-50 relative" onClick={() => setIsMobileMenuOpen(false)}>
          <Image src={iconSvg} alt="Launchify Logo" width={32} height={32} />
          <span className="text-xl font-extrabold text-white font-heading tracking-tight">Launchify.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-white ${isActive(link.href) ? "text-white" : "text-white/50"}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Panelim
              </Link>
              <Link 
                href="/create" 
                className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl hover:scale-105 transition-all flex items-center gap-2"
                style={{ backgroundColor: "#6366F1", boxShadow: "0 0 20px -5px rgba(99,102,241,0.5)" }}
              >
                Projeyi Başlat <span className="text-lg leading-none">→</span>
              </Link>
            </>
          ) : (
            <Link 
              href="/login" 
              className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Giriş Yap
            </Link>
          )}
        </div>

        {/* MOBİL: HAMBURGER İKONU (Masaüstünde Gizli) */}
        <button 
          className="md:hidden z-50 relative p-2 -mr-2 text-white/70 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

      </div>

      <div 
        className={`fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col pt-24 px-6 md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`border-b border-white/5 pb-4 ${isActive(link.href) ? "text-white" : "text-white/50"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 bg-white/5 border border-white/10 text-center text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
              >
                Panelim
              </Link>
              <Link 
                href="/create" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 text-white text-center font-bold rounded-xl flex items-center justify-center gap-2"
                style={{ backgroundColor: "#6366F1", boxShadow: "0 0 30px -10px rgba(99,102,241,0.5)" }}
              >
                Projeyi Başlat <span className="text-xl leading-none">→</span>
              </Link>
            </>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 bg-white text-black text-center font-bold rounded-xl"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}