"use client";
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// Şablon bileşenlerini import ediyoruz
import Aurora from "./templates/Aurora";
import Brutal from "./templates/Brutal";
import Corporate from "./templates/Corporate";
import Minimal from "./templates/Minimal";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onUpdated: (updatedProject: any) => void;
}

const TEMPLATES = ["Aurora", "Brutal", "Corporate", "Minimal"];
const ACCENT_PRESETS = ["#6366F1", "#10B981", "#EC4899", "#3B82F6", "#F59E0B", "#8B5CF6"];

export default function EditModal({ isOpen, onClose, project, onUpdated }: EditModalProps) {
  const ai = project?.aiConfig || project?.AiConfig || {};
  
  const [productName, setProductName] = useState(project?.productName || "");
  const [templateType, setTemplateType] = useState(project?.templateType || "Aurora");
  const [heroTitle, setHeroTitle] = useState(ai.aiGeneratedHeroTitle || ai.AiGeneratedHeroTitle || "");
  const [marketingCopy, setMarketingCopy] = useState(ai.aiGeneratedMarketingCopy || ai.AiGeneratedMarketingCopy || "");
  const [ctaText, setCtaText] = useState(ai.callToActionText || ai.CallToActionText || "");
  const [accentColor, setAccentColor] = useState(ai.accentColor || ai.AccentColor || "#6366F1");
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const previewData = {
    ...project,
    productName,
    templateType,
    aiConfig: {
      ...ai,
      aiGeneratedHeroTitle: heroTitle,
      aiGeneratedMarketingCopy: marketingCopy,
      callToActionText: ctaText,
      accentColor,
      features: ai.features || ai.Features || []
    }
  };

  const renderTemplatePreview = () => {
    switch (templateType) {
      case "Brutal":
        return <Brutal data={previewData} />;
      case "Corporate":
        return <Corporate data={previewData} />;
      case "Minimal":
        return <Minimal data={previewData} />;
      case "Aurora":
      default:
        return <Aurora data={previewData} />;
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";

    try {
      const res = await fetch(`${apiUrl}/api/LandingPages/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          templateType,
          heroTitle,
          marketingCopy,
          callToActionText: ctaText,
          accentColor
        })
      });

      if (res.ok) {
        onUpdated(previewData);
        onClose();
      } else {
        alert("Güncelleme sırasında bir hata oluştu.");
      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      alert("Sunucuya bağlanılamadı.");
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6">
      {/* Arka plan kapatma alanı */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Ana Modal Penceresi (Genişletilmiş Studio Layout) */}
      <div className="relative z-10 bg-[#0d0d0d] border border-white/10 rounded-3xl w-full max-w-6xl shadow-2xl flex flex-col h-[90vh] max-h-[900px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Üst Bar / Sabit Başlık (Asla taşmaz) */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#121212] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-white">Canlı Sayfa Editörü</h3>
              <p className="text-white/40 text-[11px]">Değişiklikler sağdaki önizleme ekranına anında yansır.</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Gövde: Sol Editör Paneli + Sağ Canlı Önizleme */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          
          {/* SOL: Form Kontrolleri (Kaydırılabilir) */}
          <div className="w-full lg:w-[420px] border-r border-white/5 flex flex-col shrink-0 bg-[#0F0F0F]">
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              
              <div>
                <label className="text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Proje Adı</label>
                <input 
                  type="text" 
                  value={productName} 
                  onChange={e => setProductName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 mb-1.5 block uppercase tracking-wider">Şablon Stili</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {TEMPLATES.map(tpl => (
                    <button
                      type="button"
                      key={tpl}
                      onClick={() => setTemplateType(tpl)}
                      className={`py-2 text-xs rounded-xl font-medium border transition-all cursor-pointer ${
                        templateType === tpl 
                          ? 'border-[#6366F1] bg-[#6366F1]/15 text-white font-bold shadow-sm' 
                          : 'border-white/5 bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Hero Başlığı</label>
                <textarea 
                  rows={2}
                  value={heroTitle} 
                  onChange={e => setHeroTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Pazarlama & Açıklama Metni</label>
                <textarea 
                  rows={4}
                  value={marketingCopy} 
                  onChange={e => setMarketingCopy(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Buton (CTA) Metni</label>
                <input 
                  type="text" 
                  value={ctaText} 
                  onChange={e => setCtaText(e.target.value)}
                  placeholder="Örn: Erken Erişime Katıl"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-white/60 mb-1.5 block uppercase tracking-wider">Vurgu Rengi</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={accentColor} 
                    onChange={e => setAccentColor(e.target.value)}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-transparent cursor-pointer p-0.5"
                  />
                  <div className="flex gap-2 flex-1">
                    {ACCENT_PRESETS.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setAccentColor(c)}
                        className={`w-7 h-7 rounded-full border border-white/20 transition-transform cursor-pointer ${accentColor === c ? 'scale-110 border-white ring-2 ring-white/30' : 'hover:scale-105'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sol Bar Alt Sabit Butonlar */}
              <div className="pt-4 border-t border-white/5 flex justify-end gap-2.5">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-[#6366F1] hover:bg-[#5558E6] text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#6366F1]/20 cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Kaydediliyor..." : "Kaydet & Yayınla"}
                </button>
              </div>
            </form>
          </div>

          {/* SAĞ: Canlı Önizleme Ekranı (Browser Mockup Çerçevesi) */}
          <div className="flex-1 bg-[#050505] p-4 sm:p-6 flex flex-col min-w-0 overflow-hidden">
            <div className="w-full h-full bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-inner">
              
              <div className="bg-[#141414] px-4 py-2.5 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div className="bg-black/50 border border-white/10 rounded-lg px-4 py-1 text-[11px] text-white/40 font-mono max-w-xs truncate">
                  launchify.app/{project?.slug || "onizleme"}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Eş Zamanlı Önizleme
                </div>
              </div>

              <div className="flex-1 overflow-y-auto relative pointer-events-auto">
                <div className="transform-gpu origin-top">
                  {renderTemplatePreview()}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
}