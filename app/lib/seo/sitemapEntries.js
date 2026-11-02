import { toLocalizedPath } from '../i18n/routes';
import { ROUTE_PATHS, SITE_URL } from './routeMetadata';
import { getAllBlogPostsFromStrapi, parseDateToTime } from '../../../lib/strapi/services/blog';

// Romence varsayılan dildir: sayfa başına RO, EN, TR sırası; RO öncelikli (+0.05).
const LOCALES = ['ro', 'en', 'tr'];

// /search: indekslenmez. /kurumsal: yönlendirme. /kurumsal/kilometre-taslari: henüz 404 veriyor.
const EXCLUDED = new Set(['/search', '/kurumsal', '/kurumsal/kilometre-taslari']);

const abs = (p) => `${SITE_URL}${p}`;

// Statik sayfalarda lastmod yok: dosya değişiklik zamanı dağıtım anını gösterir ve tüm sayfalar aynı güne düşer.
function pageEntries() {
  const entries = [];
  for (const internal of ROUTE_PATHS) {
    if (EXCLUDED.has(internal)) continue;
    const base = internal === '/' ? 1 : internal.split('/').length > 2 ? 0.7 : 0.8;
    for (const l of LOCALES) {
      entries.push({
        url: abs(toLocalizedPath(internal, l)),
        changeFrequency: internal === '/' ? 'weekly' : 'monthly',
        priority: l === 'ro' ? base : Math.round((base - 0.05) * 100) / 100,
      });
    }
  }
  return entries;
}

async function blogEntries() {
  const entries = [];
  for (const l of LOCALES) {
    const posts = await getAllBlogPostsFromStrapi(l).catch(() => []);
    for (const post of posts) {
      if (!post?.slug) continue;
      // Blog tarihleri 'AA-YYYY' gibi metin olabilir; parseDateToTime bunları da çözer (çözülemezse lastmod yazılmaz)
      const t = parseDateToTime(post.date ?? post.publishedAt ?? '');
      entries.push({
        url: abs(`${toLocalizedPath('/blog', l)}/${encodeURIComponent(post.slug)}`),
        lastModified: t > 0 ? new Date(t) : undefined,
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }
  return entries;
}

export async function getSitemapEntries() {
  const [pages, blog] = await Promise.all([Promise.resolve(pageEntries()), blogEntries()]);
  return [...pages, ...blog];
}
