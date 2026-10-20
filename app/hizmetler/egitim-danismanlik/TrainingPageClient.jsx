"use client";

import AnimatedCTALink from "../../components/AnimatedCTALink";
import PageHero from "../../components/PageHero";
import SmartImage from "../../components/SmartImage";
import { SERVICE_KEYS, getServiceName } from "../../../config/services";
import { useLanguage } from "../../_context/LanguageContext";
import { usePageLocale } from "../../lib/i18n/usePageLocale";
export default function TrainingPageClient({ trData, enData, roData }) {
  const { locale, localizePath, lang } = useLanguage();
  const pt = usePageLocale(trData, enData, roData);
  const isEn = locale === "en";
  const isRo = locale === "ro";
  const serviceName = getServiceName(
    SERVICE_KEYS.trainingConsulting,
    isRo ? "ro" : isEn ? "en" : "tr",
  );
  const contentKey = `training-${lang}`;
  const heroTitleLines = pt("heroTitleLines");
  const heroDescriptionLines = pt("heroDescriptionLines");
  const trainings = pt("trainings");
  const imageAlt = pt("imageAlt");
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
          {/* Mobil: görsel üstte, metin altta — sabit yükseklik yok, metin doğal akışla sarılır.
              (heroTitleLines / heroDescriptionLines masaüstü satır kırılımlarıdır; mobilde
              zorunlu <br> yerine boşlukla birleştirilir.) */}
          <div className="reveal md:hidden -mx-4 overflow-hidden rounded-[20px] bg-[#03070b] shadow-[0_24px_54px_rgba(15,23,42,0.22)] flex flex-col">
            <div className="relative h-[260px] sm:h-[340px] w-full shrink-0">
              <SmartImage
                src="/assets/new/hizmetler/egitim-danismanlik/1-9-egitim-ve-danismanlik-cozumlerikutu.webp"
                alt={imageAlt}
                fill
                className="object-cover object-[56%_8%]"
                sizes="100vw"
                priority
                quality={75}
              />
            </div>
            <div className="px-5 py-8 text-center">
              <h2 className="w-full text-[1.45rem] font-bold text-[#31E2FF] leading-[1.95rem]">
                {Array.isArray(heroTitleLines) ? heroTitleLines.join(' ') : ''}
              </h2>
              <p className="mt-4 w-full text-slate-100 text-base leading-relaxed">
                {Array.isArray(heroDescriptionLines) ? heroDescriptionLines.join(' ') : ''}
              </p>
            </div>
          </div>
          <div className="hidden md:block reveal relative min-h-[340px] md:min-h-[430px] lg:min-h-[500px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-[0_24px_54px_rgba(15,23,42,0.16)]">
            {" "}
            <SmartImage
              src="/assets/new/hizmetler/egitim-danismanlik/1-9-egitim-ve-danismanlik-cozumleri.webp"
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              quality={75}
            />{" "}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,8,23,0.82) 0%, rgba(2,8,23,0.76) 34%, rgba(2,8,23,0.58) 48%, rgba(2,8,23,0.22) 66%, rgba(2,8,23,0) 100%)",
              }}
              aria-hidden="true"
            />{" "}
            <div className="relative z-10 h-full max-w-[620px] p-6 md:p-9 lg:p-10 flex flex-col items-start justify-center text-left">
              {" "}
              <h2 className="w-full text-[1.75rem] md:text-[2rem] font-bold text-[#31E2FF] leading-[2.25rem] md:leading-[2.625rem]">
                {" "}
                {Array.isArray(heroTitleLines) &&
                  heroTitleLines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {" "}
                      {line}{" "}
                      {index < heroTitleLines.length - 1 ? <br /> : null}{" "}
                    </span>
                  ))}{" "}
              </h2>{" "}
              <div
                className="mt-7 mb-7 h-[2px] w-32 md:w-44 self-start bg-[#31E2FF]"
                aria-hidden="true"
              />{" "}
              <p className="w-full text-slate-100 text-lg leading-relaxed">
                {" "}
                {Array.isArray(heroDescriptionLines) &&
                  heroDescriptionLines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {" "}
                      {line}{" "}
                      {index < heroDescriptionLines.length - 1 ? (
                        <br />
                      ) : null}{" "}
                    </span>
                  ))}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <section className="py-12 md:py-20 px-6">
        {" "}
        <div className="container">
          {" "}
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            {" "}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              {pt("expertiseTitle")}
            </h2>{" "}
          </div>{" "}
          <div className="space-y-8 md:space-y-10">
            {" "}
            {Array.isArray(trainings) &&
              trainings.map((tItem) => (
                <div
                  key={tItem.title}
                  className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center rounded-2xl px-0 md:px-4 py-4"
                >
                  {" "}
                  <div
                    className={
                      tItem.reverse
                        ? "order-1 md:order-2"
                        : "order-1 md:order-1"
                    }
                  >
                    {" "}
                    <SmartImage
                      src={tItem.image}
                      alt={tItem.title}
                      width={1920}
                      height={1080}
                      className="responsive-framed-image rounded-xl shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
                      quality={75}
                    />{" "}
                  </div>{" "}
                  <div
                    className={
                      tItem.reverse
                        ? "order-2 md:order-1"
                        : "order-2 md:order-2"
                    }
                  >
                    {" "}
                    <div className="border-y border-[#2f69aa]/70 py-7 md:py-8">
                      {" "}
                      <h3 className="text-2xl md:text-3xl font-bold text-sky-500 leading-tight mb-3">
                        {tItem.title}
                      </h3>{" "}
                      {tItem.details && tItem.details.length > 0 && (
                        <div className="space-y-2">
                          {" "}
                          {tItem.details.map((line) => (
                            <p
                              key={line}
                              className="text-xl md:text-2xl font-semibold text-[#0a4da0] leading-relaxed"
                            >
                              {line}
                            </p>
                          ))}{" "}
                        </div>
                      )}{" "}
                    </div>{" "}
                  </div>{" "}
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
            {" "}
            {pt("ctaTitle")}{" "}
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
