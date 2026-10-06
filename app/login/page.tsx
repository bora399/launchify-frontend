"use client";

import { useState, useEffect } from "react";
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import iconSvg from "@/app/icon.svg"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";

  const syncUserWithBackend = async (user: any) => {
    try {
      await fetch(`${apiUrl}/api/User/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, email: user.email })
      });
    } catch (err) {
      console.error("Backend senkronizasyon hatası:", err);
    }
  };

  useEffect(() => {
    const checkEmailLink = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        setLoading(true);
        let savedEmail = window.localStorage.getItem("emailForSignIn");
        
        if (!savedEmail) {
          savedEmail = window.prompt("Güvenlik onayı için lütfen e-posta adresinizi tekrar girin:");
        }

        if (savedEmail) {
          try {
            const result = await signInWithEmailLink(auth, savedEmail, window.location.href);
            window.localStorage.removeItem("emailForSignIn");
            
            await syncUserWithBackend(result.user);
            
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
  }, [router, apiUrl]);

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
      </div>
    </div>
  );
}