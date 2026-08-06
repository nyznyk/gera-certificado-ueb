const CACHE_NAME = 'certificados-escoteiros-v3'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',

  // Modelos - Lote 1
  './cert_acolhida.png',
  './cert_primo.jpg',
  './cert_segundo.jpg',
  './cert_monitor_e.jpg',
  './cert_sub_e.jpg',
  './cert_monitor_s.jpg',
  './cert_promessa.jpg',
  './cert_promessa_l.jpg',
  './cert_recrutador.jpg',

  // Modelos - Lote 2
  './ins_energia_solar.jpg',
  './cert_sub_s_2.jpg',
  './estrelas_atv.jpg',
  './ins_acao_comunitaria.png',
  './ins_aeronauta.png',
  './ins_aviador.png',
  './ins_boa_acao.png',
  './ins_campeoes_natureza.jpg',
  './ins_conesul.png',
  './ins_desafio_comunitario.png',

  // Modelos - Lote 3
  './ins_naval.png',
  './ins_rrr.jpg',
  './ins_semeador.jpg',
  './progressao_f.jpg',
  './ins_grumete.png',
  './ins_lusofonia.jpg'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Ativação e Limpeza de Caches Antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de Requisições (Estratégia Cache First)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
