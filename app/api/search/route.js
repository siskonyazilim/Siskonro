/**
 * GET /api/search?q=<sorgu>&locale=tr|en|ro
 *
 * Kapsamlı site arama motoru:
 * ─ Strapi koleksiyonları (dinamik, her zaman güncel)
 *     ● blog-posts   → title, excerpt, category, slug
 *     ● references   → name, category, projects[]
 *     ● partners     → name, role, workArea, techArea
 * ─ Statik sayfa kataloğu (SERVICE_CATALOG + sabit sayfalar)
 *     ● 10 hizmet sayfası (TR/EN/RO isimleriyle)
 *     ● Kurumsal, OnSuite, Ar-Ge, İletişim vb.
 * ─ Strapi search-config (varsa — opsiyonel)
 *     ● Özel ek kayıtlar
 *
 * Yanıt: { results: SearchResult[], total: number, query: string, locale: string }
 * SearchResult: { title, description, href, category, badge, score }
 */

import { strapiGet } from '@/lib/strapi/client';
import { getAllBlogPostsFromStrapi } from '@/lib/strapi/services/blog';
import { getClientIp, isRateLimited, safeLocale } from '@/lib/security/http';

// ── Statik hizmet açıklamaları (TR/EN/RO) ─────────────────────────────────
const SERVICE_DESCRIPTIONS = {
  '/hizmetler/musteriye-ozel-yazilim': {
    tr: 'İşletmenize özel geliştirilen ölçeklenebilir yazılım, entegrasyon ve dijital dönüşüm çözümleri. Özel yazılım geliştirme, ERP entegrasyonu, MES, SCADA.',
    en: 'Scalable custom software, integration and digital transformation solutions. Custom development, ERP integration, MES, SCADA.',
    ro: 'Software personalizat, integrare și soluții de transformare digitală. Dezvoltare personalizată, integrare ERP, MES, SCADA.',
  },
  '/hizmetler/iiot': {
    tr: 'Saha verisini güvenli şekilde toplayan, analiz eden ve buluta entegre eden IIoT çözümleri. Sensör, gateway, MQTT, OPC-UA, endüstriyel protokoller.',
    en: 'IIoT solutions for secure shopfloor data collection, analysis and cloud integration. Sensors, gateways, MQTT, OPC-UA.',
    ro: 'Soluții IIoT pentru colectarea, analiza și integrarea în cloud a datelor din atelier.',
  },
  '/hizmetler/izlenebilirlik-cozumleri': {
    tr: 'Üretimde lot ve süreç takibi için uçtan uca izlenebilirlik altyapısı. Barkod, QR, RFID, serialization, traceability, kalite kontrol.',
    en: 'End-to-end traceability for lot and process tracking in production. Barcode, QR, RFID, serialization, quality control.',
    ro: 'Trasabilitate end-to-end pentru urmărirea loturilor și proceselor în producție.',
  },
  '/hizmetler/makine-proses-otomasyonu': {
    tr: 'Daha hızlı, güvenli ve verimli üretim için otomasyon uygulamaları. PLC, HMI, SCADA, panel tasarımı, proses kontrolü, endüstri 4.0.',
    en: 'Automation solutions for faster, safer and more efficient production. PLC, HMI, SCADA, panel design, process control, Industry 4.0.',
    ro: 'Soluții de automatizare pentru producție mai rapidă, sigură și eficientă.',
  },
  '/hizmetler/robot-cozumleri': {
    tr: 'Robotik hücreler ve hat entegrasyonu ile esnek üretim kabiliyeti. Endüstriyel robot, cobots, pick-and-place, kaynak, montaj otomasyonu.',
    en: 'Robotic cells and line integration for flexible industrial operations. Industrial robots, cobots, pick-and-place, welding, assembly.',
    ro: 'Celule robotice și integrare linie pentru operații industriale flexibile.',
  },
  '/hizmetler/goruntu-isleme': {
    tr: 'Yapay zeka destekli görüntü işleme ile kalite kontrol. Kusur tespiti, ölçüm, OCR, barkod okuma, machine vision, kamera sistemleri.',
    en: 'AI-assisted machine vision for quality inspection. Defect detection, measurement, OCR, barcode reading, camera systems.',
    ro: 'Viziune artificială pentru inspecția calității. Detectarea defectelor, măsurare, OCR.',
  },
  '/hizmetler/ai-makine-ogrenmesi': {
    tr: 'Veri analitiği ve makine öğrenmesi ile üretim karar destek sistemleri. Predictive maintenance, anomali tespiti, büyük veri, deep learning.',
    en: 'Industrial analytics and ML-driven decision support. Predictive maintenance, anomaly detection, big data, deep learning.',
    ro: 'Analiză industrială și suport decizional bazat pe ML. Mentenanță predictivă.',
  },
  '/hizmetler/microsoft-cozumleri': {
    tr: 'Microsoft ekosistemiyle kurumsal platform ve bulut entegrasyonu. Azure IoT, Power BI, Dynamics 365, Teams entegrasyonu.',
    en: 'Enterprise platform and cloud integration on Microsoft ecosystem. Azure IoT, Power BI, Dynamics 365.',
    ro: 'Platformă enterprise și integrare cloud pe ecosistemul Microsoft. Azure IoT, Power BI.',
  },
  '/hizmetler/velotic': {
    tr: 'Velotic tabanlı üretim ve operasyon analitiği çözümleri. MES, üretim performansı izleme.',
    en: 'Velotic-based production and operations analytics. MES, manufacturing performance.',
    ro: 'Soluții de analiză producție și operațiuni bazate pe Velotic.',
  },
  '/hizmetler/egitim-danismanlik': {
    tr: 'Endüstriyel dönüşüm için teknik eğitim ve danışmanlık. SCADA eğitimi, IIoT danışmanlığı, endüstri 4.0, proje yönetimi.',
    en: 'Technical training and consulting for industrial transformation. SCADA training, IIoT consulting, Industry 4.0.',
    ro: 'Formare tehnică și consultanță pentru transformare industrială.',
  },
};

// ── Statik sayfa kataloğu (TR/EN/RO) ──────────────────────────────────────
const STATIC_PAGES = {
  tr: [
    { title: 'Ana Sayfa', desc: 'Siskon endüstriyel yazılım ve otomasyon çözümleri, IIoT, görüntü işleme, robot, OnSuite platformu.', href: '/', category: 'page' },
    { title: 'Hizmetler', desc: 'Endüstriyel yazılım, IIoT, otomasyon, görüntü işleme, robot çözümleri, yapay zeka ve danışmanlık hizmetleri.', href: '/hizmetler', category: 'service' },
    { title: 'OnSuite Platformu', desc: '11 modüllü akıllı üretim ve MES platformu. OEE, kalite, izlenebilirlik, enerji, bakım modülleri.', href: '/onsuite', category: 'product' },
    { title: 'Ar-Ge', desc: 'Siskon inovasyon merkezi, patent çalışmaları, AR-GE projeleri, yazılım mühendisliği araştırmaları.', href: '/arge', category: 'page' },
    { title: 'İş Birlikleri', desc: 'SICK, Cognex, Microsoft, GE Vernova, Siemens gibi global teknoloji liderleriyle stratejik ortaklıklar.', href: '/is-birlikleri', category: 'page' },
    { title: 'Referanslar', desc: 'Otomotiv, beyaz eşya, gıda, ilaç, enerji sektörlerinden müşteri referansları ve başarı hikayeleri.', href: '/referanslar', category: 'page' },
    { title: 'Bizi Tanıyın', desc: 'Siskon kurumsal yapı, vizyon, misyon, kuruluş hikayesi ve mühendislik yaklaşımı.', href: '/kurumsal/bizi-taniyin', category: 'corporate' },
    { title: 'Kariyer', desc: 'Açık pozisyonlar, başvuru süreci, Siskon\'da çalışma kültürü ve yan haklar.', href: '/kurumsal/kariyer', category: 'corporate' },
    { title: 'Sürdürülebilirlik', desc: 'Çevresel sürdürülebilirlik, yeşil üretim, karbon ayak izi azaltma, orman projeleri.', href: '/kurumsal/surdurulebilirlik', category: 'corporate' },
    { title: 'İletişim', desc: 'Teklif, proje ve iş birliği talepleri için iletişim formu. İzmir DEPARK ve ESBAS ofisleri.', href: '/iletisim#contact-form', category: 'page' },
    { title: 'Blog', desc: 'Endüstriyel otomasyon, IIoT, yapay zeka ve üretim teknolojileri hakkında makaleler.', href: '/blog', category: 'blog' },
    { title: 'KVKK Aydınlatma Metni', desc: 'Kişisel verilerin işlenmesine ilişkin KVKK kapsamında bilgilendirme.', href: '/yasal/kvkk', category: 'legal' },
    { title: 'Çerez Politikası', desc: 'Web sitesi çerez kullanımı, çerez türleri ve tercih yönetimi.', href: '/yasal/cerez-politikasi', category: 'legal' },
    // Sektörler
    { title: 'Otomotiv Sektörü', desc: 'Otomotiv ve yan sanayi için otomasyon, izlenebilirlik, robot çözümleri ve kalite kontrol.', href: '/sektorler/otomotiv', category: 'sector' },
    { title: 'Beyaz Eşya Sektörü', desc: 'Beyaz eşya üretiminde IIoT, görüntü işleme ve akıllı fabrika çözümleri.', href: '/sektorler/beyaz-esya', category: 'sector' },
    { title: 'Gıda ve İçecek Sektörü', desc: 'Gıda üretiminde izlenebilirlik, hijyen uyumu ve süreç otomasyonu.', href: '/sektorler/gida-icecek', category: 'sector' },
    { title: 'İlaç ve Sağlık Sektörü', desc: 'İlaç üretiminde serialization, GMP uyumu ve kalite yönetimi çözümleri.', href: '/sektorler/ilac', category: 'sector' },
    { title: 'Makine ve Otomasyon', desc: 'Makine üreticileri için OEM yazılım, HMI, PLC entegrasyonu.', href: '/sektorler/makine-otomasyon', category: 'sector' },
    { title: 'Tekstil Sektörü', desc: 'Tekstil üretiminde kalite kontrol, izlenebilirlik ve süreç otomasyon çözümleri.', href: '/sektorler/tekstil', category: 'sector' },
    { title: 'Tütün Sektörü', desc: 'Tütün sektöründe track-and-trace, serialization ve üretim yönetimi çözümleri.', href: '/sektorler/tutun', category: 'sector' },
    { title: 'Enerji ve Kimya', desc: 'Enerji ve kimya sektöründe süreç otomasyonu, izleme ve veri analitiği.', href: '/sektorler/enerji-kimya', category: 'sector' },
  ],
  en: [
    { title: 'Home', desc: 'Siskon industrial software and automation solutions, IIoT, vision, robotics, OnSuite platform.', href: '/', category: 'page' },
    { title: 'Services', desc: 'Industrial software, IIoT, automation, machine vision, robotics, AI and consulting services.', href: '/hizmetler', category: 'service' },
    { title: 'OnSuite Platform', desc: '11-module smart manufacturing and MES platform. OEE, quality, traceability, energy, maintenance modules.', href: '/onsuite', category: 'product' },
    { title: 'R&D', desc: 'Siskon innovation center, patents, R&D projects, software engineering research.', href: '/arge', category: 'page' },
    { title: 'Partnerships', desc: 'Strategic partnerships with SICK, Cognex, Microsoft, GE Vernova, Siemens and other global technology leaders.', href: '/is-birlikleri', category: 'page' },
    { title: 'References', desc: 'Customer references and success stories from automotive, white goods, food, pharma and energy sectors.', href: '/referanslar', category: 'page' },
    { title: 'About Us', desc: 'Siskon corporate profile, vision, mission, founding story and engineering approach.', href: '/kurumsal/bizi-taniyin', category: 'corporate' },
    { title: 'Careers', desc: 'Open roles, application process, work culture and benefits at Siskon.', href: '/kurumsal/kariyer', category: 'corporate' },
    { title: 'Sustainability', desc: 'Environmental sustainability, green manufacturing, carbon footprint reduction, forest projects.', href: '/kurumsal/surdurulebilirlik', category: 'corporate' },
    { title: 'Contact', desc: 'Contact form for proposals, projects and partnerships. Izmir DEPARK and ESBAS offices.', href: '/iletisim#contact-form', category: 'page' },
    { title: 'Blog', desc: 'Articles on industrial automation, IIoT, artificial intelligence and manufacturing technology.', href: '/blog', category: 'blog' },
    { title: 'PDPL Notice', desc: 'Information notice on personal data processing under Turkish PDPL.', href: '/yasal/kvkk', category: 'legal' },
    { title: 'Cookie Policy', desc: 'Website cookie usage, cookie types and preference management.', href: '/yasal/cerez-politikasi', category: 'legal' },
    { title: 'Automotive Sector', desc: 'Automation, traceability, robotics and quality solutions for automotive and Tier 1 suppliers.', href: '/sektorler/otomotiv', category: 'sector' },
    { title: 'White Goods Sector', desc: 'IIoT, machine vision and smart factory solutions for white goods manufacturing.', href: '/sektorler/beyaz-esya', category: 'sector' },
    { title: 'Food & Beverage Sector', desc: 'Traceability, hygiene compliance and process automation for food production.', href: '/sektorler/gida-icecek', category: 'sector' },
    { title: 'Pharmaceutical Sector', desc: 'Serialization, GMP compliance and quality management solutions for pharma.', href: '/sektorler/ilac', category: 'sector' },
    { title: 'Machine & Automation', desc: 'OEM software, HMI and PLC integration for machine builders.', href: '/sektorler/makine-otomasyon', category: 'sector' },
    { title: 'Textile Sector', desc: 'Quality control, traceability and process automation for textile manufacturing.', href: '/sektorler/tekstil', category: 'sector' },
    { title: 'Tobacco Sector', desc: 'Track-and-trace, serialization and production management solutions for tobacco.', href: '/sektorler/tutun', category: 'sector' },
    { title: 'Energy & Chemicals', desc: 'Process automation, monitoring and data analytics for energy and chemical industries.', href: '/sektorler/enerji-kimya', category: 'sector' },
  ],
  ro: [
    { title: 'Acasă', desc: 'Soluții software industrial și automatizare Siskon, IIoT, viziune, robotică, platforma OnSuite.', href: '/', category: 'page' },
    { title: 'Servicii', desc: 'Software industrial, IIoT, automatizare, viziune industrială, robotică, AI și consultanță.', href: '/hizmetler', category: 'service' },
    { title: 'Platforma OnSuite', desc: 'Platformă MES cu 11 module. OEE, calitate, trasabilitate, energie, mentenanță.', href: '/onsuite', category: 'product' },
    { title: 'Cercetare & Dezvoltare', desc: 'Centrul de inovare Siskon, brevete, proiecte C&D, cercetare software.', href: '/arge', category: 'page' },
    { title: 'Parteneriate', desc: 'Parteneriate strategice cu SICK, Cognex, Microsoft, GE Vernova, Siemens și alți lideri.', href: '/is-birlikleri', category: 'page' },
    { title: 'Referințe', desc: 'Referințe clienți și povești de succes din sectoarele auto, electrocasnice, alimentar, farma.', href: '/referanslar', category: 'page' },
    { title: 'Despre Noi', desc: 'Profil corporativ Siskon, viziune, misiune, povestea fondării și abordarea de inginerie.', href: '/kurumsal/bizi-taniyin', category: 'corporate' },
    { title: 'Cariere', desc: 'Posturi deschise, proces de aplicare, cultura muncii și beneficii la Siskon.', href: '/kurumsal/kariyer', category: 'corporate' },
    { title: 'Sustenabilitate', desc: 'Sustenabilitate de mediu, producție verde, reducerea amprentei de carbon.', href: '/kurumsal/surdurulebilirlik', category: 'corporate' },
    { title: 'Contact', desc: 'Formular de contact pentru oferte, proiecte și parteneriate. Birourile Izmir și România.', href: '/iletisim#contact-form', category: 'page' },
    { title: 'Blog', desc: 'Articole despre automatizare industrială, IIoT, inteligență artificială și tehnologie de producție.', href: '/blog', category: 'blog' },
  ],
};

// ── Hizmet kataloğu (SERVICE_CATALOG eşdeğeri) ────────────────────────────
const SERVICES = [
  { href: '/hizmetler/musteriye-ozel-yazilim', names: { tr: 'Müşteriye Özel Yazılım Çözümleri', en: 'Custom Software Solutions', ro: 'Soluții Software Personalizate' } },
  { href: '/hizmetler/iiot',                    names: { tr: 'Endüstriyel Nesnelerin İnterneti (IIoT) Çözümleri', en: 'IIoT Solutions', ro: 'Soluții IIoT' } },
  { href: '/hizmetler/izlenebilirlik-cozumleri', names: { tr: 'İzlenebilirlik Çözümleri', en: 'Traceability Solutions', ro: 'Soluții de Trasabilitate' } },
  { href: '/hizmetler/makine-proses-otomasyonu', names: { tr: 'Makine ve Proses Otomasyonu', en: 'Machine & Process Automation', ro: 'Automatizare Mașini și Procese' } },
  { href: '/hizmetler/robot-cozumleri',          names: { tr: 'Robot Çözümleri', en: 'Robotic Solutions', ro: 'Soluții Robotice' } },
  { href: '/hizmetler/goruntu-isleme',           names: { tr: 'Görüntü İşleme', en: 'Machine Vision', ro: 'Procesare Imagine' } },
  { href: '/hizmetler/ai-makine-ogrenmesi',      names: { tr: 'AI ve Makine Öğrenmesi', en: 'AI and Machine Learning', ro: 'AI și Învățare Automată' } },
  { href: '/hizmetler/microsoft-cozumleri',      names: { tr: 'Microsoft Çözümleri', en: 'Microsoft Solutions', ro: 'Soluții Microsoft' } },
  { href: '/hizmetler/velotic',               names: { tr: 'Velotic', en: 'Velotic', ro: 'Velotic' } },
  { href: '/hizmetler/egitim-danismanlik',        names: { tr: 'Eğitim ve Danışmanlık', en: 'Training & Consulting', ro: 'Formare și Consultanță' } },
];

// ── Kategori renk/badge map ────────────────────────────────────────────────
const CATEGORY_META = {
  blog:      { badge: 'Blog',          color: 'sky' },
  reference: { badge: 'Referans',      color: 'emerald' },
  partner:   { badge: 'İş Birliği',   color: 'violet' },
  service:   { badge: 'Hizmet',        color: 'orange' },
  product:   { badge: 'Ürün',          color: 'amber' },
  sector:    { badge: 'Sektör',        color: 'teal' },
  corporate: { badge: 'Kurumsal',      color: 'blue' },
  legal:     { badge: 'Yasal',         color: 'slate' },
  page:      { badge: 'Sayfa',         color: 'slate' },
};

// ── Text normalizer ────────────────────────────────────────────────────────
function normalize(text) {
  return String(text ?? '')
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ş/g, 's')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .trim();
}

function matches(haystack, needle) {
  const n = normalize(needle);
  if (!n || n.length < 2) return false;
  return normalize(haystack).includes(n);
}

function score(item, q) {
  const nq = normalize(q);
  let s = 0;
  if (normalize(item.title).startsWith(nq))       s += 10;
  if (normalize(item.title).includes(nq))         s += 5;
  if (normalize(item.description).includes(nq))   s += 2;
  if (normalize(item.tags ?? '').includes(nq))     s += 3;
  return s;
}

export async function GET(request) {
  const { searchParams } = request.nextUrl;

  // Her arama Strapi'ye birkaç istek atar → kötüye kullanımı sınırla
  if (isRateLimited(`search:${getClientIp(request)}`, { max: 90, windowMs: 60_000 })) {
    return Response.json({ results: [], total: 0, error: 'rate_limited' }, { status: 429 });
  }

  // Girdileri doğrula: locale beyaz liste (Strapi sorgusuna enjeksiyonu önler), limit/q sınırlı
  const q      = (searchParams.get('q') ?? '').trim().slice(0, 100);
  const locale = safeLocale(searchParams.get('locale'));
  const limitParam = Number.parseInt(searchParams.get('limit') ?? '50', 10);
  const limit  = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 50;

  if (!q || q.length < 2) {
    return Response.json({ results: [], total: 0, query: q, locale });
  }

  const results = [];

  // ── 1. Strapi: blog-posts ──────────────────────────────────────────────
  try {
    const blogRes = await strapiGet(
      `blog-posts?locale=${locale}&populate=coverImage&pagination[pageSize]=100&sort=date:desc`
    );
    // Strapi yanıt vermezse statik blog yazılarına düş
    const posts = Array.isArray(blogRes?.data) ? blogRes.data : await getAllBlogPostsFromStrapi(locale);
    for (const p of posts) {
      const haystack = `${p.title} ${p.excerpt ?? ''} ${p.category ?? ''} ${p.author ?? ''}`;
      if (matches(haystack, q)) {
        results.push({
          title:       p.title ?? '',
          description: p.excerpt ?? p.category ?? '',
          href:        `/blog/${p.slug}`,
          category:    'blog',
          badge:       'Blog',
          color:       'sky',
          meta:        p.category ?? '',
          date:        p.date ?? null,
          score:       score({ title: p.title, description: p.excerpt ?? '', tags: p.category ?? '' }, q),
        });
      }
    }
  } catch (e) { console.warn('[search] blog-posts fetch failed:', e.message); }

  // ── 2. Strapi: references ──────────────────────────────────────────────
  try {
    const refRes = await strapiGet(
      `references?locale=${locale}&populate=logo&pagination[pageSize]=100&sort=order:asc`
    );
    const refs = Array.isArray(refRes?.data) ? refRes.data : [];
    for (const r of refs) {
      const projects = Array.isArray(r.projects) ? r.projects.join(' ') : '';
      const haystack = `${r.name} ${r.category ?? ''} ${projects}`;
      if (matches(haystack, q)) {
        results.push({
          title:       r.name ?? '',
          description: projects || r.category || '',
          href:        `/referanslar`,
          category:    'reference',
          badge:       locale === 'en' ? 'Reference' : locale === 'ro' ? 'Referință' : 'Referans',
          color:       'emerald',
          meta:        r.category ?? '',
          score:       score({ title: r.name, description: projects, tags: r.category ?? '' }, q),
        });
      }
    }
  } catch (e) { console.warn('[search] references fetch failed:', e.message); }

  // ── 3. Strapi: partners ────────────────────────────────────────────────
  try {
    const partRes = await strapiGet(
      `partners?locale=${locale}&populate=logo&pagination[pageSize]=100&sort=order:asc`
    );
    const partners = Array.isArray(partRes?.data) ? partRes.data : [];
    for (const p of partners) {
      const haystack = `${p.name} ${p.role ?? ''} ${p.workArea ?? ''} ${p.techArea ?? ''}`;
      if (matches(haystack, q)) {
        results.push({
          title:       p.name ?? '',
          description: [p.role, p.workArea, p.techArea].filter(Boolean).join(' · '),
          href:        `/is-birlikleri`,
          category:    'partner',
          badge:       locale === 'en' ? 'Partner' : locale === 'ro' ? 'Partener' : 'İş Birliği',
          color:       'violet',
          meta:        p.techArea ?? '',
          score:       score({ title: p.name, description: `${p.role} ${p.workArea} ${p.techArea}`, tags: '' }, q),
        });
      }
    }
  } catch (e) { console.warn('[search] partners fetch failed:', e.message); }

  // ── 4. Hizmetler (statik katalog + açıklamalar) ────────────────────────
  const l = locale === 'en' ? 'en' : locale === 'ro' ? 'ro' : 'tr';
  for (const svc of SERVICES) {
    const desc = SERVICE_DESCRIPTIONS[svc.href]?.[l] ?? '';
    const haystack = `${svc.names[l]} ${desc}`;
    if (matches(haystack, q)) {
      results.push({
        title:       svc.names[l],
        description: desc,
        href:        svc.href,
        category:    'service',
        badge:       locale === 'en' ? 'Service' : locale === 'ro' ? 'Serviciu' : 'Hizmet',
        color:       'orange',
        meta:        '',
        score:       score({ title: svc.names[l], description: desc, tags: '' }, q) + 1,
      });
    }
  }

  // ── 5. Statik sayfalar (fallback — search-config yoksa kullanılır) ────────
  const staticPages = STATIC_PAGES[l] ?? STATIC_PAGES.tr;
  for (const page of staticPages) {
    const haystack = `${page.title} ${page.desc}`;
    if (matches(haystack, q)) {
      const meta = CATEGORY_META[page.category] ?? CATEGORY_META.page;
      results.push({
        title:       page.title,
        description: page.desc,
        href:        page.href,
        category:    page.category,
        badge:       meta.badge,
        color:       meta.color,
        meta:        '',
        score:       score({ title: page.title, description: page.desc, tags: page.category }, q),
        source:      'static',
      });
    }
  }

  // ── 6. Strapi: search-config searchIndex (Strapi'deki tüm kayıtlar) ──────
  try {
    const scRes = await strapiGet(
      `search-config?locale=${locale}&populate[searchIndex]=true`
    );
    const scItems = Array.isArray(scRes?.data?.searchIndex) ? scRes.data.searchIndex : [];
    for (const item of scItems) {
      const haystack = `${item.title} ${item.description ?? ''}`;
      if (matches(haystack, q)) {
        // Aynı href statik'ten zaten eklendiyse atla
        const alreadyAdded = results.some(r => r.href === item.href && r.source === 'static');
        if (alreadyAdded) continue;
        results.push({
          title:       item.title ?? '',
          description: item.description ?? '',
          href:        item.href ?? '/',
          category:    'page',
          badge:       locale === 'en' ? 'Page' : locale === 'ro' ? 'Pagină' : 'Sayfa',
          color:       'slate',
          meta:        '',
          score:       score({ title: item.title, description: item.description ?? '', tags: '' }, q),
          source:      'strapi-config',
        });
      }
    }
  } catch (e) { console.warn('[search] search-config fetch failed:', e.message); }

  // ── Sırala: score desc, sonra title asc ────────────────────────────────
  results.sort((a, b) => (b.score - a.score) || a.title.localeCompare(b.title, locale));

  // ── Tekrar edenleri temizle (aynı href+title) ──────────────────────────
  const seen = new Set();
  const unique = results.filter((r) => {
    const key = `${r.href}__${normalize(r.title)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return Response.json(
    {
      results: unique.slice(0, limit),
      total:   unique.length,
      query:   q,
      locale,
    },
    {
      headers: { 'Cache-Control': 'private, no-cache' },
    }
  );
}
