import type { FC } from 'react';
import type { Team } from '../types/team';
import '../styles/TeamList.css';

type TeamListProps = {
  teams: Team[];
  onSelectTeam: (team: Team) => void;
}

const TeamList: FC<TeamListProps> = ({ teams, onSelectTeam }) => {
  return (
    <div className="team-list">
      {teams.map((team) => (
        <div className="team-card" key={team.abbreviation} onClick={() => onSelectTeam(team)}>
          <img src={team.logo} alt={`${team.name} logo`} className="team-logo" />
          <div className="team-name">{team.name}</div>
        </div>
      ))}
    </div>
  );
};

export default TeamList;

