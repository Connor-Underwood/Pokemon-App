import React from 'react';
import './PokemonDetails.css';

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) {
    return <div className="no-results">No Pokemon found</div>;
  }

  const { name, sprites, types, stats, abilities } = pokemon;

  return (
    <div className="pokemon-details">
      <h2>{name}</h2>
      <div className="stats-container">
        <h3>Stats</h3>
        {stats.map((statObj, index) => (
          <div key={index} className="stats">
            {statObj.stat.name}: {statObj.base_stat}
          </div>
        ))}
      </div>
      <img className="pokemon-image" src={sprites.front_default} alt={name} />
      <div className="abilities-container">
        <h3>Abilities</h3>
        {abilities.map((abilityObj, index) => (
          <div key={index} className="ability">
            {abilityObj.ability.name}
          </div>
        ))}
      </div>
      <div className="types">
        {types.map((typeObj, index) => (
          <div key={index} className="type">
            {typeObj.type.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonDetails;
