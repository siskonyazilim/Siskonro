'use client';

import Link from 'next/link';
import PageHero from '../components/PageHero';
import { useLanguage } from '../_context/LanguageContext';

function getCultureCardTitle(isEn, isRo) {
  return isRo ? 'Echipa de Cercetare și Dezvoltare Siskon' : isEn ? 'Siskon R&D Team' : 'Siskon’un AR-GE Ekibi';
}

export default function ARGEPage() { // NOSONAR
  const { t, locale, localizePath } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  const heroBreadcrumbs = [t('rdPage.breadcrumbHome'), t('rdPage.breadcrumbRD')];

  const journeyAreas = [
    t('rdPage.journeyArea1Title'),
    t('rdPage.journeyArea2Title'),
    t('rdPage.journeyArea3Title'),
    t('rdPage.journeyArea4Title'),
  ];

  const collaborationFocus = [
    t('rdPage.focus1'),
    t('rdPage.focus2'),
    t('rdPage.focus3'),
    t('rdPage.focus4'),
  ];

  const cultureCapabilities = [
    t('rdPage.capability1'),
    t('rdPage.capability2'),
    t('rdPage.capability3'),
    t('rdPage.capability4'),
    t('rdPage.capability5'),
  ];

  const visibleCultureItems = cultureCapabilities;
  const cultureCardTitle = getCultureCardTitle(isEn, isRo);

  const patentsHeadingTop = isRo ? 'Brevete și' : isEn ? 'Patents and' : 'Patentler ve';
  const patentsHeadingBottom = isRo ? 'Drepturi de Proprietate Intelectuală' : isEn ? 'Intellectual Property Rights' : 'Fikri Mülkiyet Hakları';
  const patentsParagraph1 = isRo
    ? 'Siskon își demonstrează puterea de inovare cu brevete, mărci înregistrate și software propriu protejat prin drepturi de autor.'
    : isEn
    ? 'Siskon demonstrates its innovative power with patents, registered trademarks and proprietary software protected by copyrights.'
    : 'Siskon, patentleri, tescilli markaları ve telif haklarıyla korunan özgün yazılımlarıyla yenilikçi gücünü ortaya koyar.';
  const patentsParagraph2 = isRo
    ? 'Portofoliul său de brevete în inteligență artificială, achiziție de date, viziune computerizată, trasabilitatea producției și automatizare industrială este un indicator concret al abordării sale inginerești orientate spre cercetare și dezvoltare.'
    : isEn
    ? 'Its patent portfolio in artificial intelligence, data acquisition, computer vision, production traceability and industrial automation is a concrete indicator of its R&D-focused engineering approach.'
    : 'Yapay zekâ, veri toplama, görüntü işleme, üretim izlenebilirliği ve endüstriyel otomasyon alanlarındaki patent portföyü, AR-GE odaklı mühendislik yaklaşımının somut göstergesidir.';
  const patentsParagraph3 = isRo
    ? 'Acest portofoliu este extins continuu cu noi cereri de brevete și modele de utilitate.'
    : isEn
    ? 'This portfolio is continuously expanded with new patent and utility model applications.'
    : 'Bu portföy, yeni patent ve faydalı model başvurularıyla sürekli olarak genişletilmektedir.';

  const innovationHeadingTop = isRo ? 'Abordarea Inovației' : isEn ? "Siskon's Innovation" : "Siskon’un İnovasyon";
  const innovationHeadingBottom = isRo ? 'la Siskon' : isEn ? 'Approach' : 'Yaklaşımı';
  const innovationLead = isRo
    ? 'La Siskon, inovația nu este doar responsabilitatea unui departament, ci o responsabilitate comună a întregii organizații. Fiecare angajat contribuie cu idei pentru a face procesele mai inteligente, mai eficiente și mai durabile. În centrul acestei abordări se află următorul principiu:'
    : isEn
    ? 'At Siskon, innovation is not only a department responsibility but a shared responsibility of the entire organization. Every employee contributes ideas to make processes smarter, more efficient, and more sustainable. At the center of this approach is the following principle:'
    : 'Siskon’da inovasyon, yalnızca bir departmanın değil, tüm organizasyonun ortak sorumluluğudur. Her çalışan, süreçleri daha akıllı, verimli ve sürdürülebilir hale getirmek için fikir üretir. Bu yaklaşımın merkezinde şu anlayış yer alır:';
  const innovationQuote = isRo
    ? '„Fiecare inovație este o oportunitate de a construi un viitor mai bun în producție.”'
    : isEn
    ? '“Every innovation is an opportunity to build a better future in production.”'
    : '“Her yenilik, üretimde daha iyi bir gelecek inşa etme fırsatıdır.”';
  const innovationContactTitle = isRo
    ? 'Să Conturăm Viitorul Digital Împreună'
    : isEn
    ? 'Let’s Shape the Digital Future Together'
    : 'Birlikte Dijital Geleceği Şekillendirelim';
  const innovationContactDesc = isRo
    ? 'Contactați-ne pentru a afla mai multe despre proiectele R&D Siskon sau pentru a descoperi oportunități de colaborare:'
    : isEn
    ? 'Get in touch with us to learn more about Siskon R&D projects or discover collaboration opportunities:'
    : 'Siskon’un AR-GE projeleri hakkında daha fazla bilgi almak veya iş birliği fırsatlarını keşfetmek için bizimle iletişime geçin:';

  return (
    <div className="bg-white">
      <PageHero
        title={t('rdPage.pageTitle')}
        subtitle={t('rdPage.pageSubtitle')}
        breadcrumbs={heroBreadcrumbs}
      />

      <section className="pt-6 md:pt-10 pb-20 md:pb-36 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal order-1 lg:order-1">
              <div className="relative min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px]">
                <img
                  src="/assets/new/arge/arge2.svg"
                  alt={isRo ? 'Cercetare și Dezvoltare și Inovație Siskon' : isEn ? 'Siskon R&D and Innovation' : 'Siskon AR-GE ve İnovasyon'}
                  className="absolute inset-0 h-full w-full object-contain object-top p-2 sm:p-2 md:p-3 drop-shadow-[0_28px_56px_rgba(2,84,170,0.26)]"
                />
              </div>
            </div>
            <div className="reveal order-2 lg:order-2 h-full flex flex-col justify-start mt-8 md:mt-14">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm flex flex-col gap-5">
                <p className="text-slate-600 text-lg leading-relaxed">{t('rdPage.engineeringDesc1')}</p>
                <p className="text-slate-600 text-lg leading-relaxed">{t('rdPage.engineeringDesc2')}</p>
                <p className="text-slate-600 text-lg leading-relaxed">{t('rdPage.engineeringDesc3')}</p>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal space-y-8 order-2 lg:order-1">
              <div className="section-head text-left max-w-3xl mx-0 mb-0">
                <span className="eyebrow">{t('rdPage.journeyEyebrow')}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('rdPage.journeyTitle')}</h2>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">{t('rdPage.journeyLead1')}</p>
              <p className="text-slate-600 text-lg leading-relaxed">{t('rdPage.journeyLead2')}</p>

              <ul className="rounded-2xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
                {journeyAreas.map((title) => (
                  <li key={title} className="flex items-center gap-4 px-5 py-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-slate-800 text-base leading-snug">{title}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sky-600 font-semibold text-lg leading-relaxed">{t('rdPage.journeyOutro')}</p>
            </div>

            <div className="reveal relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px] order-1 lg:order-2">
              <img
                src="/assets/new/arge/Siskon 6 Arge Görsel 1.webp"
                alt={isRo ? 'Imagine călătorie R&D' : isEn ? 'R&D journey visual' : 'AR-GE yolculuğu görseli'}
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.12] sm:scale-[1.14] md:scale-[1.16] lg:scale-[1.18]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/20 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal order-1">
              <div className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[560px]">
                <img
                  src="/assets/new/arge/arge1.svg"
                  alt={isRo ? 'Imagine brevete și proprietate intelectuală' : isEn ? 'Patents and intellectual property visual' : 'Patentler ve fikri mulkiyet gorseli'}
                  className="absolute inset-0 h-full w-full object-contain object-center p-2 sm:p-4 md:p-6 drop-shadow-[0_20px_42px_rgba(2,84,170,0.2)]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="reveal order-2 text-left">
              <div className="section-head text-left max-w-3xl mx-0 mb-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  <span className="block text-sky-500">{patentsHeadingTop}</span>
                  <span className="block text-slate-900">{patentsHeadingBottom}</span>
                </h2>
              </div>

              <p className="text-sky-600 text-lg leading-relaxed font-semibold mb-5">
                {patentsParagraph1}
              </p>

              <p className="text-slate-600 text-lg leading-relaxed mb-5">
                {patentsParagraph2}
              </p>

              <p className="text-sky-600 text-lg leading-relaxed font-semibold mb-8">
                {patentsParagraph3}
              </p>

              <div className="mt-2 h-[3px] w-full bg-gradient-to-r from-sky-400 via-sky-200 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal space-y-8 order-2 lg:order-1">
              <div className="section-head text-left max-w-3xl mx-0 mb-0">
                <span className="eyebrow">{t('rdPage.ecosystemEyebrow')}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('rdPage.ecosystemTitle')}</h2>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">{t('rdPage.ecosystemLead1')}</p>
              <p className="text-slate-600 text-lg leading-relaxed">{t('rdPage.ecosystemLead2')}</p>

              <ul className="rounded-2xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
                <li className="px-5 py-4 border-b border-slate-100">
                  <p className="font-bold text-xl text-[#0f4d9a] text-balance">{t('rdPage.focusBoxHeader')}</p>
                </li>
                {collaborationFocus.map((item) => (
                  <li key={item} className="flex items-center gap-4 px-5 py-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-slate-800 text-base leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px] order-1 lg:order-2">
              <img
                src="/assets/new/arge/Siskon 6 Arge Görsel 2.webp"
                alt={isRo ? 'Imagine ecosistem internațional R&D' : isEn ? 'International R&D ecosystem visual' : 'Uluslararası AR-GE ekosistemi görseli'}
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.12] sm:scale-[1.14] md:scale-[1.16] lg:scale-[1.18]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/20 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 bg-transparent">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-14 items-start xl:items-stretch">
            <div className="reveal xl:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px]">
                <img
                  src="/assets/new/arge/Siskon 6 Arge Görsel 3.webp"
                  alt={isRo ? 'Imagine cultură și infrastructură R&D' : isEn ? 'R&D culture and infrastructure visual' : 'AR-GE kültürü ve altyapısı görseli'}
                  className="absolute inset-0 h-full w-full object-cover object-center scale-[1.1] sm:scale-[1.12] md:scale-[1.15] lg:scale-[1.18]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/20 via-transparent to-transparent" aria-hidden="true" />
              </div>
            </div>

            <div className="xl:col-span-7 flex flex-col text-left justify-center">
              <div className="reveal space-y-4">
                <span className="eyebrow">{t('rdPage.cultureEyebrow')}</span>
                {isRo ? (
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">Cultura noastră R&D și Infrastructura</h2>
                ) : isEn ? (
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{t('rdPage.cultureTitle')}</h2>
                ) : (
                  <h2 className="text-[2.5rem] md:text-[2.75rem] leading-tight font-bold tracking-tight">
                    <span className="block text-[#14afe3]">AR-GE Kültürümüz</span>
                    <span className="block text-[#0f4d9a]">ve Altyapımız</span>
                  </h2>
                )}
              </div>

              <div className="reveal mt-8 md:mt-10">
                  <ul className="rounded-2xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
                    <li className="px-5 py-4 border-b border-slate-100">
                      <p className="font-bold text-xl text-[#0f4d9a]">{cultureCardTitle}</p>
                    </li>
                    {visibleCultureItems.map((cap) => (
                      <li key={cap} className="flex items-center gap-4 px-5 py-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-slate-800 text-base leading-snug">{cap}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 md:py-32 px-6 bg-[linear-gradient(120deg,#02065e_0%,#0a4f9a_58%,#0aa3da_100%)]">
        <img
          src="/assets/new/arge/main_lines.svg"
          alt={isRo ? 'Fundal cu linii secțiunea Inovație' : isEn ? 'Innovation section line background' : 'İnovasyon bölüm çizgi arka planı'}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] md:w-[88%] md:top-0 md:translate-y-0 md:h-full md:object-contain opacity-90 md:opacity-65"
          loading="lazy"
        />

        <div className="relative z-10 container max-w-5xl text-center">
          <h2 className="mt-4 text-[1.6rem] md:text-[2rem] font-bold leading-tight tracking-tight">
            <span className="block text-[#31E2FF]">{innovationHeadingTop}</span>
            <span className="block text-white">{innovationHeadingBottom}</span>
          </h2>

          <p className="mt-8 max-w-4xl mx-auto text-[#22d3ee] text-base md:text-xl leading-relaxed">
            {innovationLead}
          </p>

          <div className="mt-6 md:mt-12 max-w-[280px] sm:max-w-md md:max-w-2xl mx-auto rounded-[2rem] sm:rounded-full border border-[#31E2FF]/70 bg-[#d2eaf0] px-6 sm:px-12 md:px-16 py-6 md:py-9 flex items-center justify-center shadow-lg">
            <p 
              className="text-[#0f4d9a] text-sm sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed text-center"
              style={{ textAlign: "center", width: "100%" }}
            >
              {isRo
                ? innovationQuote
                : isEn
                ? innovationQuote
                : (
                  <span className="inline-flex w-full flex-col items-center">
                    <span className="block w-fit text-center">&ldquo;Her yenilik, üretimde daha iyi bir gelecek</span>
                    <span className="block w-fit text-center">inşa etme fırsatıdır.&rdquo;</span>
                  </span>
                )}
            </p>
          </div>

          <h3 className="mt-10 md:mt-12 text-2xl md:text-3xl font-bold text-white">
            {innovationContactTitle}
          </h3>
          <p className="mt-4 text-white/90 text-lg leading-relaxed max-w-4xl mx-auto">
            {innovationContactDesc}
          </p>
          <a
            href="mailto:arge@siskon.com.tr"
            className="mt-4 inline-flex text-[#31E2FF] text-xl md:text-2xl font-bold hover:opacity-90"
          >
            arge@siskon.com.tr
          </a>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{t('rdPage.ctaSectionTitle')}</h2>
          <p>{t('rdPage.ctaSectionDesc')}</p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta">{t('rdPage.ctaSectionButton')}</Link>
        </div>
      </section>
    </div>
  );
}


