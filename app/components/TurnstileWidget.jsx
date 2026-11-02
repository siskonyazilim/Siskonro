'use client';

import PropTypes from 'prop-types';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

let scriptPromise = null;

// Cloudflare betiğini sayfa başına bir kez yükler (explicit render: widget'ı biz oluştururuz).
function loadTurnstile() {
  if (globalThis.turnstile) return Promise.resolve(globalThis.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(globalThis.turnstile);
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error('Turnstile script failed to load'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * Cloudflare Turnstile widget'ı.
 * onChange(token): doğrulama tamamlanınca token, süre dolunca/hatada boş string.
 * ref.reset(): widget'ı sıfırlar (token tek kullanımlıktır).
 */
const TurnstileWidget = forwardRef(function TurnstileWidget({ sitekey, onChange, theme = 'dark' }, ref) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current !== null) globalThis.turnstile?.reset(widgetIdRef.current);
      onChangeRef.current?.('');
    },
  }));

  useEffect(() => {
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current || !turnstile) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey,
          theme,
          language: 'auto',
          // Kutu yalnızca ziyaretçiden etkileşim gerekirse görünür; aksi halde doğrulama arka planda sessizce yapılır
          appearance: 'interaction-only',
          callback: (token) => onChangeRef.current?.(token || ''),
          'expired-callback': () => onChangeRef.current?.(''),
          'error-callback': () => onChangeRef.current?.(''),
        });
      })
      .catch(() => onChangeRef.current?.(''));

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null) {
        globalThis.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [sitekey, theme]);

  return <div ref={containerRef} />;
});

TurnstileWidget.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  theme: PropTypes.oneOf(['light', 'dark', 'auto']),
};

export default TurnstileWidget;
