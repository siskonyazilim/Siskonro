import { strapiGet } from '../client.js';

/**
 * Kariyer Sayfası Strapi Servisi
 * career-page single type şeması:
 *   hero      : { title, subtitle, breadcrumbs[], ctaLabel }
 *   values    : { title, eyebrow, items[]{title,desc,icon} }
 *   culture   : { title, desc, callout1, callout2, image }
 *   process   : { title, items[]{title,desc,icon} }
 *   life      : { title, photos[], cards[]{title,items[]} }
 *   finalCta  : { line1, line2, line3, desc, subtitle, button }
 */
export async function getCareerPage(locale = 'ro') {
  try {
    const res = await strapiGet(`career-page?locale=${locale}&populate=*`);
    if (!res?.data) return null;
    return normalizeCareerPage(res.data);
  } catch (err) {
    console.error('[Strapi] getCareerPage error:', err?.message ?? err);
    return null;
  }
}

function normalizeCareerPage(d) {
  function arr(val) { return Array.isArray(val) ? val : []; }

  return {
    // Hero
    heroTitle:      d.hero?.title      ?? '',
    heroSubtitle:   d.hero?.subtitle   ?? '',
    heroBreadcrumbs: arr(d.hero?.breadcrumbs),
    heroCtaLabel:   d.hero?.ctaLabel   ?? '',

    // Values
    valuesEyebrow:  d.values?.eyebrow  ?? '',
    valuesTitle:    d.values?.title    ?? '',
    values: arr(d.values?.items).map(v => ({
      title: v.title ?? '',
      desc:  v.desc  ?? '',
      icon:  v.icon  ?? '',
    })),

    // Process
    processTitle: d.process?.title ?? '',
    processList: arr(d.process?.items).map(p => ({
      title: p.title ?? '',
      desc:  p.desc  ?? '',
      icon:  p.icon  ?? '',
    })),


    // Final CTA
    finalCtaLine1:    d.finalCta?.line1    ?? '',
    finalCtaLine2:    d.finalCta?.line2    ?? '',
    finalCtaLine3:    d.finalCta?.line3    ?? '',
    finalCtaDesc:     d.finalCta?.desc     ?? '',
    finalCtaSubtitle: d.finalCta?.subtitle ?? '',
    finalCtaButton:   d.finalCta?.button   ?? '',
  };
}
