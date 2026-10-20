"use client";

import { useState } from "react";
import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";

export default function MachineAutomationPage({ trData, enData, roData }) {
  const { locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const isEn = locale === "en";
  const isRo = locale === "ro";
  const serviceName = getServiceName(
    SERVICE_KEYS.machineProcessAutomation,
    isRo ? "ro" : isEn ? "en" : "tr",
  );
  const contentKey = `automation-${lang}`;

  const features = Array.isArray(pt("features")) ? pt("features") : [];
  const steps = Array.isArray(pt("steps")) ? pt("steps") : [];
  const capabilities = Array.isArray(pt("capabilities")) ? pt("capabilities") : [];

  const hasMoreCapabilities =
    Array.isArray(capabilities) && capabilities.length > 4;
  const visibleCapabilities = Array.isArray(capabilities)
    ? showAllCapabilities
      ? capabilities
      : capabilities.slice(0, 4)
    : [];
  const showMoreCapabilitiesLabel = pt("showMore");
  const showLessCapabilitiesLabel = pt("showLess");

  const showMoreLabel = pt("showMore");
  const showLessLabel = pt("showLess");
  const visibleFeatures = Array.isArray(features)
    ? showAllFeatures
      ? features
      : features.slice(0, 5)
    : [];

  const stepIcons = [
    "/assets/new/hizmetler/makine-proses-otomasyonu/step1.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step2.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step3.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step4.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step5.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step6.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step7.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step8.svg",
    "/assets/new/hizmetler/makine-proses-otomasyonu/step9.svg",
  ];

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
          <div className="reveal lg:hidden space-y-6">
            <div className="responsive-media-shell">
              <SmartImage
                src={pt("heroImage") || "/assets/new/hizmetler/makine-proses-otomasyonu/siskon-1-4-makine-ve-proses-otomasyonu-16-9-dikey-3-camera-zeminsiz-2.webp"}
                alt={pt("title")}
                width={1920}
                height={1080}
                className="w-full max-w-[86%] sm:max-w-[80%] mx-auto object-contain drop-shadow-2xl"
                style={{ maxHeight: "min(560px, 72vh)" }}
                sizes="100vw"
                priority
                quality={75}
              />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
              <span className="eyebrow self-start">{pt("service")}</span>
              <p className="text-slate-600 text-lg leading-relaxed">
                {pt("description")}
              </p>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell">
                <SmartImage
                  src={pt("heroImage") || "/assets/new/hizmetler/makine-proses-otomasyonu/siskon-1-4-makine-ve-proses-otomasyonu-16-9-dikey-3-camera-zeminsiz-2.webp"}
                  alt={pt("title")}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[100%] md:max-w-[860px] md:ml-0 object-contain drop-shadow-2xl"
                  style={{ maxHeight: "min(600px, 76vh)" }}
                  sizes="(max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal relative z-10 order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{pt("service")}</span>
                <p
                  className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto"
                  lang="tr"
                >
                  {pt("description")}
                </p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <p className="text-slate-600 text-lg leading-relaxed">
                  {pt("description")}
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
              <span className="eyebrow self-start">{pt("benefits")}</span>
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
              {Array.isArray(features) && features.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllFeatures((prev) => !prev)}
                  aria-expanded={showAllFeatures}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  <span>{showAllFeatures ? showLessLabel : showMoreLabel}</span>
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

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            <span className="eyebrow">{pt("roadmap")}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {pt("roadmapTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-9">
            {Array.isArray(steps) &&
              steps.map((step, idx) => (
                <article
                  key={step.title}
                  className={`group rounded-[14px] md:rounded-[22px] bg-gradient-to-b from-[#d6edf3] to-[#c5e2ea] border border-[#a6d3df] px-3 pt-5 pb-4 md:px-8 md:pt-9 md:pb-7 min-h-[200px] md:min-h-[320px] shadow-[0_8px_24px_rgba(9,52,109,0.08)] hover:shadow-[0_12px_32px_rgba(9,52,109,0.14)] transition-all duration-300 flex flex-col ${idx === steps.length - 1 ? "col-span-2 md:col-span-1 justify-self-center w-full max-w-[calc(50%-0.5rem)] md:max-w-none" : ""}`}
                >
                  <div className="h-[98px] md:h-[156px] flex items-center justify-center mb-3 md:mb-6">
                    {stepIcons[idx] ? (
                      <SmartImage
                        src={stepIcons[idx]}
                        alt={step.title}
                        width={138}
                        height={138}
                        style={{ width: "auto", height: "auto" }}
                        className="max-h-[98px] md:max-h-[154px] w-auto max-w-full object-contain drop-shadow-2xl"
                        sizes="138px"
                        quality={90}
                      />
                    ) : (
                      <div className="h-[96px] w-[96px] rounded-full border-2 border-[#0d4f9f] flex items-center justify-center text-[#0d4f9f]">
                        <svg
                          className="w-10 h-10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.59c1.757.426 1.757 2.925 0 3.351a1.724 1.724 0 00-1.066 2.591c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.59 1.065c-.427 1.757-2.925 1.757-3.351 0a1.724 1.724 0 00-2.591-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.59c-1.757-.427-1.757-2.925 0-3.351a1.724 1.724 0 001.066-2.591c-.94-1.543.826-3.31 2.37-2.37.996.607 2.296.07 2.59-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <h3 className="text-center text-[#0b4a95] text-[0.9rem] md:text-[clamp(1.1rem,1.7vw,1.55rem)] font-bold leading-snug md:leading-tight mb-2 md:mb-4">
                    {step.titleLine1}
                    <br />
                    {step.titleLine2}
                  </h3>

                  <div className="mt-auto pt-4 md:pt-7">
                    <div className="relative h-10 md:h-12">
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-[#4dc9e6]/80" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-9 w-9 md:h-12 md:w-12 rounded-full bg-[#05c8ef] border-2 border-[#a9f0ff] ring-2 ring-[#d8f8ff] flex items-center justify-center text-[#014c94] text-[1.25rem] md:text-[2rem] font-bold leading-none shadow-[0_6px_14px_rgba(0,141,189,0.28)]">
                        {idx + 1}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 bg-gradient-to-br from-[#041a52] via-[#0a3c8f] to-[#062766] overflow-hidden">
        <div className="container">
          <div className="reveal text-center lg:text-left max-w-3xl mb-9 md:mb-12 lg:pl-6">
            <span className="inline-block text-[#17e8ff] font-bold text-xs uppercase tracking-widest mb-3">
              {pt("benefits")}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-[3.25rem] font-black text-white leading-tight">
              {pt("capabilitiesTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="reveal">
              <div className="reveal relative flex items-center justify-center lg:hidden mb-7">
                <div className="pointer-events-none absolute -z-10 h-[300px] w-[300px] rounded-full bg-cyan-300/10 blur-3xl" />
                <SmartImage
                  src={pt("capabilitiesImage") || "/assets/new/hizmetler/makine-proses-otomasyonu/MakineVeProsesSettings.webp"}
                  alt={pt("capabilitiesTitle")}
                  width={720}
                  height={480}
                  className="responsive-contain-image w-full object-contain drop-shadow-2xl"
                  style={{
                    maxHeight: "min(640px, 80vh)",
                    width: "auto",
                    height: "auto",
                  }}
                  sizes="100vw"
                  quality={75}
                />
              </div>

              <article className="w-full max-w-xl lg:max-w-[480px] rounded-[20px] md:rounded-[24px] border border-cyan-300/55 bg-[#0b5a8f]/88 backdrop-blur-[2px] px-6 md:px-8 py-6 md:py-8 shadow-[0_16px_42px_rgba(2,18,56,0.28)] mx-auto lg:ml-6 lg:mr-auto">

                {pt("capabilitiesListTitle") && (
                  <p className="text-cyan-200/80 text-sm font-semibold uppercase tracking-wider mb-3 border-b border-cyan-300/35 pb-3">
                    {pt("capabilitiesListTitle")}
                  </p>
                )}

                <ul className="space-y-0">
                  {visibleCapabilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 py-3.5 border-b border-cyan-300/35 last:border-b-0 text-white/95 text-[1.02rem] md:text-[1.12rem] font-semibold leading-snug"
                    >
                      <span
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-cyan-300"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {hasMoreCapabilities ? (
                  <button
                    type="button"
                    onClick={() => setShowAllCapabilities((prev) => !prev)}
                    aria-expanded={showAllCapabilities}
                    className="mt-4 inline-flex w-full items-center justify-between border-t border-cyan-300/35 px-0 pt-4 pb-1 text-cyan-300 font-bold hover:text-cyan-200 transition-colors"
                  >
                    <span>
                      {showAllCapabilities
                        ? showLessCapabilitiesLabel
                        : showMoreCapabilitiesLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/70 transition-transform ${showAllCapabilities ? "rotate-180" : ""}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                ) : null}
              </article>
            </div>

            <div className="hidden lg:flex reveal relative items-center justify-center lg:justify-start lg:pl-12">
              <div className="pointer-events-none absolute -z-10 h-[360px] w-[360px] rounded-full bg-cyan-300/10 blur-3xl lg:h-[460px] lg:w-[460px]" />
              <SmartImage
                src={pt("capabilitiesImage") || "/assets/new/hizmetler/makine-proses-otomasyonu/MakineVeProsesSettings.webp"}
                alt={pt("capabilitiesTitle")}
                width={720}
                height={480}
                className="w-full h-auto max-h-[380px] lg:max-h-[420px] object-contain drop-shadow-2xl transition-all duration-300 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 720px"
                quality={75}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <SmartImage
                src={pt("plcHmiImage") || "/assets/new/hizmetler/makine-proses-otomasyonu/BilgisayarMockup.webp"}
                alt={pt("plcHmi")}
                width={720}
                height={540}
                className="responsive-contain-image w-full md:w-[108%] md:max-w-[860px] md:-ml-4 object-contain drop-shadow-2xl"
                style={{ maxHeight: "min(620px, 78vh)" }}
                sizes="(max-width: 768px) 100vw, 720px"
                quality={75}
              />
            </div>
            <div className="reveal">
              <div className="section-head text-center lg:text-left max-w-3xl mb-10">
                <span className="eyebrow">{pt("benefits")}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {pt("plcHmi")}
                </h2>
              </div>
              <div className="max-w-2xl bg-slate-50 border border-slate-100 rounded-2xl p-8 md:p-10 text-center lg:text-left mx-auto lg:mx-0">
                <p className="text-sky-700 font-semibold text-lg mb-4">
                  {pt("plcHmiSpot")}
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {pt("plcHmiDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal order-2 lg:order-1">
              <div className="section-head text-center lg:text-left max-w-3xl mb-10">
                <span className="eyebrow">{pt("benefits")}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  {pt("scada")}
                </h2>
              </div>
              <div className="max-w-2xl bg-slate-50 border border-slate-100 rounded-2xl p-8 md:p-10 text-center lg:text-left mx-auto lg:mx-0">
                <p className="text-sky-700 font-semibold text-lg mb-4">
                  {pt("scadaSpot")}
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {pt("scadaDesc")}
                </p>
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 flex lg:justify-end">
              <SmartImage
                src={pt("scadaImage") || "/assets/new/hizmetler/makine-proses-otomasyonu/TelefonMocku2.webp"}
                alt={pt("scada")}
                width={520}
                height={780}
                style={{ height: "auto", maxHeight: "min(760px, 84vh)" }}
                className="responsive-contain-image w-full md:w-[112%] md:max-w-[680px] object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 520px"
                quality={75}
              />
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
