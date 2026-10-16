"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Logo from "./Logo";

const navLinks = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Özellikler", href: "/#ozellikler" },
  { name: "Sayfa Oluştur", href: "/create" },
  { name: "Hakkımızda", href: "/about" },
  { name: "SSS", href: "/sss" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const desktop = window.matchMedia("(min-width: 1180px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsMobileMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const links = menuPanel.current?.querySelectorAll<HTMLElement>("a, button");
        const first = menuButton.current;
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMobileMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Çıkış yaparken hata:", error);
    }
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      event.preventDefault();
      document.getElementById(href.replace("/#", ""))?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  const systemPrefixes = ["/create", "/about", "/login", "/dashboard", "/sss"];
  const isSystemRoute = pathname === "/" || systemPrefixes.some(prefix => pathname.startsWith(prefix));
  if (!isSystemRoute) return null;

  const accountLinks = (
    <>
      {user ? (
        <>
          <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="site-account-link">Panelim</Link>
          <button type="button" onClick={handleLogout} className="site-logout">Çıkış Yap</button>
          <Link href="/create" onClick={() => setIsMobileMenuOpen(false)} className="site-nav-action">Projeyi Başlat <span aria-hidden="true">↗</span></Link>
        </>
      ) : (
        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="site-nav-action">Giriş Yap <span aria-hidden="true">↗</span></Link>
      )}
    </>
  );

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-header-brand">
            <Logo onClick={() => setIsMobileMenuOpen(false)} />
          </div>
          <nav className="site-desktop-nav" aria-label="Ana gezinme">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={event => handleNavClick(event, link.href)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={pathname === link.href ? "site-nav-link is-active" : "site-nav-link"}>
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="site-desktop-account">{accountLinks}</div>
          <button ref={menuButton} type="button" className="site-menu-toggle"
            onClick={() => setIsMobileMenuOpen(open => !open)}
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation">
            <span>{isMobileMenuOpen ? "Kapat" : "Menü"}</span>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              {isMobileMenuOpen ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </header>
      <nav ref={menuPanel} id="mobile-navigation" aria-label="Mobil gezinme"
        inert={!isMobileMenuOpen} className={`site-mobile-nav ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="site-mobile-links">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={event => handleNavClick(event, link.href)}
              aria-current={pathname === link.href ? "page" : undefined}
              className={pathname === link.href ? "is-active" : undefined}>
              <span className="site-mobile-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <span>{link.name}</span><span className="site-mobile-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className="site-mobile-account">{accountLinks}</div>
      </nav>
    </>
  );
}
