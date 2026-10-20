import LegalPage from '../_components/LegalPage';
import trLocale from '../../../messages/yasal/kvkk/tr.json';
import enLocale from '../../../messages/yasal/kvkk/en.json';
import roLocale from '../../../messages/yasal/kvkk/ro.json';

export default function KVKKPage(props) {
  return (
    <LegalPage
      endpoint="kvkk"
      messages={{ tr: trLocale, en: enLocale, ro: roLocale }}
      searchParams={props.searchParams}
    />
  );
}
