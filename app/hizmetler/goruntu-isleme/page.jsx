import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import VisionPageClient from './VisionPageClient';

export const dynamic = 'force-dynamic';

export default async function VisionPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('goruntu-isleme', 'tr'),
    getHizmetPage('goruntu-isleme', 'en'),
    getHizmetPage('goruntu-isleme', 'ro'),
  ]);

  return <VisionPageClient trData={trData} enData={enData} roData={roData} />;
}

