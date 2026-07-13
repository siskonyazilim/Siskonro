'use client';

import Link from 'next/link';
import PageHero from '../components/PageHero';
import { useLanguage } from '../_context/LanguageContext';

export default function PartnershipsPage() {
  const { t, locale, localizePath } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  const heroBreadcrumbs = [t('partnershipsPage.breadcrumbHome'), t('partnershipsPage.breadcrumbPartnerships')];

  const partners = isRo
    ? [
        { year: '2002', name: 'Beckhoff', role: 'Partener Soluții Tehnologice', workArea: 'Vânzări Produse, Dezvoltare Proiecte', techArea: 'Echipamente de Automatizare Industrială pe bază de PC', logo: '/assets/Logos/Beckhoff_white.svg' },
        { year: '2003', name: 'Microsoft', role: 'Partener Platformă Strategică', workArea: 'Vânzări Licențe, Dezvoltare Proiecte', techArea: 'Servicii Software și Cloud', logo: '/assets/Logos/microsoft.svg' },
        { year: '2017', name: 'SICK', role: 'Partener Soluții AppSpace', workArea: 'Dezvoltare Proiecte', techArea: 'Senzori Industriali', logo: '/assets/Logos/sick.svg' },
        { year: '2018', name: 'Markem Imaje', role: 'Furnizor Tehnologie pe bază de Proiect', workArea: 'Dezvoltare Proiecte', techArea: 'Sisteme de Marcare și Codare', logo: '/assets/Logos/project_markem.svg' },
        { year: '2019', name: 'Universal Robots', role: 'Furnizor Tehnologie pe bază de Proiect', workArea: 'Dezvoltare Proiecte', techArea: 'Roboți Colaborativi', logo: '/assets/Logos/universal_robots.svg' },
        { year: '2020', name: 'Interroll', role: 'Furnizor Tehnologie pe bază de Proiect', workArea: 'Vânzări Produse, Dezvoltare Proiecte', techArea: 'Sisteme de Transport Modular Industrial', logo: '/assets/Logos/Interroll.svg' },
        { year: '2023', name: 'Sewio', role: 'Partener Soluții Tehnologice', workArea: 'Vânzări Produse, Dezvoltare Proiecte', techArea: 'Sisteme RTLS Industriale', logo: '/assets/Logos/Sewio-Logo-Color-RGB.svg' },
        { year: '2023', name: 'Ignition', role: 'Partener Soluții Tehnologice', workArea: 'Vânzări Licențe, Dezvoltare Platforme', techArea: 'Platformă SCADA Web-Based Industrială', logo: '/assets/Logos/ignition-by-inductive-automation-logo-vector.svg' },
        { year: '2023', name: 'Efeso', role: 'Partener Strategic Transformare Digitală', workArea: 'Dezvoltare Proiecte Comune', techArea: 'Consultanță Transformare Digitală Industrială', logo: '/assets/Logos/efeso_logo.svg' },
        { year: '2024', name: 'GE Vernova', role: 'Furnizor Soluții', workArea: 'Dezvoltare Proiecte', techArea: 'Platformă MES Industrială Integrată', logo: '/assets/Logos/GE_Vernova_logo.svg' },
        { year: '2024', name: 'Kuika', role: 'Furnizor Tehnologie pe bază de Proiect', workArea: 'Dezvoltare Proiecte', techArea: 'Platformă Low-Code', logo: '/assets/Logos/kuika.svg' },
        { year: '2024', name: 'IAS', role: 'Furnizor Tehnologie pe bază de Proiect', workArea: 'Dezvoltare Proiecte', techArea: 'ERP' },
        { year: '2025', name: 'Faradai', role: 'Furnizor Tehnologie pe bază de Proiect', workArea: 'Vânzări Produse', techArea: 'Sisteme de Management Energetic IoT', logo: '/assets/Logos/Faradai.svg' },
      ]
    : isEn
    ? [
        { year: '2002', name: 'Beckhoff', role: 'Technology Solution Partner', workArea: 'Product Sales, Project Development', techArea: 'PC-Based Industrial Automation Equipment', logo: '/assets/Logos/Beckhoff_white.svg' },
        { year: '2003', name: 'Microsoft', role: 'Strategic Platform Partner', workArea: 'License Sales, Project Development', techArea: 'Software and Cloud Services', logo: '/assets/Logos/microsoft.svg' },
        { year: '2017', name: 'SICK', role: 'AppSpace Solution Partner', workArea: 'Project Development', techArea: 'Industrial Sensors', logo: '/assets/Logos/sick.svg' },
        { year: '2018', name: 'Markem Imaje', role: 'Project-Based Technology Provider', workArea: 'Project Development', techArea: 'Marking and Coding Systems', logo: '/assets/Logos/project_markem.svg' },
        { year: '2019', name: 'Universal Robots', role: 'Project-Based Technology Provider', workArea: 'Project Development', techArea: 'Collaborative Robots', logo: '/assets/Logos/universal_robots.svg' },
        { year: '2020', name: 'Interroll', role: 'Project-Based Technology Provider', workArea: 'Product Sales, Project Development', techArea: 'Industrial Modular Conveying Systems', logo: '/assets/Logos/Interroll.svg' },
        { year: '2023', name: 'Sewio', role: 'Technology Solution Partner', workArea: 'Product Sales, Project Development', techArea: 'Industrial RTLS Systems', logo: '/assets/Logos/Sewio-Logo-Color-RGB.svg' },
        { year: '2023', name: 'Ignition', role: 'Technology Solution Partner', workArea: 'License Sales, Platform Development', techArea: 'Industrial Web-Based SCADA Platform', logo: '/assets/Logos/ignition-by-inductive-automation-logo-vector.svg' },
        { year: '2023', name: 'Efeso', role: 'Strategic Digital Transformation Partner', workArea: 'Joint Project Development', techArea: 'Industrial Digital Transformation Consulting', logo: '/assets/Logos/efeso_logo.svg' },
        { year: '2024', name: 'GE Vernova', role: 'Solution Provider', workArea: 'Project Development', techArea: 'Integrated Industrial MES Platform', logo: '/assets/Logos/GE_Vernova_logo.svg' },
        { year: '2024', name: 'Kuika', role: 'Project-Based Technology Provider', workArea: 'Project Development', techArea: 'Low-Code Platform', logo: '/assets/Logos/kuika.svg' },
        { year: '2024', name: 'IAS', role: 'Project-Based Technology Provider', workArea: 'Project Development', techArea: 'ERP' },
        { year: '2025', name: 'Faradai', role: 'Project-Based Technology Provider', workArea: 'Product Sales', techArea: 'IoT-Based Energy Management Systems', logo: '/assets/Logos/Faradai.svg' },
      ]
    : [
        { year: '2002', name: 'Beckhoff', role: 'Teknoloji Çözüm Ortağı', workArea: 'Ürün Satışı, Proje Geliştirme', techArea: 'PC Tabanlı Endüstriyel Otomasyon Ekipmanları', logo: '/assets/Logos/Beckhoff_white.svg' },
        { year: '2003', name: 'Microsoft', role: 'Stratejik Platform Partneri', workArea: 'Lisans Satışı, Proje Geliştirme', techArea: 'Yazılım ve Bulut Hizmetleri', logo: '/assets/Logos/microsoft.svg' },
        { year: '2017', name: 'SICK', role: 'AppSpace Çözüm Ortağı', workArea: 'Proje Geliştirme', techArea: 'Endüstriyel Sensörler', logo: '/assets/Logos/sick.svg' },
        { year: '2018', name: 'Markem Imaje Projet', role: 'Proje Bazlı Teknoloji Sağlayıcısı', workArea: 'Proje Geliştirme', techArea: 'Markalama ve Kodlama Sistemleri', logo: '/assets/Logos/project_markem.svg' },
        { year: '2019', name: 'Universal Robots', role: 'Proje Bazlı Teknoloji Sağlayıcısı', workArea: 'Proje Geliştirme', techArea: 'Kolaboratif Robotlar', logo: '/assets/Logos/universal_robots.svg' },
        { year: '2020', name: 'Interroll', role: 'Proje Bazlı Teknoloji Sağlayıcısı', workArea: 'Ürün Satışı, Proje Geliştirme', techArea: 'Endüstriyel Modüler Taşıma Sistemleri', logo: '/assets/Logos/Interroll.svg' },
        { year: '2023', name: 'Sewio', role: 'Teknoloji Çözüm Ortağı', workArea: 'Ürün Satışı, Proje Geliştirme', techArea: 'Endüstriyel RTLS Sistemleri', logo: '/assets/Logos/Sewio-Logo-Color-RGB.svg' },
        { year: '2023', name: 'Ignition', role: 'Teknoloji Çözüm Ortağı', workArea: 'Lisans Satışı, Platform Geliştirme', techArea: 'Endüstriyel Web Tabanlı SCADA Platformu', logo: '/assets/Logos/ignition-by-inductive-automation-logo-vector.svg' },
        { year: '2023', name: 'Efeso', role: 'Stratejik Dijital Dönüşüm Ortağı', workArea: 'Ortak Proje Geliştirme', techArea: 'Endüstriyel Dijital Dönüşüm Danışmanlığı', logo: '/assets/Logos/efeso_logo.svg' },
        { year: '2024', name: 'GE Vernova', role: 'Çözüm Sağlayıcısı', workArea: 'Proje Geliştirme', techArea: 'Endüstriyel Entegre MES Platformu', logo: '/assets/Logos/GE_Vernova_logo.svg' },
        { year: '2024', name: 'Kuika', role: 'Proje Bazlı Teknoloji Sağlayıcısı', workArea: 'Proje Geliştirme', techArea: 'Low Code Platformu', logo: '/assets/Logos/kuika.svg' },
        { year: '2024', name: 'IAS', role: 'Proje Bazlı Teknoloji Sağlayıcısı', workArea: 'Proje Geliştirme', techArea: 'ERP' },
        { year: '2025', name: 'Faradai', role: 'Proje Bazlı Teknoloji Sağlayıcısı', workArea: 'Ürün Satışı', techArea: 'IoT Tabanlı Enerji Yönetim Sistemleri', logo: '/assets/Logos/Faradai.svg' },
      ];

  return (
    <div className="bg-white">
      <PageHero
        title={t('partnershipsPage.pageTitle')}
        subtitle={t('partnershipsPage.pageSubtitle')}
        breadcrumbs={heroBreadcrumbs}
      />

      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            <span className="eyebrow">{t('partnershipsPage.ecosystemEyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('partnershipsPage.ecosystemTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-7">
            {partners.map((p, idx) => {
              const isLast = idx === partners.length - 1;
              const needsVisualBoost = p.name === 'Ignition' || p.name === 'Faradai';
              return (
                <article
                  key={`${p.year}-${p.name}`}
                  className={`group reveal rounded-md border border-[#35e2ff] ring-1 ring-[#35e2ff]/45 bg-[#edf9fc] overflow-hidden transition-all duration-300 hover:ring-[#08d6ff] hover:border-[#08d6ff] hover:shadow-[0_8px_24px_rgba(8,214,255,0.14)] hover:-translate-y-0.5 ${
                    isLast ? 'sm:col-span-2 xl:col-span-4 xl:max-w-[300px] xl:mx-auto' : ''
                  }`}
                >
                  <div className="h-32 md:h-36 px-6 flex items-center justify-center bg-[#eaf6fb] border-b border-[#35e2ff]/45">
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={`${p.name} logo`}
                        className={`object-contain filter grayscale brightness-0 contrast-[2.6] saturate-0 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100 ${needsVisualBoost ? 'h-28 md:h-32 w-auto max-w-[240px] md:max-w-[260px]' : 'h-14 md:h-16 w-[200px] md:w-[220px]'}`}
                        loading="lazy"
                      />
                    ) : (
                      <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">{p.name}</h3>
                    )}
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-5 h-5 rounded-full border border-sky-500/70 grid place-items-center mt-0.5 shrink-0">
                        <svg className="w-2.5 h-2.5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M5 12l5 5L19 8" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sky-500 text-sm font-bold leading-none mb-1">{p.year}</p>
                        <p className="text-[#0a4da0] text-sm md:text-base font-bold leading-snug">{p.role}</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm">
                      <p className="text-slate-700 leading-snug">
                        <span className="font-bold text-sky-600">{t('partnershipsPage.workingArea')}</span> {p.workArea}
                      </p>
                      <p className="text-slate-700 leading-snug">
                        <span className="font-bold text-sky-600">{t('partnershipsPage.technologyArea')}</span> {p.techArea}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{t('partnershipsPage.ctaSectionTitle')}</h2>
          <p>{t('partnershipsPage.ctaSectionDesc')}</p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta">{t('partnershipsPage.ctaSectionButton')}</Link>
        </div>
      </section>
    </div>
  );
}