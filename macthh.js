document.addEventListener('DOMContentLoaded', () => {
    const userId = 1; // ID do usuário atual, você pode ajustar conforme necessário

    // Função para buscar os matches do usuário
    function getMatches() {
        fetch(`/match/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.matches.length > 0) {
                    displayMatches(data.matches);
                }
            })
            .catch(error => console.error('Erro ao buscar matches:', error));
    }

    // Função para exibir os matches na tela
    function displayMatches(matches) {
        const userCards = document.getElementById('user-cards');
        userCards.innerHTML = '';

        matches.forEach(match => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h2>${match.nome}</h2>
                <p>Idade: ${match.idade}</p>
                <p>Jogos Favoritos: ${match.jogos_favoritos.join(', ')}</p>
            `;
            card.classList.add('show');
            userCards.appendChild(card);
        });
    }

    // Chama a função para buscar os matches quando a página carrega
    getMatches();
});
