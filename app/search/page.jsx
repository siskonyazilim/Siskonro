'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHero from '../components/PageHero';
import { useLanguage } from '../_context/LanguageContext';
import { SERVICE_CATALOG } from '../../config/services';

const QUICK_LINKS = {
  tr: [
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: 'OnSuite', href: '/onsuite' },
    { label: 'Referanslar', href: '/referanslar' },
    { label: 'İletişim', href: '/iletisim#contact-form' },
  ],
  en: [
    { label: 'Services', href: '/hizmetler' },
    { label: 'OnSuite', href: '/onsuite' },
    { label: 'References', href: '/referanslar' },
    { label: 'Contact', href: '/iletisim#contact-form' },
  ],
};

const SEARCH_INDEX = {
  tr: [
    { title: 'Hizmetler', description: 'Endüstriyel yazılım, IIoT, otomasyon, görüntü işleme ve eğitim danışmanlık çözümleri.', href: '/hizmetler' },
    { title: 'OnSuite', description: '11 modüllü akıllı üretim platformu.', href: '/onsuite' },
    { title: 'Ar-Ge', description: 'Siskon inovasyon ve Ar-Ge yaklaşımı.', href: '/arge' },
    { title: 'İş Birlikleri', description: 'Global teknoloji liderleriyle stratejik ortaklıklar.', href: '/is-birlikleri' },
    { title: 'Referanslar', description: 'Farklı sektörlerden müşteri referansları ve başarı hikayeleri.', href: '/referanslar' },
    { title: 'Bizi Tanıyın', description: 'Kurumsal yapı, vizyon ve yaklaşım.', href: '/kurumsal/bizi-taniyin' },
    { title: 'Kariyer', description: 'Açık pozisyonlar ve başvuru süreçleri.', href: '/kurumsal/kariyer' },
    { title: 'İletişim', description: 'Teklif ve proje talepleri için iletişim formu.', href: '/iletisim#contact-form' },
    { title: 'KVKK Aydınlatma Metni', description: 'Kişisel verilerin işlenmesine ilişkin bilgilendirme.', href: '/yasal/kvkk' },
    { title: 'Gizlilik Politikası', description: 'Gizlilik ilkeleri ve veri güvenliği politikası.', href: '/yasal/gizlilik-politikasi' },
    { title: 'Çerez Politikası', description: 'Çerez kullanımı ve tercih yönetimi.', href: '/yasal/cerez-politikasi' },
  ],
  en: [
    { title: 'Services', description: 'Industrial software, IIoT, automation, vision and consulting services.', href: '/hizmetler' },
    { title: 'OnSuite', description: 'Smart manufacturing platform with 11 modules.', href: '/onsuite' },
    { title: 'R&D', description: 'Siskon innovation and R&D framework.', href: '/arge' },
    { title: 'Partnerships', description: 'Strategic partnerships with global technology leaders.', href: '/is-birlikleri' },
    { title: 'References', description: 'Customer references and success stories across industries.', href: '/referanslar' },
    { title: 'About Us', description: 'Corporate profile, vision and engineering approach.', href: '/kurumsal/bizi-taniyin' },
    { title: 'Careers', description: 'Open roles and application process.', href: '/kurumsal/kariyer' },
    { title: 'Contact', description: 'Contact form for proposals and projects.', href: '/iletisim#contact-form' },
    { title: 'PDPL Notice', description: 'Notice on personal data processing and rights.', href: '/yasal/kvkk' },
    { title: 'Privacy Policy', description: 'Privacy principles and data protection policy.', href: '/yasal/gizlilik-politikasi' },
    { title: 'Cookie Policy', description: 'Cookie usage details and preference management.', href: '/yasal/cerez-politikasi' },
  ],
};

const SERVICE_SEARCH_DESCRIPTIONS = {
  tr: {
    '/hizmetler/musteriye-ozel-yazilim': 'İşletmenize özel geliştirilen ölçeklenebilir yazılım ve entegrasyon çözümleri.',
    '/hizmetler/iiot': 'Saha verisini güvenli şekilde toplama, analiz ve bulut entegrasyonu.',
    '/hizmetler/izlenebilirlik-cozumleri': 'Üretimde lot ve süreç takibi için uçtan uca izlenebilirlik altyapısı.',
    '/hizmetler/makine-proses-otomasyonu': 'Daha hızlı, güvenli ve verimli üretim için otomasyon uygulamaları.',
    '/hizmetler/robot-cozumleri': 'Robotik hücreler ve hat entegrasyonu ile esnek üretim kabiliyeti.',
    '/hizmetler/goruntu-isleme': 'Yapay zeka destekli görüntü işleme ile kalite kontrol.',
    '/hizmetler/ai-makine-ogrenmesi': 'Veri analitiği ve makine öğrenmesi ile karar destek.',
    '/hizmetler/microsoft-cozumleri': 'Microsoft ekosistemiyle kurumsal platform ve bulut entegrasyonu.',
    '/hizmetler/ge-vernova': 'GE Vernova Proficy tabanlı üretim ve operasyon analitiği çözümleri.',
    '/hizmetler/egitim-danismanlik': 'Endüstriyel dönüşüm için teknik eğitim ve danışmanlık.',
  },
  en: {
    '/hizmetler/musteriye-ozel-yazilim': 'Scalable software and integration architecture tailored to your operation.',
    '/hizmetler/iiot': 'Secure collection, analysis and cloud integration of shopfloor data.',
    '/hizmetler/izlenebilirlik-cozumleri': 'End-to-end lot and process traceability infrastructure for production.',
    '/hizmetler/makine-proses-otomasyonu': 'Automation solutions for faster, safer and more efficient production.',
    '/hizmetler/robot-cozumleri': 'Robotic cells and line integration for flexible industrial operations.',
    '/hizmetler/goruntu-isleme': 'AI-assisted machine vision for quality inspection.',
    '/hizmetler/ai-makine-ogrenmesi': 'Industrial analytics and ML-driven decision support.',
    '/hizmetler/microsoft-cozumleri': 'Enterprise platform and cloud integration on the Microsoft ecosystem.',
    '/hizmetler/ge-vernova': 'GE Vernova Proficy-based production and operations analytics solutions.',
    '/hizmetler/egitim-danismanlik': 'Technical training and consulting for industrial transformation.',
  },
};

function buildServiceSearchItems(locale) {
  const dict = SERVICE_SEARCH_DESCRIPTIONS[locale] || SERVICE_SEARCH_DESCRIPTIONS.tr;
  const nameLocale = locale === 'en' ? 'en' : 'tr';

  return SERVICE_CATALOG.map((service) => ({
    title: service.names[nameLocale],
    description: dict[service.href] || (locale === 'en' ? 'Industrial engineering service detail page.' : 'Endüstriyel mühendislik hizmeti detay sayfası.'),
    href: service.href,
  }));
}

function normalizeText(value) {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f]/g, '')
    .trim();
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const { locale, localizePath } = useLanguage();
  const isEn = locale === 'en';

  const query = (searchParams.get('q') || '').toString().trim();
  const hasQuery = Boolean(query);
  const quickLinks = QUICK_LINKS[locale];
  const staticItems = SEARCH_INDEX[locale] || SEARCH_INDEX.tr;
  const indexItems = useMemo(() => {
    const serviceItems = buildServiceSearchItems(locale);
    return [...staticItems.slice(0, 1), ...serviceItems, ...staticItems.slice(1)];
  }, [locale, staticItems]);
  const normalizedQuery = normalizeText(query);

  const results = useMemo(() => {
    if (!hasQuery) return [];

    return indexItems.filter((item) => {
      const haystack = normalizeText(`${item.title} ${item.description}`);
      return haystack.includes(normalizedQuery);
    });
  }, [hasQuery, indexItems, normalizedQuery]);

  let resultTitle = isEn ? 'No query entered' : 'Henüz bir arama girilmedi';
  if (hasQuery) {
    resultTitle = isEn ? `Results for: ${query}` : `Arama sonucu: ${query}`;
  }

  let resultCountText = '';
  if (hasQuery) {
    resultCountText = isEn
      ? `${results.length} result(s) found`
      : `${results.length} sonuç bulundu`;
  }

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={isEn ? 'Search' : 'Arama'}
        subtitle={
          isEn
            ? 'Use your query to quickly navigate to the most relevant section.'
            : 'Aradığınız içeriğe hızlı ulaşmak için sorgunuzu kullanın.'
        }
        breadcrumbs={isEn ? ['Home', 'Search'] : ['Ana Sayfa', 'Arama']}
      />

      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="container max-w-4xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-sky-700 mb-4">
              {isEn ? 'Query' : 'Sorgu'}
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
              {resultTitle}
            </h2>

            {hasQuery && (
              <p className="text-slate-600 leading-relaxed mb-8">{resultCountText}</p>
            )}

            {hasQuery && results.length > 0 && (
              <div className="space-y-3 mb-8">
                {results.map((item) => (
                  <Link
                    key={item.href}
                    href={localizePath(item.href)}
                    className="block rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 hover:border-sky-300 hover:bg-white transition-all"
                  >
                    <p className="text-slate-900 font-bold">{item.title}</p>
                    <p className="text-slate-600 text-sm mt-1">{item.description}</p>
                  </Link>
                ))}
              </div>
            )}

            {hasQuery && results.length === 0 && (
              <p className="text-slate-600 leading-relaxed mb-8">
                {isEn
                  ? 'No matching page found. You can continue from the shortcuts below.'
                  : 'Eşleşen sayfa bulunamadı. Aşağıdaki hızlı bağlantılarla devam edebilirsiniz.'}
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={localizePath(item.href)}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 font-semibold text-slate-800 hover:border-sky-300 hover:bg-white transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{isEn ? 'Could not find what you need?' : 'Aradığınız içeriği bulamadınız mı?'}</h2>
          <p>
            {isEn
              ? 'Describe your requirement and we will direct you to the right service, product, or sector page.'
              : 'İhtiyacınızı bizimle paylaşın; sizi doğru hizmet, ürün veya sektör sayfasına yönlendirelim.'}
          </p>
          <Link href={localizePath('/iletisim#contact-form')} className="btn-cta">
            {isEn ? 'Get Direct Support' : 'Doğrudan Destek Alın'}
          </Link>
        </div>
      </section>
    </div>
  );
}
