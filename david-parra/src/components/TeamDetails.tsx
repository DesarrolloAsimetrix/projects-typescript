import type { FC } from 'react';
import { Team } from '../types/team';
import PlayerList from './PlayerList';  // Ensure you're importing PlayerList

type TeamDetailsProps ={
  team: Team;
}

const TeamDetails: FC<TeamDetailsProps> = ({ team }) => {
  return (
    <div>
      <h2>{team.name} Players</h2>
      {/* Pass the teamId to PlayerList to fetch players dynamically */}
      <PlayerList teamId={team.id} />
    </div>
  );
};

export default TeamDetails;

