'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function GEVernovaPage() { // NOSONAR
  const { t, locale, localizePath, lang } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.geVernovaProficy, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `gevernova-${lang}`;

  const benefits = isRo
    ? [
        'Eficiență îmbunătățită în procesele de producție',
        'Accelerarea inițiativelor de digitalizare',
        'Dezvoltarea unei infrastructuri industriale sustenabile',
        'Excelență operațională',
      ]
    : isEn
    ? [
        'Improved efficiency in production processes',
        'Accelerated digitalization initiatives',
        'Sustainable industrial infrastructure development',
        'Operational excellence',
      ]
    : [
        'Üretim Süreçlerinde Verimlilik Artışı',
        'Dijitalleşme Süreçlerinin Hızlandırılması',
        'Sürdürülebilir Endüstriyel Altyapı Oluşturma',
        'Operasyonel Mükemmeliyet',
      ];

  const solutions = isRo
    ? [
        'Automatizare industrială și integrare software',
        'Expertiză în familia de produse GE Vernova',
        'Consultanță în transformarea digitală pentru industriile de producție',
        'Dezvoltarea sistemelor de suport decizional bazate pe date',
      ]
    : isEn
    ? [
        'Industrial automation and software integration',
        'Expertise in the GE Vernova product family',
        'Digital transformation consulting for manufacturing industries',
        'Development of data-driven decision support systems',
      ]
    : [
        'Endüstriyel Otomasyon ve Yazılım Entegrasyonu',
        'GE Vernova Ürün Ailesi Konusunda Uzmanlık',
        'Üretim Sektörlerinde Dijital Dönüşüm Danışmanlığı',
        'Veriye Dayalı Karar Destek Sistemleri Oluşturma',
      ];

  const serviceSectionCopy = isRo
    ? {
        title: 'Producție mai Inteligentă cu Soluțiile GE Vernova!',
        description: 'În calitate de integrator de sistem autorizat al GE Vernova, combinăm expertiza noastră în automatizarea industrială și software cu soluțiile GE Vernova pentru a asigura o digitalizare mai rapidă și o eficiență sporită a facilităților de producție. Lucrăm la crearea unei infrastructuri industriale mai eficiente, mai rapide și mai sustenabile.',
      }
    : isEn
    ? {
        title: t('geVernovaPage.title'),
        description: t('geVernovaPage.description'),
      }
    : {
        title: 'GE Vernova Çözümleriyle Daha Akıllı Üretim!',
        description:
          'GE Vernova’nın yetkili sistem entegratörü olarak, endüstriyel otomasyon ve yazılım alanındaki uzmanlığımızı GE Vernova’nın çözümleriyle birleştirerek, üretim tesislerinin daha hızlı dijitalleşmesini ve verimliliğini artırmasını sağlıyoruz. Daha etkin, daha hızlı ve daha sürdürülebilir bir endüstriyel altyapı oluşturmak için çalışıyoruz.',
      };

  const solutionsEyebrow = isRo ? 'Competențe' : isEn ? t('geVernovaPage.solutions') : 'Yetkinlikler';
  const solutionsTitle = isRo ? 'Ce Tipuri de Soluții Oferim?' : isEn ? t('geVernovaPage.solutionsTitle') : 'Ne Tür Çözümler Sunuyoruz?';

  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const showMoreLabel = isRo ? 'Apasă pentru mai multe' : isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isRo ? 'Arată mai puțin' : isEn ? 'Show Less' : 'Daha Az Göster';
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 5);

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={serviceName}
        subtitle={serviceSectionCopy.title}
        breadcrumbs={[t('geVernovaPage.breadcrumbHome'), t('geVernovaPage.breadcrumbServices'), serviceName]}
      />

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="reveal lg:hidden space-y-6">
            <div className="responsive-media-shell">
              <SmartImage
                src="/assets/new/hizmetler/ge-vernova/Siskon 1.10 GE Vernova 16-9-1-Camera 1.webp"
                alt={isRo ? 'Prezentare generală soluții Siskon GE Vernova' : isEn ? 'Siskon GE Vernova solutions overview' : 'Siskon GE Vernova çözümleri genel bakış'}
                width={1920}
                height={1080}
                className="w-full max-w-[92%] sm:max-w-[88%] h-auto object-contain mx-auto"
                style={{ maxHeight: 'min(520px, 66vh)' }}
                sizes="100vw"
                priority
                quality={75}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
              <span className="eyebrow self-start">{t('geVernovaPage.serviceLabel')}</span>
              <p className="text-slate-600 text-lg leading-relaxed">{serviceSectionCopy.description}</p>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell">
                <SmartImage
                  src="/assets/new/hizmetler/ge-vernova/Siskon 1.10 GE Vernova 16-9-1-Camera 1.webp"
                  alt={isRo ? 'Prezentare generală soluții Siskon GE Vernova' : isEn ? 'Siskon GE Vernova solutions overview' : 'Siskon GE Vernova çözümleri genel bakış'}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[98%] md:max-w-[780px] lg:max-w-[820px] h-auto object-contain rounded-2xl drop-shadow-2xl mx-auto"
                  style={{ maxHeight: 'min(520px, 66vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{t('geVernovaPage.serviceLabel')}</span>
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

      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="eyebrow self-start">{t('geVernovaPage.benefits')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{t('geVernovaPage.benefitsTitle')}</h2>
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

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="md:hidden space-y-8">
            <div className="reveal">
              <img
                src="/assets/new/hizmetler/ge-vernova/Siskon 2.0 GE Vernova 16-9-2-Camera.webp"
                alt={isRo ? 'Vizual produs Siskon GE Vernova' : isEn ? 'Siskon GE Vernova product visual' : 'Siskon GE Vernova ürün görseli'}
                className="w-full h-auto object-contain rounded-2xl"
                loading="lazy"
              />
            </div>

            <div className="section-head reveal text-center max-w-3xl mx-auto mb-2">
              <span className="eyebrow">{solutionsEyebrow}</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-0">{solutionsTitle}</h2>
            </div>

            <div className="reveal px-0 py-0">
              <ul className="divide-y divide-slate-200">
                {solutions.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4">
                    <span className="h-3 w-3 shrink-0 rounded-full border-2 border-sky-500" aria-hidden="true" />
                    <span className="text-slate-700 text-lg font-semibold leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="section-head reveal text-left max-w-3xl mx-0 mb-10">
                <span className="eyebrow">{solutionsEyebrow}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-0">{solutionsTitle}</h2>
              </div>
              <div className="px-0 py-0">
                <ul className="divide-y divide-slate-200">
                  {solutions.map((item) => (
                    <li key={item} className="flex items-center gap-4 py-4">
                      <span className="h-3 w-3 shrink-0 rounded-full border-2 border-sky-500" aria-hidden="true" />
                      <span className="text-slate-700 text-lg font-semibold leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 reveal">
              <div>
                <img
                  src="/assets/new/hizmetler/ge-vernova/Siskon 2.0 GE Vernova 16-9-2-Camera.webp"
                  alt={isRo ? 'Vizual produs Siskon GE Vernova' : isEn ? 'Siskon GE Vernova product visual' : 'Siskon GE Vernova ürün görseli'}
                  className="w-full h-auto object-contain rounded-2xl md:rounded-3xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('geVernovaPage.ctaTitle')}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {t('geVernovaPage.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('geVernovaPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}


