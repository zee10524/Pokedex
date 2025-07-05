import { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon.jsx';

function PokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: '',
    });

    async function downloadPokemons() {
        try {
            setPokemonListState((prevState) => ({
                ...prevState,
                isLoading: true,
            }));

            const response = await axios.get(pokemonListState.pokedexUrl);
            const pokemonResults = response.data.results;

            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            const pokemonData = await axios.all(pokemonResultPromise);

            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default,
                    types: pokemon.types,
                };
            });

            setPokemonListState((prevState) => ({
                ...prevState,
                pokemonList: pokeListResult,
                isLoading: false,
                nextUrl: response.data.next,
                prevUrl: response.data.previous,
            }));
        } catch (error) {
            console.error("Failed to download pokemons", error);
            setPokemonListState((prevState) => ({
                ...prevState,
                isLoading: false,
            }));
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);

    function handlePrev() {
        if (pokemonListState.prevUrl) {
            setPokemonListState((prevState) => ({
                ...prevState,
                pokedexUrl: pokemonListState.prevUrl,
            }));
        }
    }

    function handleNext() {
        if (pokemonListState.nextUrl) {
            setPokemonListState((prevState) => ({
                ...prevState,
                pokedexUrl: pokemonListState.nextUrl,
            }));
        }
    }

    return (
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            <div className='pokemon-wrapper'>
                {
                    pokemonListState.isLoading ? 'Loading....' :
                    pokemonListState.pokemonList.map((p) => (
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                    ))
                }
            </div>

            <div className='controls'>
                <button onClick={handlePrev} disabled={!pokemonListState.prevUrl}>
                    Prev
                </button>
                <button onClick={handleNext} disabled={!pokemonListState.nextUrl}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;
