import { strapiGet } from '@/lib/strapi/client';

/**
 * GET /api/privacy-page-data?locale=tr
 *
 * Strapi'deki `privacy-page` Single Type içeriğini döner.
 * Alanlar: title, subtitle, official, ctaTitle, ctaText, ctaButton, htmlContent
 */
export async function GET(request) {
  const locale = request.nextUrl.searchParams.get('locale') || 'ro';

  let raw = null;
  try {
    raw = await strapiGet(`privacy-page?locale=${locale}&populate=*`);
  } catch (err) {
    console.error('[privacy-page-data] Strapi fetch hatası:', err.message);
    return Response.json({ error: err.message }, { status: 502 });
  }

  // Strapi v5: tek kayıt → { data: { id, documentId, ...fields } }
  if (!raw?.data) {
    return Response.json({ data: null }, { status: 404 });
  }

  const { id, documentId, createdAt, updatedAt, publishedAt, locale: _loc, ...fields } = raw.data;

  return Response.json(
    { data: fields },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
