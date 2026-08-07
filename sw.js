const CACHE_NAME = 'certificados-escoteiros-v4';

// Lista de todos os arquivos que o celular deve guardar na memória
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './icone.png',
  './fundo.jpg',
  './modelo_progressao_l.png',
  './modelo_progressao_e.png',
  './modelo_progressao_s.png',
  './modelo_progressao_p.png',
  './modelo_progressao_f.jpg',
  './modelo_cert_acolhida.png',
  './modelo_estrelas_atv.jpg',
  './modelo_cert_primo.jpg',
  './modelo_cert_segundo.jpg',
  './modelo_cert_monitor_e.jpg',
  './modelo_cert_sub_e.jpg',
  './modelo_cert_monitor_s.jpg',
  './modelo_cert_sub_s_2.jpg',
  './modelo_cert_promessa.jpg',
  './modelo_cert_promessa_l.jpg',
  './modelo_cert_recrutador.jpg',
  './modelo_ins_semeador.jpg',
  './modelo_especialidade_le.png',
  './modelo_especialidade_sp.png',
  './modelo_ins_energia_solar.jpg',
  './modelo_ins_campeoes_natureza.jpg',
  './modelo_ins_rrr.jpg',
  './modelo_ins_conesul.png',
  './modelo_ins_lusofonia.jpg',
  './modelo_ins_acao_comunitaria.png',
  './modelo_ins_aeronauta.png',
  './modelo_ins_aviador.png',
  './modelo_ins_boa_acao.png',
  './modelo_ins_desafio_comunitario.png',
  './modelo_ins_grumete.png',
  './modelo_ins_naval.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalação do Service Worker
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Evento Activate (Limpa caches antigos do celular)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Intercepta as requisições para buscar do armazenamento local (Offline)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
