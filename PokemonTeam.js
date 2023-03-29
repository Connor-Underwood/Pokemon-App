import React from 'react';
import { useState, useEffect } from 'react';
import './PokemonTeam.css';
import { database, auth } from '../firebase';
import { ref, push, set, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const PokemonTeam = ({ pokemon }) => {
  const [team, setTeam] = useState([]);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');

  const saveTeamToDatabase = (team) => {
    console.log("saveTeamToDataBase called with: ", team);
  
    const teamRef = ref(database, 'my_team');
    onValue(teamRef, (snapshot) => {
      const existingTeamData = snapshot.val() || {};
      const mergedTeamData = { ...existingTeamData, ...team };
      set(teamRef, mergedTeamData);
    });
  };
  
  
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User state changed: ", user);
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
  
    const teamRef = ref(database, `teams/${userId}`);
    onValue(teamRef, (snapshot) => {
      const teamData = snapshot.val();
      if (teamData) {
        setTeam(Object.values(teamData));
      } else {
        setTeam([]); // Reset the team when there's no data in the database
      }
    });
  }, [userId]);
  

  const handleAddTeam = (event) => {
    event.preventDefault();

    console.log("handleAddTeam called");

    if (team.length >= 6) {
      setMessage('You already have 6 Pokemon on your team!');
      return;
    }

    if (team.some((teamMember) => teamMember.id === pokemon.id)) {
      setMessage('This Pokemon is already in your team!');
      return;
    }

    const newTeam = [...team, pokemon];
    setTeam(newTeam);
    saveTeamToDatabase(newTeam);
    setMessage('Pokemon added to your team!');
  };

  if (!pokemon) {
    return null;
  }

  return (
    <div className="pokemon-team">
      <button onClick={handleAddTeam}>Add to team</button>
      <div className="team">
        {team.map((teamMember) => (
          <div key={teamMember.id} className="team-member">
            {teamMember.name}
          </div>
        ))}
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

export default PokemonTeam;
