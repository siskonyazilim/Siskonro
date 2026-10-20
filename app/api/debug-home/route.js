import { NextResponse } from 'next/server';
import { getHomePage } from '@/lib/strapi/services/home';

/**
 * Debug endpoint: Home sayfasının Strapi'den normalize edilmiş halini gösterir.
 * GET /api/debug-home?locale=tr
 * ONEMLI: Production'da devre dışı bırakılmalıdır.
 */
export async function GET(request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'ro';

  try {
    const data = await getHomePage(locale);

    // Her section'ın alanlarını analiz et
    const analysis = {
      locale,
      hero: {
        heroTaglineLine1: data.heroTaglineLine1 ?? '⚠️ MISSING',
        heroTaglineLine2: data.heroTaglineLine2 ?? '⚠️ MISSING',
        heroTitle: data.heroTitle ?? '⚠️ MISSING',
        heroDescription: data.heroDescription ? data.heroDescription.substring(0, 80) + '...' : '⚠️ MISSING',
        heroCta: data.heroCta ?? '⚠️ MISSING',
        aboutUsButton: data.aboutUsButton ?? '⚠️ MISSING',
      },
      services: {
        servicesEyebrow: data.servicesEyebrow ?? '⚠️ MISSING',
        servicesTitle: data.servicesTitle ? data.servicesTitle.substring(0, 60) + '...' : '⚠️ MISSING',
        servicesDescription: data.servicesDescription ? data.servicesDescription.substring(0, 60) + '...' : '⚠️ MISSING',
        allServicesEyebrow: data.allServicesEyebrow ?? '⚠️ MISSING',
        allServicesTitle: data.allServicesTitle ?? '⚠️ MISSING',
        allServicesDescription: data.allServicesDescription ?? '⚠️ MISSING',
        allServicesButton: data.allServicesButton ?? '⚠️ MISSING',
        serviceCards_count: (data.services ?? []).length,
        serviceCards: (data.services ?? []).map(s => ({
          num: s.num,
          desc: s.desc ? s.desc.substring(0, 50) + '...' : '⚠️ MISSING',
          href: s.href,
          img: s.img || '⚠️ MISSING',
        })),
      },
      onSuite: {
        onSuiteSectionTitle: data.onSuiteSectionTitle ?? '⚠️ MISSING',
        onSuiteSectionDesc1: data.onSuiteSectionDesc1 ? data.onSuiteSectionDesc1.substring(0, 60) + '...' : '⚠️ MISSING',
        onSuiteSectionDesc2: data.onSuiteSectionDesc2 ? data.onSuiteSectionDesc2.substring(0, 60) + '...' : '⚠️ MISSING',
        discoverOnSuiteButton: data.discoverOnSuiteButton ?? '⚠️ MISSING',
        onSuiteImage: data.onSuiteImage || '⚠️ MISSING — Strapi onSuite.image boş veya populate edilmedi',
        products_count: (data.products ?? []).length,
        products_note: (data.products ?? []).length === 0 ? '⚠️ products dizisi BOŞ - OnSuiteSection sadece ürün görselini gösteremiyor' : 'OK',
        products: (data.products ?? []).map(p => ({
          badge: p.badge,
          title: p.title,
          href: p.href,
          img: p.img || '⚠️ MISSING',
          metrics_count: (p.metrics ?? []).length,
        })),
      },
      globalStats: {
        globalEyebrow: data.globalEyebrow ?? '⚠️ MISSING',
        globalTitle: data.globalTitle ?? '⚠️ MISSING',
        globalDescription: data.globalDescription ? data.globalDescription.substring(0, 60) + '...' : '⚠️ MISSING',
        globalProjectsEyebrow: data.globalProjectsEyebrow ?? '⚠️ MISSING',
        countriesLabel: data.countriesLabel ?? '⚠️ MISSING',
        factoriesLabel: data.factoriesLabel ?? '⚠️ MISSING',
        legendAlt: data.legendAlt ?? '⚠️ MISSING',
        defaultMapAlt: data.defaultMapAlt ?? '⚠️ MISSING',
        stats_count: (data.stats ?? []).length,
        stats: data.stats ?? [],
        continents: data.continents ?? '⚠️ MISSING',
        defaultMapSrc: data.defaultMapSrc ?? '⚠️ MISSING',
        legendImageSrc: data.legendImageSrc ?? '⚠️ MISSING',
        continentMaps: data.continentMaps ? Object.fromEntries(
          Object.entries(data.continentMaps).map(([k, v]) => [k, { label: v.label, src: v.src || '⚠️ NO SRC' }])
        ) : '⚠️ MISSING',
      },
      references: {
        referencesEyebrow: data.referencesEyebrow ?? '⚠️ MISSING',
        referencesTitle: data.referencesTitle ?? '⚠️ MISSING',
        referencesButton: data.referencesButton ?? '⚠️ MISSING',
        references_count: (data.references ?? []).length,
        references: (data.references ?? []).map(r => ({
          name: r.name,
          logo: r.logo || '⚠️ MISSING',
        })),
      },
      cta: {
        ctaTitle: data.ctaTitle ?? '⚠️ MISSING',
        ctaDescription: data.ctaDescription ? data.ctaDescription.substring(0, 60) + '...' : '⚠️ MISSING',
        ctaButton: data.ctaButton ?? '⚠️ MISSING',
      },
      misc: {
        exploreDetails: data.exploreDetails ?? '⚠️ MISSING',
        exploreDetailsLabel: data.exploreDetailsLabel ?? '⚠️ MISSING',
        imageUnavailable: data.imageUnavailable ?? '⚠️ MISSING',
        productsEyebrow: data.productsEyebrow ?? '⚠️ MISSING',
        productsTitle: data.productsTitle ?? '⚠️ MISSING',
        productsDescription: data.productsDescription ?? '⚠️ MISSING',
        allProductsButton: data.allProductsButton ?? '⚠️ MISSING',
      },
    };

    return NextResponse.json({ ok: true, analysis }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
