import { headers } from 'next/headers';
import { getSiteUrlFromHeaders } from './lib/seo/routeMetadata';

export const dynamic = 'force-dynamic';

export default async function robots() {
  const siteUrl = getSiteUrlFromHeaders(await headers()).replace(/\/+$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
