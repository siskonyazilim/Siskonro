'use client';

import { useEffect, useState } from 'react';

/**
 * Header/Footer verisi: sunucu yalnızca ilk dilin verisini verir ({ [locale]: data }).
 * Kullanıcı dili değiştirince eksik dilin verisi /api/layout-data'dan çekilir.
 * Yeni veri gelene kadar elde olan ilk dilin verisi gösterilir (null = sunucu hata verdi).
 */
export function useLocaleLayoutData(initial, locale, type) {
  const [store, setStore] = useState(initial || {});

  useEffect(() => {
    if (!initial || store[locale] !== undefined) return undefined;
    let cancelled = false;
    fetch(`/api/layout-data?type=${type}&locale=${locale}`)
      .then((res) => (res.ok ? res.json() : { data: null }))
      .catch(() => ({ data: null }))
      .then((json) => {
        if (!cancelled) setStore((prev) => ({ ...prev, [locale]: json?.data ?? null }));
      });
    return () => {
      cancelled = true;
    };
  }, [initial, store, locale, type]);

  return store;
}
