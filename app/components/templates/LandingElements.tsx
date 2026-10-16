import type { LandingContent } from "./landing-content";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {diagonal ? (
        <path d="M6 18 18 6M6 6h12v12" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" />
      )}
    </svg>
  );
}

export function LandingHeader({ content }: { content: LandingContent }) {
  return (
    <header className="lp-header">
      <div className="lp-container lp-header-inner">
        <a href="#page-top" className="lp-wordmark">
          <span className="lp-brand-mark" aria-hidden="true" />
          {content.name}
        </a>
        <nav aria-label="Sayfa bağlantıları">
          {content.features.length > 0 && (
            <a href="#product-details" className="lp-nav-details">
              Özellikler
            </a>
          )}
          {content.demo && (
            <a
              href={content.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="lp-nav-demo"
            >
              Demoyu incele
            </a>
          )}
          <a href="#waitlist" className="lp-nav-cta">
            {content.cta}
            <Arrow diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

export function LandingActions({ content }: { content: LandingContent }) {
  return (
    <div className="lp-actions">
      <a href="#waitlist" className="lp-button lp-button-primary">
        {content.cta}
        <Arrow diagonal />
      </a>
      {content.demo ? (
        <a
          className="lp-button lp-button-secondary"
          href={content.demo}
          target="_blank"
          rel="noopener noreferrer"
        >
          Demoyu incele
          <Arrow />
        </a>
      ) : (
        content.features.length > 0 && (
          <a className="lp-button lp-button-secondary" href="#product-details">
            Özellikleri keşfet
            <Arrow />
          </a>
        )
      )}
    </div>
  );
}

export function LandingFooter({ content }: { content: LandingContent }) {
  return (
    <footer className="lp-footer lp-container">
      <a href="#page-top" className="lp-footer-name">
        {content.name}
      </a>
      <span>
        © {new Date().getFullYear()} {content.name}
      </span>
      <a href="#page-top">Başa dön ↑</a>
    </footer>
  );
}

export function FeatureSymbol({ index }: { index: number }) {
  return (
    <svg
      className="lp-feature-symbol"
      width="42"
      height="42"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {index % 3 === 0 ? (
        <>
          <rect x="8" y="8" width="22" height="22" rx="5" />
          <rect x="18" y="18" width="22" height="22" rx="5" />
        </>
      ) : index % 3 === 1 ? (
        <>
          <circle cx="24" cy="24" r="16" />
          <path d="m16 24 6 6 11-12" />
        </>
      ) : (
        <>
          <path d="m24 5 19 19-19 19L5 24 24 5Z" />
          <path d="M5 24h38M24 5v38" />
        </>
      )}
    </svg>
  );
}
