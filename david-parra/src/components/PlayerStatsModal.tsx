import { useEffect, useState } from 'react';
import type { PlayerStats, PlayerStatsModalProps } from '../types/stats';

const PlayerStatsModal: React.FC<PlayerStatsModalProps> = ({ playerId, season, isOpen, onClose, playerName, position, jerseyNumber }) => {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && playerId && season) {
      const fetchPlayerStats = async () => {
        setLoading(true);
        console.log('Fetching player stats...');
        console.log(`https://api.balldontlie.io/v1/season_averages?season=${season}&player_ids[]=${playerId}`);
        try {
          const response = await fetch(
            `https://api.balldontlie.io/v1/season_averages?season=${season}&player_id=${playerId}`,
{
            headers: {
              Authorization: `${process.env.REACT_APP_API_KEY}`,
            },
          }

          );
          const data = await response.json();
          setStats(data.data[0]); // Assuming there's always one record for a player
        } catch (error) {
          console.error('Failed to fetch player stats:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPlayerStats();
    }
  }, [isOpen, playerId, season]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">Close</button>
        <div className="modal-header">
          <h3>{playerName}</h3>
          <p>Position: {position}</p>
          <p>Jersey #: {jerseyNumber}</p>
          <div className="player-image-placeholder">Image placeholder</div>
        </div>
        
        {loading ? (
          <p>Loading stats...</p>
        ) : stats ? (
          <div className="stats-grid">
            <div><strong>Points:</strong> {stats.pts}</div>
            <div><strong>Assists:</strong> {stats.ast}</div>
            <div><strong>Turnovers:</strong> {stats.turnover}</div>
            <div><strong>Personal Fouls:</strong> {stats.pf}</div>
            <div><strong>Field Goals Attempted:</strong> {stats.fga}</div>
            <div><strong>Field Goals Made:</strong> {stats.fgm}</div>
            <div><strong>Free Throws Attempted:</strong> {stats.fta}</div>
            <div><strong>Free Throws Made:</strong> {stats.ftm}</div>
            <div><strong>3PT Attempted:</strong> {stats.fg3a}</div>
            <div><strong>3PT Made:</strong> {stats.fg3m}</div>
            <div><strong>Rebounds:</strong> {stats.reb}</div>
            <div><strong>Offensive Rebounds:</strong> {stats.oreb}</div>
            <div><strong>Defensive Rebounds:</strong> {stats.dreb}</div>
            <div><strong>Steals:</strong> {stats.stl}</div>
            <div><strong>Blocks:</strong> {stats.blk}</div>
            <div><strong>Field Goal %:</strong> {stats.fg_pct * 100}%</div>
            <div><strong>3PT %:</strong> {stats.fg3_pct * 100}%</div>
            <div><strong>Free Throw %:</strong> {stats.ft_pct * 100}%</div>
            <div><strong>Minutes:</strong> {stats.min}</div>
            <div><strong>Games Played:</strong> {stats.games_played}</div>
          </div>
        ) : (
          <p>No stats available for this season.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerStatsModal;
