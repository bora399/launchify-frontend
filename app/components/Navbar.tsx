"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  // Sadece ana sayfa ve create sayfasında göster, diğer tüm dinamik sayfalarda gizle
  if (pathname !== "/" && pathname !== "/create") return null;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          Launchify.
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
          <Link href="/#nasil-calisir" className="hover:text-zinc-900 transition-colors">Nasıl Çalışır?</Link>
          <Link href="/#hakkimizda" className="hover:text-zinc-900 transition-colors">Hakkımızda</Link>
          <a href="https://github.com/bora399/masalimiz-backend" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">
            Backend Mimarisi
          </a>
        </nav>
        
        <Link 
          href="/create" 
          className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Projeyi Başlat
        </Link>
      </div>
    </header>
  );
}