import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import MicrosoftPageClient from './MicrosoftPageClient';

export const dynamic = 'force-dynamic';

export default async function MicrosoftSolutionsPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('microsoft-cozumleri', 'tr'),
    getHizmetPage('microsoft-cozumleri', 'en'),
    getHizmetPage('microsoft-cozumleri', 'ro'),
  ]);

  return <MicrosoftPageClient trData={trData} enData={enData} roData={roData} />;
}

