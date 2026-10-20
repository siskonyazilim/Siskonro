'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useLanguage } from '../_context/LanguageContext';

const MEGA_MENU_ICONS = {
  '/hizmetler/musteriye-ozel-yazilim': {
    dark: '/SiteIcon/MegaMenu/Moy.svg',
    white: '/SiteIcon/MegaMenu/white/MoyWhite.svg',
  },
  '/hizmetler/iiot': {
    dark: '/SiteIcon/MegaMenu/Iot.svg',
    white: '/SiteIcon/MegaMenu/white/IotWhite.svg',
  },
  '/hizmetler/izlenebilirlik-cozumleri': {
    dark: '/SiteIcon/MegaMenu/Izlenebilirlik.svg',
    white: '/SiteIcon/MegaMenu/white/IzlenebilirlikWhite.svg',
  },
  '/hizmetler/makine-proses-otomasyonu': {
    dark: '/SiteIcon/MegaMenu/MakineProses.svg',
    white: '/SiteIcon/MegaMenu/white/MakineProsesWhite.svg',
  },
  '/hizmetler/robot-cozumleri': {
    dark: '/SiteIcon/MegaMenu/Robot.svg',
    white: '/SiteIcon/MegaMenu/white/RobotWhite.svg',
  },
  '/hizmetler/goruntu-isleme': {
    dark: '/SiteIcon/MegaMenu/GoruntuIsleme.svg',
    white: '/SiteIcon/MegaMenu/white/GoruntuIslemeWhite.svg',
  },
  '/hizmetler/ai-makine-ogrenmesi': {
    dark: '/SiteIcon/MegaMenu/AiMakine.svg',
    white: '/SiteIcon/MegaMenu/white/AiMakineWhite.svg',
  },
  '/hizmetler/microsoft-cozumleri': {
    dark: '/SiteIcon/MegaMenu/Microsoft.svg',
    white: '/SiteIcon/MegaMenu/white/MicrosoftWhite.svg',
  },
  '/hizmetler/velotic': {
    dark: '/SiteIcon/MegaMenu/Velotic.svg',
    white: '/SiteIcon/MegaMenu/white/VeloticWhite.svg',
  },
  '/hizmetler/egitim-danismanlik': {
    dark: '/SiteIcon/MegaMenu/EgitimDanismanlik.svg',
    white: '/SiteIcon/MegaMenu/white/EgitimDanismanlikWhite.svg',
  },
};

export default function MegaMenu({ isOpen, onClose, services, onMouseEnter, onMouseLeave }) {
  const { localizePath, t } = useLanguage();

  const currentSidebar = {
    label: t('megaMenu.label'),
    desc: t('megaMenu.desc'),
    features: [
      t('megaMenu.features.0'),
      t('megaMenu.features.1'),
      t('megaMenu.features.2'),
    ],
    btnText: t('megaMenu.btnText'),
  };

  // Render checkmark icon for bullet points
  const renderCheckIcon = () => (
    <svg
      className="onsuit-mega-feature-icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ color: '#10b981', width: '18px', height: '18px' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div
      className={`mega_menu_inner ${isOpen ? 'is-active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
      tabIndex={-1}
    >
      <div className="onsuit-mega-wrapper">
        {/* A. Sol Kenar Çubuğu (Sidebar - Ekosistem Tanıtımı) */}
        <div className="onsuit-mega-sidebar">
          <div>
            <div className="onsuit-mega-sidebar-label">
              {currentSidebar.label}
            </div>
            <p className="onsuit-mega-sidebar-desc">
              {currentSidebar.desc}
            </p>
            <ul className="onsuit-mega-features-list">
              {currentSidebar.features.map((feat) => (
                <li key={feat} className="onsuit-mega-feature-item">
                  {renderCheckIcon()}
                  <span className="onsuit-mega-feature-text">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={localizePath('/hizmetler')}
            onClick={onClose}
            className="onsuit-mega-all-btn group"
          >
            <span>{currentSidebar.btnText}</span>
            <svg
              className="onsuit-mega-all-btn-arrow w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* B. Sağ Panel (Modüller Grid) */}
        <div className="onsuit-mega-grid-panel">
          <div className="onsuit-mega-grid">
            {services.map((service, index) => {
              // Normalize href to find icons mapping
              const defaultPath = service.href.replace(/^\/(en|tr|ro)(?=\/|$)/i, '') || '/';
              const predefined = MEGA_MENU_ICONS[defaultPath];
              const darkIcon = service.icon || predefined?.dark || '/SiteIcon/MegaMenu/Iot.svg';
              const whiteIcon = service.whiteIcon || predefined?.white || '/SiteIcon/MegaMenu/white/IotWhite.svg';

              const isLastItem = index === services.length - 1;

              return (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={onClose}
                  className={`onsuit-mega-card`}
                >
                  <div className="onsuit-mega-card-icon">
                    {/* Dark Icon (Default) */}
                    <div className="onsuit-mega-icon-dark relative w-6 h-6">
                      <Image
                        src={darkIcon}
                        alt=""
                        fill
                        unoptimized
                        className="object-contain"
                        aria-hidden="true"
                      />
                    </div>
                    {/* White Icon (Hover) */}
                    <div className="onsuit-mega-icon-white relative w-6 h-6">
                      <Image
                        src={whiteIcon}
                        alt=""
                        fill
                        unoptimized
                        className="object-contain"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <div className="onsuit-mega-card-content">
                    <h4 className="onsuit-mega-card-title">
                      {service.label}
                    </h4>
                    <p className="onsuit-mega-card-desc">
                      {service.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

MegaMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};
