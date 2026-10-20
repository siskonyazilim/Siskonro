import { strapiGet } from '../client.js';
import { extractMediaUrl, extractMediaArray } from '../mediaUrl.js';

// ─── JSON Fallbacks ────────────────────────────────────────────────────────
import aiTr from '../../../messages/hizmetler/ai-makine-ogrenmesi/tr.json';
import aiEn from '../../../messages/hizmetler/ai-makine-ogrenmesi/en.json';
import aiRo from '../../../messages/hizmetler/ai-makine-ogrenmesi/ro.json';

import iiotTr from '../../../messages/hizmetler/iiot/tr.json';
import iiotEn from '../../../messages/hizmetler/iiot/en.json';
import iiotRo from '../../../messages/hizmetler/iiot/ro.json';

import goruntuTr from '../../../messages/hizmetler/goruntu-isleme/tr.json';
import goruntuEn from '../../../messages/hizmetler/goruntu-isleme/en.json';
import goruntuRo from '../../../messages/hizmetler/goruntu-isleme/ro.json';

import makineTr from '../../../messages/hizmetler/makine-proses-otomasyonu/tr.json';
import makineEn from '../../../messages/hizmetler/makine-proses-otomasyonu/en.json';
import makineRo from '../../../messages/hizmetler/makine-proses-otomasyonu/ro.json';

import izlenTr from '../../../messages/hizmetler/izlenebilirlik-cozumleri/tr.json';
import izlenEn from '../../../messages/hizmetler/izlenebilirlik-cozumleri/en.json';
import izlenRo from '../../../messages/hizmetler/izlenebilirlik-cozumleri/ro.json';

import msTr from '../../../messages/hizmetler/microsoft-cozumleri/tr.json';
import msEn from '../../../messages/hizmetler/microsoft-cozumleri/en.json';
import msRo from '../../../messages/hizmetler/microsoft-cozumleri/ro.json';

import musteriyeTr from '../../../messages/hizmetler/musteriye-ozel-yazilim/tr.json';
import musteriyeEn from '../../../messages/hizmetler/musteriye-ozel-yazilim/en.json';
import musteriyeRo from '../../../messages/hizmetler/musteriye-ozel-yazilim/ro.json';

import egitimTr from '../../../messages/hizmetler/egitim-danismanlik/tr.json';
import egitimEn from '../../../messages/hizmetler/egitim-danismanlik/en.json';
import egitimRo from '../../../messages/hizmetler/egitim-danismanlik/ro.json';


import veloticTr from '../../../messages/hizmetler/velotic/tr.json';
import veloticEn from '../../../messages/hizmetler/velotic/en.json';
import veloticRo from '../../../messages/hizmetler/velotic/ro.json';

import robotTr from '../../../messages/hizmetler/robot-cozumleri/tr.json';
import robotEn from '../../../messages/hizmetler/robot-cozumleri/en.json';
import robotRo from '../../../messages/hizmetler/robot-cozumleri/ro.json';

// ─── Fallback Map ────────────────────────────────────────────────────────────
const FALLBACKS = {
  'ai-makine-ogrenmesi': { tr: aiTr, en: aiEn, ro: aiRo },
  'iiot': { tr: iiotTr, en: iiotEn, ro: iiotRo },
  'goruntu-isleme': { tr: goruntuTr, en: goruntuEn, ro: goruntuRo },
  'makine-proses-otomasyonu': { tr: makineTr, en: makineEn, ro: makineRo },
  'izlenebilirlik-cozumleri': { tr: izlenTr, en: izlenEn, ro: izlenRo },
  'microsoft-cozumleri': { tr: msTr, en: msEn, ro: msRo },
  'musteriye-ozel-yazilim': { tr: musteriyeTr, en: musteriyeEn, ro: musteriyeRo },
  'egitim-danismanlik': { tr: egitimTr, en: egitimEn, ro: egitimRo },
  'velotic': { tr: veloticTr, en: veloticEn, ro: veloticRo },
  'robot-cozumleri': { tr: robotTr, en: robotEn, ro: robotRo },
};


// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strapi v4 / v5 uyumlu attributes çözücü */
function attrs(raw) {
  return raw?.attributes ?? raw ?? {};
}

/** Repeatable component / düz string dizisini normalize eder */
function normArray(arr) {
  if (!Array.isArray(arr)) return null;
  return arr
    .map((item) => {
      if (typeof item === 'string') return item;
      // hizmetler.text-item componenti 'Text' (buyuk T) kullaniyor
      return item?.Text ?? item?.text ?? item?.title ?? item?.name ?? item?.value ?? null;
    })
    .filter(Boolean);
}

/** hizmetler.card-item'ı normalize eder */
function normalizeCard(c) {
  const d = attrs(c);
  const iconResolved = extractMediaUrl(d.icon);
  const imageResolved = extractMediaUrl(d.image);
  return {
    title: d.title ?? '',
    titleSub: d.titleSub ?? null,
    spot: d.spot ?? '',
    desc: d.description ?? d.desc ?? '',
    icon: iconResolved,
    image: imageResolved,
    imageAlt: d.imageAlt ?? d.title ?? '',
  };
}

/** hizmetler.step-item'ı normalize eder */
function normalizeStep(s) {
  const d = attrs(s);
  return {
    titleLine1: d.titleLine1 ?? '',
    titleLine2: d.titleLine2 ?? '',
    title: [d.titleLine1, d.titleLine2].filter(Boolean).join(' '),
  };
}

/** Tek bir dynamic zone bloğunu normalize eder */
function normalizeBlock(block) {
  if (!block) return null;
  const type = block.__component ?? '';
  const d = attrs(block);

  switch (type) {
    case 'hizmetler.benefits-list':
      return {
        _type: 'benefits-list',
        eyebrow: d.eyebrow ?? '',
        title: d.title ?? '',
        listTitle: d.listTitle ?? '',
        items: normArray(d.items) ?? [],
        image: extractMediaUrl(d.image),
      };
    case 'hizmetler.card-grid':
      return {
        _type: 'card-grid',
        eyebrow: d.eyebrow ?? '',
        title: d.title ?? '',
        desc: d.desc ?? d.description ?? '',
        cards: (d.cards ?? []).map(normalizeCard),
      };
    case 'hizmetler.step-roadmap':
      return {
        _type: 'step-roadmap',
        eyebrow: d.eyebrow ?? '',
        title: d.title ?? '',
        steps: (d.steps ?? []).map(normalizeStep),
      };
    case 'hizmetler.two-col-section':
      return {
        _type: 'two-col-section',
        eyebrow: d.eyebrow ?? '',
        title: d.title ?? '',
        spot: d.spot ?? '',
        desc: d.description ?? d.desc ?? '',
        image: extractMediaUrl(d.image),
        secondaryImage: extractMediaUrl(d.secondaryImage),
        imagePosition: d.imagePosition ?? 'left',
      };
    case 'hizmetler.more-image':
      return {
        _type: 'more-image',
        image: extractMediaArray(d.image),
      };
    case 'hizmetler.dual-list':
      return {
        _type: 'dual-list',
        eyebrow: d.eyebrow ?? '',
        title: d.title ?? '',
        list1Title: d.list1Title ?? '',
        list1Items: normArray(d.list1Items) ?? [],
        list2Title: d.list2Title ?? '',
        list2Items: normArray(d.list2Items) ?? [],
      };
    default:
      return null;
  }
}

// ─── Per-Page Block Mapping ───────────────────────────────────────────────────
// Her slug için Strapi'deki content bloklarını sayfa prop'larına eşler.
// normArray(block.items) → string[] döner (hizmetler.text-item.Text alanı).
// Strapi'de henüz içerik girilmemiş / blok yoksa ilgili key'i atlamayarak
// JSON fallback'in devreye girmesine izin veririz.

const BLOCK_MAPPINGS = {

  // ── AI ve Makine Öğrenmesi ──────────────────────────────────────────────────
  'ai-makine-ogrenmesi': (blocks, out) => {
    const kazanimlar = blocks.find(b => b._type === 'benefits-list' && /kazanım/i.test(b.eyebrow));
    const cozumler   = blocks.find(b => b._type === 'benefits-list' && /çözüm|ozum/i.test(b.eyebrow));
    if (kazanimlar) {
      out.benefitsEyebrow = kazanimlar.eyebrow;
      out.benefitsTitle   = kazanimlar.title;
      if (kazanimlar.listTitle) out.benefitsListTitle = kazanimlar.listTitle;
      if (kazanimlar.items?.length) out.benefits = kazanimlar.items;
      if (kazanimlar.image) out.benefitsImage = kazanimlar.image;
    }
    if (cozumler) {
      out.solutionsEyebrow = cozumler.eyebrow;
      out.solutionsTitle   = cozumler.title;
      if (cozumler.listTitle) out.solutionsListTitle = cozumler.listTitle;
      if (cozumler.items?.length) out.solutions = cozumler.items;
      if (cozumler.image) out.solutionsImage = cozumler.image;
    }

    // Derin Öğrenme & ETL — two-col-section bloklarından çek
    const twoColBlocks = blocks.filter(b => b._type === 'two-col-section');
    const dlBlock  = twoColBlocks[0];
    const etlBlock = twoColBlocks[1];

    if (dlBlock && (dlBlock.title || dlBlock.spot || dlBlock.desc)) {
      out.deepLearning = {
        title: dlBlock.title ?? '',
        spot:  dlBlock.spot  ?? '',
        desc:  dlBlock.desc  ?? '',
      };
      if (dlBlock.eyebrow) out.applicationsEyebrow = dlBlock.eyebrow;
      if (dlBlock.image) out.deepLearningImage = dlBlock.image;
    }

    if (etlBlock && (etlBlock.title || etlBlock.spot || etlBlock.desc)) {
      out.etlApp = {
        title: etlBlock.title ?? '',
        spot:  etlBlock.spot  ?? '',
        desc:  etlBlock.desc  ?? '',
      };
      if (etlBlock.image) out.etlAppImage = etlBlock.image;
    }
  },

  // ── IIoT ────────────────────────────────────────────────────────────────────
  'iiot': (blocks, out) => {
    const ozellikler = blocks.find(b => b._type === 'benefits-list' && /özellik|zellik/i.test(b.eyebrow));
    const kazanimlar = blocks.find(b => b._type === 'benefits-list' && /kazanım|kazanim/i.test(b.eyebrow));
    const cardGrid   = blocks.find(b => b._type === 'card-grid');
    if (kazanimlar) {
      out.benefits        = kazanimlar.eyebrow;
      out.benefitsTitle   = kazanimlar.title;
      if (kazanimlar.listTitle) out.benefitsListTitle = kazanimlar.listTitle;
      if (kazanimlar.items?.length) out.systemFeatures = kazanimlar.items;
      if (kazanimlar.image) out.benefitsImage = kazanimlar.image;
    }
    if (ozellikler) {
      if (ozellikler.listTitle) out.featuresListTitle = ozellikler.listTitle;
      if (ozellikler?.items?.length) out.features = ozellikler.items;
      if (ozellikler.image) out.featuresImage = ozellikler.image;
    }
    if (cardGrid) {
      if (cardGrid.eyebrow) out.subSystemsEyebrow = cardGrid.eyebrow;
      if (cardGrid.title) out.subSystemsTitle = cardGrid.title;
      if (cardGrid.cards?.length) {
        out.subSystems = cardGrid.cards.map(card => ({
          title: card.title ?? '',
          spot:  card.spot ?? '',
          desc:  card.desc ?? '',
          icon:  card.icon ?? '',
          image: card.image ?? '',
          imageAlt: card.imageAlt ?? '',
        }));
      }
    }
  },

  // ── Görüntü İşleme ──────────────────────────────────────────────────────────
  'goruntu-isleme': (blocks, out) => {
    const moreImage   = blocks.find(b => b._type === 'more-image');
    const kazanimlar  = blocks.find(b => b._type === 'benefits-list' && /kazanım|kazanim/i.test(b.eyebrow));
    const yetkinlik   = blocks.find(b => b._type === 'benefits-list' && /yetkinlik/i.test(b.eyebrow));
    if (moreImage && moreImage.image?.length) {
      out.moreImages = moreImage.image;
    }
    if (kazanimlar) {
      out.benefitsEyebrow = kazanimlar.eyebrow;
      out.benefitsTitle   = kazanimlar.title;
      if (kazanimlar.listTitle) out.benefitsListTitle = kazanimlar.listTitle;
      if (kazanimlar.items?.length) out.benefits = kazanimlar.items;
      if (kazanimlar.image) out.benefitsImage = kazanimlar.image;
    }
    if (yetkinlik) {
      out.capabilitiesEyebrow = yetkinlik.eyebrow;
      out.capabilitiesTitle   = yetkinlik.title;
      if (yetkinlik.listTitle) out.capabilitiesListTitle = yetkinlik.listTitle;
      if (yetkinlik.items?.length) out.capabilities = yetkinlik.items;
      if (yetkinlik.image) out.capabilitiesImage = yetkinlik.image;
    }
  },

  // ── Robot Çözümleri ─────────────────────────────────────────────────────────
  'robot-cozumleri': (blocks, out) => {
    const kazanimlar  = blocks.find(b => b._type === 'benefits-list' && /kazanım|kazanim/i.test(b.eyebrow));
    const nitelikler  = blocks.find(b => b._type === 'benefits-list' && /nitelik/i.test(b.eyebrow));
    if (kazanimlar) {
      out.benefitsEyebrow = kazanimlar.eyebrow;
      out.benefitsTitle   = kazanimlar.title;
      if (kazanimlar.listTitle) out.benefitsListTitle = kazanimlar.listTitle;
      if (kazanimlar.items?.length) out.qualities = kazanimlar.items;
      if (kazanimlar.image) out.benefitsImage = kazanimlar.image;
    }
    if (nitelikler) {
      out.qualificationsEyebrow = nitelikler.eyebrow;
      out.qualificationsTitle = nitelikler.title;
      if (nitelikler.listTitle) out.qualificationsListTitle = nitelikler.listTitle;
      if (nitelikler.items?.length) out.qualifications = nitelikler.items;
      if (nitelikler.image) out.qualificationsImage = nitelikler.image;
    }
  },

  // ── Makine ve Proses Otomasyonu ─────────────────────────────────────────────
  'makine-proses-otomasyonu': (blocks, out) => {
    const benefitsLists = blocks.filter(b => b._type === 'benefits-list');
    const avantajlar1 = benefitsLists[0]; // AVANTAJLAR - Siskon Otomasyon Çözümleri Size Ne Sağlar?
    const surecYolHar = benefitsLists[1]; // SÜREÇ YOL HARİTASI
    const avantajlar2 = benefitsLists[2]; // AVANTAJLAR - Ne Tür Otomasyon Çözümleri Sunuyoruz?

    const twoColBlocks = blocks.filter(b => b._type === 'two-col-section');
    const plcHmiBlock  = twoColBlocks[0]; // PLC ve HMI
    const scadaBlock   = twoColBlocks[1]; // SCADA

    if (avantajlar1) {
      out.benefits      = avantajlar1.eyebrow;
      out.benefitsTitle = avantajlar1.title;
      if (avantajlar1.listTitle) out.benefitsListTitle = avantajlar1.listTitle;
      if (avantajlar1.items?.length) out.features = avantajlar1.items;
      if (avantajlar1.image) out.benefitsImage = avantajlar1.image;
    }
    if (surecYolHar) {
      out.roadmap        = surecYolHar.eyebrow;
      out.roadmapTitle   = surecYolHar.title;
      if (surecYolHar.listTitle) out.roadmapListTitle = surecYolHar.listTitle;
      if (surecYolHar.items?.length) {
        // Strapi'den düz string dizisi gelir, component {titleLine1, titleLine2} bekler
        out.steps = surecYolHar.items.map(item => {
          if (typeof item === 'object' && item.titleLine1) return item;
          // String'i iki satıra böl — kelimelerin ortasından
          const words = String(item).split(' ');
          const mid = Math.ceil(words.length / 2);
          return {
            titleLine1: words.slice(0, mid).join(' '),
            titleLine2: words.slice(mid).join(' ') || '',
            title: String(item),
          };
        });
      }
    }
    if (avantajlar2) {
      out.capabilitiesEyebrow = avantajlar2.eyebrow;
      out.capabilitiesTitle   = avantajlar2.title;
      if (avantajlar2.listTitle) out.capabilitiesListTitle = avantajlar2.listTitle;
      if (avantajlar2.items?.length) out.capabilities = avantajlar2.items;
      if (avantajlar2.image) out.capabilitiesImage = avantajlar2.image;
    }
    if (plcHmiBlock) {
      out.plcHmiEyebrow = plcHmiBlock.eyebrow;
      out.plcHmi        = plcHmiBlock.title;
      out.plcHmiSpot    = plcHmiBlock.spot;
      out.plcHmiDesc    = plcHmiBlock.desc;
      if (plcHmiBlock.image) out.plcHmiImage = plcHmiBlock.image;
      if (plcHmiBlock.secondaryImage) out.plcHmiSecondaryImage = plcHmiBlock.secondaryImage;
    }
    if (scadaBlock) {
      out.scadaEyebrow = scadaBlock.eyebrow;
      out.scada        = scadaBlock.title;
      out.scadaSpot    = scadaBlock.spot;
      out.scadaDesc    = scadaBlock.desc;
      if (scadaBlock.image) out.scadaImage = scadaBlock.image;
    }
  },

  // ── İzlenebilirlik Çözümleri ────────────────────────────────────────────────
  'izlenebilirlik-cozumleri': (blocks, out) => {
    const benefitsLists = blocks.filter(b => b._type === 'benefits-list');
    const avantajlar = benefitsLists[0];
    const nitelikler = benefitsLists[1];
    const cardGrid = blocks.find(b => b._type === 'card-grid');

    if (avantajlar) {
      out.benefits = avantajlar.eyebrow;
      out.benefitsTitle = avantajlar.title;
      if (avantajlar.listTitle) out.benefitsListTitle = avantajlar.listTitle;
      if (avantajlar.items?.length) out.features = avantajlar.items;
      if (avantajlar.image) out.benefitsImage = avantajlar.image;
    }
    if (nitelikler) {
      out.qualifications = nitelikler.eyebrow;
      out.qualificationsTitle = nitelikler.title;
      if (nitelikler.listTitle) out.qualificationsListTitle = nitelikler.listTitle;
      if (nitelikler.items?.length) out.technicalFeatures = nitelikler.items;
      if (nitelikler.image) out.qualificationsImage = nitelikler.image;
    }
    if (cardGrid) {
      if (cardGrid.eyebrow) out.sectorDetails = cardGrid.eyebrow;
      if (cardGrid.title) out.components = cardGrid.title;
      if (cardGrid.cards?.length) {
        out.sectorDetailCards = cardGrid.cards.map(card => ({
          title:    card.title ?? '',
          titleSub: card.titleSub ?? '',
          spot:     card.spot ?? '',
          desc:     card.desc ?? '',
          icon:     card.icon ?? '',
          image:    card.image ?? '',
          imageAlt: card.imageAlt ?? '',
        }));
      }
    }
  },

  // ── Microsoft Çözümleri ─────────────────────────────────────────────────────
  'microsoft-cozumleri': (blocks, out) => {
    const kazanimlar = blocks.find(b => b._type === 'benefits-list' && /kazanım|kazanim/i.test(b.eyebrow));
    const lisanslar  = blocks.find(b => b._type === 'benefits-list' && /lisans/i.test(b.eyebrow));
    const twoCol     = blocks.find(b => b._type === 'two-col-section');
    const cardGrid   = blocks.find(b => b._type === 'card-grid');
    if (kazanimlar) {
      out.benefitsEyebrow = kazanimlar.eyebrow;
      out.benefitsTitle   = kazanimlar.title;
      if (kazanimlar.listTitle) out.benefitsListTitle = kazanimlar.listTitle;
      if (kazanimlar.items?.length) out.benefits = kazanimlar.items;
      if (kazanimlar.image) out.benefitsImage = kazanimlar.image;
    }
    if (lisanslar) {
      out.licensesEyebrow = lisanslar.eyebrow;
      out.licensesTitle   = lisanslar.title;
      if (lisanslar.listTitle) out.licensesListTitle = lisanslar.listTitle;
      if (lisanslar.items?.length) out.licenses = lisanslar.items;
      if (lisanslar.image) out.licensesImage = lisanslar.image;
    }
    if (twoCol) {
      if (twoCol.eyebrow) out.powerPlatformEyebrow = twoCol.eyebrow;
      if (twoCol.title)   out.powerPlatformTitle   = twoCol.title;
      if (twoCol.spot)    out.powerPlatformSpot    = twoCol.spot;
      if (twoCol.desc)    out.powerPlatformDesc    = twoCol.desc;
      if (twoCol.image)   out.powerPlatformImage   = twoCol.image;
      if (twoCol.secondaryImage) out.powerPlatformSecondaryImage = twoCol.secondaryImage;
    }
    if (cardGrid) {
      out.solutionsTitle = cardGrid.title;
      if (cardGrid.desc) out.serviceSectionDesc = cardGrid.desc;
      if (cardGrid.cards?.length) {
        out.platformLogos = cardGrid.cards.map(card => ({
          title:    card.title ?? '',
          icon:     card.icon ?? '',
          image:    card.image ?? '',
          imageAlt: card.imageAlt ?? '',
        }));
      }
    }
  },

  // ── Müşteriye Özel Yazılım ──────────────────────────────────────────────────
  'musteriye-ozel-yazilim': (blocks, out) => {
    const benefitsLists = blocks.filter(b => b._type === 'benefits-list');
    const kazanimlar = benefitsLists[0]; // Kazanımlar
    const yetkinlik  = benefitsLists[1]; // Yetkinlikler
    const ozellikler = benefitsLists[2]; // Özellikler (Entegrasyon)

    if (kazanimlar) {
      out.benefitsEyebrow = kazanimlar.eyebrow;
      out.benefitsTitle   = kazanimlar.title;
      if (kazanimlar.listTitle) out.benefitsListTitle = kazanimlar.listTitle;
      if (kazanimlar.items?.length) out.benefits = kazanimlar.items;
      if (kazanimlar.image) out.benefitsImage = kazanimlar.image;
    }
    if (yetkinlik) {
      out.capabilitiesEyebrow = yetkinlik.eyebrow;
      out.capabilitiesTitle   = yetkinlik.title;
      if (yetkinlik.listTitle) out.capabilitiesListTitle = yetkinlik.listTitle;
      if (yetkinlik.items?.length) out.capabilities = yetkinlik.items;
      if (yetkinlik.image) out.capabilitiesImage = yetkinlik.image;
    }
    if (ozellikler) {
      out.integrationsEyebrow = ozellikler.eyebrow;
      out.integrationsTitle   = ozellikler.title;
      if (ozellikler.listTitle) out.integrationsListTitle = ozellikler.listTitle;
      if (ozellikler.items?.length) out.integrations = ozellikler.items;
      if (ozellikler.image) out.integrationsImage = ozellikler.image;
    }
  },

  // ── Eğitim & Danışmanlık ────────────────────────────────────────────────────
  'egitim-danismanlik': (blocks, out) => {
    const egitim = blocks.find(b => b._type === 'benefits-list');
    if (egitim) {
      out.topicsEyebrow = egitim.eyebrow;
      out.topicsTitle   = egitim.title;
      if (egitim.listTitle) out.topicsListTitle = egitim.listTitle;
      if (egitim.items?.length) out.topics = egitim.items;
      if (egitim.image) out.topicsImage = egitim.image;
    }
  },

  // ── Velotic ─────────────────────────────────────────────────────────────────
  'velotic': (blocks, out) => {
    const benefitsLists = blocks.filter(b => b._type === 'benefits-list');
    const kazanimlar = benefitsLists[0]; // Kazanımlar
    const yetkinlik  = benefitsLists[1]; // Yetkinlikler

    if (kazanimlar) {
      out.benefitsEyebrow = kazanimlar.eyebrow;
      out.benefitsTitle   = kazanimlar.title;
      if (kazanimlar.listTitle) out.benefitsListTitle = kazanimlar.listTitle;
      if (kazanimlar.items?.length) out.benefits = kazanimlar.items;
      if (kazanimlar.image) out.benefitsImage = kazanimlar.image;
    }
    if (yetkinlik) {
      out.solutionsEyebrow = yetkinlik.eyebrow;
      out.solutionsTitle   = yetkinlik.title;
      if (yetkinlik.listTitle) out.solutionsListTitle = yetkinlik.listTitle;
      if (yetkinlik.items?.length) out.solutions = yetkinlik.items;
      if (yetkinlik.image) out.solutionsImage = yetkinlik.image;
    }
  },

};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getFallback(slug, locale) {
  const map = FALLBACKS[slug];
  if (!map) return {};
  return map[locale] ?? map.tr ?? {};
}

function mergeWithFallback(strapiData, fallback) {
  const merged = { ...fallback };
  if (!strapiData) return merged;
  for (const key of Object.keys(strapiData)) {
    const val = strapiData[key];
    // Bos array, null, undefined veya bos string → fallback'i koru
    if (val === null || val === undefined || val === '') continue;
    if (Array.isArray(val) && val.length === 0) continue;
    merged[key] = val;
  }
  return merged;
}

// ─── Populate Query ──────────────────────────────────────────────────────────

// Strapi v5: Dynamic zone component'leri için 'on' populate kullanarak
// sadece gerekli alanları çeker. card-grid için populate=* gerekli çünkü
// Strapi nested component media field'larını [fields] ile doğru çıkarmıyor.
const POPULATE_QUERY = [
  // benefits-list: items (text-item) + image (url)
  'populate[content][on][hizmetler.benefits-list][populate][items][populate]=*',
  'populate[content][on][hizmetler.benefits-list][populate][image][fields][0]=url',
  'populate[content][on][hizmetler.benefits-list][populate][image][fields][1]=alternativeText',
  // card-grid: cards → icon + image (sadece url)
  'populate[content][on][hizmetler.card-grid][populate][cards][populate][icon][fields][0]=url',
  'populate[content][on][hizmetler.card-grid][populate][cards][populate][image][fields][0]=url',
  'populate[content][on][hizmetler.card-grid][populate][cards][populate][image][fields][1]=alternativeText',
  // two-col-section: image + secondaryImage (sadece url)
  'populate[content][on][hizmetler.two-col-section][populate][image][fields][0]=url',
  'populate[content][on][hizmetler.two-col-section][populate][image][fields][1]=alternativeText',
  'populate[content][on][hizmetler.two-col-section][populate][secondaryImage][fields][0]=url',
  'populate[content][on][hizmetler.two-col-section][populate][secondaryImage][fields][1]=alternativeText',
  // step-roadmap: adım isimleri yeterli, görsel yok
  'populate[content][on][hizmetler.step-roadmap][populate][steps][populate]=*',
  // more-image: sadece url
  'populate[content][on][hizmetler.more-image][populate][image][fields][0]=url',
  'populate[content][on][hizmetler.more-image][populate][image][fields][1]=alternativeText',
  // dual-list: metin listeleri, görsel yok
  'populate[content][on][hizmetler.dual-list][populate][list1Items][populate]=*',
  'populate[content][on][hizmetler.dual-list][populate][list2Items][populate]=*',
  // heroImage: sadece url + alternativeText
  'populate[heroImage][fields][0]=url',
  'populate[heroImage][fields][1]=alternativeText',
].join('&');


// ─── Ana Servis Fonksiyonu ────────────────────────────────────────────────────

/**
 * Hizmetler collection type'ından slug'a göre sayfa verisi çeker.
 * Strapi erişilemezse veya entry yoksa JSON fallback döner.
 *
 * @param {string} slug  - Hizmet slug'ı (ör: 'iiot', 'ai-makine-ogrenmesi')
 * @param {'tr'|'en'|'ro'} locale
 * @returns {Promise<object>}
 */
export async function getHizmetPage(slug, locale = 'ro') {
  const fallback = getFallback(slug, locale);

  try {
    let res = await strapiGet(
      `hizmetlers?filters[slug][$eq]=${slug}&locale=${locale}&${POPULATE_QUERY}`
    );


    if (!res || !res.data) return fallback;

    const raw = Array.isArray(res.data) ? res.data[0] : res.data;
    if (!raw) return fallback;

    const d = attrs(raw);

    // Ana sayfa alanları
    const strapiData = {
      // JSON fallback key'leriyle eslestir (pt('title'), pt('subtitle') vb.)
      title: d.heroTitle ?? null,  // JSON: title
      subtitle: d.heroSubtitle ?? null,  // JSON: subtitle
      description: d.heroDescription ?? null,  // JSON: description
      // Strapi-ozel key'ler de ekle (bazi sayfalar bunlari kullanabilir)
      heroTitle: d.heroTitle ?? null,
      heroSubtitle: d.heroSubtitle ?? null,
      heroDescription: d.heroDescription ?? null,
      // heroImage Strapi uploads'tan çekilir
      heroImage: extractMediaUrl(d.heroImage),
      serviceLabel: d.serviceLabel ?? null,
      showMore: d.showMore ?? null,
      showLess: d.showLess ?? null,
      // breadcrumbHome / breadcrumbServices Strapi'de yok → JSON fallback'ten gelir
      ctaTitle: d.ctaTitle ?? null,
      ctaDesc: d.ctaDesc ?? d.ctaDescription ?? null,
      ctaButton: d.ctaButton ?? null,
    };

    // Dynamic zone blokları — alan adı: content
    const rawBlocks = Array.isArray(d.content) ? d.content : [];
    const blocks = rawBlocks.map(normalizeBlock).filter(Boolean);

    // Per-page block mapping uygula
    if (BLOCK_MAPPINGS[slug] && blocks.length > 0) {
      BLOCK_MAPPINGS[slug](blocks, strapiData);
    }

    return mergeWithFallback(strapiData, fallback);
  } catch (err) {
    console.error(`[Strapi] getHizmetPage(${slug}, ${locale}) error:`, err?.message ?? err);
    return fallback;
  }
}

// ─── Kısayol Export'lar ───────────────────────────────────────────────────────

export const getAiMakineOgrenmesi = (locale) => getHizmetPage('ai-makine-ogrenmesi', locale);
export const getIiotPage = (locale) => getHizmetPage('iiot', locale);
export const getGoruntuIsleme = (locale) => getHizmetPage('goruntu-isleme', locale);
export const getMakineProsesOtomasyonu = (locale) => getHizmetPage('makine-proses-otomasyonu', locale);
export const getIzlenebilirlikCozumleri = (locale) => getHizmetPage('izlenebilirlik-cozumleri', locale);
export const getMicrosoftCozumleri = (locale) => getHizmetPage('microsoft-cozumleri', locale);
export const getMusteriyeOzelYazilim = (locale) => getHizmetPage('musteriye-ozel-yazilim', locale);
export const getEgitimDanismanlik = (locale) => getHizmetPage('egitim-danismanlik', locale);
export const getVelotic = (locale) => getHizmetPage('velotic', locale);
export const getRobotCozumleri = (locale) => getHizmetPage('robot-cozumleri', locale);
