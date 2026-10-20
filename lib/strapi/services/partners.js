import { strapiGet } from '../client.js';
import { extractMediaUrl } from '../mediaUrl.js';

const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'https://siskonwebdb.domainmanager.com.tr';

/**
 * Strapi partners collection'ından iş birlikleri verilerini çeker.
 * Locale bazlı: TR, EN, RO ayrı kayıtlar.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<Array|null>}
 */
export async function getPartners(locale = 'ro') {
  try {
    const res = await strapiGet(
      `partners?locale=${locale}&populate=logo&sort=order:asc&pagination[limit]=100`
    );

    if (!res || !Array.isArray(res.data)) return null;

    return res.data.map((item) => normalizePartner(item));
  } catch (error) {
    console.error('[Strapi] getPartners error:', error?.message ?? error);
    return null;
  }
}

/**
 * Tek bir partner kaydını sayfa bileşeninin beklediği formata çevirir.
 * Mevcut sayfa: { name, year, role, workArea, techArea, logo }
 */
function normalizePartner(raw) {
  const d = raw?.attributes ?? raw ?? {};

  // Logo: Strapi media → tam URL (https://...) ya da null
  const logoUrl = extractMediaUrl(d.logo, null);
  const fullLogoUrl = logoUrl
    ? (logoUrl.startsWith('http') ? logoUrl : `${STRAPI_BASE}${logoUrl}`)
    : null;

  return {
    name: d.name ?? '',
    year: d.year ?? '',
    role: d.role ?? '',
    workArea: d.workArea ?? '',
    techArea: d.techArea ?? '',
    logo: fullLogoUrl,
    order: d.order ?? 0,
  };
}
