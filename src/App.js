import React, { useState, useEffect } from 'react';
import PokemonSearch from './components/PokemonSearch';
import PokemonBackground from './images/forest.jpg';
import './App.css'
const App = () => {
  return (
    <div className="container">
      <img className="background" src={PokemonBackground} alt="Forest"/>
      <PokemonSearch></PokemonSearch>
    </div>
  );
};

export default App;
