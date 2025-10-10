document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DADOS DAS PLANTAS ---
    // Adicione ou edite as plantas aqui. É só copiar e colar o bloco e alterar os dados.
    const plantas = [
        {
            id: 1,
            nomePopular: "Cagaita",
            nomeCientifico: "Eugenia dysenterica",
            imagem: "images/folha_cagaita.jpg", // Coloque o caminho da sua imagem
            descricao: "Árvore de pequeno a médio porte, nativa do Cerrado. Seus frutos são amarelados, ácidos e muito apreciados na região, consumidos in natura ou em doces e licores. Possui propriedades medicinais."
        },
        {
            id: 2,
            nomePopular: "Ipê Amarelo",
            nomeCientifico: "Handroanthus ochraceus",
            imagem: "images/folha_ipe_amarelo.jpg",
            descricao: "Uma das árvores mais simbólicas do Brasil e do Cerrado. Sua floração amarela intensa ocorre no período da seca, criando uma paisagem deslumbrante. É a árvore-símbolo do Brasil."
        },
        {
            id: 3,
            nomePopular: "Baru",
            nomeCientifico: "Dipteryx alata",
            imagem: "images/folha_baru.jpg",
            descricao: "Árvore imponente do Cerrado, cujo fruto contém uma amêndoa de alto valor nutricional e sabor delicioso, conhecida como a 'castanha do Cerrado'. Sua madeira também é muito resistente."
        },
        {
            id: 4,
            nomePopular: "Pequi",
            nomeCientifico: "Caryocar brasiliense",
            imagem: "images/folha_pequi.jpg",
            descricao: "Fruto emblemático da culinária do Cerrado, conhecido por seu cheiro e sabor fortes. É usado em pratos típicos, como o arroz com pequi. Cuidado com os espinhos internos!"
        },
        // --- Adicione mais plantas aqui ---
        /*
        {
            id: 5,
            nomePopular: "Nome da Nova Planta",
            nomeCientifico: "Nome Científico",
            imagem: "images/foto_da_folha.jpg",
            descricao: "Descrição detalhada da nova planta."
        },
        */
    ];

    // --- LÓGICA DA PÁGINA ---
    const galeria = document.getElementById('galeria-plantas');
    const modal = document.getElementById('modal-planta');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    // Função para criar os cards de cada planta na galeria
    function carregarPlantas() {
        plantas.forEach((planta, index) => {
            const card = document.createElement('div');
            card.className = 'planta-card';
            card.dataset.id = planta.id; // Guarda o ID da planta no elemento
            card.style.animationDelay = `${index * 0.1}s`; // Efeito cascata na animação

            const img = document.createElement('img');
            img.src = planta.imagem;
            img.alt = `Folha de ${planta.nomePopular}`;
            img.loading = 'lazy'; // Otimização para carregar images só quando aparecem

            card.appendChild(img);
            galeria.appendChild(card);
        });
    }

    // Função para abrir e preencher o modal com as informações
    function abrirModal(id) {
        const planta = plantas.find(p => p.id == id);
        if (!planta) return;

        document.getElementById('modal-img').src = planta.imagem;
        document.getElementById('modal-titulo').textContent = planta.nomePopular;
        document.getElementById('modal-nome-cientifico').innerHTML = `<i>${planta.nomeCientifico}</i>`;
        document.getElementById('modal-descricao').textContent = planta.descricao;

        modal.classList.add('visivel');
    }

    // Função para fechar o modal
    function fecharModal() {
        modal.classList.remove('visivel');
    }

    // Adiciona o evento de clique na galeria
    galeria.addEventListener('click', (event) => {
        const card = event.target.closest('.planta-card');
        if (card) {
            abrirModal(card.dataset.id);
        }
    });

    // Eventos para fechar o modal
    modalCloseBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', (event) => {
        // Fecha o modal apenas se o clique for no fundo escuro (overlay)
        if (event.target === modal) {
            fecharModal();
        }
    });

    // Inicia a aplicação
    carregarPlantas();
});