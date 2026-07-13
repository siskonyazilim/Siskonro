import './globals.css';
import { headers } from 'next/headers';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import Interactions from './components/Interactions';
import SearchModal from './components/SearchModal';
import ClientMetadataSync from './components/ClientMetadataSync';
import CerezgoUnlock from './components/CerezgoUnlock';
import { LanguageProvider } from './_context/LanguageContext';
import { detectLocale } from './lib/i18n/routes';
import { buildLocalizedMetadata, getRequestPathFromHeaders, getSiteUrlFromHeaders } from './lib/seo/routeMetadata';

export async function generateMetadata() {
  const requestHeaders = await headers();
  const requestPath = getRequestPathFromHeaders(requestHeaders);
  const siteUrl = getSiteUrlFromHeaders(requestHeaders);
  const localized = buildLocalizedMetadata({ pathname: requestPath, siteUrl });

  return {
    ...localized,
    metadataBase: new URL(siteUrl),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
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
  const locale = detectLocale(requestPath);
  const htmlLang = locale === 'en' ? 'en' : locale === 'ro' ? 'ro' : 'tr';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Siskon',
    url: siteUrl,
    logo: `${siteUrl}/assets/new/common/siskon-logo.svg`,
    email: 'info@siskon.com.tr',
    telephone: '+90-232-245-00-76',
    sameAs: [
      'https://tr.linkedin.com/company/siskonyazilimveotomasyon',
      'https://www.youtube.com/@SiskonYazilimveOtomasyon',
      'https://www.instagram.com/siskonotomasyon/',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Siskon',
    url: siteUrl,
    inLanguage: ['ro-RO', 'tr-TR', 'en-US'],
  };

  return (
    <html lang={htmlLang} data-scroll-behavior="smooth">
      <body className="antialiased min-h-screen flex flex-col">
        <Script
          id="cerezgo-sdk"
          src="https://cdn.cerezgo.com/file/cerezgo-v3.min.js"
          data-key="tcb1SjODUgMGizndx+ZcTrEzjNZqRVI1gNt/hILmvU/4wo7xt1aj0tG91BrxrtNTC/3LwXsFxqjtqprlKlcN6Tf8tP4jiLxG7JcBwACNnaA="
          data-id="nt"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <LanguageProvider initialLocale={locale}>
          <CerezgoUnlock />
          <ClientMetadataSync />
          <Header />
          <main className="w-full flex-1 flex flex-col">{children}</main>
          <Footer />
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

