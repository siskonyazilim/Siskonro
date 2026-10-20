import './globals.css';
import { headers } from 'next/headers';
import PropTypes from 'prop-types';
import HeaderServer from './components/HeaderServer';
import FooterServer from './components/FooterServer';
import Interactions from './components/Interactions';
import SearchModal from './components/SearchModal';
import ClientMetadataSync from './components/ClientMetadataSync';
import { LanguageProvider } from './_context/LanguageContext';
import JsonLd from './components/JsonLd';
import { detectLocale, toInternalPath } from './lib/i18n/routes';
import { buildLocalizedMetadata, getRequestPathFromHeaders, getSiteUrlFromHeaders } from './lib/seo/routeMetadata';
import { buildSiteGraph } from './lib/seo/jsonld';

// Dahili arama sonuç sayfası: değer katmayan, sorguya göre değişen içerik → indekslenmesin.
// (robots.txt ile engellenmez: Google'ın noindex'i görebilmesi için taranabilir kalmalı.)
function isNoIndexPath(pathname) {
  const internal = toInternalPath(pathname, detectLocale(pathname));
  return internal === '/search' || internal.startsWith('/search/');
}

export async function generateMetadata() {
  const requestHeaders = await headers();
  const requestPath = getRequestPathFromHeaders(requestHeaders);
  const siteUrl = getSiteUrlFromHeaders(requestHeaders);
  const localized = buildLocalizedMetadata({ pathname: requestPath, siteUrl });
  const noIndex = isNoIndexPath(requestPath);

  return {
    ...localized,
    metadataBase: new URL(siteUrl),
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
      },
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: '/icon.svg',
    },
  };
}

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const requestPath = getRequestPathFromHeaders(requestHeaders);
  const siteUrl = getSiteUrlFromHeaders(requestHeaders);

  // Not: Next.js rewrites /en → /?_locale=en yapıyor, path kayboluyor.
  // LanguageContext client-side'da window.location.pathname'den doğru locale'i alıyor.
  // HeaderServer tüm locale'leri paralel çekip client'a bırakıyor.
  // Bu locale sadece <html lang=> ve LanguageProvider initialLocale için kullanılıyor.
  const locale = detectLocale(requestPath);
  const htmlLang = locale === 'en' ? 'en' : locale === 'ro' ? 'ro' : 'tr';

  // Tek @graph: Organization + WebSite + (varsa) sayfaya özel WebPage/Service/Breadcrumb düğümleri.
  // Düğümler @id ile birbirine bağlanır (bkz. app/lib/seo/jsonld.js).
  const structuredData = buildSiteGraph({ pathname: requestPath, siteUrl });

  return (
    <html lang={htmlLang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        {/* CerezGo geçici olarak devre dışı — mobil scroll testi için
        <Script
          id="cerezgo-sdk"
          src="https://cdn.cerezgo.com/file/cerezgo-v3.min.js"
          data-key="tcb1SjODUgMGizndx+ZcTrEzjNZqRVI1gNt/hILmvU/4wo7xt1aj0tG91BrxrtNTC/3LwXsFxqjtqprlKlcN6Tf8tP4jiLxG7JcBwACNnaA="
          data-id="nt"
          strategy="afterInteractive"
        />
        */}
        <JsonLd data={structuredData} />
        <LanguageProvider initialLocale={locale}>
          {/* <CerezgoUnlock /> — CerezGo devre dışı olduğu için gerek yok */}
          <ClientMetadataSync />
          <HeaderServer />
          <main className="w-full flex-1 flex flex-col">{children}</main>
          <FooterServer />
          <Interactions />
          <SearchModal />
        </LanguageProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

