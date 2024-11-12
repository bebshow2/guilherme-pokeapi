import { createCard } from "card/card.js";
import { listAllPokemons } from "fetchApi/fetchfunctions.js";
import { urlPokeApi } from "constants/constants.js";

let results = [];
let loading = false;
let offset = 0;
const limit = 20;

/*
Primeiramente começa fazendo uma chamada assíncrona à função listAllPokemons() para obter a lista de Pokémons
Segundamente em seguida, usa getAllPokemonDetails(pokemons) para buscar os detalhes completos de cada Pokémon
Terceiramente depois que todos os dados são carregados, chama a função applyFilterAndRender() para aplicar filtros e renderizar a lista de Pokémons na interface
Quartamente se ocorrer algum erro durante o processo, ele será capturado e exibido no console com a mensagem de erro.
*/

async function init() {
    try {
        const { results: pokemons } = await listAllPokemons();
        results = await getAllPokemonDetails(pokemons);
        applyFilterAndRender();
    } catch (error) {
        console.error("Erro ao carregar os Pokémons:", error);
    }
}

/*
Primeiramente ela faz uma requisição HTTP usando fetch para obter os dados do Pokémon na URL fornecida
Segundamente a resposta da requisição é convertida para formato JSON
Terceiramente retorna um novo objeto, incluindo o id do Pokémon e todos os outros dados obtidos da resposta
*/

async function getPokemonDetails(pokemon) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return { id: data.id, ...data };
}

/*
Primeiramente recebe uma lista de pokemons e usa o promise.all que busca os detalhes dos pokemons e retorna um array com as informações dos pokemons 
Segundamente filtra os pokemons com base no texto no campo de busca e no tipo selecionado no filtro
*/

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

/*
Primeiramente no document.getElementById é onde a lista será renderizada
Segundamente antes de adicionar novos itens a lista ela é limpa
Terceiramente filteredResults.forEach => {} é percorrido cada pokemon na lista e o filteredResults é o array filtrado e assim chamando a função createcard 
para criar os cards e sua visualização

*/

function renderPokemonList(filteredResults) {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = '';
    filteredResults.forEach(pokemon => {
        createCard(pokemon);
    });
}

/* 
Primeiramente verifica se variavel loading é true, se não for define como true
Segundamente a variavel offset é incrementada com valor limit e pega os proximos itens
Terceiramente pega requisição dos pokes api e passa url api para impor limit e o results armazena os pokemons
Quartamente pega lista de pokemons na função getAllPokemonDetails que é responsavel por dar os detalhes dos pokemons
Quintamente filtra os pokemons para que não haja duplicatas, usando o ID
Sextamente a lista é atualizada com as velhas e novas informações 
Setimamente chama função que aplica filtro e atualiza interface do usuario
Oitavamente caso de algum erro vai imprimir o erro
Novamente a variavel loading recebe falso depois de o carregamento for concluído 
*/

async function loadMorePokemons() {
    if (loading) return;
    loading = true;
    offset += limit;

    try {
        const { results: pokemons } = await listAllPokemons(`${urlPokeApi}?limit=${limit}&offset=${offset}`);
        
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

/*
Primeiramente o eventlistener é utilizado toda vez que pagina for rolada e verifica se rolou até final ou 100 px antes do final
Segundamente quando o conteudo da busca é alterado a função applyFilterAndRender é chamada
Terceiramente quando o tipo for alterado a função applyFilterAndRender é chamada também
Quartamente limpar pesquisa, quando clica no botão o campo de pesquisa vira uma string vazia e depois de ser esvaziada a função applyFilterAndRender
é chamada também para que os pokemons sejam rendezirados
*/

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
