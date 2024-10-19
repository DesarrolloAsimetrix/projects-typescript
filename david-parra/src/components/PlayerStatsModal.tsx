import React, { useEffect, useState } from 'react';
import { Modal, Typography, Descriptions, Spin, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { PlayerStats, PlayerStatsModalProps } from '../types/stats';

const { Title, Text } = Typography;

const PlayerStatsModal: React.FC<PlayerStatsModalProps> = ({ 
  playerId, 
  season, 
  isOpen, 
  onClose, 
  playerName, 
  position, 
  jerseyNumber 
}) => {
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && playerId && season) {
      const fetchPlayerStats = async () => {
        setLoading(true);
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

  const renderStats = () => {
    if (loading) {
      return <Spin size="large" />;
    }

    if (!stats) {
      return <Text>No stats available for this season.</Text>;
    }

    return (
      <Descriptions bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
        <Descriptions.Item label="Points">{stats.pts}</Descriptions.Item>
        <Descriptions.Item label="Assists">{stats.ast}</Descriptions.Item>
        <Descriptions.Item label="Rebounds">{stats.reb}</Descriptions.Item>
        <Descriptions.Item label="Steals">{stats.stl}</Descriptions.Item>
        <Descriptions.Item label="Blocks">{stats.blk}</Descriptions.Item>
        <Descriptions.Item label="Turnovers">{stats.turnover}</Descriptions.Item>
        <Descriptions.Item label="Personal Fouls">{stats.pf}</Descriptions.Item>
        <Descriptions.Item label="FG Attempted">{stats.fga}</Descriptions.Item>
        <Descriptions.Item label="FG Made">{stats.fgm}</Descriptions.Item>
        <Descriptions.Item label="FT Attempted">{stats.fta}</Descriptions.Item>
        <Descriptions.Item label="FT Made">{stats.ftm}</Descriptions.Item>
        <Descriptions.Item label="3PT Attempted">{stats.fg3a}</Descriptions.Item>
        <Descriptions.Item label="3PT Made">{stats.fg3m}</Descriptions.Item>
        <Descriptions.Item label="Off. Rebounds">{stats.oreb}</Descriptions.Item>
        <Descriptions.Item label="Def. Rebounds">{stats.dreb}</Descriptions.Item>
        <Descriptions.Item label="FG %">{(stats.fg_pct * 100).toFixed(1)}%</Descriptions.Item>
        <Descriptions.Item label="3PT %">{(stats.fg3_pct * 100).toFixed(1)}%</Descriptions.Item>
        <Descriptions.Item label="FT %">{(stats.ft_pct * 100).toFixed(1)}%</Descriptions.Item>
        <Descriptions.Item label="Minutes">{stats.min}</Descriptions.Item>
        <Descriptions.Item label="Games Played">{stats.games_played}</Descriptions.Item>
      </Descriptions>
    );
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <div>
            <Title level={4} style={{ margin: 0 }}>{playerName}</Title>
            <Text>Position: {position}</Text>
            <br />
            <Text>Jersey #: {jerseyNumber}</Text>
          </div>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      {renderStats()}
    </Modal>
  );
};

export default PlayerStatsModal;
