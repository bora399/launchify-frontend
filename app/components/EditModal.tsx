"use client";
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

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
const ACCENT_PRESETS = ["#6366F1", "#10B981", "#EC4899", "#3B82F6", "#F59E0B", "#8B5CF6", "#FDE047"];

export default function EditModal({ isOpen, onClose, project, onUpdated }: EditModalProps) {
  const ai = project?.aiConfig || project?.AiConfig || {};

  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [productName, setProductName] = useState(
    project?.productName || project?.ProductName || ""
  );
  const [templateType, setTemplateType] = useState(
    project?.templateType || project?.TemplateType || "Aurora"
  );
  const [heroTitle, setHeroTitle] = useState(
    ai.aiGeneratedHeroTitle || ai.AiGeneratedHeroTitle || project?.aiGeneratedHeroTitle || ""
  );
  const [marketingCopy, setMarketingCopy] = useState(
    ai.aiGeneratedMarketingCopy || ai.AiGeneratedMarketingCopy || project?.aiGeneratedMarketingCopy || project?.productDescription || ""
  );
  const [ctaText, setCtaText] = useState(
    ai.callToActionText || ai.CallToActionText || project?.callToActionText || "Erken Erişime Katıl"
  );
  const [accentColor, setAccentColor] = useState(
    ai.accentColor || ai.AccentColor || project?.accentColor || "#6366F1"
  );
  
  const [isSaving, setIsSaving] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentFeatures = ai.features || ai.Features || project?.features || [
    { title: "Yapay Zeka Mimarisi", description: "Saniyeler içinde üretim ve dağıtım." },
    { title: "Yüksek Dönüşüm", description: "B2B odaklı optimize edilmiş şablonlar." },
    { title: "Kolay Entegrasyon", description: "Talepleri doğrudan toplayın ve yönetin." }
  ];

  const previewData = {
    ...project,
    id: project?.id || "preview-id",
    slug: project?.slug || "onizleme",
    productName,
    ProductName: productName,
    templateType,
    TemplateType: templateType,
    accentColor,
    AccentColor: accentColor,
    aiGeneratedHeroTitle: heroTitle,
    AiGeneratedHeroTitle: heroTitle,
    aiGeneratedMarketingCopy: marketingCopy,
    AiGeneratedMarketingCopy: marketingCopy,
    callToActionText: ctaText,
    CallToActionText: ctaText,
    demoLink: project?.demoLink || "#",
    features: currentFeatures,
    Features: currentFeatures,
    aiConfig: {
      ...ai,
      accentColor,
      AccentColor: accentColor,
      aiGeneratedHeroTitle: heroTitle,
      AiGeneratedHeroTitle: heroTitle,
      aiGeneratedMarketingCopy: marketingCopy,
      AiGeneratedMarketingCopy: marketingCopy,
      callToActionText: ctaText,
      CallToActionText: ctaText,
      features: currentFeatures,
      Features: currentFeatures
    },
    AiConfig: {
      ...ai,
      accentColor,
      AccentColor: accentColor,
      aiGeneratedHeroTitle: heroTitle,
      AiGeneratedHeroTitle: heroTitle,
      aiGeneratedMarketingCopy: marketingCopy,
      AiGeneratedMarketingCopy: marketingCopy,
      callToActionText: ctaText,
      CallToActionText: ctaText,
      features: currentFeatures,
      Features: currentFeatures
    }
  };

  const renderTemplatePreview = () => {
    switch (templateType.toLowerCase()) {
      case "brutal":
        return <Brutal data={previewData} />;
      case "corporate":
        return <Corporate data={previewData} />;
      case "minimal":
        return <Minimal data={previewData} />;
      case "aurora":
      default:
        return <Aurora data={previewData} />;
    }
  };

  const handleAiAssist = async (mode: 'punchy' | 'corporate' | 'minimal' | 'redesign') => {
    setIsAiLoading(true);
    setAiMessage(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";

    try {
      const res = await fetch(`${apiUrl}/api/LandingPages/ai-assist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          currentTitle: heroTitle,
          currentCopy: marketingCopy,
          currentTemplate: templateType,
          mode
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.heroTitle) setHeroTitle(data.heroTitle);
        if (data.marketingCopy) setMarketingCopy(data.marketingCopy);
        if (data.callToActionText) setCtaText(data.callToActionText);

        if (mode === 'redesign') {
          if (data.suggestedTemplate) setTemplateType(data.suggestedTemplate);
          if (data.suggestedAccentColor) setAccentColor(data.suggestedAccentColor);
          setAiMessage("🎨 Tasarım & Şablon AI tarafından yeniden uyarlandı!");
        } else {
          setAiMessage("✨ Metinler yeni tona göre uyarlandı!");
        }
      } else {
        alert("AI asistanı şu an yanıt veremiyor.");
      }
    } catch (err) {
      console.error("AI Assist hatası:", err);
      alert("AI servisiyle bağlantı kurulamadı.");
    } finally {
      setIsAiLoading(false);
      setTimeout(() => setAiMessage(null), 3500);
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
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || "Güncelleme sırasında bir hata oluştu.");
      }
    } catch (err) {
      console.error("Güncelleme hatası:", err);
      alert("Sunucuya bağlanılamadı.");
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 bg-[#0d0d0d] border border-white/10 rounded-2xl sm:rounded-3xl w-full max-w-6xl shadow-2xl flex flex-col h-[94vh] sm:h-[88vh] max-h-[850px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 bg-[#141414] shrink-0 gap-2 sm:gap-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold font-heading text-white leading-tight">Canlı Sayfa & AI Stratejisti</h3>
                <p className="text-white/40 text-[10px] sm:text-[11px] hidden sm:block">AI önerilerini deneyin veya manuel düzenleyin.</p>
              </div>
            </div>
            
            <button 
              onClick={onClose} 
              className="p-1.5 sm:p-2 text-white/40 hover:text-white bg-white/5 rounded-lg sm:rounded-xl sm:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="flex lg:hidden bg-white/5 p-1 rounded-xl border border-white/5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`flex-1 sm:flex-none px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'editor' ? 'bg-[#6366F1] text-white shadow-sm' : 'text-white/50 hover:text-white'
                }`}
              >
                Düzenle
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`flex-1 sm:flex-none px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'preview' ? 'bg-[#6366F1] text-white shadow-sm' : 'text-white/50 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Önizleme
              </button>
            </div>

            <button 
              onClick={onClose} 
              className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer hidden sm:block"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          
          <div className={`w-full lg:w-[420px] border-r border-white/5 flex flex-col shrink-0 bg-[#0F0F0F] ${
            activeTab === 'editor' ? 'flex' : 'hidden lg:flex'
          }`}>
            
            <div className="p-4 bg-gradient-to-b from-[#6366F1]/10 to-transparent border-b border-white/5 shrink-0">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="text-[#6366F1]">✨</span> AI Sihirli Dokunuş
                </span>
                {isAiLoading && (
                  <span className="text-[10px] text-[#6366F1] font-semibold flex items-center gap-1 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-ping"></span>
                    Üretiliyor...
                  </span>
                )}
                {aiMessage && (
                  <span className="text-[10px] text-emerald-400 font-semibold">{aiMessage}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  disabled={isAiLoading}
                  onClick={() => handleAiAssist('punchy')}
                  className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-medium text-white/80 hover:text-white transition-all text-left flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <span>🔥</span> Daha Vurucu Yap
                </button>
                <button
                  type="button"
                  disabled={isAiLoading}
                  onClick={() => handleAiAssist('corporate')}
                  className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-medium text-white/80 hover:text-white transition-all text-left flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <span>💼</span> Kurumsal (B2B)
                </button>
                <button
                  type="button"
                  disabled={isAiLoading}
                  onClick={() => handleAiAssist('minimal')}
                  className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[11px] font-medium text-white/80 hover:text-white transition-all text-left flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <span>⚡</span> Sade & Kısa
                </button>
                <button
                  type="button"
                  disabled={isAiLoading}
                  onClick={() => handleAiAssist('redesign')}
                  className="px-2.5 py-1.5 bg-[#6366F1]/15 hover:bg-[#6366F1]/25 border border-[#6366F1]/30 rounded-lg text-[11px] font-semibold text-[#818cf8] hover:text-white transition-all text-left flex items-center gap-1.5 disabled:opacity-40 cursor-pointer col-span-1"
                >
                  <span>🎨</span> AI Tasarım Remix
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 sm:space-y-4">
              
              <div>
                <label className="text-[10px] sm:text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Proje Adı</label>
                <input 
                  type="text" 
                  value={productName} 
                  onChange={e => setProductName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] sm:text-[11px] font-semibold text-white/60 mb-1.5 block uppercase tracking-wider">Şablon Stili</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {TEMPLATES.map(tpl => (
                    <button
                      type="button"
                      key={tpl}
                      onClick={() => setTemplateType(tpl)}
                      className={`py-2 text-xs rounded-xl font-medium border transition-all cursor-pointer ${
                        templateType.toLowerCase() === tpl.toLowerCase()
                          ? 'border-[#6366F1] bg-[#6366F1]/15 text-white font-bold' 
                          : 'border-white/5 bg-white/5 text-white/50 hover:bg-white/10'
                      }`}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] sm:text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Hero Başlığı</label>
                <textarea 
                  rows={2}
                  value={heroTitle} 
                  onChange={e => setHeroTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1] resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] sm:text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Açıklama Metni</label>
                <textarea 
                  rows={3}
                  value={marketingCopy} 
                  onChange={e => setMarketingCopy(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] sm:text-[11px] font-semibold text-white/60 mb-1 block uppercase tracking-wider">Buton (CTA) Metni</label>
                <input 
                  type="text" 
                  value={ctaText} 
                  onChange={e => setCtaText(e.target.value)}
                  placeholder="Erken Erişime Katıl"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="text-[10px] sm:text-[11px] font-semibold text-white/60 mb-1.5 block uppercase tracking-wider">Vurgu Rengi</label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <input 
                    type="color" 
                    value={accentColor} 
                    onChange={e => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5 shrink-0"
                  />
                  <div className="flex gap-1.5 flex-1 items-center">
                    {ACCENT_PRESETS.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setAccentColor(c)}
                        className={`w-6 h-6 rounded-full border border-white/20 transition-transform cursor-pointer shrink-0 ${
                          accentColor.toLowerCase() === c.toLowerCase() ? 'scale-110 border-white ring-2 ring-white/40' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#6366F1] hover:bg-[#5558E6] text-white font-bold rounded-xl text-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? "Kaydediliyor..." : "Kaydet & Yayınla"}
                </button>
              </div>
            </form>
          </div>

          <div className={`flex-1 bg-[#050505] p-2 sm:p-4 md:p-5 flex-col min-w-0 overflow-hidden ${
            activeTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}>
            <div className="w-full h-full bg-[#080808] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col shadow-inner">
              
              <div className="bg-[#141414] px-3 sm:px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </div>
                <div className="bg-black/60 border border-white/10 rounded-lg px-2.5 sm:px-4 py-0.5 text-[10px] sm:text-[11px] text-white/50 font-mono max-w-[150px] sm:max-w-xs truncate">
                  launchify.app/{project?.slug || "onizleme"}
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="hidden sm:inline">Canlı Önizleme</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto relative bg-[#050505] text-white">
                <div className="w-full min-h-full">
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