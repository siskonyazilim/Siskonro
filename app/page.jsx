'use client';

import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import SmartImage from './components/SmartImage';
import { getHomeContent } from './lib/content/homeContent';
import { useLanguage } from './_context/LanguageContext';

function ServicesGrid({ services, isEn, isRo, localizePath, t }) {
  return (
    <>
      {services.map((service) => {
        const lockCtaRow = [
          '/hizmetler/musteriye-ozel-yazilim',
          '/hizmetler/iiot',
          '/hizmetler/makine-proses-otomasyonu',
        ].includes(service.href);

        return (
          <Link
            key={service.num}
            href={localizePath(service.href)}
            className="card reveal group h-full flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1 focus-ring-card"
            aria-label={`${service.title} - ${isRo ? 'Explorați detaliile' : isEn ? 'Explore details' : 'Detayları keşfet'}`}
          >
            <div className="card-media card-media--light card-media--service h-72 sm:h-80">
              <SmartImage
                src={service.img}
                alt={service.title}
                fill
                className="object-contain p-2 sm:p-3 drop-shadow-[0_16px_28px_rgba(14,165,233,0.28)]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fallbackLabel={t('home.imageUnavailable')}
              />
            </div>
            <div className="card-body flex flex-col text-center">
              <h3 className={`text-2xl font-bold text-slate-900 leading-tight mb-3 ${lockCtaRow ? 'min-h-[4.5rem]' : ''}`}>{service.title}</h3>
              <p className={`text-slate-600 mb-3 ${lockCtaRow ? 'min-h-[5.5rem]' : ''}`}>{service.desc}</p>
              <span className="inline-flex items-center justify-center gap-2 text-sky-700 font-semibold">
                {t('home.exploreDetails')}
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </div>
          </Link>
        );
      })}
    </>
  );
}

ServicesGrid.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      num: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ).isRequired,
  isEn: PropTypes.bool.isRequired,
  isRo: PropTypes.bool.isRequired,
  localizePath: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default function HomePage() {
  const { locale, localizePath, t } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const { services, products, references, stats } = getHomeContent(locale);
  const onsuite = products[0];

  const continentItems = isRo
    ? [
      { key: 'europe', label: 'Europa', src: '/assets/new/map/avrupa.svg' },
      { key: 'africa', label: 'Africa', src: '/assets/new/map/africa.svg' },
      { key: 'asia', label: 'Asia', src: '/assets/new/map/asya.svg' },
      { key: 'north-america', label: 'America de Nord', src: '/assets/new/map/n.america.svg' },
      { key: 'south-america', label: 'America de Sud', src: '/assets/new/map/s.america.svg' },
    ]
    : isEn
    ? [
      { key: 'europe', label: 'Europe', src: '/assets/new/map/avrupa.svg' },
      { key: 'africa', label: 'Africa', src: '/assets/new/map/africa.svg' },
      { key: 'asia', label: 'Asia', src: '/assets/new/map/asya.svg' },
      { key: 'north-america', label: 'North America', src: '/assets/new/map/n.america.svg' },
      { key: 'south-america', label: 'South America', src: '/assets/new/map/s.america.svg' },
    ]
    : [
      { key: 'europe', label: 'Avrupa', src: '/assets/new/map/avrupa.svg' },
      { key: 'africa', label: 'Afrika', src: '/assets/new/map/africa.svg' },
      { key: 'asia', label: 'Asya', src: '/assets/new/map/asya.svg' },
      { key: 'north-america', label: 'Kuzey Amerika', src: '/assets/new/map/n.america.svg' },
      { key: 'south-america', label: 'Güney Amerika', src: '/assets/new/map/s.america.svg' },
    ];
  const [activeContinentKey, setActiveContinentKey] = useState(null);
  const [activeMapSrc, setActiveMapSrc] = useState('/assets/new/map/world2.svg');
  const selectedContinent = continentItems.find((item) => item.key === activeContinentKey);
  const defaultMapAlt = isRo ? 'Harta globală a proiectelor' : isEn ? 'Global projects map' : 'Global projeler haritası';
  const mapAlt = selectedContinent
    ? `${selectedContinent.label} map`
    : defaultMapAlt;
  const contentKey = `home-${locale}`;

  return (
    <div key={contentKey} className="bg-white overflow-hidden">
      <section className="hero-section min-h-screen h-[100dvh] flex items-start lg:items-center pt-[92px] lg:pt-24 relative overflow-hidden">
        <Image
          src="/images/homepage_back_mobile.webp"
          alt="Siskon Hero Background"
          fill
          priority
          className="object-cover opacity-20 mix-blend-luminosity pointer-events-none md:hidden"
          style={{ objectPosition: 'center center' }}
          sizes="(max-width: 767px) 100vw, 0px"
          quality={60}
        />
        <Image
          src="/images/homepage_back.webp"
          alt="Siskon Hero Background"
          fill
          priority
          className="hidden md:block object-cover opacity-15 mix-blend-luminosity pointer-events-none"
          style={{ objectPosition: 'center right' }}
          sizes="(max-width: 767px) 0px, 100vw"
          quality={60}
        />
        <div
          className="pointer-events-none absolute right-[7%] top-[18%] h-[30vw] w-[30vw] min-h-[220px] min-w-[220px] rounded-full bg-black/28 blur-3xl mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[16%] top-[24%] h-[20vw] w-[20vw] min-h-[140px] min-w-[140px] rounded-full bg-white/16 blur-[88px] mix-blend-screen"
          aria-hidden="true"
        />
        <div className="container-wide w-full relative z-10 pl-4 pr-4 lg:pr-8">
          <div className="lg:hidden mx-auto w-full max-w-[360px] md:max-w-[560px] text-center pt-2 md:pt-4 pb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 text-[9px] md:text-[11px] font-black tracking-[0.2em] uppercase">
              Makes Your Factory Smarter
            </span>

            <p className="mt-4 md:mt-6 text-[1.95rem] md:text-[2.8rem] font-black text-white leading-[1.08] tracking-tight drop-shadow-2xl" style={{ fontWeight: 900, lineHeight: 1.08, opacity: 1 }}>
              {t('home.heroTaglineLine1')}
              <br />
              {t('home.heroTaglineLine2')}
            </p>

            <div className="mt-3 text-[1.95rem] md:text-[2.5rem] font-black leading-[1.08] tracking-tight bg-gradient-to-r from-cyan-100 via-sky-200 to-blue-100 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(125,211,252,0.55)]">
              {t('home.heroTitle')}
            </div>

            <div className="h-[22vh] min-h-[140px] max-h-[190px] md:h-[28vh] md:min-h-[180px] md:max-h-[220px]" aria-hidden="true" />

            <div className="mt-8 bg-white/5 border border-white/10 rounded-[22px] p-4 md:p-6 shadow-2xl text-left max-w-[340px] md:max-w-[500px] mx-auto">
              <p className="text-[0.84rem] md:text-sm text-slate-100 leading-[1.62] font-normal opacity-90 [text-wrap:balance]">
                {t('home.heroDescription')}
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <Link href={localizePath('/kurumsal/bizi-taniyin')} className="btn-primary w-[164px] md:w-auto md:px-10 text-[0.84rem] md:text-base py-2.5">
                {isRo ? 'Despre Noi' : isEn ? 'About Us' : 'Bizi Tanıyın'}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block max-w-3xl space-y-6 lg:space-y-7">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-300 text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase">
              Makes Your Factory Smarter
            </span>
            <div className="space-y-3">
              <h1 className="text-[2rem] md:text-[3.2rem] lg:text-[3.55rem] font-black leading-[1.04] tracking-tight bg-gradient-to-r from-cyan-100 via-sky-200 to-blue-100 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(125,211,252,0.55)]">
                {t('home.heroTitle')}
              </h1>
              <p className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.12] tracking-tight drop-shadow-2xl" style={{ fontWeight: 900, lineHeight: 1.12, opacity: 1 }}>
                {t('home.heroTaglineLine1')}
                <br />
                {t('home.heroTaglineLine2')}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6 md:p-8 shadow-2xl">
              <p className="text-base md:text-[1.03rem] text-slate-100 leading-[1.72] font-medium opacity-90 text-left [text-wrap:balance]">
                {t('home.heroDescription')}
              </p>
            </div>
            <div className="cta-group flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6">
              <Link href={localizePath('/kurumsal/bizi-taniyin')} className="btn-primary text-sm md:text-base">
                {isRo ? 'Despre Noi' : isEn ? 'About Us' : 'Bizi Tanıyın'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6">
        <div className="container-wide">
          <div className="section-head reveal text-center max-w-5xl mx-auto mb-14">
            <span className="eyebrow">{t('home.servicesEyebrow')}</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {t('home.servicesTitle')}
            </h2>
            <p className="text-slate-500 text-lg max-w-4xl mx-auto mt-6">
              {t('home.servicesDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServicesGrid services={services} isEn={isEn} localizePath={localizePath} t={t} />

            <div className="card reveal animated-card" data-tilt="true" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0EA5E9 100%)', color: '#fff' }}>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 280 }}>
                <span className="eyebrow" style={{ color: '#7dd3fc' }}>{t('home.allServicesEyebrow')}</span>
                <h3 style={{ color: '#fff' }}>{t('home.allServicesTitle')}</h3>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>{t('home.allServicesDescription')}</p>
                <Link className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff', alignSelf: 'flex-start', marginTop: 12 }} href={localizePath('/hizmetler')}>
                  {t('home.allServicesButton')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt py-12 md:py-20 px-6 bg-slate-50">
        <div className="container-wide">
          <div className="section-head reveal text-center max-w-5xl mx-auto mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {isRo ? 'OnSuite — Platformă Inteligentă de Producție' : isEn ? 'OnSuite — Smart Manufacturing Platform' : 'OnSuite — Akıllı Üretim Platformu'}
            </h2>
          </div>

          <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <Link href={localizePath('/onsuite')} className="block group">
                <div className="relative w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
                  <SmartImage
                    src={onsuite?.img || '/assets/new/urunler/onsuite/OnsuiteNew.webp'}
                    alt={onsuite?.title || 'OnSuite'}
                    fill
                    className="object-contain object-left transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    fallbackLabel={t('home.imageUnavailable')}
                  />
                </div>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="p-2 md:p-3 lg:p-4 text-left">
                <div className="space-y-5 text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                  {isRo ? (
                    <>
                      <p className="text-justify hyphens-auto" lang="ro">
                        OnSuite reunește producția, calitatea și inteligența operațională pe o singură structură digitală.
                        Prin combinarea conectivității mașinilor, monitorizării continue, trasabilității și analizelor de performanță în aceeași arhitectură,
                        permite echipelor să ia decizii mai rapide și mai precise.
                      </p>
                      <p className="text-justify hyphens-auto" lang="ro">
                        Datorită abordării sale modulare de implementare și capacităților de integrare la nivel de întreprindere, vă puteți scala de la o
                        singură linie de producție la operațiuni cu mai multe facilități, fără a reconstrui infrastructura de sistem de bază.
                      </p>
                    </>
                  ) : isEn ? (
                    <>
                      <p className="text-justify hyphens-auto" lang="en">
                        OnSuite brings production, quality, and operational intelligence together on a single digital backbone.
                        By combining machine connectivity, continuous monitoring, traceability, and performance analytics into the same architecture,
                        it enables teams to make faster and more accurate decisions.
                      </p>
                      <p className="text-justify hyphens-auto" lang="en">
                        Thanks to its modular deployment approach and enterprise integration capabilities, you can scale from a
                        single production line to multi-facility operations without rebuilding your underlying system infrastructure.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-justify hyphens-auto" lang="tr">
                        OnSuite; üretim, kalite ve operasyonel zekayı tek bir dijital omurgada birleştirir.
                        Makine bağlantısı, canlı izleme, izlenebilirlik ve performans analitiğini aynı yapıda topladığı için
                        ekipler daha hızlı ve doğru karar alır.
                      </p>
                      <p className="text-justify hyphens-auto" lang="tr">
                        Modüler devreye alma yaklaşımı ve kurumsal entegrasyon yetenekleri sayesinde tek bir hattan başlayıp
                        çoklu tesis yönetimine, altyapıyı yeniden kurmadan ölçeklenebilirsiniz.
                      </p>
                    </>
                  )}
                </div>

                <Link
                  href={localizePath('/onsuite')}
                  className="btn btn-primary"
                >
                  {isRo ? 'Descoperiți OnSuite' : isEn ? 'Discover OnSuite' : "OnSuite'i Keşfedin"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark py-12 md:py-20" style={{ background: '#0A192F' }}>
        <div className="container-wide px-6">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-12">
            <span className="eyebrow" style={{ color: '#7dd3fc' }}>{t('home.globalEyebrow')}</span>
            <h2 style={{ color: '#fff' }} className="text-3xl md:text-5xl font-black">
              {t('home.globalTitle')}
            </h2>
            <p className="lead text-slate-300 mt-5">
              {t('home.globalDescription')}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 reveal max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="stat p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                <div className="val text-4xl md:text-5xl font-black text-sky-300">{stat.num}</div>
                <div className="lbl text-white/75 mt-2 text-xs font-bold tracking-[0.14em] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 px-6">
        <div className="container-wide">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-10">
            <span className="eyebrow">{t('home.referencesEyebrow')}</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">{t('home.referencesTitle')}</h2>
          </div>

          <div className="relative overflow-hidden reveal py-6">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-14 md:gap-20">
              {[...references, ...references].map((ref, idx) => (
                <div key={`${ref.name}-${idx}`} className="flex-shrink-0 w-[160px] md:w-[220px] h-[72px] md:h-[88px] bg-white border border-slate-200 rounded-xl px-4 flex items-center justify-center">
                  <Image
                    src={ref.logo}
                    alt={ref.name}
                    width={180}
                    height={60}
                    className="max-h-10 md:max-h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="section-dark py-0 lg:py-28" style={{ background: '#0A192F' }}>
        <div className="lg:hidden relative overflow-hidden px-6 pt-12 pb-10" style={{ background: 'linear-gradient(160deg, #0f4e8a 0%, #0a2f70 46%, #010b44 100%)' }}>
          <div className="relative z-10 text-center">
            <span className="inline-block text-[11px] font-semibold tracking-[0.03em]" style={{ color: '#d9efff' }}>
              {isRo ? 'Proiectele Noastre Globale' : isEn ? 'Our Global Projects' : 'Global Projelerimiz'}
            </span>
            <h2 className="mt-3 text-[2.7rem] leading-[1.06] font-black">
              <span className="block text-cyan-300">40+{isRo ? 'Țări' : isEn ? 'Countries' : 'Ülke'}</span>
              <span className="block mt-2 text-white">100+{isRo ? 'Proiecte' : isEn ? 'Projects' : 'Proje'}</span>
            </h2>

            <div className="relative mt-8 h-[330px] w-full">
              <Image
                src="/assets/new/map/world2.svg"
                alt={defaultMapAlt}
                fill
                className="object-contain scale-[1.45] translate-y-6"
                sizes="100vw"
                priority={false}
              />
            </div>

            <div className="mt-8 relative z-20 w-full max-w-[700px] mx-auto">
              <Image
                src="/images/Artboard%2010.png"
                alt={isRo ? 'Legenda proiectelor globale' : isEn ? 'Global projects legend' : 'Global projeler lejandı'}
                width={2100}
                height={520}
                className="w-full h-auto object-contain object-left"
                sizes="100vw"
                priority={false}
              />
            </div>
          </div>
        </div>

        <div className="container-wide px-6 hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start lg:items-center">
            <div className="lg:col-span-4">
              <span className="eyebrow text-base md:text-lg" style={{ color: '#7dd3fc' }}>
                {isRo ? 'Proiectele Noastre Globale' : isEn ? 'Our Global Projects' : 'Global Projelerimiz'}
              </span>
              <h2 className="mt-5 text-[2.35rem] md:text-[3.9rem] font-black leading-[1.14] tracking-[0.01em] text-white">
                <span className="block">40+ {isRo ? 'Țări' : isEn ? 'Countries' : 'Ülke'}</span>
                <span className="block mt-2 md:mt-3 text-sky-300 font-black">100+ {isRo ? 'Proiecte' : isEn ? 'Projects' : 'Proje'}</span>
              </h2>

              <ul className="mt-8 space-y-2.5">
                {continentItems.map((item) => {
                  const active = activeContinentKey === item.key;
                  const itemColor = active ? '#FFFFFF' : '#d6e8ff';
                  const itemWeight = active ? 700 : 500;
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveContinentKey(item.key);
                          setActiveMapSrc(item.src);
                        }}
                        className="inline-flex items-center gap-3 text-base md:text-lg transition-colors duration-200"
                        style={{ color: itemColor, fontWeight: itemWeight }}
                        aria-pressed={active}
                      >
                        <span className="text-sky-300">&rsaquo;</span>
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 max-w-[560px]">
                <Image
                  src="/images/Artboard%2010.png"
                  alt={isRo ? 'Legenda proiectelor globale' : isEn ? 'Global projects legend' : 'Global projeler lejandı'}
                  width={2100}
                  height={520}
                  className="w-full h-auto object-contain object-left"
                  sizes="(max-width: 1280px) 70vw, 560px"
                  priority={false}
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="relative w-full h-[280px] md:h-[390px] lg:h-[450px]">
                <Image
                  src={activeMapSrc}
                  alt={mapAlt}
                  fill
                  className="object-contain relative z-10"
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section cta-band py-12 md:py-20 bg-white">
        <div className="container-wide px-6 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-slate-600 mt-5 text-lg">
            {t('home.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn btn-primary mt-8 inline-flex">
            {t('home.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
