"use client";
import React, { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  faqs?: FaqItem[];
  theme: "aurora" | "brutal" | "corporate" | "minimal";
  accentColor: string;
  productName: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "Erken erişim programı nasıl işliyor?",
    answer: "E-posta adresinizi bıraktığınızda sıraya alınırsınız. Platform açıldığında ilk davet kodu ve özel kurucu avantajları doğrudan e-postanıza iletilir."
  },
  {
    question: "Verilerimiz ve gizliliğimiz nasıl korunuyor?",
    answer: "Verileriniz endüstri standardı güvenlik protokolleriyle şifrelenir ve asla üçüncü taraflarla paylaşılmaz."
  },
  {
    question: "Kurulum veya teknik bilgi gerektiriyor mu?",
    answer: "Hayır. Sistem tamamen bulut tabanlı ve kullanıma hazır şekilde teslim edilir; karmaşık konfigürasyonlara ihtiyaç duymazsınız."
  }
];

export default function FaqSection({ faqs, theme, accentColor, productName }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (theme === "brutal") {
    return (
      <section className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black uppercase mb-8 sm:mb-12 border-b-4 border-black pb-3">
          Merak Edilenler?
        </h2>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="border-4 border-black bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 sm:p-6 font-black uppercase text-base sm:text-xl flex justify-between items-center cursor-pointer"
              >
                <span>{item.question}</span>
                <span className="text-2xl">{openIndex === idx ? "−" : "+"}</span>
              </button>
              {openIndex === idx && (
                <div className="p-5 sm:p-6 border-t-4 border-black bg-[#FDE047]/20 font-medium text-sm sm:text-lg">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (theme === "corporate") {
    return (
      <section className="py-16 sm:py-24 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-500 text-sm">{productName} hakkında aklınıza takılabilecek yanıtlar.</p>
          </div>
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50">
            {items.map((item, idx) => (
              <div key={idx} className="bg-white">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center text-sm sm:text-base font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
                >
                  <span>{item.question}</span>
                  <span className="text-gray-400 text-xl font-light">{openIndex === idx ? "−" : "+"}</span>
                </button>
                {openIndex === idx && (
                  <div className="px-5 sm:px-6 pb-6 text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (theme === "minimal") {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-3xl mx-auto border-t border-gray-100 font-sans">
        <h2 className="text-2xl sm:text-3xl font-light text-center mb-10 text-gray-900 font-serif">Sık Sorulanlar</h2>
        <div className="space-y-6">
          {items.map((item, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left py-2 flex justify-between items-center text-sm sm:text-base font-medium text-gray-800 cursor-pointer"
              >
                <span>{item.question}</span>
                <span className="text-gray-400 font-light text-sm">{openIndex === idx ? "Kapat" : "Aç"}</span>
              </button>
              {openIndex === idx && (
                <p className="pt-2 text-gray-500 text-xs sm:text-sm font-light leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-4xl font-bold mb-3 tracking-tight">Sıkça Sorulan Sorular</h2>
        <p className="text-gray-400 text-xs sm:text-sm">{productName} ile ilgili aklınızdaki soru işaretleri.</p>
      </div>

      <div className="space-y-3.5">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-5 sm:p-6 flex justify-between items-center text-sm sm:text-base font-semibold text-white cursor-pointer hover:bg-white/[0.03]"
            >
              <span>{item.question}</span>
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ml-3"
                style={{ backgroundColor: `${accentColor}30`, color: accentColor }}
              >
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>
            {openIndex === idx && (
              <div className="px-5 sm:px-6 pb-6 text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}