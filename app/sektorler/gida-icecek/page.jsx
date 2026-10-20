'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'Gıda & İçecek',
    metrics: 'ISO 22005:2007 · Organic Track & Trace',
    pack: 'Organic Track & Trace',
    sectorLabel: 'Sektör 04',
    industryTitle: 'Gıda & İçecek',
    summary:
      'Gıda sektöründe izlenebilirlik, hammaddeden rafa parti zincirinin, kritik kontrol noktalarının (CCP) ve check-weigher / metal dedektör kayıtlarının bütün olarak yönetilmesini gerektirir. Organic Track & Trace, ISO 22005 uyumuyla bu zincirin kopuk halkalarını birleştirir ve geri çağırma anında saniyeler içinde kapsamı netleştirir.',
    detail: '',
    needs: [
      {
        title: 'Hammadde → ürün → raf parti zinciri',
        description: 'Her partinin hangi hammaddeden, hangi reçeteyle, hangi vardiyada üretildiğinin kaydı.',
      },
      {
        title: 'Kritik kontrol noktası (CCP) verisi',
        description: 'Metal dedektör, check-weigher, pastörizasyon sıcaklık-zaman kayıtları.',
      },
      {
        title: 'CIP / SIP süreç doğrulaması',
        description: 'Temizleme ve sterilizasyon sirkülasyon, sıcaklık ve süre verisi.',
      },
      {
        title: 'Hızlı ve dar geri çağırma',
        description: 'Toplu çağırma yerine yalnızca etkilenen partilerin hedeflenmesi.',
      },
      {
        title: 'MES ↔ ERP senkronu',
        description: 'Reçete, allergen ve sevkiyat verisinin sistemler arası tutarlılığı.',
      },
    ],
    solutions: [
      {
        title: 'Organic Track & Trace',
        description: 'ISO 22005:2007 uyumlu, gıdaya özel sektörel paket.',
      },
      {
        title: 'OnSuite Trace',
        description: 'Parti/lot yönetimi, ürün ağacı, kritik komponent kontrolü.',
      },
      {
        title: 'OnSuite Connect',
        description: 'Metal dedektör, check-weigher, dolum makinesi PLC entegrasyonu.',
      },
      {
        title: 'OnSuite Forms (DSF)',
        description: 'CCP/HACCP saha kontrol formları, denetim kayıtları.',
      },
      {
        title: 'OnSuite Integra',
        description: 'MES ↔ ERP köprüsü: reçete, allergen, sevkiyat verisinin senkronu.',
      },
    ],
    results: [
      {
        title: 'Geri çağırma kapsamı belirgin daralır',
        description: 'Toplu çağırma yerine etkilenen partilerin izolasyonu.',
      },
      {
        title: 'CCP kayıtları denetlenebilir',
        description: 'Sıcaklık, ağırlık, metal dedektör reddi her partiyle bağlı.',
      },
      {
        title: 'HACCP & ISO 22005 hazırlığı',
        description: 'Denetim öncesi haftalarca veri derleme yükü ortadan kalkar.',
      },
      {
        title: 'İhracat uyumu',
        description: 'AB pazarına izlenebilirlik şartlarıyla uyumlu üretim.',
      },
    ],
    featured: {
      mark: 'O',
      label: 'Sektörel Paket',
      title: 'Organic Track & Trace — ISO 22005:2007',
      description:
        'Gıda güvenliği zincirinin tamamı için izlenebilirlik paketi. Mey Diageo, Türk Tuborg, Ajinomoto ve Duru Bulgur dahil referanslar.',
      linkText: 'Detayları Gör →',
      linkUrl: 'https://www.izlenebilirlik.com.tr',
    },
    highlights: ['ISO 22005:2007', 'Organic Track & Trace', 'HACCP'],
    references: [
      { name: 'Mey Diageo', logo: '/assets/Logos/mey-diageo.svg' },
      { name: 'Türk Tuborg', logo: '/assets/Logos/turk-tuborg_logo.svg' },
      { name: 'Ajinomoto', logo: '/assets/Logos/ajinomoto-global-seeklogo.svg' },
      { name: 'Duru Bulgur', logo: '/assets/Logos/durubulgur-min-removebg-preview.webp' },
      { name: 'Orkide', logo: '/assets/Logos/orkide_yag-removebg-preview.png' },
      { name: 'Bomi Group', logo: '/assets/Logos/bomi-international-vector-logo.svg' },
    ],
  },
  en: {
    title: 'Food & Beverage',
    metrics: 'ISO 22005:2007 · Organic Track & Trace',
    pack: 'Organic Track & Trace',
    summary:
      'Food traceability requires unified management of lot genealogy, CCP records, and inspection data from raw material intake to shelf.',
    needs: [
      {
        title: 'Raw material to shelf lot genealogy',
        description: 'Record which lot, recipe, and shift produced each final batch.',
      },
      {
        title: 'Critical Control Point data',
        description: 'Capture metal detector, check-weigher, and pasteurization time-temperature records.',
      },
      {
        title: 'CIP/SIP process validation',
        description: 'Track cleaning and sterilization circulation, temperature, and duration.',
      },
      {
        title: 'Fast and narrow recall execution',
        description: 'Target only affected lots instead of broad recall actions.',
      },
      {
        title: 'MES to ERP synchronization',
        description: 'Consistent recipe, allergen, and shipment data across systems.',
      },
    ],
    solutions: [
      {
        title: 'Organic Track & Trace',
        description: 'Food-specific package aligned with ISO 22005:2007.',
      },
      {
        title: 'OnSuite Trace',
        description: 'Lot management, product genealogy, and critical component control.',
      },
      {
        title: 'OnSuite Connect',
        description: 'PLC integration for metal detectors, check-weighers, and filling equipment.',
      },
      {
        title: 'OnSuite Forms (DSF)',
        description: 'CCP/HACCP field forms and audit evidence records.',
      },
      {
        title: 'OnSuite Integra',
        description: 'MES-ERP bridge for synchronized recipe, allergen, and shipment data.',
      },
    ],
    results: [
      {
        title: 'Significantly reduced recall scope',
        description: 'Affected lots can be isolated precisely instead of mass recalls.',
      },
      {
        title: 'Auditable CCP evidence',
        description: 'Temperature, weight, and reject data are linked to each lot.',
      },
      {
        title: 'Faster HACCP and ISO readiness',
        description: 'Weeks of manual pre-audit data consolidation are eliminated.',
      },
      {
        title: 'Improved export compliance',
        description: 'Production is aligned with traceability expectations for EU markets.',
      },
    ],
    featured: {
      mark: 'O',
      label: 'Industry Package',
      title: 'Organic Track & Trace - ISO 22005:2007',
      description:
        'A full food-safety traceability package with references including Mey Diageo, Turk Tuborg, Ajinomoto, and Duru Bulgur.',
      linkText: 'View Details →',
      linkUrl: 'https://www.izlenebilirlik.com.tr',
    },
    highlights: ['Lot genealogy', 'CCP evidence', 'Recall scope reduction'],
    references: [
      { name: 'Mey Diageo', logo: '/assets/Logos/mey-diageo.svg' },
      { name: 'Turk Tuborg', logo: '/assets/Logos/turk-tuborg_logo.svg' },
      { name: 'Ajinomoto', logo: '/assets/Logos/ajinomoto-global-seeklogo.svg' },
      { name: 'Duru Bulgur', logo: '/assets/Logos/durubulgur-min-removebg-preview.webp' },
      { name: 'Orkide', logo: '/assets/Logos/orkide_yag-removebg-preview.png' },
      { name: 'Bomi Group', logo: '/assets/Logos/bomi-international-vector-logo.svg' },
    ],
  },
};

export default function GidaIcecekPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
