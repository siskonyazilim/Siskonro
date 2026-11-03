'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';
import tr from '../../../messages/sektorler/tutun/tr.json';
import en from '../../../messages/sektorler/tutun/en.json';
import ro from '../../../messages/sektorler/tutun/ro.json';

const CONTENT = { tr, en, ro };

export default function TutunPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
