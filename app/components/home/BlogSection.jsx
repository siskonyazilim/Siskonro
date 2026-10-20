/**
 * Ana sayfa Blog Önizleme bölümü — Server Component (wrapper)
 *
 * Veri akışı:
 *   Strapi (blog-posts) → blog.js → getAllBlogPostsFromStrapi()
 *   → BlogCarousel (client: carousel state)
 *
 * Bu katman server'da çalışır:
 *   - Blog postları Strapi'den doğrudan çekilir (API round-trip yok)
 *   - Strapi yoksa blogContent.js fallback'e döner
 */

import { getAllBlogPostsFromStrapi } from '@/lib/strapi/services/blog';
import BlogCarousel from './BlogCarousel';

export default async function BlogSection({ locale = 'ro' }) {
  // Server-side fetch — blog.js servisinden gelir (Strapi → fallback)
  const posts = await getAllBlogPostsFromStrapi(locale);

  const sectionTitle =
    locale === 'en' ? 'News / Blog' : locale === 'ro' ? 'Știri / Blog' : 'Haber / Blog';

  return (
    <section className="py-16 md:py-24 px-6 sm:px-10 bg-white border-t border-slate-100">
      <div className="container-wide">
        {/* Bölüm başlığı */}
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-[#1B3A63] tracking-tight">
            {sectionTitle}
          </h2>
        </div>

        {/* Carousel — client component, state yönetir */}
        <BlogCarousel posts={posts} locale={locale} />
      </div>
    </section>
  );
}
