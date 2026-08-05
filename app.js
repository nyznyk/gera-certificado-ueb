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
    const nome = document.getElementById('nome').value || "Nome do Jovem Escoteiro";
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

        // Definição das fontes Arial
        const fonteNome = 'bold 42pt Arial, sans-serif';
        const fonteTexto = 'bold 30pt Arial, sans-serif';
        const fonteData = 'bold 22pt Arial, sans-serif';

        // 1. CERTIFICADOS DE PROGRESSÃO PESSOAL (Lobinho, Escoteiro, Sênior, Pioneiro)
        if (modelo.startsWith('progressao_')) {
            const etapa = document.getElementById('etapa').value || "Nome da Etapa";
            
            // Posição do Nome (desceu para 0.33 para encaixar na linha)
            ctx.font = fonteNome;
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.33); 
            
            // Posição da Etapa (subiu levemente para 0.44 para ajustar na linha)
            ctx.font = fonteTexto;
            ctx.fillText(etapa, canvas.width / 2, canvas.height * 0.44); 

            // Datas
            ctx.font = fonteData;
            ctx.fillText(dia, canvas.width * 0.40, canvas.height * 0.65);
            ctx.fillText(mes, canvas.width * 0.53, canvas.height * 0.65);
            ctx.fillText(ano, canvas.width * 0.68, canvas.height * 0.65);
        }

        // 2. CERTIFICADO DE ESPECIALIDADE (LOBINHO / ESCOTEIRO)
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade').value || "Nome da Especialidade";
            const nivel = document.getElementById('nivel').value || "1";
            const itens = document.getElementById('itens').value || "1, 2 e 3";
            const avaliador = document.getElementById('avaliador').value || "Nome do Examinador";

            // Nome do Jovem (corrigido para 0.33)
            ctx.font = fonteNome;
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.33);
            
            // Nome da Especialidade (posicionado em 0.42)
            ctx.font = fonteTexto;
            ctx.fillText(esp, canvas.width / 2, canvas.height * 0.42);
            
            // Nível (posicionado em 0.48)
            ctx.fillText(nivel, canvas.width * 0.48, canvas.height * 0.48);
            
            // Itens Completados (posicionado em 0.54)
            ctx.fillText(itens, canvas.width / 2, canvas.height * 0.54);
            
            // Avaliador e Data
            ctx.font = fonteData;
            ctx.fillText(avaliador, canvas.width * 0.28, canvas.height * 0.64);
            ctx.fillText(dia, canvas.width * 0.52, canvas.height * 0.64);
            ctx.fillText(mes, canvas.width * 0.63, canvas.height * 0.64);
            ctx.fillText(ano, canvas.width * 0.77, canvas.height * 0.64);
        }

        // 3. CERTIFICADO DE ESPECIALIDADE (SÊNIOR / PIONEIRO)
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade').value || "Nome da Especialidade";
            const avaliador = document.getElementById('avaliador').value || "Nome do Orientador";

            // Nome do Jovem (corrigido para 0.33)
            ctx.font = fonteNome;
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.33);
            
            // Nome da Especialidade (posicionado em 0.42)
            ctx.font = fonteTexto;
            ctx.fillText(esp, canvas.width / 2, canvas.height * 0.42);
            
            // Avaliador e Data
            ctx.font = fonteData;
            ctx.fillText(avaliador, canvas.width * 0.28, canvas.height * 0.64);
            ctx.fillText(dia, canvas.width * 0.52, canvas.height * 0.64);
            ctx.fillText(mes, canvas.width * 0.63, canvas.height * 0.64);
            ctx.fillText(ano, canvas.width * 0.77, canvas.height * 0.64);
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
