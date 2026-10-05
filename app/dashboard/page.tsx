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

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <span className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white/20 relative overflow-hidden pt-32 pb-20">
      
      <style dangerouslySetInnerHTML={{__html: `
        .dark-grid-pattern {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}} />
      <div className="absolute inset-0 dark-grid-pattern pointer-events-none z-0"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-[#0A0A0A]/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Projelerim</h1>
            <p className="text-white/50 text-sm">
              <span className="text-white/80 mr-1 font-medium">{user?.email}</span> 
              hesabına ait projeleri yönetiyorsunuz.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => signOut(auth)} 
              className="px-5 py-2.5 bg-white/5 text-white/50 text-sm font-medium rounded-xl hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-all w-full md:w-auto"
            >
              Çıkış Yap
            </button>
            <Link 
              href="/create" 
              className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 w-full md:w-auto"
              style={{ backgroundColor: "#6366F1", boxShadow: "0 0 20px -5px #6366F1" }}
            >
              + Yeni Proje
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group relative overflow-hidden backdrop-blur-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
             
             <div className="flex justify-between items-start mb-6">
               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-white/80 border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
               </div>
               <span className="px-3 py-1 text-xs font-semibold bg-green-500/10 text-green-400 rounded-full border border-green-500/20 flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                 Yayında
               </span>
             </div>

             <h3 className="text-xl font-bold mb-1 tracking-tight text-white group-hover:text-blue-400 transition-colors">deneme19</h3>
             <p className="text-white/40 text-sm mb-6 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                Şablon: Neo-Brutal
             </p>
             
             <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <Link href="/deneme19" target="_blank" className="text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl transition-colors flex-1 text-center border border-white/5 group-hover:border-white/10">
                  Siteyi Görüntüle
                </Link>
                <button className="p-2.5 text-white/40 hover:text-white hover:bg-white/10 transition-colors bg-white/5 rounded-xl border border-white/5" title="Ayarlar">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                </button>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}