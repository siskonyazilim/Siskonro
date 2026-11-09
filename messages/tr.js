// TR mesajlari — tek dil paketi (LanguageContext aktif dili dinamik import eder)

import commonTr from './common/tr.json';
import navTr from './nav/tr.json';
import servicesTr from './services/tr.json';
import corporateTr from './corporate/tr.json';
import homeTr from './home/tr.json';
import servicesPageTr from './servicesPage/tr.json';
import productsPageTr from './productsPage/tr.json';
import aboutPageTr from './aboutPage/tr.json';
import contactPageTr from './contactPage/tr.json';
import referencesPageTr from './referencesPage/tr.json';
import sectorsPageTr from './sectorsPage/tr.json';
import rdPageTr from './rdPage/tr.json';
import partnershipsPageTr from './partnershipsPage/tr.json';
import onSuitePageTr from './onSuitePage/tr.json';
import footerTr from './components/footer/tr.json';
import headerTr from './components/header/tr.json';
import megaMenuTr from './components/megaMenu/tr.json';
import iiotTr from './hizmetler/iiot/tr.json';
import customSoftwareTr from './hizmetler/musteriye-ozel-yazilim/tr.json';
import visionTr from './hizmetler/goruntu-isleme/tr.json';
import traceabilityTr from './hizmetler/izlenebilirlik-cozumleri/tr.json';
import automationTr from './hizmetler/makine-proses-otomasyonu/tr.json';
import microsoftTr from './hizmetler/microsoft-cozumleri/tr.json';
import veloticTr from './hizmetler/velotic/tr.json';
import trainingTr from './hizmetler/egitim-danismanlik/tr.json';
import sectorTr from './sektorler/tr.json';

const trMessages = {
  common: commonTr,
  nav: navTr,
  services: servicesTr,
  corporate: corporateTr,
  home: homeTr,
  servicesPage: servicesPageTr,
  productsPage: productsPageTr,
  aboutPage: aboutPageTr,
  contactPage: contactPageTr,
  referencesPage: referencesPageTr,
  sectorsPage: sectorsPageTr,
  rdPage: rdPageTr,
  partnershipsPage: partnershipsPageTr,
  onSuitePage: onSuitePageTr,
  footer: footerTr,
  header: headerTr,
  megaMenu: megaMenuTr,
  iiotPage: iiotTr,
  customSoftwarePage: customSoftwareTr,
  visionPage: visionTr,
  traceabilityPage: traceabilityTr,
  automationPage: automationTr,
  microsoftPage: microsoftTr,
  veloticPage: veloticTr,
  trainingPage: trainingTr,
  ...sectorTr
};

export default trMessages;
