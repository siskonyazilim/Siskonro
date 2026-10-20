import { serializeJsonLd } from '../lib/seo/jsonld';

/**
 * Yapılandırılmış veri (JSON-LD) <script> etiketi — Server Component.
 * "<" karakteri < ile kaçırılır (script injection'a karşı).
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
