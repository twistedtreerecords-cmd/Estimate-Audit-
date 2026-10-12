const CACHE_NAME = 'estimate-copilot-pwa-v2';
const APP_SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', './pdf.min.js', './pdf.worker.min.js'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (cached) return cached;
    try {
      const response = await fetch(req);
      if (response && response.ok) cache.put(req, response.clone());
      return response;
    } catch (err) {
      if (req.mode === 'navigate') return (await cache.match('./index.html')) || Response.error();
      throw err;
    }
  })());
});
