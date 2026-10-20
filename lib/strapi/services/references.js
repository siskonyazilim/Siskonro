import { strapiGet } from '../client.js';
import { extractMediaUrl } from '../mediaUrl.js';

/**
 * Strapi references collection'ından tüm referans verilerini çeker.
 * Referanslar locale bağımsız — tüm diller aynı veriyi kullanır.
 *
 * @returns {Promise<Array|null>}
 */
export async function getReferences() {
  try {
    const res = await strapiGet(
      'references?populate=logo&sort=order:asc&pagination[limit]=100'
    );

    if (!res || !Array.isArray(res.data)) return null;

    return res.data.map((item) => normalizeReference(item));
  } catch (error) {
    console.error('[Strapi] getReferences error:', error?.message ?? error);
    return null;
  }
}

/**
 * Tek bir Strapi reference kaydını normalize eder.
 *
 * Strapi'de iki farklı projects yapısı var:
 *  A) [{title: "Global", items: ["proje1", ...]}]  → section yapısı (JTI, Philip Morris)
 *  B) ["proje1", "proje2", ...]                    → düz string dizisi (BorgWarner vb.)
 */
function normalizeReference(raw) {
  const d = raw?.attributes ?? raw ?? {};

  // logo: Strapi media → tam URL
  const logoUrl = extractMediaUrl(d.logo, null);

  const rawProjects = d.projects ?? [];

  // Yapı A mı, B mi?
  const isSectionFormat =
    Array.isArray(rawProjects) &&
    rawProjects.length > 0 &&
    typeof rawProjects[0] === 'object' &&
    rawProjects[0] !== null &&
    'items' in rawProjects[0];

  const isFlatFormat =
    Array.isArray(rawProjects) &&
    rawProjects.length > 0 &&
    typeof rawProjects[0] === 'string';

  return {
    id: d.documentId ?? String(raw.id),
    name: d.name ?? '',
    category: d.category ?? 'all',
    website: d.website ?? '',
    order: d.order ?? 0,
    // Logo: Strapi'den tam URL ya da null (sayfa şirket adını gösterir)
    logo: logoUrl,
    blackLogo: null,
    // Sections (yapı A): [{title, items:[]}] — ReferenceDetails flatMap ediyor
    sections: isSectionFormat ? rawProjects : undefined,
    // Projects (yapı B): düz string[] — mevcut sayfa kodu için
    projects: isFlatFormat ? rawProjects : undefined,
    tableProjects: undefined,
  };
}

/**
 * Referansları kategoriye göre gruplar.
 * { tutun: [], otomotiv: [], 'beyaz-esya': [], 'gida-icecek': [] }
 *
 * @param {Array} references
 * @returns {object}
 */
export function groupReferencesByCategory(references) {
  const grouped = {
    tutun: [],
    otomotiv: [],
    'beyaz-esya': [],
    'gida-icecek': [],
  };

  for (const ref of references) {
    const cat = ref.category;
    if (grouped[cat]) {
      grouped[cat].push(ref);
    }
  }

  return grouped;
}
