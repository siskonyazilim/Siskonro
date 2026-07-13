'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'İlaç & Sağlık Ürünleri',
    metrics: 'GMP · Serileştirme · Capsule T&T',
    pack: 'Capsule Track & Trace',
    sectorLabel: 'Sektör 05',
    industryTitle: 'İlaç & Sağlık Ürünleri',
    summary:
      'İlaç üretiminde serileştirme, parti, son kullanma tarihi ve soğuk zincir izleme kanunla zorunludur ve sıfır hata toleransıyla yönetilmelidir. Capsule Track & Trace çözümümüz, ilaç hatlarının ve depolarının GMP uyumlu, sürekli denetlenebilir bir veri omurgasına oturmasını sağlar.',
    needs: [
      { title: 'Birim seviyesinde serileştirme', description: 'Her kutu, blister ve şişenin tekil dijital kimliği.' },
      { title: 'GMP uyumu & doğrulama', description: '21 CFR Part 11, sistem doğrulama (validation) kayıtları.' },
      { title: 'Soğuk zincir izleme', description: 'Hammaddeden müşteriye sıcaklık ve nem kayıtları.' },
      { title: 'İTS / İlaç Takip Sistemi entegrasyonu', description: 'Türkiye Sağlık Bakanlığı sistemiyle uyum.' },
    ],
    solutions: [
      { title: 'Capsule Track & Trace', description: 'İlaç sektörüne özel sektörel paket.' },
      { title: 'OnSuite Trace', description: 'Seri, parti, son kullanma tarihi yönetimi.' },
      { title: 'OnSuite Forms (DSF)', description: 'Hat-içi kalite kontrol formları, validation kayıtları.' },
      { title: 'Vision Sistemleri', description: 'Yapay zeka destekli paket içerik ve etiket doğrulaması.' },
    ],
    results: [
      { title: 'Sahteciliğe karşı dijital kimlik', description: 'Her birimin sahada doğrulanabilir geçmişi.' },
      { title: 'Hızlı denetim hazırlığı', description: 'Müfettiş geldiğinde anında raporlanabilir veri.' },
      { title: 'Hata oranında azalma', description: 'Görüntü işleme + barkod doğrulama ile çift katman güvence.' },
      { title: 'İhracat uyumu', description: 'AB, ABD ve diğer pazarların serileştirme şartlarına hazırlık.' },
    ],
    referencesTitle: 'Çözüm Ortakları',
    references: [
      { name: 'SICK RFID', logo: '/assets/Logos/sick.svg' },
      { name: 'Beckhoff', logo: '/assets/Logos/Beckhoff_red.svg' },
      { name: 'Markem-Imaje', logo: '/assets/Logos/project_markem.svg' },
    ],
  },
  en: {
    title: 'Pharma & Health Products',
    metrics: 'GMP · Serialization · Capsule T&T',
    pack: 'Capsule Track & Trace',
    summary:
      'Serialization, lot and expiry tracking, and cold-chain traceability are mandatory and must be managed with zero-defect governance in pharmaceutical operations.',
    needs: [
      { title: 'Unit-level serialization', description: 'Unique digital identity for each carton, blister, and bottle.' },
      { title: 'GMP compliance and validation', description: '21 CFR Part 11 alignment and validated system records.' },
      { title: 'Cold-chain monitoring', description: 'Temperature and humidity logs from raw material to customer delivery.' },
      { title: 'ITS integration', description: 'Compliance with national pharmaceutical track-and-trace systems.' },
    ],
    solutions: [
      { title: 'Capsule Track & Trace', description: 'Industry package designed for pharmaceutical operations.' },
      { title: 'OnSuite Trace', description: 'Serialization, lot, and expiry lifecycle management.' },
      { title: 'OnSuite Forms (DSF)', description: 'In-line quality forms and digital validation records.' },
      { title: 'Vision Systems', description: 'AI-assisted package content and labeling verification.' },
    ],
    results: [
      { title: 'Anti-counterfeit digital identity', description: 'Each unit has a verifiable field history and provenance.' },
      { title: 'Faster audit readiness', description: 'Inspection evidence is reportable immediately when needed.' },
      { title: 'Lower defect rates', description: 'Dual-layer assurance through machine vision and barcode checks.' },
      { title: 'Export compliance readiness', description: 'Prepared for serialization requirements across global markets.' },
    ],
    highlights: ['Serialization governance', 'Cold-chain visibility', 'Audit-ready compliance'],
    referencesTitle: 'Solution Partners',
    references: [
      { name: 'SICK RFID', logo: '/assets/Logos/sick.svg' },
      { name: 'Beckhoff', logo: '/assets/Logos/Beckhoff_red.svg' },
      { name: 'Markem-Imaje', logo: '/assets/Logos/project_markem.svg' },
    ],
  },
};

export default function IlacPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
