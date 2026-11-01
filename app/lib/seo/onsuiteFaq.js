/**
 * OnSuite SSS — yalnızca JSON-LD (FAQPage) olarak yayınlanır, arayüzde GÖRÜNMEZ.
 *
 * Kaynaklar (uydurma bilgi yoktur):
 *   - messages/onSuitePage/{tr,en,ro}.json  (modüller, özellikler, mimari, kazanımlar)
 *   - onsuite.ro ana sayfa ve sitemap       (modül listesi, protokoller, mimari)
 *   - app/sektorler/*                       (OnSuite'in kullanıldığı sektörler)
 *
 * Not: Google, FAQPage işaretlemesinin sayfada görünür içerikle aynı olmasını önerir;
 * bu liste bilerek yalnızca yapay zekâ / cevap motorları için işaretlemede tutulur.
 * Görünür bir SSS bölümü eklenirse aynı metinler kullanılmalıdır.
 */

export const ONSUITE_FAQ = {
  en: [
    {
      q: 'What is OnSuite?',
      a: 'OnSuite is a modular, IoT-based smart MES (Manufacturing Execution System) platform developed by Siskon. It collects real-time data from production machinery and provides OEE analysis, traceability, energy monitoring and process optimization, from the shop floor to the cloud.',
    },
    {
      q: 'Which modules does OnSuite include?',
      a: 'OnSuite includes Connect (IIoT connectivity), Live (real-time monitoring), Optima (OEE and performance analytics), Trace (traceability), Forms (paperless digital forms), CNC (CNC machine data), TMC (OPC UA tobacco machine communication), Integra (ERP integration), Energy (energy management), Green (ESG and carbon footprint), Core (platform foundation) and Engage (dual-channel crisis management).',
    },
    {
      q: 'Can OnSuite be deployed module by module?',
      a: 'Yes. Each module can be deployed independently or as a fully integrated suite, on-premise or in the cloud, so you can start with the module that matches your need and expand as operations grow.',
    },
    {
      q: 'Does OnSuite calculate OEE and track downtime?',
      a: 'Yes. OnSuite Optima provides OEE, TEEP and OMT calculations with downtime, scrap and performance analytics, root cause analysis, bottleneck detection and automated Pareto reports. OnSuite Live adds live machine states, fault and downtime alerts and Andon screen management.',
    },
    {
      q: 'Which machines and protocols does OnSuite connect to?',
      a: 'OnSuite Connect supports OPC UA, OPC DA, Modbus, MQTT, REST and TCP/IP, with integration for Siemens S7, Beckhoff TwinCAT and Allen-Bradley controllers plus barcode, RFID and printer integration. The platform also supports PackML, ISA-88 and MTConnect, and OnSuite CNC collects protocol-level data from CNC machines such as Fanuc, Siemens and Mazak.',
    },
    {
      q: 'Can OnSuite integrate with ERP systems such as SAP?',
      a: 'Yes. OnSuite Integra provides two-way, real-time integration with SAP (BAPI / RFC), Canias and other ERP systems, including real-time inventory synchronization, work order automation and production confirmation transfer.',
    },
    {
      q: 'Does OnSuite provide product traceability?',
      a: 'Yes. OnSuite Trace delivers end-to-end traceability from raw material to finished goods, with serial and lot tracking, BOM integration, backward traceability, quality certificate matching, GS1 standards and serialization.',
    },
    {
      q: 'Can OnSuite help with energy monitoring and ESG reporting?',
      a: 'Yes. OnSuite Energy offers ISO 50001 compliant consumption monitoring, cost analytics and load profile monitoring. OnSuite Green supports carbon footprint measurement, emission reporting, sustainability KPIs and regulatory compliance, including CBAM reporting needs.',
    },
    {
      q: 'What technology and security standards does OnSuite use?',
      a: 'OnSuite is built on a React, C# API and MS SQL architecture with a stored procedure based approach, fully automated SQL testing with tSQLt and CI/CD on Azure DevOps. The platform states full compliance with ISO/IEC 27001:2022 information security standards.',
    },
    {
      q: 'Which industries use OnSuite?',
      a: 'Siskon applies OnSuite in discrete and process manufacturing, with dedicated solution packs for textile, white goods, tobacco (OnSuite TMC) and energy and chemicals (OnSuite Green and Energy), as well as machine builders and automotive suppliers.',
    },
    {
      q: 'How can I request an OnSuite demo?',
      a: 'Use the contact form on the Siskon Romania contact page or the OnSuite website at onsuite.ro to request a demo or a tailored module recommendation for your factory.',
    },
  ],
  ro: [
    {
      q: 'Ce este OnSuite?',
      a: 'OnSuite este o platformă MES (Manufacturing Execution System) modulară, bazată pe IoT, dezvoltată de Siskon. Colectează date în timp real de la utilajele de producție și oferă analiză OEE, trasabilitate, monitorizarea energiei și optimizarea proceselor, de la nivelul fabricii până în cloud.',
    },
    {
      q: 'Ce module include OnSuite?',
      a: 'OnSuite include Connect (conectivitate IIoT), Live (monitorizare în timp real), Optima (OEE și analiza performanței), Trace (trasabilitate), Forms (formulare digitale fără hârtie), CNC (date de la mașini CNC), TMC (comunicare OPC UA pentru utilaje de tutun), Integra (integrare ERP), Energy (managementul energiei), Green (ESG și amprentă de carbon), Core (fundația platformei) și Engage (management al crizelor pe două canale).',
    },
    {
      q: 'Poate fi implementat OnSuite modul cu modul?',
      a: 'Da. Fiecare modul poate fi implementat independent sau ca o suită complet integrată, on-premise sau în cloud, astfel încât puteți începe cu modulul potrivit nevoii dumneavoastră și extinde pe măsură ce operațiunile cresc.',
    },
    {
      q: 'Calculează OnSuite OEE și urmărește timpii de oprire?',
      a: 'Da. OnSuite Optima oferă calcule OEE, TEEP și OMT, analiză a opririlor, rebuturilor și performanței, analiză a cauzei rădăcină, detectarea blocajelor și rapoarte Pareto automate. OnSuite Live adaugă stările mașinilor în timp real, alerte de defecțiuni și opriri și gestionarea ecranelor Andon.',
    },
    {
      q: 'Cu ce mașini și protocoale se conectează OnSuite?',
      a: 'OnSuite Connect suportă OPC UA, OPC DA, Modbus, MQTT, REST și TCP/IP, cu integrare pentru controlere Siemens S7, Beckhoff TwinCAT și Allen-Bradley, plus integrare cu coduri de bare, RFID și imprimante. Platforma suportă și PackML, ISA-88 și MTConnect, iar OnSuite CNC colectează date la nivel de protocol de la mașini CNC precum Fanuc, Siemens și Mazak.',
    },
    {
      q: 'Se poate integra OnSuite cu sisteme ERP precum SAP?',
      a: 'Da. OnSuite Integra oferă integrare bidirecțională, în timp real, cu SAP (BAPI / RFC), Canias și alte sisteme ERP, inclusiv sincronizarea stocurilor în timp real, automatizarea ordinelor de lucru și transferul confirmărilor de producție.',
    },
    {
      q: 'Oferă OnSuite trasabilitatea produselor?',
      a: 'Da. OnSuite Trace asigură trasabilitate integrală de la materia primă la produsul finit, cu urmărire pe serie și lot, integrare BOM, trasabilitate inversă, asocierea certificatelor de calitate, standarde GS1 și serializare.',
    },
    {
      q: 'Poate OnSuite ajuta la monitorizarea energiei și raportarea ESG?',
      a: 'Da. OnSuite Energy oferă monitorizare a consumului conform ISO 50001, analiză a costurilor și monitorizarea profilului de sarcină. OnSuite Green sprijină măsurarea amprentei de carbon, raportarea emisiilor, indicatori de sustenabilitate și conformitatea reglementară, inclusiv cerințele de raportare CBAM.',
    },
    {
      q: 'Ce tehnologii și standarde de securitate folosește OnSuite?',
      a: 'OnSuite are la bază o arhitectură React, API C# și MS SQL, cu abordare orientată pe proceduri stocate, teste SQL complet automatizate cu tSQLt și CI/CD în Azure DevOps. Platforma declară conformitate deplină cu standardul de securitate a informației ISO/IEC 27001:2022.',
    },
    {
      q: 'Ce industrii folosesc OnSuite?',
      a: 'Siskon aplică OnSuite în producția discretă și de proces, cu pachete dedicate pentru industria textilă, electrocasnice, tutun (OnSuite TMC) și energie și chimie (OnSuite Green și Energy), precum și pentru constructori de mașini și furnizori auto.',
    },
    {
      q: 'Cum pot solicita o demonstrație OnSuite?',
      a: 'Folosiți formularul din pagina de contact Siskon România sau site-ul OnSuite onsuite.ro pentru a solicita o demonstrație sau o recomandare de module adaptată fabricii dumneavoastră.',
    },
  ],
  tr: [
    {
      q: 'OnSuite nedir?',
      a: 'OnSuite, Siskon tarafından geliştirilen modüler, IoT tabanlı akıllı bir MES (Manufacturing Execution System, Üretim Yürütme Sistemi) platformudur. Üretim makinelerinden gerçek zamanlı veri toplar; sahadan buluta OEE analizi, izlenebilirlik, enerji izleme ve proses optimizasyonu sağlar.',
    },
    {
      q: 'OnSuite hangi modülleri içerir?',
      a: 'OnSuite; Connect (IIoT bağlantısı), Live (gerçek zamanlı izleme), Optima (OEE ve performans analitiği), Trace (izlenebilirlik), Forms (kâğıtsız dijital formlar), CNC (CNC makine verisi), TMC (tütün makineleri için OPC UA iletişimi), Integra (ERP entegrasyonu), Energy (enerji yönetimi), Green (ESG ve karbon ayak izi), Core (platform temeli) ve Engage (çift kanallı kriz yönetimi) modüllerini içerir.',
    },
    {
      q: 'OnSuite modül modül devreye alınabilir mi?',
      a: 'Evet. Her modül bağımsız olarak ya da tam entegre bir paket olarak, yerinde (on-premise) veya bulutta devreye alınabilir; ihtiyacınıza uygun modülle başlayıp operasyonunuz büyüdükçe genişletebilirsiniz.',
    },
    {
      q: 'OnSuite OEE hesaplar ve duruşları izler mi?',
      a: 'Evet. OnSuite Optima; OEE, TEEP ve OMT hesaplamaları, duruş, fire ve performans analitiği, kök neden analizi, darboğaz tespiti ve otomatik Pareto raporları sunar. OnSuite Live ise anlık makine durumları, arıza ve duruş uyarıları ile Andon ekran yönetimi ekler.',
    },
    {
      q: 'OnSuite hangi makine ve protokollere bağlanır?',
      a: 'OnSuite Connect; OPC UA, OPC DA, Modbus, MQTT, REST ve TCP/IP desteği sunar, Siemens S7, Beckhoff TwinCAT ve Allen-Bradley denetleyicileriyle ve barkod, RFID ve yazıcı entegrasyonuyla çalışır. Platform ayrıca PackML, ISA-88 ve MTConnect\'i destekler; OnSuite CNC, Fanuc, Siemens ve Mazak gibi CNC tezgâhlarından protokol seviyesinde veri toplar.',
    },
    {
      q: 'OnSuite, SAP gibi ERP sistemleriyle entegre olabilir mi?',
      a: 'Evet. OnSuite Integra; SAP (BAPI / RFC), Canias ve diğer ERP sistemleriyle çift yönlü, gerçek zamanlı entegrasyon sağlar; anlık stok senkronizasyonu, iş emri otomasyonu ve üretim onayı aktarımını içerir.',
    },
    {
      q: 'OnSuite ürün izlenebilirliği sağlar mı?',
      a: 'Evet. OnSuite Trace; hammaddeden bitmiş ürüne uçtan uca izlenebilirlik sunar: seri ve lot takibi, BOM entegrasyonu, geriye doğru izlenebilirlik, kalite sertifikası eşleştirme, GS1 standartları ve serileştirme.',
    },
    {
      q: 'OnSuite enerji izleme ve ESG raporlamasına yardımcı olur mu?',
      a: 'Evet. OnSuite Energy; ISO 50001 uyumlu tüketim izleme, maliyet analitiği ve yük profili izleme sunar. OnSuite Green; karbon ayak izi ölçümü, emisyon raporlama, sürdürülebilirlik KPI\'ları ve CBAM dahil mevzuat uyumunu destekler.',
    },
    {
      q: 'OnSuite hangi teknoloji ve güvenlik standartlarını kullanır?',
      a: 'OnSuite; saklı yordam odaklı React, C# API ve MS SQL mimarisi üzerine kuruludur; tSQLt ile tam otomatik SQL testleri ve Azure DevOps üzerinde CI/CD kullanır. Platform, ISO/IEC 27001:2022 bilgi güvenliği standartlarına tam uyum beyan eder.',
    },
    {
      q: 'OnSuite hangi sektörlerde kullanılır?',
      a: 'Siskon, OnSuite\'i ayrık ve proses üretiminde uygular; tekstil, beyaz eşya, tütün (OnSuite TMC) ile enerji ve kimya (OnSuite Green ve Energy) için özel çözüm paketleri vardır; makine üreticileri ve otomotiv tedarikçileri de kapsamdadır.',
    },
    {
      q: 'OnSuite demosunu nasıl talep edebilirim?',
      a: 'Demo veya fabrikanıza uygun modül önerisi talep etmek için Siskon Romanya iletişim sayfasındaki formu ya da onsuite.ro sitesini kullanabilirsiniz.',
    },
  ],
};
