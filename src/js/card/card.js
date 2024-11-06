import { pokemonList } from "../constants/constants.js"

export function createCard(pokemon) {
    const card = `<div class="card" style="width: 18rem;">
                    <img src="https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">${pokemon.types.map(type => type.type.name).join(', ')}</p> <!-- Texto da tipagem -->
                        <a href="details.html?id=${pokemon.id}" class="btn btn-primary">Sobre</a>
                    </div>
                </div>`;

    if (pokemonList) {
        pokemonList.innerHTML += card;
    } else {
        console.error("Elemento pokemonList não encontrado.");
    }
}
