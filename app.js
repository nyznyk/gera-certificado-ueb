const canvas = document.getElementById('canvasCertificado');
const ctx = canvas.getContext('2d');

function atualizarFormulario() {
    const modelo = document.getElementById('modelo').value;
    
    const grupoProg = document.getElementById('grupo-progressao');
    const grupoEsp = document.getElementById('grupo-especialidade');
    const campoNivel = document.getElementById('campo-nivel');

    if (grupoProg) grupoProg.style.display = 'none';
    if (grupoEsp) grupoEsp.style.display = 'none';
    if (campoNivel) campoNivel.style.display = 'none';

    if (modelo.startsWith('progressao_')) {
        if (grupoProg) grupoProg.style.display = 'block';
    } else if (modelo === 'especialidade_le') {
        if (grupoEsp) grupoEsp.style.display = 'block';
        if (campoNivel) campoNivel.style.display = 'block';
    } else if (modelo === 'especialidade_sp') {
        if (grupoEsp) grupoEsp.style.display = 'block';
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
        ctx.textAlign = 'center';

        // Fontes sem negrito, com tamanho alinhado ao texto impresso
        const fontePrincipal = '26pt Arial, sans-serif';
        const fonteSecundaria = '20pt Arial, sans-serif';

        // ==========================================
        // 1. PROGRESSÃO PESSOAL (TODOS OS RAMOS)
        // ==========================================
        if (modelo.startsWith('progressao_')) {
            const etapa = document.getElementById('etapa').value || "";
            
            // Nome
            ctx.font = fontePrincipal;
            ctx.fillText(nome, canvas.width * 0.485, canvas.height * 0.33); 
            
            // Etapa
            ctx.font = fonteSecundaria;
            ctx.fillText(etapa, canvas.width * 0.555, canvas.height * 0.40); 

            // Linha de Data
            ctx.fillText(cidade, canvas.width * 0.33, canvas.height * 0.52);
            ctx.fillText(dia, canvas.width * 0.46, canvas.height * 0.52);
            ctx.fillText(mes, canvas.width * 0.585, canvas.height * 0.52);
            ctx.fillText(ano, canvas.width * 0.71, canvas.height * 0.52);
        }

        // ==========================================
        // 2. ESPECIALIDADE (LOBINHO / ESCOTEIRO)
        // ==========================================
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade').value || "";
            const nivel = document.getElementById('nivel').value || "";
            const itens = document.getElementById('itens').value || "";

            // Nome
            ctx.font = fontePrincipal;
            ctx.fillText(nome, canvas.width * 0.62, canvas.height * 0.355);
            
            // Especialidade
            ctx.font = fonteSecundaria;
            ctx.fillText(esp, canvas.width * 0.75, canvas.height * 0.44);
            
            // Nível
            ctx.fillText(nivel, canvas.width * 0.592, canvas.height * 0.495);
            
            // Itens Completados
            ctx.fillText(itens, canvas.width * 0.625, canvas.height * 0.585);
            
            // Linha de Data
            ctx.fillText(cidade, canvas.width * 0.485, canvas.height * 0.685);
            ctx.fillText(dia, canvas.width * 0.575, canvas.height * 0.685);
            ctx.fillText(mes, canvas.width * 0.675, canvas.height * 0.685);
            ctx.fillText(ano, canvas.width * 0.78, canvas.height * 0.685);
        }

        // ==========================================
        // 3. ESPECIALIDADE (SÊNIOR / PIONEIRO)
        // ==========================================
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade').value || "";

            // Nome
            ctx.font = fontePrincipal;
            ctx.fillText(nome, canvas.width * 0.315, canvas.height * 0.37);
            
            // Especialidade
            ctx.font = fonteSecundaria;
            ctx.fillText(esp, canvas.width * 0.405, canvas.height * 0.465);
            
            // Linha de Data
            ctx.fillText(cidade, canvas.width * 0.19, canvas.height * 0.585);
            ctx.fillText(dia, canvas.width * 0.285, canvas.height * 0.585);
            ctx.fillText(mes, canvas.width * 0.39, canvas.height * 0.585);
            ctx.fillText(ano, canvas.width * 0.51, canvas.height * 0.585);
        }
    };
    
    img.onerror = function() {
        console.error("Erro: Não foi possível carregar a imagem.");
    };
}

function baixarPDF() {
    if (!window.jspdf) {
        alert("A biblioteca de PDF ainda está carregando.");
        return;
    }
    const { jsPDF } = window.jspdf;
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    
    const nome = document.getElementById('nome').value || "Certificado";
    pdf.save(`Certificado_${nome}.pdf`);
}

// Inicializa a tela
atualizarFormulario();
