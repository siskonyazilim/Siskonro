'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHero from '../../components/PageHero';
import SmartImage from '../../components/SmartImage';
import { SERVICE_KEYS, getServiceName } from '../../../config/services';
import { useLanguage } from '../../_context/LanguageContext';

export default function AIPage() { // NOSONAR
  const { locale, localizePath, lang } = useLanguage();
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const aiHeroImage = '/assets/new/hizmetler/ai-makine-ogrenmesi/AıveMakineOgrenmesi.webp';
  const aiSolutionsImage = '/assets/new/hizmetler/ai-makine-ogrenmesi/AıveMakineOgrenmesi2.webp';
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const serviceName = getServiceName(SERVICE_KEYS.bigDataMl, isRo ? 'ro' : isEn ? 'en' : 'tr');
  const contentKey = `aiml-${lang}`;

  const benefits = isRo
    ? [
        'Soluții specifice industriei, susținute de o expertiză vastă în domeniu',
        'Aplicații de machine learning personalizate, aliniate cu fluxurile de afaceri',
        'Infrastructură flexibilă care se integrează cu sistemele existente',
        'Cicluri de decizie mai rapide prin procesarea datelor în timp real',
        'Economii ale costurilor operaționale prin optimizare bazată pe date',
        'Sisteme fiabile, concepute pentru medii industriale exigente',
      ]
    : isEn
    ? [
        'Industry-specific solutions backed by broad domain expertise',
        'Customized machine learning applications aligned with business workflows',
        'Flexible infrastructure that integrates with existing systems',
        'Faster decision cycles with real-time data processing',
        'Operational cost savings through data-driven optimization',
        'Reliable systems designed for demanding industrial environments',
      ]
    : [
        'Geniş endüstri tecrübesi ile sektöre özel çözümler',
        'İş süreçlerine uyumlu, özelleştirilmiş makine öğrenmesi uygulamaları',
        'Mevcut sistemlerle entegre edilebilen esnek altyapı',
        'Gerçek zamanlı veri işleme ile hızlandırılmış karar süreçleri',
        'Veriye dayalı optimizasyon ile operasyonel maliyet tasarrufu',
        'Güvenilir, dayanıklı ve endüstriyel koşullara uygun sistemler',
      ];

  const solutions = isRo
    ? [
        'Soluții de analiză de date și raportare',
        'Detectarea anomaliilor',
        'Sisteme automate de suport decizional',
        'Soluții de optimizare',
        'Integrare IoT',
        'Aplicații de mentenanță predictivă',
        'Aplicații de calitate predictivă',
        'Dezvoltare de software personalizat',
        'Optimizarea stocurilor',
        'Optimizarea lanțului de aprovizionare și a logisticii',
      ]
    : isEn
    ? [
        'Data analytics and reporting solutions',
        'Anomaly detection',
        'Automated decision support systems',
        'Optimization solutions',
        'IoT integration',
        'Predictive maintenance applications',
        'Predictive quality applications',
        'Custom software development',
        'Inventory optimization',
        'Supply chain and logistics optimization',
      ]
    : [
      'Veri Analitiği ve Raporlama Çözümleri',
        'Anomali Tespiti',
        'Otomatik Karar Verme Sistemleri',
        'Optimizasyon Çözümleri',
        'IoT Entegrasyonu',
      'Kestirimci Bakım Uygulamaları',
        'Kestirimci Kalite Uygulamaları',
        'Özel Yazılım Geliştirme',
        'Stok Optimizasyonu',
        'Tedarik Zinciri ve Lojistik Optimizasyonu',
      ];

  const deepLearningApp = isRo
    ? {
        title: 'Aplicații Deep Learning',
        spot: 'Folosiți puterea deep learning pentru soluții de înaltă performanță!',
        desc: 'Tehnologiile deep learning vă fac procesele de afaceri mai inteligente și mai rapide prin cazuri de utilizare precum recunoașterea imaginilor, procesarea limbajului natural și analize predictive. Aceste sisteme vă optimizează forța de muncă și vă ajută să descoperiți oportunități în operațiunile dumneavoastră.',
      }
    : isEn
    ? {
        title: 'Deep Learning Applications',
        spot: 'Use the power of deep learning for high-performance solutions!',
        desc: 'Deep learning technologies make your business processes smarter and faster through use cases such as image recognition, natural language processing, and predictive analytics. These systems optimize your workforce and help you discover opportunities across your operations.',
      }
    : {
        title: 'Derin Öğrenme Uygulamaları',
        spot: 'Yüksek performanslı çözümler için derin öğrenmenin gücünü kullanın!',
        desc: 'Derin öğrenme teknolojileri; görüntü tanıma, doğal dil işleme ve tahmine dayalı analizler gibi alanlarda uygulama sunarak iş süreçlerinizi daha akıllı ve hızlı hale getirir. Bu sistemler, iş gücünüzü optimize eder ve işletmenizdeki fırsatları keşfetmenizi sağlar.',
      };

  const etlApp = isRo
    ? {
        title: 'Aplicații ETL',
        spot: 'Valorificați-vă datele cu aplicațiile ETL și propulsați-vă afacerea în viitor!',
        desc: 'Aplicațiile ETL vă accelerează integrarea datelor și fluxurile de lucru de analiză, îmbunătățesc calitatea datelor, funcționează perfect cu platformele de big data și oferă economii de costuri.',
      }
    : isEn
    ? {
        title: 'ETL Applications',
        spot: 'Leverage your data with ETL applications and move your business into the future!',
        desc: 'ETL applications accelerate your data integration and analytics workflows, improve data quality, work seamlessly with big data platforms, and provide cost savings.',
      }
    : {
        title: 'ETL Uygulamaları',
        spot: 'ETL Uygulamaları ile verilerinizden güç alın, işinizi geleceğe taşıyın!',
        desc: 'ETL Uygulamaları; veri entegrasyonu ve analiz süreçlerinizi hızlandırır, veri kalitesini artırır, büyük veri platformlarıyla uyumlu çalışır ve maliyet tasarrufu sağlar.',
      };

  const mobileVisibleSolutions = showAllSolutions ? solutions : solutions.slice(0, 3);
  const visibleSolutions = showAllSolutions ? solutions : solutions.slice(0, 5);
  const showMoreLabel = isRo ? 'Apasă pentru mai multe' : isEn ? 'Click for More' : 'Devamı için Tıklayınız';
  const showLessLabel = isRo ? 'Arată mai puțin' : isEn ? 'Show Less' : 'Daha Az Göster';

  const [showAllBenefits, setShowAllBenefits] = useState(false);
  const visibleBenefits = showAllBenefits ? benefits : benefits.slice(0, 5);

  return (
    <div key={contentKey} className="bg-white">
      <PageHero
        title={isRo ? 'Soluții AI și Machine Learning' : isEn ? 'AI and Machine Learning Solutions' : 'AI ve Makine Öğrenmesi Çözümleri'}
        subtitle={isRo ? 'Transformați datele industriale în valoare măsurabilă prin analize avansate și machine learning.' : isEn ? 'Turn industrial data into measurable value with advanced analytics and machine learning.' : 'İleri analitik ve makine öğrenmesiyle endüstriyel veriyi ölçülebilir değere dönüştürün.'}
        breadcrumbs={isRo ? ['Acasă', 'Servicii', serviceName] : isEn ? ['Home', 'Services', serviceName] : ['Ana Sayfa', 'Hizmetler', serviceName]}
      />

      <section className="pt-12 md:pt-16 pb-20 md:pb-32 px-6">
        <div className="container">
          <div className="reveal lg:hidden space-y-3 text-center">
            <span className="eyebrow">{isRo ? 'Serviciu' : isEn ? 'Service' : 'Hizmet'}</span>
            <div className="responsive-media-shell responsive-media-shell-lg -mt-8 sm:-mt-10">
              <SmartImage
                src={aiHeroImage}
                alt={isRo ? 'Vizualizare soluții AI și Machine Learning Siskon' : isEn ? 'Siskon AI and Machine Learning solutions visual' : 'Siskon AI ve Makine Öğrenmesi çözümleri görseli'}
                width={1920}
                height={1080}
                className="w-full max-w-[74%] sm:max-w-[68%] h-auto object-contain mx-auto drop-shadow-2xl"
                style={{ maxHeight: 'min(460px, 62vh)' }}
                sizes="100vw"
                priority
                quality={75}
              />
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">
              {isRo
                ? 'Soluțiile de Big Data și Machine Learning vă pregătesc afacerea pentru viitor cu perspective generate din datele dumneavoastră. Cu algoritmi de analiză avansată și machine learning, descoperim potențialul ascuns în seturile de date de pe teren, vă optimizăm procesele și sprijinim decizii de afaceri mai precise. Transformați-vă datele în oportunități strategice cu soluțiile noastre de machine learning.'
                : isEn
                ? 'Big Data and Machine Learning solutions prepare your business for the future with insights generated from your data. With advanced analytics and machine learning algorithms, we uncover hidden potential in field data sets, optimize your processes, and support more accurate business decisions. Transform your data into strategic opportunities with our machine learning solutions.'
                : 'AI ve Makine Öğrenmesi Çözümleri, verilerinizden elde edilen içgörülerle işletmenizi geleceğe hazırlar. İleri analitik ve makine öğrenmesi algoritmaları sayesinde sahadan topladığınız veri setlerindeki gizli potansiyeli açığa çıkarır, süreçlerinizi optimize eder ve daha doğru iş kararları almanızı sağlar. Makine öğrenmesi çözümlerimizle siz de verinizi stratejik fırsatlara dönüştürün.'}
            </p>
          </div>

          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-16 md:gap-12 items-stretch">
            <div className="reveal order-2 lg:order-1 lg:-mt-12">
              <div className="responsive-media-shell responsive-media-shell-lg">
                <SmartImage
                  src={aiHeroImage}
                  alt={isRo ? 'Vizualizare soluții AI și Machine Learning Siskon' : isEn ? 'Siskon AI and Machine Learning solutions visual' : 'Siskon AI ve Makine Öğrenmesi çözümleri görseli'}
                  width={1920}
                  height={1080}
                  className="w-full md:w-[95%] md:max-w-[760px] md:ml-0 h-auto object-contain mx-auto drop-shadow-2xl"
                  style={{ maxHeight: 'min(500px, 66vh)' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 860px"
                  priority
                  quality={75}
                />
              </div>
            </div>
            <div className="reveal order-1 lg:order-2 h-full flex flex-col justify-center">
              <div className="hidden lg:flex flex-col gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-7 md:p-9 shadow-sm">
                <span className="eyebrow self-start">{isRo ? 'Serviciu' : isEn ? 'Service' : 'Hizmet'}</span>
                <p className="text-slate-600 text-lg leading-relaxed text-justify hyphens-auto" lang="tr">
                  {isRo
                    ? 'Soluțiile de Big Data și Machine Learning vă pregătesc afacerea pentru viitor cu perspective generate din datele dumneavoastră. Cu algoritmi de analiză avansată și machine learning, descoperim potențialul ascuns în seturile de date de pe teren, vă optimizăm procesele și sprijinim decizii de afaceri mai precise. Transformați-vă datele în oportunități strategice cu soluțiile noastre de machine learning.'
                    : isEn
                    ? 'Big Data and Machine Learning solutions prepare your business for the future with insights generated from your data. With advanced analytics and machine learning algorithms, we uncover hidden potential in field data sets, optimize your processes, and support more accurate business decisions. Transform your data into strategic opportunities with our machine learning solutions.'
                    : 'AI ve Makine Öğrenmesi Çözümleri, verilerinizden elde edilen içgörülerle işletmenizi geleceğe hazırlar. İleri analitik ve makine öğrenmesi algoritmaları sayesinde sahadan topladığınız veri setlerindeki gizli potansiyeli açığa çıkarır, süreçlerinizi optimize eder ve daha doğru iş kararları almanızı sağlar. Makine öğrenmesi çözümlerimizle siz de verinizi stratejik fırsatlara dönüştürün.'}
                </p>
              </div>
            </div>

            <div className="reveal order-3 lg:hidden">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
                <p className="text-slate-600 text-lg leading-relaxed">
                  {isRo
                    ? 'Soluțiile de Big Data și Machine Learning vă pregătesc afacerea pentru viitor cu perspective generate din datele dumneavoastră. Cu algoritmi de analiză avansată și machine learning, descoperim potențialul ascuns în seturile de date de pe teren, vă optimizăm procesele și sprijinim decizii de afaceri mai precise. Transformați-vă datele în oportunități strategice cu soluțiile noastre de machine learning.'
                    : isEn
                    ? 'Big Data and Machine Learning solutions prepare your business for the future with insights generated from your data. With advanced analytics and machine learning algorithms, we uncover hidden potential in field data sets, optimize your processes, and support more accurate business decisions. Transform your data into strategic opportunities with our machine learning solutions.'
                    : 'AI ve Makine Öğrenmesi Çözümleri, verilerinizden elde edilen içgörülerle işletmenizi geleceğe hazırlar. İleri analitik ve makine öğrenmesi algoritmaları sayesinde sahadan topladığınız veri setlerindeki gizli potansiyeli açığa çıkarır, süreçlerinizi optimize eder ve daha doğru iş kararları almanızı sağlar. Makine öğrenmesi çözümlerimizle siz de verinizi stratejik fırsatlara dönüştürün.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[clamp(2.5rem,5vw,5rem)] px-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal">
              <span className="eyebrow self-start">{isRo ? 'Beneficii' : isEn ? 'Benefits' : 'Kazanımlar'}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">{isRo ? 'Ce Valoare Aduc Soluțiile Siskon AI/ML?' : isEn ? 'What Value Do Siskon AI/ML Solutions Deliver?' : 'Siskon AI ve Makine Öğrenmesi Çözümleri Size Ne Sağlar?'}</h2>
            </div>
            <div className="reveal rounded-3xl border border-cyan-300/70 bg-white/70 p-5 md:p-7">
              <div className="divide-y divide-cyan-300/70">
                {visibleBenefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-4 transition-colors"
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                    <p className="text-[#0e4ea4] text-sm md:text-[0.9375rem] leading-snug font-medium">{item}</p>
                  </div>
                ))}
              </div>
              {benefits.length > 5 && (
                <button
                  type="button"
                  onClick={() => setShowAllBenefits((prev) => !prev)}
                  aria-expanded={showAllBenefits}
                  className="mt-1 w-full flex items-center justify-between gap-2 border-t border-cyan-300/70 pt-4 text-[#0e4ea4] font-semibold text-sm"
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
        </div>
      </section>

      <section className="py-12 md:py-20 px-6">
        <div className="container">
          <div className="reveal md:hidden space-y-6">
            <div className="relative flex items-center justify-center overflow-hidden">
              <SmartImage
                src={aiSolutionsImage}
                alt={isRo ? 'Vizualizare soluții machine learning' : isEn ? 'Machine learning solutions visual' : 'Makine öğrenmesi çözümleri görseli'}
                width={1920}
                height={1080}
                className="responsive-contain-image w-full max-w-[520px] sm:max-w-[620px] h-auto mx-auto origin-center object-contain object-center drop-shadow-2xl"
                style={{ maxHeight: 'min(680px, 82vh)' }}
                sizes="100vw"
                quality={75}
              />
            </div>

            <div className="section-head reveal text-center max-w-3xl mx-auto">
              <span className="eyebrow">{isRo ? 'Capacități' : isEn ? 'Capabilities' : 'Nitelikler'}</span>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">{isRo ? 'Ce Soluții de Machine Learning Oferim?' : isEn ? 'What Machine Learning Solutions Do We Offer?' : 'Ne Tür Makine Öğrenmesi Çözümleri Sunuyoruz?'}</h2>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <ul className="divide-y divide-slate-200">
                {mobileVisibleSolutions.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-4">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                    <span className="text-slate-700 text-lg font-semibold leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShowAllSolutions((prev) => !prev)}
                aria-expanded={showAllSolutions}
                className="mt-2 mx-auto flex items-center justify-center gap-2 rounded-md bg-[#0388d1] px-5 py-2 text-white font-semibold"
              >
                <span>{showAllSolutions ? showLessLabel : showMoreLabel}</span>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform ${showAllSolutions ? 'rotate-180' : ''}`}
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
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-[7fr_5fr] gap-12 md:gap-14 items-center">
            <div className="reveal flex items-center justify-center pt-8 md:pt-14 order-1">
              <div className="relative flex items-center justify-center w-full">
                <SmartImage
                  src={aiSolutionsImage}
                  alt={isRo ? 'Vizualizare soluții machine learning' : isEn ? 'Machine learning solutions visual' : 'Makine öğrenmesi çözümleri görseli'}
                  width={1920}
                  height={1080}
                  className="w-full h-auto max-h-[460px] object-contain mx-auto"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </div>

            <div className="order-2">
              <div className="section-head reveal text-left max-w-3xl mb-8">
                <span className="eyebrow">{isRo ? 'Capacități' : isEn ? 'Capabilities' : 'Nitelikler'}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">{isRo ? 'Ce Soluții de Machine Learning Oferim?' : isEn ? 'What Machine Learning Solutions Do We Offer?' : 'Ne Tür Makine Öğrenmesi Çözümleri Sunuyoruz?'}</h2>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 md:px-7 md:py-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)] h-full flex flex-col justify-center">
                <ul className="divide-y divide-slate-200">
                  {visibleSolutions.map((item) => (
                    <li key={item} className="flex items-center gap-3 py-4 md:py-4.5">
                      <span className="h-3 w-3 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                      <span className="text-slate-700 text-lg font-semibold leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                {solutions.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSolutions((prev) => !prev)}
                    aria-expanded={showAllSolutions}
                    className="mt-2 w-full flex items-center justify-between gap-2 border-t border-slate-200 pt-4 text-[#0e4ea4] font-semibold text-sm"
                  >
                    <span>{showAllSolutions ? showLessLabel : showMoreLabel}</span>
                    <span
                      className={`h-9 w-9 rounded-full border-2 border-[#0e4ea4] flex items-center justify-center shrink-0 transition-transform duration-300 ${showAllSolutions ? 'rotate-180' : ''}`}
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
        </div>
      </section>

      <section className="py-24 md:py-32 px-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="reveal space-y-6 order-2 lg:order-1">
              <span className="eyebrow">{isRo ? 'Aplicații' : isEn ? 'Applications' : 'Uygulamalar'}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{deepLearningApp.title}</h2>
              <p className="text-sky-700 text-xl md:text-2xl font-bold leading-tight">{deepLearningApp.spot}</p>
              <p className="text-slate-600 text-lg leading-relaxed">{deepLearningApp.desc}</p>
            </div>

            <div className="reveal order-1 lg:order-2">
              <SmartImage
                src="/assets/new/hizmetler/ai-makine-ogrenmesi/AI-MakineOgrenmesi-Iliski.svg"
                alt={isRo ? 'Diagramă de relații deep learning' : isEn ? 'Deep learning relationship diagram' : 'Derin öğrenme ilişki diyagramı'}
                width={1200}
                height={800}
                className="responsive-contain-image w-full md:w-[110%] md:max-w-[920px] md:-ml-4 mx-auto origin-center object-contain drop-shadow-2xl"
                style={{ maxHeight: 'min(640px, 78vh)' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 768px"
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-4 md:px-6">
        <div className="container-wide">
          <div className="reveal md:hidden max-w-6xl mx-auto text-center">
            <SmartImage
              src="/assets/new/hizmetler/ai-makine-ogrenmesi/AI-MakineOgrenmesiBaglanti.svg"
              alt={isRo ? 'Vizualizare arhitectură ETL' : isEn ? 'ETL architecture visual' : 'ETL mimari görseli'}
              width={1200}
              height={600}
              className="responsive-contain-image w-full mx-auto origin-center object-contain drop-shadow-2xl"
              style={{ maxHeight: 'min(620px, 76vh)' }}
              sizes="100vw"
              quality={90}
            />
            <h2 className="mt-7 text-3xl font-bold text-[#03499a] tracking-tight">{etlApp.title}</h2>
            <p className="mt-5 text-[#00a9e6] text-xl font-bold leading-tight">{etlApp.spot}</p>
            <p className="mt-6 text-[#0f4d96] text-lg leading-relaxed max-w-6xl mx-auto">
              {etlApp.desc}
            </p>
          </div>

          <div className="hidden md:block reveal max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#03499a] tracking-tight">{etlApp.title}</h2>
            <p className="mt-5 md:mt-6 text-[#00a9e6] text-xl md:text-2xl font-bold leading-tight">{etlApp.spot}</p>
            <p className="mt-6 md:mt-8 text-[#0f4d96] text-lg leading-relaxed max-w-6xl mx-auto">
              {etlApp.desc}
            </p>
          </div>

          <div className="hidden md:block reveal mt-12 md:mt-16">
            <SmartImage
              src="/assets/new/hizmetler/ai-makine-ogrenmesi/AI-MakineOgrenmesiBaglanti.svg"
              alt={isRo ? 'Vizualizare arhitectură ETL' : isEn ? 'ETL architecture visual' : 'ETL mimari görseli'}
              width={1200}
              height={600}
              className="responsive-contain-image w-full lg:w-[110%] lg:max-w-[980px] mx-auto origin-center object-contain drop-shadow-2xl"
              style={{ maxHeight: 'min(620px, 76vh)' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
              quality={90}
            />
          </div>

        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{isRo ? 'Luați Decizii Bazate pe Date' : isEn ? 'Make Data-Driven Decisions' : 'Veriye Dayalı Kararlar Alın'}</h2>
          <p className="text-sky-100/80 text-lg leading-relaxed mb-10">
            {isRo ? 'Transformați-vă operațiunile în sisteme inteligente cu soluțiile noastre ML.' : isEn ? 'Transform your operations into intelligent systems with our ML solutions.' : 'Makine öğrenmesi çözümlerimizle işletmenizi akıllı sistemlere dönüştürün.'}
          </p>
          <Link href={`${localizePath('/iletisim')}#contact-form`} className="btn-cta bg-white text-sky-600 hover:bg-sky-50 px-10 py-4 font-bold rounded-xl shadow-xl transition-all">
            {isRo ? 'Contactați-ne' : isEn ? 'Contact Us' : 'Bize Ulaşın'}
          </Link>
        </div>
      </section>
    </div>
  );
}


