import { Link } from 'react-router-dom';
import './Pokemon.css';


function Pokemon({ name, image, id }) {
    return (
        <div className="pokemon-card">
            <Link to={`/pokemon/${id}`}>
                <img src={image} alt={name} />
                <div className="pokemon-card-name">{name}</div>
            </Link>
        </div>
    );
}

export default Pokemon;
