import { strapiGet } from '../client.js';
import { extractMediaUrl } from '../mediaUrl.js';
import trFallback from '../../../messages/kurumsal/surdurulebilirlik/tr.json';
import enFallback from '../../../messages/kurumsal/surdurulebilirlik/en.json';
import roFallback from '../../../messages/kurumsal/surdurulebilirlik/ro.json';

const FALLBACKS = { tr: trFallback, en: enFallback, ro: roFallback };

const DEFAULT_IMAGES = {
  introImage: '/assets/new/kurumsal/surdurebilirlik/Asset40-100.jpg',
  journeyIcon: '/assets/new/kurumsal/surdurebilirlik/Asset45.svg',
  futureImage: '/assets/new/kurumsal/surdurebilirlik/asset-47-100.jpg',
  dividerGlobal: '/assets/new/kurumsal/surdurebilirlik/Asset40.svg',
  dividerForest: '/assets/new/kurumsal/surdurebilirlik/Asset42.svg',
  dividerManagement: '/assets/new/kurumsal/surdurebilirlik/Asset41.svg',
  dividerGrowth: '/assets/new/kurumsal/surdurebilirlik/Asset43.svg',
  dividerContinuity: '/assets/new/kurumsal/surdurebilirlik/Asset44.svg',
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
function normalizeSustainabilityData(raw) {
  if (!raw) return null;
  const d = attrs(raw);

  const hero = attrs(d.hero);
  const intro = attrs(d.intro);
  const journey = attrs(d.journey);
  const future = attrs(d.future);
  const cta = attrs(d.cta);

  return {
    // ── Hero ────────────────────────────────────────────────────────
    pageTitle: hero.title ?? d.pageTitle,
    pageSubtitle: hero.subtitle ?? d.pageSubtitle,
    breadcrumbHome: hero.breadcrumbHome ?? d.breadcrumbHome,
    breadcrumbCorporate: hero.breadcrumbCorporate ?? d.breadcrumbCorporate,
    breadcrumbSustainability: hero.breadcrumbSustainability ?? d.breadcrumbSustainability,
    breadcrumbs: [
      hero.breadcrumbHome ?? d.breadcrumbHome,
      hero.breadcrumbCorporate ?? d.breadcrumbCorporate,
      hero.breadcrumbSustainability ?? d.breadcrumbSustainability,
    ].filter(Boolean),

    // ── Intro ───────────────────────────────────────────────────────
    introEyebrow: intro.eyebrow ?? d.introEyebrow ?? '',
    introText: intro.text ?? d.introText ?? '',
    introImage: extractMediaUrl(intro.image ?? d.introImage, DEFAULT_IMAGES.introImage),

    // ── Journey (Yolculuk & Zaman Çizelgesi) ─────────────────────────
    journeyTitle: journey.title ?? d.journeyTitle,
    journeySubtitle: journey.subtitle ?? d.journeySubtitle,
    journeySubtitle2: journey.subtitle2 ?? d.journeySubtitle2,
    journeyDesc: journey.desc ?? d.journeyDesc,
    journeyIcon: extractMediaUrl(journey.icon ?? d.journeyIcon, DEFAULT_IMAGES.journeyIcon),
    summaryText: journey.summaryText ?? d.summaryText,

    year2000Title: journey.year2000Title ?? d.year2000Title,
    year2000Desc: journey.year2000Desc ?? d.year2000Desc,
    yearsTitle: journey.yearsTitle ?? d.yearsTitle,
    yearsBullet1: journey.yearsBullet1 ?? d.yearsBullet1,
    yearsBullet2: journey.yearsBullet2 ?? d.yearsBullet2,
    yearsBullet3: journey.yearsBullet3 ?? d.yearsBullet3,
    yearsBullet4: journey.yearsBullet4 ?? d.yearsBullet4,
    yearsBullets: [
      journey.yearsBullet1 ?? d.yearsBullet1,
      journey.yearsBullet2 ?? d.yearsBullet2,
      journey.yearsBullet3 ?? d.yearsBullet3,
      journey.yearsBullet4 ?? d.yearsBullet4,
    ].filter(Boolean),
    yearsConclusion: journey.yearsConclusion ?? d.yearsConclusion,

    year2022Title: journey.year2022Title ?? d.year2022Title,
    year2022Desc: journey.year2022Desc ?? d.year2022Desc,
    year2023Title: journey.year2023Title ?? d.year2023Title,
    year2023Desc: journey.year2023Desc ?? d.year2023Desc,
    year2024Title: journey.year2024Title ?? d.year2024Title,
    year2024Desc: journey.year2024Desc ?? d.year2024Desc,

    todayTitle: journey.todayTitle ?? d.todayTitle,
    todayBullet1: journey.todayBullet1 ?? d.todayBullet1,
    todayBullet2: journey.todayBullet2 ?? d.todayBullet2,
    todayBullet3: journey.todayBullet3 ?? d.todayBullet3,
    todayBullet4: journey.todayBullet4 ?? d.todayBullet4,
    todayBullets: [
      journey.todayBullet1 ?? d.todayBullet1,
      journey.todayBullet2 ?? d.todayBullet2,
      journey.todayBullet3 ?? d.todayBullet3,
      journey.todayBullet4 ?? d.todayBullet4,
    ].filter(Boolean),
    todayConclusion: journey.todayConclusion ?? d.todayConclusion,

    // ── Geleceğe Bakış (Future) ─────────────────────────────────────
    futureTitle: future.title ?? d.futureTitle,
    futureSubtitle: future.subtitle ?? d.futureSubtitle,
    futureTagline: future.tagline ?? d.futureTagline,
    futureDesc: future.desc ?? d.futureDesc,
    futureImage: extractMediaUrl(future.image ?? d.futureImage, DEFAULT_IMAGES.futureImage),

    // ── CTA ─────────────────────────────────────────────────────────
    ctaTitle: cta.title ?? d.ctaTitle,
    ctaDescription: cta.description ?? d.ctaDescription,
    ctaButton: cta.buttonText ?? cta.button ?? d.ctaButton,
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
  'populate[hero]=*&populate[intro][populate]=*&populate[journey][populate]=*&populate[future][populate]=*&populate[cta]=*';

/**
 * Sürdürülebilirlik sayfası içeriğini Strapi'den çeker.
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getSustainabilityPage(locale = 'ro') {
  const fallback = { ...DEFAULT_IMAGES, ...(FALLBACKS[locale] ?? FALLBACKS.ro) };

  try {
    let res = await strapiGet(`sustainability-page?locale=${locale}&${POPULATE_QUERY}`);
    if (!res || (!res.data && !res.attributes)) {
      res = await strapiGet(`sustainability-page?locale=${locale}&populate=deep`);
    }

    if (!res) return fallback;

    const raw = Array.isArray(res.data) ? res.data[0] : (res.data ?? res);
    const normalized = normalizeSustainabilityData(raw);

    if (!normalized) return fallback;

    return mergeWithFallback(normalized, fallback);
  } catch (error) {
    console.error('[Strapi] getSustainabilityPage error:', error?.message ?? error);
    return fallback;
  }
}
