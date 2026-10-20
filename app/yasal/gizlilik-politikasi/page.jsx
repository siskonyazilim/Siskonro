import LegalPage from '../_components/LegalPage';
import trLocale from '../../../messages/yasal/gizlilik-politikasi/tr.json';
import enLocale from '../../../messages/yasal/gizlilik-politikasi/en.json';
import roLocale from '../../../messages/yasal/gizlilik-politikasi/ro.json';

export default function PrivacyPolicyPage(props) {
  return (
    <LegalPage
      endpoint="privacy-page"
      messages={{ tr: trLocale, en: enLocale, ro: roLocale }}
      searchParams={props.searchParams}
    />
  );
}
