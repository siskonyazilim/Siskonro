/**
 * Merkezi Strapi Media URL Utility
 *
 * Tüm servis dosyaları bu utility'yi import eder.
 *
 * ÖNEMLI: STRAPI_URL (sunucu tarafı) Docker internal hostname olabilir
 * (örn: http://strapi-abc123:1337). Bu hostname browser'dan çözülemiyor.
 *
 * Bu yüzden medya URL'leri için NEXT_PUBLIC_STRAPI_MEDIA_URL kullanılır —
 * bu her zaman browser'dan erişilebilir public domain'dir
 * (örn: https://siskonwebdb.domainmanager.com.tr).
 *
 * Strapi'den gelebilecek URL formatları:
 *  1. Tam absolute URL : https://strapi-internal:1337/uploads/foto.jpg  ← internal, düzeltilmeli!
 *  2. Relative path    : /uploads/foto.jpg
 *  3. Kısmi relative  : /foto.jpg  (/uploads/ eksik)
 *  4. Sadece dosya adı : foto.jpg  (hiçbir prefix yok)
 *
 * Kural: Tüm durumlarda → PUBLIC_MEDIA_URL/uploads/foto.jpg
 */

// Medya için her zaman PUBLIC URL kullan (browser erişilebilir)
// NEXT_PUBLIC_ prefix'i ile hem server hem client'ta kullanılabilir
const MEDIA_BASE_URL = (
  process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL ||
  process.env.STRAPI_URL ||
  process.env.STRAPI_API_URL ||
  ''
).replace(/\/$/, ''); // trailing slash kaldır

const INTERNAL_PATTERNS = [
  // Docker/Coolify internal hostnames (port 1337 ve localhost olmayan)
  /^https?:\/\/[^/]+-[a-z0-9]{8,}(:\d+)?\//,  // strapi-abc12345:1337/
  /^http:\/\/strapi[^/]*(:\d+)?\//,             // http://strapi-...:port/
  /^http:\/\/localhost:1337\//,                  // http://localhost:1337/
];

/**
 * Verilen URL'nin Docker internal URL olup olmadığını kontrol eder.
 */
function isInternalUrl(url) {
  return INTERNAL_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * Bir Strapi medya URL'sinden sadece dosya yolunu çıkarır.
 * Örn: "http://strapi-abc:1337/uploads/foto.jpg" → "/uploads/foto.jpg"
 */
function extractPathFromUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.pathname;
  } catch {
    return url;
  }
}

/**
 * Ham URL string'ini tam bir PUBLIC Strapi medya URL'sine dönüştürür.
 *
 * @param {string} rawUrl
 * @returns {string|null}
 */
function resolveMediaUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  // Path traversal koruması: ".." sekanslarını temizle
  const sanitized = rawUrl.replace(/\.\.(\/|\\|$)/g, '');
  rawUrl = sanitized;

  // ── Absolute URL ────────────────────────────────────────────────────────
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    // Internal Docker URL → path'i çıkar, public URL ile yeniden oluştur
    if (isInternalUrl(rawUrl)) {
      const path = extractPathFromUrl(rawUrl);
      const withUploads = path.startsWith('/uploads/') ? path : `/uploads${path}`;
      return `${MEDIA_BASE_URL}${withUploads}`;
    }
    // Zaten public URL — sadece /uploads/ kontrolü yap
    try {
      const parsed = new URL(rawUrl);
      if (!parsed.pathname.startsWith('/uploads/')) {
        parsed.pathname = `/uploads${parsed.pathname}`;
        return parsed.toString();
      }
    } catch { /* geçersiz URL */ }
    return rawUrl;
  }

  // ── Relative URL (/ ile başlayan) ───────────────────────────────────────
  if (rawUrl.startsWith('/')) {
    const withUploads = rawUrl.startsWith('/uploads/') ? rawUrl : `/uploads${rawUrl}`;
    return `${MEDIA_BASE_URL}${withUploads}`;
  }

  // ── Sadece dosya adı (prefix yok) ──────────────────────────────────────
  // Örn: "izlenebilirlikicon2_86ced8c0dc.webp"
  return `${MEDIA_BASE_URL}/uploads/${rawUrl}`;
}

/**
 * Strapi media alanından tam PUBLIC URL çıkarır.
 * Hem Strapi v4 (data.attributes.url) hem v5 (url) formatını destekler.
 *
 * @param {any} media  - Strapi media objesi veya URL string'i
 * @param {string|null} fallback
 * @returns {string|null}
 */
export function extractMediaUrl(media, fallback = null) {
  if (!media) return fallback;

  let rawUrl = null;

  if (typeof media === 'string') {
    rawUrl = media;
  } else {
    // Strapi v4: media.data.attributes.url | v5: media.url | media.attributes.url
    rawUrl =
      media?.data?.attributes?.url ??
      media?.url ??
      media?.attributes?.url ??
      null;
  }

  if (!rawUrl) return fallback;

  const resolved = resolveMediaUrl(rawUrl);
  return resolved ?? fallback;
}

/**
 * Strapi media dizisinden URL dizisi çıkarır.
 *
 * @param {any[]} mediaArr
 * @returns {string[]}
 */
export function extractMediaArray(mediaArr) {
  if (!Array.isArray(mediaArr)) return [];
  return mediaArr.map((m) => extractMediaUrl(m)).filter(Boolean);
}

/**
 * SVG dosyaları için /api/media proxy üzerinden URL döner.
 * SVG'lerde Content-Disposition:inline ve CORS header'ı gereklidir.
 * Diğer formatlar (webp, jpg, png) için extractMediaUrl kullanın.
 *
 * @param {any} media
 * @param {string|null} fallback
 * @returns {string|null}
 */
export function extractMediaUrlProxied(media, fallback = null) {
  const url = extractMediaUrl(media, fallback);
  if (!url) return fallback;

  // Sadece Strapi /uploads/ SVG dosyalarını proxy'le
  if (url.includes('/uploads/') && url.toLowerCase().endsWith('.svg')) {
    return `/api/media?url=${encodeURIComponent(url)}`;
  }

  // Diğer formatlar direkt URL
  return url;
}
