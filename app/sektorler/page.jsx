'use client';

import Image from 'next/image';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import { useLanguage } from '../_context/LanguageContext';

const ONSUITE_MODULE_IMAGES = {
  Connect: '/assets/onsuite/connect.webp',
  Live: '/assets/onsuite/live.webp',
  Trace: '/assets/onsuite/trace.webp',
  Optima: '/assets/onsuite/optima.webp',
  Energy: '/assets/onsuite/energy.webp',
  Carboniq: '/assets/onsuite/green.webp',
  'Forms (DSF)': '/assets/onsuite/forms.webp',
  CNC: '/assets/onsuite/cnc.webp',
  TMC: '/assets/onsuite/tmc.webp',
  Integra: '/assets/onsuite/integra.webp',
  Core: '/assets/onsuite/core.webp',
};

const MODULE_IMAGE_POSITION = {
  Connect: 'object-center',
  Live: 'object-center',
  Trace: 'object-center',
  Optima: 'object-center',
  Energy: 'object-center',
  Carboniq: 'object-center',
  'Forms (DSF)': 'object-center',
  CNC: 'object-center',
  TMC: 'object-center',
  Integra: 'object-center',
  Core: 'object-center',
};

const MODULE_DESTINATIONS = {
  Connect: { path: '/onsuite' },
  Live: { path: '/onsuite' },
  Trace: { path: '/onsuite' },
  Optima: { path: '/onsuite' },
  Energy: { path: '/onsuite' },
  Carboniq: { path: '/onsuite' },
  'Forms (DSF)': { path: '/onsuite' },
  CNC: { path: '/onsuite' },
  TMC: { path: '/onsuite' },
  Integra: { path: '/onsuite' },
  Core: { path: '/onsuite' },
};

const SECTORS = [
  {
    slug: 'tutun',
    tr: {
      title: 'Tütün',
      metrics: '9 Ülke · 300 Makine · 28 OEM · OPC UA TMC',
      summary:
        "OnSuite TMC ile tütün makineleri için OPC UA tabanlı standart veri iletişimi: vendor-neutral entegrasyon, MES/SCADA/historian'a hazır, GSCA ve TPD uyumu.",
      references: ['JTI', 'Philip Morris', 'Philsa'],
    },
    en: {
      title: 'Tobacco',
      metrics: '9 Countries · 300 Machines · 28 OEMs · OPC UA TMC',
      summary:
        'Standard OPC UA-based communication for tobacco machinery with vendor-neutral integration and GSCA/TPD alignment.',
      references: ['JTI', 'Philip Morris', 'Philsa'],
    },
    ro: {
      title: 'Tutun',
      metrics: '9 Țări · 300 Mașini · 28 OEM · OPC UA TMC',
      summary:
        'Comunicare standard bazată pe OPC UA pentru mașinile de tutun cu integrare independentă de furnizor și conformitate GSCA/TPD.',
      references: ['JTI', 'Philip Morris', 'Philsa'],
    },
  },
  {
    slug: 'otomotiv',
    tr: {
      title: 'Otomotiv',
      metrics: 'IATF 16949 · Hybrid T&T · Traceability',
      summary:
        'Ana ve yan sanayide tekil ürün izleme, kritik komponent doğrulama, Pick-to-Light ve PLC tabanlı kalite hücresi entegrasyonu.',
      references: ['Bosch', 'Phinia', 'Nemak', 'Tirsan'],
    },
    en: {
      title: 'Automotive',
      metrics: 'IATF 16949 · Hybrid T&T · Traceability',
      summary:
        'Unit-level traceability, critical component verification, and quality cell integration for OEM and tier suppliers.',
      references: ['Bosch', 'Phinia', 'Nemak', 'Tirsan'],
    },
    ro: {
      title: 'Automotive',
      metrics: 'IATF 16949 · Hybrid T&T · Trasabilitate',
      summary:
        'Trasabilitate la nivel de unitate, verificarea componentelor critice și integrarea celulei de calitate pentru OEM și furnizori.',
      references: ['Bosch', 'Phinia', 'Nemak', 'Tirsan'],
    },
  },
  {
    slug: 'beyaz-esya',
    tr: {
      title: 'Beyaz Eşya',
      metrics: 'A+++ Track & Trace · OEE · Energy',
      summary:
        'Yüksek hacimli montaj hatlarında seri numarası takibi, OEE analitiği ve enerji izleme - BSH, Vestel, Whirlpool, Haier referansları.',
      references: ['BSH', 'Vestel', 'Whirlpool', 'Haier'],
    },
    en: {
      title: 'White Goods',
      metrics: 'A+++ Track & Trace · OEE · Energy',
      summary:
        'Serial traceability, OEE analytics, and energy visibility for high-volume assembly lines.',
      references: ['BSH', 'Vestel', 'Whirlpool', 'Haier'],
    },
    ro: {
      title: 'Electrocasnice',
      metrics: 'A+++ Track & Trace · OEE · Energie',
      summary:
        'Trasabilitate serială, analize OEE și vizibilitate energetică pentru liniile de asamblare de mare volum.',
      references: ['BSH', 'Vestel', 'Whirlpool', 'Haier'],
    },
  },
  {
    slug: 'gida-icecek',
    tr: {
      title: 'Gıda & İçecek',
      metrics: 'ISO 22005:2007 · Organic T&T · HACCP',
      summary:
        'Hammaddeden rafa parti/lot izlenebilirliği, hızlı ürün geri çağırma, ISO 22005 ve İYS uyumu - gıda güvenliği zincirinin tamamı.',
      references: ['Mey Diageo', 'Tuborg', 'Ajinomoto', 'Duru'],
    },
    en: {
      title: 'Food & Beverage',
      metrics: 'ISO 22005:2007 · Organic T&T · HACCP',
      summary:
        'Lot-level traceability, fast recalls, and full food safety chain visibility with ISO 22005 alignment.',
      references: ['Mey Diageo', 'Tuborg', 'Ajinomoto', 'Duru'],
    },
    ro: {
      title: 'Alimente & Băuturi',
      metrics: 'ISO 22005:2007 · Organic T&T · HACCP',
      summary:
        'Trasabilitate la nivel de lot, rechemări rapide și vizibilitatea completă a lanțului de siguranță alimentară, cu aliniere ISO 22005.',
      references: ['Mey Diageo', 'Tuborg', 'Ajinomoto', 'Duru'],
    },
  },
  {
    slug: 'ilac',
    tr: {
      title: 'İlaç',
      metrics: 'GMP · Capsule T&T · Serileştirme',
      summary:
        'Seri numarası, parti, son kullanma tarihi takibi; soğuk zincir izleme ve GMP uyumlu doğrulama hattı.',
      references: ['Capsule T&T', 'RFID', 'SICK'],
    },
    en: {
      title: 'Pharmaceutical',
      metrics: 'GMP · Capsule T&T · Serialization',
      summary:
        'Serialization, batch/expiry tracking, cold-chain monitoring, and GMP-aligned verification flows.',
      references: ['Capsule T&T', 'RFID', 'SICK'],
    },
    ro: {
      title: 'Farmaceutice',
      metrics: 'GMP · Capsule T&T · Serializare',
      summary:
        'Serializare, urmărirea loturilor/expirării, monitorizarea lanțului frigorific și fluxuri de verificare aliniate la GMP.',
      references: ['Capsule T&T', 'RFID', 'SICK'],
    },
  },
  {
    slug: 'makine-otomasyon',
    tr: {
      title: 'Makine & Otomasyon',
      metrics: 'PLC · SCADA · Servo · Pano · CNC',
      summary:
        'Montaj, paketleme, kaplama tesisi, servo/motion, çok markalı CNC parkuru - donanımdan yazılıma uçtan uca otomasyon. PCT dahil CNC patent başvurularıyla korunan yöntemler.',
      references: ['TEI', 'Phinia', 'Nemak'],
    },
    en: {
      title: 'Machinery & Automation',
      metrics: 'PLC · SCADA · Servo · Panel · CNC',
      summary: 'End-to-end automation from hardware to software across assembly, process, and CNC environments.',
      references: ['TEI', 'Phinia', 'Nemak'],
    },
    ro: {
      title: 'Mașini & Automatizare',
      metrics: 'PLC · SCADA · Servo · Panou · CNC',
      summary: 'Automatizare end-to-end, de la hardware la software, în mediile de asamblare, procese și CNC.',
      references: ['TEI', 'Phinia', 'Nemak'],
    },
  },
  {
    slug: 'tekstil',
    tr: {
      title: 'Tekstil',
      metrics: 'Üretim Veri Toplama · Boya Reçete · OEE',
      summary:
        'Dokuma, örme, boyahane ve konfeksiyon hatlarında reçete yönetimi, üretim verimi izleme ve makineler arası entegrasyon.',
      references: ['PLC Entegrasyon', 'Reçete Yönetimi'],
    },
    en: {
      title: 'Textile',
      metrics: 'Production Data Capture · Dye Recipe · OEE',
      summary:
        'Recipe management, production monitoring, and machine integration across weaving, knitting, and dye-house operations.',
      references: ['PLC Integration', 'Recipe Management'],
    },
    ro: {
      title: 'Textile',
      metrics: 'Colectare Date Producție · Rețetă Vopsire · OEE',
      summary:
        'Managementul rețetelor, monitorizarea producției și integrarea mașinilor în operațiunile de țesere, tricotare și vopsire.',
      references: ['Integrare PLC', 'Management Rețete'],
    },
  },
  {
    slug: 'enerji-kimya',
    tr: {
      title: 'Enerji & Kimya',
      metrics: 'SCADA · Carboniq · CBAM · ESG',
      summary:
        'Enerji izleme, karbon ayak izi raporlaması ve proses otomasyonu - TÜBİTAK + EUROGIA destekli Carboniq platformuyla CBAM hazırlığı.',
      references: ['Carboniq', 'SCADA', 'CBAM'],
    },
    en: {
      title: 'Energy & Chemicals',
      metrics: 'SCADA · Carboniq · CBAM · ESG',
      summary:
        'Energy monitoring, carbon reporting, and process automation with Carboniq for CBAM readiness.',
      references: ['Carboniq', 'SCADA', 'CBAM'],
    },
    ro: {
      title: 'Energie & Chimice',
      metrics: 'SCADA · Carboniq · CBAM · ESG',
      summary:
        'Monitorizarea energiei, raportarea carbonului și automatizarea proceselor cu platforma Carboniq pentru pregătirea CBAM.',
      references: ['Carboniq', 'SCADA', 'CBAM'],
    },
  },
];

const COMMON_CHALLENGES = {
  tr: [
    {
      code: '01',
      title: 'Veri Parçalanması',
      description: "Her makine kendi protokolünde konuşur, KPI'lar birleşmez, raporlar manuel kalır.",
    },
    {
      code: '02',
      title: 'Görünmez Verimlilik Kaybı',
      description: 'OEE düşük ama nerede kaybedildiği belirsiz; darboğaz veriyle değil sezgiyle yönetilir.',
    },
    {
      code: '03',
      title: 'İzlenebilirlik Boşlukları',
      description:
        'Geri çağırma anında parti zinciri eksik; BOM doğrulaması ve garanti süreçleri kağıttan yönetilir, ürün geri çağırma maliyeti markayı sarsar.',
    },
    {
      code: '04',
      title: 'Denetim & Garanti Riski',
      description:
        'ISO/IATF/GMP/GSCA denetimi öncesi haftalarca veri derleme; garanti süreçlerinde net delil zinciri yok, audit riski yüksek.',
    },
    {
      code: '05',
      title: 'Enerji & Karbon Görünmezliği',
      description: 'Tüketim faturadan görünür ama hangi hat, vardiya, ürün bilinmez. CBAM bekliyor.',
    },
    {
      code: '06',
      title: 'Sistem Entegrasyon Açıkları',
      description: 'MES, ERP, kalite, planlama, depo - her biri farklı dilde, veri kopuk akar.',
    },
  ],
  en: [
    {
      code: '01',
      title: 'Data Fragmentation',
      description: 'Machines speak different protocols, KPIs do not align, and reporting stays manual.',
    },
    {
      code: '02',
      title: 'Hidden Productivity Loss',
      description: 'OEE is low but losses are unclear; bottlenecks are managed by intuition instead of data.',
    },
    {
      code: '03',
      title: 'Traceability Gaps',
      description: 'Lot genealogy is incomplete during recalls and warranty evidence remains weak.',
    },
    {
      code: '04',
      title: 'Audit & Warranty Risk',
      description: 'Teams spend weeks preparing evidence before audits with a fragile proof chain.',
    },
    {
      code: '05',
      title: 'Energy & Carbon Blind Spots',
      description: 'Consumption is seen on invoices, but not by line, shift, or product. CBAM pressure grows.',
    },
    {
      code: '06',
      title: 'Integration Gaps',
      description: 'MES, ERP, quality, planning, and warehouse systems flow in silos with disconnected data.',
    },
  ],
  ro: [
    {
      code: '01',
      title: 'Fragmentarea Datelor',
      description: 'Mașinile vorbesc protocoale diferite, KPI-urile nu se aliniază, iar raportarea rămâne manuală.',
    },
    {
      code: '02',
      title: 'Pierdere de Productivitate Ascunsă',
      description: 'OEE este scăzut, dar pierderile sunt neclare; blocajele sunt gestionate prin intuiție în loc de date.',
    },
    {
      code: '03',
      title: 'Lacune de Trasabilitate',
      description: 'Genealogia lotului este incompletă în timpul retragerilor, iar dovezile de garanție rămân slabe.',
    },
    {
      code: '04',
      title: 'Risc de Audit & Garanție',
      description: 'Echipele petrec săptămâni pregătind dovezi înaintea auditurilor cu un lanț de dovezi fragil.',
    },
    {
      code: '05',
      title: 'Puncte Oarbe de Energie & Carbon',
      description: 'Consumul se vede pe facturi, dar nu per linie, tură sau produs. Presiunea CBAM crește.',
    },
    {
      code: '06',
      title: 'Lacune de Integrare',
      description: 'Sistemele MES, ERP, de calitate, planificare și depozitare funcționează independent cu date deconectate.',
    },
  ],
};

const ONSUITE_MODULES = {
  tr: [
    { category: 'VERİ', name: 'Connect', description: '20+ endüstriyel protokol' },
    { category: 'İZLEME', name: 'Live', description: 'Gerçek zamanlı üretim panosu' },
    { category: 'TRACK WISELY', name: 'Trace', description: 'RFID, QR, Barkod, Beacon, Kamera ile parti-lot-seri zinciri' },
    { category: 'VERİMLİLİK', name: 'Optima', description: 'OEE, MTBF, darboğaz analitiği' },
    { category: 'ENERJİ', name: 'Energy', description: 'Hat, ekipman, süreç bazında tüketim' },
    { category: 'SÜRDÜRÜLEBİLİRLİK', name: 'Carboniq', description: 'Karbon ayak izi · CBAM hazırlığı' },
    { category: 'SAHA FORMU', name: 'Forms (DSF)', description: 'Mobil veri toplama, kontrol listeleri' },
    { category: 'CNC', name: 'CNC', description: 'Çok markalı CNC bütünleştirme' },
    { category: 'TÜTÜN', name: 'TMC', description: 'OPC UA MoM makine iletişimi' },
    { category: 'ENTEGRASYON', name: 'Integra', description: 'ERP, MES, planlama köprüleri' },
    { category: 'ALTYAPI', name: 'Core', description: 'Kullanıcı, rol, sertifika, audit log' },
  ],
  en: [
    { category: 'DATA', name: 'Connect', description: '20+ industrial protocols' },
    { category: 'MONITORING', name: 'Live', description: 'Real-time production dashboard' },
    { category: 'TRACK WISELY', name: 'Trace', description: 'RFID, QR, Barcode, Beacon, Camera for lot-serial chain' },
    { category: 'PRODUCTIVITY', name: 'Optima', description: 'OEE, MTBF, bottleneck analytics' },
    { category: 'ENERGY', name: 'Energy', description: 'Line, equipment, and process-based consumption' },
    { category: 'SUSTAINABILITY', name: 'Carboniq', description: 'Carbon footprint · CBAM readiness' },
    { category: 'SHOPFLOOR FORMS', name: 'Forms (DSF)', description: 'Mobile data capture, checklists' },
    { category: 'CNC', name: 'CNC', description: 'Multi-brand CNC integration' },
    { category: 'TOBACCO', name: 'TMC', description: 'OPC UA MoM machine communication' },
    { category: 'INTEGRATION', name: 'Integra', description: 'ERP, MES, planning bridges' },
    { category: 'FOUNDATION', name: 'Core', description: 'Users, roles, certificates, audit log' },
  ],
  ro: [
    { category: 'DATE', name: 'Connect', description: '20+ protocoale industriale' },
    { category: 'MONITORIZARE', name: 'Live', description: 'Panou de bord în timp real' },
    { category: 'Urmărire Inteligentă', name: 'Trace', description: 'RFID, QR, Cod de bare, Beacon, Cameră pentru lanț serie-lot' },
    { category: 'PRODUCTIVITATE', name: 'Optima', description: 'Analize OEE, MTBF și blocaje' },
    { category: 'ENERGIE', name: 'Energy', description: 'Consum pe linie, echipament și proces' },
    { category: 'SUSTENABILITATE', name: 'Carboniq', description: 'Amprentă de carbon · Pregătire CBAM' },
    { category: 'FORMULARE', name: 'Forms (DSF)', description: 'Colectare date mobil, liste de verificare' },
    { category: 'CNC', name: 'CNC', description: 'Integrare CNC multi-brand' },
    { category: 'TUTUN', name: 'TMC', description: 'Comunicare mașini OPC UA MoM' },
    { category: 'INTEGRARE', name: 'Integra', description: 'Punți ERP, MES, planificare' },
    { category: 'FUNDAȚIE', name: 'Core', description: 'Utilizatori, roluri, certificate, log audit' },
  ],
};

export default function SectorsPage() {
  const { t, locale, localizePath } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const challengeItems = isRo ? COMMON_CHALLENGES.ro : isEn ? COMMON_CHALLENGES.en : COMMON_CHALLENGES.tr;
  const modules = isRo ? ONSUITE_MODULES.ro : isEn ? ONSUITE_MODULES.en : ONSUITE_MODULES.tr;

  const heroBreadcrumbs = [t('sectorsPage.breadcrumbHome'), t('sectorsPage.breadcrumbSectors')];
  const pageTitle = t('sectorsPage.pageTitle');
  const headline = t('sectorsPage.overviewHeadline');
  const intro = t('sectorsPage.overviewIntro');
  const ctaDetail = t('sectorsPage.ctaDetail');
  const painHeadline = t('sectorsPage.painHeadline');
  const painLead = t('sectorsPage.painLead');
  const backboneHeadline = t('sectorsPage.backboneHeadline');
  const backboneLead = t('sectorsPage.backboneLead');
  const ctaFinal = t('sectorsPage.ctaFinal');
  const ctaSuffix = t('sectorsPage.ctaSuffix');
  const contactUs = t('sectorsPage.contactUs');

  const ctaTitle = `${headline} ${ctaFinal}`;
  const ctaLead = `${backboneLead} ${ctaSuffix}`;

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={pageTitle}
        subtitle={headline}
        breadcrumbs={heroBreadcrumbs}
      />

      <section className="cta-section py-16 md:py-24 px-6 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg min-h-[360px] sm:min-h-[430px] md:min-h-[520px] lg:min-h-[580px] bg-slate-100">
              <Image
                src="/assets/new/sektorler/sektorler.webp"
                alt={isRo ? 'Imagine de ansamblu a sectoarelor' : isEn ? 'Sector overview visual' : 'Sektörler genel görünüm'}
                fill
                className="object-cover object-center scale-[1.1] sm:scale-[1.12] md:scale-[1.14]"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 max-w-4xl">{headline}</h2>
              <p className="text-body-muted text-lg leading-relaxed mt-6">{intro}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
            {SECTORS.map((sector) => {
              const content = isRo ? sector.ro : isEn ? sector.en : sector.tr;
              const topReferences = content.references.slice(0, 3);
              const remainingReferenceCount = Math.max(content.references.length - topReferences.length, 0);

              return (
                <article key={sector.slug} className="surface-card p-6 h-full flex flex-col">
                  <div className="h-1.5 w-14 rounded-full bg-sky-500/80 mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900">{content.title}</h3>
                  <p className="text-xs font-semibold tracking-wide uppercase text-sky-600 mt-2">{content.metrics}</p>
                  <p className="text-body-subtle text-sm leading-relaxed mt-4 min-h-[88px]">{content.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {topReferences.map((item) => (
                      <span key={item} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                        {item}
                      </span>
                    ))}
                    {remainingReferenceCount > 0 ? (
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                        +{remainingReferenceCount}
                      </span>
                    ) : null}
                  </div>

                  <Link
                    href={localizePath(`/sektorler/${sector.slug}`)}
                    className="focus-ring mt-5 inline-flex items-center gap-2 text-sky-600 font-semibold"
                  >
                    {ctaDetail}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-4 max-w-4xl">{painHeadline}</h2>
          <p className="text-body-muted text-lg leading-relaxed mt-6 max-w-5xl">{painLead}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12">
            {challengeItems.map((challenge) => (
              <article key={challenge.code} className="surface-card p-6">
                <p className="text-sky-600 font-extrabold text-xl">{challenge.code}</p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">{challenge.title}</h3>
                <p className="mt-3 text-body-muted leading-relaxed">{challenge.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl lg:text-[2.7rem] font-bold leading-tight text-slate-900 mt-4 max-w-5xl" style={{ textWrap: 'balance' }}>
            {backboneHeadline}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mt-6 max-w-5xl">{backboneLead}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
            {modules.map((moduleItem) => {
              const destination = MODULE_DESTINATIONS[moduleItem.name] || MODULE_DESTINATIONS.Core;
              return (
                <Link
                  key={`${moduleItem.category}-${moduleItem.name}`}
                  href={localizePath(destination.path)}
                  className="focus-ring group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-black min-h-[240px] hover:shadow-xl hover:shadow-slate-900/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 z-0 bg-black">
                    <Image
                      src={ONSUITE_MODULE_IMAGES[moduleItem.name] || '/assets/onsuite/core.webp'}
                      alt={`${moduleItem.name} module`}
                      fill
                      className={`object-cover ${MODULE_IMAGE_POSITION[moduleItem.name] || 'object-center'} scale-105 group-hover:scale-110 transition-transform duration-700`}
                      sizes="(min-width: 1280px) 60vw, (min-width: 768px) 46vw, 100vw"
                    />
                  </div>
                  <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75" />
                  <div className="absolute inset-x-0 bottom-0 z-0 h-[58%] bg-gradient-to-t from-black/95 via-black/72 to-transparent" />

                  <div className="relative z-10 h-full p-5 md:p-6 flex flex-col justify-end">
                    <p className="text-[11px] font-extrabold tracking-[0.14em] text-cyan-200 uppercase">
                      {moduleItem.category}
                    </p>
                    <h3 className="mt-1.5 text-xl md:text-2xl leading-tight font-extrabold text-white">
                      {moduleItem.name}
                    </h3>
                    <p className="mt-2.5 text-slate-100 leading-relaxed text-[0.94rem] font-semibold max-w-[44ch]">
                      {moduleItem.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-14 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black text-slate-900">
              {ctaTitle}
            </h3>
            <p className="text-slate-600 mt-5 text-lg leading-relaxed">
              {ctaLead}
            </p>
            <Link
              href={localizePath('/iletisim#contact-form')}
              className="focus-ring inline-flex mt-8 items-center justify-center rounded-xl bg-sky-600 px-7 py-3.5 text-white font-semibold hover:bg-sky-700 transition-colors"
            >
              {contactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

