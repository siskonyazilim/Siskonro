import { getHizmetPage } from '../../../lib/strapi/services/hizmetler';
import AutomationPageClient from './AutomationPageClient';

export const dynamic = 'force-dynamic';

export default async function MachineAutomationPage() {
  const [trData, enData, roData] = await Promise.all([
    getHizmetPage('makine-proses-otomasyonu', 'tr'),
    getHizmetPage('makine-proses-otomasyonu', 'en'),
    getHizmetPage('makine-proses-otomasyonu', 'ro'),
  ]);

  return <AutomationPageClient trData={trData} enData={enData} roData={roData} />;
}

