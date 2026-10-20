import { strapiGet } from '../client';
import { extractMediaUrl, extractMediaUrlProxied } from '../mediaUrl.js';
import trFallback from '../../../messages/home/tr.json';
import enFallback from '../../../messages/home/en.json';
import roFallback from '../../../messages/home/ro.json';

const FALLBACKS = { tr: trFallback, en: enFallback, ro: roFallback };


// ─── Temel yardımcılar ─────────────────────────────────────────────────────

/**
 * Strapi v4 attributes wrapper'ı soyutlar.
 * Strapi v5'te attributes kaldırıldı — direkt obje gelir.
 */
function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Strapi Media alanını URL string'e dönüştürür.
 *
 * Strapi Media tipi 3 farklı şekilde gelebilir:
 *   1. { url: '/uploads/...' }           → Strapi v5 / populate=*
 *   2. { data: { attributes: { url } } } → Strapi v4
 *   3. '/uploads/...' veya 'https://...' → Zaten string
 *
 * Strapi /uploads/ görselleri → /api/media proxy (Content-Disposition:inline)
 * Lokal /assets/ yolları     → direkt kullan (403 olmaması için)
 * İç Docker hostname'leri    → public URL ile değiştirilir
 */


/**
 * Strapi Media'nın alt text'ini alır (erişilebilirlik için).
 */
function resolveMediaAlt(field, fallbackAlt = '') {
  if (!field || typeof field === 'string') return fallbackAlt;
  return (
    field.alternativeText ||
    field?.data?.attributes?.alternativeText ||
    fallbackAlt
  );
}

/**
 * products[].metrics alanını normalize eder.
 * Strapi'de JSON string olarak saklanabilir, parse edilir.
 */
function parseMetrics(metrics) {
  if (Array.isArray(metrics)) return metrics;
  if (typeof metrics === 'string') {
    try { return JSON.parse(metrics); } catch { return []; }
  }
  return [];
}

// ─── Section normalizer'ları ───────────────────────────────────────────────

/**
 * Hero section normalize eder.
 *
 * Strapi'deki hero component artık locale-aware (localized=true).
 * Tüm locale'ler için Strapi verisi öncelikli, yoksa JSON fallback kullanılır.
 */
function normalizeHero(d, locale) {
  const h = d.hero ?? {};
  const fb = FALLBACKS[locale] ?? FALLBACKS.ro;

  return {
    heroTaglineLine1: h.taglineLine1 ?? d.heroTaglineLine1 ?? fb.heroTaglineLine1,
    heroTaglineLine2: h.taglineLine2 ?? d.heroTaglineLine2 ?? fb.heroTaglineLine2,
    heroTitle:        h.title        ?? d.heroTitle        ?? fb.heroTitle,
    heroDescription:  h.description  ?? d.heroDescription  ?? fb.heroDescription,
    heroCta:          h.ctaButton    ?? d.heroCta          ?? fb.heroCta,
    aboutUsButton:    h.aboutUsButton ?? d.aboutUsButton   ?? fb.aboutUsButton,
  };
}

/**
 * Services section normalize eder.
 * serviceCards içindeki img artık Media veya Short Text olabilir.
 */
function normalizeServices(d, fallbackServices) {
  const s = d.services ?? d.servicesSection ?? {};

  // serviceCards: yeni yapıda s.serviceCards, eski yapıda d.serviceCards
  const rawCards = s.serviceCards ?? d.serviceCards ?? d.services ?? [];

  const serviceCards = Array.isArray(rawCards)
    ? rawCards.map((card) => {
        const fallbackMatch = (fallbackServices ?? []).find((f) => f.href === card.href);
        return {
          num:  card.num  ?? fallbackMatch?.num  ?? '',
          desc: card.desc ?? fallbackMatch?.desc ?? '',
          // img: Media tipi veya Short Text — resolveMediaUrl her ikisini halleder
          img:  extractMediaUrl(card.img) || fallbackMatch?.img || '',
          href: card.href ?? fallbackMatch?.href ?? '',
        };
      })
    : (fallbackServices ?? []);

  return {
    servicesEyebrow:       s.eyebrow            ?? d.servicesEyebrow,
    servicesTitle:         s.title              ?? d.servicesTitle,
    servicesDescription:   s.description        ?? d.servicesDescription,
    allServicesEyebrow:    s.allServicesEyebrow ?? d.allServicesEyebrow,
    allServicesTitle:      s.allServicesTitle   ?? d.allServicesTitle,
    allServicesDescription:s.allServicesDescription ?? d.allServicesDescription,
    allServicesButton:     s.allServicesButton  ?? d.allServicesButton,
    services: serviceCards,
  };
}

/**
 * OnSuite section normalize eder.
 */
function normalizeOnSuite(d, fallbackProducts) {
  const o = d.onSuite ?? d.onSuiteSection ?? {};

  // onSuite.image: Strapi'de doğrudan component'e bağlı Media alanı
  const onSuiteImage = extractMediaUrl(o.image) || null;

  // products: yeni yapıda d.products dizisi olarak kalabilir
  const rawProducts = d.products ?? [];
  const products = Array.isArray(rawProducts)
    ? rawProducts.map((p) => {
        const fp = (fallbackProducts ?? []).find(
          (x) => x.href === p.href || x.title === p.title
        );
        return {
          badge:   p.badge,
          title:   p.title,
          desc:    p.desc,
          // img: Media tipi veya Short Text
          img:     extractMediaUrl(p.img) || fp?.img || '',
          href:    p.href,
          metrics: parseMetrics(p.metrics),
        };
      })
    : (fallbackProducts ?? []);

  return {
    onSuiteSectionTitle:   o.sectionTitle    ?? d.onSuiteSectionTitle,
    onSuiteSectionDesc1:   o.desc1           ?? d.onSuiteSectionDesc1,
    onSuiteSectionDesc2:   o.desc2           ?? d.onSuiteSectionDesc2,
    discoverOnSuiteButton: o.discoverButton  ?? d.discoverOnSuiteButton,
    onSuiteImage,   // Strapi Media: onSuite.image alanından çözümlendi
    products,
  };
}

/**
 * Global Stats section normalize eder.
 * Kıta harita görselleri Media tipinden çözümlenir.
 */
function normalizeGlobalStats(d, fallbackStats) {
  const g = d.globalStats ?? d.globalSection ?? {};

  const rawStats = g.stats ?? d.stats;
  const stats = Array.isArray(rawStats)
    ? rawStats.map((s) => {
        // Strapi'den number (40) veya string ("40+") gelebilir
        const raw = s.num;
        let numStr;
        if (typeof raw === 'number') {
          // Yıl değerleri (1990-2030 arası) → suffix yok: "1997"
          // Diğerleri → "+" suffix ekle: 40 → "40+"
          const isYear = raw >= 1990 && raw <= 2030;
          numStr = isYear ? String(raw) : `${raw}+`;
        } else {
          numStr = String(raw ?? '');
        }
        return { num: numStr, label: s.label };
      })
    : (fallbackStats ?? []);


  // continents: yeni yapıda g.continents component, eski yapıda d.continents obje
  const raw = g.continents ?? d.continents ?? {};

  // Kıta harita görsellerini Media'dan çöz, yoksa public/assets fallback
  const continentMaps = {
    europe: {
      label: g.europeLabel ?? d.europeLabel ?? 'Avrupa',
      src:   extractMediaUrlProxied(raw.europeMap)    ?? '/assets/new/map/web_avrupa.svg',
    },
    africa: {
      label: g.africaLabel ?? d.africaLabel ?? 'Afrika',
      src:   extractMediaUrlProxied(raw.africaMap)    ?? '/assets/new/map/web_afrika.svg',
    },
    asia: {
      label: g.asiaLabel ?? d.asiaLabel ?? 'Asya',
      src:   extractMediaUrlProxied(raw.asiaMap)      ?? '/assets/new/map/web_asya.svg',
    },
    northAmerica: {
      label: g.northAmericaLabel ?? d.northAmericaLabel ?? 'Kuzey Amerika',
      src:   extractMediaUrlProxied(raw.northAmericaMap) ?? '/assets/new/map/web_k.amerika.svg',
    },
    southAmerica: {
      label: g.southAmericaLabel ?? d.southAmericaLabel ?? 'Güney Amerika',
      src:   extractMediaUrlProxied(raw.southAmericaMap) ?? '/assets/new/map/web_g.amerika.svg',
    },
  };
  const defaultMapSrc   = extractMediaUrlProxied(raw.defaultMap   ?? g.defaultMap)   ?? '/assets/new/map/world2.svg';
  const legendImageSrc  = extractMediaUrlProxied(raw.legendImage  ?? g.legendImage)  ?? '/assets/new/map/renk_kartela_white.svg';

  // Geriye dönük uyumluluk: components eski continents objesini de okur
  const continents = {
    europe:       continentMaps.europe.label,
    africa:       continentMaps.africa.label,
    asia:         continentMaps.asia.label,
    northAmerica: continentMaps.northAmerica.label,
    southAmerica: continentMaps.southAmerica.label,
  };

  return {
    globalEyebrow:         g.eyebrow         ?? d.globalEyebrow,
    globalTitle:           g.title           ?? d.globalTitle,
    globalDescription:     g.description     ?? d.globalDescription,
    globalProjectsEyebrow: g.projectsEyebrow ?? d.globalProjectsEyebrow ?? d.globalDescriptionEyebrow,
    countriesLabel:        g.countriesLabel  ?? d.countriesLabel,
    factoriesLabel:        g.factoriesLabel  ?? d.factoriesLabel,
    legendAlt:             g.legendAlt       ?? d.legendAlt,
    defaultMapAlt:         g.defaultMapAlt   ?? d.defaultMapAlt,
    stats,
    continents,       // label'lar (geriye dönük uyumluluk)
    continentMaps,    // { europe: { label, src }, africa: { label, src }, ... }
    defaultMapSrc,    // Dünya haritası SVG URL
    legendImageSrc,   // Renk kartelası SVG URL
  };
}

/**
 * References section normalize eder.
 * logo artık Media veya Short Text olabilir.
 */
function normalizeReferences(d, fallbackRefs) {
  const r = d.references ?? d.referencesSection ?? {};

  // items: yeni yapıda r.items, eski yapıda d.references (dizi)
  const rawItems = Array.isArray(r) ? r : (r.items ?? []);

  const items = rawItems.map((item) => {
    const fallbackMatch = (fallbackRefs ?? []).find(
      (f) => f.name?.trim().toUpperCase() === item.name?.trim().toUpperCase()
    );
    return {
      name: item.name ?? '',
      // logo: Media tipi veya Short Text — resolveMediaUrl halleder
      logo: extractMediaUrl(item.logo) || fallbackMatch?.logo || '',
    };
  });

  return {
    referencesEyebrow: r.eyebrow ?? d.referencesEyebrow,
    referencesTitle:   r.title   ?? d.referencesTitle ?? '',
    referencesButton:  r.button  ?? d.referencesButton,
    references: items.length > 0 ? items : (fallbackRefs ?? []),
  };
}

/**
 * CTA section normalize eder.
 */
function normalizeCta(d) {
  const c = d.cta ?? d.ctaSection ?? {};
  return {
    ctaTitle:       c.title       ?? d.ctaTitle,
    ctaDescription: c.description ?? d.ctaDescription,
    ctaButton:      c.button      ?? d.ctaButton,
  };
}

// ─── Ana normalizer ────────────────────────────────────────────────────────

/**
 * Strapi raw verisini uygulama veri yapısına normalize eder.
 *
 * Hem YENİ component yapısını (d.hero.title) hem ESKİ düz yapıyı (d.heroTitle) destekler.
 * Bu sayede Strapi geçiş süreci boyunca site çalışmaya devam eder.
 */
function normalizeHomeData(raw, fallback, locale) {
  if (!raw) return null;
  const d = attrs(raw);

  return {
    ...normalizeHero(d, locale),
    ...normalizeServices(d, fallback?.services),
    ...normalizeOnSuite(d, fallback?.products),
    ...normalizeGlobalStats(d, fallback?.stats),
    ...normalizeReferences(d, fallback?.references),
    ...normalizeCta(d),

    // Genel alanlar
    exploreDetails:      d.exploreDetails      ?? fallback?.exploreDetails,
    exploreDetailsLabel: d.exploreDetailsLabel ?? fallback?.exploreDetailsLabel,
    imageUnavailable:    d.imageUnavailable    ?? fallback?.imageUnavailable,

    // Ürünler (OnSuite)
    productsEyebrow:     d.productsEyebrow     ?? fallback?.productsEyebrow,
    productsTitle:       d.productsTitle       ?? fallback?.productsTitle,
    productsDescription: d.productsDescription ?? fallback?.productsDescription,
    allProductsButton:   d.allProductsButton   ?? fallback?.allProductsButton,
  };
}

// ─── Ana servis fonksiyonu ─────────────────────────────────────────────────

/**
 * Home sayfası içeriğini Strapi'den çeker (tag-based ISR).
 * Strapi erişilemezse veya hata olursa JSON fallback devreye girer.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getHomePage(locale = 'ro') {
  const fallback = FALLBACKS[locale] ?? FALLBACKS.ro;

  try {
    const res = await strapiGet(
      [
        `home-page?locale=${locale}`,
        // ── Yeni component yapısı ──────────────────────────────────────
        'populate[hero][fields]=*',

        // Services section + serviceCards + img (Media)
        'populate[services][fields]=*',
        'populate[services][populate][serviceCards][fields]=*',
        'populate[services][populate][serviceCards][populate][img][fields]=url,alternativeText',

        // OnSuite section + görsel
        'populate[onSuite][fields]=*',
        'populate[onSuite][populate][image][fields]=url,alternativeText',

        // Global Stats + stats dizisi + continents (harita görselleriyle)
        'populate[globalStats][fields]=*',
        'populate[globalStats][populate][stats][fields]=*',
        'populate[globalStats][populate][continents][fields]=*',
        'populate[globalStats][populate][continents][populate][europeMap][fields]=url,alternativeText',
        'populate[globalStats][populate][continents][populate][africaMap][fields]=url,alternativeText',
        'populate[globalStats][populate][continents][populate][asiaMap][fields]=url,alternativeText',
        'populate[globalStats][populate][continents][populate][northAmericaMap][fields]=url,alternativeText',
        'populate[globalStats][populate][continents][populate][southAmericaMap][fields]=url,alternativeText',
        'populate[globalStats][populate][continents][populate][defaultMap][fields]=url,alternativeText',
        'populate[globalStats][populate][continents][populate][legendImage][fields]=url,alternativeText',

        // References section + logo (Media)
        'populate[references][fields]=*',
        'populate[references][populate][items][fields]=*',
        'populate[references][populate][items][populate][logo][fields]=url,alternativeText',

        // CTA section
        'populate[cta][fields]=*',

        // ── Eski düz yapı populate satırları kaldırıldı ────────────────
        // serviceCards, stats, continents, products artık şemada yok.
        // Yeni yapı: hero, services, onSuite, globalStats, references, cta

      ].join('&'),
      { tags: ['home-page'], revalidate: 3600 }
    );

    if (!res) return fallback;

    const raw = res.data ?? res;
    const normalized = normalizeHomeData(raw, fallback, locale);

    if (!normalized) return fallback;

    return mergeWithFallback(normalized, fallback);
  } catch (error) {
    console.error('[Strapi] getHomePage error:', error?.message ?? error);
    return fallback;
  }
}

/**
 * Strapi'de boş/null olan alanları JSON fallback'ten tamamlar.
 */
function mergeWithFallback(strapiData, fallback) {
  const merged = { ...fallback };
  for (const key of Object.keys(strapiData)) {
    const val = strapiData[key];
    if (val !== null && val !== undefined && val !== '') {
      merged[key] = val;
    }
  }
  return merged;
}
