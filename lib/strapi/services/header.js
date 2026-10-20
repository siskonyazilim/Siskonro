import { strapiGet } from '../client.js';
import { extractMediaUrl } from '../mediaUrl.js';
import headerTr from '../../../messages/components/header/tr.json';
import headerEn from '../../../messages/components/header/en.json';
import headerRo from '../../../messages/components/header/ro.json';
import navTr from '../../../messages/nav/tr.json';
import navEn from '../../../messages/nav/en.json';
import navRo from '../../../messages/nav/ro.json';

const HEADER_FALLBACKS = { tr: headerTr, en: headerEn, ro: headerRo };
const NAV_FALLBACKS = { tr: navTr, en: navEn, ro: navRo };

const DEFAULT_HEADER_LOGOS = {
  logo: '/assets/new/common/siskon-logo.svg',
  logoScrolled: '/assets/new/common/siskon-logo-header.svg',
};

const DEFAULT_MENU_ICONS = {
  customSoftware: '/SiteIcon/MegaMenu/Moy.svg',
  customSoftwareWhite: '/SiteIcon/MegaMenu/white/MoyWhite.svg',
  iiot: '/SiteIcon/MegaMenu/Iot.svg',
  iiotWhite: '/SiteIcon/MegaMenu/white/IotWhite.svg',
  traceability: '/SiteIcon/MegaMenu/Izlenebilirlik.svg',
  traceabilityWhite: '/SiteIcon/MegaMenu/white/IzlenebilirlikWhite.svg',
  automation: '/SiteIcon/MegaMenu/MakineProses.svg',
  automationWhite: '/SiteIcon/MegaMenu/white/MakineProsesWhite.svg',
  robotics: '/SiteIcon/MegaMenu/Robot.svg',
  roboticsWhite: '/SiteIcon/MegaMenu/white/RobotWhite.svg',
  vision: '/SiteIcon/MegaMenu/GoruntuIsleme.svg',
  visionWhite: '/SiteIcon/MegaMenu/white/GoruntuIslemeWhite.svg',
  ai: '/SiteIcon/MegaMenu/AiMakine.svg',
  aiWhite: '/SiteIcon/MegaMenu/white/AiMakineWhite.svg',
  microsoft: '/SiteIcon/MegaMenu/Microsoft.svg',
  microsoftWhite: '/SiteIcon/MegaMenu/white/MicrosoftWhite.svg',
  velotic: '/SiteIcon/MegaMenu/Velotic.svg',
  veloticWhite: '/SiteIcon/MegaMenu/white/VeloticWhite.svg',
  training: '/SiteIcon/MegaMenu/EgitimDanismanlik.svg',
  trainingWhite: '/SiteIcon/MegaMenu/white/EgitimDanismanlikWhite.svg',
  about: '/SiteIcon/MegaMenu/BiziTaniyin.svg',
  aboutWhite: '/SiteIcon/MegaMenu/white/BiziTaniyinWhite.svg',
  blog: '/SiteIcon/MegaMenu/Blog.svg',
  blogWhite: '/SiteIcon/MegaMenu/white/BlogWhite.svg',
  career: '/SiteIcon/MegaMenu/Kariyer.svg',
  careerWhite: '/SiteIcon/MegaMenu/white/KariyerWhite.svg',
  sustainability: '/SiteIcon/MegaMenu/Surdurulebilirlik.svg',
  sustainabilityWhite: '/SiteIcon/MegaMenu/white/SurdurulebilirlikWhite.svg',
};

/**
 * Strapi v4 / v5 veri yapısını düzleştirir.
 */
function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/**
 * Güvenli string değeri döner — null/undefined/obje için boş string.
 */
function str(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object') {
    // Strapi localizable field { tr: '...', en: '...' } formatı olabilir
    return '';
  }
  return String(v);
}

/**
 * Strapi'deki corporate nesnesini normalize eder.
 * Hem flat alanları (aboutLabel, aboutDesc...) hem nested objeyi destekler.
 *
 * Strapi'deki beklenen alan yapısı (Component veya JSON):
 *   { aboutLabel, aboutDesc, blogLabel, blogDesc, careerLabel, careerDesc,
 *     sustainabilityLabel, sustainabilityDesc }
 * veya nested:
 *   { about: { label, desc }, blog: { label, desc }, ... }
 */
function normalizeCorporate(raw) {
  if (!raw) return {};
  const d = attrs(raw);

  const pick = (nested, flatKey) => str(nested ?? d[flatKey]);

  const about = d.about ? attrs(d.about) : {};
  const blog  = d.blog  ? attrs(d.blog)  : {};
  const career = d.career ? attrs(d.career) : {};
  const sustainability = d.sustainability ? attrs(d.sustainability) : {};

  return {
    about: {
      label: pick(about.label, 'aboutLabel'),
      desc:  pick(about.desc,  'aboutDesc'),
    },
    blog: {
      label: pick(blog.label, 'blogLabel'),
      desc:  pick(blog.desc,  'blogDesc'),
    },
    career: {
      label: pick(career.label, 'careerLabel'),
      desc:  pick(career.desc,  'careerDesc'),
    },
    sustainability: {
      label: pick(sustainability.label, 'sustainabilityLabel'),
      desc:  pick(sustainability.desc,  'sustainabilityDesc'),
    },
  };
}

/**
 * Strapi'deki hizmetlerItems repeatable component listesini normalize eder.
 *
 * Strapi'deki beklenen alan yapısı (Repeatable Component: header.hizmet-item):
 *   [ { serviceKey: 'customSoftware', label: 'Müşteriye Özel Yazılım' }, ... ]
 *
 * serviceKey değerleri config/services.ts içindeki SERVICE_KEYS ile eşleşmeli.
 * Bu alan opsiyoneldir — Strapi'de tanımlanmamışsa SERVICE_CATALOG.names kullanılır.
 */
function normalizeHizmetlerItems(rawList) {
  if (!Array.isArray(rawList) || rawList.length === 0) return null;
  const result = {};
  for (const raw of rawList) {
    const item = attrs(raw);
    const key = str(item.serviceKey || item.service_key || item.key);
    const label = str(item.label);
    if (key && label) result[key] = label;
  }
  return Object.keys(result).length > 0 ? result : null;
}

/**
 * Strapi'deki kurumsal alt menü link listesini normalize eder.
 *
 * Strapi'deki beklenen alan yapısı (Repeatable Component: header.kurumsal-item):
 *   [ { key: 'about', label: '...', desc: '...' }, ... ]
 *
 * Bu alan opsiyoneldir — Strapi'de tanımlanmamışsa corporate alanı kullanılır.
 */
function normalizeKurumsalItems(rawList) {
  if (!Array.isArray(rawList) || rawList.length === 0) return null;
  const result = {};
  for (const raw of rawList) {
    const item = attrs(raw);
    const key   = str(item.key);
    const label = str(item.label);
    const desc  = str(item.desc || item.description);
    if (key) result[key] = { label, desc };
  }
  return Object.keys(result).length > 0 ? result : null;
}

/**
 * Strapi'den gelen Header verisini standart formata normalize eder.
 */
function normalizeHeaderData(raw) {
  if (!raw) return null;
  const d = attrs(raw);

  const navigation = attrs(d.navigation);
  const sidePanel  = attrs(d.sidePanel);
  const descriptions = attrs(d.descriptions);
  const icons = attrs(d.icons);

  // İkonları normalize et
  const normalizedIcons = {};
  for (const key of Object.keys(DEFAULT_MENU_ICONS)) {
    normalizedIcons[key] = extractMediaUrl(icons[key], DEFAULT_MENU_ICONS[key]);
  }

  return {
    logo: extractMediaUrl(d.logo, DEFAULT_HEADER_LOGOS.logo),
    logoScrolled: extractMediaUrl(d.logoScrolled, DEFAULT_HEADER_LOGOS.logoScrolled),
    navigation: {
      services:     navigation.services     ?? d.navServices,
      products:     navigation.products     ?? d.navProducts,
      rAndD:        navigation.rAndD        ?? d.navRD,
      sectors:      navigation.sectors      ?? d.navSectors,
      partnerships: navigation.partnerships ?? d.navPartnerships,
      references:   navigation.references   ?? d.navReferences,
      corporate:    navigation.corporate    ?? d.navCorporate,
    },
    sidePanel: {
      tag:        sidePanel.tag        ?? d.sidePanelTag,
      titleLine1: sidePanel.titleLine1 ?? d.sidePanelTitleLine1,
      titleLine2: sidePanel.titleLine2 ?? d.sidePanelTitleLine2,
      desc:       sidePanel.desc       ?? d.sidePanelDesc,
      feature1:   sidePanel.feature1   ?? d.sidePanelFeature1,
      feature2:   sidePanel.feature2   ?? d.sidePanelFeature2,
      feature3:   sidePanel.feature3   ?? d.sidePanelFeature3,
    },
    descriptions: {
      customSoftware: descriptions.customSoftware ?? d.descCustomSoftware,
      iiot:           descriptions.iiot           ?? d.descIiot,
      traceability:   descriptions.traceability   ?? d.descTraceability,
      automation:     descriptions.automation      ?? d.descAutomation,
      robotics:       descriptions.robotics        ?? d.descRobotics,
      vision:         descriptions.vision          ?? d.descVision,
      ai:             descriptions.ai              ?? d.descAi,
      microsoft:      descriptions.microsoft       ?? d.descMicrosoft,
      velotic:        descriptions.velotic         ?? d.descVelotic,
      training:       descriptions.training        ?? d.descTraining,
    },
    // Kurumsal dropdown — hem corporate component hem kurumsalItems listesini destekle
    corporate: normalizeCorporate(d.corporate),
    // Hizmetler alt menü isimleri (opsiyonel, Strapi'de hizmetlerItems repeatable component)
    hizmetlerItems: normalizeHizmetlerItems(d.hizmetlerItems ?? d.hizmet_items),
    // Kurumsal repeatable list (opsiyonel, kurumsalItems varsa corporate'e göre önceliklidir)
    kurumsalItems: normalizeKurumsalItems(d.kurumsalItems ?? d.kurumsal_items),
    icons: normalizedIcons,
  };
}

/**
 * Strapi verisi ile fallback JSON'ı birleştirir.
 */
function mergeHeaderFallback(strapiData, fallbackHeader, fallbackNav) {
  const base = {
    logo: DEFAULT_HEADER_LOGOS.logo,
    logoScrolled: DEFAULT_HEADER_LOGOS.logoScrolled,
    navigation: { ...fallbackNav },
    sidePanel: { ...fallbackHeader.sidePanel },
    descriptions: { ...fallbackHeader.descriptions },
    corporate: { ...fallbackHeader.corporate },
    aria: { ...fallbackHeader.aria },
    icons: { ...DEFAULT_MENU_ICONS },
    hizmetlerItems: null,
    kurumsalItems: null,
  };

  if (!strapiData) return base;

  if (strapiData.logo) base.logo = strapiData.logo;
  if (strapiData.logoScrolled) base.logoScrolled = strapiData.logoScrolled;

  // Navigation merge
  if (strapiData.navigation) {
    for (const key of Object.keys(strapiData.navigation)) {
      if (strapiData.navigation[key]) base.navigation[key] = strapiData.navigation[key];
    }
  }

  // SidePanel merge
  if (strapiData.sidePanel) {
    for (const key of Object.keys(strapiData.sidePanel)) {
      if (strapiData.sidePanel[key]) base.sidePanel[key] = strapiData.sidePanel[key];
    }
  }

  // Descriptions merge
  if (strapiData.descriptions) {
    for (const key of Object.keys(strapiData.descriptions)) {
      if (strapiData.descriptions[key]) base.descriptions[key] = strapiData.descriptions[key];
    }
  }

  // Corporate merge — nested { about: { label, desc }, ... }
  if (strapiData.corporate) {
    for (const section of ['about', 'blog', 'career', 'sustainability']) {
      const strapiSection = strapiData.corporate[section];
      if (strapiSection) {
        base.corporate[section] = {
          ...base.corporate[section],
          ...Object.fromEntries(
            Object.entries(strapiSection).filter(([, v]) => v != null && v !== '')
          ),
        };
      }
    }
  }

  // Icons merge
  if (strapiData.icons) {
    for (const key of Object.keys(strapiData.icons)) {
      if (strapiData.icons[key]) base.icons[key] = strapiData.icons[key];
    }
  }

  // Hizmetler/Kurumsal repeatable list — sadece Strapi'den geldiyse ekle
  if (strapiData.hizmetlerItems) base.hizmetlerItems = strapiData.hizmetlerItems;
  if (strapiData.kurumsalItems)  base.kurumsalItems  = strapiData.kurumsalItems;

  return base;
}

/**
 * Strapi v5 uyumlu populate query.
 *
 * NOT:
 *  - populate[logo]=*       → "Invalid key related at logo.related" — Strapi v5'te çalışmıyor
 *  - populate[icons]=*      → "Invalid key customSoftware at icons.customSoftware" — çalışmıyor
 *  - populate=deep          → "Invalid key deep" — Strapi v5'te kaldırıldı
 *
 * Logo URL'leri her zaman sabit path'te (/uploads/...) geliyor; statik fallback kullanıyoruz.
 * Icon URL'leri de DEFAULT_MENU_ICONS'dan geliyor; Strapi'den çekilmesi gerekmiyor.
 */
const POPULATE_QUERY =
  'populate[navigation]=*' +
  '&populate[sidePanel]=*' +
  '&populate[descriptions]=*' +
  '&populate[corporate]=*' +
  '&populate[hizmetlerItems]=*' +
  '&populate[kurumsalItems]=*';

/**
 * Header içeriğini Strapi'den çeker.
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getHeaderData(locale = 'ro') {
  const fallbackHeader = HEADER_FALLBACKS[locale] ?? HEADER_FALLBACKS.ro;
  const fallbackNav = NAV_FALLBACKS[locale] ?? NAV_FALLBACKS.ro;

  try {
    const res = await strapiGet(`header?locale=${locale}&${POPULATE_QUERY}`);

    if (!res) return mergeHeaderFallback(null, fallbackHeader, fallbackNav);

    const raw = Array.isArray(res.data) ? res.data[0] : (res.data ?? res);
    const normalized = normalizeHeaderData(raw);

    return mergeHeaderFallback(normalized, fallbackHeader, fallbackNav);
  } catch (error) {
    console.error('[Strapi] getHeaderData error:', error?.message ?? error);
    return mergeHeaderFallback(null, fallbackHeader, fallbackNav);
  }
}

