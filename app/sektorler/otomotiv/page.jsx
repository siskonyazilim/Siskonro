'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/otomotiv/tr.json';
import en from '../../../messages/sektorler/otomotiv/en.json';
import ro from '../../../messages/sektorler/otomotiv/ro.json';

const CONTENT = { tr, en, ro };

export default function OtomotivPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
