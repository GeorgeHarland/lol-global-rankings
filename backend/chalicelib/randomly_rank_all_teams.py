# prints random rankings for all teams in teams.json

import json
import random

def random_ranking(filename):
    with open(filename, 'r') as f:
        teams = json.load(f)
    
    # Shuffle the teams randomly
    random.shuffle(teams)
    
    # Extract the top 10
    top_10 = teams[:10]
    
    # Prepare the top 10 rankings as a list of dictionaries
    top_10_rankings = [{'name': team['name'], 'acronym': team['acronym']} for team in top_10]

    return top_10_rankings

if __name__ == "__main__":
    rankings = random_ranking('esports-data/teams.json')
    print("Top 10 Global Rankings:")
    for i, team in enumerate(rankings, 1):
        print(f"{i}. {team['name']} ({team['acronym']})")
