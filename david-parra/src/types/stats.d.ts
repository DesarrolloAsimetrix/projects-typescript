export type PlayerStatsModalProps = {
  playerId: number;
  season: number;
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  position: string;
  jerseyNumber: string;
}

export type PlayerStats = {
  pts: number;
  ast: number;
  turnover: number;
  pf: number;
  fga: number;
  fgm: number;
  fta: number;
  ftm: number;
  fg3a: number;
  fg3m: number;
  reb: number;
  oreb: number;
  dreb: number;
  stl: number;
  blk: number;
  fg_pct: number;
  fg3_pct: number;
  ft_pct: number;
  min: string;
  games_played: number;
}
