import { useEffect, useState } from 'react';
import { Table, Input, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { FC } from 'react';
import type { Player } from '../types/player';
import '../styles/PlayerList.css'; 
import PlayerStatsModal from './PlayerStatsModal';


const { Search } = Input;
const { Text } = Typography;

type PlayerListProps = {
  teamId: number;
}

const PlayerList: FC<PlayerListProps> = ({ teamId }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('ascend');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        setPlayers(data.data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching players');
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const openPlayerModal = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const closePlayerModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(false);
  };

  const columns: ColumnsType<Player> = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <a onClick={() => openPlayerModal(record)}>{`${record.first_name} ${record.last_name}`}</a>
      ),
      sorter: (a, b) => `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Jersey #',
      dataIndex: 'jersey_number',
      key: 'jersey_number',
    },
    {
      title: 'College',
      dataIndex: 'college',
      key: 'college',
    },
    {
      title: 'Draft Year',
      dataIndex: 'draft_year',
      key: 'draft_year',
      sorter: (a, b) => a.draft_year - b.draft_year,
      sortOrder: sortOrder,
    },
    {
      title: 'Draft Round',
      dataIndex: 'draft_round',
      key: 'draft_round',
    },
    {
      title: 'Draft Number',
      dataIndex: 'draft_number',
      key: 'draft_number',
    },
  ];

  if (error) {
    return <Text type="danger">{error}</Text>;
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Search
        placeholder="Search by first or last name..."
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        dataSource={players.filter(player =>
          player.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters, sorter) => {
          if (Array.isArray(sorter)) return;
          if (sorter.field === 'draft_year') {
            setSortOrder(sorter.order || 'ascend');
          }
        }}
      />
      {selectedPlayer && (
        <PlayerStatsModal
          playerId={selectedPlayer.id}
          season={2023}
          isOpen={isModalOpen}
          onClose={closePlayerModal}
          playerName={`${selectedPlayer.first_name} ${selectedPlayer.last_name}`}
          position={selectedPlayer.position}
          jerseyNumber={selectedPlayer.jersey_number}
        />
      )}
    </Space>
  );
};

export default PlayerList;
