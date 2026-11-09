// Geriye donuk uyumluluk: TUM dilleri statik import eder. Client bundle'inda KULLANMAYIN;
// client tarafi ./tr, ./en, ./ro dosyalarini dinamik import eder (bkz. app/_context/LanguageContext.jsx).
import trMessages from './tr';
import enMessages from './en';
import roMessages from './ro';

export { trMessages, enMessages, roMessages };

export default { tr: trMessages, en: enMessages, ro: roMessages };
