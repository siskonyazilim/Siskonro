/**
 * Media Proxy API Route
 *
 * Strapi'den gelen görselleri (özellikle SVG) proxy'ler ve
 * Content-Disposition: inline header'ı ekler.
 * Bu sayede "Open image in new tab" indirme yerine tarayıcıda gösterir.
 *
 * Kullanım: /api/media?url=https://strapi.../uploads/file.svg
 *
 * GÜVENLİK:
 *  - İstekteki host KULLANILMAZ. Yalnızca yolun (pathname) /uploads/ altında olduğu görseller
 *    kabul edilir ve istek her zaman yapılandırılmış Strapi adresine gider (SSRF yok).
 *  - Yalnızca görsel uzantıları, boyut/zaman sınırı, hata gövdesi önbelleğe alınmaz.
 *  - SVG yanıtlarına script çalıştırmayı engelleyen CSP + sandbox eklenir
 *    (SVG doğrudan açıldığında site origin'inde XSS olmasın).
 */
import { getClientIp, isRateLimited } from '@/lib/security/http';

const FALLBACK_STRAPI = 'https://siskonwebdb.domainmanager.com.tr';
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB
const FETCH_TIMEOUT_MS = 10_000;

const CONTENT_TYPES = {
  svg:  'image/svg+xml',
  webp: 'image/webp',
  png:  'image/png',
  jpg:  'image/jpeg',
  jpeg: 'image/jpeg',
  gif:  'image/gif',
  avif: 'image/avif',
  ico:  'image/x-icon',
};

function text(status, body) {
  return new Response(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function getStrapiOrigin() {
  const base = process.env.STRAPI_URL || process.env.STRAPI_API_URL || FALLBACK_STRAPI;
  try {
    return new URL(base).origin;
  } catch {
    return FALLBACK_STRAPI;
  }
}

export async function GET(request) {
  if (isRateLimited(`media:${getClientIp(request)}`, { max: 300, windowMs: 60_000 })) {
    return text(429, 'Too many requests');
  }

  const rawUrl = new URL(request.url).searchParams.get('url');
  if (!rawUrl) return text(400, 'Missing url parameter');

  let parsed;
  try {
    parsed = new URL(rawUrl, 'http://placeholder.invalid');
  } catch {
    return text(400, 'Invalid URL');
  }

  // Yol doğrulaması: yalnızca /uploads/ altı, üst dizin çıkışı yok
  const pathname = parsed.pathname;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return text(400, 'Invalid URL');
  }
  if (!pathname.startsWith('/uploads/') || decodedPath.includes('..') || decodedPath.includes('\\')) {
    return text(403, 'Forbidden');
  }

  const ext = pathname.split('.').pop()?.toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) return text(415, 'Unsupported media type');

  // Host istekten alınmaz: her zaman yapılandırılmış Strapi'ye gidilir
  const upstreamUrl = `${getStrapiOrigin()}${pathname}`;

  let upstream;
  try {
    upstream = await fetch(upstreamUrl, {
      redirect: 'manual',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 31536000 },
    });
  } catch {
    // Hata ayrıntısı (iç hostname vb.) istemciye verilmez
    return text(502, 'Upstream fetch failed');
  }

  if (!upstream.ok) {
    return text(upstream.status === 404 ? 404 : 502, 'Upstream error');
  }

  const declaredLength = Number(upstream.headers.get('content-length') || 0);
  if (declaredLength > MAX_BYTES) return text(413, 'File too large');

  const buffer = await upstream.arrayBuffer();
  if (buffer.byteLength > MAX_BYTES) return text(413, 'File too large');

  const headers = {
    'Content-Type':           contentType,
    'Content-Disposition':    'inline',
    'Cache-Control':          'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'https://www.siskon.com.tr',
  };

  if (ext === 'svg') {
    // <img> içinde SVG script çalıştırmaz; ama doğrudan URL açılırsa çalıştırabilir → engelle
    headers['Content-Security-Policy'] = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; sandbox";
  }

  return new Response(buffer, { status: 200, headers });
}
