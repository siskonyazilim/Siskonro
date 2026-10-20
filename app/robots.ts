import { headers } from 'next/headers';
import type { MetadataRoute } from 'next';
import { getSiteUrlFromHeaders } from './lib/seo/routeMetadata';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getSiteUrlFromHeaders(await headers()).replace(/\/+$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
