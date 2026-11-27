/**
 * İletişim formu bildirim e-postası — Siskon Grubu ortak şablonu (tüm sitelerde aynı dosya).
 * Tasarım: "Siskon Grubu — Ortak İletişim Formu" (form bildirimi e-postası).
 *
 * E-posta istemcileri (Outlook, Gmail) flex/grid desteklemediği için yerleşim tablo + satır içi
 * stil ile kurulur. Tüm kullanıcı verisi HTML'e kaçışlanarak yazılır.
 *
 * Kullanım (route içinde):
 *   const { subject, text, html, fromName } = buildLeadEmail({
 *     theme: 'siskon', site: 'siskon.com.tr', timeZone: 'Europe/Istanbul',
 *     formLocale: 'tr', requestType: 'sales', topic: 'Demo Talebi',
 *     firstName, lastName, email, phone, company, sector, message,
 *     pageUrl: request.headers.get('referer'), consents: [{ label: 'KVKK', value: true }],
 *   });
 */
import { requestTypeLabel } from '../contactRequestTypes';

export const EMAIL_THEMES = {
  siskon: { brand: 'SISKON', headBg: '#071018', headFg: '#FFFFFF', headMuted: '#A9BAC7', accent: '#31E2FF', btnBg: '#0B1720', btnFg: '#31E2FF', link: '#006F85', badgeBg: '#0B1720', badgeFg: '#31E2FF' },
  izle: { brand: 'izlenebilirlik', headBg: '#0E1F4B', headFg: '#FFFFFF', headMuted: '#B7C3E3', accent: '#00B5F7', btnBg: '#0E1F4B', btnFg: '#FFFFFF', link: '#006FA8', badgeBg: '#0E1F4B', badgeFg: '#FFFFFF' },
  onsuite: { brand: 'OnSuite', headBg: '#0B5CAD', headFg: '#FFFFFF', headMuted: '#D6E6F7', accent: '#2196F3', btnBg: '#0B5CAD', btnFg: '#FFFFFF', link: '#0B5CAD', badgeBg: '#0B5CAD', badgeFg: '#FFFFFF' },
};

const INK = '#1B2430';
const MUTED = '#4A5565';
const LINE = '#E3E7EC';

// Etiket sözlüğü: e-posta formun doldurulduğu dilde (tr/en/ro) üretilir.
const L = {
  tr: {
    title: 'Yeni iletişim formu mesajı', replyEmail: 'E-posta ile yanıtla', call: 'Ara', message: 'Mesaj',
    sender: 'Gönderen bilgileri', record: 'Kayıt bilgileri', name: 'Ad Soyad', email: 'E-posta', phone: 'Telefon',
    company: 'Şirket', requestType: 'Talep türü', topic: 'Konu', sector: 'Sektör', notSpecified: 'Belirtilmedi',
    site: 'Site', page: 'Sayfa', formLang: 'Form dili', sentAt: 'Gönderim zamanı', consents: 'Onaylar',
    yes: 'Evet', no: 'Hayır', fromSuffix: 'İletişim Formu',
    langs: { tr: 'Türkçe', en: 'İngilizce', ro: 'Rumence' },
  },
  en: {
    title: 'New contact form message', replyEmail: 'Reply by email', call: 'Call', message: 'Message',
    sender: 'Sender details', record: 'Submission details', name: 'Full name', email: 'Email', phone: 'Phone',
    company: 'Company', requestType: 'Request type', topic: 'Topic', sector: 'Sector', notSpecified: 'Not specified',
    site: 'Site', page: 'Page', formLang: 'Form language', sentAt: 'Submitted at', consents: 'Consents',
    yes: 'Yes', no: 'No', fromSuffix: 'Contact Form',
    langs: { tr: 'Turkish', en: 'English', ro: 'Romanian' },
  },
  ro: {
    title: 'Mesaj nou din formularul de contact', replyEmail: 'Răspunde prin e-mail', call: 'Sună', message: 'Mesaj',
    sender: 'Date expeditor', record: 'Detalii trimitere', name: 'Nume complet', email: 'E-mail', phone: 'Telefon',
    company: 'Companie', requestType: 'Tip solicitare', topic: 'Subiect', sector: 'Sector', notSpecified: 'Nespecificat',
    site: 'Site', page: 'Pagină', formLang: 'Limba formularului', sentAt: 'Trimis la', consents: 'Consimțăminte',
    yes: 'Da', no: 'Nu', fromSuffix: 'Formular de contact',
    langs: { tr: 'Turcă', en: 'Engleză', ro: 'Română' },
  },
};

const TZ_LABEL = { 'Europe/Istanbul': { tr: 'TSİ', en: 'TRT', ro: 'ora Turciei' }, 'Europe/Bucharest': { tr: 'Romanya saati', en: 'EET', ro: 'ora României' } };
const INTL_LOCALE = { tr: 'tr-TR', en: 'en-GB', ro: 'ro-RO' };

function esc(value) {
  return String(value ?? '').replace(/[&<>"'`]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '`': '&#96;' }[ch]));
}

function clean(value, max = 500) {
  // Kontrol karakterlerini ve başlık enjeksiyonu riski taşıyan satır sonlarını tek satırlık alanlardan temizle
  return String(value ?? '').replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

function cleanMultiline(value, max = 4000) {
  return String(value ?? '').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').trim().slice(0, max);
}

/** Referer'dan yalnız origin + path (sorgu dizesi atılır: gclid/utm gibi parametreler e-postaya düşmesin). */
function safePageUrl(raw) {
  try {
    const u = new URL(String(raw || ''));
    if (!/^https?:$/.test(u.protocol)) return '';
    return (u.origin + u.pathname).slice(0, 300);
  } catch {
    return '';
  }
}

function formatDates(date, timeZone, mailLocale) {
  const intl = INTL_LOCALE[mailLocale] || 'tr-TR';
  const long = new Intl.DateTimeFormat(intl, { timeZone, day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone, day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date).map((p) => [p.type, p.value]));
  const tz = TZ_LABEL[timeZone]?.[mailLocale] || timeZone;
  return { long, short: `${parts.day}.${parts.month}.${parts.year} ${parts.hour}:${parts.minute} (${tz})` };
}

/**
 * nodemailer "from" değerine görünen ad ekler ("siskon.com.tr İletişim Formu <bilgi@…>").
 * Ortam değişkeni zaten "Ad <adres>" biçimindeyse olduğu gibi bırakır.
 */
export function withFromName(from, fromName) {
  const value = String(from || '').trim();
  if (!value || value.includes('<')) return value;
  return { name: fromName, address: value };
}

/**
 * @param {object} o
 * @param {'siskon'|'izle'|'onsuite'} o.theme
 * @param {string} o.site            ör. 'siskon.com.tr'
 * @param {string} [o.timeZone]      'Europe/Istanbul' | 'Europe/Bucharest'
 * @param {'tr'|'en'|'ro'} [o.mailLocale] e-posta dilini zorlamak için (varsayılan: formLocale)
 * @param {'tr'|'en'|'ro'} [o.formLocale] formun doldurulduğu dil
 * @param {string} o.requestType     contactRequestTypes anahtarı (sales/support/…)
 * @param {string} [o.topic]         formdaki özgün seçim (ör. "Demo Talebi"); talep türünden farklıysa ayrıca gösterilir
 * @param {Array<{label:string,value:boolean}>} [o.consents]
 */
export function buildLeadEmail(o) {
  const c = EMAIL_THEMES[o.theme] || EMAIL_THEMES.siskon;
  const site = clean(o.site, 100);
  // E-posta, formun doldurulduğu dilde gelir (İngilizce form → İngilizce başlıklar).
  // Öncelik: çağıranın mailLocale'i → formLocale → CONTACT_MAIL_LOCALE → .ro siteleri 'ro', diğerleri 'tr'
  const mailLocale = [o.mailLocale, o.formLocale, process.env.CONTACT_MAIL_LOCALE].find((x) => L[x])
    || (site.endsWith('.ro') ? 'ro' : 'tr');
  const t = L[mailLocale];
  const timeZone = o.timeZone || (site.endsWith('.ro') ? 'Europe/Bucharest' : 'Europe/Istanbul');

  const fullName = clean(o.fullName || [o.firstName, o.lastName].filter(Boolean).join(' '), 200) || '-';
  const email = clean(o.email, 254);
  const phone = clean(o.phone, 50);
  const company = clean(o.company, 200);
  const sector = clean(o.sector, 200);
  const message = cleanMultiline(o.message);
  const typeLabel = requestTypeLabel(o.requestType, mailLocale);
  const topic = clean(o.topic, 200);
  const showTopic = topic && topic.toLowerCase() !== typeLabel.toLowerCase();
  const pageUrl = safePageUrl(o.pageUrl);
  const formLang = t.langs[o.formLocale] || clean(o.formLocale, 10);
  const { long: dateLong, short: dateShort } = formatDates(o.date || new Date(), timeZone, mailLocale);
  const consents = Array.isArray(o.consents) ? o.consents : [];

  const subject = `[${typeLabel}] ${fullName} — ${company || site}`;
  const fromName = `${site} ${t.fromSuffix}`;
  const mailHref = `mailto:${email}`;
  const telHref = `tel:${phone.replace(/[^\d+]/g, '')}`;

  /* ── HTML yardımcıları ── */
  const h2 = (label) => `<div style="margin:0 0 8px;font-size:13px;line-height:1.4;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED}">${esc(label)}</div>`;
  const row = (label, valueHtml) => `<tr><th scope="row" align="left" valign="top" style="width:160px;padding:9px 12px 9px 0;border-top:1px solid ${LINE};font-weight:400;color:${MUTED};font-size:15px;line-height:1.5">${esc(label)}</th><td valign="top" style="padding:9px 0;border-top:1px solid ${LINE};color:${INK};font-weight:600;font-size:15px;line-height:1.5;word-break:break-word">${valueHtml}</td></tr>`;
  const metaRow = (label, valueHtml) => `<tr><th scope="row" align="left" valign="top" style="width:160px;padding:3px 12px 3px 0;font-weight:400;color:${MUTED};font-size:13px;line-height:1.5">${esc(label)}</th><td valign="top" style="padding:3px 0;color:${INK};font-size:13px;line-height:1.5;word-break:break-word">${valueHtml}</td></tr>`;
  const link = (href, label) => `<a href="${esc(href)}" style="color:${c.link};font-weight:600;text-decoration:underline">${esc(label)}</a>`;
  const button = (href, label, primary) => `<td width="50%" valign="top" style="padding:0 ${primary ? '6px' : '0'} 0 ${primary ? '0' : '6px'}"><a href="${esc(href)}" style="display:block;line-height:22px;padding:11px 16px;border-radius:8px;border:1px solid ${primary ? c.btnBg : '#6B7686'};background:${primary ? c.btnBg : '#FFFFFF'};color:${primary ? c.btnFg : INK};font-size:16px;font-weight:600;text-decoration:none;text-align:center">${esc(label)}</a></td>`;

  const senderRows = [
    row(t.name, esc(fullName)),
    row(t.email, email ? link(mailHref, email) : `<span style="font-weight:400;color:${MUTED}">${esc(t.notSpecified)}</span>`),
    row(t.phone, phone ? link(telHref, phone) : `<span style="font-weight:400;color:${MUTED}">${esc(t.notSpecified)}</span>`),
    row(t.company, company ? esc(company) : `<span style="font-weight:400;color:${MUTED}">${esc(t.notSpecified)}</span>`),
    row(t.requestType, esc(typeLabel)),
    showTopic ? row(t.topic, esc(topic)) : '',
    sector ? row(t.sector, esc(sector)) : '',
  ].join('');

  const metaRows = [
    metaRow(t.site, esc(site)),
    pageUrl ? metaRow(t.page, esc(pageUrl)) : '',
    formLang ? metaRow(t.formLang, esc(formLang)) : '',
    metaRow(t.sentAt, esc(dateShort)),
    consents.length ? metaRow(t.consents, esc(consents.map((x) => `${x.label}: ${x.value ? t.yes : t.no}`).join(' · '))) : '',
  ].join('');

  const messageHtml = esc(message).replace(/\n/g, '<br>');

  const html = `<!DOCTYPE html>
<html lang="${mailLocale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#F2F4F7">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(`${typeLabel} · ${fullName}${company ? ` · ${company}` : ''} — ${message.slice(0, 90)}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F2F4F7">
<tr><td align="center" style="padding:32px 12px;font-family:'Segoe UI',system-ui,-apple-system,'Helvetica Neue',Roboto,Arial,sans-serif;color:${INK}">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid #D9DEE5;border-radius:8px;border-collapse:separate;overflow:hidden">
<tr><td style="background:${c.headBg};border-bottom:4px solid ${c.accent};padding:20px 32px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td align="left" style="font-size:18px;font-weight:700;letter-spacing:0.02em;color:${c.headFg}">${esc(c.brand)}</td>
<td align="right" style="font-size:14px;font-weight:600;color:${c.headFg}">${esc(site)}</td>
</tr></table>
</td></tr>
<tr><td style="padding:28px 32px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td align="left"><span style="display:inline-block;padding:4px 12px;border-radius:999px;background:${c.badgeBg};color:${c.badgeFg};font-size:13px;font-weight:600;line-height:1.4">${esc(typeLabel)}</span></td>
<td align="right" style="font-size:13px;color:${MUTED}">${esc(dateLong)}</td>
</tr></table>
<h1 style="margin:10px 0 0;font-size:22px;line-height:1.3;font-weight:600;color:${INK}">${esc(t.title)}</h1>
<p style="margin:10px 0 0;font-size:16px;line-height:1.5;color:${INK}"><strong style="font-weight:600">${esc(fullName)}</strong>${company ? `<span style="color:${MUTED}"> · ${esc(company)}</span>` : ''}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px"><tr>
${email ? button(mailHref, t.replyEmail, true) : ''}
${phone ? button(telHref, `${t.call}: ${phone}`, false) : ''}
</tr></table>
<div style="margin-top:28px">${h2(t.message)}
<div style="background:#F6F8FA;border:1px solid ${LINE};border-radius:8px;padding:16px;font-size:16px;line-height:1.6;color:${INK};word-break:break-word">${messageHtml}</div></div>
<div style="margin-top:28px">${h2(t.sender)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">${senderRows}</table></div>
<div style="margin-top:28px">${h2(t.record)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">${metaRows}</table></div>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `${t.title} — ${site}`,
    `${t.requestType}: ${typeLabel}${showTopic ? ` (${topic})` : ''}`,
    '',
    `${t.message}:`,
    message,
    '',
    `${t.sender}`,
    `${t.name}: ${fullName}`,
    `${t.email}: ${email || t.notSpecified}`,
    `${t.phone}: ${phone || t.notSpecified}`,
    `${t.company}: ${company || t.notSpecified}`,
    sector ? `${t.sector}: ${sector}` : '',
    '',
    `${t.record}`,
    `${t.site}: ${site}`,
    pageUrl ? `${t.page}: ${pageUrl}` : '',
    formLang ? `${t.formLang}: ${formLang}` : '',
    `${t.sentAt}: ${dateShort}`,
    consents.length ? `${t.consents}: ${consents.map((x) => `${x.label}: ${x.value ? t.yes : t.no}`).join(', ')}` : '',
  ].filter((line, i, arr) => line !== '' || arr[i - 1] !== '').join('\n');

  return { subject, text, html, fromName };
}
