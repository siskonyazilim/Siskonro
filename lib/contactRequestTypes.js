/**
 * İletişim formu "talep türü" ortak sözlüğü (tüm Siskon sitelerinde aynı dosya).
 * İstemci (dataLayer form_type) ve sunucu (e-posta rozeti) aynı anahtarları kullanır.
 * Bu dosya tarayıcıda da çalışır: Node modülü import ETMEYİN.
 *
 * Anahtarlar (GA4/GTM'de form_type değeri olarak gider):
 *   sales · support · career · internship · general · other
 * Ads dönüşümü yalnız form_type === 'sales' için sayılmalıdır.
 */

export const REQUEST_TYPE_LABELS = {
  sales: { tr: 'Satış', en: 'Sales', ro: 'Vânzări' },
  support: { tr: 'Teknik Destek', en: 'Technical Support', ro: 'Suport tehnic' },
  career: { tr: 'Kariyer', en: 'Career', ro: 'Carieră' },
  internship: { tr: 'Staj', en: 'Internship', ro: 'Stagiu' },
  general: { tr: 'Genel', en: 'General', ro: 'General' },
  other: { tr: 'Diğer', en: 'Other', ro: 'Altele' },
};

// Sitelerdeki form seçeneklerinin (tr/en/ro) anahtara eşlemesi. Yeni seçenek eklenirse buraya da ekleyin.
const LABEL_TO_KEY = {
  // siskon "Talep Konusu"
  'genel başvuru': 'general', 'general inquiry': 'general', 'solicitare generală': 'general',
  'satış': 'sales', 'sales': 'sales', 'vânzări': 'sales',
  'teknik destek': 'support', 'technical support': 'support', 'suport tehnic': 'support',
  'kariyer': 'career', 'career': 'career', 'carieră': 'career',
  'staj': 'internship', 'internship': 'internship', 'stagiu': 'internship',
  'diğer': 'other', 'other': 'other', 'altele': 'other',
  // onsuite "Konu"
  'demo talebi': 'sales', 'demo request': 'sales', 'cerere demo': 'sales',
  'fiyat bilgisi': 'sales', 'price information': 'sales', 'informații de preț': 'sales',
  'iş ortaklığı': 'other', 'partnership': 'other', 'parteneriat': 'other',
};

/** Formdaki görünen etiketi ("Satış", "Demo Request" …) anahtara çevirir; bilinmiyorsa 'other'. */
export function toRequestTypeKey(label, fallback = 'other') {
  // 'İ' → 'i' önce: toLowerCase() 'İ'yi "i + birleşik nokta" yapar; toLocaleLowerCase('tr') ise İngilizce 'I'yı 'ı' yapar.
  const key = LABEL_TO_KEY[String(label ?? '').trim().replace(/İ/g, 'i').toLowerCase()];
  return key || (REQUEST_TYPE_LABELS[label] ? label : fallback);
}

/** Anahtarın verilen dildeki etiketi. */
export function requestTypeLabel(key, locale = 'tr') {
  const entry = REQUEST_TYPE_LABELS[key] || REQUEST_TYPE_LABELS.other;
  return entry[locale] || entry.tr;
}
