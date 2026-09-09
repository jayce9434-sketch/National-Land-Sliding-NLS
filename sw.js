const CACHE = 'nls-pages-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './counties-10m.json', './usgs-county-susceptibility.json'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.url.includes('api.weather.gov') || event.request.url.includes('mapservices.weather.noaa.gov')) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
self.addEventListener('message', event => {
  if (event.data?.type !== 'NLS_ALERT') return;
  self.registration.showNotification(event.data.title, {
    body: event.data.body,
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: event.data.tag,
    renotify: true,
    vibrate: [300, 120, 300, 120, 500]
  });
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => list[0] ? list[0].focus() : clients.openWindow('./')));
});
