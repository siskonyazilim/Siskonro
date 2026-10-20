/**
 * Kariyer Sayfası — Server Component
 * Strapi career-page single type'ından veri çeker.
 */

import { headers } from 'next/headers';
import { detectLocale } from '../../lib/i18n/routes';
import { getCareerPage } from '@/lib/strapi/services/career';
import CareerPageClient from './CareerPageClient';

export default async function CareerPage(props) {
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

  const data = await getCareerPage(locale);

  if (data) {
    console.log(`[CareerPage/${locale}] Strapi: heroTitle="${data.heroTitle}" | values=${data.values?.length} | process=${data.processList?.length}`);
  } else {
    console.warn(`[CareerPage/${locale}] Strapi erişilemedi, JSON fallback aktif`);
  }

  return <CareerPageClient data={data} locale={locale} />;
}
