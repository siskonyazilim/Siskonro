import { headers } from 'next/headers';
import { detectLocale } from '../lib/i18n/routes';
import { getRequestPathFromHeaders } from '../lib/seo/routeMetadata';
import { getFooterData } from '../../lib/strapi/services/footer';
import FooterClient from './Footer';

/**
 * Server component — Footer verilerini Strapi'den (ya da JSON fallback'ten) çeker
 * ve FooterClient'a props olarak aktarır.
 *
 * layout.jsx'te <Footer /> yerine bu bileşen kullanılır.
 */
export default async function FooterServer() {
  const requestHeaders = await headers();
  const requestPath = getRequestPathFromHeaders(requestHeaders);
  const locale = detectLocale(requestPath);

  // Strapi'den veri çek; bağlantı yoksa getFooterData içinde JSON fallback döner
  const footerData = await getFooterData(locale);

  return <FooterClient data={footerData} />;
}
