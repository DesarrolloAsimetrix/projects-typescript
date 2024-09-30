import { useState } from 'react';
import type { FC } from 'react';
import TeamList from './components/TeamList';
import PlayerList from './components/PlayerList';
import { teams } from './data/teams';
import { Team } from './types/team';
import './App.css';

const App: FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleGoBack = () => {
    setSelectedTeam(null);  // Reset the selected team to show the card view again
  };

  return (
    <div>
      <h1>NBA Teams</h1>

      {/* Conditionally render the team cards or player list */}
      {selectedTeam ? (
        <div>
          <PlayerList teamId={selectedTeam.id} />  {/* Fetch players based on team id */}
          <div className="button-container">
          <button onClick={handleGoBack} className="back-button">
            Back to Teams
          </button>
          </div>
        </div>
      ) : (
        <TeamList teams={teams} onSelectTeam={handleSelectTeam} />
      )}
    </div>
  );
};

export default App;

