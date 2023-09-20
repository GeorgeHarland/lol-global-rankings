export type TeamType = {
  teamName: string;
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
  rank: number;
};
