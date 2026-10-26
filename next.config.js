/** @type {import('next').NextConfig} */
const IS_DEV = process.env.NODE_ENV !== 'production';

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline' ${IS_DEV ? "'unsafe-eval'" : ''} https://www.google.com https://www.gstatic.com https://cdn.cerezgo.com https://static.cloudflareinsights.com`,
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  `connect-src 'self' https: https://cdn.cerezgo.com ${IS_DEV ? 'ws: wss:' : ''}`,
  "frame-src 'self' https://maps.google.com https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  'upgrade-insecure-requests',
].filter(Boolean).join('; ');

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

if (process.env.NODE_ENV === 'production') {
  SECURITY_HEADERS.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  });
}

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: SECURITY_HEADERS,
      },
    ];
  },
  async redirects() {
    return [
      // Legacy /ro/... URLs -> clean RO URLs (no prefix)
      { source: '/ro', destination: '/', permanent: true },
      { source: '/ro/search', destination: '/search', permanent: true },
      { source: '/ro/blog', destination: '/blog', permanent: true },
      { source: '/ro/blog/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/ro/servicii', destination: '/servicii', permanent: true },
      { source: '/ro/servicii/software-personalizat', destination: '/servicii/software-personalizat', permanent: true },
      { source: '/ro/servicii/iiot', destination: '/servicii/iiot', permanent: true },
      { source: '/ro/servicii/trasabilitate', destination: '/servicii/trasabilitate', permanent: true },
      { source: '/ro/servicii/automatizare-masini-si-procese', destination: '/servicii/automatizare-masini-si-procese', permanent: true },
      { source: '/ro/servicii/solutii-robotice', destination: '/servicii/solutii-robotice', permanent: true },
      { source: '/ro/servicii/viziune-artificiala', destination: '/servicii/viziune-artificiala', permanent: true },
      { source: '/ro/servicii/ai-machine-learning', destination: '/servicii/ai-machine-learning', permanent: true },
      { source: '/ro/servicii/solutii-microsoft', destination: '/servicii/solutii-microsoft', permanent: true },
      { source: '/ro/servicii/velotic', destination: '/servicii/velotic', permanent: true },
      { source: '/ro/servicii/instruire-si-consultanta', destination: '/servicii/instruire-si-consultanta', permanent: true },
      { source: '/ro/c-si-d', destination: '/c-si-d', permanent: true },
      { source: '/ro/industrii', destination: '/industrii', permanent: true },
      { source: '/ro/industrii/tutun', destination: '/industrii/tutun', permanent: true },
      { source: '/ro/industrii/auto', destination: '/industrii/auto', permanent: true },
      { source: '/ro/industrii/electrocasnice', destination: '/industrii/electrocasnice', permanent: true },
      { source: '/ro/industrii/alimente-si-bauturi', destination: '/industrii/alimente-si-bauturi', permanent: true },
      { source: '/ro/industrii/farmaceutice', destination: '/industrii/farmaceutice', permanent: true },
      { source: '/ro/industrii/masini-si-automatizare', destination: '/industrii/masini-si-automatizare', permanent: true },
      { source: '/ro/industrii/textile', destination: '/industrii/textile', permanent: true },
      { source: '/ro/industrii/energie-si-chimie', destination: '/industrii/energie-si-chimie', permanent: true },
      { source: '/ro/parteneriate', destination: '/parteneriate', permanent: true },
      { source: '/ro/referinte', destination: '/referinte', permanent: true },
      { source: '/ro/compania', destination: '/compania', permanent: true },
      { source: '/ro/compania/cariere', destination: '/compania/cariere', permanent: true },
      { source: '/ro/compania/sustenabilitate', destination: '/compania/sustenabilitate', permanent: true },
      { source: '/ro/contact', destination: '/contact', permanent: true },
      { source: '/ro/legal/gdpr', destination: '/legal/gdpr', permanent: true },
      { source: '/ro/legal/politica-de-confidentialitate', destination: '/legal/politica-de-confidentialitate', permanent: true },
      { source: '/ro/legal/politica-de-cookie-uri', destination: '/legal/politica-de-cookie-uri', permanent: true },
      // GE Vernova page removed: all legacy URLs permanently move to Velotic
      { source: '/servicii/ge-vernova', destination: '/servicii/velotic', permanent: true },
      { source: '/en/services/ge-vernova', destination: '/en/services/velotic', permanent: true },
      { source: '/hizmetler/ge-vernova', destination: '/tr/hizmetler/velotic', permanent: true },
      // Bare Turkish paths (no prefix) -> /tr/...
      { source: '/hizmetler', destination: '/tr/hizmetler', permanent: true },
      { source: '/hizmetler/:slug', destination: '/tr/hizmetler/:slug', permanent: true },
      { source: '/arge', destination: '/tr/arge', permanent: true },
      { source: '/sektorler', destination: '/tr/sektorler', permanent: true },
      { source: '/sektorler/:slug', destination: '/tr/sektorler/:slug', permanent: true },
      { source: '/is-birlikleri', destination: '/tr/is-birlikleri', permanent: true },
      { source: '/referanslar', destination: '/tr/referanslar', permanent: true },
      { source: '/kurumsal', destination: '/tr/kurumsal/bizi-taniyin', permanent: true },
      { source: '/kurumsal/:slug', destination: '/tr/kurumsal/:slug', permanent: true },
      { source: '/iletisim', destination: '/tr/iletisim', permanent: true },
      { source: '/yasal/:slug', destination: '/tr/yasal/:slug', permanent: true },
      {
        source: '/downloads/Siskon%202.1%20OnSuite.pdf',
        destination: '/downloads/siskon-brosur.pdf',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // afterFiles: EN/RO/TR URLs -> internal (Turkish-slug) routes, locale passed via _locale
      afterFiles: [
        // EN routes — /en prefix
        { source: '/en', destination: '/?_locale=en' },
        { source: '/en/search', destination: '/search?_locale=en' },
        { source: '/en/blog/:slug', destination: '/blog/:slug?_locale=en' },
        { source: '/en/services', destination: '/hizmetler?_locale=en' },
        { source: '/en/services/custom-software', destination: '/hizmetler/musteriye-ozel-yazilim?_locale=en' },
        { source: '/en/services/iiot', destination: '/hizmetler/iiot?_locale=en' },
        { source: '/en/services/traceability', destination: '/hizmetler/izlenebilirlik-cozumleri?_locale=en' },
        { source: '/en/services/machine-process-automation', destination: '/hizmetler/makine-proses-otomasyonu?_locale=en' },
        { source: '/en/services/robotics', destination: '/hizmetler/robot-cozumleri?_locale=en' },
        { source: '/en/services/computer-vision', destination: '/hizmetler/goruntu-isleme?_locale=en' },
        { source: '/en/services/ai-machine-learning', destination: '/hizmetler/ai-makine-ogrenmesi?_locale=en' },
        { source: '/en/services/microsoft-solutions', destination: '/hizmetler/microsoft-cozumleri?_locale=en' },
        { source: '/en/services/velotic', destination: '/hizmetler/velotic?_locale=en' },
        { source: '/en/services/training-consulting', destination: '/hizmetler/egitim-danismanlik?_locale=en' },
        { source: '/en/onsuite', destination: '/onsuite?_locale=en' },
        { source: '/en/r-and-d', destination: '/arge?_locale=en' },
        { source: '/en/industries', destination: '/sektorler?_locale=en' },
        { source: '/en/industries/tobacco', destination: '/sektorler/tutun?_locale=en' },
        { source: '/en/industries/automotive', destination: '/sektorler/otomotiv?_locale=en' },
        { source: '/en/industries/white-goods', destination: '/sektorler/beyaz-esya?_locale=en' },
        { source: '/en/industries/food-beverage', destination: '/sektorler/gida-icecek?_locale=en' },
        { source: '/en/industries/pharmaceutical', destination: '/sektorler/ilac?_locale=en' },
        { source: '/en/industries/machinery-automation', destination: '/sektorler/makine-otomasyon?_locale=en' },
        { source: '/en/industries/textile', destination: '/sektorler/tekstil?_locale=en' },
        { source: '/en/industries/energy-chemicals', destination: '/sektorler/enerji-kimya?_locale=en' },
        { source: '/en/sektorler', destination: '/sektorler?_locale=en' },
        { source: '/en/sektorler/tutun', destination: '/sektorler/tutun?_locale=en' },
        { source: '/en/sektorler/otomotiv', destination: '/sektorler/otomotiv?_locale=en' },
        { source: '/en/sektorler/beyaz-esya', destination: '/sektorler/beyaz-esya?_locale=en' },
        { source: '/en/sektorler/gida-icecek', destination: '/sektorler/gida-icecek?_locale=en' },
        { source: '/en/sektorler/ilac', destination: '/sektorler/ilac?_locale=en' },
        { source: '/en/sektorler/makine-otomasyon', destination: '/sektorler/makine-otomasyon?_locale=en' },
        { source: '/en/sektorler/tekstil', destination: '/sektorler/tekstil?_locale=en' },
        { source: '/en/sektorler/enerji-kimya', destination: '/sektorler/enerji-kimya?_locale=en' },
        { source: '/en/partnerships', destination: '/is-birlikleri?_locale=en' },
        { source: '/en/references', destination: '/referanslar?_locale=en' },
        { source: '/en/about', destination: '/kurumsal/bizi-taniyin?_locale=en' },
        { source: '/en/about/careers', destination: '/kurumsal/kariyer?_locale=en' },
        { source: '/en/about/sustainability', destination: '/kurumsal/surdurulebilirlik?_locale=en' },
        { source: '/en/blog', destination: '/blog?_locale=en' },
        { source: '/en/contact', destination: '/iletisim?_locale=en' },
        { source: '/en/legal/kvkk', destination: '/yasal/kvkk?_locale=en' },
        { source: '/en/legal/privacy-policy', destination: '/yasal/gizlilik-politikasi?_locale=en' },
        { source: '/en/legal/cookie-policy', destination: '/yasal/cerez-politikasi?_locale=en' },
        // RO routes — Romanian is the default locale, NO prefix
        { source: '/servicii', destination: '/hizmetler?_locale=ro' },
        { source: '/servicii/software-personalizat', destination: '/hizmetler/musteriye-ozel-yazilim?_locale=ro' },
        { source: '/servicii/iiot', destination: '/hizmetler/iiot?_locale=ro' },
        { source: '/servicii/trasabilitate', destination: '/hizmetler/izlenebilirlik-cozumleri?_locale=ro' },
        { source: '/servicii/automatizare-masini-si-procese', destination: '/hizmetler/makine-proses-otomasyonu?_locale=ro' },
        { source: '/servicii/solutii-robotice', destination: '/hizmetler/robot-cozumleri?_locale=ro' },
        { source: '/servicii/viziune-artificiala', destination: '/hizmetler/goruntu-isleme?_locale=ro' },
        { source: '/servicii/ai-machine-learning', destination: '/hizmetler/ai-makine-ogrenmesi?_locale=ro' },
        { source: '/servicii/solutii-microsoft', destination: '/hizmetler/microsoft-cozumleri?_locale=ro' },
        { source: '/servicii/velotic', destination: '/hizmetler/velotic?_locale=ro' },
        { source: '/servicii/instruire-si-consultanta', destination: '/hizmetler/egitim-danismanlik?_locale=ro' },
        { source: '/c-si-d', destination: '/arge?_locale=ro' },
        { source: '/industrii', destination: '/sektorler?_locale=ro' },
        { source: '/industrii/tutun', destination: '/sektorler/tutun?_locale=ro' },
        { source: '/industrii/auto', destination: '/sektorler/otomotiv?_locale=ro' },
        { source: '/industrii/electrocasnice', destination: '/sektorler/beyaz-esya?_locale=ro' },
        { source: '/industrii/alimente-si-bauturi', destination: '/sektorler/gida-icecek?_locale=ro' },
        { source: '/industrii/farmaceutice', destination: '/sektorler/ilac?_locale=ro' },
        { source: '/industrii/masini-si-automatizare', destination: '/sektorler/makine-otomasyon?_locale=ro' },
        { source: '/industrii/textile', destination: '/sektorler/tekstil?_locale=ro' },
        { source: '/industrii/energie-si-chimie', destination: '/sektorler/enerji-kimya?_locale=ro' },
        { source: '/parteneriate', destination: '/is-birlikleri?_locale=ro' },
        { source: '/referinte', destination: '/referanslar?_locale=ro' },
        { source: '/compania', destination: '/kurumsal/bizi-taniyin?_locale=ro' },
        { source: '/compania/cariere', destination: '/kurumsal/kariyer?_locale=ro' },
        { source: '/compania/sustenabilitate', destination: '/kurumsal/surdurulebilirlik?_locale=ro' },
        { source: '/contact', destination: '/iletisim?_locale=ro' },
        { source: '/legal/gdpr', destination: '/yasal/kvkk?_locale=ro' },
        { source: '/legal/politica-de-confidentialitate', destination: '/yasal/gizlilik-politikasi?_locale=ro' },
        { source: '/legal/politica-de-cookie-uri', destination: '/yasal/cerez-politikasi?_locale=ro' },
        // TR routes — /tr prefix
        { source: '/tr', destination: '/?_locale=tr' },
        { source: '/tr/kurumsal', destination: '/kurumsal/bizi-taniyin?_locale=tr' },
        { source: '/tr/:path*', destination: '/:path*?_locale=tr' },
      ],
      fallback: [],
    };
  },

  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    qualities: [60, 75, 85, 90, 95],
    remotePatterns: [
      {
        // Strapi CMS — production
        protocol: 'https',
        hostname: 'siskonwebdb.domainmanager.com.tr',
        pathname: '/**',
      },
      {
        // Strapi CMS — local dev
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
