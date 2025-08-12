const CACHE_NAME = 'my-blog-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css', // Ví dụ đường dẫn đến file CSS
  '/scripts/main.js' // Ví dụ đường dẫn đến file JS
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
