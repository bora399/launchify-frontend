"use client";

import Link from 'next/link';

export default function Logo() {
  return (
    <Link 
      href="/" 
      onClick={(e) => {
        if (window.location.pathname === '/') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', '/');
        }
      }}
      className="flex items-center gap-3 group"
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 group-hover:bg-[#6366F1]/20 group-hover:border-[#6366F1]/50 group-hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.4)] transition-all duration-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 22L12 17L22 22L12 2Z" fill="url(#logo-gradient)" />
          <path d="M12 2L22 22L12 17V2Z" fill="#ffffff" fillOpacity="0.3" />
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="1" stopColor="#4ADE80" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-white/80 transition-colors duration-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
        Launchify<span className="text-[#6366F1]">.</span>
      </span>
    </Link>
  );
}