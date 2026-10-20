import { NextResponse } from 'next/server';

/**
 * Debug endpoint: Strapi baglantiyi test eder.
 * GET /api/debug-strapi
 * GET /api/debug-strapi?collection=hizmetler&slug=ai-makine-ogrenmesi&locale=tr
 * ONEMLI: Production'da devre disi birakilmalidir.
 */
export async function GET(request) {
  // Production'da bu endpoint tamamen devre dışı
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  const STRAPI_URL = process.env.STRAPI_URL;
  const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
  const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection') || 'blog-posts';
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') || 'ro';

  const result = {
    env: {
      STRAPI_URL: STRAPI_URL ? 'SET' : 'NOT SET',
      STRAPI_API_TOKEN: STRAPI_API_TOKEN ? 'SET' : 'NOT SET',
      REVALIDATE_SECRET: REVALIDATE_SECRET ? 'SET' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    },
    strapiConnection: null,
    error: null,
  };

  if (!STRAPI_URL) {
    result.error = 'STRAPI_URL is not set.';
    return NextResponse.json(result, { status: 500 });
  }

  try {
    let path = `${STRAPI_URL}/api/${collection}?populate=*&locale=${locale}`;
    if (slug) {
      path += `&filters[slug][$eq]=${slug}`;
    } else {
      path += '&pagination[limit]=1';
    }

    const headers = { 'Content-Type': 'application/json' };
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const start = Date.now();
    const res = await fetch(path, {
      cache: 'no-store',
      headers,
      signal: AbortSignal.timeout(10000),
    });
    const elapsed = Date.now() - start;

    let body;
    try {
      body = await res.json();
    } catch {
      body = { parseError: true };
    }

    const entryCount = Array.isArray(body?.data) ? body.data.length : (body?.data ? 1 : 0);

    result.strapiConnection = {
      url: path,
      status: res.status,
      statusText: res.statusText,
      responseTimeMs: elapsed,
      entryCount,
      data: body,
    };
  } catch (error) {
    result.error = error.message;
    result.strapiConnection = { failed: true, errorType: error.name };
  }

  return NextResponse.json(result, { status: result.error ? 500 : 200 });
}
