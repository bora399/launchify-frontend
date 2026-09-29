import Link from 'next/link';

const BRAND_COLOR = "#6366F1";

export default function AboutPage() {
  const team = [
    {
      name: 'Bora Saltık',
      role: 'Full Stack Developer',
      github: 'https://github.com/bora399',
      linkedin: 'https://www.linkedin.com/in/bora-saltık-14314820b/'
    },
    {
      name: 'İsmail Aydudu',
      role: 'Full Stack Developer',
      github: 'https://github.com/ismailaydudu',
      linkedin: 'https://www.linkedin.com/in/ismail-aydudu-2a2b5b370/'
    }
  ];

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
      <div className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] opacity-20 blur-[120px] rounded-full pointer-events-none" style={{ backgroundColor: BRAND_COLOR }}></div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-24">
        
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Launchify Ekibi
          </h1>
          <p className="text-white/50 font-body text-lg max-w-2xl mx-auto">
            Modern web standartlarını ve temiz mimariyi bir araya getirerek, Launchify'ı inşa eden geliştiriciler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
          {team.map((member) => (
            <div 
              key={member.name} 
              className="bg-[#111111]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-[#6366F1]/50 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6366F1] to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2 font-heading">{member.name}</h2>
                <p className="mb-8 font-bold tracking-widest uppercase text-xs" style={{ color: BRAND_COLOR }}>
                  {member.role}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-[#6366F1] transition-all text-sm font-bold tracking-wide w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-3 bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1] rounded-xl hover:bg-[#6366F1]/20 hover:border-[#6366F1] transition-all text-sm font-bold tracking-wide w-full sm:w-auto"
                  >
                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center font-body relative z-10">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-white/10 rounded-full text-sm font-bold tracking-wide text-white/50 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}