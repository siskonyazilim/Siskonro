/**
 * HeaderServer — Server Component
 *
 * Yalnızca aktif dilin (layout'ın tespit ettiği locale) verisini Strapi'den çekip Header'a verir.
 * Kullanıcı dili client tarafında değiştirirse Header eksik dilin verisini /api/layout-data'dan ister
 * (bkz. useLocaleLayoutData). Böylece HTML/RSC payload'ında 3 dil yerine 1 dil taşınır.
 */

import { getHeaderData } from '@/lib/strapi/services/header';
import Header from './Header';

export default async function HeaderServer({ locale = 'ro' }) {
  let data = null;
  try {
    data = await getHeaderData(locale);
  } catch {
    data = null;
  }

  return <Header allLocaleData={{ [locale]: data }} />;
}
