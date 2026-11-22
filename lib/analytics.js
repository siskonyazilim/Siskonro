/**
 * GTM dataLayer'a başarılı form gönderimi olayı yollar.
 * Kişisel veri EKLEMEYİN: yalnızca event ve form_id.
 * @param {string} form_id Sabit, küçük harfli form kimliği (ör. 'contact')
 */
export function trackLead(form_id) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'generate_lead', form_id });
}
