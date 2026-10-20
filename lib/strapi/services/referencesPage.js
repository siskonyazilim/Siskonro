import { strapiGet } from '../client.js';
import trLocale from '../../../messages/referencesPage/tr.json';
import enLocale from '../../../messages/referencesPage/en.json';
import roLocale from '../../../messages/referencesPage/ro.json';

const FALLBACKS = {
  tr: trLocale,
  en: enLocale,
  ro: roLocale,
};

function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Strapi references-page Single Type verisini çeker.
 * Strapi erişilemezse veya veri boşsa ASLA undefined/null dönmez,
 * ilgili dilin fallback JSON verisine düşer.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<{ heroTitle: string, heroSubtitle: string }>}
 */
export async function getReferencesPage(locale = 'ro') {
  const fallback = FALLBACKS[locale] ?? FALLBACKS.ro;

  try {
    const res = await strapiGet(`references-page?locale=${locale}`);
    if (!res || !res.data) {
      return {
        heroTitle: fallback.heroTitle,
        heroSubtitle: fallback.heroSubtitle,
      };
    }

    const d = attrs(res.data);
    return {
      heroTitle: d.heroTitle || fallback.heroTitle,
      heroSubtitle: d.heroSubtitle || fallback.heroSubtitle,
    };
  } catch (error) {
    console.error('[Strapi] getReferencesPage error, fallback kullanılıyor:', error?.message ?? error);
    return {
      heroTitle: fallback.heroTitle,
      heroSubtitle: fallback.heroSubtitle,
    };
  }
}
