'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/gida-icecek/tr.json';
import en from '../../../messages/sektorler/gida-icecek/en.json';
import ro from '../../../messages/sektorler/gida-icecek/ro.json';

const CONTENT = { tr, en, ro };

export default function GidaIcecekPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
