import { pokemonList } from "../constants/constants.js";

export function createCard(pokemon) {
    // URL da imagem do pokémon
    const imageUrl = `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`;

    // Formata o número do pokémon para ter 3 dígitos
    const pokeNumber = pokemon.id.toString().padStart(3, '0');

    // Cria o código HTML do card
    const card = `
        <div class="card" style="width: 18rem;">
            <img src="${imageUrl}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">
                    #${pokeNumber} ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h5>
                <p class="card-text">
                    Tipos: ${pokemon.types.map(type => type.type.name).join(', ')}
                </p>
                <a href="details.html?id=${pokemon.id}" class="btn btn-primary">Sobre</a>
            </div>
        </div>
    `;

    // Encontra o elemento onde os cards serão adicionados, adiciona o card a lista, caso nao encontre ele exibe o console.error
    const pokemonList = document.getElementById("pokemon-list");

    if (pokemonList) {
        pokemonList.innerHTML += card; 
    } else {
        console.error("Elemento pokemonList não encontrado.");
    }
}
