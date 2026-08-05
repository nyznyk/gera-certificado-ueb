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
    const nome = document.getElementById('nome').value || "NOME DO JOVEM";
    const dia = document.getElementById('dia').value || "15";
    const mes = document.getElementById('mes').value || "Agosto";
    const ano = document.getElementById('ano').value || "2026";

    const img = new Image();
    // Força a busca da imagem na mesma pasta
    img.src = `./modelo_${modelo}.png`;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        if (modelo.startsWith('progressao_')) {
            const etapa = document.getElementById('etapa').value || "ETAPA DE PROGRESSÃO";
            
            ctx.font = 'bold 40pt Georgia';
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.38);
            
            ctx.font = '32pt Georgia';
            ctx.fillText(etapa, canvas.width / 2, canvas.height * 0.48);

            ctx.font = '24pt Georgia';
            ctx.fillText(dia, canvas.width * 0.40, canvas.height * 0.65);
            ctx.fillText(mes, canvas.width * 0.53, canvas.height * 0.65);
            ctx.fillText(ano, canvas.width * 0.68, canvas.height * 0.65);
        }
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade').value || "NOME DA ESPECIALIDADE";
            const nivel = document.getElementById('nivel').value || "1";
            const itens = document.getElementById('itens').value || "1, 2 e 3";
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
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade').value || "NOME DA ESPECIALIDADE";
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
    
    img.onerror = function() {
        console.error("ERRO: Não foi possível carregar o arquivo ./modelo_" + modelo + ".png. Verifique se o arquivo existe com este nome exato no GitHub.");
    };
}

function baixarPDF() {
    if (!window.jspdf) {
        alert("A biblioteca de PDF ainda está carregando ou foi bloqueada. Aguarde alguns segundos.");
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

// Execução inicial
atualizarFormulario();
