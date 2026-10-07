"use client";

import { useEffect, useState, useRef } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
// YENİ EKLENDİ: Recharts bileşenleri
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BRAND_COLOR = "#6366F1";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.dropdown-container')) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/login");
      else setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;
      try {
        const projRes = await fetch(`${apiUrl}/api/LandingPages/user/${user.uid}`);
        if (projRes.ok) setProjects(await projRes.json());

        const userRes = await fetch(`${apiUrl}/api/User/${user.uid}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          setRemainingCredits(userData.remainingCredits);
        }
      } catch (error) {
        console.error("Bağlantı hatası:", error);
      } finally {
        setProjectsLoading(false);
      }
    };
    if (user) fetchData();
  }, [user, apiUrl]);

  const handleDeleteProject = async () => {
    if (!projectToDelete || !user) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`${apiUrl}/api/LandingPages/${projectToDelete.id}?userId=${user.uid}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(projects.filter(p => p.id !== projectToDelete.id));
        setRemainingCredits(prev => prev !== null ? prev + 1 : prev);
        setProjectToDelete(null);
      } else {
        alert("Proje silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const chartData = projects.map(p => ({
    name: p.productName || p.slug || "İsimsiz",
    Ziyaret: p.TotalVisits || p.totalVisits || 0
  }));
  const totalViews = projects.reduce((sum, p) => sum + (p.TotalVisits || p.totalVisits || 0), 0);

  if (authLoading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <span className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-white/20 relative overflow-hidden pt-32 pb-20">
      
      {projectToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-5 border border-red-500/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 font-heading">Projeyi Kaldır</h3>
            <p className="text-white/50 text-sm mb-6">
              <strong className="text-white">{projectToDelete.productName || projectToDelete.slug}</strong> adlı projeyi kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz ve <strong className="text-green-400">1 krediniz hesabınıza iade edilecektir.</strong>
            </p>
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => setProjectToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                İptal Et
              </button>
              <button 
                onClick={handleDeleteProject}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "Evet, Kaldır"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            
            {remainingCredits !== null && (
              <div className="px-4 py-2.5 bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] text-sm font-bold rounded-xl flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                {remainingCredits} Kredi Kaldı
              </div>
            )}

            <button 
              onClick={() => signOut(auth)} 
              className="px-5 py-2.5 bg-white/5 text-white/50 text-sm font-medium rounded-xl hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-all"
            >
              Çıkış Yap
            </button>
            <Link 
              href="/create" 
              className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl hover:scale-105 transition-all flex items-center gap-2"
              style={{ backgroundColor: "#6366F1", boxShadow: "0 0 20px -5px #6366F1" }}
            >
              + Yeni Proje
            </Link>
          </div>
        </div>

        {projectsLoading ? (
           <div className="flex justify-center items-center py-20">
             <span className="w-8 h-8 border-2 border-[#6366F1]/50 border-t-[#6366F1] rounded-full animate-spin"></span>
           </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center bg-[#0A0A0A]/30 border border-dashed border-white/10 rounded-3xl backdrop-blur-sm">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white/30">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
             </div>
             <h3 className="text-xl font-bold mb-2">Henüz projeniz yok</h3>
             <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">İlk B2B Landing Page'inizi yapay zeka destekli altyapımızla dakikalar içinde oluşturun.</p>
             <Link href="/create" className="inline-flex px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors">
               Projeyi Başlat
             </Link>
          </div>
        ) : (
          <div className="space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#6366F1]"></div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Toplam Platform</p>
                <h3 className="text-4xl font-heading font-extrabold">{projects.length}</h3>
              </div>
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Toplam Ziyaret</p>
                <h3 className="text-4xl font-heading font-extrabold text-green-400">{totalViews}</h3>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold font-heading">Trafik Analizi</h2>
                <p className="text-white/40 text-sm">Projelerinizin anlık görüntülenme metrikleri</p>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={BRAND_COLOR} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={BRAND_COLOR} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.3)" 
                      fontSize={12} 
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0a0a0a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#6366F1', fontWeight: 'bold' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="Ziyaret" 
                      stroke={BRAND_COLOR} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorVisits)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading mb-6">Aktif Platformlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id || project.slug} className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group relative overflow-hidden backdrop-blur-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-white/80 border border-white/10 shadow-inner group-hover:scale-110 transition-transform uppercase">
                          {project.productName ? project.productName.charAt(0) : "P"}
                      </div>
                      <span className="px-3 py-1 text-xs font-semibold bg-green-500/10 text-green-400 rounded-full border border-green-500/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Yayında
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-1 tracking-tight text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {project.productName || project.slug}
                    </h3>
                    <p className="text-white/40 text-sm mb-6 flex items-center gap-2 capitalize">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                        Şablon: {project.templateType || "Bilinmiyor"}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                        <Link href={`/${project.slug}`} target="_blank" className="text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl transition-colors flex-1 text-center border border-white/5 group-hover:border-white/10">
                          Siteyi Görüntüle
                        </Link>
                        
                        <div className="relative dropdown-container">
                          <button 
                            onClick={() => setOpenDropdownId(openDropdownId === project.id ? null : project.id)}
                            className={`p-2.5 hover:text-white transition-colors rounded-xl border border-white/5 ${openDropdownId === project.id ? 'bg-white/10 text-white' : 'bg-white/5 text-white/40 hover:bg-white/10'}`} 
                            title="Ayarlar"
                          >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                          </button>

                          {openDropdownId === project.id && (
                            <div className="absolute right-0 bottom-full mb-2 w-40 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                              <Link href={`/${project.slug}`} target="_blank" className="flex items-center gap-2 w-full px-4 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                Siteyi İncele
                              </Link>
                              <div className="h-px bg-white/5 w-full"></div>
                              <button 
                                onClick={() => {
                                  setProjectToDelete(project);
                                  setOpenDropdownId(null);
                                }}
                                className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                Kaldır
                              </button>
                            </div>
                          )}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}