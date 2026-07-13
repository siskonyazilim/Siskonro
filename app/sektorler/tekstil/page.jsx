'use client';

import SectorDetailTemplate from '../../components/SectorDetailTemplate';

const CONTENT = {
  tr: {
    title: 'Tekstil & Konfeksiyon',
    metrics: 'Reçete · Batch İzlenebilirlik · Enerji Yoğun Proses',
    pack: 'Textile Production Intelligence',
    sectorLabel: 'Sektör 07',
    industryTitle: 'Tekstil & Konfeksiyon',
    summary:
      'Tekstil; elyaftan ipliğe, iplikten kumaşa, kumaştan mamule uzanan çok katmanlı bir üretim zinciridir. Her katmanda parti, reçete ve operatör değişir; boyahane ise sektörün en enerji yoğun proseslerinden biridir. Siskon, bu zincirin her halkasında veriyi sahadan toplayıp boya kazanından kumaş topuna, vardiyadan buhar tüketimine ortak bir veri omurgasına bağlar.',
    referencesTitle: 'Çözüm Ortakları',
    needs: [
      {
        title: 'Batch traceability',
        description: 'Elyaf → iplik → kumaş → mamul parti zinciri, kumaş topu bazında izleme.',
      },
      {
        title: 'Boya reçete doğrulama',
        description: 'Kazan reçetesi, dozaj, renk standardı (dE) doğrulaması.',
      },
      {
        title: 'Enerji ve buhar/su izleme',
        description: 'Boyahanenin elektrik, doğalgaz, buhar ve su tüketim verisi.',
      },
      {
        title: 'Lot bazlı kalite kontrol',
        description: 'Kumaş topu defekt haritası, kalite sınıfı, reddiyet kayıtları.',
      },
      {
        title: 'Operatör & vardiya performansı',
        description: 'Tezgâh, operatör, vardiya bazında üretim ve fire takibi.',
      },
    ],
    solutions: [
      {
        title: 'OnSuite Connect',
        description: 'Dokuma, örme, boyahane PLC ve tezgâh kontrolcülerinden veri toplama.',
      },
      {
        title: 'OnSuite Trace',
        description: 'Parti, kazan, kumaş topu seviyesinde izlenebilirlik.',
      },
      {
        title: 'OnSuite Live + Optima',
        description: 'Tezgâh bazında üretim panosu, OEE, MTBF analitiği.',
      },
      {
        title: 'OnSuite Energy',
        description: 'Boyahane elektrik, gaz, buhar ve su tüketim izleme.',
      },
      {
        title: 'OnSuite Forms (DSF)',
        description: 'Kalite kontrol formları, vardiya devir kayıtları, denetim listeleri.',
      },
      {
        title: 'Reçete & Doküman Yönetimi',
        description: 'Boya reçeteleri, renk standartları, müşteri spesifikasyonları.',
      },
    ],
    results: [
      {
        title: 'Renk doğruluğunda iyileşme',
        description: 'Reçete doğrulamayla ilk üretimde renk tutma oranı artar.',
      },
      {
        title: 'Enerji ve buhar tasarrufu',
        description: 'Görünür hale gelen tüketim ile boyahane verimsizlikleri tespit edilir.',
      },
      {
        title: 'Kumaş topu seviyesinde izlenebilirlik',
        description: 'Müşteri reklamasyonunda kumaş topu bazında geriye dönüş sağlanır.',
      },
      {
        title: 'Sipariş teslim güvenilirliği',
        description: 'Hangi siparişin hangi durumda olduğu anlık görünür.',
      },
      {
        title: 'Sürdürülebilirlik raporlaması',
        description: 'Marka müşterileri için su, enerji ve karbon verisi raporlanabilir.',
      },
    ],
    references: [],
  },
  en: {
    title: 'Textile & Apparel',
    metrics: 'Recipe · Batch Traceability · Energy-Intensive Process',
    pack: 'Textile Production Intelligence',
    summary:
      'Textile production spans from fiber to finished goods and requires continuous data flow across spinning, weaving, dye-house, and apparel processes.',
    referencesTitle: 'Solution Partners',
    needs: [
      {
        title: 'Batch traceability',
        description: 'Track fiber to yarn to fabric to finished goods with roll-level genealogy.',
      },
      {
        title: 'Dye recipe verification',
        description: 'Validate vessel recipe, dosing, and color standard targets.',
      },
      {
        title: 'Energy and steam/water monitoring',
        description: 'Measure electricity, gas, steam, and water usage in dye-house operations.',
      },
      {
        title: 'Lot-based quality control',
        description: 'Maintain defect maps, quality grades, and rejection records by fabric roll.',
      },
      {
        title: 'Operator and shift performance',
        description: 'Monitor production and scrap trends by machine, operator, and shift.',
      },
    ],
    solutions: [
      {
        title: 'OnSuite Connect',
        description: 'Collect data from weaving, knitting, dye-house PLCs, and machine controllers.',
      },
      {
        title: 'OnSuite Trace',
        description: 'Traceability at batch, vessel, and fabric-roll levels.',
      },
      {
        title: 'OnSuite Live + Optima',
        description: 'Machine-level dashboards, OEE tracking, and MTBF analytics.',
      },
      {
        title: 'OnSuite Energy',
        description: 'Electricity, gas, steam, and water monitoring for dye-house lines.',
      },
      {
        title: 'OnSuite Forms (DSF)',
        description: 'Digital quality forms, shift handover records, and inspection checklists.',
      },
      {
        title: 'Recipe and document governance',
        description: 'Centralized control of dye recipes, color standards, and customer specifications.',
      },
    ],
    results: [
      {
        title: 'Improved color consistency',
        description: 'Recipe validation increases first-pass color matching performance.',
      },
      {
        title: 'Energy and steam savings',
        description: 'Visible consumption patterns reveal inefficiencies in dye-house operations.',
      },
      {
        title: 'Roll-level traceability',
        description: 'Customer complaints can be traced back at fabric-roll granularity.',
      },
      {
        title: 'More reliable order fulfillment',
        description: 'Order status and bottlenecks become instantly visible.',
      },
      {
        title: 'Sustainability reporting readiness',
        description: 'Water, energy, and carbon data can be reported for brand customers.',
      },
    ],
    highlights: ['Batch genealogy', 'Recipe verification', 'Energy visibility'],
    references: [],
  },
};

export default function TekstilPage() {
  return <SectorDetailTemplate content={CONTENT} />;
}
