'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import AnimatedButton from '../AnimatedButton';
import { toLocalizedPath } from '../../lib/i18n/routes';

/**
 * Ana sayfa Dünya Haritası bölümü — Client Component
 * (hover state ve harita geçişleri için 'use client' gerekli)
 *
 * Veri kaynağı (Strapi home.global-stats-section → home.continents-map):
 *   data.continentMaps   → { europe: { label, src }, africa: { label, src }, ... }
 *   data.defaultMapSrc   → Dünya haritası SVG URL (Strapi Media veya fallback)
 *   data.legendImageSrc  → Renk kartelası SVG URL (Strapi Media veya fallback)
 *
 * Strapi'de görsel yoksa public/assets/new/map/ içindeki SVG'ler kullanılır.
 */
export default function WorldMapSection({ data, locale }) {
  const localizePath = (path) => toLocalizedPath(path, locale);

  // continentMaps: home.js'den normalize edilerek gelir
  // Fallback: tüm alanlar home.js içinde zaten çözümlenmiş durumda
  const continentMaps = data.continentMaps ?? {
    europe:       { label: 'Avrupa',        src: '/assets/new/map/web_avrupa.svg' },
    africa:       { label: 'Afrika',        src: '/assets/new/map/web_afrika.svg' },
    asia:         { label: 'Asya',          src: '/assets/new/map/web_asya.svg' },
    northAmerica: { label: 'Kuzey Amerika', src: '/assets/new/map/web_k.amerika.svg' },
    southAmerica: { label: 'Güney Amerika', src: '/assets/new/map/web_g.amerika.svg' },
  };

  const defaultMapSrc  = data.defaultMapSrc  ?? '/assets/new/map/world2.svg';
  const legendImageSrc = data.legendImageSrc ?? '/assets/new/map/renk_kartela_white.svg';
  const defaultMapAlt  = data.defaultMapAlt  ?? 'Global projeler haritası';

  // Kıta listesini sıralı dizi olarak oluştur
  const continentItems = [
    { key: 'europe',       ...continentMaps.europe },
    { key: 'africa',       ...continentMaps.africa },
    { key: 'asia',         ...continentMaps.asia },
    { key: 'north-america',...continentMaps.northAmerica },
    { key: 'south-america',...continentMaps.southAmerica },
  ];

  const [activeContinentKey, setActiveContinentKey] = useState(null);
  const [hoveredContinentKey, setHoveredContinentKey] = useState(null);
  const [activeMapSrc, setActiveMapSrc] = useState(defaultMapSrc);
  const resetMapTimerRef = useRef(null);

  const selectedContinent = continentItems.find((item) => item.key === activeContinentKey);
  const mapAlt = selectedContinent ? `${selectedContinent.label} map` : defaultMapAlt;

  return (
    <section className="section-dark py-0 lg:py-12" style={{ background: '#0A192F' }}>

      {/* ── Mobil / Tablet görünüm ──────────────────────────────────── */}
      <div
        className="lg:hidden relative overflow-hidden px-6 pt-12 pb-10"
        style={{ background: 'linear-gradient(160deg, #0f4e8a 0%, #0a2f70 46%, #010b44 100%)' }}
      >
        <div className="relative z-10 text-center flex flex-col items-center">
          <span className="font-archivo inline-block text-[11px] font-semibold tracking-[0.03em]" style={{ color: '#d9efff' }}>
            {data.globalProjectsEyebrow}
          </span>
          <h2 className="mt-3 text-[2.2rem] sm:text-[2.7rem] leading-[1.06] font-black">
            <span className="block text-cyan-300">40+ {data.countriesLabel}</span>
            <span className="block mt-2 text-white">60+ {data.factoriesLabel}</span>
          </h2>

          <div className="relative mt-6 w-full max-w-[500px] aspect-[16/10] mx-auto">
            <Image
              src={activeMapSrc}
              alt={defaultMapAlt}
              fill
              className="object-contain"
              sizes="100vw"
              priority={false}
              unoptimized={activeMapSrc?.endsWith('.svg')}
            />
          </div>

          <div className="mt-6">
            <AnimatedButton
              href={localizePath('/referanslar')}
              className="!bg-[#1B3A63] !text-white font-bold px-7 py-3 rounded-xl shadow-lg"
            >
              {data.referencesButton || 'Referanslarımız'}
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* ── Masaüstü görünüm ─────────────────────────────────────────── */}
      <div className="container-wide px-6 hidden lg:block">
        <div className="grid grid-cols-12 gap-8 xl:gap-10 items-stretch min-h-[640px]">

          {/* Sol panel — kıtalar listesi */}
          <div className="col-span-5 xl:col-span-4 flex flex-col justify-center py-16">
            <span className="eyebrow font-archivo text-sm font-bold tracking-widest uppercase" style={{ color: '#7dd3fc' }}>
              {data.globalProjectsEyebrow}
            </span>
            <h2 className="mt-4 text-[2.8rem] xl:text-[3.6rem] font-black leading-[1.1] tracking-tight text-white">
              <span className="block">40+ {data.countriesLabel}</span>
              <span className="block mt-2 text-sky-300">60+ {data.factoriesLabel}</span>
            </h2>

            <ul className="mt-10 space-y-3">
              {continentItems.map((item) => {
                const active   = activeContinentKey === item.key;
                const hovered  = hoveredContinentKey === item.key;
                const isHighlighted = active || hovered;

                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onMouseEnter={() => {
                        if (resetMapTimerRef.current) {
                          clearTimeout(resetMapTimerRef.current);
                          resetMapTimerRef.current = null;
                        }
                        setHoveredContinentKey(item.key);
                        setActiveContinentKey(item.key);
                        // Strapi'den gelen (veya fallback) kıta haritası
                        setActiveMapSrc(item.src);
                      }}
                      onMouseLeave={() => {
                        setHoveredContinentKey(null);
                        resetMapTimerRef.current = setTimeout(() => {
                          setActiveContinentKey(null);
                          setActiveMapSrc(defaultMapSrc); // Strapi'den gelen dünya haritası
                          resetMapTimerRef.current = null;
                        }, 1500);
                      }}
                      onClick={() => {
                        setActiveContinentKey(item.key);
                        setActiveMapSrc(item.src);
                      }}
                      className="font-archivo relative flex flex-col items-start gap-0 text-lg xl:text-xl transition-all duration-200"
                      style={{
                        color:      isHighlighted ? '#7dd3fc' : '#FFFFFF',
                        fontWeight: isHighlighted ? 700 : 500,
                      }}
                      aria-pressed={active}
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <span
                          className="transition-all duration-200"
                          style={{
                            color:     isHighlighted ? '#7dd3fc' : '#FFFFFF',
                            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
                          }}
                        >
                          ›
                        </span>
                        {item.label}
                      </span>
                      {/* Hover alt çizgisi */}
                      <span
                        style={{
                          display:      'block',
                          height:       '2px',
                          borderRadius: '9999px',
                          background:   '#7dd3fc',
                          marginTop:    '3px',
                          width:        hovered ? '100%' : '0%',
                          opacity:      hovered ? 1 : 0,
                          transition:   'width 0.4s ease, opacity 0.4s ease',
                        }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Renk kartelası — Strapi Media veya fallback SVG */}
            <div className="mt-10 w-full">
              <img
                src={legendImageSrc}
                alt={data.legendAlt}
                className="w-full h-auto"
                style={{ maxWidth: '420px' }}
              />
            </div>
          </div>

          {/* Sağ panel — aktif harita görseli */}
          <div className="col-span-7 xl:col-span-8 flex flex-col justify-center items-end py-12 pr-0">
            <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
              <Image
                src={activeMapSrc}
                alt={mapAlt}
                fill
                className="object-contain object-right"
                sizes="(max-width: 1280px) 60vw, 900px"
                priority={false}
                unoptimized={activeMapSrc?.endsWith('.svg')}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
