'use client';

import { useEffect } from 'react';

function makeDialogsNonModal(shadowRoot) {
  const dialogs = shadowRoot.querySelectorAll('dialog.cerezgo-dialog');

  dialogs.forEach((dialog) => {
    if (!(dialog instanceof HTMLDialogElement) || !dialog.open) {
      return;
    }

    // Convert only modal dialogs once; repeating close/show can reset text selection.
    if (!dialog.matches(':modal')) {
      return;
    }

    try {
      dialog.close();
      dialog.show();
    } catch {
      // Keep running even if the script toggles state while we patch.
    }
  });

  return dialogs;
}

export default function CerezgoUnlock() {
  useEffect(() => {
    let rootObserver = null;
    let shadowObserver = null;
    let rafId = null;
    let safetyInterval = null;

    // Body scroll'u her zaman serbest tut — CerezGo veya başka 3rd-party script kilitlemesin
    function unlockBodyScroll() {
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = '';
      }
      if (document.body.style.overflowY === 'hidden') {
        document.body.style.overflowY = '';
      }
      if (document.body.style.overflowX === 'hidden') {
        document.body.style.overflowX = '';
      }
      // position: fixed trick'ini de temizle (bazı modal kütüphaneleri kullanır)
      if (document.body.style.position === 'fixed') {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
      }
    }

    const patchCerezgo = () => {
      const host = document.querySelector('cerezgo-app');
      if (!(host instanceof HTMLElement) || !host.shadowRoot) {
        return;
      }

      if (!host.shadowRoot.querySelector('style[data-cerezgo-unlock="selection"]')) {
        const style = document.createElement('style');
        style.setAttribute('data-cerezgo-unlock', 'selection');
        style.textContent = `
          .cerezgo-dialog .main,
          .cerezgo-dialog .main * {
            user-select: text !important;
            -webkit-user-select: text !important;
          }
        `;
        host.shadowRoot.appendChild(style);
      }

      makeDialogsNonModal(host.shadowRoot);

      if (window.cerezgo?.config?._value) {
        window.cerezgo.config._value.isUIBlocker = false;
      }
      if (window.cerezgo?.config?._rawValue) {
        window.cerezgo.config._rawValue.isUIBlocker = false;
      }

      unlockBodyScroll();

      if (!shadowObserver) {
        shadowObserver = new MutationObserver(() => {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(patchCerezgo);
        });

        shadowObserver.observe(host.shadowRoot, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['open'],
        });
      }
    };

    rootObserver = new MutationObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(patchCerezgo);
    });

    rootObserver.observe(document.documentElement, {
      subtree: true,
      childList: true,
    });

    patchCerezgo();

    // Güvenlik ağı: 3rd-party scriptler gecikmeli yüklenip body'yi kilitleyebilir
    // Her 2 saniyede bir kontrol et, 30 saniye sonra durdur
    let safetyCount = 0;
    safetyInterval = setInterval(() => {
      unlockBodyScroll();
      safetyCount++;
      if (safetyCount >= 15) {
        clearInterval(safetyInterval);
      }
    }, 2000);

    return () => {
      if (rootObserver) {
        rootObserver.disconnect();
      }
      if (shadowObserver) {
        shadowObserver.disconnect();
      }
      cancelAnimationFrame(rafId);
      if (safetyInterval) {
        clearInterval(safetyInterval);
      }
    };
  }, []);

  return null;
}
