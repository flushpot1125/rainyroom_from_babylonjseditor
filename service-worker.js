const STATIC_DATA = [
  
  'index.html',
  'node_modules/es6-promise/dist/es6-promise.auto.js',
  'node_modules/systemjs/dist/system.js',
  'dist/bundle.js',
  'scene/albedo.png',
  'scene/amiga.jpg',
  'scene/bricks.jpg',
  'scene/documantation.png',
  'scene/environment.dds',
  'scene/flake.bmp',
  'scene/flare.png',
  'scene/mahogfloor_ao.jpg',
  'scene/mahogfloor_basecolor.png',
  'scene/mahogfloor_normal.png',
  'scene/project.editorproject',
  'scene/rain.jpg',
  'scene/reflectivity.png',
  'scene/rustediron2_basecolor.png',
  'scene/rustediron2_metallic.png',
  'scene/rustediron2_normal.png',
  'scene/rustediron2_roughness',
  'scene/scene.babylon'
];

const cacheName ='cache_v1';

self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll(STATIC_DATA)
        .then(()=> self.skipWaiting());
      })
    );
});
  
self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});


