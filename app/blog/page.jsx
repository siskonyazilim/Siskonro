import { headers } from 'next/headers';
import PageHero from '../components/PageHero';
import BlogGrid from './BlogGrid';
import { detectLocale } from '../lib/i18n/routes';
import { getAllBlogPostsFromStrapi, formatBlogDate } from '../../lib/strapi/services/blog';
import { getBlogPage } from '../../lib/strapi/services/blogPage';
import trLocale from '../../messages/blog/tr.json';
import enLocale from '../../messages/blog/en.json';
import roLocale from '../../messages/blog/ro.json';

export async function generateMetadata(props) {
  const searchParams = await props.searchParams;
  const localeFromQuery = searchParams?._locale;

  const requestHeaders = await headers();
  const requestPath =
    requestHeaders.get('x-pathname') ??
    requestHeaders.get('x-invoke-path') ??
    '/';

  const locale = (localeFromQuery === 'en' || localeFromQuery === 'ro')
    ? localeFromQuery
    : detectLocale(requestPath);

  const messages = { tr: trLocale, en: enLocale, ro: roLocale };
  const t = messages[locale] ?? roLocale;
  const pageData = await getBlogPage(locale);

  return {
    title: `${pageData?.heroTitle ?? t.pageTitle ?? 'Haber / Blog'} | Siskon`,
    description: pageData?.heroSubtitle ?? t.pageDescription,
  };
}


export default async function BlogPage(props) {
  const searchParams = await props.searchParams;
  const localeFromQuery = searchParams?._locale;

  const requestHeaders = await headers();
  const requestPath =
    requestHeaders.get('x-pathname') ??
    requestHeaders.get('x-invoke-path') ??
    '/';

  const locale = (localeFromQuery === 'en' || localeFromQuery === 'ro')
    ? localeFromQuery
    : detectLocale(requestPath);

  const messages = { tr: trLocale, en: enLocale, ro: roLocale };
  const t = messages[locale] ?? roLocale;
  const pt = (key) => t[key] ?? key;

  // Strapi'den sayfa başlıkları ve locale bazlı blog listesini çek
  const [pageData, posts] = await Promise.all([
    getBlogPage(locale),
    getAllBlogPostsFromStrapi(locale),
  ]);

  // Client bileşenine yalnızca serileştirilebilir veri gider; tarih etiketi burada hazırlanır
  const cardPosts = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    coverImage: post.coverImage,
    dateLabel: formatBlogDate(post.date, locale),
  }));

  const pageTitle = pageData?.heroTitle ?? pt('pageTitle');
  const pageDescription = pageData?.heroSubtitle ?? pt('pageDescription');

  return (
    <div className="bg-white">
      <PageHero
        title={pageTitle}
        subtitle={pageDescription}
        breadcrumbs={[pt('breadcrumbHome'), pt('breadcrumbBlog')]}
      />

      <div className="container-wide mx-auto py-14 md:py-20 px-6 sm:px-10">
        {/* İçerik - 3'lü Sıralı Geniş Grid */}
        <BlogGrid
          posts={cardPosts}
          defaultCategory={pt('defaultCategory')}
          locale={locale}
          prevLabel={pt('prevPage')}
          nextLabel={pt('nextPage')}
        />

        {/* Boş durum */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 border border-slate-200">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-600 font-semibold">{pt('emptyState')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
