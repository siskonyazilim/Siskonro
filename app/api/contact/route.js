import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { strapiGet } from '@/lib/strapi/client';
import { isRateLimited } from '@/lib/security/http';

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

const REQUIRED_FIELDS = ['firstName', 'lastName', 'company', 'phone', 'position', 'sector', 'email', 'message'];
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

// ── Gönderen / alıcı adresleri: Strapi contact-page-content (mailFrom, mailTo) → env fallback ──
const MAIL_ADDRESS_TTL_MS = 60_000;
let _mailAddressCache = { at: 0, value: null };

async function getMailAddresses(locale) {
  const now = Date.now();
  if (_mailAddressCache.value && now - _mailAddressCache.at < MAIL_ADDRESS_TTL_MS) {
    return _mailAddressCache.value;
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

  const value = {
    from: strapiFrom || process.env.CONTACT_FORM_FROM || process.env.SMTP_FROM || process.env.SMTP_USER,
    to: strapiTo || process.env.CONTACT_FORM_TO || process.env.CONTACT_TO || process.env.SMTP_USER,
  };
  _mailAddressCache = { at: now, value };
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
  return REQUIRED_FIELDS.filter((field) => !String(payload[field] || '').trim());
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

function buildMailContent(payload, locale) {
  const isEn = locale === 'en';
  const subject = isEn
    ? `New Contact Form Message - ${sanitize(payload.firstName)} ${sanitize(payload.lastName)}`
    : `Yeni İletişim Formu Mesajı - ${sanitize(payload.firstName)} ${sanitize(payload.lastName)}`;

  const lines = [
    `Name: ${sanitize(payload.firstName)} ${sanitize(payload.lastName)}`,
    `Company: ${sanitize(payload.company)}`,
    `Phone: ${sanitize(payload.phone)}`,
    `Position: ${sanitize(payload.position)}`,
    `Sector: ${sanitize(payload.sector)}`,
    `Email: ${sanitize(payload.email)}`,
    '',
    'Message:',
    sanitize(payload.message),
  ];

  const text = lines.join('\n');
  const html = `
    <h2>${isEn ? 'New Contact Form Message' : 'Yeni İletişim Formu Mesajı'}</h2>
    <p><strong>${isEn ? 'Name' : 'Ad Soyad'}:</strong> ${sanitize(payload.firstName)} ${sanitize(payload.lastName)}</p>
    <p><strong>${isEn ? 'Company' : 'Şirket'}:</strong> ${sanitize(payload.company)}</p>
    <p><strong>${isEn ? 'Phone' : 'Telefon'}:</strong> ${sanitize(payload.phone)}</p>
    <p><strong>${isEn ? 'Position' : 'Pozisyon'}:</strong> ${sanitize(payload.position)}</p>
    <p><strong>${isEn ? 'Sector' : 'Sektör'}:</strong> ${sanitize(payload.sector)}</p>
    <p><strong>Email:</strong> ${sanitize(payload.email)}</p>
    <p><strong>${isEn ? 'Message' : 'Mesaj'}:</strong></p>
    <p>${sanitize(payload.message).replaceAll('\n', '<br/>')}</p>
  `;

  return { subject, text, html };
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

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
    const locale = payload?.locale === 'en' ? 'en' : 'tr';

    // reCAPTCHA server-side verification (only when secret key is configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      // Strip to printable ASCII only — prevents ByteString errors in Node.js fetch (undici)
      // when the token contains non-Latin1 characters before percent-encoding.
      const recaptchaToken = String(payload?.recaptchaToken || '').replace(/[^\x20-\x7E]/g, '');
      if (!recaptchaToken) {
        log('warn', 'contact_recaptcha_missing', { ip });
        return NextResponse.json(
          { message: locale === 'en' ? 'Please complete the reCAPTCHA.' : 'Lütfen reCAPTCHA doğrulamasını tamamlayın.' },
          { status: 400 }
        );
      }

      // Use explicit encodeURIComponent instead of URLSearchParams to avoid
      // undici ByteString validation issues in certain Node.js versions.
      const verifyBody = `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`;
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: verifyBody,
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        log('warn', 'contact_recaptcha_failed', { ip, codes: verifyData['error-codes'] });
        return NextResponse.json(
          { message: locale === 'en' ? 'reCAPTCHA verification failed.' : 'reCAPTCHA doğrulaması başarısız.' },
          { status: 403 }
        );
      }
    }

    const missingFields = getMissingFields(payload);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: locale === 'en'
            ? 'Please fill all required fields.'
            : 'Lütfen zorunlu alanların tamamını doldurun.',
          fields: missingFields,
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        {
          message: locale === 'en'
            ? 'Please enter a valid email address.'
            : 'Lütfen geçerli bir e-posta adresi girin.',
          fields: ['email'],
        },
        { status: 400 }
      );
    }

    const transporter = getTransporter();
    const { from, to } = await getMailAddresses(locale);

    const { subject, text, html } = buildMailContent(payload, locale);

    await transporter.sendMail({
      from,
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
      { message: 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}
