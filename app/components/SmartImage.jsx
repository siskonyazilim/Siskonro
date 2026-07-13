'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeLocalImageSrc(value) {
  if (typeof value !== 'string' || !value.startsWith('/')) {
    return value;
  }

  try {
    const url = new URL(value, 'http://localhost');
    const normalizedPathname = url.pathname
      .split('/')
      .map((segment, index) => {
        if (index === 0) {
          return '';
        }
        const decoded = safeDecode(segment);
        return encodeURIComponent(decoded.normalize('NFC'));
      })
      .join('/');

    return `${normalizedPathname}${url.search}${url.hash}`;
  } catch {
    return value;
  }
}

export default function SmartImage({
  src,
  alt,
  className,
  style,
  sizes,
  quality = 75,
  priority,
  loading,
  fill,
  width,
  height,
  fallbackLabel,
}) {
  const [hasError, setHasError] = useState(false);
  const [nativeFallbackFailed, setNativeFallbackFailed] = useState(false);
  const [blurDataURL, setBlurDataURL] = useState(undefined);
  const normalizedSrc = normalizeLocalImageSrc(src);

  // Load blur data on client side
  useEffect(() => {
    async function loadBlurData() {
      try {
        const response = await fetch('/blur-data.json');
        if (response.ok) {
          const data = await response.json();
          const rawSrc = src.replace(/^\//, '').replaceAll('\\', '/');
          const normalizedKey = safeDecode(normalizedSrc).replace(/^\//, '').replaceAll('\\', '/');
          const blurValue =
            data[rawSrc]
            || data[`assets/${rawSrc}`]
            || data[normalizedKey]
            || data[`assets/${normalizedKey}`];
          if (blurValue) {
            setBlurDataURL(blurValue);
          }
        }
      } catch (error) {
        // Silently fail - blur placeholder is optional
        console.debug('Could not load blur data:', error);
      }
    }

    if (!priority) {
      loadBlurData();
    }
  }, [src, normalizedSrc, priority]);

  let fallbackSizes = '(max-width: 480px) 100vw, (max-width: 768px) 96vw, 90vw';
  if (fill) {
    fallbackSizes = '(max-width: 480px) 100vw, (max-width: 768px) 96vw, (max-width: 1280px) 80vw, 70vw';
  } else if (width) {
    fallbackSizes = `(max-width: 480px) ${Math.min(width, 460)}px, (max-width: 768px) ${Math.min(width, 720)}px, ${width}px`;
  }

  const resolvedSizes = sizes || fallbackSizes;
  const resolvedLoading = priority ? 'eager' : (loading || 'lazy');

  if (hasError && !nativeFallbackFailed) {
    const fallbackSrc = safeDecode(normalizedSrc);
    const fallbackClasses = fill
      ? `absolute inset-0 w-full h-full object-cover ${className || ''}`
      : className;

    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={fallbackClasses}
        style={style}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={resolvedLoading}
        decoding="async"
        onError={() => setNativeFallbackFailed(true)}
      />
    );
  }

  if (hasError) {
    const fallbackClasses = fill
      ? 'absolute inset-0 image-fallback'
      : 'w-full h-full image-fallback';

    return (
      <div className={fallbackClasses} role="img" aria-label={alt}>
        <span className="image-fallback-badge">{fallbackLabel || alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      style={style}
      sizes={resolvedSizes}
      quality={quality}
      priority={priority}
      loading={resolvedLoading}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      onError={() => setHasError(true)}
    />
  );
}

SmartImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  sizes: PropTypes.string,
  quality: PropTypes.number,
  priority: PropTypes.bool,
  loading: PropTypes.oneOf(['eager', 'lazy']),
  fill: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  fallbackLabel: PropTypes.string,
};

SmartImage.defaultProps = {
  className: '',
  style: undefined,
  sizes: undefined,
  quality: undefined,
  priority: false,
  loading: undefined,
  fill: false,
  width: undefined,
  height: undefined,
  fallbackLabel: '',
};
