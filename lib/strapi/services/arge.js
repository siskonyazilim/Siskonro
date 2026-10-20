import { strapiGet } from '../client.js';
import { extractMediaUrl } from '../mediaUrl.js';
import trFallback from '../../../messages/rdPage/tr.json';
import enFallback from '../../../messages/rdPage/en.json';
import roFallback from '../../../messages/rdPage/ro.json';

const FALLBACKS = { tr: trFallback, en: enFallback, ro: roFallback };

// Varsayılan Görsel Fallback Yolları
const DEFAULT_IMAGES = {
  engineeringImage: '/assets/new/arge/arge2.svg',
  journeyImage: '/assets/new/arge/siskon-6-arge-gorsel-1.webp',
  patentsImage: '/assets/new/arge/arge1.svg',
  ecosystemImage: '/assets/new/arge/siskon-6-arge-gorsel-2.webp',
  cultureImage: '/assets/new/arge/siskon-6-arge-gorsel-3.webp',
  innovationBgImage: '/assets/new/arge/main_lines.svg',
};

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Strapi v4 / v5 veri yapısını düzleştirir.
 */
function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}


/**
 * Strapi'den gelen repeatable component veya düz string dizilerini normalize eder.
 */
function normArray(arr) {
  if (!Array.isArray(arr)) return null;
  return arr
    .map((item) => {
      if (typeof item === 'string') return item;
      return item?.Text ?? item?.text ?? item?.title ?? item?.name ?? item?.value ?? null;
    })
    .filter(Boolean);
}

/**
 * Strapi'den gelen veriyi normalize ederek standart sayfa yapısına dönüştürür.
 * Görsel alanlarını da otomatik extractMediaUrl ile çözer.
 */
function normalizeArgeData(raw) {
  if (!raw) return null;
  const d = attrs(raw);

  // Component referansları
  const hero = attrs(d.hero);
  const engineering = attrs(d.engineering);
  const journey = attrs(d.journey);
  const patents = attrs(d.patents);
  const ecosystem = attrs(d.ecosystem);
  const culture = attrs(d.culture);
  const innovation = attrs(d.innovationApproach ?? d.innovation_approach ?? d.innovation);
  const cta = attrs(d.ctaSection ?? d.cta_section ?? d.cta);

  return {
    // ── Hero ────────────────────────────────────────────────────────
    pageTitle: hero.title ?? d.pageTitle,
    pageSubtitle: hero.subtitle ?? d.pageSubtitle,
    breadcrumbHome: hero.breadcrumbHome ?? d.breadcrumbHome,
    breadcrumbRD: hero.breadcrumbRD ?? d.breadcrumbRD,

    // ── Mühendislik (Engineering) ──────────────────────────────────
    engineeringTitle: engineering.title ?? d.engineeringTitle,
    engineeringDesc1: engineering.desc1 ?? d.engineeringDesc1,
    engineeringDesc2: engineering.desc2 ?? d.engineeringDesc2,
    engineeringDesc3: engineering.desc3 ?? d.engineeringDesc3,
    engineeringCta: engineering.cta ?? d.engineeringCta,
    engineeringImage: extractMediaUrl(engineering.image ?? d.engineeringImage, DEFAULT_IMAGES.engineeringImage),

    // ── AR-GE Yolculuğu (Journey) ──────────────────────────────────
    journeyEyebrow: journey.eyebrow ?? d.journeyEyebrow,
    journeyTitle: journey.title ?? d.journeyTitle,
    journeyLead1: journey.lead1 ?? d.journeyLead1,
    journeyLead2: journey.lead2 ?? d.journeyLead2,
    journeyOutro: journey.outro ?? d.journeyOutro,
    journeyImage: extractMediaUrl(journey.image ?? d.journeyImage, DEFAULT_IMAGES.journeyImage),

    // Journey Maddeleri
    journeyArea1Title: journey.area1 ?? journey.area1Title ?? d.journeyArea1Title,
    journeyArea2Title: journey.area2 ?? journey.area2Title ?? d.journeyArea2Title,
    journeyArea3Title: journey.area3 ?? journey.area3Title ?? d.journeyArea3Title,
    journeyArea4Title: journey.area4 ?? journey.area4Title ?? d.journeyArea4Title,
    journeyAreas: normArray(journey.areas ?? journey.items) ?? normArray(d.journeyAreas),

    // ── Patentler (Patents) ────────────────────────────────────────
    patentsEyebrow: patents.eyebrow ?? d.patentsEyebrow,
    patentsTitle: patents.title ?? d.patentsTitle,
    patentsLead: patents.lead ?? d.patentsLead,
    patentsImage: extractMediaUrl(patents.image ?? d.patentsImage, DEFAULT_IMAGES.patentsImage),

    // ── Ekosistem & İş Birlikleri (Ecosystem) ──────────────────────
    ecosystemEyebrow: ecosystem.eyebrow ?? d.ecosystemEyebrow,
    ecosystemTitle: ecosystem.title ?? d.ecosystemTitle,
    ecosystemLead1: ecosystem.lead1 ?? d.ecosystemLead1,
    ecosystemLead2: ecosystem.lead2 ?? d.ecosystemLead2,
    focusBoxHeader: ecosystem.focusBoxHeader ?? d.focusBoxHeader,
    ecosystemImage: extractMediaUrl(ecosystem.image ?? d.ecosystemImage, DEFAULT_IMAGES.ecosystemImage),

    // Focus Maddeleri
    focus1: ecosystem.focus1 ?? d.focus1,
    focus2: ecosystem.focus2 ?? d.focus2,
    focus3: ecosystem.focus3 ?? d.focus3,
    focus4: ecosystem.focus4 ?? d.focus4,
    collaborationFocus: normArray(ecosystem.focusAreas ?? ecosystem.items) ?? normArray(d.collaborationFocus),

    // ── AR-GE Kültürü (Culture) ────────────────────────────────────
    cultureEyebrow: culture.eyebrow ?? d.cultureEyebrow,
    cultureTitle: culture.title ?? d.cultureTitle,
    cultureImage: extractMediaUrl(culture.image ?? d.cultureImage, DEFAULT_IMAGES.cultureImage),

    // Capability Maddeleri
    capability1: culture.capability1 ?? d.capability1,
    capability2: culture.capability2 ?? d.capability2,
    capability3: culture.capability3 ?? d.capability3,
    capability4: culture.capability4 ?? d.capability4,
    capability5: culture.capability5 ?? d.capability5,
    cultureCapabilities: normArray(culture.capabilities ?? culture.items) ?? normArray(d.cultureCapabilities),

    // ── İnovasyon Yaklaşımı & İletişim (Innovation Approach) ────────
    cultureApproachTitle: innovation.title ?? d.cultureApproachTitle,
    cultureApproachDesc: innovation.desc ?? d.cultureApproachDesc,
    cultureApproachQuote: innovation.quote ?? d.cultureApproachQuote,
    contactBoxTitle: innovation.contactTitle ?? d.contactBoxTitle,
    contactBoxDesc: innovation.contactDesc ?? d.contactBoxDesc,
    innovationBgImage: extractMediaUrl(innovation.bgImage ?? innovation.image ?? d.innovationBgImage, DEFAULT_IMAGES.innovationBgImage),

    // ── CTA Bölümü ────────────────────────────────────────────────
    ctaSectionTitle: cta.title ?? d.ctaSectionTitle,
    ctaSectionDesc: cta.desc ?? d.ctaSectionDesc,
    ctaSectionButton: cta.buttonText ?? cta.button ?? d.ctaSectionButton,
  };
}

/**
 * Strapi verisini fallback JSON ve varsayılan görsellerle birleştirir.
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

// ─── Ana Servis Fonksiyonu ──────────────────────────────────────────────────

// populate=* component içindeki media alanlarını getirmiyor (Strapi v5)
// Her section için [populate]=* kullanılmalı
const POPULATE_QUERY =
  'populate[hero]=*' +
  '&populate[engineering][populate]=*' +
  '&populate[journey][populate]=*' +
  '&populate[patents][populate]=*' +
  '&populate[ecosystem][populate]=*' +
  '&populate[culture][populate]=*' +
  '&populate[innovationApproach][populate]=*' +
  '&populate[ctaSection]=*';

/**
 * AR-GE sayfası içeriğini ve görsellerini Strapi'den çeker.
 * Strapi erişilemezse veya alanlar eksikse fallback JSON ve varsayılan görsellere döner.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getArgePage(locale = 'ro') {
  const fallback = { ...DEFAULT_IMAGES, ...(FALLBACKS[locale] ?? FALLBACKS.ro) };

  try {
    const res = await strapiGet(`arge-page?locale=${locale}&${POPULATE_QUERY}`);

    if (!res) return fallback;

    const raw = Array.isArray(res.data) ? res.data[0] : (res.data ?? res);
    const normalized = normalizeArgeData(raw);

    if (!normalized) return fallback;

    return mergeWithFallback(normalized, fallback);
  } catch (error) {
    console.error('[Strapi] getArgePage error:', error?.message ?? error);
    return fallback;
  }
}
