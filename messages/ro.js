// RO mesajlari — tek dil paketi (LanguageContext aktif dili dinamik import eder)

import commonRo from './common/ro.json';
import navRo from './nav/ro.json';
import servicesRo from './services/ro.json';
import corporateRo from './corporate/ro.json';
import homeRo from './home/ro.json';
import servicesPageRo from './servicesPage/ro.json';
import productsPageRo from './productsPage/ro.json';
import aboutPageRo from './aboutPage/ro.json';
import contactPageRo from './contactPage/ro.json';
import referencesPageRo from './referencesPage/ro.json';
import sectorsPageRo from './sectorsPage/ro.json';
import rdPageRo from './rdPage/ro.json';
import partnershipsPageRo from './partnershipsPage/ro.json';
import onSuitePageRo from './onSuitePage/ro.json';
import footerRo from './components/footer/ro.json';
import headerRo from './components/header/ro.json';
import megaMenuRo from './components/megaMenu/ro.json';
import iiotRo from './hizmetler/iiot/ro.json';
import customSoftwareRo from './hizmetler/musteriye-ozel-yazilim/ro.json';
import visionRo from './hizmetler/goruntu-isleme/ro.json';
import traceabilityRo from './hizmetler/izlenebilirlik-cozumleri/ro.json';
import automationRo from './hizmetler/makine-proses-otomasyonu/ro.json';
import microsoftRo from './hizmetler/microsoft-cozumleri/ro.json';
import veloticRo from './hizmetler/velotic/ro.json';
import trainingRo from './hizmetler/egitim-danismanlik/ro.json';
import sectorRo from './sektorler/ro.json';

const roMessages = {
  common: commonRo,
  nav: navRo,
  services: servicesRo,
  corporate: corporateRo,
  home: homeRo,
  servicesPage: servicesPageRo,
  productsPage: productsPageRo,
  aboutPage: aboutPageRo,
  contactPage: contactPageRo,
  referencesPage: referencesPageRo,
  sectorsPage: sectorsPageRo,
  rdPage: rdPageRo,
  partnershipsPage: partnershipsPageRo,
  onSuitePage: onSuitePageRo,
  footer: footerRo,
  header: headerRo,
  megaMenu: megaMenuRo,
  iiotPage: iiotRo,
  customSoftwarePage: customSoftwareRo,
  visionPage: visionRo,
  traceabilityPage: traceabilityRo,
  automationPage: automationRo,
  microsoftPage: microsoftRo,
  veloticPage: veloticRo,
  trainingPage: trainingRo,
  ...sectorRo
};

export default roMessages;
