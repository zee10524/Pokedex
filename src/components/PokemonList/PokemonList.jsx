import { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon.jsx';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons() {
        try {
            setIsLoading(true); // <- Important: set loading to true before fetch
            const response = await axios.get(pokedexUrl); // list of 20 pokemons
            const pokemonResults = response.data.results;

            setNextUrl(response.data.next);     // ❌ you had = instead of () => inside setNextUrl
            setPrevUrl(response.data.previous); // ❗ "previous", not "prev"

            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            const pokemonData = await axios.all(pokemonResultPromise);

            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default,
                    types: pokemon.types
                };
            });

            setPokemonList(pokeListResult);
        } catch (error) {
            console.error("Failed to download pokemons", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className='pokemon-wrapper'>
                {
                    isLoading ? 'Loading....' :
                    pokemonList.map((p) => (
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                    ))
                }
            </div>

            <div className='controls'>
                <button
                    onClick={() => prevUrl && setPokedexUrl(prevUrl)}
                    disabled={!prevUrl}
                >
                    Prev
                </button>
                <button
                    onClick={() => nextUrl && setPokedexUrl(nextUrl)}
                    disabled={!nextUrl}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
