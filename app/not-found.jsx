'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from './_context/LanguageContext';

// Kart başlık/açıklamaları messages/notFoundPage/*.json içinden gelir; yollar dahili (TR) yoldur
// ve localizePath ile aktif dile çevrilir.
const CARDS = [
  { key: 'services', href: '/hizmetler' },
  { key: 'onsuite', href: '/onsuite' },
  { key: 'references', href: '/referanslar' },
  { key: 'blog', href: '/blog' },
];

const FOCUS_RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#31E2FF]';

function ArrowIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg aria-hidden="true" className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

ArrowIcon.propTypes = {
  className: PropTypes.string,
};

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

export default function NotFound() {
  const { localizePath, t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`${localizePath('/search')}?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="bg-white text-slate-900">
      <section className="bg-[#0A192F] bg-[radial-gradient(circle_at_0_0,rgba(14,165,233,0.42)_0%,rgba(14,165,233,0)_55%)] text-slate-50 lg:flex lg:min-h-[clamp(40rem,92vh,54rem)] lg:items-center">
        <div className="container-wide flex w-full flex-col gap-x-16 gap-y-8 pb-[clamp(88px,10vw,152px)] pt-[clamp(144px,16vw,208px)] lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-col items-center gap-6 text-center lg:flex-[1_1_56%] lg:items-start lg:text-left">
            <h1 className="m-0 text-balance font-bold text-[#F1F8FF]">
              {t('notFoundPage.title')}
            </h1>

            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href={localizePath('/')}
                className={`inline-flex min-h-12 items-center gap-2.5 rounded bg-[#31E2FF] px-6 text-sm font-semibold text-[#0A192F] no-underline transition-colors hover:bg-[#7DEBFF] hover:text-[#0A192F] ${FOCUS_RING}`}
              >
                {t('notFoundPage.home')}
                <ArrowIcon />
              </Link>
              <Link
                href={localizePath('/iletisim')}
                className={`inline-flex min-h-12 items-center rounded border border-white/40 px-6 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10 hover:text-white ${FOCUS_RING}`}
              >
                {t('notFoundPage.contact')}
              </Link>
            </div>

            <form role="search" onSubmit={handleSearch} className="flex w-full max-w-[640px] flex-col gap-2 pt-2 text-left">
              <label htmlFor="not-found-search" className="font-archivo text-sm text-slate-300">
                {t('notFoundPage.searchLabel')}
              </label>
              <div className="flex flex-wrap gap-2">
                <input
                  id="not-found-search"
                  type="search"
                  name="q"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('notFoundPage.searchPlaceholder')}
                  enterKeyHint="search"
                  autoComplete="off"
                  className={`h-[52px] min-w-0 flex-[1_1_220px] rounded border border-white/30 bg-white/5 px-4 text-base text-white placeholder:text-slate-400 ${FOCUS_RING}`}
                />
                <button
                  type="submit"
                  className={`inline-flex h-[52px] items-center gap-2 rounded border border-white/20 bg-[#1B3A63] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#24497A] ${FOCUS_RING}`}
                >
                  <SearchIcon />
                  {t('notFoundPage.searchSubmit')}
                </button>
              </div>
            </form>
          </div>

          <div className="order-first flex min-w-0 flex-col items-center gap-8 lg:order-none lg:flex-[1_1_44%]">
            <div
              role="img"
              aria-label="404"
              className="flex items-center justify-center gap-[0.03em] text-[clamp(116px,29vw,216px)] lg:text-[clamp(104px,16vw,248px)] font-bold leading-none tracking-[-0.02em] text-[#D9ECFE] [font-family:var(--font-heading-primary)]"
            >
              <span aria-hidden="true">4</span>
              {/* Ortadaki "0": Siskon logosundaki dişli/mercek simgesi */}
              <img src="/images/404-gear.svg" alt="" width="48" height="47" className="h-[0.777em] w-[0.78em] max-w-none flex-none" />
              <span aria-hidden="true">4</span>
            </div>
            <div aria-hidden="true" className="hidden h-px w-full max-w-[520px] bg-white/15 lg:block" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-wide flex flex-col gap-8 py-20 md:gap-10 md:py-28 lg:py-36">
          <h2 className="m-0 font-bold text-slate-900">
            {t('notFoundPage.popularTitle')}
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {CARDS.map((card) => (
              <Link
                key={card.key}
                href={localizePath(card.href)}
                className="flex min-h-[148px] flex-col gap-2 rounded-[20px] border border-slate-900/[0.08] bg-white p-6 text-slate-900 no-underline shadow-[0_4px_12px_rgba(10,25,47,0.04)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:text-slate-900 hover:shadow-[0_10px_28px_rgba(10,25,47,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <h3 className="m-0 flex items-center justify-between gap-3 text-lg font-bold leading-tight text-slate-900 md:text-xl">
                  {t(`notFoundPage.cards.${card.key}.title`)}
                  <ArrowIcon className="h-5 w-5 text-sky-700" />
                </h3>
                <span className="font-archivo text-sm leading-[1.55] text-slate-600 md:text-base">
                  {t(`notFoundPage.cards.${card.key}.desc`)}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[20px] border border-slate-900/[0.08] bg-slate-50 px-7 py-6">
            <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-0.5">
              <p className="m-0 font-sans text-base font-semibold leading-snug text-slate-900 md:text-lg">
                {t('notFoundPage.reportTitle')}
              </p>
              <p className="m-0 text-sm text-slate-600 md:text-base">
                {t('notFoundPage.reportDesc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-2 text-sm font-semibold md:text-base">
              <a href={`mailto:${t('notFoundPage.email')}`} className="inline-flex min-h-11 items-center gap-2 text-sky-700 no-underline hover:text-[#0A192F]">
                <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                {t('notFoundPage.email')}
              </a>
              <a href={t('notFoundPage.phoneHref')} className="inline-flex min-h-11 items-center gap-2 text-sky-700 no-underline hover:text-[#0A192F]">
                <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
                {t('notFoundPage.phone')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
