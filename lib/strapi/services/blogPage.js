import { strapiGet } from '../client.js';
import trLocale from '../../../messages/blog/tr.json';
import enLocale from '../../../messages/blog/en.json';
import roLocale from '../../../messages/blog/ro.json';

const FALLBACKS = {
  tr: trLocale,
  en: enLocale,
  ro: roLocale,
};

function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Strapi blog-page Single Type verisini çeker.
 * Strapi erişilemezse veya veri boşsa ASLA undefined/null dönmez,
 * ilgili dilin fallback JSON verisine düşer.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<{ heroTitle: string, heroSubtitle: string }>}
 */
export async function getBlogPage(locale = 'ro') {
  const fallback = FALLBACKS[locale] ?? FALLBACKS.ro;

  try {
    const res = await strapiGet(`blog-page?locale=${locale}`);
    if (!res || !res.data) {
      return {
        heroTitle: fallback.pageTitle,
        heroSubtitle: fallback.pageDescription,
      };
    }

    const d = attrs(res.data);
    return {
      heroTitle: d.heroTitle || fallback.pageTitle,
      heroSubtitle: d.heroSubtitle || fallback.pageDescription,
    };
  } catch (error) {
    console.error('[Strapi] getBlogPage error, fallback kullanılıyor:', error?.message ?? error);
    return {
      heroTitle: fallback.pageTitle,
      heroSubtitle: fallback.pageDescription,
    };
  }
}
