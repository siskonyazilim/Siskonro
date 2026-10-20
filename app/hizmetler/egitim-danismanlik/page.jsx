import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import TrainingPageClient from './TrainingPageClient';

export const dynamic = 'force-dynamic';

export default async function TrainingPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('egitim-danismanlik', 'tr'),
    getHizmetPage('egitim-danismanlik', 'en'),
    getHizmetPage('egitim-danismanlik', 'ro'),
  ]);

  return <TrainingPageClient trData={trData} enData={enData} roData={roData} />;
}
