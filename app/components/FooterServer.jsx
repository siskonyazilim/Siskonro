import { getFooterData } from '../../lib/strapi/services/footer';
import FooterClient from './Footer';

/**
 * Server component — Footer verilerini Strapi'den (ya da JSON fallback'ten) çeker
 * ve FooterClient'a props olarak aktarır.
 *
 * Dil client tarafında değiştiğinde (router.replace) root layout yeniden render
 * edilmez; bu yüzden tek dil yerine 3 dilin verisini birden geçiriyoruz (HeaderServer ile
 * aynı yaklaşım). FooterClient aktif dili useLanguage() ile seçer.
 *
 * layout.jsx'te <Footer /> yerine bu bileşen kullanılır.
 */
export default async function FooterServer() {
  // 3 dil için paralel fetch — biri başarısız olursa diğerleri devam eder.
  // getFooterData bağlantı yoksa kendi içinde JSON fallback döner.
  const [trData, enData, roData] = await Promise.allSettled([
    getFooterData('tr'),
    getFooterData('en'),
    getFooterData('ro'),
  ]);

  const allLocaleData = {
    tr: trData.status === 'fulfilled' ? trData.value : null,
    en: enData.status === 'fulfilled' ? enData.value : null,
    ro: roData.status === 'fulfilled' ? roData.value : null,
  };

  return <FooterClient allLocaleData={allLocaleData} />;
}
