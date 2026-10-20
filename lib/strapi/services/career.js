import { strapiGet } from '../client.js';
import { extractMediaUrl, extractMediaArray } from '../mediaUrl.js';
import trFallback from '../../../messages/kurumsal/kariyer/tr.json';
import enFallback from '../../../messages/kurumsal/kariyer/en.json';
import roFallback from '../../../messages/kurumsal/kariyer/ro.json';

const FALLBACKS = { tr: trFallback, en: enFallback, ro: roFallback };

const DEFAULT_IMAGES = {
  heroBgSvg: '/assets/new/kurumsal/Kariyer/asset-49.svg',
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
function normalizeCareerData(raw) {
  if (!raw) return null;
  const d = attrs(raw);

  const hero = attrs(d.hero);
  const culture = attrs(d.culture);
  const values = attrs(d.values);
  const process = attrs(d.process);
  const finalCta = attrs(d.finalCta);

  return {
    // ── Hero ────────────────────────────────────────────────────────
    pageTitle: hero.pageTitle ?? hero.title ?? d.pageTitle ?? d.title,
    heroTitle: hero.pageTitle ?? hero.title ?? d.pageTitle ?? d.title,
    pageSubtitle: hero.pageSubtitle ?? hero.subtitle ?? d.pageSubtitle,
    heroSubtitle: hero.pageSubtitle ?? hero.subtitle ?? d.pageSubtitle,
    heroLine1: hero.heroLine1 ?? d.heroLine1,
    heroLine2: hero.heroLine2 ?? d.heroLine2,
    heroLine3: hero.heroLine3 ?? d.heroLine3,
    sendCv: hero.sendCvButton ?? hero.sendCv ?? d.sendCv,
    heroCtaLabel: hero.sendCvButton ?? hero.sendCv ?? d.sendCv,
    breadcrumbHome: hero.breadcrumbHome ?? d.breadcrumbHome,
    breadcrumbCorporate: hero.breadcrumbCorporate ?? d.breadcrumbCorporate,
    breadcrumbCareer: hero.breadcrumbCareer ?? d.breadcrumbCareer,
    heroBreadcrumbs: [
      hero.breadcrumbHome ?? d.breadcrumbHome,
      hero.breadcrumbCorporate ?? d.breadcrumbCorporate,
      hero.breadcrumbCareer ?? d.breadcrumbCareer,
    ].filter(Boolean),
    heroBgSvg: extractMediaUrl(hero.bgSvg ?? d.heroBgSvg, DEFAULT_IMAGES.heroBgSvg),

    // ── Kültürümüz (Culture) — yalnızca metinler, görsel yok ─────────
    cultureTitle: culture.title ?? d.cultureTitle,
    cultureSubtitle: culture.subtitle ?? d.cultureSubtitle,
    cultureP1: culture.p1 ?? d.cultureP1,
    cultureP2: culture.p2 ?? d.cultureP2,
    cultureP3: culture.p3 ?? d.cultureP3,
    cultureCallout1: culture.callout1 ?? d.cultureCallout1,
    cultureCallout2: culture.callout2 ?? d.cultureCallout2,

    // ── Değerlerimiz (Values) ───────────────────────────────────────
    valuesTitle: values.title ?? d.valuesTitle,
    valuesSubtitle: values.subtitle ?? d.valuesSubtitle,
    valuesEyebrow: values.eyebrow ?? d.valuesEyebrow ?? '',
    values: (values.items ?? d.values ?? []).map((item) => ({
      title: item.title ?? '',
      desc: item.desc ?? '',
      icon: typeof item.icon === 'object' ? extractMediaUrl(item.icon) : (item.icon ?? ''),
    })),

    // ── İşe Alım Süreci (Process) ───────────────────────────────────
    processTitle: process.title ?? d.processTitle,
    processList: (process.items ?? d.processList ?? []).map((item) => ({
      title: item.title ?? '',
      desc: item.desc ?? '',
      icon: typeof item.icon === 'object' ? extractMediaUrl(item.icon) : (item.icon ?? ''),
    })),

    // ── detailList (top-level component: detail[] → title + icon) ─────────
    detailsList: Array.isArray(d.detailList?.detail)
      ? d.detailList.detail.map((item) => ({
          title: item.title ?? '',
          icon: extractMediaUrl(item.icon) || '',
        }))
      : [],

    // ── Küçük Detaylar başlığı & Son Çağrı (Final CTA) ─────────────────
    detailsTitle: finalCta.detailsTitle ?? d.detailsTitle ?? '',
    finalCtaLine1: finalCta.line1 ?? d.finalCtaLine1,
    finalCtaLine2: finalCta.line2 ?? d.finalCtaLine2,
    finalCtaLine3: finalCta.line3 ?? d.finalCtaLine3,
    finalCtaDesc: finalCta.desc ?? d.finalCtaDesc,
    finalCtaSubtitle: finalCta.subtitle ?? d.finalCtaSubtitle,
    finalCtaButton: finalCta.buttonText ?? finalCta.button ?? d.finalCtaButton,
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
    const isEmptyArray = Array.isArray(val) && val.length === 0;
    if (val !== null && val !== undefined && val !== '' && !isEmptyArray) {
      merged[key] = val;
    }
  }

  return merged;
}

const POPULATE_QUERY =
  'populate[hero][populate]=*&populate[culture]=*&populate[values]=*&populate[process]=*&populate[finalCta]=*&populate[detailList][populate][detail][populate][icon]=true';

/**
 * Kariyer sayfası içeriğini Strapi'den çeker.
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getCareerPage(locale = 'ro') {
  const fallback = { ...DEFAULT_IMAGES, ...(FALLBACKS[locale] ?? FALLBACKS.ro) };

  try {
    let res = await strapiGet(`career-page?locale=${locale}&${POPULATE_QUERY}`);
    if (!res || (!res.data && !res.attributes)) {
      res = await strapiGet(`career-page?locale=${locale}&populate=deep`);
    }

    if (!res) return fallback;

    const raw = Array.isArray(res.data) ? res.data[0] : (res.data ?? res);
    const normalized = normalizeCareerData(raw);

    if (!normalized) return fallback;

    return mergeWithFallback(normalized, fallback);
  } catch (error) {
    console.error('[Strapi] getCareerPage error:', error?.message ?? error);
    return fallback;
  }
}
