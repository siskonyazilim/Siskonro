export const SERVICE_KEYS = {
  customSoftware: 'customSoftware',
  iiot: 'iiot',
  traceability: 'traceability',
  machineProcessAutomation: 'machineProcessAutomation',
  robotSolutions: 'robotSolutions',
  machineVision: 'machineVision',
  bigDataMl: 'bigDataMl',
  microsoftSolutions: 'microsoftSolutions',
  geVernovaProficy: 'geVernovaProficy',
  trainingConsulting: 'trainingConsulting',
} as const;

export type ServiceKey = (typeof SERVICE_KEYS)[keyof typeof SERVICE_KEYS];
export type ServiceLocale = 'tr' | 'en' | 'ro';

type ServiceEntry = {
  key: ServiceKey;
  href: string;
  names: {
    tr: string;
    en: string;
    ro: string;
  };
};

export const SERVICE_CATALOG: ServiceEntry[] = [
  {
    key: SERVICE_KEYS.customSoftware,
    href: '/hizmetler/musteriye-ozel-yazilim',
    names: {
      tr: 'Müşteriye Özel Yazılım Çözümleri',
      en: 'Custom Software Solutions',
      ro: 'Soluții Software Personalizate',
    },
  },
  {
    key: SERVICE_KEYS.iiot,
    href: '/hizmetler/iiot',
    names: {
      tr: 'IIoT Çözümleri',
      en: 'IIoT Solutions',
      ro: 'Soluții IIoT',
    },
  },
  {
    key: SERVICE_KEYS.traceability,
    href: '/hizmetler/izlenebilirlik-cozumleri',
    names: {
      tr: 'İzlenebilirlik Çözümleri',
      en: 'Traceability Solutions',
      ro: 'Soluții de Trasabilitate',
    },
  },
  {
    key: SERVICE_KEYS.machineProcessAutomation,
    href: '/hizmetler/makine-proses-otomasyonu',
    names: {
      tr: 'Makine ve Proses Otomasyonu',
      en: 'Machine and Process Automation',
      ro: 'Automatizare Mașini și Procese',
    },
  },
  {
    key: SERVICE_KEYS.robotSolutions,
    href: '/hizmetler/robot-cozumleri',
    names: {
      tr: 'Robot Çözümleri',
      en: 'Robotic Solutions',
      ro: 'Soluții Robotice',
    },
  },
  {
    key: SERVICE_KEYS.machineVision,
    href: '/hizmetler/goruntu-isleme',
    names: {
      tr: 'Görüntü İşleme',
      en: 'Machine Vision',
      ro: 'Procesare Imagine',
    },
  },
  {
    key: SERVICE_KEYS.bigDataMl,
    href: '/hizmetler/ai-makine-ogrenmesi',
    names: {
      tr: 'AI ve Makine Öğrenmesi',
      en: 'AI and Machine Learning',
      ro: 'AI și Învățare Automată',
    },
  },
  {
    key: SERVICE_KEYS.microsoftSolutions,
    href: '/hizmetler/microsoft-cozumleri',
    names: {
      tr: 'Microsoft Çözümleri',
      en: 'Microsoft Solutions',
      ro: 'Soluții Microsoft',
    },
  },
  {
    key: SERVICE_KEYS.geVernovaProficy,
    href: '/hizmetler/ge-vernova',
    names: {
      tr: 'GE Vernova (Proficy)',
      en: 'GE Vernova (Proficy)',
      ro: 'GE Vernova (Proficy)',
    },
  },
  {
    key: SERVICE_KEYS.trainingConsulting,
    href: '/hizmetler/egitim-danismanlik',
    names: {
      tr: 'Eğitim ve Danışmanlık',
      en: 'Training and Consulting',
      ro: 'Formare și Consultanță',
    },
  },
];

export function getServiceByKey(key: ServiceKey) {
  return SERVICE_CATALOG.find((service) => service.key === key);
}

export function getServiceName(key: ServiceKey, locale: ServiceLocale = 'tr') {
  return getServiceByKey(key)?.names[locale] ?? '';
}