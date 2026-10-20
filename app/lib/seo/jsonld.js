/**
 * JSON-LD (schema.org) üreticileri — SEO + AEO (yapay zeka cevap motorları) için.
 *
 * Tüm düğümler tek bir @graph içinde, @id referanslarıyla birbirine bağlanır:
 *   Organization ◀── WebSite ◀── WebPage ──▶ BreadcrumbList
 *                                  └──▶ Service / SoftwareApplication / ItemList
 *
 * Kural: Yalnızca sitede görünen / kayıtlı gerçek bilgiler kullanılır
 * (iletişim sayfası, mesaj dosyaları, ROUTE_META). Uydurma alan eklenmez.
 * Örn. FAQPage bilerek YOK: sitede görünür bir SSS içeriği bulunmuyor
 * (Google, FAQPage işaretlemesinin sayfada görünür içerikle eşleşmesini ister).
 */

import { ROUTE_META } from './routeMetadata';
import { detectLocale, toInternalPath, toLocalizedPath } from '../i18n/routes';

const LOCALE_TAG = { ro: 'ro-RO', en: 'en-US', tr: 'tr-TR' };
const HOME_LABEL = { tr: 'Ana Sayfa', en: 'Home', ro: 'Acasă' };

// Arama sonuçları gibi indekslenmemesi gereken sayfalar için sayfa düğümü üretilmez.
// ('/kurumsal/kilometre-taslari' şu an 404 veriyor.)
const NO_PAGE_NODE = new Set(['/search', '/kurumsal/kilometre-taslari']);

// ROUTE_META'da olmayan ama bilinen sayfa türleri.
const PAGE_TYPE = {
  '/kurumsal/bizi-taniyin': 'AboutPage',
  '/iletisim': 'ContactPage',
  '/hizmetler': 'CollectionPage',
  '/sektorler': 'CollectionPage',
  '/blog': 'CollectionPage',
};

// ── Şirket bilgileri (kaynak: messages/contactPage/*.json + layout'taki mevcut şema) ──
const ORG = {
  name: 'Siskon România',
  legalName: 'Siskon Software and Automation SRL',
  alternateName: 'Siskon Software and Automation',
  parentName: 'Siskon Yazılım ve Otomasyon',
  foundingDate: '1997',
  telephone: '+90-232-245-00-76',
  emails: {
    general: 'info@siskon.com.tr',
    sales: 'sales@siskon.com.tr',
    support: 'support@siskon.com.tr',
  },
  sameAs: [
    'https://x.com/siskonromania',
    'https://tr.linkedin.com/company/siskonyazilimveotomasyon',
    'https://www.youtube.com/@SiskonYazilimveOtomasyon',
    'https://www.instagram.com/siskonotomasyon/',
  ],
  logoPath: '/assets/new/common/siskon-logo.svg',
  offices: [
    {
      name: 'Siskon Software and Automation SRL',
      mapsUrl: 'https://www.google.com/maps/place/?q=place_id:0x40b35b910e74964b:0xac8086acca35f96a',
      address: {
        streetAddress: 'Str. Turnului Nr. 5, Clădirea M.U.M. Scara 3, Etajul 2, Biroul 5',
        addressLocality: 'Brașov',
        postalCode: '500152',
        addressCountry: 'RO',
      },
    },
    {
      name: 'Siskon DEPARK Ofis',
      mapsUrl: 'https://www.google.com/maps/search/Dokuz+Eylul+Universitesi+DEPARK+Beta+Buca+Izmir',
      address: {
        streetAddress: 'Dokuz Eylül Üniversitesi Tınaztepe Yerleşkesi, DEPARK Beta Binası, Adatepe Mahallesi, Doğuş Caddesi No:207/AG, Kat: 2 No: 202',
        addressLocality: 'Buca',
        addressRegion: 'İzmir',
        postalCode: '35390',
        addressCountry: 'TR',
      },
    },
    {
      name: 'Siskon Ege Serbest Bölgesi (ESBAŞ) Ofis',
      mapsUrl: 'https://www.google.com/maps/search/ESBAS+Ege+Serbest+Bolgesi+Gaziemir+Izmir',
      address: {
        streetAddress: 'Zafer SB Mahallesi, Nilüfer Sok. No:31/3',
        addressLocality: 'Gaziemir',
        addressRegion: 'İzmir',
        addressCountry: 'TR',
      },
    },
  ],
};

// ── Yardımcılar ──────────────────────────────────────────────────────────────

/** JSON-LD'yi <script> içine güvenle gömmek için serileştirir (XSS: "<" kaçışı). */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function trimSlash(url) {
  return String(url || '').replace(/\/+$/, '');
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function orgId(siteUrl) {
  return `${trimSlash(siteUrl)}/#organization`;
}

export function websiteId(siteUrl) {
  return `${trimSlash(siteUrl)}/#website`;
}

/** Dahili (TR) yoldan, dile göre mutlak URL üretir. */
export function absoluteUrl(internalPath, locale, siteUrl) {
  const path = toLocalizedPath(internalPath, locale);
  return new URL(path, `${trimSlash(siteUrl)}/`).toString();
}

function pickMeta(internalPath, locale) {
  const meta = ROUTE_META[internalPath];
  if (!meta) return null;
  return meta[locale] || meta.ro || null;
}

/** "Başlık | Siskon" → "Başlık" */
function pageLabel(internalPath, locale) {
  const first = String(pickMeta(internalPath, locale)?.title || '').split('|')[0].trim();
  return first || null;
}

function childRoutes(prefix) {
  return Object.keys(ROUTE_META).filter(
    (key) => key.startsWith(`${prefix}/`)
  );
}

// ── Site geneli düğümler ─────────────────────────────────────────────────────

export function buildOrganizationNode(siteUrl, locale = 'ro') {
  const base = trimSlash(siteUrl);
  const description = pickMeta('/', locale)?.description;

  return {
    '@type': 'Organization',
    '@id': orgId(siteUrl),
    name: ORG.name,
    alternateName: ORG.alternateName,
    url: `${base}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${base}${ORG.logoPath}`,
    },
    description,
    legalName: ORG.legalName,
    parentOrganization: { '@type': 'Organization', name: ORG.parentName },
    areaServed: ['RO', 'EU'],
    foundingDate: ORG.foundingDate,
    email: ORG.emails.general,
    telephone: ORG.telephone,
    knowsAbout: [
      'Industrial software',
      'Industrial automation',
      'Industrial IoT (IIoT)',
      'Machine vision',
      'Traceability',
      'Industrial AI and machine learning',
      'Manufacturing execution systems (MES)',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: ORG.emails.general,
        telephone: ORG.telephone,
        availableLanguage: ['Romanian', 'English', 'Turkish'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: ORG.emails.sales,
        availableLanguage: ['Romanian', 'English', 'Turkish'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: ORG.emails.support,
        availableLanguage: ['Romanian', 'English', 'Turkish'],
      },
    ],
    location: ORG.offices.map((office) => ({
      '@type': 'Place',
      name: office.name,
      hasMap: office.mapsUrl,
      address: { '@type': 'PostalAddress', ...office.address },
    })),
    sameAs: ORG.sameAs,
  };
}

export function buildWebsiteNode(siteUrl) {
  const base = trimSlash(siteUrl);

  return {
    '@type': 'WebSite',
    '@id': websiteId(siteUrl),
    name: ORG.name,
    url: `${base}/`,
    inLanguage: Object.values(LOCALE_TAG),
    publisher: { '@id': orgId(siteUrl) },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${base}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ── Sayfa düğümleri ──────────────────────────────────────────────────────────

/** Ana sayfa > ... > bu sayfa. Var olmayan ara sayfalar (ör. /yasal) atlanır. */
export function buildBreadcrumbNode({ crumbs, pageUrl }) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

function buildRouteCrumbs(internalPath, locale, siteUrl) {
  const crumbs = [{ name: HOME_LABEL[locale], url: absoluteUrl('/', locale, siteUrl) }];
  const segments = internalPath.split('/').filter(Boolean);

  let current = '';
  for (const segment of segments) {
    current += `/${segment}`;
    const label = pageLabel(current, locale);
    if (label) {
      crumbs.push({ name: label, url: absoluteUrl(current, locale, siteUrl) });
    }
  }

  return crumbs;
}

/**
 * Bir sayfa için JSON-LD düğümleri (WebPage türevi + BreadcrumbList + varsa
 * Service / SoftwareApplication / ItemList). ROUTE_META'da olmayan sayfalarda [].
 */
export function buildPageNodes({ pathname, siteUrl }) {
  const locale = detectLocale(pathname);
  const internalPath = normalizePath(toInternalPath(pathname, locale));
  const meta = pickMeta(internalPath, locale);

  if (!meta || NO_PAGE_NODE.has(internalPath)) return [];

  const pageUrl = absoluteUrl(internalPath, locale, siteUrl);
  const name = pageLabel(internalPath, locale) || ORG.name;
  const isHome = internalPath === '/';
  const type = PAGE_TYPE[internalPath] || 'WebPage';

  const webPage = {
    '@type': type,
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: isHome ? meta.title : name,
    description: meta.description,
    inLanguage: LOCALE_TAG[locale],
    isPartOf: { '@id': websiteId(siteUrl) },
  };

  const nodes = [webPage];

  if (isHome || internalPath === '/kurumsal/bizi-taniyin' || internalPath === '/iletisim') {
    webPage.about = { '@id': orgId(siteUrl) };
  }
  if (internalPath === '/iletisim') {
    webPage.mainEntity = { '@id': orgId(siteUrl) };
  }

  if (!isHome) {
    const crumbs = buildRouteCrumbs(internalPath, locale, siteUrl);
    nodes.push(buildBreadcrumbNode({ crumbs, pageUrl }));
    webPage.breadcrumb = { '@id': `${pageUrl}#breadcrumb` };
  }

  // Hizmet detay sayfaları → Service
  if (internalPath.startsWith('/hizmetler/')) {
    const service = {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name,
      serviceType: name,
      description: meta.description,
      url: pageUrl,
      provider: { '@id': orgId(siteUrl) },
      inLanguage: LOCALE_TAG[locale],
    };
    nodes.push(service);
    webPage.mainEntity = { '@id': service['@id'] };
  }

  // OnSuite → SoftwareApplication
  if (internalPath === '/onsuite') {
    const app = {
      '@type': 'SoftwareApplication',
      '@id': `${pageUrl}#software`,
      name: 'OnSuite',
      applicationCategory: 'BusinessApplication',
      description: meta.description,
      url: pageUrl,
      publisher: { '@id': orgId(siteUrl) },
      creator: { '@id': orgId(siteUrl) },
      inLanguage: LOCALE_TAG[locale],
    };
    nodes.push(app);
    webPage.mainEntity = { '@id': app['@id'] };
  }

  // Listeleme sayfaları → ItemList (hizmetler, sektörler)
  if (internalPath === '/hizmetler' || internalPath === '/sektorler') {
    const items = childRoutes(internalPath)
      .map((route) => ({ route, label: pageLabel(route, locale) }))
      .filter((item) => item.label);

    webPage.mainEntity = {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        url: absoluteUrl(item.route, locale, siteUrl),
      })),
    };
  }

  // Sektör detay sayfaları: sayfanın konusu
  if (internalPath.startsWith('/sektorler/')) {
    webPage.about = { '@type': 'Thing', name };
  }

  return nodes;
}

/** Layout için: site geneli + sayfa düğümlerini tek @graph olarak döndürür. */
export function buildSiteGraph({ pathname, siteUrl }) {
  const locale = detectLocale(pathname);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationNode(siteUrl, locale),
      buildWebsiteNode(siteUrl),
      ...buildPageNodes({ pathname, siteUrl }),
    ],
  };
}

// ── Blog yazısı ──────────────────────────────────────────────────────────────

/**
 * Strapi'deki serbest metin tarihi ("11-2018", "Mayıs 2024", "2024-05-10")
 * ISO 8601 tam tarihe (YYYY-AA-GG) çevirir. Google tam tarih bekler; kayıtta yalnızca
 * ay/yıl varsa ayın 1'i kullanılır (gün bilgisi sitede yoktur).
 */
export function toIsoDate(timeMs, rawDate) {
  if (!timeMs) return undefined;
  const d = new Date(timeMs);
  if (Number.isNaN(d.getTime())) return undefined;

  // Ham değerde tam gün varsa (YYYY-MM-DD) onu koru
  const full = String(rawDate || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (full) return `${full[1]}-${full[2]}-${full[3]}`;

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}-01`;
}

export function buildBlogPostingGraph({ post, locale, siteUrl, postUrl, blogUrl, isoDate }) {
  const isOrgAuthor = !post.author || /siskon/i.test(post.author);
  const wordCount = post.content
    ? String(post.content).split(/\s+/).filter(Boolean).length
    : undefined;

  const posting = {
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    url: postUrl,
    headline: String(post.title || '').slice(0, 110),
    description: post.excerpt || undefined,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: isoDate,
    author: isOrgAuthor
      ? { '@id': orgId(siteUrl) }
      : { '@type': 'Person', name: post.author },
    publisher: { '@id': orgId(siteUrl) },
    articleSection: post.category || undefined,
    inLanguage: LOCALE_TAG[locale],
    isPartOf: { '@type': 'Blog', '@id': blogUrl, url: blogUrl },
    wordCount,
  };

  const crumbs = [
    { name: HOME_LABEL[locale], url: absoluteUrl('/', locale, siteUrl) },
    { name: pageLabel('/blog', locale) || 'Blog', url: blogUrl },
    { name: post.title, url: postUrl },
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [posting, buildBreadcrumbNode({ crumbs, pageUrl: postUrl })],
  };
}
