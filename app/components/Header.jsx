'use client';

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/app/store/useUIStore';
import { useLanguage } from '../_context/LanguageContext';
import { SERVICE_CATALOG } from '../../config/services';
import MegaMenu from './MegaMenu';

const MENU_ICON_BY_PATH = {
  '/hizmetler/ai-makine-ogrenmesi': '/SiteIcon/MegaMenu/AiMakine.svg',
  '/kurumsal/bizi-taniyin': '/SiteIcon/MegaMenu/BiziTaniyin.svg',
  '/blog': '/SiteIcon/MegaMenu/Blog.svg',
  '/kurumsal/kariyer': '/SiteIcon/MegaMenu/Kariyer.svg',
  '/kurumsal/surdurulebilirlik': '/SiteIcon/MegaMenu/Surdurulebilirlik.svg',
  '/hizmetler/egitim-danismanlik': '/SiteIcon/MegaMenu/EgitimDanismanlik.svg',
  '/hizmetler/velotic': '/SiteIcon/MegaMenu/Velotic.svg',
  '/hizmetler/goruntu-isleme': '/SiteIcon/MegaMenu/GoruntuIsleme.svg',
  '/hizmetler/iiot': '/SiteIcon/MegaMenu/Iot.svg',
  '/hizmetler/izlenebilirlik-cozumleri': '/SiteIcon/MegaMenu/Izlenebilirlik.svg',
  '/hizmetler/makine-proses-otomasyonu': '/SiteIcon/MegaMenu/MakineProses.svg',
  '/hizmetler/microsoft-cozumleri': '/SiteIcon/MegaMenu/Microsoft.svg',
  '/hizmetler/musteriye-ozel-yazilim': '/SiteIcon/MegaMenu/Moy.svg',
  '/onsuite': null,
  '/hizmetler/robot-cozumleri': '/SiteIcon/MegaMenu/Robot.svg',
};

const SERVICE_PATH_TO_DESC_KEY = {
  '/hizmetler/musteriye-ozel-yazilim': 'customSoftware',
  '/hizmetler/iiot': 'iiot',
  '/hizmetler/izlenebilirlik-cozumleri': 'traceability',
  '/hizmetler/makine-proses-otomasyonu': 'automation',
  '/hizmetler/robot-cozumleri': 'robotics',
  '/hizmetler/goruntu-isleme': 'vision',
  '/hizmetler/ai-makine-ogrenmesi': 'ai',
  '/hizmetler/microsoft-cozumleri': 'microsoft',
  '/hizmetler/velotic': 'velotic',
  '/hizmetler/egitim-danismanlik': 'training',
};

const MENU_WHITE_ICON_BY_PATH = {
  '/hizmetler/ai-makine-ogrenmesi': '/SiteIcon/MegaMenu/white/AiMakineWhite.svg',
  '/kurumsal/bizi-taniyin': '/SiteIcon/MegaMenu/white/BiziTaniyinWhite.svg',
  '/blog': '/SiteIcon/MegaMenu/white/BlogWhite.svg',
  '/kurumsal/kariyer': '/SiteIcon/MegaMenu/white/KariyerWhite.svg',
  '/kurumsal/surdurulebilirlik': '/SiteIcon/MegaMenu/white/SurdurulebilirlikWhite.svg',
  '/hizmetler/egitim-danismanlik': '/SiteIcon/MegaMenu/white/EgitimDanismanlikWhite.svg',
  '/hizmetler/velotic': '/SiteIcon/MegaMenu/white/VeloticWhite.svg',
  '/hizmetler/goruntu-isleme': '/SiteIcon/MegaMenu/white/GoruntuIslemeWhite.svg',
  '/hizmetler/iiot': '/SiteIcon/MegaMenu/white/IotWhite.svg',
  '/hizmetler/izlenebilirlik-cozumleri': '/SiteIcon/MegaMenu/white/IzlenebilirlikWhite.svg',
  '/hizmetler/makine-proses-otomasyonu': '/SiteIcon/MegaMenu/white/MakineProsesWhite.svg',
  '/hizmetler/microsoft-cozumleri': '/SiteIcon/MegaMenu/white/MicrosoftWhite.svg',
  '/hizmetler/musteriye-ozel-yazilim': '/SiteIcon/MegaMenu/white/MoyWhite.svg',
  '/hizmetler/robot-cozumleri': '/SiteIcon/MegaMenu/white/RobotWhite.svg',
};

function getMenuIconForHref(href = '') {
  const normalizedPath = href.replace(/^\/(en|tr|ro)(?=\/|$)/i, '') || '/';
  return MENU_ICON_BY_PATH[normalizedPath] ?? null;
}

function getMenuWhiteIconForHref(href = '') {
  const normalizedPath = href.replace(/^\/(en|tr|ro)(?=\/|$)/i, '') || '/';
  return MENU_WHITE_ICON_BY_PATH[normalizedPath] ?? null;
}

function getMenuDescriptionForHref(href = '', t) {
  const normalizedPath = href.replace(/^\/(en|tr|ro)(?=\/|$)/i, '') || '/';
  const descKey = SERVICE_PATH_TO_DESC_KEY[normalizedPath];
  if (!descKey || typeof t !== 'function') return '';
  return t(`header.descriptions.${descKey}`);
}

/**
 * Bir servis href'i için Strapi descriptions/icons nesnesindeki anahtar adını döner.
 * Örn: '/hizmetler/iiot' → 'iiot'
 */
function getMenuDescKey(href = '') {
  const normalizedPath = href.replace(/^\/(en|tr|ro)(?=\/|$)/i, '') || '/';
  return SERVICE_PATH_TO_DESC_KEY[normalizedPath] ?? null;
}

function NavLink({ href, children, onClick, scrolled = false, pathname = '' }) {
  const isActive = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      className={`relative px-5 py-3 font-bold text-[17px] tracking-tight transition-all duration-300 min-h-[44px] flex items-center group whitespace-nowrap ${scrolled
        ? 'text-[#1A1A1A] hover:text-[#1B3A63]'
        : 'text-[#F8FAFC] hover:text-[#08DCFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
        } ${isActive ? (scrolled ? 'text-[#1B3A63]' : 'text-[#08DCFF]') : ''}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <span className={`absolute bottom-2 left-5 right-5 h-0.5 ${scrolled ? 'bg-[#1B3A63]' : 'bg-[#08DCFF]'} transform ${isActive ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 origin-left group-hover:scale-x-100`} />
    </Link>
  );
}

function NavDropdown({ title, href, items, scrolled = false, isOpen = false, onOpen, onClose, sidePanel, useMegaPalette = false }) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const closeTimeoutRef = useRef(null);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    onOpen?.(href);
  };

  const closeMenuWithDelay = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    onClose?.(href);
    setFocusedIndex(-1);
    closeTimeoutRef.current = null;
  };

  const focusItem = (nextIndex) => {
    if (!items.length) {
      return;
    }

    const boundedIndex = (nextIndex + items.length) % items.length;
    setFocusedIndex(boundedIndex);
    itemRefs.current[boundedIndex]?.focus();
  };

  const handleTriggerKeyDown = (event) => {
    if (!items.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openMenu();
      focusItem(0);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu();
      focusItem(items.length - 1);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose?.(href);
      setFocusedIndex(-1);
    }
  };

  const handleTriggerClick = (event) => {
    if (!items.length) {
      return;
    }

    // First click opens the dropdown, second click follows the parent link.
    if (!isOpen) {
      event.preventDefault();
      openMenu();
    }
  };

  const handleMenuItemKeyDown = (event, index) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(index + 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(index - 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusItem(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusItem(items.length - 1);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose?.(href);
      setFocusedIndex(-1);
      triggerRef.current?.focus();
    }
  };

  const handleContainerBlur = (event) => {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      closeMenuWithDelay();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleDocumentKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return;
      }
      onClose?.(href);
      setFocusedIndex(-1);
      triggerRef.current?.focus();
    };

    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsidePointer = (event) => {
      if (containerRef.current?.contains(event.target)) {
        return;
      }
      onClose?.(href);
      setFocusedIndex(-1);
    };

    document.addEventListener('mousedown', handleOutsidePointer);
    document.addEventListener('touchstart', handleOutsidePointer, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleOutsidePointer);
      document.removeEventListener('touchstart', handleOutsidePointer);
    };
  }, [href, isOpen, onClose]);

  // Menü kapanınca odak indeksini sıfırla (render sırasında state ayarı)
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) setFocusedIndex(-1);
  }

  const isMegaLayout = Boolean(sidePanel);
  const isMegaPaletteOnly = useMegaPalette && !isMegaLayout;
  const isMegaStyleDropdown = isMegaLayout || isMegaPaletteOnly;

  const getFocusedClass = (index) => {
    if (focusedIndex !== index) return '';
    return isMegaStyleDropdown ? 'ring-2 ring-sky-200' : 'bg-slate-50';
  };

  const renderDropdownIcon = (item) => {
    if (!item.icon) return null;

    if (!isMegaStyleDropdown) {
      return (
        <Image
          src={item.icon}
          alt=""
          width={24}
          height={24}
          className="w-5 h-5 object-contain transition-all duration-300 group-hover/item:brightness-0 group-hover/item:invert"
          aria-hidden="true"
        />
      );
    }

    return (
      <>
        <div className="onsuit-mega-icon-dark relative w-6 h-6">
          <Image
            src={item.icon}
            alt=""
            fill
            unoptimized
            className="object-contain"
            aria-hidden="true"
          />
        </div>
        {item.whiteIcon ? (
          <div className="onsuit-mega-icon-white relative w-6 h-6">
            <Image
              src={item.whiteIcon}
              alt=""
              fill
              unoptimized
              className="object-contain"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </>
    );
  };

  const renderDropdownLabel = (item) => {
    if (isMegaStyleDropdown) {
      return <h4 className="onsuit-mega-card-title">{item.label}</h4>;
    }

    return (
      <span className="block text-[0.96rem] md:text-[1.02rem] font-bold transition-colors text-slate-900 group-hover/item:text-sky-700 leading-tight">
        {item.label}
      </span>
    );
  };

  const renderDropdownDescription = (item) => {
    if (!item.description) return null;

    if (isMegaStyleDropdown) {
      return <p className="onsuit-mega-card-desc">{item.description}</p>;
    }

    return (
      <span className="block mt-1 text-[0.78rem] md:text-[0.84rem] text-slate-500 leading-relaxed font-archivo">
        {item.description}
      </span>
    );
  };

  return (
    <div
      className="relative group"
      ref={containerRef}
    >
      <Link
        href={href}
        ref={triggerRef}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`${href}-menu`}
        onMouseEnter={openMenu}
        onFocus={openMenu}
        onBlur={handleContainerBlur}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className={`px-5 py-3 font-bold text-[17px] tracking-tight transition-all duration-300 min-h-[44px] flex items-center group/link whitespace-nowrap ${scrolled
          ? 'text-[#1A1A1A] hover:text-[#1B3A63]'
          : 'text-[#F8FAFC] hover:text-[#08DCFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
          }`}
      >
        <span className="relative z-10 inline-flex items-center gap-1.5">
          {title}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <span className={`absolute bottom-2 left-5 right-5 h-0.5 bg-sky-600 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100`} />
      </Link>

      {/* Modern Large Dropdown - Matching Design */}
      <div
        className={`transition-all duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-[101] ${isMegaLayout ? 'fixed pt-4' : 'absolute left-1/2 -translate-x-1/2 mt-4'} ${isOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-3 pointer-events-none'}`}
        style={isMegaLayout ? {
          top: 'var(--hdr-bottom, 96px)',
          left: 'max(24px, var(--mega-left, 160px))',
          right: 'max(24px, var(--mega-right, 100px))',
        } : {}}
      >
        <div className={`${isMegaLayout ? 'w-full max-w-[1240px] mx-auto flex rounded-[26px] border border-[rgba(0,8,77,0.08)] overflow-hidden bg-white shadow-[0_28px_70px_rgba(0,8,77,0.18),0_8px_24px_rgba(0,8,77,0.08)]' : isMegaPaletteOnly ? 'w-[min(calc(100vw-40px),760px)] flex rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] border overflow-hidden bg-white border-slate-100' : 'w-[min(calc(100vw-40px),640px)] flex rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] border overflow-hidden bg-white border-slate-100'}`}>

          {isMegaLayout && (
            <div className="hidden lg:flex w-[340px] onsuit-mega-sidebar border-r border-[rgba(0,8,77,0.05)] flex-col justify-between shrink-0">
              {sidePanel}
            </div>
          )}

          <div className={`flex-1 flex relative w-full ${isMegaLayout ? 'onsuit-mega-grid-panel' : isMegaPaletteOnly ? 'p-7 md:p-8' : ''}`}>
            <div
              id={`${href}-menu`}
              className={isMegaLayout
                ? 'onsuit-mega-grid'
                : isMegaPaletteOnly
                  ? 'grid gap-6 w-full grid-cols-1 sm:grid-cols-2'
                  : 'p-6 md:p-7 grid gap-3.5 flex-1 grid-cols-1 sm:grid-cols-2'}
              role="menu"
              tabIndex={-1}
              aria-label={title}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenuWithDelay}
            >
              {items.map((item, index) => {
                const focusedClass = getFocusedClass(index);
                const defaultCardClass = 'flex items-start gap-3.5 p-4 rounded-2xl border transition-all duration-300 group/item';
                const cardClass = isMegaLayout
                  ? `onsuit-mega-card group/item ${focusedClass}`
                  : isMegaPaletteOnly
                    ? `onsuit-mega-card group/item w-full min-w-0 p-5 min-h-[132px] ${focusedClass}`
                    : isMegaStyleDropdown
                      ? `onsuit-mega-card group/item w-full min-w-0 ${focusedClass}`
                    : `${defaultCardClass} border-slate-200/80 hover:bg-slate-50/80 hover:border-sky-300 hover:shadow-sm ${focusedClass}`;

                const iconContainerClass = isMegaLayout
                  ? 'onsuit-mega-card-icon'
                  : isMegaStyleDropdown
                    ? 'onsuit-mega-card-icon'
                    : 'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 bg-sky-50/80 border border-sky-100 group-hover/item:bg-sky-500 group-hover/item:border-sky-500';

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    role="menuitem"
                    tabIndex={isOpen ? 0 : -1}
                    onFocus={() => {
                      openMenu();
                      setFocusedIndex(index);
                    }}
                    onClick={() => {
                      onClose?.(href);
                      setFocusedIndex(-1);
                    }}
                    onBlur={handleContainerBlur}
                    onKeyDown={(event) => handleMenuItemKeyDown(event, index)}
                    className={cardClass}
                  >
                    <div className={iconContainerClass}>
                      {renderDropdownIcon(item)}
                    </div>
                    <div className={isMegaStyleDropdown ? 'onsuit-mega-card-content' : 'min-w-0 flex-1'}>
                      {renderDropdownLabel(item)}
                      {renderDropdownDescription(item)}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ isOpen, onClose, items }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const { lang, setLang, localizePath, t } = useLanguage();
  const setSearchOpen = useUIStore((state) => state.setSearchOpen);

  if (!isOpen) return null;

  return (
    <nav
      id="mobile-nav"
      className="fixed inset-0 z-[9999] overflow-hidden flex flex-col transition-all duration-500 shadow-2xl opacity-100"
      style={{ background: 'linear-gradient(135deg, #0A192F 0%, #061B3B 50%, #030B1A 100%)' }}
    >
      {/* Dynamic Glow Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative flex-1 overflow-hidden">
        {/* Ana Menü Görünümü — X butonu + öğeler tek akış */}
        <div className={`absolute inset-0 flex flex-col transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeSubmenu ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100 pointer-events-auto'}`}>
          {/* Arama + X butonu — öğelerle aynı akışta, sağa hizalı */}
          <div className="flex justify-end items-center gap-2 px-5 sm:px-6 pt-4 pb-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                setSearchOpen(true);
              }}
              aria-label={t('common.search')}
              className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('header.aria.closeMenu')}
              className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menü öğeleri — X butonundan hemen sonra, büyük padding yok */}
          <div className="flex flex-col gap-1 overflow-y-auto px-3 sm:px-5 pb-4 no-scrollbar w-full flex-1 justify-center">
            {items.map((item) => (
              <div
                key={item.href}
                className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-white/5 transition-all group"
              >
                {item.submenu ? (
                  <>
                    {/* Başlık: doğrudan sayfaya gider */}
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-white font-bold text-[clamp(1.4rem,5vw,2rem)] tracking-tight group-hover:text-sky-400 transition-all duration-300 flex-1 text-left py-1"
                    >
                      {item.label}
                    </Link>
                    {/* Ok: alt menüyü açar */}
                    <button
                      type="button"
                      onClick={() => setActiveSubmenu(item)}
                      aria-label={item.label}
                      aria-haspopup="true"
                      className="w-12 h-12 rounded-xl border border-sky-400/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 hover:text-sky-200 transition-all shrink-0 flex items-center justify-center"
                    >
                      <svg className="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-white font-bold text-[clamp(1.4rem,5vw,2rem)] tracking-tight group-hover:text-sky-400 transition-all duration-300 flex-1 text-left"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submenu View (Image 2 Style - High Fidelity Cards) */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeSubmenu ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}
        >
          <div className="flex flex-col h-full bg-[#0A192F]">
            {/* Geri butonu — sabit, kaydırmayla gitmez */}
            <div className="px-5 sm:px-6 pt-3 pb-2 shrink-0 border-b border-white/10">
              <button
                type="button"
                onClick={() => setActiveSubmenu(null)}
                className="flex items-center gap-2 min-h-[44px] py-2 px-3 rounded-xl text-white/60 hover:text-white hover:bg-white/8 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-bold text-sm tracking-tight">{t('header.aria.back').replace(/^[←\s]+/, '')}</span>
              </button>
            </div>

            {/* Tanıtım paneli + hizmet kartları — tek kaydırma alanı */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-16 sm:pb-20 flex flex-col gap-3 no-scrollbar pt-4">
              {activeSubmenu?.mobileSidePanel && (
                <div className="px-1 pb-3 mb-1 border-b border-white/10">
                  {activeSubmenu.mobileSidePanel}
                </div>
              )}
              {activeSubmenu?.submenu?.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={onClose}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#061B3B]/85 backdrop-blur-xl border border-sky-400/25 hover:border-sky-400 transition-all group active:scale-95 shadow-lg text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00D1FF]/20 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#00D1FF]/30">
                    {sub.whiteIcon ? (
                      <Image
                        src={sub.whiteIcon}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-white block font-bold text-[0.98rem] leading-snug tracking-tight group-hover:text-sky-300">
                      {sub.label}
                    </span>
                    {sub.description ? (
                      <span className="block mt-1 text-[0.8rem] text-white/70 leading-relaxed [text-wrap:balance] font-archivo">
                        {sub.description}
                      </span>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Language Toggle */}
      <div className="relative z-10 px-8 py-4 border-t border-white/10 flex justify-center gap-4 shrink-0">
        {['TR', 'EN', 'RO'].map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => { onClose(); setLang(code); }}
            aria-pressed={lang === code}
            className={`min-h-[44px] min-w-[56px] px-3 rounded-lg text-sm font-black tracking-[0.2em] transition-all ${lang === code ? 'text-sky-400 bg-sky-500/10' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
          >
            {code}
          </button>
        ))}
      </div>
    </nav>
  );
}

/**
 * Strapi veya t() fallback'den değer döner.
 * strapiValue dolu ise onu, aksi takdirde t(key) sonucunu kullanır.
 */
function sv(strapiValue, t, key) {
  return strapiValue || t(key);
}

function buildMenuItems({ t, canonicalServiceMenu, strapiData }) {
  const sp   = strapiData?.sidePanel      ?? {};
  const nav  = strapiData?.navigation     ?? {};
  const corp = strapiData?.corporate      ?? {};
  // hizmetlerItems: { customSoftware: 'label', iiot: 'label', ... }
  const hizItems    = strapiData?.hizmetlerItems  ?? null;
  // kurumsalItems: { about: { label, desc }, blog: { label, desc }, ... }
  const kuruItems   = strapiData?.kurumsalItems   ?? null;

  const sidePanelTag      = sv(sp.tag,       t, 'header.sidePanel.tag');
  const sidePanelTitle1   = sv(sp.titleLine1, t, 'header.sidePanel.titleLine1');
  const sidePanelTitle2   = sv(sp.titleLine2, t, 'header.sidePanel.titleLine2');
  const sidePanelDesc     = sv(sp.desc,       t, 'header.sidePanel.desc');
  const sidePanelFeature1 = sv(sp.feature1,   t, 'header.sidePanel.feature1');
  const sidePanelFeature2 = sv(sp.feature2,   t, 'header.sidePanel.feature2');
  const sidePanelFeature3 = sv(sp.feature3,   t, 'header.sidePanel.feature3');

  /**
   * Servis için label önceliği:
   *   1. Strapi hizmetlerItems[serviceKey]  (Strapi repeatable)
   *   2. canonicalServiceMenu[i].label       (SERVICE_CATALOG.names[locale])
   */
  const serviceMenuWithStrapiLabels = canonicalServiceMenu.map((item) => {
    const descKey = item.descKey; // Header.jsx'te getMenuDescKey() ile set edilir
    if (hizItems && descKey && hizItems[descKey]) {
      return { ...item, label: hizItems[descKey] };
    }
    return item;
  });

  /**
   * Kurumsal submenu için label/desc önceliği:
   *   1. Strapi kurumsalItems[key].{ label, desc }  (Strapi repeatable)
   *   2. Strapi corporate[key].{ label, desc }       (Strapi component)
   *   3. t() fallback
   */
  const kuruItem = (key, tLabelKey, tDescKey) => ({
    label:       sv(kuruItems?.[key]?.label || corp[key]?.label, t, tLabelKey),
    description: sv(kuruItems?.[key]?.desc  || corp[key]?.desc,  t, tDescKey),
  });

  const corporateItems = [
    {
      ...kuruItem('about', 'header.corporate.about.label', 'header.corporate.about.desc'),
      href: '/kurumsal/bizi-taniyin',
      icon: '/SiteIcon/MegaMenu/BiziTaniyin.svg',
      whiteIcon: '/SiteIcon/MegaMenu/white/BiziTaniyinWhite.svg',
    },
    {
      ...kuruItem('blog', 'header.corporate.blog.label', 'header.corporate.blog.desc'),
      href: '/blog',
      icon: '/SiteIcon/MegaMenu/Blog.svg',
      whiteIcon: '/SiteIcon/MegaMenu/white/BlogWhite.svg',
    },
    {
      ...kuruItem('career', 'header.corporate.career.label', 'header.corporate.career.desc'),
      href: '/kurumsal/kariyer',
      icon: '/SiteIcon/MegaMenu/Kariyer.svg',
      whiteIcon: '/SiteIcon/MegaMenu/white/KariyerWhite.svg',
    },
    {
      ...kuruItem('sustainability', 'header.corporate.sustainability.label', 'header.corporate.sustainability.desc'),
      href: '/kurumsal/surdurulebilirlik',
      icon: '/SiteIcon/MegaMenu/Surdurulebilirlik.svg',
      whiteIcon: '/SiteIcon/MegaMenu/white/SurdurulebilirlikWhite.svg',
    },
  ];

  return [
    {
      label: sv(nav.services, t, 'nav.services'),
      href: '/hizmetler',
      submenu: serviceMenuWithStrapiLabels,
      sidePanel: (
        <>
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-0.5 bg-sky-600 rounded-full" />
              <span className="text-sky-600 font-black text-[11px] tracking-[0.18em] uppercase">
                {sidePanelTag}
              </span>
            </div>
            <h3 className="text-slate-900 font-black text-[1.22rem] leading-snug mb-3">
              {sidePanelTitle1}
              <br />
              {sidePanelTitle2}
            </h3>
            <p className="text-slate-600 text-[0.88rem] leading-relaxed">
              {sidePanelDesc}
            </p>
          </div>
          <ul className="space-y-4 my-8">
            {[
              { label: sidePanelFeature1, color: 'bg-sky-500' },
              { label: sidePanelFeature2, color: 'bg-violet-500' },
              { label: sidePanelFeature3, color: 'bg-emerald-500' },
            ].map(({ label, color }) => (
              <li key={label} className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
                <span className="text-slate-700 text-[0.86rem] font-semibold">{label}</span>
              </li>
            ))}
          </ul>
        </>
      ),
      mobileSidePanel: (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-4 h-0.5 bg-sky-400 rounded-full" />
            <span className="text-sky-400 font-black text-[10px] tracking-[0.18em] uppercase">
              {sidePanelTag}
            </span>
          </div>
          <h3 className="text-white font-black text-[1.05rem] leading-snug mb-2">
            {sidePanelTitle1} {sidePanelTitle2}
          </h3>
          <p className="text-white/60 text-[0.82rem] leading-relaxed mb-4">
            {sidePanelDesc}
          </p>
          <ul className="space-y-2.5">
            {[
              { label: sidePanelFeature1, color: 'bg-sky-400' },
              { label: sidePanelFeature2, color: 'bg-violet-400' },
              { label: sidePanelFeature3, color: 'bg-emerald-400' },
            ].map(({ label, color }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
                <span className="text-white/80 text-[0.83rem] font-semibold">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: sv(nav.products, t, 'nav.products'),
      href: '/onsuite',
    },
    { label: sv(nav.rAndD, t, 'nav.rAndD'), href: '/arge' },
    { label: sv(nav.partnerships, t, 'nav.partnerships'), href: '/is-birlikleri' },
    { label: sv(nav.references, t, 'nav.references'), href: '/referanslar' },
    {
      label: sv(nav.corporate, t, 'nav.corporate'),
      href: '/kurumsal/bizi-taniyin',
      megaPalette: true,
      submenu: corporateItems,
    },
    { label: t('common.contact'), href: '/iletisim' },
  ];
}



function localizeMenuItems(menuItems, localizePath) {
  return menuItems.map((item) => ({
    ...item,
    href: localizePath(item.href),
    submenu: item.submenu?.map((subItem) => ({
      ...subItem,
      href: localizePath(subItem.href),
    })),
  }));
}

function DesktopNavItem({ item, scrolled, pathname, isMegaOpen, onOpenMega, onCloseMega, openMenuKey, onOpenMenu, onCloseMenu }) {
  // Hizmetler: özel mega menü
  if (item.submenu && item.href.includes('/hizmetler')) {
    return (
      <div
        key={item.href}
        className="relative group"
        onMouseEnter={onOpenMega}
        onMouseLeave={onCloseMega}
        role="none"
      >
        <Link
          href={item.href}
          onFocus={onOpenMega}
          className={`px-5 py-3 font-bold text-[17px] tracking-tight transition-all duration-300 min-h-[44px] flex items-center group/link whitespace-nowrap ${scrolled
            ? 'text-[#1A1A1A] hover:text-[#1B3A63]'
            : 'text-[#F8FAFC] hover:text-[#08DCFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
            } ${isMegaOpen ? (scrolled ? 'text-[#1B3A63]' : 'text-[#08DCFF]') : ''}`}
        >
          <span className="relative z-10 inline-flex items-center gap-1.5">
            {item.label}
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M6 9l6 6 6-6" />
            </svg>
          </span>
          <span className={`absolute bottom-2 left-5 right-5 h-0.5 ${scrolled ? 'bg-[#1B3A63]' : 'bg-[#08DCFF]'} transform ${isMegaOpen ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 origin-left group-hover/link:scale-x-100`} />
        </Link>
      </div>
    );
  }

  // Diğer submenu'lar: NavDropdown bileşeni (Kurumsal vb.)
  if (item.submenu) {
    return (
      <NavDropdown
        key={item.href}
        title={item.label}
        href={item.href}
        items={item.submenu}
        scrolled={scrolled}
        isOpen={openMenuKey === item.href}
        onOpen={(key) => onOpenMenu(key)}
        onClose={() => onCloseMenu()}
        sidePanel={item.sidePanel}
        useMegaPalette={item.megaPalette}
      />
    );
  }

  return (
    <NavLink key={item.href} href={item.href} scrolled={scrolled} pathname={pathname}>
      {item.label}
    </NavLink>
  );
}

function renderDesktopMenuItem(item, scrolled, pathname, isMegaOpen, onOpenMega, onCloseMega) {
  // Legacy wrapper — kept for compatibility, use DesktopNavItem where possible
  if (item.submenu && item.href.includes('/hizmetler')) {
    return (
      <div
        key={item.href}
        className="relative group"
        onMouseEnter={onOpenMega}
        onMouseLeave={onCloseMega}
        role="none"
      >
        <Link
          href={item.href}
          onFocus={onOpenMega}
          className={`px-5 py-3 font-bold text-[17px] tracking-tight transition-all duration-300 min-h-[44px] flex items-center group/link whitespace-nowrap ${scrolled
            ? 'text-[#1A1A1A] hover:text-[#1B3A63]'
            : 'text-[#F8FAFC] hover:text-[#08DCFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'
            } ${isMegaOpen ? (scrolled ? 'text-[#1B3A63]' : 'text-[#08DCFF]') : ''}`}
        >
          <span className="relative z-10 inline-flex items-center gap-1.5">
            {item.label}
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isMegaOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M6 9l6 6 6-6" />
            </svg>
          </span>
          <span className={`absolute bottom-2 left-5 right-5 h-0.5 ${scrolled ? 'bg-[#1B3A63]' : 'bg-[#08DCFF]'} transform ${isMegaOpen ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 origin-left group-hover/link:scale-x-100`} />
        </Link>
      </div>
    );
  }

  return (
    <NavLink key={item.href} href={item.href} scrolled={scrolled} pathname={pathname}>
      {item.label}
    </NavLink>
  );
}

function DesktopNavigation({ localizedMenuItems, scrolled, pathname, isMegaOpen, onOpenMega, onCloseMega }) {
  const [openMenuKey, setOpenMenuKey] = useState(null);
  const closeTimeoutRef = useRef(null);

  const handleOpenMenu = (key) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenMenuKey(key);
  };

  const handleCloseMenu = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenMenuKey(null), 150);
  };

  return (
    <nav className="hidden xl:flex items-center gap-1 xl:gap-3">
      {localizedMenuItems.map((item) => (
        <DesktopNavItem
          key={item.href}
          item={item}
          scrolled={scrolled}
          pathname={pathname}
          isMegaOpen={isMegaOpen}
          onOpenMega={onOpenMega}
          onCloseMega={onCloseMega}
          openMenuKey={openMenuKey}
          onOpenMenu={handleOpenMenu}
          onCloseMenu={handleCloseMenu}
        />
      ))}
    </nav>
  );
}

function renderMobileActions(scrolled, t, mobileMenuOpen, setMobileMenuOpen, setSearchOpen) {
  return (
    <div className="xl:hidden flex items-center gap-2">
      <button
        type="button"
        aria-label={t('common.search')}
        onClick={() => {
          setMobileMenuOpen(false);
          setSearchOpen(true);
        }}
        className={`p-3 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${scrolled ? 'text-[#1A1A1A] hover:bg-slate-100' : 'text-[#F8FAFC] hover:bg-white/10'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <button
        type="button"
        className={`flex items-center justify-center rounded-lg transition-all duration-300 min-h-[44px] min-w-[44px] ${scrolled ? 'bg-slate-100 text-[#1A1A1A] hover:bg-slate-200' : 'bg-white/10 text-[#F8FAFC] hover:bg-white/20'}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? t('header.aria.closeMenu') : t('header.aria.openMenu')}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-nav"
      >
        {/* İkon: kapalı=hamburger, açık=X — animasyonlu span üst üste gelme sorunu giderildi */}
        {mobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px]">
            <span className="w-6 h-0.5 rounded-full bg-current block" />
            <span className="w-6 h-0.5 rounded-full bg-current block" />
            <span className="w-6 h-0.5 rounded-full bg-current block" />
          </div>
        )}
      </button>
    </div>
  );
}

const menuItemShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
  description: PropTypes.string,
  submenu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.string,
      description: PropTypes.string,
    })
  ),
});

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  scrolled: PropTypes.bool,
  pathname: PropTypes.string,
};

NavDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(menuItemShape).isRequired,
  scrolled: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  sidePanel: PropTypes.node,
  useMegaPalette: PropTypes.bool,
};

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(menuItemShape).isRequired,
};

// İstemcide hydration tamamlandı mı? (effect içinde setState yapmadan)
const subscribeNoop = () => () => {};

export default function Header({ initialData = null, allLocaleData = null }) {
  const { scrolled, setScrolled, mobileMenuOpen, setMobileMenuOpen, resetMenu, setSearchOpen } = useUIStore();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const { lang, locale, setLang, localizePath, t } = useLanguage();
  const pathname = usePathname();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const megaCloseTimeoutRef = useRef(null);

  const handleOpenMega = () => {
    if (megaCloseTimeoutRef.current) {
      clearTimeout(megaCloseTimeoutRef.current);
      megaCloseTimeoutRef.current = null;
    }
    setIsMegaOpen(true);
  };

  const handleCloseMega = () => {
    if (megaCloseTimeoutRef.current) {
      clearTimeout(megaCloseTimeoutRef.current);
    }
    megaCloseTimeoutRef.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 150);
  };

  const langDropdownRef = useRef(null);
  const langButtonRef = useRef(null);
  const langOptionRefs = useRef([]);
  const langDropdownCloseTimeoutRef = useRef(null);
  const logoRef = useRef(null);
  const rightActionsRef = useRef(null);
  const serviceLocale = locale === 'en' ? 'en' : locale === 'ro' ? 'ro' : 'tr';

  // allLocaleData varsa locale'e göre doğru veriyi seç (client-side locale doğru olur)
  // initialData yoksa allLocaleData'dan al; her ikisi de yoksa null
  const resolvedData = allLocaleData
    ? (allLocaleData[locale] ?? allLocaleData.tr ?? null)
    : initialData;

  const strapiDescriptions = resolvedData?.descriptions ?? {};
  const strapiIcons = resolvedData?.icons ?? {};
  const canonicalServiceMenu = SERVICE_CATALOG.map((service) => {
    const descKey = getMenuDescKey(service.href);
    return {
      label: service.names[serviceLocale],
      href: service.href,
      descKey,  // buildMenuItems'ta hizmetlerItems lookup için
      icon: strapiIcons[descKey] ?? getMenuIconForHref(service.href),
      whiteIcon: strapiIcons[`${descKey}White`] ?? getMenuWhiteIconForHref(service.href),
      description: strapiDescriptions[descKey] || getMenuDescriptionForHref(service.href, t),
    };
  });

  // Strapi'den gelen logo path'lerini kullan, yoksa statik asset
  const logoSrc         = resolvedData?.logo         ?? '/assets/new/common/siskon-logo.svg';
  const logoScrolledSrc = resolvedData?.logoScrolled ?? '/assets/new/common/siskon-logo-header.svg';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll(); // check initial scroll position on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolled]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [mobileMenuOpen]);

  // Sayfa değişince açık menüleri kapat (render sırasında state ayarı)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMegaOpen(false);
    setLangDropdownOpen(false);
  }

  useEffect(() => {
    resetMenu();
  }, [pathname, resetMenu]);

  useEffect(() => {
    return () => {
      if (langDropdownCloseTimeoutRef.current) {
        clearTimeout(langDropdownCloseTimeoutRef.current);
      }
      if (megaCloseTimeoutRef.current) {
        clearTimeout(megaCloseTimeoutRef.current);
      }
    };
  }, []);

  // Track header boundaries for fixed mega dropdown positioning
  useLayoutEffect(() => {
    if (!mounted) return;
    const update = () => {
      const logoEl = logoRef.current;
      const langEl = langDropdownRef.current;
      const headerEl = logoEl?.closest('header');
      if (!logoEl || !langEl || !headerEl) return;
      const headerRect = headerEl.getBoundingClientRect();
      const logoRect = logoEl.getBoundingClientRect();
      const langRect = langEl.getBoundingClientRect();
      document.documentElement.style.setProperty('--hdr-bottom', `${Math.round(headerRect.bottom)}px`);
      document.documentElement.style.setProperty('--mega-left', `${Math.round(logoRect.left)}px`);
      document.documentElement.style.setProperty('--mega-right', `${Math.round(window.innerWidth - langRect.right)}px`);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [mounted, scrolled]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!langDropdownRef.current?.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };

    const handleDocumentKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      setLangDropdownOpen(false);
      langButtonRef.current?.focus();
    };

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, []);

  const openLangDropdown = () => {
    if (langDropdownCloseTimeoutRef.current) {
      clearTimeout(langDropdownCloseTimeoutRef.current);
      langDropdownCloseTimeoutRef.current = null;
    }
    setLangDropdownOpen(true);
  };

  const closeLangDropdownWithDelay = () => {
    if (langDropdownCloseTimeoutRef.current) {
      clearTimeout(langDropdownCloseTimeoutRef.current);
    }
    langDropdownCloseTimeoutRef.current = setTimeout(() => {
      setLangDropdownOpen(false);
      langDropdownCloseTimeoutRef.current = null;
    }, 180);
  };

  const isScrolled = mounted ? scrolled : false;

  const handleLangButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openLangDropdown();
      langOptionRefs.current[0]?.focus();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setLangDropdownOpen(false);
      langButtonRef.current?.focus();
    }
  };

  const menuItems = buildMenuItems({ t, canonicalServiceMenu, strapiData: resolvedData });
  const localizedMenuItems = localizeMenuItems(menuItems, localizePath);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${mobileMenuOpen ? 'invisible' : ''} ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2'
        : 'bg-transparent py-3 sm:py-5'
        }`}>
        <div className="container-wide pl-4 flex items-center justify-between h-16 sm:h-20 md:h-24">
          <Link ref={logoRef} href={localizePath('/')} className="flex items-center flex-shrink-0 mr-4 sm:mr-8 lg:mr-20 min-h-[44px]">
            <Image
              src={isScrolled ? logoScrolledSrc : logoSrc}
              alt="Siskon"
              width={180}
              height={56}
              className="w-[120px] sm:w-[150px] lg:w-[180px] h-auto transition-all duration-500"
              priority
            />
          </Link>

          <DesktopNavigation
            localizedMenuItems={localizedMenuItems}
            scrolled={isScrolled}
            pathname={pathname}
            isMegaOpen={isMegaOpen}
            onOpenMega={handleOpenMega}
            onCloseMega={handleCloseMega}
          />

          <div ref={rightActionsRef} className="hidden xl:flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t('common.search')}
              className={`p-2 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${scrolled ? 'text-[#1A1A1A] hover:text-[#1B3A63] hover:bg-slate-100' : 'text-[#F8FAFC] hover:text-[#08DCFF] hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                ref={langButtonRef}
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onKeyDown={handleLangButtonKeyDown}
                aria-label={t('header.aria.changeLang')}
                aria-haspopup="menu"
                aria-expanded={langDropdownOpen}
                aria-controls="lang-switcher-menu"
                className={`flex items-center gap-2 py-2 rounded-xl transition-transform duration-300 ${scrolled ? 'text-[#1A1A1A] hover:text-[#1B3A63]' : 'text-[#F8FAFC] hover:text-[#08DCFF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'}`}
              >
                <span className="text-[14px] font-bold tracking-widest leading-none">{lang}</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id="lang-switcher-menu"
                role="menu"
                className={`absolute z-20 top-full right-0 mt-2 w-20 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-opacity duration-200 ${langDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              >
                <div className="p-1.5 space-y-1">
                  {['TR', 'EN', 'RO'].filter((l) => l !== lang).map((l, index) => (
                    <button
                      type="button"
                      key={l}
                      role="menuitem"
                      ref={(el) => {
                        langOptionRefs.current[index] = el;
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                          event.preventDefault();
                          setLangDropdownOpen(false);
                          langButtonRef.current?.focus();
                          return;
                        }

                        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                          event.preventDefault();
                          const visibleOptions = ['TR', 'EN', 'RO'].filter((x) => x !== lang);
                          const nextIndex = event.key === 'ArrowDown'
                            ? (index + 1) % visibleOptions.length
                            : (index - 1 + visibleOptions.length) % visibleOptions.length;
                          langOptionRefs.current[nextIndex]?.focus();
                        }
                      }}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setLang(l);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-center py-2 rounded-xl text-[13px] font-black tracking-widest transition-all ${lang === l ? 'bg-sky-50 text-sky-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {renderMobileActions(isScrolled, t, mobileMenuOpen, setMobileMenuOpen, setSearchOpen)}
        </div>
      </header>

      {/* Modern Premium Two-Column Services Mega Menu */}
      <MegaMenu
        isOpen={isMegaOpen}
        onClose={handleCloseMega}
        onMouseEnter={handleOpenMega}
        onMouseLeave={handleCloseMega}
        services={canonicalServiceMenu}
      />

      {/* Mobile Navigation Menu */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={localizedMenuItems}
      />

      {/* Mobile Menu Overlay — kaldırıldı, MobileNav zaten inset-0 tam ekran kaplar */}
    </>
  );
}

