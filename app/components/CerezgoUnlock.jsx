'use client';

import { useEffect } from 'react';

function makeDialogsNonModal(shadowRoot) {
  const dialogs = shadowRoot.querySelectorAll('dialog.cerezgo-dialog');

  dialogs.forEach((dialog) => {
    if (!(dialog instanceof HTMLDialogElement) || !dialog.open) {
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

    const patchCerezgo = () => {
      const host = document.querySelector('cerezgo-app');
      if (!(host instanceof HTMLElement) || !host.shadowRoot) {
        return;
      }

      const dialogs = makeDialogsNonModal(host.shadowRoot);

      if (window.cerezgo?.config?._value) {
        window.cerezgo.config._value.isUIBlocker = false;
      }
      if (window.cerezgo?.config?._rawValue) {
        window.cerezgo.config._rawValue.isUIBlocker = false;
      }

      const hasOpenDialog = Array.from(dialogs || []).some((dialog) => dialog.open);
      if (hasOpenDialog && document.body.style.overflowY === 'hidden') {
        document.body.style.overflowY = '';
      }
      if (hasOpenDialog && document.body.style.overflowX === 'hidden') {
        document.body.style.overflowX = '';
      }

      if (!shadowObserver) {
        shadowObserver = new MutationObserver(() => {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(patchCerezgo);
        });

        shadowObserver.observe(host.shadowRoot, {
          subtree: true,
          childList: true,
          attributes: true,
          attributeFilter: ['open', 'class', 'style'],
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

    return () => {
      if (rootObserver) {
        rootObserver.disconnect();
      }
      if (shadowObserver) {
        shadowObserver.disconnect();
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
