/**
 * Bizi Tanıyın Sayfası — Server Component
 *
 * Strapi about-page single type'ından tüm section verileri çekilir:
 *   hero, intro (teamPhoto), highlights (icon), framework (goalsImage),
 *   values, isoCertificates, milestones, cta
 *
 * Locale detect → doğru dildeki veriler AboutPageClient'a geçirilir.
 * Strapi erişilemezse bileşen JSON fallback ile çalışmaya devam eder.
 */

import { headers } from 'next/headers';
import { detectLocale } from '../../lib/i18n/routes';
import { getAboutPage } from '@/lib/strapi/services/aboutPage';
import AboutPageClient from './AboutPageClient';

export default async function AboutPage(props) {
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

  // Strapi'den tüm about-page verilerini çek
  const data = await getAboutPage(locale);

  if (data) {
    console.log(`[AboutPage/${locale}] Strapi: hero="${data.pageTitle}" | highlights=${data.highlights.length} | milestones=${data.milestones.length}`);
  } else {
    console.warn(`[AboutPage/${locale}] Strapi erişilemedi, JSON fallback aktif`);
  }

  return <AboutPageClient data={data} />;
}
