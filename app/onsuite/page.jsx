'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PageHero from '../components/PageHero';
import SmartImage from '../components/SmartImage';
import IconFeatureGrid from '../components/IconFeatureGrid';
import FeatureTokenList from '../components/FeatureTokenList';
import { useLanguage } from '../_context/LanguageContext';

export default function OnSuitePage() { // NOSONAR
  const [activeTab, setActiveTab] = useState(0);
  const [showAllModules, setShowAllModules] = useState(false);
  const [showAllGains, setShowAllGains] = useState(false);
  const detailBoxRef = React.useRef(null);
  const { t, locale, localizePath } = useLanguage();
  const handleTabChange = (idx) => {
    setActiveTab(idx);
    
    // Use setTimeout to allow React to update the DOM with the new module content before calculating scroll height
    setTimeout(() => {
      if (detailBoxRef.current) {
        const headerOffset = 100; // safe space to clear the sticky header
        const elementPosition = detailBoxRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const contentKey = `onsuite-${locale}`;

  const modules = isRo
    ? [
        {
          name: 'OnSuite Connect',
          sub: 'Conectivitate IIoT',
          desc: 'Strat de colectare a datelor industriale cu suport pentru protocol deschis de la fabrică la cloud: OPC UA, Beckhoff, Siemens, MQTT, Modbus, REST.',
          link: 'https://www.onsuite.com.tr/ro/moduller/connect',
          icon: '/SiteIcon/products/connectivity.svg',
          features: ['Suport OPC UA & DA', 'Integrare Siemens & Beckhoff', 'MQTT & REST Pipeline', 'Infrastructură Edge Computing'],
        },
        {
          name: 'OnSuite Live',
          sub: 'Monitorizare în timp real',
          desc: 'Vizibilitate în timp real a producției: mașini, operatori, linii și procese într-o singură vizualizare live.',
          link: 'https://www.onsuite.com.tr/ro/moduller/live',
          icon: '/SiteIcon/products/monitora.svg',
          features: ['Stări Live ale Mașinilor', 'Urmărirea Performanței Operatorilor', 'Alerte de Defecțiuni și Timpi de Inactivitate', 'Managementul Ecranelor Andon'],
        },
        {
          name: 'OnSuite Optima',
          sub: 'Analiza Performanței',
          desc: 'Monitorizare OEE cu timpi de inactivitate, deșeuri și analize de performanță, inclusiv analiză de cauză rădăcină, Pareto și blocaje.',
          link: 'https://www.onsuite.com.tr/ro/moduller/optima',
          icon: '/SiteIcon/products/oee.svg',
          features: ['Calculații OEE / TEEP / OMT', 'Analiza Cauzei Rădăcină (RCA)', 'Detectarea Blocajelor', 'Rapoarte Automate Pareto'],
        },
        {
          name: 'OnSuite Trace',
          sub: 'Trasabilitate',
          desc: 'Trasabilitate end-to-end de la materia primă la produsele finite cu standarde GS1, serializare și track-and-trace.',
          link: 'https://www.onsuite.com.tr/ro/moduller/trace',
          icon: '/SiteIcon/products/izlenebilirlik.svg',
          features: ['Urmărire Serii și Loturi', 'Integrare BOM', 'Trasabilitate Inversă', 'Potrivire Certificat de Calitate'],
        },
        {
          name: 'OnSuite Forms',
          sub: 'Operațiuni Fără Hârtie',
          desc: 'SmartForms digitale pentru 5S, OPL și controlul calității, înlocuind hârtia cu fluxuri de lucru audibile în teren.',
          link: 'https://www.onsuite.com.tr/ro/moduller/forms',
          icon: '/SiteIcon/products/dsf.svg',
          features: ['Designer de Formulare Digitale', 'Introducere Date Offline', 'Fluxuri de Aprobare', 'Traseu de Audit'],
        },
        {
          name: 'OnSuite CNC',
          sub: 'Optimizare CNC',
          desc: 'Date la nivel de protocol de la Fanuc, Siemens, Mazak și alte CNC-uri cu analiza duratei de viață a sculelor și a performanței.',
          link: 'https://www.onsuite.com.tr/ro/moduller/cnc',
          icon: '/SiteIcon/products/cnc.svg',
          features: ['Analiză G-Code', 'Urmărirea Duratei de Viață a Sculelor', 'Monitorizarea Sarcinii Axiale', 'Managementul Programelor de Piese'],
        },
        {
          name: 'OnSuite TMC',
          sub: 'Managementul Sculelor OPC UA',
          desc: 'Experiență reală de implementare a OPC UA TMC adaptată operațiunilor din industria tutunului.',
          link: 'https://www.onsuite.com.tr/ro/moduller/tmc',
          icon: '/SiteIcon/products/opctmc.svg',
          features: ['Conformitate cu Standardul TMC', 'Integrare Mașini de Tutun', 'Colectare Date de Înaltă Precizie', 'Raportare Globală'],
        },
        {
          name: 'OnSuite Integra',
          sub: 'Integrare ERP',
          desc: 'Integrare bidirecțională, în timp real cu SAP, Canias și alte sisteme ERP.',
          link: 'https://www.onsuite.com.tr/ro/moduller/integra',
          icon: '/SiteIcon/products/entegrasyon.svg',
          features: ['Integrare SAP BAPI / RFC', 'Sincronizare Inventar în Timp Real', 'Automatizarea Ordinelor de Lucru', 'Transfer Confirmare Producție'],
        },
        {
          name: 'OnSuite Energy',
          sub: 'Managementul Energiei',
          desc: 'Monitorizare și analize ale consumului conforme cu ISO 50001 care fac costurile cu energia vizibile și gestionabile.',
          link: 'https://www.onsuite.com.tr/ro/moduller/energy',
          icon: '/SiteIcon/products/enerji.svg',
          features: ['Conformitate ISO 50001', 'Analiza Costurilor', 'Monitorizarea Profilului de Sarcină', 'Prognoze de Eficiență'],
        },
        {
          name: 'OnSuite Green',
          sub: 'ESG și Carbon',
          desc: 'Platformă industrială pentru urmărirea amprentei de carbon, valorile de sustenabilitate și raportarea ESG.',
          link: 'https://www.onsuite.com.tr/ro/moduller/green',
          icon: '/SiteIcon/products/carboniq.svg',
          features: ['Măsurarea Amprentei de Carbon', 'Raportarea Emisiilor', 'KPI de Sustenabilitate', 'Conformitate Reglementară'],
        },
        {
          name: 'OnSuite Core',
          sub: 'Fundația Platformei',
          desc: 'Arhitectură React + C# API + MS SQL cu design de proceduri stocate și testare SQL automată tSQLt.',
          link: 'https://www.onsuite.com.tr/ro/moduller/core',
          icon: '/SiteIcon/products/core.svg',
          features: ['Fundație C# .NET API', 'Optimizarea Procedurilor Stocate', 'Framework de Testare tSQLt', 'Înaltă Disponibilitate'],
        },
        {
          name: 'OnSuite Engage',
          sub: 'Managementul Crizelor',
          desc: 'Sistem de apel de urgență cu două canale și management al crizelor pentru facilități industriale. Oferă interogare simultană via WhatsApp și SMS, vizibilitate centralizată și escaladare automată.',
          link: 'https://www.onsuite.com.tr/ro/moduller/engage',
          icon: '/SiteIcon/products/engage.svg',
          features: [
            'Confirmare Rapidă a Statusului', 
            'Vizibilitate Centralizată a Crizelor', 
            'Comunicare pe Două Canale', 
            'Managementul Incidentelor Înregistrate'
          ],
        }
      ]
    : isEn
    ? [
        {
          name: 'OnSuite Connect',
          sub: 'IIoT Connectivity',
          desc: 'Industrial data collection layer with open protocol support from shopfloor to cloud: OPC UA, Beckhoff, Siemens, MQTT, Modbus, REST.',
          link: 'https://www.onsuite.com.tr/en/modules/connect',
          icon: '/SiteIcon/products/connectivity.svg',
          features: ['OPC UA & DA Support', 'Siemens & Beckhoff Integration', 'MQTT & REST Pipeline', 'Edge Computing Infrastructure'],
        },
        {
          name: 'OnSuite Live',
          sub: 'Real-time Monitoring',
          desc: 'Real-time visibility of production: machines, operators, lines, and processes in a single live view.',
          link: 'https://www.onsuite.com.tr/en/modules/live',
          icon: '/SiteIcon/products/monitora.svg',
          features: ['Live Machine States', 'Operator Performance Tracking', 'Fault & Downtime Alerts', 'Andon Screen Management'],
        },
        {
          name: 'OnSuite Optima',
          sub: 'Performance Analytics',
          desc: 'OEE monitoring with downtime, scrap, and performance analytics including root-cause, Pareto, and bottleneck analysis.',
          link: 'https://www.onsuite.com.tr/en/modules/optima',
          icon: '/SiteIcon/products/oee.svg',
          features: ['OEE / TEEP / OMT Calculations', 'Root Cause Analysis (RCA)', 'Bottleneck Detection', 'Automated Pareto Reports'],
        },
        {
          name: 'OnSuite Trace',
          sub: 'Traceability',
          desc: 'End-to-end traceability from raw material to finished goods with GS1 standards, serialization, and track-and-trace.',
          link: 'https://www.onsuite.com.tr/en/modules/trace',
          icon: '/SiteIcon/products/izlenebilirlik.svg',
          features: ['Serial & Lot Tracking', 'BOM Integration', 'Backward Traceability', 'Quality Certificate Matching'],
        },
        {
          name: 'OnSuite Forms',
          sub: 'Paperless Operations',
          desc: 'Digital SmartForms for 5S, OPL, and quality control, replacing paper with auditable field workflows.',
          link: 'https://www.onsuite.com.tr/en/modules/forms',
          icon: '/SiteIcon/products/dsf.svg',
          features: ['Digital Form Designer', 'Offline Data Entry', 'Approval Flows', 'Audit Trail'],
        },
        {
          name: 'OnSuite CNC',
          sub: 'CNC Optimization',
          desc: 'Protocol-level data from Fanuc, Siemens, Mazak, and other CNCs with tool life and performance analytics.',
          link: 'https://www.onsuite.com.tr/en/modules/cnc',
          icon: '/SiteIcon/products/cnc.svg',
          features: ['G-Code Analysis', 'Tool Life Tracking', 'Axial Load Monitoring', 'Part Program Management'],
        },
        {
          name: 'OnSuite TMC',
          sub: 'OPC UA Tool Management',
          desc: 'Real-world OPC UA TMC implementation experience tailored for tobacco industry operations.',
          link: 'https://www.onsuite.com.tr/en/modules/tmc',
          icon: '/SiteIcon/products/opctmc.svg',
          features: ['TMC Standard Compliance', 'Tobacco Machine Integration', 'High-precision Data Collection', 'Global Reporting'],
        },
        {
          name: 'OnSuite Integra',
          sub: 'ERP Integration',
          desc: 'Two-way, real-time integration with SAP, Canias, and other ERP systems.',
          link: 'https://www.onsuite.com.tr/en/modules/integra',
          icon: '/SiteIcon/products/entegrasyon.svg',
          features: ['SAP BAPI / RFC Integration', 'Real-time Inventory Sync', 'Work Order Automation', 'Production Confirmation Transfer'],
        },
        {
          name: 'OnSuite Energy',
          sub: 'Energy Management',
          desc: 'ISO 50001 compliant consumption monitoring and analytics that make energy costs visible and manageable.',
          link: 'https://www.onsuite.com.tr/en/modules/energy',
          icon: '/SiteIcon/products/enerji.svg',
          features: ['ISO 50001 Compliance', 'Cost Analytics', 'Load Profile Monitoring', 'Efficiency Forecasts'],
        },
        {
          name: 'OnSuite Green',
          sub: 'ESG & Carbon',
          desc: 'Industrial platform for carbon footprint tracking, sustainability metrics, and ESG reporting.',
          link: 'https://www.onsuite.com.tr/en/modules/green',
          icon: '/SiteIcon/products/carboniq.svg',
          features: ['Carbon Footprint Measurement', 'Emission Reporting', 'Sustainability KPIs', 'Regulatory Compliance'],
        },
        {
          name: 'OnSuite Core',
          sub: 'Platform Foundation',
          desc: 'React + C# API + MS SQL architecture with stored procedure design and tSQLt automated SQL testing.',
          link: 'https://www.onsuite.com.tr/en/modules/core',
          icon: '/SiteIcon/products/core.svg',
          features: ['C# .NET API Foundation', 'Stored Procedure Optimization', 'tSQLt Test Framework', 'High Availability'],
        },
        {
          name: 'OnSuite Engage',
          sub: 'Crisis Management',
          desc: 'Dual-channel emergency roll-call and crisis management system for industrial facilities. Provides simultaneous querying via WhatsApp and SMS, centralized visibility, and automatic escalation.',
          link: 'https://www.onsuite.com.tr/en/modules/engage',
          icon: '/SiteIcon/products/engage.svg',
          features: [
            'Rapid Status Confirmation', 
            'Centralized Crisis Visibility', 
            'Dual-Channel Communication', 
            'Recorded Incident Management'
          ],
        }
      ]
    : [
        {
          name: 'OnSuite Connect',
          sub: 'IIoT Connectivity',
          desc: 'OPC UA, Beckhoff, Siemens, MQTT, Modbus ve REST desteğiyle sahadan buluta açık protokol tabanlı endüstriyel veri toplama katmanı.',
          link: 'https://www.onsuite.com.tr/tr/moduller/connect',
          icon: '/SiteIcon/products/connectivity.svg',
          features: ['OPC UA & DA desteği', 'Siemens & Beckhoff entegrasyonu', 'MQTT & REST veri hattı', 'Edge computing altyapısı'],
        },
        {
          name: 'OnSuite Live',
          sub: 'Gerçek Zamanlı İzleme',
          desc: 'Üretim sahasının canlı durumu: makineler, operatörler, hatlar ve süreçler tek ekranda gerçek zamanlı izlenir.',
          link: 'https://www.onsuite.com.tr/tr/moduller/live',
          icon: '/SiteIcon/products/monitora.svg',
          features: ['Canlı makine durumları', 'Operatör performans takibi', 'Hata ve duruş bildirimleri', 'Andon ekran yönetimi'],
        },
        {
          name: 'OnSuite Optima',
          sub: 'Performans Analitiği',
          desc: 'OEE takibi, duruş, fire ve performans analizi; kök neden, Pareto ve darboğaz çözümleme.',
          link: 'https://www.onsuite.com.tr/tr/moduller/optima',
          icon: '/SiteIcon/products/oee.svg',
          features: ['OEE / TEEP / OMT hesaplama', 'Kök neden analizi (RCA)', 'Darboğaz tespiti', 'Otomatik Pareto raporları'],
        },
        {
          name: 'OnSuite Trace',
          sub: 'İzlenebilirlik',
          desc: 'Hammaddeden mamule uçtan uca izlenebilirlik; GS1 standartları, serileştirme ve track-and-trace süreçleri.',
          link: 'https://www.onsuite.com.tr/tr/moduller/trace',
          icon: '/SiteIcon/products/izlenebilirlik.svg',
          features: ['Seri ve lot takibi', 'Ürün ağacı (BOM) entegrasyonu', 'Ters izlenebilirlik', 'Kalite sertifika eşleştirme'],
        },
        {
          name: 'OnSuite Forms',
          sub: 'Kağıtsız Operasyon',
          desc: 'Dijital SmartForms, 5S, OPL ve kalite kontrol süreçleriyle kağıdın yerini alan denetlenebilir saha akışları.',
          link: 'https://www.onsuite.com.tr/tr/moduller/forms',
          icon: '/SiteIcon/products/dsf.svg',
          features: ['Dijital form tasarımcısı', 'Çevrimdışı veri girişi', 'Onay mekanizmaları', 'Denetim izi'],
        },
        {
          name: 'OnSuite CNC',
          sub: 'CNC Optimizasyonu',
          desc: 'Fanuc, Siemens, Mazak ve diğer CNC sistemlerinden protokol seviyesinde veri, takım ömrü ve performans analitiği.',
          link: 'https://www.onsuite.com.tr/tr/moduller/cnc',
          icon: '/SiteIcon/products/cnc.svg',
          features: ['G-Code analizi', 'Takım ömrü takibi', 'Eksenel yük izleme', 'Parça program yönetimi'],
        },
        {
          name: 'OnSuite TMC',
          sub: 'OPC UA Tool Management',
          desc: 'Tütün endüstrisine özel gerçek dünya OPC UA TMC uygulama deneyimi.',
          link: 'https://www.onsuite.com.tr/tr/moduller/tmc',
          icon: '/SiteIcon/products/opctmc.svg',
          features: ['TMC standart uyumu', 'Tütün makinesi entegrasyonu', 'Hassas veri toplama', 'Global raporlama'],
        },
        {
          name: 'OnSuite Integra',
          sub: 'ERP Entegrasyonu',
          desc: 'SAP, Canias ve diğer ERP sistemleriyle iki yönlü, gerçek zamanlı entegrasyon sağlar.',
          link: 'https://www.onsuite.com.tr/tr/moduller/integra',
          icon: '/SiteIcon/products/entegrasyon.svg',
          features: ['SAP BAPI / RFC entegrasyonu', 'Gerçek zamanlı stok senkronu', 'İş emri otomasyonu', 'Üretim teyit aktarımı'],
        },
        {
          name: 'OnSuite Energy',
          sub: 'Enerji Yönetimi',
          desc: 'ISO 50001 uyumlu tüketim takibi ve analitiğiyle enerji maliyetlerini görünür ve yönetilebilir hale getirir.',
          link: 'https://www.onsuite.com.tr/tr/moduller/energy',
          icon: '/SiteIcon/products/enerji.svg',
          features: ['ISO 50001 uyumluluk', 'Maliyet analizi', 'Yük profili takibi', 'Verimlilik tahminleri'],
        },
        {
          name: 'OnSuite Green',
          sub: 'ESG ve Karbon',
          desc: 'Karbon ayak izi, sürdürülebilirlik göstergeleri ve ESG raporlaması için endüstriyel platform.',
          link: 'https://www.onsuite.com.tr/tr/moduller/green',
          icon: '/SiteIcon/products/carboniq.svg',
          features: ['Karbon ayak izi ölçümü', 'Emisyon raporlama', 'Sürdürülebilirlik KPI takibi', 'Yasal mevzuat uyumu'],
        },
        {
          name: 'OnSuite Core',
          sub: 'Platform Altyapısı',
          desc: 'React + C# API + MS SQL mimarisi; stored procedure tasarımı ve tSQLt otomatik SQL test altyapısı.',
          link: 'https://www.onsuite.com.tr/tr/moduller/core',
          icon: '/SiteIcon/products/core.svg',
          features: ['C# .NET API altyapısı', 'Stored procedure optimizasyonu', 'tSQLt test framework', 'Yüksek erişilebilirlik'],
        },
        {
          name: 'OnSuite Engage',
          sub: 'Kriz Yönetimi',
          desc: 'Endüstriyel tesisler için çift kanallı acil durum yoklama ve kriz yönetim sistemi. WhatsApp ve SMS ile eş zamanlı sorgu, merkezi görünürlük ve otomatik eskalasyon sağlar.',
          link: 'https://www.onsuite.com.tr/tr/moduller/engage',
          icon: '/SiteIcon/products/Engage.svg',
          features: [
            'Hızlı Durum Teyidi', 
            'Merkezi Kriz Görünürlüğü', 
            'Çift Kanallı İletişim', 
            'Kayıtlı Olay Yönetimi'
          ],
        }
      ];

  const architectureItems = isRo
    ? [
        { title: 'React + C# API + MS SQL', description: 'Arhitectură bazată pe proceduri stocate, independentă de Entity Framework.', icon: '/SiteIcon/modules/system.svg' },
        { title: 'Suport pentru Protocol Deschis', description: 'OPC UA · PackML · ISA-88 · MTConnect · REST · MQTT.', icon: '/SiteIcon/modules/vtopcua.svg' },
        { title: 'Sursă Unică de Date', description: 'Raportare consecventă și sigură printr-o arhitectură unificată.', icon: '/SiteIcon/modules/organization.svg' },
        { title: 'Pipeline Edge-to-Cloud', description: 'Pipeline de date cu protocol deschis de la fabrică la cloud.', icon: '/SiteIcon/products/connectivity.svg' },
        { title: 'CI/CD și Automatizare', description: 'Teste SQL complet automatizate cu Azure DevOps și tSQLt.', icon: '/SiteIcon/products/approve.svg' },
        { title: 'Securitate Informațională Ridicată', description: 'Conformitate completă cu standardele ISO/IEC 27001:2022.', icon: '/SiteIcon/modules/security.svg' },
      ]
    : isEn
    ? [
        { title: 'React + C# API + MS SQL', description: 'Stored procedure-based architecture independent from Entity Framework.', icon: '/SiteIcon/modules/system.svg' },
        { title: 'Open Protocol Support', description: 'OPC UA · PackML · ISA-88 · MTConnect · REST · MQTT.', icon: '/SiteIcon/modules/vtopcua.svg' },
        { title: 'Single Source of Data', description: 'Consistent and reliable reporting through unified architecture.', icon: '/SiteIcon/modules/organization.svg' },
        { title: 'Edge-to-Cloud Pipeline', description: 'Open-protocol data pipeline from shopfloor to cloud.', icon: '/SiteIcon/products/connectivity.svg' },
        { title: 'CI/CD & Automation', description: 'Fully automated SQL tests with Azure DevOps and tSQLt.', icon: '/SiteIcon/products/approve.svg' },
        { title: 'High Information Security', description: 'Full compliance with ISO/IEC 27001:2022 standards.', icon: '/SiteIcon/modules/security.svg' },
      ]
    : [
        { title: 'React + C# API + MS SQL', description: 'Stored procedure tabanlı, Entity Framework bağımsız mimari.', icon: '/SiteIcon/modules/system.svg' },
        { title: 'Açık Protokol Desteği', description: 'OPC UA · PackML · ISA-88 · MTConnect · REST · MQTT.', icon: '/SiteIcon/modules/vtopcua.svg' },
        { title: 'Tek Veri Kaynağı', description: 'Bütünleşik mimari ile tutarlı ve güvenilir raporlama.', icon: '/SiteIcon/modules/organization.svg' },
        { title: 'Edge-to-Cloud Pipeline', description: 'Sahadan buluta açık protokol destekli veri hattı.', icon: '/SiteIcon/products/connectivity.svg' },
        { title: 'CI/CD & Otomasyon', description: 'Azure DevOps ve tSQLt ile tam otomatik SQL testleri.', icon: '/SiteIcon/products/approve.svg' },
        { title: 'Yüksek Bilgi Güvenliği', description: 'ISO/IEC 27001:2022 standartlarına tam uyum.', icon: '/SiteIcon/modules/security.svg' },
      ];

  const gainItems = isRo
    ? [
        { title: 'Vizibilitate în timp real', icon: '/SiteIcon/products/monitora.svg' },
        { title: 'Analiza performanței și OEE live', icon: '/SiteIcon/products/oee.svg' },
        { title: 'Operațiuni digitale în fabrică, fără hârtie', icon: '/SiteIcon/products/dsf.svg' },
        { title: 'Scalabilitate pe mai multe facilități', icon: '/SiteIcon/modules/organization.svg' },
        { title: 'Integrare ERP la nivel de întreprindere (SAP etc.)', icon: '/SiteIcon/products/entegrasyon.svg' },
        { title: 'Analiza timpilor de inactivitate și a cauzelor rădăcină', icon: '/SiteIcon/modules/notif.svg' },
        { title: 'Monitorizarea energiei și conformitate ISO 50001', icon: '/SiteIcon/products/enerji.svg' },
        { title: 'Managementul alarmelor și ecrane Andon', icon: '/SiteIcon/modules/notification.svg' },
      ]
    : isEn
    ? [
        { title: 'Real-time visibility', icon: '/SiteIcon/products/monitora.svg' },
        { title: 'Live OEE and performance analytics', icon: '/SiteIcon/products/oee.svg' },
        { title: 'Paperless digital shopfloor operations', icon: '/SiteIcon/products/dsf.svg' },
        { title: 'Multi-site scalability', icon: '/SiteIcon/modules/organization.svg' },
        { title: 'Enterprise ERP integration (SAP etc.)', icon: '/SiteIcon/products/entegrasyon.svg' },
        { title: 'Downtime and root-cause analytics', icon: '/SiteIcon/modules/notif.svg' },
        { title: 'Energy monitoring and ISO 50001 compliance', icon: '/SiteIcon/products/enerji.svg' },
        { title: 'Alarm management and Andon screens', icon: '/SiteIcon/modules/notification.svg' },
      ]
    : [
        { title: 'Gerçek zamanlı görünürlük', icon: '/SiteIcon/products/monitora.svg' },
        { title: 'Canlı OEE ve performans analitiği', icon: '/SiteIcon/products/oee.svg' },
        { title: 'Kağıtsız dijital saha operasyonu', icon: '/SiteIcon/products/dsf.svg' },
        { title: 'Çoklu tesis ölçeklenebilirliği', icon: '/SiteIcon/modules/organization.svg' },
        { title: 'Kurumsal ERP entegrasyonu (SAP vb.)', icon: '/SiteIcon/products/entegrasyon.svg' },
        { title: 'Duruş ve kök-neden analizleri', icon: '/SiteIcon/modules/notif.svg' },
        { title: 'Enerji takibi ve ISO 50001 uyumu', icon: '/SiteIcon/products/enerji.svg' },
        { title: 'Alarm yönetimi ve Andon ekranları', icon: '/SiteIcon/modules/notification.svg' },
      ];

  const technicalCards = isRo
    ? [
        {
          title: 'Panou de Management',
          desc: 'Verificare cuprinzătoare a sistemului.',
          image: '/assets/onsuite/teknik/asset-56-400x.png',
        },
        {
          title: 'Colectarea și Procesarea Datelor',
          desc: 'Opțiuni de colectare manuală și automată a datelor.',
          image: '/assets/onsuite/teknik/veri_toplama@400x.png',
        },
        {
          title: 'Panou de Bord (Dashboard)',
          desc: 'Urmărire automată a performanței cu panouri personalizate.',
          image: '/assets/onsuite/teknik/dashboard@400x.png',
        },
        {
          title: 'Managementul Energiei și Resurselor',
          desc: 'Urmăriți și îmbunătățiți consumul de energie.',
          image: '/assets/onsuite/teknik/enerji_kaynak@400x.png',
        },
        {
          title: 'Managementul Alarmelor',
          desc: 'Sistem de avertizare imediată în condiții critice.',
          image: '/assets/onsuite/teknik/alarm@400x.png',
        },
        {
          title: 'Integrare ERP și Sisteme',
          desc: 'Partajare fluidă a datelor cu toate sistemele de întreprindere.',
          image: '/assets/onsuite/teknik/erp@400x.png',
        },
        {
          title: 'Integrare și Raportare',
          desc: 'Controlul producției end-to-end cu date în timp real.',
          image: '/assets/onsuite/teknik/entegrasyon@400x.png',
        },
        {
          title: 'Managementul Proceselor și Operatorilor',
          desc: 'Control total pe podeaua fabricii prin panouri digitale.',
          image: '/assets/onsuite/teknik/proses@400x.png',
        },
        {
          title: 'Analiză și Optimizare',
          desc: 'Performanță maximă prin analize ale cauzelor rădăcină.',
          image: '/assets/onsuite/teknik/analiz@400x.png',
        },
      ]
    : isEn
    ? [
        {
          title: 'Management Panel',
          desc: 'Comprehensive system check.',
          image: '/assets/onsuite/teknik/asset-56-400x.png',
        },
        {
          title: 'Data Collection and Processing',
          desc: 'Manual and automatic data collection options.',
          image: '/assets/onsuite/teknik/veri_toplama@400x.png',
        },
        {
          title: 'Dashboard',
          desc: 'Automated performance tracking with custom dashboards.',
          image: '/assets/onsuite/teknik/dashboard@400x.png',
        },
        {
          title: 'Energy and Resource Management',
          desc: 'Track and improve energy consumption.',
          image: '/assets/onsuite/teknik/enerji_kaynak@400x.png',
        },
        {
          title: 'Alarm Management',
          desc: 'Immediate warning system in critical conditions.',
          image: '/assets/onsuite/teknik/alarm@400x.png',
        },
        {
          title: 'ERP and System Integration',
          desc: 'Seamless data sharing with all enterprise systems.',
          image: '/assets/onsuite/teknik/erp@400x.png',
        },
        {
          title: 'Integration and Reporting',
          desc: 'End-to-end production control with real-time data.',
          image: '/assets/onsuite/teknik/entegrasyon@400x.png',
        },
        {
          title: 'Process and Operator Management',
          desc: 'Total shop-floor control via digital panels.',
          image: '/assets/onsuite/teknik/proses@400x.png',
        },
        {
          title: 'Analysis and Optimization',
          desc: 'Maximum performance through root-cause analytics.',
          image: '/assets/onsuite/teknik/analiz@400x.png',
        },
      ]
    : [
        {
          title: 'Yönetim Paneli',
          desc: 'Kapsamlı sistem yapılandırma kontrolü.',
          image: '/assets/onsuite/teknik/asset-56-400x.png',
        },
        {
          title: 'Veri Toplama ve İşleme',
          desc: 'Manuel ve otomatik veri toplama seçenekleri.',
          image: '/assets/onsuite/teknik/veri_toplama@400x.png',
        },
        {
          title: 'Dashboard',
          desc: 'Özel panolarla anlık performans takibi.',
          image: '/assets/onsuite/teknik/dashboard@400x.png',
        },
        {
          title: 'Enerji ve Kaynak Yönetimi',
          desc: 'Enerji tüketimini izleme ve iyileştirme.',
          image: '/assets/onsuite/teknik/enerji_kaynak@400x.png',
        },
        {
          title: 'Alarm Yönetimi',
          desc: 'Kritik durumlarda anında uyarı sistemi.',
          image: '/assets/onsuite/teknik/alarm@400x.png',
        },
        {
          title: 'ERP ve Sistem Entegrasyonu',
          desc: 'Verilerin tüm sistemlerle sorunsuz paylaşımı.',
          image: '/assets/onsuite/teknik/erp@400x.png',
        },
        {
          title: 'Entegrasyon ve Raporlama',
          desc: (
            
              <span className="font-bold text-[#1A5FB4]">Anlık verilerle uçtan uca üretim kontrolü.</span>
          
          ),
          image: '/assets/onsuite/teknik/entegrasyon@400x.png',
        },
        {
          title: 'Proses ve Operatör Yönetimi',
          desc: (
            
              <span className="font-bold text-[#1A5FB4]">Dijital panellerle sahada tam hakimiyet.</span>
            
          ),
          image: '/assets/onsuite/teknik/proses@400x.png',
        },
        {
          title: 'Analiz ve Optimizasyon',
          desc: (
            
              <span className="font-bold text-[#1A5FB4]">Kök neden analizleriyle maksimum performans.</span>
          
          ),
          image: '/assets/onsuite/teknik/analiz@400x.png',
        }
      ];

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={t('onSuitePage.heroTitle')}
        subtitle={t('onSuitePage.heroSubtitle')}
        breadcrumbs={[t('onSuitePage.breadcrumbHome'), t('onSuitePage.breadcrumbProducts'), t('onSuitePage.breadcrumbOnSuite')]}
      />

      {/* Intro Section */}
      <section className="pt-10 pb-20 md:pt-16 md:pb-32 px-6">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 md:gap-12 items-start">
            <div className="hidden xl:block reveal order-2 xl:order-1">
              <div className="responsive-media-shell xl:mt-4">
                <SmartImage
                  src="/assets/new/urunler/onsuite/OnsuiteNew.webp"
                  alt={isRo ? 'Suita de Producție Inteligentă OnSuite - Platformă Integrată de Management al Producției' : isEn ? 'OnSuite Smart Manufacturing Suite - Integrated Production Management Platform' : 'OnSuite Akıllı Üretim Yönetim Sistemi - Entegre Üretim Yönetim Platformu'}
                  width={1920}
                  height={1080}
                  className="w-full xl:w-[116%] max-w-none h-auto object-contain xl:-ml-10 xl:-translate-y-20 drop-shadow-2xl"
                  style={{ maxHeight: 'none' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>

            <div className="reveal space-y-6 order-1 xl:order-2 h-full flex flex-col justify-start xl:pt-12">
              <SmartImage
                src="/assets/new/urunler/onsuite/OnsuiteNew.webp"
                alt={isRo ? 'Suita de Producție Inteligentă OnSuite - Platformă Integrată de Management al Producției' : isEn ? 'OnSuite Smart Manufacturing Suite - Integrated Production Management Platform' : 'OnSuite Akıllı Üretim Yönetim Sistemi - Entegre Üretim Yönetim Platformu'}
                width={1920}
                height={1080}
                className="w-full max-w-none h-auto object-contain drop-shadow-2xl xl:hidden"
                style={{ maxHeight: 'none' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 96vw"
                priority
                quality={75}
              />
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{isRo ? 'Produs' : isEn ? 'Product' : 'Ürün'}</span>
                <p className={`text-slate-600 text-lg leading-relaxed ${isRo || isEn ? '' : 'text-justify hyphens-auto'}`} lang={isRo ? 'ro' : isEn ? 'en' : 'tr'}>
                  {isRo
                    ? 'OnSuite este o familie de software industrial cu 11 module. Fiecare modul poate fi implementat independent sau ca o suită complet integrată, on-premise sau în cloud. Arhitectura React + C# API + MS SQL este concepută cu o abordare axată pe proceduri stocate și testare SQL complet automatizată cu tSQLt. Suportul pentru protocoale deschise include OPC UA, PackML, ISA-88, MTConnect, REST și MQTT.'
                    : isEn
                    ? 'OnSuite is an industrial software family with 11 modules. Each module can be deployed independently or as a fully integrated suite, on-premise or in the cloud. React + C# API + MS SQL architecture is designed with a stored procedure focused approach and fully automated SQL testing with tSQLt. Open protocol support includes OPC UA, PackML, ISA-88, MTConnect, REST, and MQTT.'
                    : 'OnSuite, IoT tabanlı akıllı bir MES (Üretim Yönetim Sistemi) platformudur. Üretim makinelerinden gerçek zamanlı veri toplayarak OEE analizleri sunar, izlenebilirlik süreçlerini kolaylaştırır ve süreç optimizasyonunu destekler. Manuel veya otomatik veri toplama seçenekleriyle, işletmenizin üretim süreçlerini dijitalleştirir, verimliliği artırır, iş akışlarını standartlaştırır ve karar alma süreçlerini güçlendirir.'}
                </p>
              </div>
              <div className="lg:hidden flex flex-col gap-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
                <span className="eyebrow self-start">{isRo ? 'Produs' : isEn ? 'Product' : 'Ürün'}</span>
                <p className={`text-slate-600 text-base leading-relaxed ${isRo || isEn ? '' : 'text-justify hyphens-auto'}`} lang={isRo ? 'ro' : isEn ? 'en' : 'tr'}>
                  {isRo
                    ? 'OnSuite este o familie de software industrial cu 11 module. Fiecare modul poate fi implementat independent sau ca o suită complet integrată, on-premise sau în cloud. Arhitectura React + C# API + MS SQL este concepută cu o abordare axată pe proceduri stocate și testare SQL complet automatizată cu tSQLt. Suportul pentru protocoale deschise include OPC UA, PackML, ISA-88, MTConnect, REST și MQTT.'
                    : isEn
                    ? 'OnSuite is an industrial software family with 11 modules. Each module can be deployed independently or as a fully integrated suite, on-premise or in the cloud. React + C# API + MS SQL architecture is designed with a stored procedure focused approach and fully automated SQL testing with tSQLt. Open protocol support includes OPC UA, PackML, ISA-88, MTConnect, REST, and MQTT.'
                    : 'OnSuite, IoT tabanlı akıllı bir MES (Üretim Yönetim Sistemi) platformudur. Üretim makinelerinden gerçek zamanlı veri toplayarak OEE analizleri sunar, izlenebilirlik süreçlerini kolaylaştırır ve süreç optimizasyonunu destekler. Manuel veya otomatik veri toplama seçenekleriyle, işletmenizin üretim süreçlerini dijitalleştirir, verimliliği artırır, iş akışlarını standartlaştırır ve karar alma süreçlerini güçlendirir.'}
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4 justify-center xl:justify-start">
                <a href={isRo ? 'https://www.onsuite.com.tr/ro/main/' : isEn ? 'https://www.onsuite.com.tr/main/' : 'https://www.onsuite.com.tr/'} target="_blank" rel="noopener noreferrer" className="btn-primary !rounded-xl !px-8 !py-4">
                  onsuite.com.tr
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 bg-[#F8FAFC] border-y border-slate-100">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-12 md:mb-16">
            <div className="section-head max-w-3xl">
              <span className="eyebrow">{isRo ? 'Module' : isEn ? 'Modules' : 'Modüller'}</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                {isRo ? 'Module OnSuite' : isEn ? 'OnSuite Modules' : 'OnSuite Modülleri'}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {isRo ? 'Proiectați arhitectura OnSuite modul cu modul sau ca un ecosistem complet integrat.' : isEn ? 'Design your OnSuite architecture module-by-module or as one fully integrated ecosystem.' : 'OnSuite modüllerini tek tek devreye alın ya da üretimden yönetime kadar bağlı çalışan tek bir ekosistem olarak kurgulayın.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="xl:col-span-4 w-full">
              <div className="grid h-full grid-cols-1 gap-3">
                {modules.slice(0, showAllModules ? modules.length : 5).map((m, idx) => (
                  <button
                    key={m.name}
                    onClick={() => handleTabChange(idx)}
                    className={`w-full min-h-[76px] text-left p-4 rounded-2xl transition-all duration-300 border flex items-center gap-4 group ${activeTab === idx
                        ? 'bg-slate-900 border-slate-900 shadow-xl shadow-slate-900/10'
                        : 'bg-white border-slate-200 hover:border-sky-200 hover:shadow-md'
                      }`}
                  >
                    <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-all ${activeTab === idx ? 'bg-sky-500 shadow-lg shadow-sky-500/20' : 'bg-slate-100 group-hover:bg-sky-55'
                      }`}>
                      <img
                        src={m.icon}
                        alt={`OnSuite ${m.name} ${isRo ? 'pictogramă modul' : isEn ? 'module icon' : 'modül ikonu'}`}
                        className={`w-6 h-6 transition-all ${activeTab === idx ? 'brightness-0 invert' : 'opacity-70 group-hover:opacity-100'}`}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <span className={`text-sm font-black tracking-wide transition-colors ${activeTab === idx ? 'text-white' : 'text-slate-900'}`}>
                        {m.name}
                      </span>
                      <span className={`text-xs font-bold transition-colors ${activeTab === idx ? 'text-sky-200' : 'text-slate-500'}`}>
                        {m.sub}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-center xl:justify-center">
                <button 
                  onClick={() => setShowAllModules(!showAllModules)}
                  className="btn-outline btn-no-arrow group !rounded-2xl !px-10 !py-3 w-full xl:w-auto"
                >
                  {!showAllModules ? (
                    <>
                      {isRo ? 'Vezi Toate Modulele' : isEn ? 'View All Modules' : 'Tüm Modülleri İncele'}
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      {isRo ? 'Arată Mai Puțin' : isEn ? 'Show Less' : 'Daha Az Göster'}
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div ref={detailBoxRef} className="xl:col-span-8 w-full">
              <div className="bg-white rounded-3xl p-6 md:p-10 xl:p-12 border border-slate-200 shadow-2xl shadow-slate-200/70 relative overflow-hidden min-h-[520px] xl:h-full flex flex-col justify-center">
                <div className="absolute inset-x-0 top-0 h-1 bg-sky-500"></div>

                <div className="relative z-10 space-y-8">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="h-[2px] w-10 bg-sky-500" aria-hidden="true"></span>
                      <span className="text-xs font-black text-sky-600 tracking-[0.12em]">
                        {isRo ? 'Prezentare Generală a Modulului' : isEn ? 'Module Overview' : 'Modül Özeti'}
                      </span>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <img
                        src={modules[activeTab].icon}
                        alt={`OnSuite ${modules[activeTab].name} - ${isRo ? 'modulul platformei de producție industrială' : isEn ? 'industrial manufacturing platform module' : 'endüstriyel üretim platformu modülü'}`}
                        className="w-9 h-9"
                      />
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight">
                    {modules[activeTab].name} <br />
                    <span className="text-sky-500">{modules[activeTab].sub}</span>
                  </h3>

                  <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                    {modules[activeTab].desc}
                  </p>

                  <FeatureTokenList
                    items={modules[activeTab].features || []}
                    variant="card"
                    className="pt-2"
                  />

                  <div className="pt-4">
                    <a
                      href={modules[activeTab].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !rounded-2xl !px-8 !py-4 group"
                    >
                      {isRo ? 'Explorați Soluția' : isEn ? 'Explore Solution' : 'Çözümü İncele'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Tech & Architecture (Side by Side with Image) */}
      {/* Tech & Architecture (Side by Side with Image) */}
      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-12">
            <span className="eyebrow">{isRo ? 'Beneficii' : isEn ? 'Benefits' : 'Kazanımlar'}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {isRo ? 'Ce Obțineți cu OnSuite?' : isEn ? 'What Do You Gain with OnSuite?' : 'OnSuite Size Ne Sağlar?'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="reveal">
              <SmartImage
                src="/assets/new/urunler/onsuite/OnsuiteDesktop.webp"
                alt={isRo ? 'Imagine vizuală a platformei desktop OnSuite' : isEn ? 'OnSuite desktop platform visual' : 'OnSuite masaustu platform gorseli'}
                width={1280}
                height={800}
                className="w-full h-auto drop-shadow-[0_24px_50px_rgba(15,23,42,0.18)]"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>

            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7 max-w-xl mx-auto lg:mx-0 lg:ml-auto w-full">
              <div className="space-y-0 divide-y divide-cyan-300/70">
                {(showAllGains ? gainItems : gainItems.slice(0, 4)).map((item) => (
                  <div key={item.title} className="flex items-center gap-4 py-4">
                    <div className="w-3 h-3 rounded-full bg-[#52D3EC] shrink-0 xl:mr-2"></div>
                    <p className="text-[#0e4ea4] text-[1rem] md:text-[1.125rem] leading-[1.625rem] md:leading-[1.875rem] font-medium min-w-0 flex-1">{item.title}</p>
                  </div>
                ))}
              </div>

              {gainItems.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllGains((prev) => !prev)}
                  aria-expanded={showAllGains}
                  className="mt-2 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  <span>{showAllGains ? (isRo ? 'Arată Mai Puțin' : isEn ? 'Show Less' : 'Daha Az Göster') : (isRo ? 'Vezi Tot' : isEn ? 'View All' : 'Devamı için Tıklayınız')}</span>
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllGains ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
            
          </div>
        </div>
      </section>

      {/* Infrastructure Details */}
      <section className="py-12 md:py-24 px-6 bg-slate-50/50 border-y border-slate-200 overflow-hidden">
        <div className="container">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-10 md:mb-14">
            <span className="eyebrow">{isRo ? 'Arhitectură și Tehnologie' : isEn ? 'Architecture & Technology' : 'Mimari & Teknoloji'}</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {isRo ? 'De la Fabrică la Cloud - Grad Industrial' : isEn ? 'From Shopfloor to Cloud - Industrial Grade' : 'Sahadan Buluta — Endüstriyel Kalitede'}
            </h2>
          </div>

          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-7xl mx-auto">
            {architectureItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col justify-center rounded-[14px] border border-[#a6d3df] bg-gradient-to-b from-[#d6edf3] to-[#c5e2ea] px-4 py-4 md:px-5 md:py-5 min-h-[90px] md:min-h-[100px] shadow-[0_4px_14px_rgba(9,52,109,0.07)] hover:shadow-[0_8px_22px_rgba(9,52,109,0.13)] transition-all duration-300"
              >
                <span className="font-bold text-[1rem] leading-snug text-[#0a4a7a] text-center mb-1">{item.title}</span>
                <span className="text-sm leading-snug text-[#0a4a7a] opacity-80 text-center">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 bg-[#F7FCFF] border-b border-sky-100">
        <div className="container">
          <div className="section-head reveal text-center max-w-4xl mx-auto mb-12">
            <span className="eyebrow">{isRo ? 'Capabilități Tehnice' : isEn ? 'Technical Capabilities' : 'Teknik Kabiliyetler'}</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">
              {isRo ? 'Set de Capabilități Operaționale OnSuite' : isEn ? 'OnSuite Operational Capability Set' : 'OnSuite Operasyonel Yetenek Seti'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 justify-items-center">
            {technicalCards.map((card) => (
              <article key={card.title} className="group w-full max-w-[395px] h-full min-h-[332px] md:min-h-[352px] rounded-2xl overflow-hidden border border-[#89E4F4] bg-gradient-to-b from-[#FFFFFF] to-[#E6F8FB] shadow-[0_8px_22px_rgba(10,61,128,0.08)] transition-all duration-300 flex flex-col">
                <div className="h-[176px] md:h-[190px] bg-[#F5FAFC] flex items-center justify-center p-4 md:p-5">
                  <div className="relative h-[132px] md:h-[142px] w-[84%]">
                    <SmartImage
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 200px, 220px"
                      quality={85}
                    />
                  </div>
                </div>
                <div className="border-t border-[#89E4F4] bg-gradient-to-b from-[#FFFFFF] to-[#E6F8FB] p-4 md:p-5 min-h-[156px] flex flex-col flex-1">
                  <div className="flex-1 flex items-start">
                    <h3 className="text-[clamp(1.04rem,1.18vw,1.28rem)] font-black text-[#0A3D80] leading-tight">
                      {card.title}
                    </h3>
                  </div>
                  <div className="flex-1 flex items-start">
                    <p className="text-[0.9rem] md:text-[0.95rem] text-[#1A5FB4] leading-[1.5] font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>{isRo ? 'Să Modelăm Viitorul Industrial Împreună' : isEn ? 'Let\'s Shape the Industrial Future Together' : 'Endüstriyel Geleceği Birlikte Şekillendirelim'}</h2>
          <p>{isRo ? 'Contactați-ne pentru a vă face fabrica mai inteligentă cu OnSuite.' : isEn ? 'Contact us to make your factory smarter with OnSuite.' : 'OnSuite ile fabrikanızı daha akıllı hale getirmek için bizimle iletişime geçin.'}</p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta">{isRo ? 'Contactați-ne' : isEn ? 'Contact Us' : 'Bize Ulaşın'}</Link>
        </div>
      </section>
    </div>
  );
}

