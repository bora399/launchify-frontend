import Link from "next/link";
import LaunchifyFaq from "../components/LaunchifyFaq";

export default function SssPage() {
  return (
    <div className="help-page">
      <div className="help-container">
        <div className="help-breadcrumb">
          <Link href="/">Launchify</Link>
          <span aria-hidden="true">/</span>
          <span>Sıkça sorulan sorular</span>
        </div>
        <div className="help-layout">
          <header className="help-intro">
            <span className="help-section-label">
              Kullanmaya başlamadan önce
            </span>
            <h1>
              Aklınızdaki
              <br />
              <span>sorular.</span>
            </h1>
            <p>
              Sayfa oluşturma, bekleme listesi ve hesabınızla ilgili kısa
              yanıtlar.
            </p>
            <div className="help-side-note">
              <span>Bir sonraki adım</span>
              <p>
                Nasıl çalıştığını inceleyin ya da ilk sayfanızı hazırlamaya
                başlayın.
              </p>
              <Link href="/#ozellikler">
                Özelliklere göz atın <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </header>
          <div className="help-content">
            <div className="help-list-heading">
              <span>Launchify kullanımı</span>
              <span>05 soru</span>
            </div>
            <LaunchifyFaq />
            <div className="help-next">
              <div>
                <h2>İlk sayfanızı hazırlayın.</h2>
                <p>Ürününüzü anlatın, gerisini birlikte şekillendirelim.</p>
              </div>
              <Link href="/create">
                Sayfa oluştur <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
