'use client';

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import { usePageLocale } from '../lib/i18n/usePageLocale';
import trLocale from '../../messages/components/milestones/tr.json';
import enLocale from '../../messages/components/milestones/en.json';
import roLocale from '../../messages/components/milestones/ro.json';

const AUTOPLAY_DELAY = 1400; // ms - otomatik kayma hızı
const RESUME_DELAY = 1200;   // ms - kullanıcı bıraktıktan sonra tekrar başlama süresi

// İstemci/ekran genişliği için effect içinde setState yerine useSyncExternalStore kullanılır
const subscribeNoop = () => () => {};
const subscribeResize = (cb) => {
  window.addEventListener('resize', cb);
  return () => window.removeEventListener('resize', cb);
};
const getVisibleCount = () => (window.innerWidth < 1024 ? 2 : 4);

export default function MilestonesSlider({ milestones: milestonesProp = null, sectionTitle: sectionTitleProp = null }) {
  const pt = usePageLocale(trLocale, enLocale, roLocale);
  // Strapi'den gelen veri öncelikli, yoksa JSON fallback
  const milestones = (milestonesProp && milestonesProp.length > 0) ? milestonesProp : pt('milestones');
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = useSyncExternalStore(subscribeResize, getVisibleCount, () => 4);
  const isMounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragContainerWidth, setDragContainerWidth] = useState(0);
  const dragStartX = useRef(0);
  const containerRef = useRef(null);
  const autoplayTimer = useRef(null);
  const resumeTimer = useRef(null);

  const maxIndex = Math.max(0, milestones.length - visibleCount);

  // Görünür adet azalınca geçerli indeksi sınırla (render sırasında state ayarı)
  if (currentIndex > maxIndex) {
    setCurrentIndex(maxIndex);
  }

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // --- Autoplay ---
  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    if (maxIndex === 0) return;
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, AUTOPLAY_DELAY);
  }, [maxIndex, handleNext, stopAutoplay]);

  const pauseAndResume = useCallback(() => {
    stopAutoplay();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      startAutoplay();
    }, RESUME_DELAY);
  }, [stopAutoplay, startAutoplay]);

  useEffect(() => {
    if (!isMounted) return;
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [isMounted, maxIndex, startAutoplay, stopAutoplay]);

  // --- Drag / Swipe ---
  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handleDragStart = (e) => {
    if (maxIndex === 0) return;
    setIsDragging(true);
    setDragContainerWidth(containerRef.current?.offsetWidth || 0);
    dragStartX.current = getClientX(e);
    stopAutoplay();
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const deltaX = getClientX(e) - dragStartX.current;
    setDragOffset(deltaX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const containerWidth = containerRef.current?.offsetWidth || 1;
    const threshold = containerWidth / (visibleCount * 4);

    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    }

    setDragOffset(0);
    pauseAndResume();
  };

  const dragPercent = dragContainerWidth
    ? (dragOffset / dragContainerWidth) * 100
    : 0;

  const baseTranslate = currentIndex * (100 / visibleCount);
  const translateValue = isMounted ? -baseTranslate + dragPercent : 0;

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden text-white"
      style={{ background: '#082a53' }}
      onMouseEnter={stopAutoplay}
      onMouseLeave={() => !isDragging && startAutoplay()}
    >
      {/* Decorative Glow Accents like Hero */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0369a1]/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-wide px-4 md:px-8 relative z-10">

        {/* Full max-w-7xl layout without the card/box wrapper structure */}
        <div className="relative max-w-7xl mx-auto px-2">

          <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-20 tracking-tight">
            {sectionTitleProp || pt('title')}
          </h2>

          {/* Slider Outer Container */}
          <div className="relative">

            {/* Navigation Controls */}
            <button
              onClick={() => { handlePrev(); pauseAndResume(); }}
              disabled={maxIndex === 0}
              className={`absolute -left-2 md:-left-8 top-[35%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-cyan-400 bg-white/10 text-white shadow-md transition-all duration-300 ${maxIndex === 0 ? 'opacity-10 pointer-events-none' : 'hover:bg-cyan-400 hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
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
              onClick={() => { handleNext(); pauseAndResume(); }}
              disabled={maxIndex === 0}
              className={`absolute -right-2 md:-right-8 top-[35%] -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-cyan-400 bg-white/10 text-white shadow-md transition-all duration-300 ${maxIndex === 0 ? 'opacity-10 pointer-events-none' : 'hover:bg-cyan-400 hover:text-white hover:scale-105 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]'
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
              <div
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                ref={containerRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={() => isDragging && handleDragEnd()}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <div
                  className={`flex py-4 ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
                  style={{
                    transform: isMounted ? `translateX(${translateValue}%)` : 'none',
                  }}
                >
                  {milestones.map((milestone, idx) => {
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
                                key={`${item}-${itemIdx}`}
                                className="text-slate-200 text-[10px] md:text-sm font-semibold leading-relaxed tracking-wide hover:text-cyan-300 transition-colors duration-200"
                              >
                                {item}
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