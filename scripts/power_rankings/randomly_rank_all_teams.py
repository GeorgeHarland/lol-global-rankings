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
    
    print("Top 10 Global Rankings:")
    for i, team in enumerate(top_10, 1):
        print(f"{i}. {team['name']} ({team['acronym']})")

if __name__ == "__main__":
    random_ranking('esports-data/teams.json')
