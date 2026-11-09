import { getFooterData } from '../../lib/strapi/services/footer';
import FooterClient from './Footer';

/**
 * Server component — Footer verisini Strapi'den (ya da JSON fallback'ten) çeker.
 *
 * Yalnızca aktif dilin verisi geçilir; kullanıcı dili client tarafında değiştirirse FooterClient
 * eksik dilin verisini /api/layout-data'dan ister (bkz. useLocaleLayoutData). getFooterData bağlantı
 * yoksa kendi içinde JSON fallback döner.
 */
export default async function FooterServer({ locale = 'ro' }) {
  let data = null;
  try {
    data = await getFooterData(locale);
  } catch {
    data = null;
  }

  return <FooterClient allLocaleData={{ [locale]: data }} />;
}
