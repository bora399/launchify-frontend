"use client";

import { useEffect, useRef } from "react";

export default function AnalyticsTracker({ projectId }: { projectId: string }) {
  const trackedProjects = useRef(new Set<string>());

  useEffect(() => {
    if (!projectId || trackedProjects.current.has(projectId)) return;

    // Reserve before sending so repeated effects cannot enqueue the same visit.
    trackedProjects.current.add(projectId);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://launchify-backend-3a7w.onrender.com";

    fetch(`${apiUrl}/api/analytics/${encodeURIComponent(projectId)}/visit`, {
      method: "POST",
      keepalive: true,
    })
      .then(response => {
        if (!response.ok) throw new Error(`Analytics request failed: ${response.status}`);
      })
      .catch(error => {
        trackedProjects.current.delete(projectId);
        console.error("Analitik hatası:", error);
      });
  }, [projectId]);

  return null;
}
