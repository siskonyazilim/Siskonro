"use client";

import { useState } from "react";
import AnimatedButton from "../../components/AnimatedButton";
import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";
export default function TraceabilityPageClient({ trData, enData, roData }) {
  const { locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const isEn = locale === "en";
  const isRo = locale === "ro";
  const serviceName = getServiceName(
    SERVICE_KEYS.traceability,
    isRo ? "ro" : isEn ? "en" : "tr",
  );
  const contentKey = `traceability-${lang}`;
  const features = Array.isArray(pt("features")) ? pt("features") : [];
  const technicalFeatures = Array.isArray(pt("technicalFeatures")) ? pt("technicalFeatures") : [];
  const sectorDetailCards = pt("sectorDetailCards");
  const hasMoreBenefits = Array.isArray(features) && features.length > 3;
  const visibleBenefits = Array.isArray(features)
    ? showAllBenefits
      ? features
      : features.slice(0, 3)
    : [];
  const showMoreLabel = pt("showMore");
  const showLessLabel = pt("showLess");
  const [showAllTechnicalFeatures, setShowAllTechnicalFeatures] =
    useState(false);
  const visibleTechnicalFeatures = Array.isArray(technicalFeatures)
    ? showAllTechnicalFeatures
      ? technicalFeatures
      : technicalFeatures.slice(0, 5)
    : [];
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
      <section className="py-12 md:py-20 px-6">
        {" "}
        <div className="container">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            {" "}
            <div className="reveal order-2 lg:order-1">
              {" "}
              <div className="responsive-media-shell md:-ml-6 lg:-ml-10">
                {" "}
                <SmartImage
                  src={pt("heroImage") || "/assets/new/hizmetler/izlenebilirlik-cozumleri/siskon-1-3-izlenebilirlik-cozumleri-16-9-yatay-beyaz-illustrasyon-camera-2.webp"}
                  alt={pt("title")}
                  width={1920}
                  height={1080}
                  className="w-full max-w-[440px] sm:max-w-[540px] md:w-[96%] md:max-w-[760px] md:ml-0 h-auto object-contain mx-auto drop-shadow-2xl"
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
      {/* Nitelikler */}{" "}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        {" "}
        <div className="container">
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {" "}
            <div className="reveal">
              {" "}
              <span className="eyebrow self-start">
                {pt("qualifications")}
              </span>{" "}
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">
                {pt("qualificationsTitle")}
              </h2>{" "}
            </div>{" "}
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              {" "}
              <div className="divide-y divide-cyan-300/70">
                {" "}
                {visibleTechnicalFeatures.map((item) => (
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
              {Array.isArray(technicalFeatures) &&
                technicalFeatures.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTechnicalFeatures((prev) => !prev)}
                    aria-expanded={showAllTechnicalFeatures}
                    className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                  >
                    {" "}
                    <span>
                      {showAllTechnicalFeatures ? showLessLabel : showMoreLabel}
                    </span>{" "}
                    <span
                      className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllTechnicalFeatures ? "rotate-180" : ""}`}
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
      {/* Kazan─▒mlar */}{" "}
      <section className="py-12 md:py-20 px-6 bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="reveal lg:hidden max-w-4xl mx-auto text-center">
            {" "}
            <span className="eyebrow">{pt("benefits")}</span>{" "}
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {" "}
              {pt("benefitsTitle")}{" "}
            </h2>{" "}
            <p className="mt-5 text-sky-800 text-xl md:text-2xl font-semibold leading-tight">
              {" "}
              {pt("benefitsDescription")}{" "}
            </p>{" "}
            <div className="mt-10 flex items-center justify-center">
              {" "}
              <SmartImage
                src={pt("benefitsImage") || "/assets/new/hizmetler/izlenebilirlik-cozumleri/siskon-1-3-izlenebilirlik-cozumleri-1-1-kare-camera-135x145x-150-2.webp"}
                alt={pt("title")}
                width={1500}
                height={1500}
                className="w-full max-w-[760px] h-auto object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.2)]"
                style={{ maxHeight: "min(700px, 80vh)" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 760px"
                quality={85}
              />{" "}
            </div>{" "}
            <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 md:p-8 text-left">
              {" "}
              <ul className="divide-y divide-slate-200">
                {" "}
                {visibleBenefits.map((feature) => (
                  <li
                    key={feature}
                    className="py-4 flex items-center gap-3 first:pt-2 last:pb-2"
                  >
                    {" "}
                    <span
                      className="w-3 h-3 rounded-full bg-sky-500"
                      aria-hidden="true"
                    />{" "}
                    <span className="text-slate-700 font-semibold text-lg">
                      {feature}
                    </span>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </div>{" "}
            {hasMoreBenefits ? (
              <button
                type="button"
                onClick={() => setShowAllBenefits((prev) => !prev)}
                aria-expanded={showAllBenefits}
                className="mx-auto mt-2 flex items-center justify-center gap-2 rounded-md bg-[#0388d1] px-5 py-2 text-white font-semibold"
              >
                {" "}
                <span>
                  {showAllBenefits ? showLessLabel : showMoreLabel}
                </span>{" "}
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform ${showAllBenefits ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {" "}
                  <path d="M6 9l6 6 6-6" />{" "}
                </svg>{" "}
              </button>
            ) : null}{" "}
            <div className="pt-6">
              {" "}
              <AnimatedButton
                href={`${localizePath("/iletisim")}#contact-form`}
              >
                {pt("ctaButton")}
              </AnimatedButton>{" "}
            </div>{" "}
          </div>{" "}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-14 items-center">
            {" "}
            <div className="reveal space-y-6">
              {" "}
              <span className="eyebrow">{pt("benefits")}</span>{" "}
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {" "}
                {pt("benefitsTitle")}{" "}
              </h2>{" "}
              <p className="text-slate-600 text-lg leading-relaxed">
                {" "}
                {pt("benefitsDescription")}{" "}
              </p>{" "}
              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 md:px-7 md:py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] h-full flex flex-col justify-center">
                {" "}
                <ul className="divide-y divide-slate-200">
                  {" "}
                  {visibleBenefits.map((feature) => (
                    <li
                      key={feature}
                      className="py-4 flex items-center gap-3 first:pt-2 last:pb-2"
                    >
                      {" "}
                      <span
                        className="w-3 h-3 rounded-full bg-sky-500"
                        aria-hidden="true"
                      />{" "}
                      <span className="text-slate-700 font-semibold text-lg">
                        {feature}
                      </span>{" "}
                    </li>
                  ))}{" "}
                </ul>{" "}
                {Array.isArray(features) && features.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllBenefits((prev) => !prev)}
                    aria-expanded={showAllBenefits}
                    className="mt-2 w-full flex items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[#0e4ea4] font-semibold text-sm"
                  >
                    {" "}
                    <span>
                      {showAllBenefits ? showLessLabel : showMoreLabel}
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
            <div className="reveal flex items-center justify-center pt-8 md:pt-14">
              {" "}
              <div className="relative flex items-center justify-center w-full">
                {" "}
                <SmartImage
                  src={pt("benefitsImage") || "/assets/new/hizmetler/izlenebilirlik-cozumleri/siskon-1-3-izlenebilirlik-cozumleri-1-1-kare-camera-135x145x-150-2.webp"}
                  alt={pt("title")}
                  width={1500}
                  height={1500}
                  className="w-full h-auto max-h-[460px] object-contain mx-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Sekt├╢rel ├£r├╝n Detaylar─▒ */}{" "}
      <section className="py-12 md:py-20 px-6 bg-white">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            {" "}
            <span className="eyebrow">{pt("sectorDetails")}</span>{" "}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {pt("components")}
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {" "}
            {Array.isArray(sectorDetailCards) &&
              sectorDetailCards.map((card, cardIndex) => {
                const isExpanded = !!expandedCards[cardIndex];
                return (
                  <div
                    key={card.title}
                    className="reveal group rounded-2xl bg-[#d2eaf0] px-5 sm:px-6 py-6 md:py-7 min-h-[380px] md:min-h-[420px] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_14px_34px_rgba(14,116,144,0.14)]"
                  >
                    {" "}
                    <div className="w-full min-h-[220px] md:h-[240px] flex items-center justify-center mb-4 md:mb-5">
                      {" "}
                      <img
                        src={card.icon || card.image}
                        alt={card.imageAlt || card.title}
                        className="max-h-[210px] md:max-h-[230px] max-w-full w-auto h-auto object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.14)]"
                        loading="lazy"
                      />{" "}
                    </div>{" "}
                    <h3 className="w-full text-xl md:text-2xl font-bold text-[#0a4da0] leading-tight mb-2 md:min-h-[96px]">
                      {" "}
                      {card.title}{" "}
                      {card.titleSub && (
                        <>
                          {" "}
                          <br />{" "}
                          <span className="text-base md:text-lg font-semibold">
                            {card.titleSub}
                          </span>{" "}
                        </>
                      )}{" "}
                    </h3>{" "}
                    <p className="w-full text-[#00a9e8] font-semibold text-base md:text-lg leading-snug mb-3 md:mb-4 md:min-h-[80px]">
                      {card.spot}
                    </p>{" "}
                    <p
                      className={`w-full text-slate-700 text-sm md:text-base leading-relaxed ${isExpanded ? "" : "line-clamp-4"}`}
                    >
                      {card.desc}
                    </p>{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedCards((prev) => ({
                          ...prev,
                          [cardIndex]: !prev[cardIndex],
                        }))
                      }
                      aria-expanded={isExpanded}
                      className="mt-auto pt-4 w-full flex items-center justify-center gap-2 text-[#0a4da0] font-semibold text-sm hover:opacity-75 transition-opacity"
                    >
                      {" "}
                      <span>
                        {isExpanded ? showLessLabel : showMoreLabel}
                      </span>{" "}
                      <span
                        className={`h-8 w-8 rounded-full border-2 border-[#0a4da0] flex items-center justify-center shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
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
                  </div>
                );
              })}{" "}
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
