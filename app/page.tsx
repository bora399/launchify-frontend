import Link from "next/link";

const templates = [
  { name: "Aurora", vibe: "Işık, derinlik ve cam dokular.", tone: "aurora" },
  { name: "Brutal", vibe: "Cesur çizgiler. Güçlü bir ilk izlenim.", tone: "brutal" },
  { name: "Minimal", vibe: "Sadece önemli olana odaklanın.", tone: "minimal" },
  { name: "Corporate", vibe: "Net, düzenli ve profesyonel.", tone: "corporate" },
];

export default function LaunchifyHome() {
  return (
    <div className="launch-home">
      <section className="launch-hero launch-container">
        <div className="launch-intro">
          <span className="launch-eyebrow"><span /> FİKRİNİZİN İLK ADRESİ</span>
          <h1>Büyük fikirler,<br /><span>bir sayfayla</span><br />başlar.</h1>
          <p>Ürününüzü anlatın. Yapay zeka metinlerinizi hazırlasın. Size özel bir tanıtım sayfasıyla ilk kullanıcılarınıza ulaşın.</p>
          <div className="launch-actions">
            <Link href="/create" className="launch-primary">Ücretsiz Deneyin <span aria-hidden="true">↗</span></Link>
            <a href="#ozellikler" className="launch-secondary">Özellikleri İncele <span aria-hidden="true">↓</span></a>
          </div>
          <div className="launch-benefits"><span>✓ Kod yazmadan</span><span>✓ 4 farklı şablon</span><span>✓ 3 başlangıç kredisi</span></div>
        </div>
        <div className="launch-showcase" aria-label="Örnek tanıtım sayfası taslağı">
          <div className="launch-orbit" aria-hidden="true" />
          <div className="launch-browser">
            <div className="launch-browser-bar"><span className="launch-dots" aria-hidden="true">● ● ●</span><span>Tanıtım sayfanız</span><span className="launch-preview-label">ÖRNEK TASLAK</span></div>
            <div className="launch-demo">
              <div className="launch-demo-nav"><strong>orbit<span>®</span></strong><span>Fikirden ilk adıma.</span></div>
              <span className="launch-demo-pill">DAHA AZ KARMAŞA. DAHA ÇOK ODAK.</span>
              <h2>Bir sonraki<br />büyük fikrine<br /><em>yer aç.</em></h2>
              <p>Ekibinizin fikirlerini bir araya getiren<br />daha sakin bir çalışma alanı.</p>
              <span className="launch-demo-cta">Erken erişime katıl <span aria-hidden="true">↗</span></span>
              <div className="launch-demo-footer"><span>01 / Birlikte düşün.</span><span>02 / Kolayca ilerle.</span></div>
            </div>
          </div>
          <div className="launch-note"><span className="launch-note-icon" aria-hidden="true">✦</span><div><strong>Sizin fikriniz. Sizin sesiniz.</strong><span>Metin, renk ve şablon bir arada.</span></div></div>
        </div>
      </section>

      <section id="ozellikler" className="launch-features launch-container">
        <div className="launch-section-heading"><div><span className="launch-eyebrow">FİKİRDEN YAYINA</span><h2>Başlamak için ihtiyacınız<br />olan her şey.</h2></div><p>Tek bir sayfayla anlatın, paylaşın<br />ve ürününüze olan ilgiyi ölçün.</p></div>
        <div className="launch-feature-grid">
          {[{ number: "01", icon: "✦", title: "Fikrinizi anlatın", copy: "Ürününüzü kısaca açıklayın. Yapay zeka başlıklarınızı ve tanıtım metinlerinizi hazırlasın." },
            { number: "02", icon: "◈", title: "Kendi tarzınızı seçin", copy: "Dört farklı şablon arasından seçim yapın. Metinleri ve renkleri markanıza göre düzenleyin." },
            { number: "03", icon: "↗", title: "İlk ilginizi ölçün", copy: "Bağlantınızı paylaşın, bekleme listesi kayıtlarını toplayın ve ziyaretleri panelinizden takip edin." }].map(item => (
            <article className="launch-feature" key={item.number}><div className="launch-feature-top"><span aria-hidden="true">{item.icon}</span><span>{item.number}</span></div><h3>{item.title}</h3><p>{item.copy}</p></article>
          ))}
        </div>
      </section>

      <section className="launch-templates launch-container" aria-labelledby="templates-title">
        <div className="launch-section-heading"><div><span className="launch-eyebrow">DÖRT TARZ. SİZİN HİKÂYENİZ.</span><h2 id="templates-title">Fikrinize yakışan bir görünüm.</h2></div><Link href="/create" className="launch-text-link">Şablonunuzu seçin ↗</Link></div>
        <div className="launch-template-grid">{templates.map(template => (
          <article className="launch-template" key={template.name}>
            <div className={`launch-mini launch-mini-${template.tone}`} aria-hidden="true"><div className="launch-mini-nav"><span /><i /><i /></div><div className="launch-mini-body"><span className="launch-mini-kicker" /><strong>Bir fikrin var.<br />Dünyayla paylaş.</strong><span className="launch-mini-line" /><span className="launch-mini-button">Başlayalım ↗</span></div></div>
            <h3>{template.name}</h3><p>{template.vibe}</p>
          </article>
        ))}</div>
      </section>

      <section className="launch-container launch-final">
        <div><span className="launch-eyebrow">SIRA SİZİN FİKRİNİZDE</span><h2>Bir sonraki adımı<br /><span>bugün atın.</span></h2><p>İlk tanıtım sayfanızı hazırlayın. Hikâyenizi paylaşmaya başlayın.</p></div>
        <Link href="/create" className="launch-primary">Projeyi Başlat <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  );
}
