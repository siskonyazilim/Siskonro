export const OVERVIEW_COPY = {
  tr: {
    title: 'Bir Bakışta',
    headline: 'Sekiz Sektör, Tek Mühendislik Disiplini.',
    intro:
      'Her sektör için ayrı modülleri zorlamak yerine, ortak bir OnSuite çekirdeği üzerine sektöre özel katmanları inşa ediyoruz. Aşağıdaki kartlar sektörel özetlerdir; devamında ortak omurgayı ve sektör detaylarını bulabilirsiniz.',
    painTitle: 'Sektörler Farklı, Sorun Aynı',
    painHeadline: 'Her Üretim Hattının Aynı Altı Sorunu Var.',
    painLead:
      'Tütün makinesi, beyaz eşya hattı, CNC parkuru veya gıda dolum hattı yüzeyde farklı görünse de aynı temel problemlerle boğuşur. Bu nedenle 8 sektörü 8 ayrı yazılımla değil, ortak OnSuite omurgası ve sektöre özel katmanlarla çözeriz.',
    backboneTitle: 'OnSuite Omurgası',
    backboneHeadline: 'Tek Omurga · 11 Modül · Daha Fazla Veri, Daha Fazla İçgörü, Daha Fazla İyileştirme',
    backboneLead:
      'OnSuite sektör bağımsız bir çekirdektir. Hybrid, Organic, A+++, Capsule Track and Trace gibi sektör paketleri sıfırdan yazılım değil; aynı omurganın sektöre göre yapılandırılmış katmanlarıdır.',
    ctaDetail: 'Detaya Git',
    ctaContact: 'Proje Konuşalım',
  },
  en: {
    title: 'At A Glance',
    headline: 'Eight Industries, One Engineering Discipline.',
    intro:
      'Instead of building disconnected stacks for each industry, we implement sector-specific layers on top of one shared OnSuite core. The cards below give a quick sector view; the following sections explain the common backbone and each sector in more detail.',
    painTitle: 'Different Industries, Same Core Problems',
    painHeadline: 'Every Production Line Faces the Same Six Problems.',
    painLead:
      'Tobacco machinery, white goods assembly, CNC fleets, and food filling lines may look different on the surface, but they struggle with the same fundamentals. That is why we serve eight industries with one shared OnSuite backbone plus sector layers.',
    backboneTitle: 'OnSuite Backbone',
    backboneHeadline: 'One Backbone · 11 Modules · More Data, More Insight, More Improvement',
    backboneLead:
      'OnSuite is a sector-agnostic core. Our industry packs such as Hybrid, Organic, A+++, and Capsule Track and Trace are not new software from scratch; they are configured combinations of this backbone.',
    ctaDetail: 'View Details',
    ctaContact: 'Let\'s Talk',
  },
  ro: {
    title: 'Dintr-o Privire',
    headline: 'Opt Industrii, O Singură Disciplină Inginerească.',
    intro:
      'În loc să construim sisteme deconectate pentru fiecare industrie, implementăm straturi specifice sectorului peste un nucleu comun OnSuite. Cardurile de mai jos oferă o vizualizare rapidă a sectorului; secțiunile următoare explică baza comună și fiecare sector în detaliu.',
    painTitle: 'Industrii Diferite, Aceleași Probleme Centrale',
    painHeadline: 'Fiecare Linie de Producție se Confruntă cu Aceleași Șase Probleme.',
    painLead:
      'Mașinile de tutun, asamblarea electrocasnicelor, flotele CNC și liniile de umplere alimentară pot părea diferite la suprafață, dar se confruntă cu aceleași probleme fundamentale. De aceea servim opt industrii cu o bază comună OnSuite și straturi specifice fiecărui sector.',
    backboneTitle: 'Baza OnSuite',
    backboneHeadline: 'O Bază · 11 Module · Mai Multe Date, Mai Multă Perspectivă, Mai Multă Îmbunătățire',
    backboneLead:
      'OnSuite este un nucleu agnostică din punct de vedere al sectorului. Pachetele noastre industriale, precum Hybrid, Organic, A+++ și Capsule Track and Trace, nu sunt software nou creat de la zero; ele sunt combinații configurate ale acestei baze.',
    ctaDetail: 'Vezi Detalii',
    ctaContact: 'Hai să Discutăm',
  },
};

export const COMMON_CHALLENGES = [
  {
    code: '01',
    tr: {
      title: 'Veri Parçalanması',
      description: 'Her makine kendi protokolünde konuşur, KPI\'lar birleşmez, raporlar manuel kalır.',
    },
    en: {
      title: 'Data Fragmentation',
      description: 'Each machine speaks a different protocol, KPIs do not align, and reporting remains manual.',
    },
    ro: {
      title: 'Fragmentarea Datelor',
      description: 'Fiecare mașină folosește un protocol diferit, KPI-urile nu se aliniază, iar raportarea rămâne manuală.',
    },
  },
  {
    code: '02',
    tr: {
      title: 'Görünmez Verimlilik Kaybı',
      description: 'OEE düşüktür ama kaybın yeri belirsizdir; darboğazlar veri yerine sezgiyle yönetilir.',
    },
    en: {
      title: 'Hidden Productivity Loss',
      description: 'OEE is low but loss points are unclear, and bottlenecks are managed by intuition rather than data.',
    },
    ro: {
      title: 'Pierdere de Productivitate Ascunsă',
      description: 'OEE este scăzut, dar punctele de pierdere sunt neclare, iar blocajele sunt gestionate prin intuiție în loc de date.',
    },
  },
  {
    code: '03',
    tr: {
      title: 'İzlenebilirlik Boşlukları',
      description: 'Geri çağırma anında parti zinciri eksik kalır; BOM doğrulaması ve garanti süreçleri kağıtla yürür.',
    },
    en: {
      title: 'Traceability Gaps',
      description: 'During recalls, the lot chain is incomplete, while BOM verification and warranty workflows stay paper-based.',
    },
    ro: {
      title: 'Lacune de Trasabilitate',
      description: 'În timpul retragerilor, lanțul de loturi este incomplet, în timp ce verificarea BOM și fluxurile de lucru de garanție rămân pe suport de hârtie.',
    },
  },
  {
    code: '04',
    tr: {
      title: 'Denetim ve Garanti Riski',
      description: 'ISO, IATF, GMP, GSCA denetimi öncesinde haftalarca veri derlenir; audit riski yükselir.',
    },
    en: {
      title: 'Audit and Warranty Risk',
      description: 'Teams spend weeks preparing ISO, IATF, GMP, and GSCA evidence, with a weak proof chain for warranty claims.',
    },
    ro: {
      title: 'Risc de Audit și Garanție',
      description: 'Echipele petrec săptămâni pregătind dovezi ISO, IATF, GMP și GSCA, cu un lanț fragil de dovezi pentru cererile de garanție.',
    },
  },
  {
    code: '05',
    tr: {
      title: 'Enerji ve Karbon Görünmezliği',
      description: 'Tüketim fatura seviyesinde görünür; hat, vardiya ve ürün kırılımında karar üretilemez. CBAM baskısı artar.',
    },
    en: {
      title: 'Energy and Carbon Blind Spots',
      description: 'Consumption is visible at invoice level only, not by line, shift, or product, while CBAM pressure keeps growing.',
    },
    ro: {
      title: 'Puncte Oarbe de Energie și Carbon',
      description: 'Consumul este vizibil doar la nivel de factură, nu per linie, tură sau produs, în timp ce presiunea CBAM continuă să crească.',
    },
  },
  {
    code: '06',
    tr: {
      title: 'Sistem Entegrasyon Açıkları',
      description: 'MES, ERP, kalite, planlama ve depo sistemleri farklı dillerde akar; veri kopuk ve geç kalır.',
    },
    en: {
      title: 'System Integration Gaps',
      description: 'MES, ERP, quality, planning, and warehouse systems run in silos, causing disconnected and delayed data flow.',
    },
    ro: {
      title: 'Lacune de Integrare a Sistemelor',
      description: 'Sistemele MES, ERP, de calitate, planificare și depozitare funcționează independent, cauzând fluxuri de date deconectate și întârziate.',
    },
  },
];

export const ONSUITE_MODULES = [
  {
    key: 'connect',
    tr: { category: 'VERİ', name: 'Connect', description: '20+ endüstriyel protokol ile veri toplama' },
    en: { category: 'DATA', name: 'Connect', description: 'Data acquisition over 20+ industrial protocols' },
    ro: { category: 'DATE', name: 'Connect', description: 'Achiziție date prin 20+ protocoale industriale' },
  },
  {
    key: 'live',
    tr: { category: 'İZLEME', name: 'Live', description: 'Gerçek zamanlı üretim panosu' },
    en: { category: 'MONITORING', name: 'Live', description: 'Real-time production dashboard' },
    ro: { category: 'MONITORIZARE', name: 'Live', description: 'Panou de bord producție în timp real' },
  },
  {
    key: 'trace',
    tr: { category: 'TRACK WISELY', name: 'Trace', description: 'RFID, QR, barkod, beacon, kamera ile parti-lot-seri zinciri' },
    en: { category: 'TRACK WISELY', name: 'Trace', description: 'Lot-serial chain with RFID, QR, barcode, beacon, and camera' },
    ro: { category: 'URMĂRIRE', name: 'Trace', description: 'Lanț serie-lot cu RFID, QR, cod de bare, beacon și cameră' },
  },
  {
    key: 'optima',
    tr: { category: 'VERİMLİLİK', name: 'Optima', description: 'OEE, MTBF ve darboğaz analitiği' },
    en: { category: 'PRODUCTIVITY', name: 'Optima', description: 'OEE, MTBF, and bottleneck analytics' },
    ro: { category: 'PRODUCTIVITATE', name: 'Optima', description: 'Analize OEE, MTBF și blocaje' },
  },
  {
    key: 'energy',
    tr: { category: 'ENERJİ', name: 'Energy', description: 'Hat, ekipman ve süreç bazında tüketim' },
    en: { category: 'ENERGY', name: 'Energy', description: 'Line, equipment, and process-based consumption tracking' },
    ro: { category: 'ENERGIE', name: 'Energy', description: 'Urmărirea consumului pe linie, echipament și proces' },
  },
  {
    key: 'carboniq',
    tr: { category: 'SÜRDÜRÜLEBİLİRLİK', name: 'Green', description: 'Karbon ayak izi ve CBAM hazırlığı' },
    en: { category: 'SUSTAINABILITY', name: 'Green', description: 'Carbon footprint monitoring and CBAM readiness' },
    ro: { category: 'SUSTENABILITATE', name: 'Green', description: 'Monitorizarea amprentei de carbon și pregătire CBAM' },
  },
  {
    key: 'forms',
    tr: { category: 'SAHA FORMU', name: 'Forms (DSF)', description: 'Mobil veri toplama ve kontrol listeleri' },
    en: { category: 'SHOPFLOOR FORMS', name: 'Forms (DSF)', description: 'Mobile data capture and digital checklists' },
    ro: { category: 'FORMULARE', name: 'Forms (DSF)', description: 'Colectare date mobil și liste de verificare digitale' },
  },
  {
    key: 'cnc',
    tr: { category: 'CNC', name: 'CNC', description: 'Çok markalı CNC bütünleştirme' },
    en: { category: 'CNC', name: 'CNC', description: 'Multi-brand CNC integration' },
    ro: { category: 'CNC', name: 'CNC', description: 'Integrare CNC multi-brand' },
  },
  {
    key: 'tmc',
    tr: { category: 'TÜTÜN', name: 'TMC', description: 'OPC UA MoM makine iletişimi' },
    en: { category: 'TOBACCO', name: 'TMC', description: 'OPC UA MoM machine communication' },
    ro: { category: 'TUTUN', name: 'TMC', description: 'Comunicare mașini OPC UA MoM' },
  },
  {
    key: 'integra',
    tr: { category: 'ENTEGRASYON', name: 'Integra', description: 'ERP, MES ve planlama köprüleri' },
    en: { category: 'INTEGRATION', name: 'Integra', description: 'Bridges for ERP, MES, and planning systems' },
    ro: { category: 'INTEGRARE', name: 'Integra', description: 'Punți pentru sistemele ERP, MES și de planificare' },
  },
  {
    key: 'core',
    tr: { category: 'ALTYAPI', name: 'Core', description: 'Kullanıcı, rol, sertifika ve audit log altyapısı' },
    en: { category: 'FOUNDATION', name: 'Core', description: 'Users, roles, certificates, and audit log foundation' },
    ro: { category: 'FUNDAȚIE', name: 'Core', description: 'Utilizatori, roluri, certificate și log audit' },
  },
];

export const SECTORS = [
  {
    slug: 'tutun',
    tr: {
      title: 'Tütün',
      metrics: '9 Ülke · 300 Makine · 28 OEM · OPC UA TMC',
      summary:
        'OnSuite TMC ile tütün makineleri için OPC UA tabanlı standart veri iletişimi: vendor-neutral entegrasyon, MES/SCADA/historian hazırlığı, GSCA ve TPD uyumu.',
      detail:
        'Tütün üretimi, OPC UA standardındaki makinelerin, GSCA olay yönetiminin ve TPD/track and trace mevzuatının aynı anda yönetilmesini gerektirir. OnSuite TMC bu yapıyı vendor-neutral şekilde sahaya taşır.',
      references: ['JTI', 'Philip Morris', 'Philsa'],
      pack: 'OnSuite TMC',
      highlights: [
        'OEM bağımsız makine bağlantısı ve ortak veri modeli',
        'GSCA ve TPD gerekliliklerine uyumlu izlenebilirlik kurgusu',
        'MES, SCADA ve historian sistemlerine hızlı entegrasyon',
      ],
    },
    en: {
      title: 'Tobacco',
      metrics: '9 Countries · 300 Machines · 28 OEMs · OPC UA TMC',
      summary:
        'Standard OPC UA-based communication for tobacco machinery with OnSuite TMC: vendor-neutral integration, ready for MES, SCADA, and historian integration, aligned with GSCA and TPD.',
      detail:
        'Tobacco production requires simultaneous management of OPC UA machinery, GSCA event handling, and TPD track and trace obligations. OnSuite TMC provides a vendor-neutral implementation layer.',
      references: ['JTI', 'Philip Morris', 'Philsa'],
      pack: 'OnSuite TMC',
      highlights: [
        'OEM-neutral machine connectivity with a unified data model',
        'Traceability architecture aligned with GSCA and TPD requirements',
        'Fast integration with MES, SCADA, and historian platforms',
      ],
    },
    ro: {
      title: 'Tutun',
      metrics: '9 Țări · 300 Mașini · 28 OEM · OPC UA TMC',
      summary:
        'Comunicare standard bazată pe OPC UA pentru mașinile de tutun cu OnSuite TMC: integrare independentă de furnizor, pregătită pentru integrare MES, SCADA și istoric, aliniată cu GSCA și TPD.',
      detail:
        'Producția de tutun necesită gestionarea simultană a mașinilor OPC UA, manipularea evenimentelor GSCA și obligațiile de urmărire TPD. OnSuite TMC oferă un strat de implementare independent de furnizor.',
      references: ['JTI', 'Philip Morris', 'Philsa'],
      pack: 'OnSuite TMC',
      highlights: [
        'Conectivitate a mașinilor independentă de OEM cu un model unificat de date',
        'Arhitectură de trasabilitate aliniată la cerințele GSCA și TPD',
        'Integrare rapidă cu platforme MES, SCADA și istoric',
      ],
    },
  },
  {
    slug: 'otomotiv',
    tr: {
      title: 'Otomotiv',
      metrics: 'IATF 16949 · Hybrid T&T · Traceability',
      summary:
        'Ana ve yan sanayide tekil ürün izleme, kritik komponent doğrulama, Pick-to-Light ve PLC tabanlı kalite hücresi entegrasyonu.',
      detail:
        'Otomotiv tedarik zincirinde tekil ürün izlenebilirliği ve kritik komponent doğrulaması zorunludur. Hybrid Track and Trace ile hammaddeden müşteri hattına kadar dijital parmak izi korunur.',
      references: ['Bosch', 'Phinia', 'Nemak', 'Tirsan'],
      pack: 'Hybrid Track and Trace',
      highlights: [
        'IATF 16949 odaklı denetlenebilir veri akışı',
        'Kritik komponent ve istasyon bazlı doğrulama mekanizmaları',
        'Pick-to-Light ve kalite hücreleriyle hat içi rehberlik',
      ],
    },
    en: {
      title: 'Automotive',
      metrics: 'IATF 16949 · Hybrid T&T · Traceability',
      summary:
        'Unit-level traceability, critical component validation, and Pick-to-Light integration with PLC-based quality cells across OEM and tier suppliers.',
      detail:
        'Automotive supply chains require strict unit-level genealogy and critical component checks. Hybrid Track and Trace preserves the digital fingerprint from raw material to customer delivery.',
      references: ['Bosch', 'Phinia', 'Nemak', 'Tirsan'],
      pack: 'Hybrid Track and Trace',
      highlights: [
        'Audit-ready data flow aligned with IATF 16949',
        'Critical component and station-level verification controls',
        'In-line guidance with Pick-to-Light and quality cells',
      ],
    },
    ro: {
      title: 'Automotive',
      metrics: 'IATF 16949 · Hybrid T&T · Trasabilitate',
      summary:
        'Trasabilitate la nivel de unitate, validarea componentelor critice și integrare Pick-to-Light cu celule de calitate bazate pe PLC pentru OEM și furnizori.',
      detail:
        'Lanțurile de aprovizionare din domeniul auto necesită o genealogie strictă la nivel de unitate și verificări ale componentelor critice. Hybrid Track and Trace păstrează amprenta digitală de la materia primă până la livrarea către client.',
      references: ['Bosch', 'Phinia', 'Nemak', 'Tirsan'],
      pack: 'Hybrid Track and Trace',
      highlights: [
        'Flux de date gata pentru audit aliniat la IATF 16949',
        'Controale de verificare la nivel de stație și componente critice',
        'Ghidare pe linie cu Pick-to-Light și celule de calitate',
      ],
    },
  },
  {
    slug: 'beyaz-esya',
    tr: {
      title: 'Beyaz Eşya',
      metrics: 'A+++ Track & Trace · OEE · Energy',
      summary:
        'Yüksek hacimli montaj hatlarında seri numarası takibi, OEE analitiği ve enerji izleme.',
      detail:
        'Beyaz eşya hatlarında çok varyantlı SKU akışı, hat içi testler ve müşteri-paket eşleşmesi birlikte yönetilir. A+++ Track and Trace ile kalite, enerji ve verimlilik aynı omurgada izlenir.',
      references: ['BSH', 'Vestel', 'Whirlpool', 'Haier'],
      pack: 'A+++ Track and Trace',
      highlights: [
        'Yüksek hızlı hatlarda seri numarası ve ürün ağacı doğrulaması',
        'Duruş kayıpları ve performans sapmaları için OEE panoları',
        'Hat bazlı enerji yoğunluğu analizi ile maliyet kontrolü',
      ],
    },
    en: {
      title: 'White Goods',
      metrics: 'A+++ Track & Trace · OEE · Energy',
      summary:
        'Serial-level traceability, OEE analytics, and energy monitoring for high-volume assembly lines.',
      detail:
        'White goods lines need synchronized control of high variant flow, in-line testing, and packaging mapping. A+++ Track and Trace unifies quality, energy, and performance visibility.',
      references: ['BSH', 'Vestel', 'Whirlpool', 'Haier'],
      pack: 'A+++ Track and Trace',
      highlights: [
        'Serial and bill-of-material validation in high-speed lines',
        'OEE visibility for downtime and performance losses',
        'Line-level energy intensity analytics for cost control',
      ],
    },
    ro: {
      title: 'Electrocasnice',
      metrics: 'A+++ Track & Trace · OEE · Energie',
      summary:
        'Trasabilitate la nivel de serie, analize OEE și monitorizare energetică pentru liniile de asamblare de mare volum.',
      detail:
        'Liniile de electrocasnice au nevoie de un control sincronizat al fluxului mare de variante, testare pe linie și maparea ambalajelor. A+++ Track and Trace unifică vizibilitatea calității, energiei și performanței.',
      references: ['BSH', 'Vestel', 'Whirlpool', 'Haier'],
      pack: 'A+++ Track and Trace',
      highlights: [
        'Validare serie și listă de materiale în linii de mare viteză',
        'Vizibilitate OEE pentru timpi morți și pierderi de performanță',
        'Analize de intensitate energetică la nivel de linie pentru controlul costurilor',
      ],
    },
  },
  {
    slug: 'gida-icecek',
    tr: {
      title: 'Gıda & İçecek',
      metrics: 'ISO 22005:2007 · Organic T&T · HACCP',
      summary:
        'Hammaddeden rafa parti ve lot izlenebilirliği, hızlı ürün geri çağırma, ISO 22005 ve İYS uyumu ile gıda güvenliği zincirinin tamamı.',
      detail:
        'Gıda sektöründe parti zinciri, CCP noktaları ve kalite kayıtları birlikte yönetilmelidir. Organic Track and Trace ile geri çağırma kapsamı saniyeler içinde netleşir.',
      references: ['Mey Diageo', 'Tuborg', 'Ajinomoto', 'Duru'],
      pack: 'Organic Track and Trace',
      highlights: [
        'Parti ve lot bazlı tam izlenebilirlik zinciri',
        'Geri çağırma senaryoları için hızlı etki analizi',
        'HACCP kritik kontrol noktalarının dijital kanıt zinciri',
      ],
    },
    en: {
      title: 'Food & Beverage',
      metrics: 'ISO 22005:2007 · Organic T&T · HACCP',
      summary:
        'Lot-level traceability from raw material intake to shelf, faster recall response, and ISO 22005-aligned food safety operations.',
      detail:
        'Food operations require integrated management of lot genealogy, CCP records, and quality evidence. Organic Track and Trace narrows recall scope and accelerates response.',
      references: ['Mey Diageo', 'Tuborg', 'Ajinomoto', 'Duru'],
      pack: 'Organic Track and Trace',
      highlights: [
        'End-to-end lot genealogy from intake to dispatch',
        'Rapid impact analysis for recall scenarios',
        'Digital evidence chain for HACCP critical points',
      ],
    },
    ro: {
      title: 'Alimente & Băuturi',
      metrics: 'ISO 22005:2007 · Organic T&T · HACCP',
      summary:
        'Trasabilitate la nivel de lot de la recepția materiilor prime până la raft, răspuns mai rapid la rechemări și operațiuni de siguranță alimentară aliniate la ISO 22005.',
      detail:
        'Operațiunile alimentare necesită gestionarea integrată a genealogiei loturilor, înregistrărilor CCP și dovezilor de calitate. Organic Track and Trace restrânge scopul rechemărilor și accelerează răspunsul.',
      references: ['Mey Diageo', 'Tuborg', 'Ajinomoto', 'Duru'],
      pack: 'Organic Track and Trace',
      highlights: [
        'Genealogie lot end-to-end de la recepție la expediere',
        'Analiză rapidă a impactului pentru scenariile de rechemare',
        'Lanț digital de dovezi pentru punctele critice HACCP',
      ],
    },
  },
  {
    slug: 'ilac',
    tr: {
      title: 'İlaç',
      metrics: 'GMP · Capsule T&T · Serileştirme',
      summary:
        'Seri numarası, parti ve son kullanma tarihi takibi; soğuk zincir izleme ve GMP uyumlu doğrulama hattı.',
      detail:
        'İlaç üretiminde serileştirme ve soğuk zincir izleme sıfır hata toleransıyla yönetilir. Capsule Track and Trace, GMP uyumlu doğrulama ve denetlenebilir kayıt altyapısı sunar.',
      references: ['Capsule T&T', 'RFID', 'SICK'],
      pack: 'Capsule Track and Trace',
      highlights: [
        'GMP odaklı seri ve lot doğrulama akışları',
        'Soğuk zincir için sıcaklık ve olay kaydı izleme',
        'Regülatör denetimleri için audit-ready raporlama',
      ],
    },
    en: {
      title: 'Pharma & Health Products',
      metrics: 'GMP · Capsule T&T · Serialization',
      summary:
        'Serialization, batch and expiry tracking, and cold-chain monitoring with GMP-compliant verification workflows.',
      detail:
        'Pharma production requires strict serialization and cold-chain governance. Capsule Track and Trace provides GMP-compliant verification and inspection-ready data trails.',
      references: ['Capsule T&T', 'RFID', 'SICK'],
      pack: 'Capsule Track and Trace',
      highlights: [
        'GMP-focused serial and batch verification workflows',
        'Temperature and event monitoring for cold-chain integrity',
        'Audit-ready reporting for regulatory inspections',
      ],
    },
    ro: {
      title: 'Farmaceutice & Produse de Sănătate',
      metrics: 'GMP · Capsule T&T · Serializare',
      summary:
        'Serializare, urmărirea loturilor și a datelor de expirare și monitorizarea lanțului frigorific cu fluxuri de verificare conforme cu GMP.',
      detail:
        'Producția farmaceutică necesită o guvernare strictă a serializării și a lanțului frigorific. Capsule Track and Trace oferă o verificare conformă cu GMP și piste de date gata pentru inspecție.',
      references: ['Capsule T&T', 'RFID', 'SICK'],
      pack: 'Capsule Track and Trace',
      highlights: [
        'Fluxuri de verificare serială și de lot axate pe GMP',
        'Monitorizare temperatură și evenimente pentru integritatea lanțului frigorific',
        'Raportare gata de audit pentru inspecțiile de reglementare',
      ],
    },
  },
  {
    slug: 'makine-otomasyon',
    tr: {
      title: 'Makine & Otomasyon',
      metrics: 'PLC · SCADA · Servo · Pano · CNC',
      summary:
        'Montaj, paketleme ve kaplama tesislerinden servo-motion sistemlerine ve çok markalı CNC parkurlarına kadar, donanımdan yazılıma uçtan uca otomasyon sağlıyoruz.',
      detail:
        'Makinelerin fısıldamasını en iyi anlayan mühendislik yaklaşımıyla, montaj ve proses hatlarından çok markalı CNC parkurlarına kadar tam kapsamlı otomasyon teslim ediyoruz.',
      references: ['TEI', 'Phinia', 'Nemak'],
      pack: 'End-to-End Automation Layer',
      highlights: [
        'PLC, SCADA, HMI ve pano tasarımında bütünleşik mühendislik',
        'Servo ve motion kontrol ile hassas proses yönetimi',
        'PCT dahil CNC patent başvurularıyla korunan yöntem bilgisi',
      ],
    },
    en: {
      title: 'Machinery, Process & CNC Automation',
      metrics: 'PLC · SCADA · Servo · Panel · CNC',
      summary:
        'End-to-end automation from hardware to software for assembly and packaging plants, coating lines, servo and motion systems, and multi-brand CNC environments.',
      detail:
        'From assembly and process lines to multi-brand CNC fleets, we deliver full-scope automation engineering with a single integrated architecture.',
      references: ['TEI', 'Phinia', 'Nemak'],
      pack: 'End-to-End Automation Layer',
      highlights: [
        'Integrated engineering across PLC, SCADA, HMI, and panel design',
        'Precision process control through servo and motion systems',
        'Protected know-how backed by CNC patent applications including PCT',
      ],
    },
    ro: {
      title: 'Mașini, Procese & Automatizare CNC',
      metrics: 'PLC · SCADA · Servo · Panou · CNC',
      summary:
        'Automatizare end-to-end de la hardware la software pentru fabrici de asamblare și ambalare, linii de acoperire, sisteme servo și de mișcare și medii CNC multi-brand.',
      detail:
        'De la liniile de asamblare și procesare până la flotele CNC multi-brand, oferim inginerie de automatizare completă cu o singură arhitectură integrată.',
      references: ['TEI', 'Phinia', 'Nemak'],
      pack: 'Strat de Automatizare End-to-End',
      highlights: [
        'Inginerie integrată pentru PLC, SCADA, HMI și proiectarea panourilor',
        'Control precis al proceselor prin sisteme servo și de mișcare',
        'Know-how protejat, susținut de cereri de brevete CNC, inclusiv PCT',
      ],
    },
  },
  {
    slug: 'tekstil',
    tr: {
      title: 'Tekstil',
      metrics: 'Üretim Veri Toplama · Boya Reçete · OEE',
      summary:
        'Dokuma, örme, boyahane ve konfeksiyon hatlarında reçete yönetimi, üretim verimi izleme ve makineler arası entegrasyon.',
      detail:
        'Elyaftan mamule uzanan zincirde parti, reçete ve vardiya verisini birleştiriyor; boyahane dahil enerji yoğun süreçlerde ölçülebilir iyileştirme sağlıyoruz.',
      references: ['PLC Entegrasyon', 'Reçete Yönetimi'],
      pack: 'Textile Production Intelligence',
      highlights: [
        'Dokuma ve örme hatlarında anlık üretim izleme',
        'Boyahane reçetelerinin dijital kontrolü ve revizyon geçmişi',
        'Hatlar arası veri birleştirme ile verimlilik karşılaştırması',
      ],
    },
    en: {
      title: 'Textile & Apparel',
      metrics: 'Production Data Capture · Dye Recipe · OEE',
      summary:
        'Recipe management, production efficiency tracking, and machine integration across weaving, knitting, dye-house, and apparel operations.',
      detail:
        'We connect lot, recipe, and shift data across the full textile chain and deliver measurable improvement in high-energy operations such as dye-houses.',
      references: ['PLC Integration', 'Recipe Management'],
      pack: 'Textile Production Intelligence',
      highlights: [
        'Real-time production visibility for weaving and knitting operations',
        'Digital governance and revision history for dye-house recipes',
        'Cross-line data fusion for productivity benchmarking',
      ],
    },
    ro: {
      title: 'Textile & Confecții',
      metrics: 'Colectare Date Producție · Rețetă Vopsire · OEE',
      summary:
        'Managementul rețetelor, urmărirea eficienței producției și integrarea mașinilor în operațiunile de țesere, tricotare, vopsire și confecții.',
      detail:
        'Conectăm datele despre lot, rețetă și tură pe întregul lanț textil și oferim îmbunătățiri măsurabile în operațiunile cu consum mare de energie, cum ar fi vopsitoriile.',
      references: ['Integrare PLC', 'Management Rețete'],
      pack: 'Inteligenta in Productia Textila',
      highlights: [
        'Vizibilitate a producției în timp real pentru operațiunile de țesere și tricotare',
        'Guvernanță digitală și istoric de revizuire pentru rețetele vopsitoriei',
        'Fuzionarea datelor între linii pentru benchmarking-ul productivității',
      ],
    },
  },
  {
    slug: 'enerji-kimya',
    tr: {
      title: 'Enerji & Kimya',
      metrics: 'SCADA · OnSuite Green · CBAM · ESG',
      summary:
        'Enerji izleme, karbon ayak izi raporlaması ve proses otomasyonu. TÜBİTAK ve EUROGIA destekli OnSuite Green platformu ile CBAM hazırlığı.',
      detail:
        'Yeşil Mutabakat ve CBAM baskısı altında, enerji tüketimi ile karbon ayak izini aynı yapıda izleyerek denetlenebilir sürdürülebilirlik raporlaması sağlıyoruz.',
      references: ['OnSuite Green', 'SCADA', 'CBAM'],
      pack: 'Carbon and Process Intelligence',
      highlights: [
        'Enerji tüketimini hat, vardiya ve ürün bazında görünür kılma',
        'Karbon ayak izi hesaplama ve ESG raporlama altyapısı',
        'CBAM uyumu için veri toplama, doğrulama ve denetim izi',
      ],
    },
    en: {
      title: 'Energy & Chemicals',
      metrics: 'SCADA · OnSuite Green · CBAM · ESG',
      summary:
        'Energy monitoring, carbon footprint reporting, and process automation powered by the TUBITAK and EUROGIA-backed OnSuite Green platform for CBAM readiness.',
      detail:
        'Under Green Deal and CBAM requirements, we combine energy and carbon intelligence in one auditable structure for reliable sustainability reporting.',
      references: ['OnSuite Green', 'SCADA', 'CBAM'],
      pack: 'Carbon and Process Intelligence',
      highlights: [
        'Visibility of energy use by line, shift, and product',
        'Carbon accounting and ESG reporting infrastructure',
        'Data collection, verification, and audit trail for CBAM compliance',
      ],
    },
    ro: {
      title: 'Energie & Chimice',
      metrics: 'SCADA · OnSuite Green · CBAM · ESG',
      summary:
        'Monitorizarea energiei, raportarea amprentei de carbon și automatizarea proceselor susținute de platforma OnSuite Green, sprijinită de TUBITAK și EUROGIA, pentru pregătirea CBAM.',
      detail:
        'În baza cerințelor Pactului Verde și CBAM, combinăm inteligența energetică și a carbonului într-o singură structură auditabilă pentru o raportare fiabilă a sustenabilității.',
      references: ['OnSuite Green', 'SCADA', 'CBAM'],
      pack: 'Inteligență pentru Carbon și Procese',
      highlights: [
        'Vizibilitatea utilizării energiei pe linie, tură și produs',
        'Infrastructură de contabilitate a carbonului și raportare ESG',
        'Colectarea datelor, verificarea și pista de audit pentru conformitatea CBAM',
      ],
    },
  },
];

export const REFERENCE_LOGO_MAP = {
  JTI: '/assets/Logos/JTI_Logo.svg',
  'Philip Morris': '/assets/Logos/philip_morris_sa.svg',
  Philsa: '/assets/Logos/philip_morris_sa.svg',
  Bosch: '/assets/Logos/Bosch-logo.svg',
  Phinia: '/assets/Logos/phinia.svg',
  Nemak: '/assets/Logos/nemak.svg',
  Tirsan: '/assets/Logos/tirsan-seeklogo.webp',
  BSH: '/assets/Logos/BSH_Bosch_und_Siemens_Hausgerate_logo.svg',
  Vestel: '/assets/Logos/Vestel_logo.svg',
  Whirlpool: '/assets/Logos/whirlpool_corporation_logo_-as_of_2017.svg',
  Haier: '/assets/Logos/Haier_logo.svg',
  'Mey Diageo': '/assets/Logos/mey-diageo.svg',
  Tuborg: '/assets/Logos/turk-tuborg_logo.svg',
  Ajinomoto: '/assets/Logos/ajinomoto-global-seeklogo.svg',
  Duru: '/assets/Logos/duru_bulgur.svg',
  'Capsule T&T': '/assets/Logos/reference-placeholder.svg',
  RFID: '/assets/Logos/reference-placeholder.svg',
  SICK: '/assets/Logos/sick.svg',
  TEI: '/assets/Logos/TEI.svg',
  'PLC Integration': '/assets/Logos/reference-placeholder.svg',
  'Recipe Management': '/assets/Logos/reference-placeholder.svg',
  'PLC Entegrasyon': '/assets/Logos/reference-placeholder.svg',
  'Reçete Yönetimi': '/assets/Logos/reference-placeholder.svg',
  Carboniq: '/assets/Logos/reference-placeholder.svg',
  'OnSuite Green': '/assets/Logos/reference-placeholder.svg',
  SCADA: '/assets/Logos/reference-placeholder.svg',
  CBAM: '/assets/Logos/reference-placeholder.svg',
};

export function getSectorBySlug(slug) {
  return SECTORS.find((sector) => sector.slug === slug);
}
