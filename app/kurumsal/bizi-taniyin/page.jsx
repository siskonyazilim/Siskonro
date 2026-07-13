'use client';

import Link from 'next/link';
import { useLanguage } from '../../_context/LanguageContext';
import PageHero from '../../components/PageHero';
import MilestonesSlider from '../../components/MilestonesSlider';

export default function AboutPage() { // NOSONAR
  const { lang, locale, localizePath, t } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  // Force re-render when language changes
  const contentKey = `about-${lang}`;

  const resolveValueLabel = (key) => {
    const directKey = `aboutPage.values.${key}`;
    const directValue = t(directKey);
    if (directValue !== directKey) {
      return directValue;
    }

    const localizedKey = `aboutPage.values.${key}.${locale}`;
    const localizedValue = t(localizedKey);
    if (localizedValue !== localizedKey) {
      return localizedValue;
    }

    const trKey = `aboutPage.values.${key}.tr`;
    const trValue = t(trKey);
    if (trValue !== trKey) {
      return trValue;
    }

    return key;
  };

  const values = [
    resolveValueLabel('reliability'),
    resolveValueLabel('agility'),
    resolveValueLabel('innovation'),
    resolveValueLabel('justice'),
    resolveValueLabel('collaboration'),
    resolveValueLabel('sustainability'),
    resolveValueLabel('humanCentric'),
  ];

  const cultureHighlights = [
    {
      title: t('aboutPage.highlight1Title'),
      text: t('aboutPage.highlight1Text'),
    },
    {
      title: t('aboutPage.highlight2Title'),
      text: t('aboutPage.highlight2Text'),
    },
    {
      title: t('aboutPage.highlight3Title'),
      text: t('aboutPage.highlight3Text'),
    },
    {
      title: t('aboutPage.highlight4Title'),
      text: t('aboutPage.highlight4Text'),
    },
  ];

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={t('aboutPage.pageTitle')}
        subtitle={t('aboutPage.pageSubtitle')}
        breadcrumbs={[
          t('aboutPage.breadcrumbHome'),
          t('aboutPage.breadcrumbCorporate'),
          t('aboutPage.breadcrumbAbout')
        ]}
      />

      {/* Main Content Section */}
      <section className="relative overflow-hidden py-8 md:py-12 lg:py-20 px-4 md:px-6">
        <img
          src="/assets/new/kurumsal/bizi-taniyin/Asset%2050.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-32 md:-right-20 top-1/2 -translate-y-1/2 w-[480px] md:w-[620px] max-w-none opacity-[0.45]"
        />
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-12 items-center">
            <div className="reveal order-1">
              <div className="relative rounded-[32px] md:rounded-[40px] overflow-hidden shadow-2xl group">
                <img
                  src="/assets/new/kurumsal/bizi-taniyin/Siskon-Toplu-Foto.webp"
                  alt={isRo ? 'Echipa de Automatizare și Software Siskon' : isEn ? 'Siskon Automation and Software Team' : 'Siskon Otomasyon ve Yazılım Ekibi'}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent"></div>
              </div>
            </div>
            <div className="reveal order-2">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 md:p-8 shadow-sm space-y-4 md:space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>{t('aboutPage.cultureDesc1')}</p>
                <p>{t('aboutPage.cultureDesc2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Highlights Grid */}
      <section className="py-6 md:py-10 lg:py-16 px-4 md:px-6 relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-8">
            {cultureHighlights.map((item) => (
              <article
                key={item.title}
                className="reveal relative bg-white border-[3px] border-cyan-400 rounded-[28px] p-8 md:p-10 pt-12 md:pt-14 text-[#0F4D9A] transition-all duration-300 hover:-translate-y-1 overflow-visible shadow-md"
              >
                {/* Asset 48 icon - sol üst köşe */}
                <div className="absolute -top-5 left-7" aria-hidden="true">
                  <img
                    src="/assets/new/kurumsal/bizi-taniyin/Asset%2048.svg"
                    alt=""
                    width="64"
                    height="64"
                    className="w-14 h-14 drop-shadow-[0_4px_10px_rgba(0,180,210,0.35)]"
                  />
                </div>

                <h3 className="relative z-10 text-xl md:text-2xl lg:text-[1.7rem] font-black mb-5 leading-tight">
                  {item.title}
                </h3>
                <p className="relative z-10 text-sm md:text-base lg:text-[1.05rem] leading-relaxed font-medium text-[#0F4D9A]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission and Values */}
      <section className="py-7 md:py-10 lg:py-14 px-4 md:px-6">
        <div className="container-wide">
          <div className="reveal grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4 md:gap-8 lg:gap-10 items-center mb-8 md:mb-12">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden max-w-[240px] md:max-w-[320px] lg:max-w-[560px] mx-auto lg:mx-0">
              <img
                src="/assets/new/kurumsal/bizi-taniyin/Hedeflerimiz.webp"
                alt={isRo ? 'Imagine cu obiectivele noastre' : isEn ? 'Our goals visual' : 'Hedeflerimiz görseli'}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="max-w-2xl lg:pl-2 text-center lg:text-left">
              <span className="eyebrow text-xs md:text-sm">{t('aboutPage.frameworkEyebrow')}</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0F4D9A] mt-3 leading-tight">
                {t('aboutPage.frameworkTitle')}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 items-stretch">
            <article className="reveal group relative h-full bg-white/80 border-[3px] border-cyan-400 rounded-3xl p-8 md:p-10 text-[#0F4D9A] transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-full flex-col">
                <h3 className="text-xl md:text-2xl lg:text-[1.7rem] font-black mb-5 leading-tight">{t('aboutPage.visionTitle')}</h3>
                <p className="text-sm md:text-base lg:text-[1.05rem] leading-relaxed font-medium text-[#0F4D9A]">
                  {t('aboutPage.visionText')}
                </p>
              </div>
            </article>

            <article className="reveal group relative h-full bg-white/80 border-[3px] border-cyan-400 rounded-3xl p-8 md:p-10 text-[#0F4D9A] transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-full flex-col">
                <h3 className="text-xl md:text-2xl lg:text-[1.7rem] font-black mb-5 leading-tight">{t('aboutPage.missionTitle')}</h3>
                <p className="text-sm md:text-base lg:text-[1.05rem] leading-relaxed font-medium text-[#0F4D9A]">
                  {t('aboutPage.missionText')}
                </p>
              </div>
            </article>

            <article className="reveal group relative h-full bg-white/80 border-[3px] border-cyan-400 rounded-3xl p-8 md:p-10 text-[#0F4D9A] transition-all duration-300 hover:-translate-y-1">
              <div className="flex h-full flex-col">
                <h3 className="text-xl md:text-2xl lg:text-[1.7rem] font-black mb-5 leading-tight">{t('aboutPage.valuesTitle')}</h3>
                <ul className="space-y-2.5 md:space-y-3 text-sm md:text-base lg:text-[1.05rem] font-medium text-[#0F4D9A]">
                  {values.map((v) => (
                    <li key={v} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Milestones Slider */}
      <MilestonesSlider />

      {/* ISO Certificates */}
      <section className="py-8 md:py-12 lg:py-16 px-4 md:px-6 bg-white text-slate-900 relative overflow-hidden">
        <div className="container-wide text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-[#0F4D9A] mb-10 md:mb-14">
            {t('aboutPage.isoSectionTitle')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 max-w-6xl mx-auto items-start">
            {[
              'ISO/IEC 27001:2022',
              'ISO/IEC 27701:2019',
              'ISO 9001:2015'
            ].map((iso) => (
              <article key={iso} className="reveal flex flex-col items-center px-3 md:px-4">
                <img
                  src="/assets/new/kurumsal/bizi-taniyin/ISO.svg"
                  alt={`${iso} ${t('aboutPage.isoLogoAlt')}`}
                  className="w-[210px] md:w-[230px] h-auto mb-6 md:mb-7"
                />
                <h3 className="text-[#0F4D9A] font-black text-xl md:text-2xl leading-tight tracking-tight mb-3">
                  {iso}
                </h3>
                <p className="text-[#0F4D9A] font-bold text-base md:text-xl leading-tight">
                  {t('aboutPage.isoLabel')}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{t('aboutPage.ctaSectionTitle')}</h2>
          <p>{t('aboutPage.ctaSectionDesc')}</p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta">
            {t('aboutPage.ctaSectionButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
