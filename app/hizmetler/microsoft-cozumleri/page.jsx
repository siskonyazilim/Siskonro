'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function MicrosoftSolutionsPage() { // NOSONAR
  const { t, locale, localizePath, lang } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.microsoftSolutions, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `microsoft-${lang}`;

  const benefits = isRo
    ? [
        'Creșterea productivității',
        'Optimizarea proceselor de afaceri',
        'Soluții rapide și ușor de implementat',
        'Analiza datelor și business intelligence',
        'Automatizarea fluxului de lucru',
        'Securitate ridicată',
        'Acces global și scalabilitate',
        'Integrare fără întreruperi',
      ]
    : isEn
    ? [
        'Increased productivity',
        'Optimized business processes',
        'Fast and easy-to-implement solutions',
        'Data analytics and business intelligence',
        'Workflow automation',
        'High security',
        'Global access and scalability',
        'Seamless integration',
      ]
    : [
        'Verimlilik artışı',
        'İş süreçlerinin optimize edilmesi',
        'Hızlı ve kolay uygulanabilir çözümler',
        'Veri analizi ve iş zekası',
        'İş akış otomasyonu',
        'Yüksek güvenlik',
        'Küresel erişim ve ölçeklenebilirlik',
        'Kesintisiz entegrasyon',
      ];

  const licenses = isRo
    ? [
        'Licențe Microsoft 365',
        'Licențe Windows',
        'Licențe Office',
        'Licențe Azure',
        'Licențe Microsoft Power Platform',
      ]
    : isEn
    ? [
        'Microsoft 365 licenses',
        'Windows licenses',
        'Office licenses',
        'Azure licenses',
        'Microsoft Power Platform licenses',
      ]
    : [
        'Microsoft 365 Lisansları',
        'Windows Lisansları',
        'Office Lisansları',
        'Azure Lisansları',
        'Microsoft Power Platform Lisansları',
      ];

  const powerPlatformShowcase = isRo
    ? {
        title: 'Microsoft Power Platforms',
        subtitle: 'Accelerați transformarea digitală cu Microsoft Power Platforms!',
        description: 'Aplicațiile Microsoft Power Platform aduc împreună analiza datelor, automatizarea fluxului de lucru și dezvoltarea de aplicații sub același acoperiș. Optimizați-vă procesele cu Power BI, Power Apps și Power Automate și creați un impact măsurabil în transformarea digitală.',
      }
    : isEn
    ? {
        title: 'Microsoft Power Platforms',
        subtitle: 'Accelerate your digital transformation with Microsoft Power Platforms!',
        description:
          'Microsoft Power Platform applications bring data analytics, workflow automation, and app development together under one roof. Optimize your processes with Power BI, Power Apps, and Power Automate, and create measurable impact in your digital transformation.',
      }
    : {
        title: 'Microsoft Power Platforms',
        subtitle: 'Dijital dönüşümünüzü hızlandırın ve yenilikçi stratejiler geliştirin!',
        description:
          'Microsoft Power Platform uygulamaları, işletmenizin ihtiyaç duyduğu veri analizi, iş akışı otomasyonu ve uygulama geliştirme çözümlerini tek bir çatı altında sunar. Power BI, Power Apps ve Power Automate gibi güçlü araçlarla iş süreçlerinizi optimize edin, dijital dönüşümde fark yaratın.',
      };

  const serviceSectionCopy = isRo
    ? {
        title: 'Soluții Microsoft',
        subtitle: 'Accelerați transformarea digitală cu tehnologiile Microsoft',
        description: 'Soluțiile puternice oferite de Microsoft precum Azure, Power BI, Power Apps și Power Automate sprijină afacerea dumneavoastră să realizeze transformarea digitală rapid și ușor. Prin serviciile noastre de vânzare de licențe, instruire și integrare, accelerăm procesul de transformare digitală și ducem afacerea dumneavoastră cu un pas înainte.',
      }
    : isEn
    ? {
        title: t('microsoftPage.title'),
        subtitle: t('microsoftPage.subtitle'),
        description: t('microsoftPage.description'),
      }
    : {
        title: 'Microsoft Çözümleri',
      subtitle: 'Microsoft teknolojileri ile dijital dönüşümünüzü hızlandırın',
        description:
          'Microsoft’un sunduğu Azure, Power BI, Power Apps ve Power Automate gibi güçlü çözümler, işletmenizin dijital dönüşümünü hızlı ve kolay bir şekilde gerçekleştirmenize destek olur. Lisans satışı, eğitim ve entegrasyon hizmetlerimizle dijital dönüşüm sürecinizi hızlandırıyor ve işinizi bir adım öne taşıyoruz.',
      };

  const heroSubtitle = isRo
    ? 'Accelerați transformarea digitală cu tehnologiile Microsoft.'
    : isEn
    ? 'Accelerate your digital transformation with Microsoft technologies.'
    : 'Dijital dönüşümünüzü hızlandırın ve yenilikçi stratejiler geliştirin!';

  const solutionsSectionTitle = isRo ? 'Soluții Microsoft Power Platforms' : isEn ? t('microsoftPage.solutionsTitle') : 'Microsoft Power Platforms Çözümleri';
  const solutionsSummary = isRo
    ? 'Soluțiile puternice Microsoft precum Azure, Power BI, Power Apps și Power Automate ajută afacerea dumneavoastră să execute transformarea digitală rapid și ușor. Cu servicii de licențiere, instruire și integrare, accelerăm călătoria dumneavoastră de transformare și ducem afacerea înainte.'
    : isEn
    ? 'Powerful Microsoft solutions such as Azure, Power BI, Power Apps, and Power Automate help your business execute digital transformation quickly and easily. With licensing, training, and integration services, we accelerate your transformation journey and move your business forward.'
    : 'Microsoft’un sunduğu Azure, Power BI, Power Apps ve Power Automate gibi güçlü çözümler, işletmenizin dijital dönüşümünü hızlı ve kolay bir şekilde gerçekleştirmenize destek olur. Lisans satışı, eğitim ve entegrasyon hizmetlerimizle dijital dönüşüm sürecinizi hızlandırıyor ve işinizi bir adım öne taşıyoruz.';

  const platformLogos = [
    {
      title: 'Power BI',
      src: '/assets/new/hizmetler/microsoft-cozumleri/power-bi-icon-seeklogo.svg',
      altEn: 'Microsoft Power BI logo',
      altTr: 'Microsoft Power BI logosu',
    },
    {
      title: 'Power Apps',
      src: '/assets/new/hizmetler/microsoft-cozumleri/Microsoft_Power_Apps_(2020).svg',
      altEn: 'Microsoft Power Apps logo',
      altTr: 'Microsoft Power Apps logosu',
    },
    {
      title: 'Power Automate',
      src: '/assets/new/hizmetler/microsoft-cozumleri/Microsoft_Power_Automate_(2020).svg',
      altEn: 'Microsoft Power Automate logo',
      altTr: 'Microsoft Power Automate logosu',
    },
  ];

  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const showMoreLabel = isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isEn ? 'Show Less' : 'Daha Az Göster';
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 5);

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={serviceName}
        subtitle={heroSubtitle}
        breadcrumbs={[t('microsoftPage.breadcrumbHome'), t('microsoftPage.breadcrumbServices'), serviceName]}
      />

      <section className="py-12 md:py-20 px-4 sm:px-5 md:px-6">
        <div className="container">
          <div className="reveal lg:hidden space-y-5">
            <div className="responsive-media-shell">
              <SmartImage
                src="/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-1-camera-2.webp"
                alt={isRo ? 'Soluții Microsoft Siskon - Transformare Digitală cu Power Platform' : isEn ? 'Siskon Microsoft Solutions - Digital Transformation with Power Platform' : 'Siskon Microsoft Çözümleri - Power Platform ile Dijital Dönüşüm'}
                width={1920}
                height={1080}
                className="w-full max-w-[860px] mx-auto object-contain drop-shadow-2xl"
                style={{ maxHeight: 'min(600px, 76vh)' }}
                sizes="100vw"
                priority
                quality={75}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
              <span className="eyebrow self-start">{t('microsoftPage.service')}</span>
              <p className="text-slate-600 text-lg leading-relaxed">{serviceSectionCopy.description}</p>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell">
                <SmartImage
                  src="/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-1-camera-2.webp"
                  alt={isRo ? 'Soluții Microsoft Siskon - Transformare Digitală cu Power Platform' : isEn ? 'Siskon Microsoft Solutions - Digital Transformation with Power Platform' : 'Siskon Microsoft Çözümleri - Power Platform ile Dijital Dönüşüm'}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[100%] md:max-w-[860px] md:ml-0 object-contain drop-shadow-2xl"
                  style={{ maxHeight: 'min(600px, 76vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{t('microsoftPage.service')}</span>
                <p className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto" lang="tr">
                  {serviceSectionCopy.description}
                </p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <p className="text-slate-600 text-lg leading-relaxed">
                  {serviceSectionCopy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[clamp(2.5rem,5vw,5rem)] px-4 sm:px-5 md:px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="eyebrow self-start">{t('microsoftPage.benefits')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{t('microsoftPage.benefitsTitle')}</h2>
            </div>
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              <div className="divide-y divide-cyan-300/70">
                {visibleBenefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                    <p className="text-[#0e4ea4] text-sm md:text-[0.9375rem] leading-snug font-medium">{item}</p>
                  </div>
                ))}
              </div>
              {benefits.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllBenefits((prev) => !prev)}
                  aria-expanded={showAllBenefits}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  <span>{showAllBenefits ? showLessLabel : showMoreLabel}</span>
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllBenefits ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 sm:px-5 md:px-6 bg-white">
        <div className="container">
          <div className="reveal px-0 md:px-2 py-10 md:py-12">
            <div className="text-center max-w-5xl mx-auto mb-8 md:mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f4d9a] leading-tight mb-4">{powerPlatformShowcase.title}</h2>
              <p className="text-lg md:text-2xl font-semibold text-sky-600 leading-tight mb-5 md:mb-6">{powerPlatformShowcase.subtitle}</p>
              <p className="text-slate-600 text-lg leading-relaxed">{powerPlatformShowcase.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="overflow-hidden shadow-[0_16px_40px_rgba(2,132,199,0.18)] bg-white">
                <SmartImage
                  src="/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-2-zeminli-camera.webp"
                  alt={isRo ? 'Soluții Microsoft vizualizare 1' : isEn ? 'Microsoft solutions visual scene 1' : 'Microsoft çözümleri görseli 1'}
                  width={1920}
                  height={1080}
                  className="responsive-framed-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
                  quality={75}
                />
              </div>

              <div className="overflow-hidden shadow-[0_16px_40px_rgba(2,132,199,0.18)] bg-white">
                <SmartImage
                  src="/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-3-zeminli-camera.webp"
                  alt={isRo ? 'Soluții Microsoft vizualizare 2' : isEn ? 'Microsoft solutions visual scene 2' : 'Microsoft çözümleri görseli 2'}
                  width={1920}
                  height={1080}
                  className="responsive-framed-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
                  quality={75}
                />
              </div>
            </div>
          </div>

          <div className="reveal text-center max-w-4xl mx-auto mt-12 md:mt-16 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{solutionsSectionTitle}</h2>
          </div>
          <div className="reveal">
            <div className="max-w-7xl mx-auto w-full grid grid-cols-3 gap-3 md:gap-20 lg:gap-28 items-center">
              {platformLogos.map((item) => (
                <div
                  key={item.title}
                  className="group flex items-center justify-center gap-2 md:gap-7 lg:gap-8"
                >
                  <div className="h-8 w-8 md:h-[5.5rem] md:w-[5.5rem] lg:h-[6.5rem] lg:w-[6.5rem] shrink-0 grid place-items-center transition-transform duration-300 group-hover:scale-105">
                    <SmartImage
                      src={item.src}
                      alt={isEn ? item.altEn : item.altTr}
                      width={104}
                      height={104}
                      className="h-full w-auto max-w-full object-contain"
                      style={{ width: 'auto' }}
                      sizes="104px"
                      quality={90}
                    />
                  </div>
                  <h3 className="text-[12px] md:text-2xl font-semibold text-[#0f4d9a] tracking-tight text-center md:text-left leading-snug">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block reveal text-center max-w-5xl mx-auto mt-12">
            <p className="text-slate-600 text-lg leading-relaxed">{solutionsSummary}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 sm:px-5 md:px-6 bg-white">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">{t('microsoftPage.licenses')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t('microsoftPage.licensesTitle')}</h2>
          </div>

          <div className="md:hidden space-y-8">
            <div className="reveal relative min-h-[280px] sm:min-h-[340px] flex items-center justify-center px-0">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="h-[68%] w-[78%] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.20)_0%,rgba(59,130,246,0.12)_34%,rgba(255,255,255,0)_72%)] blur-2xl" />
              </div>
              <img
                src="/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-4-camera-2.webp"
                alt={isRo ? 'Licențiere Microsoft vizualizare' : isEn ? 'Microsoft licensing visual' : 'Microsoft lisanslama görseli'}
                className="relative w-full max-w-[720px] h-auto object-contain saturate-110 contrast-[1.06] brightness-[1.02] drop-shadow-[0_24px_48px_rgba(15,23,42,0.20)]"
                loading="lazy"
              />
            </div>

            <div className="reveal">
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                <h3 className="text-xl font-bold text-[#0f4d9a] pb-4 mb-4 border-b border-slate-200 text-center">{t('microsoftPage.licensesSubtitle')}</h3>
                <ul className="divide-y divide-slate-200">
                  {licenses.map((license) => (
                    <li key={license} className="py-3.5 flex items-center gap-4">
                      <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0 shadow-[0_0_0_2px_rgba(186,230,253,0.8)]" aria-hidden="true" />
                      <span className="text-slate-700 text-base font-semibold leading-snug">{license}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-12 items-center">
            <div className="reveal md:col-span-12 lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-5 md:px-8 md:py-6 shadow-[0_14px_34px_rgba(15,23,42,0.06)] flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-[#0f4d9a] pb-5 mb-5 border-b border-slate-200">{t('microsoftPage.licensesSubtitle')}</h3>
                <ul className="divide-y divide-slate-200">
                  {licenses.map((license) => (
                    <li key={license} className="py-4 md:py-4.5 flex items-center gap-4">
                      <span className="w-3 h-3 rounded-full bg-sky-500 shrink-0 shadow-[0_0_0_2px_rgba(186,230,253,0.8)]" aria-hidden="true" />
                      <span className="text-slate-700 text-lg font-semibold leading-snug">{license}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal md:col-span-12 lg:col-span-7 flex items-center justify-center pt-8 md:pt-14">
              <div className="relative flex items-center justify-center w-full">
                <SmartImage
                  src="/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-4-camera-2.webp"
                  alt={isRo ? 'Licențiere Microsoft vizualizare' : isEn ? 'Microsoft licensing visual' : 'Microsoft lisanslama görseli'}
                  width={1500}
                  height={1500}
                  className="w-full h-auto max-h-[580px] object-contain mx-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('microsoftPage.ctaTitle')}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {t('microsoftPage.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('microsoftPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}

