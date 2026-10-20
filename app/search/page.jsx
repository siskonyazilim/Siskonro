'use client';

import Link from 'next/link';
import AnimatedCTALink from '../components/AnimatedCTALink';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../_context/LanguageContext';

const PAGE_SIZE = 10;

const UI = {
  tr: {
    heroTitle: 'Arama Sonuçları',
    idleTitle: 'Site Araması',
    placeholder: 'Aramak istediğiniz anahtar kelimeyi giriniz...',
    queryLabel: 'Arama',
    submit: 'Ara',
    clear: 'Temizle',
    filters: 'Arama filtreleri',
    allCategories: 'Tümü',
    noResult: 'Eşleşen içerik bulunamadı. Farklı bir arama terimi deneyin.',
    noQuery: 'Arama yapmak için yukarıya yazın.',
    quickLinks: 'Hızlı bağlantılar',
    readMore: 'İncele',
    prev: 'Önceki',
    next: 'Sonraki',
    pagination: 'Arama sonuçları sayfaları',
    ctaTitle: 'Aradığınızı bulamadınız mı?',
    ctaDesc: 'İhtiyacınızı bizimle paylaşın; sizi doğru hizmet, ürün veya sektör sayfasına yönlendirelim.',
    ctaBtn: 'Doğrudan Destek Alın',
    categories: { blog: 'Blog', reference: 'Referans', partner: 'İş Birliği', service: 'Hizmet', product: 'Ürün', sector: 'Sektör', corporate: 'Kurumsal', legal: 'Yasal', page: 'Sayfa' },
  },
  en: {
    heroTitle: 'Search Results',
    idleTitle: 'Site Search',
    placeholder: 'Enter the keyword you are looking for...',
    queryLabel: 'Search',
    submit: 'Search',
    clear: 'Clear',
    filters: 'Search filters',
    allCategories: 'All',
    noResult: 'No matching content found. Try a different search term.',
    noQuery: 'Type above to search.',
    quickLinks: 'Quick links',
    readMore: 'View',
    prev: 'Previous',
    next: 'Next',
    pagination: 'Search results pages',
    ctaTitle: 'Could not find what you need?',
    ctaDesc: 'Describe your requirement and we will direct you to the right service, product or sector page.',
    ctaBtn: 'Get Direct Support',
    categories: { blog: 'Blog', reference: 'Reference', partner: 'Partner', service: 'Service', product: 'Product', sector: 'Sector', corporate: 'Corporate', legal: 'Legal', page: 'Page' },
  },
  ro: {
    heroTitle: 'Rezultatele Căutării',
    idleTitle: 'Căutare pe Site',
    placeholder: 'Introduceți cuvântul cheie căutat...',
    queryLabel: 'Căutare',
    submit: 'Caută',
    clear: 'Șterge',
    filters: 'Filtre de căutare',
    allCategories: 'Toate',
    noResult: 'Niciun conținut corespunzător. Încercați un alt termen.',
    noQuery: 'Scrieți mai sus pentru a căuta.',
    quickLinks: 'Linkuri rapide',
    readMore: 'Vezi',
    prev: 'Înapoi',
    next: 'Înainte',
    pagination: 'Paginile rezultatelor căutării',
    ctaTitle: 'Nu ați găsit ce căutați?',
    ctaDesc: 'Descrieți cerința dvs. și vă vom direcționa către pagina potrivită.',
    ctaBtn: 'Obțineți Asistență',
    categories: { blog: 'Blog', reference: 'Referință', partner: 'Partener', service: 'Serviciu', product: 'Produs', sector: 'Sector', corporate: 'Corporativ', legal: 'Legal', page: 'Pagină' },
  },
};

const QUICK_LINKS = {
  tr: [
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: 'OnSuite', href: '/onsuite' },
    { label: 'Referanslar', href: '/referanslar' },
    { label: 'İletişim', href: '/iletisim#contact-form' },
    { label: 'Kariyer', href: '/kurumsal/kariyer' },
    { label: 'Blog', href: '/blog' },
  ],
  en: [
    { label: 'Services', href: '/hizmetler' },
    { label: 'OnSuite', href: '/onsuite' },
    { label: 'References', href: '/referanslar' },
    { label: 'Contact', href: '/iletisim#contact-form' },
    { label: 'Careers', href: '/kurumsal/kariyer' },
    { label: 'Blog', href: '/blog' },
  ],
  ro: [
    { label: 'Servicii', href: '/hizmetler' },
    { label: 'OnSuite', href: '/onsuite' },
    { label: 'Referințe', href: '/referanslar' },
    { label: 'Contact', href: '/iletisim#contact-form' },
    { label: 'Blog', href: '/blog' },
  ],
};

function formatDate(value, locale) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString(locale === 'en' ? 'en-GB' : locale === 'ro' ? 'ro-RO' : 'tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** "“siskon” araması için toplam 20 sonuç bulundu." (sorgu ve sayı kalın) */
function ResultCount({ count, query, locale }) {
  const strong = 'font-bold text-white';
  if (locale === 'en') {
    return (
      <>
        <span className={strong}>{count}</span> result{count === 1 ? '' : 's'} found for{' '}
        <span className={strong}>“{query}”</span>.
      </>
    );
  }
  if (locale === 'ro') {
    return (
      <>
        <span className={strong}>{count}</span> rezultate pentru <span className={strong}>“{query}”</span>.
      </>
    );
  }
  return (
    <>
      <span className={strong}>“{query}”</span> araması için toplam <span className={strong}>{count}</span> sonuç bulundu.
    </>
  );
}

function highlight(text, query) {
  if (!query || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-sky-100 text-[#03408f] rounded px-0.5 not-italic">{part}</mark>
      : part
  );
}

function ResultCard({ item, localizePath, query, ui, locale }) {
  const date = formatDate(item.date, locale);

  return (
    <article className="group h-full rounded-xl md:rounded-2xl bg-white border border-slate-200 hover:border-[#0369a1]/40 hover:shadow-lg hover:shadow-sky-100 transition-all duration-300">
      <Link href={localizePath(item.href)} className="flex h-full flex-col justify-between gap-4 md:gap-5 p-5 md:p-8">
        <div className="flex flex-col gap-3 md:gap-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-xs md:text-[0.8rem] font-semibold bg-sky-50 text-[#03408f] border border-sky-100">
              {item.badge}
            </span>
            {date ? <span className="font-archivo text-xs text-slate-500">{date}</span> : null}
          </div>

          <h2 className="text-lg md:text-[1.35rem] font-bold leading-snug text-[#1B3A63] group-hover:text-[#0369a1] transition-colors duration-300">
            {highlight(item.title, query)}
          </h2>

          {item.description ? (
            <p className="font-archivo text-sm md:text-base leading-[1.55] text-slate-600 line-clamp-3">
              {item.description}
            </p>
          ) : null}
        </div>

        <div className="pt-3 md:pt-4 border-t border-slate-100 flex items-center gap-2 text-sm md:text-base font-bold text-[#1B3A63] group-hover:text-[#0369a1] transition-colors duration-300">
          <span>{ui.readMore}</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </article>
  );
}

function Pagination({ page, totalPages, onChange, ui }) {
  if (totalPages <= 1) return null;

  const base = 'flex min-w-10 h-10 items-center justify-center rounded-md px-3 text-sm font-semibold transition-colors';
  const idle = 'bg-white border border-slate-200 text-[#1B3A63] hover:border-[#0369a1]/50 hover:text-[#0369a1]';

  return (
    <nav className="flex justify-center mt-8 md:mt-12" aria-label={ui.pagination}>
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 && (
          <li>
            <button type="button" onClick={() => onChange(page - 1)} className={`${base} ${idle}`}>
              {ui.prev}
            </button>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page ? (
              <span aria-current="page" className={`${base} bg-[#1B3A63] text-white`}>{n}</span>
            ) : (
              <button type="button" onClick={() => onChange(n)} className={`${base} ${idle}`}>{n}</button>
            )}
          </li>
        ))}
        {page < totalPages && (
          <li>
            <button type="button" onClick={() => onChange(page + 1)} className={`${base} ${idle}`}>
              {ui.next}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default function SearchPage() {
  const searchParamsHook = useSearchParams();
  const { locale, localizePath } = useLanguage();
  const ui = UI[locale] ?? UI.tr;
  const quickLinks = QUICK_LINKS[locale] ?? QUICK_LINKS.tr;

  const initialQ = (searchParamsHook.get('q') ?? '').trim();
  const [inputValue, setInputValue] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState([]);
  // URL'de sorgu varsa ilk render'da "yükleniyor" göster (boş sonuç mesajı yanıp sönmesin)
  const [isLoading, setIsLoading] = useState(initialQ.length >= 2);
  const [activeCategory, setActiveCategory] = useState('all');
  const [page, setPage] = useState(1);
  const debounceRef = useRef(null);
  const resultsRef = useRef(null);

  const doSearch = useCallback(async (q) => {
    if (!q || q.length < 2) { setResults([]); return; }
    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&locale=${locale}&limit=60`);
      const json = await res.json();
      setResults(json.results ?? []);
    } catch { setResults([]); }
    finally { setIsLoading(false); }
  }, [locale]);

  const commitQuery = useCallback((value) => {
    const trimmed = value.trim();
    setQuery(trimmed);
    setActiveCategory('all');
    setPage(1);
    doSearch(trimmed);
    // URL'i history'ye eklemeden güncelle
    const url = new URL(window.location.href);
    if (trimmed) url.searchParams.set('q', trimmed);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url.toString());
  }, [doSearch]);

  // Yazdıkça arama (debounce)
  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => commitQuery(val), 350);
  };

  // "Ara" butonu / Enter: beklemeden ara
  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    commitQuery(inputValue);
  };

  const handleClear = () => {
    clearTimeout(debounceRef.current);
    setInputValue('');
    setQuery('');
    setResults([]);
    setPage(1);
  };

  // İlk yüklemede URL'deki sorguyu ara
  useEffect(() => {
    if (initialQ) doSearch(initialQ);
  }, [initialQ, doSearch]);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const categories = ['all', ...new Set(results.map((r) => r.category))];
  const filtered = activeCategory === 'all' ? results : results.filter((r) => r.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hasQuery = Boolean(query);

  const changePage = (next) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ── Başlık + arama formu (koyu bant: şeffaf header okunaklı kalsın) ── */}
      <section className="page-hero-section relative overflow-hidden pt-32 md:pt-40 pb-10 md:pb-14">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A192F]/40"
          aria-hidden="true"
        />
        <div className="container-wide relative z-10 px-4">
          <div className="mx-auto flex max-w-[850px] flex-col items-center gap-5 md:gap-7 text-center">
            <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.15] tracking-tight text-white">
              {hasQuery ? ui.heroTitle : ui.idleTitle}
            </h1>

            <form
              role="search"
              onSubmit={handleSubmit}
              className="relative flex w-full items-center gap-3 md:gap-4 border-b-2 border-white/25 pb-2 transition-colors duration-300 focus-within:border-[#08DCFF]"
            >
              {isLoading ? (
                <svg className="w-6 h-6 shrink-0 text-[#08DCFF] animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 shrink-0 text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
                </svg>
              )}
              <label htmlFor="search-page-input" className="sr-only">{ui.queryLabel}</label>
              <input
                id="search-page-input"
                type="search"
                autoFocus
                autoComplete="off"
                enterKeyHint="search"
                value={inputValue}
                onChange={handleInput}
                placeholder={ui.placeholder}
                className="w-full min-w-0 bg-transparent py-2 text-lg md:text-2xl font-medium text-white placeholder-white/40 outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label={ui.clear}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="shrink-0 min-h-[44px] rounded-md bg-[#0369a1] px-5 md:px-7 text-sm md:text-base font-bold text-white transition-colors duration-300 hover:bg-[#075985]"
              >
                {ui.submit}
              </button>
            </form>

            {hasQuery && !isLoading && results.length > 0 && (
              <p className="font-archivo text-sm md:text-[1.05rem] text-white/80" aria-live="polite">
                <ResultCount count={results.length} query={query} locale={locale} />
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Filtreler + sonuçlar ── */}
      <section className="py-10 md:py-16 px-4 md:px-6" ref={resultsRef} id="search-results">
        <div className="container-wide mx-auto flex flex-col gap-8 md:gap-12">

          {/* Kategori pill'leri */}
          {hasQuery && results.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-3" aria-label={ui.filters}>
              {categories.map((cat) => {
                const count = cat === 'all' ? results.length : results.filter((r) => r.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => { setActiveCategory(cat); setPage(1); }}
                    className={`min-h-[40px] rounded-full px-4 md:px-5 text-sm md:text-[0.95rem] font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-[#1B3A63] text-white shadow-md'
                        : 'bg-white border border-slate-200 text-[#1B3A63] hover:border-[#0369a1]/50 hover:text-[#0369a1]'
                    }`}
                  >
                    {cat === 'all' ? ui.allCategories : (ui.categories[cat] ?? cat)}
                    <span className="ml-1.5 text-xs opacity-70">({count})</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Yükleniyor: iskelet kartlar */}
          {hasQuery && isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8" aria-busy="true">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="h-44 md:h-52 animate-pulse rounded-xl md:rounded-2xl border border-slate-200 bg-white" />
              ))}
            </div>
          )}

          {/* Sonuç grid'i */}
          {hasQuery && !isLoading && pageItems.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                {pageItems.map((item, i) => (
                  <ResultCard
                    key={`${item.href}-${currentPage}-${i}`}
                    item={item}
                    localizePath={localizePath}
                    query={query}
                    ui={ui}
                    locale={locale}
                  />
                ))}
              </div>
              <Pagination page={currentPage} totalPages={totalPages} onChange={changePage} ui={ui} />
            </>
          )}

          {/* Boş sonuç */}
          {hasQuery && !isLoading && filtered.length === 0 && (
            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white py-14 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50">
                <svg className="w-8 h-8 text-[#0369a1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </div>
              <p className="px-6 font-archivo font-semibold text-slate-600">{ui.noResult}</p>
            </div>
          )}

          {/* Sorgu yok: hızlı bağlantılar */}
          {!hasQuery && (
            <div className="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#0369a1]">{ui.quickLinks}</p>
              <p className="mb-6 font-archivo text-slate-600">{ui.noQuery}</p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={localizePath(item.href)}
                    className="flex min-h-[48px] items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-[#1B3A63] transition-all hover:border-[#0369a1]/50 hover:bg-white hover:text-[#0369a1]"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#08DCFF]" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{ui.ctaTitle}</h2>
          <p>{ui.ctaDesc}</p>
          <AnimatedCTALink href={localizePath('/iletisim#contact-form')}>
            {ui.ctaBtn}
          </AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
