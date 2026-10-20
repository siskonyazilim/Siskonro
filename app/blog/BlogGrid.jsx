'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toLocalizedPath } from '../lib/i18n/routes';

/** Sayfa başına kart sayısı: mobil (<768px) 6, tablet (768–1023px) 8. Masaüstünde (lg+) hepsi görünür. */
const MOBILE_PAGE_SIZE = 6;
const TABLET_PAGE_SIZE = 8;

function BlogCard({ post, defaultCategory, locale }) {
  const href = toLocalizedPath(`/blog/${post.slug}`, locale);
  const postDate = post.dateLabel;

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between p-7 sm:p-8 md:p-9 rounded-[28px] bg-[#0B2A4F] border border-sky-400/25 shadow-[0_10px_35px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(8,214,255,0.25)] hover:border-sky-400 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer h-[380px] sm:h-[400px] md:h-[420px]"
    >
      {/* Arka Plan Siskon İkon Deseni */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
        <Image
          src="/assets/blog/blogSiskonIcon.svg"
          alt=""
          fill
          className="object-cover opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        />
      </div>

      {/* Hover Arka Plan Kapak Görseli */}
      {post.coverImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover opacity-0 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Okunabilirlik için koyu degrade katman */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4F]/95 via-[#0B2A4F]/65 to-[#0B2A4F]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {/* Kart Üst Başlık İçeriği */}
      <div className="relative z-10 flex-1 pt-1">
        <h3 className="font-archivo font-bold text-white group-hover:text-white text-[1.2rem] sm:text-[1.28rem] md:text-[1.35rem] leading-[1.36] tracking-tight transition-colors line-clamp-5 drop-shadow-sm">
          {post.title}
        </h3>
      </div>

      {/* Kart Alt Bilgi (Çizgisiz, ferah) */}
      <div className="relative z-10 flex items-end justify-between pt-6">
        <div>
          {postDate ? (
            <div className="text-[0.78rem] md:text-[0.82rem] font-semibold text-slate-300 mb-1.5 transition-colors group-hover:text-slate-200">
              {postDate}
            </div>
          ) : null}
          <div className="text-[0.92rem] md:text-[0.98rem] font-bold text-sky-300 transition-colors group-hover:text-sky-200">
            {post.category || defaultCategory}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-300 group-hover:bg-sky-400 group-hover:text-[#0B2A4F] group-hover:border-sky-400 transition-all duration-300">
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.4}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function BlogGrid({ posts, defaultCategory, locale, prevLabel, nextLabel }) {
  const [page, setPage] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const gridRef = useRef(null);
  const pageSize = isTablet ? TABLET_PAGE_SIZE : MOBILE_PAGE_SIZE;
  const pageCount = Math.max(1, Math.ceil(posts.length / pageSize));

  // Ekran boyutu mobil ↔ tablet arasında değişirse sayfa boyutu değişir; başa dön
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => {
      setIsTablet(mq.matches);
      setPage(0);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const goTo = (next) => {
    setPage(next);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navBtn =
    'w-11 h-11 rounded-xl border border-slate-200 bg-white text-[#0B2A4F] font-bold flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:bg-slate-100 enabled:cursor-pointer';

  return (
    <>
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-9 scroll-mt-24">
        {posts.map((post, index) => {
          const onCurrentPage = Math.floor(index / pageSize) === page;
          // Mobilde md'den, tablette lg'den itibaren hepsi görünür
          const showAllFrom = isTablet ? 'lg:block' : 'md:block';
          return (
            <div key={post.slug} className={onCurrentPage ? 'block' : `hidden ${showAllFrom}`}>
              <BlogCard post={post} defaultCategory={defaultCategory} locale={locale} />
            </div>
          );
        })}
      </div>

      {/* Sayfalama — mobil ve tablet */}
      {pageCount > 1 && (
        <nav className="lg:hidden mt-10 flex items-center justify-center gap-2" aria-label="pagination">
          <button type="button" className={navBtn} onClick={() => goTo(page - 1)} disabled={page === 0} aria-label={prevLabel}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === page ? 'page' : undefined}
              className={`w-11 h-11 rounded-xl border font-bold transition-colors cursor-pointer ${
                i === page
                  ? 'bg-[#0B2A4F] border-[#0B2A4F] text-white'
                  : 'bg-white border-slate-200 text-[#0B2A4F] hover:bg-slate-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button type="button" className={navBtn} onClick={() => goTo(page + 1)} disabled={page === pageCount - 1} aria-label={nextLabel}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      )}
    </>
  );
}
