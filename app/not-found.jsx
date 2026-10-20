'use client';

import Link from 'next/link';
import AnimatedButton from './_context/../components/AnimatedButton';
import { useLanguage } from './_context/LanguageContext';

const TRANSLATIONS = {
  tr: {
    errorLabel: 'Hata 404',
    heading: 'Sayfa Bulunamadı',
    body: 'Aradığınız sayfa taşınmış, kaldırılmış veya bağlantı yanlış olabilir. Aşağıdaki yönlendirmelerle doğru içeriklere ulaşabilirsiniz.',
    home: 'Ana Sayfa',
    services: 'Hizmetler',
    contact: 'İletişim',
    popularTitle: 'Popüler Sayfalar',
    popularDesc: 'Kullanıcıların en çok ziyaret ettiği sayfalara tek tıkla geçiş yapın.',
    links: [
      { label: 'OnSuite', href: '/onsuite' },
      { label: 'Referanslar', href: '/referanslar' },
      { label: 'Bizi Tanıyın', href: '/kurumsal/bizi-taniyin' },
      { label: 'Çözüm Alanları', href: '/hizmetler' },
    ],
  },
  en: {
    errorLabel: 'Error 404',
    heading: 'Page Not Found',
    body: 'The page you are looking for may have been moved, removed or the link may be incorrect. Use the links below to find what you need.',
    home: 'Home',
    services: 'Services',
    contact: 'Contact',
    popularTitle: 'Popular Pages',
    popularDesc: 'Jump to the most visited pages with a single click.',
    links: [
      { label: 'OnSuite', href: '/en/onsuite' },
      { label: 'References', href: '/en/references' },
      { label: 'About Us', href: '/en/about' },
      { label: 'Solution Areas', href: '/en/services' },
    ],
  },
  ro: {
    errorLabel: 'Eroare 404',
    heading: 'Pagina Nu a Fost Găsită',
    body: 'Pagina pe care o căutați poate fi mutată, eliminată sau linkul poate fi incorect. Utilizați linkurile de mai jos pentru a găsi ceea ce aveți nevoie.',
    home: 'Acasă',
    services: 'Servicii',
    contact: 'Contactați-ne',
    popularTitle: 'Pagini Populare',
    popularDesc: 'Navigați la cele mai vizitate pagini cu un singur click.',
    links: [
      { label: 'OnSuite', href: '/ro/onsuite' },
      { label: 'Referințe', href: '/ro/referinte' },
      { label: 'Despre Noi', href: '/ro/compania' },
      { label: 'Domenii de Soluții', href: '/ro/servicii' },
    ],
  },
};

export default function NotFound() {
  const { locale, localizePath } = useLanguage();
  const tx = TRANSLATIONS[locale] || TRANSLATIONS.tr;

  return (
    <div className="bg-white min-h-[70vh]">
      <section className="relative overflow-hidden bg-[#0A192F] pt-36 md:pt-44 pb-24 md:pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-700/25 via-transparent to-blue-900/20" />
        <div className="absolute -top-24 -right-20 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container max-w-5xl relative z-10">
          <div className="rounded-[28px] md:rounded-[36px] border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-sky-300 font-bold mb-4">{tx.errorLabel}</p>
            <h1 className="text-6xl md:text-8xl font-black mb-2 text-white">404</h1>
            <h2 className="text-2xl md:text-5xl font-bold mb-5 text-white">{tx.heading}</h2>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
              {tx.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <AnimatedButton href={localizePath('/')} className="px-7 py-3 rounded-xl">
                {tx.home}
              </AnimatedButton>
              <Link href={localizePath('/hizmetler')} className="px-7 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 transition-all font-semibold text-center">
                {tx.services}
              </Link>
              <Link href={localizePath('/iletisim')} className="px-7 py-3 rounded-xl border border-white/40 text-white hover:bg-white/10 transition-all font-semibold text-center">
                {tx.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 px-6 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{tx.popularTitle}</h3>
            <p className="text-slate-600 mb-7 leading-relaxed">{tx.popularDesc}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {tx.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all font-semibold text-slate-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
