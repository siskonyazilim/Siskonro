import Image from 'next/image';

/**
 * Ana sayfa Referanslar bölümü — Server Component
 * Strapi'den gelen data.references verisiyle çalışır.
 * Logo Strapi'de yoksa JSON fallback'ten tamamlanır (home.js servisinde).
 */
export default function ReferencesSection({ data }) {
  const references = data.references ?? [];

  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-wide px-6">
        <div className="section-head reveal text-center max-w-4xl mx-auto mb-10">
          <span className="eyebrow">{data.referencesEyebrow}</span>
          <h2 className="text-3xl md:text-5xl font-black" style={{ color: '#0e192f' }}>
            {data.referencesTitle}
          </h2>
        </div>
      </div>

      {/* Marquee logo bandı — tam ekran genişliği */}
      <div className="overflow-hidden reveal py-6 w-full">
        <div className="animate-marquee flex items-center gap-14 md:gap-20">
          {[...references, ...references].map((ref, idx) => (
            <div
              key={`${ref.name}-${idx}`}
              className="flex-shrink-0 w-[200px] md:w-[280px] h-[96px] md:h-[120px] rounded-xl px-6 flex items-center justify-center transition-shadow duration-300 hover:shadow-md"
              style={{ border: '1px solid rgba(14,25,47,0.10)' }}
            >
              {ref.logo ? (
                <Image
                  src={ref.logo}
                  alt={ref.name}
                  width={220}
                  height={80}
                  className="max-h-14 md:max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  unoptimized
                />
              ) : (
                <span className="text-sm font-semibold text-center" style={{ color: '#0e192f' }}>{ref.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
