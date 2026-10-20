import Image from 'next/image';
import AnimatedButton from '../AnimatedButton';
import { toLocalizedPath } from '../../lib/i18n/routes';

/**
 * Ana sayfa Hero bölümü — Server Component
 * Strapi'den gelen data prop'u ile çalışır.
 *
 * Tek yapı: mobil ve masaüstü aynı DOM'u paylaşır, farklar responsive sınıflarla yönetilir.
 * Başlık hiyerarşisi: <h1> = heroTitle, tagline = <p>.
 */
export default function HeroSection({ data, locale }) {
  const localizePath = (path) => toLocalizedPath(path, locale);

  return (
    <section className="hero-section min-h-screen h-[100dvh] flex items-center relative overflow-hidden">
      {/* Mobil arka plan */}
      <Image
        src="/images/homepage_back_mobile.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="object-cover opacity-20 mix-blend-luminosity pointer-events-none lg:hidden"
        style={{ objectPosition: 'center center' }}
        sizes="100vw"
        quality={60}
      />
      {/* Masaüstü arka plan */}
      <Image
        src="/images/homepage_back.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="hidden lg:block object-cover opacity-15 mix-blend-luminosity pointer-events-none"
        style={{ objectPosition: 'center right' }}
        sizes="100vw"
        quality={60}
      />
      {/* Alt degrade katmanı */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A192F]/40"
        aria-hidden="true"
      />

      <div className="container-wide w-full relative z-10 px-4 lg:pr-8">
        <div className="mx-auto lg:mx-0 w-full max-w-[420px] md:max-w-[640px] lg:max-w-3xl text-center lg:text-left space-y-6 lg:space-y-7 pt-12 pb-10 lg:py-0">
          <div className="space-y-3">
            <h1
              className="text-[clamp(1.3rem,6.9vw,2.5rem)] md:text-[3.2rem] lg:text-[3.55rem] font-black leading-[1.1] md:leading-[1.04] tracking-tight drop-shadow-2xl"
              style={{ color: '#D9ECFE' }}
            >
              {data.heroTitle}
            </h1>
            <p
              className="text-[clamp(1.25rem,6.6vw,2.2rem)] md:text-4xl lg:text-5xl font-black text-white leading-[1.2] md:leading-[1.12] tracking-tight drop-shadow-2xl"
              style={{ fontWeight: 900, opacity: 1, color: '#FFFFFF' }}
            >
              {data.heroTaglineLine1}
              <br />
              {data.heroTaglineLine2}
            </p>
          </div>

          {/* Mobil + tablet: çark görseli için ayrılan alan (başlık üstte, açıklama + buton altta) */}
          <div className="lg:hidden h-[22vh] min-h-[150px] max-h-[200px] md:h-[30vh] md:min-h-[190px] md:max-h-[320px]" aria-hidden="true" />

          <div className="w-full max-w-[643px] mx-auto lg:mx-0 bg-white/5 md:backdrop-blur-2xl border border-white/10 rounded-[22px] md:rounded-[28px] p-5 md:p-8 shadow-2xl">
            <p
              className="text-[0.9rem] md:text-[1.03rem] text-white leading-[1.7] font-normal opacity-90 text-left hero-subtitle hero-description"
              lang={locale}
              style={{ color: '#FFFFFF' }}
            >
              {data.heroDescription}
            </p>
          </div>

          <div className="cta-group flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
            <AnimatedButton
              href={localizePath('/kurumsal/bizi-taniyin')}
              className="w-[164px] md:w-auto md:px-10 text-[0.84rem] md:text-base py-2.5 !bg-[#1B3A63] !text-white border-none shadow-lg"
              style={{ backgroundColor: '#1B3A63', color: '#FFFFFF' }}
            >
              {data.aboutUsButton}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
