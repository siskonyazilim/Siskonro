import LegalPage from '../_components/LegalPage';
import trLocale from '../../../messages/yasal/cerez-politikasi/tr.json';
import enLocale from '../../../messages/yasal/cerez-politikasi/en.json';
import roLocale from '../../../messages/yasal/cerez-politikasi/ro.json';

export default function CookiePolicyPage(props) {
  return (
    <LegalPage
      endpoint="cookie-page"
      messages={{ tr: trLocale, en: enLocale, ro: roLocale }}
      searchParams={props.searchParams}
    />
  );
}
