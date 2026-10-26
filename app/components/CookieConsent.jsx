'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useLanguage } from '../_context/LanguageContext';

const CONSENT_KEY = 'siskon_cookie_consent_v1';
const subscribe = () => () => {};
const getServerSnapshot = () => false;

function MiniTrigger({ label, ariaLabel, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cerezgo-mini-trigger"
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
}

MiniTrigger.propTypes = {
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function getClientSnapshot() {
  const storage = globalThis.window?.localStorage;
  if (!storage) {
    return false;
  }

  return !storage.getItem(CONSENT_KEY);
}

export default function CookieConsent() { // NOSONAR
  const router = useRouter();
  const { localizePath, locale } = useLanguage();
  const isEn = locale === 'en';
  const isRo = locale === 'ro';
  const [dismissed, setDismissed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const shouldShow = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const visible = shouldShow && !dismissed && !minimized;

  useEffect(() => {
    const existingConsent = globalThis.window?.localStorage.getItem(CONSENT_KEY);
    // effect gövdesinde senkron setState yerine mikro görev
    queueMicrotask(() => setHasConsent(Boolean(existingConsent)));
  }, [dismissed]);

  const handleConsent = (value) => {
    globalThis.window.localStorage.setItem(CONSENT_KEY, value);
    setDismissed(true);
    setHasConsent(true);

    if (value === 'settings') {
      router.push(localizePath('/yasal/cerez-politikasi'));
    }
  };

  let mode = 'hidden';
  if (shouldShow) {
    mode = minimized ? 'minimized' : 'dialog';
  } else if (hasConsent) {
    mode = 'preferences';
  }

  if (mode === 'preferences') {
    return (
      <MiniTrigger
        label={isEn ? 'Cookie Preferences' : isRo ? 'Preferințe Cookie' : 'Çerez Tercihleri'}
        ariaLabel={isEn ? 'Cookie preferences' : isRo ? 'Preferințe cookie' : 'Çerez tercihleri'}
        onClick={() => router.push(localizePath('/yasal/cerez-politikasi'))}
      />
    );
  }

  if (mode === 'minimized') {
    return (
      <MiniTrigger
        label={isEn ? 'Cookie Notice' : isRo ? 'Notificare Cookie' : 'Çerez Bildirimi'}
        ariaLabel={isEn ? 'Open cookie consent' : isRo ? 'Deschideți consimțământul pentru cookie' : 'Çerez onayını aç'}
        onClick={() => setMinimized(false)}
      />
    );
  }

  if (mode === 'hidden' || !visible) {
    return null;
  }

  return (
    <dialog
      className="cerezgo-dialog cerezgo-consent-dialog"
      popover="manual"
      autoFocus
      open
      aria-labelledby="cerezgo-consent-dialog_main"
      aria-describedby="cerezgo-consent-dialog_main"
      aria-label="Çerez Go çerez onayı iletişim kutusunda Kabul Et, Reddet veya Gizlilik Tercihleri seçeneklerinden birini seçin"
    >
      <header
        id="cerezgo-consent-dialog_header"
        className="header"
        aria-label="Marka logosunu içeren çerez onayı başlığı"
      >
        <button
          type="button"
          className="cerezgo-minimize"
          onClick={() => setMinimized(true)}
          aria-label={isEn ? 'Minimize cookie notice' : isRo ? 'Minimizați notificarea cookie' : 'Çerez bildirimini küçült'}
        >
          ×
        </button>
        <img
          src="/assets/new/common/siskon-logo-header.svg"
          className="cerezgo-brand-logo"
          alt="Siskon"
          width="128"
          style={{ '--cg-brand-logo-min-width': '64px', '--cg-brand-logo-max-width': '256px' }}
        />
      </header>

      <main
        id="cerezgo-consent-dialog_main"
        className="main"
        aria-label="Çerez rıza mesajı"
      >
        {isEn
          ? 'As Siskon Industrial Automation Systems Inc., we process cookies with care and in compliance with privacy regulations. You can review and manage your preferences at any time.'
          : isRo
          ? 'În calitate de Siskon Industrial Automation Systems Inc., prelucrăm cookie-urile cu grijă și în conformitate cu reglementările privind confidențialitatea. Vă puteți revizui și gestiona preferințele în orice moment.'
          : 'Siskon Endüstriyel Otomasyon Sistemleri Sanayi ve Ticaret A.Ş. olarak çerezlerinizi mevzuata uygun şekilde işleriz. Tercihlerinizi dilediğiniz an yönetebilirsiniz.'}
      </main>

      <footer
        id="cerezgo-consent-dialog_footer"
        className="footer"
        aria-label="Kabul Et, Reddet ve Gizlilik Tercihleri çerez rıza seçenekleri"
      >
        <form
          method="dialog"
          className="cerezgo-consent-actions"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <button
            className="cerezgo-button cerezgo-button--primary cerezgo-button--medium cerezgo-dialog__button"
            type="submit"
            value="settings"
            onClick={() => handleConsent('settings')}
          >
            {isEn ? 'Privacy Preferences' : isRo ? 'Preferințe de Confidențialitate' : 'Gizlilik Tercihleri'}
          </button>
          <button
            className="cerezgo-button cerezgo-button--primary cerezgo-button--medium cerezgo-dialog__button"
            type="submit"
            value="reject"
            onClick={() => handleConsent('rejected')}
          >
            {isEn ? 'Reject' : isRo ? 'Respinge' : 'Reddet'}
          </button>
          <button
            className="cerezgo-button cerezgo-button--primary cerezgo-button--medium cerezgo-dialog__button"
            type="submit"
            value="accept"
            onClick={() => handleConsent('accepted')}
          >
            {isEn ? 'Accept' : isRo ? 'Acceptă' : 'Kabul Et'}
          </button>
        </form>
      </footer>
    </dialog>
  );
}

