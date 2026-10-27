'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './career.css';
import { useLanguage } from '../../_context/LanguageContext';
import { usePageLocale } from '../../lib/i18n/usePageLocale';
import trLocale from '../../../messages/kurumsal/kariyer/tr.json';
import enLocale from '../../../messages/kurumsal/kariyer/en.json';
import roLocale from '../../../messages/kurumsal/kariyer/ro.json';

export default function CareerPageClient({ data, locale }) {
  const { localizePath } = useLanguage();

  // Staj zaman çizelgesi: ekrana girince adımlar sırayla belirir
  const timelineRef = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      const raf = requestAnimationFrame(() => setTimelineVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimelineVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const pt = usePageLocale(trLocale, enLocale, roLocale);

  const s = data ?? {};

  const heroLine1 = s.heroLine1 || pt('heroLine1') || 'Hedeflerini paylaşabileceğin,';
  const heroLine2 = s.heroLine2 || pt('heroLine2') || 'birlikte büyüyüp birlikte başarabileceğin bir ekip arıyorsan,';
  const heroLine3 = s.heroLine3 || pt('heroLine3') || 'doğru yerdesin.';
  const sendCv = s.sendCv || s.heroCtaLabel || pt('sendCv') || 'CV Gönder';

  const breadcrumbHome = s.breadcrumbHome || pt('breadcrumbHome');
  const breadcrumbCorporate = s.breadcrumbCorporate || pt('breadcrumbCorporate');
  const breadcrumbCareer = s.breadcrumbCareer || pt('breadcrumbCareer');

  const cultureTitle = s.cultureTitle || pt('cultureTitle');
  const cultureSubtitle = s.cultureSubtitle || pt('cultureSubtitle');
  const cultureParagraphs = [
    s.cultureP1 || pt('cultureP1'),
    s.cultureP2 || pt('cultureP2'),
    s.cultureP3 || pt('cultureP3'),
  ].filter(Boolean);
  const cultureCallout1 = s.cultureCallout1 || pt('cultureCallout1');
  const cultureCallout2 = s.cultureCallout2 || pt('cultureCallout2');
  const hasCulture = Boolean(cultureTitle || cultureSubtitle || cultureParagraphs.length || cultureCallout1 || cultureCallout2);

  const valuesTitle = s.valuesTitle || pt('valuesTitle') || 'Değerlerimiz';
  const valuesSubtitle = s.valuesSubtitle || pt('valuesSubtitle') || 'Birlikte Büyür Birlikte Başarıyoruz.';
  const valuesList = (s.values && s.values.length > 0) ? s.values : (pt('values') || []);

  const processTitle = pt('jobProcessTitle') || 'İŞ BAŞVURU SÜRECİMİZ';
  const processList = pt('jobProcessList') || [];
  const internTitle = pt('internProcessTitle') || 'STAJ BAŞVURU SÜRECİMİZ';
  const internList = pt('internProcessList') || [];

  const detailsTitle = s.detailsTitle || pt('detailsTitle') || "Siskon'u Siskon Yapan<br />Küçük Detaylar";

  // Sağ liste: Strapi detailList.detail[] → fallback JSON detailsList
  const rawDetailsList = (s.detailsList && s.detailsList.length > 0)
    ? s.detailsList
    : (pt('detailsList') || []);

  // Strapi'den icon gelmezse: başlıktaki anahtar kelimeye, o da tutmazsa sıraya göre /public ikonu
  const ICON_DIR = '/assets/new/kurumsal/Kariyer';
  const DETAIL_ICONS = [
    '01-kiz-kardes', '02-toplanti-odalari', '03-filtre-kahve', '04-diyet-zor',
    '05-kupa-atik-azaltma', '06-hayvan-dostlar', '07-on-koltuk', '08-siskon-dansi',
  ].map((n) => `${ICON_DIR}/${n}.svg`);
  const ICON_KEYWORDS = [
    [/kız kardeş|sister|soră|sistem/i, 0],
    [/toplantı odalar|meeting room|sălilor|săli/i, 1],
    [/filtre kahve|filter coffee|cafeaua/i, 2],
    [/diyet|diet|dietă/i, 3],
    [/kupa|mug|cană|căni/i, 4],
    [/hayvan|animal/i, 5],
    [/koltuk|seat|scaun|locul/i, 6],
    [/dans|dance|dans/i, 7],
  ];
  const iconFor = (title, idx) => {
    const hit = ICON_KEYWORDS.find(([re]) => re.test(title));
    return DETAIL_ICONS[hit ? hit[1] : idx] || '';
  };
  const stripEmoji = (t) => t.replace(/^[^\p{L}\p{N}"'(]+/u, '');

  const detailsList = rawDetailsList.map((item, idx) => {
    const title = typeof item === 'string' ? stripEmoji(item) : (item.title || item.text || '');
    const icon = (typeof item === 'object' && item.icon) || iconFor(title, idx);
    return { icon, title };
  });

  const finalCtaLine1 = s.finalCtaLine1 || pt('finalCtaLine1');
  const finalCtaLine2 = s.finalCtaLine2 || pt('finalCtaLine2');
  const finalCtaLine3 = s.finalCtaLine3 || pt('finalCtaLine3');
  const finalCtaDesc = s.finalCtaDesc || pt('finalCtaDesc');
  const finalCtaSubtitle = s.finalCtaSubtitle || pt('finalCtaSubtitle');
  const finalCtaButton = s.finalCtaButton || pt('finalCtaButton');
  const heroBgSvg = s.heroBgSvg || '/assets/new/kurumsal/Kariyer/asset-49.svg';

  return (
    <div className="career-page-root">

      {/* ═══════════════════════════════════════════════════════
          HERO — Kariyer'e özel, PageHero renk paleti + tam ekran SVG
          ═══════════════════════════════════════════════════════ */}
      <section className="career-hero">

        {/* ── Arka plan katmanları (PageHero renkleri) ── */}
        <div className="career-hero__bg" aria-hidden="true">
          {/* 1. Temel renk: #0A192F */}
          <div className="career-hero__bg-base" />
          {/* 2. PageHero gradient: from-sky-600 via-sky-950 to-[#030B1A] */}
          <div className="career-hero__bg-gradient" />
          {/* 3. Glow — sol üst (PageHero'daki gibi) */}
          <div className="career-hero__bg-glow career-hero__bg-glow--tl" />
          {/* 4. Glow — sağ alt */}
          <div className="career-hero__bg-glow career-hero__bg-glow--br" />
          {/* 5. SVG — tam arka plan kaplıyor */}
          <div className="career-hero__svg-bg">
            <img
              src={heroBgSvg}
              alt=""
              className="career-hero__svg-img"
            />
          </div>
          {/* 6. Alt dekor çizgisi */}
          <div className="career-hero__bg-line" />
        </div>

        {/* ── İçerik — merkezi layout ── */}
        <div className="career-hero__content">

          {/* Breadcrumb */}
          <nav className="career-hero__breadcrumb" aria-label="breadcrumb">
            <Link href={localizePath('/')} className="career-hero__crumb career-hero__crumb--link">{breadcrumbHome}</Link>
            <svg className="career-hero__crumb-sep" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            <Link href={localizePath('/kurumsal/bizi-taniyin')} className="career-hero__crumb career-hero__crumb--link">{breadcrumbCorporate}</Link>
            <svg className="career-hero__crumb-sep" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            <span className="career-hero__crumb career-hero__crumb--active">{breadcrumbCareer}</span>
          </nav>

          {/* Ana başlık — 3 satırlı özel renkli dizayn */}
          <div className="career-hero__title-wrap">
            <h1 className="career-hero__title">
              <span className="block">{heroLine1}</span>
              <span className="block text-[#00b9f2]">{heroLine2}</span>
              <span className="block">{heroLine3}</span>
            </h1>
          </div>

          {/* CTA buton */}
          <div className="career-hero__cta-row">
            <Link
              href={`${localizePath('/iletisim')}#contact-form`}
              className="career-hero__btn-primary"
            >
              {sendCv}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </section>




      {/* ═══════════════════════════════════════════════════
          İŞE ALIM SÜRECİMİZ SECTİON — Arka Plan Beyaz
          ═══════════════════════════════════════════════════ */}
      <section className="career-process-section py-20 md:py-28 px-6 bg-white relative overflow-hidden border-t border-sky-100">
        <div className="container-wide">

          {/* Başlık alanı */}
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#03408f] mb-3 tracking-tight">
              {processTitle}
            </h2>
          </div>

          {/* Kart Izgarası — açıklamasız */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.isArray(processList) && processList.map((item, idx) => (
              <article
                key={idx}
                className="career-process-card group relative bg-gradient-to-b from-[#e6f9fd] to-[#d8f5fc] border border-sky-200/60 rounded-3xl p-8 md:p-9 text-center flex flex-col items-center h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-300"
              >
                {/* İkon — icon yoksa sıra numarası gösterilir */}
                <div className="flex items-center justify-center w-32 h-32 md:w-36 md:h-36 shrink-0 mb-6 rounded-full bg-[#03408f] shadow-lg shadow-sky-900/10 transition-transform duration-300 group-hover:scale-110">
                  {item.icon ? (
                    <img src={item.icon} alt={item.title} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                  ) : (
                    <span className="text-white text-4xl font-extrabold">
                      {idx + 1}
                    </span>
                  )}
                </div>

                <h3 className="min-h-[3.5rem] flex items-center justify-center text-lg md:text-xl font-bold text-[#03408f] leading-snug">
                  {item.title}
                </h3>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          STAJ BAŞVURU SÜRECİMİZ — Yatay zaman çizelgesi
          ═══════════════════════════════════════════════════ */}
      <section className="career-intern-section py-20 md:py-28 px-6 bg-[#f4fbfe] border-t border-sky-100">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#03408f] tracking-tight">
              {internTitle}
            </h2>
          </div>

          <ol ref={timelineRef} className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4">
            {/* Yatay bağlantı çizgisi (yalnızca lg) */}
            <span
              aria-hidden="true"
              className="hidden lg:block absolute top-[4.5rem] left-[8.33%] right-[8.33%] h-[3px] bg-[#03408f]/80"
            />
            {Array.isArray(internList) && internList.map((item, idx) => {
              const delay = `${idx * 700}ms`;
              const shown = timelineVisible;
              return (
              <li
                key={idx}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex items-center justify-center w-36 h-36 rounded-full bg-[#03408f] ring-8 ring-[#f4fbfe] shadow-lg shadow-sky-900/10">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt=""
                      style={{ transitionDelay: delay }}
                      className={`w-20 h-20 object-contain transition-opacity duration-[1200ms] motion-reduce:transition-none ${shown ? 'opacity-100' : 'opacity-25'}`}
                    />
                  ) : (
                    <span
                      style={{ transitionDelay: delay }}
                      className={`text-white text-5xl font-extrabold transition-opacity duration-[1200ms] motion-reduce:transition-none ${shown ? 'opacity-100' : 'opacity-25'}`}
                    >
                      {idx + 1}
                    </span>
                  )}
                </div>
                <h3
                  style={{ transitionDelay: delay }}
                  className={`mt-5 text-base md:text-lg font-bold text-[#03408f] leading-snug max-w-[11rem] transition-opacity duration-[1200ms] motion-reduce:transition-none ${shown ? 'opacity-100' : 'opacity-0'}`}
                >
                  {item.title}
                </h3>
              </li>
              );
            })}
          </ol>
        </div>
      </section>





      {/* ═══════════════════════════════════════════════════
          ÖZEL KARİYER CTA SECTİON — Referans Görseline Birebir
          ═══════════════════════════════════════════════════ */}
      <section className="career-final-cta-section relative overflow-hidden bg-white border-t border-sky-100">

        {/* Arka Plan SVG — Referanstaki gibi büyük, tam merkezde, hafif görünür */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <img
            src={heroBgSvg}
            alt=""
            className="w-[900px] md:w-[1100px] lg:w-[1300px] h-auto opacity-30 md:opacity-40"
          />
        </div>

        {/* İçerik Alanı */}
        <div className="relative z-10 px-6 py-20 md:py-28 lg:py-36 max-w-5xl mx-auto text-center">

          {/* Ana Başlık */}
          <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.85rem] font-extrabold tracking-tight leading-[1.35] mb-8">
            {/* Satır 1 */}
            <span className="text-[#03408f] block lg:whitespace-nowrap">
              {finalCtaLine1}
            </span>

            {/* Satır 2 */}
            <span className="text-[#00b9f2] block whitespace-nowrap text-[1.4rem] md:text-[2rem] lg:text-[2.85rem]">
              {finalCtaLine2}
            </span>

            {/* Boşluk */}
            <span className="block h-4" />

            {/* Satır 3 */}
            <span className="text-[#03408f] block lg:whitespace-nowrap">
              {finalCtaLine3}
            </span>
          </h2>


          {/* Alt Çağrı — Referans: açık mavi, kalın, ortalı */}
          <p className="text-[#00b9f2] font-extrabold text-xl sm:text-2xl md:text-[1.6rem] mb-8 tracking-tight">
            {finalCtaSubtitle}
          </p>

          {/* Buton — Referans: koyu lacivert, oval, ortalı */}
          <div className="flex justify-center">
            <Link
              href={`${localizePath('/iletisim')}#contact-form`}
              className="inline-flex items-center justify-center px-12 py-4 rounded-full bg-[#03499a] hover:bg-[#0357c0] text-white font-bold text-lg tracking-wide shadow-lg shadow-sky-900/15 transition-colors duration-200"
            >
              {finalCtaButton}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
