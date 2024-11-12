import { urlPokeApi } from "../constants/constants.js";
import showError from "../errors/errors.js";

/*
Na 4 Faz a requisição para a API, em sequencia converte a resposta em JSON, seguida retorna os dados dos pokémons, 
se não mostra mensagem de erro e abaixo mostra o erro no console
*/
export async function listAllPokemons(urlApi = `${urlPokeApi}?limit=151&offset=0`) {
    try {
        const response = await fetch(urlApi);  
        const data = await response.json();    
        return data;                          
    } catch (error) {                        
        showError("Ops! Um erro inesperado ocorreu ao carregar a lista de pokémons!"); 
        console.error(error.message);          
    }
}
