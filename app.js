// Variable Global para guardar a logo carregada
let logoImagem = null;

// Lista de Modelos de Certificados
const listaCertificados = [
    { id: 'promessa_lobinho', nome: 'Promessa Lobinho', cat: 'promessa', campos: ['responsaveis', 'matilha'] },
    { id: 'promessa_escoteiro', nome: 'Promessa Escoteira', cat: 'promessa', campos: ['forma_promessa', 'patrulha'] },
    { id: 'progressao_etapa', nome: 'Conclusão de Etapa', cat: 'progressao', campos: ['etapa', 'ramo'] },
    { id: 'acolhida', nome: 'Certificado de Acolhida', cat: 'progressao', campos: ['grupo', 'quantidade'] },
    { id: 'lideranca_monitor', nome: 'Nomeação de Monitor/Sub', cat: 'lideranca', campos: ['patrulha', 'anos'] },
    { id: 'especialidade_geral', nome: 'Especialidade', cat: 'especialidades', campos: ['especialidade', 'nivel', 'itens'] },
    { id: 'insignia_modalidade', nome: 'Insígnia de Modalidade', cat: 'insignias', campos: ['ramo', 'etapa'] },
    { id: 'desafio_senior_pioneiro', nome: 'Atividade Sênior / Pioneiro', cat: 'insignias', campos: ['sp-extra'] }
];

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    popularSelectModelos();
    filtrarCategoria('todas');
    configurarCanvas();
});

// 1. Carregamento da Logo
function carregarLogo(event) {
    const file = event.target.files[0];
    const statusText = document.getElementById('statusLogo');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                logoImagem = img;
                statusText.innerText = "Logo carregada com sucesso!";
                statusText.style.color = "#38a169";
                gerarCertificado();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        logoImagem = null;
        statusText.innerText = "Nenhuma logo personalizada selecionada";
        statusText.style.color = "#718096";
        gerarCertificado();
    }
}

// 2. Preenchimento e Filtro de Modelos
function popularSelectModelos() {
    const select = document.getElementById('modelo');
    select.innerHTML = '';
    listaCertificados.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item.id;
        opt.textContent = item.nome;
        select.appendChild(opt);
    });
}

function filtrarCategoria(categoria) {
    // Atualizar botões ativos da categoria
    const botoes = document.querySelectorAll('.btn-cat');
    botoes.forEach(btn => btn.classList.remove('active'));
    
    const btnClicado = Array.from(botoes).find(b => b.getAttribute('onclick')?.includes(`'${categoria}'`));
    if (btnClicado) btnClicado.classList.add('active');

    // Filtrar a grade de botões
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

        if (index === 0) {
            btn.click(); // Seleciona automaticamente o primeiro da lista
        }
    });
}

function selecionarModelo(idModelo, btnElemento) {
    document.querySelectorAll('.btn-modelo').forEach(b => b.classList.remove('selected'));
    if (btnElemento) btnElemento.classList.add('selected');

    const select = document.getElementById('modelo');
    select.value = idModelo;
    
    atualizarFormulario();
}

// 3. Atualização Dinâmica dos Campos do Formulário
function atualizarFormulario() {
    const modeloId = document.getElementById('modelo').value;
    const modeloAtual = listaCertificados.find(m => m.id === modeloId);

    // Lista de todas as seções dinâmicas
    const IDsCampos = [
        'campo-etapa', 'campo-responsaveis', 'campo-grupo', 'campo-matilha',
        'campo-patrulha', 'campo-forma_promessa', 'campo-quantidade', 
        'campo-anos', 'campo-ramo', 'grupo-especialidade', 'campo-nivel', 'campo-sp-extra'
    ];

    // Ocultar todos mantendo o layout intacto
    IDsCampos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    if (modeloAtual && modeloAtual.campos) {
        modeloAtual.campos.forEach(campo => {
            if (campo === 'especialidade') {
                document.getElementById('grupo-especialidade').style.display = '';
                document.getElementById('campo-nivel').style.display = '';
            } else if (campo === 'sp-extra') {
                document.getElementById('campo-sp-extra').style.display = '';
            } else {
                const el = document.getElementById(`campo-${campo}`);
                if (el) el.style.display = '';
            }
        });
    }

    gerarCertificado();
}

// 4. Renderização do Certificado no Canvas
function configurarCanvas() {
    const canvas = document.getElementById('canvasCertificado');
    canvas.width = 1200;
    canvas.height = 850;
    gerarCertificado();
}

function gerarCertificado() {
    const canvas = document.getElementById('canvasCertificado');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Fundo do Certificado
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Moldura decorativa
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#1a365d';
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2b6cb0';
    ctx.strokeRect(45, 45, width - 90, height - 90);

    // Desenhar Logo (se houver)
    if (logoImagem) {
        ctx.drawImage(logoImagem, 80, 80, 100, 100);
    }

    // Título Central
    ctx.fillStyle = '#1a365d';
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICADO ESCOTEIRO', width / 2, 120);

    // Dados do formulário
    const nome = document.getElementById('nome').value || '[Nome do Agraciado]';
    const cidade = document.getElementById('cidade').value || 'Curitiba';
    const dia = document.getElementById('dia').value || '01';
    const mes = document.getElementById('mes').value || 'Janeiro';
    const ano = document.getElementById('ano').value || '2026';

    const modeloId = document.getElementById('modelo').value;
    const modeloAtual = listaCertificados.find(m => m.id === modeloId);
    const tituloModelo = modeloAtual ? modeloAtual.nome.toUpperCase() : 'CERTIFICADO';

    // Subtítulo do Modelo
    ctx.fillStyle = '#2b6cb0';
    ctx.font = 'bold 26px Arial';
    ctx.fillText(tituloModelo, width / 2, 175);

    // Texto Principal
    ctx.fillStyle = '#2d3748';
    ctx.font = '22px Arial';
    ctx.fillText('Certificamos que', width / 2, 250);

    // Nome
    ctx.fillStyle = '#1a365d';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(nome, width / 2, 310);

    // Linha decorativa sob o nome
    ctx.beginPath();
    ctx.moveTo(width / 2 - 250, 325);
    ctx.lineTo(width / 2 + 250, 325);
    ctx.strokeStyle = '#cbd5e0';
    ctx.stroke();

    // Detalhes adicionais baseados no modelo selecionado
    ctx.fillStyle = '#4a5568';
    ctx.font = '20px Arial';
    let yPos = 380;

    if (modeloAtual) {
        if (modeloAtual.campos.includes('etapa')) {
            const etapa = document.getElementById('etapa').value || 'Pista';
            ctx.fillText(`Cumpriu os requisitos da Etapa / Nível: ${etapa}`, width / 2, yPos);
            yPos += 35;
        }
        if (modeloAtual.campos.includes('especialidade')) {
            const esp = document.getElementById('especialidade').value || 'Especialidade';
            const niv = document.getElementById('nivel').value || 'Nível 1';
            ctx.fillText(`Conquistou a Especialidade de ${esp} - ${niv}`, width / 2, yPos);
            yPos += 35;
        }
        if (modeloAtual.campos.includes('patrulha')) {
            const patrulha = document.getElementById('patrulha').value;
            if (patrulha) {
                ctx.fillText(`Integrante da Patrulha: ${patrulha}`, width / 2, yPos);
                yPos += 35;
            }
        }
    }

    // Data e Local
    ctx.fillStyle = '#2d3748';
    ctx.font = 'italic 20px Arial';
    ctx.fillText(`${cidade}, ${dia} de ${mes} de ${ano}.`, width / 2, 620);

    // Linhas de Assinatura
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#718096';

    // Assinatura 1
    ctx.beginPath();
    ctx.moveTo(width / 2 - 320, 720);
    ctx.lineTo(width / 2 - 80, 720);
    ctx.stroke();
    ctx.font = '16px Arial';
    ctx.fillStyle = '#718096';
    ctx.fillText('Chefe da Tropa / Alcateia', width / 2 - 200, 745);

    // Assinatura 2
    ctx.beginPath();
    ctx.moveTo(width / 2 + 80, 720);
    ctx.lineTo(width / 2 + 320, 720);
    ctx.stroke();
    ctx.fillText('Diretoria do Grupo Escoteiro', width / 2 + 200, 745);
}

// 5. Baixar o Certificado em PDF
function baixarPDF() {
    const canvas = document.getElementById('canvasCertificado');
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Certificado_Escoteiro.pdf');
}
