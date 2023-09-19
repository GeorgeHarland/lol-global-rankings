import json
import os

script_directory = os.path.dirname(os.path.abspath(__file__))

def generate_team_data(teams_data, tournaments_data, players_data):
    team_details = {}

    for team in teams_data:
        team_id = team["team_id"]
        wins = 0
        losses = 0
        total_games_played = 0
        
        current_roster = [
            {
                "player_id": player["player_id"],
                "summoner_name": player["handle"],
                "role": "(Role placeholder)"
            }
            for player in players_data if player["home_team_id"] == team_id
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
        
        team_details[team_id] = {
            "team_id": team_id,
            "team_code": team["acronym"],
            "team_name": team["name"],
            "team_icon_url": "Icon url placeholder",
            "total_wins": wins,
            "total_losses": losses,
            "total_winrate": win_rate,
            "average_game_duration": "Average game duration placeholder",
            "home_region": "Home region placeholder",
            "current_roster": current_roster
        }
    
    chalice_path = os.path.join(script_directory, '..', 'chalicelib', 'teams_data.json')
    if os.path.exists(chalice_path):
        os.remove(chalice_path)  # Delete the file if it exists

    with open(chalice_path, 'w') as outfile:
        json.dump(list(team_details.values()), outfile, indent=2)

def generate_rankings_data():
    open_path = os.path.join(script_directory, '..', 'chalicelib', 'teams_data.json')
    with open(open_path, 'r') as f:
        team_data = json.load(f)

    rankings = []
    for idx, team in enumerate(team_data, start=1):
        rankings.append({
            "team_id": team["team_id"],
            "team_code": team["team_code"],
            "team_name": team["team_name"],
            "rank": idx
        })

    chalice_path = os.path.join(script_directory, '..', 'chalicelib', 'rankings_data.json')
    
    if os.path.exists(chalice_path):
        os.remove(chalice_path)  # Delete the file if it exists

    with open(chalice_path, 'w') as outfile:
        json.dump(list(rankings), outfile, indent=2)

if __name__ == "__main__":
    teams_path = os.path.join(script_directory, '..', 'esports-data', 'teams.json')
    tournaments_path = os.path.join(script_directory, '..', 'esports-data', 'tournaments.json')
    players_path = os.path.join(script_directory, '..', 'esports-data', 'players.json')
    with open(teams_path, 'r', encoding='utf-8') as teams_file, \
         open(tournaments_path, 'r', encoding='utf-8') as tournaments_file, \
         open(players_path, 'r', encoding='utf-8') as players_file:
        teams_data = json.load(teams_file)
        tournaments_data = json.load(tournaments_file)
        players_data = json.load(players_file)
        
        generate_team_data(teams_data, tournaments_data, players_data)
        generate_rankings_data()
