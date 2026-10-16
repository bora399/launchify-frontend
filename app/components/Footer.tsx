"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Footer() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const platformPages = ["/", "/create", "/about", "/dashboard", "/sss"];
  if (!platformPages.includes(pathname)) return null;

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      event.preventDefault();
      document.getElementById("ozellikler")?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "/#ozellikler");
    }
  };

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <Logo />
            <p>Ürününüz için bir tanıtım sayfası hazırlayın. Bağlantınızı paylaşın, bekleme listenizi ve ziyaretlerinizi tek yerden takip edin.</p>
          </div>
          <nav className="site-footer-column" aria-label="Ürün bağlantıları">
            <h2>Ürün</h2>
            <Link href="/create">Sayfa oluştur <span aria-hidden="true">↗</span></Link>
            <Link href="/#ozellikler" onClick={handleSmoothScroll}>Özellikler</Link>
            <Link href="/sss">Sıkça sorulan sorular</Link>
          </nav>
          <nav className="site-footer-column" aria-label="Launchify hakkında">
            <h2>Launchify</h2>
            <Link href="/about">Hakkımızda</Link>
          </nav>
          <nav className="site-footer-column" aria-label="Hesap bağlantıları">
            <h2>Hesap</h2>
            {user ? <Link href="/dashboard">Panelim <span aria-hidden="true">↗</span></Link>
              : <Link href="/login">Giriş yap <span aria-hidden="true">↗</span></Link>}
          </nav>
        </div>
        <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} Launchify</p>
          <div className="site-footer-social" aria-label="Sosyal bağlantılar">
            <a href="https://github.com/bora399" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href="https://tr.linkedin.com/in/bora-saltık-14314820b" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
