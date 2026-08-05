const canvas = document.getElementById('canvasCertificado');
const ctx = canvas.getContext('2d');

function atualizarFormulario() {
    const modelo = document.getElementById('modelo').value;
    
    document.getElementById('grupo-progressao').style.display = 'none';
    document.getElementById('grupo-especialidade').style.display = 'none';
    document.getElementById('campo-nivel').style.display = 'none';

    // Se o modelo escolhido começar com "progressao_"
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
    const nome = document.getElementById('nome').value || "";
    const dia = document.getElementById('dia').value || "";
    const mes = document.getElementById('mes').value || "";
    const ano = document.getElementById('ano').value || "";

    const img = new Image();
    
    // Carrega o arquivo PNG exato de acordo com o padrão de nome do arquivo
    img.src = `modelo_${modelo}.png`;

    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';

        // Lógica para todos os certificados de Progressão (Lobinho, Escoteiro, Sênior e Pioneiro)
        if (modelo.startsWith('progressao_')) {
            const etapa = document.getElementById('etapa').value || "";
            
            ctx.font = 'bold 36pt Georgia';
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.42);
            
            ctx.font = '30pt Georgia';
            ctx.fillText(etapa, canvas.width / 2, canvas.height * 0.52);

            // Data
            ctx.font = '22pt Georgia';
            ctx.fillText(dia, canvas.width * 0.42, canvas.height * 0.68);
            ctx.fillText(mes, canvas.width * 0.53, canvas.height * 0.68);
            ctx.fillText(ano, canvas.width * 0.67, canvas.height * 0.68);
        }

        // Lógica para Especialidade Lobinho e Escoteiro
        else if (modelo === 'especialidade_le') {
            const esp = document.getElementById('especialidade').value || "";
            const nivel = document.getElementById('nivel').value || "";
            const itens = document.getElementById('itens').value || "";
            const avaliador = document.getElementById('avaliador').value || "";

            ctx.font = 'bold 34pt Georgia';
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.38);
            
            ctx.font = '28pt Georgia';
            ctx.fillText(esp, canvas.width / 2, canvas.height * 0.47);
            ctx.fillText(nivel, canvas.width * 0.48, canvas.height * 0.52);
            ctx.fillText(itens, canvas.width / 2, canvas.height * 0.57);
            
            ctx.font = '22pt Georgia';
            ctx.fillText(avaliador, canvas.width * 0.28, canvas.height * 0.66);
            ctx.fillText(dia, canvas.width * 0.52, canvas.height * 0.66);
            ctx.fillText(mes, canvas.width * 0.63, canvas.height * 0.66);
            ctx.fillText(ano, canvas.width * 0.77, canvas.height * 0.66);
        }

        // Lógica para Especialidade Sênior e Pioneiro
        else if (modelo === 'especialidade_sp') {
            const esp = document.getElementById('especialidade').value || "";
            const avaliador = document.getElementById('avaliador').value || "";

            ctx.font = 'bold 34pt Georgia';
            ctx.fillText(nome, canvas.width / 2, canvas.height * 0.38);
            
            ctx.font = '28pt Georgia';
            ctx.fillText(esp, canvas.width / 2, canvas.height * 0.47);
            
            ctx.font = '22pt Georgia';
            ctx.fillText(avaliador, canvas.width * 0.28, canvas.height * 0.66);
            ctx.fillText(dia, canvas.width * 0.52, canvas.height * 0.66);
            ctx.fillText(mes, canvas.width * 0.63, canvas.height * 0.66);
            ctx.fillText(ano, canvas.width * 0.77, canvas.height * 0.66);
        }
    };
    // Força o carregamento do certificado assim que a página abre
window.onload = atualizarFormulario;
}
