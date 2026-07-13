'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import PageHero from './PageHero';
import { useLanguage } from '../_context/LanguageContext';

const PLACEHOLDER_LOGO = '/assets/Logos/reference-placeholder.svg';

const SECTOR_PALETTES = [
  { match: /t[uü]t[uü]n|tobacco/i, accent: '#D97706', soft: 'rgba(217,119,6,0.12)' },
  { match: /otomotiv|automotive/i, accent: '#DC2626', soft: 'rgba(220,38,38,0.12)' },
  { match: /beyaz|white goods|ev alet/i, accent: '#0EA5E9', soft: 'rgba(14,165,233,0.12)' },
  { match: /g[iı]da|food|beverage/i, accent: '#16A34A', soft: 'rgba(22,163,74,0.12)' },
  { match: /(?:ila[cç]|ıla[cç]|pharma|pharmaceutical|health)/i, accent: '#7C3AED', soft: 'rgba(124,58,237,0.12)' },
  { match: /makine|machinery|cnc|otomasyon|automation/i, accent: '#0891B2', soft: 'rgba(8,145,178,0.12)' },
  { match: /tekstil|textile|konfeksiyon|apparel/i, accent: '#DB2777', soft: 'rgba(219,39,119,0.12)' },
  { match: /enerji|energy|kimya|chemical|s[uü]rd[uü]r/i, accent: '#059669', soft: 'rgba(5,150,105,0.12)' },
];

const DEFAULT_PALETTE = { accent: '#0EA5E9', soft: 'rgba(14,165,233,0.12)' };

const SECTOR_IMAGE_RULES = [
  { test: /beyaz|white goods|ev alet/i, image: '/assets/sektor/Beyaz-Eşya.webp' },
  { test: /enerji|energy|kimya|chemical/i, image: '/assets/sektor/enerji-kimya.webp' },
  { test: /g[iı]da|food|beverage/i, image: '/assets/sektor/Gıda.webp' },
  { test: /(?:ila[cç]|ıla[cç]|pharma|pharmaceutical|health)/i, image: '/assets/sektor/ilac.webp' },
  { test: /makine|machinery|otomasyon|automation|cnc/i, image: '/assets/sektor/makine.webp' },
  { test: /otomotiv|automotive/i, image: '/assets/sektor/otomotiv.webp' },
  { test: /tekstil|textile|konfeksiyon|apparel/i, image: '/assets/sektor/tekstil.webp' },
  { test: /t[uü]t[uü]n|tobacco/i, image: '/assets/sektor/tutun.webp' },
];

const DEFAULT_SECTOR_IMAGE = '/assets/sektor/makine.webp';

function getSectorPalette(title) {
  const matched = SECTOR_PALETTES.find((item) => item.match.test(title || ''));
  return matched || DEFAULT_PALETTE;
}

function getSectorImage(title) {
  const matched = SECTOR_IMAGE_RULES.find((item) => item.test.test(title || ''));
  return matched ? matched.image : DEFAULT_SECTOR_IMAGE;
}

const ICON_FALLBACKS = {
  needs: '/icons/alarm.svg',
  solutions: '/icons/approve-conf.svg',
  results: '/icons/rptrealtime.svg',
};

const ICON_RULES = [
  { test: /izlenebilir|trace|lot|seri|batch/i, icon: '/icons/traceorder.svg' },
  { test: /enerji|energy|karbon|cbam|esg/i, icon: '/icons/energy.svg' },
  { test: /re[cç]ete|recipe|form[uü]l|doz/i, icon: '/icons/recipe.svg' },
  { test: /kalite|quality|denetim|audit/i, icon: '/icons/checklist.svg' },
  { test: /bak[ıi]m|maint|ar[ıi]za|downtime/i, icon: '/icons/maint.svg' },
  { test: /entegrasyon|integration|erp|mes|sap|oracle/i, icon: '/icons/intlogo.svg' },
  { test: /plan|planlama|schedule/i, icon: '/icons/prod_plan.svg' },
  { test: /ekipman|equipment|makine|machine/i, icon: '/icons/equip.svg' },
  { test: /form|checklist|dok[üu]man|document/i, icon: '/icons/forms.svg' },
  { test: /sonu[cç]|result|kazan[ıi]m|improvement/i, icon: '/icons/approve-ack.svg' },
];

function getSectionType(title) {
  const normalized = String(title || '').toLocaleLowerCase('tr-TR');

  if (normalized.includes('ihtiyaç') || normalized.includes('need')) {
    return 'needs';
  }

  if (normalized.includes('çözüm') || normalized.includes('solution')) {
    return 'solutions';
  }

  return 'results';
}

function getItemIcon(item, sectionType) {
  const searchableText = `${item.title} ${item.description}`;
  const matchedRule = ICON_RULES.find((rule) => rule.test.test(searchableText));
  return matchedRule ? matchedRule.icon : ICON_FALLBACKS[sectionType];
}

function buildAnimatedValues(parsedKpis, eased) {
  return parsedKpis.map((kpiMeta) => {
    if (!kpiMeta.hasNumber) {
      return null;
    }

    return kpiMeta.numericValue * eased;
  });
}

function ReferenceLogos({ references }) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {references.map((ref) => {
        const hasLogo = Boolean(ref.logo) && ref.logo !== PLACEHOLDER_LOGO;

        if (hasLogo) {
          return (
            <article key={ref.name} className="rounded-3xl border border-slate-200/90 bg-white p-5 md:p-6 h-[140px] inline-flex items-center justify-center transition-all hover:border-slate-300 hover:shadow-sm">
              <div className="w-full h-full flex items-center justify-center">
                <Image src={ref.logo} alt={ref.name} width={240} height={90} className="max-h-[72px] w-auto max-w-full object-contain" />
              </div>
            </article>
          );
        }

        return (
          <article key={ref.name} className="rounded-3xl border border-slate-200/90 bg-white p-5 md:p-6 h-[140px] inline-flex items-center justify-center transition-all hover:border-slate-300 hover:shadow-sm">
            <span className="text-sm font-semibold text-slate-700 text-center" title={ref.name}>
            {ref.name}
            </span>
          </article>
        );
      })}
    </div>
  );
}

function KpiStrip({ kpis }) {
  const safeKpis = useMemo(() => kpis ?? [], [kpis]);

  const sectionRef = useRef(null);
  const [animatedValues, setAnimatedValues] = useState([]);

  const parsedKpis = useMemo(() => safeKpis.map((kpi) => {
    const originalValue = String(kpi.value || '');
    const matched = /\d+(?:[.,]\d+)?/.exec(originalValue);

    if (!matched) {
      return { hasNumber: false, originalValue };
    }

    const rawNumber = matched[0];
    const decimalPlaces = rawNumber.includes(',') || rawNumber.includes('.')
      ? rawNumber.split(/[.,]/)[1].length
      : 0;

    return {
      hasNumber: true,
      originalValue,
      rawNumber,
      numericValue: Number(rawNumber.replace(',', '.')),
      decimalPlaces,
    };
  }), [safeKpis]);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element || parsedKpis.length === 0) {
      return undefined;
    }

    let rafId = 0;
    let started = false;

    const animateCounters = () => {
      if (started) {
        return;
      }

      started = true;
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - ((1 - progress) ** 3);

        const nextValues = buildAnimatedValues(parsedKpis, eased);

        setAnimatedValues(nextValues);

        if (progress < 1) {
          rafId = globalThis.requestAnimationFrame(tick);
        }
      };

      rafId = globalThis.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafId) {
        globalThis.cancelAnimationFrame(rafId);
      }
    };
  }, [parsedKpis]);

  const formatKpiValue = (kpiMeta, animatedValue = 0) => {
    if (!kpiMeta.hasNumber) {
      return kpiMeta.originalValue;
    }

    const numberText = kpiMeta.decimalPlaces > 0
      ? animatedValue.toFixed(kpiMeta.decimalPlaces).replace('.', ',')
      : String(Math.round(animatedValue));

    return kpiMeta.originalValue.replace(kpiMeta.rawNumber, numberText);
  };

  if (!safeKpis.length) {
    return null;
  }

  return (
    <div ref={sectionRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
      {safeKpis.map((kpi, index) => (
        <article key={kpi.title} data-stagger={`${index * 100}`} className="reveal animated-card rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-2xl font-bold text-slate-900">{formatKpiValue(parsedKpis[index], animatedValues[index])}</p>
          <p className="mt-1 font-semibold text-slate-800">{kpi.title}</p>
          <p className="text-sm text-slate-600 mt-1">{kpi.note}</p>
        </article>
      ))}
    </div>
  );
}

function ListSection({ title, items, background = 'white', accent }) {
  if (!items?.length) {
    return null;
  }

  const bgClass = background === 'muted' ? 'bg-slate-50' : 'bg-white';
  const sectionType = getSectionType(title);

  return (
    <section className={`py-20 md:py-24 px-6 ${bgClass}`}>
      <div className="container">
        <div className="section-head reveal text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{title}</h3>
        </div>
        {sectionType === 'needs' ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <article
                key={item.title}
                data-stagger={`${index * 100}`}
                className="reveal animated-card relative rounded-lg border border-slate-200/90 bg-white/15 p-5 md:p-6 min-h-[170px] hover:border-[#2C6E9E]/35 transition-all"
              >
                <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-[#2C6E9E]" />
                <div className="ml-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-[15px] md:text-[16px] font-normal text-[#1A1E24] leading-snug break-words">
                      {item.title}
                    </h4>
                    <Image
                      src={getItemIcon(item, sectionType)}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain opacity-75"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-2.5 text-[12px] md:text-[13px] font-normal text-[#475569] leading-relaxed break-words">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {sectionType === 'solutions' ? (
          <div className="space-y-4 w-full">
            {items.map((item, index) => (
              <article
                key={item.title}
                data-stagger={`${index * 100}`}
                className="reveal animated-card relative rounded-xl bg-white/80 border border-slate-200 p-5 md:p-6 transition-shadow"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl" style={{ backgroundColor: accent }} />
                <div className="flex items-start gap-4 pl-2">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--sector-soft)' }}>
                    <Image
                      src={getItemIcon(item, sectionType)}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] object-contain"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase" style={{ color: accent }}>{String(index + 1).padStart(2, '0')}</p>
                    <p className="font-semibold text-slate-900 mt-1">{item.title}</p>
                    <p className="text-sm text-body-muted mt-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {sectionType === 'results' ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {items.map((item, index) => (
              <article
                key={item.title}
                data-stagger={`${index * 100}`}
                className="reveal animated-card rounded-xl border border-slate-200 bg-white p-5 md:p-6 min-h-[150px] md:min-h-[170px] flex flex-col justify-between transition-shadow"
              >
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-sm text-body-muted mt-2 leading-relaxed">{item.description}</p>
                </div>
                <div className="mt-4 h-[3px] w-10 rounded-full" style={{ backgroundColor: accent }} />
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function FeaturedSection({ featured, accent }) {
  if (!featured) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <div className="container">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-10 shadow-lg overflow-hidden relative">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-sky-400/20 blur-2xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
            <div className="inline-flex h-16 w-16 rounded-2xl bg-white/10 border border-white/20 items-center justify-center text-2xl font-bold text-white">
              {featured.mark}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide font-bold" style={{ color: '#bae6fd' }}>{featured.label}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">{featured.title}</h3>
              <p className="text-slate-200 mt-3 leading-relaxed">{featured.description}</p>
              {featured.linkUrl ? (
                <Link
                  className="inline-flex mt-6 items-center justify-center rounded-xl px-5 py-2.5 text-white font-semibold transition-colors"
                  style={{ backgroundColor: accent }}
                  href={featured.linkUrl}
                >
                  {featured.linkText}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudySection({ caseStudy, accent }) {
  if (!caseStudy) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <div className="container">
        <div className="max-w-6xl mx-auto bg-slate-50 border-l-4 rounded-r-2xl p-8 md:p-10 shadow-sm" style={{ borderLeftColor: accent }}>
          <p className="text-xs uppercase tracking-wide font-bold" style={{ color: accent }}>{caseStudy.label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{caseStudy.title}</h3>
          <p className="text-body-muted mt-3 leading-relaxed">{caseStudy.description}</p>
        </div>
      </div>
    </section>
  );
}

function TechStackSection({ title, items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="py-20 md:py-24 px-6 bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <ul className="grid grid-cols-1 md:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="reveal animated-card px-5 md:px-6 py-4 border-b border-slate-200 md:[&:nth-last-child(-n+2)]:border-b-0 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-slate-200"
                >
                  <span className="text-[15px] font-normal text-slate-800 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReferencesSection({ isEn, isRo, references }) {
  return (
    <section className="py-20 md:py-24 px-6 bg-white">
      <div className="container">
        <div className="section-head reveal text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{isEn ? 'References' : isRo ? 'Referințele Noastre' : 'Referanslarımız'}</h3>
        </div>
        <ReferenceLogos references={references} />
      </div>
    </section>
  );
}

export default function SectorDetailTemplate({ content }) { // NOSONAR
  const { locale, localizePath } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const view = isEn ? content.en : isRo ? content.ro : content.tr;
  const palette = getSectorPalette(view.title);
  const sectorImage = getSectorImage(view.title);
  const templateRef = useRef(null);
  const summarySource = String(view.summary || '').trim();
  const summarySnippet = summarySource
    ? summarySource.split(/[.!?]/).find((part) => part.trim())?.trim() || summarySource.slice(0, 170)
    : '';
  const ctaTitle = isEn
    ? `${view.title}: let us define your roadmap together`
    : isRo
    ? `${view.title}: să clarificăm împreună foaia de parcurs`
    : `${view.title} için yol haritasını birlikte netleştirelim`;
  const ctaLead = isEn
    ? `${summarySnippet || 'We tailor architecture and execution to your production goals.'} Share your priorities and discover the right solution set for your line.`
    : isRo
    ? `${summarySnippet || 'Adaptăm arhitectura și execuția la obiectivele dvs. de producție.'} Împărtășiți-vă prioritățile și descoperiți setul de soluții potrivit pentru linia dvs.`
    : `${summarySnippet || 'Üretim hedeflerinize uygun mimari ve uygulama adımlarını birlikte planlıyoruz.'} Önceliklerinizi paylaşın, hattınıza en uygun çözüm setini birlikte belirleyelim.`;

  useEffect(() => {
    const root = templateRef.current;

    if (!root) {
      return undefined;
    }

    document.body.classList.add('js-ready');

    const revealItems = Array.from(root.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.stagger || '0';
            entry.target.style.setProperty('--reveal-delay', `${delay}ms`);
            entry.target.classList.add('is-visible', 'in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={templateRef} className="bg-white min-h-screen" style={{ '--sector-accent': palette.accent, '--sector-soft': palette.soft }}>
      <PageHero
        title={view.title}
        breadcrumbs={isEn ? ['Home', 'Sectors', view.title] : isRo ? ['Pagina Principală', 'Sectoare', view.title] : ['Ana Sayfa', 'Sektörler', view.title]}
      />

      <section className="py-20 md:py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px] shadow-[0_20px_48px_rgba(15,23,42,0.14)]">
              <Image
                src={sectorImage}
                alt={view.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center scale-[1.1] sm:scale-[1.12] md:scale-[1.14] lg:scale-[1.16]"
                priority
              />
            </div>
            <div>
              {view.pack ? (
                <p className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase" style={{ backgroundColor: 'var(--sector-soft)', color: palette.accent }}>
                  {view.pack}
                </p>
              ) : null}
              <p className="mt-4 text-slate-600 text-lg leading-relaxed">{view.summary}</p>
              {view.detail ? <p className="mt-4 text-slate-600 text-lg leading-relaxed">{view.detail}</p> : null}
            </div>
          </div>

          <KpiStrip kpis={view.kpis} />
        </div>
      </section>

      <ListSection title={isEn ? 'Needs' : isRo ? 'Nevoi' : 'İhtiyaçlar'} items={view.needs} background="muted" accent={palette.accent} />
      <ListSection title={isEn ? 'Our solutions' : isRo ? 'Soluțiile noastre' : 'Çözümlerimiz'} items={view.solutions} accent={palette.accent} />
      <ListSection title={isEn ? 'Results' : isRo ? 'Rezultate' : 'Sonuç'} items={view.results} background="muted" accent={palette.accent} />

      <FeaturedSection featured={view.featured} accent={palette.accent} />
      <CaseStudySection caseStudy={view.caseStudy} accent={palette.accent} />
      <TechStackSection title={isEn ? 'Technology Stack' : isRo ? 'Stiva de tehnologii' : 'Teknoloji Yığını'} items={view.techStack} />

      {view.references?.length ? (
        <ReferencesSection isEn={isEn} isRo={isRo} references={view.references} />
      ) : null}

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>
            {ctaTitle}
          </h2>
          <p>
            {ctaLead}
          </p>
          <Link
            href={localizePath('/iletisim#contact-form')}
            className="btn-cta"
          >
            {isEn ? 'Contact Us' : isRo ? 'Contactați-ne' : 'Bize Ulaşın'}
          </Link>
        </div>
      </section>
    </div>
  );
}

ReferenceLogos.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
    })
  ).isRequired,
};

KpiStrip.propTypes = {
  kpis: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      note: PropTypes.string.isRequired,
    })
  ),
};

ListSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  background: PropTypes.oneOf(['white', 'muted']),
  accent: PropTypes.string.isRequired,
};

FeaturedSection.propTypes = {
  featured: PropTypes.shape({
    mark: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string,
  }),
  accent: PropTypes.string.isRequired,
};

CaseStudySection.propTypes = {
  caseStudy: PropTypes.shape({
    label: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  accent: PropTypes.string.isRequired,
};

TechStackSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
};

ReferencesSection.propTypes = {
  isEn: PropTypes.bool.isRequired,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string,
    })
  ).isRequired,
};

SectorDetailTemplate.propTypes = {
  content: PropTypes.shape({
    tr: PropTypes.shape({
      title: PropTypes.string.isRequired,
      metrics: PropTypes.string.isRequired,
      pack: PropTypes.string.isRequired,
      sectorLabel: PropTypes.string,
      industryTitle: PropTypes.string,
      summary: PropTypes.string.isRequired,
      detail: PropTypes.string,
      referencesTitle: PropTypes.string,
      kpis: PropTypes.array,
      needs: PropTypes.array,
      solutions: PropTypes.array,
      results: PropTypes.array,
      featured: PropTypes.object,
      caseStudy: PropTypes.object,
      techStack: PropTypes.array,
      highlights: PropTypes.arrayOf(PropTypes.string),
      references: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          logo: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    en: PropTypes.shape({
      title: PropTypes.string.isRequired,
      metrics: PropTypes.string.isRequired,
      pack: PropTypes.string.isRequired,
      sectorLabel: PropTypes.string,
      industryTitle: PropTypes.string,
      summary: PropTypes.string.isRequired,
      detail: PropTypes.string,
      referencesTitle: PropTypes.string,
      kpis: PropTypes.array,
      needs: PropTypes.array,
      solutions: PropTypes.array,
      results: PropTypes.array,
      featured: PropTypes.object,
      caseStudy: PropTypes.object,
      techStack: PropTypes.array,
      highlights: PropTypes.arrayOf(PropTypes.string),
      references: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          logo: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};
