/**
 * onsuite.ro bağlantıları — tek kaynak.
 *
 * Yol yapısı onsuite.ro/sitemap.xml'den alınmıştır (hreflang karşılıkları):
 *   ro: /            /module/<ad>          /engage     /referinte   /despre-noi  /contact
 *   en: /en          /en/modules/<ad>      /en/engage  /en/references /en/about  /en/contact
 *   tr: /tr          /tr/moduller/<ad>     /tr/engage  /tr/referanslar /tr/hakkimizda /tr/iletisim
 */

export const ONSUITE_ORIGIN = 'https://www.onsuite.ro';

const PATHS = {
  home: { ro: '/', en: '/en', tr: '/tr' },
  modules: { ro: '/module', en: '/en/modules', tr: '/tr/moduller' },
  engage: { ro: '/engage', en: '/en/engage', tr: '/tr/engage' },
  references: { ro: '/referinte', en: '/en/references', tr: '/tr/referanslar' },
  about: { ro: '/despre-noi', en: '/en/about', tr: '/tr/hakkimizda' },
  contact: { ro: '/contact', en: '/en/contact', tr: '/tr/iletisim' },
};

function safeLocale(locale) {
  return locale === 'en' || locale === 'tr' ? locale : 'ro';
}

/** Sayfa anahtarı → mutlak onsuite.ro URL'si (dile göre). */
export function onsuiteUrl(key, locale = 'ro') {
  const path = PATHS[key]?.[safeLocale(locale)] ?? '/';
  return path === '/' ? `${ONSUITE_ORIGIN}/` : `${ONSUITE_ORIGIN}${path}`;
}

/** Modül sayfası (connect, live, ...). Engage kendi yoluna sahiptir. */
export function onsuiteModuleUrl(slug, locale = 'ro') {
  const clean = String(slug || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!clean) return onsuiteUrl('modules', locale);
  if (clean === 'engage') return onsuiteUrl('engage', locale);
  return `${ONSUITE_ORIGIN}${PATHS.modules[safeLocale(locale)]}/${clean}`;
}

/**
 * Eski onsuite.com.tr bağlantısını (Strapi'de kalmış olsa bile) onsuite.ro karşılığına çevirir.
 * Diğer URL'lere dokunmaz.
 */
export function migrateLegacyOnsuiteUrl(url, locale = 'ro') {
  if (typeof url !== 'string' || !/onsuite\.com\.tr/i.test(url)) return url;
  const slug = url.match(/\/(?:moduller|modules?)\/([\w-]+)/i)?.[1];
  return slug ? onsuiteModuleUrl(slug, locale) : onsuiteUrl('home', locale);
}

export function isExternalUrl(href) {
  return /^https?:\/\//i.test(String(href || ''));
}
