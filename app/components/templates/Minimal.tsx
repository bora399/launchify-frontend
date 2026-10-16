"use client";

import { landingContent } from "./landing-content";
import {
  Arrow,
  LandingActions,
  LandingFooter,
  LandingHeader,
} from "./LandingElements";
import LandingWaitlist from "./LandingWaitlist";

export default function TemplateMinimal({
  data,
}: {
  data: Record<string, any>;
}) {
  const c = landingContent(data, "#5a6b52");
  return (
    <div
      id="page-top"
      className="landing-page landing--minimal"
      style={c.style}
    >
      <LandingHeader content={c} />
      <main className="lp-container minimal-hero">
        <div className="minimal-hero-copy">
          <p className="lp-eyeline">{c.name} — Tanıtım</p>
          <h1>{c.title}</h1>
          <p className="lp-hero-description">{c.copy}</p>
          <LandingActions content={c} />
        </div>
        <figure
          className="minimal-poster"
          aria-label={`${c.name} geometrik marka kompozisyonu`}
        >
          <div className="minimal-poster-top">
            <span>{c.name}</span>
            <span aria-hidden="true">Ⅰ</span>
          </div>
          <div className="minimal-sculpture" aria-hidden="true">
            <div className="minimal-sculpture-circle" />
            <div className="minimal-sculpture-arch" />
            <div className="minimal-sculpture-line" />
            <div className="minimal-sculpture-disc" />
          </div>
          <figcaption>
            <span>Ürüne bir bakış.</span>
            <a
              href={c.features.length ? "#product-details" : "#waitlist"}
              aria-label="Sayfayı keşfet"
            >
              <Arrow diagonal />
            </a>
          </figcaption>
        </figure>
      </main>
      {c.features.length > 0 && (
        <section id="product-details" className="lp-container minimal-details">
          <div className="minimal-details-heading">
            <span className="lp-eyeline">Ayrıntılarda</span>
            <h2>{c.name}.</h2>
          </div>
          <div className="minimal-feature-list">
            {c.features.map((feature, i) => (
              <article id={`feature-${i + 1}`} key={i}>
                <span className="lp-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <a
                  href="#waitlist"
                  aria-label={`${feature.title} — listeye katıl`}
                >
                  <Arrow diagonal />
                </a>
              </article>
            ))}
          </div>
        </section>
      )}
      <section id="waitlist" className="lp-container minimal-waitlist">
        <div>
          <span className="lp-eyeline">İletişimde kalalım.</span>
          <h2>
            Bir sonraki
            <br />
            haberi kaçırmayın.
          </h2>
          <p>{c.name} ile ilgili gelişmeler için e-posta adresinizi bırakın.</p>
        </div>
        <LandingWaitlist content={c} />
      </section>
      <LandingFooter content={c} />
    </div>
  );
}
