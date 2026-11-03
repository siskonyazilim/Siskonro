'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/enerji-kimya/tr.json';
import en from '../../../messages/sektorler/enerji-kimya/en.json';
import ro from '../../../messages/sektorler/enerji-kimya/ro.json';

const CONTENT = { tr, en, ro };

export default function EnerjiKimyaPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
