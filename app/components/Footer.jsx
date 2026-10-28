'use client';

import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useLanguage } from '../_context/LanguageContext';
import { SERVICE_CATALOG } from '../../config/services';

// JSON fallback verileri — Strapi geldiğinde kullanılmaz,
// ama FooterServer data aktarmadan çağrılırsa (eski kullanım) korunur.
import trLocale from '../../messages/components/footer/tr.json';
import enLocale from '../../messages/components/footer/en.json';
import roLocale from '../../messages/components/footer/ro.json';

const LOCALE_MAP = { tr: trLocale, en: enLocale, ro: roLocale };

// Yapay Zeka Yönetim Sistemi Çerçeve Politikası — yeni sekmede açılan PDF
const AI_POLICY_PDF = '/downloads/siskon-yapay-zeka-politikasi.pdf';

/**
 * Footer istemci bileşeni.
 *
 * `allLocaleData` geçilirse → FooterServer üç dilin verisini birden verir; aktif dil
 *   (useLanguage) burada seçilir. Dil client tarafında değişince layout yeniden
 *   render edilmediği için footer'ın metni bu sayede anında güncellenir.
 * `data` prop geçilirse → tek dilli veri (eski kullanım).
 * İkisi de yoksa → yerel JSON fallback'e döner.
 *
 * @param {{ data?: import('../../lib/strapi/services/footer').FooterData, allLocaleData?: Record<'tr'|'en'|'ro', object|null> }} props
 */
export default function Footer({ data, allLocaleData }) { // NOSONAR
  const { locale, localizePath } = useLanguage();
  const serviceLocale = locale === 'en' ? 'en' : locale === 'ro' ? 'ro' : 'tr';

  // Aktif dilin Strapi verisi (yoksa tek dilli `data`); olmazsa JSON fallback
  const localeData = allLocaleData?.[locale] ?? (allLocaleData ? null : data);
  const msgs = localeData ?? LOCALE_MAP[locale] ?? roLocale;

  // Kısa yardımcı: Strapi veya fallback'ten string al
  const t = (key) => msgs[key] ?? LOCALE_MAP[locale]?.[key] ?? '';

  const services = SERVICE_CATALOG.map((service) => ({
    name: service.names[serviceLocale],
    href: service.href,
  }));

  const products = [
    { name: 'OnSuite', href: '/onsuite' },
  ];

  const infoLinks = [
    { name: t('rAndD'),       href: '/arge' },
    { name: t('partnerships'), href: '/is-birlikleri' },
    { name: t('references'),  href: '/referanslar' },
  ];

  const corporate = [
    { name: t('about'),       href: '/kurumsal/bizi-taniyin' },
    { name: t('career'),      href: '/kurumsal/kariyer' },
    { name: 'Blog',           href: '/blog' },
    { name: t('kvkk'),        href: '/yasal/kvkk' },
    { name: t('cookie'),      href: '/yasal/cerez-politikasi' },
  ];

  // Sosyal medya linkleri — Strapi gelirse ondan al, yoksa sabit değerler
  const social = localeData?.socialLinks ?? (locale === 'ro'
    ? {
        linkedinUrl: 'https://www.linkedin.com/company/siskonromania/',
        youtubeUrl:  'https://www.youtube.com/channel/UCpEyoqwoPBYzUcyI5lCG0Wg',
        instagramUrl:'https://www.instagram.com/siskon_romania',
        twitterUrl:  'https://x.com/siskonsoftware',
      }
    : {
        linkedinUrl: 'https://www.linkedin.com/company/siskonyazilimveotomasyon',
        youtubeUrl:  'https://www.youtube.com/channel/UCpEyoqwoPBYzUcyI5lCG0Wg',
        instagramUrl:'https://www.instagram.com/siskonyazilimveotomasyon/',
        twitterUrl:  'https://x.com/siskonsoftware',
      });

  const logoSrc = localeData?.logo ?? '/assets/new/common/siskon-logo.svg';
  const email   = locale === 'ro' ? 'sales@siskon.ro' : (localeData?.email ?? 'info@siskon.com.tr');
  const phones  = [
    { label: 'Telefon (RO)', val: '+40 368 402 002', href: 'tel:+40368402002' },
    ...(locale === 'ro' ? [] : [{ label: 'Telefon (TR)', val: '+90 232 245 00 76', href: 'tel:+902322450076' }]),
  ].map((p) => (locale === 'en' ? { ...p, label: p.label.replace('Telefon', 'Phone') } : p));
  const slogan  = localeData?.slogan  ?? 'Makes Your Factory Smarter';

  return (
    <footer className="bg-[#0A192F] text-white pt-16 pb-7">
      {/* Header ve sayfa bölümleriyle aynı içerik genişliği/hizası: container-wide
          (max 1440px, --space-inline iç boşluk). Ek sol boşluk verilmez. */}
      <div className="container-wide px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Şirket bilgileri */}
          <div className="space-y-5">
            <Link href={localizePath('/')} className="inline-flex items-center">
              <span className="relative block w-[160px] h-[48px]">
                <Image
                  src={logoSrc}
                  alt="Siskon"
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </span>
            </Link>
            <p className="text-slate-300 text-base leading-relaxed max-w-md opacity-95">
              {t('tagline')}
            </p>
            <div className="pt-2 space-y-2 text-base text-slate-100 font-semibold">
              <a href={`mailto:${email}`} className="block hover:text-sky-300">{email}</a>
              {phones.map((p) => (
                <a key={p.href} href={p.href} className="block hover:text-sky-300 break-all sm:break-normal">{p.label}: {p.val}</a>
              ))}
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{t('services')}</h5>
            <ul className="space-y-2 text-white text-base font-semibold">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ürünler & Bilgi */}
          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{t('products')}</h5>
            <ul className="space-y-2 text-white text-base font-semibold mb-8">
              {products.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
            </ul>

            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{t('insights')}</h5>
            <ul className="space-y-2 text-white text-base font-semibold">
              {infoLinks.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{t('corporate')}</h5>
            <ul className="space-y-2 text-white text-base font-semibold">
              {corporate.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
              {/* Politika yalnızca Türkçe hazırlandığı için sadece Türkçe sitede gösterilir */}
              {locale === 'tr' && (
                <li>
                  <a href={AI_POLICY_PDF} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300">{t('aiPolicy')}</a>
                </li>
              )}
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{t('stayConnected')}</h5>
            <ul className="space-y-3 text-white text-base font-semibold mb-8">
              <li>
                <a href={social.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300 inline-flex items-center gap-3 leading-none">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/25">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05C11.88 8.97 13.54 7.7 16.2 7.7 21 7.7 24 10.85 24 16.6V23h-4v-5.58c0-2.66-.05-6.08-3.7-6.08-3.7 0-4.27 2.9-4.27 5.88V23h-4V8z"/>
                  </svg>
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href={social.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300 inline-flex items-center gap-3 leading-none">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/25">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a2.94 2.94 0 0 0-2.07-2.08C19.57 3.6 12 3.6 12 3.6s-7.57 0-9.43.52A2.94 2.94 0 0 0 .5 6.2 30.6 30.6 0 0 0 0 12a30.6 30.6 0 0 0 .5 5.8 2.94 2.94 0 0 0 2.07 2.08c1.86.52 9.43.52 9.43.52s7.57 0 9.43-.52a2.94 2.94 0 0 0 2.07-2.08A30.6 30.6 0 0 0 24 12a30.6 30.6 0 0 0-.5-5.8zM9.6 15.4V8.6L15.8 12l-6.2 3.4z"/>
                  </svg>
                  </span>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href={social.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300 inline-flex items-center gap-3 leading-none">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/25">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm10.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                  </svg>
                  </span>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href={social.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-sky-300 inline-flex items-center gap-3 leading-none"
                >
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/25">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </span>
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-300 text-sm font-semibold">
          <div className="space-y-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} Siskon Endüstriyel Otomasyon Sistemleri San. ve Tic. A.Ş. {t('allRights')}</p>
          </div>
          <p className="uppercase tracking-wide font-black text-slate-300 text-xs">{slogan}</p>
        </div>
      </div>
    </footer>
  );
}

const footerDataShape = PropTypes.shape({
  logo:       PropTypes.string,
  tagline:    PropTypes.string,
  email:      PropTypes.string,
  phone:      PropTypes.string,
  slogan:     PropTypes.string,
  allRights:  PropTypes.string,
  services:   PropTypes.string,
  products:   PropTypes.string,
  insights:   PropTypes.string,
  corporate:  PropTypes.string,
  stayConnected: PropTypes.string,
  rAndD:         PropTypes.string,
  partnerships:  PropTypes.string,
  references:    PropTypes.string,
  about:         PropTypes.string,
  career:        PropTypes.string,
  kvkk:          PropTypes.string,
  cookie:        PropTypes.string,
  aiPolicy:      PropTypes.string,
  socialLinks: PropTypes.shape({
    linkedinUrl:   PropTypes.string,
    youtubeUrl:    PropTypes.string,
    instagramUrl:  PropTypes.string,
    twitterUrl:    PropTypes.string,
  }),
});

Footer.propTypes = {
  /** Tek dilli footer verisi (eski kullanım) */
  data: footerDataShape,
  /** Üç dilin footer verisi (Strapi ya da getFooterData fallback'i); aktif dil istemcide seçilir */
  allLocaleData: PropTypes.shape({
    tr: footerDataShape,
    en: footerDataShape,
    ro: footerDataShape,
  }),
};

Footer.defaultProps = {
  data: null,
  allLocaleData: null,
};
