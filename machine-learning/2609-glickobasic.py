# glicko package
# dataset ready (chronologically)
# initialize default ratings, RDs, volatility for each team (?) follow gpt / a glicko guide
# maybe set starting rating from region?

import json, os
import pandas as pd
from glicko2 import Player

## Sort tournament data into a dataframe with winning team, losing team, and date (sorted by date).

script_directory = os.path.dirname(os.path.abspath(__file__))
tournaments_path = os.path.join(script_directory, '..', 'backend', 'esports-data', 'tournaments.json')
print(tournaments_path)
with open(tournaments_path, 'r', encoding='utf-8') as f:
    tournaments = json.load(f)

results = []
for tournament in tournaments:
    for stage in tournament['stages']:
        for section in stage['sections']:
            for match in section['matches']:
                for game in match['games']:
                    if game['state'] == 'completed':
                        for team in game['teams']:
                            if team['result']['outcome'] == 'win':
                                winning_team_id = team['id']
                            else:
                                losing_team_id = team['id']
                        results.append({
                            'startDate': tournament['startDate'],
                            'winning_team_id': winning_team_id,
                            'losing_team_id': losing_team_id
                        })
                        
sorted_results = sorted(results, key=lambda x: x['startDate'])
df = pd.DataFrame(sorted_results)

print(df)

# Glicko-2 initialization

team_ratings = {}
unique_teams = pd.concat([df['winning_team_id'], df['losing_team_id']]).unique()
for team_id in unique_teams:
    team_ratings[team_id] = Player()

# Work through the data

for index, row in df.iterrows():
    winning_team = team_ratings[row['winning_team_id']]
    losing_team = team_ratings[row['losing_team_id']]
    
    winning_team.update_player([losing_team.rating], [losing_team.rd], [1.0])
    losing_team.update_player([winning_team.rating], [winning_team.rd], [0.0])
    
# Display final results

sorted_teams = sorted(team_ratings.keys(), key=lambda x: team_ratings[x].rating, reverse=True)

for team_id in sorted_teams:
    print(f"Team ID: {team_id}, Rating: {team_ratings[team_id].rating}")

