import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { getClientIp, isRateLimited, safeEqual } from '@/lib/security/http';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

// ─── GitHub Action tetikleme (Strapi içerik yedeği) ─────────────────────────
// Strapi içerik değişince bu endpoint çağrılır; ayrıca .github/workflows/strapi-sync.yml
// çalıştırılır (metin/görselleri messages/ ve public/assets/strapi/ altına yedekler).
// Tanımlı değilse hiçbir şey yapılmaz.
//   GITHUB_DISPATCH_TOKEN : repo için "Contents: Read and write" izinli fine-grained token
//   GITHUB_REPO           : örn. siskonyazilim/SiskonWeb
const GITHUB_DISPATCH_TOKEN = process.env.GITHUB_DISPATCH_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const DISPATCH_DELAY_MS = 45_000;

// Bir kayıtta Strapi birden çok olay (update/publish) ve 2 webhook gönderebilir:
// ilk çağrıdan 45 sn sonra TEK tetikleme yap. Action Strapi'den son hali çektiği için
// bu sürede gelen tüm değişiklikler kapsanır.
let dispatchTimer = null;

function scheduleGithubSync() {
  if (!GITHUB_DISPATCH_TOKEN || !GITHUB_REPO || dispatchTimer) return;
  dispatchTimer = setTimeout(async () => {
    dispatchTimer = null;
    try {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/dispatches`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_DISPATCH_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'siskon-web-revalidate',
        },
        body: JSON.stringify({ event_type: 'strapi-update' }),
      });
      console.log(`[Revalidate] GitHub strapi-sync tetiklendi → ${res.status}`);
    } catch (err) {
      console.error('[Revalidate] GitHub tetikleme hatası:', err?.message ?? err);
    }
  }, DISPATCH_DELAY_MS);
}

/**
 * Strapi bu endpoint'i webhook ile çağırır.
 *
 * Sır tercihen header ile gönderilir:   x-revalidate-secret: TOKEN   (veya Authorization: Bearer TOKEN)
 * Geriye dönük uyumluluk için ?secret=TOKEN da kabul edilir, ancak URL'ler erişim
 * loglarına/proxy loglarına düştüğü için Strapi webhook'unu header'a taşıyın.
 *
 * Örnek: POST /api/revalidate
 * Body: { "model": "home-page" }
 */
export async function POST(request) {
  // Sır tanımlı değilse endpoint tamamen kapalı (boş sırla eşleşme olmasın)
  if (!REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Revalidation is not configured' }, { status: 503 });
  }

  if (isRateLimited(`revalidate:${getClientIp(request)}`, { max: 30, windowMs: 60_000 })) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  const provided =
    request.headers.get('x-revalidate-secret')
    ?? bearer
    ?? searchParams.get('secret');

  if (!provided || !safeEqual(provided, REVALIDATE_SECRET)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const model = body?.model ?? body?.uid ?? '';

    scheduleGithubSync();

    // Content type → tag + path eşlemesi
    const tagMap = {
      'home-page': { tag: 'home-page', path: '/' },
      'api::home-page.home-page': { tag: 'home-page', path: '/' },
      'header': { tag: 'header', path: null },
      'footer': { tag: 'footer', path: null },
      'hizmet-sayfasi': { tag: 'hizmetler', path: '/hizmetler' },
      'api::hizmet-sayfasi.hizmet-sayfasi': { tag: 'hizmetler', path: '/hizmetler' },
      'on-suite': { tag: 'onsuite', path: '/onsuite' },
      'api::on-suite.on-suite': { tag: 'onsuite', path: '/onsuite' },
      'arge': { tag: 'arge', path: '/arge' },
      'referans': { tag: 'referanslar', path: '/referanslar' },
      'reference': { tag: 'referanslar', path: '/referanslar' },
      'api::reference.reference': { tag: 'referanslar', path: '/referanslar' },
      'blog': { tag: 'blog', path: '/blog' },
      'api::blog.blog': { tag: 'blog', path: '/blog' },
    };

    const matched = tagMap[model];

    if (matched) {
      // Tag-based revalidation (hassas, sadece ilgili sayfayı temizler)
      revalidateTag(matched.tag);
      if (matched.path) {
        revalidatePath(matched.path, 'page');
      }
      console.log(`[Revalidate] tag="${matched.tag}" path="${matched.path ?? '-'}" model="${String(model).slice(0, 80)}"`);
      return NextResponse.json({
        revalidated: true,
        model,
        tag: matched.tag,
        path: matched.path ?? 'tag-only',
      });
    }

    // Bilinmeyen model — tüm sayfaları yenile (geniş kapsamlı, son çare)
    revalidatePath('/', 'layout');
    console.log(`[Revalidate] Bilinmeyen model="${String(model).slice(0, 80)}", tüm layout yenilendi.`);
    return NextResponse.json({ revalidated: true, path: 'all', model });
  } catch (err) {
    console.error('[Revalidate] Error:', err?.message ?? err);
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 });
  }
}
