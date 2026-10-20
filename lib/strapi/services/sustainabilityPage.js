import { strapiGet } from '../client.js';

/**
 * Sürdürülebilirlik Sayfası Strapi Servisi
 * sustainability-page single type şeması:
 *   hero    : { title, subtitle, breadcrumbs[] }
 *   intro   : { eyebrow, text, image }
 *   journey : { title, subtitle, subtitle2, desc,
 *               year2000Title, year2000Desc,
 *               yearsTitle, yearsBullets[], yearsConclusion,
 *               year2022Title, year2022Desc,
 *               year2023Title, year2023Desc,
 *               year2024Title, year2024Desc,
 *               todayTitle, todayBullets[], todayConclusion,
 *               summaryText }
 *   future  : { title, subtitle, tagline, desc, image }
 *   cta     : { title, description, button }
 */
export async function getSustainabilityPage(locale = 'ro') {
  try {
    const res = await strapiGet(`sustainability-page?locale=${locale}&populate=*`);
    if (!res?.data) return null;
    return normalizeSustainabilityPage(res.data);
  } catch (err) {
    console.error('[Strapi] getSustainabilityPage error:', err?.message ?? err);
    return null;
  }
}

function normalizeSustainabilityPage(d) {
  function arr(val) { return Array.isArray(val) ? val : []; }

  return {
    // Hero
    pageTitle:    d.hero?.title    ?? '',
    pageSubtitle: d.hero?.subtitle ?? '',
    breadcrumbs:  arr(d.hero?.breadcrumbs),

    // Intro
    introEyebrow: d.intro?.eyebrow ?? '',
    introText:    d.intro?.text    ?? '',
    introImage:   d.intro?.image   ?? null,

    // Journey
    journeyTitle:     d.journey?.title       ?? '',
    journeySubtitle:  d.journey?.subtitle    ?? '',
    journeySubtitle2: d.journey?.subtitle2   ?? '',
    journeyDesc:      d.journey?.desc        ?? '',
    year2000Title:    d.journey?.year2000Title ?? '',
    year2000Desc:     d.journey?.year2000Desc  ?? '',
    yearsTitle:       d.journey?.yearsTitle    ?? '',
    yearsBullets:     arr(d.journey?.yearsBullets),
    yearsConclusion:  d.journey?.yearsConclusion ?? '',
    year2022Title:    d.journey?.year2022Title ?? '',
    year2022Desc:     d.journey?.year2022Desc  ?? '',
    year2023Title:    d.journey?.year2023Title ?? '',
    year2023Desc:     d.journey?.year2023Desc  ?? '',
    year2024Title:    d.journey?.year2024Title ?? '',
    year2024Desc:     d.journey?.year2024Desc  ?? '',
    todayTitle:       d.journey?.todayTitle    ?? '',
    todayBullets:     arr(d.journey?.todayBullets),
    todayConclusion:  d.journey?.todayConclusion ?? '',
    summaryText:      d.journey?.summaryText     ?? '',

    // Future
    futureTitle:    d.future?.title    ?? '',
    futureSubtitle: d.future?.subtitle ?? '',
    futureTagline:  d.future?.tagline  ?? '',
    futureDesc:     d.future?.desc     ?? '',
    futureImage:    d.future?.image    ?? null,

    // CTA
    ctaTitle:       d.cta?.title       ?? '',
    ctaDescription: d.cta?.description ?? '',
    ctaButton:      d.cta?.button      ?? '',
  };
}
