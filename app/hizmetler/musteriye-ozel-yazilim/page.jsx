import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import CustomSoftwarePageClient from './CustomSoftwarePageClient';

export const dynamic = 'force-dynamic';

export default async function CustomSoftwarePage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('musteriye-ozel-yazilim', 'tr'),
    getHizmetPage('musteriye-ozel-yazilim', 'en'),
    getHizmetPage('musteriye-ozel-yazilim', 'ro'),
  ]);

  return <CustomSoftwarePageClient trData={trData} enData={enData} roData={roData} />;
}

