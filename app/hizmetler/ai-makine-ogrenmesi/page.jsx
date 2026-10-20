import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import AIPageClient from './AIPageClient';

export const dynamic = 'force-dynamic';

export default async function AIPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('ai-makine-ogrenmesi', 'tr'),
    getHizmetPage('ai-makine-ogrenmesi', 'en'),
    getHizmetPage('ai-makine-ogrenmesi', 'ro'),
  ]);

  return <AIPageClient trData={trData} enData={enData} roData={roData} />;
}

