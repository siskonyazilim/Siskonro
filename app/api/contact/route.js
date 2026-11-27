import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { strapiGet } from '@/lib/strapi/client';
import { isRateLimited } from '@/lib/security/http';
import { needsCompany, needsSector } from '@/lib/contactTopics';
import { buildLeadEmail, withFromName } from '@/lib/email/leadEmail';
import { toRequestTypeKey } from '@/lib/contactRequestTypes';
import {
  getClientIp,
  verifyFormTicket,
  checkDuplicateSubmission,
  markSubject,
  checkTurnstileResult,
} from '@/lib/security/formGuard';

// formGuard sayaç anahtarı öneki (siteler arası anahtar çakışmasın)
const GUARD_SITE = 'siskon-ro';
// Turnstile token'ının üretilmesine izin verilen alan adları (www. hali otomatik; TURNSTILE_ALLOWED_HOSTNAMES ile ezilebilir)
const TURNSTILE_HOSTNAMES = ['siskon.ro'];

// ── Strapi'ye form kaydı gönderen yardımcı ──────────────────────────────────
async function saveToStrapi(payload, locale) {
  const STRAPI_URL = process.env.STRAPI_URL || process.env.STRAPI_API_URL;
  const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
  if (!STRAPI_URL || !STRAPI_TOKEN) return; // yapılandırılmamışsa atla

  const body = JSON.stringify({
    data: {
      firstName:  String(payload.firstName  || '').slice(0, 255),
      lastName:   String(payload.lastName   || '').slice(0, 255),
      company:    String(payload.company    || '').slice(0, 255),
      phone:      String(payload.phone      || '').slice(0, 50),
      position:   String(payload.position   || '').slice(0, 255),
      sector:     String(payload.sector     || '').slice(0, 255),
      email:      String(payload.email      || '').slice(0, 255),
      message:    String(payload.message    || '').slice(0, 4000),
      language:   locale,           // 'tr' | 'en' — "locale" reserved olduğundan "language" kullandık
      consentGiven: true,
    },
  });

  try {
    const res = await fetch(`${STRAPI_URL}/api/contact-form-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error(`[Strapi] contact-form-submission failed [${res.status}]:`, text.slice(0, 300));
    }
  } catch (err) {
    // Strapi erişilemez olsa da e-posta başarılı sayılır
    console.error('[Strapi] contact-form-submission error:', err?.message);
  }
}

// Şirket ve sektör konuya göre zorunlu (bkz. getMissingFields): Kariyer / Staj / Diğer'de şirket boş olabilir,
// sektör yalnızca Genel Başvuru / Satış / Teknik Destek'te sorulur.
const REQUIRED_FIELDS = ['firstName', 'lastName', 'phone', 'position', 'email', 'message'];
const CSRF_COOKIE_NAME = 'csrf_token';
const MAX_FIELD_LENGTH = 2000;

// --- Rate limiter (in-memory, per IP: 5 req / 60 s) — ortak yardımcı, bellek temizliği içerir ---
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function isContactRateLimited(ip) {
  return isRateLimited(`contact:${ip}`, { max: RATE_LIMIT_MAX, windowMs: RATE_LIMIT_WINDOW_MS });
}

// --- Structured logger ---
function log(level, event, data = {}) {
  const entry = JSON.stringify({ ts: new Date().toISOString(), level, event, ...data });
  if (level === 'error' || level === 'warn') {
    console.error(entry);
  } else {
    console.log(entry);
  }
}

// Bu proje siskon.ro: e-posta şablonu formun dilinde üretilir (lib/email/leadEmail.js)
const SUPPORTED_LOCALES = ['tr', 'en', 'ro'];

// Kullanıcıya dönen API hata mesajları (form bunları olduğu gibi gösteriyor)
const API_MESSAGES = {
  tr: {
    captchaMissing: 'Lütfen robot olmadığınızı doğrulayın.',
    captchaFailed: 'Güvenlik doğrulaması başarısız oldu. Lütfen sayfayı yenileyip tekrar deneyin.',
    missingFields: 'Lütfen zorunlu alanların tamamını doldurun.',
    invalidEmail: 'Lütfen geçerli bir e-posta adresi girin.',
    sendFailed: 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.',
  },
  en: {
    captchaMissing: 'Please verify that you are not a robot.',
    captchaFailed: 'Security verification failed. Please refresh the page and try again.',
    missingFields: 'Please fill all required fields.',
    invalidEmail: 'Please enter a valid email address.',
    sendFailed: 'Your message could not be sent. Please try again later.',
  },
  ro: {
    captchaMissing: 'Vă rugăm să verificați că nu sunteți un robot.',
    captchaFailed: 'Verificarea de securitate a eșuat. Vă rugăm să reîncărcați pagina și să încercați din nou.',
    missingFields: 'Vă rugăm să completați toate câmpurile obligatorii.',
    invalidEmail: 'Vă rugăm să introduceți o adresă de e-mail validă.',
    sendFailed: 'Mesajul dumneavoastră nu a putut fi trimis. Vă rugăm să încercați din nou mai târziu.',
  },
};

// ── Gönderen / alıcı adresleri: Strapi contact-page-content (mailFrom, mailTo) → env fallback ──
const MAIL_ADDRESS_TTL_MS = 60_000;
const _mailAddressCache = new Map(); // locale → { at, value }

async function getMailAddresses(locale) {
  const now = Date.now();
  const cached = _mailAddressCache.get(locale);
  if (cached && now - cached.at < MAIL_ADDRESS_TTL_MS) {
    return cached.value;
  }

  let strapiFrom = '';
  let strapiTo = '';
  try {
    const res = await strapiGet(`contact-page-content?locale=${locale}&fields[0]=mailFrom&fields[1]=mailTo`);
    const d = res?.data?.attributes ?? res?.data ?? {};
    strapiFrom = String(d.mailFrom || '').trim();
    strapiTo = String(d.mailTo || '').trim();
  } catch (err) {
    console.error('[Strapi] mail address fetch error:', err?.message);
  }

  const defaultFrom = process.env.CONTACT_FORM_FROM || process.env.SMTP_FROM || process.env.SMTP_USER;
  const defaultTo = process.env.CONTACT_FORM_TO || process.env.CONTACT_TO || 'web@siskon.com.tr';

  const value = { from: strapiFrom || defaultFrom, to: strapiTo || defaultTo };

  _mailAddressCache.set(locale, { at: now, value });
  return value;
}

// --- Transporter singleton (created once per container lifetime) ---
let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST || 'smtp.office365.com';
  const port = Number.parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP credentials are not configured.');
  }

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    // Bağlantıyı yeniden kullan (her istekte TLS + login tekrarlanmasın)
    pool: true,
    maxConnections: 2,
    // SMTP'ye ulaşılamazsa dakikalarca asılı kalmasın
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  return _transporter;
}

function isValidEmail(email) {
  // Virgül/noktalı virgül/<> yok: tek adres olmalı (Reply-To'ya birden fazla alıcı eklenemesin)
  const value = String(email || '');
  return value.length <= 254 && /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(value);
}

function sanitize(value) {
  return String(value || '')
    .slice(0, MAX_FIELD_LENGTH)
    .replace(/[<>"'`]/g, '')
    .replace(/[\r\n]/g, ' '); // prevent SMTP header injection
}

function getMissingFields(payload) {
  const required = [
    ...REQUIRED_FIELDS,
    ...(needsCompany(payload.position) ? ['company'] : []),
    ...(needsSector(payload.position) ? ['sector'] : []),
  ];
  return required.filter((field) => !String(payload[field] || '').trim());
}

function getCookieValue(cookieHeader, cookieName) {
  const parts = String(cookieHeader || '').split(';');
  for (const part of parts) {
    const [name, ...rest] = part.trim().split('=');
    if (name === cookieName) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return '';
}

function isValidCsrfToken(value) {
  return /^[a-f0-9]{64}$/i.test(String(value || ''));
}

// Mesaj gövdesi için: satır sonlarını korur, kontrol karakterlerini temizler

export async function POST(request) {
  // cf-connecting-ip → x-real-ip → x-forwarded-for (bkz. formGuard.getClientIp)
  const ip = getClientIp(request);

  let locale = 'ro';

  try {
    // Rate limiting
    if (isContactRateLimited(ip)) {
      log('warn', 'contact_rate_limited', { ip });
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const csrfHeaderToken = request.headers.get('x-csrf-token') || '';
    const csrfCookieToken = getCookieValue(request.headers.get('cookie'), CSRF_COOKIE_NAME);

    if (
      !isValidCsrfToken(csrfHeaderToken)
      || !isValidCsrfToken(csrfCookieToken)
      || csrfHeaderToken !== csrfCookieToken
    ) {
      log('warn', 'contact_csrf_invalid', { ip });
      return NextResponse.json({ message: 'Invalid CSRF token.' }, { status: 403 });
    }

    const payload = await request.json();
    locale = SUPPORTED_LOCALES.includes(payload?.locale) ? payload.locale : 'ro';

    // Honeypot: gizli alan doluysa bot kabul edilir. Bota ipucu vermemek için başarılı yanıt
    // döner, ama e-posta gönderilmez ve Strapi'ye kayıt atılmaz.
    if (String(payload?._hp ?? '').trim()) {
      log('warn', 'contact_honeypot_triggered', { ip });
      return NextResponse.json({ success: true });
    }

    // İmzalı form bileti: formun açılış zamanını sunucu imzalar, bot taklit edemez.
    const ticket = verifyFormTicket(payload?.formTicket);
    if (!ticket.ok) {
      log('warn', 'contact_ticket_rejected', { ip, reason: ticket.reason, ageMs: ticket.ageMs });
      if (ticket.reason === 'too_fast') {
        // Bota ipucu verme: başarılı görün, e-posta gönderme.
        return NextResponse.json({ success: true });
      }
      if (ticket.reason === 'not_configured') {
        return NextResponse.json({ message: API_MESSAGES[locale].sendFailed }, { status: 503 });
      }
      return NextResponse.json({ message: API_MESSAGES[locale].captchaFailed, code: 'form_ticket' }, { status: 400 });
    }

    // Cloudflare Turnstile sunucu doğrulaması.
    // Üretimde secret tanımlı değilse form KAPALI kalır (sessizce atlanmaz); geliştirmede atlanır.
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      // Token'ı yazdırılabilir ASCII ile sınırla (undici ByteString hatalarını önler)
      const turnstileToken = String(payload?.turnstileToken || '').replace(/[^ -~]/g, '').slice(0, 2048);
      if (!turnstileToken) {
        log('warn', 'contact_turnstile_missing', { ip });
        return NextResponse.json(
          { message: API_MESSAGES[locale].captchaMissing },
          { status: 400 }
        );
      }

      const verifyBody = new URLSearchParams({ secret: turnstileSecret, response: turnstileToken });
      if (ip && ip !== 'unknown') verifyBody.set('remoteip', ip);

      let verifyData;
      try {
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: verifyBody,
          signal: AbortSignal.timeout(10_000),
        });
        verifyData = await verifyRes.json();
      } catch (err) {
        log('error', 'contact_turnstile_unreachable', { ip, message: err?.message });
        return NextResponse.json({ message: API_MESSAGES[locale].sendFailed }, { status: 503 });
      }

      // success + hostname + action (bkz. formGuard.checkTurnstileResult)
      const turnstileCheck = checkTurnstileResult(verifyData, TURNSTILE_HOSTNAMES);
      if (!turnstileCheck.ok) {
        log('warn', 'contact_turnstile_failed', { ip, codes: verifyData?.['error-codes'], reason: turnstileCheck.reason, hostname: turnstileCheck.hostname, action: turnstileCheck.action });
        return NextResponse.json(
          { message: API_MESSAGES[locale].captchaFailed },
          { status: 403 }
        );
      }
    } else if (process.env.NODE_ENV === 'production') {
      log('error', 'contact_turnstile_not_configured', { ip });
      return NextResponse.json({ message: API_MESSAGES[locale].sendFailed }, { status: 503 });
    }

    const missingFields = getMissingFields(payload);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: API_MESSAGES[locale].missingFields,
          fields: missingFields,
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        {
          message: API_MESSAGES[locale].invalidEmail,
          fields: ['email'],
        },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const { from, to } = await getMailAddresses(locale);

    // Aynı e-posta / aynı metin kısa sürede tekrar geldiyse reddetme, konuyu [ŞÜPHELİ] işaretle.
    const duplicate = checkDuplicateSubmission(GUARD_SITE, { email: payload.email, message: payload.message });
    if (duplicate.suspicious) log('warn', 'contact_duplicate_flagged', { ip, reasons: duplicate.reasons });

    // Ortak kurumsal e-posta şablonu (lib/email/leadEmail.js)
    const { subject: baseSubject, text, html, fromName } = buildLeadEmail({
      theme: 'siskon',
      site: 'siskon.ro',
      timeZone: 'Europe/Bucharest',
      formLocale: locale,
      requestType: toRequestTypeKey(payload.position),
      topic: sanitize(payload.position),
      firstName: sanitize(payload.firstName),
      lastName: sanitize(payload.lastName),
      email: sanitize(payload.email),
      phone: sanitize(payload.phone),
      company: sanitize(payload.company),
      sector: sanitize(payload.sector),
      message: String(payload.message ?? ''),
      pageUrl: request.headers.get('referer'),
      consents: [{ label: 'KVKK', value: payload.consent === true || payload.consent === 'true' }],
    });
    const subject = markSubject(baseSubject, duplicate.suspicious);

    await transporter.sendMail({
      from: withFromName(from, fromName),
      to,
      replyTo: sanitize(payload.email),
      subject,
      text,
      html,
    });

    log('info', 'contact_form_sent', {
      ip,
      locale,
      company: sanitize(payload.company),
      position: sanitize(payload.position),
    });

    // Strapi'ye kayıt at (fire-and-forget — başarısız olsa da kullanıcıya hata göstermez)
    saveToStrapi(payload, locale).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    log('error', 'contact_form_error', {
      ip,
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: String(error.response || '').slice(0, 300),
    });

    return NextResponse.json(
      { message: API_MESSAGES[locale].sendFailed },
      { status: 500 }
    );
  }
}
