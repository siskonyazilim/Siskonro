'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function VisionPage() {
  const { t, locale, localizePath, lang } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.machineVision, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `vision-${lang}`;
  const serviceSectionCopy = isRo
    ? {
        title: 'Soluții de Procesare a Imaginii',
        subtitle: 'Obțineți perfecțiunea în producție cu tehnologiile de procesare a imaginii!',
        description: 'În procesele de control al calității, tehnologiile de procesare a imaginii elimină erorile umane și asigură controlul automat al produselor dumneavoastră cu precizie și viteză ridicate. Optimizați-vă procesele de control al calității și eliminați defectele de producție cu soluțiile de procesare a imaginii Siskon.',
      }
    : isEn
    ? {
        title: t('visionPage.title'),
        subtitle: t('visionPage.subtitle'),
        description: t('visionPage.description'),
      }
    : {
        title: 'Görüntü İzleme Çözümleri',
        subtitle: 'Görüntü işleme teknolojileriyle üretimde kusursuzluğu yakalayın!',
        description:
          'Kalite kontrol süreçlerinde görüntü işleme teknolojileri, insan hatalarını ortadan kaldırarak, ürünlerinizin yüksek hassasiyet ve hızda otomatik kontrol edilmesini sağlar. Siskon görüntü işleme çözümleri ile sizde kalite kontrol süreçlerinizi optimize edin ve üretim hatalarını ortadan kaldırın.',
      };

  const benefits = isRo
    ? [
        'Alegerea corectă a tehnologiei cu expertiză în procese specifice sectorului',
        'Soluții optime de iluminare',
        'Integrare cu sistemele de automatizare și SCADA',
        'Integrare cu sistemele ERP',
        'Analiza datelor în timp real',
        'Suport pentru monitorizare și întreținere de la distanță',
        'Ușurință în utilizare și instruire',
      ]
    : isEn
    ? [
        'Right technology choice with sector-specific process expertise',
        'Optimal lighting solutions',
        'Integration with automation and SCADA systems',
        'Integration with ERP systems',
        'Real-time data analysis',
        'Remote monitoring and maintenance support',
        'Ease of use and training',
      ]
    : [
        'Optimum Aydınlatma Çözümleri',
        'Otomasyon ve SCADA Sistemleri ile Entegrasyon',
        'ERP Sistemleri ile Entegrasyon',
        'Gerçek Zamanlı Veri Analizi',
        'Uzaktan İzleme ve Bakım Desteği',
        'Kolay Kullanım ve Eğitim',
      ];

  const capabilities = isRo
    ? [
        'Detecția prezenței/absenței',
        'Inspecția defectelor de suprafață',
        'Măsurare dimensională și numărare',
        'Verificarea poziției',
        'Verificări ale etichetelor și datei de expirare',
        'Potrivirea și validarea modelelor',
        'Recunoașterea optică a caracterelor (OCR)',
        'Clasificare',
        'Soluții de profilare 3D',
      ]
    : isEn
    ? [
        'Presence/absence detection',
        'Surface defect inspection',
        'Dimensional measurement and counting',
        'Position verification',
        'Label and expiry-date checks',
        'Pattern matching and validation',
        'Optical character recognition (OCR)',
        'Classification',
        '3D profiling solutions',
      ]
    : [
        'Var-Yok kontrolü',
        'Yüzey hata kontrolü',
        'Boyutsal ölçüm ve ürün sayma',
        'Pozisyon kontrolü',
        'Etiket ve SKT kontrolü',
        'Desen eşleştirme ve doğrulama',
        'Optik karakter tanıma (OCR)',
        'Sınıflandırma',
        '3D Profilleme çözümleri',
      ];

  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const showMoreLabel = isRo ? 'Apasă pentru mai multe' : isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isRo ? 'Arată mai puțin' : isEn ? 'Show Less' : 'Daha Az Göster';
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 4);

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={serviceName}
        subtitle={t('visionPage.subtitle')}
        breadcrumbs={[t('visionPage.breadcrumbHome'), t('visionPage.breadcrumbServices'), serviceName]}
      />

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="md:hidden reveal space-y-5">
            <div className="responsive-media-shell">
              <SmartImage
                src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp"
                alt={isRo ? 'Soluții Siskon de Procesare a Imaginii - Control Automat al Calității' : isEn ? 'Siskon Machine Vision Solutions - Automated Quality Control' : 'Siskon Görüntü İşleme Çözümleri - Otomatik Kalite Kontrol'}
                width={1920}
                height={1080}
                className="w-full max-w-[92%] h-auto object-contain rounded-2xl mx-auto drop-shadow-2xl"
                style={{ maxHeight: 'min(520px, 68vh)' }}
                sizes="100vw"
                priority
                quality={75}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
              <span className="eyebrow self-start">{t('visionPage.service')}</span>
              <p className="text-slate-600 text-lg leading-relaxed">
                {serviceSectionCopy.description}
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <SmartImage
                  src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeVarYokKamera.webp"
                  alt={isRo ? 'Scenariu de cameră pentru verificarea etichetelor' : isEn ? 'Label verification camera scenario' : 'Etiket kontrol kamera senaryosu'}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="100vw"
                  quality={75}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <SmartImage
                  src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeCamera.webp"
                  alt={isRo ? 'Scenariu de cameră pentru detecția prezenței și absenței' : isEn ? 'Presence and absence detection camera scenario' : 'Var-yok kontrol kamera senaryosu'}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="100vw"
                  quality={75}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <SmartImage
                  src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeBarcode.webp"
                  alt={isRo ? 'Scenariu de cameră pentru citirea codurilor de bare' : isEn ? 'Barcode reading camera scenario' : 'Barkod okuma kamera senaryosu'}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="100vw"
                  quality={75}
                />
              </div>
            </div>

          </div>

          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell md:-ml-6 lg:-ml-10">
                <SmartImage
                  src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp"
                  alt={isRo ? 'Soluții Siskon de Procesare a Imaginii - Control Automat al Calității' : isEn ? 'Siskon Machine Vision Solutions - Automated Quality Control' : 'Siskon Görüntü İşleme Çözümleri - Otomatik Kalite Kontrol'}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[100%] md:max-w-[860px] md:ml-0 rounded-2xl object-contain drop-shadow-2xl"
                  style={{ maxHeight: 'min(600px, 76vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{t('visionPage.service')}</span>
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

      <section className="relative py-12 md:py-20 px-6 bg-slate-50">
        <div className="hidden md:block absolute inset-x-0 top-0 -translate-y-[26%] z-10 pointer-events-none">
          <div className="container">
            <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 items-center">
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <SmartImage
                  src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeVarYokKamera.webp"
                  alt={isRo ? 'Scenariu de cameră pentru verificarea etichetelor' : isEn ? 'Label verification camera scenario' : 'Etiket kontrol kamera senaryosu'}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <SmartImage
                  src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeCamera.webp"
                  alt={isRo ? 'Scenariu de cameră pentru detecția prezenței și absenței' : isEn ? 'Presence and absence detection camera scenario' : 'Var-yok kontrol kamera senaryosu'}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                <SmartImage
                  src="/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeBarcode.webp"
                  alt={isRo ? 'Scenariu de cameră pentru citirea codurilor de bare' : isEn ? 'Barcode reading camera scenario' : 'Barkod okuma kamera senaryosu'}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-8 md:pt-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="eyebrow self-start">{t('visionPage.benefits')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{t('visionPage.benefitsTitle')}</h2>
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

      <section className="py-20 md:py-24 px-6">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="eyebrow">
              {isRo ? 'Competențe' : isEn ? t('visionPage.capabilities') : 'Yetkinlikler'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
              {isRo ? (
                'Ce Tipuri de Soluții de Procesare a Imaginii Oferim?'
              ) : isEn ? (
                t('visionPage.capabilitiesTitle')
              ) : (
                'Ne Tür Görüntü İşleme Çözümleri Sunuyoruz?'
              )}
            </h2>
          </div>
          <div className="reveal grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {capabilities.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center rounded-[14px] border border-[#a6d3df] bg-gradient-to-b from-[#d6edf3] to-[#c5e2ea] px-4 py-4 md:px-5 md:py-5 min-h-[72px] md:min-h-[84px] shadow-[0_4px_14px_rgba(9,52,109,0.07)] hover:shadow-[0_8px_22px_rgba(9,52,109,0.13)] transition-all duration-300"
              >
                <span className="font-bold text-sm md:text-base leading-snug text-[#0a4a7a] text-center">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('visionPage.ctaTitle')}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {t('visionPage.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('visionPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}



