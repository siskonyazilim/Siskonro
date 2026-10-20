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

const TEXT = {
  tr: {
    title: 'Arama Yapın',
    placeholder: 'Aramak için yazın...',
    close: 'Aramayı kapat',
    submit: 'Ara',
    popular: 'Popüler aramalar',
    suggestions: 'Öneriler',
  },
  en: {
    title: 'Search',
    placeholder: 'Type to search...',
    close: 'Close search',
    submit: 'Search',
    popular: 'Popular searches',
    suggestions: 'Suggestions',
  },
  ro: {
    title: 'Căutare',
    placeholder: 'Tastați pentru a căuta...',
    close: 'Închideți căutarea',
    submit: 'Caută',
    popular: 'Căutări populare',
    suggestions: 'Sugestii',
  },
};

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const inputRef = useRef(null);
  const router = useRouter();
  const { localizePath, locale } = useLanguage();
  const [query, setQuery] = useState('');
  const text = TEXT[locale] || TEXT.tr;

  // Açılınca input'a odaklan, sayfa kaydırmasını kilitle, Esc ile kapat
  useEffect(() => {
    if (!searchOpen) {
      setQuery('');
      return undefined;
    }

    inputRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen, setSearchOpen]);

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

  const goToResults = (term) => {
    const trimmed = term?.trim();
    if (!trimmed) return;
    router.push(`${localizePath('/search')}?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    goToResults(query);
  };

  const handleClose = () => setSearchOpen(false);

  if (!searchOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={text.title}
      className="search-overlay fixed inset-0 z-[10000] flex items-start md:items-center justify-center bg-[#0A192F]/95 backdrop-blur-md px-5 pt-[18vh] md:pt-0 overflow-y-auto"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      {/* Kapat */}
      <button
        type="button"
        onClick={handleClose}
        aria-label={text.close}
        className="absolute top-4 right-4 md:top-8 md:right-10 w-12 h-12 flex items-center justify-center rounded-full text-white/80 hover:text-[#08DCFF] hover:bg-white/10 hover:scale-110 transition-all duration-300"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-[600px] lg:max-w-[800px] flex flex-col items-center gap-6 md:gap-10">
        <h3 className="text-white text-2xl md:text-4xl font-semibold tracking-wide text-center">
          {text.title}
        </h3>

        <form
          role="search"
          onSubmit={handleSearch}
          className="w-full relative border-b-2 border-white/20 focus-within:border-[#08DCFF] transition-colors duration-300"
        >
          <label htmlFor="site-search-input" className="sr-only">{text.title}</label>
          <input
            ref={inputRef}
            id="site-search-input"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.placeholder}
            autoComplete="off"
            enterKeyHint="search"
            className="w-full bg-transparent text-white text-xl md:text-3xl font-medium placeholder-white/40 py-4 pr-14 outline-none"
          />
          <button
            type="submit"
            aria-label={text.submit}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-white hover:text-[#08DCFF] transition-colors duration-300"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {liveSuggestions.length > 0 && (
          <div className="w-full flex flex-col items-center gap-3">
            <p className="font-archivo text-sm text-white/60">
              {query.trim() ? text.suggestions : text.popular}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {liveSuggestions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => goToResults(tag)}
                  className="min-h-[40px] px-4 py-2 rounded-full border border-white/20 text-white/90 text-sm font-medium hover:border-[#08DCFF] hover:text-[#08DCFF] hover:bg-white/5 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
