'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/tekstil/tr.json';
import en from '../../../messages/sektorler/tekstil/en.json';
import ro from '../../../messages/sektorler/tekstil/ro.json';

const CONTENT = { tr, en, ro };

export default function TekstilPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
