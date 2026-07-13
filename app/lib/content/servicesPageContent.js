import { SERVICE_CATALOG, SERVICE_KEYS, getServiceName } from '../../../config/services';

export function getServicesPageContent(locale) {
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  const serviceMetaByKey = {
    [SERVICE_KEYS.customSoftware]: {
      descEn: 'Scalable and secure enterprise software ecosystems fully aligned with your processes.',
      descTr: 'Proseslerinize tam uyum sağlayan, ölçeklenebilir ve güvenli kurumsal yazılım ekosistemleri sunar.',
      descRo: 'Ecosisteme software enterprise scalabile și sigure, perfect aliniate cu procesele dvs.',
      image: '/assets/new/hizmetler/musteriye-ozel-yazilim/Müşteriye Özel Yazılım Çözümleri Banner 1-1-Zeminsiz-2.webp',
      tags: ['tSQLt Test', 'Microservices', 'ERP Integration'],
    },
    [SERVICE_KEYS.iiot]: {
      descEn: 'End-to-end IIoT pipelines that transform raw shop-floor data into business decisions in seconds.',
      descTr: 'Uçtan uca IIoT veri akışları, saha verisini ham halinden alıp saniyeler içinde iş kararlarına dönüştürür.',
      descRo: 'Fluxuri IIoT end-to-end care transformă datele brute din fabrică în decizii de afaceri în secunde.',
      image: '/assets/new/hizmetler/iiot/iiot-hizmet-gorsel-2.webp',
      tags: ['OPC UA', 'MQTT', 'Edge Computing'],
    },
    [SERVICE_KEYS.traceability]: {
      descEn: 'End-to-end product and process traceability from raw material to shipment with auditable digital records.',
      descTr: 'Hammaddeden sevkiyata kadar ürün ve süreç izlenebilirliği sağlayan, denetlenebilir bir dijital kayıt altyapısı sunar.',
      descRo: 'Trasabilitate completă produs și proces de la materia primă la expediere, cu înregistrări digitale auditabile.',
      image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/Siskon 1.3 İzlenebilirlik Çözümleri 16-9 Yatay Beyaz İllüstrasyon-Camera 2.webp',
      tags: ['GS1', 'Serial Tracking', 'Compliance'],
    },
    [SERVICE_KEYS.machineProcessAutomation]: {
      descEn: 'Maximum productivity on your production lines with Beckhoff expertise and advanced control algorithms.',
      descTr: 'Beckhoff uzmanlığı ve ileri seviye kontrol algoritmaları ile üretim hatlarınızda maksimum verim sağlar.',
      descRo: 'Productivitate maximă pe liniile de producție cu expertiză Beckhoff și algoritmi avansați de control.',
      image: '/assets/new/hizmetler/makine-proses-otomasyonu/Siskon 1.4 Makine ve Proses Otomasyonu 16-9 Dikey 3-Camera Zeminsiz 2.webp',
      tags: ['PLC/SCADA', 'TwinCAT', 'ISA-88'],
    },
    [SERVICE_KEYS.robotSolutions]: {
      descEn: 'Robotic automation cells and integration projects that increase speed, quality, and workplace safety.',
      descTr: 'Hız, kalite ve iş güvenliğini artıran robotik otomasyon hücreleri ve entegrasyon projeleri sunar.',
      descRo: 'Celule de automatizare robotică și proiecte de integrare care cresc viteza, calitatea și siguranța la locul de muncă.',
      image: '/assets/new/hizmetler/robot-cozumleri/RobotCozumleri.webp',
      tags: ['Robot Cells', 'Safety', 'Integration'],
    },
    [SERVICE_KEYS.machineVision]: {
      descEn: 'AI-based quality control, monitoring, and counting automation systems for zero-defect production.',
      descTr: 'Hatasız üretim için yapay zeka temelli kalite kontrol, izleme ve sayım otomasyon sistemleri sunar.',
      descRo: 'Sisteme de automatizare pentru control calitate, monitorizare și numărare bazate pe AI, pentru producție fără defecte.',
      image: '/assets/new/hizmetler/goruntu-isleme/GoruntuIzlemeWatch.webp',
      tags: ['Deep Learning', 'Quality Assurance', 'VGG/ResNet'],
    },
    [SERVICE_KEYS.bigDataMl]: {
      descEn: 'Advanced machine learning models delivering data-driven predictive maintenance and energy optimization.',
      descTr: 'Veri odaklı kestirimci bakım ve enerji optimizasyonu sağlayan gelişmiş makine öğrenmesi modelleri sunar.',
      descRo: 'Modele avansate de machine learning pentru mentenanță predictivă bazată pe date și optimizare energetică.',
      image: '/assets/new/hizmetler/ai-makine-ogrenmesi/AıveMakineOgrenmesi.webp',
      tags: ['Predictive Maintenance', 'Big Data', 'Anomaly Detection'],
    },
    [SERVICE_KEYS.microsoftSolutions]: {
      descEn: 'Microsoft ecosystem consulting, licensing, and platform integration from Microsoft 365 to Azure and Power Platform.',
      descTr: 'Microsoft 365, Azure ve Power Platform ekseninde danışmanlık, lisanslama ve platform entegrasyonu sunar.',
      descRo: 'Consultanță, licențiere și integrare platformă Microsoft de la Microsoft 365 la Azure și Power Platform.',
      image: '/assets/new/hizmetler/microsoft-cozumleri/ms-solutions-1-camera-2.webp',
      tags: ['Azure', 'Power Platform', 'Licensing'],
    },
    [SERVICE_KEYS.geVernovaProficy]: {
      descEn: 'Proficy-centered industrial data, performance, and operations analytics deployments for manufacturing excellence.',
      descTr: 'Proficy odaklı endüstriyel veri, performans ve operasyon analitiği kurulumları ile üretim mükemmelliği sağlar.',
      descRo: 'Implementări Proficy pentru date industriale, performanță și analiză operațională în vederea excelenței în producție.',
      image: '/assets/new/hizmetler/ge-vernova/Siskon 1.10 GE Vernova 16-9-1-Camera 1.webp',
      tags: ['Proficy', 'MES', 'Industrial Analytics'],
    },
    [SERVICE_KEYS.trainingConsulting]: {
      descEn: 'Technical training and consultancy programs that strengthen teams and sustain digital transformation outcomes.',
      descTr: 'Ekipleri güçlendiren ve dijital dönüşüm kazanımlarını kalıcı hale getiren teknik eğitim ve danışmanlık programları sunar.',
      descRo: 'Programe de formare tehnică și consultanță care întăresc echipele și susțin rezultatele transformării digitale.',
      image: '/assets/new/hizmetler/egitim-danismanlik/1.9 Eğitim ve Danışmanlık ÇözümleriKutu.webp',
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
