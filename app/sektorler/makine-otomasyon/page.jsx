'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'Makine, Proses & CNC Otomasyonu',
    metrics: 'Machine Whispering Solutions',
    pack: 'OnSuite CNC',
    sectorLabel: 'Sektör 06',
    industryTitle: 'Makine, Proses & CNC Otomasyonu',
    summary:
      'Siskon\'un üretim hattındaki sloganı: "Makinelerin fısıldamasını bizden daha iyi kimse anlayamaz." Bu yetkinlikle 25+ yıldır montaj, paketleme ve dolum makinelerinden kaplama ve galvaniz tesislerine, servo/motion uygulamalarından çok markalı CNC parkurlarına ve fabrika geneli SCADA omurgalarına kadar üretim hattının her noktasında otomasyon teslim ediyoruz. Teknoloji yığını sektörden değil, mühendislikten gelir.',
    needs: [
      { title: 'Makine otomasyonu', description: 'Montaj, paketleme ve dolum hatlarında PLC + HMI çözümleri.' },
      {
        title: 'Proses otomasyonu',
        description: 'Galvaniz, eloksal, çinko, kimyasal temizleme; çok istasyonlu hat kontrolü.',
      },
      {
        title: 'Çok markalı CNC parkuru',
        description: 'Siemens, Fanuc, Heidenhain, Mazak, Mori Seiki tek arayüzde.',
      },
      { title: 'Servo & motion uygulamaları', description: 'Hassas pozisyonlama, çoklu eksen koordinasyonu.' },
      {
        title: 'Güvenlik otomasyonu',
        description: 'PL/SIL kademeli güvenlik mantığı, devreden çıkarma senaryoları.',
      },
    ],
    solutions: [
      {
        title: 'OnSuite CNC',
        description: 'MTConnect, OPC UA, Siemens S7, Fanuc Focas, Heidenhain entegrasyonu.',
      },
      {
        title: 'OnSuite Connect + Live + Optima',
        description: 'Veri toplama, OEE, alarm geçmişi, kestirimci bakım uyarıları.',
      },
      {
        title: 'Özel SCADA & HMI geliştirme',
        description: 'WinCC Professional veya özel platformda fabrika geneli görselleştirme.',
      },
      {
        title: 'Pano tasarımı + saha teslim',
        description: 'Donanım seçimi, pano üretimi, PLC/HMI yazılım, devreye alma, eğitim.',
      },
      {
        title: 'Patent portföyü',
        description: 'PCT dahil ulusal ve uluslararası CNC patent başvuruları.',
      },
    ],
    results: [
      {
        title: 'Tek tedarikçiden eksiksiz teslim',
        description: 'Donanımdan yazılıma, devreye almadan eğitime kadar tek elden.',
      },
      {
        title: 'Çok markalı parkur, tek arayüz',
        description: 'Yöneticilerin onlarca panele bakma yükü ortadan kalkar.',
      },
      {
        title: 'Plansız duruşlarda azalma',
        description: 'Takım aşınması ve kritik alarm korelasyonuyla kestirimci bakım.',
      },
      {
        title: 'CapEx korunması',
        description: 'Mevcut makine parkuru üzerinde yazılım yatırımıyla kazanım.',
      },
      {
        title: 'Bilimsel/IP zemin',
        description: 'Patent portföyü, çözüme akademik ve hukuki zemin sağlar.',
      },
    ],
    featured: {
      mark: 'C',
      label: 'Öne Çıkan Modül',
      title: 'OnSuite CNC — Çok Markalı CNC Bütünleşmesi',
      description:
        'PCT dahil patent başvurularıyla korunan, MTConnect ve OPC UA tabanlı tek arayüz çözümü. TEI, Phinia, Nemak referansları.',
      linkText: 'OnSuite CNC →',
      linkUrl: '/onsuite',
    },
    caseStudy: {
      label: 'Saha Örneği',
      title: 'Kaplama Tesisi Otomasyonu — Galvaniz Hattı',
      description:
        'Yağ alma → durulama → kimyasal temizleme → eloksal → çinko → galvaniz → yıkama istasyonlarının senkron kontrolü; saha üzerindeki Andon panelinden gerçek zamanlı Hedef / Üretim / Fark / Verim KPI\'larıyla izleme. SICK sensör entegrasyonu, Beckhoff TwinCAT PLC ve özel SCADA katmanı ile uçtan uca teslim.',
    },
    techStack: [
      'Siemens TIA Portal',
      'SIMATIC',
      'Beckhoff TwinCAT',
      'CODESYS',
      'WinCC Professional',
      'OPC UA',
      'SICK AppSpace',
      'MTConnect',
      'Fanuc Focas',
      'Heidenhain',
    ],
    references: [
      { name: 'TEI (TUSAŞ)', logo: '/assets/Logos/TEI.svg' },
      { name: 'Phinia', logo: '/assets/Logos/phinia.svg' },
      { name: 'Nemak', logo: '/assets/Logos/nemak.svg' },
      { name: 'BorgWarner', logo: '/assets/Logos/borgwarner-seeklogo.svg' },
    ],
  },
  en: {
    title: 'Machinery, Process & CNC Automation',
    metrics: 'Machine Whispering Solutions',
    pack: 'OnSuite CNC',
    summary:
      'From assembly lines to process plants and multi-brand CNC fleets, Siskon delivers end-to-end automation engineering through one consistent architecture.',
    needs: [
      { title: 'Machine automation', description: 'PLC and HMI solutions for assembly, packaging, and filling lines.' },
      {
        title: 'Process automation',
        description: 'Multi-station control for galvanizing, anodizing, chemical cleaning, and surface-treatment lines.',
      },
      {
        title: 'Multi-brand CNC environments',
        description: 'Unified supervision across Siemens, Fanuc, Heidenhain, Mazak, and Mori Seiki machines.',
      },
      { title: 'Servo and motion control', description: 'Precise positioning and multi-axis coordination for complex workflows.' },
      { title: 'Functional safety automation', description: 'PL/SIL-based safety logic and secure bypass scenarios.' },
    ],
    solutions: [
      {
        title: 'OnSuite CNC',
        description: 'Integration layer for MTConnect, OPC UA, Siemens S7, Fanuc FOCAS, and Heidenhain.',
      },
      {
        title: 'OnSuite Connect + Live + Optima',
        description: 'Data acquisition, OEE, alarm history, and predictive maintenance signals.',
      },
      {
        title: 'Custom SCADA and HMI engineering',
        description: 'Plant-wide visualization using WinCC Professional or custom platforms.',
      },
      {
        title: 'Panel design and field delivery',
        description: 'Hardware selection, panel build, PLC/HMI software, commissioning, and training.',
      },
      {
        title: 'Patent-backed methods',
        description: 'CNC-focused intellectual property portfolio including PCT filings.',
      },
    ],
    results: [
      {
        title: 'Complete single-vendor delivery',
        description: 'One partner from hardware and software to commissioning and training.',
      },
      {
        title: 'One interface for multi-brand fleets',
        description: 'Operations teams no longer need to monitor dozens of disconnected panels.',
      },
      {
        title: 'Reduced unplanned downtime',
        description: 'Predictive maintenance supported by tool wear and alarm correlation.',
      },
      {
        title: 'CapEx protection',
        description: 'Higher return from existing machine parks through software-led improvements.',
      },
      {
        title: 'Stronger technical IP foundation',
        description: 'Patents provide scientific and legal grounding for deployed methods.',
      },
    ],
    featured: {
      mark: 'C',
      label: 'Featured Module',
      title: 'OnSuite CNC - Multi-Brand CNC Integration',
      description:
        'Single-interface CNC integration platform based on MTConnect and OPC UA, protected by patent applications including PCT.',
      linkText: 'OnSuite CNC →',
      linkUrl: '/onsuite',
    },
    caseStudy: {
      label: 'Field Case',
      title: 'Surface Treatment Plant Automation - Galvanizing Line',
      description:
        'Synchronized control for degreasing, rinsing, chemical cleaning, anodizing, zinc, galvanizing, and washing stations with live KPI monitoring via Andon panels.',
    },
    techStack: [
      'Siemens TIA Portal',
      'SIMATIC',
      'Beckhoff TwinCAT',
      'CODESYS',
      'WinCC Professional',
      'OPC UA',
      'SICK AppSpace',
      'MTConnect',
      'Fanuc Focas',
      'Heidenhain',
    ],
    highlights: ['PLC/SCADA integration', 'Predictive maintenance readiness', 'Multi-brand CNC unification'],
    references: [
      { name: 'TEI', logo: '/assets/Logos/TEI.svg' },
      { name: 'Phinia', logo: '/assets/Logos/phinia.svg' },
      { name: 'Nemak', logo: '/assets/Logos/nemak.svg' },
      { name: 'BorgWarner', logo: '/assets/Logos/borgwarner-seeklogo.svg' },
    ],
  },
};

export default function MakineOtomasyonPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
