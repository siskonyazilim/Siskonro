'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'Otomotiv Ana & Yan Sanayi',
    metrics: 'IATF 16949 · Hybrid Track & Trace',
    pack: 'Hybrid Track & Trace',
    sectorLabel: 'Sektör 02',
    industryTitle: 'Otomotiv Ana & Yan Sanayi',
    summary:
      'Otomotiv tedarik zincirinde tekil ürün izlenebilirliği, kritik komponent doğrulaması ve kalite hücresinin sıfır hatayla işlemesi tartışmasız zorunluluktur. Siskon Hybrid Track & Trace çözümleri, parçanın hammaddesinden müşteri hattına kadar tüm sürecinde dijital parmak izini taşır.',
    detail: '',
    needs: [
      {
        title: 'Tekil ürün izlenebilirliği',
        description: 'Hammaddeden müşteriye DataMatrix/QR ile tam zincir.',
      },
      {
        title: 'Kritik komponent doğrulama',
        description: 'Yanlış parça hattan çıkmamalı; Pick-to-Light + Poka-Yoke.',
      },
      {
        title: 'İzole geri çağırma',
        description: "100.000 parçayı değil, sadece etkilenen 200 parçayı çağırmak.",
      },
      {
        title: 'IATF 16949 denetim hazırlığı',
        description: 'Süreç, FMEA ve PPAP kayıtlarının sürekli erişilebilirliği.',
      },
    ],
    solutions: [
      {
        title: 'Hybrid Track & Trace',
        description: 'Otomotive özel paket: seri, parti, palet, kontrol planı.',
      },
      {
        title: 'OnSuite Trace + Connect',
        description: 'PLC entegrasyonlu izlenebilirlik altyapısı.',
      },
      {
        title: 'Pick-to-Light / Put-to-Light',
        description: 'Operatör hata payını fiziksel olarak elimine eden ışıklı yönlendirme.',
      },
      {
        title: 'Jidoka & Kalite Hücresi',
        description: 'Hat-içi kalite kontrol, otomatik numune ayrımı, NCM yönetimi.',
      },
      {
        title: 'Ident Gate Pro',
        description: 'Hat girişinde RFID/barkod tabanlı parça doğrulama.',
      },
    ],
    results: [
      {
        title: 'Daraltılmış geri çağırma kapsamı',
        description: 'Toplu çağırma yerine etkilenen birimlerin hedefli izolasyonu; recall maliyeti düşer.',
      },
      {
        title: 'BOM doğrulamayla sıfır hata',
        description: 'Bill of Materials bazında parça doğrulama; yanlış komponent hattan çıkamaz.',
      },
      {
        title: 'Garanti süreçleri etkinleşir',
        description: 'Her ürünün test, montaj ve sevkiyat zinciri tek sorguyla erişilebilir.',
      },
      {
        title: 'Audit riski minimize',
        description: 'Denetim öncesi veri derleme yükü ortadan kalkar.',
      },
      {
        title: 'OEE artışı',
        description: 'Darboğaz tespiti ve operasyonel iyileştirme döngüsü.',
      },
    ],
    featured: {
      mark: 'H',
      label: 'Öne Çıkan Çözüm · Track Wisely',
      title: 'Hybrid Track & Trace — Otomotiv Paketi',
      description:
        'OnSuite Trace çekirdeği üzerinde otomotiv tedarik zincirine göre yapılandırılmış sektörel paket. SICK AppSpace Partner çözümleri, RFID + Barkod + QR + Beacon multi-tech yığını.',
      linkText: 'İzlenebilirlik.com.tr →',
      linkUrl: 'https://www.izlenebilirlik.com.tr',
    },
    highlights: ['IATF 16949', 'Traceability', 'Poka-Yoke'],
    references: [
      { name: 'Bosch', logo: '/assets/Logos/Bosch-logo.svg' },
      { name: 'Phinia', logo: '/assets/Logos/phinia.svg' },
      { name: 'Delphi Technologies', logo: '/assets/Logos/delphi.svg' },
      { name: 'Nemak', logo: '/assets/Logos/nemak.svg' },
      { name: 'BorgWarner', logo: '/assets/Logos/borgwarner-seeklogo.svg' },
      { name: 'Tirsan', logo: '/assets/Logos/tirsan-seeklogo.webp' },
      { name: 'Stackpole', logo: '/assets/Logos/Stackpole.svg' },
      { name: 'Maxion İnci Çelik', logo: '/assets/Logos/maxion_inci.svg' },
      { name: 'Türk Demir Döküm', logo: '/assets/Logos/demirdokum-seeklogo.svg' },
    ],
  },
  en: {
    title: 'Automotive OEM & Supplier Ecosystem',
    metrics: 'IATF 16949 · Hybrid Track & Trace',
    pack: 'Hybrid Track & Trace',
    summary:
      'Automotive supply chains require strict unit-level traceability, critical component checks, and zero-defect quality-cell execution.',
    needs: [
      {
        title: 'Unit-level traceability',
        description: 'Full genealogy from raw material to customer delivery through DataMatrix and QR tracking.',
      },
      {
        title: 'Critical component verification',
        description: 'Wrong-part prevention at stations with Pick-to-Light and poka-yoke methods.',
      },
      {
        title: 'Isolated recalls',
        description: 'Recall only impacted units instead of broad recall campaigns.',
      },
      {
        title: 'IATF 16949 audit readiness',
        description: 'Continuous accessibility of process, FMEA, and PPAP evidence.',
      },
    ],
    solutions: [
      {
        title: 'Hybrid Track & Trace',
        description: 'Automotive-focused package with serial, lot, pallet, and control-plan mapping.',
      },
      {
        title: 'OnSuite Trace + Connect',
        description: 'PLC-integrated traceability foundation for line-level orchestration.',
      },
      {
        title: 'Pick-to-Light / Put-to-Light',
        description: 'Physical operator guidance that minimizes assembly errors.',
      },
      {
        title: 'Jidoka and quality cell',
        description: 'In-line quality controls with automatic sample handling and NCM workflows.',
      },
      {
        title: 'Ident Gate Pro',
        description: 'RFID/barcode-based part verification at line entry.',
      },
    ],
    results: [
      {
        title: 'Narrowed recall scope',
        description: 'Targeted isolation of affected units significantly reduces recall cost.',
      },
      {
        title: 'Zero wrong-part releases',
        description: 'Bill-of-material verification prevents incorrect component shipment.',
      },
      {
        title: 'Stronger warranty operations',
        description: 'Test, assembly, and dispatch history is accessible in one query.',
      },
      {
        title: 'Reduced audit risk',
        description: 'Manual pre-audit data collection workload is removed.',
      },
      {
        title: 'Measurable OEE gains',
        description: 'Bottlenecks are identified and improved with data-driven loops.',
      },
    ],
    featured: {
      mark: 'H',
      label: 'Featured Solution · Track Wisely',
      title: 'Hybrid Track & Trace - Automotive Pack',
      description:
        'An automotive-tailored package built on the OnSuite Trace core with RFID, barcode, QR, and beacon technologies.',
      linkText: 'izlenebilirlik.com.tr →',
      linkUrl: 'https://www.izlenebilirlik.com.tr',
    },
    highlights: ['IATF-aligned flow', 'Critical component verification', 'Recall scope reduction'],
    references: [
      { name: 'Bosch', logo: '/assets/Logos/Bosch-logo.svg' },
      { name: 'Phinia', logo: '/assets/Logos/phinia.svg' },
      { name: 'Delphi Technologies', logo: '/assets/Logos/delphi.svg' },
      { name: 'Nemak', logo: '/assets/Logos/nemak.svg' },
      { name: 'BorgWarner', logo: '/assets/Logos/borgwarner-seeklogo.svg' },
      { name: 'Tirsan', logo: '/assets/Logos/tirsan-seeklogo.webp' },
      { name: 'Stackpole', logo: '/assets/Logos/Stackpole.svg' },
      { name: 'Maxion Inci Celik', logo: '/assets/Logos/maxion_inci.svg' },
      { name: 'Turk Demir Dokum', logo: '/assets/Logos/demirdokum-seeklogo.svg' },
    ],
  },
};

export default function OtomotivPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
