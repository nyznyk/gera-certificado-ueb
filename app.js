let logoGroup = null; // Guarda a imagem da logo UEL em memória

// Função para carregar a logo do grupo
function carregarLogo(event) {
    const file = event.target.files[0];
    const statusTxt = document.getElementById('statusLogo');

    if (file) {
        if (statusTxt) statusTxt.innerText = `Logo selecionada: ${file.name}`;

        const reader = new FileReader();
        reader.onload = function(e) {
            logoGroup = new Image();
            logoGroup.onload = function() {
                gerarCertificado(); // Redesenha o canvas em tempo real assim que carrega a foto
            };
            logoGroup.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        logoGroup = null;
        if (statusTxt) statusTxt.innerText = "Nenhuma logo selecionada";
        gerarCertificado();
    }
}

const canvas = document.getElementById('canvasCertificado');
const ctx = canvas.getContext('2d');

function wrapText(context, text, x1, y, maxWidth1, xNext, maxWidthNext, lineHeight) {
    if (!text) return;
    const words = text.split(' ');
    let line = '';
    let currentX = x1;
    let currentMaxWidth = maxWidth1;
    let isFirstLine = true;
    
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        
        if (metrics.width > currentMaxWidth && n > 0) {
            context.fillText(line, currentX, y);
            line = words[n] + ' ';
            y += lineHeight;
            if (isFirstLine) {
                currentX = xNext;
                currentMaxWidth = maxWidthNext;
                isFirstLine = false;
            }
        } else {
            line = testLine;
        }
    }
    context.fillText(line, currentX, y);
}

// Obter valor dos campos de texto com segurança
function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : "";
}

// Exibe/oculta campos de acordo com o modelo de certificado selecionado
function atualizarFormulario() {
    const modeloSelect = document.getElementById('modelo');
    if (!modeloSelect) return;
    const modelo = modeloSelect.value;

    const idsDinamicos = [
        'campo-responsaveis', 'campo-grupo', 'campo-matilha', 'campo-patrulha',
        'campo-forma_promessa', 'campo-quantidade', 'campo-anos', 'campo-ramo',
        'campo-etapa', 'grupo-especialidade', 'campo-nivel', 'campo-sp-extra'
    ];

    idsDinamicos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const mostrar = (id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    };

    if (modelo === 'cert_acolhida') {
        mostrar('campo-responsaveis');
        mostrar('campo-grupo');
    } else if (modelo === 'progressao_f' || modelo.startsWith('progressao_')) {
        mostrar('campo-etapa');
    } else if (modelo === 'estrelas_atv') {
        mostrar('campo-anos');
    } else if (modelo === 'cert_primo' || modelo === 'cert_segundo') {
        mostrar('campo-matilha');
    } else if (modelo.startsWith('cert_monitor_') || modelo.startsWith('cert_sub_')) {
        mostrar('campo-patrulha');
    } else if (modelo === 'cert_promessa') {
        mostrar('campo-forma_promessa');
        mostrar('campo-grupo');
    } else if (modelo === 'cert_promessa_l') {
        mostrar('campo-grupo');
    } else if (modelo === 'cert_recrutador' || modelo === 'ins_semeador') {
        mostrar('campo-quantidade');
    } else if (modelo === 'especialidade_le') {
        mostrar('grupo-especialidade');
        mostrar('campo-nivel');
    } else if (modelo === 'especialidade_sp') {
        mostrar('grupo-especialidade');
        mostrar('campo-sp-extra');
    } else if (['ins_energia_solar', 'ins_campeoes_natureza', 'ins_rrr', 'ins_conesul', 'ins_lusofonia'].includes(modelo)) {
        mostrar('campo-ramo');
    }

    gerarCertificado();
}

// Desenha no Canvas em tempo real
function gerarCertificado() {
    const modeloSelect = document.getElementById('modelo');
    if (!modeloSelect) return;
    const modelo = modeloSelect.value;

    const nome = getVal('nome');
    const cidade = getVal('cidade');
    const dia = getVal('dia');
    const mes = getVal('mes');
    const ano = getVal('ano');

    const img = new Image();
    let tentativa = 0;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#111111';
        
        const fontePrincipal = '20pt Arial, sans-serif';
        const fontePequena = '16pt Arial, sans-serif';
        ctx.font = fontePrincipal;

        // 1. PROGRESSÃO
        if (modelo === 'progressao_l') {
            const etapa = getVal('etapa');
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.48, canvas.height * 0.315); 
            ctx.fillText(etapa, canvas.width * 0.53, canvas.height * 0.375); 
            ctx.fillText(cidade, canvas.width * 0.32, canvas.height * 0.525);
            ctx.fillText(dia, canvas.width * 0.45, canvas.height * 0.525);
            ctx.fillText(mes, canvas.width * 0.57, canvas.height * 0.525);
            ctx.fillText(ano, canvas.width * 0.69, canvas.height * 0.525);
        }
        else if (modelo === 'progressao_e') {
            const etapa = getVal('etapa');
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.49, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.55, canvas.height * 0.405); 
            ctx.fillText(cidade, canvas.width * 0.34, canvas.height * 0.56);
            ctx.fillText(dia, canvas.width * 0.47, canvas.height * 0.56);
            ctx.fillText(mes, canvas.width * 0.59, canvas.height * 0.56);
            ctx.fillText(ano, canvas.width * 0.71, canvas.height * 0.56);
        }
        else if (modelo === 'progressao_s') {
            const etapa = getVal('etapa');
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.59, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.65, canvas.height * 0.385); 
            ctx.fillText(cidade, canvas.width * 0.45, canvas.height * 0.545);
            ctx.fillText(dia, canvas.width * 0.58, canvas.height * 0.545);
            ctx.fillText(mes, canvas.width * 0.70, canvas.height * 0.545);
            ctx.fillText(ano, canvas.width * 0.82, canvas.height * 0.545);
        }
        else if (modelo === 'progressao_p') {
            const etapa = getVal('etapa');
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.36); 
            ctx.fillText(etapa, canvas.width * 0.56, canvas.height * 0.42); 
            ctx.fillText(cidade, canvas.width * 0.46, canvas.height * 0.55);
            ctx.fillText(dia, canvas.width * 0.59, canvas.height * 0.55);
            ctx.fillText(mes, canvas.width * 0.72, canvas.height * 0.55);
            ctx.fillText(ano, canvas.width * 0.83, canvas.height * 0.55);
        }

        // 2. ACOLHIDA
        else if (modelo === 'cert_acolhida') {
            const resp = getVal('responsaveis');
            const grupo = getVal('grupo');
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.34);
            ctx.fillText(resp, canvas.width * 0.50, canvas.height * 0.41);
            ctx.fillText(grupo, canvas.width * 0.50, canvas.height * 0.475);
            ctx.fillText(cidade, canvas.width * 0.32, canvas.height * 0.55);
            ctx.fillText(dia, canvas.width * 0.49, canvas.height * 0.55);
            ctx.fillText(mes, canvas.width * 0.59, canvas.height * 0.55);
            ctx.fillText(ano, canvas.width * 0.72, canvas.height * 0.55);
        }

        // 3. ESPECIALIDADE (LOBINHO / ESCOTEIRO)
        else if (modelo === 'especialidade_le') {
            const esp = getVal('especialidade');
            const nivel = getVal('nivel');
            const itens = getVal('itens');
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.62, canvas.height * 0.36);
            ctx.fillText(esp, canvas.width * 0.74, canvas.height * 0.442);
            ctx.fillText(nivel, canvas.width * 0.592, canvas.height * 0.505);
            
            ctx.font = fontePequena;
            ctx.fillText(itens, canvas.width * 0.62, canvas.height * 0.585);
            
            ctx.font = fontePrincipal;
            ctx.fillText(cidade, canvas.width * 0.48, canvas.height * 0.685);
            ctx.fillText(dia, canvas.width * 0.57, canvas.height * 0.685);
            ctx.fillText(mes, canvas.width * 0.67, canvas.height * 0.685);
            ctx.fillText(ano, canvas.width * 0.78, canvas.height * 0.685);
        }

        // 4. ESPECIALIDADE (SÊNIOR / PIONEIRO)
        else if (modelo === 'especialidade_sp') {
            const esp = getVal('especialidade');
            const eixo = getVal('eixo');
            const carga = getVal('carga');
            const conhecer = getVal('conhecer');
            const fazer = getVal('fazer');
            const compartilhar = getVal('compartilhar');

            ctx.textAlign = 'center'; 
            
            ctx.fillText(nome, canvas.width * 0.355, canvas.height * 0.188);
            ctx.fillText(esp, canvas.width * 0.465, canvas.height * 0.231);
            
            ctx.fillText(cidade, canvas.width * 0.19, canvas.height * 0.292);
            ctx.fillText(dia, canvas.width * 0.28, canvas.height * 0.292);
            ctx.fillText(mes, canvas.width * 0.40, canvas.height * 0.292);
            ctx.fillText(ano, canvas.width * 0.50, canvas.height * 0.292);

            ctx.textAlign = 'left'; 
            ctx.font = '14pt Arial, sans-serif'; 

            ctx.fillText(esp, canvas.width * 0.295, canvas.height * 0.645);
            ctx.fillText(eixo, canvas.width * 0.535, canvas.height * 0.667);
            ctx.fillText(carga, canvas.width * 0.315, canvas.height * 0.684);
            
            const lineHeight = 30; 
            const xInicioGeral = canvas.width * 0.07; 
            const limiteDireito = 0.91; 
            const maxWidthGeral = canvas.width * (limiteDireito - 0.07);

            wrapText(ctx, conhecer, canvas.width * 0.485, canvas.height * 0.745, canvas.width * (limiteDireito - 0.485), xInicioGeral, maxWidthGeral, lineHeight);
            wrapText(ctx, fazer, canvas.width * 0.585, canvas.height * 0.798, canvas.width * (limiteDireito - 0.585), xInicioGeral, maxWidthGeral, lineHeight);
            wrapText(ctx, compartilhar, canvas.width * 0.615, canvas.height * 0.852, canvas.width * (limiteDireito - 0.615), xInicioGeral, maxWidthGeral, lineHeight);
        }

        // 5. OUTROS MODELOS
        else {
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.48);
            ctx.fillText(cidade, canvas.width * 0.35, canvas.height * 0.72);
            ctx.fillText(dia, canvas.width * 0.48, canvas.height * 0.72);
            ctx.fillText(mes, canvas.width * 0.60, canvas.height * 0.72);
            ctx.fillText(ano, canvas.width * 0.72, canvas.height * 0.72);
        }

        // Desenho da Logo UEL se estiver carregada
        if (logoGroup) {
            const logoLargura = canvas.width * 0.10; 
            const proporcao = logoGroup.height / logoGroup.width;
            const logoAltura = logoLargura * proporcao;

            let xPos, yPos;

            if (modelo === 'especialidade_sp') {
                xPos = canvas.width * 0.84;
                yPos = canvas.height * 0.84;
            } 
            else if (modelo === 'progressao_l' || modelo === 'progressao_s' || modelo === 'progressao_p') {
                xPos = canvas.width * 0.08;
                yPos = canvas.height * 0.06;
            } 
            else {
                xPos = canvas.width * 0.05;
                yPos = canvas.height * 0.05;
            }

            ctx.drawImage(logoGroup, xPos, yPos, logoLargura, logoAltura);
        }
    };
    
    img.onerror = function() {
        tentativa++;
        if (tentativa === 1) {
            img.src = `./modelo_${modelo}.png`;
        } else {
            console.error(`Erro ao carregar imagem: ${modelo}`);
            canvas.width = 800;
            canvas.height = 450;
            ctx.fillStyle = '#1e1e1e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ff4d4d';
            ctx.font = 'bold 16pt Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(`Imagem não encontrada: ${modelo}.png ou modelo_${modelo}.png`, canvas.width / 2, canvas.height / 2 - 10);
        }
    };

    img.src = `./${modelo}.png`;
}

function baixarPDF() {
    if (!window.jspdf) {
        alert("A biblioteca de PDF ainda está carregando.");
        return;
    }
    const { jsPDF } = window.jspdf;
    
    const modeloSelect = document.getElementById('modelo');
    if (!modeloSelect) return;
    const modelo = modeloSelect.value;

    const orientacao = (modelo === 'especialidade_sp' || modelo.startsWith('cert_primo') || modelo.startsWith('cert_segundo') || modelo.startsWith('cert_monitor_') || modelo.startsWith('cert_sub_') || modelo.startsWith('cert_promessa') || modelo.startsWith('cert_recrutador') || modelo.startsWith('ins_semeador') || ['ins_conesul', 'ins_lusofonia', 'ins_acao_comunitaria', 'ins_aeronauta', 'ins_aviador', 'ins_boa_acao', 'ins_desafio_comunitario', 'ins_grumete', 'ins_naval'].includes(modelo)) ? 'portrait' : 'landscape';
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
        orientation: orientacao,
        unit: 'px',
        format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    
    const nome = getVal('nome') || "Certificado";
    pdf.save(`Certificado_${nome}.pdf`);
}

// ==========================================
// SISTEMA DE BOTÕES DE CATEGORIA E MODELO
// ==========================================

const listaModelos = [
    // Progressão & Acolhida
    { id: 'progressao_l', nome: 'Progressão Lobinho', cat: 'progressao' },
    { id: 'progressao_e', nome: 'Progressão Escoteiro', cat: 'progressao' },
    { id: 'progressao_s', nome: 'Progressão Sênior', cat: 'progressao' },
    { id: 'progressao_p', nome: 'Progressão Pioneiro', cat: 'progressao' },
    { id: 'progressao_f', nome: 'Progressão Formação', cat: 'progressao' },
    { id: 'cert_acolhida', nome: 'Acolhida', cat: 'progressao' },
    { id: 'estrelas_atv', nome: 'Estrelas de Atividade', cat: 'progressao' },

    // Liderança
    { id: 'cert_primo', nome: 'Primo', cat: 'lideranca' },
    { id: 'cert_segundo', nome: 'Segundo de Matilha', cat: 'lideranca' },
    { id: 'cert_monitor_e', nome: 'Monitor (Escoteiro)', cat: 'lideranca' },
    { id: 'cert_sub_e', nome: 'Submonitor (Escoteiro)', cat: 'lideranca' },
    { id: 'cert_monitor_s', nome: 'Monitor (Sênior)', cat: 'lideranca' },
    { id: 'cert_sub_s_2', nome: 'Submonitor (Sênior)', cat: 'lideranca' },

    // Promessa & Expansão
    { id: 'cert_promessa', nome: 'Promessa Escoteira', cat: 'promessa' },
    { id: 'cert_promessa_l', nome: 'Promessa Lobinho', cat: 'promessa' },
    { id: 'cert_recrutador', nome: 'Insígnia Recrutador', cat: 'promessa' },
    { id: 'ins_semeador', nome: 'Insígnia Semeador', cat: 'promessa' },

    // Especialidades
    { id: 'especialidade_le', nome: 'Especialidade (Lob/Esc)', cat: 'especialidades' },
    { id: 'especialidade_sp', nome: 'Especialidade (Sên/Pio)', cat: 'especialidades' },

    // Insígnias & Ramos
    { id: 'ins_acao_comunitaria', nome: 'Ação Comunitária', cat: 'insignias' },
    { id: 'ins_aeronauta', nome: 'Aeronauta', cat: 'insignias' },
    { id: 'ins_aviador', nome: 'Aviador', cat: 'insignias' },
    { id: 'ins_boa_acao', nome: 'Boa Ação', cat: 'insignias' },
    { id: 'ins_campeoes_natureza', nome: 'Campeões da Natureza', cat: 'insignias' },
    { id: 'ins_conesul', nome: 'Cone Sul', cat: 'insignias' },
    { id: 'ins_desafio_comunitario', nome: 'Desafio Comunitário', cat: 'insignias' },
    { id: 'ins_energia_solar', nome: 'Energia Solar', cat: 'insignias' },
    { id: 'ins_grumete', nome: 'Grumete', cat: 'insignias' },
    { id: 'ins_lusofonia', nome: 'Lusofonia', cat: 'insignias' },
    { id: 'ins_naval', nome: 'Naval', cat: 'insignias' },
    { id: 'ins_rrr', nome: 'Reduzir, Reutilizar, Reciclar', cat: 'insignias' }
];

let categoriaAtual = 'todas';
let modeloSelecionado = listaModelos[0].id;

function inicializarMenuModelos() {
    const select = document.getElementById('modelo');
    if (!select) return;

    select.innerHTML = '';
    listaModelos.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.nome;
        select.appendChild(opt);
    });

    select.value = modeloSelecionado;
    renderizarBotoesCertificados();
}

function filtrarCategoria(categoria) {
    categoriaAtual = categoria;

    document.querySelectorAll('.btn-cat').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (window.event && window.event.target) {
        window.event.target.classList.add('active');
    }

    renderizarBotoesCertificados();
}

function renderizarBotoesCertificados() {
    const container = document.getElementById('container-certificados');
    if (!container) return;

    container.innerHTML = '';

    const modelosFiltrados = categoriaAtual === 'todas' 
        ? listaModelos 
        : listaModelos.filter(m => m.cat === categoriaAtual);

    modelosFiltrados.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `btn-modelo ${item.id === modeloSelecionado ? 'selected' : ''}`;
        btn.textContent = item.nome;
        btn.onclick = () => selecionarModelo(item.id);
        container.appendChild(btn);
    });
}

function selecionarModelo(idModelo) {
    modeloSelecionado = idModelo;

    const select = document.getElementById('modelo');
    if (select) {
        select.value = idModelo;
    }

    renderizarBotoesCertificados();
    atualizarFormulario(); // Atualiza o formulário e gera a pré-visualização em tempo real
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarMenuModelos();
    atualizarFormulario();
});
