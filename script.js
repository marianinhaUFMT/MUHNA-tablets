// Este é o script universal que será usado por todas as páginas quadroX.html
document.addEventListener('DOMContentLoaded', () => {

    // 1. VERIFICA SE OS DADOS DA PLANTA EXISTEM NA PÁGINA ATUAL
    if (typeof dadosDasPlantas === 'undefined') {
        console.log("Página sem dados de plantas definidos. O script não fará nada.");
        return;
    }

    // 2. SELECIONA OS ELEMENTOS DO MODAL
    const modal = document.getElementById('modal-planta');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    if (!modal || !closeModalBtn) return;

    // 3. FUNÇÃO PARA ABRIR O MODAL E PREENCHER COM DADOS
    function abrirModal(idPlanta) {
        const planta = dadosDasPlantas[idPlanta];
        if (!planta) {
            console.error(`Planta com o ID '${idPlanta}' não foi encontrada nos dados.`);
            return;
        }

        // Preenche os textos do modal
        modal.querySelector('#modal-titulo').textContent = planta.titulo;
        modal.querySelector('#modal-nome-cientifico').innerHTML = `<i>${planta.nomeCientifico}</i>`;
        modal.querySelector('#modal-descricao').textContent = planta.descricao;
        
        // Define a imagem principal do modal
        const modalImg = modal.querySelector('#modal-img');
        if (planta.imagemPrincipal) {
            modalImg.src = planta.imagemPrincipal;
            modalImg.style.display = 'block';
        } else {
            modalImg.style.display = 'none';
        }

        // Preenche a galeria de imagens extra, se houver
        const galeriaContainer = modal.querySelector('#modal-galeria');
        const galeriaWrapper = document.querySelector('.modal-galeria-container');

        if (galeriaContainer && planta.galeria && planta.galeria.length > 0) {
            galeriaContainer.innerHTML = ''; // Limpa a galeria
            planta.galeria.forEach(urlImagem => {
                const novaImagem = document.createElement('img');
                novaImagem.src = urlImagem;
                novaImagem.alt = `Foto de ${planta.titulo}`;
                galeriaContainer.appendChild(novaImagem);
            });
            galeriaWrapper.style.display = 'block';
        } else if (galeriaWrapper) {
            galeriaWrapper.style.display = 'none';
        }
        
        modal.classList.add('visivel');
    }

    // 4. VERIFICA SE A PÁGINA TEM UM MAPA DE IMAGEM (MÚLTIPLAS FOLHAS)
    const areasClicaveis = document.querySelectorAll('area[data-planta]');
    if (areasClicaveis.length > 0) {
        areasClicaveis.forEach(area => {
            area.addEventListener('click', (event) => {
                event.preventDefault();
                const idPlanta = area.dataset.planta;
                abrirModal(idPlanta);
            });
        });
    }

    // 5. VERIFICA SE A PÁGINA TEM UMA IMAGEM ÚNICA CLICÁVEL
    const imagemUnicaClicavel = document.getElementById('folha-clicavel');
    if (imagemUnicaClicavel) {
        imagemUnicaClicavel.addEventListener('click', () => {
            const idPlanta = Object.keys(dadosDasPlantas)[0];
            abrirModal(idPlanta);
        });
    }

    // 6. LÓGICA PARA FECHAR O MODAL
    function fecharModal() {
        modal.classList.remove('visivel');
    }

    closeModalBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });
});