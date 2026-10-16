"use client";
import { authenticatedFetch } from "@/app/utils/authenticatedFetch";

import { useEffect, useState, type CSSProperties } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createPortal } from "react-dom";
import SortableProjectGrid from "../components/SortableProjectGrid";
import ShareModal from "../components/ShareModal";
import EditModal from "../components/EditModal";
import { exportProjectAsHtml } from "../utils/exportHtml";

const BRAND_COLOR = "#a49af5";

interface WaitlistEntry {
  id: string;
  pageId: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedProjectForLeads, setSelectedProjectForLeads] = useState<any | null>(null);
  const [leads, setLeads] = useState<WaitlistEntry[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  const [projectLeadsCount, setProjectLeadsCount] = useState<Record<string, number>>({});

  const router = useRouter();
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://launchify-backend-3a7w.onrender.com";

  const [mounted, setMounted] = useState(false);
  const [projectToShare, setProjectToShare] = useState<any | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<any | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".dropdown-container")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
    if (selectedProjectForLeads || projectToDelete || projectToEdit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProjectForLeads, projectToDelete, projectToEdit]);

  useEffect(() => {
    if (!user?.uid) return;

    const projectsCacheKey = `launchify_projects_${user.uid}`;
    const creditsCacheKey = `launchify_credits_${user.uid}`;
    const leadsCountCacheKey = `launchify_leads_count_${user.uid}`;

    try {
      const cachedProjects = localStorage.getItem(projectsCacheKey);
      const cachedCredits = localStorage.getItem(creditsCacheKey);
      const cachedLeadsCount = localStorage.getItem(leadsCountCacheKey);

      if (cachedProjects) {
        setProjects(JSON.parse(cachedProjects));
        setProjectsLoading(false); // Spinner'ı anında kapat!
      }
      if (cachedCredits !== null) {
        setRemainingCredits(JSON.parse(cachedCredits));
      }
      if (cachedLeadsCount) {
        setProjectLeadsCount(JSON.parse(cachedLeadsCount));
      }
    } catch (e) {
      console.warn("Önbellek okunamadı:", e);
    }

    const fetchData = async () => {
      setIsSyncing(true);
      try {
        const [projRes, userRes] = await Promise.all([
          authenticatedFetch(`${apiUrl}/api/LandingPages/user/${user.uid}`),
          authenticatedFetch(`${apiUrl}/api/User/${user.uid}`),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setRemainingCredits(userData.remainingCredits);
          localStorage.setItem(creditsCacheKey, JSON.stringify(userData.remainingCredits));
        }

        if (projRes.ok) {
          const projData = await projRes.json();
          setProjects(projData);
          localStorage.setItem(projectsCacheKey, JSON.stringify(projData));

          const countsEntries = await Promise.all(
            projData.map(async (p: any) => {
              try {
                const lRes = await authenticatedFetch(`${apiUrl}/api/Waitlist/${p.id}`);
                if (lRes.ok) {
                  const lData = await lRes.json();
                  return [p.id, Array.isArray(lData) ? lData.length : 0] as const;
                }
              } catch {}
              return [p.id, 0] as const;
            })
          );

          const countsMap = Object.fromEntries(countsEntries);
          setProjectLeadsCount(countsMap);
          localStorage.setItem(leadsCountCacheKey, JSON.stringify(countsMap));
        }
      } catch (error) {
        console.error("Bağlantı hatası:", error);
      } finally {
        setProjectsLoading(false);
        setIsSyncing(false);
      }
    };

    fetchData();
  }, [user, apiUrl]);

  const handleDeleteProject = async () => {
    if (!projectToDelete || !user) return;
    setIsDeleting(true);

    try {
      const res = await authenticatedFetch(
        `${apiUrl}/api/LandingPages/${projectToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        const updatedProjects = projects.filter((p) => p.id !== projectToDelete.id);
        setProjects(updatedProjects);
        localStorage.setItem(`launchify_projects_${user.uid}`, JSON.stringify(updatedProjects));

        setRemainingCredits((prev) => {
          const next = prev !== null ? prev + 1 : prev;
          if (next !== null) {
            localStorage.setItem(`launchify_credits_${user.uid}`, JSON.stringify(next));
          }
          return next;
        });

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

  const handleOpenLeads = async (project: any) => {
    setSelectedProjectForLeads(project);
    setOpenDropdownId(null);
    setLeadsLoading(true);

    try {
      const res = await authenticatedFetch(`${apiUrl}/api/Waitlist/${project.id}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
        setProjectLeadsCount((prev) => {
          const updated = { ...prev, [project.id]: data.length };
          if (user?.uid) {
            localStorage.setItem(`launchify_leads_count_${user.uid}`, JSON.stringify(updated));
          }
          return updated;
        });
      } else {
        setLeads([]);
      }
    } catch (error) {
      console.error("Waitlist verileri çekilemedi:", error);
      setLeads([]);
    } finally {
      setLeadsLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    if (leads.length === 0 || !selectedProjectForLeads) return;

    const headers = "ID,Email,KayitTarihi\n";
    const rows = leads
      .map(
        (entry) =>
          `"${entry.id}","${entry.email}","${new Date(entry.createdAt).toLocaleString("tr-TR")}"`,
      )
      .join("\n");

    const blob = new Blob([headers + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `waitlist_${selectedProjectForLeads.slug || selectedProjectForLeads.id}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartData = projects.map((p) => ({
    name: p.productName || p.slug || "İsimsiz",
    Ziyaret: p.TotalVisits || p.totalVisits || 0,
  }));

  const totalViews = projects.reduce(
    (sum, p) => sum + (p.TotalVisits || p.totalVisits || 0),
    0,
  );

  const totalLeadsCollected = Object.values(projectLeadsCount).reduce(
    (sum, count) => sum + count,
    0,
  );

  const conversionRate =
    totalViews > 0
      ? ((totalLeadsCollected / totalViews) * 100).toFixed(1)
      : "0.0";

  if (authLoading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
      </div>
    );

  return (
    <div className="workspace-page min-h-screen bg-[#08090d] text-[#FAFAFA] font-sans relative pt-32 pb-20">
      {/* Proje Silme Modalı */}
      {mounted &&
        projectToDelete &&
        createPortal(
          <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div
              className="fixed inset-0"
              onClick={() => !isDeleting && setProjectToDelete(null)}
            />

            <div role="dialog" aria-modal="true" aria-label="Projeyi kaldır"
              className="workspace-dialog relative z-10 bg-[#111111] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-5 border border-red-500/20">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </div>

              <h3 className="text-xl font-bold mb-2 font-heading text-white">
                Projeyi Kaldır
              </h3>

              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                <strong className="text-white">
                  {projectToDelete.productName || projectToDelete.slug}
                </strong>{" "}
                adlı projeyi kalıcı olarak silmek istediğinize emin misiniz? Bu
                işlem geri alınamaz ve{" "}
                <strong className="text-emerald-400">
                  1 krediniz hesabınıza iade edilecektir.
                </strong>
              </p>

              <div className="flex items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setProjectToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white font-medium hover:bg-white/10 transition-colors disabled:opacity-50 text-sm cursor-pointer"
                >
                  İptal Et
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProject}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-lg shadow-red-500/20 cursor-pointer"
                >
                  {isDeleting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Evet, Kaldır"
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {mounted &&
        selectedProjectForLeads &&
        createPortal(
          <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
            <div
              className="fixed inset-0"
              onClick={() => setSelectedProjectForLeads(null)}
            />

            <div role="dialog" aria-modal="true" aria-label="Toplanan talepler"
              className="workspace-dialog relative z-10 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
              <div className="flex justify-between items-start mb-6 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold font-heading text-white">
                      Toplanan Talepler (Leads)
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold border border-[#6366F1]/20">
                      {leads.length} Kayıt
                    </span>
                  </div>
                  <p className="text-white/40 text-xs">
                    <strong className="text-white/70">
                      {selectedProjectForLeads.productName ||
                        selectedProjectForLeads.slug}
                    </strong>{" "}
                    projesine kayıt olan potansiyel müşteriler.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProjectForLeads(null)}
                  className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  title="Kapat"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 min-h-[160px]">
                {leadsLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <span className="w-8 h-8 border-2 border-[#6366F1]/50 border-t-[#6366F1] rounded-full animate-spin"></span>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="text-center py-14 bg-white/[0.02] border border-dashed border-white/5 rounded-2xl">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-3 text-white/30">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm font-medium">
                      Henüz toplanan e-posta yok
                    </p>
                    <p className="text-white/30 text-xs mt-1">
                      Ziyaretçiler form doldurdukça burada listelenecek.
                    </p>
                  </div>
                ) : (
                  <div className="border border-white/5 rounded-2xl overflow-x-auto bg-white/[0.01]">
                    <table className="w-full text-left text-xs sm:text-sm text-gray-300 min-w-[280px]">
                      <thead className="border-b border-white/10 text-[11px] sm:text-xs text-white/40 uppercase bg-white/[0.02] sticky top-0 backdrop-blur-md">
                        <tr>
                          <th className="py-2.5 px-3 sm:py-3 sm:px-4 font-semibold">
                            E-posta
                          </th>
                          <th className="py-2.5 px-3 sm:py-3 sm:px-4 text-right font-semibold">
                            Kayıt Tarihi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {leads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="hover:bg-white/[0.03] transition-colors"
                          >
                            <td className="py-2.5 px-3 sm:py-3 sm:px-4 font-medium text-white break-all">
                              {lead.email}
                            </td>
                            <td className="py-2.5 px-3 sm:py-3 sm:px-4 text-right text-white/40 text-[11px] sm:text-xs whitespace-nowrap">
                              {new Date(lead.createdAt).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end gap-3 items-center shrink-0">
                <button
                  onClick={() => setSelectedProjectForLeads(null)}
                  className="px-5 py-2.5 bg-white/5 text-white/60 hover:text-white rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Kapat
                </button>
                {leads.length > 0 && (
                  <button
                    onClick={handleDownloadCSV}
                    className="px-5 py-2.5 bg-[#6366F1] hover:bg-[#5558E6] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#6366F1]/20 cursor-pointer"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    CSV İndir
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}

      {mounted && projectToShare && (
        <ShareModal
          isOpen={!!projectToShare}
          onClose={() => setProjectToShare(null)}
          project={projectToShare}
        />
      )}

      {mounted && projectToEdit && (
        <EditModal
          isOpen={!!projectToEdit}
          onClose={() => setProjectToEdit(null)}
          project={projectToEdit}
          onUpdated={(updated) => {
            const updatedList = projects.map((p) =>
              p.id === updated.id ? updated : p,
            );
            setProjects(updatedList);
            if (user?.uid) {
              localStorage.setItem(
                `launchify_projects_${user.uid}`,
                JSON.stringify(updatedList),
              );
            }
          }}
        />
      )}

      <main className="workspace-container relative z-10">
        <div className="workspace-header flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <div className="workspace-heading-row flex items-center gap-3 mb-2">
              <h1 className="workspace-title">Projelerim</h1>
              {isSyncing && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-white/40 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-ping"></span>
                  Senkronize ediliyor
                </span>
              )}
            </div>
            <p className="text-white/50 text-sm">
              <span className="text-white/80 mr-1 font-medium">
                {user?.email}
              </span>{" "}
              hesabına ait projeleri yönetiyorsunuz.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
            {remainingCredits !== null && (
              <div className="workspace-credits px-4 py-2.5 border text-sm rounded-xl flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
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
              className="workspace-create px-5 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center gap-2"
              style={{
                backgroundColor: "#a49af5",
                color: "#19132d",
              }}
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
          <div className="workspace-empty py-20 text-center border border-dashed border-white/10 rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white/30">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="23" x2="12" y2="15"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Henüz projeniz yok</h3>
            <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
              İlk B2B Landing Page&apos;inizi yapay zeka destekli altyapımızla
              dakikalar içinde oluşturun.
            </p>
            <Link
              href="/create"
              className="inline-flex px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Projeyi Başlat
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="workspace-metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#6366F1]"></div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                  Toplam sayfa
                </p>
                <h3 className="text-4xl font-heading font-extrabold">
                  {projects.length}
                </h3>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                  Toplam Ziyaret
                </p>
                <h3 className="text-4xl font-heading font-extrabold text-green-400">
                  {totalViews}
                </h3>
              </div>

              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden backdrop-blur-xl sm:col-span-2 lg:col-span-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                <div className="flex items-center justify-between">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                    Dönüşüm Oranı
                  </p>
                  <span className="text-[11px] font-bold text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                    {totalLeadsCollected} Talep
                  </span>
                </div>
                <h3 className="text-4xl font-heading font-extrabold text-amber-300">
                  %{conversionRate}
                </h3>
              </div>
            </div>

            {/* GRAFİK */}
            <div className="workspace-chart bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden">
              <div className="mb-6">
                <h2 className="text-xl font-bold font-heading">
                  Proje ziyaretleri
                </h2>
                <p className="text-white/40 text-sm">
                  Sayfalarınızın toplam ziyaret sayılarını karşılaştırın.
                </p>
              </div>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorVisits"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={BRAND_COLOR}
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={BRAND_COLOR}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
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
                      contentStyle={{
                        backgroundColor: "#0a0a0a",
                        borderColor: "rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#b5abff", fontWeight: "500" }}
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
              <h2 className="text-xl font-bold font-heading mb-6">
                Sayfalarınız
              </h2>
              <SortableProjectGrid key={user?.uid} projects={projects} userId={user?.uid} renderProject={(project) => (
                  <div
                    key={project.id || project.slug}
                    className={`workspace-project bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all group relative backdrop-blur-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] ${
                      openDropdownId === project.id ? "z-40" : "z-10"
                    }`}
                  >
                    <div className={`workspace-preview workspace-preview--${String(project.templateType || "aurora").toLowerCase()}`}
                      style={{ "--preview-accent": project.aiConfig?.accentColor || "#a49af5" } as CSSProperties} aria-hidden="true">
                      <div className="workspace-preview-top"><span>{project.productName || project.slug}</span><span>↗</span></div>
                      <div className="workspace-preview-type">{project.aiConfig?.aiGeneratedHeroTitle || project.productName || project.slug}</div>
                      <div className="workspace-preview-art"><span /><i /></div>
                      <span className="workspace-preview-label">{project.templateType || "Aurora"}</span>
                    </div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-white/80 border border-white/10 shadow-inner group-hover:scale-105 transition-transform uppercase">
                        {project.productName
                          ? project.productName.charAt(0)
                          : "P"}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setProjectToEdit(project)}
                          className="group/edit px-3 py-1 text-[11px] font-medium bg-white/5 hover:bg-[#6366F1]/15 text-white/70 hover:text-white border border-white/10 hover:border-[#6366F1]/40 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                          title="Sayfa içerik ve tasarımını düzenle"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/50 group-hover/edit:text-[#6366F1] transition-colors"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                          </svg>
                          <span>Düzenle</span>
                        </button>

                        <span
                          className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 flex items-center gap-1.5"
                          title="Proje canlıda yayında"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          Yayında
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-1 tracking-tight text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {project.productName || project.slug}
                    </h3>

                    <div className="flex items-center justify-between text-white/40 text-xs mb-6">
                      <span className="capitalize">
                        Şablon: {project.templateType || "Bilinmiyor"}
                      </span>
                      {projectLeadsCount[project.id] !== undefined &&
                        projectLeadsCount[project.id] > 0 && (
                          <span className="text-amber-400/90 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                            {projectLeadsCount[project.id]} Talep
                          </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                      <Link
                        href={`/${project.slug}`}
                        target="_blank"
                        className="text-sm font-medium bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl transition-colors flex-1 text-center border border-white/5 group-hover:border-white/10"
                      >
                        Siteyi Görüntüle
                      </Link>

                      <div className="relative dropdown-container">
                        <button
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === project.id ? null : project.id,
                            )
                          }
                          className={`p-2.5 hover:text-white transition-colors rounded-xl border border-white/5 cursor-pointer ${openDropdownId === project.id ? "bg-white/10 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"}`}
                          title="Ayarlar"
                          aria-label={`${project.productName || project.slug} işlemleri`}
                          aria-expanded={openDropdownId === project.id}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                          </svg>
                        </button>

                        {openDropdownId === project.id && (
                          <div className="absolute right-0 bottom-full mb-2 w-52 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-from-bottom-2 duration-150 p-1.5 backdrop-blur-xl">
                            <button
                              onClick={() => handleOpenLeads(project)}
                              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left font-medium cursor-pointer"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-[#6366F1] shrink-0"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              <span>Toplanan Talepler</span>
                            </button>

                            <Link
                              href={`/${project.slug}`}
                              target="_blank"
                              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left font-medium"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-white/40 shrink-0"
                              >
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                              <span>Siteyi İncele</span>
                            </Link>

                            <button
                              onClick={() => {
                                setProjectToShare(project);
                                setOpenDropdownId(null);
                              }}
                              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left font-medium cursor-pointer"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-white/40 shrink-0"
                              >
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line
                                  x1="8.59"
                                  y1="13.51"
                                  x2="15.42"
                                  y2="17.49"
                                ></line>
                                <line
                                  x1="15.41"
                                  y1="6.51"
                                  x2="8.59"
                                  y2="10.49"
                                ></line>
                              </svg>
                              <span>Paylaş & QR Kod</span>
                            </button>

                            <button
                              onClick={() => {
                                exportProjectAsHtml(project);
                                setOpenDropdownId(null);
                              }}
                              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left font-medium cursor-pointer"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-white/40 shrink-0"
                              >
                                <polyline points="16 18 22 12 16 6"></polyline>
                                <polyline points="8 6 2 12 8 18"></polyline>
                              </svg>
                              <span>HTML Olarak İndir</span>
                            </button>

                            <div className="h-px bg-white/5 my-1 w-full"></div>

                            <button
                              onClick={() => {
                                setProjectToDelete(project);
                                setOpenDropdownId(null);
                              }}
                              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors text-left font-medium cursor-pointer"
                            >
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-red-400 shrink-0"
                              >
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7c-1 0-2-1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                              <span>Projeyi Kaldır</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}