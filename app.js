// Registro do Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker v3 registrado com sucesso.');
  });
}

// Mapeamento de Configurações e Coordenadas dos Certificados
const CERT_CONFIGS = {
  // --- ACOLHIDA E PROGRESSÃO ---
  cert_acolhida: {
    orientation: 'landscape',
    src: 'cert_acolhida.png',
    fields: ['nome', 'responsaveis', 'grupo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 500, y: 340, font: '28px sans-serif', align: 'center' },
      responsaveis: { x: 500, y: 410, font: '22px sans-serif', align: 'center' },
      grupo: { x: 500, y: 475, font: '22px sans-serif', align: 'center' },
      cidade: { x: 320, y: 550, font: '20px sans-serif', align: 'center' },
      dia: { x: 490, y: 550, font: '20px sans-serif', align: 'center' },
      mes: { x: 590, y: 550, font: '20px sans-serif', align: 'center' },
      ano: { x: 720, y: 550, font: '20px sans-serif', align: 'center' }
    }
  },
  progressao_f: {
    orientation: 'landscape',
    src: 'progressao_f.jpg',
    fields: ['nome', 'etapa', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 500, y: 395, font: '26px sans-serif', align: 'center' },
      etapa: { x: 540, y: 480, font: '22px sans-serif', align: 'left' },
      cidade: { x: 355, y: 672, font: '20px sans-serif', align: 'center' },
      dia: { x: 462, y: 672, font: '20px sans-serif', align: 'center' },
      mes: { x: 562, y: 672, font: '20px sans-serif', align: 'center' },
      ano: { x: 675, y: 672, font: '20px sans-serif', align: 'center' }
    }
  },
  estrelas_atv: {
    orientation: 'landscape',
    src: 'estrelas_atv.jpg',
    fields: ['nome', 'anos', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 500, y: 535, font: '26px sans-serif', align: 'center' },
      anos: { x: 338, y: 598, font: '22px sans-serif', align: 'center' },
      cidade: { x: 448, y: 712, font: '20px sans-serif', align: 'center' },
      dia: { x: 508, y: 712, font: '20px sans-serif', align: 'center' },
      mes: { x: 592, y: 712, font: '20px sans-serif', align: 'center' },
      ano: { x: 715, y: 712, font: '20px sans-serif', align: 'center' }
    }
  },

  // --- LIDERANÇA ---
  cert_primo: {
    orientation: 'portrait',
    src: 'cert_primo.jpg',
    fields: ['nome', 'matilha', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 550, font: '24px sans-serif', align: 'center' },
      matilha: { x: 500, y: 635, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  cert_segundo: {
    orientation: 'portrait',
    src: 'cert_segundo.jpg',
    fields: ['nome', 'matilha', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 550, font: '24px sans-serif', align: 'center' },
      matilha: { x: 500, y: 635, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  cert_monitor_e: {
    orientation: 'portrait',
    src: 'cert_monitor_e.jpg',
    fields: ['nome', 'patrulha', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 550, font: '24px sans-serif', align: 'center' },
      patrulha: { x: 500, y: 635, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  cert_sub_e: {
    orientation: 'portrait',
    src: 'cert_sub_e.jpg',
    fields: ['nome', 'patrulha', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 550, font: '24px sans-serif', align: 'center' },
      patrulha: { x: 500, y: 635, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  cert_monitor_s: {
    orientation: 'portrait',
    src: 'cert_monitor_s.jpg',
    fields: ['nome', 'patrulha', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 550, font: '24px sans-serif', align: 'center' },
      patrulha: { x: 500, y: 635, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  cert_sub_s_2: {
    orientation: 'portrait',
    src: 'cert_sub_s_2.jpg',
    fields: ['nome', 'patrulha', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 550, font: '24px sans-serif', align: 'center' },
      patrulha: { x: 500, y: 635, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },

  // --- PROMESSA E EXPANSÃO ---
  cert_promessa: {
    orientation: 'portrait',
    src: 'cert_promessa.jpg',
    fields: ['nome', 'forma_promessa', 'grupo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 510, font: '24px sans-serif', align: 'center' },
      forma_promessa: { x: 400, y: 575, font: '20px sans-serif', align: 'center' },
      grupo: { x: 400, y: 640, font: '22px sans-serif', align: 'center' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  cert_promessa_l: {
    orientation: 'portrait',
    src: 'cert_promessa_l.jpg',
    fields: ['nome', 'grupo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      grupo: { x: 400, y: 620, font: '22px sans-serif', align: 'center' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  cert_recrutador: {
    orientation: 'portrait',
    src: 'cert_recrutador.jpg',
    fields: ['nome', 'quantidade', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      quantidade: { x: 380, y: 605, font: '22px sans-serif', align: 'center' },
      cidade: { x: 290, y: 780, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 780, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 780, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 780, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_semeador: {
    orientation: 'portrait',
    src: 'ins_semeador.jpg',
    fields: ['nome', 'quantidade', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 480, font: '24px sans-serif', align: 'center' },
      quantidade: { x: 330, y: 602, font: '22px sans-serif', align: 'center' },
      cidade: { x: 290, y: 728, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 728, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 728, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 728, font: '20px sans-serif', align: 'center' }
    }
  },

  // --- INSÍGNIAS E MODALIDADES ---
  ins_energia_solar: {
    orientation: 'landscape',
    src: 'ins_energia_solar.jpg',
    fields: ['nome', 'ramo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 410, y: 375, font: '26px sans-serif', align: 'center' },
      ramo: { x: 215, y: 412, font: '22px sans-serif', align: 'center' },
      cidade: { x: 250, y: 575, font: '20px sans-serif', align: 'center' },
      dia: { x: 345, y: 575, font: '20px sans-serif', align: 'center' },
      mes: { x: 458, y: 575, font: '20px sans-serif', align: 'center' },
      ano: { x: 590, y: 575, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_campeoes_natureza: {
    orientation: 'landscape',
    src: 'ins_campeoes_natureza.jpg',
    fields: ['nome', 'ramo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 495, y: 310, font: '26px sans-serif', align: 'center' },
      ramo: { x: 628, y: 395, font: '22px sans-serif', align: 'left' },
      cidade: { x: 320, y: 525, font: '20px sans-serif', align: 'center' },
      dia: { x: 465, y: 525, font: '20px sans-serif', align: 'center' },
      mes: { x: 592, y: 525, font: '20px sans-serif', align: 'center' },
      ano: { x: 735, y: 525, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_rrr: {
    orientation: 'landscape',
    src: 'ins_rrr.jpg',
    fields: ['nome', 'ramo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 415, y: 398, font: '26px sans-serif', align: 'center' },
      ramo: { x: 228, y: 425, font: '22px sans-serif', align: 'center' },
      cidade: { x: 260, y: 558, font: '20px sans-serif', align: 'center' },
      dia: { x: 352, y: 558, font: '20px sans-serif', align: 'center' },
      mes: { x: 460, y: 558, font: '20px sans-serif', align: 'center' },
      ano: { x: 588, y: 558, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_conesul: {
    orientation: 'portrait',
    src: 'ins_conesul.png',
    fields: ['nome', 'ramo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 510, font: '24px sans-serif', align: 'center' },
      ramo: { x: 600, y: 595, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 752, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 752, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 752, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 752, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_lusofonia: {
    orientation: 'portrait',
    src: 'ins_lusofonia.jpg',
    fields: ['nome', 'ramo', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 500, font: '24px sans-serif', align: 'center' },
      ramo: { x: 640, y: 586, font: '22px sans-serif', align: 'left' },
      cidade: { x: 290, y: 742, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 742, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 742, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 742, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_acao_comunitaria: {
    orientation: 'portrait',
    src: 'ins_acao_comunitaria.png',
    fields: ['nome', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      cidade: { x: 290, y: 718, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 718, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 718, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 718, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_aeronauta: {
    orientation: 'portrait',
    src: 'ins_aeronauta.png',
    fields: ['nome', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      cidade: { x: 290, y: 718, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 718, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 718, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 718, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_aviador: {
    orientation: 'portrait',
    src: 'ins_aviador.png',
    fields: ['nome', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      cidade: { x: 290, y: 718, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 718, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 718, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 718, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_boa_acao: {
    orientation: 'portrait',
    src: 'ins_boa_acao.png',
    fields: ['nome', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      cidade: { x: 290, y: 718, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 718, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 718, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 718, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_desafio_comunitario: {
    orientation: 'portrait',
    src: 'ins_desafio_comunitario.png',
    fields: ['nome', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      cidade: { x: 290, y: 718, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 718, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 718, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 718, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_grumete: {
    orientation: 'portrait',
    src: 'ins_grumete.png',
    fields: ['nome', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      cidade: { x: 290, y: 718, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 718, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 718, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 718, font: '20px sans-serif', align: 'center' }
    }
  },
  ins_naval: {
    orientation: 'portrait',
    src: 'ins_naval.png',
    fields: ['nome', 'cidade', 'dia', 'mes', 'ano'],
    coords: {
      nome: { x: 400, y: 520, font: '24px sans-serif', align: 'center' },
      cidade: { x: 290, y: 718, font: '20px sans-serif', align: 'center' },
      dia: { x: 432, y: 718, font: '20px sans-serif', align: 'center' },
      mes: { x: 550, y: 718, font: '20px sans-serif', align: 'center' },
      ano: { x: 670, y: 718, font: '20px sans-serif', align: 'center' }
    }
  }
};

// Mapeamento das Labels e HTML dos Campos
const FIELD_LABELS = {
  nome: '<label>Nome do Escoteiro/Filhote:<br><input type="text" id="input-nome" required></label>',
  responsaveis: '<label>Nome dos Responsáveis:<br><input type="text" id="input-responsaveis" required></label>',
  grupo: '<label>Nome/Nº do Grupo Escoteiro:<br><input type="text" id="input-grupo" required></label>',
  matilha: '<label>Nome da Matilha:<br><input type="text" id="input-matilha" required></label>',
  patrulha: '<label>Nome da Patrulha:<br><input type="text" id="input-patrulha" required></label>',
  forma_promessa: '<label>Como prestou a promessa:<br><input type="text" id="input-forma_promessa" placeholder="ex: como Escoteiro(a)" required></label>',
  quantidade: '<label>Quantidade (Membros/UELs):<br><input type="text" id="input-quantidade" required></label>',
  anos: '<label>Anos de Atividade:<br><input type="number" id="input-anos" min="1" required></label>',
  ramo: '<label>Ramo:<br><input type="text" id="input-ramo" placeholder="ex: Escoteiro, Lobinho, Sênior" required></label>',
  etapa: '<label>Etapa Concluída:<br><input type="text" id="input-etapa" placeholder="ex: Pista, Cordialidade" required></label>',
  cidade: '<label>Cidade:<br><input type="text" id="input-cidade" required></label>',
  dia: '<label>Dia:<br><input type="text" id="input-dia" placeholder="DD" required></label>',
  mes: '<label>Mês:<br><input type="text" id="input-mes" placeholder="Extenso (ex: Agosto)" required></label>',
  ano: '<label>Ano:<br><input type="text" id="input-ano" placeholder="AAAA" required></label>'
};

const selectTemplate = document.getElementById('template-select');
const dynamicFieldsDiv = document.getElementById('dynamic-fields');
const canvas = document.getElementById('cert-canvas');
const ctx = canvas.getContext('2d');
const btnPreview = document.getElementById('btn-preview');
const certForm = document.getElementById('cert-form');

// Atualização dinâmica do formulário conforme modelo
selectTemplate.addEventListener('change', () => {
  const modelKey = selectTemplate.value;
  dynamicFieldsDiv.innerHTML = '';

  if (!modelKey || !CERT_CONFIGS[modelKey]) return;

  const fieldsNeeded = CERT_CONFIGS[modelKey].fields;
  fieldsNeeded.forEach(field => {
    if (FIELD_LABELS[field]) {
      const wrapper = document.createElement('div');
      wrapper.className = 'field-group';
      wrapper.innerHTML = FIELD_LABELS[field];
      dynamicFieldsDiv.appendChild(wrapper);
    }
  });
});

// Função para desenhar a imagem e o texto no Canvas
function renderCertificate() {
  return new Promise((resolve, reject) => {
    const modelKey = selectTemplate.value;
    if (!modelKey || !CERT_CONFIGS[modelKey]) {
      alert('Selecione um certificado válido.');
      return reject('Nenhum modelo selecionado');
    }

    const config = CERT_CONFIGS[modelKey];
    const img = new Image();
    img.src = config.src;

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      ctx.fillStyle = '#000000';

      config.fields.forEach(field => {
        const inputEl = document.getElementById(`input-${field}`);
        const textValue = inputEl ? inputEl.value : '';
        const coord = config.coords[field];

        if (coord) {
          ctx.font = coord.font;
          ctx.textAlign = coord.align || 'left';
          ctx.fillText(textValue, coord.x, coord.y);
        }
      });

      resolve(config);
    };

    img.onerror = () => {
      alert('Erro ao carregar a imagem do modelo.');
      reject('Erro de imagem');
    };
  });
}

// Botão de Prévia
btnPreview.addEventListener('click', () => {
  renderCertificate().catch(console.error);
});

// Submissão e Geramento de PDF
certForm.addEventListener('submit', (e) => {
  e.preventDefault();

  renderCertificate().then((config) => {
    const { jsPDF } = window.jspdf;
    const isLandscape = config.orientation === 'landscape';
    const pdf = new jsPDF({
      orientation: isLandscape ? 'l' : 'p',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save(`certificado_${selectTemplate.value}.pdf`);
  }).catch(console.error);
});
