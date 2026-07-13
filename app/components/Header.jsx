'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/app/store/useUIStore';
import { useLanguage } from '../_context/LanguageContext';
import { SERVICE_CATALOG } from '../../config/services';
import MegaMenu from './MegaMenu';

const MENU_ICON_BY_PATH = {
  '/hizmetler/ai-makine-ogrenmesi': '/SiteIcon/MegaMenu/AıMakine.svg',
  '/kurumsal/bizi-taniyin': null,
  '/hizmetler/egitim-danismanlik': '/SiteIcon/MegaMenu/eGİTİMdanışmanlık.svg',
  '/hizmetler/ge-vernova': '/SiteIcon/MegaMenu/GeVernova.svg',
  '/hizmetler/goruntu-isleme': '/SiteIcon/MegaMenu/Goruntu.svg',
  '/hizmetler/iiot': '/SiteIcon/MegaMenu/Iot.svg',
  '/hizmetler/izlenebilirlik-cozumleri': '/SiteIcon/MegaMenu/Izlenebilirlik.svg',
  '/hizmetler/makine-proses-otomasyonu': '/SiteIcon/MegaMenu/MakinepROSES.svg',
  '/hizmetler/microsoft-cozumleri': '/SiteIcon/MegaMenu/Microsoft.svg',
  '/hizmetler/musteriye-ozel-yazilim': '/SiteIcon/MegaMenu/MOY.svg',
  '/onsuite': null,
  '/hizmetler/robot-cozumleri': '/SiteIcon/MegaMenu/Robot.svg',
};

const MENU_DESCRIPTION_BY_PATH = {
  '/hizmetler/musteriye-ozel-yazilim': {
    tr: 'İhtiyaca özel yazılım mimarisiyle süreçlerinizi uçtan uca dijitalleştirin.',
    en: 'Digitize your operations end-to-end with tailored software architecture.',
    ro: 'Digitalizați operațiunile de la un capăt la altul cu arhitectură software personalizată.',
  },
  '/hizmetler/iiot': {
    tr: 'Sahadan gerçek zamanlı veri toplayarak karar kalitesini artırın.',
    en: 'Collect real-time shop-floor data to improve decision quality.',
    ro: 'Colectați date în timp real din fabrică pentru a îmbunătăți calitatea deciziilor.',
  },
  '/hizmetler/izlenebilirlik-cozumleri': {
    tr: 'Ürün ve süreç hareketlerini uçtan uca görünür hale getirin.',
    en: 'Make product and process flows fully traceable end-to-end.',
    ro: 'Faceți fluxurile de produse și procese complet trasabile de la un capăt la altul.',
  },
  '/hizmetler/makine-proses-otomasyonu': {
    tr: 'Makine ve prosesleri güvenli, ölçeklenebilir otomasyonla yönetin.',
    en: 'Run machine and process operations with safe, scalable automation.',
    ro: 'Gestionați operațiunile mașinilor și proceselor cu automatizare sigură și scalabilă.',
  },
  '/hizmetler/robot-cozumleri': {
    tr: 'Robotik hücrelerle çevrim sürelerini düşürüp kaliteyi standardize edin.',
    en: 'Lower cycle times and standardize quality with robotic cells.',
    ro: 'Reduceți timpii de ciclu și standardizați calitatea cu celule robotice.',
  },
  '/hizmetler/goruntu-isleme': {
    tr: 'Görüntü işleme ile kalite kontrolü otomatik ve tutarlı hale getirin.',
    en: 'Automate and stabilize quality control with machine vision.',
    ro: 'Automatizați și stabilizați controlul calității cu procesare de imagine.',
  },
  '/hizmetler/ai-makine-ogrenmesi': {
    tr: 'Veri odaklı analitik ile performans ve verimliliği optimize edin.',
    en: 'Optimize performance and efficiency through data-driven analytics.',
    ro: 'Optimizați performanța și eficiența prin analiză bazată pe date.',
  },
  '/hizmetler/microsoft-cozumleri': {
    tr: 'Microsoft ekosistemiyle kurum içi süreçleri entegre ve çevik yönetin.',
    en: 'Manage enterprise workflows with integrated Microsoft solutions.',
    ro: 'Gestionați fluxurile de lucru enterprise cu soluții Microsoft integrate.',
  },
  '/hizmetler/ge-vernova': {
    tr: 'GE Vernova çözümleriyle üretim verilerini merkezi olarak izleyin.',
    en: 'Monitor production data centrally with GE Vernova solutions.',
    ro: 'Monitorizați datele de producție central cu soluții GE Vernova.',
  },
  '/hizmetler/egitim-danismanlik': {
    tr: 'Ekip yetkinliğini eğitim ve danışmanlıkla kalıcı şekilde artırın.',
    en: 'Boost team capability sustainably with training and consulting.',
    ro: 'Creșteți capabilitatea echipei sustenabil cu formare și consultanță.',
  },
};

const MENU_WHITE_ICON_BY_PATH = {
  '/hizmetler/ai-makine-ogrenmesi': '/SiteIcon/MegaMenu/white/AıMakineWhite.svg',
  '/hizmetler/egitim-danismanlik': '/SiteIcon/MegaMenu/white/eGitimdanısmanlıkWhite.svg',
  '/hizmetler/ge-vernova': '/SiteIcon/MegaMenu/white/GeVernovaWhite.svg',
  '/hizmetler/goruntu-isleme': '/SiteIcon/MegaMenu/white/GoruntuWhite.svg',
  '/hizmetler/iiot': '/SiteIcon/MegaMenu/white/IotBeyaz.svg',
  '/hizmetler/izlenebilirlik-cozumleri': '/SiteIcon/MegaMenu/white/IzlenebilirlikWhite.svg',
  '/hizmetler/makine-proses-otomasyonu': '/SiteIcon/MegaMenu/white/MakinepROSESWhite.svg',
  '/hizmetler/microsoft-cozumleri': '/SiteIcon/MegaMenu/white/MicrosoftWhite.svg',
  '/hizmetler/musteriye-ozel-yazilim': '/SiteIcon/MegaMenu/white/MOYWhite.svg',
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

function getMenuDescriptionForHref(href = '', locale = 'tr') {
  const normalizedPath = href.replace(/^\/(en|tr|ro)(?=\/|$)/i, '') || '/';
  const lang = MENU_DESCRIPTION_BY_PATH[normalizedPath];
  if (!lang) return '';
  return lang[locale] ?? lang['en'] ?? '';
}

function NavLink({ href, children, onClick, scrolled = false, pathname = '' }) {
  const isActive = pathname === href || pathname.startsWith(href + '/');
  return (
    <Link
      href={href}
      className={`relative px-5 py-3 font-bold text-[17px] tracking-tight transition-all duration-300 min-h-[44px] flex items-center group whitespace-nowrap ${scrolled
        ? 'text-slate-900 hover:text-sky-600'
        : 'text-white hover:text-sky-400'
        } ${isActive ? 'text-sky-600' : ''}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <span className={`absolute bottom-2 left-5 right-5 h-0.5 bg-sky-600 transform ${isActive ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 origin-left group-hover:scale-x-100`} />
    </Link>
  );
}

function NavDropdown({ title, href, items, scrolled = false, isOpen = false, onOpen, onClose, sidePanel }) {
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

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

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
          ? 'text-slate-900 hover:text-sky-600'
          : 'text-white hover:text-sky-400'
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
        className={`transition-all duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-[101] ${sidePanel ? 'fixed pt-4' : 'absolute left-1/2 -translate-x-1/2 mt-4'} ${isOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-3 pointer-events-none'}`}
        style={sidePanel ? {
          top: 'var(--hdr-bottom, 96px)',
          left: 'max(24px, var(--mega-left, 160px))',
          right: 'max(24px, var(--mega-right, 100px))',
        } : {}}
      >
        <div className={`${sidePanel ? 'w-full max-w-[1240px] mx-auto' : 'w-[min(calc(100vw-80px),540px)]'} flex rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.35)] border overflow-hidden bg-white border-slate-100`}>
          
          {sidePanel && (
            <div className="hidden lg:flex w-[300px] bg-slate-50 border-r border-slate-100 p-8 flex-col justify-between shrink-0">
              {sidePanel}
            </div>
          )}

          <div className="flex-1 flex relative w-full">
            <div
              id={`${href}-menu`}
              className="p-6 md:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-1"
              role="menu"
              tabIndex={-1}
              aria-label={title}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenuWithDelay}
            >
            {items.map((item, index) => {
              const hoverClass = 'hover:bg-slate-50';
              let focusedClass = '';
              if (focusedIndex === index) {
                focusedClass = 'bg-slate-50';
              }
              const shouldCenterLastCard = index === items.length - 1 && items.length % 3 === 1;

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
                  className={`flex items-start gap-3 p-4 rounded-2xl border transition-all duration-300 group/item border-slate-200 hover:border-sky-200 ${hoverClass} ${focusedClass} ${shouldCenterLastCard ? 'lg:col-start-2' : ''}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 bg-slate-100 border border-slate-100 group-hover/item:bg-sky-50 group-hover/item:border-sky-100`}>
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="w-5 h-5 object-contain"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[0.96rem] md:text-[1.02rem] font-bold transition-colors text-slate-900 group-hover/item:text-sky-700 leading-tight">
                      {item.label}
                    </span>
                    {item.description ? (
                      <span className="block mt-1 text-[0.78rem] md:text-[0.84rem] text-slate-500 leading-relaxed">
                        {item.description}
                      </span>
                    ) : null}
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
  const { lang, setLang, localizePath } = useLanguage();

  if (!isOpen) return null;

  return (
    <nav
      id="mobile-nav"
      className="fixed inset-0 z-[var(--z-mobile-nav)] overflow-hidden flex flex-col transition-all duration-500 shadow-2xl opacity-100"
      style={{ background: 'linear-gradient(135deg, #0A192F 0%, #061B3B 50%, #030B1A 100%)' }}
    >
      {/* Dynamic Glow Accents like Hero */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />
      {/* Mobile Header (Original Structure Preserved) */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5 sm:py-8 shrink-0">
        <Link href={localizePath('/')} onClick={onClose}>
          <Image
            src="/assets/new/common/siskon-logo.svg"
            alt="Siskon"
            width={180}
            height={56}
            className="h-10 sm:h-12 w-auto object-contain transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
            style={{ width: 'auto' }}
          />
        </Link>
        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {/* Main View (Image 1) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${activeSubmenu ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100 pointer-events-auto'}`}>
          <div className="flex flex-col gap-5 overflow-y-auto px-5 sm:px-8 py-7 sm:py-10 no-scrollbar w-full">
            {items.map((item) => (
              <div
                key={item.href}
                className="flex items-center justify-between gap-3 py-3 px-4 rounded-lg hover:bg-white/5 transition-all group"
              >
                {item.submenu ? (
                  <button
                    type="button"
                    onClick={() => setActiveSubmenu(item)}
                    className="text-white font-bold text-[clamp(1.4rem,5vw,2rem)] tracking-tight hover:text-sky-400 transition-all duration-300 flex-1 text-left flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="w-12 h-12 rounded-xl border border-sky-400/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 hover:text-sky-200 transition-all shrink-0 flex items-center justify-center">
                      <svg className="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
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
            {/* Elegant Back Button */}
            <div className="px-5 sm:px-6 pt-4 pb-2">
              <button
                onClick={() => setActiveSubmenu(null)}
                className="flex items-center gap-2 py-2.5 px-4 rounded-xl text-white/70 hover:text-white hover:bg-white/8 transition-all active:scale-95"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-bold text-base tracking-tight">{lang === 'EN' ? '← Back' : lang === 'RO' ? '← Înapoi' : '← Geri'}</span>
              </button>
            </div>

            {/* Submenu List - Perfectly Styled Cards with description & icons on left */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-16 sm:pb-20 flex flex-col gap-3.5 no-scrollbar content-start">
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
                      <span className="block mt-1 text-[0.8rem] text-white/70 leading-relaxed [text-wrap:balance]">
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
      <div className="relative z-10 p-8 border-t border-white/5 flex justify-center gap-8 shrink-0">
        <button type="button" onClick={() => setLang('TR')} className={`text-sm font-black tracking-[0.2em] transition-all ${lang === 'TR' ? 'text-sky-400' : 'text-white/30'}`}>TR</button>
        <button type="button" onClick={() => setLang('EN')} className={`text-sm font-black tracking-[0.2em] transition-all ${lang === 'EN' ? 'text-sky-400' : 'text-white/30'}`}>EN</button>
        <button type="button" onClick={() => setLang('RO')} className={`text-sm font-black tracking-[0.2em] transition-all ${lang === 'RO' ? 'text-sky-400' : 'text-white/30'}`}>RO</button>
      </div>
    </nav>
  );
}

function buildMenuItems({ t, canonicalServiceMenu, locale }) {
  const isEn = locale === 'en';
  const isRo = locale === 'ro';

  return [
    {
      label: t('nav.services'),
      href: '/hizmetler',
      submenu: canonicalServiceMenu,
      sidePanel: (
        <>
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-5 h-0.5 bg-sky-600 rounded-full" />
              <span className="text-sky-600 font-black text-[11px] tracking-[0.18em] uppercase">
                {t('nav.services')}
              </span>
            </div>
            <h3 className="text-slate-900 font-black text-[1.22rem] leading-snug mb-3">
              {isRo ? (
                <>
                  Conducem Transformarea
                  <br />
                  Industrială cu Inginerie
                </>
              ) : isEn ? (
                <>
                  Driving Industrial Transformation
                  <br />
                  Through Engineering
                </>
              ) : (
                <>
                  Endüstriyel Dönüşümü
                  <br />
                  Mühendislikle Yönetiyoruz
                </>
              )}
            </h3>
            <p className="text-slate-600 text-[0.88rem] leading-relaxed">
              {isRo
                ? 'Facem procesele de producție mai eficiente, trasabile și sustenabile cu serviciile noastre care combină software-ul industrial, automatizarea și AI-ul.'
                : isEn
                ? 'We make production processes more efficient, traceable, and sustainable with our services combining industrial software, automation, and AI.'
                : 'Endüstriyel yazılım, otomasyon ve yapay zekayı birleştiren hizmetlerimizle üretim süreçlerini daha verimli, izlenebilir ve sürdürülebilir hale getiriyoruz.'}
            </p>
          </div>
          <ul className="space-y-4 my-8">
            {[
              {
                label: isRo
                  ? 'Software Industrial și Automatizare'
                  : isEn
                  ? 'Industrial Software and Automation'
                  : 'Endüstriyel Yazılım ve Otomasyon',
                color: 'bg-sky-500',
              },
              {
                label: isRo
                  ? 'Inteligență Artificială și Procesare de Imagine'
                  : isEn
                  ? 'AI and Machine Vision'
                  : 'Yapay Zeka ve Görüntü İşleme',
                color: 'bg-violet-500',
              },
              {
                label: isRo
                  ? 'IIoT, Date și Trasabilitate'
                  : isEn
                  ? 'IIoT, Data and Traceability'
                  : 'IIoT, Veri ve İzlenebilirlik',
                color: 'bg-emerald-500',
              },
            ].map(({ label, color }) => (
              <li key={label} className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${color}`} />
                <span className="text-slate-700 text-[0.86rem] font-semibold">{label}</span>
              </li>
            ))}
          </ul>

        </>
      ),
    },
    {
      label: t('nav.products'),
      href: '/onsuite',
    },
    { label: t('nav.rAndD'), href: '/arge' },
    { label: t('nav.partnerships'), href: '/is-birlikleri' },
    { label: t('nav.references'), href: '/referanslar' },
    {
      label: t('nav.corporate'),
      href: '/kurumsal/bizi-taniyin',
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

function renderDesktopMenuItem(item, scrolled, pathname, isMegaOpen, onOpenMega, onCloseMega) {
  if (item.submenu) {
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
            ? 'text-slate-900 hover:text-sky-600'
            : 'text-white hover:text-sky-400'
            } ${isMegaOpen ? 'text-sky-600' : ''}`}
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
          <span className={`absolute bottom-2 left-5 right-5 h-0.5 bg-sky-600 transform ${isMegaOpen ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 origin-left group-hover/link:scale-x-100`} />
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

function renderDesktopNavigation(localizedMenuItems, scrolled, pathname, isMegaOpen, onOpenMega, onCloseMega) {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {localizedMenuItems.map((item) => renderDesktopMenuItem(item, scrolled, pathname, isMegaOpen, onOpenMega, onCloseMega))}
    </nav>
  );
}

function renderMobileActions(scrolled, t, mobileMenuOpen, setMobileMenuOpen, setSearchOpen) {
  return (
    <div className="lg:hidden flex items-center gap-2">
      <button
        type="button"
        aria-label={t('common.search')}
        onClick={() => {
          setMobileMenuOpen(false);
          setSearchOpen(true);
        }}
        className={`p-3 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <button
        type="button"
        className={`flex items-center justify-center rounded-lg transition-all duration-300 min-h-[44px] min-w-[44px] ${scrolled ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-nav"
      >
        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`w-6 h-0.5 transition-all duration-300 rounded-full bg-current ${mobileMenuOpen ? 'rotate-45 absolute top-1/2 -translate-y-1/2' : 'relative mb-1.5'
              }`}
          />
          <span
            className={`w-6 h-0.5 transition-all duration-300 rounded-full bg-current ${mobileMenuOpen ? 'opacity-0' : 'relative mb-1.5'
              }`}
          />
          <span
            className={`w-6 h-0.5 transition-all duration-300 rounded-full bg-current ${mobileMenuOpen ? '-rotate-45 absolute top-1/2 -translate-y-1/2' : 'relative'
              }`}
          />
        </div>
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
};

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(menuItemShape).isRequired,
};

export default function Header() {
  const { scrolled, setScrolled, mobileMenuOpen, setMobileMenuOpen, resetMenu, setSearchOpen } = useUIStore();
  const [mounted, setMounted] = useState(false);
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
  const canonicalServiceMenu = SERVICE_CATALOG.map((service) => ({
    label: service.names[serviceLocale],
    href: service.href,
    icon: getMenuIconForHref(service.href),
    whiteIcon: getMenuWhiteIconForHref(service.href),
    description: getMenuDescriptionForHref(service.href, serviceLocale),
  }));

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll(); // check initial scroll position on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolled]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    resetMenu();
    setIsMegaOpen(false);
    setLangDropdownOpen(false);
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

  const menuItems = buildMenuItems({ t, canonicalServiceMenu, locale });
  const localizedMenuItems = localizeMenuItems(menuItems, localizePath);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2'
        : 'bg-transparent py-3 sm:py-5'
        }`}>
        <div className="container-wide flex items-center justify-between h-16 sm:h-20 md:h-24">
          <Link ref={logoRef} href={localizePath('/')} className="flex items-center flex-shrink-0 mr-4 sm:mr-8 lg:mr-20 min-h-[44px]">
            <Image
              src={isScrolled ? '/assets/new/common/siskon-logo-header.svg' : '/assets/new/common/siskon-logo.svg'}
              alt="Siskon"
              width={180}
              height={56}
              className="w-[120px] sm:w-[150px] lg:w-[180px] h-auto transition-all duration-500"
              priority
            />
          </Link>

          {renderDesktopNavigation(localizedMenuItems, isScrolled, pathname, isMegaOpen, handleOpenMega, handleCloseMega)}

          <div ref={rightActionsRef} className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label={t('common.search')}
              className={`p-2 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${scrolled ? 'text-slate-900 hover:text-sky-600 hover:bg-slate-100' : 'text-white hover:text-sky-400 hover:bg-white/10'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div className="relative group/lang" ref={langDropdownRef}>
              <button
                type="button"
                ref={langButtonRef}
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onMouseEnter={openLangDropdown}
                onMouseLeave={closeLangDropdownWithDelay}
                onKeyDown={handleLangButtonKeyDown}
                aria-label={lang === 'EN' ? 'Change language' : lang === 'RO' ? 'Schimbați limba' : 'Dil değiştir'}
                aria-haspopup="menu"
                aria-expanded={langDropdownOpen}
                aria-controls="lang-switcher-menu"
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              >
                <span className="text-[14px] font-bold tracking-widest">{lang}</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                id="lang-switcher-menu"
                role="menu"
                className={`absolute z-20 top-full right-1/2 translate-x-1/2 mt-2 w-20 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top ${langDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
              
              >
                <div className="p-1.5 space-y-1">
                  {['RO', 'EN', 'TR'].filter((l) => l !== lang).map((l, index) => (
                    <button
                      type="button"
                      key={l}
                      role="menuitem"
                      ref={(el) => {
                        langOptionRefs.current[index] = el;
                      }}
                      onMouseEnter={openLangDropdown}
                      onMouseLeave={closeLangDropdownWithDelay}
                      onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                          event.preventDefault();
                          setLangDropdownOpen(false);
                          langButtonRef.current?.focus();
                          return;
                        }

                        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                          event.preventDefault();
                          const visibleOptions = ['RO', 'EN', 'TR'].filter((x) => x !== lang);
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

      {/* Mobile Menu Overlay */}
      <button
        type="button"
        aria-label={lang === 'EN' ? 'Close mobile menu overlay' : lang === 'RO' ? 'Închideți suprapunerea meniului mobil' : 'Mobil menü örtüsünü kapat'}
        className={`fixed inset-0 top-16 sm:top-20 md:top-24 z-30 bg-black/20 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

