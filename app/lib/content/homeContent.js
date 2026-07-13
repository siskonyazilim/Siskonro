import { SERVICE_KEYS, getServiceName } from '../../../config/services';

export function getHomeContent(locale) {
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceLocale = isEn ? 'en' : isRo ? 'ro' : 'tr';

  const services = isRo
    ? [
        { num: '01', title: getServiceName(SERVICE_KEYS.customSoftware, serviceLocale), desc: 'Opțiuni de soluții adaptate cerințelor, care combină produse software și hardware.', img: '/assets/new/hizmetler/musteriye-ozel-yazilim/Müşteriye Özel Yazılım Çözümleri Banner 1-1-Zeminsiz-2.webp', href: '/hizmetler/musteriye-ozel-yazilim' },
        { num: '02', title: getServiceName(SERVICE_KEYS.iiot, serviceLocale), desc: 'Transformă datele de la nivelul fabricii în informații acționabile cu o arhitectură sigură și scalabilă.', img: '/assets/new/hizmetler/iiot/iiot-hizmet-gorsel-2.webp', href: '/hizmetler/iiot' },
        { num: '03', title: getServiceName(SERVICE_KEYS.machineProcessAutomation, serviceLocale), desc: 'Automatizează liniile de producție într-un mod stabil, repetabil și eficient.', img: '/assets/new/hizmetler/makine-proses-otomasyonu/Siskon 1.4 Makine ve Proses Otomasyonu 16-9 Dikey 3-Camera Zeminsiz 2.webp', href: '/hizmetler/makine-proses-otomasyonu' },
        { num: '04', title: getServiceName(SERVICE_KEYS.machineVision, serviceLocale), desc: 'Sisteme de camere bazate pe IA pentru inspecția calității, automatizarea numărării și monitorizării.', img: '/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp', href: '/hizmetler/goruntu-isleme' },
        { num: '05', title: getServiceName(SERVICE_KEYS.bigDataMl, serviceLocale), desc: 'Fundamente de analiză, IA și machine learning care sprijină deciziile bazate pe date.', img: '/assets/new/hizmetler/ai-makine-ogrenmesi/AıveMakineOgrenmesi.webp', href: '/hizmetler/ai-makine-ogrenmesi' },
      ]
    : isEn
    ? [
        { num: '01', title: getServiceName(SERVICE_KEYS.customSoftware, serviceLocale), desc: 'Requirement-aligned solution options combining software and hardware products.', img: '/assets/new/hizmetler/musteriye-ozel-yazilim/Müşteriye Özel Yazılım Çözümleri Banner 1-1-Zeminsiz-2.webp', href: '/hizmetler/musteriye-ozel-yazilim' },
        { num: '02', title: getServiceName(SERVICE_KEYS.iiot, serviceLocale), desc: 'Transforms shop-floor data into actionable insight with a secure, scalable architecture.', img: '/assets/new/hizmetler/iiot/iiot-hizmet-gorsel-2.webp', href: '/hizmetler/iiot' },
        { num: '03', title: getServiceName(SERVICE_KEYS.machineProcessAutomation, serviceLocale), desc: 'Automates production lines in a stable, repeatable and efficient manner.', img: '/assets/new/hizmetler/makine-proses-otomasyonu/Siskon 1.4 Makine ve Proses Otomasyonu 16-9 Dikey 3-Camera Zeminsiz 2.webp', href: '/hizmetler/makine-proses-otomasyonu' },
        { num: '04', title: getServiceName(SERVICE_KEYS.machineVision, serviceLocale), desc: 'AI-powered camera systems for quality inspection, counting and monitoring automation.', img: '/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp', href: '/hizmetler/goruntu-isleme' },
        { num: '05', title: getServiceName(SERVICE_KEYS.bigDataMl, serviceLocale), desc: 'Analytics, AI and machine learning foundations that support data-driven decisions.', img: '/assets/new/hizmetler/ai-makine-ogrenmesi/AıveMakineOgrenmesi.webp', href: '/hizmetler/ai-makine-ogrenmesi' },
      ]
    : [
        { num: '01', title: getServiceName(SERVICE_KEYS.customSoftware, serviceLocale), desc: 'İhtiyaca en uygun, birbirini tamamlayan yazılım ve donanım ürünlerini içeren çözüm seçenekleri sunar.', img: '/assets/new/hizmetler/musteriye-ozel-yazilim/Müşteriye Özel Yazılım Çözümleri Banner 1-1-Zeminsiz-2.webp', href: '/hizmetler/musteriye-ozel-yazilim' },
        { num: '02', title: getServiceName(SERVICE_KEYS.iiot, serviceLocale), desc: 'Sahadaki veriyi güvenli, ölçeklenebilir bir altyapıyla anlamlı bilgiye ve karara dönüştürür.', img: '/assets/new/hizmetler/iiot/iiot-hizmet-gorsel-2.webp', href: '/hizmetler/iiot' },
        { num: '03', title: getServiceName(SERVICE_KEYS.machineProcessAutomation, serviceLocale), desc: 'Üretim hatlarınızı kararlı, tekrarlanabilir ve verimli bir biçimde otomatikleştirir.', img: '/assets/new/hizmetler/makine-proses-otomasyonu/Siskon 1.4 Makine ve Proses Otomasyonu 16-9 Dikey 3-Camera Zeminsiz 2.webp', href: '/hizmetler/makine-proses-otomasyonu' },
        { num: '04', title: getServiceName(SERVICE_KEYS.machineVision, serviceLocale), desc: 'Yapay zeka destekli kamera sistemleriyle kalite denetimi, sayım ve izleme otomasyonu sağlar.', img: '/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp', href: '/hizmetler/goruntu-isleme' },
        { num: '05', title: getServiceName(SERVICE_KEYS.bigDataMl, serviceLocale), desc: 'Veri odaklı kararlar almanızı sağlayan analitik, AI ve makine öğrenmesi altyapıları sunar.', img: '/assets/new/hizmetler/ai-makine-ogrenmesi/AıveMakineOgrenmesi.webp', href: '/hizmetler/ai-makine-ogrenmesi' },
      ];

  const products = isRo
    ? [
        {
          badge: 'PLATFORMĂ INTELIGENTĂ DE PRODUCȚIE',
          title: 'OnSuite - Platformă Inteligentă de Producție',
          desc: 'O platformă de ultimă generație care reunește 11 module sub același acoperiș: OnSuite Connect, OnSuite Live, Optima / OEE, Trace, Forms / DSF, Energy, Green / Carboniq, Integra, CNC, TMC și Core.',
          img: '/assets/new/urunler/onsuite/OnsuiteNew.webp',
          href: '/urunler/onsuite',
          metrics: [
            { label: 'Fabrici', value: '59+' },
            { label: 'Module', value: '11' },
            { label: 'Protocoale', value: '20+' },
          ],
        },
      ]
    : isEn
    ? [
        {
          badge: 'SMART MANUFACTURING PLATFORM',
          title: 'OnSuite - Smart Manufacturing Platform',
          desc: 'A next-generation platform bringing 11 modules under one roof: OnSuite Connect, OnSuite Live, Optima / OEE, Trace, Forms / DSF, Energy, Green / Carboniq, Integra, CNC, TMC and Core.',
          img: '/assets/new/urunler/onsuite/OnsuiteNew.webp',
          href: '/urunler/onsuite',
          metrics: [
            { label: 'Factories', value: '59+' },
            { label: 'Modules', value: '11' },
            { label: 'Protocols', value: '20+' },
          ],
        },
      ]
    : [
        {
          badge: 'AKILLI ÜRETİM PLATFORMU',
          title: 'OnSuite - Akıllı Üretim Platformu',
          desc: 'OnSuite Connect, OnSuite Live, Optima / OEE, Trace, Forms / DSF, Energy, Green / Carboniq, Integra, CNC, TMC ve Core modüllerini tek çatı altında toplayan yeni nesil akıllı üretim platformudur.',
          img: '/assets/new/urunler/onsuite/OnsuiteNew.webp',
          href: '/urunler/onsuite',
          metrics: [
            { label: 'Fabrika', value: '59+' },
            { label: 'Modül', value: '11' },
            { label: 'Protokol', value: '20+' },
          ],
        },
      ];

  const references = [
    { name: 'BORGWARNER', logo: '/assets/Logos/borgwarner-seeklogo.svg' },
    { name: 'BOSCH', logo: '/assets/Logos/Bosch-logo.svg' },
    { name: 'BSH', logo: '/assets/Logos/BSH_Bosch_und_Siemens_Hausgerate_logo.svg' },
    { name: 'HAIER EUROPE', logo: '/assets/Logos/Haier_logo.svg' },
    { name: 'JTI', logo: '/assets/Logos/JTI_Logo.svg' },
    { name: 'MAXION', logo: '/assets/Logos/maxion_inci.svg' },
    { name: 'MEY · DIAGEO', logo: '/assets/Logos/mey-diageo.svg' },
    { name: 'PMI', logo: '/assets/Logos/philip_morris_sa.svg' },
    { name: 'UNILEVER', logo: '/assets/Logos/Unilever.svg' },
  ];

  const stats = isRo
    ? [
        { num: '1997', label: 'Fondat' },
        { num: '44', label: 'Țări' },
        { num: '500+', label: 'Proiecte' },
        { num: '59+', label: 'Fabrici Inteligente' },
      ]
    : isEn
    ? [
        { num: '1997', label: 'Founded' },
        { num: '44', label: 'Countries' },
        { num: '500+', label: 'Projects' },
        { num: '59+', label: 'Smart Factories' },
      ]
    : [
        { num: '1997', label: 'Kuruluş' },
        { num: '44', label: 'Aktif Ülke' },
        { num: '500+', label: 'Tamamlanan Proje' },
        { num: '59+', label: 'Akıllı Fabrika' },
      ];

  return { services, products, references, stats };
}

