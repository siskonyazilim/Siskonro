'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function RobotSolutionsPage() { // NOSONAR
  // NOSONAR - Refactor this function to reduce its Cognitive Complexity from 16 to the 15 allowed
  const { t, locale, localizePath, lang } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.robotSolutions, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `robot-${lang}`;

  const features = isRo
    ? [
        'Configurare și programare ușoară',
        'Interfață prietenoasă cu utilizatorul',
        'Flexibilitate și eficiență optimă în operațiuni',
        'Agilitate, randament, viteză și calitate superioare',
        'Înaltă precizie și acuratețe în operațiuni',
        'Utilizarea și gestionarea eficientă a forței de muncă',
        'Funcții avansate de siguranță',
        'Design compact și ușor',
        'Costuri reduse de operare și întreținere',
      ]
    : isEn
    ? [
        'Easy setup and programming',
        'User-friendly interface',
        'Optimal flexibility and efficiency in operations',
        'Higher agility, throughput, speed and quality',
        'High precision and accuracy in operations',
        'Effective workforce utilization and management',
        'Advanced safety features',
        'Compact and lightweight design',
        'Low operating and maintenance costs',
      ]
    : [
        'Kolay kurulum ve programlama',
        'Kullanıcı dostu arayüz',
        'İş süreçlerinde optimum esneklik ve verimlilik',
        'Üretimde çeviklik, yüksek verim, hız ve kalite artışı',
        'Operasyonlarda yüksek hassasiyet ve doğruluk',
        'İş gücünü etkin kullanım ve yönetim imkanı',
        'Gelişmiş güvenlik özellikleri',
        'Kompakt ve hafif tasarım',
        'Düşük işletme ve bakım maliyetleri',
      ];

  const qualities = isRo
    ? [
        'Configurare și Punere în Funcțiune Rapidă',
        'Domenii de Aplicație Flexibile',
        'Funcții Avansate de Siguranță',
        'Design Compact și Ușor',
        'Consum Redus de Energie',
        'Integrare Ușoară a Sistemului',
        'Acces și Monitorizare de la Distanță',
        'Durabilitate și Întreținere Redusă',
      ]
    : isEn
    ? [
        'Fast Setup and Commissioning',
        'Flexible Application Areas',
        'Advanced Safety Features',
        'Compact and Lightweight Design',
        'Low Energy Consumption',
        'Easy System Integration',
        'Remote Access and Monitoring',
        'Durability and Low Maintenance',
      ]
    : [
        'Hızlı Kurulum ve Devreye Alma',
        'Esnek Uygulama Alanları',
        'Gelişmiş Güvenlik Özellikleri',
        'Kompakt ve Hafif Tasarım',
        'Düşük Enerji Tüketimi',
        'Kolay Sistem Entegrasyonu',
        'Uzaktan Erişim ve İzleme İmkanı',
        'Dayanıklılık ve Düşük Bakım Gereksinimi',
      ];

  const content = isRo
    ? {
        subtitle: 'Împuterniciți-vă operațiunile cu robotica colaborativă și combinați viteza cu siguranța.',
        breadcrumbs: ['Acasă', 'Servicii', serviceName],
        serviceLabel: 'Serviciu',
        overviewTitle: 'Soluții de Roboți',
        overviewSubtitle: 'Roboții colaborativi lucrează în siguranță alături de oameni pentru a maximiza potențialul de automatizare în producție. Cu o configurare rapidă, programare ușoară și integrare flexibilă, soluțiile Siskon Universal Robots fac operațiunile mai eficiente, flexibile și sigure.',
        overviewText: 'Roboții colaborativi lucrează în siguranță alături de oameni pentru a maximiza potențialul de automatizare în producție. Cu o configurare rapidă, programare ușoară și integrare flexibilă, soluțiile Siskon Universal Robots fac operațiunile mai eficiente, flexibile și sigure.',
        overviewCta: 'Solicitați un Demo Gratuit',
        benefitsLabel: 'Beneficii',
        benefitsTitle: 'Ce Oferă Soluțiile Robotice?',
        technologyLabel: 'Tehnologie',
        technologyTitle: 'Caracteristicile Roboților Colaborativi',
        ctaTitle: 'Începeți Automatizarea Robotică Astăzi',
        ctaText: 'Pregătiți-vă liniile de producție pentru viitor cu tehnologiile cobot.',
        ctaButton: 'Contactați-ne',
        heroAlt: 'Soluții Roboți Siskon - Tehnologii Cobot Colaborative',
      }
    : isEn
    ? {
        subtitle: 'Empower your operations with collaborative robotics and combine speed with safety.',
        breadcrumbs: ['Home', 'Services', serviceName],
        serviceLabel: 'Service',
        overviewTitle: 'Robot Solutions',
        overviewSubtitle:
          'Collaborative robots work safely alongside people to maximize automation potential in production. With fast setup, easy programming and flexible integration, Siskon Universal Robots solutions make operations more efficient, flexible and safe.',
        overviewText:
          'Collaborative robots work safely alongside people to maximize automation potential in production. With fast setup, easy programming and flexible integration, Siskon Universal Robots solutions make operations more efficient, flexible and safe.',
        overviewCta: 'Request a Free Demo',
        benefitsLabel: 'Benefits',
        benefitsTitle: 'What Do Robotic Solutions Deliver?',
        technologyLabel: 'Technology',
        technologyTitle: 'Collaborative Robot Characteristics',
        ctaTitle: 'Start Robotic Automation Today',
        ctaText: 'Future-proof your production lines with cobot technologies.',
        ctaButton: 'Contact Us',
        heroAlt: 'Siskon Robot Solutions - Collaborative Cobot Technologies',
      }
    : {
        subtitle: 'Kolaboratif robotlarla operasyonlarınızı güçlendirin, hız ve güvenliği bir arada yaşayın!',
        breadcrumbs: ['Ana Sayfa', 'Hizmetler', serviceName],
        serviceLabel: 'Hizmet',
        overviewTitle: 'Robot Çözümleri',
        overviewSubtitle:
          'Kolaboratif robotlarla operasyonlarınızı güçlendirin, hız ve güvenliği bir arada yaşayın!',
        overviewText:
        'Kolaboratif robotlar, insanlarla yan yana çalışarak üretim süreçlerinizdeki otomasyon potansiyelini maksimize eder. Hızlı kurulum, kolay programlama ve esnek entegrasyon seçenekleriyle iş süreçlerinizi optimize eder ve tekrarlayan görevlerde insan gücü üzerindeki yükü hafifletir. Siskon Universal Robots çözümleri ile operasyonlarınızı daha verimli, esnek ve güvenli hale getirirsiniz.',
        overviewCta: 'Ücretsiz Demo İsteyin',
        benefitsLabel: 'Kazanımlar',
        benefitsTitle: 'Robot Çözümleri Size Ne Sağlar?',
      technologyLabel: 'Nitelikler',
      technologyTitle: 'Kolaboratif Robotların Özellikleri Nelerdir?',
        ctaTitle: 'Robotik Otomasyona Bugün Başlayın',
        ctaText: 'Cobot teknolojileri ile üretim hattınızı geleceğe hazırlayın.',
        ctaButton: 'Bize Ulaşın',
        heroAlt: 'Siskon Robot Çözümleri - Kolaboratif Cobot Teknolojileri',
      };

  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const showMoreLabel = isRo ? 'Apasă pentru mai multe' : isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isRo ? 'Arată mai puțin' : isEn ? 'Show Less' : 'Daha Az Göster';
  const visibleFeatures = showAllFeatures ? features : features.slice(0, 5);

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={serviceName}
        subtitle={t('robotPage.subtitle')}
        breadcrumbs={[t('robotPage.breadcrumbHome'), t('robotPage.breadcrumbServices'), serviceName]}
      />

      {/* Genel Bakış */}
      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell md:-ml-6 lg:-ml-10">
                <SmartImage
                  src="/assets/new/hizmetler/robot-cozumleri/RobotCozumleri.webp"
                  alt={content.heroAlt}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[106%] md:max-w-[900px] md:-ml-4 h-auto object-contain drop-shadow-2xl"
                  style={{ maxHeight: 'min(680px, 82vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{content.serviceLabel}</span>
                <p className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto" lang="tr">{content.overviewText}</p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
                <span className="eyebrow self-start">{content.serviceLabel}</span>
                <p className="text-slate-600 text-lg leading-relaxed">{content.overviewText}</p>
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
              <span className="eyebrow self-start">{t('robotPage.benefitsLabel')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{t('robotPage.benefitsTitle')}</h2>
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

      {/* Nitelikler */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="container">
          <div className="lg:hidden">
            <div className="section-head reveal text-center max-w-3xl mx-auto mb-10">
              <span className="eyebrow">{content.technologyLabel}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-0">{content.technologyTitle}</h2>
            </div>

            <div className="reveal max-w-5xl mx-auto">
              <div className="mb-8 md:mb-10">
                <SmartImage
                  src="/assets/new/hizmetler/robot-cozumleri/RobotCozunleri1.webp"
                  alt={isRo ? 'Vizualizare soluții roboți colaborativi Siskon' : isEn ? 'Siskon collaborative robot solutions visual' : 'Siskon kolaboratif robot çözümleri görseli'}
                  width={1920}
                  height={1080}
                  className="responsive-contain-image rounded-2xl md:rounded-3xl w-full h-auto object-contain"
                  style={{ maxHeight: 'min(680px, 82vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  quality={75}
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 md:px-7 md:py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                <ul className="divide-y divide-slate-200">
                  {qualities.map((item) => (
                    <li key={item} className="py-4 md:py-4.5 flex items-center gap-3">
                      <span className="w-3.5 h-3.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                      <span className="text-slate-700 font-semibold text-[1rem] md:text-[1.125rem] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="section-head reveal text-left max-w-3xl mx-0 mb-8">
                <span className="eyebrow">{content.technologyLabel}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-0">{content.technologyTitle}</h2>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 md:px-7 md:py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] flex flex-col justify-center">
                <ul className="divide-y divide-slate-200">
                  {qualities.map((item) => (
                    <li key={item} className="py-4 md:py-4.5 flex items-center gap-3">
                      <span className="w-3.5 h-3.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                      <span className="text-slate-700 font-semibold text-[1.05rem] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 reveal flex items-center justify-center pt-8 md:pt-14">
              <div className="relative flex items-center justify-center w-full">
                <SmartImage
                  src="/assets/new/hizmetler/robot-cozumleri/RobotCozunleri1.webp"
                  alt={isRo ? 'Vizualizare soluții roboți colaborativi Siskon' : isEn ? 'Siskon collaborative robot solutions visual' : 'Siskon kolaboratif robot çözümleri görseli'}
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

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('robotPage.ctaTitle')}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">{t('robotPage.ctaText')}</p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('robotPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}


