import { getSitemapEntries } from '../lib/seo/sitemapEntries';

// Saatte bir yenilenir (yeni blog yazısı / dosya eklenince kendiliğinden yansır).
export const revalidate = 3600;

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function renderUrl(e) {
  const lines = ['  <url>', `    <loc>${esc(e.url)}</loc>`];
  if (e.lastModified) lines.push(`    <lastmod>${new Date(e.lastModified).toISOString().slice(0, 10)}</lastmod>`);
  if (e.changeFrequency) lines.push(`    <changefreq>${e.changeFrequency}</changefreq>`);
  if (e.priority != null) lines.push(`    <priority>${e.priority.toFixed(2)}</priority>`);
  lines.push('  </url>');
  return lines.join('\n');
}

export async function GET() {
  const entries = await getSitemapEntries();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderUrl),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
