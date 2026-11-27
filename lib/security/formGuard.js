/**
 * İletişim formu koruma katmanı (tüm Siskon sitelerinde aynı dosya).
 *
 * 1) İmzalı form bileti (doldurma süresi kontrolü)
 *    Sayfa açılınca istemci GET /api/form-ticket ile `issuedAt.imza` biçiminde bir bilet alır.
 *    İmza sunucudaki secret ile üretildiği için bot zaman damgasını değiştiremez.
 *    Gönderimde: çok hızlı (< MIN_FILL_MS) → bot, çok eski (> MAX_AGE_MS) → sayfayı yenile.
 *
 * 2) Tekrar işaretleme (reddetmez)
 *    - E-posta     : aynı adres kısa sürede tekrar gelirse e-posta konusu [ŞÜPHELİ – tekrar] olur.
 *    - Mesaj özeti : aynı (normalize edilmiş) metin farklı IP/adreslerden gelirse aynı şekilde işaretlenir.
 *    Sayaçlar uygulama belleğinde tutulur (yeniden başlatmada sıfırlanır; yalnız etiketlemeyi etkiler).
 *    KVKK: bellekte e-posta/mesajın kendisi değil, yalnızca SHA-256 özeti tutulur; en fazla 24 saat.
 *
 *    IP bazlı hız sınırı uygulamada değil, Cloudflare WAF kuralında yapılır (bkz. docs/FORM_GUVENLIGI_VE_WAF.md).
 *
 * Bu dosya bağımsızdır (harici paket yok); diğer repolara olduğu gibi kopyalanabilir.
 */
import { createHmac, createHash, timingSafeEqual } from 'node:crypto';

export const MIN_FILL_MS = 3_000;
export const MAX_AGE_MS = 2 * 60 * 60 * 1000;

const HOUR = 60 * 60_000;
const DAY = 24 * HOUR;

export const RATE_RULES = {
  email: [
    { limit: 3, windowMs: HOUR },
    { limit: 5, windowMs: DAY },
  ],
  content: [{ limit: 2, windowMs: DAY }],
};

export const SUSPICIOUS_PREFIX = '[ŞÜPHELİ – tekrar]';

/* ── İstemci IP'si ─────────────────────────────────────────────────────────
 * Cloudflare arkasında `cf-connecting-ip` güvenilirdir — origin yalnız Cloudflare IP'lerine
 * açıksa. Origin doğrudan erişilebiliyorsa her başlık taklit edilebilir (bkz. WAF rehberi). */
export function getClientIp(request) {
  const h = request.headers;
  const ip =
    h.get('cf-connecting-ip') ||
    h.get('x-real-ip') ||
    h.get('x-forwarded-for')?.split(',')[0] ||
    '';
  return ip.trim().slice(0, 64) || 'unknown';
}

/* ── Form bileti ──────────────────────────────────────────────────────── */
function getTicketSecret() {
  const secret = process.env.FORM_TICKET_SECRET || process.env.TURNSTILE_SECRET_KEY;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') return null;
  return 'dev-only-form-ticket-secret';
}

function sign(value, secret) {
  return createHmac('sha256', secret).update(`form-ticket:${value}`).digest('base64url');
}

/** Yeni bilet üretir. Secret yoksa (production'da) null döner. */
export function issueFormTicket(now = Date.now()) {
  const secret = getTicketSecret();
  if (!secret) return null;
  const issuedAt = String(now);
  return `${issuedAt}.${sign(issuedAt, secret)}`;
}

/**
 * Bileti doğrular.
 * @returns {{ ok: true, ageMs: number } | { ok: false, reason: 'missing'|'invalid'|'too_fast'|'expired'|'not_configured', ageMs?: number }}
 */
export function verifyFormTicket(ticket, now = Date.now()) {
  const secret = getTicketSecret();
  if (!secret) return { ok: false, reason: 'not_configured' };

  const raw = String(ticket ?? '').trim();
  if (!raw) return { ok: false, reason: 'missing' };

  const [issuedAt, signature] = raw.split('.');
  if (!/^\d{13}$/.test(issuedAt || '') || !signature) return { ok: false, reason: 'invalid' };

  const expected = Buffer.from(sign(issuedAt, secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return { ok: false, reason: 'invalid' };
  }

  const ageMs = now - Number(issuedAt);
  if (ageMs < 0) return { ok: false, reason: 'invalid', ageMs };
  if (ageMs < MIN_FILL_MS) return { ok: false, reason: 'too_fast', ageMs };
  if (ageMs > MAX_AGE_MS) return { ok: false, reason: 'expired', ageMs };
  return { ok: true, ageMs };
}

/* ── Normalizasyon ve özetler ─────────────────────────────────────────── */
export function normalizeEmail(email) {
  const value = String(email ?? '').trim().toLowerCase();
  const at = value.lastIndexOf('@');
  if (at < 1) return value;
  let local = value.slice(0, at).split('+')[0];
  let domain = value.slice(at + 1);
  if (domain === 'googlemail.com') domain = 'gmail.com';
  if (domain === 'gmail.com') local = local.replace(/\./g, '');
  return `${local}@${domain}`;
}

/** Şablon spam'i yakalamak için: küçük harf, link/e-posta/rakam çıkarılmış, boşluk tekleştirilmiş metin. */
export function normalizeMessage(message) {
  return String(message ?? '')
    .toLowerCase()
    .replace(/https?:\/\/\S+|www\.\S+/g, ' ')
    .replace(/\S+@\S+/g, ' ')
    .replace(/[0-9]+/g, ' ')
    .replace(/[^\p{L}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function digest(value) {
  return createHash('sha256').update(value).digest('hex').slice(0, 32);
}

/* ── Sayaç deposu: uygulama belleği ─────────────────────────────────── */
const memoryCounters = new Map();

function memoryIncrement(key, windowMs, now = Date.now()) {
  if (memoryCounters.size > 20_000) {
    for (const [k, entry] of memoryCounters) if (now > entry.resetAt) memoryCounters.delete(k);
  }
  const entry = memoryCounters.get(key);
  if (!entry || now > entry.resetAt) {
    memoryCounters.set(key, { count: 1, resetAt: now + windowMs });
    return 1;
  }
  entry.count += 1;
  return entry.count;
}

function incrementAll(entries) {
  return entries.map(({ key, windowMs }) => memoryIncrement(key, windowMs));
}

function buildEntries(site, kind, id) {
  return RATE_RULES[kind].map((rule) => ({
    key: `fg:${site}:${kind}:${id}:${rule.windowMs}`,
    windowMs: rule.windowMs,
    limit: rule.limit,
  }));
}

/**
 * E-posta ve içerik tekrarı. Form doğrulandıktan sonra, e-posta gönderilmeden hemen önce çağrılır.
 * Reddetmez; yalnız işaretler (gerçek müşteri iki kez gönderdiyse talep kaybolmasın).
 * @returns {{ suspicious: boolean, reasons: string[] }}
 */
export function checkDuplicateSubmission(site, { email, message }) {
  const emailEntries = buildEntries(site, 'email', digest(normalizeEmail(email)));
  const normalizedMessage = normalizeMessage(message);
  // Çok kısa metinler ("merhaba", "fiyat?") farklı kişilerden aynı gelebilir: içerik sayacına alma.
  const contentEntries = normalizedMessage.length >= 20
    ? buildEntries(site, 'content', digest(normalizedMessage))
    : [];

  const all = [...emailEntries, ...contentEntries];
  const counts = incrementAll(all);
  const reasons = [];
  if (counts.slice(0, emailEntries.length).some((c, i) => c > emailEntries[i].limit)) reasons.push('email_repeat');
  if (counts.slice(emailEntries.length).some((c, i) => c > contentEntries[i].limit)) reasons.push('content_repeat');
  return { suspicious: reasons.length > 0, reasons };
}

/** E-posta konusuna şüpheli etiketi ekler (zaten varsa tekrar eklemez). */
export function markSubject(subject, suspicious) {
  if (!suspicious || String(subject).startsWith(SUSPICIOUS_PREFIX)) return subject;
  return `${SUSPICIOUS_PREFIX} ${subject}`;
}

/* ── Turnstile siteverify yanıtı kontrolü ──────────────────────────────────
 * `success` tek başına yeterli değil:
 *  - hostname: token'ın üretildiği sayfa bizim alan adımız mı? (Cloudflare panelindeki
 *    hostname listesi gereğinden geniş olursa başka siteden alınan token burada reddedilir.)
 *  - action  : token bu form için mi üretildi? (widget `action: 'contact'` ile render edilir)
 * İzinli alan adları route'tan verilir; TURNSTILE_ALLOWED_HOSTNAMES (virgülle) ile ezilebilir.
 * Geliştirmede (NODE_ENV !== 'production') test anahtarları başka hostname döndürdüğü için atlanır. */
export const TURNSTILE_ACTION = 'contact';

/**
 * @param {object} verifyData  siteverify JSON yanıtı
 * @param {string[]} allowedHostnames  ör. ['siskon.com.tr'] — www. hali otomatik kabul edilir
 * @returns {{ ok: true } | { ok: false, reason: 'failed'|'hostname_mismatch'|'action_mismatch', hostname?: string, action?: string }}
 */
export function checkTurnstileResult(verifyData, allowedHostnames = []) {
  if (verifyData?.success !== true) return { ok: false, reason: 'failed' };
  if (process.env.NODE_ENV !== 'production') return { ok: true };

  const fromEnv = String(process.env.TURNSTILE_ALLOWED_HOSTNAMES || '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  const allowed = new Set();
  for (const h of fromEnv.length ? fromEnv : allowedHostnames) {
    const bare = String(h).toLowerCase().replace(/^www\./, '');
    allowed.add(bare);
    allowed.add(`www.${bare}`);
  }

  const hostname = String(verifyData.hostname || '').toLowerCase();
  if (!allowed.has(hostname)) return { ok: false, reason: 'hostname_mismatch', hostname };

  const action = String(verifyData.action || '');
  if (action !== TURNSTILE_ACTION) return { ok: false, reason: 'action_mismatch', hostname, action };

  return { ok: true };
}
