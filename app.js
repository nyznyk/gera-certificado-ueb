const canvas = document.getElementById('canvasCertificado');
const ctx = canvas.getContext('2d');

function atualizarFormulario() {
    const modelo = document.getElementById('modelo').value;
    
    // Esconder tudo primeiro
    document.getElementById('grupo-progressao').style.display = 'none';
    document.getElementById('grupo-especialidade').style.display = 'none';
    document.getElementById('campo-nivel').style.display = 'none';
    document.getElementById('campo-sp-extra').style.display = 'none';

    // Mostrar os campos corretos baseados no modelo
    if (modelo.startsWith('progressao_')) {
        document.getElementById('grupo-progressao').style.display = 'block';
    } 
    else if (modelo === 'especialidade_le') {
        document.getElementById('grupo-especialidade').style.display = 'block';
        document.getElementById('campo-nivel').style.display = 'block';
    } 
    else if (modelo === 'especialidade_sp') {
        document.getElementById('grupo-especialidade').style.display = 'block';
        document.getElementById('campo-sp-extra').style.display = 'block';
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
        
        // Fontes sem negrito, igualadas ao tamanho impresso
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

            // PARTE SUPERIOR (Centralizado nas linhas)
            ctx.textAlign = 'center';
            ctx.fillText(nome, canvas.width * 0.305, canvas.height * 0.19);
            ctx.fillText(esp, canvas.width * 0.395, canvas.height * 0.237);
            
            ctx.fillText(cidade, canvas.width * 0.18, canvas.height * 0.298);
            ctx.fillText(dia, canvas.width * 0.28, canvas.height * 0.298);
            ctx.fillText(mes, canvas.width * 0.38, canvas.height * 0.298);
            ctx.fillText(ano, canvas.width * 0.50, canvas.height * 0.298);

            // PARTE INFERIOR - "Sobre a Especialidade" (Alinhado à esquerda)
            ctx.textAlign = 'left';
            ctx.font = '14pt Arial, sans-serif'; // Fonte menor para preencher os relatórios

            // Os valores de altura (Y) aqui são estimados para a metade de baixo do documento
            ctx.fillText(esp, canvas.width * 0.21, canvas.height * 0.652);
            ctx.fillText(eixo, canvas.width * 0.43, canvas.height * 0.671);
            ctx.fillText(carga, canvas.width * 0.22, canvas.height * 0.69);
            
            ctx.fillText(conhecer, canvas.width * 0.35, canvas.height * 0.749);
            ctx.fillText(fazer, canvas.width * 0.45, canvas.height * 0.803);
            ctx.fillText(compartilhar, canvas.width * 0.52, canvas.height * 0.857);
        }
    };
    
    img.onerror = function() {
        console.error("Erro ao carregar a imagem.");
    };
}

function baixarPDF() {
    if (!window.jspdf) {
        alert("A biblioteca de PDF ainda está carregando.");
        return;
    }
    const { jsPDF } = window.jspdf;
    
    // O certificado Especialidade Sênior/Pioneiro é alto (Retrato/Portrait), os outros são Paisagem
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

// Inicializa a tela
atualizarFormulario();
