// ==========================================
// LÓGICA DE FILTROS DOS BOTÕES
// ==========================================
const listaCertificados = [
    // PROGRESSÃO
    { id: 'cert_acolhida', nome: 'Acolhida', cat: 'progressao' },
    { id: 'progressao_l', nome: 'Progressão Lobinho', cat: 'progressao' },
    { id: 'progressao_e', nome: 'Progressão Escoteiro', cat: 'progressao' },
    { id: 'progressao_s', nome: 'Progressão Sênior', cat: 'progressao' },
    { id: 'progressao_p', nome: 'Progressão Pioneiro', cat: 'progressao' },
    { id: 'progressao_f', nome: 'Progressão Filhotes', cat: 'progressao' },

    // ESPECIALIDADES
    { id: 'especialidade_le', nome: 'Especialidade (Lobinho / Escoteiro)', cat: 'especialidade' },
    { id: 'especialidade_sp', nome: 'Especialidade (Sênior / Pioneiro)', cat: 'especialidade' },

    // PROMESSAS
    { id: 'cert_promessa_l', nome: 'Promessa (Lobinho)', cat: 'promessa' },
    { id: 'cert_promessa', nome: 'Promessa (Escoteiro)', cat: 'promessa' },
    
    // INSÍGNIAS DE MODALIDADE
    { id: 'ins_aviador', nome: 'Insígnia do Aviador', cat: 'insignia_modalidade' },
    { id: 'ins_aeronauta', nome: 'Insígnia do Aeronauta', cat: 'insignia_modalidade' },
    { id: 'ins_grumete', nome: 'Insígnia do Grumete', cat: 'insignia_modalidade' },
    { id: 'ins_naval', nome: 'Insígnia Naval', cat: 'insignia_modalidade' },

    // INSÍGNIAS DE INTERESSE ESPECIAL E COMUNITÁRIAS
    { id: 'ins_acao_comunitaria', nome: 'Ação Comunitária', cat: 'insignia_comunitaria' },
    { id: 'ins_boa_acao', nome: 'Boa Ação', cat: 'insignia_comunitaria' },
    { id: 'ins_desafio_comunitario', nome: 'Desafio Comunitário', cat: 'insignia_comunitaria' },
    { id: 'ins_conesul', nome: 'Insígnia Cone Sul', cat: 'insignia_especial' },
    { id: 'ins_lusofonia', nome: 'Insígnia da Lusofonia', cat: 'insignia_especial' },
    { id: 'ins_rrr', nome: 'Insígnia Reduzir, Reciclar, Reutilizar', cat: 'insignia_especial' },
    { id: 'ins_energia_solar', nome: 'Escoteiros pela Energia Solar', cat: 'insignia_especial' },
    { id: 'ins_campeoes_natureza', nome: 'Campeões da Natureza', cat: 'insignia_especial' },

    // LIDERANÇA
    { id: 'cert_moni_s', nome: 'Monitor (Sênior)', cat: 'lideranca' },
    { id: 'cert_sub_s', nome: 'Sub-monitor (Sênior)', cat: 'lideranca' },
    { id: 'cert_moni_e', nome: 'Monitor (Escoteiro)', cat: 'lideranca' },
    { id: 'cert_sub_e', nome: 'Sub-monitor (Escoteiro)', cat: 'lideranca' },
    { id: 'cert_primo', nome: 'Primo', cat: 'lideranca' },
    { id: 'cert_segundo', nome: 'Segundo', cat: 'lideranca' },

    // OUTROS
    { id: 'estrelas_atv', nome: 'Estrela de Atividade', cat: 'atividade' },
    { id: 'cert_recrutador', nome: 'Recrutador', cat: 'expansao' },
    { id: 'ins_semeador', nome: 'Semeador', cat: 'expansao' }
];

function obterItemCertificado(idModelo) {
    return listaCertificados.find(item => item.id === idModelo);
}

function filtrarCategoria(categoria) {
    const botoes = document.querySelectorAll('.btn-cat');
    botoes.forEach(btn => btn.classList.remove('active'));
    const btnClicado = Array.from(botoes).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${categoria}'`));
    if (btnClicado) btnClicado.classList.add('active');

    const container = document.getElementById('container-certificados');
    container.innerHTML = '';

    const filtrados = categoria === 'todas' 
        ? listaCertificados 
        : listaCertificados.filter(item => item.cat === categoria);

    filtrados.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-modelo';
        btn.textContent = item.nome;
        btn.onclick = () => selecionarModelo(item.id, btn);
        container.appendChild(btn);

        if (index === 0) btn.click();
    });
}

function selecionarModelo(idModelo, btnElemento) {
    document.querySelectorAll('.btn-modelo').forEach(b => b.classList.remove('selected'));
    if (btnElemento) btnElemento.classList.add('selected');

    const select = document.getElementById('modelo');
    if (select) select.value = idModelo;
    atualizarFormulario();
}

let logoGroup = null; 

function carregarLogo(event) {
    const file = event.target.files[0];
    const statusTxt = document.getElementById('statusLogo');

    if (file) {
        if (statusTxt) statusTxt.innerText = `Logo selecionada: ${file.name}`;
        const reader = new FileReader();
        reader.onload = function(e) {
            logoGroup = new Image();
            logoGroup.onload = function() { gerarCertificado(); };
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
const ctx = canvas ? canvas.getContext('2d') : null;

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

function atualizarFormulario() {
    const modelo = document.getElementById('modelo').value;
    const itemObj = obterItemCertificado(modelo);
    const cat = itemObj ? itemObj.cat : '';
    
    // Pegando as referências dos grupos do formulário no HTML
    const grupoProg = document.getElementById('grupo-progressao');
    const grupoEsp = document.getElementById('grupo-especialidade');
    const campoNivel = document.getElementById('campo-nivel');
    const campoSpExtra = document.getElementById('campo-sp-extra');
    
    // Novos campos criados
    const campoGrupo = document.getElementById('campo-grupo');
    const campoResponsaveis = document.getElementById('campo-responsaveis');
    const campoRamo = document.getElementById('campo-ramo');
    const campoPatrulha = document.getElementById('campo-patrulha');
    const campoAnos = document.getElementById('campo-anos');
    const campoQtd = document.getElementById('campo-qtd');

    // 1. Esconde tudo inicialmente (menos Nome, Data e Local que são padrão)
    if (grupoProg) grupoProg.style.display = 'none';
    if (grupoEsp) grupoEsp.style.display = 'none';
    if (campoNivel) campoNivel.style.display = 'none';
    if (campoSpExtra) campoSpExtra.style.display = 'none';
    if (campoGrupo) campoGrupo.style.display = 'none';
    if (campoResponsaveis) campoResponsaveis.style.display = 'none';
    if (campoRamo) campoRamo.style.display = 'none';
    if (campoPatrulha) campoPatrulha.style.display = 'none';
    if (campoAnos) campoAnos.style.display = 'none';
    if (campoQtd) campoQtd.style.display = 'none';

    // 2. Mostra os campos corretos baseado na regra de cada certificado
    if (modelo === 'cert_acolhida') {
        if (campoResponsaveis) campoResponsaveis.style.display = 'block';
        if (campoGrupo) campoGrupo.style.display = 'block';
    } 
    else if (cat === 'progressao') {
        if (grupoProg) grupoProg.style.display = 'block'; 
    } 
    else if (modelo === 'especialidade_le') {
        if (grupoEsp) grupoEsp.style.display = 'block';
        if (campoNivel) campoNivel.style.display = 'block';
    } 
    else if (modelo === 'especialidade_sp') {
        if (grupoEsp) grupoEsp.style.display = 'block';
        if (campoSpExtra) campoSpExtra.style.display = 'block';
    }
    else if (cat === 'promessa') {
        if (campoGrupo) campoGrupo.style.display = 'block';
    }
    else if (cat === 'insignia_especial') {
        if (campoRamo) campoRamo.style.display = 'block';
    }
    else if (cat === 'lideranca') {
        if (campoPatrulha) campoPatrulha.style.display = 'block';
    }
    else if (cat === 'atividade') {
        if (campoAnos) campoAnos.style.display = 'block';
    }
    else if (cat === 'expansao') {
        if (campoQtd) campoQtd.style.display = 'block';
    }
    
    gerarCertificado();
}

function obterCaminhoImagem(modelo) {
    const modelosComPrefixo = [
        'progressao_l', 'progressao_e', 'progressao_s', 'progressao_p', 'progressao_f',
        'especialidade_le', 'especialidade_sp'
    ];
    
    if (modelosComPrefixo.includes(modelo)) {
        return `./modelo_${modelo}.png`;
    }
    return `./${modelo}.png`;
}

function exibirErroCanvas(modelo) {
    if (!canvas || !ctx) return;
    canvas.width = 800;
    canvas.height = 600;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff4d4d';
    ctx.font = 'bold 18pt Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Imagem para "${modelo}" não encontrada`, canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillStyle = '#bbb';
    ctx.font = '14pt Arial, sans-serif';
    ctx.fillText(`Verifique os arquivos .png ou .jpg na pasta.`, canvas.width / 2, canvas.height / 2 + 25);
}

function gerarCertificado() {
    if (!canvas || !ctx) return;
    const modelo = document.getElementById('modelo').value;
    const itemObj = obterItemCertificado(modelo);
    const cat = itemObj ? itemObj.cat : '';

    // Valores genéricos (sempre presentes)
    const nome = document.getElementById('nome')?.value || "";
    const cidade = document.getElementById('cidade')?.value || "";
    const dia = document.getElementById('dia')?.value || "";
    const mes = document.getElementById('mes')?.value || "";
    const ano = document.getElementById('ano')?.value || "";

    // Outros valores
    const responsaveis = document.getElementById('responsaveis')?.value || "";
    const grupo = document.getElementById('grupo')?.value || "";
    const ramo = document.getElementById('ramo')?.value || "";
    const patrulha = document.getElementById('patrulha')?.value || "";
    const anosAtividade = document.getElementById('anos')?.value || "";
    const qtdJovens = document.getElementById('qtd_jovens')?.value || "";

    const img = new Image();
    let etapaTentativa = 0;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#111111';
        
        // Fonte dinâmica calculada proporcionalmente à altura da imagem (~3.2% da altura)
const tamanhoFonte = Math.round(canvas.height * 0.032); 
const fontePrincipal = `${tamanhoFonte}px Arial, sans-serif`;
const fontePequena = `${Math.round(tamanhoFonte * 0.8)}px Arial, sans-serif`;

ctx.font = fontePrincipal;
ctx.textAlign = 'left';
        // ACOLHIDA
        if (modelo === 'cert_acolhida') {
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.31); 
            ctx.fillText(responsaveis, canvas.width * 0.52, canvas.height * 0.34); 
            ctx.fillText(grupo, canvas.width * 0.42, canvas.height * 0.5); 
            ctx.fillText(cidade, canvas.width * 0.28, canvas.height * 0.6);
            ctx.fillText(dia, canvas.width * 0.44, canvas.height * 0.6);
            ctx.fillText(mes, canvas.width * 0.55, canvas.height * 0.6);
            ctx.fillText(ano, canvas.width * 0.68, canvas.height * 0.6);
        }

        // PROMESSAS
        else if (cat === 'promessa') {
            ctx.fillText(nome, canvas.width * 0.4, canvas.height * 0.44); 
            ctx.fillText(grupo, canvas.width * 0.35, canvas.height * 0.51); 
            
            ctx.fillText(cidade, canvas.width * 0.14, canvas.height * 0.71);
            ctx.fillText(dia, canvas.width * 0.27, canvas.height * 0.71);
            ctx.fillText(mes, canvas.width * 0.42, canvas.height * 0.71);
            ctx.fillText(ano, canvas.width * 0.58, canvas.height * 0.71);
        }

        // PROGRESSÃO 
        else if (modelo === 'progressao_l') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.fillText(nome, canvas.width * 0.33, canvas.height * 0.315); 
            ctx.fillText(etapa, canvas.width * 0.38, canvas.height * 0.375); 
            ctx.fillText(cidade, canvas.width * 0.17, canvas.height * 0.525);
            ctx.fillText(dia, canvas.width * 0.30, canvas.height * 0.525);
            ctx.fillText(mes, canvas.width * 0.42, canvas.height * 0.525);
            ctx.fillText(ano, canvas.width * 0.54, canvas.height * 0.525);
        }
        else if (modelo === 'progressao_e') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.fillText(nome, canvas.width * 0.34, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.40, canvas.height * 0.405); 
            ctx.fillText(cidade, canvas.width * 0.19, canvas.height * 0.56);
            ctx.fillText(dia, canvas.width * 0.32, canvas.height * 0.56);
            ctx.fillText(mes, canvas.width * 0.44, canvas.height * 0.56);
            ctx.fillText(ano, canvas.width * 0.56, canvas.height * 0.56);
        }
        else if (modelo === 'progressao_s') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.fillText(nome, canvas.width * 0.44, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.50, canvas.height * 0.385); 
            ctx.fillText(cidade, canvas.width * 0.30, canvas.height * 0.545);
            ctx.fillText(dia, canvas.width * 0.43, canvas.height * 0.545);
            ctx.fillText(mes, canvas.width * 0.55, canvas.height * 0.545);
            ctx.fillText(ano, canvas.width * 0.67, canvas.height * 0.545);
        }
        else if (modelo === 'progressao_p') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.fillText(nome, canvas.width * 0.35, canvas.height * 0.36); 
            ctx.fillText(etapa, canvas.width * 0.41, canvas.height * 0.42); 
            ctx.fillText(cidade, canvas.width * 0.31, canvas.height * 0.55);
            ctx.fillText(dia, canvas.width * 0.44, canvas.height * 0.55);
            ctx.fillText(mes, canvas.width * 0.57, canvas.height * 0.55);
            ctx.fillText(ano, canvas.width * 0.68, canvas.height * 0.55);
        }
        else if (modelo === 'progressao_f') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.fillText(nome, canvas.width * 0.4, canvas.height * 0.44); 
            ctx.fillText(etapa, canvas.width * 0.45, canvas.height * 0.49); 
            ctx.fillText(cidade, canvas.width * 0.3, canvas.height * 0.67);
            ctx.fillText(dia, canvas.width * 0.43, canvas.height * 0.67);
            ctx.fillText(mes, canvas.width * 0.53, canvas.height * 0.67);
            ctx.fillText(ano, canvas.width * 0.63, canvas.height * 0.67);
        }

        // ESPECIALIDADES
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade')?.value || "";
            const nivel = document.getElementById('nivel')?.value || "";
            const itens = document.getElementById('itens')?.value || "";
            ctx.fillText(nome, canvas.width * 0.47, canvas.height * 0.36);
            ctx.fillText(esp, canvas.width * 0.59, canvas.height * 0.442);
            ctx.fillText(nivel, canvas.width * 0.57, canvas.height * 0.505);
            ctx.font = fontePequena;
            ctx.fillText(itens, canvas.width * 0.47, canvas.height * 0.585);
            ctx.font = fontePrincipal;
            ctx.fillText(cidade, canvas.width * 0.43, canvas.height * 0.685);
            ctx.fillText(dia, canvas.width * 0.54, canvas.height * 0.685);
            ctx.fillText(mes, canvas.width * 0.64, canvas.height * 0.685);
            ctx.fillText(ano, canvas.width * 0.71, canvas.height * 0.685);
        }
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade')?.value || "";
            const eixo = document.getElementById('eixo')?.value || "";
            const carga = document.getElementById('carga')?.value || "";
            const conhecer = document.getElementById('conhecer')?.value || "";
            const fazer = document.getElementById('fazer')?.value || "";
            const compartilhar = document.getElementById('compartilhar')?.value || "";

            ctx.fillText(nome, canvas.width * 0.205, canvas.height * 0.188);
            ctx.fillText(esp, canvas.width * 0.315, canvas.height * 0.231);
            ctx.fillText(cidade, canvas.width * 0.15, canvas.height * 0.292);
            ctx.fillText(dia, canvas.width * 0.27, canvas.height * 0.292);
            ctx.fillText(mes, canvas.width * 0.35, canvas.height * 0.292);
            ctx.fillText(ano, canvas.width * 0.45, canvas.height * 0.292);

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

        // LIDERANÇA / MONITORIA
        else if (cat === 'lideranca') {
            ctx.fillText(nome, canvas.width * 0.37, canvas.height * 0.56); 
            ctx.fillText(patrulha, canvas.width * 0.42, canvas.height * 0.67); 
            ctx.fillText(cidade, canvas.width * 0.275, canvas.height * 0.75);
            ctx.fillText(dia, canvas.width * 0.425, canvas.height * 0.75);
            ctx.fillText(mes, canvas.width * 0.57, canvas.height * 0.75);
            ctx.fillText(ano, canvas.width * 0.7, canvas.height * 0.75);
        }

        // INSÍGNIAS ESPECIAIS (Com campo RAMO)
        else if (cat === 'insignia_especial') {
            ctx.fillText(nome, canvas.width * 0.35, canvas.height * 0.40); 
            ctx.fillText(ramo, canvas.width * 0.35, canvas.height * 0.47); 
            
            ctx.fillText(cidade, canvas.width * 0.14, canvas.height * 0.735);
            ctx.fillText(dia, canvas.width * 0.27, canvas.height * 0.735);
            ctx.fillText(mes, canvas.width * 0.41, canvas.height * 0.735);
            ctx.fillText(ano, canvas.width * 0.58, canvas.height * 0.735);
        }

        // ESTRELA DE ATIVIDADE
        else if (cat === 'atividade') {
            ctx.fillText(nome, canvas.width * 0.37, canvas.height * 0.53); 
            ctx.fillText(anosAtividade, canvas.width * 0.33, canvas.height * 0.58); 
            
            ctx.fillText(cidade, canvas.width * 0.28, canvas.height * 0.715);
            ctx.fillText(dia, canvas.width * 0.42, canvas.height * 0.715);
            ctx.fillText(mes, canvas.width * 0.445, canvas.height * 0.715);
            ctx.fillText(ano, canvas.width * 0.6, canvas.height * 0.715);
        }

        // EXPANSÃO (Recrutador e Semeador)
        else if (cat === 'expansao') {
            ctx.fillText(nome, canvas.width * 0.37, canvas.height * 0.48); 
            ctx.fillText(qtdJovens, canvas.width * 0.34, canvas.height * 0.59); 
            
            ctx.fillText(cidade, canvas.width * 0.08, canvas.height * 0.73);
            ctx.fillText(dia, canvas.width * 0.24, canvas.height * 0.73);
            ctx.fillText(mes, canvas.width * 0.31, canvas.height * 0.73);
            ctx.fillText(ano, canvas.width * 0.46, canvas.height * 0.73);
        }

        // INSÍGNIAS DE MODALIDADE, COMUNITÁRIAS E GENÉRICAS (Apenas Nome, Data e Local)
        else {
            ctx.fillText(nome, canvas.width * 0.37, canvas.height * 0.49); 
            ctx.fillText(cidade, canvas.width * 0.2, canvas.height * 0.71);
            ctx.fillText(dia, canvas.width * 0.4, canvas.height * 0.71);
            ctx.fillText(mes, canvas.width * 0.5215, canvas.height * 0.71);
            ctx.fillText(ano, canvas.width * 0.62, canvas.height * 0.71);
        }

        // ==========================================
        // DESENHAR LOGO DO GRUPO (UEL)
        // ==========================================
        if (logoGroup) {
            const logoLargura = canvas.width * 0.10; 
            const proporcao = logoGroup.height / logoGroup.width;
            const logoAltura = logoLargura * proporcao;

            let xPos, yPos;

            if (modelo === 'especialidade_sp') {
                xPos = canvas.width * 0.85;
                yPos = canvas.height * 0.4125;
            } 
               else if (modelo === 'progressao_l') {
                xPos = canvas.width * 0.03;
                yPos = canvas.height * 0.03;
            } 
            else if (cat === 'progressao' || modelo === 'progressao_f') {
                xPos = canvas.width * 0.03;
                yPos = canvas.height * 0.03;
            } 
            else {
                xPos = canvas.width * 0.03;
                yPos = canvas.height * 0.03;
            }

            ctx.drawImage(logoGroup, xPos, yPos, logoLargura, logoAltura);
        }
    };
    
    img.onerror = function() {
        etapaTentativa++;
        
        const caminhoPrincipal = obterCaminhoImagem(modelo);
        const alternativo1 = caminhoPrincipal.includes('modelo_') ? `./${modelo}.png` : `./modelo_${modelo}.png`;
        const alternativo2 = caminhoPrincipal.replace('.png', '.jpg');
        const alternativo3 = alternativo1.replace('.png', '.jpg');
        
        const tentativas = [alternativo1, alternativo2, alternativo3];

        if (etapaTentativa <= tentativas.length) {
            img.src = tentativas[etapaTentativa - 1];
        } else {
            exibirErroCanvas(modelo);
        }
    };

    img.src = obterCaminhoImagem(modelo);
}

function baixarPDF() {
    if (!window.jspdf) {
        alert("A biblioteca de PDF ainda está carregando.");
        return;
    }
    const { jsPDF } = window.jspdf;
    
    const orientacao = document.getElementById('modelo').value === 'especialidade_sp' ? 'portrait' : 'landscape';
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
        orientation: orientacao,
        unit: 'px',
        format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    
    const nome = document.getElementById('nome').value || "Certificado";
    pdf.save(`Certificado_${nome}.pdf`);
}

document.addEventListener('DOMContentLoaded', () => {
    filtrarCategoria('todas');
});
