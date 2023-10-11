import json, os
import pandas as pd
from glicko2 import Player

INTERNATIONAL_WIN_SCALING = 1.3

script_directory = os.path.dirname(os.path.abspath(__file__))
tournaments_path = os.path.join(script_directory, '..', 'backend', 'esports-data', 'tournaments.json')
leagues_path = os.path.join(script_directory, '..', 'backend', 'esports-data', 'leagues.json')
teams_path = os.path.join(script_directory, '..', 'backend', 'chalicelib', 'teams_data.json')

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
    if result['league'] != 108001239847565215: # get rid of tft league
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
    'default': 1500,
    'no_games_played': 0
}

# Define a function to initialize ratings for a team
def initialize_team_rating(team_id):
    # If the team already has a rating, do nothing
    if team_id in team_ratings:
        return

    # Initialize the team with a default rating
    initial_rating = region_ratings['default']
    for team_data in teams:
        if team_data['team_id'] == team_id:
            home_region = team_data['home_region']
            initial_rating = region_ratings.get(home_region, region_ratings['default'])
            break
    team_ratings[team_id] = Player(rating=initial_rating)

team_ratings = {}

# Initialize all unique teams
sorted_results = sorted(results, key=lambda x: x['startDate'])
df = pd.DataFrame(sorted_results)
df_teams = pd.concat([df['winning_team_id'], df['losing_team_id']]).unique().tolist()
team_data_ids = [team_data['team_id'] for team_data in teams]
unique_teams = list(set(df_teams + team_data_ids))

for team_id in unique_teams:
    initialize_team_rating(team_id)

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

historical_ratings = {team_id: [] for team_id in unique_teams}
tournament_dict = {t['leagueId']: t for t in tournaments}

for index, row in df.iterrows():
    # Ensure teams are initialized before updating or retrieving ratings
    initialize_team_rating(row['winning_team_id'])
    initialize_team_rating(row['losing_team_id'])

    # Store historical rating
    historical_ratings[row['winning_team_id']].append(team_ratings[row['winning_team_id']].rating)
    historical_ratings[row['losing_team_id']].append(team_ratings[row['losing_team_id']].rating)

    winning_team = team_ratings[row['winning_team_id']]
    losing_team = team_ratings[row['losing_team_id']]

    # Get current tournament and stage
    current_tournament = tournament_dict[row['league']]
    stage_names = [s['slug'] for s in current_tournament['stages']]
    if row['stage'] in stage_names:
        stage_index = stage_names.index(row['stage'])
    else:
        stage_index = 0  # default value in case stage is not found
    
    # Stage bias multiplier
    stage_multiplier = 1 + 0.2 * (stage_index + 1)

    # Check if this game is international
    if row['region'] == 'INTERNATIONAL':
        winning_team.update_player([losing_team.rating], [losing_team.rd], [1.0 * INTERNATIONAL_WIN_SCALING * stage_multiplier])
        losing_team.update_player([winning_team.rating], [winning_team.rd], [0.0])
    else:
        winning_team.update_player([losing_team.rating], [losing_team.rd], [1.0 * stage_multiplier])
        losing_team.update_player([winning_team.rating], [winning_team.rd], [0.0])

    # Rating decay
    for team in unique_teams:
        initialize_team_rating(team)
        team_ratings[team].setRating(team_ratings[team].rating * 0.999)

# Display and save final results
sorted_teams = sorted(team_ratings.keys(), key=lambda x: team_ratings[x].rating, reverse=True)
output_path = os.path.join(script_directory, '..', 'backend', 'ml-output', 'glicko_elo.json')

if os.path.exists(output_path):
    os.remove(output_path)

output_data = [{'team_id': team_id, 'rating': team_ratings[team_id].rating} for team_id in sorted_teams]
print('top team: ', output_data[0])

with open(output_path, 'w') as outfile:
    json.dump(output_data, outfile, indent=2)
