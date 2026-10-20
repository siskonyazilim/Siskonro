import { strapiGet } from '../client.js';
import { extractMediaUrl } from '../mediaUrl.js';
import trFallback from '../../../messages/onSuitePage/tr.json';
import enFallback from '../../../messages/onSuitePage/en.json';
import roFallback from '../../../messages/onSuitePage/ro.json';

const FALLBACKS = { tr: trFallback, en: enFallback, ro: roFallback };

const DEFAULT_IMAGES = {
  logo: '/assets/new/common/onsuite-logo.svg',
  productImage: '/assets/new/urunler/onsuite/OnsuiteNew.webp',
  desktopImage: '/assets/new/urunler/onsuite/OnsuiteDesktop.webp',
};

/**
 * Strapi v4 / v5 veri yapısını düzleştirir.
 */
function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Strapi verisini standart sayfa yapısına normalize eder.
 */
function normalizeOnsuiteData(raw) {
  if (!raw) return null;
  const d = attrs(raw);

  const hero = attrs(d.hero);
  const intro = attrs(d.intro);
  const modules = attrs(d.modules);
  const gains = attrs(d.gains);
  const architecture = attrs(d.architecture);
  const technical = attrs(d.technical);
  const cta = attrs(d.cta);

  return {
    // ── Hero ────────────────────────────────────────────────────────
    heroTitle: hero.heroTitle ?? d.heroTitle,
    heroSubtitle: hero.heroSubtitle ?? d.heroSubtitle,
    breadcrumbHome: hero.breadcrumbHome ?? d.breadcrumbHome,
    breadcrumbProducts: hero.breadcrumbProducts ?? d.breadcrumbProducts,
    breadcrumbOnSuite: hero.breadcrumbOnSuite ?? d.breadcrumbOnSuite,
    logo: extractMediaUrl(hero.logo ?? d.logo, DEFAULT_IMAGES.logo),

    // ── Intro (Ürün Tanıtımı) ───────────────────────────────────────
    productBadge: intro.productBadge ?? d.productBadge,
    productDetailDesc: intro.productDetailDesc ?? d.productDetailDesc,
    buttonText: intro.buttonText ?? d.buttonText,
    buttonUrl: intro.buttonUrl ?? d.buttonUrl,
    productImage: extractMediaUrl(intro.productImage ?? d.productImage, DEFAULT_IMAGES.productImage),

    // ── Modüller (Modules) ──────────────────────────────────────────
    modulesEyebrow: modules.modulesEyebrow ?? d.modulesEyebrow,
    modulesTitle: modules.modulesTitle ?? d.modulesTitle,
    modulesDesc: modules.modulesDesc ?? d.modulesDesc,
    viewAllModules: modules.viewAllModules ?? d.viewAllModules,
    showLessModules: modules.showLessModules ?? d.showLessModules,
    moduleOverviewLabel: modules.moduleOverviewLabel ?? d.moduleOverviewLabel,
    exploreSolutionButton: modules.exploreSolutionButton ?? d.exploreSolutionButton,
    modules: modules.modulesList ?? modules.modules ?? d.modules ?? [],

    // ── Kazanımlar (Gains) ──────────────────────────────────────────
    gainsEyebrow: gains.gainsEyebrow ?? d.gainsEyebrow,
    gainsTitleMain: gains.gainsTitleMain ?? d.gainsTitleMain,
    viewAllGains: gains.viewAllGains ?? d.viewAllGains,
    showLessGains: gains.showLessGains ?? d.showLessGains,
    gainItems: gains.gainItems ?? d.gainItems ?? [],
    desktopImage: extractMediaUrl(gains.desktopImage ?? d.desktopImage, DEFAULT_IMAGES.desktopImage),

    // ── Mimari & Teknoloji (Architecture) ───────────────────────────
    architectureEyebrow: architecture.architectureEyebrow ?? d.architectureEyebrow,
    architectureTitleMain: architecture.architectureTitleMain ?? d.architectureTitleMain,
    architectureItems: architecture.architectureItems ?? d.architectureItems ?? [],

    // ── Teknik Kabiliyetler (Technical) ─────────────────────────────
    technicalEyebrow: technical.technicalEyebrow ?? d.technicalEyebrow,
    technicalTitleMain: technical.technicalTitleMain ?? d.technicalTitleMain,
    technicalCards: technical.technicalCards ?? d.technicalCards ?? [],

    // ── CTA ─────────────────────────────────────────────────────────
    ctaTitleMain: cta.ctaTitleMain ?? d.ctaTitleMain,
    ctaDescMain: cta.ctaDescMain ?? d.ctaDescMain,
    ctaButtonMain: cta.ctaButtonMain ?? d.ctaButtonMain,
  };
}

/**
 * Strapi verisini fallback JSON ile birleştirir.
 */
function mergeWithFallback(strapiData, fallback) {
  const merged = { ...DEFAULT_IMAGES, ...fallback };
  if (!strapiData) return merged;

  for (const key of Object.keys(strapiData)) {
    const val = strapiData[key];
    if (val !== null && val !== undefined && val !== '') {
      merged[key] = val;
    }
  }

  return merged;
}

const POPULATE_QUERY =
  'populate[hero][populate]=*&populate[intro][populate]=*&populate[modules]=*&populate[gains][populate]=*&populate[architecture]=*&populate[technical]=*&populate[cta]=*';

/**
 * OnSuite sayfası içeriğini Strapi'den çeker.
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getOnsuitePage(locale = 'ro') {
  const fallback = { ...DEFAULT_IMAGES, ...(FALLBACKS[locale] ?? FALLBACKS.ro) };

  try {
    let res = await strapiGet(`onsuite-page?locale=${locale}&${POPULATE_QUERY}`);
    if (!res || (!res.data && !res.attributes)) {
      res = await strapiGet(`onsuite-page?locale=${locale}&populate=deep`);
    }

    if (!res) return fallback;

    const raw = Array.isArray(res.data) ? res.data[0] : (res.data ?? res);
    const normalized = normalizeOnsuiteData(raw);

    if (!normalized) return fallback;

    return mergeWithFallback(normalized, fallback);
  } catch (error) {
    console.error('[Strapi] getOnsuitePage error:', error?.message ?? error);
    return fallback;
  }
}
