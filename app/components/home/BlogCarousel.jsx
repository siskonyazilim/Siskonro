'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedButton from '../AnimatedButton';
import { toLocalizedPath } from '../../lib/i18n/routes';
import { formatBlogDate } from '@/lib/strapi/services/blog';

/**
 * Blog kartları carousel — Client Component
 * (Sadece carousel state yönetimi için 'use client')
 *
 * posts: Server Component (BlogSection) tarafından Strapi'den çekilip props olarak verilir.
 */
export default function BlogCarousel({ posts = [], locale }) {
  const localizePath = (path) => toLocalizedPath(path, locale);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const visiblePosts = posts.slice(carouselIndex, carouselIndex + 4);

  return (
    <>
      {/* 4'lü kart grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {visiblePosts.map((post) => {
          const postDate = formatBlogDate(post.date, locale);

          return (
            <Link
              key={post.slug}
              href={localizePath(`/blog/${post.slug}`)}
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-[26px] bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_45px_rgba(27,58,99,0.15)] hover:border-sky-400 transition-all duration-500 hover:-translate-y-1.5 min-h-[330px] md:min-h-[350px] overflow-hidden cursor-pointer"
            >
              {/* Hover arka plan kapak görseli */}
              {post.coverImage && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[26px]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover opacity-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082a53]/95 via-[#082a53]/65 to-[#082a53]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              {/* Arka plan Siskon ikon deseni */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[26px]">
                <Image
                  src="/assets/blog/blogSiskonIcon.svg"
                  alt=""
                  fill
                  className="object-cover opacity-70 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                />
              </div>

              {/* Başlık */}
              <div className="relative z-10 pt-1">
                <h3 className="font-archivo font-bold text-[#1A1A1A] group-hover:text-white text-[1.12rem] md:text-[1.2rem] leading-[1.38] tracking-tight transition-colors line-clamp-4 drop-shadow-sm">
                  {post.title}
                </h3>
              </div>

              {/* Alt bilgi */}
              <div className="relative z-10 flex items-end justify-between pt-6">
                <div>
                  {postDate && (
                    <div className="text-[0.75rem] font-semibold text-slate-500 group-hover:text-slate-200 mb-1 transition-colors">
                      {postDate}
                    </div>
                  )}
                  <div className="text-[0.88rem] font-bold text-[#1B3A63] group-hover:text-sky-300 transition-colors">
                    {post.category || (locale === 'en' ? 'Our News' : locale === 'ro' ? 'Știrile Noastre' : 'Bizden Haberler')}
                  </div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center text-[#1B3A63] group-hover:text-sky-300 transition-colors">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Navigasyon kontrolleri */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 md:mt-12">
        <AnimatedButton
          href={localizePath('/blog')}
          className="!bg-[#1B3A63] !text-white rounded-xl px-7 py-3 font-bold text-sm shadow-md"
        >
          {locale === 'en' ? 'All News' : locale === 'ro' ? 'Toate Știrile' : 'Tüm Haberler'}
        </AnimatedButton>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
            disabled={carouselIndex === 0}
            aria-label={locale === 'en' ? 'Previous news' : locale === 'ro' ? 'Știri anterioare' : 'Önceki haberler'}
            className="w-11 h-11 rounded-full border-2 border-sky-400/80 flex items-center justify-center text-sky-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setCarouselIndex((prev) => Math.min(Math.max(0, posts.length - 4), prev + 1))}
            disabled={carouselIndex >= posts.length - 4}
            aria-label={locale === 'en' ? 'Next news' : locale === 'ro' ? 'Știri următoare' : 'Sonraki haberler'}
            className="w-11 h-11 rounded-full border-2 border-sky-400/80 flex items-center justify-center text-sky-600 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
