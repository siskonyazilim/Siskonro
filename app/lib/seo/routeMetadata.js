import { detectLocale, toInternalPath, toLocalizedPath } from '../i18n/routes';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const IS_DEV = process.env.NODE_ENV !== 'production';
// Canlı alan adı henüz belirlenmedi: güvenilir hostlar SITE_TRUSTED_HOSTS (virgülle ayrılmış) ile verilir.
// Tanımlı değilse üretimde canonical/OG/JSON-LD NEXT_PUBLIC_SITE_URL'den üretilir.
const TRUSTED_HOSTS = (process.env.SITE_TRUSTED_HOSTS || '')
  .split(',')
  .map((host) => host.trim().toLowerCase())
  .filter(Boolean);
const TRUSTED_HOST = {
  test: (host) => TRUSTED_HOSTS.includes(String(host).toLowerCase()),
};

export function getSiteUrlFromHeaders(headerStore) {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit?.trim()) {
    return explicit;
  }

  const host = firstNonEmpty([
    headerStore.get('x-forwarded-host'),
    headerStore.get('host'),
  ]);
  const proto = firstNonEmpty([
    headerStore.get('x-forwarded-proto'),
  ]) || 'https';

  // Host başlığı istemci tarafından sahtelenebilir: canonical/OG/JSON-LD URL'leri zehirlenmesin diye
  // üretimde yalnızca bilinen hostlar kabul edilir; diğerleri için SITE_URL kullanılır.
  // (Kalıcı çözüm: NEXT_PUBLIC_SITE_URL ortam değişkenini tanımlamak.)
  if (host && host !== '/' && (IS_DEV || TRUSTED_HOST.test(host)) && /^https?$/.test(proto)) {
    return `${proto}://${host}`;
  }

  return SITE_URL;
}

export const ROUTE_META = {
  '/': {
    ro: {
      title: 'Siskon România',
      description: 'Siskon este o companie de inginerie specializată în controlul proceselor, colectarea datelor, automatizare industrială și software specific clientului din 1997.',
    },
    en: {
      title: 'Siskon Romania',
      description: 'Siskon is an engineering company specialized in process control, data collection, industrial automation and customer-specific software since 1997.',
    },
    tr: {
      title: 'Siskon Romanya',
      description: 'Siskon, 1997\'den beri proses kontrolü, veri toplama, endüstriyel otomasyon ve müşteriye özel yazılım alanında uzmanlaşmış bir mühendislik şirketidir.',
    },
  },
  '/hizmetler': {
    ro: {
      title: 'Servicii de automatizare și software industrial',
      description: 'Soluții la cheie pentru industrie: colectarea datelor, automatizare industrială, software specific clientului, consultanță, instruire și suport tehnic.',
    },
    en: {
      title: 'Industrial automation and software services',
      description: 'Turnkey solutions for industry: data collection, industrial automation, customer-specific software, consulting, commissioning, training and technical support.',
    },
    tr: {
      title: 'Endüstriyel otomasyon ve yazılım hizmetleri',
      description: 'Endüstri için anahtar teslim çözümler: veri toplama, endüstriyel otomasyon, müşteriye özel yazılım, danışmanlık, devreye alma, eğitim ve teknik destek.',
    },
  },
  '/hizmetler/musteriye-ozel-yazilim': {
    ro: {
      title: 'Dezvoltare software la comandă pentru industrie',
      description: 'Aplicații industriale create pe măsura procesului dumneavoastră: integrare PLC, ERP și MES, arhitecturi scalabile, livrare etapizată și suport local.',
    },
    en: {
      title: 'Custom industrial software development',
      description: 'Industrial applications built around your process: PLC, ERP and MES integration, scalable architectures, phased delivery and local support from Romania.',
    },
    tr: {
      title: 'Endüstriye özel yazılım geliştirme',
      description: 'Sürecinize göre geliştirilen endüstriyel uygulamalar: PLC, ERP ve MES entegrasyonu, ölçeklenebilir mimariler, aşamalı teslimat ve Romanya\'dan yerel destek.',
    },
  },
  '/hizmetler/iiot': {
    ro: {
      title: 'IIoT: conectați utilajele și datele de producție',
      description: 'Colectați date de la mașini prin protocoale industriale standard, urmăriți OEE și stări în timp real și decideți pe baza datelor, fără a schimba echipamentele.',
    },
    en: {
      title: 'IIoT: connect machines and production data',
      description: 'Collect machine and line data over standard industrial protocols, see OEE and status in real time and decide with data, without replacing existing equipment.',
    },
    tr: {
      title: 'IIoT: makineleri ve üretim verisini bağlayın',
      description: 'Standart endüstriyel protokollerle makine ve hat verisini toplayın, OEE ve durumu anlık izleyin; mevcut ekipmanı değiştirmeden veriyle karar verin.',
    },
  },
  '/hizmetler/izlenebilirlik-cozumleri': {
    ro: {
      title: 'Trasabilitate de la materie primă la livrare',
      description: 'Urmăriți fiecare lot, componentă și operațiune cu fluxuri digitale auditabile, necesare pentru calitate, rechemări controlate și conformitate în producție.',
    },
    en: {
      title: 'Traceability from raw material to shipment',
      description: 'Track every batch, component and operation with auditable digital workflows that support quality, controlled recalls and compliance on the shop floor.',
    },
    tr: {
      title: 'Hammaddeden sevkiyata izlenebilirlik',
      description: 'Her parti, bileşen ve operasyonu denetlenebilir dijital akışlarla izleyin; kalite, kontrollü geri çağırma ve uyumluluğu üretim sahasında destekleyin.',
    },
  },
  '/hizmetler/makine-proses-otomasyonu': {
    ro: {
      title: 'Automatizare de mașini și procese industriale',
      description: 'Programare PLC și HMI, control de proces și integrare SCADA pentru linii noi sau modernizate, cu documentație clară și punere în funcțiune asistată.',
    },
    en: {
      title: 'Machine and industrial process automation',
      description: 'PLC and HMI programming, process control and SCADA integration for new or retrofitted lines, with clear documentation and assisted commissioning.',
    },
    tr: {
      title: 'Makine ve endüstriyel proses otomasyonu',
      description: 'Yeni veya yenilenen hatlar için PLC ve HMI programlama, proses kontrol ve SCADA entegrasyonu; net dokümantasyon ve devreye alma desteği.',
    },
  },
  '/hizmetler/robot-cozumleri': {
    ro: {
      title: 'Celule robotizate și soluții de robotică',
      description: 'Proiectăm, programăm și integrăm roboți industriali pentru manipulare, paletizare și asamblare, cu siguranță, vedere și monitorizare incluse.',
    },
    en: {
      title: 'Robotic cells and robot integration',
      description: 'We design, program and integrate industrial robots for handling, palletizing and assembly, with safety, vision and monitoring built in.',
    },
    tr: {
      title: 'Robot hücreleri ve robot entegrasyonu',
      description: 'Taşıma, paletleme ve montaj için endüstriyel robotları tasarlar, programlar ve entegre ederiz; güvenlik, görüntü ve izleme dahildir.',
    },
  },
  '/hizmetler/goruntu-isleme': {
    ro: {
      title: 'Viziune artificială pentru controlul calității',
      description: 'Inspecție vizuală automată, citire coduri și verificare de prezență pe linie, cu camere industriale și algoritmi adaptați produsului dumneavoastră.',
    },
    en: {
      title: 'Machine vision for quality inspection',
      description: 'Automated visual inspection, code reading and presence checks on the line, using industrial cameras and algorithms tuned to your product.',
    },
    tr: {
      title: 'Kalite kontrolü için görüntü işleme',
      description: 'Hatta otomatik görsel muayene, kod okuma ve varlık kontrolü; endüstriyel kameralar ve ürününüze göre ayarlanmış algoritmalar.',
    },
  },
  '/hizmetler/ai-makine-ogrenmesi': {
    ro: {
      title: 'AI și machine learning pentru producție',
      description: 'Modele de predicție a defectelor, mentenanță predictivă și optimizare de proces, antrenate pe datele fabricii dumneavoastră și integrate în fluxul existent.',
    },
    en: {
      title: 'AI and machine learning for manufacturing',
      description: 'Defect prediction, predictive maintenance and process optimization models trained on your plant data and integrated into the existing workflow.',
    },
    tr: {
      title: 'Üretim için yapay zeka ve makine öğrenmesi',
      description: 'Kendi fabrika verinizle eğitilen hata tahmini, kestirimci bakım ve proses optimizasyonu modelleri; mevcut akışa entegre edilir.',
    },
  },
  '/hizmetler/microsoft-cozumleri': {
    ro: {
      title: 'Soluții Microsoft pentru mediul industrial',
      description: 'Implementare și integrare Azure, Power Platform și Microsoft 365 pentru raportare de producție, automatizarea fluxurilor și colaborare între fabrică și birou.',
    },
    en: {
      title: 'Microsoft solutions for industry',
      description: 'Azure, Power Platform and Microsoft 365 implementation and integration for production reporting, workflow automation and plant-to-office collaboration.',
    },
    tr: {
      title: 'Endüstri için Microsoft çözümleri',
      description: 'Üretim raporlama, iş akışı otomasyonu ve fabrika-ofis iş birliği için Azure, Power Platform ve Microsoft 365 uygulama ve entegrasyonu.',
    },
  },
  '/hizmetler/velotic': {
    ro: {
      title: 'Velotic: monitorizare și analiză pentru energie',
      description: 'Platforma Velotic aduce monitorizare, alarmare și analiză de performanță pentru active energetice și industriale, cu implementare și suport de la echipa Siskon.',
    },
    en: {
      title: 'Velotic: monitoring and analytics for energy',
      description: 'The Velotic platform brings monitoring, alarming and performance analytics to energy and industrial assets, with deployment and support from the Siskon team.',
    },
    tr: {
      title: 'Velotic: enerji için izleme ve analiz',
      description: 'Velotic platformu enerji ve endüstriyel varlıklar için izleme, alarm ve performans analizi sunar; kurulum ve destek Siskon ekibinden.',
    },
  },
  '/hizmetler/egitim-danismanlik': {
    ro: {
      title: 'Instruire și consultanță pentru echipe tehnice',
      description: 'Programe de instruire pentru automatizare, MES și analiza datelor, plus consultanță de digitalizare pentru conducerea și inginerii din fabrică.',
    },
    en: {
      title: 'Training and consulting for technical teams',
      description: 'Training programs for automation, MES and data analysis, plus digitalization consulting for plant management and engineers.',
    },
    tr: {
      title: 'Teknik ekipler için eğitim ve danışmanlık',
      description: 'Otomasyon, MES ve veri analizi eğitim programları; fabrika yönetimi ve mühendisler için dijitalleşme danışmanlığı.',
    },
  },
  '/onsuite': {
    ro: {
      title: 'OnSuite: platformă MES cu 11 module',
      description: 'OnSuite reunește OEE, calitate, trasabilitate, energie și mentenanță într-o singură platformă MES, folosită în peste 60 de fabrici inteligente din lume.',
    },
    en: {
      title: 'OnSuite: an 11-module MES platform',
      description: 'OnSuite brings OEE, quality, traceability, energy and maintenance into one MES platform, used in more than 60 smart factories worldwide.',
    },
    tr: {
      title: 'OnSuite: 11 modüllü MES platformu',
      description: 'OnSuite; OEE, kalite, izlenebilirlik, enerji ve bakımı tek MES platformunda toplar ve dünya genelinde 60\'tan fazla akıllı fabrikada kullanılır.',
    },
  },
  '/arge': {
    ro: {
      title: 'Cercetare-dezvoltare și inovare industrială',
      description: 'Echipa C&D Siskon transformă idei în produse software industriale: prototipare rapidă, proiecte cu universități și tehnologii noi pentru fabrica viitorului.',
    },
    en: {
      title: 'Industrial R&D and innovation',
      description: 'The Siskon R&D team turns ideas into industrial software products: rapid prototyping, university projects and new technologies for the factory of the future.',
    },
    tr: {
      title: 'Endüstriyel Ar-Ge ve inovasyon',
      description: 'Siskon Ar-Ge ekibi fikirleri endüstriyel yazılım ürünlerine dönüştürür: hızlı prototipleme, üniversite projeleri ve geleceğin fabrikası için yeni teknolojiler.',
    },
  },
  '/sektorler': {
    ro: {
      title: 'Industrii deservite de Siskon',
      description: 'Soluții pentru industria textilă, tutun, farmaceutică, mașini și auto: colectarea datelor, automatizare industrială și software specific clientului.',
    },
    en: {
      title: 'Industries served by Siskon',
      description: 'Solutions for the textile, tobacco, pharmaceutical, machinery and automotive industries: data collection, industrial automation and customer-specific software.',
    },
    tr: {
      title: 'Siskon\'un hizmet verdiği sektörler',
      description: 'Tekstil, tütün, ilaç, makine ve otomotiv sektörleri için veri toplama, endüstriyel otomasyon ve müşteriye özel yazılım çözümleri.',
    },
  },
  '/sektorler/tutun': {
    ro: {
      title: 'Digitalizare pentru fabricile de tutun',
      description: 'Trasabilitate de tip track-and-trace, serializare și management al producției, aliniate cerințelor TPD, pentru linii de procesare și ambalare.',
    },
    en: {
      title: 'Digitalization for tobacco factories',
      description: 'Track-and-trace traceability, serialization and production management aligned with TPD requirements for processing and packaging lines.',
    },
    tr: {
      title: 'Tütün fabrikaları için dijitalleşme',
      description: 'TPD gereklerine uyumlu track-and-trace izlenebilirlik, serileştirme ve üretim yönetimi; işleme ve paketleme hatları için.',
    },
  },
  '/sektorler/otomotiv': {
    ro: {
      title: 'Soluții pentru furnizorii din industria auto',
      description: 'Trasabilitate pe componente, automatizarea liniilor, robotică și control al calității pentru producători auto și furnizori de nivel 1 și 2.',
    },
    en: {
      title: 'Solutions for automotive suppliers',
      description: 'Component traceability, line automation, robotics and quality control for automotive manufacturers and Tier 1 and Tier 2 suppliers.',
    },
    tr: {
      title: 'Otomotiv tedarikçileri için çözümler',
      description: 'Otomotiv üreticileri ve 1. ile 2. kademe tedarikçiler için bileşen izlenebilirliği, hat otomasyonu, robotik ve kalite kontrol.',
    },
  },
  '/sektorler/beyaz-esya': {
    ro: {
      title: 'Fabrică inteligentă pentru electrocasnice',
      description: 'IIoT, viziune artificială și monitorizarea liniilor de asamblare pentru producători de electrocasnice, cu raportare de eficiență în timp real.',
    },
    en: {
      title: 'Smart factory for white goods',
      description: 'IIoT, machine vision and assembly line monitoring for appliance manufacturers, with real-time efficiency reporting.',
    },
    tr: {
      title: 'Beyaz eşya için akıllı fabrika',
      description: 'Beyaz eşya üreticileri için IIoT, görüntü işleme ve montaj hattı izleme; anlık verimlilik raporlaması.',
    },
  },
  '/sektorler/gida-icecek': {
    ro: {
      title: 'Trasabilitate și automatizare în industria alimentară',
      description: 'Urmărire pe loturi, conformitate de igienă și automatizarea proceselor pentru producători de alimente și băuturi.',
    },
    en: {
      title: 'Traceability and automation for food and beverage',
      description: 'Batch tracking, hygiene compliance and process automation for food and beverage producers.',
    },
    tr: {
      title: 'Gıda ve içecekte izlenebilirlik ve otomasyon',
      description: 'Gıda ve içecek üreticileri için parti takibi, hijyen uyumu ve proses otomasyonu.',
    },
  },
  '/sektorler/ilac': {
    ro: {
      title: 'Serializare și calitate pentru industria farmaceutică',
      description: 'Serializare, conformitate GMP și management al calității pentru producția farmaceutică, cu istoric complet și rapoarte pregătite pentru audit.',
    },
    en: {
      title: 'Serialization and quality for pharma',
      description: 'Serialization, GMP compliance and quality management for pharmaceutical production, with full history and audit-ready reports.',
    },
    tr: {
      title: 'İlaçta serileştirme ve kalite yönetimi',
      description: 'İlaç üretimi için serileştirme, GMP uyumu ve kalite yönetimi; tam geçmiş kaydı ve denetime hazır raporlar.',
    },
  },
  '/sektorler/makine-otomasyon': {
    ro: {
      title: 'Software OEM pentru constructori de mașini',
      description: 'Software de control, HMI și integrare PLC pentru constructori de mașini care vor să livreze utilaje conectate și ușor de întreținut.',
    },
    en: {
      title: 'OEM software for machine builders',
      description: 'Control software, HMI and PLC integration for machine builders who want to ship connected, easy-to-service machines.',
    },
    tr: {
      title: 'Makine üreticileri için OEM yazılım',
      description: 'Bağlantılı ve kolay servis edilen makineler üretmek isteyen makine üreticileri için kontrol yazılımı, HMI ve PLC entegrasyonu.',
    },
  },
  '/sektorler/tekstil': {
    ro: {
      title: 'Calitate și trasabilitate în industria textilă',
      description: 'Control al calității, urmărirea loturilor și automatizarea proceselor pentru fabrici de textile și confecții.',
    },
    en: {
      title: 'Quality and traceability for textiles',
      description: 'Quality control, batch tracking and process automation for textile and apparel plants.',
    },
    tr: {
      title: 'Tekstilde kalite ve izlenebilirlik',
      description: 'Tekstil ve konfeksiyon tesisleri için kalite kontrol, parti takibi ve proses otomasyonu.',
    },
  },
  '/sektorler/enerji-kimya': {
    ro: {
      title: 'Automatizare pentru energie și industria chimică',
      description: 'Automatizarea proceselor, monitorizare continuă și analiză de date pentru instalații energetice și chimice, cu accent pe siguranță și disponibilitate.',
    },
    en: {
      title: 'Automation for energy and chemicals',
      description: 'Process automation, continuous monitoring and data analytics for energy and chemical plants, with a focus on safety and availability.',
    },
    tr: {
      title: 'Enerji ve kimya için otomasyon',
      description: 'Enerji ve kimya tesisleri için proses otomasyonu, sürekli izleme ve veri analitiği; güvenlik ve erişilebilirlik odaklı.',
    },
  },
  '/is-birlikleri': {
    ro: {
      title: 'Parteneri tehnologici ai Siskon',
      description: 'Parteneri tehnologici Beckhoff, SICK, Universal Robots și Velotic pentru soluții de automatizare industrială, colectarea datelor și Industria 4.0.',
    },
    en: {
      title: 'Siskon technology partners',
      description: 'Technology partners Beckhoff, SICK, Universal Robots and Velotic for industrial automation, data collection and Industry 4.0 solutions.',
    },
    tr: {
      title: 'Siskon teknoloji iş ortakları',
      description: 'Beckhoff, SICK, Universal Robots ve Velotic teknoloji ortaklarımızla endüstriyel otomasyon, veri toplama ve Endüstri 4.0 çözümleri.',
    },
  },
  '/referanslar': {
    ro: {
      title: 'Referințe și proiecte livrate',
      description: 'Referințe în industria textilă, tutun, farmaceutică, mașini și auto: proiecte de colectare a datelor, automatizare industrială și software livrate din 1997.',
    },
    en: {
      title: 'References and delivered projects',
      description: 'References in textile, tobacco, pharmaceutical, machinery and automotive: data collection, industrial automation and software projects since 1997.',
    },
    tr: {
      title: 'Referanslar ve tamamlanan projeler',
      description: 'Tekstil, tütün, ilaç, makine ve otomotiv sektörlerinde 1997\'den beri teslim edilen veri toplama, endüstriyel otomasyon ve yazılım projeleri.',
    },
  },
  '/kurumsal': {
    ro: {
      title: 'Despre compania Siskon',
      description: 'Din 1997, Siskon oferă servicii profesionale de inginerie: controlul proceselor, colectarea datelor, automatizare industrială și Industria 4.0.',
    },
    en: {
      title: 'About Siskon',
      description: 'Since 1997, Siskon has provided professional engineering services: process control, data collection, industrial automation and Industry 4.0.',
    },
    tr: {
      title: 'Siskon hakkında',
      description: '1997\'den beri Siskon; proses kontrolü, veri toplama, endüstriyel otomasyon ve Endüstri 4.0 alanlarında profesyonel mühendislik hizmetleri sunar.',
    },
  },
  '/kurumsal/bizi-taniyin': {
    ro: {
      title: 'Povestea și echipa Siskon',
      description: 'Companie de inginerie din 1997: consultanță, analiză de proiecte, furnizare de echipamente, aplicații software, punere în funcțiune, instruire și suport tehnic.',
    },
    en: {
      title: 'The Siskon story and team',
      description: 'Engineering company since 1997: consulting, project analysis, equipment supply, software applications, commissioning, training and technical support.',
    },
    tr: {
      title: 'Siskon\'un hikâyesi ve ekibi',
      description: '1997\'den beri mühendislik şirketi: danışmanlık, proje analizi, ekipman temini, yazılım uygulamaları, devreye alma, eğitim ve satış sonrası teknik destek.',
    },
  },
  '/kurumsal/kariyer': {
    ro: {
      title: 'Cariere la Siskon: joburi și internship-uri',
      description: 'Alăturați-vă echipei Siskon: posturi deschise, internship-uri și un proces de angajare clar, într-o cultură axată pe învățare și inginerie.',
    },
    en: {
      title: 'Careers at Siskon: jobs and internships',
      description: 'Join the Siskon team: open roles, internships and a clear hiring process in a culture built around learning and engineering.',
    },
    tr: {
      title: 'Siskon\'da kariyer: iş ve staj fırsatları',
      description: 'Siskon ekibine katılın: açık pozisyonlar, staj imkânları ve öğrenme ile mühendisliğe odaklı bir kültürde net bir işe alım süreci.',
    },
  },
  '/kurumsal/surdurulebilirlik': {
    ro: {
      title: 'Sustenabilitate și responsabilitate de mediu',
      description: 'Cum reducem amprenta de carbon, sprijinim producția eficientă energetic și investim în proiecte de împădurire și în comunitate.',
    },
    en: {
      title: 'Sustainability and environmental responsibility',
      description: 'How we reduce our carbon footprint, support energy-efficient manufacturing and invest in forestation projects and the community.',
    },
    tr: {
      title: 'Sürdürülebilirlik ve çevre sorumluluğu',
      description: 'Karbon ayak izimizi nasıl azalttığımız, enerji verimli üretimi nasıl desteklediğimiz ve ağaçlandırma ile topluma yaptığımız yatırımlar.',
    },
  },
  '/blog': {
    ro: {
      title: 'Blog Siskon: articole despre producție digitală',
      description: 'Articole și noutăți despre automatizare industrială, IIoT, trasabilitate, inteligență artificială și tehnologii pentru fabrica viitorului.',
    },
    en: {
      title: 'Siskon blog: digital manufacturing articles',
      description: 'Articles and news on industrial automation, IIoT, traceability, artificial intelligence and technologies for the factory of the future.',
    },
    tr: {
      title: 'Siskon blog: dijital üretim yazıları',
      description: 'Endüstriyel otomasyon, IIoT, izlenebilirlik, yapay zeka ve geleceğin fabrikası teknolojileri hakkında yazılar ve haberler.',
    },
  },
  '/iletisim': {
    ro: {
      title: 'Contactați Siskon România',
      description: 'Contactați Siskon pentru oferte și consultanță în automatizare industrială, colectarea datelor și software specific clientului: formular, telefon și birouri.',
    },
    en: {
      title: 'Contact Siskon Romania',
      description: 'Contact Siskon for quotes and consulting on industrial automation, data collection and customer-specific software: contact form, phone and office addresses.',
    },
    tr: {
      title: 'Siskon Romanya ile iletişime geçin',
      description: 'Endüstriyel otomasyon, veri toplama ve müşteriye özel yazılım için teklif ve danışmanlık almak üzere Siskon ile iletişime geçin: form, telefon, ofisler.',
    },
  },
  '/search': {
    ro: {
      title: 'Căutare pe site',
      description: 'Căutați servicii, industrii, articole și pagini pe site-ul Siskon România.',
    },
    en: {
      title: 'Site search',
      description: 'Search services, industries, articles and pages on the Siskon Romania website.',
    },
    tr: {
      title: 'Site içi arama',
      description: 'Siskon Romanya sitesinde hizmet, sektör, makale ve sayfalarda arama yapın.',
    },
  },
  '/yasal/kvkk': {
    ro: {
      title: 'Notificare de prelucrare a datelor (GDPR)',
      description: 'Informații despre cum prelucrăm datele cu caracter personal, temeiurile legale, perioadele de păstrare și drepturile persoanelor vizate.',
    },
    en: {
      title: 'Personal data processing notice (GDPR)',
      description: 'How we process personal data, the legal bases, retention periods and the rights of data subjects.',
    },
    tr: {
      title: 'Kişisel veri işleme aydınlatma metni',
      description: 'Kişisel verileri nasıl işlediğimiz, hukuki sebepler, saklama süreleri ve ilgili kişilerin hakları.',
    },
  },
  '/yasal/gizlilik-politikasi': {
    ro: {
      title: 'Politica de confidențialitate Siskon',
      description: 'Cum colectăm, folosim și protejăm datele vizitatorilor și clienților, inclusiv formularele de contact și măsurile de securitate aplicate.',
    },
    en: {
      title: 'Siskon privacy policy',
      description: 'How we collect, use and protect visitor and customer data, including contact forms and the security measures we apply.',
    },
    tr: {
      title: 'Siskon gizlilik politikası',
      description: 'Ziyaretçi ve müşteri verilerini nasıl topladığımız, kullandığımız ve koruduğumuz; iletişim formları ve uyguladığımız güvenlik önlemleri.',
    },
  },
  '/yasal/cerez-politikasi': {
    ro: {
      title: 'Politica de utilizare a cookie-urilor',
      description: 'Ce cookie-uri folosim pe acest site, în ce scop, cât timp sunt păstrate și cum vă puteți modifica oricând preferințele.',
    },
    en: {
      title: 'Cookie usage policy',
      description: 'Which cookies we use on this site, for what purpose, how long they are kept and how you can change your preferences at any time.',
    },
    tr: {
      title: 'Çerez kullanım politikası',
      description: 'Bu sitede hangi çerezleri, hangi amaçla ve ne kadar süre kullandığımız ve tercihlerinizi istediğiniz zaman nasıl değiştirebileceğiniz.',
    },
  },
};

export const ROUTE_PATHS = Object.keys(ROUTE_META);

// Canlı siskon.ro sitesinin kullandığı marka adı ve anahtar kelimeler
export const SITE_BRAND = 'Siskon Automation and Software Inc.';
const HOME_TAGLINE = {
  ro: 'Automatizare industrială, Colectarea datelor, Industria 4.0',
  en: 'Industrial Automation, Data Collection, Industry 4.0',
  tr: 'Endüstriyel Otomasyon, Veri Toplama, Endüstri 4.0',
};
export const SITE_KEYWORDS = [
  'Siskon Automation', 'Automatizări industriale', 'Colectare de date', 'Industria 4.0', 'Industrial Automation',
  'Data Collection', 'Industry 4.0', 'OEE', 'Traceability', 'Condition Monitoring', 'PLC', 'SAP MII', 'Beckhoff',
  'SICK', 'Universal Robots', 'Microsoft', 'Azure', 'Software și automatizare',
];

function normalizePath(pathname) {
  if (!pathname) return '/';
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function normalizeTitle(title, locale, isHome = false, maxLength = 70) {
  // Ana sayfa: canlı siskon.ro başlığı ("Marka - anahtar konular"); kesilmez
  if (isHome) return `${SITE_BRAND} - ${HOME_TAGLINE[locale] || HOME_TAGLINE.ro}`;

  const clean = String(title || '').replaceAll(/\s+/g, ' ').trim();
  const pageLabel = clean.split('|').map((part) => part.trim()).find((part) => part.length > 0) || SITE_BRAND;

  // Başlık zaten "Siskon" içeriyorsa marka eki eklenmez (tekrar olmasın)
  if (/siskon/i.test(pageLabel)) return pageLabel.length <= maxLength ? pageLabel : pageLabel.slice(0, maxLength).trim();

  // İç sayfalar tutarlı olsun diye kısa marka eki kullanılır ("... | Siskon România")
  const shortBrand = locale === 'en' ? 'Siskon Romania' : locale === 'ro' ? 'Siskon România' : 'Siskon Romanya';
  const shortResult = `${pageLabel} | ${shortBrand}`;
  if (shortResult.length <= maxLength) return shortResult;

  // Hâlâ uzunsa sayfa etiketini kelime sınırında kısalt.
  const labelMaxLength = maxLength - (` | ${shortBrand}`).length;
  const labelCandidate = pageLabel.slice(0, labelMaxLength + 1);
  const lastSpace = labelCandidate.lastIndexOf(' ');
  const cutoff = lastSpace > 8 ? lastSpace : labelMaxLength;
  return `${labelCandidate.slice(0, cutoff).trim()} | ${shortBrand}`;
}

function ensureSentenceEnding(text) {
  const clean = String(text || '').trim();
  if (!clean) return clean;
  if (/[.!?]$/.test(clean)) return clean;
  return `${clean}.`;
}

function normalizeDescription(description, locale, maxLength = 160, minLength = 110) {
  const clean = String(description || '').replaceAll(/\s+/g, ' ').trim();
  const fallback = locale === 'en'
    ? 'Siskon delivers industrial software, automation and data solutions for sustainable operational excellence.'
    : locale === 'ro'
    ? 'Siskon oferă software industrial, soluții de automatizare și date pentru o excelență operațională sustenabilă.'
    : 'Siskon, endüstriyel yazılım, otomasyon ve veri çözümleri ile sürdürülebilir operasyonel mükemmellik sunar.';
  const booster = locale === 'en'
    ? 'Built for measurable industrial performance.'
    : locale === 'ro'
    ? 'Construit pentru performanță industrială măsurabilă.'
    : 'Ölçülebilir endüstriyel performans için tasarlanmıştır.';

  let result = clean || fallback;
  if (result.length < minLength) {
    result = `${result} ${booster}`.replaceAll(/\s+/g, ' ').trim();
  }
  if (result.length <= maxLength) return ensureSentenceEnding(result);

  const candidate = result.slice(0, maxLength + 1);
  const punctuationCutoff = Math.max(
    candidate.lastIndexOf('. '),
    candidate.lastIndexOf('; '),
    candidate.lastIndexOf(': '),
  );
  if (punctuationCutoff > 120) {
    return ensureSentenceEnding(candidate.slice(0, punctuationCutoff + 1).trim());
  }

  const lastSpace = candidate.lastIndexOf(' ');
  const cutoff = lastSpace > 110 ? lastSpace : maxLength;
  return ensureSentenceEnding(candidate.slice(0, cutoff).trim());
}

function firstNonEmpty(values) {
  for (const value of values) {
    if (value && typeof value === 'string' && value.trim()) return value.trim();
  }
  return '/';
}

function extractPathFromHeaderValue(value) {
  if (!value) return '/';
  try {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return new URL(value).pathname || '/';
    }
  } catch {
    return '/';
  }

  if (value.includes('?')) {
    return value.split('?')[0] || '/';
  }

  return value.startsWith('/') ? value : `/${value}`;
}

export function getRequestPathFromHeaders(headerStore) {
  const candidate = firstNonEmpty([
    headerStore.get('x-original-url'),
    headerStore.get('x-rewrite-url'),
    headerStore.get('x-invoke-path'),
    headerStore.get('x-matched-path'),
    headerStore.get('next-url'),
    headerStore.get('x-next-url'),
  ]);

  return normalizePath(extractPathFromHeaderValue(candidate));
}

export function buildLocalizedMetadata({ pathname, siteUrl = SITE_URL }) {
  const locale = detectLocale(pathname);
  const internalPath = normalizePath(toInternalPath(pathname, locale));
  const routeMeta = ROUTE_META[internalPath] || ROUTE_META['/'];
  const selected = locale === 'en' ? routeMeta.en : locale === 'ro' ? routeMeta.ro : routeMeta.tr;
  const title = normalizeTitle(selected?.title || routeMeta.ro?.title || routeMeta.en?.title || '', locale, internalPath === '/');
  const description = normalizeDescription(selected?.description || routeMeta.ro?.description || routeMeta.en?.description || '', locale);
  const canonicalPath = toLocalizedPath(internalPath, locale);
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();
  const ogImage = '/og/siskon-default.webp';

  return {
    title,
    description,
    keywords: SITE_KEYWORDS,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'ro' ? 'ro_RO' : 'tr_TR',
      siteName: SITE_BRAND,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Siskon',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        ro: toLocalizedPath(internalPath, 'ro'),
        en: toLocalizedPath(internalPath, 'en'),
        tr: toLocalizedPath(internalPath, 'tr'),
        'x-default': toLocalizedPath(internalPath, 'ro'),
      },
    },
    icons: {
      icon: '/icon.svg',
    },
  };
}

export function getMetadataForPathname(pathname) {
  const locale = detectLocale(pathname);
  const internalPath = normalizePath(toInternalPath(pathname, locale));
  const routeMeta = ROUTE_META[internalPath] || ROUTE_META['/'];
  const selected = locale === 'en' ? routeMeta.en : locale === 'ro' ? routeMeta.ro : routeMeta.tr;
  const title = normalizeTitle(selected?.title || routeMeta.ro?.title || routeMeta.en?.title || '', locale, internalPath === '/');
  const description = normalizeDescription(selected?.description || routeMeta.ro?.description || routeMeta.en?.description || '', locale);

  return {
    locale,
    internalPath,
    title,
    description,
    alternates: {
      ro: toLocalizedPath(internalPath, 'ro'),
      en: toLocalizedPath(internalPath, 'en'),
      tr: toLocalizedPath(internalPath, 'tr'),
      xDefault: toLocalizedPath(internalPath, 'ro'),
    },
  };
}
