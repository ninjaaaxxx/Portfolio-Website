const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/js/main.js',
  '/js/app.js',
  '/js/particles.js',
  '/js/smooth-scroll.js',
  '/js/wow.js',
  '/js/bootstrap.min.js',
  '/js/jquery-3.1.1.min.js',
  '/css/custom.css',
  '/css/animate.css',
  '/css/normalize.css',
  '/library/bootstrap/bootstrap.min.css',
  '/library/font-awesome/css/font-awesome.css',
  '/img/background.jpg',
  '/img/covid19.png',
  '/img/designing.jpg',
  '/img/Ethical-Hacking.jpg',
  '/img/main-q.png',
  '/img/Prevent-Identity-Theft.jpg',
  '/img/programming.jpg',
  '/img/python.jpg',
  '/img/python.png',
  '/img/terminaltetris.jpg',
  '/img/title.png',
  'https://fonts.googleapis.com/css2?family=Arvo&display=swap',
];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(staticCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});
