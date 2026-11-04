/** @returns {import('next').MetadataRoute.Manifest} */
export default function manifest() {
  return {
    name: 'Siskon România',
    short_name: 'Siskon România',
    description: 'Digitalizare industrială, software și automatizare pentru producție',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a192f',
    lang: 'ro',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      // Android / Samsung Internet "Ana ekrana ekle" ve kurulum için PNG ikon bekler
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
