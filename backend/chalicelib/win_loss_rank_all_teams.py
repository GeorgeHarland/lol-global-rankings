# Bayesian average of W/L
# (prior_win_rate * average_games_played + team_wins) / (average_games_played + team_games_played)
# % is not the win rate

import json

def compute_win_loss_ratios(teams_file, tournaments_file):
    with open(teams_file, 'r') as f:
        teams = {team["team_id"]: team for team in json.load(f)}

    team_stats = {team_id: {"wins": 0, "losses": 0} for team_id in teams}

    with open(tournaments_file, 'r') as f:
        tournaments = json.load(f)
        for tournament in tournaments:
            for stage in tournament["stages"]:
                for section in stage["sections"]:
                    for match in section["matches"]:
                        for team in match["teams"]:
                            team_id = team["id"]
                            if team_id in team_stats:
                                team_stats[team_id]["wins"] += team["record"]["wins"]
                                team_stats[team_id]["losses"] += team["record"]["losses"]

    total_wins = sum([stats["wins"] for stats in team_stats.values()])
    total_games = sum([stats["wins"] + stats["losses"] for stats in team_stats.values()])
    
    prior_win_rate = total_wins / total_games
    average_games_played = total_games / len(team_stats)

    rankings = []
    for team_id, stats in team_stats.items():
        team_games = stats["wins"] + stats["losses"]
        bayesian_win_rate = (prior_win_rate * average_games_played + stats["wins"]) / (average_games_played + team_games) * 100
        rankings.append({
            "team": teams[team_id],
            "win_percentage": bayesian_win_rate,
            "wins": stats["wins"],
            "losses": stats["losses"]
        })

    rankings.sort(key=lambda x: x["win_percentage"], reverse=True)

    return rankings

if __name__ == "__main__":
    rankings = compute_win_loss_ratios('esports-data/teams.json', 'esports-data/tournaments.json')
    print("Top 10 Global Rankings:")
    for i, rank in enumerate(rankings[:10], 1):
        print(f"{i}. {rank['team']['name']} ({rank['team']['acronym']}) {rank['win_percentage']:.2f}% ({rank['wins']} wins, {rank['losses']} losses)")
