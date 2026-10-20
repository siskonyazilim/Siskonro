/**
 * İş Birlikleri Sayfası — Server Component
 *
 * TR, EN, RO partner verileri Strapi'den çekilir.
 * Locale detect → doğru dildeki partner listesi client'a geçirilir.
 *
 * Mimari:
 *   headers() → locale detect → getPartners(locale) → Strapi → PartnershipsPageClient
 *
 * Fallback: Strapi erişilemezse mevcut JSON'dan partners array'i okunur.
 */

import { headers } from 'next/headers';
import { detectLocale } from '../lib/i18n/routes';
import { getPartners } from '@/lib/strapi/services/partners';
import { getPartnerPage } from '@/lib/strapi/services/partnerPage';
import trLocale from '../../messages/partnershipsPage/tr.json';
import enLocale from '../../messages/partnershipsPage/en.json';
import roLocale from '../../messages/partnershipsPage/ro.json';
import PartnershipsPageClient from './PartnershipsPageClient';

export default async function PartnershipsPage(props) {
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

  // Strapi'den sayfa metinleri ve partner listesi
  const [pageData, strapiPartners] = await Promise.all([
    getPartnerPage(locale),
    getPartners(locale),
  ]);

  const fallbackLocale = locale === 'en' ? enLocale : locale === 'ro' ? roLocale : trLocale;

  let partners;

  if (strapiPartners && strapiPartners.length > 0) {
    partners = strapiPartners;
    console.log(`[Partners/${locale}] Strapi: ${partners.length} partner yüklendi`);
  } else {
    // Fallback: JSON dosyasından
    partners = fallbackLocale.partners ?? [];
    console.warn(`[Partners/${locale}] Strapi erişilemedi, fallback JSON kullanılıyor`);
  }

  // Strapi erişilemezse veya veri eksikse kesinlikle fallback JSON kullanılır
  const safePageData = {
    heroTitle: pageData?.heroTitle || fallbackLocale.pageTitle,
    heroSubtitle: pageData?.heroSubtitle || fallbackLocale.pageSubtitle,
  };

  return <PartnershipsPageClient pageData={safePageData} partners={partners} />;
}