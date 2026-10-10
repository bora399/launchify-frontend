import Link from 'next/link';

const BRAND_COLOR = "#6366F1";

export default function AboutPage() {
  const steps = [
    {
      step: "01",
      title: "Fikrini Birkaç Cümleyle Anlat",
      desc: "Ürününüzün ne işe yaradığını, hangi problemi çözdüğünü temel kelimelerle girin. Teknik terimlere veya karmaşık brieflere gerek yok."
    },
    {
      step: "02",
      title: "Yapay Zeka Sayfanı İnşa Etsin",
      desc: "Gelişmiş AI motorumuz; sektörünüze uygun çarpıcı başlıkları, pazarlama metinlerini, özellik kartlarını ve tasarımı saniyeler içinde hazırlar."
    },
    {
      step: "03",
      title: "Müşterilerini Topla & Fikrini Doğrula",
      desc: "Oluşan canlı sayfanı hemen sosyal medyada veya hedef kitlenle paylaş. Bekleme listesiyle erken talep toplayarak fikrinin pazar karşılığını gör."
    }
  ];

  const highlights = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Haftalar Değil, Dakikalar",
      desc: "Tasarımcı aramak, yazılımcı beklemek veya şablonlarla günlerce boğuşmak yok. Fikirden çalışan web sitesine 60 saniyede geçin."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sıfır Teknik Bilgi Gereksinimi",
      desc: "Kod yazmayı, sunucu kiralamayı veya alan adı bağlamayı bilmenize gerek yok. Tek tıkla oluşturup hemen kullanabilirsiniz."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Gerçek Müşteri Talebi (Waitlist)",
      desc: "Ürününüze henüz tek bir satır kod yazmadan önce potansiyel alıcıların e-postalarını toplayarak bütçenizi ve zamanınızı koruyun."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#6366F1]/30 selection:text-white relative overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Outfit:wght@400;500;700;800&display=swap');
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

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        <div className="mb-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 font-heading leading-[1.15]">
            Her Büyük Girişim, Doğrulanmış Bir Fikirle Başlar.
          </h1>
          <p className="text-white/60 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Launchify; bir iş fikri, startup veya dijital ürün düşündüğünüzde, haftalarca tasarımcı ve yazılımcı aramadan dakikalar içinde profesyonel bir açılış sayfası kurup gerçek müşterilerin ilgisini ölçmenizi sağlayan yeni nesil bir platformdur.
          </p>
        </div>

        <div className="bg-[#111111]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-60"></div>
          
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6366F1] mb-2 block">
              Çözdüğümüz Temel Problem
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-heading text-white">
              Girişimcilerin En Büyük Hatası: Talep Olmayan Bir Şeyi Aylarca İnşa Etmek.
            </h2>
            <p className="text-white/60 leading-relaxed text-sm sm:text-base font-body mb-6">
              Çoğu insan aklına gelen harika bir proje için hemen para harcar, karmaşık yazılımlar yaptırır ve aylar sonra sitenin açılışını yapar. Sonuç ise genellikle sessizlik olur; çünkü kimsenin o ürünü isteyip istemediği baştan test edilmemiştir.
            </p>
            <p className="text-white/80 leading-relaxed text-sm sm:text-base font-body font-medium">
              Launchify bu süreci tersine çevirir: Önce saniyeler içinde etkileyici bir vitrin açar, ziyaretçilerin e-postalarını toplar ve ürününüzün gerçekten satıp satmayacağını <span className="text-[#6366F1]">daha ilk günden kanıtlar</span>.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-white mb-2">Nasıl Çalışır?</h2>
            <p className="text-white/40 text-sm font-body">Fikrinizi internete taşımak sadece 3 basit adımdan ibarettir.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body">
            {steps.map((item) => (
              <div 
                key={item.step}
                className="bg-[#111111]/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden group hover:border-[#6366F1]/50 transition-all duration-300"
              >
                <div className="text-3xl font-extrabold font-heading text-white/20 mb-4 group-hover:text-[#6366F1] transition-colors">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-heading">{item.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-body mb-20">
          {highlights.map((h, i) => (
            <div 
              key={i}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 flex items-center justify-center mb-4">
                {h.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">{h.title}</h3>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Alt CTA */}
        <div className="bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20" style={{ backgroundColor: BRAND_COLOR }}></div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 font-heading relative z-10">
            Aklınızdaki Fikri Bugün Dünyaya Duyurun
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-8 font-body relative z-10">
            Kredi kartı gerekmez. Sadece fikrinizi yazın ve yapay zekanın ilk açılış sayfanızı hazırlamasını izleyin.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 font-body">
            <Link 
              href="/create" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
              style={{ backgroundColor: BRAND_COLOR, boxShadow: `0 0 25px -5px ${BRAND_COLOR}` }}
            >
              Hemen Sayfa Oluştur
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link 
              href="/" 
              className="w-full sm:w-auto px-6 py-3.5 border border-white/10 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}