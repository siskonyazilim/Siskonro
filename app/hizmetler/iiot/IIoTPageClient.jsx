"use client";

import { useState } from "react";
import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";
export default function IIoTPageClient({ trData, enData, roData }) {
  const { locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const serviceLocale = locale === "en" ? "en" : locale === "ro" ? "ro" : "tr";
  const serviceName = getServiceName(SERVICE_KEYS.iiot, serviceLocale);
  const contentKey = `iiot-${lang}`;
  const features = Array.isArray(pt("features")) ? pt("features") : [];
  const subSystems = Array.isArray(pt("subSystems")) ? pt("subSystems") : [];
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const visibleFeatures = showAllFeatures ? features : features.slice(0, 5);
  return (
    <div key={contentKey} className="bg-white iiot-subpage">
      {" "}
      <PageHero
        title={pt("title") || serviceName}
        subtitle={pt("subtitle")}
        breadcrumbs={[
          pt("breadcrumbHome"),
          pt("breadcrumbServices"),
          pt("title") || serviceName,
        ]}
      />{" "}
      {/* Genel Bak─▒┼ƒ */}{" "}
      <section className="py-12 md:py-20 px-6 lg:min-h-[748px]">
        {" "}
        <div className="container">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch md:pt-6">
            {" "}
            <div className="reveal order-2 lg:order-1">
              {" "}
              <div className="responsive-media-shell min-h-[220px] sm:min-h-[280px] md:-ml-6 lg:-ml-10">
                {" "}
                <SmartImage
                  src={pt("heroImage") || "/assets/new/hizmetler/iiot/iiot-hizmet-gorsel-2.webp"}
                  alt={pt("imageAlt")}
                  width={1920}
                  height={1080}
                  className="w-full max-w-[520px] sm:max-w-[640px] md:w-[108%] md:max-w-[920px] md:ml-0 h-auto object-contain mx-auto drop-shadow-2xl"
                  style={{ maxHeight: "min(540px, 72vh)" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              {" "}
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                {" "}
                <span className="eyebrow self-start">{pt("service")}</span>{" "}
                <p
                  className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto"
                  lang="tr"
                >
                  {" "}
                  {pt("description")}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="reveal order-3 lg:hidden">
              {" "}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
                {" "}
                <span className="eyebrow self-start">{pt("service")}</span>{" "}
                <p className="text-slate-600 text-lg leading-relaxed">
                  {" "}
                  {pt("description")}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ├ûzellikler */}{" "}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        {" "}
        <div className="container">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {" "}
            <div className="reveal">
              {" "}
              <span className="eyebrow self-start">{pt("benefits")}</span>{" "}
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
                {pt("benefitsTitle")}
              </h2>{" "}
            </div>{" "}
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              {" "}
              <div className="divide-y divide-cyan-300/70">
                {" "}
                {visibleFeatures.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    {" "}
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400"
                      aria-hidden="true"
                    />{" "}
                    <p className="text-[#0e4ea4] text-sm md:text-[0.9375rem] leading-snug font-medium">
                      {item}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              {features.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllFeatures((prev) => !prev)}
                  aria-expanded={showAllFeatures}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  {" "}
                  <span>
                    {showAllFeatures ? pt("showLess") : pt("showMore")}
                  </span>{" "}
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllFeatures ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    {" "}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {" "}
                      <path d="M6 9l6 6 6-6" />{" "}
                    </svg>{" "}
                  </span>{" "}
                </button>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Alt Sistemler - Kart Grid */}{" "}
      <section className="py-12 md:py-20 px-6 bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
            {" "}
            <span className="eyebrow">{pt("subSystemsEyebrow")}</span>{" "}
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-[#000000] leading-[2.625rem] md:leading-[3rem]">
              {" "}
              {pt("subSystemsTitle")}{" "}
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {" "}
            {subSystems.map((system) => (
              <article
                key={system.title}
                className="reveal max-w-[640px] mx-auto rounded-2xl bg-[#f2f8fb] border border-[#dbeaf2] px-4 sm:px-6 md:px-7 py-6 md:py-7 text-center hover:bg-[#ecf5f9] transition-colors duration-300"
              >
                {" "}
                <div className="mb-5 md:mb-6 flex items-center justify-center min-h-[180px] sm:min-h-[210px] md:h-[230px]">
                  {" "}
                  <img
                    src={system.icon}
                    alt={system.title}
                    className="h-auto max-h-[190px] md:max-h-[220px] w-auto max-w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />{" "}
                </div>{" "}
                <h3
                  className="text-[1.35rem] md:text-[1.75rem] font-bold text-[#000000] leading-[1.75rem] md:leading-[2.25rem] mb-3 md:mb-4 !text-center"
                  style={{ textAlignLast: "center" }}
                >
                  {system.title}
                </h3>{" "}
                <p
                  className="text-[#31E2FF] text-[0.95rem] md:text-[1.05rem] font-semibold leading-[1.45rem] md:leading-[1.7rem] mb-4 md:mb-5 !text-center"
                  style={{ textAlignLast: "center" }}
                >
                  {system.spot}
                </p>{" "}
                <p
                  className="text-slate-700 text-sm md:text-base leading-relaxed !text-center"
                  style={{ textAlignLast: "center" }}
                >
                  {system.desc}
                </p>{" "}
              </article>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* CTA SECTION */}{" "}
      <section className="cta-section">
        {" "}
        <div className="container text-center max-w-3xl mx-auto">
          {" "}
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white leading-[2.625rem] md:leading-[3rem] mb-6">
            {pt("ctaTitle")}
          </h2>{" "}
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {" "}
            {pt("ctaDescription")}{" "}
          </p>{" "}
          <AnimatedCTALink
            href={`${localizePath("/iletisim")}#contact-form`}
            className="bg-white text-sky-600 hover:bg-sky-50"
          >
            {pt("ctaButton")}
          </AnimatedCTALink>{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
}
