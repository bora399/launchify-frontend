import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Ürününüzü anlatın.",
    copy: "Kime hitap ettiğinizi ve hangi problemi çözdüğünüzü yazın. İlk sayfanız bu bilgilerle şekillensin.",
  },
  {
    number: "02",
    title: "Kendinize göre düzenleyin.",
    copy: "Dört şablondan birini seçin. Hazırlanan başlıkları, metinleri ve renkleri ürününüze göre düzenleyin.",
  },
  {
    number: "03",
    title: "Paylaşın, ilgiyi görün.",
    copy: "Sayfanızın bağlantısını paylaşın. Ziyaretleri ve bekleme listesi kayıtlarını panelinizden takip edin.",
  },
];
export default function AboutPage() {
  return (
    <div className="about-page">
      <main className="about-container">
        <div className="help-breadcrumb">
          <Link href="/">Launchify</Link>
          <span aria-hidden="true">/</span>
          <span>Hakkımızda</span>
        </div>
        <header className="about-intro">
          <div>
            <span className="help-section-label">Launchify hakkında</span>
            <h1>
              Ürününüzü anlatın.
              <br />
              <span>İlk adımı atın.</span>
            </h1>
          </div>
          <p>
            Launchify, ürününü tanıtmak ve ilk ilgiyi görmek isteyenler için bir
            sayfa oluşturma aracı. Açıklamanızdan bir başlangıç hazırlar; son
            söz metinlerde de tasarımda da sizde kalır.
          </p>
        </header>
        <section
          className="about-purpose"
          aria-labelledby="about-purpose-title"
        >
          <span className="help-section-label">Neden Launchify?</span>
          <div>
            <h2 id="about-purpose-title">
              Bir fikri paylaşmak,
              <br />
              başlı başına bir proje olmasın.
            </h2>
            <p>
              Bir ürünü geliştirmeden önce onu anlatabileceğiniz bir yere
              ihtiyaç duyarsınız. Launchify, bu ilk sayfayı hazırlamayı
              kolaylaştırır.
            </p>
            <p>
              Metin, tasarım ve bekleme listesi aynı yerde buluşur. Siz
              ürününüze odaklanırken, paylaşabileceğiniz bir sayfanız ve gelen
              ilgiyi takip edebileceğiniz bir paneliniz olur.
            </p>
          </div>
        </section>
        <section
          className="about-process"
          aria-labelledby="about-process-title"
        >
          <div className="about-section-heading">
            <span className="help-section-label">Fikirden yayına</span>
            <h2 id="about-process-title">Üç adımda başlayın.</h2>
          </div>
          <div className="about-step-grid">
            {steps.map((step) => (
              <article className="about-step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="about-principles"
          aria-label="Launchify ile yapabilecekleriniz"
        >
          <div>
            <span aria-hidden="true">↳</span>
            <h3>Kod yazmadan başlayın.</h3>
            <p>
              Ürününüzü tarif edin. Başlık ve tanıtım metinleri için bir
              başlangıç elde edin.
            </p>
          </div>
          <div>
            <span aria-hidden="true">Aa</span>
            <h3>Sayfanıza kendi dilinizi katın.</h3>
            <p>
              Aurora, Brutal, Corporate ve Minimal arasından seçin; metinleri ve
              renkleri düzenleyin.
            </p>
          </div>
          <div>
            <span aria-hidden="true">↗</span>
            <h3>Gelen ilgiyi takip edin.</h3>
            <p>
              Ziyaretleri ve kayıtları görün. Bekleme listenizi gerektiğinde CSV
              olarak indirin.
            </p>
          </div>
        </section>
        <div className="about-next">
          <div>
            <h2>İlk sayfanızla başlayın.</h2>
            <p>Yeni hesabınızda 3 oluşturma kredisi sizi bekliyor.</p>
          </div>
          <Link className="about-primary" href="/create">
            Sayfa oluştur <span aria-hidden="true">↗</span>
          </Link>
          <Link className="about-faq-link" href="/sss">
            Sorularınız mı var?
          </Link>
        </div>
      </main>
    </div>
  );
}
