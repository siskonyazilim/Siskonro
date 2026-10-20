"use client";

import { useState } from "react";
import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";
export default function VisionPageClient({ trData, enData, roData }) {
  const { locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const serviceLocale = locale === "en" ? "en" : locale === "ro" ? "ro" : "tr";
  const serviceName = getServiceName(SERVICE_KEYS.machineVision, serviceLocale);
  const contentKey = `vision-${lang}`;
  const benefits = Array.isArray(pt("benefits")) ? pt("benefits") : [];
  const capabilities = Array.isArray(pt("capabilities")) ? pt("capabilities") : [];
  const moreImages = Array.isArray(pt("moreImages")) ? pt("moreImages") : [];
  const heroImg = pt("heroImage") || "/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp";
  const moreImg0 = moreImages[0] || "/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeVarYokKamera.webp";
  const moreImg1 = moreImages[1] || "/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeCamera.webp";
  const moreImg2 = moreImages[2] || "/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeBarcode.webp";
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 4);
  return (
    <div key={contentKey} className="bg-white">
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
      <section className="py-12 md:py-20 px-6">
        {" "}
        <div className="container">
          {" "}
          <div className="md:hidden reveal space-y-5">
            {" "}
            <div className="responsive-media-shell">
              {" "}
              <SmartImage
                src={heroImg}
                alt={pt("imageAlt")}
                width={1920}
                height={1080}
                className="w-full max-w-[92%] h-auto object-contain rounded-2xl mx-auto drop-shadow-2xl"
                style={{ maxHeight: "min(520px, 68vh)" }}
                sizes="100vw"
                priority
                quality={75}
              />{" "}
            </div>{" "}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
              {" "}
              <span className="eyebrow self-start">{pt("service")}</span>{" "}
              <p className="text-slate-600 text-lg leading-relaxed">
                {" "}
                {pt("description")}{" "}
              </p>{" "}
            </div>{" "}
            <div className="space-y-4 pt-1">
              {" "}
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                {" "}
                <SmartImage
                  src={moreImg0}
                  alt={pt("imageAlt2")}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="100vw"
                  quality={75}
                />{" "}
              </div>{" "}
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                {" "}
                <SmartImage
                  src={moreImg1}
                  alt={pt("imageAlt3")}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="100vw"
                  quality={75}
                />{" "}
              </div>{" "}
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                {" "}
                <SmartImage
                  src={moreImg2}
                  alt={pt("imageAlt4")}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="100vw"
                  quality={75}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            {" "}
            <div className="reveal order-2 lg:order-1">
              {" "}
              <div className="responsive-media-shell md:-ml-6 lg:-ml-10">
                {" "}
                <SmartImage
                  src={heroImg}
                  alt={pt("imageAlt")}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[100%] md:max-w-[860px] md:ml-0 rounded-2xl object-contain drop-shadow-2xl"
                  style={{ maxHeight: "min(600px, 76vh)" }}
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
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                {" "}
                <p className="text-slate-600 text-lg leading-relaxed">
                  {" "}
                  {pt("description")}{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="relative py-12 md:py-20 px-6 bg-slate-50">
        {" "}
        <div className="hidden md:block absolute inset-x-0 top-0 -translate-y-[26%] z-10 pointer-events-none">
          {" "}
          <div className="container">
            {" "}
            <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 items-center">
              {" "}
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                {" "}
                <SmartImage
                  src={moreImg0}
                  alt={pt("imageAlt2")}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />{" "}
              </div>{" "}
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                {" "}
                <SmartImage
                  src={moreImg1}
                  alt={pt("imageAlt3")}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />{" "}
              </div>{" "}
              <div className="rounded-2xl overflow-hidden aspect-[16/9]">
                {" "}
                <SmartImage
                  src={moreImg2}
                  alt={pt("imageAlt4")}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="container pt-8 md:pt-36">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {" "}
            <div className="reveal">
              {" "}
              <span className="eyebrow self-start">
                {pt("benefitsEyebrow")}
              </span>{" "}
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
                {pt("benefitsTitle")}
              </h2>{" "}
            </div>{" "}
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              {" "}
              <div className="divide-y divide-cyan-300/70">
                {" "}
                {visibleBenefits.map((item) => (
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
              {benefits.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllBenefits((prev) => !prev)}
                  aria-expanded={showAllBenefits}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  {" "}
                  <span>
                    {showAllBenefits ? pt("showLess") : pt("showMore")}
                  </span>{" "}
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllBenefits ? "rotate-180" : ""}`}
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
      <section className="py-20 md:py-24 px-6">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-10 md:mb-14">
            {" "}
            <span className="eyebrow"> {pt("capabilitiesEyebrow")} </span>{" "}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
              {" "}
              {pt("capabilitiesTitle")}{" "}
            </h2>{" "}
          </div>{" "}
          <div className="reveal grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {" "}
            {capabilities.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center rounded-[14px] border border-[#a6d3df] bg-gradient-to-b from-[#d6edf3] to-[#c5e2ea] px-4 py-4 md:px-5 md:py-5 min-h-[72px] md:min-h-[84px] shadow-[0_4px_14px_rgba(9,52,109,0.07)] hover:shadow-[0_8px_22px_rgba(9,52,109,0.13)] transition-all duration-300"
              >
                {" "}
                <span className="font-bold text-sm md:text-base leading-snug text-[#0a4a7a] text-center">
                  {item}
                </span>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="cta-section">
        {" "}
        <div className="container text-center max-w-3xl mx-auto">
          {" "}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
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
