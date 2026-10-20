import { strapiGet } from '../client.js';
import { extractMediaUrl, extractMediaUrlProxied } from '../mediaUrl.js';

const STRAPI_BASE =
  process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ??
  process.env.STRAPI_URL ??
  'https://siskonwebdb.domainmanager.com.tr';

/**
 * Bizi Tanıyın sayfasının tüm verilerini Strapi'den çeker.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<Object|null>}
 */
export async function getAboutPage(locale = 'ro') {
  try {
    const populate = [
      'hero',
      'intro.teamPhoto',
      'highlights',
      'framework.goalsImage',
      'values',
      'isoCertificates.image',
      'milestones',
      'cta',
    ].join('&populate[]=');

    const res = await strapiGet(
      `about-page?locale=${locale}&populate[]=${populate}`
    );

    if (!res?.data) return null;
    return normalizeAboutPage(res.data);
  } catch (err) {
    console.error('[Strapi] getAboutPage error:', err?.message ?? err);
    return null;
  }
}

function mediaUrl(media, fallback = null) {
  return extractMediaUrl(media, fallback);
}

function mediaUrlProxied(media, fallback = null) {
  return extractMediaUrlProxied(media, fallback);
}

function normalizeAboutPage(d) {
  return {
    // Hero
    pageTitle:    d.hero?.title    ?? '',
    pageSubtitle: d.hero?.subtitle ?? '',

    // Intro
    cultureDesc1: d.intro?.description1 ?? '',
    cultureDesc2: d.intro?.description2 ?? '',
    teamPhoto:    mediaUrl(d.intro?.teamPhoto, null),

    // Highlight kartları
    highlights: Array.isArray(d.highlights)
      ? d.highlights.map(h => ({
          title: h.title ?? '',
          text:  h.text  ?? '',
          icon:  mediaUrlProxied(h.icon, null),
        }))
      : [],

    // Framework (vizyon/misyon/değerler)
    frameworkEyebrow: d.framework?.eyebrow      ?? '',
    frameworkTitle:   d.framework?.title         ?? '',
    goalsImage:       mediaUrl(d.framework?.goalsImage, null),
    visionTitle:      d.framework?.visionTitle   ?? '',
    visionText:       d.framework?.visionText    ?? '',
    missionTitle:     d.framework?.missionTitle  ?? '',
    missionText:      d.framework?.missionText   ?? '',
    valuesTitle:      d.framework?.valuesTitle   ?? '',

    // Değerler listesi
    values: Array.isArray(d.values)
      ? d.values.map(v => v.label ?? '')
      : [],

    // ISO Sertifikaları
    isoSectionTitle: d.isoSectionTitle ?? '',
    isoCertificates: Array.isArray(d.isoCertificates)
      ? d.isoCertificates.map(c => ({
          code:  c.code  ?? '',
          label: c.label ?? '',
          image: mediaUrlProxied(c.image, null),
        }))
      : [],

    // Kilometre taşları
    milestoneSectionTitle: d.milestoneSectionTitle ?? '',
    milestones: Array.isArray(d.milestones)
      ? d.milestones
          .map(m => ({ year: m.year, items: Array.isArray(m.items) ? m.items : [] }))
          .sort((a, b) => a.year - b.year)
      : [],

    // CTA
    ctaSectionTitle:  d.cta?.title       ?? '',
    ctaSectionDesc:   d.cta?.description ?? '',
    ctaSectionButton: d.cta?.buttonText  ?? '',
  };
}
