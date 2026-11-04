import './globals.css';
import { headers } from 'next/headers';
import PropTypes from 'prop-types';
import Script from 'next/script';
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

// Üçüncü taraf anahtarları (tarayıcıya zaten açık, gizli değil). Env ile değiştirilebilir.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5MMBST5Z';
const CEREZGO_KEY = process.env.NEXT_PUBLIC_CEREZGO_KEY || 'tcb1SjODUgMGizndx+ZcTrEzjNZqRVI1gNt/hILmvU+GneQaD/xmpM1X/fORQP2jmE8WYvYMwoiD/jTIksSvtqEyscnc81j77JcBwACNnaA=';

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
    // İkonlar app/ dosya kurallarından gelir: favicon.ico, icon.svg, icon1.png (PNG yedeği), apple-icon.png.
    // Burada `icons` tanımlamak bu dosyaları bastırır.
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
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {/* Google Consent Mode v2: onay verilene kadar analitik/reklam depolaması kapalı.
            CerezGo onayı alınca GTM'e günceller. GTM ve CerezGo'dan ÖNCE çalışmalı. */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'security_storage': 'granted',
  'wait_for_update': 500
});`}
        </Script>
        {/* CerezGo (çerez onayı) GTM'den ÖNCE yüklenmeli: onay durumu etiketlerden önce hazır olsun */}
        <Script
          id="cerezgo-sdk"
          src="https://cdn.cerezgo.com/file/cerezgo-v3.min.js"
          data-key={CEREZGO_KEY}
          data-id="nt"
          strategy="beforeInteractive"
        />
        <Script id="cerezgo-unlock" src="/cerezgo-unlock.js" strategy="beforeInteractive" />
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
        </Script>
        <Script
          id="gtm-sdk"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          strategy="afterInteractive"
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <JsonLd data={structuredData} />
        <LanguageProvider initialLocale={locale}>
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

