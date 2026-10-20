import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import VeloticPageClient from './VeloticPageClient';

export const dynamic = 'force-dynamic';

export default async function VeloticPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('velotic', 'tr'),
    getHizmetPage('velotic', 'en'),
    getHizmetPage('velotic', 'ro'),
  ]);

  return <VeloticPageClient trData={trData} enData={enData} roData={roData} />;
}
