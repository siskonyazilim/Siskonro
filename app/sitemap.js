import { headers } from 'next/headers';
import { ROUTE_PATHS, getSiteUrlFromHeaders } from './lib/seo/routeMetadata';
import { toLocalizedPath } from './lib/i18n/routes';
import postsRo from '../messages/blog/posts.ro.json';

// '/kurumsal/kilometre-taslari' henüz 404 veriyor, '/search' noindex, '/kurumsal' yönlendirme.
const EXCLUDED = new Set(['/search', '/kurumsal', '/kurumsal/kilometre-taslari']);
const LOCALES = ['ro', 'en', 'tr'];

export const dynamic = 'force-dynamic';

// Sayfa tipine göre öncelik / değişim sıklığı
function pageMeta(path) {
  if (path === '/') return { priority: 1, changeFrequency: 'weekly' };
  if (path === '/blog') return { priority: 0.8, changeFrequency: 'weekly' };
  if (path.startsWith('/yasal/')) return { priority: 0.3, changeFrequency: 'yearly' };
  if (path === '/hizmetler' || path === '/sektorler' || path === '/onsuite' || path === '/iletisim') {
    return { priority: 0.9, changeFrequency: 'monthly' };
  }
  if (path.startsWith('/hizmetler/') || path.startsWith('/sektorler/')) return { priority: 0.8, changeFrequency: 'monthly' };
  return { priority: 0.6, changeFrequency: 'monthly' };
}

// Yazı tarihi "AA-YYYY" (ya da "YYYY-AA-GG") gelir; sitemap için geçerli ISO tarihe çevrilir.
function postDate(raw) {
  const monthYear = String(raw).match(/^(\d{2})-(\d{4})$/);
  if (monthYear) return `${monthYear[2]}-${monthYear[1]}-01`;
  return String(raw).match(/^\d{4}-\d{2}-\d{2}/)?.[0];
}

export default async function sitemap() {
  const siteUrl = getSiteUrlFromHeaders(await headers()).replace(/\/+$/, '');
  const abs = (path, locale) => {
    const localized = toLocalizedPath(path, locale);
    return localized === '/' ? `${siteUrl}/` : `${siteUrl}${localized}`;
  };

  // Her dil için ayrı <url> kaydı; hepsi aynı hreflang kümesini (x-default = RO) taşır.
  const entries = (languages, extra) =>
    LOCALES.map((locale) => ({
      url: languages[locale],
      alternates: { languages: { ...languages, 'x-default': languages.ro } },
      ...extra,
    }));

  const pages = ROUTE_PATHS.filter((path) => !EXCLUDED.has(path)).flatMap((path) =>
    entries(
      Object.fromEntries(LOCALES.map((locale) => [locale, abs(path, locale)])),
      pageMeta(path),
    ),
  );

  // Blog yazıları: her dilin kendi slug'ı vardır; eşleşmeler localizations alanından gelir.
  const posts = postsRo.flatMap((post) => {
    const languages = { ro: abs(`/blog/${post.slug}`, 'ro') };
    for (const loc of post.localizations ?? []) {
      if (loc.locale === 'en' || loc.locale === 'tr') languages[loc.locale] = abs(`/blog/${loc.slug}`, loc.locale);
    }
    // Eksik dil varsa yalnızca mevcut dillerin kaydı yazılır
    const available = LOCALES.filter((locale) => languages[locale]);
    return available.map((locale) => ({
      url: languages[locale],
      lastModified: postDate(post.date),
      alternates: { languages: { ...languages, 'x-default': languages.ro } },
      priority: 0.5,
      changeFrequency: 'yearly',
    }));
  });

  return [...pages, ...posts];
}
