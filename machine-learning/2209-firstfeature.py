# Pull data from riot S3 into dataframes (at the moment only 2023 games)

import requests
import json
import gzip
import time
from io import BytesIO
import pandas as pd

S3_BUCKET_URL = "https://power-rankings-dataset-gprhack.s3.us-west-2.amazonaws.com"

def load_gzip_to_dataframe(file_name):
    url = f"{S3_BUCKET_URL}/{file_name}.json.gz"
    print(f"Attempting to fetch: {url}")
    
    response = requests.get(url)
    if response.status_code == 200:
        try:
            gzip_bytes = BytesIO(response.content)
            with gzip.GzipFile(fileobj=gzip_bytes, mode="rb") as gzipped_file:
                df = pd.read_json(gzipped_file)
                print(f"Type of data loaded from {file_name}: {type(df)}")
                return df
        except Exception as e:
            print(f"Error processing {file_name}: {e}")
            return None
    else:
        print(f"Failed to load {file_name} with status code {response.status_code}")
        return None

def get_games_for_year(year, tournaments_data):
    games_for_year = []

    for tournament in tournaments_data.itertuples():
        start_date = getattr(tournament, "startDate", "")
        end_date = getattr(tournament, "endDate", "")
        
        # Check if the tournament's start or end date is in the given year
        if str(year) in start_date or str(year) in end_date:
            stages = getattr(tournament, "stages", [])
            for stage in stages:
                for section in stage.get('sections', []):
                    for match in section.get('matches', []):
                        games = match.get('games', [])
                        games_for_year.extend(games)
    
    return games_for_year

esports_data = {}
esports_data['leagues'] = load_gzip_to_dataframe('esports-data/leagues')
esports_data['tournaments'] = load_gzip_to_dataframe('esports-data/tournaments')
esports_data['players'] = load_gzip_to_dataframe('esports-data/players')
esports_data['teams'] = load_gzip_to_dataframe('esports-data/teams')
esports_data['mapping_data'] = load_gzip_to_dataframe('esports-data/mapping_data')

tournaments_data = esports_data['tournaments']
mappings_data = esports_data['mapping_data']
leagues_data = esports_data['leagues']
players_data = esports_data['players']
teams_data = esports_data['teams']
teams_data['team_id'] = teams_data['team_id'].astype(str)

year = 2023

games_2023 = get_games_for_year(year, tournaments_data)
print(f"Total games found for {year}: {len(games_2023)}")
games_df = pd.DataFrame(games_2023)
print("")
print("2023 games dataframe preview: ")
games_df.head()

# First features: wins, losses, winrates, bayesian winrate (total games matters)

def calculate_bayesian_win_rate(prior_win_rate, average_games_played, wins, losses):
    total_games = wins + losses
    if average_games_played + total_games == 0:
        return 0
    return (prior_win_rate * average_games_played + wins) / (average_games_played + total_games) * 100

def compute_team_statistics(teams_data, tournaments_data):
    team_stats_list = []
    
    total_wins = 0
    total_games = 0
    
    for _, team in teams_data.iterrows():
        team_id = team.team_id
        wins = 0
        losses = 0
        total_games_played = 0
        
        for _, tournament in tournaments_data.iterrows():
            for stage in tournament.stages:
                for section in stage["sections"]:
                    for match in section["matches"]:
                        for match_team in match["teams"]:
                            if match_team["id"] == team_id:
                                wins += match_team["record"]["wins"]
                                losses += match_team["record"]["losses"]
                                total_games_played += match_team["record"]["wins"] + match_team["record"]["losses"]
        
        total_wins += wins
        total_games += total_games_played
        
        if total_games_played == 0:
            win_rate = 0
        else:
            win_rate = wins / total_games_played
        
        average_wins = total_wins / len(teams_data)
        average_games_played = total_games / len(teams_data)
        
        # Handling division by zero
        if average_games_played == 0:
            prior_win_rate = 0
        else:
            prior_win_rate = average_wins / average_games_played
        
        bayesian_percentage = calculate_bayesian_win_rate(prior_win_rate, average_games_played, wins, losses)
        
        team_stats = {
            "team_id": team_id,
            "teamname": team.name,
            "wins": wins,
            "losses": losses,
            "winrate": win_rate * 100,
            "bayesianPercentage": bayesian_percentage
        }
        
        team_stats_list.append(team_stats)

    # Convert list of dictionaries to dataframe
    team_stats_df = pd.DataFrame(team_stats_list)
    
    # Sort by bayesianPercentage in descending order
    team_stats_df = team_stats_df.sort_values(by="bayesianPercentage", ascending=False)

    return team_stats_df

team_winrates = compute_team_statistics(teams_data, tournaments_data)
print("sorted by bayesianPercentage: ")
team_winrates.head()

# Combination to create a dataset

filtered_teams_df = team_winrates[['team_id', 'bayesianPercentage']]
print(filtered_teams_df)