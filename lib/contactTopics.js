/**
 * İletişim formu "Talep Konusu" → Sektör alanı kuralı (istemci + /api/contact ortak).
 *
 * Kariyer / Staj / Diğer seçildiğinde formda Sektör alanı gösterilmez ve zorunlu değildir.
 * Genel Başvuru / Satış / Teknik Destek seçildiğinde Sektör alanı açılır ve zorunludur.
 * (Tüm konular aynı alıcıya gider; alıcı seçimi bu dosyada yapılmaz.)
 *
 * Etiketler messages/contactPage/{tr,en,ro}.json → positionOptions ile aynı olmalıdır.
 */
const HR_TOPICS = new Set([
  'Kariyer', 'Staj', 'Diğer', // tr
  'Career', 'Internship', 'Other', // en
  'Carieră', 'Stagiu', 'Altele', // ro
]);

/** Seçilen talep konusu İK konusu mu (Kariyer / Staj / Diğer)? */
export function isHrTopic(position) {
  return HR_TOPICS.has(String(position ?? '').trim());
}

/** Sektör alanı yalnızca bir konu seçilmişse ve konu İK'ya gitmiyorsa gösterilir/zorunludur. */
export function needsSector(position) {
  return Boolean(String(position ?? '').trim()) && !isHrTopic(position);
}
