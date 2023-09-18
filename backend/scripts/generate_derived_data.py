import json

def generate_team_data(teams_data, tournaments_data, players_data):
    team_details = {}

    for team in teams_data:
        team_id = team["team_id"]
        wins = 0
        losses = 0
        total_games_played = 0
        
        # Get players of the current team
        current_roster = [
            {
                "player_id": player["player_id"],
                "summoner_name": player["summoner_name"],
                "role": player["role"]
            }
            for player in players_data if player["team_id"] == team_id
        ]

        # Calculate wins, losses, and total games
        for tournament in tournaments_data:
            for stage in tournament["stages"]:
                for section in stage["sections"]:
                    for match in section["matches"]:
                        for match_team in match["teams"]:
                            if match_team["id"] == team_id:
                                wins += match_team["record"]["wins"]
                                losses += match_team["record"]["losses"]
                                total_games_played += match_team["record"]["wins"] + match_team["record"]["losses"]

        if total_games_played > 0:
            win_rate = wins / total_games_played
        else:
            win_rate = 0
        
        # Attach details to the team
        team_details[team_id] = {
            "team_id": team_id,
            "team_code": team["team_code"],
            "team_name": team["team_name"],
            "team_icon_url": team["team_icon_url"],
            "total_wins": wins,
            "total_losses": losses,
            "total_winrate": win_rate,
            "average_game_duration": None,  # You might need to get this from elsewhere
            "home_region": None,  # You might need to get this from elsewhere
            "current_roster": current_roster
        }
    
    # Write to file
    with open('../chalicelib/team_data.json', 'w') as outfile:
        json.dump(list(team_details.values()), outfile, indent=2)

def generate_rankings_data():
    with open('../chalicelib/team_data.json', 'r') as f:
        team_data = json.load(f)

    rankings = []
    for idx, team in enumerate(team_data, start=1):
        rankings.append({
            "team_id": team["team_id"],
            "team_code": team["team_code"],
            "team_name": team["team_name"],
            "rank": idx
        })

    # Write rankings to file
    with open('../chalicelib/rankings_data.json', 'w') as outfile:
        json.dump(rankings, outfile, indent=2)

if __name__ == "__main__":
    with open('../esports-data/teams.json', 'r') as teams_file, \
         open('../esports-data/tournaments.json', 'r') as tournaments_file, \
         open('../esports-data/players.json', 'r') as players_file:
        teams_data = json.load(teams_file)
        tournaments_data = json.load(tournaments_file)
        players_data = json.load(players_file)
        
        generate_team_data(teams_data, tournaments_data, players_data)
        generate_rankings_data()
