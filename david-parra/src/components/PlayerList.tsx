import { useEffect, useState, ChangeEvent } from 'react';
import type { FC } from 'react';
import type { Player } from '../types/player';
import '../styles/PlayerList.css'; 
import PlayerStatsModal from './PlayerStatsModal';

type PlayerListProps = {
  teamId: number;
}

const PlayerList: FC<PlayerListProps> = ({ teamId }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openPlayerModal = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closePlayerModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          `https://api.balldontlie.io/v1/players/active?team_ids[]=${teamId}`,
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
        setFilteredPlayers(data.data); // Initially show all players
        setLoading(false);
      } catch (err) {
        setError('An error occurred');
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId]);

  const sortByDraftYear = (playersToSort: Player[]) => {
    const sortedPlayers = [...playersToSort].sort((a, b) =>
      sortOrder === 'asc' ? a.draft_year - b.draft_year : b.draft_year - a.draft_year
    );
    setFilteredPlayers(sortedPlayers); // Set sorted players to the filtered list
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };
  
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter players by first name or last name based on the search query
    const filtered = players.filter(player =>
      player.first_name.toLowerCase().includes(query) ||
      player.last_name.toLowerCase().includes(query)
    );
    setFilteredPlayers(filtered);
  };

  if (loading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first or last name..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="player-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Jersey #</th>
            <th>College</th>
            <th onClick={() => sortByDraftYear(filteredPlayers)} className="sortable-header">
              Draft Year {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th>Draft Round</th>
            <th>Draft Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id}>
              <td>
                <span className="clickable-name" onClick={() => openPlayerModal(player)}>
                  {`${player.first_name} ${player.last_name}`}
                </span>
              </td>
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
      {selectedPlayer && (
        <PlayerStatsModal
          playerId={selectedPlayer.id}
          season={2023}  // You can make this dynamic if needed
          isOpen={isModalOpen}
          onClose={closePlayerModal}
          playerName={`${selectedPlayer.first_name} ${selectedPlayer.last_name}`}
          position={selectedPlayer.position}
          jerseyNumber={selectedPlayer.jersey_number}
        />
      )}
    </div>
  );
};

export default PlayerList;

