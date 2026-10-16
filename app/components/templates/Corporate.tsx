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

export default function TemplateCorporate({
  data,
}: {
  data: Record<string, any>;
}) {
  const c = landingContent(data, "#345cce");
  return (
    <div
      id="page-top"
      className="landing-page landing--corporate"
      style={c.style}
    >
      <LandingHeader content={c} />
      <main className="lp-container corporate-hero">
        <div className="corporate-hero-copy">
          <p className="lp-eyeline">{c.name} / Ürün tanıtımı</p>
          <h1>{c.title}</h1>
          <p className="lp-hero-description">{c.copy}</p>
          <LandingActions content={c} />
          {c.features.length > 0 && (
            <a href="#product-details" className="corporate-discover">
              Tüm özellikleri inceleyin <Arrow />
            </a>
          )}
        </div>
        <div className="corporate-art" aria-label={`${c.name} ürün özeti`}>
          <div className="corporate-art-frame" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="corporate-monogram" aria-hidden="true">
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="corporate-art-heading">
            <span>Ürün özeti</span>
            <strong>{c.name}</strong>
          </div>
          <div className="corporate-art-features">
            {c.features.slice(0, 3).map((feature, i) => (
              <a href={`#feature-${i + 1}`} key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{feature.title}</strong>
                <Arrow diagonal />
              </a>
            ))}
          </div>
          <a href="#waitlist" className="corporate-art-footer">
            {c.cta}
            <Arrow />
          </a>
        </div>
      </main>
      {c.features.length > 0 && (
        <section id="product-details" className="corporate-details">
          <div className="lp-container">
            <div className="lp-section-head">
              <div>
                <span className="lp-eyeline">Ürünü tanıyın</span>
                <h2>
                  İhtiyacınıza
                  <br />
                  nerede karşılık veriyor?
                </h2>
              </div>
              <p>
                {c.name} özelliklerine
                <br />
                daha yakından bakın.
              </p>
            </div>
            <div className="corporate-feature-grid">
              {c.features.map((feature, i) => (
                <article id={`feature-${i + 1}`} key={i}>
                  <div className="corporate-feature-top">
                    <FeatureSymbol index={i} />
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <a href="#waitlist">
                    İlgileniyorum
                    <Arrow diagonal />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      <section id="waitlist" className="lp-container corporate-waitlist">
        <div>
          <span className="lp-eyeline">Sonraki adım</span>
          <h2>
            {c.name}
            <br />
            hakkında haber alın.
          </h2>
          <p>Gelişmelerden haberdar olmak için e-posta adresinizi bırakın.</p>
        </div>
        <LandingWaitlist content={c} />
      </section>
      <LandingFooter content={c} />
    </div>
  );
}
