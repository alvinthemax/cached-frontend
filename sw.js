const CACHE_NAME = 'notes-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/app.js'
];

// Install → cache UI
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate → langsung kontrol halaman
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Fetch → offline-first untuk UI
self.addEventListener('fetch', event => {
  // Tangani navigasi halaman (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html')
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
