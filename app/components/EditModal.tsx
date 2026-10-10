"use client";

import React, { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onSave: (updatedProject: any) => Promise<void> | void;
}

export default function EditModal({ isOpen, onClose, project, onSave }: EditModalProps) {
  const [productName, setProductName] = useState("");
  const [templateType, setTemplateType] = useState("aurora");
  const [heroTitle, setHeroTitle] = useState("");
  const [marketingCopy, setMarketingCopy] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [accentColor, setAccentColor] = useState("#6366F1");
  const [demoLink, setDemoLink] = useState("");

  const [activeAiMode, setActiveAiMode] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      const ai = project.aiConfig || project.AiConfig || {};
      setProductName(project.productName || project.ProductName || "");
      setTemplateType((project.templateType || project.TemplateType || "aurora").toLowerCase());
      setHeroTitle(ai.aiGeneratedHeroTitle || project.aiGeneratedHeroTitle || "");
      setMarketingCopy(ai.aiGeneratedMarketingCopy || project.aiGeneratedMarketingCopy || "");
      setCtaText(ai.callToActionText || project.callToActionText || "Hemen Başla");
      setAccentColor(ai.accentColor || project.accentColor || "#6366F1");
      setDemoLink(project.demoLink || project.DemoLink || "");
      setActiveAiMode(null);
      setAiMessage(null);
    }
  }, [project, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const handleAiAssist = async (mode: 'punchy' | 'corporate' | 'minimal' | 'redesign') => {
    setActiveAiMode(mode);
    setIsAiLoading(true);
    setAiMessage(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
      const response = await fetch(`${apiUrl}/api/LandingPages/ai-assist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          currentTitle: heroTitle,
          currentCopy: marketingCopy,
          currentTemplate: templateType,
          mode
        })
      });

      if (!response.ok) {
        throw new DOMException("AI servisi yanıt veremedi.");
      }

      const data = await response.json();

      if (data.heroTitle) setHeroTitle(data.heroTitle);
      if (data.marketingCopy) setMarketingCopy(data.marketingCopy);
      if (data.callToActionText) setCtaText(data.callToActionText);

      if (mode === "redesign") {
        if (data.suggestedTemplate) setTemplateType(data.suggestedTemplate.toLowerCase());
        if (data.suggestedAccentColor) setAccentColor(data.suggestedAccentColor);
        setAiMessage("Tasarım ve renkler ürününüze göre uyarlandı!");
      } else {
        setAiMessage("Metinler yapay zeka tarafından optimize edildi!");
      }
    } catch (err: any) {
      console.error("AI Assist Hatası:", err);
      alert("AI asistanı şu anda yanıt veremedi. Lütfen tekrar deneyin.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updated = {
        ...project,
        productName,
        templateType,
        demoLink,
        aiConfig: {
          ...(project.aiConfig || {}),
          aiGeneratedHeroTitle: heroTitle,
          aiGeneratedMarketingCopy: marketingCopy,
          callToActionText: ctaText,
          accentColor: accentColor
        }
      };

      await onSave(updated);
      onClose();
    } catch (error) {
      console.error("Kaydetme hatası:", error);
      alert("Değişiklikler kaydedilirken bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      
      <div className="relative w-full max-w-5xl h-full max-h-[94vh] sm:max-h-[90vh] bg-[#0c0c0c] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0c0c0c]/90 backdrop-blur-md z-20">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1] shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </div>
            <div className="truncate">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                Canlı Sayfa & AI Stratejisti
              </h2>
              <p className="text-[10px] sm:text-xs text-white/40 truncate">
                AI önerilerini deneyin veya manuel düzenleyin.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <form id="edit-landing-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-5">
              
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                    <span>✨</span> AI Sihirli Dokunuş
                  </span>
                  {aiMessage && (
                    <span className="text-[10px] text-emerald-400 font-semibold animate-pulse truncate max-w-[200px]">
                      {aiMessage}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'punchy', label: 'Daha Vurucu Yap', icon: '🔥' },
                    { id: 'corporate', label: 'Kurumsal (B2B)', icon: '💼' },
                    { id: 'minimal', label: 'Sade & Kısa', icon: '⚡' },
                    { id: 'redesign', label: 'AI Tasarım Remix', icon: '🎨' },
                  ].map((btn) => {
                    const isSelected = activeAiMode === btn.id;
                    const isThisLoading = isAiLoading && isSelected;

                    return (
                      <button
                        key={btn.id}
                        type="button"
                        disabled={isAiLoading}
                        onClick={() => handleAiAssist(btn.id as any)}
                        className={`px-2.5 py-2 rounded-xl text-[11px] transition-all text-left flex items-center justify-between cursor-pointer disabled:opacity-50 border ${
                          isSelected
                            ? "bg-[#6366F1]/20 border-[#6366F1] text-white font-bold ring-1 ring-[#6366F1]/50 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                            : "bg-white/5 hover:bg-white/10 border-white/10 text-white/70 hover:text-white font-medium"
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span>{btn.icon}</span>
                          <span className="truncate">{btn.label}</span>
                        </span>

                        {isThisLoading && (
                          <span className="w-2.5 h-2.5 border border-white/30 border-t-white rounded-full animate-spin shrink-0"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                  PROJE ADI
                </label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                  ŞABLON STİLİ
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["aurora", "brutal", "corporate", "minimal"].map((tmpl) => (
                    <button
                      key={tmpl}
                      type="button"
                      onClick={() => setTemplateType(tmpl)}
                      className={`py-2 px-1 text-[11px] rounded-xl font-bold uppercase transition-all border cursor-pointer ${
                        templateType === tmpl
                          ? "bg-[#6366F1] border-[#6366F1] text-white shadow-md shadow-[#6366F1]/30"
                          : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                      }`}
                    >
                      {tmpl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                  HERO BAŞLIĞI
                </label>
                <input
                  type="text"
                  required
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                  AÇIKLAMA METNİ
                </label>
                <textarea
                  rows={3}
                  required
                  value={marketingCopy}
                  onChange={(e) => setMarketingCopy(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1] leading-relaxed resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                    BUTON (CTA) METNİ
                  </label>
                  <input
                    type="text"
                    required
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                    VURGU RENGI (HEX)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-xl bg-transparent border border-white/10 cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                  CANLI DEMO LİNKİ (OPSİYONEL)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={demoLink}
                  onChange={(e) => setDemoLink(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#6366F1]"
                />
              </div>

            </div>

            <div className="lg:col-span-5 flex flex-col">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-1.5">
                CANLI ÖNİZLEME SİMÜLASYONU
              </label>
              
              <div className="flex-1 min-h-[220px] rounded-2xl border border-white/10 bg-[#050505] p-5 flex flex-col justify-between relative overflow-hidden shadow-inner">
                <div 
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: accentColor }}
                ></div>

                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                      {productName || "Proje Adı"}
                    </span>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {templateType}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-white mb-2 leading-tight">
                    {heroTitle || "Hero Başlığı Buraya Gelecek"}
                  </h3>
                  <p className="text-[11px] text-white/50 leading-relaxed line-clamp-4">
                    {marketingCopy || "Açıklama metniniz bu alanda görüntülenecektir."}
                  </p>
                </div>

                <div className="pt-4">
                  <div 
                    style={{ backgroundColor: accentColor }}
                    className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-white shadow-md truncate"
                  >
                    {ctaText || "Hemen Başla"}
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-white/10 bg-[#0c0c0c]/95 backdrop-blur-md flex items-center justify-end gap-2.5 shrink-0 z-20">
          <button
            type="button"
            disabled={isSaving}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-xs sm:text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          >
            Vazgeç
          </button>

          <button
            type="submit"
            form="edit-landing-form"
            disabled={isSaving || isAiLoading}
            className="px-6 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#5558E6] active:scale-95 text-xs sm:text-sm font-bold text-white shadow-lg shadow-[#6366F1]/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <span>Değişiklikleri Kaydet</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}