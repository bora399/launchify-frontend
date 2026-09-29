import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Launchify",
  description: "Fikirlerinizi saniyeler içinde dönüşüm odaklı, profesyonel web sayfalarına dönüştüren B2B SaaS platformu.",
  keywords: ["saas", "landing page", "web builder", "ai", "launchify"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen bg-[#050505] text-[#FAFAFA] selection:bg-[#6366F1]/30 selection:text-white overflow-x-hidden`}>
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}