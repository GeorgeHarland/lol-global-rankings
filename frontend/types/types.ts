export type TeamType = {
  teamName: string;
  teamIconUrl?: string;
  globalRank: number;
  championshipRating: number;
  playerRating: number;
  longevity: number;
  currentRoster?: PlayerType[];
};

type PlayerType = {
  playerId: string;
  summonerName: string;
  role: string;
};

export type RankingType = {
  team_id: string;
  team_code: string;
  team_name: string;
  team_icon_url: string;
  total_wins: number;
  total_losses: number;
  total_winrate: number;
  tournaments_participated_in: Array<string>;
  home_region: string;
  current_roster: PlayerType[];
  rank: number;
};
