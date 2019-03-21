/*
 * 21/03/2019 - A skeleton service worker added
 *
 */

const version = "1.0.0";
const cacheName = `restaurent-${version}`;
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
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
                `/img/10.jpg`,
                `/js/dbhelper.js`,
                `/js/main.js`,
                `/js/restaurant_info.js`
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            }
            return fetch(event.request).then(function(response) {
                if (response.status === 404) {
                    return caches.match('/404.html');
                }
                return response
            });
        }).catch(function() {
            // If both fail, show a generic fallback:
            return caches.match('/offline.html');
        })
    );
});


self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
