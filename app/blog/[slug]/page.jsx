import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import AnimatedButton from '../../components/AnimatedButton';
import JsonLd from '../../components/JsonLd';
import { getBlogPostBySlugFromStrapi, formatBlogDate, parseDateToTime } from '../../../lib/strapi/services/blog';
import { detectLocale, toLocalizedPath } from '../../lib/i18n/routes';
import { getSiteUrlFromHeaders } from '../../lib/seo/routeMetadata';
import { absoluteUrl, buildBlogPostingGraph, toIsoDate } from '../../lib/seo/jsonld';
import trLocale from '../../../messages/blog/tr.json';
import enLocale from '../../../messages/blog/en.json';
import roLocale from '../../../messages/blog/ro.json';

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params?.slug;
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

  const post = await getBlogPostBySlugFromStrapi(slug, locale);
  if (!post) {
    const notFoundTitle = locale === 'en' ? 'Article Not Found' : locale === 'ro' ? 'Articol Negăsit' : 'Makale Bulunamadı';
    return { title: `${notFoundTitle} | Siskon`, robots: { index: false, follow: false } };
  }

  // Yazı istenen dilde yoksa başka dildeki kaydı döner; canonical gerçek dile işaret etsin
  // (aynı içerik farklı URL'lerde çoğalmasın).
  const postLocale = LOCALES.includes(post.locale) ? post.locale : locale;
  const canonicalPath = `${localePrefix(postLocale)}/blog/${post.slug || slug}`;

  const languages = { [postLocale]: canonicalPath };
  for (const loc of post.localizations ?? []) {
    if (loc?.slug && LOCALES.includes(loc.locale)) {
      languages[loc.locale] = `${localePrefix(loc.locale)}/blog/${loc.slug}`;
    }
  }
  languages['x-default'] = languages.tr ?? canonicalPath;

  const title = `${post.title} | Siskon`;
  const description = post.excerpt || undefined;
  const image = post.coverImage || '/og/siskon-default.webp';
  const isoDate = toIsoDate(parseDateToTime(post.date), post.date);

  return {
    title,
    description,
    alternates: { canonical: canonicalPath, languages },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonicalPath,
      siteName: 'Siskon',
      locale: postLocale === 'en' ? 'en_US' : postLocale === 'ro' ? 'ro_RO' : 'tr_TR',
      images: [{ url: image, alt: post.title }],
      ...(isoDate ? { publishedTime: isoDate } : {}),
      ...(post.category ? { section: post.category } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

const LOCALES = ['tr', 'en', 'ro'];
const localePrefix = (l) => (l === 'tr' ? '' : `/${l}`);

// Strapi içeriği güvenilmez kabul edilir: HTML kaçırılmadan innerHTML'e basılırsa
// <img onerror=...> veya href="..." kırılması ile XSS mümkün olur.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatLine(rawText, strongClassName) {
  const text = escapeHtml(rawText);

  // 1. **bold** → <strong>
  let out = text.replace(/\*\*(.*?)\*\*/g, `<strong class="${strongClassName}">$1</strong>`);

  // 2. [metin](url) → <a>
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_, label, url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-sky-300 underline underline-offset-2 hover:text-sky-100 transition-colors">${label}</a>`
  );

  // 3. Düz URL (markdown ile sarılmamış) → <a>
  out = out.replace(
    /(?<![("'>])(https?:\/\/[^\s<>"']+)/g,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-sky-300 underline underline-offset-2 hover:text-sky-100 transition-colors break-all">${url}</a>`
  );

  // 4. E-posta adresi (ör. arge@siskon.com.tr) → mailto: link
  out = out.replace(
    /(?<![\w@.>"'=:/%+-])([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+)/g,
    (email) =>
      `<a href="mailto:${email}" class="text-sky-300 underline underline-offset-2 hover:text-sky-100 transition-colors">${email}</a>`
  );

  return out;
}

function collectPrefixedLines(lines, startIndex, prefix) {
  const items = [];
  let i = startIndex;

  while (i < lines.length && lines[i].trim().startsWith(prefix)) {
    const raw = lines[i].trim().slice(prefix.length);
    items.push({
      id: `${startIndex}-${i}-${raw}`,
      text: raw,
      order: items.length + 1,
    });
    i++;
  }

  return { items, nextIndex: i };
}

function collectNumberedLines(lines, startIndex) {
  const items = [];
  let i = startIndex;

  while (i < lines.length && /^\d+\./.test(lines[i].trim())) {
    const raw = lines[i].trim().replace(/^\d+\.\s*/, '');
    items.push({
      id: `${startIndex}-${i}-${raw}`,
      text: raw,
      order: items.length + 1,
    });
    i++;
  }

  return { items, nextIndex: i };
}

function renderContent(content) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line) {
      i++;
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-archivo text-2xl md:text-3xl font-black text-white mt-10 mb-4 leading-tight">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="font-archivo text-xl font-bold text-sky-300 mt-7 mb-3 leading-tight">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('- ')) {
      const { items, nextIndex } = collectPrefixedLines(lines, i, '- ');
      elements.push(
        <ul key={`ul-${i}`} className="list-none space-y-2.5 my-6 ml-0">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 text-slate-200 leading-relaxed text-base md:text-lg">
              <span className="mt-2.5 w-2 h-2 rounded-full bg-sky-400 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: formatLine(item.text, 'font-bold text-white') }} />
            </li>
          ))}
        </ul>
      );
      i = nextIndex;
      continue;
    }

    if (/^\d+\./.test(line)) {
      const { items, nextIndex } = collectNumberedLines(lines, i);
      elements.push(
        <ol key={`ol-${i}`} className="list-none space-y-3 my-6 ml-0">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 text-slate-200 leading-relaxed text-base md:text-lg">
              <span className="shrink-0 w-7 h-7 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/30 font-black text-sm flex items-center justify-center">
                {item.order}
              </span>
              <span
                className="mt-0.5"
                dangerouslySetInnerHTML={{ __html: formatLine(item.text, 'text-white font-bold') }}
              />
            </li>
          ))}
        </ol>
      );
      i = Math.max(nextIndex, i);
      continue;
    }

    elements.push(
      <p
        key={i}
        className="text-slate-200 leading-[1.85] text-base md:text-lg mb-6"
        dangerouslySetInnerHTML={{
          __html: formatLine(line, 'text-white font-bold'),
        }}
      />
    );
    i++;
  }

  return elements;
}

export default async function BlogPostPage(props) {
  const params = await props.params;
  const slug = params?.slug;
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
  const localizePath = (path) => toLocalizedPath(path, locale);

  // Strapi'den çek — bulamazsa blogContent.js'e düşer (servis içinde halledilir)
  const post = await getBlogPostBySlugFromStrapi(slug, locale);
  const formattedDate = formatBlogDate(post?.date, locale);

  // Yazı bulunamazsa gerçek 404 dön (aksi halde "soft 404": HTTP 200 + hata metni arama motorlarında zararlıdır).
  if (!post) {
    notFound();
  }

  // Yapılandırılmış veri: BlogPosting + BreadcrumbList
  const siteUrl = getSiteUrlFromHeaders(requestHeaders);
  const postLocale = ['tr', 'en', 'ro'].includes(post.locale) ? post.locale : locale;
  const postUrl = new URL(`${postLocale === 'tr' ? '' : `/${postLocale}`}/blog/${post.slug || slug}`, siteUrl).toString();
  const structuredData = buildBlogPostingGraph({
    post,
    locale: postLocale,
    siteUrl,
    postUrl,
    blogUrl: absoluteUrl('/blog', postLocale, siteUrl),
    isoDate: toIsoDate(parseDateToTime(post.date), post.date),
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#082a53] text-white pt-28 md:pt-36 pb-20 px-6 sm:px-10">
      <JsonLd data={structuredData} />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0284c7_0%,#0b3a66_61.8%,#082a53_100%)]" />
      <div className="absolute top-[-16%] left-[-12%] w-[72%] h-[72%] md:w-[46%] md:h-[46%] bg-sky-500/12 md:bg-sky-500/16 rounded-full blur-[56px] md:blur-[84px]" />
      <div className="absolute bottom-[-16%] right-[-12%] w-[64%] h-[64%] md:w-[36%] md:h-[36%] bg-blue-600/6 md:bg-blue-600/8 rounded-full blur-[56px] md:blur-[80px]" />

      <div className="container-wide mx-auto relative z-10">

        {/* Üst Kısım: Solda Başlık & Tarih & Kategori, Sağda Medya (Kapak / Video) */}
        <div
          className={`grid grid-cols-1 ${
            post.youtubeEmbed || post.coverImage
              ? 'lg:grid-cols-[1.35fr_1.15fr] gap-8 lg:gap-14 items-center'
              : 'max-w-4xl mx-auto text-left'
          } mb-16 md:mb-24`}
        >
          {/* Sol Kolon: Başlık, Tarih & Kategori */}
          <div className="flex min-h-full flex-col justify-center">
            <div className="mb-4 space-y-1">
              {formattedDate ? (
                <p className="text-xs md:text-sm font-semibold tracking-wide text-slate-200/90 uppercase">
                  {formattedDate}
                </p>
              ) : null}
              <p className="text-xs md:text-sm font-semibold tracking-wide text-sky-300 uppercase">
                {post.category || pt('defaultCategory')}
              </p>
            </div>

            <h1 className="font-archivo text-[1.75rem] sm:text-[2.05rem] md:text-[2.35rem] lg:text-[2.55rem] font-black text-white leading-[1.16] tracking-tight mb-0">
              {post.title}
            </h1>
          </div>

          {/* Sağ Kolon: YouTube Embed veya Kapak Görseli */}
          {post.youtubeEmbed || post.coverImage ? (
            <div>
              {post.youtubeEmbed ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black">
                  <iframe
                    src={`${post.youtubeEmbed}?rel=0&modestbranding=1`}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              ) : post.coverImage ? (
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={960}
                    height={640}
                    className="w-full h-auto"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Makale Gövde Metinleri */}
        <article className="max-w-4xl mx-auto">
          <div className="prose-blog text-slate-200 font-medium">
            {renderContent(post.content)}
          </div>

          {/* Alt Buton: Tüm Haber/Blog */}
          <div className="mt-14 md:mt-20 text-center">
            <AnimatedButton
              href={localizePath('/blog')}
              className="!bg-sky-500 !text-slate-950 font-extrabold rounded-xl px-8 py-3.5 text-sm md:text-base shadow-[0_10px_30px_rgba(8,214,255,0.25)]"
            >
              {pt('allNews')}
            </AnimatedButton>
          </div>
        </article>

      </div>
    </div>
  );
}