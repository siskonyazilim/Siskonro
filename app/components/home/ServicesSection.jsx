import Link from 'next/link';
import SmartImage from '../SmartImage';
import AnimatedButton from '../AnimatedButton';
import { toLocalizedPath } from '../../lib/i18n/routes';
import { SERVICE_CATALOG } from '../../../config/services';

/**
 * Ana sayfa Hizmetler bölümü — Server Component
 * Strapi'den gelen data.services + data.serviceCards verisiyle çalışır.
 */
export default function ServicesSection({ data, locale }) {
  const localizePath = (path) => toLocalizedPath(path, locale);
  const serviceLocale = locale === 'ro' ? 'ro' : locale === 'en' ? 'en' : 'tr';

  // Hizmet başlıklarını SERVICE_CATALOG'dan locale'e göre al
  const services = (data.services ?? []).map((s) => {
    const catalog = SERVICE_CATALOG.find((c) => c.href === s.href);
    return { ...s, title: catalog ? catalog.names[serviceLocale] : s.href };
  });

  return (
    <section className="py-12 md:py-20 px-6">
      <div className="container-wide">
        {/* Bölüm başlığı */}
        <div className="section-head reveal text-center max-w-5xl mx-auto mb-14">
          <span className="eyebrow">{data.servicesEyebrow}</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            {data.servicesTitle}
          </h2>
          <p className="text-slate-500 text-lg max-w-4xl mx-auto mt-6">
            {data.servicesDescription}
          </p>
        </div>

        {/* Hizmet kartları grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const lockCtaRow = [
              '/hizmetler/musteriye-ozel-yazilim',
              '/hizmetler/iiot',
              '/hizmetler/makine-proses-otomasyonu',
            ].includes(service.href);

            return (
              <Link
                key={service.num}
                href={localizePath(service.href)}
                className="card reveal group h-full flex flex-col cursor-pointer transition-transform duration-300 hover:-translate-y-1 focus-ring-card"
                aria-label={`${service.title} - ${data.exploreDetailsLabel}`}
              >
                <div className="card-media card-media--light card-media--service h-72 sm:h-80">
                  <SmartImage
                    src={service.img}
                    alt={service.title}
                    fill
                    className="object-contain p-2 sm:p-3 drop-shadow-[0_16px_28px_rgba(14,165,233,0.28)]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fallbackLabel={data.imageUnavailable}
                  />
                </div>
                <div className="card-body flex flex-col text-center">
                  <h3 className={`text-2xl font-bold text-slate-900 leading-tight mb-3 ${lockCtaRow ? 'min-h-[4.5rem]' : ''}`}>
                    {service.title}
                  </h3>
                  <p className={`text-slate-600 mb-3 ${lockCtaRow ? 'min-h-[5.5rem]' : ''}`}>
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center justify-center gap-2 text-sky-700 font-semibold">
                    {data.exploreDetails}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Tüm Hizmetler CTA kartı */}
          <div
            className="card reveal animated-card"
            data-tilt="true"
            style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0EA5E9 100%)', color: '#fff' }}
          >
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 280 }}>
              <span className="eyebrow" style={{ color: '#7dd3fc' }}>{data.allServicesEyebrow}</span>
              <h3 style={{ color: '#fff' }}>{data.allServicesTitle}</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)' }}>{data.allServicesDescription}</p>
              <AnimatedButton href={localizePath('/hizmetler')} style={{ alignSelf: 'flex-start', marginTop: 12 }}>
                {data.allServicesButton}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
