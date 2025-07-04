import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
          name: response.data.name,
          image: response.data.sprites.other.dream_world.front_default,
          weight: response.data.weight,
          height: response.data.height,
          types: response.data.types.map((t) => t.type.name),
        });
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    }

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div className="loading">Loading Pokémon...</div>;
  }

  return (
    <div className="pokemon-detail-container">
      <h2 className="pokemon-name">{pokemon.name}</h2>
      {pokemon.image && (
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="pokemon-image"
        />
      )}
      <div className="pokemon-info">
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
        <p>
          <strong>Types:</strong> {pokemon.types.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default PokemonDetails;
