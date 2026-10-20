"use client";

import { useState } from "react";
import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";

export default function VeloticPageClient({ trData, enData, roData }) {
  const { t, locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const isEn = locale === "en";
  const isRo = locale === "ro";
  const serviceName = getServiceName(
    SERVICE_KEYS.velotic,
    isRo ? "ro" : isEn ? "en" : "tr",
  );
  const contentKey = `velotic-${lang}`;
  const benefits = Array.isArray(pt("benefits")) ? pt("benefits") : [];
  const solutions = Array.isArray(pt("solutions")) ? pt("solutions") : [];
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const showMoreLabel = pt("showMore");
  const showLessLabel = pt("showLess");
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 5);

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={pt("title") || serviceName}
        subtitle={pt("serviceSectionTitle")}
        breadcrumbs={[
          pt("breadcrumbHome"),
          pt("breadcrumbServices"),
          pt("title") || serviceName,
        ]}
      />
      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="reveal lg:hidden space-y-6">
            <div className="responsive-media-shell">
              <SmartImage
                src={pt("heroImage") || "/assets/new/hizmetler/velotic/SiskonVelotic.webp"}
                alt={pt("imageAlt")}
                width={1920}
                height={1080}
                className="w-full max-w-[92%] sm:max-w-[88%] h-auto object-contain mx-auto"
                style={{ maxHeight: "min(520px, 66vh)" }}
                sizes="100vw"
                priority
                quality={75}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
              <span className="eyebrow self-start">
                {pt("serviceLabel")}
              </span>
              <p className="text-slate-600 text-lg leading-relaxed">
                {pt("serviceSectionDesc")}
              </p>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell">
                <SmartImage
                  src={pt("heroImage") || "/assets/new/hizmetler/velotic/SiskonVelotic.webp"}
                  alt={pt("imageAlt")}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[98%] md:max-w-[780px] lg:max-w-[820px] h-auto object-contain rounded-2xl drop-shadow-2xl mx-auto"
                  style={{ maxHeight: "min(520px, 66vh)" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">
                  {pt("serviceLabel")}
                </span>
                <p
                  className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto"
                  lang="tr"
                >
                  {pt("serviceSectionDesc")}
                </p>
              </div>
            </div>
            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <p className="text-slate-600 text-lg leading-relaxed">
                  {pt("serviceSectionDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="eyebrow self-start">
                {pt("benefitsEyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
                {pt("benefitsTitle")}
              </h2>
            </div>
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              <div className="divide-y divide-cyan-300/70">
                {visibleBenefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400"
                      aria-hidden="true"
                    />
                    <p className="text-[#0e4ea4] text-sm md:text-[0.9375rem] leading-snug font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              {benefits.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllBenefits((prev) => !prev)}
                  aria-expanded={showAllBenefits}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  <span>
                    {showAllBenefits ? showLessLabel : showMoreLabel}
                  </span>
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllBenefits ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="md:hidden space-y-8">
            <div className="reveal">
              <SmartImage
                src={pt("solutionsImage") || "/assets/new/hizmetler/velotic/SiskonVeloticCamera.webp"}
                alt={pt("imageAlt") || ""}
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="section-head reveal text-center max-w-3xl mx-auto mb-2">
              <span className="eyebrow">{pt("solutionsEyebrow")}</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-0">
                {pt("solutionsTitle")}
              </h2>
            </div>
            <div className="reveal px-0 py-0">
              <ul className="divide-y divide-slate-200">
                {solutions.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full border-2 border-sky-500"
                      aria-hidden="true"
                    />
                    <span className="text-slate-700 text-lg font-semibold leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="section-head reveal text-left max-w-3xl mx-0 mb-10">
                <span className="eyebrow">{pt("solutionsEyebrow")}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-0">
                  {pt("solutionsTitle")}
                </h2>
              </div>
              <div className="px-0 py-0">
                <ul className="divide-y divide-slate-200">
                  {solutions.map((item) => (
                    <li key={item} className="flex items-center gap-4 py-4">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full border-2 border-sky-500"
                        aria-hidden="true"
                      />
                      <span className="text-slate-700 text-lg font-semibold leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-5 reveal">
              <div>
                <SmartImage
                  src={pt("solutionsImage") || "/assets/new/hizmetler/velotic/SiskonVeloticCamera.webp"}
                  alt={pt("imageAlt") || ""}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-2xl md:rounded-3xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {pt("ctaTitle")}
          </h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {pt("ctaDescription")}
          </p>
          <AnimatedCTALink
            href={`${localizePath("/iletisim")}#contact-form`}
            className="bg-white text-sky-600 hover:bg-sky-50"
          >
            {pt("ctaButton")}
          </AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
