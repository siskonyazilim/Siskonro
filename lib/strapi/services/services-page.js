import { strapiGet } from '../client.js';
import trFallback from '../../../messages/servicesPage/tr.json';
import enFallback from '../../../messages/servicesPage/en.json';
import roFallback from '../../../messages/servicesPage/ro.json';

const FALLBACKS = { tr: trFallback, en: enFallback, ro: roFallback };

/**
 * Strapi v4 / v5 veri yapısını düzleştirir.
 */
function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Strapi verisini standart sayfa yapısına normalize eder.
 */
function normalizeServicesPageData(raw) {
  if (!raw) return null;
  const d = attrs(raw);

  const hero = attrs(d.hero);
  const intro = attrs(d.intro);
  const list = attrs(d.list);
  const methodology = attrs(d.methodology);
  const cta = attrs(d.cta);

  return {
    pageTitle: hero.pageTitle ?? d.pageTitle,
    pageSubtitle: hero.pageSubtitle ?? d.pageSubtitle,
    breadcrumbHome: hero.breadcrumbHome ?? d.breadcrumbHome,
    breadcrumbServices: hero.breadcrumbServices ?? d.breadcrumbServices,

    solutionPartnerEyebrow: intro.solutionPartnerEyebrow ?? d.solutionPartnerEyebrow,
    solutionPartnerTitle: intro.solutionPartnerTitle ?? d.solutionPartnerTitle,
    solutionPartnerDesc: intro.solutionPartnerDesc ?? d.solutionPartnerDesc,
    whySiskonTitle: intro.whySiskonTitle ?? d.whySiskonTitle,
    whySiskonItems: intro.whySiskonItems ?? d.whySiskonItems ?? [],

    exploreService: list.exploreService ?? d.exploreService,
    serviceMeta: list.serviceMeta ?? d.serviceMeta ?? [],

    methodologyEyebrow: methodology.methodologyEyebrow ?? d.methodologyEyebrow,
    methodologyTitle: methodology.methodologyTitle ?? d.methodologyTitle,
    methodologyDesc: methodology.methodologyDesc ?? d.methodologyDesc,
    methodologySteps: methodology.methodologySteps ?? d.methodologySteps ?? [],

    ctaTitle: cta.ctaTitle ?? d.ctaTitle,
    ctaDesc: cta.ctaDesc ?? d.ctaDesc,
    ctaButton: cta.ctaButton ?? d.ctaButton,
  };
}

/**
 * Strapi verisini fallback JSON ile birleştirir.
 */
function mergeWithFallback(strapiData, fallback) {
  const merged = { ...fallback };
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
  'populate[hero]=*&populate[intro]=*&populate[list]=*&populate[methodology]=*&populate[cta]=*';

/**
 * Hizmetler ana sayfası içeriğini Strapi'den çeker.
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getServicesMainPage(locale = 'ro') {
  const fallback = FALLBACKS[locale] ?? FALLBACKS.ro;

  try {
    let res = await strapiGet(`services-page?locale=${locale}&${POPULATE_QUERY}`);
    if (!res || (!res.data && !res.attributes)) {
      res = await strapiGet(`services-page?locale=${locale}&populate=deep`);
    }

    if (!res) return fallback;

    const raw = Array.isArray(res.data) ? res.data[0] : (res.data ?? res);
    const normalized = normalizeServicesPageData(raw);

    if (!normalized) return fallback;

    return mergeWithFallback(normalized, fallback);
  } catch (error) {
    console.error('[Strapi] getServicesMainPage error:', error?.message ?? error);
    return fallback;
  }
}
