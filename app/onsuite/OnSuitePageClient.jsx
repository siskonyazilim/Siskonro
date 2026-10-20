'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toLocalizedPath } from '../lib/i18n/routes';
import AnimatedButton from '../components/AnimatedButton';
import { AnimatedCTALink } from '../components/AnimatedCTALink';
import PageHero from '../components/PageHero';
import SmartImage from '../components/SmartImage';
import IconFeatureGrid from '../components/IconFeatureGrid';
import FeatureTokenList from '../components/FeatureTokenList';

/**
 * OnSuite Sayfası — Client Component
 *
 * Veriler server component (page.jsx) tarafından Strapi'den çekilip
 * prop olarak geçirilir. Interaktif state (tab, accordion) bu component'te yönetilir.
 */
export default function OnSuitePageClient({ data, locale }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllModules, setShowAllModules] = useState(false);
  const [showAllGains, setShowAllGains] = useState(false);
  const detailBoxRef = React.useRef(null);

  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const contentKey = `onsuite-${locale}`;

  const localizePath = (path) => toLocalizedPath(path, locale);

  const modules = Array.isArray(data.modules) ? data.modules : [];
  const gainItems = Array.isArray(data.gainItems) ? data.gainItems : [];
  const architectureItems = Array.isArray(data.architectureItems) ? data.architectureItems : [];
  const technicalCards = Array.isArray(data.technicalCards) ? data.technicalCards : [];

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        breadcrumbs={[data.breadcrumbHome, data.breadcrumbProducts, data.breadcrumbOnSuite]}
        logoSrc={data.logo || '/assets/new/common/onsuite-logo.svg'}
      />

      {/* Intro Section */}
      <section className="pt-10 pb-20 md:pt-16 md:pb-32 px-6">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 md:gap-12 items-start">
            <div className="hidden xl:block reveal order-2 xl:order-1">
              <div className="responsive-media-shell xl:mt-4">
                <SmartImage
                  src={data.productImage}
                  alt={data.productImageAlt || 'OnSuite'}
                  width={1920}
                  height={1080}
                  className="w-full xl:w-[116%] max-w-none h-auto object-contain xl:-ml-10 xl:-translate-y-20 drop-shadow-2xl"
                  style={{ maxHeight: 'none' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>

            <div className="reveal space-y-6 order-1 xl:order-2 h-full flex flex-col justify-start xl:pt-12">
              <SmartImage
                src={data.productImage}
                alt={data.productImageAlt || 'OnSuite'}
                width={1920}
                height={1080}
                className="w-full max-w-none h-auto object-contain drop-shadow-2xl xl:hidden"
                style={{ maxHeight: 'none' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 96vw"
                priority
                quality={75}
              />
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{data.productBadge}</span>
                <p className={`text-slate-600 text-lg leading-relaxed ${isRo || isEn ? '' : 'text-justify hyphens-auto'}`} lang={isRo ? 'ro' : isEn ? 'en' : 'tr'}>
                  {data.productDetailDesc}
                </p>
              </div>
              <div className="lg:hidden flex flex-col gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
                <span className="eyebrow self-start">{data.productBadge}</span>
                <p className={`text-slate-600 text-base leading-relaxed ${isRo || isEn ? '' : 'text-justify hyphens-auto'}`} lang={isRo ? 'ro' : isEn ? 'en' : 'tr'}>
                  {data.productDetailDesc}
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 justify-center xl:justify-start">
                <AnimatedButton
                  href={isRo ? 'https://www.onsuite.com.tr/ro/main/' : isEn ? 'https://www.onsuite.com.tr/main/' : 'https://www.onsuite.com.tr/'}
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!rounded-xl !px-8 !py-4"
                >
                  onsuite.com.tr
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-12 md:py-20 px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-12 md:mb-16">
            <div className="section-head max-w-3xl">
              <span className="eyebrow">{data.modulesEyebrow}</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                {data.modulesTitle}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {data.modulesDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="xl:col-span-4 w-full">
              <div className="flex flex-col gap-3">
                {modules.slice(0, showAllModules ? modules.length : 7).map((m, idx) => (
                  <button
                    key={m.name}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full min-h-[76px] text-left p-4 rounded-2xl transition-all duration-300 border flex items-center gap-4 group ${activeTab === idx
                      ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/10'
                      : 'bg-white border-slate-200 hover:border-sky-200 hover:shadow-md'
                      }`}
                  >
                    <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all ${activeTab === idx ? 'bg-sky-500 shadow-lg shadow-sky-500/20' : 'bg-slate-100 group-hover:bg-sky-55'
                      }`}>
                      <img
                        src={m.icon}
                        alt={`OnSuite ${m.name}`}
                        className={`w-6 h-6 transition-all ${activeTab === idx ? 'brightness-0 invert' : 'opacity-70 group-hover:opacity-100'}`}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <span className={`text-sm font-black tracking-wide transition-colors ${activeTab === idx ? 'text-white' : 'text-slate-900'}`}>
                        {m.name}
                      </span>
                      <span className={`text-xs font-bold transition-colors ${activeTab === idx ? 'text-sky-200' : 'text-slate-500'}`}>
                        {m.sub}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-center xl:justify-center">
                <button
                  onClick={() => setShowAllModules(!showAllModules)}
                  className="btn-outline btn-no-arrow group !rounded-2xl !px-10 !py-3 w-full xl:w-auto"
                >
                  {!showAllModules ? (
                    <>
                      {data.viewAllModules}
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      {data.showLessModules}
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            {modules.length > 0 && (
              <div ref={detailBoxRef} className="xl:col-span-8 w-full relative">
                <div className="bg-white rounded-3xl p-6 md:p-10 xl:p-12 border border-slate-200 shadow-2xl shadow-slate-200/70 relative min-h-[520px] xl:h-full flex flex-col justify-start">
                  <div className="absolute inset-x-0 top-0 h-1 bg-sky-500 rounded-t-3xl"></div>

                  <div className="relative z-10 space-y-8 xl:sticky xl:top-32">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <span className="h-[2px] w-10 bg-sky-500" aria-hidden="true"></span>
                        <span className="text-xs font-black text-sky-600 tracking-[0.12em]">
                          {data.moduleOverviewLabel}
                        </span>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
                        <img
                          src={modules[activeTab]?.icon}
                          alt={`OnSuite ${modules[activeTab]?.name}`}
                          className="w-9 h-9"
                        />
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight">
                      {modules[activeTab]?.name} <br />
                      <span className="text-sky-500">{modules[activeTab]?.sub}</span>
                    </h3>

                    <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                      {modules[activeTab]?.desc}
                    </p>

                    <FeatureTokenList
                      items={modules[activeTab]?.features || []}
                      variant="card"
                      className="pt-2"
                    />

                    <div className="pt-4">
                      <AnimatedButton
                        href={modules[activeTab]?.link}
                        external
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!rounded-2xl !px-8 !py-4"
                      >
                        {data.exploreSolutionButton}
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gains Section */}
      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-12">
            <span className="eyebrow">{data.gainsEyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {data.gainsTitleMain}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal">
              <SmartImage
                src={data.desktopImage}
                alt={data.desktopImageAlt || 'OnSuite Desktop'}
                width={1280}
                height={800}
                className="w-full h-auto drop-shadow-[0_24px_50px_rgba(15,23,42,0.18)]"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>

            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7 max-w-xl mx-auto lg:mx-0 lg:ml-auto w-full">
              <div className="space-y-0 divide-y divide-cyan-300/70">
                {(showAllGains ? gainItems : gainItems.slice(0, 4)).map((item) => (
                  <div key={item.title} className="flex items-center gap-4 py-4">
                    <div className="w-3 h-3 rounded-full bg-[#52D3EC] shrink-0 xl:mr-2"></div>
                    <p className="text-[#0e4ea4] text-[1rem] md:text-[1.125rem] leading-[1.625rem] md:leading-[1.875rem] font-medium min-w-0 flex-1">{item.title}</p>
                  </div>
                ))}
              </div>

              {gainItems.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllGains((prev) => !prev)}
                  aria-expanded={showAllGains}
                  className="mt-2 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  <span>{showAllGains ? data.showLessGains : data.viewAllGains}</span>
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllGains ? 'rotate-180' : ''}`}
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

      {/* Architecture Section */}
      <section className="py-12 md:py-24 px-6 bg-slate-50/50 border-y border-slate-200 overflow-hidden">
        <div className="container">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-10 md:mb-14">
            <span className="eyebrow">{data.architectureEyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {data.architectureTitleMain}
            </h2>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-7xl mx-auto">
            {architectureItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-center rounded-[14px] border border-[#a6d3df] bg-gradient-to-b from-[#d6edf3] to-[#c5e2ea] px-4 py-4 md:px-5 md:py-5 min-h-[90px] md:min-h-[100px] shadow-[0_4px_14px_rgba(9,52,109,0.07)] hover:shadow-[0_8px_22px_rgba(9,52,109,0.13)] transition-all duration-300"
              >
                <span className="font-bold text-[1rem] leading-snug text-[#0a4a7a] text-center mb-1">{item.title}</span>
                <span className="text-sm leading-snug text-[#0a4a7a] opacity-80 text-center">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Section */}
      <section className="py-12 md:py-20 px-6 bg-[#F7FCFF] border-b border-sky-100">
        <div className="container">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-12">
            <span className="eyebrow">{data.technicalEyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">
              {data.technicalTitleMain}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {technicalCards.map((card) => (
              <article key={card.title} className="group w-full sm:w-[calc(50%-0.375rem)] xl:w-[calc(33.333%-0.667rem)] max-w-[395px] min-h-[332px] md:min-h-[352px] rounded-2xl overflow-hidden border border-[#89E4F4] bg-gradient-to-b from-[#FFFFFF] to-[#E6F8FB] shadow-[0_8px_22px_rgba(10,61,128,0.08)] transition-all duration-300 flex flex-col">
                <div className="h-[176px] md:h-[190px] bg-[#F5FAFC] flex items-center justify-center p-4 md:p-5">
                  <div className="relative h-[132px] md:h-[142px] w-[84%]">
                    <SmartImage
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 200px, 220px"
                      quality={85}
                    />
                  </div>
                </div>
                <div
                  className="border-t border-[#89E4F4] bg-gradient-to-b from-[#FFFFFF] to-[#E6F8FB] px-4 md:px-5 py-5 md:py-6 flex flex-col flex-1 justify-center gap-3"
                  style={{ textAlign: 'center' }}
                >
                  <h3
                    className="text-[clamp(1.04rem,1.18vw,1.28rem)] font-black text-[#0A3D80] leading-tight"
                    style={{ textAlign: 'center', textAlignLast: 'center' }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-[0.9rem] md:text-[0.95rem] text-[#1A5FB4] leading-[1.5] font-medium"
                    style={{ textAlign: 'center', textAlignLast: 'center', hyphens: 'none' }}
                  >
                    {card.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>{data.ctaTitleMain}</h2>
          <p>{data.ctaDescMain}</p>
          <AnimatedCTALink href={`${localizePath('/iletisim')}#contact-form`}>{data.ctaButtonMain}</AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
