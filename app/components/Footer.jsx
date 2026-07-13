'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../_context/LanguageContext';
import { SERVICE_CATALOG } from '../../config/services';

export default function Footer() { // NOSONAR
  const { locale, localizePath } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceLocale = isEn ? 'en' : isRo ? 'ro' : 'tr';
  const labels = isRo
    ? {
      services: 'Servicii',
      products: 'Produse',
      insights: 'Informații',
      corporate: 'Companie',
      stayConnected: 'Rămâneți Conectat',
      allRights: 'Toate drepturile rezervate.',
      rAndD: 'C&D',
      partnerships: 'Parteneriate',
      references: 'Referințe',
      about: 'Despre Noi',
      career: 'Cariere',
      milestones: 'Etape',
      kvkk: 'Notificare PDPL',
      privacy: 'Politica de Confidențialitate',
      cookie: 'Politica de Cookie-uri',
      tagline: 'Din 1997, inginerie independentă în software industrial, automatizare și analiza datelor.',
    }
    : isEn
    ? {
      services: 'Services',
      products: 'Products',
      insights: 'Insights',
      corporate: 'Corporate',
      stayConnected: 'Stay Connected',
      allRights: 'All rights reserved.',
      rAndD: 'R&D',
      partnerships: 'Partnerships',
      references: 'References',
      about: 'About Us',
      career: 'Career',
      milestones: 'Milestones',
      kvkk: 'PDPL Notice',
      privacy: 'Privacy Policy',
      cookie: 'Cookie Policy',
      tagline: 'Since 1997, independent engineering in industrial software, automation and data analytics.',
    }
    : {
      services: 'Hizmetler',
      products: 'Ürünler',
      insights: 'Bilgi',
      corporate: 'Kurumsal',
      stayConnected: 'Bağlantıda Kalın',
      allRights: 'Tüm hakları saklıdır.',
      rAndD: 'AR-GE',
      partnerships: 'İş Birlikleri',
      references: 'Referanslar',
      about: 'Bizi Tanıyın',
      career: 'Kariyer',
      milestones: 'Kilometre Taşları',
      kvkk: 'KVKK Aydınlatma Metni',
      privacy: 'Gizlilik Politikası',
      cookie: 'Çerez Politikası',
      tagline: '1997\'den bu yana endüstriyel yazılım, otomasyon ve veri analitiği alanında bağımsız mühendislik.',
    };

  const services = SERVICE_CATALOG.map((service) => ({
    name: service.names[serviceLocale],
    href: service.href,
  }));

  const products = [
    { name: 'OnSuite', href: '/onsuite' },
  ];

  const infoLinks = [
    { name: labels.rAndD, href: '/arge' },
    { name: labels.partnerships, href: '/is-birlikleri' },
    { name: labels.references, href: '/referanslar' },
  ];

  const corporate = [
    { name: labels.about, href: '/kurumsal/bizi-taniyin' },
    { name: labels.career, href: '/kurumsal/kariyer' },
    { name: labels.kvkk, href: '/yasal/kvkk' },
    { name: labels.privacy, href: '/yasal/gizlilik-politikasi' },
    { name: labels.cookie, href: '/yasal/cerez-politikasi' },
  ];

  return (
    <footer className="bg-[#082a53] text-white pt-16 pb-7">
      <div className="container-wide px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:pl-6 xl:pl-10">
          <div className="space-y-5">
            <Link href={localizePath('/')} className="inline-flex items-center">
              <span className="relative block w-[160px] h-[48px]">
                <Image
                  src="/assets/new/common/siskon-logo.svg"
                  alt="Siskon"
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </span>
            </Link>
            <p className="text-slate-300 text-base leading-relaxed max-w-md opacity-95">
              {labels.tagline}
            </p>
            <div className="pt-2 space-y-2 text-base text-slate-100 font-semibold">
              <a href="mailto:info@siskon.com.tr" className="block hover:text-sky-300">info@siskon.com.tr</a>
              <a href="tel:+902322450076" className="block hover:text-sky-300 break-all sm:break-normal">+90 (232) 245 00 76</a>
            </div>
           
          </div>

          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{labels.services}</h5>
            <ul className="space-y-2 text-white text-base font-semibold">
              {services.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{labels.products}</h5>
            <ul className="space-y-2 text-white text-base font-semibold mb-8">
              {products.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
            </ul>

            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{labels.insights}</h5>
            <ul className="space-y-2 text-white text-base font-semibold">
              {infoLinks.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{labels.corporate}</h5>
            <ul className="space-y-2 text-white text-base font-semibold">
              {corporate.map((item) => (
                <li key={item.name}>
                  <Link href={localizePath(item.href)} className="text-white hover:text-sky-300">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black tracking-wide text-sm uppercase mb-5 text-sky-300">{labels.stayConnected}</h5>
            <ul className="space-y-3 text-white text-base font-semibold mb-8">
              <li>
                <a href="https://tr.linkedin.com/company/siskonyazilimveotomasyon" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300 inline-flex items-center gap-3 leading-none">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/25">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05C11.88 8.97 13.54 7.7 16.2 7.7 21 7.7 24 10.85 24 16.6V23h-4v-5.58c0-2.66-.05-6.08-3.7-6.08-3.7 0-4.27 2.9-4.27 5.88V23h-4V8z"/>
                  </svg>
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@SiskonYazilimveOtomasyon" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300 inline-flex items-center gap-3 leading-none">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/25">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a2.94 2.94 0 0 0-2.07-2.08C19.57 3.6 12 3.6 12 3.6s-7.57 0-9.43.52A2.94 2.94 0 0 0 .5 6.2 30.6 30.6 0 0 0 0 12a30.6 30.6 0 0 0 .5 5.8 2.94 2.94 0 0 0 2.07 2.08c1.86.52 9.43.52 9.43.52s7.57 0 9.43-.52a2.94 2.94 0 0 0 2.07-2.08A30.6 30.6 0 0 0 24 12a30.6 30.6 0 0 0-.5-5.8zM9.6 15.4V8.6L15.8 12l-6.2 3.4z"/>
                  </svg>
                  </span>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/siskonotomasyon/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sky-300 inline-flex items-center gap-3 leading-none">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full border border-white/25">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm10.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
                  </svg>
                  </span>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-300 text-sm font-semibold">
          <div className="space-y-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} Siskon Endüstriyel Otomasyon Sistemleri San. ve Tic. A.Ş. {labels.allRights}</p>
          </div>
          <p className="uppercase tracking-wide font-black text-slate-300 text-xs">Makes Your Factory Smarter</p>
        </div>
      </div>
    </footer>
  );
}
