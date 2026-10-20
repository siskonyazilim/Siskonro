/**
 * İletişim Sayfası — Server Component
 *
 * Strapi'den 3 kaynaktan veri çeker (API route üzerinden):
 *   - contact-page-content  → sayfa başlıkları, section metinleri
 *   - contact-infos         → iletişim bilgileri (e-posta, telefon)
 *   - offices               → ofis kartları (adres, harita embed)
 *
 * Strapi erişilemezse ContactPageClient JSON fallback ile çalışmaya devam eder.
 */

import { headers } from 'next/headers';
import { detectLocale } from '../lib/i18n/routes';
import { strapiGet } from '@/lib/strapi/client';
import ContactPageClient from './ContactPageClient';

async function getContactPageData(locale) {
  try {
    const [pageContent, contactInfos, offices] = await Promise.allSettled([
      strapiGet(`contact-page-content?locale=${locale}&populate=*`),
      strapiGet(`contact-infos?locale=${locale}&sort=order:asc&filters[isActive][$eq]=true&populate=*`),
      strapiGet(`offices?locale=${locale}&sort=order:asc&filters[isActive][$eq]=true&populate[adressline]=true`),
    ]);

    function extractSingle(result) {
      if (result.status !== 'fulfilled' || !result.value?.data) return null;
      const { id, documentId, createdAt, updatedAt, publishedAt, ...fields } = result.value.data;
      return fields;
    }

    function extractMany(result) {
      if (result.status !== 'fulfilled') return [];
      const items = Array.isArray(result.value?.data) ? result.value.data : [];
      return items.map(({ id, documentId, createdAt, updatedAt, publishedAt, locale: _l, ...fields }) => fields);
    }

    // offices normalizer: Strapi alan adlarını frontend'e map et
    const normalizedOffices = extractMany(offices).map((o) => ({
      title:        o.title           || '',
      mapEmbed:     o.mapEmbedUrl     || '',
      mapsUrl:      o.mapsUrl         || '',
      addressLines: Array.isArray(o.adressline) ? o.adressline.map((l) => l?.text || '').filter(Boolean) : [],
      regNo:        o.registrationNo  || '',
    }));

    // contact-infos normalizer: href'i değerden türet
    const normalizedContacts = extractMany(contactInfos).map((ci) => {
      const val = ci.value || '';
      let href = '';
      if (val.includes('@'))                href = `mailto:${val}`;
      else if (val.match(/^\+?[\d\s()]+$/)) href = `tel:${val.replace(/\s/g, '')}`;
      else                                  href = val;
      return { val, href, label: ci.label || '', labelKey: ci.labelKey || '' };
    });

    return {
      pageContent:  extractSingle(pageContent),
      contactInfos: normalizedContacts,
      offices:      normalizedOffices,
    };
  } catch (err) {
    console.error('[ContactPage] Strapi fetch error:', err?.message ?? err);
    return null;
  }
}

export default async function IletisimPage(props) {
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

  const data = await getContactPageData(locale);

  if (data?.pageContent) {
    console.log(`[ContactPage/${locale}] Strapi: heroTitle="${data.pageContent.heroTitle}" | offices=${data.offices.length} | contacts=${data.contactInfos.length}`);
  } else {
    console.warn(`[ContactPage/${locale}] Strapi erişilemedi, JSON fallback aktif`);
  }

  return <ContactPageClient data={data} />;
}
