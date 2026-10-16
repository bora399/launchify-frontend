"use client";

import { landingContent } from "./landing-content";
import {
  Arrow,
  FeatureSymbol,
  LandingActions,
  LandingFooter,
  LandingHeader,
} from "./LandingElements";
import LandingWaitlist from "./LandingWaitlist";

export default function TemplateAurora({
  data,
}: {
  data: Record<string, any>;
}) {
  const c = landingContent(data, "#8c7cf8");
  return (
    <div id="page-top" className="landing-page landing--aurora" style={c.style}>
      <LandingHeader content={c} />
      <main className="lp-container aurora-hero">
        <div className="aurora-hero-copy">
          <p className="lp-eyeline">{c.name} / Tanıtım</p>
          <h1>{c.title}</h1>
          <p className="lp-hero-description">{c.copy}</p>
          <LandingActions content={c} />
          {c.features.length > 0 && (
            <a href="#product-details" className="aurora-discover">
              <span aria-hidden="true">↓</span> Ürünü yakından tanıyın
            </a>
          )}
        </div>
        <div className="aurora-art" aria-label={`${c.name} marka kompozisyonu`}>
          <div className="aurora-art-grid" aria-hidden="true" />
          <div className="aurora-orb" aria-hidden="true" />
          <div className="aurora-orbit aurora-orbit-one" aria-hidden="true" />
          <div className="aurora-orbit aurora-orbit-two" aria-hidden="true" />
          <div className="aurora-orbit aurora-orbit-three" aria-hidden="true" />
          <div className="aurora-glass">
            <span className="aurora-glass-label">Ürüne bir bakış</span>
            <strong>{c.name}</strong>
            <span className="aurora-glass-rule" />
            {c.features.length > 0 ? (
              c.features.slice(0, 2).map((feature, i) => (
                <a href={`#feature-${i + 1}`} key={i}>
                  <span>{feature.title}</span>
                  <Arrow diagonal />
                </a>
              ))
            ) : (
              <a href="#waitlist">
                <span>{c.cta}</span>
                <Arrow diagonal />
              </a>
            )}
          </div>
          <span className="aurora-art-coordinate" aria-hidden="true">
            01 — {c.name}
          </span>
        </div>
      </main>
      {c.features.length > 0 && (
        <section id="product-details" className="lp-container aurora-features">
          <div className="lp-section-head">
            <div>
              <span className="lp-eyeline">İçeriye bir bakış</span>
              <h2>
                Her ayrıntıda,
                <br />
                {c.name}.
              </h2>
            </div>
            <p>
              Özellikleri inceleyin.
              <br />
              Size uygun olanı keşfedin.
            </p>
          </div>
          <div className="aurora-feature-grid">
            {c.features.map((feature, i) => (
              <article
                id={`feature-${i + 1}`}
                className="aurora-feature"
                key={i}
              >
                <div
                  className={`aurora-feature-art aurora-feature-art--${i % 3}`}
                  aria-hidden="true"
                >
                  <FeatureSymbol index={i} />
                  <span />
                  <i />
                </div>
                <span className="lp-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#waitlist">
                  İlgileniyorum <Arrow diagonal />
                </a>
              </article>
            ))}
          </div>
        </section>
      )}
      <section id="waitlist" className="lp-container aurora-waitlist">
        <div className="aurora-waitlist-light" aria-hidden="true" />
        <div>
          <span className="lp-eyeline">İletişimde kalalım</span>
          <h2>
            {c.name}
            <br />
            ilginizi çekti mi?
          </h2>
          <p>Gelişmelerden haberdar olmak için e-posta adresinizi bırakın.</p>
        </div>
        <LandingWaitlist content={c} />
      </section>
      <LandingFooter content={c} />
    </div>
  );
}
