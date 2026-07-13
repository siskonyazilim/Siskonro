'use client';

import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import PageHero from '../../components/PageHero';
import { useLanguage } from '../../_context/LanguageContext';
import { COMMON_CHALLENGES, getSectorBySlug, REFERENCE_LOGO_MAP } from '../../lib/content/sectorsContent';

const EN_TO_TR_SECTOR_SLUG = {
  tobacco: 'tutun',
  automotive: 'otomotiv',
  'white-goods': 'beyaz-esya',
  'food-beverage': 'gida-icecek',
  pharmaceutical: 'ilac',
  'machinery-automation': 'makine-otomasyon',
  textile: 'tekstil',
  'energy-chemicals': 'enerji-kimya',
};

function normalizeSectorSlug(slug) {
  return EN_TO_TR_SECTOR_SLUG[slug] || slug;
}

function NotFoundContent({ isEn, isRo, localizePath }) {
  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={isRo ? 'Sectorul nu a fost găsit' : isEn ? 'Sector not found' : 'Sektör bulunamadı'}
        subtitle={isRo ? 'Sectorul solicitat nu a putut fi găsit.' : isEn ? 'The requested sector could not be found.' : 'İstenen sektör kaydı bulunamadı.'}
        breadcrumbs={isRo ? ['Acasă', 'Sectoare'] : isEn ? ['Home', 'Sectors'] : ['Ana Sayfa', 'Sektörler']}
      />
      <section className="py-16 px-6">
        <div className="container max-w-3xl">
          <Link
            href={localizePath('/sektorler')}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-slate-700 font-semibold hover:border-slate-400 hover:bg-white transition-colors"
          >
            {isRo ? 'Înapoi la toate sectoarele' : isEn ? 'Back to all sectors' : 'Tüm sektörlere dön'}
          </Link>
        </div>
      </section>
    </div>
  );
}

function ChallengeGrid({ isEn, isRo }) {
  return (
    <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
      {COMMON_CHALLENGES.map((challenge) => {
        const challengeContent = isRo ? challenge.ro : isEn ? challenge.en : challenge.tr;
        return (
          <article key={challenge.code} className="py-5">
            <p className="text-sky-600 font-extrabold text-sm">{challenge.code}</p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{challengeContent.title}</h3>
            <p className="mt-2 text-slate-600 leading-relaxed">{challengeContent.description}</p>
          </article>
        );
      })}
    </div>
  );
}

function ReferenceLogos({ references }) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {references.map((item) => {
        const logoSrc = REFERENCE_LOGO_MAP[item];
        if (logoSrc) {
          return (
            <span
              key={item}
              className="h-[180px] rounded-3xl border border-slate-200 bg-white inline-flex items-center justify-center px-6 py-8"
              title={item}
            >
              <Image
                src={logoSrc}
                alt={item}
                width={320}
                height={120}
                className="max-h-[92px] w-auto max-w-full object-contain"
              />
            </span>
          );
        }

        return (
          <span
            key={item}
            className="h-[180px] rounded-3xl border border-slate-200 bg-slate-50 inline-flex items-center justify-center text-slate-400"
            title={item}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 18h16M7 18V8l5-3 5 3v10M9 18v-4h6v4" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}

NotFoundContent.propTypes = {
  isEn: PropTypes.bool.isRequired,
  isRo: PropTypes.bool,
  localizePath: PropTypes.func.isRequired,
};

ChallengeGrid.propTypes = {
  isEn: PropTypes.bool.isRequired,
  isRo: PropTypes.bool,
};

ReferenceLogos.propTypes = {
  references: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function SectorDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const { locale, localizePath } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  const slugFromParams = typeof params?.slug === 'string' ? params.slug : '';
  const pathnameParts = String(pathname || '').split('/').filter(Boolean);
  const slugFromPathname = pathnameParts.at(-1) || '';
  const slug = normalizeSectorSlug(slugFromParams || slugFromPathname);

  const sector = getSectorBySlug(slug);

  if (!sector) {
    return <NotFoundContent isEn={isEn} isRo={isRo} localizePath={localizePath} />;
  }

  const content = isRo ? sector.ro : isEn ? sector.en : sector.tr;

  return (
    <div className="bg-white min-h-screen">
      <PageHero
        title={content.title}
        subtitle={content.metrics}
        breadcrumbs={isRo ? ['Acasă', 'Sectoare', content.title] : isEn ? ['Home', 'Sectors', content.title] : ['Ana Sayfa', 'Sektörler', content.title]}
      />

      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="container max-w-5xl">
          <section>
            <p className="text-xs font-semibold tracking-wide uppercase text-sky-600">{content.pack}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{isRo ? 'Prezentare Generală' : isEn ? 'Sector Overview' : 'Sektör Özeti'}</h2>
            <p className="mt-5 text-lg text-body-muted leading-relaxed">{content.summary}</p>
            {content.detail ? <p className="mt-4 text-body-muted leading-relaxed">{content.detail}</p> : null}
          </section>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-50 border-y border-slate-200">
        <div className="container max-w-5xl">
          <h3 className="text-2xl font-bold text-slate-900">{isRo ? 'Capacități Cheie' : isEn ? 'Key capabilities' : 'Temel yetkinlikler'}</h3>
          <ul className="mt-5 space-y-3 list-disc list-inside text-body-muted">
            {content.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="container max-w-5xl">
          <h3 className="text-2xl font-bold text-slate-900">{isRo ? 'Referințe' : isEn ? 'References' : 'Referanslar'}</h3>
          <p className="mt-2 text-slate-600">
            {isRo 
              ? 'Referințele selectate sunt afișate cu vizualuri ale logo-urilor din biblioteca de mărci.'
              : isEn
              ? 'Selected references are displayed with logo visuals from the brand library.'
              : 'Seçili referanslar marka kütüphanesindeki logo görselleri ile gösterilir.'}
          </p>
          <ReferenceLogos references={content.references} />
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {isRo ? 'Probleme comune rezolvate de aceeași bază' : isEn ? 'Shared problems solved by the same backbone' : 'Aynı omurga ile çözülen ortak problemler'}
          </h2>
          <ChallengeGrid isEn={isEn} isRo={isRo} />

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={localizePath('/iletisim#contact-form')}
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-white font-semibold hover:bg-sky-700 transition-colors"
            >
              {isRo ? 'Contactați-ne' : isEn ? 'Contact us' : 'Bizimle iletişime geçin'}
            </Link>
            <Link
              href={localizePath('/sektorler')}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-slate-700 font-semibold hover:border-slate-400 hover:bg-white transition-colors"
            >
              {isRo ? 'Înapoi la toate sectoarele' : isEn ? 'Back to all sectors' : 'Tüm sektörlere dön'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
