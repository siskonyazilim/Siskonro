/**
 * OnSuite Sayfası — Server Component
 *
 * Strapi'den veri çekilir ve OnSuitePageClient'a prop olarak geçirilir.
 * 'use client' YOKTUR — ISR/SSR desteği sağlanır.
 *
 * Mimari:
 *   headers() → locale detect → getOnsuitePage(locale) → Strapi → OnSuitePageClient
 */

import { headers } from 'next/headers';
import { detectLocale } from '../lib/i18n/routes';
import { getOnsuitePage } from '@/lib/strapi/services/onsuite';
import OnSuitePageClient from './OnSuitePageClient';

export default async function OnSuitePage(props) {
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

  // Strapi'den veri çek — hata olursa JSON fallback servis içinde devreye girer
  const data = await getOnsuitePage(locale);

  return <OnSuitePageClient data={data} locale={locale} />;
}
