'use client';

import Link from 'next/link';
import AnimatedButton from '../components/AnimatedButton';
import { AnimatedCTALink } from '../components/AnimatedCTALink';
import PageHero from '../components/PageHero';
import SmartImage from '../components/SmartImage';
import { getServicesPageContent } from '../lib/content/servicesPageContent';
import { useLanguage } from '../_context/LanguageContext';

function WhySiskonList({ items }) {
  return items.map((item) => (
    <li key={item.t} className="flex gap-3 md:gap-6">
      <div className="w-5 md:w-6 h-5 md:h-6 rounded-lg bg-sky-600 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
      </div>
      <div>
        <h5 className="font-bold text-slate-900 mb-0.5 text-sm md:text-base">{item.t}</h5>
        <p className="text-xs md:text-sm text-slate-500">{item.d}</p>
      </div>
    </li>
  ));
}

function MethodologyGrid({ steps }) {
  return steps.map((step, i) => (
    <div key={step.t} className="relative p-6 md:p-10 bg-slate-50 rounded-[28px] md:rounded-[40px] border border-slate-100 reveal group" data-tilt>
      <div className="text-6xl md:text-8xl font-black text-slate-200/50 absolute top-2 md:top-4 right-4 md:right-8 group-hover:text-sky-500/10 transition-colors pointer-events-none">0{i + 1}</div>
      <div className="relative z-10 space-y-4 md:space-y-6">
        <h4 className="text-base md:text-xl font-bold text-slate-900">{step.t}</h4>
        <p className="text-slate-600 text-lg leading-relaxed">{step.d}</p>
      </div>
    </div>
  ));
}

export default function HizmetlerPage() { // NOSONAR
  const { locale, localizePath, t } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const { services, whySiskonItems, methodologySteps } = getServicesPageContent(locale);

  return (
    <div className="bg-white">
      {/* PAGE HERO - UNTOUCHED AS REQUESTED */}
      <PageHero
        title={t('servicesPage.pageTitle')}
        subtitle={t('servicesPage.pageSubtitle')}
        breadcrumbs={[t('servicesPage.breadcrumbHome'), t('servicesPage.breadcrumbServices')]}
      />

      {/* ── DESIGN SYSTEM: 8pt Grid, Visual Hierarchy, Progressive Disclosure ── */}

      {/* Intro Strategy Section */}
      <section className="pt-10 pb-20 md:pt-14 md:pb-28 px-4 md:px-6">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-20 reveal">
            {/* Left — golden ratio major (≈61.8%) */}
            <div className="w-full lg:w-[62%] space-y-5 md:space-y-8">
              <span className="text-sky-600 font-bold text-xs uppercase tracking-widest">{t('servicesPage.solutionPartnerEyebrow')}</span>
              <h2
                className="text-3xl md:text-[46px] font-bold text-slate-900 mt-1 leading-[1.15]"
                dangerouslySetInnerHTML={{ __html: t('servicesPage.solutionPartnerTitle') }}
              />
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                {t('servicesPage.solutionPartnerDesc')}
              </p>
            </div>
            {/* Right — golden ratio minor (≈38.2%) */}
            <div className="w-full lg:w-[38%] bg-slate-50 rounded-[32px] md:rounded-[40px] p-7 md:p-10 border border-slate-100 relative overflow-hidden" data-tilt>
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="relative z-10 space-y-5 md:space-y-7">
                <h4 className="text-base md:text-xl font-bold text-slate-900">{t('servicesPage.whySiskonTitle')}</h4>
                <ul className="space-y-4 md:space-y-5">
                  <WhySiskonList items={whySiskonItems} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Visual Hierarchy & Progressive Disclosure) */}
      <section className="py-16 md:py-48 px-4 md:px-6 bg-slate-50 rounded-[32px] md:rounded-[40px] lg:rounded-[80px] mx-4 md:mx-6">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-16">
            {services.map((service) => (
              <Link
                key={service.num}
                href={localizePath(service.href)}
                className={`group flex flex-col h-full bg-white rounded-[32px] md:rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden reveal focus-ring-card ${(service.mobileNarrow || service.href === '/hizmetler/egitim-danismanlik') ? 'max-w-[396px] md:max-w-none mx-auto md:mx-0 min-h-[760px] md:min-h-0' : ''}`}
                data-tilt
                aria-label={`${service.title} - ${t('servicesPage.exploreService')}`}
              >
                <div className={`relative aspect-[4/3] overflow-hidden bg-slate-50 ${service.imageFit === 'cover' ? 'p-0' : 'p-3 md:p-4'}`}>
                  <SmartImage
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`${service.imageFit === 'cover' ? 'object-cover' : 'object-contain'} object-center transition-transform duration-700`}
                    style={service.imageAlign === 'left-soft' ? { objectPosition: 'left center', transform: 'translateX(-285%)' } : undefined}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fallbackLabel={t('home.imageUnavailable')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8">
                    <div className="flex gap-2">
                      {service.tags.slice(0, 2).map((tag) => (
                        <span key={`${service.num}-${tag}`} className="px-2 md:px-3 py-0.5 md:py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] md:text-[10px] font-bold text-white border border-white/20 tracking-[0.12em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10 flex flex-col flex-1">
                  <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 group-hover:text-sky-600 transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6 md:mb-10 flex-1">
                    {service.desc}
                  </p>

                  <span className="inline-flex items-center gap-4 font-bold text-slate-900 group-hover:text-sky-600 transition-colors group/btn">
                    {t('servicesPage.exploreService')}
                    <span className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-sky-600 group-hover/btn:text-white transition-all transform group-hover/btn:translate-x-2">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}

            {/* Strategy CTA Card */}
            <div className="directional-cta-card animated-card flex flex-col h-full bg-[#0A192F] rounded-[36px] md:rounded-[44px] lg:rounded-[48px] p-7 md:p-10 lg:p-12 text-white relative overflow-hidden reveal group" data-tilt="true">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-sky-500/20 transition-all duration-700" />
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-sky-300 font-bold text-[11px] md:text-xs uppercase tracking-[0.16em] mb-5 md:mb-6">{t('servicesPage.strategicPlanningEyebrow')}</span>
                <h3 className="text-white text-2xl md:text-[30px] lg:text-3xl font-extrabold mb-5 md:mb-6 leading-[1.2] tracking-tight">
                  {t('servicesPage.strategicPlanningTitle')}
                </h3>
                <p className="text-slate-100 text-base md:text-lg leading-relaxed mb-8 md:mb-10 flex-1 max-w-[36ch]">
                  {t('servicesPage.strategicPlanningDesc')}
                </p>
                <AnimatedButton
                  href={`${localizePath('/iletisim')}#contact-form`}
                  className="w-full justify-center py-4 md:py-5 rounded-2xl bg-sky-600 text-sm md:text-lg font-bold shadow-xl"
                  suppressHydrationWarning={true}
                >
                  {t('servicesPage.strategicPlanningCta')}
                </AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Process (8pt Grid & System Design) */}
      <section className="py-16 md:py-48 bg-white relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-24 reveal">
            <span className="text-sky-600 font-bold text-xs uppercase tracking-widest mb-3 md:mb-4 block">{t('servicesPage.methodologyEyebrow')}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 md:mb-8">{t('servicesPage.methodologyTitle')}</h2>
            <p className="text-slate-600 text-lg">{t('servicesPage.methodologyDesc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <MethodologyGrid steps={methodologySteps} />
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('servicesPage.ctaTitle')}</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
            {t('servicesPage.ctaDesc')}
          </p>
          <AnimatedCTALink href={`${localizePath('/iletisim')}#contact-form`}>
            {t('servicesPage.ctaCta')}
          </AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
