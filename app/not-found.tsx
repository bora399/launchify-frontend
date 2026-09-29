import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#6366F1]/30 selection:text-white p-6">
      <div className="fixed inset-0" style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 text-center max-w-lg">
        <div className="text-[8rem] font-extrabold text-white/5 leading-none mb-4 tracking-tighter">404</div>
        <h1 className="text-3xl font-bold mb-4">Bağlantı Koptu</h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          Aradığınız dijital altyapı bulunamadı veya hiç var olmadı. URL'yi kontrol edin veya sisteme geri dönün.
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-colors inline-block"
        >
          Ana Üsse Dön
        </Link>
      </div>
    </div>
  );
}