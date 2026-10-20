/**
 * HeaderServer — Server Component
 *
 * Next.js'in rewrite sistemi /en → /?_locale=en şeklinde çalışıyor.
 * Bu yüzden layout.jsx server-side'da locale'i path'ten tespit edemiyor.
 * LanguageContext ise client-side window.location.pathname'den doğru locale'i biliyor.
 *
 * Çözüm: 3 locale için veriyi paralel çekip hepsini birden Header'a geçir.
 * Header client-side'da useLanguage() locale'ini kullanarak doğru veriyi seçer.
 */

import { getHeaderData } from '@/lib/strapi/services/header';
import Header from './Header';

export default async function HeaderServer() {
  // 3 locale için paralel fetch — biri başarısız olursa diğerleri devam eder
  const [trData, enData, roData] = await Promise.allSettled([
    getHeaderData('tr'),
    getHeaderData('en'),
    getHeaderData('ro'),
  ]);

  const allLocaleData = {
    tr: trData.status === 'fulfilled' ? trData.value : null,
    en: enData.status === 'fulfilled' ? enData.value : null,
    ro: roData.status === 'fulfilled' ? roData.value : null,
  };

  return <Header allLocaleData={allLocaleData} />;
}
