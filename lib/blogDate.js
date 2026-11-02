/**
 * Blog tarih yardımcıları — istemci bileşenlerinden de güvenle import edilir
 * (lib/strapi/services/blog.js sunucu modülleri içerir, istemciye taşınmamalı).
 */

const TR_MONTHS = {
  ocak: 0, jan: 0, january: 0,
  subat: 1, şubat: 1, feb: 1, february: 1,
  mart: 2, mar: 2, march: 2,
  nisan: 3, apr: 3, april: 3,
  mayis: 4, mayıs: 4, may: 4,
  haziran: 5, jun: 5, june: 5,
  temmuz: 6, jul: 6, july: 6,
  agustos: 7, ağustos: 7, aug: 7, august: 7,
  eylul: 8, eylül: 8, sep: 8, september: 8,
  ekim: 9, oct: 9, october: 9,
  kasim: 10, kasım: 10, nov: 10, november: 10,
  aralik: 11, aralık: 11, dec: 11, december: 11,
};

export function parseDateToTime(rawDate) {
  if (!rawDate) return 0;
  const str = String(rawDate).trim();

  // Tire (-), eğik çizgi (/), nokta (.) veya boşluk ile ayır: "Mayıs-2024", "05-2024", "Mayıs 2024", "2024-05"
  const tokens = str
    .toLowerCase()
    .split(/[-/.\s_]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  let year = null;
  let month = null;

  for (const token of tokens) {
    if (/^\d{4}$/.test(token)) {
      year = parseInt(token, 10);
    } else if (TR_MONTHS[token] !== undefined) {
      month = TR_MONTHS[token];
    } else if (/^\d{1,2}$/.test(token)) {
      const num = parseInt(token, 10);
      if (num >= 1 && num <= 12 && month === null) {
        month = num - 1;
      }
    }
  }

  if (year !== null) {
    return new Date(year, month ?? 0, 1).getTime();
  }

  const d = new Date(str);
  if (!Number.isNaN(d.getTime())) return d.getTime();

  return 0;
}

/**
 * Blog tarihi için dile duyarlı (TR/EN/RO) formatlama fonksiyonu.
 * "01-2020", "2024-05-10", "Mayıs-2024" gibi formatları destekler.
 */
export function formatBlogDate(rawDate, locale = 'ro') {
  if (!rawDate) return null;
  const str = String(rawDate).trim();
  if (!str) return null;

  const loc = locale === 'en' ? 'en-US' : locale === 'ro' ? 'ro-RO' : 'tr-TR';

  const tokens = str
    .toLowerCase()
    .split(/[-/.\s_]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  let year = null;
  let month = null;

  for (const token of tokens) {
    if (/^\d{4}$/.test(token)) {
      year = parseInt(token, 10);
    } else if (TR_MONTHS[token] !== undefined) {
      month = TR_MONTHS[token];
    } else if (/^\d{1,2}$/.test(token)) {
      const num = parseInt(token, 10);
      if (num >= 1 && num <= 12 && month === null) {
        month = num - 1;
      }
    }
  }

  if (year !== null) {
    const d = new Date(year, month ?? 0, 1);
    return d.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
  }

  const d = new Date(str);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
  }

  return str.replace(/-/g, ' ');
}
