'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '../_context/LanguageContext';
import { toInternalPath } from '../lib/i18n/routes';
import { onsuiteUrl } from '../lib/onsuite/links';

const PAGE_SIZE = 9;

// Siteye özgü değerler (SiskonWeb'de farklıdır): RO telefonu ve onsuite.ro bağlantısı
const SITE = { phone: '+40 368 402 002', phoneHref: 'tel:+40368402002' };
const onsuiteHref = (locale) => onsuiteUrl('home', locale);

const ONSUITE_LOGO = '/assets/new/urunler/onsuite/onsuite_org.svg';

// Sitedeki menü ikonları (Header / MegaMenu ile aynı dosyalar)
const ICON_DIR = '/SiteIcon/MegaMenu';
const ICON_BY_PATH = {
  '/hizmetler/musteriye-ozel-yazilim': 'Moy',
  '/hizmetler/iiot': 'Iot',
  '/hizmetler/izlenebilirlik-cozumleri': 'Izlenebilirlik',
  '/hizmetler/makine-proses-otomasyonu': 'MakineProses',
  '/hizmetler/robot-cozumleri': 'Robot',
  '/hizmetler/goruntu-isleme': 'GoruntuIsleme',
  '/hizmetler/ai-makine-ogrenmesi': 'AiMakine',
  '/hizmetler/microsoft-cozumleri': 'Microsoft',
  '/hizmetler/velotic': 'Velotic',
  '/hizmetler/egitim-danismanlik': 'EgitimDanismanlik',
  '/hizmetler': 'MakineProses',
  '/kurumsal/bizi-taniyin': 'BiziTaniyin',
  '/kurumsal/kariyer': 'Kariyer',
  '/kurumsal/surdurulebilirlik': 'Surdurulebilirlik',
  '/blog': 'Blog',
};
const ICON_BY_CATEGORY = { service: 'MakineProses', corporate: 'BiziTaniyin', blog: 'Blog' };

// Sitede hazır ikonu olmayan türler için sade çizgi ikonlar
const GLYPHS = {
  reference: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5-1.2L7 21l5-2.5 5 2.5-1.5-7.2',
  partner: 'M9 12h6M10 7H7a5 5 0 0 0 0 10h3m4-10h3a5 5 0 0 1 0 10h-3',
  sector: 'M3 21V10l6 4v-4l6 4V5h6v16H3Zm4-4h2m4 0h2',
  product: 'm12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5M12 12v9',
  legal: 'M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4',
  page: 'M7 3h7l5 5v13H7V3Zm7 0v5h5M10 13h6m-6 4h6',
};

// Adlar sitenin resmi hizmet adlarıdır: messages/services/*.json (menü ve footer ile aynı kaynak)
const SERVICES = [
  { href: '/hizmetler/musteriye-ozel-yazilim', key: 'customSoftware' },
  { href: '/hizmetler/iiot', key: 'iiot' },
  { href: '/hizmetler/izlenebilirlik-cozumleri', key: 'traceability' },
  { href: '/hizmetler/makine-proses-otomasyonu', key: 'automation' },
  { href: '/hizmetler/robot-cozumleri', key: 'robotics' },
  { href: '/hizmetler/goruntu-isleme', key: 'vision' },
  { href: '/hizmetler/ai-makine-ogrenmesi', key: 'aiMl' },
  { href: '/hizmetler/microsoft-cozumleri', key: 'microsoft' },
  { href: '/hizmetler/velotic', key: 'velotic' },
  { href: '/hizmetler/egitim-danismanlik', key: 'training' },
];

// "Sonuç bulunamadı" ekranındaki popüler sayfalar (ilk kart OnSuite'tir)
const POPULAR_SERVICES = ['/hizmetler/izlenebilirlik-cozumleri', '/hizmetler/iiot', '/hizmetler/goruntu-isleme'];

const CATEGORY_ORDER = ['product', 'service', 'blog', 'corporate', 'sector', 'reference', 'partner', 'page', 'legal'];

const UI = {
  tr: {
    heroTitle: 'Arama Sonuçları',
    idleTitle: 'Site Araması',
    placeholder: 'Hizmet, ürün veya içerik',
    queryLabel: 'Sitede ara',
    submit: 'Ara',
    clear: 'Temizle',
    filters: 'İçerik türü',
    allCategories: 'Tümü',
    sort: 'Sırala',
    sortRelevant: 'En alakalı',
    sortNewest: 'En yeni',
    showMore: 'Daha fazla göster',
    resultCount: (count, query) => `“${query}” için ${count} sonuç bulundu.`,
    featuredLabel: 'Önerilen ürün',
    onsuiteTagline: 'Akıllı üretim ve MES platformu',
    onsuiteShort: 'Akıllı üretim platformu',
    onsuiteCta: "OnSuite'i Keşfedin",
    onsuiteModules: ['OEE', 'Kalite', 'İzlenebilirlik', 'Enerji', 'Bakım'],
    quick: {
      services: { title: 'Hizmetler', sub: '10 çözüm alanı' },
      references: { title: 'Referanslar', sub: '40+ ülke · 60+ fabrika' },
      blog: { title: 'Blog ve Haberler', sub: 'Fuar · Etkinlik · İçgörü' },
    },
    servicesTitle: 'Hizmetlerimiz',
    seeAll: 'Tümünü gör',
    emptyTitle: 'Sonuç bulunamadı',
    emptyDesc: (query) => `“${query}” için eşleşen içerik yok.`,
    didYouMean: 'Bunu mu demek istediniz?',
    popularTitle: 'Popüler sayfalar',
    ctaIdle: 'Size en uygun çözümü birlikte tasarlayalım',
    ctaIdleBtn: 'Bize Ulaşın',
    ctaResults: 'Aradığınızı bulamadınız mı?',
    ctaEmpty: 'Uzmanımız yardımcı olsun',
    ctaBtn: 'Doğrudan Destek Alın',
    categories: { blog: 'Blog', reference: 'Referans', partner: 'İş Birliği', service: 'Hizmet', product: 'Ürün', sector: 'Sektör', corporate: 'Kurumsal', legal: 'Yasal', page: 'Sayfa' },
    tabs: { blog: 'Blog', reference: 'Referanslar', partner: 'İş Birlikleri', service: 'Hizmetler', product: 'Ürünler', sector: 'Sektörler', corporate: 'Kurumsal', legal: 'Yasal', page: 'Sayfalar' },
    terms: ['OnSuite', 'izlenebilirlik', 'IIoT', 'görüntü işleme', 'otomasyon', 'robot', 'yazılım', 'kariyer', 'referanslar', 'blog', 'Microsoft', 'Velotic', 'eğitim', 'yapay zeka', 'sürdürülebilirlik'],
  },
  en: {
    heroTitle: 'Search Results',
    idleTitle: 'Site Search',
    placeholder: 'Service, product or content',
    queryLabel: 'Search the site',
    submit: 'Search',
    clear: 'Clear',
    filters: 'Content type',
    allCategories: 'All',
    sort: 'Sort',
    sortRelevant: 'Most relevant',
    sortNewest: 'Newest',
    showMore: 'Show more',
    resultCount: (count, query) => `${count} result${count === 1 ? '' : 's'} found for “${query}”.`,
    featuredLabel: 'Featured product',
    onsuiteTagline: 'Smart manufacturing and MES platform',
    onsuiteShort: 'Smart manufacturing platform',
    onsuiteCta: 'Explore OnSuite',
    onsuiteModules: ['OEE', 'Quality', 'Traceability', 'Energy', 'Maintenance'],
    quick: {
      services: { title: 'Services', sub: '10 solution areas' },
      references: { title: 'References', sub: '40+ countries · 60+ factories' },
      blog: { title: 'Blog and News', sub: 'Trade fairs · Events · Insights' },
    },
    servicesTitle: 'Our Services',
    seeAll: 'View all',
    emptyTitle: 'No results found',
    emptyDesc: (query) => `No content matches “${query}”.`,
    didYouMean: 'Did you mean',
    popularTitle: 'Popular pages',
    ctaIdle: 'Let’s design the right solution for you together',
    ctaIdleBtn: 'Contact Us',
    ctaResults: 'Could not find what you need?',
    ctaEmpty: 'Let our experts help',
    ctaBtn: 'Get Direct Support',
    categories: { blog: 'Blog', reference: 'Reference', partner: 'Partner', service: 'Service', product: 'Product', sector: 'Industry', corporate: 'Corporate', legal: 'Legal', page: 'Page' },
    tabs: { blog: 'Blog', reference: 'References', partner: 'Partners', service: 'Services', product: 'Products', sector: 'Industries', corporate: 'Corporate', legal: 'Legal', page: 'Pages' },
    terms: ['OnSuite', 'traceability', 'IIoT', 'machine vision', 'automation', 'robotics', 'software', 'careers', 'references', 'blog', 'Microsoft', 'Velotic', 'training', 'artificial intelligence', 'sustainability'],
  },
  ro: {
    heroTitle: 'Rezultatele Căutării',
    idleTitle: 'Căutare pe Site',
    placeholder: 'Serviciu, produs sau conținut',
    queryLabel: 'Căutați pe site',
    submit: 'Caută',
    clear: 'Șterge',
    filters: 'Tip de conținut',
    allCategories: 'Toate',
    sort: 'Sortare',
    sortRelevant: 'Cele mai relevante',
    sortNewest: 'Cele mai noi',
    showMore: 'Afișați mai multe',
    resultCount: (count, query) => `${count} rezultate pentru “${query}”.`,
    featuredLabel: 'Produs recomandat',
    onsuiteTagline: 'Platformă de producție inteligentă și MES',
    onsuiteShort: 'Platformă de producție inteligentă',
    onsuiteCta: 'Descoperiți OnSuite',
    onsuiteModules: ['OEE', 'Calitate', 'Trasabilitate', 'Energie', 'Mentenanță'],
    quick: {
      services: { title: 'Servicii', sub: '10 domenii de soluții' },
      references: { title: 'Referințe', sub: '40+ țări · 60+ fabrici' },
      blog: { title: 'Blog și Noutăți', sub: 'Târguri · Evenimente · Perspective' },
    },
    servicesTitle: 'Serviciile noastre',
    seeAll: 'Vedeți toate',
    emptyTitle: 'Niciun rezultat',
    emptyDesc: (query) => `Niciun conținut nu corespunde cu “${query}”.`,
    didYouMean: 'Ați vrut să spuneți',
    popularTitle: 'Pagini populare',
    ctaIdle: 'Să proiectăm împreună soluția potrivită pentru dvs.',
    ctaIdleBtn: 'Contactați-ne',
    ctaResults: 'Nu ați găsit ce căutați?',
    ctaEmpty: 'Experții noștri vă pot ajuta',
    ctaBtn: 'Obțineți Asistență',
    categories: { blog: 'Blog', reference: 'Referință', partner: 'Partener', service: 'Serviciu', product: 'Produs', sector: 'Industrie', corporate: 'Corporativ', legal: 'Legal', page: 'Pagină' },
    tabs: { blog: 'Blog', reference: 'Referințe', partner: 'Parteneri', service: 'Servicii', product: 'Produse', sector: 'Industrii', corporate: 'Corporativ', legal: 'Legal', page: 'Pagini' },
    terms: ['OnSuite', 'trasabilitate', 'IIoT', 'viziune artificială', 'automatizare', 'robotică', 'software', 'cariere', 'referințe', 'blog', 'Microsoft', 'Velotic', 'instruire', 'inteligență artificială', 'sustenabilitate'],
  },
};

const isExternalUrl = (href) => /^https?:\/\//i.test(String(href || ''));

function normalize(text) {
  return String(text ?? '')
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i')
    .trim();
}

function editDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const temp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = temp;
    }
  }
  return row[b.length];
}

/** Yazım hatası için en yakın bilinen terim ("izlenbilirlik" → "izlenebilirlik"). */
function suggestTerm(query, terms) {
  const q = normalize(query);
  if (q.length < 3) return null;
  let best = null;
  for (const term of terms) {
    const distance = editDistance(q, normalize(term));
    if (distance > 0 && distance <= Math.max(1, Math.floor(q.length * 0.34)) && (!best || distance < best.distance)) {
      best = { term, distance };
    }
  }
  return best?.term ?? null;
}

function formatMonth(value, locale) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const text = date.toLocaleDateString(locale === 'en' ? 'en-GB' : locale === 'ro' ? 'ro-RO' : 'tr-TR', {
    month: 'long',
    year: 'numeric',
  });
  return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);
}

function iconNameFor(href, category) {
  if (isExternalUrl(href)) return ICON_BY_CATEGORY[category] ?? null;
  const path = toInternalPath(String(href || '').replace(/[?#].*$/, ''));
  return ICON_BY_PATH[path] ?? ICON_BY_CATEGORY[category] ?? null;
}

// Dış bağlantılar yeni sekmede, iç bağlantılar aktif dile göre açılır.
function SearchLink({ href, localizePath, ...props }) {
  if (isExternalUrl(href)) {
    return <a href={href} target="_blank" rel="noopener" {...props} />;
  }
  return <Link href={localizePath(href)} {...props} />;
}

function ArrowIcon({ className = 'h-4 w-4' }) {
  return (
    <svg aria-hidden="true" className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function ChevronIcon({ className = 'h-4 w-4' }) {
  return (
    <svg aria-hidden="true" className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function SearchGlyph({ className = 'h-5 w-5' }) {
  return (
    <svg aria-hidden="true" className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

/** Sitenin menü ikonu (koyu); üzerine gelince beyaz hali. Hazır ikonu olmayan türlerde çizgi ikon. */
function ItemIcon({ href, category, size = 'h-14 w-14', plain = false }) {
  const name = iconNameFor(href, category);
  const box = plain
    ? 'flex shrink-0 items-center justify-center'
    : `flex ${size} shrink-0 items-center justify-center rounded-[14px] bg-[#EEF5FB] transition-colors duration-300 group-hover:bg-[#0A192F]`;

  if (name) {
    return (
      <span className={box} aria-hidden="true">
        <img src={`${ICON_DIR}/${name}.svg`} alt="" width="28" height="28" loading="lazy" className={`h-7 w-7 ${plain ? '' : 'group-hover:hidden'}`} />
        {!plain && (
          <img src={`${ICON_DIR}/white/${name}White.svg`} alt="" width="28" height="28" loading="lazy" className="hidden h-7 w-7 group-hover:block" />
        )}
      </span>
    );
  }

  return (
    <span className={`${box} text-[#0369a1] ${plain ? '' : 'group-hover:text-white'}`} aria-hidden="true">
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d={GLYPHS[category] ?? GLYPHS.page} />
      </svg>
    </span>
  );
}

function ArrowBadge() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF5FB] text-[#0369a1] transition-colors duration-300 group-hover:bg-[#0369a1] group-hover:text-white">
      <ArrowIcon />
    </span>
  );
}

const CARD_BASE =
  'group rounded-2xl border border-[#E6ECF2] bg-white text-slate-900 no-underline transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:text-slate-900 hover:shadow-[0_14px_32px_rgba(11,47,87,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500';

function ResultCard({ item, localizePath, ui, locale }) {
  const badge = ui.categories[item.category] ?? item.badge;
  const month = item.category === 'blog' ? formatMonth(item.date, locale) : '';
  const detail = month || item.description;

  return (
    <article className="h-full">
      <SearchLink
        href={item.href}
        localizePath={localizePath}
        className={`${CARD_BASE} flex h-full items-center gap-4 p-4 md:flex-col md:items-stretch md:gap-4 md:p-6`}
      >
        <div className="flex shrink-0 items-start justify-between gap-3">
          <ItemIcon href={item.href} category={item.category} />
          <span className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 md:block">{badge}</span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 md:gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 md:hidden">
            {month ? `${badge} · ${month}` : badge}
          </span>
          <h2 className="m-0 text-base font-bold leading-snug text-[#0A192F] md:text-xl">{item.title}</h2>
          {detail ? (
            <p className="m-0 hidden font-archivo text-sm leading-[1.55] text-slate-600 md:line-clamp-2 md:block md:text-base">{detail}</p>
          ) : null}
        </div>

        <span className="mt-auto hidden md:block">
          <ArrowBadge />
        </span>
        <ChevronIcon className="h-4 w-4 text-[#0369a1] md:hidden" />
      </SearchLink>
    </article>
  );
}

function FeaturedOnSuite({ ui, query, locale, localizePath }) {
  const q = normalize(query);
  return (
    <section className="flex flex-col items-start gap-5 rounded-2xl border border-[#E6ECF2] bg-white p-6 shadow-[0_12px_30px_rgba(11,47,87,0.08)] md:p-10">
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0369a1]">
        <span className="h-2 w-2 rounded-full bg-[#1BB3E8]" aria-hidden="true" />
        {ui.featuredLabel}
      </span>
      <img src={ONSUITE_LOGO} alt="OnSuite" width="180" height="48" className="h-10 w-auto md:h-12" />
      <p className="m-0 font-sans text-base font-medium text-[#0A192F] md:text-lg">{ui.onsuiteTagline}</p>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {ui.onsuiteModules.map((name) => {
          const n = normalize(name);
          const isMatch = q.length >= 2 && (n.includes(q) || q.includes(n));
          return (
            <li
              key={name}
              className={`flex min-h-9 items-center rounded-full px-4 text-sm font-medium ${
                isMatch ? 'bg-sky-100 font-semibold text-[#0A192F]' : 'bg-[#EEF5FB] text-[#0369a1]'
              }`}
            >
              {name}
            </li>
          );
        })}
      </ul>
      <SearchLink
        href={onsuiteHref(locale)}
        localizePath={localizePath}
        className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#0369a1] px-6 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#075985] hover:text-white sm:w-auto"
      >
        {ui.onsuiteCta}
        <ArrowIcon />
      </SearchLink>
    </section>
  );
}

function CtaBand({ title, children }) {
  return (
    <section className="flex flex-col items-start gap-6 rounded-2xl bg-[linear-gradient(110deg,#0B4F86_0%,#0B2F57_45%,#0A192F_100%)] p-6 md:flex-row md:items-center md:gap-8 md:p-10">
      <h2 className="m-0 flex-1 text-xl font-bold leading-tight text-white md:text-[1.75rem]">{title}</h2>
      <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">{children}</div>
    </section>
  );
}

const CTA_PRIMARY =
  'inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-white px-6 text-sm font-semibold text-[#0A192F] no-underline transition-colors hover:bg-sky-50 hover:text-[#0A192F]';
const CTA_GHOST =
  'inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/30 px-6 text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10 hover:text-white';

export default function SearchPage() {
  const searchParamsHook = useSearchParams();
  const { locale, localizePath, t } = useLanguage();
  const ui = UI[locale] ?? UI.tr;

  const initialQ = (searchParamsHook.get('q') ?? '').trim();
  const [inputValue, setInputValue] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState([]);
  // URL'de sorgu varsa ilk render'da "yükleniyor" göster (boş sonuç mesajı yanıp sönmesin)
  const [isLoading, setIsLoading] = useState(initialQ.length >= 2);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevant');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const debounceRef = useRef(null);

  const doSearch = useCallback(async (q) => {
    if (!q || q.length < 2) { setResults([]); setIsLoading(false); return; }
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
    setVisibleCount(PAGE_SIZE);
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

  // Öneri / "bunu mu demek istediniz" tıklaması
  const searchFor = (term) => {
    clearTimeout(debounceRef.current);
    setInputValue(term);
    commitQuery(term);
  };

  const handleClear = () => {
    clearTimeout(debounceRef.current);
    setInputValue('');
    commitQuery('');
  };

  // İlk yüklemede URL'deki sorguyu ara
  useEffect(() => {
    if (!initialQ) return undefined;
    const timer = setTimeout(() => doSearch(initialQ), 0);
    return () => clearTimeout(timer);
  }, [initialQ, doSearch]);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const hasQuery = query.length >= 2;
  const present = new Set(results.map((r) => r.category));
  const categories = ['all', ...CATEGORY_ORDER.filter((c) => present.has(c)), ...[...present].filter((c) => !CATEGORY_ORDER.includes(c))];

  // OnSuite sonuçlarda varsa öne çıkan kart olarak gösterilir, ızgarada tekrar edilmez
  const hasProduct = results.some((r) => r.category === 'product');
  const showFeatured = hasProduct && (activeCategory === 'all' || activeCategory === 'product');
  // OnSuite ana sayfası öne çıkan kartta zaten var; modül sonuçları (ör. OnSuite CNC) ızgarada kalır
  const onsuiteHome = onsuiteHref(locale);
  const isOnsuiteHome = (r) => r.category === 'product' && (r.href === onsuiteHome || r.href === '/onsuite');

  let listed = activeCategory === 'all' ? results : results.filter((r) => r.category === activeCategory);
  if (showFeatured) listed = listed.filter((r) => !isOnsuiteHome(r));
  if (sortBy === 'newest') {
    listed = [...listed].sort((a, b) => (Date.parse(b.date ?? '') || 0) - (Date.parse(a.date ?? '') || 0));
  }
  const visible = listed.slice(0, visibleCount);

  const showResults = hasQuery && !isLoading && results.length > 0;
  const showEmpty = hasQuery && !isLoading && results.length === 0;
  const suggestion = showEmpty ? suggestTerm(query, ui.terms) : null;
  const serviceName = (svc) => t(`services.${svc.key}`);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ── Başlık + arama kutusu ── */}
      <section className="page-hero-section relative overflow-hidden text-white">
        {/* Sitedeki diğer hero'larla aynı arka plan katmanları (bkz. components/PageHero.jsx) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A192F]/40" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02] md:opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M60 60H0V0h60v60zM30 0v60M0 30h60%22 fill=%22none%22 stroke=%22white%22 stroke-width=%221%22/%3E%3C/svg%3E')]"
          aria-hidden="true"
        />
        <div className={`container-wide relative z-10 pt-[clamp(7rem,14vw,8.5rem)] md:pt-[clamp(8rem,12vw,9.5rem)] ${hasQuery ? 'pb-20 md:pb-24' : 'pb-28 md:pb-32'}`}>
          <div className="mx-auto flex max-w-[820px] flex-col items-center gap-6 text-center">
            <h1 className="m-0 text-balance text-[clamp(1.35rem,4.2vw,2.7rem)] font-bold leading-[1.18] tracking-tight text-white md:leading-[1.22]">{hasQuery ? ui.heroTitle : ui.idleTitle}</h1>

            <form
              role="search"
              onSubmit={handleSubmit}
              className="flex h-[60px] w-full items-center gap-3 rounded-[14px] bg-white pl-5 pr-2 shadow-[0_18px_40px_rgba(4,16,36,0.35)] focus-within:ring-2 focus-within:ring-[#31E2FF] md:h-[66px]"
            >
              {isLoading ? (
                <svg className="h-5 w-5 shrink-0 animate-spin text-[#0369a1]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <SearchGlyph className="h-5 w-5 text-[#0369a1]" />
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
                className="h-full min-w-0 flex-1 border-0 bg-transparent text-base font-medium text-slate-900 outline-none placeholder:text-slate-400 md:text-lg [&::-webkit-search-cancel-button]:hidden"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label={ui.clear}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                className="h-[46px] shrink-0 rounded-[10px] bg-[#0369a1] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#075985] md:h-[50px] md:px-8"
              >
                {ui.submit}
              </button>
            </form>

            <p className="sr-only" aria-live="polite">
              {showResults ? ui.resultCount(results.length, query) : showEmpty ? ui.emptyDesc(query) : ''}
            </p>
          </div>
        </div>
      </section>

      <div className="container-wide relative z-10 flex flex-col gap-14 pb-20 md:gap-20 md:pb-28 lg:gap-24 lg:pb-32">
        {/* ── Sorgu yok: hızlı kartlar + hizmetler ── */}
        {!hasQuery && (
          <>
            <div className="-mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SearchLink
                href={onsuiteHref(locale)}
                localizePath={localizePath}
                className={`${CARD_BASE} flex min-h-[200px] flex-col gap-4 p-7 shadow-[0_12px_30px_rgba(11,47,87,0.12)]`}
              >
                <img src={ONSUITE_LOGO} alt="OnSuite" width="150" height="40" className="h-10 w-auto self-start" />
                <span className="font-sans text-[15px] font-medium text-slate-600">{ui.onsuiteShort}</span>
                <span className="mt-auto"><ArrowBadge /></span>
              </SearchLink>
              {[
                { key: 'services', href: '/hizmetler', category: 'service' },
                { key: 'references', href: '/referanslar', category: 'reference' },
                { key: 'blog', href: '/blog', category: 'blog' },
              ].map((card) => (
                <Link
                  key={card.key}
                  href={localizePath(card.href)}
                  className={`${CARD_BASE} flex min-h-[200px] flex-col gap-4 p-7 shadow-[0_12px_30px_rgba(11,47,87,0.12)]`}
                >
                  <ItemIcon href={card.href} category={card.category} />
                  <span className="text-xl font-bold leading-tight text-[#0A192F] [font-family:var(--font-heading-primary)]">{ui.quick[card.key].title}</span>
                  <span className="mt-auto font-sans text-sm font-semibold text-[#0369a1]">{ui.quick[card.key].sub}</span>
                </Link>
              ))}
            </div>

            <section className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="m-0 text-2xl font-bold leading-tight text-[#0A192F] md:text-4xl">{ui.servicesTitle}</h2>
                <Link
                  href={localizePath('/hizmetler')}
                  className="flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#0369a1] no-underline hover:text-[#0A192F] md:text-base"
                >
                  {ui.seeAll}
                  <ChevronIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5">
                {SERVICES.map((svc) => (
                  <Link
                    key={svc.href}
                    href={localizePath(svc.href)}
                    className={`${CARD_BASE} flex min-h-[132px] flex-col gap-3.5 px-5 py-5 md:min-h-[140px]`}
                  >
                    <ItemIcon href={svc.href} category="service" plain />
                    <span className="text-[15px] font-bold leading-snug text-[#0A192F] [font-family:var(--font-heading-primary)] md:text-base">{serviceName(svc)}</span>
                  </Link>
                ))}
              </div>
            </section>

            <CtaBand title={ui.ctaIdle}>
              <Link href={localizePath('/iletisim#contact-form')} className={CTA_PRIMARY}>
                {ui.ctaIdleBtn}
                <ArrowIcon className="h-4 w-4 text-[#0369a1]" />
              </Link>
            </CtaBand>
          </>
        )}

        {/* ── Yükleniyor ── */}
        {hasQuery && isLoading && (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3" aria-busy="true">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-24 animate-pulse rounded-2xl border border-[#E6ECF2] bg-white md:h-56" />
            ))}
          </div>
        )}

        {/* ── Sonuçlar ── */}
        {showResults && (
          <>
            <div className="flex flex-col gap-6 md:gap-8">
            <div className="-mt-7 flex flex-wrap items-center justify-between gap-4">
              <nav
                aria-label={ui.filters}
                className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-white p-1.5 shadow-[0_8px_24px_rgba(11,47,87,0.12)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {categories.map((cat) => {
                  const count = cat === 'all' ? results.length : results.filter((r) => r.category === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
                      className={`flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors ${
                        isActive ? 'bg-[#0A192F] text-white' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cat === 'all' ? ui.allCategories : (ui.tabs[cat] ?? cat)}
                      <span className={`text-xs font-medium ${isActive ? 'text-[#31E2FF]' : 'text-slate-400'}`}>{count}</span>
                    </button>
                  );
                })}
              </nav>

              <label className="flex items-center gap-2 font-archivo text-sm text-slate-600 md:mt-7">
                {ui.sort}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-11 rounded-[10px] border border-[#D5DEE8] bg-white px-3 font-sans text-sm font-medium text-slate-900"
                >
                  <option value="relevant">{ui.sortRelevant}</option>
                  <option value="newest">{ui.sortNewest}</option>
                </select>
              </label>
            </div>

            {showFeatured && <FeaturedOnSuite ui={ui} query={query} locale={locale} localizePath={localizePath} />}

            {visible.length > 0 && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {visible.map((item, i) => (
                  <ResultCard key={`${item.href}-${item.title}-${i}`} item={item} localizePath={localizePath} ui={ui} locale={locale} />
                ))}
              </div>
            )}

            {listed.length > visible.length && (
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="mx-auto flex min-h-12 w-full items-center justify-center rounded-lg border border-[#C9D6E3] bg-white px-8 text-sm font-semibold text-[#0369a1] transition-colors hover:border-[#0369a1] md:w-auto"
              >
                {ui.showMore}
              </button>
            )}

            </div>

            <CtaBand title={ui.ctaResults}>
              <Link href={localizePath('/iletisim#contact-form')} className={CTA_PRIMARY}>
                {ui.ctaBtn}
                <ArrowIcon className="h-4 w-4 text-[#0369a1]" />
              </Link>
            </CtaBand>
          </>
        )}

        {/* ── Sonuç yok ── */}
        {showEmpty && (
          <>
            <section className="-mt-8 flex flex-col items-center gap-5 rounded-[20px] bg-white px-6 py-12 text-center shadow-[0_12px_30px_rgba(11,47,87,0.12)] md:py-16">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF5FB]" aria-hidden="true">
                <img src="/icon.svg" alt="" width="48" height="48" className="h-12 w-12" />
              </span>
              <h2 className="m-0 text-2xl font-bold leading-tight text-[#0A192F] md:text-3xl">{ui.emptyTitle}</h2>
              <p className="m-0 text-base text-slate-600 md:text-lg">{ui.emptyDesc(query)}</p>
              {suggestion && (
                <button
                  type="button"
                  onClick={() => searchFor(suggestion)}
                  className="flex min-h-12 flex-wrap items-center justify-center gap-x-2 rounded-full bg-[#EEF5FB] px-6 font-sans text-sm font-medium text-[#0A192F] transition-colors hover:bg-sky-100 md:text-base"
                >
                  {ui.didYouMean}
                  <span className="flex items-center gap-2 font-semibold text-[#0369a1]">
                    {suggestion}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </span>
                </button>
              )}
            </section>

            <section className="flex flex-col gap-6 md:gap-8">
              <h2 className="m-0 text-center text-xl font-bold leading-tight text-[#0A192F] md:text-2xl">{ui.popularTitle}</h2>
              <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
                <SearchLink
                  href={onsuiteHref(locale)}
                  localizePath={localizePath}
                  className={`${CARD_BASE} flex min-h-[140px] flex-col gap-4 p-6`}
                >
                  <img src={ONSUITE_LOGO} alt="OnSuite" width="130" height="36" className="h-9 w-auto self-start" />
                  <span className="mt-auto"><ArrowBadge /></span>
                </SearchLink>
                {SERVICES.filter((svc) => POPULAR_SERVICES.includes(svc.href)).map((svc) => (
                  <Link key={svc.href} href={localizePath(svc.href)} className={`${CARD_BASE} flex min-h-[140px] flex-col gap-3.5 p-6`}>
                    <ItemIcon href={svc.href} category="service" plain />
                    <span className="text-[15px] font-bold leading-snug text-[#0A192F] [font-family:var(--font-heading-primary)] md:text-lg">{serviceName(svc)}</span>
                  </Link>
                ))}
              </div>
            </section>

            <CtaBand title={ui.ctaEmpty}>
              <a href={SITE.phoneHref} className={CTA_GHOST}>
                <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-[#31E2FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
                {SITE.phone}
              </a>
              <Link href={localizePath('/iletisim#contact-form')} className={CTA_PRIMARY}>
                {ui.ctaBtn}
                <ArrowIcon className="h-4 w-4 text-[#0369a1]" />
              </Link>
            </CtaBand>
          </>
        )}
      </div>
    </div>
  );
}
