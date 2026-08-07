// ==========================================
// LÓGICA DE FILTROS DOS BOTÕES
// ==========================================
const listaCertificados = [
    { id: 'cert_acolhida', nome: 'Acolhida', cat: 'progressao' },
    { id: 'progressao_l', nome: 'Progressão Lobinho', cat: 'progressao' },
    { id: 'progressao_e', nome: 'Progressão Escoteiro', cat: 'progressao' },
    { id: 'progressao_s', nome: 'Progressão Sênior', cat: 'progressao' },
    { id: 'progressao_p', nome: 'Progressão Pioneiro', cat: 'progressao' },
    { id: 'progressao_f', nome: 'Progressão Flor de Lis', cat: 'progressao' },
    { id: 'especialidade_le', nome: 'Especialidade (Lobinho / Escoteiro)', cat: 'especialidade' },
    { id: 'especialidade_sp', nome: 'Especialidade (Sênior / Pioneiro)', cat: 'especialidade' },
    { id: 'promessa_lobinho', nome: 'Promessa (Lobinho)', cat: 'promessa' },
    { id: 'promessa_escoteiro', nome: 'Promessa (Escoteiro)', cat: 'promessa' },
    
    // INSÍGNIAS DE MODALIDADE
    { id: 'ins_aviador', nome: 'Insígnia do Aviador', cat: 'insignia_modalidade' },
    { id: 'ins_aeronauta', nome: 'Insígnia do Aeronauta', cat: 'insignia_modalidade' },
    { id: 'ins_grumete', nome: 'Insígnia do Grumete', cat: 'insignia_modalidade' },
    { id: 'ins_naval', nome: 'Insígnia Naval', cat: 'insignia_modalidade' },

    // INSÍGNIAS DE INTERESSE ESPECIAL
    { id: 'ins_acao_comunitaria', nome: 'Ação Comunitária', cat: 'insignia_especial' },
    { id: 'ins_boa_acao', nome: 'Boa Ação', cat: 'insignia_especial' },
    { id: 'ins_desafio_comunitario', nome: 'Desafio Comunitário', cat: 'insignia_especial' },
    { id: 'insignia_conesul', nome: 'Insígnia Cone Sul', cat: 'insignia_especial' },
    { id: 'ins_lusofonia', nome: 'Insígnia da Lusofonia', cat: 'insignia_especial' },
    { id: 'ins_rrr', nome: 'Insígnia Reduzir, Reciclar, Reutilizar', cat: 'insignia_especial' },
    { id: 'ins_energia_solar', nome: 'Escoteiros pela Energia Solar', cat: 'insignia_especial' },
    { id: 'ins_campeoes_natureza', nome: 'Campeões da Natureza', cat: 'insignia_especial' },

    { id: 'cert_moni_s', nome: 'Monitor (Sênior)', cat: 'lideranca' },
    { id: 'cert_sub_s', nome: 'Sub-monitor (Sênior)', cat: 'lideranca' },
    { id: 'cert_moni_e', nome: 'Monitor (Escoteiro)', cat: 'lideranca' },
    { id: 'cert_sub_e', nome: 'Sub-monitor (Escoteiro)', cat: 'lideranca' },
    { id: 'cert_primo', nome: 'Primo', cat: 'lideranca' },
    { id: 'cert_segundo', nome: 'Segundo', cat: 'lideranca' },
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
    
    const grupoProg = document.getElementById('grupo-progressao');
    const grupoEsp = document.getElementById('grupo-especialidade');
    const campoNivel = document.getElementById('campo-nivel');
    const campoSpExtra = document.getElementById('campo-sp-extra');
    const grupoOutros = document.getElementById('grupo-outros');
    const campoPatrulha = document.getElementById('campo-patrulha');
    const campoInsignia = document.getElementById('campo-insignia');

    // Esconde todos
    if (grupoProg) grupoProg.style.display = 'none';
    if (grupoEsp) grupoEsp.style.display = 'none';
    if (campoNivel) campoNivel.style.display = 'none';
    if (campoSpExtra) campoSpExtra.style.display = 'none';
    if (grupoOutros) grupoOutros.style.display = 'none';
    if (campoPatrulha) campoPatrulha.style.display = 'none';
    if (campoInsignia) campoInsignia.style.display = 'none';

    // Mostra condicionalmente por Categoria/Modelo
    if (cat === 'progressao') {
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
    else if (cat === 'promessa' || cat === 'lideranca') {
        if (grupoOutros) grupoOutros.style.display = 'block';
        if (campoPatrulha) campoPatrulha.style.display = 'block';
    }
    else if (cat.startsWith('insignia') || cat === 'atividade' || cat === 'expansao') {
        if (grupoOutros) grupoOutros.style.display = 'block';
        if (campoInsignia) campoInsignia.style.display = 'block';
    }
    
    gerarCertificado();
}

function obterImagemFallback(modelo) {
    const itemObj = obterItemCertificado(modelo);
    const cat = itemObj ? itemObj.cat : '';

    if (cat === 'progressao') return './modelo_progressao_e.png';
    if (cat === 'especialidade') return './modelo_especialidade_le.png';
    if (cat === 'promessa') return './modelo_promessa_escoteiro.png';
    if (cat === 'lideranca') return './modelo_lideranca_monitor.png';
    if (cat === 'atividade') return './modelo_atividade_estrela.png';
    if (cat === 'expansao') return './modelo_expansao_recrutador.png';
    if (cat.startsWith('insignia')) return './modelo_insignia_modalidade.png';
    return './modelo_insignia_modalidade.png';
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
    ctx.fillText(`Crie o arquivo "modelo_${modelo}.png" ou "${modelo}.png" na pasta.`, canvas.width / 2, canvas.height / 2 + 25);
}

function gerarCertificado() {
    if (!canvas || !ctx) return;
    const modelo = document.getElementById('modelo').value;
    const itemObj = obterItemCertificado(modelo);
    const cat = itemObj ? itemObj.cat : '';

    const nome = document.getElementById('nome')?.value || "";
    const cidade = document.getElementById('cidade')?.value || "";
    const dia = document.getElementById('dia')?.value || "";
    const mes = document.getElementById('mes')?.value || "";
    const ano = document.getElementById('ano')?.value || "";

    const img = new Image();
    let etapaTentativa = 0;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#111111';
        
        const fontePrincipal = '20pt Arial, sans-serif';
        const fontePequena = '16pt Arial, sans-serif';
        
        ctx.font = fontePrincipal;

        // 1. PROGRESSÃO - LOBINHO
        if (modelo === 'progressao_l') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.48, canvas.height * 0.315); 
            ctx.fillText(etapa, canvas.width * 0.53, canvas.height * 0.375); 
            ctx.fillText(cidade, canvas.width * 0.32, canvas.height * 0.525);
            ctx.fillText(dia, canvas.width * 0.45, canvas.height * 0.525);
            ctx.fillText(mes, canvas.width * 0.57, canvas.height * 0.525);
            ctx.fillText(ano, canvas.width * 0.69, canvas.height * 0.525);
        }
        
        // 2. PROGRESSÃO - ESCOTEIRO
        else if (modelo === 'progressao_e') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.49, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.55, canvas.height * 0.405); 
            ctx.fillText(cidade, canvas.width * 0.34, canvas.height * 0.56);
            ctx.fillText(dia, canvas.width * 0.47, canvas.height * 0.56);
            ctx.fillText(mes, canvas.width * 0.59, canvas.height * 0.56);
            ctx.fillText(ano, canvas.width * 0.71, canvas.height * 0.56);
        }

        // 3. PROGRESSÃO - SÊNIOR
        else if (modelo === 'progressao_s') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.59, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.65, canvas.height * 0.385); 
            ctx.fillText(cidade, canvas.width * 0.45, canvas.height * 0.545);
            ctx.fillText(dia, canvas.width * 0.58, canvas.height * 0.545);
            ctx.fillText(mes, canvas.width * 0.70, canvas.height * 0.545);
            ctx.fillText(ano, canvas.width * 0.82, canvas.height * 0.545);
        }

        // 4. PROGRESSÃO - PIONEIRO / FLOR DE LIS / ACOLHIDA
        else if (modelo === 'progressao_p' || modelo === 'progressao_f' || modelo === 'cert_acolhida') {
            const etapa = document.getElementById('etapa')?.value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.36); 
            ctx.fillText(etapa, canvas.width * 0.56, canvas.height * 0.42); 
            ctx.fillText(cidade, canvas.width * 0.46, canvas.height * 0.55);
            ctx.fillText(dia, canvas.width * 0.59, canvas.height * 0.55);
            ctx.fillText(mes, canvas.width * 0.72, canvas.height * 0.55);
            ctx.fillText(ano, canvas.width * 0.83, canvas.height * 0.55);
        }

        // 5. ESPECIALIDADE (LOBINHO / ESCOTEIRO)
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade')?.value || "";
            const nivel = document.getElementById('nivel')?.value || "";
            const itens = document.getElementById('itens')?.value || "";
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

        // 6. ESPECIALIDADE (SÊNIOR / PIONEIRO)
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade')?.value || "";
            const eixo = document.getElementById('eixo')?.value || "";
            const carga = document.getElementById('carga')?.value || "";
            const conhecer = document.getElementById('conhecer')?.value || "";
            const fazer = document.getElementById('fazer')?.value || "";
            const compartilhar = document.getElementById('compartilhar')?.value || "";

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

            wrapText(
                ctx, conhecer,
                canvas.width * 0.485, canvas.height * 0.745, canvas.width * (limiteDireito - 0.485),
                xInicioGeral, maxWidthGeral,
                lineHeight
            );

            wrapText(
                ctx, fazer,
                canvas.width * 0.585, canvas.height * 0.798, canvas.width * (limiteDireito - 0.585),
                xInicioGeral, maxWidthGeral,
                lineHeight
            );

            wrapText(
                ctx, compartilhar,
                canvas.width * 0.615, canvas.height * 0.852, canvas.width * (limiteDireito - 0.615),
                xInicioGeral, maxWidthGeral,
                lineHeight
            );
        }

        // 7. PROMESSAS E LIDERANÇA
        else if (cat === 'promessa' || cat === 'lideranca') {
            const patrulha = document.getElementById('patrulha')?.value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.36); 
            ctx.fillText(patrulha, canvas.width * 0.50, canvas.height * 0.42); 
            ctx.fillText(cidade, canvas.width * 0.46, canvas.height * 0.55);
            ctx.fillText(dia, canvas.width * 0.59, canvas.height * 0.55);
            ctx.fillText(mes, canvas.width * 0.72, canvas.height * 0.55);
            ctx.fillText(ano, canvas.width * 0.83, canvas.height * 0.55);
        }

        // 8. INSÍGNIAS, ATIVIDADE E EXPANSÃO
        else {
            const insigInput = document.getElementById('nome_insignia')?.value;
            const insig = (insigInput && insigInput.trim() !== "") ? insigInput : (itemObj ? itemObj.nome : "");
            
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.36); 
            ctx.fillText(insig, canvas.width * 0.50, canvas.height * 0.42); 
            ctx.fillText(cidade, canvas.width * 0.46, canvas.height * 0.55);
            ctx.fillText(dia, canvas.width * 0.59, canvas.height * 0.55);
            ctx.fillText(mes, canvas.width * 0.72, canvas.height * 0.55);
            ctx.fillText(ano, canvas.width * 0.83, canvas.height * 0.55);
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
                xPos = canvas.width * 0.84;
                yPos = canvas.height * 0.84;
            } 
            else if (cat === 'progressao') {
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
        if (etapaTentativa === 0) {
            etapaTentativa = 1;
            img.src = `./${modelo}.png`;
        } else if (etapaTentativa === 1) {
            etapaTentativa = 2;
            const fallbackSrc = obterImagemFallback(modelo);
            if (fallbackSrc !== `./${modelo}.png` && fallbackSrc !== `./modelo_${modelo}.png`) {
                img.src = fallbackSrc;
            } else {
                exibirErroCanvas(modelo);
            }
        } else {
            exibirErroCanvas(modelo);
        }
    };

    img.src = `./modelo_${modelo}.png`;
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
