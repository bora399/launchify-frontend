interface ProductFeature {
  title: string;
  description: string;
}

export default function ProductOverview({ features, name, variant }: {
  features: ProductFeature[];
  name: string;
  variant: "aurora" | "corporate" | "brutal";
}) {
  if (!features.length) return null;
  return (
    <aside className={`product-overview product-overview--${variant}`} aria-label={`${name} ürün özeti`}>
      <div className="product-overview-heading"><span>Yakından bakın</span><span>{String(features.length).padStart(2, "0")} özellik</span></div>
      <div className="product-overview-list">
        {features.slice(0, 3).map((feature, index) => (
          <a href={`#feature-${index + 1}`} key={index} className="product-overview-row">
            <span className="product-overview-index">{String(index + 1).padStart(2, "0")}</span>
            <span><strong>{feature.title}</strong></span>
            <span className="product-overview-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <a href="#waitlist" className="product-overview-link">İlgileniyor musunuz? Listeye katılın <span aria-hidden="true">→</span></a>
    </aside>
  );
}
