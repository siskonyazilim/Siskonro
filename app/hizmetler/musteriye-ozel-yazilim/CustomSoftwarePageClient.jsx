"use client";

import { useState } from "react";
import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";
export default function CustomSoftwarePageClient({ trData, enData, roData }) {
  const { locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [showAllIntegrations, setShowAllIntegrations] = useState(false);
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);
  const serviceLocale = locale === "en" ? "en" : locale === "ro" ? "ro" : "tr";
  const serviceName = getServiceName(
    SERVICE_KEYS.customSoftware,
    serviceLocale,
  );
  const contentKey = `customsoftware-${lang}`;
  const benefits = Array.isArray(pt("benefits")) ? pt("benefits") : [];
  const capabilities = Array.isArray(pt("capabilities")) ? pt("capabilities") : [];
  const integrations = Array.isArray(pt("integrations")) ? pt("integrations") : [];
  const hasMoreBenefits = benefits.length > 3;
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 3);
  const visibleIntegrations = showAllIntegrations
    ? integrations
    : integrations.slice(0, 3);
  const visibleCapabilities = showAllCapabilities
    ? capabilities
    : capabilities.slice(0, 5);
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
      {/* Genel Bak─▒┼ƒ */}{" "}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6">
        {" "}
        <div className="container">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-10 lg:gap-14 items-center">
            {" "}
            <div className="reveal order-2 lg:order-1">
              {" "}
              <div className="flex items-center justify-center lg:justify-start">
                {" "}
                <SmartImage
                  src={pt("heroImage") || "/assets/new/hizmetler/musteriye-ozel-yazilim/musteriye-ozel-yazilim-banner-16-9-zeminsiz.webp"}
                  alt={pt("imageAlt1")}
                  width={1920}
                  height={1080}
                  className="w-full max-w-[520px] sm:max-w-[640px] md:max-w-[860px] h-auto object-contain mx-auto drop-shadow-2xl"
                  style={{ maxHeight: "min(600px, 76vh)" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={90}
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              {" "}
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-9 md:p-11 shadow-sm lg:-mr-12">
                {" "}
                <span className="eyebrow self-start">{pt("service")}</span>{" "}
                <p
                  className="text-slate-600 text-lg md:text-[1.125rem] leading-relaxed text-justify hyphens-auto"
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
      {/* Kazan─▒mlar */}{" "}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
            {" "}
            <span className="eyebrow">{pt("benefitsEyebrow")}</span>{" "}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {pt("benefitsTitle")}
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-12 items-center">
            {" "}
            <div className="reveal flex items-center justify-center lg:justify-start">
              {" "}
              <SmartImage
                src={pt("benefitsImage") || "/assets/new/hizmetler/musteriye-ozel-yazilim/MacbookMockup1.webp"}
                alt={pt("imageAlt2")}
                width={1600}
                height={1000}
                className="w-full max-w-[640px] md:max-w-[760px] h-auto object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 760px"
                quality={85}
              />{" "}
            </div>{" "}
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7 max-w-xl mx-auto lg:mx-0 lg:ml-auto w-full">
              {" "}
              <h3 className="text-3xl md:text-4xl font-bold text-[#0e4ea4] mb-5">
                {pt("benefitsListTitle") || pt("whySiskon")}
              </h3>{" "}
              <div className="space-y-0 divide-y divide-cyan-300/70">
                {" "}
                {visibleBenefits.map((item) => (
                  <div key={item} className="flex items-center gap-4 py-4">
                    {" "}
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400"
                      aria-hidden="true"
                    />{" "}
                    <p className="text-[#0e4ea4] text-[1rem] md:text-[1.125rem] leading-[1.625rem] md:leading-[1.875rem] font-medium">
                      {item}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              {hasMoreBenefits ? (
                <button
                  type="button"
                  onClick={() => setShowAllBenefits((prev) => !prev)}
                  aria-expanded={showAllBenefits}
                  className="mt-2 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
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
              ) : null}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Yetkinlikler */}{" "}
      <section className="relative overflow-hidden bg-[#030923] py-[clamp(3rem,6vw,6rem)] px-6">
        {" "}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(14,116,189,0.58),transparent_34%),radial-gradient(circle_at_88%_76%,rgba(14,165,233,0.42),transparent_34%)]"
          aria-hidden="true"
        />{" "}
        <div className="absolute inset-0 opacity-35" aria-hidden="true">
          {" "}
          <div className="absolute -right-20 top-14 h-56 w-56 rotate-[29deg] border-2 border-sky-400/60" />{" "}
          <div className="absolute left-[42%] top-24 h-px w-72 -rotate-[28deg] bg-sky-400/50" />{" "}
          <div className="absolute bottom-16 left-[43%] h-px w-80 rotate-[30deg] bg-sky-400/40" />{" "}
          <div className="absolute right-[12%] bottom-28 h-px w-96 -rotate-[31deg] bg-sky-400/50" />{" "}
        </div>{" "}
        <div className="container relative">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,460px)_minmax(0,1fr)] items-center gap-10 lg:gap-0">
            {" "}
            <div className="reveal order-1 lg:order-1 relative z-20 lg:translate-x-8 text-center lg:text-left">
              {" "}
              <div className="mb-12">
                {" "}
                <span className="eyebrow">
                  {pt("capabilitiesEyebrow")}
                </span>{" "}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-md mx-auto lg:mx-0">
                  {" "}
                  {pt("capabilitiesTitle")}{" "}
                </h2>{" "}
              </div>{" "}
              <div className="reveal order-2 lg:hidden relative z-10 min-h-[clamp(22rem,78vw,37rem)] mb-8 -mx-6 sm:-mx-8">
                {" "}
                <SmartImage
                  src={pt("capabilitiesImage") || "/assets/new/hizmetler/musteriye-ozel-yazilim/ne-tur-cozumler-sunuyoruz-banner-2-zeminsiz-2-1-1.webp"}
                  alt={pt("imageAlt3")}
                  loading="lazy"
                  className="mx-auto h-auto w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] max-w-none object-contain object-center drop-shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                />{" "}
              </div>{" "}
              <div className="rounded-lg border border-cyan-400/45 bg-sky-950/45 p-7 md:p-9 shadow-2xl shadow-sky-950/40 backdrop-blur-sm">
                {" "}
                <div className="divide-y divide-cyan-400/35">
                  {" "}
                  {visibleCapabilities.map((item) => (
                    <div key={item} className="flex items-center gap-4 py-3.5">
                      {" "}
                      <span
                        className="h-3 w-3 shrink-0 rounded-full border-2 border-cyan-300 bg-cyan-300/20 shadow-[0_0_12px_rgba(103,232,249,0.55)]"
                        aria-hidden="true"
                      />{" "}
                      <p className="text-white font-medium">{item}</p>{" "}
                    </div>
                  ))}{" "}
                </div>{" "}
                <button
                  type="button"
                  onClick={() => setShowAllCapabilities((prev) => !prev)}
                  aria-expanded={showAllCapabilities}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-400/35 pt-4 text-cyan-300 font-semibold text-sm"
                >
                  {" "}
                  <span>
                    {showAllCapabilities ? pt("showLess") : pt("showMore")}
                  </span>{" "}
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-cyan-300 flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllCapabilities ? "rotate-180" : ""}`}
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
                </button>{" "}
              </div>{" "}
            </div>{" "}
            <div className="hidden lg:block reveal order-2 relative z-10 min-h-[clamp(20rem,66vw,46rem)] lg:-ml-10 lg:mt-0">
              {" "}
              <SmartImage
                src={pt("capabilitiesImage") || "/assets/new/hizmetler/musteriye-ozel-yazilim/ne-tur-cozumler-sunuyoruz-banner-2-zeminsiz-2-1-1.webp"}
                alt={pt("imageAlt3")}
                loading="lazy"
                className="mx-auto h-auto w-full max-w-[min(96vw,56rem)] object-contain object-center drop-shadow-[0_24px_56px_rgba(0,0,0,0.30)] lg:absolute lg:left-0 lg:top-1/2 lg:w-[min(112%,72rem)] lg:max-w-none lg:-translate-y-1/2 xl:w-[min(122%,82rem)]"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* ├ûzellikler */}{" "}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-16">
            {" "}
            <span className="eyebrow">{pt("features")}</span>{" "}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {pt("featuresTitle")}
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {" "}
            <div className="reveal flex items-center justify-center lg:justify-start">
              {" "}
              <img
                src={pt("integrationsImage") || "/assets/new/hizmetler/musteriye-ozel-yazilim/musteriyeOzelLogo.svg"}
                alt={pt("imageAlt4")}
                className="w-[min(92vw,38rem)] sm:w-[min(78vw,34rem)] lg:w-[min(100%,38rem)] h-auto object-contain"
                loading="lazy"
              />{" "}
            </div>{" "}
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              {" "}
              <h3 className="text-xl md:text-2xl font-bold text-[#0e4ea4] mb-5">
                {pt("integrationsListTitle") || pt("whatCanBeDone")}
              </h3>{" "}
              <div className="divide-y divide-cyan-300/70">
                {" "}
                {visibleIntegrations.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    {" "}
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400"
                      aria-hidden="true"
                    />{" "}
                    <p className="text-[#0e4ea4] text-[1rem] md:text-[1.125rem] leading-[1.625rem] md:leading-[1.875rem] font-medium">
                      {item}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              <button
                type="button"
                onClick={() => setShowAllIntegrations((prev) => !prev)}
                aria-expanded={showAllIntegrations}
                className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
              >
                {" "}
                <span>
                  {showAllIntegrations ? pt("showLess") : pt("showMore")}
                </span>{" "}
                <span
                  className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllIntegrations ? "rotate-180" : ""}`}
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
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* CTA SECTION */}{" "}
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
