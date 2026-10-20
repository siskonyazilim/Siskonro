import https from 'https';
import http from 'http';
import { URL } from 'url';

const STRAPI_URL = process.env.STRAPI_API_URL || process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Node.js https.request tabanlı Strapi fetch utility.
 *
 * Neden https.request?
 *   Next.js / Node.js'in built-in `fetch` API'si bu Strapi sunucusuna
 *   bağlanırken TLS/socket hatası ("fetch failed") veriyor.
 *   https.request aynı sunucuya başarıyla bağlanıyor.
 *
 * @param {string} path  - Strapi API path, e.g. "header?locale=tr&populate=*"
 * @param {{ tags?: string[], revalidate?: number }} options
 * @returns {Promise<object|null>}
 */
export async function strapiGet(path, options = {}) {
  // scripts/sync-strapi.mjs: bir servis Strapi'ye gerçekten ulaşabildi mi? (yedek betiği için sayaç)
  const stats = globalThis.__STRAPI_SYNC_STATS;
  if (!stats) return strapiGetInner(path, options);

  // Yalnızca yedek betiğinde: istekleri aralıklı at, Cloudflare challenge/429/5xx/ağ hatasında bekleyip yeniden dene.
  const MAX_TRIES = 5;
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    await syncPace();
    try {
      const data = await strapiGetInner(path, options);
      stats.ok++;
      return data;
    } catch (error) {
      const st = error?.status;
      const retryable = !st || st === 403 || st === 429 || st >= 500;
      if (!retryable || attempt === MAX_TRIES) {
        stats.fail++;
        stats.lastError = error?.message ?? String(error);
        throw error;
      }
      await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
}

// Yedek betiği için basit hız sınırlayıcı (istekler arası ≥ 500 ms)
let syncLast = Promise.resolve();
function syncPace() {
  const turn = syncLast.then(() => new Promise((r) => setTimeout(r, 500)));
  syncLast = turn;
  return turn;
}

async function strapiGetInner(path, options = {}) {
  try {
    return await strapiRequest(path, options, true);
  } catch (error) {
    // Token geçersiz/iptal edilmişse Strapi, herkese açık içerikte bile 401/403 döner.
    // İçerik Public rolüyle okunabildiği için token'sız yeniden dene.
    if (STRAPI_API_TOKEN && error?.status && (error.status === 401 || error.status === 403)) {
      console.warn(
        `[Strapi] STRAPI_API_TOKEN reddedildi (${error.status}) — token'sız yeniden deneniyor. Token'ı yenileyin veya kaldırın: ${path}`
      );
      return strapiRequest(path, options, false);
    }
    throw error;
  }
}

async function strapiRequest(path, options, useToken) {
  if (!STRAPI_URL) return null;

  const fullUrl = new URL(`${STRAPI_URL}/api/${path}`);
  const transport = fullUrl.protocol === 'https:' ? https : http;

  const reqHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Cloudflare "Browser Integrity Check" User-Agent'sız istekleri engelleyebilir (özellikle veri merkezi IP'lerinde)
    'User-Agent': 'SiskonWeb/1.0 (+https://siskon.com.tr)',
  };
  if (useToken && STRAPI_API_TOKEN) {
    reqHeaders['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const reqOptions = {
    hostname: fullUrl.hostname,
    port:     fullUrl.port || (fullUrl.protocol === 'https:' ? 443 : 80),
    path:     fullUrl.pathname + fullUrl.search,
    method:   'GET',
    headers:  reqHeaders,
    // 30 saniye timeout
    timeout:  30_000,
  };

  return new Promise((resolve, reject) => {
    const req = transport.request(reqOptions, (res) => {
      // Redirect'leri takip et (301/302)
      if ((res.statusCode === 301 || res.statusCode === 302) && res.headers.location) {
        strapiRequest(res.headers.location.replace(`${STRAPI_URL}/api/`, ''), options, useToken)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (res.statusCode < 200 || res.statusCode >= 300) {
        // Hata sebebini (Cloudflare mı Strapi mi) görebilmek için cevabın başını oku
        let errBody = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => { if (errBody.length < 200) errBody += chunk; });
        res.on('end', () => {
          const hint = res.headers['cf-mitigated'] ? ` cf-mitigated=${res.headers['cf-mitigated']}` : '';
          const snippet = errBody.replace(/\s+/g, ' ').trim().slice(0, 120);
          const err = new Error(`Strapi fetch failed [${res.statusCode}]${hint}: ${fullUrl.href}${snippet ? ` — ${snippet}` : ''}`);
          err.status = res.statusCode;
          reject(err);
        });
        return;
      }

      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error(`Strapi JSON parse error: ${fullUrl.href}`));
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Strapi fetch timeout (30s): ${fullUrl.href}`));
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}
