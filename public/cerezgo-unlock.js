/**
 * CerezGo scroll kilidi koruması — React hydration'dan ÖNCE çalışır (layout.jsx, beforeInteractive).
 *
 * CerezGo, sayfa yüklenir yüklenmez body'ye overflow:hidden yazar ve UI blocker açıksa banner'ı
 * modal <dialog> olarak açar (arka plan inert + mobilde dokunmatik kaydırma kilitli).
 * Bu betik: kilidi kaldırır, modal dialog'u non-modal yapar, ::backdrop'u gizler.
 */
(function () {
  'use strict';

  function unlockScroll() {
    [document.documentElement, document.body].forEach(function (el) {
      if (!el) return;
      ['overflow', 'overflowY', 'overflowX'].forEach(function (prop) {
        if (el.style[prop] === 'hidden') el.style[prop] = '';
      });
      if (el.style.touchAction === 'none') el.style.touchAction = '';
      if (el.style.position === 'fixed') {
        var top = el.style.top;
        el.style.position = '';
        el.style.top = '';
        el.style.width = '';
        if (top) window.scrollTo(0, parseInt(top || '0', 10) * -1);
      }
    });
    document.querySelectorAll('[inert]').forEach(function (el) {
      if (el.tagName.toLowerCase() !== 'cerezgo-app') el.removeAttribute('inert');
    });
  }

  function patchDialogs(shadowRoot) {
    shadowRoot.querySelectorAll('dialog.cerezgo-dialog').forEach(function (dialog) {
      if (!dialog.open || !dialog.matches(':modal')) return;
      try {
        dialog.close();
        dialog.show();
      } catch (e) {
        /* CerezGo durumu aynı anda değiştirirse sessizce geç */
      }
    });
  }

  var shadowObserver = null;
  var timerId = 0;

  function patch() {
    unlockScroll();

    var host = document.querySelector('cerezgo-app');
    if (!host || !host.shadowRoot) return;
    var root = host.shadowRoot;

    if (!root.querySelector('style[data-cerezgo-unlock]')) {
      var style = document.createElement('style');
      style.setAttribute('data-cerezgo-unlock', 'true');
      style.textContent =
        '.cerezgo-dialog .main, .cerezgo-dialog .main * { user-select: text !important; -webkit-user-select: text !important; }' +
        'dialog::backdrop { display: none !important; background: transparent !important; }' +
        '@media (max-width: 640px) { dialog.cerezgo-dialog { max-height: 70dvh !important; overflow-y: auto !important; overscroll-behavior: contain; } }';
      root.appendChild(style);
    }

    patchDialogs(root);

    var cfg = window.cerezgo && window.cerezgo.config;
    if (cfg && cfg._value) cfg._value.isUIBlocker = false;
    if (cfg && cfg._rawValue) cfg._rawValue.isUIBlocker = false;

    if (!shadowObserver) {
      shadowObserver = new MutationObserver(schedule);
      shadowObserver.observe(root, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['open'],
      });
    }
  }

  function schedule() {
    // rAF yerine setTimeout: arka plandaki sekmede de çalışır
    clearTimeout(timerId);
    timerId = setTimeout(patch, 0);
  }

  // CerezGo html/body stilini sonradan değiştirir: değişince hemen aç
  var attrObserver = new MutationObserver(unlockScroll);
  [document.documentElement].forEach(function (el) {
    attrObserver.observe(el, { attributes: true, attributeFilter: ['style', 'class', 'inert'] });
  });

  function observeBody() {
    if (!document.body) return false;
    attrObserver.observe(document.body, { attributes: true, attributeFilter: ['style', 'class', 'inert'] });
    return true;
  }

  // <cerezgo-app> elemanı DOM'a eklenince yakala
  new MutationObserver(function () {
    observeBody();
    schedule();
  }).observe(document.documentElement, { subtree: true, childList: true });

  observeBody();
  patch();

  // Güvenlik ağı: gecikmeli yüklenen scriptler için ilk 30 sn
  var count = 0;
  var timer = setInterval(function () {
    unlockScroll();
    if (++count >= 15) clearInterval(timer);
  }, 2000);
})();
