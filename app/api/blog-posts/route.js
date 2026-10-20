import { NextResponse } from 'next/server';
import { getAllBlogPostsFromStrapi } from '../../../lib/strapi/services/blog';

/**
 * GET /api/blog-posts
 * Ana sayfa blog carousel için Strapi'den post listesi döndürür.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'ro';
    const posts = await getAllBlogPostsFromStrapi(locale);
    return NextResponse.json(posts, {
      headers: {
        // 60 saniye CDN cache, arka planda yenilenebilir
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
