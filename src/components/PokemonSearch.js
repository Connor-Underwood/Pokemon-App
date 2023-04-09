import React, { useState } from 'react';
import axios from 'axios';
import PokemonDetails from './PokemonDetails';
import PokemonTeam from './PokemonTeam';
import './PokemonSearch.css';

const PokemonSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(false); // Add a flag for search errors
  
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearchSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        const pokemon = response.data;
        setSearchResults([pokemon]);
        setSearchTerm('');
        setSearchError(false); // Reset the search error flag
      } catch (error) {
        console.error(error);
        setSearchResults([]);
        setSearchError(true); // Set the search error flag
      }
    };
  
    return (
      <div className="pokemon-search">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for a Pokemon"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button type="submit">Search</button>
        </form>
  
        {searchError ? (
          <div className="no-results">No Pokemon found</div>
        ) : (
          <div className="search-results">
            {searchResults.map((pokemon) => (
              <div key={pokemon.id} className="result">
                <PokemonDetails pokemon={pokemon} />
                <PokemonTeam pokemon={pokemon} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
export default PokemonSearch;
