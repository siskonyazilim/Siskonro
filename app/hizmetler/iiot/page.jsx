'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function IIoTPage() { // NOSONAR
  const { t, locale, localizePath, lang } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.iiot, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `iiot-${lang}`;

  const features = isRo
    ? [
        'Colectare date în timp real',
        'Achiziție de date pe bază de timp',
        'Achiziție de date bazată pe evenimente',
        'Configurare bazată pe web',
        'Motoare de formulare și filtrare',
        'Management de alarme și notificări',
        'Integrare ERP',
        'Raportare și analize avansate',
        'Urmărire a performanței în timp real',
        'Suport larg pentru protocoale de comunicare',
        'Control Statistic al Procesului',
        'Managementul mentenanței și calibrării',
        'Compatibilitate cu toate soluțiile Siskon',
      ]
    : isEn
    ? [
        'Real-time data collection',
        'Time-based data acquisition',
        'Event-based data acquisition',
        'Web-based configuration',
        'Formula and filtering engines',
        'Alarm and notification management',
        'ERP integration',
        'Advanced reporting and analytics',
        'Real-time performance tracking',
        'Broad communication protocol support',
        'Statistical Process Control',
        'Maintenance and calibration management',
        'Compatibility with all Siskon solutions',
      ]
    : [
        'Gerçek zamanlı veri toplama',
        'Zaman bazlı veri toplama',
        'Olay bazlı veri toplama',
        'Web tabanlı konfigürasyon',
        'Formülasyon ve filtreleme',
        'Alarm ve bildirim yönetimi',
        'ERP sistemleri ile entegrasyon',
        'Gelişmiş raporlama ve analiz',
        'Gerçek zamanlı performans takibi',
        'Geniş haberleşme protokolleri',
        'İstatistiksel Proses Kontrol',
        'Bakım ve Kalibrasyon Yönetimi',
      ];

  const subSystems = isRo
    ? [
        {
          title: 'Sistem de Colectare Date de Producție',
          icon: '/assets/new/hizmetler/iiot/Asset 49.svg',
          spot: 'Garantați succesul cu urmărirea eficienței în timp real!',
          desc: 'Colectează cantități de producție, rebuturi, timpi morți și cauze fundamentale în timp real pentru a permite analize de eficiență, OEE, KPI, timp de ciclu și blocaje.',
        },
        {
          title: 'Sistem de Colectare Date de Calitate',
          icon: '/assets/new/hizmetler/iiot/Asset 47 1.svg',
          spot: 'Asigurați calitatea cu date precise!',
          desc: 'Adună automat date de calitate și de laborator din mediile de producție, ajutând la standardizarea proceselor de calitate și la îmbunătățirea calității produselor.',
        },
        {
          title: 'Sistem de Colectare Date de Proces',
          icon: '/assets/new/hizmetler/iiot/Asset 46 1.svg',
          spot: 'Gestionați datele de proces și creșteți-vă puterea operațională!',
          desc: 'Colectează parametrii de proces precum presiune, temperatură, viteză, debit, pH pe bază de eveniment/timp pentru analize în timp real și istorice.',
        },
        {
          title: 'Sistem de Colectare Date de Energie',
          icon: '/assets/new/hizmetler/iiot/Asset 45 1.svg',
          spot: 'Reduceți costurile cu managementul energiei bazat pe date!',
          desc: 'Captează date despre consum, tensiune, curent și frecvență pentru a monitoriza, analiza și optimiza utilizarea energiei, sprijinind în același timp procesele ISO 50001.',
        },
      ]
    : isEn
    ? [
        {
          title: 'Production Data Collection System',
          icon: '/assets/new/hizmetler/iiot/Asset 49.svg',
          spot: 'Guarantee success with real-time efficiency tracking!',
          desc: 'Collects production counts, scrap, downtime and root causes in real time to enable efficiency, OEE, KPI, cycle-time and bottleneck analytics.',
        },
        {
          title: 'Quality Data Collection System',
          icon: '/assets/new/hizmetler/iiot/Asset 47 1.svg',
          spot: 'Secure quality with accurate data!',
          desc: 'Automatically gathers quality and laboratory data from production environments, helping standardize quality processes and improve product quality.',
        },
        {
          title: 'Process Data Collection System',
          icon: '/assets/new/hizmetler/iiot/Asset 46 1.svg',
          spot: 'Manage process data and increase your operational power!',
          desc: 'Collects pressure, temperature, speed, flow, pH and similar process parameters on event/time basis for real-time and historical analysis.',
        },
        {
          title: 'Energy Data Collection System',
          icon: '/assets/new/hizmetler/iiot/Asset 45 1.svg',
          spot: 'Reduce costs with data-driven energy management!',
          desc: 'Captures consumption, voltage, current and frequency data to monitor, analyze and optimize energy usage while supporting ISO 50001 processes.',
        },
      ]
    : [
        {
          title: 'Üretim Veri Toplama Sistemi',
          icon: '/assets/new/hizmetler/iiot/Asset 49.svg',
          spot: 'Gerçek zamanlı verimlilik takibiyle başarıyı garantileyin!',
          desc: 'Üretim adetleri, fire adetleri, duruş süreleri ve sebeplerini gerçek zamanlı toplayarak verimlilik, OEE, KPI, çevrim süresi, duruş, darboğaz, fire ve pareto analizleri yapmanızı sağlar.',
        },
        {
          title: 'Kalite Veri Toplama Sistemi',
          icon: '/assets/new/hizmetler/iiot/Asset 47 1.svg',
          spot: 'Kaliteyi doğru veriyle güvence altına alın!',
          desc: 'Laboratuvar veya üretim sahasındaki kalite ve analiz cihazlarından verileri otomatik olarak toplayarak kalite süreçlerinizi standardize eder, ürün kalitenizi artırır.',
        },
        {
          title: 'Proses Veri Toplama Sistemi',
          icon: '/assets/new/hizmetler/iiot/Asset 46 1.svg',
          spot: 'Proses verilerinizi yönetin, operasyonel gücünüzü artırın!',
          desc: 'Basınç, sıcaklık, hız, debi, pH, asit oranı gibi birçok farklı proses verinizi olay ve/veya zaman bazlı toplayıp gerçek zamanlı ve geçmişe dönük analizler yapmanızı sağlar.',
        },
        {
          title: 'Enerji Veri Toplama Sistemi',
          icon: '/assets/new/hizmetler/iiot/Asset 45 1.svg',
          spot: 'Veri odaklı enerji yönetimiyle maliyetlerinizi düşürün!',
          desc: 'Tüketim, voltaj, akım, frekans gibi verileri toplayarak enerji kullanımını izlemeye, analiz etmeye ve optimize etmeye odaklanır; ISO 50001 süreçlerini destekler.',
        },
      ];

  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const showMoreLabel = isRo ? 'Apasă pentru mai multe' : isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isRo ? 'Arată mai puțin' : isEn ? 'Show Less' : 'Daha Az Göster';
  const visibleFeatures = showAllFeatures ? features : features.slice(0, 5);

  return (
    <div key={contentKey} className="bg-white iiot-subpage">
      <PageHero
        title={serviceName}
        subtitle={t('iiotPage.subtitle')}
        breadcrumbs={[t('iiotPage.breadcrumbHome'), t('iiotPage.breadcrumbServices'), serviceName]}
      />

      {/* Genel Bakış */}
      <section className="py-12 md:py-20 px-6 md:h-[747.984px]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch md:pt-6">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell min-h-[220px] sm:min-h-[280px] md:-ml-6 lg:-ml-10">
                <SmartImage
                  src="/assets/new/hizmetler/iiot/iiot-hizmet-gorsel-2.webp"
                  alt={isRo ? 'Soluții Siskon IIoT - Colectare Date Industrial Internet of Things' : isEn ? 'Siskon IIoT Solutions - Industrial Internet of Things Data Collection' : 'Siskon IIoT Çözümleri - Endüstriyel Nesnelerin İnterneti Veri Toplama'}
                  width={1920}
                  height={1080}
                  className="w-full max-w-[520px] sm:max-w-[640px] md:w-[108%] md:max-w-[920px] md:ml-0 h-auto object-contain mx-auto drop-shadow-2xl"
                  style={{ maxHeight: 'min(540px, 72vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{t('iiotPage.service')}</span>
                <p className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto" lang="tr">
                  {t('iiotPage.description')}
                </p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
                <span className="eyebrow self-start">{t('iiotPage.service')}</span>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {t('iiotPage.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="eyebrow self-start">{t('iiotPage.benefits')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{t('iiotPage.benefitsTitle')}</h2>
            </div>
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              <div className="divide-y divide-cyan-300/70">
                {visibleFeatures.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                    <p className="text-[#0e4ea4] text-sm md:text-[0.9375rem] leading-snug font-medium">{item}</p>
                  </div>
                ))}
              </div>
              {features.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllFeatures((prev) => !prev)}
                  aria-expanded={showAllFeatures}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  <span>{showAllFeatures ? showLessLabel : showMoreLabel}</span>
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllFeatures ? 'rotate-180' : ''}`}
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

      {/* Alt Sistemler - Kart Grid */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">{t('iiotPage.subSystems')}</span>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#000000] leading-[2.625rem] md:leading-[3rem]">
              {t('iiotPage.subSystemsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {subSystems.map((system) => (
              <article key={system.title} className="reveal max-w-[640px] mx-auto rounded-2xl bg-[#f2f8fb] border border-[#dbeaf2] px-4 sm:px-6 md:px-7 py-6 md:py-7 text-center hover:bg-[#ecf5f9] transition-colors duration-300">
                <div className="mb-5 md:mb-6 flex items-center justify-center min-h-[180px] sm:min-h-[210px] md:h-[230px]">
                  <img
                    src={system.icon}
                    alt={system.title}
                    className="h-auto max-h-[190px] md:max-h-[220px] w-auto max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3 className="text-[1.35rem] md:text-[1.75rem] font-bold text-[#000000] leading-[1.75rem] md:leading-[2.25rem] mb-3 md:mb-4 !text-center" style={{ textAlignLast: 'center' }}>{system.title}</h3>
                <p className="text-[#31E2FF] text-[0.95rem] md:text-[1.05rem] font-semibold leading-[1.45rem] md:leading-[1.7rem] mb-4 md:mb-5 !text-center" style={{ textAlignLast: 'center' }}>{system.spot}</p>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed !text-center" style={{ textAlignLast: 'center' }}>{system.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white leading-[2.625rem] md:leading-[3rem] mb-6">{t('iiotPage.ctaTitle')}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {t('iiotPage.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('iiotPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}


