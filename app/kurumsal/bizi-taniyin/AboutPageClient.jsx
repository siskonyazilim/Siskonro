'use client';

import AnimatedCTALink from '../../components/AnimatedCTALink';
import PageHero from '../../components/PageHero';
import MilestonesSlider from '../../components/MilestonesSlider';
import { useLanguage } from '../../_context/LanguageContext';
import { usePageLocale } from '../../lib/i18n/usePageLocale';
import trLocale from '../../../messages/aboutPage/tr.json';
import enLocale from '../../../messages/aboutPage/en.json';
import roLocale from '../../../messages/aboutPage/ro.json';

/**
 * Bizi Tanıyın Sayfası — Client Component
 *
 * Strapi'den gelen `data` prop'u alır; UI label'ları JSON fallback ile beslenir.
 * Görseller ve içerikler Strapi'den, statik etiketler JSON'dan gelir.
 */
export default function AboutPageClient({ data }) {
  const { locale, localizePath } = useLanguage();
  const pt = usePageLocale(trLocale, enLocale, roLocale);

  // Strapi verisini kullan, yoksa JSON fallback
  const s = data ?? {};

  const pageTitle = s.pageTitle || pt('pageTitle');
  const pageSubtitle = s.pageSubtitle || pt('pageSubtitle');
  const cultureDesc1 = s.cultureDesc1 || pt('cultureDesc1');
  const cultureDesc2 = s.cultureDesc2 || pt('cultureDesc2');

  const highlights = s.highlights?.length
    ? s.highlights
    : [
      { title: pt('highlight1Title'), text: pt('highlight1Text'), icon: null },
      { title: pt('highlight2Title'), text: pt('highlight2Text'), icon: null },
      { title: pt('highlight3Title'), text: pt('highlight3Text'), icon: null },
      { title: pt('highlight4Title'), text: pt('highlight4Text'), icon: null },
    ];

  const frameworkEyebrow = s.frameworkEyebrow || pt('frameworkEyebrow');
  const frameworkTitle = s.frameworkTitle || pt('frameworkTitle');
  const visionTitle = s.visionTitle || pt('visionTitle');
  const visionText = s.visionText || pt('visionText');
  const missionTitle = s.missionTitle || pt('missionTitle');
  const missionText = s.missionText || pt('missionText');
  const valuesTitle = s.valuesTitle || pt('valuesTitle');
  const values = s.values?.length ? s.values : Object.values(pt('values') ?? {});

  const isoSectionTitle = s.isoSectionTitle || pt('isoSectionTitle');
  const isoCertificates = s.isoCertificates?.length
    ? s.isoCertificates
    : [
      { code: 'ISO/IEC 27001:2022', label: pt('isoLabel'), image: null },
      { code: 'ISO/IEC 27701:2019', label: pt('isoLabel'), image: null },
      { code: 'ISO 9001:2015', label: pt('isoLabel'), image: null },
    ];

  const ctaSectionTitle = s.ctaSectionTitle || pt('ctaSectionTitle');
  const ctaSectionDesc = s.ctaSectionDesc || pt('ctaSectionDesc');
  const ctaSectionButton = s.ctaSectionButton || pt('ctaSectionButton');

  const teamPhoto = s.teamPhoto;
  const goalsImage = s.goalsImage;

  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const teamPhotoAlt = isRo ? 'Echipa de Automatizare și Software Siskon' : isEn ? 'Siskon Automation and Software Team' : 'Siskon Otomasyon ve Yazılım Ekibi';
  const goalsVisualAlt = isRo ? 'Imagine cu obiectivele noastre' : isEn ? 'Our goals visual' : 'Hedeflerimiz görseli';

  const breadcrumbs = [pt('breadcrumbHome'), pt('breadcrumbCorporate'), pt('breadcrumbAbout')];

  return (
    <div className="bg-white">
      <PageHero title={pageTitle} subtitle={pageSubtitle} breadcrumbs={breadcrumbs} />

      {/* Ekip fotoğrafı + açıklama */}
      <section className="relative overflow-hidden py-8 md:py-12 lg:py-20 px-4 md:px-6">
        <img
          src="/assets/new/kurumsal/bizi-taniyin/asset-50.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-32 md:-right-20 top-1/2 -translate-y-1/2 w-[480px] md:w-[620px] max-w-none opacity-[0.45]"
        />
        <div className="container-wide">
          <div className="reveal">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-10 md:p-14 lg:p-16 shadow-sm space-y-4 md:space-y-6 text-slate-600 text-lg leading-relaxed font-archivo">
              <p>{cultureDesc1}</p>
              <p>{cultureDesc2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight kartları */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 relative overflow-hidden bg-gradient-to-br from-[#f3fcff] via-white to-[#f9fdff]">
        <div className="pointer-events-none absolute right-[-210px] md:right-[-140px] top-1/2 -translate-y-1/2" aria-hidden="true">
          <div className="relative w-[420px] h-[420px] md:w-[560px] md:h-[560px] opacity-40">
            <span className="absolute inset-0 rounded-full border border-cyan-300/55" />
            <span className="absolute inset-[13%] rounded-full border border-cyan-300/45" />
            <span className="absolute inset-[26%] rounded-full border border-cyan-300/35" />
          </div>
        </div>
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 auto-rows-fr">
            {highlights.map((item) => (
              <article
                key={item.title}
                className="reveal relative h-full bg-white/95 border-[1.5px] border-cyan-300 rounded-[20px] p-8 md:p-10 pt-12 md:pt-14 text-[#0F4D9A] transition-all duration-300 hover:shadow-md overflow-visible shadow-sm"
              >
                <div className="absolute -top-5 left-7" aria-hidden="true">
                  <img
                    src={item.icon || '/assets/new/kurumsal/bizi-taniyin/asset-48.svg'}
                    alt=""
                    width="64"
                    height="64"
                    className="w-14 h-14 drop-shadow-[0_4px_10px_rgba(0,180,210,0.28)]"
                  />
                </div>
                <div className="relative z-10 flex h-full flex-col">
                  <h3 className="text-[1.85rem] md:text-[2rem] font-black mb-4 leading-tight text-[#03499D] min-h-[4.8rem] md:min-h-[5.6rem]">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-[1.06rem] leading-[1.65] font-normal text-[#03408B]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vizyon / Misyon / Değerler */}
      <section className="py-7 md:py-10 lg:py-14 px-4 md:px-6 relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute right-[-220px] top-1/2 -translate-y-1/2 opacity-40" aria-hidden="true">
          <div className="relative w-[460px] h-[460px]">
            <span className="absolute inset-0 rounded-full border border-[#08DCFF]/45" />
            <span className="absolute inset-[15%] rounded-full border border-[#00B9F2]/35" />
            <span className="absolute inset-[30%] rounded-full border border-[#03499A]/20" />
          </div>
        </div>
        <div className="container-wide">
          <div className="reveal grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-6 md:gap-10 lg:gap-16 items-center mb-6 md:mb-8">
            <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-2 lg:order-1 h-full mx-auto w-full">
              <div className="w-full text-center">
                <span className="eyebrow text-xs md:text-sm inline-block mb-1 mx-auto">{frameworkEyebrow}</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0F4D9A] mt-2 leading-tight text-center w-full">
                {frameworkTitle}
              </h2>
            </div>
            <div className="relative rounded-xl w-full flex justify-end items-center order-1 lg:order-2">
              {goalsImage ? (
                <img
                  src={goalsImage}
                  alt={goalsVisualAlt}
                  className="w-full h-auto object-cover drop-shadow-[0_20px_40px_rgba(15,77,154,0.15)] origin-right scale-[1.03]"
                />
              ) : (
                <>
                  <img
                    src="/assets/new/kurumsal/bizi-taniyin/Hedeflerimiz.webp"
                    alt={goalsVisualAlt}
                    className="w-full h-auto object-cover block lg:hidden mx-auto"
                  />
                  <img
                    src="/assets/new/kurumsal/bizi-taniyin/HedeflerimizDesktop.svg"
                    alt={goalsVisualAlt}
                    className="w-full h-auto object-cover hidden lg:block drop-shadow-[0_20px_40px_rgba(15,77,154,0.15)] origin-right scale-[1.03]"
                  />
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch relative z-10">
            <article className="reveal group relative h-full rounded-[18px] border-[1.5px] border-[#08DCFF] bg-white p-8 md:p-10 text-left shadow-[0_10px_22px_rgba(3,64,139,0.08)] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-full flex-col">
                <h3 className="font-['Belfast_Grotesk'] text-[2rem] md:text-[2.15rem] leading-[1.28] font-bold mb-5 text-[#03499D]">{visionTitle}</h3>
                <p className="font-['Lufga'] text-base md:text-[1.08rem] leading-[1.68] font-normal text-[#03408B] text-left">{visionText}</p>
              </div>
            </article>

            <article className="reveal group relative h-full rounded-[18px] border-[1.5px] border-[#08DCFF] bg-white p-8 md:p-10 text-left shadow-[0_10px_22px_rgba(3,64,139,0.08)] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-full flex-col">
                <h3 className="font-['Belfast_Grotesk'] text-[2rem] md:text-[2.15rem] leading-[1.28] font-bold mb-5 text-[#03499D]">{missionTitle}</h3>
                <p className="font-['Lufga'] text-base md:text-[1.08rem] leading-[1.68] font-normal text-[#03408B] text-left">{missionText}</p>
              </div>
            </article>

            <article className="reveal group relative h-full rounded-[18px] border-[1.5px] border-[#08DCFF] bg-white p-8 md:p-10 text-left shadow-[0_10px_22px_rgba(3,64,139,0.08)] transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex h-full flex-col">
                <h3 className="font-['Belfast_Grotesk'] text-[2rem] md:text-[2.15rem] leading-[1.28] font-bold mb-5 text-[#03499D]">{valuesTitle}</h3>
                <ul className="space-y-2.5 md:space-y-3 font-['Lufga'] text-base md:text-[1.08rem] leading-[1.68] font-normal text-[#03408B]">
                  {values.map((v) => (
                    <li key={v} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#08DCFF]" aria-hidden="true" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Kilometre Taşları */}
      <MilestonesSlider
        milestones={s.milestones ?? null}
        sectionTitle={s.milestoneSectionTitle ?? null}
      />

      {/* ISO Sertifikaları */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 bg-white text-slate-900 relative overflow-hidden">
        <div className="container-wide text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-[#0F4D9A] mb-10 md:mb-14">
            {isoSectionTitle || pt('isoSectionTitle')}
          </h2>
          {/* Sitenin içerik genişliğini (container-wide) kullanır; ek max-width yok */}
          {/* sm-md'de 2 sütun: tek kalan son sertifika alt satırda ortalanır; lg'de 3 sütun */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 items-start sm:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
            {isoCertificates.map((iso) => (
              <article key={iso.code} className="reveal flex flex-col items-center px-3 md:px-4">
                <img
                  src={iso.image || '/assets/new/kurumsal/bizi-taniyin/ISO.svg'}
                  alt={`${iso.code} ${pt('isoLogoAlt')}`}
                  className="w-[210px] md:w-[230px] h-auto mb-6 md:mb-7"
                />
                <h3 className="text-[#0F4D9A] font-black text-xl md:text-2xl leading-tight tracking-tight mb-3">{iso.code}</h3>
                <p className="text-[#0F4D9A] font-bold text-base md:text-xl leading-tight">{iso.label || pt('isoLabel')}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{ctaSectionTitle}</h2>
          <p>{ctaSectionDesc}</p>
          <AnimatedCTALink href={`${localizePath('/iletisim')}#contact-form`}>
            {ctaSectionButton}
          </AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
