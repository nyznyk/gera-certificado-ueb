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
    const nome = document.getElementById('nome').value || "Nome do Jovem";
    const dia = document.getElementById('dia').value || "15";
    const mes = document.getElementById('mes').value || "Agosto";
    const ano = document.getElementById('ano').value || "2026";

    const img = new Image();
    img.src = `./modelo_${modelo}.png`;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        ctx.fillStyle = '#0a0a0a';
        ctx.textAlign = 'center';

        // Fontes em Arial (Tamanhos ajustados para caber nas linhas)
        const fonteNome = 'bold 36pt Arial, sans-serif';
        const fonteTexto = 'bold 24pt Arial, sans-serif';
        const fontePequena = 'bold 20pt Arial, sans-serif';

        // ---------------------------------------------------------
        // 1. PROGRESSÃO PESSOAL (LOBINHO, ESCOTEIRO, SÊNIOR, PIONEIRO)
        // ---------------------------------------------------------
        if (modelo.startsWith('progressao_')) {
            const etapa = document.getElementById('etapa').value || "Etapa";
            
            // Nome (Desceu para 0.355 para encostar na linha)
            ctx.font = fonteNome;
            ctx.fillText(nome, canvas.width * 0.49, canvas.height * 0.355); 
            
            // Etapa (Subiu para 0.415 para encostar na linha)
            ctx.font = fonteTexto;
            ctx.fillText(etapa, canvas.width * 0.56, canvas.height * 0.415); 

            // Datas (Centralizadas nos espaços menores)
            ctx.font = fonteTexto;
            ctx.fillText(dia, canvas.width * 0.46, canvas.height * 0.56);
            ctx.fillText(mes, canvas.width * 0.58, canvas.height * 0.56);
            ctx.fillText(ano, canvas.width * 0.70, canvas.height * 0.56);
        }

        // ---------------------------------------------------------
        // 2. ESPECIALIDADE (LOBINHO / ESCOTEIRO)
        // ---------------------------------------------------------
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade').value || "Especialidade";
            const nivel = document.getElementById('nivel').value || "1";
            const itens = document.getElementById('itens').value || "1, 2 e 3";
            const avaliador = document.getElementById('avaliador').value || "Examinador";

            // Nome (Mais abaixo, posicionado à direita da logo)
            ctx.font = fonteNome;
            ctx.fillText(nome, canvas.width * 0.62, canvas.height * 0.365);
            
            // Especialidade
            ctx.font = fonteTexto;
            ctx.fillText(esp, canvas.width * 0.74, canvas.height * 0.445);
            
            // Nível (Espaço bem pequeno)
            ctx.font = fonteTexto;
            ctx.fillText(nivel, canvas.width * 0.59, canvas.height * 0.505);
            
            // Itens Completados (Linha de baixo)
            ctx.font = fontePequena;
            ctx.fillText(itens, canvas.width * 0.62, canvas.height * 0.585);
            
            // Data
            ctx.font = fonteTexto;
            ctx.fillText(dia, canvas.width * 0.57, canvas.height * 0.685);
            ctx.fillText(mes, canvas.width * 0.68, canvas.height * 0.685);
            ctx.fillText(ano, canvas.width * 0.79, canvas.height * 0.685);

            // Avaliador (Assinatura inferior)
            ctx.font = fontePequena;
            ctx.fillText(avaliador, canvas.width * 0.53, canvas.height * 0.89);
        }

        // ---------------------------------------------------------
        // 3. ESPECIALIDADE (SÊNIOR / PIONEIRO)
        // ---------------------------------------------------------
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade').value || "Especialidade";
            const avaliador = document.getElementById('avaliador').value || "Orientador";

            // Nome (Alinhado mais à esquerda neste modelo)
            ctx.font = fonteNome;
            ctx.fillText(nome, canvas.width * 0.30, canvas.height * 0.365);
            
            // Especialidade
            ctx.font = fonteTexto;
            ctx.fillText(esp, canvas.width * 0.39, canvas.height * 0.465);
            
            // Data
            ctx.font = fonteTexto;
            ctx.fillText(dia, canvas.width * 0.28, canvas.height * 0.595);
            ctx.fillText(mes, canvas.width * 0.39, canvas.height * 0.595);
            ctx.fillText(ano, canvas.width * 0.52, canvas.height * 0.595);

            // Avaliador (Assinatura inferior)
            ctx.font = fontePequena;
            ctx.fillText(avaliador, canvas.width * 0.17, canvas.height * 0.86);
        }
    };
    
    img.onerror = function() {
        console.error("Não foi possível carregar o arquivo ./modelo_" + modelo + ".png.");
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

// Executa a montagem inicial
atualizarFormulario();
