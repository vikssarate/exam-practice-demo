// sw (v1) for exam practice demo
const CACHE = 'exam-practice-v9';
self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll([
            './',
            './index.html',
            './questions.json?v=img9',
            './images/beam_udl.png'  // ✅ Add your image path here
        ]))
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(r => r || fetch(e.request))
    );
});
