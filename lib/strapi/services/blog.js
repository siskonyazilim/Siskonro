import { strapiGet } from '../client';
import postsTr from '../../../messages/blog/posts.tr.json';
import postsEn from '../../../messages/blog/posts.en.json';
import postsRo from '../../../messages/blog/posts.ro.json';

// Strapi erişilemezse kullanılan statik yedek (Strapi'den tek seferlik dışa aktarım).
const STATIC_POSTS = { tr: postsTr, en: postsEn, ro: postsRo };
const staticPosts = (locale) => STATIC_POSTS[locale] ?? STATIC_POSTS.ro;
function findStaticPost(slug, locale) {
  const direct = staticPosts(locale).find((p) => p.slug === slug);
  if (direct) return direct;
  for (const alt of ['ro', 'en', 'tr'].filter((l) => l !== locale)) {
    const found = STATIC_POSTS[alt].find((p) => p.slug === slug);
    if (!found) continue;
    const target = found.localizations?.find((l) => l.locale === locale);
    // Başka dildeki yazı gösterilmez: yalnızca istenen dildeki karşılığı döner
    return target ? (staticPosts(locale).find((p) => p.slug === target.slug) ?? null) : null;
  }
  return null;
}
function withEmbed(post) {
  return post ? { ...post, youtubeEmbed: toYoutubeEmbed(post.youtubeUrl ?? null) } : null;
}

const STRAPI_URL = process.env.STRAPI_URL ?? '';
const PUBLIC_STRAPI_URL =
  process.env.STRAPI_PUBLIC_URL ||
  (STRAPI_URL && !STRAPI_URL.includes('strapi-') && !STRAPI_URL.includes('172.') ? STRAPI_URL : 'https://siskonwebdb.domainmanager.com.tr');

// ─── Normalize ────────────────────────────────────────────────────────────────

function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

function toAbsolute(url) {
  if (!url) return null;
  return url.startsWith('/') ? `${PUBLIC_STRAPI_URL}${url}` : url;
}

/** YouTube URL'den video ID çıkar ve embed URL döndür */
function toYoutubeEmbed(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}`;
  }
  return null;
}

function normalizeBlogPost(raw) {
  if (!raw) return null;
  const d = attrs(raw);

  // coverImage
  const rawUrl = d.coverImage?.data?.attributes?.url ?? d.coverImage?.url ?? d.coverImage ?? null;
  const coverImage = toAbsolute(rawUrl);

  // youtubeUrl — Strapi'den ham URL gelir, embed URL'ye çevrilir
  const youtubeEmbed = toYoutubeEmbed(d.youtubeUrl ?? null);

  // date / text date: text olarak veya tarih olarak gelen alanı al
  const rawDate = d.date ?? d.dateText ?? d.publishedAt ?? null;

  return {
    slug: d.slug ?? '',
    title: d.title ?? '',
    excerpt: d.excerpt ?? '',
    date: rawDate ? String(rawDate) : null,
    author: d.author ?? '',
    category: d.category ?? '',
    readTime: d.readTime ?? null,
    coverImage,
    youtubeEmbed,
    content: d.content ?? '',
    locale: d.locale ?? null,
    localizations: Array.isArray(d.localizations)
      ? d.localizations.map((l) => ({
        id: l.id,
        slug: l.slug,
        locale: l.locale,
        title: l.title,
      }))
      : [],
  };
}

// ─── Servis fonksiyonları ─────────────────────────────────────────────────────

const TR_MONTHS = {
  ocak: 0, jan: 0, january: 0,
  subat: 1, şubat: 1, feb: 1, february: 1,
  mart: 2, mar: 2, march: 2,
  nisan: 3, apr: 3, april: 3,
  mayis: 4, mayıs: 4, may: 4,
  haziran: 5, jun: 5, june: 5,
  temmuz: 6, jul: 6, july: 6,
  agustos: 7, ağustos: 7, aug: 7, august: 7,
  eylul: 8, eylül: 8, sep: 8, september: 8,
  ekim: 9, oct: 9, october: 9,
  kasim: 10, kasım: 10, nov: 10, november: 10,
  aralik: 11, aralık: 11, dec: 11, december: 11,
};

export function parseDateToTime(rawDate) {
  if (!rawDate) return 0;
  const str = String(rawDate).trim();

  // Tire (-), eğik çizgi (/), nokta (.) veya boşluk ile ayır: "Mayıs-2024", "05-2024", "Mayıs 2024", "2024-05"
  const tokens = str
    .toLowerCase()
    .split(/[-/.\s_]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  let year = null;
  let month = null;

  for (const token of tokens) {
    if (/^\d{4}$/.test(token)) {
      year = parseInt(token, 10);
    } else if (TR_MONTHS[token] !== undefined) {
      month = TR_MONTHS[token];
    } else if (/^\d{1,2}$/.test(token)) {
      const num = parseInt(token, 10);
      if (num >= 1 && num <= 12 && month === null) {
        month = num - 1;
      }
    }
  }

  if (year !== null) {
    return new Date(year, month ?? 0, 1).getTime();
  }

  const d = new Date(str);
  if (!Number.isNaN(d.getTime())) return d.getTime();

  return 0;
}

/**
 * Blog tarihi için dile duyarlı (TR/EN/RO) formatlama fonksiyonu.
 * "01-2020", "2024-05-10", "Mayıs-2024" gibi formatları destekler.
 */
export function formatBlogDate(rawDate, locale = 'ro') {
  if (!rawDate) return null;
  const str = String(rawDate).trim();
  if (!str) return null;

  const loc = locale === 'en' ? 'en-US' : locale === 'ro' ? 'ro-RO' : 'tr-TR';

  const tokens = str
    .toLowerCase()
    .split(/[-/.\s_]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  let year = null;
  let month = null;

  for (const token of tokens) {
    if (/^\d{4}$/.test(token)) {
      year = parseInt(token, 10);
    } else if (TR_MONTHS[token] !== undefined) {
      month = TR_MONTHS[token];
    } else if (/^\d{1,2}$/.test(token)) {
      const num = parseInt(token, 10);
      if (num >= 1 && num <= 12 && month === null) {
        month = num - 1;
      }
    }
  }

  if (year !== null) {
    const d = new Date(year, month ?? 0, 1);
    return d.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
  }

  const d = new Date(str);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
  }

  return str.replace(/-/g, ' ');
}

/** Tarihe göre azalan sırala (en yeni önce en üstte). Tarihi olmayanlar sona düşer. */
function sortByDateDesc(posts) {
  return [...posts].sort((a, b) => {
    const da = parseDateToTime(a.date);
    const db = parseDateToTime(b.date);
    return db - da;
  });
}

/**
 * Locale bazlı tüm blog gönderilerini Strapi'den çeker.
 *
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<Array>}
 */
export async function getAllBlogPostsFromStrapi(locale = 'ro') {
  try {
    const res = await strapiGet(
      `blog-posts?locale=${locale}&sort=date:desc&populate=coverImage&pagination[pageSize]=100`
    );
    if (!res || !Array.isArray(res.data)) {
      return sortByDateDesc(staticPosts(locale).map(withEmbed));
    }

    const posts = res.data
      .map((item) => normalizeBlogPost(item))
      .filter(Boolean);

    if (posts.length > 0) {
      return sortByDateDesc(posts);
    }

    // Strapi'de o dilde kayıt yoksa: TR için mock fallback'e dönebilir, diğer dillerde boş dizi döner
    return sortByDateDesc(staticPosts(locale).map(withEmbed));
  } catch (error) {
    console.error('[Strapi] getAllBlogPosts error:', error?.message ?? error);
    return sortByDateDesc(staticPosts(locale).map(withEmbed));
  }
}

/**
 * Slug ve Locale'e göre tek bir blog postunu Strapi'den çeker.
 * Eğer istenen dilde bulunamazsa, diğer dillerdeki kayıtlar ve onların çevirileri (localizations) taranır.
 *
 * @param {string} slug
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object|null>}
 */
export async function getBlogPostBySlugFromStrapi(slug, locale = 'ro') {
  try {
    // 1. Önce doğrudan istenen locale ile filtrele
    const res = await strapiGet(
      `blog-posts?locale=${locale}&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&pagination[pageSize]=1`
    );

    if (res && Array.isArray(res.data) && res.data.length > 0) {
      const post = normalizeBlogPost(res.data[0]);
      if (post) return post;
    }

    // 2. Bulunamadıysa: Diğer dillerde bu slug var mı kontrol et (çeviri eşleşmesi için)
    const otherLocales = ['tr', 'en', 'ro'].filter((l) => l !== locale);
    for (const altLocale of otherLocales) {
      const altRes = await strapiGet(
        `blog-posts?locale=${altLocale}&filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*&pagination[pageSize]=1`
      );
      if (altRes && Array.isArray(altRes.data) && altRes.data.length > 0) {
        const foundPost = normalizeBlogPost(altRes.data[0]);
        // İstenen locale için localizations'ta karşılığı var mı?
        const targetLoc = foundPost?.localizations?.find((l) => l.locale === locale);
        if (targetLoc?.slug) {
          const locRes = await strapiGet(
            `blog-posts?locale=${locale}&filters[slug][$eq]=${encodeURIComponent(targetLoc.slug)}&populate=*&pagination[pageSize]=1`
          );
          if (locRes && Array.isArray(locRes.data) && locRes.data.length > 0) {
            const locPost = normalizeBlogPost(locRes.data[0]);
            if (locPost) return locPost;
          }
        }
        // İstenen dilde çevirisi henüz girilmemiş olsa bile sayfada boş kalmaması için bulunan postu döndür
        return foundPost;
      }
    }

    // 3. Hiçbir dilde bulunamadıysa: TR fallback
    return withEmbed(findStaticPost(slug, locale));
  } catch (error) {
    console.error('[Strapi] getBlogPostBySlug error:', error?.message ?? error);
    return withEmbed(findStaticPost(slug, locale));
  }
}
