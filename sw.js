/*
 * 21/03/2019 - A skeleton service worker added
 *
 */

const version = "1.2.14";
const cacheName = `restaurent-${version}`;

// No javascript files are cached
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll([
                `/`,
                `/favicon.ico`,
                `/index.html`,
                `/404.html`,
                `/offline.html`,
                `/css/styles.css`,
                `/css/404.css`,
                `/data/restaurants.json`,
                `/img/1.jpg`,
                `/img/2.jpg`,
                `/img/3.jpg`,
                `/img/4.jpg`,
                `/img/5.jpg`,
                `/img/6.jpg`,
                `/img/7.jpg`,
                `/img/8.jpg`,
                `/img/9.jpg`,
                `/img/10.jpg`
            ]))
    );
});

self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});

//activate
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

//fetch
self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request,{ignoreSearch:true}).then(function(response) {
            if (response) {
                return response|| fetch(event.request);
            }
            return fetch(event.request).then(function(response) {
                if (response.status === 404) {
                    return caches.match('/404.html');
                }
                return response
            });
        }).catch(function(error) {
            // If both fail, show a generic fallback:
            console.error('Fetch failed; returning offline page instead.', error);

            return caches.match('/offline.html', {ignoreSearch:true});
        })
    );
});



