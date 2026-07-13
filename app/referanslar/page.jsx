'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import PageHero from '../components/PageHero';
import SmartImage from '../components/SmartImage';
import { useLanguage } from '../_context/LanguageContext';

function getCategories(t) {
  return [
    { id: 'all', name: t('referencesPage.categoryAll') },
    { id: 'tutun', name: t('referencesPage.categoryTobacco') },
    { id: 'otomotiv', name: t('referencesPage.categoryAutomotive') },
    { id: 'beyaz-esya', name: t('referencesPage.categoryWhiteGoods') },
    { id: 'gida-icecek', name: t('referencesPage.categoryFood') },
  ];
}

const REFERENCE_DATA = {
  tutun: [
    {
      id: 'jti',
      name: 'JTI',
      logo: 'JTI_Logo.svg',
      website: 'https://www.jti.com',
      sections: [
        {
          title: 'Global',
          items: [
            'Quality Information Management System (QIMS) GSC/R&D/LEAF/Border',
            'Global Supply Chain Analytics (GSCA) Machinery/KPI (Machinery)',
            'Machine Data Collection (Torbalı, Andorra, Jordan)',
            'MIRA Global Functional Training (Global)',
            'Feedback Management System',
          ],
        },
        {
          title: 'Local',
          items: [
            'Rainbow Logistic Software',
            'Energy Power Analyzer Data Collection',
            'Data Transfer to WinCC from Factory Link',
            'COS Tobacco Distribution Control',
            'AGV SAP System Interface',
            'Eva Bend Cooling Unit Automation',
          ],
        },
      ],
    },
    {
      id: 'philip-morris',
      name: 'Philip Morris',
      logo: 'philip_morris_sa.svg',
      blackLogo: 'PhilipMorrisBlack.svg',
      website: 'https://www.pmi.com',
      tableProjects: [
        'Filter Distribution',
        'TwinCAT Training',
        'Barcode Alarm System',
        'OPCServer',
        'Triacetin Distribution & Tow Control System',
        'Focke Case Packer Machine Upgrade',
        'Domino Rejection System',
        'Traicetin Distribution System',
        'Filter Tracking',
        'Door Automation',
        'Packing Machine Revision',
      ],
    },
  ],
  otomotiv: [
    {
      id: 'borgwarner',
      name: 'BorgWarner',
      logo: 'borgwarner-seeklogo.svg',
      website: 'https://www.borgwarner.com/',
      projects: [
        'Safety Light Curtains Project',
        'Phosphate Machine Automation',
        'BorgWarner Systems - Safety Light Curtains Project',
        'BorgWarner - Zink Nickel Coating',
        'BorgWarner - Warehouse Automation',
      ],
    },
    {
      id: 'phinia',
      name: 'Phinia',
      logo: 'phinia.svg',
      website: 'https://www.phinia.com/',
    },
    {
      id: 'nemak',
      name: 'Nemak',
      logo: 'nemak.svg',
      website: 'https://www.nemak.com/',
    },
    {
      id: 'tirsan-kardan',
      name: 'Tirsan-Kardan',
      logo: 'tirsan-seeklogo.webp',
      website: 'https://www.tirsankardan.com/',
    },
    {
      id: 'maxion-inci-celik',
      name: 'Maxion İnci Çelik',
      logo: 'maxion_inci.svg',
      website: 'https://www.maxionwheelsturkey.com/',
    },
  ],
  'beyaz-esya': [
    {
      id: 'vaillant',
      name: 'Vaillant',
      logo: 'Vaillant.svg',
      website: 'https://www.vaillant.com.tr/',
    },
    {
      id: 'group-atlantic',
      name: 'Group Atlantic',
      logo: 'groupe-atlantic-logo-vector.svg',
      website: 'https://www.groupe-atlantic.fr/',
    },
    {
      id: 'bsh',
      name: 'BSH',
      logo: 'BSH_Bosch_und_Siemens_Hausgerate_logo.svg',
      website: 'https://www.bsh-group.com/tr/',
    },
    {
      id: 'bosch-home',
      name: 'Bosch',
      logo: 'Bosch-logo.svg',
      website: 'https://www.bosch-home.com.tr/',
    },
    {
      id: 'candy-hoover-renta',
      name: 'Candy Hoover - Renta',
      logo: 'Hoover_Logo.svg',
      website: 'https://www.hoover-home.com/',
    },
  ],
  'gida-icecek': [
    {
      id: 'mey-diageo',
      name: 'Mey Diageo',
      logo: 'mey-diageo.svg',
      website: 'https://www.meydiageo.com/',
    },
    {
      id: 'nuhun-ankara',
      name: "Nuh'un Ankara",
      logo: 'NuhunAnkaraLogo.webp',
      website: 'https://www.nuh.com.tr',
    },
    {
      id: 'duru-bulgur',
      name: 'Duru Bulgur',
      logo: 'durubulgur-min-removebg-preview.webp',
      website: 'https://www.durubulgur.com/',
    },
    {
      id: 'turk-tuborg',
      name: 'Türk Tuborg',
      logo: 'turk-tuborg_logo.svg',
      website: 'https://www.turktuborg.com.tr',
    },
  ],
};

function getVisibleReferences(activeCategory) {
  if (activeCategory === 'all') {
    return Object.values(REFERENCE_DATA).flat();
  }

  return REFERENCE_DATA[activeCategory] ?? [];
}

function ReferenceDetails({ reference, t }) {
  const hasDetails = Boolean(reference.sections || reference.projects || reference.tableProjects);
  const mergedSectionProjects = reference.sections?.flatMap((section) => section.items) ?? [];

  return (
    <div className="space-y-8">
      {mergedSectionProjects.length ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3">{t('referencesPage.projectList')}</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            {mergedSectionProjects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {reference.projects ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3">{t('referencesPage.projectDetails')}</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            {reference.projects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {reference.tableProjects ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3">{t('referencesPage.projectList')}</h4>
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left">
              <tbody>
                {reference.tableProjects.map((item) => (
                  <tr key={item} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-3 text-slate-700 bg-white">{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {hasDetails ? null : <p className="text-slate-600">{t('referencesPage.noDetails')}</p>}
    </div>
  );
}

function getModalLogoConfig(referenceId) {
  if (referenceId === 'duru-bulgur') {
    return { width: 220, height: 86, className: 'w-[220px] h-[86px]' };
  }

  if (referenceId === 'nuhun-ankara') {
    return { width: 210, height: 84, className: 'w-[210px] h-[84px]' };
  }

  return { width: 170, height: 64, className: 'w-[170px] h-[64px]' };
}

function getCardLogoSizeConfig(referenceId, needsVisualBoost) {
  if (referenceId === 'duru-bulgur') {
    return { sizeClass: 'w-[96%] h-[76%]', heightClass: '' };
  }

  if (referenceId === 'group-atlantic') {
    return { sizeClass: 'w-[96%] h-[84%]', heightClass: '' };
  }

  if (referenceId === 'nuhun-ankara') {
    return { sizeClass: 'w-[98%] h-[90%]', heightClass: 'h-[80%]' };
  }

  if (needsVisualBoost) {
    return { sizeClass: 'w-[84%]', heightClass: 'h-[80%]' };
  }

  return { sizeClass: 'w-[84%]', heightClass: 'h-[60%]' };
}

function ReferenceModal({ selectedReference, onClose, t }) {
  if (!selectedReference) {
    return null;
  }

  const modalLogoConfig = getModalLogoConfig(selectedReference.id);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-[#031426]/80 backdrop-blur-md animate-in fade-in duration-300">
      <button
        type="button"
        aria-label={t('referencesPage.closeModal')}
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
      <div className="w-full max-w-3xl rounded-[30px] md:rounded-[36px] overflow-hidden relative animate-in zoom-in-95 duration-300 border border-sky-100 shadow-[0_28px_70px_rgba(2,6,23,0.45)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f3faff] via-white to-[#f7fbff]" />
        <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white text-slate-500 border border-slate-200 hover:bg-red-50 hover:text-red-500 transition-all z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 md:p-10 lg:p-12">
          <div className="mb-6 rounded-2xl border border-sky-100 bg-gradient-to-r from-[#eaf6ff] via-white to-[#eef7ff] p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-6">
            <div className="w-28 h-28 md:w-32 md:h-32 bg-white rounded-3xl flex items-center justify-center p-5 border border-slate-200 shadow-sm">
              {selectedReference.logo ? (
                <SmartImage
                  src={`/assets/Logos/${selectedReference.logo}`}
                  alt={selectedReference.name}
                  width={modalLogoConfig.width}
                  height={modalLogoConfig.height}
                  className={`object-contain ${modalLogoConfig.className}`}
                  fallbackLabel={t('referencesPage.logoUnavailable')}
                />
              ) : (
                <span className="text-center text-slate-700 font-black">{selectedReference.name}</span>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-sky-700 font-black mb-2">Siskon Reference</p>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">{selectedReference.name}</h3>
              <a
                href={selectedReference.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-slate-900 text-white px-4 py-2 text-sm md:text-base font-bold hover:bg-sky-700 transition-colors"
              >
                {selectedReference.website}
              </a>
            </div>
          </div>
          </div>

          <ReferenceDetails reference={selectedReference} t={t} />

          <div className="mt-10 pt-8 border-t border-slate-200">
            <button
              onClick={onClose}
              className="w-full btn-primary btn-no-arrow bg-slate-900 hover:bg-sky-600"
            >
              {t('referencesPage.closeButton')}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function ReferencesPage() {
  const { t, localizePath } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedReference, setSelectedReference] = useState(null);
  const categories = getCategories(t);
  const visibleReferences = getVisibleReferences(activeCategory);

  const heroBreadcrumbs = [t('referencesPage.heroBreadcrumbs.0'), t('referencesPage.heroBreadcrumbs.1')];

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={t('referencesPage.heroTitle')}
        subtitle={t('referencesPage.heroSubtitle')}
        breadcrumbs={heroBreadcrumbs}
      />

      <section className="py-20 md:py-32 px-6">
        <div className="container-wide mx-auto">

          {/* Kategori filtreleri */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-14">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-[15px] font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/30'
                    : 'bg-white text-slate-500 hover:text-sky-600 border border-slate-200 hover:border-sky-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Logo grid — altın oran kartlar (φ ≈ 1.618) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {visibleReferences.map((ref) => {
              const needsVisualBoost = ref.id === 'group-atlantic' || ref.id === 'nuhun-ankara';
              const { sizeClass, heightClass } = getCardLogoSizeConfig(ref.id, needsVisualBoost);
              const isPhilipMorris = ref.id === 'philip-morris' && ref.blackLogo;
              const philipSizeClass = 'w-[95%] h-[76%]';
              const appliedSizeClass = isPhilipMorris ? philipSizeClass : sizeClass;
              const appliedHeightClass = isPhilipMorris ? '' : heightClass;
              let logoContent = (
                <span className="text-center text-slate-800 font-black text-base md:text-lg leading-tight px-2">
                  {ref.name}
                </span>
              );

              if (isPhilipMorris) {
                logoContent = (
                  <div className={`relative ${appliedSizeClass} ${appliedHeightClass}`}>
                    <SmartImage
                      src={`/assets/Logos/${ref.blackLogo}`}
                      alt={ref.name}
                      width={210}
                      height={88}
                      className="absolute inset-0 h-full w-full object-contain transition-all duration-300 group-hover:scale-105 contrast-[1.7] saturate-0 [filter:contrast(1.7)_drop-shadow(0_0_0.45px_#020617)]"
                      fallbackLabel={t('referencesPage.logoUnavailable')}
                    />
                  </div>
                );
              } else if (ref.logo) {
                logoContent = (
                  <SmartImage
                    src={`/assets/Logos/${ref.logo}`}
                    alt={ref.name}
                    width={210}
                    height={88}
                    className={`object-contain filter grayscale brightness-0 contrast-[2.6] saturate-0 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100 group-hover:scale-105 ${appliedSizeClass} ${appliedHeightClass}`}
                    fallbackLabel={t('referencesPage.logoUnavailable')}
                  />
                );
              }

              return (
                <button
                  key={ref.id}
                  onClick={() => setSelectedReference(ref)}
                  className="w-full aspect-[1.56] relative rounded-md bg-[#edf9fc] border border-[#35e2ff] ring-1 ring-[#35e2ff]/45 hover:ring-[#08d6ff] hover:border-[#08d6ff] hover:shadow-[0_8px_24px_rgba(8,214,255,0.14)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-5 md:p-6">
                    {logoContent}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      <ReferenceModal selectedReference={selectedReference} onClose={() => setSelectedReference(null)} t={t} />

      <section className="cta-section py-20 md:py-32 bg-slate-50 px-6">
        <div className="container-wide mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">{t('referencesPage.ctaTitle')}</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-12">
            {t('referencesPage.ctaText')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-primary inline-flex">
            {t('referencesPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}

const copyPropType = PropTypes.shape({
  closeModal: PropTypes.string,
  logoUnavailable: PropTypes.string,
  projectDetails: PropTypes.string,
  projectList: PropTypes.string,
  noDetails: PropTypes.string,
  closeButton: PropTypes.string,
}).isRequired;

const referencePropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  logo: PropTypes.string,
  blackLogo: PropTypes.string,
  website: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.string),
  tableProjects: PropTypes.arrayOf(PropTypes.string),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.string),
    })
  ),
});

ReferenceDetails.propTypes = {
  reference: referencePropType.isRequired,
  t: PropTypes.func.isRequired,
};

ReferenceModal.propTypes = {
  selectedReference: referencePropType,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};