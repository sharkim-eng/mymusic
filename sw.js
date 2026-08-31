const CACHE_NAME = 'shark-pwa-v2';
const APP_SHELL = [
  './',
  './index.html',
  './mood.html',
  './result.html',
  './playlist.html',
  './shark.css',
  './enhancements.css',
  './shark-core.js',
  './public/music-data.js',
  './extra-music.js',
  './catalog-pack.js',
  './artist-pack.js',
  './mega-catalog.js',
  './direct-ids-pack.js',
  './direct-ids-generated.js',
  './manifest.webmanifest',
  './icons/shark-192.png',
  './icons/apple-touch-icon.png',
  './icons/shark-icon.svg',
  './icons/shark-maskable.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const fresh = await fetch(request);
      if (fresh && fresh.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, fresh.clone());
      }
      return fresh;
    } catch (error) {
      const cached = await caches.match(request, { ignoreSearch: true });
      if (cached) return cached;
      if (request.mode === 'navigate') {
        return (await caches.match('./index.html')) || Response.error();
      }
      return Response.error();
    }
  })());
});
