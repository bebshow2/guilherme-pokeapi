import { pokemonList } from "../constants/constants.js"

export function createCard(pokemon, index) {
    console.log(pokemon);

    const card = `<div class="card" style="width: 18rem;">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text">Clique para mais informações sobre ${pokemon.name}!</p>
                        <a href="details.html?id=${index}" class="btn btn-primary">Ver mais</a> <!-- Link para a página de detalhes -->
                    </div>
                </div>`

    // Verifica se pokemonList está disponível
    if (pokemonList) {
        pokemonList.innerHTML += card;
    } else {
        console.error("Elemento pokemonList não encontrado.");
    }
}