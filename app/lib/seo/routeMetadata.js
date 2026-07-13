import { detectLocale, toInternalPath, toLocalizedPath } from '../i18n/routes';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.siskon.com.tr';

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

  if (host && host !== '/') {
    return `${proto}://${host}`;
  }

  return SITE_URL;
}

export const ROUTE_META = {
  '/': {
    tr: {
      title: 'Siskon | Endüstriyel Yazılım, Otomasyon ve Veri Çözümleri',
      description: '1997’den bu yana endüstriyel yazılım, otomasyon ve veri analitiği alanında bağımsız mühendislik çözümleriyle üretimde ölçülebilir verimlilik sağlıyoruz.',
    },
    en: {
      title: 'Siskon | Industrial Software, Automation and Data Solutions',
      description: 'Since 1997, Siskon has delivered independent engineering solutions in industrial software, automation and data analytics for measurable operational impact.',
    },
    ro: {
      title: 'Siskon | Software Industrial, Automatizare și Soluții de Date',
      description: 'Din 1997, Siskon a furnizat soluții independente de inginerie în software industrial, automatizare și analiza datelor pentru un impact operațional măsurabil.',
    },
  },
  '/hizmetler': {
    tr: {
      title: 'Hizmetlerimiz | Siskon — Endüstriyel Yazılım ve Otomasyon',
      description: 'Müşteriye özel yazılım, IIoT, otomasyon, görüntü işleme ve endüstriyel yapay zeka hizmetlerimizle üretimde verimliliği, izlenebilirliği ve kaliteyi bir arada güçlendiriyoruz.',
    },
    en: {
      title: 'Services | Siskon — Industrial Software and Automation',
      description: 'Improve end-to-end production performance with custom software, IIoT, automation, machine vision and industrial AI services.',
    },
    ro: {
      title: 'Servicii | Siskon — Software Industrial și Automatizare',
      description: 'Îmbunătățiți performanța producției end-to-end cu software personalizat, IIoT, automatizare, viziune artificială și servicii industriale AI.',
    },
  },
  '/hizmetler/musteriye-ozel-yazilim': {
    tr: {
      title: 'Müşteriye Özel Yazılım Çözümleri | Siskon',
      description: 'İş modelinize özel geliştirilen ölçeklenebilir yazılım ve entegrasyon mimarileriyle süreçlerinizi hızlandırıyor, veri odaklı operasyonel kontrol sunuyoruz.',
    },
    en: {
      title: 'Custom Software Solutions | Siskon',
      description: 'Deploy enterprise-grade custom software and integration architecture tailored to your operating model and long-term growth roadmap.',
    },
    ro: {
      title: 'Soluții Software Personalizate | Siskon',
      description: 'Implementați software personalizat și arhitectură de integrare de nivel enterprise, adaptate modelului dumneavoastră de operare și foii de parcurs pentru creștere pe termen lung.',
    },
  },
  '/hizmetler/iiot': {
    tr: {
      title: 'IIoT Çözümleri | Siskon',
      description: 'Sahadan gelen veriyi güvenli biçimde toplayan IIoT mimarileriyle gerçek zamanlı görünürlük, hızlı karar alma ve kesintisiz sistem entegrasyonu sağlıyoruz.',
    },
    en: {
      title: 'Industrial IoT Solutions | Siskon',
      description: 'Capture, contextualize and integrate factory data across edge, cloud and enterprise systems for real-time industrial visibility.',
    },
    ro: {
      title: 'Soluții Industriale IoT | Siskon',
      description: 'Capturați, contextualizați și integrați datele din fabrică în sistemele edge, cloud și enterprise pentru o vizibilitate industrială în timp real.',
    },
  },
  '/hizmetler/izlenebilirlik-cozumleri': {
    tr: {
      title: 'İzlenebilirlik Çözümleri | Siskon',
      description: 'Hammadde girişinden sevkiyata kadar tüm üretim adımlarını dijital olarak izleyerek kalite güvencesi, mevzuat uyumu ve geriye dönük analiz imkanı sunuyoruz.',
    },
    en: {
      title: 'Traceability Solutions | Siskon',
      description: 'Enable full traceability from raw material intake to shipment with auditable digital workflows that support quality and compliance.',
    },
    ro: {
      title: 'Soluții de Trasabilitate | Siskon',
      description: 'Permiteți trasabilitatea completă de la preluarea materiei prime până la expediere, cu fluxuri de lucru digitale auditabile care susțin calitatea și conformitatea.',
    },
  },
  '/hizmetler/makine-proses-otomasyonu': {
    tr: {
      title: 'Makine ve Proses Otomasyonu | Siskon',
      description: 'Makine ve proses otomasyonu projelerinde tasarım, devreye alma ve optimizasyon süreçlerini uçtan uca yöneterek daha güvenli, kararlı ve verimli üretim sağlıyoruz.',
    },
    en: {
      title: 'Machine and Process Automation | Siskon',
      description: 'Increase throughput, process consistency and workplace safety with robust machine and process automation engineering.',
    },
    ro: {
      title: 'Automatizarea Mașinilor și Proceselor | Siskon',
      description: 'Creșteți capacitatea, consistența proceselor și siguranța la locul de muncă cu o inginerie robustă de automatizare a mașinilor și proceselor.',
    },
  },
  '/hizmetler/robot-cozumleri': {
    tr: {
      title: 'Robot Çözümleri | Siskon',
      description: 'Kolaboratif ve endüstriyel robot çözümlerimizle üretim hatlarında hız, kalite ve iş güvenliğini artırıyor, tekrarlayan operasyonlarda verimliliği yükseltiyoruz.',
    },
    en: {
      title: 'Robotic Solutions | Siskon',
      description: 'Advance shopfloor agility with collaborative and industrial robotics engineered for safe, repeatable human-machine operations.',
    },
    ro: {
      title: 'Soluții Robotice | Siskon',
      description: 'Dezvoltați agilitatea atelierelor cu robotică colaborativă și industrială proiectată pentru operațiuni om-mașină sigure și repetabile.',
    },
  },
  '/hizmetler/goruntu-isleme': {
    tr: {
      title: 'Görüntü İşleme Çözümleri | Siskon',
      description: 'Yapay zeka destekli görüntü işleme sistemlerimizle kalite hatalarını erken tespit ediyor, fireyi azaltıyor ve standartlara uygun üretimi güvence altına alıyoruz.',
    },
    en: {
      title: 'Machine Vision Solutions | Siskon',
      description: 'Strengthen quality assurance with AI-assisted machine vision and real-time inspection systems for high-precision production lines.',
    },
    ro: {
      title: 'Soluții de Viziune Artificială | Siskon',
      description: 'Consolidați asigurarea calității cu viziune artificială asistată de AI și sisteme de inspecție în timp real pentru liniile de producție de înaltă precizie.',
    },
  },
  '/hizmetler/ai-makine-ogrenmesi': {
    tr: {
      title: 'AI ve Makine Öğrenmesi | Siskon',
      description: 'Büyük veri analitiği ve makine öğrenmesi uygulamalarıyla üretim verisini aksiyona dönüştürüyor, kestirimci karar desteğiyle performans artışı sağlıyoruz.',
    },
    en: {
      title: 'AI and Machine Learning | Siskon',
      description: 'Accelerate decision intelligence with industrial-scale machine learning and advanced analytics tailored to production operations.',
    },
    ro: {
      title: 'AI și Machine Learning | Siskon',
      description: 'Accelerați inteligența decizională cu machine learning la scară industrială și analize avansate adaptate operațiunilor de producție.',
    },
  },
  '/hizmetler/microsoft-cozumleri': {
    tr: {
      title: 'Microsoft Çözümleri | Siskon',
      description: 'Microsoft ekosisteminde lisanslama, Power Platform ve Azure entegrasyonlarıyla dijital dönüşüm projelerinizi güvenli, ölçeklenebilir ve yönetilebilir hale getiriyoruz.',
    },
    en: {
      title: 'Microsoft Solutions | Siskon',
      description: 'Drive enterprise transformation with Microsoft licensing, Power Platform and Azure integration services aligned to governance and scalability goals.',
    },
    ro: {
      title: 'Soluții Microsoft | Siskon',
      description: 'Stimulați transformarea companiei cu licențierea Microsoft, Power Platform și servicii de integrare Azure, aliniate la obiectivele de guvernanță și scalabilitate.',
    },
  },
  '/hizmetler/ge-vernova': {
    tr: {
      title: 'GE Vernova (Proficy) Çözümleri | Siskon',
      description: 'GE Vernova Proficy tabanlı çözümlerle üretim operasyonlarını dijitalleştiriyor, performans göstergelerini görünür kılıyor ve sürekli iyileştirmeyi hızlandırıyoruz.',
    },
    en: {
      title: 'GE Vernova (Proficy) Solutions | Siskon',
      description: 'Digitize production operations with GE Vernova Proficy-based platforms to improve visibility, control and continuous process improvement.',
    },
    ro: {
      title: 'Soluții GE Vernova (Proficy) | Siskon',
      description: 'Digitalizați operațiunile de producție cu platformele bazate pe GE Vernova Proficy pentru a îmbunătăți vizibilitatea, controlul și îmbunătățirea continuă a proceselor.',
    },
  },
  '/hizmetler/egitim-danismanlik': {
    tr: {
      title: 'Eğitim ve Danışmanlık | Siskon',
      description: 'Endüstriyel dönüşüm hedeflerinize uygun eğitim ve danışmanlık programlarıyla ekiplerinizin teknik yetkinliğini geliştiriyor, uygulamada ölçülebilir sonuçlar sağlıyoruz.',
    },
    en: {
      title: 'Training and Consulting | Siskon',
      description: 'Build internal capability with structured training and consulting programs designed for practical industrial transformation outcomes.',
    },
    ro: {
      title: 'Instruire și Consultanță | Siskon',
      description: 'Construiți capacitatea internă cu programe structurate de instruire și consultanță concepute pentru rezultate practice de transformare industrială.',
    },
  },
  '/onsuite': {
    tr: {
      title: 'OnSuite | Siskon Akıllı Üretim Platformu',
      description: 'OnSuite, 11 entegre modülüyle üretim planlama, izleme, izlenebilirlik ve performans yönetimini tek çatı altında birleştiren akıllı üretim platformudur.',
    },
    en: {
      title: 'OnSuite | Siskon Smart Manufacturing Platform',
      description: 'OnSuite is a smart manufacturing platform that unifies 11 integrated modules for planning, monitoring, traceability and performance management.',
    },
    ro: {
      title: 'OnSuite | Siskon Platformă Inteligentă de Producție',
      description: 'OnSuite este o platformă inteligentă de producție care reunește 11 module integrate pentru planificare, monitorizare, trasabilitate și managementul performanței.',
    },
  },
  '/arge': {
    tr: {
      title: 'Ar-Ge | Siskon',
      description: 'Siskon Ar-Ge ekibi, endüstriyel ihtiyaçlara odaklı inovasyon yaklaşımıyla yeni ürün ve teknolojiler geliştirerek ölçeklenebilir, sürdürülebilir çözümler üretir.',
    },
    en: {
      title: 'R&D | Siskon',
      description: 'Discover Siskon’s R&D framework focused on innovation-led product development, engineering excellence and scalable industrial technologies.',
    },
    ro: {
      title: 'Cercetare și Dezvoltare | Siskon',
      description: 'Descoperiți cadrul C&D al Siskon axat pe dezvoltarea de produse orientate spre inovație, excelență în inginerie și tehnologii industriale scalabile.',
    },
  },
  '/sektorler': {
    tr: {
      title: 'Sektörler | Siskon',
      description: 'Tütün, otomotiv, beyaz eşya, gıda, ilaç, makine, tekstil ve enerji sektörlerinde ortak OnSuite omurgasıyla uçtan uca dijital dönüşüm sağlıyoruz.',
    },
    en: {
      title: 'Industries | Siskon',
      description: 'Deliver end-to-end digital transformation for tobacco, automotive, white goods, food, pharma, machinery, textile and energy on a shared OnSuite backbone.',
    },
    ro: {
      title: 'Industrii | Siskon',
      description: 'Oferim transformare digitală de la un capăt la altul pentru industriile de tutun, auto, electrocasnice, alimentară, farmaceutică, utilaje, textile și energie.',
    },
  },
  '/sektorler/tutun': {
    tr: {
      title: 'Tütün Sektörü Çözümleri | Siskon',
      description: 'OnSuite TMC ile OPC UA tabanlı tütün makinesi entegrasyonu, GSCA ve TPD uyumlu izlenebilirlik ve üretim görünürlüğü sağlıyoruz.',
    },
    en: {
      title: 'Tobacco Industry Solutions | Siskon',
      description: 'Enable OPC UA-based tobacco machine integration and GSCA/TPD-aligned traceability with OnSuite TMC for regulated production environments.',
    },
    ro: {
      title: 'Soluții pentru Industria Tutunului | Siskon',
      description: 'Permiteți integrarea mașinilor de tutun bazată pe OPC UA și trasabilitatea aliniată la GSCA/TPD cu OnSuite TMC pentru medii de producție reglementate.',
    },
  },
  '/sektorler/otomotiv': {
    tr: {
      title: 'Otomotiv Sektörü Çözümleri | Siskon',
      description: 'IATF 16949 odaklı otomotiv izlenebilirliği, kritik komponent doğrulama ve Hybrid Track and Trace entegrasyonuyla kalite güvencesini güçlendiriyoruz.',
    },
    en: {
      title: 'Automotive Industry Solutions | Siskon',
      description: 'Support IATF 16949-focused traceability, critical component verification and Hybrid Track and Trace integration for automotive quality programs.',
    },
    ro: {
      title: 'Soluții pentru Industria Auto | Siskon',
      description: 'Susținem trasabilitatea concentrată pe IATF 16949, verificarea componentelor critice și integrarea Track and Trace hibridă pentru programele de calitate auto.',
    },
  },
  '/sektorler/beyaz-esya': {
    tr: {
      title: 'Beyaz Eşya Sektörü Çözümleri | Siskon',
      description: 'Yüksek hacimli montaj hatlarında A+++ Track and Trace, OEE analitiği ve enerji izleme çözümleriyle operasyonel verimi artırıyoruz.',
    },
    en: {
      title: 'White Goods Industry Solutions | Siskon',
      description: 'Implement A+++ Track and Trace, OEE analytics and energy monitoring to improve quality and efficiency in high-volume assembly lines.',
    },
    ro: {
      title: 'Soluții pentru Industria Electrocasnicelor | Siskon',
      description: 'Implementăm trasabilitatea Track and Trace A+++, analize OEE și monitorizarea energiei pentru a îmbunătăți calitatea și eficiența în liniile de asamblare de volum mare.',
    },
  },
  '/sektorler/gida-icecek': {
    tr: {
      title: 'Gıda ve İçecek Sektörü Çözümleri | Siskon',
      description: 'ISO 22005:2007 ve HACCP uyumlu çözümlerle hammaddeden rafa kadar tam parti-lot izlenebilirliği ve gıda güvenliği yönetimi sağlıyoruz.',
    },
    en: {
      title: 'Food and Beverage Industry Solutions | Siskon',
      description: 'Deliver ISO 22005:2007 and HACCP-aligned lot traceability from raw material intake to shelf for stronger food safety governance.',
    },
    ro: {
      title: 'Soluții pentru Industria Alimentară | Siskon',
      description: 'Oferim trasabilitatea lotului, aliniată la ISO 22005:2007 și HACCP, de la recepția materiei prime până la raft pentru o mai bună guvernanță a siguranței alimentare.',
    },
  },
  '/sektorler/ilac': {
    tr: {
      title: 'İlaç Sektörü Çözümleri | Siskon',
      description: 'GMP uyumlu serileştirme, parti ve son kullanma takibi ile soğuk zincir doğrulama süreçlerini birleştirerek regülasyon uyumunu destekliyoruz.',
    },
    en: {
      title: 'Pharmaceutical Industry Solutions | Siskon',
      description: 'Support pharmaceutical compliance with GMP-aligned serialization, batch and expiry traceability, and validated cold-chain verification workflows.',
    },
    ro: {
      title: 'Soluții pentru Industria Farmaceutică | Siskon',
      description: 'Susținem conformitatea farmaceutică cu procese de serializare, trasabilitate a loturilor și scadențelor, precum și validarea fluxurilor lanțului frigorific.',
    },
  },
  '/sektorler/makine-otomasyon': {
    tr: {
      title: 'Makine ve Otomasyon Sektörü Çözümleri | Siskon',
      description: 'PLC, SCADA, servo, pano ve çok markalı CNC hatları için uçtan uca otomasyon mühendisliği sunarak devreye alma süreçlerini hızlandırıyoruz.',
    },
    en: {
      title: 'Machinery and Automation Industry Solutions | Siskon',
      description: 'Provide end-to-end automation engineering for PLC, SCADA, servo systems, electrical panels and multi-brand CNC production lines.',
    },
    ro: {
      title: 'Soluții pentru Industria Mașinilor și Automatizării | Siskon',
      description: 'Oferim inginerie de automatizare cap-la-cap pentru PLC, SCADA, servo-sisteme, panouri electrice și linii de producție CNC multi-brand.',
    },
  },
  '/sektorler/tekstil': {
    tr: {
      title: 'Tekstil Sektörü Çözümleri | Siskon',
      description: 'Dokuma, örme ve boyahane hatlarında reçete yönetimi, üretim veri toplama ve OEE odaklı dijitalleşme ile sürdürülebilir verimlilik sağlıyoruz.',
    },
    en: {
      title: 'Textile Industry Solutions | Siskon',
      description: 'Enable textile operations with recipe management, production data capture and OEE-driven digitalization for consistent process performance.',
    },
    ro: {
      title: 'Soluții pentru Industria Textilă | Siskon',
      description: 'Digitalizăm operațiunile textile prin managementul rețetelor, colectarea datelor de producție și analize OEE pentru o performanță constantă.',
    },
  },
  '/sektorler/enerji-kimya': {
    tr: {
      title: 'Enerji ve Kimya Sektörü Çözümleri | Siskon',
      description: 'OnSuite Green ile enerji izleme, karbon ayak izi raporlama ve CBAM hazırlığı için entegre, denetlenebilir sürdürülebilirlik çözümleri sunuyoruz.',
    },
    en: {
      title: 'Energy and Chemicals Industry Solutions | Siskon',
      description: 'Deliver integrated energy monitoring, carbon reporting and CBAM readiness programs powered by OnSuite Green for regulated industries.',
    },
    ro: {
      title: 'Soluții pentru Energie și Industria Chimică | Siskon',
      description: 'Livram programe integrate de monitorizare a energiei, raportare a emisiilor de carbon și pregătire CBAM, susținute de OnSuite Green.',
    },
  },
  '/is-birlikleri': {
    tr: {
      title: 'İş Birlikleri | Siskon',
      description: 'Dünya teknoloji liderleriyle kurduğumuz stratejik iş birlikleri sayesinde müşterilerimize güçlü entegrasyon kabiliyeti, güncel platformlar ve teknik güvence sunuyoruz.',
    },
    en: {
      title: 'Partnerships | Siskon',
      description: 'Explore Siskon’s strategic partnerships with global technology leaders that strengthen delivery capability and long-term technical assurance.',
    },
    ro: {
      title: 'Parteneriate | Siskon',
      description: 'Descoperiți parteneriatele strategice Siskon cu liderii mondiali din tehnologie, care consolidează capacitatea de implementare și oferă asigurare tehnică pe termen lung.',
    },
  },
  '/referanslar': {
    tr: {
      title: 'Referanslarımız | Siskon',
      description: 'Farklı sektörlerde tamamladığımız projelerden oluşan referans portföyümüz, mühendislik kalitemizi, teslimat disiplinimizi ve uzun vadeli iş ortaklıklarımızı yansıtır.',
    },
    en: {
      title: 'References | Siskon',
      description: 'Review selected customer references and implementation success stories that demonstrate measurable results across multiple industries.',
    },
    ro: {
      title: 'Referințe | Siskon',
      description: 'Parcurgeți referințele clienților noștri și poveștile de succes în implementare, care demonstrează rezultate măsurabile în mai multe industrii.',
    },
  },
  '/kurumsal': {
    tr: {
      title: 'Kurumsal | Siskon',
      description: 'Siskon kurumsal sayfasında bizi tanıyın, kariyer fırsatlarını inceleyin ve kilometre taşlarımızla mühendislik yolculuğumuzu keşfedin.',
    },
    en: {
      title: 'Corporate | Siskon',
      description: 'Explore Siskon corporate content including about, careers and milestones to understand our engineering journey and culture.',
    },
    ro: {
      title: 'Compania | Siskon',
      description: 'Explorați secțiunea despre companie a Siskon, inclusiv informații despre noi, cariere și momente de referință, pentru a ne înțelege călătoria inginerească și cultura.',
    },
  },
  '/kurumsal/bizi-taniyin': {
    tr: {
      title: 'Bizi Tanıyın | Siskon',
      description: 'Siskon’un kurumsal yapısını, mühendislik yaklaşımını ve değer odaklı çalışma kültürünü tanıyın; 1997’den bu yana gelişen uzmanlığımızı keşfedin.',
    },
    en: {
      title: 'About Us | Siskon',
      description: 'Learn about Siskon’s corporate structure, engineering culture and operating principles that guide reliable industrial project delivery.',
    },
    ro: {
      title: 'Despre Noi | Siskon',
      description: 'Aflați mai multe despre structura corporativă, cultura de inginerie și principiile operaționale ale Siskon care guvernează o execuție de încredere a proiectelor industriale.',
    },
  },
  '/kurumsal/kariyer': {
    tr: {
      title: 'Kariyer | Siskon',
      description: 'Siskon kariyer sayfasında açık pozisyonları, başvuru süreçlerini ve teknoloji odaklı çalışma kültürümüzü inceleyerek gelişim fırsatlarını keşfedin.',
    },
    en: {
      title: 'Careers | Siskon',
      description: 'Explore open roles, hiring steps and growth opportunities at Siskon for professionals who build the future of industrial technology.',
    },
    ro: {
      title: 'Cariere | Siskon',
      description: 'Explorați rolurile deschise, procesele de angajare și oportunitățile de dezvoltare la Siskon, pentru profesioniștii care construiesc viitorul tehnologiei industriale.',
    },
  },
  '/kurumsal/kilometre-taslari': {
    tr: {
      title: 'Kilometre Taşları | Siskon',
      description: 'Kuruluşumuzdan bugüne uzanan kilometre taşları, Siskon’un büyüme yolculuğunu, teknoloji yatırımlarını ve global proje deneyimini kronolojik olarak özetler.',
    },
    en: {
      title: 'Milestones | Siskon',
      description: 'Track key milestones in Siskon’s journey from foundation to global delivery scale across technology investments and international projects.',
    },
    ro: {
      title: 'Momente de Referință | Siskon',
      description: 'Urmăriți momentele cheie din călătoria Siskon, de la înființare la acoperirea globală, vizând investițiile în tehnologie și proiectele internaționale.',
    },
  },
  '/iletisim': {
    tr: {
      title: 'İletişim | Siskon',
      description: 'Proje, teklif, teknik danışmanlık veya iş birliği talepleriniz için bizimle iletişime geçin; uzman ekibimiz ihtiyaçlarınıza uygun çözüm yol haritası oluştursun.',
    },
    en: {
      title: 'Contact | Siskon',
      description: 'Contact Siskon for project consultations, technical assessments, proposal requests and strategic partnership opportunities.',
    },
    ro: {
      title: 'Contact | Siskon',
      description: 'Contactați Siskon pentru consultanță de proiect, evaluări tehnice, cereri de oferte și oportunități de parteneriate strategice.',
    },
  },
  '/search': {
    tr: {
      title: 'Arama | Siskon',
      description: 'Siskon web sitesinde hizmet, ürün, sektör ve kurumsal içerikleri anahtar kelimeyle hızlıca bulun; ilgili sayfalara tek tıkla erişin.',
    },
    en: {
      title: 'Search | Siskon',
      description: 'Quickly find services, products, industries and corporate content across the Siskon website with focused keyword-based search.',
    },
    ro: {
      title: 'Căutare | Siskon',
      description: 'Găsiți rapid servicii, produse, industrii și conținut corporativ pe site-ul Siskon, folosind căutarea pe bază de cuvinte cheie.',
    },
  },
  '/yasal/kvkk': {
    tr: {
      title: 'KVKK Aydınlatma Metni | Siskon',
      description: 'KVKK kapsamında kişisel verilerin işlenme amaçlarını, saklama sürelerini, veri güvenliği uygulamalarını ve ilgili kişi başvuru haklarınızı inceleyin.',
    },
    en: {
      title: 'PDPL Notice | Siskon',
      description: 'Review our PDPL notice covering personal data processing principles, retention periods, security measures and data subject rights.',
    },
    ro: {
      title: 'Notificare GDPR | Siskon',
      description: 'Revizuiți notificarea noastră cu privire la procesarea datelor cu caracter personal, perioadele de retenție, măsurile de securitate și drepturile utilizatorilor.',
    },
  },
  '/yasal/gizlilik-politikasi': {
    tr: {
      title: 'Gizlilik Politikası | Siskon',
      description: 'Gizlilik politikamız, kişisel verilerin toplanması, işlenmesi, korunması ve kullanıcı haklarının yönetimine ilişkin temel ilkeleri şeffaf biçimde açıklar.',
    },
    en: {
      title: 'Privacy Policy | Siskon',
      description: 'Read Siskon’s privacy policy for transparent information on data collection, processing, protection practices and user rights management.',
    },
    ro: {
      title: 'Politica de Confidențialitate | Siskon',
      description: 'Citiți politica de confidențialitate Siskon pentru informații transparente despre colectarea, procesarea datelor, protecția lor și drepturile dumneavoastră.',
    },
  },
  '/yasal/cerez-politikasi': {
    tr: {
      title: 'Çerez Politikası | Siskon',
      description: 'Çerez politikamızda kullanılan çerez türlerini, kullanım amaçlarını, saklama sürelerini ve tercihlerinizi nasıl yönetebileceğinize ilişkin detayları inceleyebilirsiniz.',
    },
    en: {
      title: 'Cookie Policy | Siskon',
      description: 'Learn about cookie categories used on our website, their purposes, retention periods and how to manage your consent preferences.',
    },
    ro: {
      title: 'Politica de Cookie-uri | Siskon',
      description: 'Aflați informații despre categoriile de cookie-uri folosite pe site-ul nostru, scopurile lor, perioadele de păstrare și cum să vă gestionați preferințele.',
    },
  },
};

export const ROUTE_PATHS = Object.keys(ROUTE_META);

function normalizePath(pathname) {
  if (!pathname) return '/';
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function normalizeTitle(title, locale, minLength = 30, maxLength = 70) {
  const clean = String(title || '').replaceAll(/\s+/g, ' ').trim();
  const brandSuffix = locale === 'en'
    ? 'Siskon — Industrial Software and Automation'
    : locale === 'ro'
    ? 'Siskon — Software Industrial și Automatizare'
    : 'Siskon — Endüstriyel Yazılım ve Otomasyon';

  const parts = clean.split('|').map((part) => part.trim());
  const firstPart = parts.find((part) => part.length > 0) || '';
  const pageLabel = /siskon/i.test(firstPart) ? '' : firstPart;

  let result = pageLabel ? `${pageLabel} | ${brandSuffix}` : brandSuffix;
  if (result.length < minLength) {
    result = pageLabel
      ? `${pageLabel} | ${brandSuffix}`
      : brandSuffix;
  }
  if (result.length <= maxLength) return result;

  if (!pageLabel) {
    return brandSuffix.slice(0, maxLength).trim();
  }

  const labelMaxLength = Math.max(12, maxLength - (` | ${brandSuffix}`).length);
  const labelCandidate = pageLabel.slice(0, labelMaxLength + 1);
  const lastSpace = labelCandidate.lastIndexOf(' ');
  const cutoff = lastSpace > 8 ? lastSpace : labelMaxLength;
  const shortLabel = labelCandidate.slice(0, cutoff).trim();

  return `${shortLabel} | ${brandSuffix}`;
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
  const title = normalizeTitle(selected?.title || routeMeta.tr?.title || routeMeta.en?.title || '', locale);
  const description = normalizeDescription(selected?.description || routeMeta.tr?.description || routeMeta.en?.description || '', locale);
  const canonicalPath = toLocalizedPath(internalPath, locale);
  const canonicalUrl = new URL(canonicalPath, siteUrl).toString();
  const ogImage = '/og/siskon-default.webp';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'ro' ? 'ro_RO' : 'tr_TR',
      siteName: 'Siskon',
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
        tr: toLocalizedPath(internalPath, 'tr'),
        en: toLocalizedPath(internalPath, 'en'),
        ro: toLocalizedPath(internalPath, 'ro'),
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
  const title = normalizeTitle(selected?.title || routeMeta.tr?.title || routeMeta.en?.title || '', locale);
  const description = normalizeDescription(selected?.description || routeMeta.tr?.description || routeMeta.en?.description || '', locale);

  return {
    locale,
    internalPath,
    title,
    description,
    alternates: {
      tr: internalPath,
      en: toLocalizedPath(internalPath, 'en'),
      ro: toLocalizedPath(internalPath, 'ro'),
      xDefault: internalPath,
    },
  };
}
