'use client';

import { useLanguage } from '../../_context/LanguageContext';

/**
 * Per-page locale helper.
 * Import your page's tr/en/ro JSON files and pass them here.
 * Returns a `pt(key)` function that reads from the correct locale object.
 *
 * Usage:
 *   import tr from './_locales/tr.json';
 *   import en from './_locales/en.json';
 *   import ro from './_locales/ro.json';
 *   const pt = usePageLocale(tr, en, ro);
 *   // then use: pt('section.key') or pt('arrayKey')[0]
 */
export function usePageLocale(tr, en, ro) {
  const { locale } = useLanguage();
  const msgs = locale === 'en' ? en : locale === 'ro' ? ro : tr;

  /**
   * Resolve a dot-separated key from the locale messages object.
   * Returns the value or undefined (NOT the key string) so that
   * array defaults work correctly: pt('missingArray') ?? [] => []
   */
  return function pt(key) {
    const value = key.split('.').reduce((acc, part) => acc?.[part], msgs);
    return value;
  };
}
