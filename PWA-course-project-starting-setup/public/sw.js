self.addEventListener('install', function (event) {
    console.log('[SW] Installing Service Worker ...', event)
})

self.addEventListener('activate', function (event) {
    console.log('[SW] Activating Service Worker ...', event)
    return self.clients.claim();
})

self.addEventListener('fetch', function (event) {
    console.log('[SW] Fetch event ...', event)
    //event.respondWith(fetch(event.response))
})