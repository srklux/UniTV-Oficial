// service-worker.js

// Define o nome e a versão do cache
const CACHE_NAME = 'unitv-cache-v1';

// Arquivos para armazenar em cache
const filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/img/UNITV.webp',
  '/img/whatsapp.webp',
  '/video/ss4.mp4',
];

// Instala o service worker e faz o cache dos arquivos definidos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache inicializado');
        return cache.addAll(filesToCache); // Armazena os arquivos no cache
      })
  );
});

// Recupera os arquivos do cache ou da rede, se não estiverem no cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o arquivo estiver no cache, retorna do cache, caso contrário, da rede
        return response || fetch(event.request);
      })
  );
});

// Atualiza o cache se uma nova versão for encontrada
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
