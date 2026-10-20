/**
 * Sürdürülebilirlik Sayfası — Server Component
 * Strapi sustainability-page single type'ından veri çeker.
 */

import { headers } from 'next/headers';
import { detectLocale } from '../../lib/i18n/routes';
import { getSustainabilityPage } from '@/lib/strapi/services/sustainability';
import SustainabilityPageClient from './SustainabilityPageClient';

export default async function SustainabilityPage(props) {
  const searchParams = await props.searchParams;
  const localeFromQuery = searchParams?._locale;

  const requestHeaders = await headers();
  const requestPath =
    requestHeaders.get('x-pathname') ??
    requestHeaders.get('x-invoke-path') ??
    '/';

  const locale = (localeFromQuery === 'en' || localeFromQuery === 'ro')
    ? localeFromQuery
    : detectLocale(requestPath);

  const data = await getSustainabilityPage(locale);

  if (data) {
    console.log(`[SustainabilityPage/${locale}] Strapi: title="${data.pageTitle}" | journey="${data.journeyTitle}"`);
  } else {
    console.warn(`[SustainabilityPage/${locale}] Strapi erişilemedi, JSON fallback aktif`);
  }

  return <SustainabilityPageClient data={data} locale={locale} />;
}
