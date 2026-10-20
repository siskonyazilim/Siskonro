/**
 * Referanslar Sayfası — Server Component
 *
 * Strapi'den referans verileri çekilir ve ReferencesPageClient'a prop olarak geçirilir.
 * 'use client' YOKTUR — SSR/ISR desteği sağlanır.
 *
 * Mimari:
 *   headers() → locale detect → getReferences() → Strapi → ReferencesPageClient
 *
 * Fallback: Strapi erişilemezse mevcut JSON dosyasından okunur.
 */

import { headers } from 'next/headers';
import { detectLocale } from '../lib/i18n/routes';
import { getReferences, groupReferencesByCategory } from '@/lib/strapi/services/references';
import { getReferencesPage } from '@/lib/strapi/services/referencesPage';
import REFERENCE_DATA_FALLBACK from '../../messages/referencesPage/referenceData.json';
import trLocale from '../../messages/referencesPage/tr.json';
import enLocale from '../../messages/referencesPage/en.json';
import roLocale from '../../messages/referencesPage/ro.json';
import ReferencesPageClient from './ReferencesPageClient';


const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'https://siskonwebdb.domainmanager.com.tr';

export default async function ReferencesPage(props) {
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

  // Strapi'den sayfa metinlerini ve referansları çek
  const [pageData, strapiRefs] = await Promise.all([
    getReferencesPage(locale),
    getReferences(),
  ]);

  let groupedData;

  if (strapiRefs && strapiRefs.length > 0) {
    // Strapi'den veri geldi — kategoriye göre grupla
    groupedData = groupReferencesByCategory(strapiRefs);
    console.log(`[References] Strapi: ${strapiRefs.length} referans yüklendi`);
  } else {
    // Fallback: statik JSON — mevcut yapı { tutun: [], otomotiv: [], ... }
    groupedData = REFERENCE_DATA_FALLBACK;
    console.warn('[References] Strapi erişilemedi, fallback JSON kullanılıyor');
  }

  const fallbackLocale = locale === 'en' ? enLocale : locale === 'ro' ? roLocale : trLocale;
  const safePageData = {
    heroTitle: pageData?.heroTitle || fallbackLocale.heroTitle,
    heroSubtitle: pageData?.heroSubtitle || fallbackLocale.heroSubtitle,
  };

  return (
    <ReferencesPageClient
      pageData={safePageData}
      groupedData={groupedData}
      locale={locale}
      strapiBase={STRAPI_BASE}
    />
  );
}