'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/app/store/useUIStore';

// Arama penceresi kapalıyken hiçbir şey çizmez; kodu ilk kez açılana kadar indirilmez/çalıştırılmaz.
const SearchModal = dynamic(() => import('./SearchModal'), { ssr: false });

export default function SearchModalLazy() {
  const searchOpen = useUIStore((state) => state.searchOpen);
  const [hasOpened, setHasOpened] = useState(searchOpen);
  if (searchOpen && !hasOpened) setHasOpened(true);
  return hasOpened ? <SearchModal /> : null;
}
