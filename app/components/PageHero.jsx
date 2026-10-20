'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function PageHero({ title, subtitle, breadcrumbs, logoSrc }) {
  const pathname = usePathname() || '/';
  const pathSegments = pathname.split('/').filter(Boolean);
  const hasLocalePrefix = pathSegments[0] === 'en';
  const localePrefix = hasLocalePrefix ? '/en' : '';
  const routeSegments = hasLocalePrefix ? pathSegments.slice(1) : pathSegments;

  const getCrumbHref = (idx) => {
    if (!breadcrumbs || idx >= breadcrumbs.length - 1) {
      return null;
    }

    if (idx === 0) {
      return localePrefix || '/';
    }

    const ancestorSegments = routeSegments.slice(0, idx);
    if (ancestorSegments.length === 0) {
      return localePrefix || '/';
    }

    return `${localePrefix}/${ancestorSegments.join('/')}`;
  };

  return (
    <section className="page-hero-section relative overflow-hidden min-h-[clamp(20rem,56vw,28rem)] md:min-h-[clamp(22rem,46vw,30rem)] lg:min-h-[clamp(18rem,42vw,26rem)] flex items-center pt-[clamp(7rem,14vw,8.5rem)] md:pt-[clamp(8rem,12vw,9.5rem)] lg:pt-[clamp(5.5rem,10vw,7rem)] pb-[clamp(2.75rem,8vw,4.5rem)] md:pb-[clamp(3rem,7vw,4.75rem)] lg:pb-[clamp(2.5rem,7vw,4rem)]">
      {/* Subtle blend overlay matching Home Hero */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A192F]/40"
        aria-hidden="true"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M60 60H0V0h60v60zM30 0v60M0 30h60%22 fill=%22none%22 stroke=%22white%22 stroke-width=%221%22/%3E%3C/svg%3E')]" />

      <div className="container-wide mx-auto relative z-10 w-full">
        {/* The Content Wrapper - Aligned with Header Navigation */}
        <div className="grid gap-4 md:gap-6 lg:gap-8 items-start max-w-5xl pl-3 md:pl-6">

          {/* 1. Breadcrumbs (Path) */}
          <div className="min-h-[18px] md:min-h-[22px]">
            {breadcrumbs && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 translate-y-2 md:translate-y-3 text-[clamp(0.62rem,1.8vw,0.75rem)] font-semibold tracking-[0.05em] md:tracking-[0.07em] hero-crumb">
                {breadcrumbs.map((crumb, idx) => (
                  <div key={`${crumb}-${idx}`} className="flex items-center gap-2 md:gap-3 min-w-0">
                    {(() => {
                      const href = getCrumbHref(idx);
                      if (href) {
                        return (
                          <Link href={href} className="hover:text-white transition-colors cursor-pointer">
                            {crumb}
                          </Link>
                        );
                      }

                      return <span className="hero-crumb-active">{crumb}</span>;
                    })()}
                    {idx < breadcrumbs.length - 1 && (
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white/35" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Title / Logo - Inside a Box (Glassmorphism) */}
          <div className="min-h-[80px] md:min-h-[104px] lg:min-h-[128px] flex items-center">
            <div className="inline-block relative max-w-full md:max-w-3xl">
              {/* Box Background */}
              <div className="absolute -inset-x-3 md:-inset-x-6 -inset-y-2 md:-inset-y-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl -z-10 shadow-xl" />
              {logoSrc ? (
                // Logo başlık yerine geçiyorsa da sayfada bir <h1> olmalı (alt metni başlık sayılır)
                <h1 className="relative block w-[220px] sm:w-[280px] md:w-[340px] h-[52px] sm:h-[64px] md:h-[76px]">
                  <Image
                    src={logoSrc}
                    alt={title || 'Logo'}
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </h1>
              ) : (
                <h1 className="text-[clamp(1.35rem,4.2vw,2.7rem)] font-bold text-white tracking-tight leading-[1.18] md:leading-[1.22] break-words">
                  {title}
                </h1>
              )}
            </div>
          </div>

          {/* 3. Subtitle */}
          <div className="min-h-[36px] md:min-h-[52px] lg:min-h-[60px] flex items-start">
            {subtitle && (
              <div className="w-full">
                <p className="text-[clamp(0.78rem,2.2vw,1.1rem)] hero-subtitle font-normal max-w-3xl border-l-2 md:border-l-4 border-sky-500/60 pl-3 md:pl-5 py-1.5 leading-relaxed">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Symmetrical Bottom Decor */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 md:via-white/10 to-transparent" />

      {/* Mobile Visual Accent - Extra glow for mobile */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-24 w-1/2 bg-sky-500/5 blur-2xl md:hidden" />
    </section>
  );
}

PageHero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(PropTypes.string),
  logoSrc: PropTypes.string,
};
