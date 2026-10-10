"use client";

import { useState } from "react";
import Link from "next/link";

const BRAND_COLOR = "#6366F1";

const LAUNCHIFY_FAQS = [
  {
    q: "Launchify tam olarak ne işe yarar?",
    a: "Launchify; aklınıza gelen bir SaaS, startup veya dijital ürün fikrini haftalarca yazılımcı ve tasarımcı aramadan dakikalar içinde yüksek dönüşümlü bir web sayfasına dönüştürür. Ürününüzü kodlamadan önce bekleme listesiyle gerçek müşteri talebini test etmenizi sağlar."
  },
  {
    q: "Sayfa oluşturmak için kodlama veya teknik bilgi gerekir mi?",
    a: "Kesinlikle hayır. Yalnızca ürününüzün ne iş yaptığını 1-2 cümleyle açıklamanız yeterlidir. Gemini AI motorumuz vurucu başlıkları, pazarlama metinlerini, özellik kartlarını ve mobil uyumlu tasarımı otomatik olarak hazırlar."
  },
  {
    q: "Toplanan potansiyel müşteri e-postalarını (Leads) nasıl alabilirim?",
    a: "Dashboard paneliniz üzerinden hangi sayfanızdan kaç kişinin kayıt olduğunu anlık olarak görebilir, dönüşüm oranınızı (%) takip edebilir ve tek tıkla tüm e-posta listesini CSV formatında bilgisayarınıza indirebilirsiniz."
  },
  {
    q: "Oluşturduğum sayfanın kodlarını dışa aktarabilir miyim?",
    a: "Evet! Launchify'a bağımlı kalmak zorunda değilsiniz. Dashboard menüsünden 'Kodu Dışa Aktar (.html)' butonuna basarak tek parça, bağımsız HTML ve Tailwind CSS kodunu indirebilir ve istediğiniz sunucuya (Vercel, Netlify, cPanel vb.) yükleyebilirsiniz."
  },
  {
    q: "Ücretsiz oluşturma kredisi nasıl çalışır?",
    a: "Kayıt olan her kullanıcıya ücretsiz proje üretim hakkı tanımlanır. Eğer bir projeyi beğenmez ve Dashboard üzerinden silerseniz, 1 krediniz hesabınıza anında iade edilir."
  }
];

export default function SssPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#6366F1]/30 selection:text-white relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Outfit:wght@400;500;700;800&display=swap');
        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
        .dark-grid-pattern {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}} />

      <div className="fixed inset-0 dark-grid-pattern pointer-events-none z-0"></div>
      <div className="fixed top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] opacity-20 blur-[130px] rounded-full pointer-events-none" style={{ backgroundColor: BRAND_COLOR }}></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-32 pb-24">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/70 mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}></span>
            Yardım Merkezi & Merak Edilenler
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto font-body">
            Launchify altyapısı, yapay zeka ile üretim süreci, lead yönetimi ve kod dışa aktarma hakkında merak ettiğiniz her şey.
          </p>
        </div>

        <div className="space-y-4 font-body mb-16">
          {LAUNCHIFY_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#111111]/80 border border-white/10 rounded-2xl backdrop-blur-xl overflow-hidden transition-all duration-200 hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center text-sm sm:text-base font-bold text-white cursor-pointer select-none"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#6366F1] text-white border-[#6366F1] rotate-180"
                        : "bg-white/5 text-white/60 border-white/10"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-white/60 text-xs sm:text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center font-body">
          <Link 
            href="/create" 
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all shadow-lg"
            style={{ backgroundColor: BRAND_COLOR, boxShadow: `0 0 25px -5px ${BRAND_COLOR}` }}
          >
            Hemen İlk Projeni Başlat →
          </Link>
        </div>

      </div>
    </div>
  );
}