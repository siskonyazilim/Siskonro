import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
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
    ],
  };
}
