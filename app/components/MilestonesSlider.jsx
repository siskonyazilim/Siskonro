'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../_context/LanguageContext';

const MILESTONES = [
  {
    year: 1997,
    items: [
      { tr: "Siskon Kuruldu", en: "Siskon Founded", ro: "Siskon a Fost Înființată" }
    ]
  },
  {
    year: 2001,
    items: [
      { tr: "İlk Yazılım İhracatı", en: "First Software Export", ro: "Primul Export de Software" }
    ]
  },
  {
    year: 2002,
    items: [
      { tr: "Beckhoff Çözüm Ortaklığı", en: "Beckhoff Solution Partner", ro: "Partener de Soluții Beckhoff" }
    ]
  },
  {
    year: 2003,
    items: [
      { tr: "Microsoft Çözüm Ortaklığı", en: "Microsoft Solution Partner", ro: "Partener de Soluții Microsoft" }
    ]
  },
  {
    year: 2005,
    items: [
      { tr: "Teknopark Şubesi", en: "Technopark Branch", ro: "Sucursala Technopark" }
    ]
  },
  {
    year: 2010,
    items: [
      { tr: "Software Toolbox Çözüm Ortaklığı", en: "Software Toolbox Solution Partner", ro: "Partener de Soluții Software Toolbox" }
    ]
  },
  {
    year: 2015,
    items: [
      { tr: "DEPARK Teknopark Kurucu Ortaklığı", en: "DEPARK Technopark Founding Partnership", ro: "Parteneriat Fondator DEPARK Technopark" }
    ]
  },
  {
    year: 2017,
    items: [
      { tr: "SICK AppSpace Ortağı", en: "SICK AppSpace Partner", ro: "Partener SICK AppSpace" }
    ]
  },
  {
    year: 2018,
    items: [
      { tr: "Markem Imaje Çözüm Ortağı", en: "Markem Imaje Solution Partner", ro: "Partener de Soluții Markem Imaje" },
      { tr: "Siskon RIO IoT Gateway", en: "Siskon RIO IoT Gateway", ro: "Gateway IoT Siskon RIO" }
    ]
  },
  {
    year: 2019,
    items: [
      { tr: "Universal Robots Çözüm Ortağı", en: "Universal Robots Solution Partner", ro: "Partener de Soluții Universal Robots" },
      { tr: "ESBAŞ Ege Serbest Bölge Şubesi", en: "ESBAŞ Aegean Free Zone Branch", ro: "Sucursala Zona Liberă Marea Egee ESBAŞ" }
    ]
  },
  {
    year: 2020,
    items: [
      { tr: "Interroll Çözüm Ortağı", en: "Interroll Solution Partner", ro: "Partener de Soluții Interroll" }
    ]
  },
  {
    year: 2022,
    items: [
      { tr: "Estonya Şubesi", en: "Estonia Branch", ro: "Sucursala Estonia" },
      { tr: "Romanya Şubesi", en: "Romania Branch", ro: "Sucursala România" }
    ]
  },
  {
    year: 2023,
    items: [
      { tr: "Sewio Çözüm Ortağı", en: "Sewio Solution Partner", ro: "Partener de Soluții Sewio" },
      { tr: "Ignition Çözüm Ortağı", en: "Ignition Solution Partner", ro: "Partener de Soluții Ignition" },
      { tr: "Efeso Stratejik Dijital Dönüşüm Ortaklığı", en: "Efeso Strategic Digital Transformation Partnership", ro: "Parteneriat Strategic de Transformare Digitală Efeso" }
    ]
  },
  {
    year: 2024,
    items: [
      { tr: "GE Vernova Çözüm Ortağı", en: "GE Vernova Solution Partner", ro: "Partener de Soluții GE Vernova" },
      { tr: "Kuika Teknoloji Ortaklığı", en: "Kuika Technology Partnership", ro: "Parteneriat Tehnologic Kuika" },
      { tr: "IAS Teknoloji Ortaklığı", en: "IAS Technology Partnership", ro: "Parteneriat Tehnologic IAS" }
    ]
  },
  {
    year: 2025,
    items: [
      { tr: "Faradai Çözüm Ortağı", en: "Faradai Solution Partner", ro: "Partener de Soluții Faradai" },
      { tr: "Time Reactor A.Ş. Yatırımı", en: "Time Reactor Inc. Investment", ro: "Investiție Time Reactor Inc." }
    ]
  }
];

export default function MilestonesSlider() {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const updateCount = () => {
      // In mobile, we show 2 cards instead of 1 to match the visual grid style in image 2
      if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxIndex = Math.max(0, MILESTONES.length - visibleCount);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getTitle = () => {
    if (lang === 'TR') return 'Kilometre Taşlarımız';
    if (lang === 'RO') return 'Etapele Noastre';
    return 'Our Milestones';
  };

  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden text-white"
      style={{ background: '#082a53' }}
    >
      {/* Decorative Glow Accents like Hero */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0369a1]/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-wide px-4 md:px-8 relative z-10">
        
        {/* Full max-w-7xl layout without the card/box wrapper structure */}
        <div className="relative max-w-7xl mx-auto px-2">
          
          <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-20 tracking-tight">
            {getTitle()}
          </h2>

          {/* Slider Outer Container */}
          <div className="relative">
            
            {/* Navigation Controls */}
            <button
              onClick={handlePrev}
              disabled={maxIndex === 0}
              className={`absolute -left-2 md:-left-8 top-[35%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-cyan-400 bg-white/10 text-white shadow-md transition-all duration-300 ${
                maxIndex === 0 ? 'opacity-10 pointer-events-none' : 'hover:bg-cyan-400 hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
              }`}
              aria-label="Previous Milestone"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2005/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={maxIndex === 0}
              className={`absolute -right-2 md:-right-8 top-[35%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-cyan-400 bg-white/10 text-white shadow-md transition-all duration-300 ${
                maxIndex === 0 ? 'opacity-10 pointer-events-none' : 'hover:bg-cyan-400 hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
              }`}
              aria-label="Next Milestone"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2005/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Slider Window */}
            <div className="relative overflow-visible px-2">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out py-4"
                  style={{
                    transform: isMounted ? `translateX(-${currentIndex * (100 / visibleCount)}%)` : 'none',
                  }}
                >
                  {MILESTONES.map((milestone, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div
                        key={`${milestone.year}-${idx}`}
                        className="flex-shrink-0 w-1/2 md:w-1/2 lg:w-1/4 px-2 md:px-6 flex flex-col items-center relative"
                      >
                        {/* Visual Zigzag Dot & Stem (150px height zone) */}
                        <div className="relative w-full h-[120px] md:h-[150px] mb-6 md:mb-8 flex flex-col items-center">
                          
                          {/* Pulsing Cyan Dot */}
                          <span
                            className="absolute w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(8,220,255,0.8)] z-20"
                            style={{ top: isEven ? '15px' : '85px' }}
                          />
                          
                          {/* Slim Vertical Line */}
                          <div
                            className="absolute w-[1.5px] bg-gradient-to-b from-cyan-400/80 via-cyan-200/50 to-transparent z-10"
                            style={{
                              top: isEven ? '22px' : '92px',
                              height: isEven ? '98px' : '38px'
                            }}
                          />
                        </div>

                        {/* Content Box (Aligned to the baseline) */}
                        <div className="text-center pt-2 max-w-[130px] md:max-w-[210px] mx-auto select-none">
                          
                          {/* Year (Bold large Custom Cyan: #08DCFF) */}
                          <div 
                            className="text-2xl md:text-[2.5rem] font-extrabold mb-3 md:mb-5 tracking-tight leading-none"
                            style={{ color: '#08DCFF' }}
                          >
                            {milestone.year}
                          </div>
                          
                          {/* Beautifully Listed Explanations (Lighter text on dark background) */}
                          <div className="space-y-2 md:space-y-3.5">
                            {milestone.items.map((item, itemIdx) => (
                              <p 
                                key={`${item.en}-${itemIdx}`} 
                                className="text-slate-200 text-[10px] md:text-sm font-semibold leading-relaxed tracking-wide hover:text-cyan-300 transition-colors duration-200"
                              >
                                {lang === 'TR' ? item.tr : lang === 'RO' && item.ro ? item.ro : item.en}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}