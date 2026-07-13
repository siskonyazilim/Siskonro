'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function TraceabilityPage() { // NOSONAR
  const { t, locale, localizePath, lang } = useLanguage();
  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.traceability, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `traceability-${lang}`;
  const serviceHeroCopy = isRo
    ? {
        title: 'Soluții de Trasabilitate',
        subtitle: 'Modelează viitorul producției cu soluțiile noastre de automatizare.',
        description: 'Trasabilitatea asigură monitorizarea tuturor proceselor de la aprovizionarea cu materii prime până la produsul final, permițând detectarea la timp a erorilor și creșterea calității producției. De asemenea, consolidează încrederea clienților prin creșterea transparenței de-a lungul lanțului de aprovizionare.',
      }
    : isEn
    ? {
        title: t('traceabilityPage.title'),
        subtitle: t('traceabilityPage.subtitle'),
        description: t('traceabilityPage.description'),
      }
    : {
        title: 'İzlenebilirlik Çözümleri',
      subtitle: 'Otomasyon çözümlerimiz ile üretimin geleceğini şekillendirin.',
        description:
          'İzlenebilirlik, hammadde tedarikinden nihai ürüne kadar tüm süreçleri izleyerek hataların zamanında tespit edilmesini ve üretim kalitesinin artmasını sağlar. Ayrıca, tedarik zinciri boyunca şeffaflığı artırarak müşteri güvenini pekiştirir.',
      };

  const features = isRo
    ? [
        'Articol Unic',
        'Lot / Șarjă',
        'RTLS',
        'Pick to Light / Put to Light',
        'Sisteme de Management al Depozitului',
        'Integrare',
      ]
    : isEn
    ? [
        'Single Item',
        'Batch / Lot',
        'RTLS',
        'Pick to Light / Put to Light',
        'Warehouse Management Systems',
        'Integration',
      ]
    : [
        'Tekil Ürün',
        'Parti / Lot',
        'RTLS',
        'Pick to Light / Put to Light',
        'Depo Yönetim Sistemleri',
        'Entegrasyon',
      ];

  const technicalFeatures = isRo
    ? [
        'Colectare Date în Timp Real',
        'Transfer de Date și Potrivire cu Tehnologii RFID și Cod de Bare',
        'Sisteme de Alarme și Notificări în Timp Real',
        'Transfer de Date cu Sisteme Integrate și Monitorizare Continuă',
        'Urmărire Produs și Lot',
        'Structură Modulară și Integrare Adaptabilă',
        'Protocoale de Comunicare Compatibile cu Sistemele de Automatizare',
        'Interfață Prietenoasă Bazată pe Web',
        'Raportare și Vizualizare',
        'Management securizat al datelor conform standardelor ISO 27001',
      ]
    : isEn
    ? [
        'Real-Time Data Collection',
        'Data Transfer and Matching with RFID and Barcode Technologies',
        'Real-Time Alarm and Notification Systems',
        'Data Transfer with Integrated Systems and Continuous Monitoring',
        'Product and Batch Tracking',
        'Modular Structure and Adaptive Integration',
        'Communication Protocols Compatible with Automation Systems',
        'Web-Based User-Friendly Interface',
        'Reporting and Visualization',
        'Secure data management compliant with ISO 27001 standards',
      ]
    : [
        'Gerçek zamanlı veri toplama',
        'RFID ve barkod teknolojileriyle veri aktarımı ve eşleştirme',
        'Gerçek zamanlı alarm ve bildirim sistemleri',
        'Entegre sistemlerle veri transferi ve kesintisiz izleme',
        'Ürün ve parti izleme',
        'Modüler yapı ve uyarlanabilir entegrasyon',
        'Otomasyon sistemlerine uyumlu haberleşme protokolleri',
        'Web tabanlı kullanıcı dostu arayüz',
        'Raporlama ve görselleştirme',
        'ISO 27001 standartlarına uygun güvenli veri yönetimi',
      ];

  const sectorDetailCards = isRo
    ? [
        {
          title: 'Urmărire Articol Unic',
          spot: 'Obțineți vizibilitate completă în producție cu urmărirea produselor în timp real după numărul de serie.',
          desc: 'În procesele de trasabilitate, urmărirea fiecărui produs cu un număr unic oferă vizibilitate și control complet. Această abordare îmbunătățește trasabilitatea fiecărui articol și creează un avantaj puternic în managementul calității și competitivitate.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon3.webp',
          imageAlt: 'Pictogramă urmărire articol unic',
        },
        {
          title: 'Urmărire Lot / Șarjă',
          spot: 'Obțineți control complet de la producție la livrare cu urmărirea pe lot / șarjă.',
          desc: 'În situațiile în care urmărirea produselor este dificilă, trasabilitatea fiecărui lot/șarjă asigură transparență completă și control al calității pe tot parcursul producției. Acest lucru face ușoară urmărirea produselor în fiecare etapă.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon3.webp',
          imageAlt: 'Pictogramă urmărire lot',
        },
        {
          title: 'P2L',
          titleSub: '(Pick to Light / Put to Light)',
          spot: 'Faceți-vă operațiunile flexibile și fără erori urmărind lumina cu soluțiile P2L.',
          desc: 'Soluțiile P2L oferă ghidare vizuală și/sau auditivă operatorilor în procesele industriale de fabricație și asamblare cu un consum mare de muncă, de la producție la logistică și de la depozit la livrare. Această ghidare ajută la reducerea erorilor și accelerarea fluxurilor de lucru.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon5.webp',
          imageAlt: 'Pictogramă P2L',
          expandable: true,
        },
        {
          title: 'RTLS',
          titleSub: '(Sisteme de Localizare în Timp Real)',
          spot: 'Urmăriți instantaneu echipamentele și angajații cu RTLS și utilizați resursele la eficiență maximă.',
          desc: 'Cu RTLS, puteți monitoriza cu ușurință locația în timp real a fiecărui echipament și angajat din unitatea dumneavoastră. Această tehnologie ajută la utilizarea eficientă a resurselor, crește eficiența producției, îmbunătățește siguranța și minimizează riscurile potențiale.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon.webp',
          imageAlt: 'Pictogramă RTLS',
          expandable: true,
        },
        {
          title: 'Sisteme de Management al Depozitului',
          spot: 'Optimizați-vă operațiunile și obțineți un avantaj competitiv cu sistemele de management al depozitului.',
          desc: 'Sistemele de Management al Depozitului oferă control și management al proceselor. Lucrând cu date în timp real, ele permit managementul eficient al operațiunilor desfășurate în întreaga organizație.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon2.webp',
          imageAlt: 'Pictogramă sisteme management depozit',
        },
        {
          title: 'Integrare',
          spot: 'Asigurați trasabilitate neîntreruptă în producție cu integrări de sisteme terțe.',
          desc: 'Integrarea software permite diferitelor aplicații să schimbe date și să lucreze în sincronizare, eliminând dificultățile de la introducerea datelor la raportare pentru companiile care utilizează mai multe sisteme. Integrarea poate fi realizată cu MES, ERP, WMS, CRM, instrumente industriale și software terță parte.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon4.webp',
          imageAlt: 'Pictogramă integrare',
          expandable: true,
        },
      ]
    : isEn
    ? [
        {
          title: 'Single Item Tracking',
          spot: 'Gain full visibility in production with real-time product tracking by serial number.',
          desc: 'In traceability processes, tracking each product with a unique number provides full visibility and control. This approach improves traceability for every item and creates a strong advantage in quality management and competitiveness.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon3.webp',
          imageAlt: 'Single item tracking icon',
        },
        {
          title: 'Batch / Lot Tracking',
          spot: 'Achieve full control from production to delivery with batch / lot tracking.',
          desc: 'In situations where product tracking is difficult, tracing each batch/lot ensures complete transparency and quality control throughout production. This makes it easy to follow where products are at every stage.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon3.webp',
          imageAlt: 'Batch lot tracking icon',
        },
        {
          title: 'P2L',
          titleSub: '(Pick to Light / Put to Light)',
          spot: 'Make your operations flexible and error-free by following the light with P2L solutions.',
          desc: 'P2L solutions provide visual and/or audible guidance to operators in labor-intensive industrial manufacturing and assembly processes from production to logistics and from warehouse to delivery. This guidance helps reduce errors and accelerate workflows.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon5.webp',
          imageAlt: 'P2L icon',
          expandable: true,
        },
        {
          title: 'RTLS',
          titleSub: '(Real-Time Location Systems)',
          spot: 'Track your equipment and employees instantly with RTLS and use resources at maximum efficiency.',
          desc: 'With RTLS, you can easily monitor the real-time location of every equipment and employee in your facility. This technology helps use resources effectively, increases production efficiency, improves safety, and minimizes potential risks.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon.webp',
          imageAlt: 'RTLS icon',
          expandable: true,
        },
        {
          title: 'Warehouse Management Systems',
          spot: 'Optimize your operations and gain competitive advantage with warehouse management systems.',
          desc: 'Warehouse Management Systems provide process control and management. By working with real-time data, they enable effective management of operations carried out across the organization.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon2.webp',
          imageAlt: 'Warehouse management systems icon',
        },
        {
          title: 'Integration',
          spot: 'Ensure uninterrupted traceability in production with third-party system integrations.',
          desc: 'Software integration enables different applications to exchange data and work in sync, eliminating difficulties from data entry to reporting for businesses using multiple systems. Integration can be provided with MES, ERP, WMS, CRM, industrial instruments, and third-party software.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon4.webp',
          imageAlt: 'Integration icon',
          expandable: true,
        },
      ]
    : [
        {
          title: 'Tekil Ürün İzleme',
          spot: 'Seri numarası bazında gerçek zamanlı ürün izleme ile üretimde tam bir görünürlük elde edin.',
          desc: 'İzlenebilirlik süreçlerinde, her ürünün benzersiz bir numarayla takip edilmesi tam bir görünürlük ve kontrol sağlar. Bu yaklaşım, her ürünün izlenebilirliğini artırarak kalite yönetiminde ve rekabette büyük fark yaratır.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon3.webp',
          imageAlt: 'Tekil ürün izleme ikonu',
        },
        {
          title: 'Parti / Lot İzleme',
          spot: 'Parti / Lot takibiyle üretimden teslimata tam kontrolü sağlayın.',
          desc: 'İzlenebilirlik süreçlerinde, ürün takibinin zor olduğu durumlarda, her parti/lotun izini sürerek, üretim sürecinde tam şeffaflık ve kalite kontrol sağlanır. Bu sayede, ürünlerin her aşamada nerede olduğunu kolayca takip edilebilir.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon3.webp',
          imageAlt: 'Parti lot izleme ikonu',
        },
        {
          title: 'P2L',
          titleSub: '(Pick to Light / Put to Light)',
          spot: 'P2L çözümleriyle ışığın izinde operasyonlarınızı esnek ve hatasız hale getirin.',
          desc: 'P2L çözümleri, üretimden lojistiğe, depodan teslimata el işçiliği gerektiren endüstriyel üretim ve montaj süreçlerinde operatörlere görsel ve/veya sesli yönlendirme sağlar. Bu sistemler, çalışanlara sağladığı rehberlik sayesinde daha az hata yapılmasına ve iş süreçlerinin daha hızlı ilerlemesine yardımcı olur.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon5.webp',
          imageAlt: 'P2L ikonu',
          expandable: true,
        },
        {
          title: 'RTLS',
          titleSub: '(Gerçek Zamanlı Konum Belirleme Sistemleri)',
          spot: 'RTLS ile ekipmanlarınızı ve çalışanlarınızı anlık takip edin, kaynaklarınızı maksimum verimle kullanın.',
          desc: 'RTLS sayesinde fabrikanızdaki her ekipmanın ve çalışanın anlık konumunu kolayca takip edebilirsiniz. Bu teknoloji, kaynakları daha etkin kullanmanıza ve üretim süreçlerindeki verimliliği artırmanıza yardımcı olur. Aynı zamanda, çalışanların ve ekipmanların doğru yerde ve zamanda bulunmasını sağlayarak iş güvenliğini artırır ve potansiyel riskleri minimize eder.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon.webp',
          imageAlt: 'RTLS ikonu',
          expandable: true,
        },
        {
          title: 'Depo Yönetim Sistemleri',
          spot: 'Depo yönetim sistemi ile operasyonlarınızı optimize edin ve rekabet avantajı kazanın.',
          desc: 'Depo Yönetim Sistemleri, süreçlerde kontrol ve yönetim sağlar. Gerçek zamanlı verilerle çalışarak organizasyon içinde gerçekleşen operasyonların etkili bir şekilde yönetilmesini mümkün kılar.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon2.webp',
          imageAlt: 'Depo yönetim sistemleri ikonu',
        },
        {
          title: 'Entegrasyon',
          spot: 'Üçüncü parti sistem entegrasyonları ile üretimde kesintisiz izlenebilirlik sağlayın.',
          desc: 'Birden fazla yazılım kullanan işletmelerin veri girişinden raporlamaya kadar yaşadığı zorlukları ortadan kaldıran etkili bir çözüm olan yazılım entegrasyonu, farklı uygulamaların veri alışverişi yapmasını ve senkronize çalışmasını sağlayarak iş süreçlerini optimize eder. İhtiyaçlara uygun olarak MES, ERP, WMS, CRM, Endüstriyel Enstrüman ve üçüncü parti yazılımlar ile entegrasyon sağlanabilir.',
          image: '/assets/new/hizmetler/izlenebilirlik-cozumleri/izlenebilirlikicon4.webp',
          imageAlt: 'Entegrasyon ikonu',
          expandable: true,
        },
      ];

  const hasMoreBenefits = features.length > 3;
  const visibleBenefits = showAllBenefits ? features : features.slice(0, 3);
  const showMoreLabel = isRo ? 'Apasă pentru mai multe' : isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isRo ? 'Arată mai puțin' : isEn ? 'Show Less' : 'Daha Az Göster';

  const [showAllTechnicalFeatures, setShowAllTechnicalFeatures] = useState(false);
  const visibleTechnicalFeatures = showAllTechnicalFeatures ? technicalFeatures : technicalFeatures.slice(0, 5);

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={serviceName}
        subtitle={serviceHeroCopy.subtitle}
        breadcrumbs={[t('traceabilityPage.breadcrumbHome'), t('traceabilityPage.breadcrumbServices'), serviceName]}
      />

      {/* Genel Bakış */}
      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-12 items-stretch">
            <div className="reveal order-2 lg:order-1">
              <div className="responsive-media-shell md:-ml-6 lg:-ml-10">
                <SmartImage
                  src="/assets/new/hizmetler/izlenebilirlik-cozumleri/Siskon 1.3 İzlenebilirlik Çözümleri 16-9 Yatay Beyaz İllüstrasyon-Camera 2.webp"
                  alt={isRo ? 'Soluții Software de Trasabilitate Siskon - Urmărire Producție End-to-End' : isEn ? 'Siskon Traceability Software Solutions - End-to-End Production Tracking' : 'Siskon İzlenebilirlik Yazılım Çözümleri - Uçtan Uca Üretim Takibi'}
                  width={1920}
                  height={1080}
                  className="w-full max-w-[440px] sm:max-w-[540px] md:w-[96%] md:max-w-[760px] md:ml-0 h-auto object-contain mx-auto drop-shadow-2xl"
                  style={{ maxHeight: 'min(540px, 72vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{t('traceabilityPage.service')}</span>
                <p className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto" lang="tr">
                  {serviceHeroCopy.description}
                </p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm flex flex-col gap-3">
                <span className="eyebrow self-start">{t('traceabilityPage.service')}</span>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {serviceHeroCopy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kazanımlar */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="container">
          <div className="reveal lg:hidden max-w-4xl mx-auto text-center">
            <span className="eyebrow">{t('traceabilityPage.benefits')}</span>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {isRo ? 'Ce Soluții de Trasabilitate Oferim?' : isEn ? 'What Traceability Solutions Do We Offer?' : 'Ne Tür İzlenebilirlik Çözümleri Sunuyoruz?'}
            </h2>
            <p className="mt-5 text-sky-800 text-xl md:text-2xl font-semibold leading-tight">
              {isRo
                ? 'Modul inteligent de a gestiona datele industriale și procesele de afaceri în era transformării digitale.'
                : isEn
                ? 'The smart way to manage industrial data and business processes in the era of digital transformation.'
                : 'Dijital dönüşüm çağında endüstriyel verileri ve iş süreçlerini akıllıca yönetmenin yolu.'}
            </p>

            <div className="mt-10 flex items-center justify-center">
              <SmartImage
                src="/assets/new/hizmetler/izlenebilirlik-cozumleri/Siskon 1.3 İzlenebilirlik Çözümleri 1-1 Kare-Camera 135x145x-150 2.webp"
                alt={isRo ? 'Vizualizare generală soluții de trasabilitate Siskon' : isEn ? 'Siskon traceability solutions overview visual' : 'Siskon izlenebilirlik çözümleri genel bakış görseli'}
                width={1500}
                height={1500}
                className="w-full max-w-[760px] h-auto object-contain drop-shadow-[0_24px_48px_rgba(15,23,42,0.2)]"
                style={{ maxHeight: 'min(700px, 80vh)' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 760px"
                quality={85}
              />
            </div>

            <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 md:p-8 text-left">
              <ul className="divide-y divide-slate-200">
                {visibleBenefits.map((feature) => (
                  <li key={feature} className="py-4 flex items-center gap-3 first:pt-2 last:pb-2">
                    <span className="w-3 h-3 rounded-full bg-sky-500" aria-hidden="true" />
                    <span className="text-slate-700 font-semibold text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {hasMoreBenefits ? (
              <button
                type="button"
                onClick={() => setShowAllBenefits((prev) => !prev)}
                aria-expanded={showAllBenefits}
                className="mx-auto mt-2 flex items-center justify-center gap-2 rounded-md bg-[#0388d1] px-5 py-2 text-white font-semibold"
              >
                <span>{showAllBenefits ? showLessLabel : showMoreLabel}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform ${showAllBenefits ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            ) : null}

            <div className="pt-6">
              <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-primary inline-flex">
                {isRo ? 'Contactați-ne' : isEn ? 'Contact Us' : 'Bize Ulaşın'}
              </Link>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-12 md:gap-14 items-center">
            <div className="reveal space-y-6">
              <span className="eyebrow">{t('traceabilityPage.benefits')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {t('traceabilityPage.benefitsTitle')}
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {t('traceabilityPage.benefitsDescription')}
              </p>

              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 md:px-7 md:py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] h-full flex flex-col justify-center">
                <ul className="divide-y divide-slate-200">
                  {visibleBenefits.map((feature) => (
                    <li key={feature} className="py-4 flex items-center gap-3 first:pt-2 last:pb-2">
                      <span className="w-3 h-3 rounded-full bg-sky-500" aria-hidden="true" />
                      <span className="text-slate-700 font-semibold text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
                {features.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllBenefits((prev) => !prev)}
                    aria-expanded={showAllBenefits}
                    className="mt-2 w-full flex items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[#0e4ea4] font-semibold text-sm"
                  >
                    <span>{showAllBenefits ? showLessLabel : showMoreLabel}</span>
                    <span
                      className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllBenefits ? 'rotate-180' : ''}`}
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

            <div className="reveal flex items-center justify-center pt-8 md:pt-14">
              <div className="relative flex items-center justify-center w-full">
                <SmartImage
                  src="/assets/new/hizmetler/izlenebilirlik-cozumleri/Siskon 1.3 İzlenebilirlik Çözümleri 1-1 Kare-Camera 135x145x-150 2.webp"
                  alt={isRo ? 'Vizualizare generală soluții de trasabilitate Siskon' : isEn ? 'Siskon traceability solutions overview visual' : 'Siskon izlenebilirlik çözümleri genel bakış görseli'}
                  width={1500}
                  height={1500}
                  className="w-full h-auto max-h-[460px] object-contain mx-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nitelikler */}
      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="eyebrow self-start">{t('traceabilityPage.qualifications')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{isRo ? 'Ce Oferă Soluțiile de Trasabilitate Siskon?' : isEn ? 'What Do Siskon Traceability Solutions Provide?' : 'Siskon İzlenebilirlik Çözümleri Size Ne Sağlar?'}</h2>
            </div>
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              <div className="divide-y divide-cyan-300/70">
                {visibleTechnicalFeatures.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                    <p className="text-[#0e4ea4] text-sm md:text-[0.9375rem] leading-snug font-medium">{item}</p>
                  </div>
                ))}
              </div>
              {technicalFeatures.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllTechnicalFeatures((prev) => !prev)}
                  aria-expanded={showAllTechnicalFeatures}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
                >
                  <span>{showAllTechnicalFeatures ? showLessLabel : showMoreLabel}</span>
                  <span
                    className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllTechnicalFeatures ? 'rotate-180' : ''}`}
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

      {/* Sektörel Ürün Detayları */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="container">
          <div className="section-head reveal text-center max-w-3xl mx-auto mb-20">
            <span className="eyebrow">{t('traceabilityPage.sectorDetails')}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('traceabilityPage.components')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {sectorDetailCards.map((card, cardIndex) => {
              const isExpanded = !!expandedCards[cardIndex];
              return (
              <div key={card.title} className="reveal group rounded-2xl bg-[#d2eaf0] px-5 sm:px-6 py-6 md:py-7 min-h-[380px] md:min-h-[420px] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_14px_34px_rgba(14,116,144,0.14)]">
                <div className="w-full min-h-[220px] md:h-[240px] flex items-center justify-center mb-4 md:mb-5">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="max-h-[210px] md:max-h-[230px] max-w-full w-auto h-auto object-contain drop-shadow-[0_10px_18px_rgba(15,23,42,0.14)]"
                    loading="lazy"
                  />
                </div>
                <h3 className="w-full text-xl md:text-2xl font-bold text-[#0a4da0] leading-tight mb-2 md:min-h-[96px]">
                  {card.title}
                  {card.titleSub && (
                    <>
                      <br />
                      <span className="text-base md:text-lg font-semibold">{card.titleSub}</span>
                    </>
                  )}
                </h3>
                <p className="w-full text-[#00a9e8] font-semibold text-base md:text-lg leading-snug mb-3 md:mb-4 md:min-h-[80px]">{card.spot}</p>
                <p className={`w-full text-slate-700 text-sm md:text-base leading-relaxed ${isExpanded ? '' : 'line-clamp-4'}`}>{card.desc}</p>
                <button
                  type="button"
                  onClick={() => setExpandedCards((prev) => ({ ...prev, [cardIndex]: !prev[cardIndex] }))}
                  aria-expanded={isExpanded}
                  className="mt-auto pt-4 w-full flex items-center justify-center gap-2 text-[#0a4da0] font-semibold text-sm hover:opacity-75 transition-opacity"
                >
                  <span>{isExpanded ? showLessLabel : showMoreLabel}</span>
                  <span
                    className={`h-8 w-8 rounded-full border-2 border-[#0a4da0] flex items-center justify-center shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('traceabilityPage.ctaTitle')}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {t('traceabilityPage.ctaDescription')}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {t('traceabilityPage.ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}


