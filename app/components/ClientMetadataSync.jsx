'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { buildLocalizedMetadata } from '../lib/seo/routeMetadata';

function upsertMetaTag(attribute, key, content) {
  if (!content) return;

  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href) {
  if (!href) return;

  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', href);
}

export default function ClientMetadataSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || globalThis.window === undefined) return;

    const siteUrl = globalThis.window.location.origin;
    const metadata = buildLocalizedMetadata({ pathname, siteUrl });

    if (metadata.title) {
      document.title = String(metadata.title);
    }

    const description = metadata.description ? String(metadata.description) : '';
    upsertMetaTag('name', 'description', description);
    upsertMetaTag('property', 'og:title', metadata.openGraph?.title ? String(metadata.openGraph.title) : '');
    upsertMetaTag('property', 'og:description', metadata.openGraph?.description ? String(metadata.openGraph.description) : '');
    upsertMetaTag('property', 'og:url', metadata.openGraph?.url ? String(metadata.openGraph.url) : '');
    upsertMetaTag('name', 'twitter:title', metadata.twitter?.title ? String(metadata.twitter.title) : '');
    upsertMetaTag('name', 'twitter:description', metadata.twitter?.description ? String(metadata.twitter.description) : '');

    const canonicalPath = metadata.alternates?.canonical;
    if (canonicalPath) {
      upsertCanonicalLink(new URL(canonicalPath, siteUrl).toString());
    }
  }, [pathname]);

  return null;
}