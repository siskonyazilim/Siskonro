"use client";

import { useState } from "react";
import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";

export default function RobotSolutionsClient({ trData, enData, roData }) {
  const { locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const serviceName = getServiceName(SERVICE_KEYS.robotSolutions, locale);
  const contentKey = `robot-${lang}`;

  const qualities = Array.isArray(pt("qualities")) ? pt("qualities") : [];
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const visibleFeatures = showAllFeatures ? qualities : qualities.slice(0, 5);

  const heroImg = pt("heroImage") || "/assets/new/hizmetler/robot-cozumleri/RobotCozumleri.webp";
  const qualificationsImg = pt("qualificationsImage") || "/assets/new/hizmetler/robot-cozumleri/RobotCozunleri1.webp";

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={pt("title") || serviceName}
        subtitle={pt("subtitle")}
        breadcrumbs={[
          pt("breadcrumbHome"),
          pt("breadcrumbServices"),
          pt("title") || serviceName,
        ]}
      />

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell md:-ml-6 lg:-ml-10">
                <SmartImage
                  src={heroImg}
                  alt={pt("heroAlt") || serviceName}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[106%] md:max-w-[900px] md:-ml-4 h-auto object-contain drop-shadow-2xl"
                  style={{ maxHeight: "min(680px, 82vh)" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{pt("serviceLabel")}</span>
                <p
                  className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto"
                  lang="tr"
                >
                  {pt("overviewText")}
                </p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
                <span className="eyebrow self-start">{pt("serviceLabel")}</span>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {pt("overviewText")}
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
              <span className="eyebrow self-start">{pt("benefitsLabel")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
                {pt("benefitsTitle")}
              </h2>
            </div>
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              <div className="divide-y divide-cyan-300/70">
                {visibleFeatures.map((item) => (
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
              {Array.isArray(qualities) &&
                qualities.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAllFeatures((prev) => !prev)}
                    aria-expanded={showAllFeatures}
                    className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                  >
                    <span>
                      {showAllFeatures ? pt("showLess") : pt("showMore")}
                    </span>
                    <span
                      className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllFeatures ? "rotate-180" : ""}`}
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

      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="container">
          <div className="lg:hidden">
            <div className="section-head reveal text-center max-w-3xl mx-auto mb-10">
              <span className="eyebrow">{pt("technologyLabel")}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-0">
                {pt("technologyTitle")}
              </h2>
            </div>

            <div className="reveal max-w-5xl mx-auto">
              <div className="mb-8 md:mb-10">
                <SmartImage
                  src={qualificationsImg}
                  alt={pt("heroAlt") || serviceName}
                  width={1920}
                  height={1080}
                  className="responsive-contain-image rounded-2xl md:rounded-3xl w-full h-auto object-contain"
                  style={{ maxHeight: "min(680px, 82vh)" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  quality={75}
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 md:px-7 md:py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
                {pt("qualificationsListTitle") && (
                  <h3 className="text-lg font-bold text-slate-800 pb-3 border-b border-slate-200">
                    {pt("qualificationsListTitle")}
                  </h3>
                )}
                <ul className="divide-y divide-slate-200">
                  {Array.isArray(qualities) &&
                    qualities.map((item) => (
                      <li
                        key={item}
                        className="py-4 md:py-4.5 flex items-center gap-3"
                      >
                        <span
                          className="w-3.5 h-3.5 shrink-0 rounded-full bg-sky-500"
                          aria-hidden="true"
                        />
                        <span className="text-slate-700 font-semibold text-[1rem] md:text-[1.125rem] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="section-head reveal text-left max-w-3xl mx-0 mb-8">
                <span className="eyebrow">{pt("technologyLabel")}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-0">
                  {pt("technologyTitle")}
                </h2>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 md:px-7 md:py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] flex flex-col justify-center">
                {pt("qualificationsListTitle") && (
                  <h3 className="text-lg font-bold text-slate-800 pb-3 border-b border-slate-200">
                    {pt("qualificationsListTitle")}
                  </h3>
                )}
                <ul className="divide-y divide-slate-200">
                  {Array.isArray(qualities) &&
                    qualities.map((item) => (
                      <li
                        key={item}
                        className="py-4 md:py-4.5 flex items-center gap-3"
                      >
                        <span
                          className="w-3.5 h-3.5 shrink-0 rounded-full bg-sky-500"
                          aria-hidden="true"
                        />
                        <span className="text-slate-700 font-semibold text-[1.05rem] leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 reveal flex items-center justify-center pt-8 md:pt-14">
              <div className="relative flex items-center justify-center w-full">
                <SmartImage
                  src={qualificationsImg}
                  alt={pt("heroAlt") || serviceName}
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

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {pt("ctaTitle")}
          </h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {pt("ctaText")}
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
