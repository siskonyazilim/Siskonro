'use client';

import React, { createContext, useCallback, useContext, useMemo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { usePathname, useRouter } from 'next/navigation';
import { detectLocale, toLocalizedPath } from '../lib/i18n/routes';
import { trMessages, enMessages, roMessages } from '../../messages';

const LanguageContext = createContext();

// Use window.location.pathname (real URL) rather than Next.js usePathname()
// which returns the rewritten internal path (losing /ro or /en prefix).
function getWindowLocale() {
  if (typeof window === 'undefined') return null;
  return detectLocale(window.location.pathname);
}

export function LanguageProvider(props) {
  const { children, initialLocale = 'ro' } = props;
  const pathname = usePathname();
  const router = useRouter();
  const currentPathname = pathname || '/';

  // Keep first server/client render deterministic using locale passed from RootLayout.
  // After mount we still correct from window.location.pathname when rewrites are involved.
  const [clientLocale, setClientLocale] = useState(() => initialLocale);
  const [version, setVersion] = useState(0); // Force re-render trigger
  const lastPathnameRef = useRef(currentPathname);

  // After mount: correct locale from the real URL (window) in case of rewrite
  useEffect(() => {
    const windowLocale = getWindowLocale();
    if (windowLocale && windowLocale !== clientLocale) {
      // senkron setState yerine mikro görev (effect gövdesinde kademeli render olmasın)
      queueMicrotask(() => setClientLocale(windowLocale));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync when pathname changes (real navigation) — use window locale for accuracy
  useEffect(() => {
    if (currentPathname !== lastPathnameRef.current) {
      const windowLocale = getWindowLocale() ?? detectLocale(currentPathname);
      setClientLocale(windowLocale);
      lastPathnameRef.current = currentPathname;
    }
  }, [currentPathname]);

  const locale = clientLocale;

  // Dil client tarafında değişince <html lang> (sunucuda bir kez yazılıyor) da güncellensin:
  // ekran okuyucular ve tarayıcı çeviri/yazım denetimi doğru dili görsün.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const lang = locale === 'en' ? 'EN' : locale === 'ro' ? 'RO' : 'TR';
  const messages = locale === 'en' ? enMessages : locale === 'ro' ? roMessages : trMessages;

  const setLang = useCallback((value) => {
    const normalized = (value || '').toUpperCase();
    const nextLocale = normalized === 'EN' ? 'en' : normalized === 'RO' ? 'ro' : 'tr';

    // Update client state immediately for instant UI change
    setClientLocale(nextLocale);
    setVersion(v => v + 1); // Force re-render

    // Update URL without triggering navigation
    // Use window.location.pathname for accuracy (real URL with locale prefix)
    const realPathname = typeof window !== 'undefined' ? window.location.pathname : currentPathname;
    const nextPath = toLocalizedPath(realPathname, nextLocale);

    try {
      router.replace(nextPath, { scroll: false });
    } catch {
      window.history.replaceState(null, '', nextPath);
    }
  }, [currentPathname, router]);

  const toggleLanguage = useCallback(() => {
    setLang(lang === 'TR' ? 'EN' : lang === 'EN' ? 'RO' : 'TR');
  }, [lang, setLang]);

  const localizePath = useCallback((path, targetLocale = locale) => toLocalizedPath(path, targetLocale), [locale]);
  const t = useCallback((key) => {
    const value = key.split('.').reduce((acc, part) => acc?.[part], messages);
    return value !== undefined ? value : key;
  }, [messages]);

  const value = useMemo(
    () => ({ lang, locale, setLang, toggleLanguage, localizePath, t, version }),
    [lang, locale, setLang, toggleLanguage, localizePath, t, version]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialLocale: PropTypes.oneOf(['tr', 'en', 'ro']),
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
