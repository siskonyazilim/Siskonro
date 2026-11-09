import { getHeaderData } from '@/lib/strapi/services/header';
import { getFooterData } from '@/lib/strapi/services/footer';

const LOCALES = ['tr', 'en', 'ro'];

/**
 * GET /api/layout-data?type=header|footer&locale=tr|en|ro
 *
 * Header/Footer sunucudan yalnızca aktif dilin verisiyle gelir; kullanıcı dili değiştirince
 * istemci diğer dilin verisini buradan ister (bkz. useLocaleLayoutData).
 */
export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  const locale = searchParams.get('locale');

  if (!LOCALES.includes(locale) || (type !== 'header' && type !== 'footer')) {
    return Response.json({ error: 'invalid params' }, { status: 400 });
  }

  try {
    const data = type === 'header' ? await getHeaderData(locale) : await getFooterData(locale);
    return Response.json(
      { data: data ?? null },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } },
    );
  } catch (err) {
    console.error('[layout-data] fetch hatası:', err.message);
    return Response.json({ data: null }, { status: 502 });
  }
}
