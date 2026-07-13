'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function CustomSoftwarePage() { // NOSONAR
  const { t, locale, localizePath, lang } = useLanguage();
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [showAllIntegrations, setShowAllIntegrations] = useState(false);
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.customSoftware, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `customsoftware-${lang}`;

  const benefits = isRo
    ? [
        'Management agil al proiectelor',
        'Analiza detaliată a sistemului',
        'Comunicare rapidă și eficientă',
        'Selecția celor mai potrivite echipamente și infrastructură',
        'Integrare cu diferite sisteme',
        'O echipă concentrată pe tine și soluția ta',
        'Suport continuu după lansare',
        'Management flexibil al schimbărilor',
      ]
    : isEn
    ? [
        'Agile project management',
        'Detailed system analysis',
        'Fast and effective communication',
        'Selection of the most suitable equipment and infrastructure',
        'Integration with different systems',
        'A team focused on you and your solution',
        'Continuous post go-live support',
        'Flexible change management',
      ]
    : [
        'Agile proje yönetimi',
        'Detaylı sistem analizi',
        'Hızlı ve etkin iletişim',
        'En uygun ekipman ve altyapı seçimi',
        'Farklı sistemlerle entegrasyon',
        'Size ve çözüme odaklı ekip',
        'Canlıya geçiş sonrası sürekli destek',
        'Esnek değişiklik yönetimi',
      ];

  const capabilities = isRo
    ? [
        'Management de proiect',
        'Analiza și documentarea proiectului',
        'Selectarea și instalarea echipamentelor potrivite',
        'Proiectare tehnică și dezvoltare software',
        'Integrări bidirecționale software și hardware',
        'Activități de testare software',
        'Instalare și punere în funcțiune a sistemului',
        'Instruiri pentru aplicații',
        'Suport tehnic după lansare',
        'Managementul schimbărilor și rezolvarea problemelor',
      ]
    : isEn
    ? [
        'Project management',
        'Project analysis and documentation',
        'Selection and installation of suitable equipment',
        'Technical design and software development',
        'Bidirectional software and hardware integrations',
        'Software testing activities',
        'System installation and commissioning',
        'Application trainings',
        'Post go-live technical support',
        'Change management and problem resolution',
      ]
    : [
        'Proje yönetimi',
        'Proje analizi ve dokümantasyon',
        'Uygun ekipman seçimi ve montajı',
        'Teknik tasarım ve yazılım geliştirme',
        'Çift yönlü yazılım ve donanım entegrasyonları',
        'Yazılım test çalışmaları',
        'Sistem kurulumu ve devreye alma',
        'Uygulama eğitimleri',
        'Canlıya geçiş sonrası teknik destek',
        'Değişiklik yönetimi ve problem çözümleme',
      ];

  const integrations = isRo
    ? [
        'Toate sistemele de management al bazelor de date',
        'Software ERP/MRP (SAP, Canias, etc.)',
        'Echipamente industriale (cântare, șublere, contoare de energie)',
        'Echipamente industriale de identificare a datelor (Cod de bare, RFID, etc.)',
        'PLC-uri cu diferite protocoale de comunicare (Siemens, Beckhoff, Allen Bradley, etc.)',
        'Mașini CNC (Fanuc, Mazak, Siemens, etc.)',
        'Aplicații Microsoft',
        'Alte dispozitive care oferă intrare de date în sistem (Cod de bare, RFID, etc.)',
      ]
    : isEn
    ? [
        'All database management systems',
        'ERP/MRP software (SAP, Canias, etc.)',
        'Industrial equipment (scales, calipers, energy meters)',
        'Industrial data identification equipment (Barcode, RFID, etc.)',
        'PLCs with different communication protocols (Siemens, Beckhoff, Allen Bradley, etc.)',
        'CNC machines (Fanuc, Mazak, Siemens, etc.)',
        'Microsoft applications',
        'Other devices that provide data input to the system (Barcode, RFID, etc.)',
      ]
    : [
        'Tüm veri tabanı yönetim sistemleri',
        'ERP/MRP yazılımları (SAP, Canias vb.)',
        'Endüstriyel ekipmanlar (terazi, kumpas, enerji sayacı)',
        'Endüstriyel veri tanımlama ekipmanları (Barkod, RFID vb.)',
        'Farklı haberleşme protokolüne sahip PLC (Siemens, Beckhoff, Allen Bradley vb.)',
        'CNC makineleri (Fanuc, Mazak, Siemens vb.)',
        'Microsoft uygulamaları',
        'Sisteme veri girişi sağlayan diğer cihazlar (Barkod, RFID vb.)',
      ];

  const overviewDescription = isRo
    ? t('customSoftwarePage.description')
    : isEn
    ? t('customSoftwarePage.description')
    : 'Müşteriye özel yazılımlar; sistemde kullanılan paket program, cihaz ve veri girişi ekipmanlarının yetersiz kaldığı, mevcut süreçlerin dışında bir işlem yapılmasının istendiği durumlarda, işletme şartlarına özel yazılım ve otomasyon çözümleri sunar, kullanıcı ara birim tasarımları ve mevcut sistemlerle entegrasyonu içerir.';

  const hasMoreBenefits = benefits.length > 3;
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 3);
  const visibleIntegrations = showAllIntegrations ? integrations : integrations.slice(0, 3);
  const visibleCapabilities = showAllCapabilities ? capabilities : capabilities.slice(0, 5);
  const showMoreLabel = isRo ? 'Apasă pentru mai multe' : isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isRo ? 'Arată mai puțin' : isEn ? 'Show Less' : 'Daha Az Göster';

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={serviceName}
        subtitle={t('customSoftwarePage.subtitle')}
        breadcrumbs={[t('customSoftwarePage.breadcrumbHome'), t('customSoftwarePage.breadcrumbServices'), serviceName]}
      />

      {/* Genel Bakış */}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-10 lg:gap-14 items-center">
            <div className="reveal order-2 lg:order-1 lg:-ml-32">
              <div className="flex items-center justify-center lg:justify-start">
                <SmartImage
                  src="/assets/new/hizmetler/musteriye-ozel-yazilim/musteriye-ozel-yazilim-banner-16-9-zeminsiz.webp"
                  alt={isRo ? 'Soluții Siskon Software Personalizat - Aplicații Industriale la Comandă' : isEn ? 'Siskon Custom Software Solutions - Tailor-Made Industrial Applications' : 'Siskon Müşteriye Özel Yazılım Çözümleri - Endüstriye Özel Uygulamalar'}
                  width={1920}
                  height={1080}
                  className="w-full max-w-[560px] sm:max-w-[640px] lg:max-w-none lg:w-[138%] h-auto object-contain object-left drop-shadow-[0_30px_55px_rgba(15,23,42,0.28)] lg:[transform:perspective(1200px)_rotateY(-5deg)_rotateX(2deg)]"
                  style={{ maxHeight: 'min(720px, 85vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1000px"
                  priority
                  quality={90}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-9 md:p-11 shadow-sm lg:-mr-12">
                <span className="eyebrow self-start">{t('customSoftwarePage.service')}</span>
                <p className="text-slate-600 text-lg md:text-[1.125rem] leading-relaxed text-justify hyphens-auto" lang="tr">
                  {overviewDescription}
                </p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
                <span className="eyebrow self-start">{t('customSoftwarePage.service')}</span>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {overviewDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kazanımlar */}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">{t('customSoftwarePage.benefits')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t('customSoftwarePage.benefitsTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center">
            <div className="reveal flex items-center justify-center lg:justify-start">
              <SmartImage
                src="/assets/new/hizmetler/musteriye-ozel-yazilim/MacbookMockup1.webp"
                alt={isRo ? 'Soluții software personalizat macbook mockup' : isEn ? 'Custom software solutions macbook mockup' : 'Müşteriye özel yazılım çözümleri Macbook mockup görseli'}
                width={1600}
                height={1000}
                className="w-full max-w-[640px] md:max-w-[760px] h-auto object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 760px"
                quality={85}
              />
            </div>

            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7 max-w-xl mx-auto lg:mx-0 lg:ml-auto w-full">
              <h3 className="text-3xl md:text-4xl font-bold text-[#0e4ea4] mb-5">{isRo ? 'De ce Siskon?' : isEn ? 'Why Siskon?' : 'Neden Siskon?'}</h3>
              
              <div className="space-y-0 divide-y divide-cyan-300/70">
                {visibleBenefits.map((item) => (
                  <div key={item} className="flex items-center gap-4 py-4">
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                    <p className="text-[#0e4ea4] text-[1rem] md:text-[1.125rem] leading-[1.625rem] md:leading-[1.875rem] font-medium">{item}</p>
                  </div>
                ))}
              </div>

              {hasMoreBenefits ? (
                <button
                  type="button"
                  onClick={() => setShowAllBenefits((prev) => !prev)}
                  aria-expanded={showAllBenefits}
                  className="mt-2 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
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
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Yetkinlikler */}
      <section className="relative overflow-hidden bg-[#030923] py-[clamp(3rem,6vw,6rem)] px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(14,116,189,0.58),transparent_34%),radial-gradient(circle_at_88%_76%,rgba(14,165,233,0.42),transparent_34%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-35" aria-hidden="true">
          <div className="absolute -right-20 top-14 h-56 w-56 rotate-[29deg] border-2 border-sky-400/60" />
          <div className="absolute left-[42%] top-24 h-px w-72 -rotate-[28deg] bg-sky-400/50" />
          <div className="absolute bottom-16 left-[43%] h-px w-80 rotate-[30deg] bg-sky-400/40" />
          <div className="absolute right-[12%] bottom-28 h-px w-96 -rotate-[31deg] bg-sky-400/50" />
        </div>
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,460px)_minmax(0,1fr)] items-center gap-10 lg:gap-0">
            <div className="reveal order-1 lg:order-1 relative z-20 lg:translate-x-8 text-center lg:text-left">
              <div className="mb-12">
                <span className="eyebrow">{t('customSoftwarePage.capabilities')}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-md mx-auto lg:mx-0">
                  {t('customSoftwarePage.capabilitiesTitle')}
                </h2>
              </div>

              <div className="reveal order-2 lg:hidden relative z-10 min-h-[clamp(22rem,78vw,37rem)] mb-8 -mx-6 sm:-mx-8">
                <img
                  src="/assets/new/hizmetler/musteriye-ozel-yazilim/Ne Tür Çözümler Sunuyoruz Banner 2-Zeminsiz 2 1-1.webp"
                  alt={isRo ? 'Ilustrație capacități soluție software personalizat' : isEn ? 'Custom software solution capability illustration' : 'Müşteriye özel yazılım çözüm yetkinlikleri görseli'}
                  loading="lazy"
                  className="mx-auto h-auto w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] max-w-none object-contain object-center drop-shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                />
              </div>

              <div className="rounded-lg border border-cyan-400/45 bg-sky-950/45 p-7 md:p-9 shadow-2xl shadow-sky-950/40 backdrop-blur-sm">
                <div className="divide-y divide-cyan-400/35">
                  {visibleCapabilities.map((item) => (
                    <div key={item} className="flex items-center gap-4 py-3.5">
                      <span className="h-3 w-3 shrink-0 rounded-full border-2 border-cyan-300 bg-cyan-300/20 shadow-[0_0_12px_rgba(103,232,249,0.55)]" aria-hidden="true" />
                      <p className="text-white font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCapabilities((prev) => !prev)}
                  aria-expanded={showAllCapabilities}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-400/35 pt-4 text-cyan-300 font-semibold text-sm"
                >
                  <span>{showAllCapabilities ? showLessLabel : showMoreLabel}</span>
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-cyan-300 flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllCapabilities ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div className="hidden lg:block reveal order-2 relative z-10 min-h-[clamp(20rem,66vw,46rem)] lg:-ml-10 lg:mt-0">
              <img
                src="/assets/new/hizmetler/musteriye-ozel-yazilim/Ne Tür Çözümler Sunuyoruz Banner 2-Zeminsiz 2 1-1.webp"
                alt={isRo ? 'Ilustrație capacități soluție software personalizat' : isEn ? 'Custom software solution capability illustration' : 'Müşteriye özel yazılım çözüm yetkinlikleri görseli'}
                loading="lazy"
                className="mx-auto h-auto w-full max-w-[min(96vw,56rem)] object-contain object-center drop-shadow-[0_24px_56px_rgba(0,0,0,0.30)] lg:absolute lg:left-0 lg:top-1/2 lg:w-[min(112%,72rem)] lg:max-w-none lg:-translate-y-1/2 xl:w-[min(122%,82rem)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">{t('customSoftwarePage.features')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{t('customSoftwarePage.featuresTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal flex items-center justify-center lg:justify-start">
              <img
                src="/assets/new/hizmetler/musteriye-ozel-yazilim/musteriyeOzelLogo.svg"
                alt={isRo ? 'Logo integrări software personalizat' : isEn ? 'Custom software integrations logo' : 'Müşteriye özel yazılım entegrasyon logosu'}
                className="w-[min(92vw,38rem)] sm:w-[min(78vw,34rem)] lg:w-[min(100%,38rem)] h-auto object-contain"
                loading="lazy"
              />
            </div>

            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              <h3 className="text-xl md:text-2xl font-bold text-[#0e4ea4] mb-5">
                {isRo ? 'Ce se Poate Face?' : isEn ? 'What Can Be Done?' : 'Neler Yapılabilir?'}
              </h3>
              <div className="divide-y divide-cyan-300/70">
                {visibleIntegrations.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                    <p className="text-[#0e4ea4] text-[1rem] md:text-[1.125rem] leading-[1.625rem] md:leading-[1.875rem] font-medium">{item}</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowAllIntegrations((prev) => !prev)}
                aria-expanded={showAllIntegrations}
                className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
              >
                <span>{showAllIntegrations ? showLessLabel : showMoreLabel}</span>
                <span
                  className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllIntegrations ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('customSoftwarePage.ctaTitle')}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {t('customSoftwarePage.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('customSoftwarePage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}



