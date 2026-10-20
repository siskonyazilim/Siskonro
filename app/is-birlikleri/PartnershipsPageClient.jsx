'use client';

import { useState } from 'react';
import AnimatedCTALink from '../components/AnimatedCTALink';
import PageHero from '../components/PageHero';
import { useLanguage } from '../_context/LanguageContext';
import { usePageLocale } from '../lib/i18n/usePageLocale';
import trLocale from '../../messages/partnershipsPage/tr.json';
import enLocale from '../../messages/partnershipsPage/en.json';
import roLocale from '../../messages/partnershipsPage/ro.json';

/**
 * İş Birlikleri Sayfası — Client Component
 *
 * Strapi'den gelen `partners` array'i prop olarak alınır.
 * Expand/collapse state burada tutulur.
 */
export default function PartnershipsPageClient({ pageData, partners }) {
  const { localizePath } = useLanguage();
  const pt = usePageLocale(trLocale, enLocale, roLocale);
  const [expandedCards, setExpandedCards] = useState({});

  const heroBreadcrumbs = [pt('breadcrumbHome'), pt('breadcrumbPartnerships')];
  const heroTitle = pageData?.heroTitle || pt('pageTitle');
  const heroSubtitle = pageData?.heroSubtitle || pt('pageSubtitle');

  const toggleCard = (idx) => {
    setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="bg-white">
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={heroBreadcrumbs}
      />

      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            <span className="eyebrow">{pt('ecosystemEyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{pt('ecosystemTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-7">
            {Array.isArray(partners) && partners.map((p, idx) => {
              const isLast = idx === partners.length - 1;
              const needsVisualBoost = p.name === 'Ignition' || p.name === 'Faradai';
              const isExpanded = !!expandedCards[idx];
              return (
                <article
                  key={`${p.year}-${p.name}`}
                  className={`group reveal rounded-md border border-[#35e2ff] ring-1 ring-[#35e2ff]/45 bg-[#edf9fc] overflow-hidden transition-all duration-300 hover:ring-[#08d6ff] hover:border-[#08d6ff] hover:shadow-[0_8px_24px_rgba(8,214,255,0.14)] hover:-translate-y-0.5 ${
                    isLast ? 'sm:col-span-2 xl:col-span-4 xl:max-w-[300px] xl:mx-auto' : ''
                  }`}
                >
                  {/* Logo */}
                  <div className="h-44 md:h-48 px-8 flex items-center justify-center bg-[#eaf6fb] border-b border-[#35e2ff]/45">
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={`${p.name} logo`}
                        className={`object-contain filter grayscale brightness-0 contrast-[2.6] saturate-0 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100 ${
                          needsVisualBoost
                            ? 'h-28 md:h-32 w-auto max-w-[240px] md:max-w-[260px]'
                            : 'h-20 md:h-24 w-[250px] md:w-[280px]'
                        }`}
                        loading="lazy"
                      />
                    ) : (
                      <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none tracking-tight">{p.name}</h3>
                    )}
                  </div>

                  {/* Year + Role */}
                  <button
                    type="button"
                    onClick={() => toggleCard(idx)}
                    className="w-full px-5 md:px-6 py-5 md:py-6 flex items-center justify-between cursor-pointer focus:outline-none text-left"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="inline-block bg-sky-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-1.5">{p.year}</p>
                      <p className="text-[#0a4da0] text-sm md:text-base font-bold leading-snug text-left tracking-normal">{p.role}</p>
                    </div>
                    <span
                      className="w-6 h-6 rounded-full bg-sky-100 border border-sky-300 grid place-items-center shrink-0 ml-1 transition-transform duration-300"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <svg className="w-3.5 h-3.5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  {/* Collapsible details */}
                  <div
                    className="transition-[max-height,opacity] duration-400 ease-in-out overflow-hidden"
                    style={{ maxHeight: isExpanded ? '300px' : '0px', opacity: isExpanded ? 1 : 0 }}
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-2.5 text-xs md:text-sm text-left">
                      <p className="text-slate-700 leading-snug text-left tracking-normal">
                        <span className="font-bold text-sky-600">{pt('workingArea')}</span>{' '}
                        <span>{p.workArea}</span>
                      </p>
                      <p className="text-slate-700 leading-snug text-left tracking-normal">
                        <span className="font-bold text-sky-600">{pt('technologyArea')}</span>{' '}
                        <span>{p.techArea}</span>
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
          <h2>{pt('ctaSectionTitle')}</h2>
          <p>{pt('ctaSectionDesc')}</p>
          <AnimatedCTALink href={`${localizePath('/iletisim')}#contact-form`}>{pt('ctaSectionButton')}</AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
