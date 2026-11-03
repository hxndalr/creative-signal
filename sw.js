/* Offline support for the installed / hosted app. The build (tools/build.mjs) writes the real
   version and file list into dist/sw.js; this source copy just caches files as they are used. */
const VERSION = 'dev';
const PRECACHE = [];
const CACHE = 'creative-signal-' + VERSION;

self.addEventListener('install', e => {
  // cache: 'reload' skips the HTTP cache so a new version never precaches stale files
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE.map(u => new Request(u, { cache: 'reload' })))));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('creative-signal-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* The page asks for this when the learner clicks "Reload to update". */
self.addEventListener('message', e => { if (e.data === 'skip-waiting') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  // The unbuilt source (VERSION 'dev') never serves from cache, so edits show up straight away.
  if (VERSION === 'dev' || req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // The app root ("…/") is served from the cached index.html; other pages (e.g. the learner guide) by their own URL.
    const key = req.mode === 'navigate' && req.url.split(/[?#]/)[0] === self.registration.scope ? new URL('index.html', self.registration.scope).href : req;
    const hit = await cache.match(key, { ignoreSearch: true });
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok && res.type === 'basic') cache.put(key, res.clone());
    return res;
  })());
});
