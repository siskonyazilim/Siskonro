'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'Beyaz Eşya & Ev Aletleri',
    metrics: 'A+++ Track & Trace · Yüksek Hacim',
    pack: 'A+++ Track & Trace',
    sectorLabel: 'Sektör 03',
    industryTitle: 'Beyaz Eşya & Ev Aletleri',
    summary:
      'Beyaz eşya hatları dakikada onlarca ürün akışıyla, çok varyantlı SKU sıralı montajı, çok istasyonlu hat-içi testleri (high-pot, final test, performans testi) ve müşteri-paket eşleşmesini aynı anda yönetir. BSH, Vestel, Whirlpool ve Haier hatlarında konuşlanmış sistemlerimiz, bu mühendislik problemini ürün başına kalite, enerji ve OEE verisinin izlenebilirliğine indirger.',
    detail: '',
    needs: [
      {
        title: 'Sıralı çok-varyantlı montaj',
        description: "Aynı hatta farklı SKU'ların doğru ECU, etiket ve aksesuarla eşleşmesi.",
      },
      {
        title: 'Hat-içi test istasyonu entegrasyonu',
        description: 'High-pot, fonksiyonel test, final QC sonuçlarının ürünle bağlanması.',
      },
      {
        title: 'Müşteri-paket izi',
        description: 'Sevkiyat öncesi ürün-paket-palet zincirinin tekil doğrulanması.',
      },
      {
        title: 'Enerji ve karbon görünürlüğü',
        description: 'Hat, pres, fırın, montaj bazında elektrik, hava ve gaz tüketimi.',
      },
    ],
    solutions: [
      {
        title: 'A+++ Track & Trace',
        description: 'Beyaz eşyaya özel sektörel paket; ürün başına dijital pasaport.',
      },
      {
        title: 'OnSuite Connect + Trace',
        description: "Test istasyonları, barkod okuyucular ve PLC'lerden veri entegrasyonu.",
      },
      {
        title: 'OnSuite Live + Optima',
        description: 'Hat verim takibi, varyant sıralama ve OEE analitiği.',
      },
      {
        title: 'OnSuite Energy',
        description: 'Hat, ekipman, vardiya bazında enerji verisi.',
      },
      {
        title: 'OnSuite Green',
        description: 'Ürün karbon ayak izi ve CBAM raporlamasına hazırlık.',
      },
    ],
    results: [
      {
        title: 'Sıfır karışıklık yetkilendirmesi',
        description: 'Yanlış ECU veya aksesuar hattan çıkamaz; Poka-Yoke + barkod.',
      },
      {
        title: 'Test geçmişi her ürünle bağlı',
        description: 'Müşteri reklamasyonunda anında ürünün test kaydı erişilebilir.',
      },
      {
        title: "OEE'de ölçülebilir iyileşme",
        description: 'Darboğaz noktalarının veri tabanlı kararlarla iyileştirilmesi.',
      },
      {
        title: 'İhracat uyumu',
        description: 'AB Eco-design, ürün pasaportu ve CBAM dosyaları için altyapı.',
      },
    ],
    featured: {
      mark: 'A+',
      label: 'Sektörel Paket',
      title: 'A+++ Track & Trace — Beyaz Eşya',
      description:
        'Yüksek hacimli beyaz eşya hatları için optimize edilmiş izlenebilirlik. BSH, Vestel, Whirlpool ve Haier dahil global referanslar.',
      linkText: 'Detayları Gör →',
      linkUrl: 'https://www.izlenebilirlik.com.tr',
    },
    highlights: ['A+++ Track & Trace', 'OEE', 'Energy'],
    references: [
      { name: 'BSH Hausgeräte', logo: '/assets/Logos/BSH_Bosch_und_Siemens_Hausgerate_logo.svg' },
      { name: 'Vestel', logo: '/assets/Logos/Vestel_logo.svg' },
      { name: 'Whirlpool', logo: '/assets/Logos/whirlpool_corporation_logo_-as_of_2017.svg' },
      { name: 'Haier Europe', logo: '/assets/Logos/Haier_logo.svg' },
      { name: 'Bosch', logo: '/assets/Logos/Bosch-logo.svg' },
      { name: 'Groupe Atlantic', logo: '/assets/Logos/groupe-atlantic-logo-vector.svg' },
    ],
  },
  en: {
    title: 'White Goods & Home Appliances',
    metrics: 'A+++ Track & Trace · High Volume',
    pack: 'A+++ Track & Trace',
    summary:
      'High-volume white goods production requires synchronized control of variant flow, in-line testing, and product-package matching.',
    needs: [
      {
        title: 'Sequenced multi-variant assembly',
        description: 'Correct ECU, labels, and accessories must match each SKU on the same line.',
      },
      {
        title: 'In-line test station integration',
        description: 'High-pot, functional, and final QC results must be linked to each unit.',
      },
      {
        title: 'Product-to-package traceability',
        description: 'Verified product-package-pallet chain before shipment.',
      },
      {
        title: 'Energy and carbon visibility',
        description: 'Electricity, air, and gas consumption by line, press, oven, and assembly stage.',
      },
    ],
    solutions: [
      {
        title: 'A+++ Track & Trace',
        description: 'White-goods-specific package with unit-level digital passporting.',
      },
      {
        title: 'OnSuite Connect + Trace',
        description: 'Data integration from test stations, scanners, and PLC infrastructure.',
      },
      {
        title: 'OnSuite Live + Optima',
        description: 'Line performance monitoring, variant sequencing, and OEE analytics.',
      },
      {
        title: 'OnSuite Energy',
        description: 'Energy monitoring by line, equipment, and shift.',
      },
      {
        title: 'OnSuite Green',
        description: 'Product carbon footprint readiness and CBAM reporting support.',
      },
    ],
    results: [
      {
        title: 'Zero mix-up assurance',
        description: 'Wrong ECU or accessory release is prevented with poka-yoke and barcode controls.',
      },
      {
        title: 'Test history tied to every product',
        description: 'Customer claims can be investigated instantly with linked test evidence.',
      },
      {
        title: 'Measurable OEE improvement',
        description: 'Bottlenecks are optimized through data-based operational decisions.',
      },
      {
        title: 'Export compliance readiness',
        description: 'Supports EU eco-design, product passport, and CBAM documentation needs.',
      },
    ],
    featured: {
      mark: 'A+',
      label: 'Industry Package',
      title: 'A+++ Track & Trace - White Goods',
      description:
        'Traceability package optimized for high-volume white goods lines with global references including BSH, Vestel, Whirlpool, and Haier.',
      linkText: 'View Details →',
      linkUrl: 'https://www.izlenebilirlik.com.tr',
    },
    highlights: ['Variant-safe assembly', 'In-line test traceability', 'Energy and OEE visibility'],
    references: [
      { name: 'BSH Hausgerate', logo: '/assets/Logos/BSH_Bosch_und_Siemens_Hausgerate_logo.svg' },
      { name: 'Vestel', logo: '/assets/Logos/Vestel_logo.svg' },
      { name: 'Whirlpool', logo: '/assets/Logos/whirlpool_corporation_logo_-as_of_2017.svg' },
      { name: 'Haier Europe', logo: '/assets/Logos/Haier_logo.svg' },
      { name: 'Bosch', logo: '/assets/Logos/Bosch-logo.svg' },
      { name: 'Groupe Atlantic', logo: '/assets/Logos/groupe-atlantic-logo-vector.svg' },
    ],
  },
};

export default function BeyazEsyaPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
