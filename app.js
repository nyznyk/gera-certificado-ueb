const canvas = document.getElementById('canvasCertificado');
const ctx = canvas.getContext('2d');

function atualizarFormulario() {
    const modelo = document.getElementById('modelo').value;
    
    // Esconde todos os grupos primeiro
    document.getElementById('grupo-progressao').style.display = 'none';
    document.getElementById('grupo-especialidade').style.display = 'none';
    document.getElementById('campo-nivel').style.display = 'none';

    // Mostra apenas os campos necessários
    if (modelo.startsWith('progressao_')) {
        document.getElementById('grupo-progressao').style.display = 'block';
    } else if (modelo === 'especialidade_le') {
        document.getElementById('grupo-especialidade').style.display = 'block';
        document.getElementById('campo-nivel').style.display = 'block';
    } else if (modelo === 'especialidade_sp') {
        document.getElementById('grupo-especialidade').style.display = 'block';
    }
    
    gerarCertificado();
}

function gerarCertificado() {
    const modelo = document.getElementById('modelo').value;
    const nome = document.getElementById('nome').value || "NOME DO JOVEM";
    const dia = document.getElementById('dia').value || "DD";
    const mes = document.getElementById('mes').value || "MÊS";
    const ano = document.getElementById('ano').value || "AAAA";

    const img = new Image();
    // Puxa a imagem com o nome exato
    img.src = `modelo_${modelo}.png`;

    img.onload = function () {
        // Redimensiona o canvas para o tamanho real da imagem
        canvas.width = img.width;
        canvas.height = img.height;

        // Desenha o certificado de fundo
        ctx.drawImage(img, 0, 0);

        // Configuração visual do texto
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        // DESENHO: PROGRESSÃO PESSOAL (Lobinho, Escoteiro, Sênior, Pioneiro)
        if (modelo.startsWith('progressao_')) {
            const etapa = document.getElementById('etapa').value || "NOME DA ETAPA";
            
            ctx.font = 'bold 40pt Georgia';
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.38); // Nome
            
            ctx.font = '32pt Georgia';
            ctx.fillText(etapa, canvas.width / 2, canvas.height * 0.48); // Etapa

            // Data
            ctx.font = '24pt Georgia';
            ctx.fillText(dia, canvas.width * 0.40, canvas.height * 0.65);
            ctx.fillText(mes, canvas.width * 0.53, canvas.height * 0.65);
            ctx.fillText(ano, canvas.width * 0.68, canvas.height * 0.65);
        }

        // DESENHO: ESPECIALIDADE (LOBINHO / ESCOTEIRO)
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade').value || "ESPECIALIDADE";
            const nivel = document.getElementById('nivel').value || "1";
            const itens = document.getElementById('itens').value || "1, 2, 3";
            const avaliador = document.getElementById('avaliador').value || "EXAMINADOR";

            ctx.font = 'bold 38pt Georgia';
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.36);
            
            ctx.font = '30pt Georgia';
            ctx.fillText(esp, canvas.width / 2, canvas.height * 0.44);
            ctx.fillText(nivel, canvas.width * 0.48, canvas.height * 0.49);
            ctx.fillText(itens, canvas.width / 2, canvas.height * 0.54);
            
            ctx.font = '22pt Georgia';
            ctx.fillText(avaliador, canvas.width * 0.28, canvas.height * 0.64);
            ctx.fillText(dia, canvas.width * 0.52, canvas.height * 0.64);
            ctx.fillText(mes, canvas.width * 0.63, canvas.height * 0.64);
            ctx.fillText(ano, canvas.width * 0.77, canvas.height * 0.64);
        }

        // DESENHO: ESPECIALIDADE (SÊNIOR / PIONEIRO)
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade').value || "ESPECIALIDADE";
            const avaliador = document.getElementById('avaliador').value || "ORIENTADOR";

            ctx.font = 'bold 38pt Georgia';
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.36);
            
            ctx.font = '30pt Georgia';
            ctx.fillText(esp, canvas.width / 2, canvas.height * 0.44);
            
            ctx.font = '22pt Georgia';
            ctx.fillText(avaliador, canvas.width * 0.28, canvas.height * 0.64);
            ctx.fillText(dia, canvas.width * 0.52, canvas.height * 0.64);
            ctx.fillText(mes, canvas.width * 0.63, canvas.height * 0.64);
            ctx.fillText(ano, canvas.width * 0.77, canvas.height * 0.64);
        }
    };
    
    // Tratamento de erro se a imagem não for encontrada
    img.onerror = function() {
        console.error("Erro ao carregar a imagem: " + img.src);
    };
}

// Função para fazer download do PDF
function baixarPDF() {
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

// Executa assim que a página carrega
window.onload = atualizarFormulario;
