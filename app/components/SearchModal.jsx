'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { useUIStore } from '@/app/store/useUIStore';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../_context/LanguageContext';

const POPULAR_SEARCHES = {
  tr: ['OnSuite', 'IIoT Çözümleri', 'Otomasyon', 'Görüntü İşleme', 'Kariyer', 'Referanslar'],
  en: ['OnSuite', 'IIoT Solutions', 'Automation', 'Machine Vision', 'Career', 'References'],
  ro: ['OnSuite', 'Soluții IIoT', 'Automatizare', 'Procesare Imagine', 'Cariere', 'Referințe'],
};

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const inputRef = useRef(null);
  const router = useRouter();
  const { localizePath, locale } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setQuery('');
    }
  }, [searchOpen]);

  const liveSuggestions = useMemo(() => {
    const all = POPULAR_SEARCHES[locale] || POPULAR_SEARCHES.tr;
    const normalized = query.trim().toLocaleLowerCase('tr');

    if (!normalized) {
      return all.slice(0, 4);
    }

    return all
      .filter((item) => item.toLocaleLowerCase('tr').includes(normalized))
      .slice(0, 6);
  }, [locale, query]);

  let suggestionLabel = isEn ? 'Popular searches:' : isRo ? 'Căutări populare:' : 'Popüler aramalar:';
  if (query.trim()) {
    suggestionLabel = isEn ? 'Suggestions:' : isRo ? 'Sugestii:' : 'Öneriler:';
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query?.trim()) {
      router.push(`${localizePath('/search')}?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleClose = () => {
    setSearchOpen(false);
  };

  if (!searchOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-24 px-4 animate-in fade-in slide-in-from-top-8 duration-300">
        <div className="w-full max-w-2xl">
          {/* Search Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Gradient accent top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-500" />

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center gap-4 px-6 md:px-8 py-6 md:py-8">
              {/* Search Icon */}
              <svg className="w-6 h-6 text-sky-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {/* Input */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={isEn ? 'Type to search...' : isRo ? 'Tastați pentru a căuta...' : 'Aramak için yazın...'}
                className="flex-1 outline-none text-lg md:text-xl text-slate-900 placeholder-slate-400 bg-transparent"
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="flex-shrink-0 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Kapat"
              >
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>

            {/* Suggestions */}
            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4">{suggestionLabel}</p>
              <div className="flex flex-wrap gap-2">
                {liveSuggestions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setQuery(tag);
                      router.push(`${localizePath('/search')}?q=${encodeURIComponent(tag)}`);
                      setSearchOpen(false);
                    }}
                    className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-full text-sm font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
