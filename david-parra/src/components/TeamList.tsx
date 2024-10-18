import type { FC } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import type { Team } from '../types/team';
import '../styles/TeamList.css';

const { Meta } = Card;
const { Text } = Typography;

type TeamListProps = {
  teams: Team[];
  onSelectTeam: (team: Team) => void;
}

const TeamList: FC<TeamListProps> = ({ teams, onSelectTeam }) => {
  return (
    <Row gutter={[16, 16]}>
      {teams.map((team) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={3} key={team.abbreviation}>
          <Card
            hoverable
            cover={
              <div style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
                <img 
                  src={team.logo} 
                  alt={`${team.name} logo`} 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                />
              </div>
            }
            onClick={() => onSelectTeam(team)}
          >
            <Meta
              title={<Text strong>{team.name}</Text>}
              description={<Text type="secondary">{team.abbreviation}</Text>}
            />
          </Card>
        </Col>
      ))}
    </Row>
  )
};

export default TeamList;

