/**
 * DeryCode Service Worker — sw.js (refactored June 2026)
 *
 * Strategy: Cache-first for static assets, network-first for HTML.
 * This avoids serving stale HTML while still making images/fonts/CSS
 * load instantly from cache.
 *
 * Changes from original:
 * - Removed attempt to cache cross-origin Google Fonts / cdnjs at
 *   install time (they often block SW install with CORS errors)
 * - Separate strategies for HTML (network-first) vs assets (cache-first)
 * - Cache-busting: version bump clears old caches automatically
 * - Added error handling so a cache miss doesn't throw
 */

const VERSION    = 'derycode-v3';
const HTML_CACHE = VERSION + '-html';
const ASSET_CACHE = VERSION + '-assets';

// Static assets to pre-cache (versioned — all served locally)
const PRECACHE_ASSETS = [
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/hero.webp',
  '/about.webp',
  '/team.webp',
  '/derycoin.webp',
];

// ── INSTALL ──────────────────────────────────────────────────
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(ASSET_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ─────────────────────────────────────────────────
self.addEventListener('activate', (e) => {
  const keep = [HTML_CACHE, ASSET_CACHE];
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => !keep.includes(k)).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH ─────────────────────────────────────────────────────
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== location.origin) return;

  // HTML pages → network-first, fallback to cache
  if (request.headers.get('Accept')?.includes('text/html')) {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(HTML_CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets → cache-first, fallback to network
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        const clone = res.clone();
        caches.open(ASSET_CACHE).then(c => c.put(request, clone));
        return res;
      });
    }).catch(() => new Response('Offline', { status: 503 }))
  );
});
