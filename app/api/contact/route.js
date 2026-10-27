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

// ── Bu proje siskon.ro'dur: tüm formlar siskon.ro olarak etiketlenir; dil yalnızca mail dilini belirler ──
const SUPPORTED_LOCALES = ['tr', 'en', 'ro'];

const SITE = { site: 'siskon.ro', timeZone: 'Europe/Bucharest' };
const DATE_LOCALE_BY_LOCALE = { tr: 'tr-TR', en: 'en-GB', ro: 'ro-RO' };

// Mail içeriğinde kullanılan etiketler (alıcı tarafı dili)
const MAIL_LABELS = {
  tr: {
    title: 'İletişim Formu',
    language: 'Dil',
    languageName: 'Türkçe',
    source: 'Kaynak',
    sourceValue: (site) => `${site} web sitesi - İletişim Formu`,
    date: 'Tarih',
    sender: 'GÖNDEREN BİLGİLERİ',
    name: 'Ad Soyad',
    company: 'Şirket',
    position: 'Pozisyon',
    sector: 'Sektör',
    phone: 'Telefon',
    email: 'E-posta',
    message: 'MESAJ',
    footer: (site) => `Bu mesaj ${site} internet sitesi iletişim formu aracılığıyla iletilmiştir.`,
    replyHint: 'Göndereni yanıtlamak için bu e-postayı doğrudan yanıtlayabilirsiniz.',
  },
  en: {
    title: 'Contact Form',
    language: 'Language',
    languageName: 'English',
    source: 'Source',
    sourceValue: (site) => `${site} website - Contact Form`,
    date: 'Date',
    sender: 'SENDER DETAILS',
    name: 'Name',
    company: 'Company',
    position: 'Position',
    sector: 'Sector',
    phone: 'Phone',
    email: 'Email',
    message: 'MESSAGE',
    footer: (site) => `This message was submitted via the ${site} website contact form.`,
    replyHint: 'You can reply directly to this email to respond to the sender.',
  },
  ro: {
    title: 'Formular de contact',
    language: 'Limbă',
    languageName: 'Română',
    source: 'Sursă',
    sourceValue: (site) => `Site-ul ${site} - Formular de contact`,
    date: 'Data',
    sender: 'DATELE EXPEDITORULUI',
    name: 'Nume și prenume',
    company: 'Companie',
    position: 'Funcție',
    sector: 'Domeniu',
    phone: 'Telefon',
    email: 'E-mail',
    message: 'MESAJ',
    footer: (site) => `Acest mesaj a fost transmis prin formularul de contact al site-ului ${site}.`,
    replyHint: 'Puteți răspunde direct la acest e-mail pentru a contacta expeditorul.',
  },
};

// Kullanıcıya dönen API hata mesajları (form bunları olduğu gibi gösteriyor)
const API_MESSAGES = {
  tr: {
    recaptchaMissing: 'Lütfen reCAPTCHA doğrulamasını tamamlayın.',
    recaptchaFailed: 'reCAPTCHA doğrulaması başarısız.',
    missingFields: 'Lütfen zorunlu alanların tamamını doldurun.',
    invalidEmail: 'Lütfen geçerli bir e-posta adresi girin.',
    sendFailed: 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.',
  },
  en: {
    recaptchaMissing: 'Please complete the reCAPTCHA.',
    recaptchaFailed: 'reCAPTCHA verification failed.',
    missingFields: 'Please fill all required fields.',
    invalidEmail: 'Please enter a valid email address.',
    sendFailed: 'Your message could not be sent. Please try again later.',
  },
  ro: {
    recaptchaMissing: 'Vă rugăm să completați verificarea reCAPTCHA.',
    recaptchaFailed: 'Verificarea reCAPTCHA a eșuat.',
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
  const defaultTo = process.env.CONTACT_FORM_TO || process.env.CONTACT_TO || process.env.SMTP_USER;

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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Mesaj gövdesi için: satır sonlarını korur, kontrol karakterlerini temizler
function cleanMessage(value) {
  return String(value || '')
    .slice(0, MAX_FIELD_LENGTH)
    .replace(/\r\n?/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .trim();
}

function formatSentAt(locale) {
  const { timeZone } = SITE;
  const formatted = new Intl.DateTimeFormat(DATE_LOCALE_BY_LOCALE[locale], {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date());
  return `${formatted} (${timeZone})`;
}

function buildMailContent(payload, locale) {
  const { site } = SITE;
  const t = MAIL_LABELS[locale];

  const fullName = `${sanitize(payload.firstName)} ${sanitize(payload.lastName)}`.trim();
  const company = sanitize(payload.company);
  const message = cleanMessage(payload.message);
  const sentAt = formatSentAt(locale);

  const subject = `[${site}] ${t.title} - ${fullName} - ${company}`;

  const infoRows = [
    [t.source, t.sourceValue(site)],
    [t.language, t.languageName],
    [t.date, sentAt],
  ];
  const senderRows = [
    [t.name, fullName],
    [t.company, company],
    [t.position, sanitize(payload.position)],
    [t.sector, sanitize(payload.sector)],
    [t.phone, sanitize(payload.phone)],
    [t.email, sanitize(payload.email)],
  ];

  const pad = Math.max(...[...infoRows, ...senderRows].map(([label]) => label.length));
  const textRow = ([label, value]) => `${label.padEnd(pad)} : ${value}`;

  const text = [
    ...infoRows.map(textRow),
    '',
    t.sender,
    ...senderRows.map(textRow),
    '',
    t.message,
    message,
    '',
    '--',
    t.footer(site),
    t.replyHint,
  ].join('\n');

  const htmlRow = ([label, value]) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#555;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>` +
    `<td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`;
  const htmlHeading = (label) =>
    `<p style="margin:20px 0 6px;font-weight:bold;border-bottom:1px solid #ccc;padding-bottom:4px;">${escapeHtml(label)}</p>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#222;line-height:1.5;">
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${infoRows.map(htmlRow).join('')}</table>
      ${htmlHeading(t.sender)}
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${senderRows.map(htmlRow).join('')}</table>
      ${htmlHeading(t.message)}
      <p style="margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #ccc;margin:24px 0 8px;" />
      <p style="margin:0;font-size:12px;color:#777;">${escapeHtml(t.footer(site))}<br/>${escapeHtml(t.replyHint)}</p>
    </div>
  `;

  return { subject, text, html };
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

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

    // reCAPTCHA server-side verification (only when secret key is configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      // Strip to printable ASCII only — prevents ByteString errors in Node.js fetch (undici)
      // when the token contains non-Latin1 characters before percent-encoding.
      const recaptchaToken = String(payload?.recaptchaToken || '').replace(/[^\x20-\x7E]/g, '');
      if (!recaptchaToken) {
        log('warn', 'contact_recaptcha_missing', { ip });
        return NextResponse.json(
          { message: API_MESSAGES[locale].recaptchaMissing },
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
          { message: API_MESSAGES[locale].recaptchaFailed },
          { status: 403 }
        );
      }
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
      { message: API_MESSAGES[locale].sendFailed },
      { status: 500 }
    );
  }
}
