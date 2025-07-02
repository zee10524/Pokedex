import Search from "../Search/Search";
import "./Pokedex.css";
import PokemonList from "../PokemonList/PokemonList";
function Pokedex(){

       return (
          
                <div className="pokedex-wrapper">
                    <h1>Pokedex</h1>
                    <Search />
                    <PokemonList/>
                </div>

            
       );
}

export default Pokedex;