/**
 * Ana Sayfa — Server Component
 *
 * Veriler doğrudan Strapi'den server-side çekilir.
 * 'use client' YOKTUR — bu sayede getHomePage() çalışır ve ISR/webhook desteklenir.
 *
 * Mimari:
 *   headers() → locale detect → getHomePage(locale) → Strapi → section components
 *
 * İnteraktif bölümler (harita hover, blog carousel) ayrı 'use client' component'lerdir:
 *   - WorldMapSection  → hover state
 *   - BlogSection      → carousel state + fetch
 */

import { headers } from 'next/headers';
import { detectLocale } from './lib/i18n/routes';
import { getHomePage } from '@/lib/strapi/services/home';

// Section components
import HeroSection from './components/home/HeroSection';
import ServicesSection from './components/home/ServicesSection';
import OnSuiteSection from './components/home/OnSuiteSection';
import GlobalStatsSection from './components/home/GlobalStatsSection';
import WorldMapSection from './components/home/WorldMapSection';
import ReferencesSection from './components/home/ReferencesSection';
import BlogSection from './components/home/BlogSection';
import CtaSection from './components/home/CtaSection';

export default async function HomePage(props) {
  // Locale tespiti — öncelik sırası:
  // 1. ?_locale=en/ro query param (rewrite tarafından eklenir, en güvenilir)
  // 2. x-pathname header (proxy.ts tarafından set edilir)
  // 3. x-invoke-path header (Next.js internal)
  const searchParams = await props.searchParams;
  const localeFromQuery = searchParams?._locale;

  const requestHeaders = await headers();
  // x-pathname: middleware tarafından rewrite öncesi set edilir (/en, /ro, vb.)
  // x-invoke-path: Next.js'in rewrite sonrası iç yolu (/ olabilir)
  const requestPath =
    requestHeaders.get('x-pathname') ??
    requestHeaders.get('x-invoke-path') ??
    '/';

  const locale = (localeFromQuery === 'en' || localeFromQuery === 'ro')
    ? localeFromQuery
    : detectLocale(requestPath);

  // Strapi'den veri çek — hata olursa JSON fallback devreye girer
  const homeData = await getHomePage(locale);

  return (
    <div className="bg-white overflow-x-clip">
      {/* 1 — Hero */}
      <HeroSection data={homeData} locale={locale} />

      {/* 2 — Hizmetler */}
      <ServicesSection data={homeData} locale={locale} />

      {/* 3 — OnSuite ürün tanıtımı */}
      <OnSuiteSection data={homeData} locale={locale} />



      {/* 5 — Global istatistikler */}
      <GlobalStatsSection data={homeData} />

      {/* 4 — Referans logoları */}
      <ReferencesSection data={homeData} />

      {/* 6 — Dünya haritası (client: hover state) */}
      <WorldMapSection data={homeData} locale={locale} />

      {/* 7 — Blog önizleme (client: carousel state + fetch) */}
      <BlogSection locale={locale} />

      {/* 8 — CTA bant */}
      <CtaSection data={homeData} locale={locale} />
    </div>
  );
}
