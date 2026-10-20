import Image from 'next/image';
import Link from 'next/link';
import SmartImage from '../SmartImage';
import AnimatedButton from '../AnimatedButton';
import { toLocalizedPath } from '../../lib/i18n/routes';

/**
 * Ana sayfa OnSuite bölümü — Server Component
 * Strapi'den gelen data.products[0] verisiyle çalışır.
 */
export default function OnSuiteSection({ data, locale }) {
  const localizePath = (path) => toLocalizedPath(path, locale);
  const onsuite = (data.products ?? [])[0];
  // Strapi'den gelen onSuite görseli → products[0].img → statik fallback
  const onsuiteSrc = data.onSuiteImage || onsuite?.img || '/assets/new/urunler/onsuite/OnsuiteNew.webp';

  return (
    <section className="section-alt py-12 md:py-20 px-6 bg-slate-50">
      <div className="container-wide">
        {/* OnSuite logo */}
        <div className="section-head reveal text-center max-w-5xl mx-auto mb-10 flex flex-col items-center">
          <div className="relative w-[200px] sm:w-[260px] h-[48px] sm:h-[60px]">
            <Image
              src="/assets/new/urunler/onsuite/onsuite_org.svg"
              alt="OnSuite Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* İçerik grid */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Sol — ürün görseli */}
          <div className="lg:col-span-7">
            <Link href={localizePath('/onsuite')} className="block group">
              <div className="relative w-full h-[260px] sm:h-[360px] md:h-[440px] lg:h-[520px]">
                <SmartImage
                  src={onsuiteSrc}
                  alt={onsuite?.title || 'OnSuite'}
                  fill
                  className="object-contain object-center lg:object-left transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  fallbackLabel={data.imageUnavailable}
                />
              </div>
            </Link>
          </div>

          {/* Sağ — açıklama */}
          <div className="lg:col-span-5">
            <div className="p-2 md:p-3 lg:p-4 text-center lg:text-left">
              <div className="space-y-5 text-slate-600 text-base md:text-lg leading-relaxed mb-8 font-archivo">
                <p lang={locale}>{data.onSuiteSectionDesc1}</p>
                <p lang={locale}>{data.onSuiteSectionDesc2}</p>
              </div>
              <AnimatedButton href={localizePath('/onsuite')}>
                {data.discoverOnSuiteButton}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
