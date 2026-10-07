"use client";

import { useEffect, useRef } from "react";

export default function AnalyticsTracker({ projectId }: { projectId: string }) {
  const hasTracked = useRef(false); 

  useEffect(() => {
    if (hasTracked.current || !projectId) return;
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";
    
    fetch(`${apiUrl}/api/analytics/${projectId}/visit`, { method: 'POST' })
      .then(() => {
        hasTracked.current = true;
        console.log("Ziyaret API'ye başarıyla iletildi: ", projectId);
      })
      .catch(err => console.error("Analitik hatası:", err));
      
  }, [projectId]);

  return null; 
}