'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/makine-otomasyon/tr.json';
import en from '../../../messages/sektorler/makine-otomasyon/en.json';
import ro from '../../../messages/sektorler/makine-otomasyon/ro.json';

const CONTENT = { tr, en, ro };

export default function MakineOtomasyonPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
