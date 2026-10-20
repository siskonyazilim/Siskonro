import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import TraceabilityPageClient from './TraceabilityPageClient';

export const dynamic = 'force-dynamic';

export default async function TraceabilityPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('izlenebilirlik-cozumleri', 'tr'),
    getHizmetPage('izlenebilirlik-cozumleri', 'en'),
    getHizmetPage('izlenebilirlik-cozumleri', 'ro'),
  ]);

  return <TraceabilityPageClient trData={trData} enData={enData} roData={roData} />;
}

