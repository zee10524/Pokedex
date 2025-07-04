import { Routes, Route } from "react-router-dom";
import Pokedex from "../Pokedex/Pokedex";
import PokemonDetails from "../PokemonDetails/PokemonDetails.jsx";

function CustomRoute() {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    );
}

export default CustomRoute;
