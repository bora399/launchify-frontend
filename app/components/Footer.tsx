"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  // Sadece ana sayfa ve create sayfasında göster
  if (pathname !== "/" && pathname !== "/create") return null;

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-8 mt-auto">
      {/* ... (Önceki footer içeriğinin tamamı aynı kalacak) ... */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold tracking-tight text-zinc-900 mb-4">Launchify.</div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
              Fikirlerinizi saniyeler içinde dönüşüm odaklı, profesyonel web sayfalarına dönüştüren B2B Landing Page motoru.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wider">Ürün</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/create" className="hover:text-zinc-900 transition-colors">Projeyi Başlat</Link></li>
              <li><Link href="/#nasil-calisir" className="hover:text-zinc-900 transition-colors">Nasıl Çalışır?</Link></li>
              <li><a href="https://github.com/bora399/masalimiz-backend" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">CQRS Mimarisi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wider">Şirket</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/#hakkimizda" className="hover:text-zinc-900 transition-colors">Hakkımızda</Link></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Kullanım Koşulları</a></li>
              <li><a href="#" className="hover:text-zinc-900 transition-colors">Gizlilik Politikası</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-4 uppercase tracking-wider">Geliştirici</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="font-medium text-zinc-900">Bora Saltık</li>
              <li><a href="https://tr.linkedin.com/in/bora-saltık-14314820b" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">LinkedIn Profili ↗</a></li>
              <li><a href="https://github.com/bora399" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">GitHub Repoları ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Launchify. Tüm hakları saklıdır.</p>
          <p>Made with Next.js & .NET Core</p>
        </div>
      </div>
    </footer>
  );
}