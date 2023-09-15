import json
import os

def calculate_bayesian_win_rate(prior_win_rate, average_games_played, wins, losses):
    total_games = wins + losses
    return (prior_win_rate * average_games_played + wins) / (average_games_played + total_games) * 100

def compute_team_statistics(teams_data, tournaments_data):
    team_stats = {}
    
    total_wins = 0
    total_games = 0
    
    for team in teams_data:
        team_id = team["team_id"]
        wins = 0
        losses = 0
        total_games_played = 0
        
        for tournament in tournaments_data:
            for stage in tournament["stages"]:
                for section in stage["sections"]:
                    for match in section["matches"]:
                        for match_team in match["teams"]:
                            if match_team["id"] == team_id:
                                wins += match_team["record"]["wins"]
                                losses += match_team["record"]["losses"]
                                total_games_played += match_team["record"]["wins"] + match_team["record"]["losses"]
        
        total_wins += wins
        total_games += total_games_played
        
        if total_games_played > 0:
            win_rate = wins / total_games_played  # Corrected win rate calculation
        else:
            win_rate = 0
        bayesian_percentage = calculate_bayesian_win_rate(total_wins / total_games, total_games / len(teams_data), wins, losses)
        
        team_stats[team_id] = {
            "teamname": team["name"],
            "wins": wins,
            "losses": losses,
            "winrate": f"{win_rate * 100:.2f}%",
            "bayesianPercentage": f"{bayesian_percentage:.2f}%"
        }
        
    team_stats = sorted(team_stats.items(), key=lambda x: float(x[1]["bayesianPercentage"].rstrip('%')), reverse=True)
        
    directory = "chalicelib/derived-data/"
    if not os.path.exists(directory):
        os.makedirs(directory)
       
    with open('chalicelib/derived-data/team_winrates.json', 'w') as outfile:
        json.dump(team_stats, outfile, indent=2)

if __name__ == "__main__":
    with open('esports-data/teams.json', 'r') as teams_file, open('esports-data/tournaments.json', 'r') as tournaments_file:
        teams_data = json.load(teams_file)
        tournaments_data = json.load(tournaments_file)
        compute_team_statistics(teams_data, tournaments_data)