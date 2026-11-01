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
    let attrObserver = null;
    let rafId = null;
    let safetyInterval = null;

    // Scroll'u her zaman serbest tut — CerezGo (modal/UI blocker) html ve body'yi kilitleyebilir.
    // Mobilde modal <dialog> arka planı inert yapıp dokunmatik kaydırmayı da engeller.
    function unlockScroll() {
      [document.documentElement, document.body].forEach((el) => {
        if (!el) return;
        ['overflow', 'overflowY', 'overflowX'].forEach((prop) => {
          if (el.style[prop] === 'hidden') el.style[prop] = '';
        });
        if (el.style.touchAction === 'none') el.style.touchAction = '';
        if (el.style.position === 'fixed') {
          const scrollY = el.style.top;
          el.style.position = '';
          el.style.top = '';
          el.style.width = '';
          if (scrollY) window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
      });
      // Modal dialog arka plan öğelerine inert verir; CerezGo'nun kendisi hariç hepsini aç
      document.querySelectorAll('[inert]').forEach((el) => {
        if (el.tagName.toLowerCase() !== 'cerezgo-app') el.removeAttribute('inert');
      });
    }
    const unlockBodyScroll = unlockScroll;

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
          dialog::backdrop { display: none !important; background: transparent !important; }
          @media (max-width: 640px) {
            dialog.cerezgo-dialog {
              max-height: 70dvh !important;
              overflow-y: auto !important;
              overscroll-behavior: contain;
            }
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

    // CerezGo html/body stilini sonradan değiştirir: attribute değişince hemen aç
    attrObserver = new MutationObserver(unlockScroll);
    [document.documentElement, document.body].forEach((el) => {
      if (el) attrObserver.observe(el, { attributes: true, attributeFilter: ['style', 'class', 'inert'] });
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
      if (attrObserver) {
        attrObserver.disconnect();
      }
      cancelAnimationFrame(rafId);
      if (safetyInterval) {
        clearInterval(safetyInterval);
      }
    };
  }, []);

  return null;
}
