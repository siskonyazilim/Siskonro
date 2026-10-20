const EN_TO_TR_ROUTES = {
  '/': '/',
  '/services': '/hizmetler',
  '/services/custom-software': '/hizmetler/musteriye-ozel-yazilim',
  '/services/iiot': '/hizmetler/iiot',
  '/services/traceability': '/hizmetler/izlenebilirlik-cozumleri',
  '/services/machine-process-automation': '/hizmetler/makine-proses-otomasyonu',
  '/services/robotics': '/hizmetler/robot-cozumleri',
  '/services/computer-vision': '/hizmetler/goruntu-isleme',
  '/services/ai-machine-learning': '/hizmetler/ai-makine-ogrenmesi',
  '/services/microsoft-solutions': '/hizmetler/microsoft-cozumleri',
  '/services/velotic': '/hizmetler/velotic',
  '/services/training-consulting': '/hizmetler/egitim-danismanlik',
  '/onsuite': '/onsuite',
  '/r-and-d': '/arge',
  '/industries': '/sektorler',
  '/industries/tobacco': '/sektorler/tutun',
  '/industries/automotive': '/sektorler/otomotiv',
  '/industries/white-goods': '/sektorler/beyaz-esya',
  '/industries/food-beverage': '/sektorler/gida-icecek',
  '/industries/pharmaceutical': '/sektorler/ilac',
  '/industries/machinery-automation': '/sektorler/makine-otomasyon',
  '/industries/textile': '/sektorler/tekstil',
  '/industries/energy-chemicals': '/sektorler/enerji-kimya',
  // Backward-compatible aliases: keep Turkish sector slugs reachable under /en as before.
  '/sektorler': '/sektorler',
  '/sektorler/tutun': '/sektorler/tutun',
  '/sektorler/otomotiv': '/sektorler/otomotiv',
  '/sektorler/beyaz-esya': '/sektorler/beyaz-esya',
  '/sektorler/gida-icecek': '/sektorler/gida-icecek',
  '/sektorler/ilac': '/sektorler/ilac',
  '/sektorler/makine-otomasyon': '/sektorler/makine-otomasyon',
  '/sektorler/tekstil': '/sektorler/tekstil',
  '/sektorler/enerji-kimya': '/sektorler/enerji-kimya',
  '/partnerships': '/is-birlikleri',
  '/references': '/referanslar',
  '/about': '/kurumsal/bizi-taniyin',
  '/about/careers': '/kurumsal/kariyer',
  '/about/sustainability': '/kurumsal/surdurulebilirlik',
  '/about/milestones': '/kurumsal/kilometre-taslari',
  '/blog': '/blog',
  '/contact': '/iletisim',
  '/legal/kvkk': '/yasal/kvkk',
  '/legal/privacy-policy': '/yasal/gizlilik-politikasi',
  '/legal/cookie-policy': '/yasal/cerez-politikasi',
};

const TR_TO_EN_ROUTES = Object.entries(EN_TO_TR_ROUTES).reduce((acc, [enPath, trPath]) => {
  acc[trPath] = enPath;
  return acc;
}, {});

const RO_TO_TR_ROUTES = {
  '/': '/',
  '/servicii': '/hizmetler',
  '/servicii/software-personalizat': '/hizmetler/musteriye-ozel-yazilim',
  '/servicii/iiot': '/hizmetler/iiot',
  '/servicii/trasabilitate': '/hizmetler/izlenebilirlik-cozumleri',
  '/servicii/automatizare-masini-si-procese': '/hizmetler/makine-proses-otomasyonu',
  '/servicii/solutii-robotice': '/hizmetler/robot-cozumleri',
  '/servicii/viziune-artificiala': '/hizmetler/goruntu-isleme',
  '/servicii/ai-machine-learning': '/hizmetler/ai-makine-ogrenmesi',
  '/servicii/solutii-microsoft': '/hizmetler/microsoft-cozumleri',
  '/servicii/velotic': '/hizmetler/velotic',
  '/servicii/instruire-si-consultanta': '/hizmetler/egitim-danismanlik',
  '/onsuite': '/onsuite',
  '/c-si-d': '/arge',
  '/industrii': '/sektorler',
  '/industrii/tutun': '/sektorler/tutun',
  '/industrii/auto': '/sektorler/otomotiv',
  '/industrii/electrocasnice': '/sektorler/beyaz-esya',
  '/industrii/alimente-si-bauturi': '/sektorler/gida-icecek',
  '/industrii/farmaceutice': '/sektorler/ilac',
  '/industrii/masini-si-automatizare': '/sektorler/makine-otomasyon',
  '/industrii/textile': '/sektorler/tekstil',
  '/industrii/energie-si-chimie': '/sektorler/enerji-kimya',
  // Backward-compatible aliases: keep Turkish sector slugs reachable under /ro as before.
  '/sektorler': '/sektorler',
  '/sektorler/tutun': '/sektorler/tutun',
  '/sektorler/otomotiv': '/sektorler/otomotiv',
  '/sektorler/beyaz-esya': '/sektorler/beyaz-esya',
  '/sektorler/gida-icecek': '/sektorler/gida-icecek',
  '/sektorler/ilac': '/sektorler/ilac',
  '/sektorler/makine-otomasyon': '/sektorler/makine-otomasyon',
  '/sektorler/tekstil': '/sektorler/tekstil',
  '/sektorler/enerji-kimya': '/sektorler/enerji-kimya',
  '/parteneriate': '/is-birlikleri',
  '/referinte': '/referanslar',
  '/compania': '/kurumsal/bizi-taniyin',
  '/compania/cariere': '/kurumsal/kariyer',
  '/compania/sustenabilitate': '/kurumsal/surdurulebilirlik',
  '/compania/etape': '/kurumsal/kilometre-taslari',
  '/blog': '/blog',
  '/contact': '/iletisim',
  '/legal/gdpr': '/yasal/kvkk',
  '/legal/politica-de-confidentialitate': '/yasal/gizlilik-politikasi',
  '/legal/politica-de-cookie-uri': '/yasal/cerez-politikasi',
};

const TR_TO_RO_ROUTES = Object.entries(RO_TO_TR_ROUTES).reduce((acc, [roPath, trPath]) => {
  acc[trPath] = roPath;
  return acc;
}, {});

function normalizePath(pathname) {
  if (!pathname) return '/';
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function detectLocale(pathname) {
  const normalized = normalizePath(pathname);
  if (normalized === '/en' || normalized.startsWith('/en/')) return 'en';
  if (normalized === '/tr' || normalized.startsWith('/tr/')) return 'tr';
  // Romanian is the default locale — no URL prefix needed.
  return 'ro';
}

export function stripLocalePrefix(pathname) {
  const normalized = normalizePath(pathname);
  if (normalized === '/en') return '/';
  if (normalized.startsWith('/en/')) return normalized.slice(3) || '/';
  if (normalized === '/tr') return '/';
  if (normalized.startsWith('/tr/')) return normalized.slice(3) || '/';
  if (normalized === '/ro') return '/';
  if (normalized.startsWith('/ro/')) return normalized.slice(3) || '/';
  return normalized;
}

export function toInternalPath(pathname, locale = detectLocale(pathname)) {
  const withoutLocale = stripLocalePrefix(pathname);
  if (locale === 'en') {
    return EN_TO_TR_ROUTES[withoutLocale] || withoutLocale;
  }
  if (locale === 'ro') {
    return RO_TO_TR_ROUTES[withoutLocale] || withoutLocale;
  }
  return withoutLocale;
}

export function toLocalizedPath(pathname, locale = 'ro') {
  const internalPath = toInternalPath(pathname, detectLocale(pathname));
  const normalizedInternal = normalizePath(internalPath);

  if (locale === 'en') {
    const englishPath = TR_TO_EN_ROUTES[normalizedInternal] || normalizedInternal;
    return englishPath === '/' ? '/en' : `/en${englishPath}`;
  }

  if (locale === 'ro') {
    const romanianPath = TR_TO_RO_ROUTES[normalizedInternal] || normalizedInternal;
    // Romanian is the default locale — no /ro prefix, just the slug.
    return romanianPath === '/' ? '/' : romanianPath;
  }

  // Turkish — use /tr prefix for clean locale URLs
  return normalizedInternal === '/' ? '/tr' : `/tr${normalizedInternal}`;
}