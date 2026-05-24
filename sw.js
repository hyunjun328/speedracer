const CACHE = 'speedracer-v6';
const ASSETS = [
  '/speedracer/',
  '/speedracer/index.html',
  '/speedracer/icon.svg',
  '/speedracer/manifest.json',
  '/speedracer/racing_kart_with_driver.glb',
  '/speedracer/race_car.glb',
  '/speedracer/sedan.glb',
  '/speedracer/monster_truck.glb',
  '/speedracer/motorcycle_with_rider.glb',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
