'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'Enerji, Kimya & Sürdürülebilirlik',
    metrics: 'SCADA · CBAM · TÜBİTAK + EUROGIA',
    pack: 'OnSuite Green',
    sectorLabel: 'Sektör 08',
    industryTitle: 'Enerji, Kimya & Sürdürülebilirlik',
    summary:
      'Avrupa Yeşil Mutabakatı, CBAM ve ESG raporlaması artık ihracatçı sanayinin gündeminde en üstte. OnSuite Green - TÜBİTAK ve EUROGIA2030 destekli karbon ayak izi platformumuz fabrikaların enerji tüketimini, üretim çıktısını ve karbon ayak izini tek sistemde ölçer ve raporlar.',
    referencesTitle: 'Çözüm Ortakları',
    needs: [
      {
        title: 'SCADA & proses otomasyonu',
        description: 'Kesintisiz akış için kararlı saha kontrol altyapısı.',
      },
      {
        title: 'Enerji tüketim görünürlüğü',
        description: 'Hat, ekipman ve süreç bazında elektrik, doğalgaz, su, hava.',
      },
      {
        title: 'CBAM & karbon raporlaması',
        description: 'AB Sınırda Karbon Düzenlemesine uyum.',
      },
      {
        title: 'ESG & sürdürülebilirlik',
        description: 'Yatırımcı ve müşteri talepleri için raporlanabilir veri.',
      },
    ],
    solutions: [
      {
        title: 'OnSuite Green',
        description: 'Karbon ayak izi platformu; TÜBİTAK ve EUROGIA2030 destekli.',
      },
      {
        title: 'OnSuite Energy',
        description: 'Saha enerji analizörleri entegrasyonu, hat bazında tüketim.',
      },
      {
        title: 'Proses Otomasyonu',
        description: 'Siemens, Allen-Bradley, Beckhoff tabanlı SCADA çözümleri.',
      },
      {
        title: 'RIO-Energy Donanımı',
        description: 'Siskon mühendisliğiyle geliştirilmiş IoT enerji ölçüm donanımı.',
      },
    ],
    results: [
      {
        title: 'Karbon raporlaması otomatize olur',
        description: 'Manuel hesap yerine sistemden direkt raporlama.',
      },
      {
        title: 'Enerji tasarrufu',
        description: 'Görünmeyen tüketim noktalarının tespiti ile ölçülebilir kazanım.',
      },
      {
        title: 'İhracat avantajı',
        description: 'CBAM dosyaları, AB müşteri talepleri karşılanır.',
      },
      {
        title: 'ESG raporları zenginleşir',
        description: 'Yatırımcıya sunulabilir veri tabanlı sürdürülebilirlik anlatımı.',
      },
    ],
    featured: {
      mark: 'C+',
      label: 'Öne Çıkan Platform',
      title: 'OnSuite Green — Karbon & Enerji Platformu',
      description:
        'TÜBİTAK ve EUROGIA2030 destekli, CBAM ve ESG raporlamasına yönelik karbon ayak izi yönetim platformu.',
      linkText: 'OnSuite Green →',
      linkUrl: '/onsuite',
    },
    references: [],
  },
  en: {
    title: 'Energy, Chemicals & Sustainability',
    metrics: 'SCADA · CBAM · TÜBİTAK + EUROGIA',
    pack: 'OnSuite Green',
    summary:
      'CBAM and ESG requirements demand a unified platform to measure, manage, and report energy and emissions performance.',
    referencesTitle: 'Solution Partners',
    needs: [
      {
        title: 'SCADA and process automation',
        description: 'Reliable field-control architecture for uninterrupted industrial operations.',
      },
      {
        title: 'Energy consumption visibility',
        description: 'Track electricity, gas, water, and compressed air by line and equipment.',
      },
      {
        title: 'CBAM and carbon reporting',
        description: 'Prepare compliant reporting workflows for EU Carbon Border Adjustment requirements.',
      },
      {
        title: 'ESG transparency',
        description: 'Produce auditable sustainability data for investors and customers.',
      },
    ],
    solutions: [
      {
        title: 'OnSuite Green',
        description: 'Carbon intelligence platform supported by TUBITAK and EUROGIA2030 programs.',
      },
      {
        title: 'OnSuite Energy',
        description: 'Integration with field analyzers and line-level consumption monitoring.',
      },
      {
        title: 'Process automation engineering',
        description: 'SCADA solutions built on Siemens, Allen-Bradley, and Beckhoff ecosystems.',
      },
      {
        title: 'RIO-Energy hardware',
        description: 'Siskon-engineered IoT hardware for industrial energy measurement.',
      },
    ],
    results: [
      {
        title: 'Automated carbon reporting',
        description: 'Replace manual calculations with system-generated reporting outputs.',
      },
      {
        title: 'Measurable energy savings',
        description: 'Hidden consumption points become visible and actionable.',
      },
      {
        title: 'Export competitiveness',
        description: 'Meet CBAM-related documentation requests from EU customers.',
      },
      {
        title: 'Richer ESG storytelling',
        description: 'Provide investor-grade sustainability narratives backed by real data.',
      },
    ],
    featured: {
      mark: 'C+',
      label: 'Featured Platform',
      title: 'OnSuite Green - Carbon and Energy Platform',
      description:
        'A carbon-footprint management platform focused on CBAM and ESG reporting, supported by TUBITAK and EUROGIA2030 programs.',
      linkText: 'OnSuite Green →',
      linkUrl: '/onsuite',
    },
    highlights: ['CBAM readiness', 'Energy intelligence', 'ESG reporting'],
    references: [],
  },
};

export default function EnerjiKimyaPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
