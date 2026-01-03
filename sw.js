// sw.js - simple service worker for offline caching
const CACHE = 'gullak-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/script.js',
  '/manifest.json'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  const req = evt.request;
  // Try cache first, then network
  evt.respondWith(
    caches.match(req).then(cached => cached || fetch(req).catch(() => {
      // fallback to index for navigation requests (app shell)
      if (req.mode === 'navigate') return caches.match('/index.html');
      return new Response('', { status: 503, statusText: 'Offline' });
    }))
  );
});
