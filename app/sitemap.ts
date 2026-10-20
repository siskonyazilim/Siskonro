import { headers } from 'next/headers';
import type { MetadataRoute } from 'next';
import { ROUTE_PATHS, getSiteUrlFromHeaders } from './lib/seo/routeMetadata';
import { toLocalizedPath } from './lib/i18n/routes';
import postsRo from '../messages/blog/posts.ro.json';

// '/kurumsal/kilometre-taslari' henüz 404 veriyor, '/search' noindex, '/kurumsal' yönlendirme.
const EXCLUDED = new Set(['/search', '/kurumsal', '/kurumsal/kilometre-taslari']);

export const dynamic = 'force-dynamic';

type Locale = 'ro' | 'en' | 'tr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrlFromHeaders(await headers()).replace(/\/+$/, '');
  const abs = (path: string, locale: Locale) => {
    const localized = toLocalizedPath(path, locale);
    return localized === '/' ? `${siteUrl}/` : `${siteUrl}${localized}`;
  };

  const pages: MetadataRoute.Sitemap = ROUTE_PATHS.filter((path) => !EXCLUDED.has(path)).map((path) => ({
    url: abs(path, 'ro'),
    alternates: { languages: { ro: abs(path, 'ro'), en: abs(path, 'en'), tr: abs(path, 'tr') } },
  }));

  // Blog yazıları: her dilin kendi slug'ı vardır; eşleşmeler localizations alanından gelir.
  const posts: MetadataRoute.Sitemap = (postsRo as Array<{ slug: string; date?: string; localizations?: Array<{ slug: string; locale: string }> }>).map((post) => {
    const languages: Record<string, string> = { ro: abs(`/blog/${post.slug}`, 'ro') };
    for (const loc of post.localizations ?? []) {
      if (loc.locale === 'en' || loc.locale === 'tr') languages[loc.locale] = abs(`/blog/${loc.slug}`, loc.locale);
    }
    return { url: languages.ro, lastModified: post.date, alternates: { languages } };
  });

  return [...pages, ...posts];
}
