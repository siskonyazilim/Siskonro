'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'Tütün Endüstrisi',
    metrics: '9 Ülke · 300 Makine · 28 OEM',
    pack: 'OnSuite TMC',
    sectorLabel: 'Sektör 01',
    industryTitle: 'Tütün Endüstrisi',
    summary:
      'Tütün üretimi; OPC UA standardındaki makinelerin (MoM), GSCA olay yönetiminin ve TPD/track-and-trace mevzuatının aynı anda yönetilmesini gerektirir. Siskon OnSuite TMC (Tobacco Machine Communication) çözümü, tütün makineleri için vendor-neutral ve OPC UA tabanlı standart veri iletişimini sahaya taşır.',
    detail:
      'JTI, Philip Morris ve Philsa dahil olmak üzere 9 ülkede, 28 farklı OEM markasına ait 300 bağlı makinede aktif olarak çalışmaktadır.',
    kpis: [
      { value: '9', title: 'Ülke', note: 'OPC UA TMC kurulumu' },
      { value: '300+', title: 'Bağlı Makine', note: 'aktif veri akışı' },
      { value: '13', title: 'Conformance Unit', note: 'OPC UA TMC kapsamı' },
      { value: '28', title: 'Farklı OEM', note: 'Hauni, Decoufle, GD, Comas ve diğerleri' },
    ],
    needs: [
      {
        title: 'Çok markalı makine parkuru',
        description: 'Hauni, Decoufle, Comas, GD ve daha birçok marka; her biri farklı haberleşme yaklaşımıyla çalışır.',
      },
      {
        title: 'GSCA olay yönetimi',
        description: 'Kalite ve güvenlik olaylarının uçtan uca izlenmesi ve denetim hazırlığının sürdürülebilir hale getirilmesi gerekir.',
      },
      {
        title: 'TPD ve tekil ürün izleme',
        description: 'AB Tütün Ürünleri Direktifi kapsamındaki zorunlu serileştirme süreçleri güvenilir biçimde yönetilmelidir.',
      },
      {
        title: 'MES/SCADA/historian entegrasyonu',
        description: 'Mevcut kurumsal sistemlerle hızlı ve kesintisiz entegrasyon beklentisi vardır.',
      },
      {
        title: 'Hızlı devreye alma',
        description: 'Mühendislik eforunu ve başlangıç süresini düşüren, standart bir devreye alma yaklaşımı gerekir.',
      },
    ],
    solutions: [
      {
        title: 'OnSuite TMC - Vendor-Neutral',
        description: 'OPC UA Tobacco Machine Communication standardı ile marka bağımsız, lock-in riski taşımayan bir mimari sunar.',
      },
      {
        title: '13 Conformance Unit desteği',
        description: 'Cigarette Maker, Filter Maker, Packer, Tipper ve Cooler dahil geniş makine sınıfı kapsaması sağlar.',
      },
      {
        title: 'Güvenli OPC UA mimarisi',
        description: 'Şifreleme, sertifika tabanlı kimlik doğrulama ve sahada kanıtlanmış güvenilirlik bir aradadır.',
      },
      {
        title: 'Standart veri ve alarm modeli',
        description: 'Tüm hatlarda tutarlı tag yapısı ve ortak alarm yaklaşımıyla global karşılaştırılabilirlik sağlar.',
      },
      {
        title: 'OnSuite Trace + Live + Optima',
        description: 'Üretim izlenebilirliği, OEE takibi, darboğaz analizi ve duruş yönetimini tek omurgada birleştirir.',
      },
      {
        title: 'GSCA Kanban ve Dashboard',
        description: 'Olay yönetimi, kök neden analizi ve denetim hazırlığı için operasyonel görünürlük sağlar.',
      },
    ],
    results: [
      {
        title: 'Vendor lock-in ortadan kalkar',
        description: 'Yeni makine markasına geçişte tekrar eden entegrasyon mühendisliği ihtiyacı azalır.',
      },
      {
        title: 'Devreye alma süresi kısalır',
        description: 'Plug-and-play OPC UA TMC yaklaşımıyla kurulum süreleri haftalardan günlere iner.',
      },
      {
        title: 'Tüm hatlarda tutarlı KPI',
        description: 'Farklı tesislerde üretilen aynı SKU için OEE karşılaştırmaları ortak metriklerle yapılabilir.',
      },
      {
        title: 'Denetim hazırlığı hızlanır',
        description: 'GSCA kayıtları sistemden anlık raporlanarak denetim süreçleri sadeleşir.',
      },
      {
        title: 'Hedefli geri çağırma mümkün olur',
        description: 'Tüm partiyi geri çağırmak yerine yalnızca etkilenen birimler hızlıca izole edilebilir.',
      },
    ],
    featured: {
      mark: 'T',
      label: 'Öne Çıkan Ürün - Dedicated Site',
      title: 'OnSuite TMC - Tobacco için Standart Veri İletişimi',
      description:
        'Vendor-neutral, güvenli ve ölçeklenebilir OPC UA TMC çözümü. Dedicated ürün sayfası ve demo talep akışı canlıdır. 9 ülkede 300 makine, 28 OEM.',
      linkText: 'opcuatmc.com',
      linkUrl: 'https://www.opcuatmc.com',
    },
    highlights: ['OPC UA', 'GSCA', 'TPD'],
    references: [
      { name: 'JTI', logo: '/assets/Logos/JTI_Logo.svg' },
      { name: 'Philip Morris International', logo: '/assets/Logos/philip_morris_sa.svg' },
      { name: 'Philsa', logo: '/assets/Logos/philsa.svg' },
      { name: 'Türk Tütün', logo: '/assets/Logos/G.D_tobacco.svg' },
    ],
  },
  en: {
    title: 'Tobacco Industry',
    metrics: '9 Countries · 300 Machines · 28 OEMs',
    pack: 'OnSuite TMC',
    summary:
      'Tobacco production requires simultaneous control of OPC UA machinery, GSCA event workflows, and TPD track-and-trace obligations. OnSuite TMC provides a vendor-neutral, standards-based data layer for this environment.',
    detail: 'Running live in 9 countries with 300 connected machines across 28 OEM brands.',
    kpis: [
      { value: '9', title: 'Countries', note: 'with active OPC UA TMC deployment' },
      { value: '300+', title: 'Connected Machines', note: 'with live data flow' },
      { value: '13', title: 'Conformance Units', note: 'covered by OPC UA TMC scope' },
      { value: '28', title: 'OEM Brands', note: 'including Hauni, Decoufle, GD, and Comas' },
    ],
    needs: [
      {
        title: 'Multi-brand machine landscape',
        description: 'Hauni, Decoufle, Comas, GD, and more, each with different communication behavior.',
      },
      {
        title: 'GSCA event governance',
        description: 'End-to-end handling of quality and safety incidents with audit readiness.',
      },
      {
        title: 'TPD and unit-level traceability',
        description: 'Mandatory serialization under EU Tobacco Products Directive requirements.',
      },
      {
        title: 'MES/SCADA/historian integration',
        description: 'Plug-and-play interoperability with existing enterprise systems.',
      },
      {
        title: 'Fast commissioning',
        description: 'Reduced engineering and startup effort for new lines and sites.',
      },
    ],
    solutions: [
      {
        title: 'OnSuite TMC - Vendor-Neutral',
        description: 'OPC UA Tobacco Machine Communication standard with no vendor lock-in.',
      },
      {
        title: 'Support for 13 Conformance Units',
        description: 'Coverage for machine classes including cigarette makers, filter makers, and packers.',
      },
      {
        title: 'Secure OPC UA architecture',
        description: 'Encryption, certificate-based authentication, and field-proven reliability.',
      },
      {
        title: 'Standardized data and alarm model',
        description: 'Consistent tag structures across lines for global comparability.',
      },
      {
        title: 'OnSuite Trace + Live + Optima',
        description: 'Production genealogy, OEE tracking, and bottleneck/downtime analytics.',
      },
      {
        title: 'GSCA Kanban and dashboard',
        description: 'Incident management, root-cause analysis, and compliance evidence.',
      },
    ],
    results: [
      {
        title: 'Vendor lock-in is eliminated',
        description: 'Switching machine brands requires no repeated integration engineering.',
      },
      {
        title: 'Commissioning time is shortened',
        description: 'Plug-and-play OPC UA TMC reduces rollout time from weeks to days.',
      },
      {
        title: 'Consistent KPIs across all lines',
        description: 'OEE for the same SKU can be compared across plants using a shared metric model.',
      },
      {
        title: 'Faster audit preparation',
        description: 'GSCA records are available instantly through the system.',
      },
      {
        title: 'Targeted recall capability',
        description: 'Only affected units are isolated instead of recalling entire batches.',
      },
    ],
    featured: {
      mark: 'T',
      label: 'Featured Product - Dedicated Site',
      title: 'OnSuite TMC - Standardized Data Communication for Tobacco',
      description:
        'A vendor-neutral, secure, and scalable OPC UA TMC solution with a live dedicated product site and demo flow.',
      linkText: 'opcuatmc.com',
      linkUrl: 'https://www.opcuatmc.com',
    },
    highlights: ['Vendor-neutral connectivity', 'GSCA/TPD alignment', 'Fast MES/SCADA integration'],
    references: [
      { name: 'JTI', logo: '/assets/Logos/JTI_Logo.svg' },
      { name: 'Philip Morris International', logo: '/assets/Logos/philip_morris_sa.svg' },
      { name: 'Philsa', logo: '/assets/Logos/philsa.svg' },
      { name: 'Turkish Tobacco', logo: '/assets/Logos/G.D_tobacco.svg' },
    ],
  },
};

export default function TutunPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
