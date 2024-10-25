import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";

console.log("carregou!");

const { count, results } = await listAllPokemons();
console.log("pokemons (results): ", results);

// Função para renderizar a lista de Pokémon
function renderPokemonList(filteredResults) {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = '';
    filteredResults.forEach((pokemon, index) => {
        createCard(pokemon, index + 1);
    });
}

renderPokemonList(results); // Renderiza a lista completa inicialmente

const searchInput = document.getElementById('search-input');
const clearSearchButton = document.getElementById('clear-search');
const typeFilter = document.getElementById('type-filter');

// Evento para mostrar ou esconder o botão "X"
searchInput.addEventListener('input', () => {
    clearSearchButton.style.display = searchInput.value ? 'block' : 'none';
    filterPokemonList();
});

// Evento para limpar a caixa de texto
clearSearchButton.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchButton.style.display = 'none';
    filterPokemonList(); // Renderiza a lista completa
});

// Evento para filtrar por tipo
typeFilter.addEventListener('change', () => {
    filterPokemonList();
});

// Função para filtrar a lista de Pokémon
function filterPokemonList() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    const filteredResults = results.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);
        const matchesType = selectedType ? pokemon.types.some(type => type.type.name === selectedType) : true;
        return matchesSearch && matchesType;
    });

    renderPokemonList(filteredResults);
}
