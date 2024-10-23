import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";

console.log("carregou!");

const { count, results } = await listAllPokemons();
console.log("pokemons (results): ", results);

results.forEach((pokemon, index) => {
    createCard(pokemon, index + 1);
});

const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const pokemonList = document.getElementById("pokemon-list");
    
    pokemonList.innerHTML = '';

    results.forEach((pokemon, index) => {
        if (pokemon.name.toLowerCase().includes(searchTerm)) {
            createCard(pokemon, index + 1);
        }
    });
});