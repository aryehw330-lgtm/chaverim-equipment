const CACHE_NAME = 'chaverim-equip-v1';
const STATIC_ASSETS = [
  '/chaverim-equipment/',
    '/chaverim-equipment/index.html',
      '/chaverim-equipment/manifest.json'
      ];

      // Install: cache static assets
      self.addEventListener('install', event => {
        event.waitUntil(
            caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
              );
                self.skipWaiting();
                });

                // Activate: clear old caches
                self.addEventListener('activate', event => {
                  event.waitUntil(
                      caches.keys().then(keys =>
                            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
                                )
                                  );
                                    self.clients.claim();
                                    });

                                    // Fetch: network-first for API calls, cache-first for static assets
                                    self.addEventListener('fetch', event => {
                                      const url = new URL(event.request.url);

                                        // Always go network-first for Apps Script API calls
                                          if (url.hostname === 'script.google.com') {
                                              event.respondWith(
                                                    fetch(event.request).catch(() =>
                                                            new Response(JSON.stringify({ error: 'Offline - no data available' }), {
                                                                      headers: { 'Content-Type': 'application/json' }
                                                                              })
                                                                                    )
                                                                                        );
                                                                                            return;
                                                                                              }

                                                                                                // Cache-first for same-origin static assets
                                                                                                  if (url.origin === self.location.origin) {
                                                                                                      event.respondWith(
                                                                                                            caches.match(event.request).then(cached => {
                                                                                                                    if (cached) return cached;
                                                                                                                            return fetch(event.request).then(response => {
                                                                                                                                      if (response.ok) {
                                                                                                                                                  const clone = response.clone();
                                                                                                                                                              caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                                                                                                                                                                        }
                                                                                                                                                                                  return response;
                                                                                                                                                                                          });
                                                                                                                                                                                                })
                                                                                                                                                                                                    );
                                                                                                                                                                                                      }
                                                                                                                                                                                                      });
