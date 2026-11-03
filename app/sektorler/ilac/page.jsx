'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/ilac/tr.json';
import en from '../../../messages/sektorler/ilac/en.json';
import ro from '../../../messages/sektorler/ilac/ro.json';

const CONTENT = { tr, en, ro };

export default function IlacPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
