"use client";
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    slug: string;
    productName?: string;
  };
}

export default function ShareModal({ isOpen, onClose, project }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://launchify.app';
  const pageUrl = `${origin}/${project.slug}`;
  const shareTitle = `${project.productName || 'Projemiz'} yayında! Launchify ile oluşturuldu.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank');
  };

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank');
  };

  const shareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}${pageUrl}`)}`;
    window.open(url, '_blank');
  };

  const downloadQR = () => {
    const svgElement = document.getElementById('project-qr-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 400, 400);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `qr_${project.slug}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Başlık */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold font-heading text-white">Paylaş & Dağıt</h3>
            <p className="text-white/40 text-xs mt-1">
              <strong className="text-white/70">{project.productName || project.slug}</strong> sayfanızı yayınlayın.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/5 rounded-2xl mb-6">
          <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
            <QRCodeSVG 
              id="project-qr-svg"
              value={pageUrl} 
              size={160}
              bgColor="#ffffff"
              fgColor="#000000"
              level="Q"
            />
          </div>
          <button
            onClick={downloadQR}
            className="text-xs text-[#6366F1] hover:text-[#818cf8] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            QR Kodu PNG İndir
          </button>
        </div>

        <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl p-2 mb-6">
          <input 
            type="text" 
            readOnly 
            value={pageUrl}
            className="bg-transparent text-white/70 text-xs px-2 flex-1 focus:outline-none truncate"
          />
          <button 
            onClick={copyToClipboard}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {copied ? 'Kopyalandı!' : 'Kopyala'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-white transition-all cursor-pointer"
          >
            <span>X / Twitter</span>
          </button>
          <button
            onClick={shareLinkedIn}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-medium text-white transition-all cursor-pointer"
          >
            <span>LinkedIn</span>
          </button>
          <button
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-2 py-2.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl text-xs font-medium text-green-400 transition-all cursor-pointer"
          >
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}