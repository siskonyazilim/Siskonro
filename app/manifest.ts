import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Siskon',
    short_name: 'Siskon',
    description: 'Endüstriyel yazılım, otomasyon ve veri çözümleri',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a192f',
    lang: 'tr',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
