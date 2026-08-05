const canvas = document.getElementById('canvasCertificado');
const ctx = canvas.getContext('2d');

// Função auxiliar para quebrar texto longo em várias linhas
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
    
    const grupoProg = document.getElementById('grupo-progressao');
    const grupoEsp = document.getElementById('grupo-especialidade');
    const campoNivel = document.getElementById('campo-nivel');
    const campoSpExtra = document.getElementById('campo-sp-extra');

    if (grupoProg) grupoProg.style.display = 'none';
    if (grupoEsp) grupoEsp.style.display = 'none';
    if (campoNivel) campoNivel.style.display = 'none';
    if (campoSpExtra) campoSpExtra.style.display = 'none';

    if (modelo.startsWith('progressao_')) {
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
    
    gerarCertificado();
}

function gerarCertificado() {
    const modelo = document.getElementById('modelo').value;
    const nome = document.getElementById('nome').value || "";
    const cidade = document.getElementById('cidade').value || "";
    const dia = document.getElementById('dia').value || "";
    const mes = document.getElementById('mes').value || "";
    const ano = document.getElementById('ano').value || "";

    const img = new Image();
    img.src = `./modelo_${modelo}.png`;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#111111';
        
        const fontePrincipal = '20pt Arial, sans-serif';
        const fontePequena = '16pt Arial, sans-serif';
        
        ctx.font = fontePrincipal;

        // ==========================================
        // 1. PROGRESSÃO - LOBINHO
        // ==========================================
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
        
        // ==========================================
        // 2. PROGRESSÃO - ESCOTEIRO
        // ==========================================
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

        // ==========================================
        // 3. PROGRESSÃO - SÊNIOR
        // ==========================================
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

        // ==========================================
        // 4. PROGRESSÃO - PIONEIRO
        // ==========================================
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

        // ==========================================
        // 5. ESPECIALIDADE (LOBINHO / ESCOTEIRO)
        // ==========================================
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

        // ==========================================
        // 6. ESPECIALIDADE (SÊNIOR / PIONEIRO)
        // ==========================================
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade').value || "";
            const eixo = document.getElementById('eixo').value || "";
            const carga = document.getElementById('carga').value || "";
            const conhecer = document.getElementById('conhecer').value || "";
            const fazer = document.getElementById('fazer').value || "";
            const compartilhar = document.getElementById('compartilhar').value || "";

            // --- PARTE SUPERIOR (Certificado) ---
            ctx.textAlign = 'center'; 
            
            ctx.fillText(nome, canvas.width * 0.355, canvas.height * 0.188);
            ctx.fillText(esp, canvas.width * 0.465, canvas.height * 0.231);
            
            ctx.fillText(cidade, canvas.width * 0.19, canvas.height * 0.292);
            ctx.fillText(dia, canvas.width * 0.28, canvas.height * 0.292);
            ctx.fillText(mes, canvas.width * 0.40, canvas.height * 0.292);
            ctx.fillText(ano, canvas.width * 0.50, canvas.height * 0.292);

            // --- PARTE INFERIOR (Relatório / Ficha) ---
            ctx.textAlign = 'left'; 
            ctx.font = '14pt Arial, sans-serif'; 

            ctx.fillText(esp, canvas.width * 0.295, canvas.height * 0.645);
            ctx.fillText(eixo, canvas.width * 0.535, canvas.height * 0.667);
            ctx.fillText(carga, canvas.width * 0.315, canvas.height * 0.684);
            
            // AJUSTES DAS ETAPAS (CONHECER, FAZER, COMPARTILHAR)
            const lineHeight = 30; 
            const xInicioGeral = canvas.width * 0.19; 
            const limiteDireito = 0.91; 
            const maxWidthGeral = canvas.width * (limiteDireito - 0.19);

            // Conhecer
            wrapText(
                ctx, conhecer,
                canvas.width * 0.485, canvas.height * 0.745, canvas.width * (limiteDireito - 0.485),
                xInicioGeral, maxWidthGeral,
                lineHeight
            );

            // Fazer
            wrapText(
                ctx, fazer,
                canvas.width * 0.585, canvas.height * 0.798, canvas.width * (limiteDireito - 0.585),
                xInicioGeral, maxWidthGeral,
                lineHeight
            );

            // Compartilhar
            wrapText(
                ctx, compartilhar,
                canvas.width * 0.615, canvas.height * 0.852, canvas.width * (limiteDireito - 0.615),
                xInicioGeral, maxWidthGeral,
                lineHeight
            );
        }
    };
    
    img.onerror = function() {
        console.error("Erro ao carregar a imagem. Verifique se o nome do arquivo está correto.");
    };
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

atualizarFormulario();
