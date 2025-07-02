import './Pokemon.css';

function Pokemon({ name, image }) {
    return (
        <div className="pokemon-card">
            <img src={image} alt={name} />
            <div className="pokemon-card-name">{name}</div>
        </div>
    );
}

export default Pokemon;
