'use client';

import React from 'react';
import SmartImage from './SmartImage';
import { useLanguage } from '../_context/LanguageContext';

export default function FooterDocsBar() {
  const { locale } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <a
        href="/downloads/Fatura_Bilgileri.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative rounded-2xl border border-sky-100 bg-white px-5 md:px-6 py-5 md:py-6 pr-16 md:pr-20 hover:border-sky-300 hover:shadow-md transition-all focus-ring-card"
      >
        <p className="text-[15px] md:text-base font-extrabold text-[#0F4D9A] uppercase tracking-wide leading-tight">
          {isRo ? 'INFORMAȚII FACTURARE' : isEn ? 'INVOICE INFORMATION' : 'FATURA BİLGİLERİMİZ'}
        </p>
        <SmartImage
          src="/assets/new/iletisim/asset-49.svg"
          alt={isRo ? 'Document Factură' : isEn ? 'Invoice Document' : 'Fatura Belgesi'}
          width={40}
          height={40}
          className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 shrink-0 opacity-90 group-hover:opacity-100"
          fallbackLabel="Icon"
        />
      </a>
    </div>
  );
}
