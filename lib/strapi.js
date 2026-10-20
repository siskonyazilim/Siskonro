/**
 * Strapi API Client
 * SiskonWeb ↔ Strapi CMS bağlantı katmanı
 *
 * Kullanım:
 *   import { fetchHomePage } from '@/lib/strapi';
 *   const data = await fetchHomePage('tr');
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL) {
  console.warn('[Strapi] STRAPI_URL ortam değişkeni tanımlı değil — Strapi istekleri devre dışı.');
}

// ─── Temel fetch yardımcısı ─────────────────────────────────────────────────

/**
 * Strapi REST API'ye istek atar.
 * @param {string} endpoint  - Örn: 'home-pages', 'hizmet-sayfasis'
 * @param {string} locale    - 'tr' | 'en' | 'ro'
 * @param {string} [params]  - Ek query string (ör: '&filters[slug][$eq]=ai')
 * @returns {Promise<object>}
 */
export async function fetchStrapi(endpoint, locale = 'ro', params = '') {
  if (!STRAPI_URL) return null;

  const url = `${STRAPI_URL}/api/${endpoint}?locale=${locale}&populate=deep${params}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    // Next.js ISR: 60 saniyede bir yenile (Strapi webhook ile anlık da olabilir)
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`[Strapi] fetch failed: ${url} → ${res.status}`);
    return null;
  }

  const json = await res.json();
  return json?.data ?? json;
}

// ─── Sayfa bazlı helpers ─────────────────────────────────────────────────────

/**
 * Home sayfası içeriğini Strapi'den çeker.
 * Strapi content type: home-page (single type)
 */
export async function fetchHomePage(locale = 'ro') {
  return fetchStrapi('home-page', locale);
}

/**
 * Belirli bir hizmet sayfasının içeriğini çeker.
 * @param {string} slug - Örn: 'ai-makine-ogrenmesi', 'izlenebilirlik-cozumleri'
 */
export async function fetchHizmetPage(slug, locale = 'ro') {
  const data = await fetchStrapi(
    'hizmet-sayfasis',
    locale,
    `&filters[slug][$eq]=${slug}`
  );
  if (Array.isArray(data)) return data[0] ?? null;
  return data;
}

export async function fetchReferences(locale = 'ro') {
  return fetchStrapi('references', locale);
}

export async function fetchHeader(locale = 'ro') {
  return fetchStrapi('header', locale);
}

export async function fetchFooter(locale = 'ro') {
  return fetchStrapi('footer', locale);
}

export { getHeaderData } from './strapi/services/header.js';
export { getFooterData } from './strapi/services/footer.js';
export { getArgePage } from './strapi/services/arge.js';
export { getSustainabilityPage } from './strapi/services/sustainability.js';
export { getCareerPage } from './strapi/services/career.js';
export { getOnsuitePage } from './strapi/services/onsuite.js';
export { getServicesMainPage } from './strapi/services/services-page.js';

// ─── Fallback helper: Strapi yoksa JSON'a düş ────────────────────────────────

/**
 * Strapi'den veri gelirse kullan, gelmezse fallback JSON kullan.
 * Geçiş sürecinde her iki sistemin paralel çalışmasını sağlar.
 *
 * @param {Function} strapiGetter - fetchHomePage gibi bir async fonksiyon
 * @param {any}      fallback     - Mevcut JSON'dan gelen veri
 */
export async function withStrapiOrFallback(strapiGetter, fallback) {
  try {
    const data = await strapiGetter();
    if (data) return { source: 'strapi', data };
  } catch (err) {
    console.warn('[Strapi] Bağlantı kurulamadı, JSON fallback kullanılıyor.', err?.message);
  }
  return { source: 'json', data: fallback };
}
