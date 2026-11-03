'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/beyaz-esya/tr.json';
import en from '../../../messages/sektorler/beyaz-esya/en.json';
import ro from '../../../messages/sektorler/beyaz-esya/ro.json';

const CONTENT = { tr, en, ro };

export default function BeyazEsyaPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
