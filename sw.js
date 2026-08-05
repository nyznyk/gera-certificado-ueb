const CACHE_NAME = 'certificados-escoteiros-v1';

// Lista de todos os arquivos que o celular deve guardar na memória
const ASSETS = [
  'index.html',
  'app.js',
  'manifest.json',
  'icone.png',
  'modelo_progressao_l.png',
  'modelo_progressao_e.png',
  'modelo_progressao_s.png',
  'modelo_progressao_p.png',
  'modelo_especialidade_le.png',
  'modelo_especialidade_sp.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalação do Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Intercepta as requisições para buscar do armazenamento local (Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});