"use client";

import { useId, useRef, useState } from "react";
import type { LandingContent } from "./landing-content";
import { Arrow } from "./LandingElements";

export default function LandingWaitlist({
  content,
}: {
  content: LandingContent;
}) {
  const emailId = useId();
  const statusId = useId();
  const pending = useRef(false);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim() || pending.current) return;
    pending.current = true;
    setStatus("loading");
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://launchify-backend-3a7w.onrender.com";
      const response = await fetch(`${apiUrl}/api/Waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: content.pageId,
          email: email.trim().toLowerCase(),
          honeypot,
        }),
      });
      if (response.status === 409) setStatus("duplicate");
      else if (response.ok) {
        setStatus("success");
        setEmail("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  return (
    <div className="lp-signup">
      <div
        id={statusId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`lp-form-message lp-form-message--${status}`}
      >
        {status === "success" && (
          <>
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Kaydınız alındı.</strong>
              <p>İlginiz için teşekkür ederiz.</p>
            </div>
          </>
        )}
        {status === "duplicate" &&
          "Bu e-posta adresi zaten bekleme listesinde kayıtlı."}
        {status === "error" && "Kaydınız alınamadı. Lütfen tekrar deneyin."}
      </div>
      {status !== "success" && (
        <form onSubmit={subscribe} aria-busy={status === "loading"}>
          <label htmlFor={emailId}>E-posta adresiniz</label>
          <div className="lp-form-fields">
            <input
              type="text"
              name="b_phone_verification"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              hidden
            />
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="siz@ornek.com"
              value={email}
              aria-describedby={
                status === "error" || status === "duplicate"
                  ? statusId
                  : undefined
              }
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === "error" || status === "duplicate")
                  setStatus("idle");
              }}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Kaydediliyor…" : content.cta}
              <Arrow diagonal />
            </button>
          </div>
          <p className="lp-form-note">
            Yalnızca bekleme listesine kayıt oluşturur.
          </p>
        </form>
      )}
    </div>
  );
}
