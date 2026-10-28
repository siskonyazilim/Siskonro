'use client';

import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PageHero from '../components/PageHero';
import SmartImage from '../components/SmartImage';
import FooterDocsBar from '../components/FooterDocsBar';
import { useLanguage } from '../_context/LanguageContext';
import { usePageLocale } from '../lib/i18n/usePageLocale';
import trLocale from '../../messages/contactPage/tr.json';
import enLocale from '../../messages/contactPage/en.json';
import roLocale from '../../messages/contactPage/ro.json';

/* ── Toast Popup ─────────────────────────────────────────────────────────── */
function ToastPopup({ statusType, title, message, onClose }) {
  const isError = statusType === 'error';

  if (!message) return null;

  return (
    <div
      role={isError ? 'alert' : 'status'}
      aria-live="polite"
      className={`
        fixed top-6 right-4 md:right-8 z-[9999] w-[calc(100vw-2rem)] max-w-sm
        rounded-2xl border px-5 py-4 shadow-2xl
        transition-all duration-500 ease-out
        animate-in slide-in-from-top-4 fade-in
        overflow-hidden
        ${
          isError
            ? 'bg-gradient-to-br from-rose-700 to-rose-900 border-rose-400/60 shadow-rose-900/50'
            : 'bg-gradient-to-br from-emerald-700 to-emerald-900 border-emerald-400/60 shadow-emerald-900/50'
        }
      `}
    >
      <img src="/alert.svg" alt="" aria-hidden="true" className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-36 opacity-10 select-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <div className="flex items-center gap-2.5">
            <span className="shrink-0" aria-hidden="true">
              {isError ? (
                <svg className="w-5 h-5 text-rose-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-emerald-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
            </span>
            <p className={`text-sm font-bold tracking-wide ${isError ? 'text-rose-100' : 'text-emerald-100'}`}>{title}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Kapat"
            className={`shrink-0 -mt-0.5 -mr-1 rounded-lg p-1 transition-colors ${isError ? 'hover:bg-rose-600/50 text-rose-200' : 'hover:bg-emerald-600/50 text-emerald-200'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-white/80 text-sm leading-relaxed pl-[1.875rem]">{message}</p>
        <div className={`mt-3 h-0.5 rounded-full overflow-hidden ${isError ? 'bg-rose-600/40' : 'bg-emerald-600/40'}`}>
          <div className={`h-full rounded-full ${isError ? 'bg-rose-300' : 'bg-emerald-300'}`}
            style={{ animation: 'toast-progress 6s linear forwards' }} />
        </div>
      </div>
      <style>{`@keyframes toast-progress { from { width: 100%; } to { width: 0%; } }`}</style>
    </div>
  );
}

ToastPopup.propTypes = {
  statusType: PropTypes.oneOf(['', 'success', 'error']).isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
ToastPopup.defaultProps = { title: '', message: '' };

const INITIAL_FORM_DATA = {
  firstName: '', lastName: '', company: '', phone: '',
  position: '', sector: '', email: '', message: '', consent: false,
};

function getCookieValue(name) {
  if (typeof document === 'undefined') return '';
  const encodedName = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie.split('; ').find((row) => row.startsWith(encodedName));
  if (!cookie) return '';
  return decodeURIComponent(cookie.slice(encodedName.length));
}

function validateForm(formData, pt, { requireRecaptcha, hasRecaptchaToken }) {
  const nextErrors = {};
  if (!formData.firstName.trim()) nextErrors.firstName = pt('requiredField');
  if (!formData.lastName.trim())  nextErrors.lastName  = pt('requiredField');
  if (!formData.company.trim())   nextErrors.company   = pt('requiredField');
  if (!formData.phone.trim())     nextErrors.phone     = pt('requiredField');
  if (!formData.position.trim())  nextErrors.position  = pt('requiredField');
  if (!formData.sector.trim())    nextErrors.sector    = pt('requiredField');
  if (!formData.message.trim())   nextErrors.message   = pt('requiredField');
  if (!formData.email.trim()) {
    nextErrors.email = pt('requiredField');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    nextErrors.email = pt('invalidEmail');
  }
  if (!formData.consent) nextErrors.consent = pt('consentRequired');
  if (requireRecaptcha && !hasRecaptchaToken) nextErrors.recaptcha = pt('recaptchaMissing');
  return nextErrors;
}

/* ── ContactInfoPanel ─────────────────────────────────────────────────────── */
function ContactInfoPanel({ strapiContent, contactInfos, pt }) {
  const { locale } = useLanguage();
  const eyebrow      = strapiContent?.sectionEyebrow    || pt('sectionEyebrow');
  const titleTop     = strapiContent?.sectionTitleTop   || pt('sectionTitleTop');
  const titleAccent  = strapiContent?.sectionTitleAccent || pt('sectionTitleAccent');
  const intTitle     = strapiContent?.internshipTitle   || pt('internshipTitle');
  const intText      = strapiContent?.internshipText    || pt('internshipText');
  const intCta       = strapiContent?.internshipCta     || pt('internshipCta');

  return (
    <div className="reveal flex flex-col gap-6 md:gap-8 lg:pr-4">
      <div className="relative space-y-6 md:space-y-8 rounded-[24px] bg-gradient-to-br from-slate-50 to-slate-100/80 p-5 md:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-200/35 blur-2xl" aria-hidden="true" />
        <div className="relative z-10 space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <span className="text-sky-600 font-bold text-xs uppercase tracking-widest">{eyebrow}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {titleTop} <br />
              <span className="text-sky-600">{titleAccent}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {contactInfos.map((info, idx) => {
              const isOddTotal = contactInfos.length % 2 !== 0;
              const isLastItem = idx === contactInfos.length - 1;
              const colClass = isOddTotal && isLastItem ? 'sm:col-span-2' : '';
              return (
                <div key={`contact-info-${idx}`} className={`group space-y-1.5 md:space-y-2 ${colClass}`}>
                  <div className="font-archivo text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {info.label || pt(['contactInfoGeneral','contactInfoSales','contactInfoSupport','contactInfoPhone'][idx] ?? 'contactInfoGeneral')}
                  </div>
                  <a href={info.href} className="font-archivo text-base md:text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors block break-all md:break-normal">
                    {info.val}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FooterDocsBar />

      {locale !== 'ro' && (
      <a href="https://intern.siskon.com.tr/" target="_blank" rel="noopener noreferrer"
        className="group relative w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-white to-sky-50 p-5 md:p-6 shadow-[0_14px_36px_rgba(2,132,199,0.12)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(2,132,199,0.18)] transition-all duration-300">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-200/50 blur-2xl" aria-hidden="true" />
        <div className="flex items-start gap-4">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700" aria-hidden="true">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <div className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-[0.2em] font-black text-sky-600">{intTitle}</div>
            <p className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">{intText}</p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 group-hover:translate-x-0.5 transition-transform">
              {intCta}<span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </a>
      )}
    </div>
  );
}

/* ── ContactFormPanel ─────────────────────────────────────────────────────── */
function ContactFormPanel({ strapiContent, pt, statusMessage, statusType, onSubmit, recaptchaSiteKey, recaptchaToken, onRecaptchaChange, recaptchaRef, formData, formErrors, onFieldChange, onConsentChange, isSubmitting }) {
  const { localizePath } = useLanguage();
  const formTitle    = strapiContent?.formTitle    || pt('formTitle');
  const formSubtitle = strapiContent?.formSubtitle || pt('formSubtitle');

  const positionOptions = (() => {
    if (Array.isArray(strapiContent?.positionOptions) && strapiContent.positionOptions.length > 0) {
      return strapiContent.positionOptions.map((p) => typeof p === 'string' ? p : p.name || p.title || p.value || String(p));
    }
    if (typeof strapiContent?.positionOptions === 'string' && strapiContent.positionOptions.trim()) {
      return strapiContent.positionOptions.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
    }
    const fromPt = pt('positionOptions');
    if (Array.isArray(fromPt) && fromPt.length > 0) return fromPt;
    return Array.from({ length: 10 }, (_, i) => pt(`positionOptions.${i}`)).filter(Boolean);
  })();

  const sectorOptions = (() => {
    if (Array.isArray(strapiContent?.sectorOptions) && strapiContent.sectorOptions.length > 0) {
      return strapiContent.sectorOptions.map((s) => typeof s === 'string' ? s : s.name || s.title || s.value || String(s));
    }
    if (typeof strapiContent?.sectorOptions === 'string' && strapiContent.sectorOptions.trim()) {
      return strapiContent.sectorOptions.split(/\r?\n|,/).map((s) => s.trim()).filter(Boolean);
    }
    const fromPt = pt('sectorOptions');
    if (Array.isArray(fromPt) && fromPt.length > 0) return fromPt;
    return Array.from({ length: 10 }, (_, i) => pt(`sectorOptions.${i}`)).filter(Boolean);
  })();

  const fieldErrorId = (name) => `${name}-error`;

  // Mobil tarayıcı otomatik doldurma ipuçları
  const AUTOCOMPLETE = {
    firstName: 'given-name',
    lastName: 'family-name',
    company: 'organization',
    phone: 'tel',
    position: 'organization-title',
    email: 'email',
  };

  return (
    <div id="contact-form" className="scroll-mt-32 contact-form-static">
      <div className="directional-cta-card bg-[#0A192F] p-6 md:p-10 lg:p-16 rounded-[40px] md:rounded-[64px] shadow-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-sky-500/10 rounded-full blur-3xl -mr-10 md:-mr-20 -mt-10 md:-mt-20" />
        <SmartImage src="/assets/new/iletisim/asset-50.svg" alt="" width={1201} height={1217}
          className="pointer-events-none absolute -right-16 -top-24 w-[420px] md:w-[620px] max-w-none opacity-65" aria-hidden="true" />
        <div className="relative z-10 space-y-6 md:space-y-10">
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{formTitle}</h3>
            <p className="text-sm md:text-base text-slate-200 font-medium">{formSubtitle}</p>
          </div>
          <form className="space-y-4 md:space-y-6" method="post" action="/api/contact" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
              {[['firstName','text'], ['lastName','text']].map(([name, type]) => (
                <div key={name} className="space-y-1.5 md:space-y-2">
                  <label htmlFor={name} className="form-label">{pt(name)}</label>
                  <input id={name} type={type} name={name} value={formData[name]} onChange={onFieldChange}
                    autoComplete={AUTOCOMPLETE[name]}
                    aria-invalid={Boolean(formErrors[name])} aria-describedby={formErrors[name] ? fieldErrorId(name) : undefined}
                    className={`form-input ${formErrors[name] ? 'form-input-error' : ''}`}
                    placeholder={pt(`${name}Placeholder`)} />
                  {formErrors[name] ? <p id={fieldErrorId(name)} className="form-error-text">{formErrors[name]}</p> : null}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
              {[['company','text'], ['phone','tel']].map(([name, type]) => (
                <div key={name} className="space-y-1.5 md:space-y-2">
                  <label htmlFor={name} className="form-label">{pt(name)}</label>
                  <input id={name} type={type} name={name} value={formData[name]} onChange={onFieldChange}
                    autoComplete={AUTOCOMPLETE[name]} inputMode={name === 'phone' ? 'tel' : undefined}
                    aria-invalid={Boolean(formErrors[name])} aria-describedby={formErrors[name] ? fieldErrorId(name) : undefined}
                    className={`form-input ${formErrors[name] ? 'form-input-error' : ''}`}
                    placeholder={pt(`${name}Placeholder`)} />
                  {formErrors[name] ? <p id={fieldErrorId(name)} className="form-error-text">{formErrors[name]}</p> : null}
                </div>
              ))}
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="position" className="form-label">{pt('position')}</label>
              <select id="position" name="position" value={formData.position} onChange={onFieldChange} autoComplete={AUTOCOMPLETE.position}
                aria-invalid={Boolean(formErrors.position)} aria-describedby={formErrors.position ? fieldErrorId('position') : undefined}
                className={`form-input ${formErrors.position ? 'form-input-error' : ''}`}>
                <option value="" disabled>{pt('positionPlaceholder')}</option>
                {positionOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {formErrors.position ? <p id={fieldErrorId('position')} className="form-error-text">{formErrors.position}</p> : null}
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="sector" className="form-label">{pt('sector')}</label>
              <select id="sector" name="sector" value={formData.sector} onChange={onFieldChange}
                aria-invalid={Boolean(formErrors.sector)} aria-describedby={formErrors.sector ? fieldErrorId('sector') : undefined}
                className={`form-input ${formErrors.sector ? 'form-input-error' : ''}`}>
                <option value="" disabled>{pt('sectorPlaceholder')}</option>
                {sectorOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              {formErrors.sector ? <p id={fieldErrorId('sector')} className="form-error-text">{formErrors.sector}</p> : null}
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="email" className="form-label">{pt('email')}</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={onFieldChange}
                autoComplete={AUTOCOMPLETE.email} inputMode="email"
                aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? fieldErrorId('email') : undefined}
                className={`form-input ${formErrors.email ? 'form-input-error' : ''}`}
                placeholder={pt('emailPlaceholder')} />
              {formErrors.email ? <p id={fieldErrorId('email')} className="form-error-text">{formErrors.email}</p> : null}
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="message" className="form-label">{pt('message')}</label>
              <textarea id="message" rows="4" name="message" value={formData.message} onChange={onFieldChange}
                aria-invalid={Boolean(formErrors.message)} aria-describedby={formErrors.message ? fieldErrorId('message') : undefined}
                className={`form-input resize-none ${formErrors.message ? 'form-input-error' : ''}`}
                placeholder={pt('messagePlaceholder')} />
              {formErrors.message ? <p id={fieldErrorId('message')} className="form-error-text">{formErrors.message}</p> : null}
            </div>
            <label className="font-archivo flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs md:text-sm text-slate-100 leading-relaxed">
              <input id="consent" type="checkbox" checked={formData.consent} onChange={onConsentChange}
                className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent text-sky-500 focus:ring-sky-500"
                aria-label={pt('consentAria')} aria-invalid={Boolean(formErrors.consent)}
                aria-describedby={formErrors.consent ? fieldErrorId('consent') : undefined} />
              <span>
                {pt('consent')}{' '}
                <a href={localizePath('/yasal/kvkk')} className="underline hover:text-sky-300" target="_blank" rel="noopener noreferrer">{pt('consentKvkkLinkLabel')}</a>
              </span>
            </label>
            {formErrors.consent ? <p id={fieldErrorId('consent')} className="form-error-text -mt-2">{formErrors.consent}</p> : null}
            {recaptchaSiteKey ? (
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex justify-center">
                <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaSiteKey}
                  onChange={(token) => onRecaptchaChange(token || '')}
                  onExpired={() => onRecaptchaChange('')} theme="dark" />
              </div>
            ) : null}
            {formErrors.recaptcha ? <p id={fieldErrorId('recaptcha')} className="form-error-text -mt-2">{formErrors.recaptcha}</p> : null}
            <button type="submit"
              disabled={isSubmitting}
              className="w-full py-3 md:py-5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl md:rounded-2xl shadow-xl shadow-sky-600/30 transition-all active:scale-[0.98] text-base md:text-lg min-h-[44px] md:min-h-[48px] flex items-center justify-center">
              {isSubmitting ? pt('sending') : pt('submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── OfficesSection ───────────────────────────────────────────────────────── */
function OfficesSection({ strapiContent, offices, pt }) {
  const eyebrow = strapiContent?.officesEyebrow || pt('officesEyebrow');
  const title   = strapiContent?.officesTitle   || pt('officesTitle');
  const summary = strapiContent?.officesSummary || pt('officesSummary');

  return (
    <section className="py-16 md:py-24 bg-white rounded-[32px] md:rounded-[40px] lg:rounded-[80px] mx-4 md:mx-6 mb-12 md:mb-24 reveal">
      <div className="container-wide">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest">{eyebrow}</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 tracking-tight">{title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-[1400px] mx-auto">
          {offices.map((office, officeIdx) => (
            <article key={`office-${officeIdx}`} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.10)]">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] lg:min-h-[420px]">
                <div className="font-archivo order-1 bg-white p-5 md:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h4 className="font-archivo text-[24px] sm:text-[28px] md:text-[32px] font-black tracking-tight leading-[1.1] text-slate-900 mb-5 md:mb-7">{office.title}</h4>
                    <div className="h-px bg-slate-300 mb-5 md:mb-7" />
                    <address className="font-archivo not-italic text-[15px] sm:text-[16px] md:text-[17px] leading-7 md:leading-8 text-slate-700 font-medium max-w-[36ch]">
                      {office.addressLines.map((line, idx) => (
                        <span key={`${office.title}-${idx}`} className={`block ${idx === 0 ? 'font-bold text-slate-900' : ''}`}>{line}</span>
                      ))}
                    </address>
                    {office.regNo ? <p className="mt-4 pt-3 border-t border-slate-200 text-[14px] sm:text-[15px] font-extrabold text-slate-900">{office.regNo}</p> : null}
                  </div>
                  <div className="font-archivo mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />{pt('officeFooter')}
                  </div>
                </div>
                <div className="order-2 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-100">
                  <iframe title={`${office.title} map`} src={office.mapEmbed} width="100%" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                    className="w-full h-[300px] md:h-[380px] lg:h-full"
                    style={{ filter: 'grayscale(100%) contrast(1.05)' }} />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">{summary}</p>
        </div>
      </div>
    </section>
  );
}

/* ── Ana Client Component ─────────────────────────────────────────────────── */
/**
 * İletişim Sayfası — Client Component
 *
 * `data` prop'u server-side Strapi'den gelir:
 *   { pageContent, contactInfos, offices }
 *
 * Form state, ReCAPTCHA ve submit mantığı burada tutulur.
 * JSON fallback: Strapi veri gelmezse usePageLocale() kullanılır.
 */
export default function ContactPageClient({ data }) {
  const { locale } = useLanguage();
  const pt = usePageLocale(trLocale, enLocale, roLocale);

  const strapiContent  = data?.pageContent  ?? null;
  const strapiOffices  = data?.offices      ?? [];
  const strapiContacts = data?.contactInfos ?? [];

  // JSON fallback
  const jsonOfficeCards  = Array.isArray(pt('officeCards'))  ? pt('officeCards')  : [];
  const jsonContactInfo  = Array.isArray(pt('contactInfo'))  ? pt('contactInfo')  : [];

  const offices      = strapiOffices.length  ? strapiOffices  : jsonOfficeCards;
  const contactInfos = strapiContacts.length ? strapiContacts : jsonContactInfo;

  const heroTitle     = strapiContent?.heroTitle    || pt('heroTitle');
  const heroSubtitle  = strapiContent?.heroSubtitle || pt('heroSubtitle');
  const heroBreadcrumbs = [pt('heroBreadcrumbs.0') || 'Ana Sayfa', pt('heroBreadcrumbs.1') || 'İletişim'];

  // Form state
  const [status, setStatus]         = useState({ type: '', msg: '' });
  const [recaptchaToken, setReCaptchaToken] = useState('');
  const [formData, setFormData]     = useState(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const paramPos = params.get('position') || params.get('pozisyon');
    if (paramPos) {
      // URL parametresi yalnızca istemcide okunabilir; effect gövdesinde senkron setState yapma
      queueMicrotask(() => setFormData((prev) => ({ ...prev, position: paramPos })));
    }
  }, []);

  const handleToastClose = useCallback(() => setStatus({ type: '', msg: '' }), []);
  const toastTitle = status.type === 'error' ? (pt('formErrorTitle') || 'Gönderme Başarısız') : (pt('formSuccessTitle') || 'Mesajınız İletildi');

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleConsentChange = (event) => {
    const { checked } = event.target;
    setFormData((prev) => ({ ...prev, consent: checked }));
    if (formErrors.consent) setFormErrors((prev) => { const n = { ...prev }; delete n.consent; return n; });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formData, pt, { requireRecaptcha: Boolean(recaptchaSiteKey), hasRecaptchaToken: Boolean(recaptchaToken) });
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setStatus({ type: 'error', msg: pt('formValidationError') });
      const firstField = document.getElementById(Object.keys(validationErrors)[0]);
      globalThis.requestAnimationFrame(() => firstField?.focus());
      return;
    }
    setStatus({ type: '', msg: '' });
    setFormErrors({});
    setIsSubmitting(true);
    try {
      const csrfToken = getCookieValue('csrf_token');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrfToken },
        body: JSON.stringify({ ...formData, locale, recaptchaToken: recaptchaToken || undefined }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || pt('formSubmitError'));
      }
      setStatus({ type: 'success', msg: pt('formSuccess') });
      setFormData(INITIAL_FORM_DATA);
      setReCaptchaToken('');
      recaptchaRef.current?.reset();
    } catch (error) {
      setStatus({ type: 'error', msg: error.message || pt('formSubmitError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-x-clip">
      <ToastPopup statusType={status.type || 'error'} title={toastTitle} message={status.msg} onClose={handleToastClose} />

      <PageHero title={heroTitle} subtitle={heroSubtitle} breadcrumbs={heroBreadcrumbs} />

      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-start">
            <ContactInfoPanel strapiContent={strapiContent} contactInfos={contactInfos} pt={pt} />
            <ContactFormPanel
              strapiContent={strapiContent} pt={pt}
              statusMessage={status.msg} statusType={status.type}
              onSubmit={handleSubmit} recaptchaSiteKey={recaptchaSiteKey}
              recaptchaToken={recaptchaToken} onRecaptchaChange={setReCaptchaToken}
              recaptchaRef={recaptchaRef} formData={formData} formErrors={formErrors}
              onFieldChange={handleFieldChange} onConsentChange={handleConsentChange}
              isSubmitting={isSubmitting} />
          </div>
        </div>
      </section>

      <OfficesSection strapiContent={strapiContent} offices={offices} pt={pt} />
    </div>
  );
}
