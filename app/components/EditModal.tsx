"use client";
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

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
        const updated = {
          ...project,
          productName,
          templateType,
          aiConfig: {
            ...ai,
            aiGeneratedHeroTitle: heroTitle,
            aiGeneratedMarketingCopy: marketingCopy,
            callToActionText: ctaText,
            accentColor
          }
        };
        onUpdated(updated);
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h3 className="text-xl font-bold font-heading text-white">Sayfayı Düzenle</h3>
            <p className="text-white/40 text-xs">Metinleri ve tasarım detaylarını dilediğin gibi özelleştir.</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white bg-white/5 rounded-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div>
            <label className="text-xs font-semibold text-white/60 mb-1 block">Proje Adı</label>
            <input 
              type="text" 
              value={productName} 
              onChange={e => setProductName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/60 mb-1 block">Şablon Seçimi</label>
            <div className="grid grid-cols-4 gap-2">
              {TEMPLATES.map(tpl => (
                <button
                  type="button"
                  key={tpl}
                  onClick={() => setTemplateType(tpl)}
                  className={`py-2 text-xs rounded-xl font-medium border transition-all ${
                    templateType === tpl 
                      ? 'border-[#6366F1] bg-[#6366F1]/10 text-white font-bold' 
                      : 'border-white/5 bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {tpl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/60 mb-1 block">Hero Başlığı (Ana Başlık)</label>
            <textarea 
              rows={2}
              value={heroTitle} 
              onChange={e => setHeroTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/60 mb-1 block">Açıklama / Pazarlama Metni</label>
            <textarea 
              rows={3}
              value={marketingCopy} 
              onChange={e => setMarketingCopy(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-white/60 mb-1 block">Buton (CTA) Metni</label>
              <input 
                type="text" 
                value={ctaText} 
                onChange={e => setCtaText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#6366F1]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/60 mb-1 block">Vurgu Rengi</label>
              <div className="flex items-center gap-2">
                <input 
                  type="color" 
                  value={accentColor} 
                  onChange={e => setAccentColor(e.target.value)}
                  className="w-10 h-10 rounded-xl border border-white/10 bg-transparent cursor-pointer p-0.5"
                />
                <div className="flex gap-1.5 flex-1">
                  {ACCENT_PRESETS.map(c => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setAccentColor(c)}
                      className={`w-6 h-6 rounded-full border border-white/20 transition-transform ${accentColor === c ? 'scale-125 border-white' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex justify-end gap-3 shrink-0">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 bg-white/5 text-white/60 hover:text-white rounded-xl text-xs font-semibold"
            >
              İptal
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#6366F1] hover:bg-[#5558E6] text-white font-bold rounded-xl text-xs flex items-center gap-2"
            >
              {isSaving ? "Kaydediliyor..." : "Kaydet & Güncelle"}
            </button>
          </div>
        </form>

      </div>
    </div>,
    document.body
  );
}