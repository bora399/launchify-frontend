"use client";

import { useId, useState } from "react";

const questions = [
  {
    q: "Launchify tam olarak ne işe yarar?",
    a: "Launchify, ürününüz için bir tanıtım sayfası hazırlamanızı sağlar. Ürününüzü anlatır, şablonunuzu seçer ve metinlerinizi düzenlersiniz. Paylaştığınız sayfadan bekleme listesi kayıtları toplayabilir, ziyaretleri panelinizden takip edebilirsiniz.",
  },
  {
    q: "Sayfa oluşturmak için teknik bilgi gerekir mi?",
    a: "Kod yazmanız gerekmez. Ürününüzün ne yaptığını açıklamanız yeterlidir. Yapay zeka başlık, açıklama ve özellik metinlerini hazırlar; siz Aurora, Brutal, Corporate veya Minimal şablonlarından birini seçersiniz.",
  },
  {
    q: "Bekleme listesine gelen kayıtları nereden görebilirim?",
    a: "Panelinizde ilgili projenin işlem menüsünden Toplanan Talepler seçeneğini açın. Kayıtları görüntüleyebilir, e-posta listesini CSV olarak indirebilirsiniz. Ziyaret ve dönüşüm bilgileri de panelinizde yer alır.",
  },
  {
    q: "Sayfamın kodunu dışa aktarabilir miyim?",
    a: "Evet. Projenizin işlem menüsündeki HTML Olarak İndir seçeneğini kullanabilirsiniz. İndirdiğiniz dosyayı kendi barındırma hizmetinize yükleyebilirsiniz. Dışa aktarılan formun canlı kayıt bağlantısını ayrıca kontrol etmeniz gerekir.",
  },
  {
    q: "Ücretsiz oluşturma kredisi nasıl çalışır?",
    a: "Yeni hesabınıza 3 proje oluşturma kredisi tanımlanır. Her oluşturma işlemi 1 kredi kullanır. Panelinizden bir projeyi sildiğinizde 1 kredi iade edilir; hesabınızdaki kredi üst sınırı 3'tür.",
  },
];

export default function LaunchifyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const groupId = useId();
  return (
    <div className="help-accordion">
      {questions.map((question, index) => {
        const open = openIndex === index;
        const answerId = `${groupId}-answer-${index}`;
        const buttonId = `${groupId}-question-${index}`;
        return (
          <article
            key={question.q}
            className={`help-question ${open ? "is-open" : ""}`}
          >
            <h2>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span className="help-question-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{question.q}</span>
                <span className="help-question-toggle" aria-hidden="true">
                  {open ? "−" : "+"}
                </span>
              </button>
            </h2>
            <div
              id={answerId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="help-answer"
            >
              <p>{question.a}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
