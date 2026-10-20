/**
 * Ortak HTTP güvenlik yardımcıları (API rotaları için).
 */

import { timingSafeEqual } from 'node:crypto';

export const SUPPORTED_LOCALES = ['tr', 'en', 'ro'];

/** Kullanıcıdan gelen dil parametresini beyaz listeyle sınırlar (Strapi sorgusuna enjeksiyonu önler). */
export function safeLocale(value, fallback = 'ro') {
  return SUPPORTED_LOCALES.includes(value) ? value : fallback;
}

/**
 * İstemci IP'si. Arkada bir reverse proxy (Coolify/Traefik/Cloudflare) varsa o set eder;
 * doğrudan internete açık bir sunucuda X-Forwarded-For istemci tarafından sahtelenebilir.
 */
export function getClientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? 'unknown'
  );
}

// ── Bellek içi sabit pencere rate limiter ────────────────────────────────────
// Not: tek süreç içindir; birden fazla replika varsa her biri ayrı sayar.
const buckets = new Map();
const MAX_BUCKETS = 5000;

export function isRateLimited(key, { max, windowMs }) {
  const now = Date.now();

  // Süresi dolan kayıtları temizle (Map sınırsız büyümesin)
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, v] of buckets) {
      if (now > v.reset) buckets.delete(k);
    }
    // Hâlâ çok doluysa en eskileri at
    if (buckets.size > MAX_BUCKETS) {
      for (const k of buckets.keys()) {
        buckets.delete(k);
        if (buckets.size <= MAX_BUCKETS / 2) break;
      }
    }
  }

  const entry = buckets.get(key);
  if (!entry || now > entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return false;
  }

  if (entry.count >= max) return true;
  entry.count += 1;
  return false;
}

/** Sabit zamanlı (timing-safe) dize karşılaştırması. */
export function safeEqual(a, b) {
  const bufA = Buffer.from(String(a ?? ''));
  const bufB = Buffer.from(String(b ?? ''));
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
