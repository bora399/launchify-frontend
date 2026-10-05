"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); 
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white/20">
      <nav className="border-b border-white/5 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-heading text-xl font-bold tracking-tight">Launchify Dashboard</Link>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm hidden md:block">{user?.email}</span>
            <img src={user?.photoURL || ""} alt="Profil" className="w-9 h-9 rounded-full border border-white/10" />
            <button onClick={() => signOut(auth)} className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors ml-4">
              Çıkış Yap
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Projelerim</h1>
            <p className="text-white/50 text-sm">Oluşturduğunuz tüm Landing Page'leri buradan yönetebilirsiniz.</p>
          </div>
          <Link href="/create" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-transform flex items-center gap-2">
            + Yeni Proje Oluştur
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
             
             <div className="flex justify-between items-start mb-4">
               <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white mb-4">
                  D
               </div>
               <span className="px-3 py-1 text-xs font-semibold bg-green-500/10 text-green-400 rounded-full border border-green-500/20">Aktif</span>
             </div>

             <h3 className="text-xl font-bold mb-1">deneme19</h3>
             <p className="text-white/40 text-sm mb-6">Şablon: Neo-Brutal</p>
             
             <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <Link href="/deneme19" target="_blank" className="text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors flex-1 text-center">
                  Siteyi Görüntüle
                </Link>
                <button className="p-2 text-white/40 hover:text-white transition-colors bg-white/5 rounded-lg">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
             </div>
          </div>

          {/* 
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
             <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-white/30">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
             </div>
             <h3 className="text-xl font-bold mb-2">Henüz projeniz yok</h3>
             <p className="text-white/40 text-sm mb-6">Hemen ilk yapay zeka destekli sayfanızı oluşturun.</p>
          </div>
          */}

        </div>
      </main>
    </div>
  );
}