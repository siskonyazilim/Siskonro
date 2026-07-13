'use client';

import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function AllServicesCard({ t, localizePath }) {
  return (
    <div className="card reveal animated-card h-full flex flex-col text-white" data-tilt="true" style={{ background: 'linear-gradient(135deg, #0A2540 0%, #0EA5E9 100%)' }}>
      <div className="card-body flex-1 flex flex-col min-h-[280px]">
        <span className="eyebrow text-sky-300 font-extrabold uppercase tracking-wider">{t('home.allServicesEyebrow')}</span>
        <h3 className="mb-3 text-white font-black text-2xl drop-shadow-md">{t('home.allServicesTitle')}</h3>
        <p className="mb-6 text-sky-100 font-semibold leading-relaxed drop-shadow-sm">{t('home.allServicesDescription')}</p>
        <Link className="btn btn-outline border-white text-white font-bold hover:bg-white hover:text-sky-950 transition-colors self-start mt-auto" href={localizePath('/hizmetler')}>
          {t('home.allServicesButton')}
        </Link>
      </div>
    </div>
  );
}

AllServicesCard.propTypes = {
  t: PropTypes.func.isRequired,
  localizePath: PropTypes.func.isRequired,
};