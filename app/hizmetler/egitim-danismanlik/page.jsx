'use client';

import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function TrainingPage() {
  const { t, locale, localizePath, lang } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.trainingConsulting, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `training-${lang}`;
  const heroTitleLines = isRo
    ? [
        'Pregătiți-vă de astăzi',
        'pentru tehnologiile de mâine cu',
        'serviciile de instruire și',
        'consultanță Siskon!',
      ]
    : isEn
    ? [
        'Get ready today for the technologies',
        'of tomorrow with Siskon',
        'training and consulting',
        'services!',
      ]
    : [
        "Siskon'un eğitim ve",
        'danışmanlık hizmetleriyle',
        'geleceğin teknolojilerine',
        'bugünden hazır olun!',
      ];
  const heroDescriptionLines = isRo
    ? [
        'Serviciile experte de instruire și consultanță',
        'Siskon maximizează potențialul dumneavoastră operațional',
        'în inițiativele de automatizare industrială și',
        'transformare digitală.',
        'Trainerii și consultanții noștri experimentați oferă',
        'cunoștințele esențiale și abilitățile practice',
        'de care aveți nevoie pentru a utiliza tehnologiile industriale',
        'la eficiență maximă și pentru a rămâne în frunte.',
      ]
    : isEn
    ? [
        "Siskon's expert training and consulting services",
        'maximize your operational potential across industrial',
        'automation and digital transformation initiatives.',
        'Our experienced trainers and consultants deliver',
        'the essential knowledge and practical skills',
        'you need to use industrial technologies',
        'at peak efficiency and stay ahead',
        'in an increasingly competitive market.',
      ]
    : [
        "Siskon'un uzman eğitim ve danışmanlık",
        'hizmetleri, endüstriyel otomasyon ve dijital',
        'dönüşüm yolculuğunuzda işletmenizin',
        'potansiyelini en üst düzeye çıkarır. Deneyimli',
        'eğitmenlerimiz ve danışmanlarımız, endüstriyel',
        'teknolojileri en verimli şekilde kullanmanız için',
        'gereken bilgi ve beceriyi kazandırarak',
        'rekabette sizi bir adım öne taşır.',
      ];

  const trainings = isRo
    ? [
        {
          title: 'Instruire PLC și HMI',
          details: ['Siemens TIA Portal'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-1-Camera.webp',
          reverse: false,
        },
        {
          title: 'Instruire Beckhoff Twincat 2 și 3SCADA',
          details: ['Siemens WinCC'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-2-Camera.webp',
          reverse: true,
        },
        {
          title: 'Instruire Microsoft Power Platform',
          details: ['Power BI', 'Power Apps', 'Power Automate'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-3-Camera.webp',
          reverse: false,
        },
        {
          title: 'Microsoft SQL Server',
          details: [],
          image: '/assets/new/hizmetler/egitim-danismanlik/1-9-egitim-ve-danismanlik-cozumleri-16-9-4-camera.webp',
          reverse: true,
        },
      ]
    : isEn
    ? [
        {
          title: 'PLC and HMI Training',
          details: ['Siemens TIA Portal'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-1-Camera.webp',
          reverse: false,
        },
        {
          title: 'Beckhoff Twincat 2 and 3SCADA Training',
          details: ['Siemens WinCC'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-2-Camera.webp',
          reverse: true,
        },
        {
          title: 'Microsoft Power Platform Training',
          details: ['Power BI', 'Power Apps', 'Power Automate'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-3-Camera.webp',
          reverse: false,
        },
        {
          title: 'Microsoft SQL Server',
          details: [],
          image: '/assets/new/hizmetler/egitim-danismanlik/1-9-egitim-ve-danismanlik-cozumleri-16-9-4-camera.webp',
          reverse: true,
        },
      ]
    : [
        {
          title: 'PLC ve HMI Eğitimleri',
          details: ['Siemens TIA Portal'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-1-Camera.webp',
          reverse: false,
        },
        {
          title: 'Beckhoff Twincat 2 ve 3SCADA Eğitimi',
          details: ['Siemens Wincc'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-2-Camera.webp',
          reverse: true,
        },
        {
          title: 'Microsoft Power Platform Eğitimleri',
          details: ['Power BI', 'Power Apps', 'Power Automate'],
          image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri 16-9-3-Camera.webp',
          reverse: false,
        },
        {
          title: 'Microsoft SQL Server',
          details: [],
          image: '/assets/new/hizmetler/egitim-danismanlik/1-9-egitim-ve-danismanlik-cozumleri-16-9-4-camera.webp',
          reverse: true,
        },
      ];

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={serviceName}
        subtitle={t('trainingPage.subtitle')}
        breadcrumbs={[t('trainingPage.breadcrumbHome'), t('trainingPage.breadcrumbServices'), serviceName]}
      />

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="reveal md:hidden -mx-4 overflow-hidden rounded-[20px] bg-[#03070b] shadow-[0_24px_54px_rgba(15,23,42,0.22)] h-[640px] max-h-[88vh] grid grid-rows-2">
            <div className="relative h-full">
              <SmartImage
                src="/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık ÇözümleriKutu.webp"
                alt={isRo ? 'Soluții de Instruire și Consultanță Siskon - Instruire în Tehnologie Industrială' : isEn ? 'Siskon Training and Consulting Solutions - Industrial Technology Training' : 'Siskon Eğitim ve Danışmanlık Çözümleri - Endüstriyel Teknoloji Eğitimi'}
                fill
                className="object-cover object-[56%_8%]"
                sizes="100vw"
                priority
                quality={75}
              />
            </div>

            <div className="px-5 py-8 text-center h-full flex flex-col justify-center">
              <h2 className="w-full text-[1.45rem] font-bold text-[#31E2FF] leading-[1.95rem]">
                {heroTitleLines.map((line, index) => (
                  <span key={`mobile-title-${line}-${index}`}>
                    {line}
                    {index < heroTitleLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h2>
              <p className="mt-4 w-full text-slate-100 text-lg leading-relaxed">
                {heroDescriptionLines.map((line, index) => (
                  <span key={`mobile-desc-${line}-${index}`}>
                    {line}
                    {index < heroDescriptionLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="hidden md:block reveal relative min-h-[340px] md:min-h-[430px] lg:min-h-[500px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-[0_24px_54px_rgba(15,23,42,0.16)]">
            <SmartImage
              src="/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık Çözümleri.webp"
              alt={isRo ? 'Soluții de Instruire și Consultanță Siskon - Instruire în Tehnologie Industrială' : isEn ? 'Siskon Training and Consulting Solutions - Industrial Technology Training' : 'Siskon Eğitim ve Danışmanlık Çözümleri - Endüstriyel Teknoloji Eğitimi'}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              quality={75}
            />

            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, rgba(2,8,23,0.82) 0%, rgba(2,8,23,0.76) 34%, rgba(2,8,23,0.58) 48%, rgba(2,8,23,0.22) 66%, rgba(2,8,23,0) 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 h-full max-w-[620px] p-6 md:p-9 lg:p-10 flex flex-col items-start justify-center text-left">
              <h2 className="w-full text-[1.75rem] md:text-[2rem] font-bold text-[#31E2FF] leading-[2.25rem] md:leading-[2.625rem]">
                {heroTitleLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < heroTitleLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h2>
              <div className="mt-7 mb-7 h-[2px] w-32 md:w-44 self-start bg-[#31E2FF]" aria-hidden="true" />
              <p className="w-full text-slate-100 text-lg leading-relaxed">
                {heroDescriptionLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < heroDescriptionLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('trainingPage.expertiseTitle')}</h2>
          </div>
          <div className="space-y-8 md:space-y-10">
            {trainings.map((t) => (
              <div key={t.title} className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center rounded-2xl px-0 md:px-4 py-4">
                <div className={t.reverse ? 'order-1 md:order-2' : 'order-1 md:order-1'}>
                  <SmartImage
                    src={t.image}
                    alt={t.title}
                    width={1920}
                    height={1080}
                    className="responsive-framed-image rounded-xl shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
                    quality={75}
                  />
                </div>
                <div className={t.reverse ? 'order-2 md:order-1' : 'order-2 md:order-2'}>
                  <div className="border-y border-[#2f69aa]/70 py-7 md:py-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-sky-500 leading-tight mb-3">{t.title}</h3>
                    {t.details.length > 0 && (
                      <div className="space-y-2">
                        {t.details.map((line) => (
                          <p key={line} className="text-xl md:text-2xl font-semibold text-[#0a4da0] leading-relaxed">{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('trainingPage.ctaTitle')}
          </h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {t('trainingPage.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('trainingPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}


