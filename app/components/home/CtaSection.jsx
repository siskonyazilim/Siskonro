import AnimatedButton from '../AnimatedButton';
import { toLocalizedPath } from '../../lib/i18n/routes';

/**
 * Ana sayfa CTA (Call-to-Action) bölümü — Server Component
 * Strapi'den gelen data prop'u ile çalışır.
 */
export default function CtaSection({ data, locale }) {
  const localizePath = (path) => toLocalizedPath(path, locale);

  return (
    <section className="cta-section cta-band py-12 md:py-20 bg-white">
      <div className="container-wide px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">
          {data.ctaTitle}
        </h2>
        <p className="text-slate-600 mt-5 text-lg">
          {data.ctaDescription}
        </p>
        <AnimatedButton
          href={`${localizePath('/iletisim')}#contact-form`}
          className="mt-8"
        >
          {data.ctaButton}
        </AnimatedButton>
      </div>
    </section>
  );
}
