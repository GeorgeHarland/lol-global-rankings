# API Design

## Team Data

/teams<br />
/teams/{team_name}

Fetches data about a team, or gets all teams if none specified

Params:
- team_name (path, string): the team to find data for

Response:
```
{
  team_id: string - unique team id
  team_code: string - quick acronym for the team
  team_name: string - full name
  team_icon_url: string - url to find the team logo
  total_wins: number
  total_losses: number
  total_winrate: number
  average_game_duration: number
  home_region: string
  current_roster: [
    {
      player_id: string - unique player id
      summoner_name: string - esports username
      role: string - position they play in league
    }
  ]
}
```

## Global Rankings

/global_rankings

Fetches the global top X teams. Default is 20.

Params:
- number_of_teams (query, number): Number of teams to return a ranking for

Response:
```
[
  {
    team_id: string - unique team id
    team_code: string - quick acronym for the team
    team_name: string - full name
    rank: number - global rank
  }
]
```

## Tournament Rankings

/tournament_rankings/{tournament_id}

Get time-adjusted rankings for a given tournament.

Params:
- tournament_id (path, string, required): Unique id for the tournament
- stage (query, string): Stage of the tournament to return rankings for

Response:
```
[
  {
    team_id: string - unique team id
    team_code: string - quick acronym for the team
    team_name: string - full name
    rank: number - global rank
  }
]
```

## Team Rankings

/team_rankings

Get rankings based on a list of teams

Params:
- team_ids (query, array[string], required): Team ids to provide a ranking based off

Response:
```
[
  {
    team_id: string - unique team id
    team_code: string - quick acronym for the team
    team_name: string - full name
    rank: number - global rank
  }
]
```
