import json
import os
import leaguepedia_parser

script_directory = os.path.dirname(os.path.abspath(__file__))

def generate_team_data(teams_data, tournaments_data, players_data):
    team_details = {}
    
    leagues_path = os.path.join(script_directory, '..', 'esports-data', 'leagues.json')
    with open(leagues_path, 'r', encoding='utf-8') as leagues_file:
        leagues_data = json.load(leagues_file)
    
    elo_path = os.path.join(script_directory, '..', 'ml-output', 'glicko_elo.json')
    with open(elo_path, 'r', encoding='utf-8') as elo_file:
        elo_data = json.load(elo_file)
        
    # \Region to tournament mapping
    region_to_tournaments = {}
    for league in leagues_data:
        if league['region'] != 'INTERNATIONAL':
            if league['region'] not in region_to_tournaments:
                region_to_tournaments[league['region']] = []
            for tournament in league['tournaments']:
                if tournament['id'] not in region_to_tournaments[league['region']]:
                    region_to_tournaments[league['region']].append(tournament['id'])

    sorted_tournaments = sorted(tournaments_data, key=lambda x: x['startDate'], reverse=False)
    
    for tournament in sorted_tournaments:
        print(tournament['startDate'])
    
    for team in teams_data:
        team_id = team["team_id"]
        wins = 0
        losses = 0
        total_games_played = 0
        player_roles = {}
        
        # map for tournaments
        tournament_id_to_details = {
            tournament["id"]: {
                "name": tournament["name"],
                "slug": tournament["slug"],
                "startDate": tournament["startDate"],
                "endDate": tournament["endDate"]
            }
            for tournament in tournaments_data
        }
        
        # Calculate wins, losses, and total games
        tournaments_participated_in = {}
        for tournament in sorted_tournaments:
            for stage in tournament["stages"]:
                for section in stage["sections"]:
                    for match in section["matches"]:
                        for match_team in match["teams"]:
                            if match_team["id"] == team_id:
                                for player in match_team["players"]:
                                    player_roles[player["id"]] = player["role"]
                                if tournament["id"] not in tournaments_participated_in:
                                    tournaments_participated_in[tournament["id"]] = tournament_id_to_details[tournament["id"]]
                                wins += match_team["record"]["wins"]
                                losses += match_team["record"]["losses"]
                                total_games_played += match_team["record"]["wins"] + match_team["record"]["losses"]  

        if total_games_played > 0:
            win_rate = wins / total_games_played
        else:
            win_rate = 0
            
        # Work out home region
        home_region = None
        for region, tournaments in region_to_tournaments.items():
            for tournament_id in tournaments_participated_in:
                if tournament_id in tournaments:
                    home_region = region
                    break
            if home_region:
                break
            
        for index, elo_team in enumerate(elo_data):
            if elo_team['team_id'] == team['team_id']:
                team_rating = elo_team['rating']
                team_ranking = index + 1
                
        current_roster = [
            {
                "player_id": player["player_id"],
                "summoner_name": player["handle"],
                "role": player_roles.get(player["player_id"], "None")
            }
            for player in players_data if player["home_team_id"] == team_id
        ]
        
        team_details[team_id] = {
            "team_id": team_id,
            "team_code": team["acronym"],
            "team_name": team["name"],
            "team_icon_url": get_team_logo_url(team["name"], team["acronym"]),
            "total_wins": wins,
            "total_losses": losses,
            "total_winrate": win_rate,
            "tournaments_participated_in": tournaments_participated_in,
            "home_region": home_region or "Unknown",
            "current_roster": current_roster,
            "elo_rating": team_rating,
            "rank": team_ranking
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
    for index, team in enumerate(team_data, start=1):
        rankings.append({
            "team_id": team["team_id"],
            "team_code": team["team_code"],
            "team_name": team["team_name"],
            "rank": team["rank"],
        })

    chalice_path = os.path.join(script_directory, '..', 'chalicelib', 'rankings_data.json')
    
    if os.path.exists(chalice_path):
        os.remove(chalice_path)  # Delete the file if it exists

    with open(chalice_path, 'w') as outfile:
        json.dump(list(rankings), outfile, indent=2)
        
def get_team_logo_url(team_name, team_code) -> str:
    # Attempt with team name -> team code -> set a string if both fail
    for name in [team_name, team_code]:
        try:
            return leaguepedia_parser.get_team_logo(name)
        except:
            pass
    return None

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
