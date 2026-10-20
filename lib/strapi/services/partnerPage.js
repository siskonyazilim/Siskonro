import { strapiGet } from '../client.js';
import trLocale from '../../../messages/partnershipsPage/tr.json';
import enLocale from '../../../messages/partnershipsPage/en.json';
import roLocale from '../../../messages/partnershipsPage/ro.json';

const FALLBACKS = {
  tr: trLocale,
  en: enLocale,
  ro: roLocale,
};

function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Strapi partner-page Single Type verisini çeker.
 * Strapi erişilemezse veya veri boşsa ASLA undefined/null dönmez,
 * ilgili dilin fallback JSON verisine düşer.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<{ heroTitle: string, heroSubtitle: string }>}
 */
export async function getPartnerPage(locale = 'ro') {
  const fallback = FALLBACKS[locale] ?? FALLBACKS.ro;

  try {
    const res = await strapiGet(`partner-page?locale=${locale}`);
    if (!res || !res.data) {
      return {
        heroTitle: fallback.pageTitle,
        heroSubtitle: fallback.pageSubtitle,
      };
    }

    const d = attrs(res.data);
    return {
      heroTitle: d.heroTitle || fallback.pageTitle,
      heroSubtitle: d.heroSubtitle || fallback.pageSubtitle,
    };
  } catch (error) {
    console.error('[Strapi] getPartnerPage error, fallback kullanılıyor:', error?.message ?? error);
    return {
      heroTitle: fallback.pageTitle,
      heroSubtitle: fallback.pageSubtitle,
    };
  }
}
