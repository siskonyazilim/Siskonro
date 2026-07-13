'use client';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PageHero from '../components/PageHero';
import SmartImage from '../components/SmartImage';
import FooterDocsBar from '../components/FooterDocsBar';
import { useLanguage } from '../_context/LanguageContext';

const CONTACT_INFO = [
  { val: 'info@siskon.com.tr', href: 'mailto:info@siskon.com.tr' },
  { val: 'satis@siskon.com.tr', href: 'mailto:satis@siskon.com.tr' },
  { val: 'support@siskon.com.tr', href: 'mailto:support@siskon.com.tr' },
  { val: '+90 (232) 245 00 76', href: 'tel:+902322450076' },
];

const OFFICE_CARDS = {
  en: [
    {
      title: 'DEPARK Office',
      mapEmbed: 'https://maps.google.com/maps?q=Dokuz%20Eylul%20University%20Depark%20Beta%20Building%20Izmir&z=15&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/Dokuz+Eylul+University+DEPARK+Beta+Buca+Izmir',
      addressLines: [
        'Dokuz Eylul University',
        'Tinaztepe Campus',
        'Depark Beta Building,',
        'Adatepe District',
        'Dogus Street No:207/AG',
        'Floor: 2 No: 202, 35390',
        'Buca / Izmir',
      ],
      regNo: 'Address No: 1575482912',
    },
    {
      title: 'Aegean Free Zone (ESBAS) Office',
      mapEmbed: 'https://maps.google.com/maps?q=Nilufer+Sk.+No:31+D:3,+Gaziemir,+Izmir,+Turkey&z=17&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/ESBAS+Aegean+Free+Zone+Gaziemir+Izmir',
      addressLines: ['Zafer SB District', 'Nilufer Street No:31/3', 'Gaziemir / Izmir'],
      regNo: 'Address No: 2709145623',
    },
    {
      title: 'Romania Office',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.3812984624165!2d25.6221473!3d45.6632452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b910e74964b%3A0xac8086acca35f96a!2sSiskon%20Software%20and%20Automation%20SRL!5e0!3m2!1sen!2str!4v1783058783861!5m2!1sen!2str',
      mapsUrl: 'https://www.google.com/maps/place/?q=place_id:0x40b35b910e74964b:0xac8086acca35f96a',
      addressLines: [
        'Punct de lucru: Str.',
        'Turnului Nr. 5,',
        'Cladirea M.U.M. Scara 3,',
        'Etajul 2, Biroul 5, 500152',
        'Brasov, Romania',
      ],
      regNo: '',
    },
  ],
  tr: [
    {
      title: 'DEPARK Ofis',
      mapEmbed: 'https://maps.google.com/maps?q=Dokuz%20Eylul%20Universitesi%20Depark%20Beta%20Binasi%20Izmir&z=15&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/Dokuz+Eylul+Universitesi+DEPARK+Beta+Buca+Izmir',
      addressLines: [
        'Dokuz Eylül Üniversitesi',
        'Tınaztepe Yerleşkesi',
        'DEPARK Beta Binası,',
        'Adatepe Mahallesi',
        'Doğuş Caddesi No:207/AG',
        'Kat: 2 No: 202, 35390',
        'Buca / İzmir',
      ],
      regNo: 'Adres No: 1575482912',
    },
    {
      title: 'Ege Serbest Bölgesi (ESBAS) Ofis',
      mapEmbed: 'https://maps.google.com/maps?q=Nil%C3%BCfer+Sk.+No:31+D:3,+Gaziemir,+%C4%B0zmir,+T%C3%BCrkiye&z=17&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/ESBAS+Ege+Serbest+Bolgesi+Gaziemir+Izmir',
      addressLines: ['Zafer SB Mahallesi', 'Nilüfer Sok. No:31/3', 'Gaziemir / İzmir'],
      regNo: 'Adres No: 2709145623',
    },
    {
      title: 'Romanya Ofis',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.3812984624165!2d25.6221473!3d45.6632452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b910e74964b%3A0xac8086acca35f96a!2sSiskon%20Software%20and%20Automation%20SRL!5e0!3m2!1sen!2str!4v1783058783861!5m2!1sen!2str',
      mapsUrl: 'https://www.google.com/maps/place/?q=place_id:0x40b35b910e74964b:0xac8086acca35f96a',
      addressLines: [
        'Punct de lucru: Str.',
        'Turnului Nr. 5,',
        'Cladirea M.U.M. Scara 3,',
        'Etajul 2, Biroul 5, 500152',
        'Brasov, Romania',
      ],
      regNo: '',
    },
  ],
  ro: [
    {
      title: 'Biroul din România',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.3812984624165!2d25.6221473!3d45.6632452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b910e74964b%3A0xac8086acca35f96a!2sSiskon%20Software%20and%20Automation%20SRL!5e0!3m2!1sen!2str!4v1783058783861!5m2!1sen!2str',
      mapsUrl: 'https://www.google.com/maps/place/?q=place_id:0x40b35b910e74964b:0xac8086acca35f96a',
      addressLines: [
        'Punct de lucru: Str.',
        'Turnului Nr. 5,',
        'Cladirea M.U.M. Scara 3,',
        'Etajul 2, Biroul 5, 500152',
        'Brasov, Romania',
      ],
      regNo: '',
    },
    {
      title: 'Biroul DEPARK',
      mapEmbed: 'https://maps.google.com/maps?q=Dokuz%20Eylul%20University%20Depark%20Beta%20Building%20Izmir&z=15&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/Dokuz+Eylul+University+DEPARK+Beta+Buca+Izmir',
      addressLines: [
        'Universitatea Dokuz Eylul',
        'Campusul Tinaztepe',
        'Clădirea Depark Beta,',
        'Cartierul Adatepe',
        'Strada Dogus Nr:207/AG',
        'Etaj: 2 Nr: 202, 35390',
        'Buca / Izmir',
      ],
      regNo: 'Adresă Nr: 1575482912',
    },
    {
      title: 'Biroul Zona Liberă Egee (ESBAS)',
      mapEmbed: 'https://maps.google.com/maps?q=Nilufer+Sk.+No:31+D:3,+Gaziemir,+Izmir,+Turkey&z=17&output=embed',
      mapsUrl: 'https://www.google.com/maps/search/ESBAS+Aegean+Free+Zone+Gaziemir+Izmir',
      addressLines: ['Cartierul Zafer SB', 'Strada Nilufer Nr:31/3', 'Gaziemir / Izmir'],
      regNo: 'Adresă Nr: 2709145623',
    },
  ],
};

const contactInfoItemShape = PropTypes.shape({
  val: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
});

const officeCardShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  mapEmbed: PropTypes.string.isRequired,
  mapsUrl: PropTypes.string,
  addressLines: PropTypes.arrayOf(PropTypes.string).isRequired,
  regNo: PropTypes.string.isRequired,
});

const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  sector: '',
  email: '',
  message: '',
  consent: false,
};

function getCookieValue(name) {
  if (typeof document === 'undefined') return '';
  const encodedName = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(encodedName));

  if (!cookie) return '';
  return decodeURIComponent(cookie.slice(encodedName.length));
}

function validateForm(formData, t, { requireRecaptcha, hasRecaptchaToken }) {
  const nextErrors = {};

  if (!formData.firstName.trim()) nextErrors.firstName = t('contactPage.requiredField');
  if (!formData.lastName.trim()) nextErrors.lastName = t('contactPage.requiredField');
  if (!formData.company.trim()) nextErrors.company = t('contactPage.requiredField');
  if (!formData.phone.trim()) nextErrors.phone = t('contactPage.requiredField');
  if (!formData.sector.trim()) nextErrors.sector = t('contactPage.requiredField');
  if (!formData.message.trim()) nextErrors.message = t('contactPage.requiredField');

  if (!formData.email.trim()) {
    nextErrors.email = t('contactPage.requiredField');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    nextErrors.email = t('contactPage.invalidEmail');
  }

  if (!formData.consent) {
    nextErrors.consent = t('contactPage.consentRequired');
  }

  if (requireRecaptcha && !hasRecaptchaToken) {
    nextErrors.recaptcha = t('contactPage.recaptchaMissing');
  }

  return nextErrors;
}

function ContactInfoPanel({ t, contactInfo }) {
  return (
    <div className="reveal flex flex-col gap-6 md:gap-8 lg:pr-4">
      <div className="relative space-y-6 md:space-y-8 rounded-[24px] bg-gradient-to-br from-slate-50 to-slate-100/80 p-5 md:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-200/35 blur-2xl" aria-hidden="true" />
        <div className="relative z-10 space-y-6 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <span className="text-sky-600 font-bold text-xs uppercase tracking-widest">{t('contactPage.sectionEyebrow')}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              {t('contactPage.sectionTitleTop')} <br />
              <span className="text-sky-600">{t('contactPage.sectionTitleAccent')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {contactInfo.map((info, idx) => (
              <div key={info.val} className="group space-y-1.5 md:space-y-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {t(`contactPage.contactInfo${['General', 'Sales', 'Support', 'Phone'][idx]}`)}
                </div>
                <a href={info.href} className="text-base md:text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors block break-all md:break-normal">
                  {info.val}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterDocsBar />

      <a
        href="https://intern.siskon.com.tr/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-full max-w-xl overflow-hidden rounded-3xl bg-gradient-to-br from-white to-sky-50 p-5 md:p-6 shadow-[0_14px_36px_rgba(2,132,199,0.12)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(2,132,199,0.18)] transition-all duration-300"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-200/50 blur-2xl" aria-hidden="true" />
        <div className="flex items-start gap-4">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700" aria-hidden="true">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <div className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-[0.2em] font-black text-sky-600">{t('contactPage.internshipTitle')}</div>
            <p className="text-base md:text-lg font-extrabold text-slate-900 leading-snug">{t('contactPage.internshipText')}</p>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 group-hover:translate-x-0.5 transition-transform">
              {t('contactPage.internshipCta')}
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </a>

    </div>
  );
}

ContactInfoPanel.propTypes = {
  t: PropTypes.func.isRequired,
  contactInfo: PropTypes.arrayOf(contactInfoItemShape).isRequired,
};

function ContactFormPanel({
  t,
  statusMessage,
  statusType,
  onSubmit,
  recaptchaSiteKey,
  recaptchaToken,
  onRecaptchaChange,
  recaptchaRef,
  formData,
  formErrors,
  onFieldChange,
  onConsentChange,
  isSubmitting,
}) {
  const fieldErrorId = (name) => `${name}-error`;

  
  const sectorOptions = Array.from({ length: 6 }, (_, i) => t(`contactPage.sectorOptions.${i}`));

  const statusClasses = statusType === 'error'
    ? 'p-4 bg-rose-500/20 border border-rose-300/60 text-rose-100 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-4'
    : 'p-4 bg-sky-500/20 border border-sky-400/40 text-sky-100 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-4';

  return (
    <div id="contact-form" className="scroll-mt-32 contact-form-static">
      <div className="directional-cta-card bg-[#0A192F] p-6 md:p-10 lg:p-16 rounded-[40px] md:rounded-[64px] shadow-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-sky-500/10 rounded-full blur-3xl -mr-10 md:-mr-20 -mt-10 md:-mt-20" />
        <SmartImage
          src="/assets/new/iletisim/Asset 50.svg"
          alt=""
          width={1201}
          height={1217}
          className="pointer-events-none absolute -right-16 -top-24 w-[420px] md:w-[620px] max-w-none opacity-65"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-6 md:space-y-10">
          <div className="space-y-2 md:space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold text-white">{t('contactPage.formTitle')}</h3>
            <p className="text-sm md:text-base text-slate-200 font-medium">{t('contactPage.formSubtitle')}</p>
          </div>

          {statusMessage ? (
            <output className={statusClasses} role={statusType === 'error' ? 'alert' : undefined} aria-live="polite">
              {statusMessage}
            </output>
          ) : null}

          <form className="space-y-4 md:space-y-6" method="post" action="/api/contact" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="firstName" className="form-label">{t('contactPage.firstName')}</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onFieldChange}
                  aria-invalid={Boolean(formErrors.firstName)}
                  aria-describedby={formErrors.firstName ? fieldErrorId('firstName') : undefined}
                  className={`form-input ${formErrors.firstName ? 'form-input-error' : ''}`}
                  placeholder={t('contactPage.firstNamePlaceholder')}
                />
                {formErrors.firstName ? <p id={fieldErrorId('firstName')} className="form-error-text">{formErrors.firstName}</p> : null}
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="lastName" className="form-label">{t('contactPage.lastName')}</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onFieldChange}
                  aria-invalid={Boolean(formErrors.lastName)}
                  aria-describedby={formErrors.lastName ? fieldErrorId('lastName') : undefined}
                  className={`form-input ${formErrors.lastName ? 'form-input-error' : ''}`}
                  placeholder={t('contactPage.lastNamePlaceholder')}
                />
                {formErrors.lastName ? <p id={fieldErrorId('lastName')} className="form-error-text">{formErrors.lastName}</p> : null}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="company" className="form-label">{t('contactPage.company')}</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={onFieldChange}
                  aria-invalid={Boolean(formErrors.company)}
                  aria-describedby={formErrors.company ? fieldErrorId('company') : undefined}
                  className={`form-input ${formErrors.company ? 'form-input-error' : ''}`}
                  placeholder={t('contactPage.companyPlaceholder')}
                />
                {formErrors.company ? <p id={fieldErrorId('company')} className="form-error-text">{formErrors.company}</p> : null}
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label htmlFor="phone" className="form-label">{t('contactPage.phone')}</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onFieldChange}
                  aria-invalid={Boolean(formErrors.phone)}
                  aria-describedby={formErrors.phone ? fieldErrorId('phone') : undefined}
                  className={`form-input ${formErrors.phone ? 'form-input-error' : ''}`}
                  placeholder={t('contactPage.phonePlaceholder')}
                />
                {formErrors.phone ? <p id={fieldErrorId('phone')} className="form-error-text">{formErrors.phone}</p> : null}
              </div>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="sector" className="form-label">{t('contactPage.sector')}</label>
              <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={onFieldChange}
                aria-invalid={Boolean(formErrors.sector)}
                aria-describedby={formErrors.sector ? fieldErrorId('sector') : undefined}
                className={`form-input ${formErrors.sector ? 'form-input-error' : ''}`}
              >
                <option value="" disabled>{t('contactPage.sectorPlaceholder')}</option>
                {sectorOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {formErrors.sector ? <p id={fieldErrorId('sector')} className="form-error-text">{formErrors.sector}</p> : null}
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="email" className="form-label">{t('contactPage.email')}</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={onFieldChange}
                aria-invalid={Boolean(formErrors.email)}
                aria-describedby={formErrors.email ? fieldErrorId('email') : undefined}
                className={`form-input ${formErrors.email ? 'form-input-error' : ''}`}
                placeholder="ornek@sirket.com"
              />
              {formErrors.email ? <p id={fieldErrorId('email')} className="form-error-text">{formErrors.email}</p> : null}
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <label htmlFor="message" className="form-label">{t('contactPage.message')}</label>
              <textarea
                id="message"
                rows="4"
                name="message"
                value={formData.message}
                onChange={onFieldChange}
                aria-invalid={Boolean(formErrors.message)}
                aria-describedby={formErrors.message ? fieldErrorId('message') : undefined}
                className={`form-input resize-none ${formErrors.message ? 'form-input-error' : ''}`}
                placeholder={t('contactPage.messagePlaceholder')}
              />
              {formErrors.message ? <p id={fieldErrorId('message')} className="form-error-text">{formErrors.message}</p> : null}
            </div>
            <label className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-xs md:text-sm text-slate-100 leading-relaxed">
              <input
                id="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={onConsentChange}
                className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent text-sky-500 focus:ring-sky-500"
                aria-label={t('contactPage.consentAria')}
                aria-invalid={Boolean(formErrors.consent)}
                aria-describedby={formErrors.consent ? fieldErrorId('consent') : undefined}
              />
              <span>
                {t('contactPage.consent')}{' '}
                <a href="/yasal/kvkk" className="underline hover:text-sky-300" target="_blank" rel="noopener noreferrer">{t('contactPage.consentKvkkLinkLabel')}</a>
                {' / '}
                <a href="/yasal/gizlilik-politikasi" className="underline hover:text-sky-300" target="_blank" rel="noopener noreferrer">
                  {t('contactPage.consentPrivacyLinkLabel')}
                </a>
              </span>
            </label>
            {formErrors.consent ? <p id={fieldErrorId('consent')} className="form-error-text -mt-2">{formErrors.consent}</p> : null}
            {recaptchaSiteKey ? (
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey}
                  onChange={(token) => onRecaptchaChange(token || '')}
                  onExpired={() => onRecaptchaChange('')}
                  theme="dark"
                />
              </div>
            ) : null}
            {formErrors.recaptcha ? <p id={fieldErrorId('recaptcha')} className="form-error-text -mt-2">{formErrors.recaptcha}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting || (Boolean(recaptchaSiteKey) && !recaptchaToken)}
              className="w-full py-3 md:py-5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl md:rounded-2xl shadow-xl shadow-sky-600/30 transition-all active:scale-[0.98] text-base md:text-lg min-h-[44px] md:min-h-[48px] flex items-center justify-center"
            >
              {isSubmitting ? t('contactPage.sending') : t('contactPage.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

ContactFormPanel.propTypes = {
  t: PropTypes.func.isRequired,
  statusMessage: PropTypes.string,
  statusType: PropTypes.oneOf(['', 'success', 'error']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  recaptchaSiteKey: PropTypes.string.isRequired,
  recaptchaToken: PropTypes.string.isRequired,
  onRecaptchaChange: PropTypes.func.isRequired,
  recaptchaRef: PropTypes.shape({ current: PropTypes.any }),
  formData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    consent: PropTypes.bool.isRequired,
  }).isRequired,
  formErrors: PropTypes.objectOf(PropTypes.string).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onConsentChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

ContactFormPanel.defaultProps = {
  statusMessage: '',
  recaptchaRef: undefined,
};

function OfficesSection({ t, officeCards }) {
  return (
    <section className="py-16 md:py-24 bg-white rounded-[32px] md:rounded-[40px] lg:rounded-[80px] mx-4 md:mx-6 mb-12 md:mb-24 reveal">
      <div className="container-wide">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-sky-600 font-bold text-xs uppercase tracking-widest">{t('contactPage.officesEyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 tracking-tight">{t('contactPage.officesTitle')}</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10 max-w-[1400px] mx-auto">
          {officeCards.map((office) => (
            <article key={office.title} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_42px_rgba(15,23,42,0.10)]">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] lg:min-h-[420px]">
                <div className="order-1 bg-white p-5 md:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[24px] sm:text-[28px] md:text-[32px] font-black tracking-tight leading-[1.1] text-slate-900 mb-5 md:mb-7">{office.title}</h4>
                    <div className="h-px bg-slate-300 mb-5 md:mb-7" />
                    <address className="not-italic text-[15px] sm:text-[16px] md:text-[17px] leading-7 md:leading-8 text-slate-700 font-medium max-w-[36ch]">
                      {office.addressLines.map((line, idx) => (
                        <span key={`${office.title}-${idx}`} className={`block ${idx === 0 ? 'font-bold text-slate-900' : ''}`}>
                          {line}
                        </span>
                      ))}
                    </address>
                    {office.regNo ? (
                      <p className="mt-4 pt-3 border-t border-slate-200 text-[14px] sm:text-[15px] font-extrabold text-slate-900">{office.regNo}</p>
                    ) : null}
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    {t('contactPage.officeFooter')}
                  </div>
                </div>

                <div className="order-2 border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-100">
                  <iframe
                    title={`${office.title} map`}
                    src={office.mapEmbed}
                    width="100%"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                    className="w-full h-[300px] md:h-[380px] lg:h-full"
                    style={{ filter: 'grayscale(100%) contrast(1.05)' }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">{t('contactPage.officesSummary')}</p>
        </div>
      </div>
    </section>
  );
}

OfficesSection.propTypes = {
  t: PropTypes.func.isRequired,
  officeCards: PropTypes.arrayOf(officeCardShape).isRequired,
};

export default function IletisimPage() {
  const { t, locale } = useLanguage();
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef(null);

  const heroBreadcrumbs = [t('contactPage.heroBreadcrumbs.0'), t('contactPage.heroBreadcrumbs.1')];
  const officeCards = locale === 'ro' ? OFFICE_CARDS.ro : locale === 'en' ? OFFICE_CARDS.en : OFFICE_CARDS.tr;
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleConsentChange = (event) => {
    const { checked } = event.target;
    setFormData((prev) => ({ ...prev, consent: checked }));
    if (formErrors.consent) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.consent;
        return next;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData, t, {
      requireRecaptcha: Boolean(recaptchaSiteKey),
      hasRecaptchaToken: Boolean(recaptchaToken),
    });

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setStatus({ type: 'error', msg: t('contactPage.formValidationError') });

      const firstInvalidField = Object.keys(validationErrors)[0];
      if (firstInvalidField) {
        globalThis.requestAnimationFrame(() => {
          const firstField = document.getElementById(firstInvalidField);
          firstField?.focus();
        });
      }

      return;
    }

    setStatus({ type: '', msg: '' });
    setFormErrors({});
    setIsSubmitting(true);

    try {
      const csrfToken = getCookieValue('csrf_token');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          ...formData,
          locale,
          recaptchaToken: recaptchaToken || undefined,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || t('contactPage.formSubmitError'));
      }

      setStatus({ type: 'success', msg: t('contactPage.formSuccess') });
      setFormData(INITIAL_FORM_DATA);
      setRecaptchaToken('');
      recaptchaRef.current?.reset();
    } catch (error) {
      setStatus({ type: 'error', msg: error.message || t('contactPage.formSubmitError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      <PageHero
        title={t('contactPage.heroTitle')}
        subtitle={t('contactPage.heroSubtitle')}
        breadcrumbs={heroBreadcrumbs}
      />

      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 xl:gap-24 items-start">
            <ContactInfoPanel t={t} contactInfo={CONTACT_INFO} />
            <ContactFormPanel
              t={t}
              statusMessage={status.msg}
              statusType={status.type}
              onSubmit={handleSubmit}
              recaptchaSiteKey={recaptchaSiteKey}
              recaptchaToken={recaptchaToken}
              onRecaptchaChange={setRecaptchaToken}
              recaptchaRef={recaptchaRef}
              formData={formData}
              formErrors={formErrors}
              onFieldChange={handleFieldChange}
              onConsentChange={handleConsentChange}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </section>

      <OfficesSection t={t} officeCards={officeCards} />
    </div>
  );
}

