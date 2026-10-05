"use client";

import { useState, useEffect } from "react";
import { signInWithPopup, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import iconSvg from "@/app/icon.svg"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ... diğer importlar
  
  // KULLANICI MAİLDEKİ LİNKE TIKLAYIP GELDİ Mİ KONTROLÜ
  useEffect(() => {
    const checkEmailLink = async () => {
      // isSignInWithEmailLink, URL'yi kontrol eder
      if (isSignInWithEmailLink(auth, window.location.href)) {
        setLoading(true);
        let savedEmail = window.localStorage.getItem("emailForSignIn");
        
        if (!savedEmail) {
          savedEmail = window.prompt("Güvenlik onayı için lütfen e-posta adresinizi tekrar girin:");
        }

        if (savedEmail) {
          try {
            await signInWithEmailLink(auth, savedEmail, window.location.href);
            window.localStorage.removeItem("emailForSignIn");
            // GİRİŞ BAŞARILIYSA OTOMATİK DASHBOARD'A ATAN KOD BURASI:
            router.push("/dashboard"); 
          } catch (err: any) {
            setError("Giriş bağlantısı geçersiz veya süresi dolmuş. Lütfen yeni bir bağlantı isteyin.");
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }
    };
    checkEmailLink();
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Google ile giriş yapılamadı.");
      setLoading(false);
    }
  };

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const actionCodeSettings = {
      url: window.location.origin + "/login",
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("Giriş bağlantısı başarıyla gönderildi!");
    } catch (err: any) {
      console.error(err);
      setError("Bağlantı gönderilirken bir hata oluştu. Lütfen geçerli bir e-posta girin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-sans px-4">
      <style dangerouslySetInnerHTML={{__html: `
        .dark-grid-pattern {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}} />
      <div className="absolute inset-0 dark-grid-pattern pointer-events-none z-0"></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8 flex flex-col items-center">
          
          <div className="mb-6 flex justify-center">
            <Image 
              src={iconSvg} 
              alt="Launchify Logo" 
              width={64} 
              height={64} 
              className="drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
              priority
            />
          </div>

          <h1 className="text-3xl font-extrabold text-white font-heading tracking-tight mb-2">
            Hoş Geldiniz
          </h1>
          <p className="text-white/50 text-sm font-body">
            Şifre ezberlemek yok. E-postanızı girin, sihirli bağlantıyı gönderelim.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        {message ? (
          <div className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
            <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 className="text-green-400 font-bold mb-1">{message}</h3>
            <p className="text-white/50 text-xs">
              Lütfen e-posta adresinizi ve spam klasörünüzü kontrol edin. Giriş yapmak için maildeki bağlantıya tıklamanız yeterli.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendLink} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1 ml-1">Email Adresi</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none transition-colors"
                placeholder="ornek@sirket.com"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-white text-black font-bold rounded-xl hover:bg-gray-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                "Giriş Bağlantısı Gönder"
              )}
            </button>
          </form>
        )}

        {!message && (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-xs text-white/30 font-medium uppercase tracking-wider">Veya</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <button 
              onClick={handleGoogleLogin}
              type="button"
              disabled={loading}
              className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google ile devam et
            </button>
          </>
        )}
        
      </div>
    </div>
  );
}