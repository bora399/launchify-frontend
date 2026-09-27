"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "", themeType: "modern", contactEmail: "", adminPin: "", demoLink: "", productDescription: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://localhost:7022/api/LandingPages/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: "demo-user", photos: [], ...formData }),
      });

      const responseText = await response.text();
      let result: any = {};
      
      try { result = JSON.parse(responseText); } 
      catch { result = { id: responseText.replace(/"/g, '').trim() }; }

      if (response.ok) {
        // Ürün adını URL'ye uygun hale getir (Örn: "Landscape Uygulaması" -> "landscape-uygulamasi")
        const generatedSlug = formData.productName
          .toString()
          .toLowerCase()
          .trim()
          .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
          .replace(/[\s\W-]+/g, '-') // Boşlukları ve özel karakterleri tireye çevir
          .replace(/^-+|-+$/g, '');  // Baş ve sondaki fazla tireleri temizle

        // Doğrudan isme (slug) yönlendir
        router.push(`/${generatedSlug}`);
      } else {
        alert("Oluşturma başarısız. API bağlantısını kontrol edin.");
      }
    } catch (error) {
      alert("Sunucu hatası. .NET Backend'in çalıştığından emin olun.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    // ÇÖZÜM BURADA: Bütün flex, justify ve items komutları silindi. 
    // pt-[120px] ile en üste zorunlu ve kesin bir boşluk eklendi.
    <div className="block w-full max-w-3xl mx-auto px-6 pt-[120px] pb-24">
        
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight mb-2">Yeni Proje Oluştur</h1>
        <p className="text-zinc-500">Ürününüzün detaylarını girin, mimariyi AI yönetsin.</p>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Ürün Adı</label>
              <input required type="text" name="productName" onChange={handleChange}
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-md focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 block p-3 outline-none transition-colors"
                placeholder="Örn: Launchify SaaS" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Tasarım Karakteri</label>
              <select name="themeType" onChange={handleChange} className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-md focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 block p-3 outline-none appearance-none cursor-pointer">
                <option value="modern">Modern & Startup</option>
                <option value="classic">Kurumsal & Ciddi</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 mb-2">Ürün Özellikleri (AI Briefi)</label>
            <textarea required name="productDescription" rows={5} onChange={handleChange}
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-md focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 block p-3 outline-none resize-none transition-colors"
              placeholder="Platformunuz hangi problemi çözüyor? Temel özellikleri neler?" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Kurumsal E-Posta</label>
              <input required type="text" name="contactEmail" onChange={handleChange}
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-md focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 block p-3 outline-none transition-colors"
                placeholder="ornek@sirket.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Yönetici PIN</label>
              <input required type="password" name="adminPin" onChange={handleChange}
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-md focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 block p-3 outline-none transition-colors"
                placeholder="••••••••" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-900 mb-2">Demo Linki (Opsiyonel)</label>
            <input type="url" name="demoLink" onChange={handleChange}
              className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-md focus:bg-white focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 block p-3 outline-none transition-colors"
              placeholder="https://..." />
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isLoading}
              className="w-full bg-zinc-900 text-white font-medium text-sm py-4 rounded-md hover:bg-zinc-800 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isLoading ? 'Sistem Derleniyor, Lütfen Bekleyin...' : 'Sistemi Başlat'}
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}