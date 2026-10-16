"use client";

import { landingContent } from "./landing-content";
import {
  Arrow,
  LandingActions,
  LandingFooter,
  LandingHeader,
} from "./LandingElements";
import LandingWaitlist from "./LandingWaitlist";

export default function TemplateBrutal({
  data,
}: {
  data: Record<string, any>;
}) {
  const c = landingContent(data, "#ddf46d");
  return (
    <div id="page-top" className="landing-page landing--brutal" style={c.style}>
      <LandingHeader content={c} />
      <main className="lp-container brutal-hero">
        <div className="brutal-title-row">
          <p className="lp-eyeline">{c.name} / Ürün tanıtımı</p>
          <span aria-hidden="true">↙</span>
        </div>
        <div className="brutal-hero-grid">
          <div className="brutal-hero-copy">
            <h1>{c.title}</h1>
            <p className="lp-hero-description">{c.copy}</p>
            <LandingActions content={c} />
          </div>
          <div
            className="brutal-poster"
            aria-label={`${c.name} tipografik afişi`}
          >
            <div className="brutal-poster-top">
              <span>{c.name}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <svg
              className="brutal-asterisk"
              viewBox="0 0 240 240"
              aria-hidden="true"
            >
              <path
                d="M102 10h36v65l46-46 26 26-46 47h66v36h-66l46 46-26 26-46-46v66h-36v-66l-47 46-26-26 46-46H10v-36h65L29 55l26-26 47 46V10Z"
                fill="currentColor"
              />
            </svg>
            <div className="brutal-poster-bottom">
              <span>
                İNCELE.
                <br />
                KARAR VER.
              </span>
              <a href="#waitlist" aria-label={c.cta}>
                <Arrow diagonal />
              </a>
            </div>
          </div>
        </div>
      </main>
      {c.features.length > 0 && (
        <div className="brutal-strip">
          <div className="lp-container">
            <span>{c.name}</span>
            <span>Özelliklere göz atın</span>
            <Arrow />
          </div>
        </div>
      )}
      {c.features.length > 0 && (
        <section id="product-details" className="lp-container brutal-features">
          <div className="lp-section-head">
            <h2>NE SUNUYOR?</h2>
            <span className="lp-index">
              {String(c.features.length).padStart(2, "0")} özellik / hepsi
              burada
            </span>
          </div>
          <div className="brutal-feature-grid">
            {c.features.map((feature, i) => (
              <article
                id={`feature-${i + 1}`}
                className="brutal-feature"
                key={i}
              >
                <span className="brutal-feature-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#waitlist">
                  {c.cta}
                  <Arrow diagonal />
                </a>
              </article>
            ))}
          </div>
        </section>
      )}
      <section id="waitlist" className="brutal-waitlist">
        <div className="lp-container brutal-waitlist-inner">
          <div>
            <span className="lp-eyeline">Bir e-posta yeter.</span>
            <h2>
              AKLINDA
              <br />
              KALMASIN.
            </h2>
            <p>
              {c.name} ile ilgili gelişmelerden haberdar olmak için listeye
              katıl.
            </p>
          </div>
          <LandingWaitlist content={c} />
        </div>
      </section>
      <LandingFooter content={c} />
    </div>
  );
}
