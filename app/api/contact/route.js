import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const REQUIRED_FIELDS = ['firstName', 'lastName', 'company', 'phone', 'position', 'sector', 'email', 'message'];
const CSRF_COOKIE_NAME = 'csrf_token';
const MAX_FIELD_LENGTH = 2000;

// --- Rate limiter (in-memory, per IP: 5 req / 60 s) ---
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
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
  });

  return _transporter;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    if (isRateLimited(ip)) {
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
    const to = process.env.CONTACT_FORM_TO || process.env.SMTP_USER;
    const from = process.env.CONTACT_FORM_FROM || process.env.SMTP_USER;

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

    return NextResponse.json({ success: true });
  } catch (error) {
    log('error', 'contact_form_error', { ip, message: error.message });

    return NextResponse.json(
      { message: 'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}
