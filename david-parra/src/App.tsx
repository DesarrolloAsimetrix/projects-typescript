import { useState } from 'react';
import { Layout, Typography, Card, Button, theme } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import TeamList from './components/TeamList';
import PlayerList from './components/PlayerList';
import { teams } from './data/teams';
import { Team } from './types/team';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { token } = theme.useToken();

  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleGoBack = () => {
    setSelectedTeam(null);  // Reset the selected team to show the card view again
  };

    return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: token.colorPrimary }}>
        <Title level={2} style={{ color: token.colorWhite, margin: 0 }}>NBA Teams</Title>
      </Header>
      <Content style={{ padding: '24px' }}>
        <Card>
          {selectedTeam ? (
            <div>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={handleGoBack}
                style={{ marginBottom: 16 }}
              >
                Back to Teams
              </Button>
              <Title level={3}>{selectedTeam.name} Players</Title>
              <PlayerList teamId={selectedTeam.id} />
            </div>
          ) : (
            <div>
              <Title level={3}>Select a Team</Title>
              <TeamList teams= {teams} onSelectTeam={handleSelectTeam} />
            </div>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default App;

