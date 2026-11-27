/**
 * GTM dataLayer'a başarılı form gönderimi olayı yollar (yalnız sunucudan olumlu yanıt gelince çağırın).
 * Kişisel veri EKLEMEYİN: yalnızca olay, form kimliği, talep türü ve site.
 *
 *   { event: 'generate_lead', form_id: 'contact', form_type: 'sales', site: 'siskon.com.tr' }
 *
 * form_type değerleri lib/contactRequestTypes.js anahtarlarıdır (sales/support/career/internship/general/other).
 * GTM'de Ads dönüşümü yalnız form_type === 'sales' için tetiklenmelidir.
 *
 * @param {{ formType?: string, formId?: string } | string} [options] Eski kullanım: trackLead('contact')
 */
export function trackLead(options = {}) {
  if (typeof window === 'undefined') return;
  const { formType = 'general', formId = 'contact' } = typeof options === 'string' ? { formId: options } : options;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    form_id: formId,
    form_type: formType,
    site: window.location.hostname.replace(/^www\./, ''),
  });
}
