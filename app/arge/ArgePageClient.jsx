'use client';

import React from 'react';
import Link from 'next/link';
import { toLocalizedPath } from '../lib/i18n/routes';
import AnimatedCTALink from '../components/AnimatedCTALink';
import PageHero from '../components/PageHero';

/**
 * AR-GE Sayfası — Client Component
 *
 * Veriler server component (page.jsx) tarafından Strapi'den çekilip
 * prop olarak geçirilir. Bu bileşen yalnızca render sorumluluğunu taşır.
 */
export default function ArgePageClient({ data, locale }) {
  const localizePath = (path) => toLocalizedPath(path, locale);

  const heroBreadcrumbs = [data.breadcrumbHome, data.breadcrumbRD];

  const journeyAreas = [
    data.journeyArea1Title,
    data.journeyArea2Title,
    data.journeyArea3Title,
    data.journeyArea4Title,
  ].filter(Boolean);

  const collaborationFocus = [
    data.focus1,
    data.focus2,
    data.focus3,
    data.focus4,
  ].filter(Boolean);

  const cultureCapabilities = [
    data.capability1,
    data.capability2,
    data.capability3,
    data.capability4,
    data.capability5,
  ].filter(Boolean);

  const innovationQuote = data.cultureApproachQuote ?? '';

  return (
    <div className="bg-white">
      <PageHero
        title={data.pageTitle}
        subtitle={data.pageSubtitle}
        breadcrumbs={heroBreadcrumbs}
      />

      {/* Engineering Section */}
      <section className="pt-6 md:pt-10 pb-20 md:pb-36 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal order-1 lg:order-1">
              <div className="relative min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px]">
                <img
                  src={data.engineeringImage}
                  alt={data.pageTitle}
                  className="absolute inset-0 h-full w-full object-contain object-top p-2 sm:p-2 md:p-3 drop-shadow-[0_28px_56px_rgba(2,84,170,0.26)]"
                />
              </div>
            </div>
            <div className="reveal order-2 lg:order-2 h-full flex flex-col justify-start mt-8 md:mt-14">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm flex flex-col gap-5">
                <p className="text-slate-600 text-lg leading-relaxed">{data.engineeringDesc1}</p>
                <p className="text-slate-600 text-lg leading-relaxed">{data.engineeringDesc2}</p>
                <p className="text-slate-600 text-lg leading-relaxed">{data.engineeringDesc3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-12 md:py-20 px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal space-y-8 order-2 lg:order-1">
              <div className="section-head text-left max-w-3xl mx-0 mb-0">
                <span className="eyebrow">{data.journeyEyebrow}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{data.journeyTitle}</h2>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">{data.journeyLead1}</p>
              <p className="text-slate-600 text-lg leading-relaxed">{data.journeyLead2}</p>

              <ul className="rounded-2xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
                {journeyAreas.map((title) => (
                  <li key={title} className="flex items-center gap-4 px-5 py-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-slate-800 text-base leading-snug">{title}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sky-600 font-semibold text-lg leading-relaxed">{data.journeyOutro}</p>
            </div>

            <div className="reveal relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px] order-1 lg:order-2">
              <img
                src={data.journeyImage}
                alt={data.journeyTitle}
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.12] sm:scale-[1.14] md:scale-[1.16] lg:scale-[1.18]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/20 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Patents Section */}
      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal order-1">
              <div className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[560px]">
                <img
                  src={data.patentsImage}
                  alt={data.patentsTitle}
                  className="absolute inset-0 h-full w-full object-contain object-center p-2 sm:p-4 md:p-6 drop-shadow-[0_20px_42px_rgba(2,84,170,0.2)]"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="reveal order-2 text-left">
              <div className="section-head text-left max-w-3xl mx-0 mb-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  <span className="block text-sky-500">{data.patentsEyebrow}</span>
                  <span className="block text-slate-900">{data.patentsTitle}</span>
                </h2>
              </div>

              <p className="text-sky-600 text-lg leading-relaxed font-semibold mb-5">
                {data.patentsLead}
              </p>

              <div className="mt-2 h-[3px] w-full bg-gradient-to-r from-sky-400 via-sky-200 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-12 md:py-20 px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal space-y-8 order-2 lg:order-1">
              <div className="section-head text-left max-w-3xl mx-0 mb-0">
                <span className="eyebrow">{data.ecosystemEyebrow}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{data.ecosystemTitle}</h2>
              </div>

              <p className="text-slate-600 text-lg leading-relaxed">{data.ecosystemLead1}</p>
              <p className="text-slate-600 text-lg leading-relaxed">{data.ecosystemLead2}</p>

              <ul className="rounded-2xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
                <li className="px-5 py-4 border-b border-slate-100">
                  <p className="font-bold text-xl text-[#0f4d9a] text-balance">{data.focusBoxHeader}</p>
                </li>
                {collaborationFocus.map((item) => (
                  <li key={item} className="flex items-center gap-4 px-5 py-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-slate-800 text-base leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px] order-1 lg:order-2">
              <img
                src={data.ecosystemImage}
                alt={data.ecosystemTitle}
                className="absolute inset-0 h-full w-full object-cover object-center scale-[1.12] sm:scale-[1.14] md:scale-[1.16] lg:scale-[1.18]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/20 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-12 md:py-20 px-6 bg-transparent">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-14 items-start xl:items-stretch">
            <div className="reveal xl:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.16)] min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[600px] xl:min-h-[640px]">
                <img
                  src={data.cultureImage}
                  alt={data.cultureTitle}
                  className="absolute inset-0 h-full w-full object-cover object-center scale-[1.1] sm:scale-[1.12] md:scale-[1.15] lg:scale-[1.18]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/20 via-transparent to-transparent" aria-hidden="true" />
              </div>
            </div>

            <div className="xl:col-span-7 flex flex-col text-left justify-center">
              <div className="reveal space-y-4">
                <span className="eyebrow">{data.cultureEyebrow}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{data.cultureTitle}</h2>
              </div>

              <div className="reveal mt-8 md:mt-10">
                <ul className="rounded-2xl border border-slate-100 bg-white overflow-hidden divide-y divide-slate-100 shadow-sm">
                  <li className="px-5 py-4 border-b border-slate-100">
                    <p className="font-bold text-xl text-[#0f4d9a]">{data.cultureTitle}</p>
                  </li>
                  {cultureCapabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-4 px-5 py-4">
                      <span className="h-2.5 w-2.5 rounded-full bg-sky-500 shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-slate-800 text-base leading-snug">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Approach Section */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6 bg-[linear-gradient(120deg,#02065e_0%,#0a4f9a_58%,#0aa3da_100%)]">
        <img
          src={data.innovationBgImage}
          alt={data.cultureApproachTitle}
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] md:w-[88%] md:top-0 md:translate-y-0 md:h-full md:object-contain opacity-90 md:opacity-65"
          loading="lazy"
        />

        <div className="relative z-10 container max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#31E2FF]">
            {data.cultureApproachTitle}
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-[#22d3ee] text-sm sm:text-base md:text-lg leading-relaxed font-medium">
            {data.cultureApproachDesc}
          </p>

          <div className="mt-8 md:mt-12 w-full max-w-[340px] sm:max-w-3xl md:max-w-4xl mx-auto rounded-full border-2 border-[#31E2FF]/80 bg-[#e0f7fa] px-6 sm:px-12 md:px-16 py-6 md:py-9 flex flex-col items-center justify-center text-center shadow-2xl">
            <div className="w-full flex flex-col items-center justify-center text-center space-y-1">
              {typeof innovationQuote === 'string' && innovationQuote.includes('\n') ? (
                innovationQuote.split('\n').map((line, idx) => (
                  <span
                    key={idx}
                    className="block text-center text-[#0a4f9a] text-lg sm:text-2xl md:text-3xl font-black leading-snug tracking-tight w-full"
                  >
                    {line.trim()}
                  </span>
                ))
              ) : (
                <span className="block text-center text-[#0a4f9a] text-lg sm:text-2xl md:text-3xl font-black leading-snug tracking-tight w-full">
                  {innovationQuote}
                </span>
              )}
            </div>
          </div>

          <h3 className="mt-10 md:mt-12 text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide">
            {data.contactBoxTitle}
          </h3>
          <p className="mt-3 text-[#22d3ee] text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            {data.contactBoxDesc}
          </p>
          <a
            href="mailto:arge@siskon.com.tr"
            className="mt-3 inline-flex text-[#31E2FF] text-lg sm:text-xl md:text-2xl font-bold hover:underline"
          >
            arge@siskon.com.tr
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{data.ctaSectionTitle}</h2>
          <p>{data.ctaSectionDesc}</p>
          <AnimatedCTALink href={`${localizePath('/iletisim')}#contact-form`}>{data.ctaSectionButton}</AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
