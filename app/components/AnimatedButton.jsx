"use client";

import Link from "next/link";

/**
 * AnimatedButton - Evrensel animasyonlu buton bileşeni
 * Hover: metin yukarı kayar + ok soldan sağa geçer. Renk değişmez.
 *
 * Props:
 *  - href: string (Link olarak render)
 *  - children: metin
 *  - className: ek CSS sınıfları (hover:bg-* otomatik filtrelenir)
 *  - asButton: true ise <button> olarak render
 *  - onClick, type, disabled, target, rel, style: standart props
 *  - noArrow: ok gösterilmesin mi
 *  - external: dış link mi (a href ile)
 */
export default function AnimatedButton({
  href,
  children,
  className = "",
  asButton = false,
  onClick,
  type = "button",
  disabled,
  target,
  rel,
  style,
  noArrow = false,
  external = false,
}) {
  // Dışarıdan gelen hover renk sınıflarını temizle
  const filteredClass = className
    .split(" ")
    .filter(
      (cls) =>
        !cls.startsWith("hover:bg-") &&
        !cls.startsWith("hover:!bg-") &&
        !cls.startsWith("hover:text-") &&
        !cls.startsWith("hover:!text-") &&
        !cls.startsWith("hover:border-")
    )
    .join(" ");

  const baseClass = `btn-cta-animated group/btn ${filteredClass}`;

  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover/btn:-translate-y-full whitespace-nowrap">
          {children}
        </span>
        <span
          className="absolute inset-0 block transition-transform duration-300 ease-out translate-y-full group-hover/btn:translate-y-0 whitespace-nowrap"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>

      {!noArrow && (
        <span className="relative overflow-hidden flex items-center justify-center w-5 h-5 shrink-0 ml-1">
          <svg
            className="absolute inset-0 m-auto w-4 h-4 transition-all duration-300 group-hover/btn:translate-x-full group-hover/btn:opacity-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <svg
            className="absolute inset-0 m-auto w-4 h-4 transition-all duration-300 -translate-x-full opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      )}
    </>
  );

  if (asButton) {
    return (
      <button type={type} onClick={onClick} disabled={disabled} style={style} className={baseClass}>
        {inner}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target={target} rel={rel} style={style} className={baseClass}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} target={target} rel={rel} style={style} className={baseClass}>
      {inner}
    </Link>
  );
}
