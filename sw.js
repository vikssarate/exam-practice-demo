// sw (v1) for exam practice demo
const CACHE = 'exam-practice-v12'; // 🔹 Bump version to v10 so old cache is replaced

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll([
            './',
            './index.html',
            './questions.json?v=img10', // 🔹 Also bump query param to force reload of JSON
            './images/beam_udl.png'     // ✅ Add your image path here
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
