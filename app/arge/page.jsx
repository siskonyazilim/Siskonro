/**
 * AR-GE Sayfası — Server Component
 *
 * Strapi'den veri çekilir ve ArgePageClient'a prop olarak geçirilir.
 * 'use client' YOKTUR — ISR/SSR desteği sağlanır.
 *
 * Mimari:
 *   headers() → locale detect → getArgePage(locale) → Strapi → ArgePageClient
 */

import { headers } from 'next/headers';
import { detectLocale } from '../lib/i18n/routes';
import { getArgePage } from '@/lib/strapi/services/arge';
import ArgePageClient from './ArgePageClient';

export default async function ArgePage(props) {
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
  const data = await getArgePage(locale);

  return <ArgePageClient data={data} locale={locale} />;
}
