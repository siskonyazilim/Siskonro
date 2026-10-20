import { SERVICE_CATALOG, SERVICE_KEYS, getServiceName } from '../../../config/services';

export function getServicesPageContent(locale) {
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  const serviceMetaByKey = {
    [SERVICE_KEYS.customSoftware]: {
      descEn: 'Solutions that include the most suitable software and hardware products designed to complement each other according to your needs.',
      descTr: 'İhtiyaca en uygun, birbirini tamamlayan yazılım ve donanım ürünlerini içeren çözüm seçenekleri.',
      descRo: 'Opțiuni de soluții care includ cele mai potrivite produse software și hardware, concepute pentru a funcționa împreună.',
      image: '/assets/new/hizmetler/musteriye-ozel-yazilim/musteriye-ozel-yazilim-cozumleri-banner-1-1-zeminsiz-2.webp',
      tags: ['tSQLt Test', 'Microservices', 'ERP Integration'],
    },
    [SERVICE_KEYS.iiot]: {
      descEn: 'The smart way to manage industrial data and business processes in the era of digital transformation.',
      descTr: 'Dijital dönüşüm çağında endüstriyel verileri ve iş süreçlerini akıllıca yönetmenin yolu.',
      descRo: 'Modalitatea inteligentă de a gestiona datele industriale și procesele de afaceri în era transformării digitale.',
      image: '/assets/new/hizmetler/iiot/iiot-hizmet-gorsel-2.webp',
      tags: ['OPC UA', 'MQTT', 'Edge Computing'],
    },
    [SERVICE_KEYS.traceability]: {
      descEn: 'Monitor your processes, ensure quality, and gain a competitive advantage.',
      descTr: 'Süreçlerinizi izleyin, kaliteyi güvence altına alarak rekabette fark yaratın.',
      descRo: 'Monitorizați procesele, asigurați calitatea și diferențiați-vă în competiție.',
      image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/siskon-1-3-izlenebilirlik-cozumleri-16-9-yatay-beyaz-illustrasyon-camera-2.webp',
      tags: ['GS1', 'Serial Tracking', 'Compliance'],
    },
    [SERVICE_KEYS.machineProcessAutomation]: {
      descEn: 'Shape the future of manufacturing with our automation solutions.',
      descTr: 'Otomasyon çözümlerimiz ile üretimin geleceğini şekillendirin.',
      descRo: 'Modelați viitorul producției cu soluțiile noastre de automatizare.',
      image: '/assets/new/hizmetler/makine-proses-otomasyonu/siskon-1-4-makine-ve-proses-otomasyonu-16-9-dikey-3-camera-zeminsiz-2.webp',
      tags: ['PLC/SCADA', 'TwinCAT', 'ISA-88'],
    },
    [SERVICE_KEYS.robotSolutions]: {
      descEn: 'Empower your operations with collaborative robots, combining speed and safety.',
      descTr: 'Kolaboratif robotlarla operasyonlarınızı güçlendirin, hız ve güvenliği bir arada yaşayın!',
      descRo: 'Îmbunătățiți operațiunile cu roboți colaborativi, beneficiind de viteză și siguranță în același timp.',
      image: '/assets/new/hizmetler/robot-cozumleri/RobotCozumleri.webp',
      tags: ['Robot Cells', 'Safety', 'Integration'],
    },
    [SERVICE_KEYS.machineVision]: {
      descEn: 'Achieve excellence in production through advanced machine vision technologies.',
      descTr: 'Görüntü işleme teknolojileriyle üretimde kusursuzluğu yakalayın!',
      descRo: 'Obțineți excelență în producție prin tehnologii avansate de procesare și analiză a imaginilor.',
      image: '/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp',
      tags: ['Deep Learning', 'Quality Assurance', 'VGG/ResNet'],
    },
    [SERVICE_KEYS.bigDataMl]: {
      descEn: 'Transform your data into powerful business decisions.',
      descTr: 'Verilerinizi Güçlü Kararlara Dönüştürün!',
      descRo: 'Transformați datele în decizii puternice și inteligente.',
      image: '/assets/new/hizmetler/ai-makine-ogrenmesi/aivemakineogrenmesi.webp',
      tags: ['Predictive Maintenance', 'Big Data', 'Anomaly Detection'],
    },
    [SERVICE_KEYS.microsoftSolutions]: {
      descEn: 'Accelerate your digital transformation and develop innovative strategies.',
      descTr: 'Dijital dönüşümünüzü hızlandırın ve yenilikçi stratejiler geliştirin!',
      descRo: 'Accelerați transformarea digitală și dezvoltați strategii inovatoare.',
      image: '/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-1-camera-2.webp',
      tags: ['Azure', 'Power Platform', 'Licensing'],
    },
    [SERVICE_KEYS.velotic]: {
      descEn: 'Velotic-centered industrial data, performance, and operations analytics deployments for manufacturing excellence.',
      descTr: 'Velotic odaklı endüstriyel veri, performans ve operasyon analitiği kurulumları ile üretim mükemmelliği sağlar.',
      descRo: 'Implementări Velotic pentru date industriale, performanță și analiză operațională în vederea excelenței în producție.',
      image: '/assets/new/hizmetler/velotic/SiskonVelotic.webp',
      imageFit: 'cover',
      tags: ['Velotic', 'MES', 'Industrial Analytics'],
    },
    [SERVICE_KEYS.trainingConsulting]: {
      descEn: 'Technical training and consultancy programs that strengthen teams and sustain digital transformation outcomes.',
      descTr: 'Ekipleri güçlendiren ve dijital dönüşüm kazanımlarını kalıcı hale getiren teknik eğitim ve danışmanlık programları sunar.',
      descRo: 'Programe de formare tehnică și consultanță care întăresc echipele și susțin rezultatele transformării digitale.',
      image: '/assets/new/hizmetler/egitim-danismanlik/1-9-egitim-ve-danismanlik-cozumlerikutu.webp',
      imageFit: 'cover',
      mobileNarrow: true,
      tags: ['Training', 'Consulting', 'Capability Building'],
    },
  };

  const getDesc = (meta) => {
    if (isRo) return meta.descRo ?? meta.descEn;
    if (isEn) return meta.descEn;
    return meta.descTr;
  };

  const serviceLocale = isEn ? 'en' : isRo ? 'ro' : 'tr';

  const services = SERVICE_CATALOG.map((service, index) => {
    const meta = serviceMetaByKey[service.key] ?? {
      descEn: 'Engineering-focused industrial software and automation services tailored to your operations.',
      descTr: 'Operasyonlarınıza uyarlanmış, mühendislik odaklı endüstriyel yazılım ve otomasyon hizmetleri sunar.',
      descRo: 'Servicii software industriale și automatizare axate pe inginerie, adaptate operațiunilor dvs.',
      image: '/assets/new/hizmetler/musteriye-ozel-yazilim/musteriye-ozel-yazilim-banner-16-9-zeminsiz.webp',
      tags: ['Engineering', 'Automation', 'Software'],
    };

    return {
      num: String(index + 1).padStart(2, '0'),
      title: getServiceName(service.key, serviceLocale),
      desc: getDesc(meta),
      href: service.href,
      image: meta.image,
      imageFit: meta.imageFit || 'contain',
      imageAlign: meta.imageAlign || 'center',
      mobileNarrow: Boolean(meta.mobileNarrow),
      tags: meta.tags,
    };
  });

  const whySiskonItems = [
    {
      t: isRo ? 'Inginerie Independentă' : isEn ? 'Independent Engineering' : 'Bağımsız Mühendislik',
      d: isRo ? 'Selecție tehnologică neutră față de furnizori, bazată pe nevoile dvs. reale.' : isEn ? 'Vendor-neutral technology selection based on your actual needs.' : 'Marka bağımsız, ihtiyaca en uygun teknoloji seçimi.'
    },
    {
      t: isRo ? 'Experiență din Teren' : isEn ? 'Shopfloor Experience' : 'Saha Tecrübesi',
      d: isRo ? 'Soluții validate pe mașini reale în fabrici reale.' : isEn ? 'Solutions validated on real machines in real factories.' : 'Gerçek fabrikalarda, gerçek makineler üzerinde test edilmiş çözümler.'
    },
    {
      t: isRo ? 'Integrare End-to-End' : isEn ? 'End-to-End Integration' : 'Uçtan Uca Entegrasyon',
      d: isRo ? 'Flux de date neîntrerupt de la senzor la cloud (Edge-to-Cloud).' : isEn ? 'Uninterrupted data flow from sensor to cloud (Edge-to-Cloud).' : 'Sensörden buluta (Edge-to-Cloud) kesintisiz veri akışı.'
    }
  ];

  const methodologySteps = [
    {
      t: isRo ? 'Analiză și Descoperire' : isEn ? 'Analysis & Discovery' : 'Analiz & Keşif',
      d: isRo ? 'Identificăm realitățile din teren și blocajele cu date.' : isEn ? 'We identify shop-floor realities and bottlenecks with data.' : 'Saha gerçeklerini ve darboğazları verilerle tespit ediyoruz.'
    },
    {
      t: isRo ? 'Design Arhitectural' : isEn ? 'Architecture Design' : 'Mimari Tasarım',
      d: isRo ? 'Proiectăm o arhitectură de sistem flexibilă, modulară și scalabilă.' : isEn ? 'We design a flexible, modular, and scalable system architecture.' : 'Esnek, modüler ve ölçeklenebilir bir sistem kurguluyoruz.'
    },
    {
      t: isRo ? 'Dezvoltare Agilă' : isEn ? 'Agile Development' : 'Çevik Geliştirme',
      d: isRo ? 'Un proces de livrare bazat pe sprint-uri, transparent și continuu testat.' : isEn ? 'A sprint-based, transparent, and continuously tested delivery process.' : 'Sprint odaklı, şeffaf ve sürekli test edilen bir üretim süreci.'
    },
    {
      t: isRo ? 'Suport Continuu' : isEn ? 'Continuous Support' : 'Sürekli Destek',
      d: isRo ? 'Rămânem alături de dvs. pentru a menține eficiența pe durata ciclului de viață a sistemelor.' : isEn ? 'We stay with you to maintain lifecycle efficiency across your systems.' : 'Sistemlerinizin yaşam boyu verimliliği için yanınızdayız.'
    }
  ];

  return { services, whySiskonItems, methodologySteps };
}
