import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";
import { urlPokeApi } from "./constants/constants.js";

let results = [];
let loading = false;
let offset = 0;
const limit = 20;

async function init() {
    try {
        const { results: pokemons } = await listAllPokemons();
        results = await getAllPokemonDetails(pokemons);
        applyFilterAndRender();
    } catch (error) {
        console.error("Erro ao carregar os Pokémons:", error);
    }
}

async function getPokemonDetails(pokemon) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return { id: data.id, ...data };
}

async function getAllPokemonDetails(pokemons) {
    const details = await Promise.all(pokemons.map(getPokemonDetails));
    return details;
}

function applyFilterAndRender() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedType = document.getElementById('type-filter').value;
    
    let filteredResults = results;
    
    if (searchTerm) {
        filteredResults = filteredResults.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    }
    
    if (selectedType) {
        filteredResults = filteredResults.filter(pokemon => pokemon.types.some(type => type.type.name === selectedType));
    }

    renderPokemonList(filteredResults);
}

function renderPokemonList(filteredResults) {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = '';
    filteredResults.forEach(pokemon => {
        createCard(pokemon);
    });
}

async function loadMorePokemons() {
    if (loading) return;
    loading = true;
    offset += limit;

    try {
        const { results: pokemons } = await listAllPokemons(`${urlPokeApi}?limit=${limit}&offset=${offset}`);
        
        // Verifica se os Pokémons já existem na lista para evitar duplicação
        const newResults = await getAllPokemonDetails(pokemons);
        const uniqueResults = newResults.filter(newPokemon => !results.some(existingPokemon => existingPokemon.id === newPokemon.id));

        results = [...results, ...uniqueResults];

        applyFilterAndRender();
    } catch (error) {
        console.error("Erro ao carregar mais Pokémons:", error);
    } finally {
        loading = false;
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMorePokemons();
    }
});

document.getElementById('search-input').addEventListener('input', applyFilterAndRender);
document.getElementById('type-filter').addEventListener('change', applyFilterAndRender);

document.getElementById('clear-search').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    document.getElementById('type-filter').value = '';
    applyFilterAndRender();
});

init();
