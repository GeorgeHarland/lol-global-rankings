export type TeamType = {
  teamName: string;
  teamCode: string;
  teamIconUrl?: string;
  rank: number;
  enhancedRating: number; // OPTIONAL FOR NOW SINCE DOESN'T EXIT
  eloRating: number;
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

export type TeamInfo = {
  name: string;
  abbreviation: string;
};
