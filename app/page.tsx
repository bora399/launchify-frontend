import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-zinc-900 font-sans selection:bg-zinc-200">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="max-w-2xl">
          <div className="font-mono text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-zinc-300"></span>
            Girişimciler İçin Çözüm
          </div>
          
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.05] mb-8">
            Haftalar süren tasarımı <span className="italic text-zinc-500">saniyelere</span> indirin.
          </h1>
          
          <p className="text-lg text-zinc-600 mb-10 leading-relaxed max-w-xl">
            Sadece ürününüzün ne yaptığını anlatın. Geri kalan tüm metin yazarlığını ve kurumsal sayfa tasarımını yapay zeka sizin yerinize tamamlasın.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/create" className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors text-center">
              Ücretsiz Başlayın
            </Link>
            <a href="#nasil-calisir" className="w-full sm:w-auto px-8 py-4 border border-zinc-200 text-zinc-900 rounded-md text-sm font-medium hover:bg-zinc-50 transition-colors text-center">
              Nasıl Çalışır?
            </a>
          </div>
        </div>
        
        <div className="w-full lg:w-[450px] border border-zinc-200 rounded-xl p-8 bg-zinc-50/50">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
            <span className="text-sm font-medium">Launchify Avantajları</span>
          </div>
          <ul className="space-y-6 text-sm text-zinc-600">
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 mt-0.5"><span className="text-zinc-700 text-xs font-bold">✓</span></div>
              <div><strong className="text-zinc-900 block mb-1">Kodlama Gerektirmez</strong> Yazılımcı veya tasarımcı tutmadan profesyonel vitrininizi oluşturun.</div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 mt-0.5"><span className="text-zinc-700 text-xs font-bold">✓</span></div>
              <div><strong className="text-zinc-900 block mb-1">Dönüşüm Odaklı Metinler</strong> Satış psikolojisine uygun pazarlama metinleri yapay zeka ile yazılır.</div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 mt-0.5"><span className="text-zinc-700 text-xs font-bold">✓</span></div>
              <div><strong className="text-zinc-900 block mb-1">Anında Yayında</strong> Beklemek yok. Formu doldurduğunuz an sayfanız yayına hazır.</div>
            </li>
          </ul>
        </div>
      </section>

      {/* Avantajlar & Mimari (Nasıl Çalışır?) */}
      <section id="nasil-calisir" className="border-t border-zinc-200 bg-zinc-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-4">İşinizi büyütmeye odaklanın.</h2>
            <p className="text-zinc-500 max-w-2xl">Teknik detaylarla vakit kaybetmeyin. İhtiyacınız olan kurumsal duruşu Launchify sizin için inşa eder.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 auto-rows-[220px]">
            <div className="md:col-span-2 border border-zinc-200 rounded-2xl p-8 bg-white flex flex-col justify-end transition-colors hover:border-zinc-300">
              <h3 className="text-xl font-medium mb-2 text-zinc-900">İkna Edici Sloganlar</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Platformunuzun değerini müşteriye en iyi şekilde anlatan, akılda kalıcı pazarlama cümleleri otomatik olarak üretilir.</p>
            </div>
            
            <div className="md:col-span-2 border border-zinc-200 rounded-2xl p-8 bg-white flex flex-col justify-end transition-colors hover:border-zinc-300">
              <h3 className="text-xl font-medium mb-2 text-zinc-900">Kurumsal Tasarım Dili</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Müşterilerinize güven veren, karmaşadan uzak, net ve hedefe yönlendiren profesyonel arayüz tasarımları.</p>
            </div>
            
            <div className="md:col-span-4 border border-zinc-800 rounded-2xl p-8 lg:p-12 bg-zinc-900 text-white flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-medium mb-3">İlk izlenim saniyeler sürer.</h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  Potansiyel müşterileriniz veya yatırımcılarınız projeyi ilk gördüklerinde profesyonel bir vitrinle karşılaşsın. Platformunuzun kimliğini hemen şimdi belirleyin.
                </p>
              </div>
              <Link href="/create" className="shrink-0 bg-white text-zinc-900 px-8 py-4 rounded-md text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Sayfanızı Oluşturun
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* YENİ: Düzeltilmiş Vizyon & Hikaye Bölümü */}
      <section id="hakkimizda" className="py-24 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-start gap-16">
          
          {/* Sol Taraf: Hikaye (Tamamen Müşteri ve Problem Odaklı) */}
          <div className="flex-1">
            <h2 className="text-3xl font-medium tracking-tight mb-6">Launchify'ın Hikayesi</h2>
            <p className="text-lg text-zinc-600 mb-6 leading-relaxed">
              Günümüzde harika bir fikre sahip olmak yeterli değil; o fikri en hızlı ve en profesyonel şekilde pazara sunabilmek asıl farkı yaratıyor. Çoğu girişimci, ürününü geliştirmek yerine günlerini veya haftalarını web sitesi tasarlamakla, doğru pazarlama metnini bulmaya çalışmakla harcıyor.
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Launchify, işte tam bu darboğazı ortadan kaldırmak için doğdu. Gelişmiş yapay zeka entegrasyonumuz sayesinde, aklınızdaki fikri sadece birkaç cümleyle anlatmanız yeterli. Biz o vizyonu alıyor, saniyeler içinde potansiyel müşterilerinize güven verecek, satışa ve dönüşüme hazır profesyonel bir şirket vitrinine dönüştürüyoruz. Amacımız, sizin sadece işinizi büyütmeye odaklanmanızı sağlamak.
            </p>
          </div>

          {/* Sağ Taraf: İş Odaklı Değerler */}
          <div className="w-full md:w-[400px] flex flex-col gap-6">
            <div className="border-l-2 border-zinc-900 pl-6">
              <h4 className="text-lg font-medium text-zinc-900 mb-2">Hız ve Verimlilik</h4>
              <p className="text-sm text-zinc-500">Aylarca süren tasarım ve metin yazarlığı süreçlerini tek bir tıklamaya indirgeyin.</p>
            </div>
            <div className="border-l-2 border-zinc-900 pl-6">
              <h4 className="text-lg font-medium text-zinc-900 mb-2">Stratejik Yapay Zeka</h4>
              <p className="text-sm text-zinc-500">Jenerik metinler değil, doğrudan satış psikolojisine ve pazar dinamiklerine uygun içerikler.</p>
            </div>
            <div className="border-l-2 border-zinc-900 pl-6">
              <h4 className="text-lg font-medium text-zinc-900 mb-2">Kusursuz Tasarım Dili</h4>
              <p className="text-sm text-zinc-500">Müşteriyi yormayan, ürünü ve çözümü doğrudan ön plana çıkaran güvenilir arayüzler.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}