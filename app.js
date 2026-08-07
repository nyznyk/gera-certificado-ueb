let logoGroup = null; // Guarda a imagem da logo UEL em memória

// Função chamada quando o usuário escolhe a foto no campo <input type="file">
function carregarLogo(event) {
    const file = event.target.files[0];
    const statusTxt = document.getElementById('statusLogo');

    if (file) {
        if (statusTxt) statusTxt.innerText = `Logo selecionada: ${file.name}`;

        const reader = new FileReader();
        reader.onload = function(e) {
            logoGroup = new Image();
            logoGroup.onload = function() {
                gerarCertificado();
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

// Atualiza quais campos aparecem de acordo com o certificado escolhido
function atualizarFormulario() {
    const modelo = document.getElementById('modelo').value;

    const idsDinamicos = [
        'campo-responsaveis', 'campo-grupo', 'campo-matilha', 'campo-patrulha',
        'campo-forma_promessa', 'campo-quantidade', 'campo-anos', 'campo-ramo',
        'campo-etapa', 'grupo-especialidade', 'campo-nivel', 'campo-sp-extra'
    ];

    idsDinamicos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    if (modelo === 'cert_acolhida') {
        document.getElementById('campo-responsaveis').style.display = 'block';
        document.getElementById('campo-grupo').style.display = 'block';
    } else if (modelo === 'progressao_f' || modelo.startsWith('progressao_')) {
        document.getElementById('campo-etapa').style.display = 'block';
    } else if (modelo === 'estrelas_atv') {
        document.getElementById('campo-anos').style.display = 'block';
    } else if (modelo === 'cert_primo' || modelo === 'cert_segundo') {
        document.getElementById('campo-matilha').style.display = 'block';
    } else if (modelo.startsWith('cert_monitor_') || modelo.startsWith('cert_sub_')) {
        document.getElementById('campo-patrulha').style.display = 'block';
    } else if (modelo === 'cert_promessa') {
        document.getElementById('campo-forma_promessa').style.display = 'block';
        document.getElementById('campo-grupo').style.display = 'block';
    } else if (modelo === 'cert_promessa_l') {
        document.getElementById('campo-grupo').style.display = 'block';
    } else if (modelo === 'cert_recrutador' || modelo === 'ins_semeador') {
        document.getElementById('campo-quantidade').style.display = 'block';
    } else if (modelo === 'especialidade_le') {
        document.getElementById('grupo-especialidade').style.display = 'block';
        document.getElementById('campo-nivel').style.display = 'block';
    } else if (modelo === 'especialidade_sp') {
        document.getElementById('grupo-especialidade').style.display = 'block';
        document.getElementById('campo-sp-extra').style.display = 'block';
    } else if (['ins_energia_solar', 'ins_campeoes_natureza', 'ins_rrr', 'ins_conesul', 'ins_lusofonia'].includes(modelo)) {
        document.getElementById('campo-ramo').style.display = 'block';
    }

    gerarCertificado();
}

function gerarCertificado() {
    const modelo = document.getElementById('modelo').value;
    const nome = document.getElementById('nome').value || "";
    const cidade = document.getElementById('cidade').value || "";
    const dia = document.getElementById('dia').value || "";
    const mes = document.getElementById('mes').value || "";
    const ano = document.getElementById('ano').value || "";

    // Mapeamento das extensões dos modelos de imagem
    const ext = ['cert_acolhida', 'ins_conesul', 'ins_acao_comunitaria', 'ins_aeronauta', 'ins_aviador', 'ins_boa_acao', 'ins_desafio_comunitario', 'ins_grumete', 'ins_naval'].includes(modelo) ? 'png' : (modelo.startsWith('progressao_') && modelo !== 'progressao_f' ? 'png' : (modelo.startsWith('especialidade_') ? 'png' : 'jpg'));

    const img = new Image();
    img.src = `./modelo_${modelo}.${ext}`;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#111111';
        
        const fontePrincipal = '20pt Arial, sans-serif';
        const fontePequena = '16pt Arial, sans-serif';
        ctx.font = fontePrincipal;

        // 1. PROGRESSÃO TRADICIONAL
        if (modelo === 'progressao_l') {
            const etapa = document.getElementById('etapa').value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.48, canvas.height * 0.315); 
            ctx.fillText(etapa, canvas.width * 0.53, canvas.height * 0.375); 
            ctx.fillText(cidade, canvas.width * 0.32, canvas.height * 0.525);
            ctx.fillText(dia, canvas.width * 0.45, canvas.height * 0.525);
            ctx.fillText(mes, canvas.width * 0.57, canvas.height * 0.525);
            ctx.fillText(ano, canvas.width * 0.69, canvas.height * 0.525);
        }
        else if (modelo === 'progressao_e') {
            const etapa = document.getElementById('etapa').value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.49, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.55, canvas.height * 0.405); 
            ctx.fillText(cidade, canvas.width * 0.34, canvas.height * 0.56);
            ctx.fillText(dia, canvas.width * 0.47, canvas.height * 0.56);
            ctx.fillText(mes, canvas.width * 0.59, canvas.height * 0.56);
            ctx.fillText(ano, canvas.width * 0.71, canvas.height * 0.56);
        }
        else if (modelo === 'progressao_s') {
            const etapa = document.getElementById('etapa').value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.59, canvas.height * 0.33); 
            ctx.fillText(etapa, canvas.width * 0.65, canvas.height * 0.385); 
            ctx.fillText(cidade, canvas.width * 0.45, canvas.height * 0.545);
            ctx.fillText(dia, canvas.width * 0.58, canvas.height * 0.545);
            ctx.fillText(mes, canvas.width * 0.70, canvas.height * 0.545);
            ctx.fillText(ano, canvas.width * 0.82, canvas.height * 0.545);
        }
        else if (modelo === 'progressao_p') {
            const etapa = document.getElementById('etapa').value || "";
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.36); 
            ctx.fillText(etapa, canvas.width * 0.56, canvas.height * 0.42); 
            ctx.fillText(cidade, canvas.width * 0.46, canvas.height * 0.55);
            ctx.fillText(dia, canvas.width * 0.59, canvas.height * 0.55);
            ctx.fillText(mes, canvas.width * 0.72, canvas.height * 0.55);
            ctx.fillText(ano, canvas.width * 0.83, canvas.height * 0.55);
        }

        // 2. ACOLHIDA E OUTROS MODELOS
        else if (modelo === 'cert_acolhida') {
            const resp = document.getElementById('responsaveis').value || "";
            const grupo = document.getElementById('grupo').value || "";
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
            const esp = document.getElementById('especialidade').value || "";
            const nivel = document.getElementById('nivel').value || "";
            const itens = document.getElementById('itens').value || "";
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
            const esp = document.getElementById('especialidade').value || "";
            const eixo = document.getElementById('eixo').value || "";
            const carga = document.getElementById('carga').value || "";
            const conhecer = document.getElementById('conhecer').value || "";
            const fazer = document.getElementById('fazer').value || "";
            const compartilhar = document.getElementById('compartilhar').value || "";

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

        // 5. OUTROS CERTIFICADOS GENÉRICOS DE LIDERANÇA, INSÍGNIAS, ETC.
        else {
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.50, canvas.height * 0.48);
            ctx.fillText(cidade, canvas.width * 0.35, canvas.height * 0.72);
            ctx.fillText(dia, canvas.width * 0.48, canvas.height * 0.72);
            ctx.fillText(mes, canvas.width * 0.60, canvas.height * 0.72);
            ctx.fillText(ano, canvas.width * 0.72, canvas.height * 0.72);
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
        console.error("Erro ao carregar a imagem do modelo.");
    };
}

function baixarPDF() {
    if (!window.jspdf) {
        alert("A biblioteca de PDF ainda está carregando.");
        return;
    }
    const { jsPDF } = window.jspdf;
    
    const modelo = document.getElementById('modelo').value;
    const orientacao = (modelo === 'especialidade_sp' || modelo.startsWith('cert_primo') || modelo.startsWith('cert_segundo') || modelo.startsWith('cert_monitor_') || modelo.startsWith('cert_sub_') || modelo.startsWith('cert_promessa') || modelo.startsWith('cert_recrutador') || modelo.startsWith('ins_semeador') || ['ins_conesul', 'ins_lusofonia', 'ins_acao_comunitaria', 'ins_aeronauta', 'ins_aviador', 'ins_boa_acao', 'ins_desafio_comunitario', 'ins_grumete', 'ins_naval'].includes(modelo)) ? 'portrait' : 'landscape';
    
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

atualizarFormulario();
