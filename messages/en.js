// EN mesajlari — tek dil paketi (LanguageContext aktif dili dinamik import eder)

import commonEn from './common/en.json';
import navEn from './nav/en.json';
import servicesEn from './services/en.json';
import corporateEn from './corporate/en.json';
import homeEn from './home/en.json';
import servicesPageEn from './servicesPage/en.json';
import productsPageEn from './productsPage/en.json';
import aboutPageEn from './aboutPage/en.json';
import contactPageEn from './contactPage/en.json';
import referencesPageEn from './referencesPage/en.json';
import sectorsPageEn from './sectorsPage/en.json';
import rdPageEn from './rdPage/en.json';
import partnershipsPageEn from './partnershipsPage/en.json';
import onSuitePageEn from './onSuitePage/en.json';
import footerEn from './components/footer/en.json';
import headerEn from './components/header/en.json';
import megaMenuEn from './components/megaMenu/en.json';
import iiotEn from './hizmetler/iiot/en.json';
import customSoftwareEn from './hizmetler/musteriye-ozel-yazilim/en.json';
import visionEn from './hizmetler/goruntu-isleme/en.json';
import traceabilityEn from './hizmetler/izlenebilirlik-cozumleri/en.json';
import automationEn from './hizmetler/makine-proses-otomasyonu/en.json';
import microsoftEn from './hizmetler/microsoft-cozumleri/en.json';
import veloticEn from './hizmetler/velotic/en.json';
import trainingEn from './hizmetler/egitim-danismanlik/en.json';
import sectorEn from './sektorler/en.json';

const enMessages = {
  common: commonEn,
  nav: navEn,
  services: servicesEn,
  corporate: corporateEn,
  home: homeEn,
  servicesPage: servicesPageEn,
  productsPage: productsPageEn,
  aboutPage: aboutPageEn,
  contactPage: contactPageEn,
  referencesPage: referencesPageEn,
  sectorsPage: sectorsPageEn,
  rdPage: rdPageEn,
  partnershipsPage: partnershipsPageEn,
  onSuitePage: onSuitePageEn,
  footer: footerEn,
  header: headerEn,
  megaMenu: megaMenuEn,
  iiotPage: iiotEn,
  customSoftwarePage: customSoftwareEn,
  visionPage: visionEn,
  traceabilityPage: traceabilityEn,
  automationPage: automationEn,
  microsoftPage: microsoftEn,
  veloticPage: veloticEn,
  trainingPage: trainingEn,
  ...sectorEn
};

export default enMessages;
