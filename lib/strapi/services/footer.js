import { strapiGet } from '../client.js';
import footerTr from '../../../messages/components/footer/tr.json';
import footerEn from '../../../messages/components/footer/en.json';
import footerRo from '../../../messages/components/footer/ro.json';

const FOOTER_FALLBACKS = { tr: footerTr, en: footerEn, ro: footerRo };

const DEFAULT_FOOTER_LOGO = '/assets/new/common/siskon-logo.svg';

const DEFAULT_SOCIAL_LINKS = {
  linkedinUrl: 'https://tr.linkedin.com/company/siskonyazilimveotomasyon',
  linkedinLabel: 'LinkedIn',
  linkedinIcon: '/SiteIcon/social/linkedin.svg',
  youtubeUrl: 'https://www.youtube.com/@SiskonYazilimveOtomasyon',
  youtubeLabel: 'YouTube',
  youtubeIcon: '/SiteIcon/social/youtube.svg',
  instagramUrl: 'https://www.instagram.com/siskonotomasyon/',
  instagramLabel: 'Instagram',
  instagramIcon: '/SiteIcon/social/instagram.svg',
  twitterUrl: 'https://x.com/siskonyazilim',
  twitterLabel: 'Twitter',
  twitterIcon: '/SiteIcon/social/twitter.svg',
};

/**
 * Strapi v5 — veri düz gelir (attributes wrapper yok).
 * v4 uyumluluğu için attributes fallback korunur.
 */
function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Strapi v5 logo objesinden URL çıkarır.
 * populate=* ile logo düz obje olarak gelir: { url: '/uploads/...' }
 */
function logoUrl(logoObj) {
  if (!logoObj) return DEFAULT_FOOTER_LOGO;
  // Strapi v5: düz obje { url: '...' }
  if (typeof logoObj === 'string') return logoObj;
  const url = logoObj.url ?? logoObj?.data?.attributes?.url;
  if (!url) return DEFAULT_FOOTER_LOGO;
  // Relative path ise Strapi base URL'i ile tamamla
  return url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ?? ''}${url}`;
}

/**
 * Strapi v5'ten gelen Footer verisini standart formata normalize eder.
 * Test çıktısına göre veri yapısı:
 *   data.logo          → { url, ... }
 *   data.companyInfo   → { tagline, email, phone, allRights, slogan }
 *   data.sectionTitles → { services, products, insights, corporate, stayConnected }
 *   data.quickLinks    → { rAndD, partnerships, references, about, career, kvkk, privacy, cookie }
 *   data.socialLinks   → { linkedinUrl, linkedinLabel, youtubeUrl, ... }
 */
function normalizeFooterData(raw) {
  if (!raw) return null;
  // Strapi v5: data doğrudan obje. v4 uyumluluğu için attrs() kullan.
  const d = attrs(raw);

  const companyInfo   = d.companyInfo   ?? {};
  const sectionTitles = d.sectionTitles ?? {};
  const quickLinks    = d.quickLinks    ?? {};
  const socialLinks   = d.socialLinks   ?? {};

  return {
    // ── Logo ───────────────────────────────────────────────────────────────
    logo: logoUrl(d.logo),

    // ── Şirket & İletişim Bilgileri ─────────────────────────────────────────
    tagline:   companyInfo.tagline   ?? d.tagline,
    email:     companyInfo.email     ?? d.email     ?? 'info@siskon.com.tr',
    phone:     companyInfo.phone     ?? d.phone     ?? '+90 (232) 245 00 76',
    allRights: companyInfo.allRights ?? d.allRights,
    slogan:    companyInfo.slogan    ?? d.slogan    ?? 'Makes Your Factory Smarter',

    // ── Bölüm / Sütun Başlıkları ──────────────────────────────────────────
    services:      sectionTitles.services      ?? d.services,
    products:      sectionTitles.products      ?? d.products,
    insights:      sectionTitles.insights      ?? d.insights,
    corporate:     sectionTitles.corporate     ?? d.corporate,
    stayConnected: sectionTitles.stayConnected ?? d.stayConnected,

    // ── Hızlı Link Metinleri ───────────────────────────────────────────────
    rAndD:        quickLinks.rAndD        ?? d.rAndD,
    partnerships: quickLinks.partnerships ?? d.partnerships,
    references:   quickLinks.references   ?? d.references,
    about:        quickLinks.about        ?? d.about,
    career:       quickLinks.career       ?? d.career,
    milestones:   quickLinks.milestones   ?? d.milestones,
    kvkk:         quickLinks.kvkk         ?? d.kvkk,
    privacy:      quickLinks.privacy      ?? d.privacy,
    cookie:       quickLinks.cookie       ?? d.cookie,

    // ── Sosyal Medya ───────────────────────────────────────────────────────
    socialLinks: {
      linkedinUrl:   (socialLinks.linkedinUrl   ?? DEFAULT_SOCIAL_LINKS.linkedinUrl).trim(),
      linkedinLabel:  socialLinks.linkedinLabel  ?? DEFAULT_SOCIAL_LINKS.linkedinLabel,
      youtubeUrl:    (socialLinks.youtubeUrl     ?? DEFAULT_SOCIAL_LINKS.youtubeUrl).trim(),
      youtubeLabel:   socialLinks.youtubeLabel   ?? DEFAULT_SOCIAL_LINKS.youtubeLabel,
      instagramUrl:  (socialLinks.instagramUrl   ?? DEFAULT_SOCIAL_LINKS.instagramUrl).trim(),
      instagramLabel: socialLinks.instagramLabel ?? DEFAULT_SOCIAL_LINKS.instagramLabel,
      twitterUrl:    (socialLinks.twitterUrl     ?? DEFAULT_SOCIAL_LINKS.twitterUrl).trim(),
      twitterLabel:   socialLinks.twitterLabel   ?? DEFAULT_SOCIAL_LINKS.twitterLabel,
    },
  };
}

/**
 * Strapi verisi ile fallback JSON'ı birleştirir.
 */
function mergeFooterFallback(strapiData, fallback) {
  const merged = {
    logo: DEFAULT_FOOTER_LOGO,
    ...fallback,
    socialLinks: { ...DEFAULT_SOCIAL_LINKS },
  };
  if (!strapiData) return merged;

  if (strapiData.logo) merged.logo = strapiData.logo;

  for (const key of Object.keys(strapiData)) {
    const val = strapiData[key];
    if (val !== null && val !== undefined && val !== '') {
      merged[key] = val;
    }
  }

  return merged;
}

/**
 * Footer içeriğini Strapi v5'ten çeker.
 * Strapi v5'te populate=deep ve populate[field][populate]=* çalışmıyor;
 * populate=* tüm ilişkileri tek seviye getirir ve yeterlidir.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getFooterData(locale = 'ro') {
  const fallback = FOOTER_FALLBACKS[locale] ?? FOOTER_FALLBACKS.ro;

  let res = null;
  try {
    res = await strapiGet(`footer?locale=${locale}&populate=*`);
  } catch (err) {
    console.error('[Strapi] getFooterData fetch hatası:', err?.message ?? err);
    return mergeFooterFallback(null, fallback);
  }

  if (!res?.data) return mergeFooterFallback(null, fallback);

  try {
    // Strapi v5: res.data düz obje (array değil, single type)
    const raw = Array.isArray(res.data) ? res.data[0] : res.data;
    const normalized = normalizeFooterData(raw);
    if (!normalized) return mergeFooterFallback(null, fallback);
    return mergeFooterFallback(normalized, fallback);
  } catch (normalizeErr) {
    console.error('[Strapi] getFooterData normalize hatası:', normalizeErr?.message ?? normalizeErr);
    return mergeFooterFallback(null, fallback);
  }
}
