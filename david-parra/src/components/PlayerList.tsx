import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { Player } from '../types/player';
import '../styles/PlayerList.css'; 

type PlayerListProps = {
  teamId: number;
}

const PlayerList: FC<PlayerListProps> = ({ teamId }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          `https://api.balldontlie.io/v1/players?team_ids[]=${teamId}`,
          {
            headers: {
              Authorization: `${process.env.REACT_APP_API_KEY}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data.data); // Extract players from the response
        setLoading(false);
      } catch (err) {
        setError('An error occurred');
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId]);

  const sortByDraftYear = () => {
    const sortedPlayers = [...players].sort((a, b) =>
      sortOrder === 'asc' ? a.draft_year - b.draft_year : b.draft_year - a.draft_year
    );
    setPlayers(sortedPlayers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };

  if (loading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <table className="player-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Jersey #</th>
            <th>College</th>
            <th onClick={sortByDraftYear} className="sortable-header">
              Draft Year {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th>Draft Round</th>
            <th>Draft Number</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.first_name}</td>
              <td>{player.last_name}</td>
              <td>{player.position}</td>
              <td>{player.jersey_number}</td>
              <td>{player.college}</td>
              <td>{player.draft_year}</td>
              <td>{player.draft_round}</td>
              <td>{player.draft_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;

