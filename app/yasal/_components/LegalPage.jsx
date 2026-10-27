/**
 * Yasal sayfa şablonu (KVKK, Gizlilik, Çerez) — Server Component
 *
 * Neden server? İçerik daha önce tarayıcıda useEffect + fetch ile çekiliyordu;
 * sunucudan dönen HTML yalnızca bir "yükleniyor" animasyonu içeriyordu
 * (arama motorları ve JS çalıştırmayan yapay zeka botları boş sayfa görüyordu).
 * Artık Strapi sunucuda çekilir, hata/boşsa yerel JSON (messages/yasal/*) kullanılır.
 */

import { headers } from 'next/headers';
import DOMPurify from 'isomorphic-dompurify';
import PageHero from '../../components/PageHero';
import AnimatedCTALink from '../../components/AnimatedCTALink';
import { detectLocale, toLocalizedPath } from '../../lib/i18n/routes';
import { strapiGet } from '@/lib/strapi/client';
import './legal.css';

const USE_STRAPI = false;

async function fetchStrapiContent(endpoint, locale) {
  try {
    const raw = await strapiGet(`${endpoint}?locale=${locale}&populate=*`);
    if (!raw?.data) return null;

    // Strapi meta alanlarını at, yalnızca içerik alanlarını tut
    const fields = { ...raw.data };
    for (const key of ['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale']) {
      delete fields[key];
    }
    return fields;
  } catch (error) {
    console.error(`[LegalPage/${endpoint}] Strapi fetch hatası:`, error?.message ?? error);
    return null;
  }
}

/**
 * @param {{ endpoint: string, messages: { tr: object, en: object, ro: object }, searchParams?: Promise<object> }} props
 */
export default async function LegalPage({ endpoint, messages, searchParams }) {
  const params = await searchParams;
  const localeFromQuery = params?._locale;

  const requestHeaders = await headers();
  const requestPath =
    requestHeaders.get('x-pathname') ??
    requestHeaders.get('x-invoke-path') ??
    '/';

  const locale = (localeFromQuery === 'en' || localeFromQuery === 'ro')
    ? localeFromQuery
    : detectLocale(requestPath);

  const fallback = messages[locale] ?? messages.tr;
  // Geçici: içerik Strapi yerine yerel JSON'dan (messages/yasal/*) gelir.
  // Strapi alan yapısı güncellenince USE_STRAPI true yapılacak.
  const content = USE_STRAPI ? await fetchStrapiContent(endpoint, locale) : null;
  const d = content ?? fallback;

  // htmlContent: Strapi Rich Text (Blocks) ise string değil, array gelir.
  // Biz Long Text / string bekliyoruz; array gelirse fallback HTML kullan.
  const rawHtml = typeof d.htmlContent === 'string' ? d.htmlContent : fallback.htmlContent;
  const html = DOMPurify.sanitize(rawHtml);

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={d.title}
        subtitle={d.subtitle}
        breadcrumbs={[
          fallback.home,
          fallback.legal,
          d.title,
        ]}
      />

      <section className="py-14 md:py-20 px-4 md:px-6 bg-slate-50">
        <div className="container-wide">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(2,6,23,0.08)]">
            <header className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-4 md:px-8 md:py-5">
              <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.14em] text-sky-700">
                {d.official}
              </p>
            </header>
            <div
              className="px-5 py-6 md:px-10 md:py-10 text-slate-700 leading-relaxed text-[15px] md:text-[16px] legal-html"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>
        </div>
      </section>

      <section className="cta-section">
        <div className="container text-center max-w-3xl mx-auto">
          <h2>{d.ctaTitle}</h2>
          <p>{d.ctaText}</p>
          <AnimatedCTALink href={`${toLocalizedPath('/iletisim', locale)}#contact-form`}>
            {d.ctaButton}
          </AnimatedCTALink>
        </div>
      </section>
    </div>
  );
}
