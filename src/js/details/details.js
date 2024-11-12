/*Função para buscar detalhes de um pokémon específico, na 4 tem a requisição para pegar os dados do pokémon, se da erro ele lança exceção, na 7 converte resposta em JSON e depois 
exibe os detalhes na página*/  
async function fetchPokemonDetails(id) {
    try {
        const response = await fetch(`${urlPokeApi}/${id}`); // R
        if (!response.ok) throw new Error('Erro ao buscar detalhes do Pokémon'); 
        const pokemon = await response.json();  
        displayPokemonDetails(pokemon);         
    } catch (error) {
        showError("Não foi possível carregar os detalhes do Pokémon."); 
        console.error(error);  
    }
}

// Função para exibir os detalhes do pokémon na página
function displayPokemonDetails(pokemon) {
    const pokemonDetails = document.getElementById('pokemon-details');  // Local onde os detalhes serão exibidos
    const imageUrl = `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`;  // URL da imagem do pokémon

    // Criação de uma string com as informações do pokémon
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');

    // Atualiza o HTML com as informações
    pokemonDetails.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${imageUrl}" alt="${pokemon.name}" class="img-fluid">
        <p>Altura: ${pokemon.height / 10}m</p>
        <p>Peso: ${pokemon.weight / 10}kg</p>
        <p>Tipos: ${types || 'Nenhum'}</p>
        <h3>Habilidades</h3>
        <p>${abilities || 'Nenhuma'}</p>
        <h3>Estatísticas</h3>
        <ul class="statistics">
            ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
        </ul>
    `;
}

// Pega o 'id' do pokémon da URL, na 42 ele pega o valor do parâmetro 'id', depois o IF determina que se 'id' for válido, busca os dados, caso não, exibe o erro
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); 

if (id) {
    fetchPokemonDetails(id);
} else {
    showError("ID do Pokémon não fornecido."); 
}
