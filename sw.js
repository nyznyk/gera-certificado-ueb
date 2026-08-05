const CACHE_NAME = 'certificados-escoteiros-v2'; // 👈 Mude para v2, v3, etc. quando atualizar o app!

// Lista de todos os arquivos que o celular deve guardar na memória
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icone.png',
  './fundo.jpg', // Adicionado fundo.jpg que estava no seu HTML
  './modelo_progressao_l.png',
  './modelo_progressao_e.png',
  './modelo_progressao_s.png',
  './modelo_progressao_p.png',
  './modelo_especialidade_le.png',
  './modelo_especialidade_sp.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalação do Service Worker
self.addEventListener('install', (e) => {
  self.skipWaiting(); // 👈 NOVO: Força o novo Service Worker a ativar imediatamente
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 👈 NOVO: Evento Activate (Limpa caches antigos do celular)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Apaga os arquivos da versão anterior
          }
        })
      );
    }).then(() => self.clients.claim()) // Toma o controle do app na hora
  );
});

// Intercepta as requisições para buscar do armazenamento local (Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
