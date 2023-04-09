import React from 'react';
import './PokemonDetails.css';
import { database } from '../firebase';
import { ref, push, get, remove } from 'firebase/database';
import { useState } from 'react';

const PokemonDetails = ({ pokemon }) => {
  const [lengthError, setLengthError] = useState(false);
  const [teamError, setTeamError] = useState(false);
  const [removeTeamError, setRemoveTeamError] = useState(false);
  const [teamCleared, setTeamCleared] = useState(false);
  const [pokemonAdded, setPokemonAdded] = useState(false);

  if (!pokemon) {
    return <div className="no-results">No Pokemon found</div>;
  }

  const { name, sprites, types, stats, abilities } = pokemon;

  const checkIfPokemonInTeam = async (pokemonName) => {
    const pokemonTeamRef = ref(database, 'pokemonTeam');
    const snapshot = await get(pokemonTeamRef);
    const pokemonTeam = snapshot.val();
    if (pokemonTeam) {
      const pokemonNames = Object.values(pokemonTeam).map((pokemon) => pokemon.name);
      return pokemonNames.includes(pokemonName);
    } else {
      return false;
    }
  };

  const ableToAdd = async () => {
    const pokemonTeamRef = ref(database, 'pokemonTeam');
    const snapshot = await get(pokemonTeamRef);
    const pokemonTeam = snapshot.val();
    if (pokemonTeam) {
      const pokemonNames = Object.values(pokemonTeam).map((pokemon) => pokemon.name);
      for (pokemon in pokemonNames) {
        console.log(pokemon);
      }
      if (pokemonNames.length >= 6) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  
  
  
  const handleAddToTeamClick = async () => {
    const isPokemonInTeam = await checkIfPokemonInTeam(name);
    const checkLength = await ableToAdd(name);
    if (checkLength) {
      if (!isPokemonInTeam) {
        push(ref(database, 'pokemonTeam'), {
          name,
          image: sprites.front_default,
          types: types.map(typeObj => typeObj.type.name),
        });
        setPokemonAdded(true);
      } else {
        setTeamError(true);
      }
    } else {
      setLengthError(true);
    }
  };

  const handleClearTeamClick = async () => {
    const pokemonTeamRef = ref(database, 'pokemonTeam');
    remove(pokemonTeamRef).then(() => {
      console.log("remove successful");
      setTeamCleared(true);
    }).catch((error) => {
      console.log("remove failed");
      console.log(error);
      setRemoveTeamError(true);
    })
  }

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
      <button className='add-team-button' onClick={handleAddToTeamClick}>Add to Team</button>
      { pokemonAdded && (
        <div>Pokemon added!</div>
      )}
      {teamError && (
        <div>
          <h3>This Pokemon is already on your team!</h3>
        </div>
      )}
      {lengthError && (
        <div>
          <h3>Your team already has 6 pokemon!</h3>
        </div>
      )}

    <div>
      <button className='remove-pokemon-button' onClick={handleClearTeamClick}>Clear Team</button>
      { removeTeamError && (
        <div>Could not remove team!</div>
      )}
      {
        teamCleared && (
          <div>Team cleared!</div>
        )
      }
    </div>
    </div>
  );
};

export default PokemonDetails;
