import { strapiGet } from '@/lib/strapi/client';

/**
 * GET /api/contact-page-data?locale=tr
 *
 * Strapi'den iletişim sayfasına ait içerikleri çeker:
 *   - contact-page-content  (single type, i18n)
 *   - contact-infos         (collection, i18n, sıralı)
 *   - offices               (collection, i18n, adressline component populate)
 *
 * Gerçek Strapi şema field adları:
 *   contact-infos : label, labelKey, value, order, isActive
 *   offices       : title, mapEmbedUrl, mapsUrl, adressline[]{text}, registrationNo, order, isActive
 *   contact-page-content : heroTitle, heroSubtitle, sectionEyebrow, sectionTitleTop,
 *                          sectionTitleAccent, internshipTitle/Text/Cta,
 *                          formTitle, formSubtitle, officesEyebrow, officesTitle, officesSummary
 */
export async function GET(request) {
  const locale = request.nextUrl.searchParams.get('locale') || 'ro';

  const [pageContent, contactInfos, offices] = await Promise.allSettled([
    strapiGet(`contact-page-content?locale=${locale}&populate=*`),
    // contact-infos: locale parametresiyle çek (i18n açık)
    strapiGet(`contact-infos?locale=${locale}&sort=order:asc&filters[isActive][$eq]=true&populate=*`),
    // offices: adressline component'ını populate et
    strapiGet(`offices?locale=${locale}&sort=order:asc&filters[isActive][$eq]=true&populate[adressline]=true`),
  ]);

  /**
   * Strapi v5 yanıt şeması:
   *   Tek kayıt  → { data: { id, documentId, ...fields } }
   *   Koleksiyon → { data: [ { id, documentId, ...fields }, ... ] }
   *   (v5'te attributes katmanı kaldırıldı)
   */
  function extractSingle(result) {
    if (result.status !== 'fulfilled' || !result.value) return null;
    const raw = result.value;
    // v5: fields doğrudan data objesinde
    if (raw?.data && !Array.isArray(raw.data)) {
      const { id, documentId, createdAt, updatedAt, publishedAt, ...fields } = raw.data;
      return fields;
    }
    return null;
  }

  function extractMany(result) {
    if (result.status !== 'fulfilled' || !result.value) return [];
    const raw = result.value;
    const items = Array.isArray(raw?.data) ? raw.data : [];
    return items.map((item) => {
      // v5: fields doğrudan item içinde
      const { id, documentId, createdAt, updatedAt, publishedAt, locale, ...fields } = item;
      return fields;
    });
  }

  /**
   * offices normalizer: Strapi field'larını frontend'in beklediği yapıya çevirir.
   *
   * Strapi → Frontend:
   *   mapEmbedUrl       → mapEmbed
   *   adressline[]{text} → addressLines (string[])
   *   registrationNo    → regNo
   */
  function normalizeOffice(o) {
    return {
      title:        o.title        || '',
      mapEmbed:     o.mapEmbedUrl  || '',   // Strapi: mapEmbedUrl
      mapsUrl:      o.mapsUrl      || '',
      addressLines: Array.isArray(o.adressline)  // Strapi: adressline (typo intentional — schema'da böyle)
        ? o.adressline.map((line) => line?.text || '')
        : [],
      regNo:        o.registrationNo || '',  // Strapi: registrationNo
    };
  }

  /**
   * contact-infos normalizer: Strapi field'larını frontend'in beklediği yapıya çevirir.
   *
   * Strapi → Frontend:
   *   value → val
   *   (href yok — Strapi'de saklanmıyor, değerden otomatik üretilir)
   */
  function normalizeContactInfo(ci) {
    const val  = ci.value || '';
    // href'i değerden otomatik türet
    let href = '';
    if (val.includes('@'))           href = `mailto:${val}`;
    else if (val.match(/^\+?[\d\s()]+$/)) href = `tel:${val.replace(/\s/g, '')}`;
    else                             href = val;

    return { val, href, label: ci.label || '', labelKey: ci.labelKey || '' };
  }

  const normalizedOffices      = extractMany(offices).map(normalizeOffice);
  const normalizedContactInfos = extractMany(contactInfos).map(normalizeContactInfo);

  return Response.json(
    {
      pageContent:  extractSingle(pageContent),
      contactInfos: normalizedContactInfos,
      offices:      normalizedOffices,
      _sources: {
        pageContent:  pageContent.status,
        contactInfos: contactInfos.status,
        offices:      offices.status,
      },
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
