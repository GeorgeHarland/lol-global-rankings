import json, os
import pandas as pd
from glicko2 import Player

## Sort tournament data into a dataframe with winning team, losing team, and date (sorted by date).

script_directory = os.path.dirname(os.path.abspath(__file__))
tournaments_path = os.path.join(script_directory, '..', 'backend', 'esports-data', 'tournaments.json')
leagues_path = os.path.join(script_directory, '..', 'backend', 'esports-data', 'leagues.json')
teams_path = os.path.join(script_directory, 'teams_data.json')

with open(tournaments_path, 'r', encoding='utf-8') as f:
    tournaments = json.load(f)
    
with open(leagues_path, 'r', encoding='utf-8') as f:
    leagues = json.load(f)
    
with open(teams_path, 'r', encoding='utf-8') as f:
    teams = json.load(f)

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
                            'losing_team_id': losing_team_id,
                            'league': tournament['leagueId'],
                            'stage': stage['slug']
                        })
                                                
# get region for each game

for result in results:
  for league in leagues:
    if result['league'] == league['id']:
      result['region'] = league['region']
      
seen = set()
for result in results:
    stage = result['stage']
    if stage not in seen:
        print(stage)
        seen.add(stage)
        
# .region initial ranking bias

region_ratings = {
  'KOREA': 1800,
  'CHINA': 1750,
  'EMEA': 1650,
  'NORTH AMERICA': 1600,
  'Unknown': 1500,
  'default': 1500
}

# team setup + get region for each team

sorted_results = sorted(results, key=lambda x: x['startDate'])
df = pd.DataFrame(sorted_results)
df.head()

team_ratings = {}
unique_teams = pd.concat([df['winning_team_id'], df['losing_team_id']]).unique()

# First, initialize all teams with default ratings
for team_id in unique_teams:
    team_ratings[team_id] = Player(rating=region_ratings['default'])

# Then, update ratings for teams with specific regions
for team_data in teams:
    if team_data['team_id'] in team_ratings: 
        home_region = team_data['home_region']
        initial_rating = region_ratings.get(home_region, region_ratings['default'])
        team_ratings[team_data['team_id']].setRating(initial_rating)

# Work through the data

for index, row in df.iterrows():
    winning_team = team_ratings[row['winning_team_id']]
    losing_team = team_ratings[row['losing_team_id']]
    
    winning_team.update_player([losing_team.rating], [losing_team.rd], [1.0])
    losing_team.update_player([winning_team.rating], [winning_team.rd], [0.0])
    
# Display final results

sorted_teams = sorted(team_ratings.keys(), key=lambda x: team_ratings[x].rating, reverse=False)

for team_id in sorted_teams:
    print(f"Team ID: {team_id}, Rating: {team_ratings[team_id].rating}")
