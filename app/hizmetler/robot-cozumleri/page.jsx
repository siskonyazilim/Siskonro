import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import RobotSolutionsClient from './RobotSolutionsClient';

export const dynamic = 'force-dynamic';

export default async function RobotSolutionsPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('robot-cozumleri', 'tr'),
    getHizmetPage('robot-cozumleri', 'en'),
    getHizmetPage('robot-cozumleri', 'ro'),
  ]);

  return <RobotSolutionsClient trData={trData} enData={enData} roData={roData} />;
}

