'use client';

import Link from 'next/link';
import AnimatedButton from '../../components/AnimatedButton';
import { useLanguage } from '../../_context/LanguageContext';
import { usePageLocale } from '../../lib/i18n/usePageLocale';
import PageHero from '../../components/PageHero';
import trLocale from '../../../messages/kurumsal/surdurulebilirlik/tr.json';
import enLocale from '../../../messages/kurumsal/surdurulebilirlik/en.json';
import roLocale from '../../../messages/kurumsal/surdurulebilirlik/ro.json';

/**
 * Sürdürülebilirlik Sayfası — Client Component
 *
 * `data` prop'u server-side Strapi sustainability-page'den gelir.
 * Yoksa JSON fallback ile çalışır.
 */
export default function SustainabilityPageClient({ data, locale }) {
  const { localizePath } = useLanguage();
  const pt = usePageLocale(trLocale, enLocale, roLocale);

  const s = data ?? {};
  const get = (strapiVal, jsonKey) => strapiVal || pt(jsonKey);
  const getArr = (strapiArr, jsonKey) => (strapiArr?.length ? strapiArr : (pt(jsonKey) || []));

  const pageTitle = get(s.pageTitle, 'pageTitle');
  const pageSubtitle = get(s.pageSubtitle, 'pageSubtitle');
  const breadcrumbs = s.breadcrumbs?.length
    ? s.breadcrumbs
    : [pt('breadcrumbHome'), pt('breadcrumbCorporate'), pt('breadcrumbSustainability')];

  const introEyebrow = get(s.introEyebrow, 'introEyebrow');
  const introText = get(s.introText, 'introText');
  const introImage = s.introImage || '/assets/new/kurumsal/surdurebilirlik/Asset40-100.jpg';

  const journeyTitle = get(s.journeyTitle, 'journeyTitle');
  const journeySubtitle = get(s.journeySubtitle, 'journeySubtitle');
  const journeySubtitle2 = get(s.journeySubtitle2, 'journeySubtitle2');
  const journeyDesc = get(s.journeyDesc, 'journeyDesc');
  const journeyIcon = s.journeyIcon || '/assets/new/kurumsal/surdurebilirlik/Asset45.svg';

  const year2000Title = get(s.year2000Title, 'year2000Title');
  const year2000Desc = get(s.year2000Desc, 'year2000Desc');
  const yearsTitle = get(s.yearsTitle, 'yearsTitle');
  const yearsBullets = s.yearsBullets?.length
    ? s.yearsBullets
    : [pt('yearsBullet1'), pt('yearsBullet2'), pt('yearsBullet3'), pt('yearsBullet4')].filter(Boolean);
  const yearsConclusion = get(s.yearsConclusion, 'yearsConclusion');

  const year2022Title = get(s.year2022Title, 'year2022Title');
  const year2022Desc = get(s.year2022Desc, 'year2022Desc');
  const year2023Title = get(s.year2023Title, 'year2023Title');
  const year2023Desc = get(s.year2023Desc, 'year2023Desc');
  const year2024Title = get(s.year2024Title, 'year2024Title');
  const year2024Desc = get(s.year2024Desc, 'year2024Desc');

  const todayTitle = get(s.todayTitle, 'todayTitle');
  const todayBullets = s.todayBullets?.length
    ? s.todayBullets
    : [pt('todayBullet1'), pt('todayBullet2'), pt('todayBullet3'), pt('todayBullet4')].filter(Boolean);
  const todayConclusion = get(s.todayConclusion, 'todayConclusion');
  const summaryText = get(s.summaryText, 'summaryText');

  const futureTitle = get(s.futureTitle, 'futureTitle');
  const futureSubtitle = get(s.futureSubtitle, 'futureSubtitle');
  const futureTagline = get(s.futureTagline, 'futureTagline');
  const futureDesc = get(s.futureDesc, 'futureDesc');
  const futureImage = s.futureImage || '/assets/new/kurumsal/surdurebilirlik/asset-47-100.jpg';

  const ctaTitle = get(s.ctaTitle, 'ctaTitle');
  const ctaDescription = get(s.ctaDescription, 'ctaDescription');
  const ctaButton = get(s.ctaButton, 'ctaButton');

  const dividerL = 'h-[2.5px] flex-1 bg-gradient-to-r from-[#11c9b5] via-[#18d5bf] to-transparent';
  const dividerR = 'h-[2.5px] flex-1 bg-gradient-to-l from-[#11c9b5] via-[#18d5bf] to-transparent';

  return (
    <div className="bg-white">
      <PageHero title={pageTitle} subtitle={pageSubtitle} breadcrumbs={breadcrumbs} />

      {/* ── Intro ── */}
      <section className="py-14 md:py-20 lg:py-24 px-6 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-stretch">
            <div className="reveal order-1">
              <div className="relative rounded-none overflow-hidden shadow-xl h-full min-h-[280px] md:min-h-[380px]">
                <img src={introImage} alt={pt('sustainabilityVisualAlt')} className="w-full h-full object-cover" />
              </div>
            </div>
            <article className="reveal order-2 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 md:p-8 lg:p-10 shadow-sm flex flex-col justify-center">
              {introEyebrow ? <span className="eyebrow text-xs md:text-sm inline-block mb-5">{introEyebrow}</span> : null}
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">{introText}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Yolculuk ── */}
      <section className="pt-[4.75rem] md:pt-[6.25rem] pb-12 md:pb-16 px-6 bg-gradient-to-br from-[#f2fbff] via-[#f7fffd] to-[#edf9ff]">
        <div className="container-wide">
          <div className="space-y-12 md:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.618fr] gap-10 md:gap-14 items-center">
              <div className="reveal flex flex-col items-center md:items-start md:pl-6">
                <img src={journeyIcon} alt={pt('iconAltSustainability')} className="w-[200px] sm:w-[250px] md:w-[320px] h-auto" />
              </div>
              <div className="reveal">
                <h2 className="text-[1.8rem] md:text-[2.2rem] font-black text-[#07aa97] leading-tight mb-4">{journeyTitle}</h2>
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-black text-[#1b4b83] leading-tight mb-5">
                  {journeySubtitle}<br />{journeySubtitle2}
                </h3>
                <p className="text-[#2a4f75] text-base leading-relaxed">{journeyDesc}</p>
              </div>
            </div>

            <div className="reveal flex items-center gap-4 md:gap-8">
              <span className={dividerL} />
              <img src="/assets/new/kurumsal/surdurebilirlik/Asset40.svg" alt={pt('iconAltGlobal')} className="w-[100px] md:w-[130px] h-auto shrink-0" />
              <span className={dividerR} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
              <div className="reveal">
                <h3 className="text-[1.8rem] md:text-[2.2rem] font-black text-[#06a892] mb-4">{year2000Title}</h3>
                <p className="text-[#2a4f75] text-lg leading-relaxed">{year2000Desc}</p>
              </div>
              <div className="reveal">
                <h4 className="text-[#07b59d] text-xl font-black mb-3">{yearsTitle}</h4>
                <ul className="space-y-2.5 text-[#2a4f75] text-base leading-relaxed">
                  {yearsBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5"><span className="mt-[0.55rem] w-2 h-2 rounded-full bg-[#00bfa4] shrink-0" />{b}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[#07b59d] text-lg font-black">{yearsConclusion}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div className="reveal">
                <div className="flex items-center gap-4 mb-5"><span className={dividerL} /><img src="/assets/new/kurumsal/surdurebilirlik/Asset42.svg" alt={pt('iconAltForest')} className="w-[90px] md:w-[120px] h-auto shrink-0" /><span className={dividerR} /></div>
                <h3 className="text-[1.8rem] md:text-[2.1rem] font-black text-[#06a892] mb-3">{year2022Title}</h3>
                <p className="text-[#2a4f75] text-lg leading-relaxed">{year2022Desc}</p>
              </div>
              <div className="reveal">
                <div className="flex items-center gap-4 mb-5"><span className={dividerL} /><img src="/assets/new/kurumsal/surdurebilirlik/Asset41.svg" alt={pt('iconAltManagement')} className="w-[90px] md:w-[120px] h-auto shrink-0" /><span className={dividerR} /></div>
                <h3 className="text-[1.8rem] md:text-[2.1rem] font-black text-[#06a892] mb-3">{year2023Title}</h3>
                <p className="text-[#2a4f75] text-lg leading-relaxed">{year2023Desc}</p>
              </div>
            </div>

            <div className="reveal flex items-center gap-4 md:gap-8">
              <span className={dividerL} />
              <img src="/assets/new/kurumsal/surdurebilirlik/Asset43.svg" alt={pt('iconAltGrowth')} className="w-[100px] md:w-[130px] h-auto shrink-0" />
              <span className={dividerR} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
              <div className="reveal">
                <h3 className="text-[1.8rem] md:text-[2.1rem] font-black text-[#06a892] mb-3">{year2024Title}</h3>
                <p className="text-[#2a4f75] text-lg leading-relaxed">{year2024Desc}</p>
              </div>
              <div className="reveal">
                <h4 className="text-[#07b59d] text-xl font-black mb-3">{todayTitle}</h4>
                <ul className="space-y-2.5 text-[#2a4f75] text-base leading-relaxed">
                  {todayBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5"><span className="mt-[0.55rem] w-2 h-2 rounded-full bg-[#00bfa4] shrink-0" />{b}</li>
                  ))}
                </ul>
                <p className="mt-4 text-[#07b59d] text-lg font-black">{todayConclusion}</p>
              </div>
            </div>

            <div className="reveal flex items-center gap-4 md:gap-8">
              <span className={dividerL} />
              <img src="/assets/new/kurumsal/surdurebilirlik/Asset44.svg" alt={pt('iconAltContinuity')} className="w-[100px] md:w-[130px] h-auto shrink-0" />
              <span className={dividerR} />
            </div>

            <p className="reveal text-center text-[#08a995] text-lg md:text-xl font-black leading-relaxed max-w-4xl mx-auto">{summaryText}</p>
          </div>
        </div>
      </section>

      {/* ── Geleceğe Bakış ── */}
      <section className="pt-[5.25rem] md:pt-[7rem] pb-[5.25rem] md:pb-[7rem] px-6 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-[1.03fr_0.97fr] gap-8 md:gap-12 items-center">
            <div className="reveal">
              <div className="rounded-[20px] overflow-hidden shadow-[0_22px_50px_rgba(13,70,115,0.16)] lg:max-w-[92%]">
                <img src={futureImage} alt={pt('futureImgAlt')} className="w-full h-auto object-cover" />
              </div>
            </div>
            <article className="reveal space-y-5 lg:pl-2">
              <h2 className="font-['Belfast_Grotesk'] text-4xl md:text-5xl leading-[1.06] font-bold text-[#06b598]">{futureTitle}</h2>
              <h3 className="font-['Belfast_Grotesk'] text-[1.5rem] md:text-[1.9rem] leading-[1.14] font-bold text-[#164f93]">{futureSubtitle}</h3>
              <p className="font-['Belfast_Grotesk'] text-[1.45rem] md:text-[1.75rem] leading-[1.24] font-bold text-[#08ad93]">{futureTagline}</p>
              <p className="font-['Lufga'] text-base md:text-[1.08rem] leading-[1.68] text-[#111111] font-normal">{futureDesc}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section cta-band py-12 md:py-20 bg-white">
        <div className="container-wide px-6 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">{ctaTitle}</h2>
          <p className="text-slate-600 mt-5 text-lg">{ctaDescription}</p>
          <AnimatedButton href={`${localizePath('/iletisim')}#contact-form`} className="mt-8">{ctaButton}</AnimatedButton>
        </div>
      </section>
    </div>
  );
}
