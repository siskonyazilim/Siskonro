'use client';

import { useState } from 'react';
import AnimatedButton from '../components/AnimatedButton';
import PropTypes from 'prop-types';
import PageHero from '../components/PageHero';
import SmartImage from '../components/SmartImage';
import { useLanguage } from '../_context/LanguageContext';

/* ── Yardımcı fonksiyonlar ─────────────────────────────────────────────────── */

function getCategories(t) {
  return [
    { id: 'all', name: t('referencesPage.categoryAll') },
    { id: 'tutun', name: t('referencesPage.categoryTobacco') },
    { id: 'otomotiv', name: t('referencesPage.categoryAutomotive') },
    { id: 'beyaz-esya', name: t('referencesPage.categoryWhiteGoods') },
    { id: 'gida-icecek', name: t('referencesPage.categoryFood') },
  ];
}

function getVisibleReferences(groupedData, activeCategory) {
  if (activeCategory === 'all') {
    return Object.values(groupedData).flat();
  }
  return groupedData[activeCategory] ?? [];
}

/* ── ReferenceDetails ──────────────────────────────────────────────────────── */

function ReferenceDetails({ reference, t }) {
  // sections: [{title, items:[]}] (JTI formatı)
  const mergedSectionProjects = reference.sections?.flatMap((s) => s.items) ?? [];
  // projects: string[] (BorgWarner formatı)
  const flatProjects = Array.isArray(reference.projects) ? reference.projects : [];
  const hasDetails = Boolean(mergedSectionProjects.length || flatProjects.length || reference.tableProjects);

  return (
    <div className="space-y-8">
      {mergedSectionProjects.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3">{t('referencesPage.projectList')}</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            {mergedSectionProjects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {flatProjects.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
          <h4 className="text-lg md:text-xl font-black text-slate-900 mb-3">{t('referencesPage.projectDetails')}</h4>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            {flatProjects.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {reference.tableProjects && (
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
      )}

      {!hasDetails && <p className="text-slate-600">{t('referencesPage.noDetails')}</p>}
    </div>
  );
}

/* ── ReferenceModal ────────────────────────────────────────────────────────── */

/**
 * Logo kaynağını çözer.
 *  - http(s)://...  → Strapi'den gelen tam URL, olduğu gibi
 *  - /uploads/...   → Strapi relative path, strapiBase ile birleştirilir
 *  - dosya.svg      → fallback JSON'daki yalın dosya adı, yerel /assets/Logos altından
 */
function resolveLogoSrc(logo, strapiBase) {
  if (!logo) return null;
  if (logo.startsWith('http')) return logo;
  if (logo.startsWith('/')) return `${strapiBase}${logo}`;
  return `/assets/Logos/${logo}`;
}

function ReferenceModal({ selectedReference, onClose, t, strapiBase }) {
  if (!selectedReference) return null;

  // Logo: Strapi'den tam URL (başında / varsa) ya da null
  const logoSrc = resolveLogoSrc(selectedReference.logo, strapiBase);

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
                  {logoSrc ? (
                    <SmartImage
                      src={logoSrc}
                      alt={selectedReference.name}
                      width={170}
                      height={64}
                      className="object-contain w-[170px] h-[64px]"
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
              <AnimatedButton asButton onClick={onClose} className="w-full bg-slate-900">
                {t('referencesPage.closeButton')}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Ana Sayfa Client Component ────────────────────────────────────────────── */

/**
 * Referanslar Sayfası — Client Component
 *
 * Veriler server component (page.jsx) tarafından Strapi'den çekilip
 * `groupedData` prop olarak geçirilir. Modal + kategori filter state'leri burada.
 */
export default function ReferencesPageClient({ pageData, groupedData, locale, strapiBase }) {
  const { t, localizePath } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedReference, setSelectedReference] = useState(null);

  const categories = getCategories(t);
  const visibleReferences = getVisibleReferences(groupedData, activeCategory);
  const heroBreadcrumbs = [t('referencesPage.heroBreadcrumbs.0'), t('referencesPage.heroBreadcrumbs.1')];

  const heroTitle = pageData?.heroTitle || t('referencesPage.heroTitle');
  const heroSubtitle = pageData?.heroSubtitle || t('referencesPage.heroSubtitle');

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
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

          {/* Logo grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {visibleReferences.map((ref) => {
              const logoSrc = resolveLogoSrc(ref.logo, strapiBase);

              return (
                <button
                  key={ref.id}
                  onClick={() => setSelectedReference(ref)}
                  className="w-full aspect-[1.56] relative rounded-md bg-[#edf9fc] border border-[#35e2ff] ring-1 ring-[#35e2ff]/45 hover:ring-[#08d6ff] hover:border-[#08d6ff] hover:shadow-[0_8px_24px_rgba(8,214,255,0.14)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer overflow-hidden group"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-5 md:p-6">
                    {logoSrc ? (
                      <SmartImage
                        src={logoSrc}
                        alt={ref.name}
                        width={210}
                        height={88}
                        className="object-contain transition-transform duration-300 group-hover:scale-105 w-[84%] h-[60%]"
                        fallbackLabel={t('referencesPage.logoUnavailable')}
                      />
                    ) : (
                      <span className="text-center text-slate-800 font-black text-base md:text-lg leading-tight px-2">
                        {ref.name}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      <ReferenceModal
        selectedReference={selectedReference}
        onClose={() => setSelectedReference(null)}
        t={t}
        strapiBase={strapiBase}
      />

      <section className="cta-section py-20 md:py-32 bg-slate-50 px-6">
        <div className="container-wide mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight">{t('referencesPage.ctaTitle')}</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-12">{t('referencesPage.ctaText')}</p>
          <AnimatedButton href={`${localizePath('/iletisim')}#contact-form`}>
            {t('referencesPage.ctaButton')}
          </AnimatedButton>
        </div>
      </section>
    </div>
  );
}

/* ── PropTypes ─────────────────────────────────────────────────────────────── */

ReferenceDetails.propTypes = {
  reference: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

ReferenceModal.propTypes = {
  selectedReference: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  strapiBase: PropTypes.string.isRequired,
};

ReferencesPageClient.propTypes = {
  pageData: PropTypes.object,
  groupedData: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  strapiBase: PropTypes.string.isRequired,
};
