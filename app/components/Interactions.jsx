'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Interactions() {
  const pathname = usePathname();

  const animateCounter = (el) => {
    const target = Number.parseFloat(el.dataset.count ?? '0') || 0;
    const duration = 2000;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(target * eased);

      el.textContent = current.toLocaleString('tr-TR');

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    document.documentElement.classList.add('js-ready');

    const autoRevealSelector = [
      'main section',
      'main article',
      'main .surface-card',
      'main .card',
      'main .logo-card',
      'main .section-head',
      'main .cta-section',
    ].join(', ');

    // ---- Reveal on scroll ----
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Use a small timeout to ensure Next.js has finished initial paint
    const timer = setTimeout(() => {
      const autoRevealItems = Array.from(document.querySelectorAll(autoRevealSelector));
      autoRevealItems
        .filter((el) => !el.classList.contains('reveal') && !el.classList.contains('tl-item'))
        .filter((el) => !el.closest('.page-hero-section, .hero-section, header, footer'))
        .forEach((el, index) => {
          el.classList.add('reveal', 'reveal-auto');
          el.style.setProperty('--reveal-delay', `${Math.min((index % 8) * 70, 420)}ms`);
        });

      const items = document.querySelectorAll('.reveal, .reveal-auto, .tl-item');
      items.forEach((el) => {
        // If already in viewport, show immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < globalThis.window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view');
        } else {
          revealObserver.observe(el);
        }
      });

      const buttonTargets = document.querySelectorAll(
        "main a.focus-ring.inline-flex.rounded-xl, main button.focus-ring.rounded-xl, main .btn-primary, main .btn-outline, main .btn-global, main .btn-cta, main button[type='submit']"
      );

      buttonTargets.forEach((el) => {
        el.classList.add('ui-btn');
        const className = String(el.className || '');
        const isOutline = /border/.test(className) && !/bg-|text-white/.test(className);

        if (isOutline) {
          el.classList.remove('ui-btn-primary');
          el.classList.add('ui-btn-outline');
          return;
        }

        el.classList.remove('ui-btn-outline');
        el.classList.add('ui-btn-primary');
      });
    }, 100);

    // ---- Counters ----
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count]').forEach((el) => {
      counterObserver.observe(el);
    });

    // Tilt effect intentionally disabled to keep text rendering stable on hover.

    return () => {
      clearTimeout(timer);
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
